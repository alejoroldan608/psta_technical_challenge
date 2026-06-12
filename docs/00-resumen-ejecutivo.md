# 00. Resumen ejecutivo

## Entendimiento del reto

El reto plantea una falla de fondo: autenticación y monitoreo de riesgo operan como dominios separados. Por eso, la Clave Dinámica no conoce el riesgo de la transacción que está validando, y el motor antifraude no puede pedir más seguridad o bloquear oportunamente cuando detecta comportamiento sospechoso.

La propuesta parte de esa causa raíz. La PSTA no se diseña como un módulo aislado de autenticación ni como un motor de fraude independiente, sino como una plataforma donde ambos dominios conversan en tiempo real, sin perder sus responsabilidades.

## Camino seleccionado

Selecciono el **Camino 1 — Arquitectura Profunda** como entrega principal, porque el reto evalúa principalmente criterio técnico, diseño de dominio, arquitectura, resiliencia y capacidad de operación.

Además, incluyo un MVP pequeño en TypeScript con Clean Architecture. Este MVP no pretende resolver fraude real; solo aterriza una parte representativa de la solución: cálculo básico de riesgo, reason codes y acción de autenticación sugerida.

## Enfoque de solución

La solución propuesta combina dos estilos de comunicación:

* Decisiones sincrónicas para el flujo transaccional, donde la latencia es crítica.
* Eventos asincrónicos para correlación, auditoría, monitoreo y retroalimentación del riesgo.

Con este enfoque, una transacción de bajo riesgo puede fluir con mínima fricción, mientras que una operación inusual puede exigir un factor más fuerte, ser retenida o bloquearse según el nivel de riesgo.

## Principios de diseño

* Separar responsabilidades entre autenticación, riesgo, sesión, dispositivo, auditoría y respuesta antifraude.
* Evitar que el flujo mayoritario de bajo riesgo pague el costo de reglas pesadas o fricción innecesaria.
* Diseñar fallback controlado para dependencias críticas como Clave Dinámica.
* Auditar cada decisión relevante, incluso cuando no exista un factor visible para el cliente.
* Pensar el sistema desde producción: observabilidad, resiliencia, seguridad y soporte operativo.

## Alcance

La entrega no busca construir una plataforma bancaria completa en dos días. El objetivo es presentar una arquitectura clara, defendible y suficientemente profunda para demostrar cómo se construiría la PSTA y cómo respondería ante los escenarios del reto.

Las reglas y umbrales de fraude planteados son ejemplos técnicos y deberían validarse con expertos de fraude, riesgo y cumplimiento antes de una implementación real.

## Entregables incluidos

* Documentación de arquitectura profunda.
* Modelo de dominio DDD.
* Diagramas C4 y diagramas de secuencia en PlantUML.
* Matriz de riesgo contra factor de autenticación.
* Estrategias de DevOps, infraestructura, observabilidad, seguridad y resiliencia.
* Estrategia de equipo y operación continua.
* MVP funcional mínimo del Risk Decision Service en TypeScript.

## Cierre

La propuesta busca resolver la desconexión entre autenticación y riesgo con una arquitectura adaptativa, observable y resiliente.