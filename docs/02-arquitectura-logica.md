# 02. Arquitectura lógica

## Enfoque

La PSTA se plantea como una arquitectura backend distribuida, pero no como una colección de microservicios sin propósito. La separación se hace por dominio: riesgo, autenticación, política, sesión, dispositivo, auditoría y respuesta antifraude.

El flujo crítico debe responder rápido, por eso las decisiones de riesgo y autenticación son sincrónicas. Los eventos se usan para correlación, auditoría y aprendizaje posterior.

## Componentes principales

| Componente                    | Responsabilidad                                                                              |
| ----------------------------- | -------------------------------------------------------------------------------------------- |
| API Gateway                   | Entrada común para canales web, móvil y B2B. Aplica seguridad, rate limiting y trazabilidad. |
| Transaction Security Service  | Orquesta la decisión antes de ejecutar una transacción.                                      |
| Risk Decision Service         | Calcula score de riesgo y reason codes en tiempo real.                                       |
| Authentication Policy Service | Convierte el riesgo en acción: permitir, retar, retener o bloquear.                          |
| Factor Orchestrator           | Ejecuta el factor requerido: silencioso, Clave Dinámica, push, biometría o fallback.         |
| Streaming Risk Processor      | Detecta patrones como ataque de velocidad usando eventos.                                    |
| Audit Service                 | Guarda trazabilidad de decisiones y eventos relevantes.                                      |
| Fraud Response Service        | Aplica bloqueos, retenciones o generación de casos.                                          |

## Flujo lógico resumido

1. El canal solicita una transacción.
2. El orquestador pide una decisión de riesgo.
3. Riesgo calcula score y motivos.
4. La política define la acción de autenticación.
5. Autenticación ejecuta el factor requerido.
6. El resultado se registra y retroalimenta el riesgo.
7. Si aparece un patrón crítico, se bloquea o retiene la operación.

## Comunicación

Uso comunicación sincrónica para lo que impacta directamente la experiencia del cliente:

* decisión de riesgo,
* selección de política,
* ejecución del factor.

Uso comunicación asincrónica para lo que necesita trazabilidad o correlación:

* riesgo calculado,
* autenticación exitosa o fallida,
* dispositivo nuevo,
* sesión degradada,
* ataque de velocidad,
* cuenta bloqueada.

## Tecnologías propuestas

| Necesidad                    | Tecnología sugerida                                    |
| ---------------------------- | ------------------------------------------------------ |
| APIs backend                 | TypeScript/NestJS                                      |
| Eventos                      | Kafka                                                  |
| Cache de baja latencia       | Redis                                                  |
| Datos transaccionales        | PostgreSQL                                             |
| Auditoría/eventos históricos | data lake
| Observabilidad               | Nebula, Grafana, logs centralizados

La tecnología exacta puede variar. Lo importante es mantener contratos claros, baja latencia en el flujo crítico y eventos confiables para auditoría y correlación.

## Trade-off principal

El diseño gana separación de responsabilidades, escalabilidad y capacidad de reacción en tiempo real. A cambio, aumenta la complejidad operativa: más servicios, más contratos y más observabilidad requerida.
