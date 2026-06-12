# 05. Estrategia DevOps

## Enfoque

Para este sistema usaría una estrategia simple y controlada. No buscaría un proceso pesado, pero sí uno que reduzca riesgos antes de llegar a producción.

La prioridad es que cada cambio sea pequeño, revisable, probado y fácil de revertir.

## Estrategia de ramas

Usaría **trunk-based development**.

La rama principal sería `main` y los cambios entrarían por pull request cortos. Evitaría ramas largas porque en un sistema crítico aumentan los conflictos y hacen más difícil detectar errores temprano.

## Revisión de código

Cada cambio debería tener al menos:

* revisión de un backend senior o líder técnico,
* pruebas automatizadas pasando,
* validación de contratos si cambia una API o evento,
* revisión de seguridad si toca autenticación, riesgo o datos sensibles.

Para cambios críticos, como reglas de riesgo o fallback de autenticación, pediría revisión adicional de negocio/riesgo.

## Pruebas

La estrategia mínima sería:

| Tipo de prueba | Objetivo                                                         |
| -------------- | ---------------------------------------------------------------- |
| Unitarias      | Validar reglas de riesgo, políticas y casos de uso.              |
| Integración    | Validar comunicación entre servicios y dependencias.             |
| Contrato       | Evitar romper APIs o eventos entre dominios.                     |
| Carga          | Probar latencia y comportamiento en picos.                       |
| Seguridad      | Revisar autenticación, autorización y manejo de datos sensibles. |

## Despliegue

Usaría **feature flags** y despliegues **canary**.

Primero se libera a un porcentaje pequeño de tráfico, se revisan métricas y luego se aumenta gradualmente. Si aparecen errores, se apaga la funcionalidad o se revierte sin afectar toda la operación.

## Criterio principal

En una plataforma como esta, desplegar rápido no sirve si no se puede observar, medir y revertir. El proceso DevOps debe permitir avanzar con frecuencia, pero sin perder control sobre seguridad, latencia y disponibilidad.
