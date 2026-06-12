# 11. Decisiones arquitectónicas ADR
ADR 01 — Separar riesgo y autenticación

Decisión: mantener riesgo y autenticación como dominios separados.

Motivo: cada uno tiene responsabilidades distintas. Riesgo calcula y explica; autenticación ejecuta factores.

Consecuencia: se evita un componente gigante, pero se necesitan contratos claros entre dominios.

ADR 02 — Usar eventos para correlación y auditoría

Decisión: publicar eventos relevantes del flujo transaccional.

Motivo: los eventos permiten detectar patrones, auditar decisiones y retroalimentar el riesgo sin acoplar todos los servicios.

Consecuencia: aumenta la necesidad de monitorear el broker y versionar eventos.

ADR 03 — Decisión sincrónica en el flujo crítico

Decisión: la evaluación necesaria para aprobar, retar o bloquear una transacción debe responder de forma sincrónica.

Motivo: el cliente no puede esperar un proceso batch para saber si su transacción continúa.

Consecuencia: los servicios críticos deben ser rápidos, escalables y tener timeouts estrictos.

ADR 04 — Autenticación adaptativa

Decisión: no aplicar el mismo factor a todas las operaciones.

Motivo: una operación habitual no debe tener la misma fricción que una transferencia alta desde un dispositivo nuevo.

Consecuencia: se necesita una matriz de riesgo contra factor, versionada y revisada con expertos de negocio.

ADR 05 — MVP acotado

Decisión: incluir un MVP pequeño del Risk Decision Service en TypeScript.

Motivo: permite mostrar cómo aterrizar parte del diseño a código sin prometer una plataforma completa.

Consecuencia: el MVP es demostrativo, no productivo.