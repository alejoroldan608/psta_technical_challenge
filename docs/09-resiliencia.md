# 09. Resiliencia
Enfoque

La PSTA debe asumir que algo va a fallar: un factor de autenticación, una base de datos, un nodo, una zona o una dependencia externa.

La resiliencia consiste en responder de forma controlada, no en aprobar operaciones inseguras para “mantener el servicio”.

Picos de tráfico

Ante saturación, aplicaría rate limiting por cliente, canal y tipo de operación. Las operaciones sensibles tendrían controles más estrictos que consultas de bajo riesgo.

Si la carga supera la capacidad, el sistema debe rechazar rápido antes que dejar solicitudes colgadas.

Dependencias caídas
Dependencia	Comportamiento esperado
Clave Dinámica	Abrir circuito y usar fallback según nivel de riesgo.
Push/Biometría	Intentar factor alterno si el riesgo lo permite.
Historial	Usar señales disponibles y elevar cautela.
Broker de eventos	Mantener decisión crítica y reintentar publicación.
Base secundaria	Continuar si no afecta decisión crítica.
Fallo de infraestructura

Si cae un nodo, Kubernetes debe reubicar los pods. Si cae una zona, el balanceador deja de enviar tráfico hacia ella.

En escenarios degradados, las operaciones de alto riesgo se retienen o rechazan. No se aprueban con menor seguridad solo por mantener continuidad.

Caos engineering

Validaría mínimo dos pruebas:

Simular caída de Clave Dinámica y confirmar fallback automático.
Simular pérdida de una zona y validar continuidad del flujo transaccional.