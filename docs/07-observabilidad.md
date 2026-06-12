# 07. Observabilidad

## Enfoque

En un sistema de autenticación y riesgo no basta con saber si un servicio está arriba. Hay que entender qué decidió el sistema, por qué lo decidió y cuánto tardó.

La observabilidad debe cubrir tres niveles: negocio, técnica y auditoría.

## Métricas clave

| Métrica                                       | Uso                                                                  |
| --------------------------------------------- | -------------------------------------------------------------------- |
| Latencia de decisión de riesgo                | Validar que el flujo siga dentro del tiempo esperado.                |
| Tasa de éxito por factor                      | Detectar fallas en Clave Dinámica, push, biometría u otros factores. |
| Transacciones retadas, aprobadas y bloqueadas | Entender el comportamiento real del motor.                           |
| Falsos positivos de bloqueo                   | Medir impacto sobre clientes legítimos.                              |
| Tiempo entre evento de riesgo y acción tomada | Confirmar que riesgo y autenticación sí están conversando a tiempo.  |

## Logs y trazas

Cada decisión debe incluir un `correlationId`, canal, tipo de operación, nivel de riesgo, acción aplicada y resultado.

No se deben registrar claves, tokens, códigos OTP, datos sensibles completos ni información financiera sin enmascaramiento.

## Alertas críticas

* Aumento de errores en un factor de autenticación.
* Latencia alta en decisión de riesgo.
* Caída o atraso del broker de eventos.
* Bloqueos masivos fuera del comportamiento normal.
* Aumento fuerte de autenticaciones fallidas.

## Runbook base

Ante una alerta crítica, primero revisaría impacto, servicio afectado, métricas recientes y trazas. Si el problema está en un factor, se activa fallback. Si está en riesgo, se revisa si corresponde a fraude real o a una regla mal calibrada.

La idea es que la guardia no tenga que improvisar en medio del incidente.
