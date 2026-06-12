# Risk Decision Demo

MVP funcional mínimo del **Risk Decision Service** para la PSTA.

Este servicio no pretende implementar un motor real de fraude. Su objetivo es mostrar, de forma simple, cómo una decisión de riesgo puede recibir señales de una transacción, calcular un score, devolver motivos de riesgo y sugerir una acción de autenticación.

## Stack

* TypeScript
* Express
* Jest
* Clean Architecture simplificada

## Estructura

```text
src/
├── main.ts
└── risk/
    ├── domain/
    ├── application/
    └── interfaces/
```

* `domain`: reglas puras de riesgo, enums, umbrales y modelos.
* `application`: casos de uso.
* `interfaces`: endpoints HTTP.

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

El servicio queda disponible en:

```text
http://localhost:3000
```

## Health check

```http
GET /health
```

Respuesta esperada:

```json
{
  "status": "ok",
  "service": "risk-decision-demo"
}
```

## Evaluar riesgo de una transacción

```http
POST /risk/decision
```

Body de ejemplo:

```json
{
  "customerId": "C123",
  "accountId": "A456",
  "amount": 800000,
  "deviceKnown": false,
  "usualLocation": false,
  "newBeneficiary": true,
  "sessionTrustLevel": "MEDIUM",
  "transactionsLast10Min": 2
}
```

Respuesta esperada:

```json
{
  "data": {
    "score": 0.7,
    "riskLevel": "MEDIUM",
    "requiredAction": "STRONG_AUTH_REQUIRED",
    "suggestedFactor": "PUSH_OR_BIOMETRIC",
    "reasonCodes": [
      "MEDIUM_AMOUNT",
      "UNKNOWN_DEVICE",
      "UNUSUAL_LOCATION",
      "NEW_BENEFICIARY"
    ],
    "auditEvent": "RiskScoreCalculated"
  }
}
```

## Simular ataque de velocidad

```http
POST /risk/simulate/velocity-attack
```

Body de ejemplo:

```json
{
  "accountId": "A456",
  "transactions": 7,
  "amountRange": "190000-210000",
  "uniqueNewBeneficiaries": 7,
  "windowMinutes": 3
}
```

Respuesta esperada:

```json
{
  "data": {
    "accountId": "A456",
    "riskLevel": "CRITICAL",
    "requiredAction": "ACCOUNT_BLOCK",
    "reasonCodes": [
      "VELOCITY_PATTERN",
      "STRUCTURED_AMOUNTS",
      "MULTIPLE_NEW_BENEFICIARIES"
    ],
    "domainEvent": "AccountBlocked",
    "explanation": "Se detecta patrón de velocidad: varias transferencias en pocos minutos, montos similares y beneficiarios nuevos."
  }
}
```

## Pruebas

```bash
npm test
```

Las pruebas validan:

* transacción habitual de bajo riesgo,
* transacción de riesgo medio que exige autenticación fuerte,
* patrón de ataque de velocidad que bloquea la cuenta.

## Nota sobre los umbrales

Los valores usados en el MVP son demostrativos y están alineados con los escenarios del reto. En una implementación real, los umbrales y pesos deberían ser configurables, versionados y validados con equipos de fraude, riesgo y cumplimiento.
