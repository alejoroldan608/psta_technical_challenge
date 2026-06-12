# 12. Conclusiones y alcance
Conclusión

La propuesta se enfoca en resolver la causa raíz del reto: autenticación y riesgo no pueden operar como islas.

La PSTA plantea una arquitectura donde el riesgo se calcula a tiempo, autenticación aplica el factor adecuado y auditoría deja evidencia de cada decisión importante.

Alcance realista

En el tiempo disponible, la entrega prioriza arquitectura, dominio, flujos críticos y un MVP técnico pequeño. No busca implementar un sistema bancario completo ni un motor real de fraude.

Las reglas y umbrales usados son ejemplos de diseño. En una implementación real deberían validarse con equipos de fraude, riesgo, cumplimiento y operación.

Valor de la propuesta

El valor no está en usar muchas tecnologías, sino en mostrar una forma ordenada de construir un sistema crítico:

dominios separados,
decisiones rápidas,
eventos auditables,
fallback controlado,
observabilidad desde el inicio,
operación pensada desde el diseño.

Esta base permitiría construir la plataforma por fases, sin perder trazabilidad ni control sobre decisiones sensibles.