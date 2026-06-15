# 04. Flujos de escenarios

## Enfoque

Estos flujos muestran cómo se comportaría la PSTA ante los casos del reto. La idea no es describir cada llamada técnica al detalle, sino dejar clara la decisión: cuándo permitir, cuándo pedir más seguridad, cuándo retener y cuándo bloquear.

## 1. Transacción habitual de bajo riesgo

El cliente hace una transferencia pequeña desde su dispositivo habitual, en un horario normal y con comportamiento parecido a su historial.

El orquestador consulta riesgo. El score sale bajo porque no hay señales raras: dispositivo conocido, monto bajo, ubicación esperada y sesión confiable. La política permite continuar con autenticación silenciosa o sin reto visible.

Se registra la decisión en auditoría: señales usadas, score, política aplicada y resultado. Aunque el cliente no vea un segundo factor, la decisión queda trazable.

**Resultado:** la transacción fluye rápido y sin fricción innecesaria.

## 2. Dispositivo desconocido y monto medio

El cliente entra desde un dispositivo nuevo, con ubicación inusual y una transferencia de monto medio.

Riesgo no asume fraude, pero suma las señales: dispositivo desconocido, ubicación diferente y monto más alto de lo normal. La política decide pedir un factor fuerte.

Si el cliente supera el reto, el dispositivo no queda como confiable de inmediato. Primero queda en observación o confianza provisional, para evitar que un atacante registre un dispositivo comprometido como seguro.

**Resultado:** se protege la operación sin bloquear automáticamente a un cliente legítimo.

## 3. Ataque de velocidad

La cuenta empieza a hacer varias transferencias pequeñas, con montos parecidos y hacia muchas cuentas nuevas.

El flujo no espera un proceso batch. Los eventos de transacción alimentan el monitoreo en tiempo real. Cuando el patrón se repite dentro de una ventana corta, el riesgo sube progresivamente hasta nivel crítico.

Al llegar al umbral, se activa respuesta antifraude: bloqueo temporal de la cuenta, rechazo de nuevas transacciones y registro completo para auditoría.

**Resultado:** el sistema corta el patrón antes de que siga creciendo el daño.

## 4. Caída de Clave Dinámica

Si Clave Dinámica falla, el Factor Orchestrator lo detecta por errores, timeouts o latencia anormal. El circuito se abre y deja de enviar solicitudes a ese factor mientras se recupera.

La política aplica fallback según riesgo:

| Riesgo  | Decisión durante la caída                             |
| ------- | ----------------------------------------------------- |
| Bajo    | Permitir con controles silenciosos adicionales        |
| Medio   | Usar factor alterno como push o biometría             |
| Alto    | Retener o rechazar si no hay factor fuerte disponible |
| Crítico | Bloquear o rechazar                                   |

Cuando Clave Dinámica vuelve, el retorno se hace gradual para no afectar sesiones activas ni generar otro pico.

**Resultado:** hay continuidad para operaciones seguras, pero no se baja la guardia en operaciones riesgosas.

## 5. Riesgo escala durante una sesión

El cliente inicia con una sesión confiable, pero luego realiza acciones más sensibles: transferencia, cambio de celular y una transferencia alta a una cuenta nueva.

La sesión no se trata como algo fijo. Cada operación actualiza la confianza. Una consulta de saldo puede pasar sin reto, pero un cambio de celular o una transferencia alta obliga a reautenticar.

Si el patrón se vuelve crítico, el sistema no invalida todo sin contexto: bloquea o retiene la operación sensible y deja trazabilidad del motivo.

**Resultado:** la seguridad se adapta al comportamiento dentro de la misma sesión.

---

## Cómo se dedujo cada flujo

Los escenarios se dedujeron a partir de las señales explícitas del reto y del resultado esperado en cada caso. La arquitectura no responde cada escenario como una regla aislada, sino con un flujo común:

1. evaluar riesgo,
2. decidir la acción de autenticación,
3. ejecutar el factor si aplica,
4. publicar eventos,
5. registrar auditoría,
6. activar respuesta antifraude cuando el riesgo supera el umbral.

### Escenario 1 — Transacción habitual de bajo riesgo

**Señales del reto:** monto bajo, dispositivo habitual, horario normal y comportamiento consistente.

**Decisión en la arquitectura:** el `Risk Decision Service` calcula riesgo bajo usando señales simples y de baja latencia. Luego la política permite autenticación silenciosa o confianza de sesión.

**Garantía buscada:** mantener rápido el flujo más frecuente, sin factor visible para el cliente, pero dejando auditoría completa de la decisión.

### Escenario 2 — Dispositivo desconocido y monto medio

**Señales del reto:** dispositivo nuevo, ubicación inusual y transferencia de $800.000 COP.

**Decisión en la arquitectura:** el score sube a riesgo medio. La política no bloquea automáticamente, pero exige un factor fuerte como push o biometría.

**Garantía buscada:** proteger la operación sin castigar de entrada a un cliente legítimo. Si supera el factor fuerte, el dispositivo queda aprendido de forma gradual y auditable.

### Escenario 3 — Ataque de velocidad

**Señales del reto:** muchas transferencias pequeñas, montos similares y beneficiarios nuevos en una ventana corta.

**Decisión en la arquitectura:** los eventos alimentan un `Streaming Risk Processor`. El riesgo escala de forma incremental hasta crítico cuando el patrón se repite.

**Garantía buscada:** bloquear la cuenta antes de que el daño crezca y dejar trazabilidad completa de señales, ventana aplicada, decisión y evento de bloqueo.

### Escenario 4 — Caída de Clave Dinámica

**Señales del reto:** indisponibilidad del segundo factor durante horario pico y alto volumen de clientes afectados.

**Decisión en la arquitectura:** el `Factor Orchestrator` detecta errores, timeouts o latencia anormal, abre circuito y aplica fallback según el nivel de riesgo.

**Garantía buscada:** permitir continuidad en bajo y medio riesgo con el mejor factor disponible, pero rechazar o retener alto riesgo si no hay factor fuerte. El retorno al factor principal se hace de forma gradual.

### Escenario 5 — Riesgo escala durante una sesión

**Señales del reto:** la sesión inicia confiable, pero luego aparecen operaciones sensibles en pocos minutos: transferencia, cambio de celular y transferencia alta a cuenta nueva.

**Decisión en la arquitectura:** la confianza de sesión no se toma como fija. Cada operación sensible recalcula el riesgo y puede exigir reautenticación.

**Garantía buscada:** adaptar la seguridad sin invalidar toda la sesión. La sesión puede seguir activa, pero una operación crítica puede ser retenida o bloqueada.

### Lectura final

Esta lectura evita diseñar reglas sueltas por escenario. La misma arquitectura responde a condiciones normales y de falla porque separa responsabilidades:

* riesgo calcula y explica,
* política decide la fricción,
* autenticación ejecuta el factor,
* respuesta antifraude actúa cuando el riesgo supera el umbral,
* auditoría conserva la evidencia.


## Cierre

Los cinco escenarios se resuelven con la misma idea: riesgo y autenticación trabajan separados, pero coordinados. El riesgo explica qué está pasando; la política define qué hacer; autenticación ejecuta el factor; y auditoría deja evidencia de la decisión.
