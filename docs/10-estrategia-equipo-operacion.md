# 10. Estrategia de equipo y operación
Equipo propuesto

Para construir la PSTA no propondría un equipo gigante, sino un equipo pequeño con buen criterio y metas claras.

Rol	Responsabilidad

Ingenieros Software internos Banco enfocados en Backend - Diseño, decisiones técnicas y coordinación de dominios.
Certificador y automatizador QA - Pruebas funcionales, contrato, carga y regresión.
Capacidad de Devops y Devsecops - Ciclo de desarrollo de software
PO	Priorización y alineación con negocio.
Experto de fraudes	Validación de reglas, señales y umbrales.

El problema original nace porque autenticación y riesgo no conversan. Por eso el equipo debe trabajar con objetivos compartidos, eventos comunes, decisiones documentadas y revisiones cruzadas.

No separaría un equipo de “fraude” y otro de “autenticación” sin coordinación. El ownership debe ser por flujo de seguridad transaccional completo.

Fases
Alinear dominio, escenarios y señales.
Diseñar contratos, eventos y matriz riesgo-factor.
Construir decisión de riesgo y política de autenticación.
Agregar streaming para patrones críticos.
Endurecer resiliencia, observabilidad y seguridad.
Liberar en piloto controlado con métricas claras.
Soporte

Definir modelo de Standby.

Las decisiones importantes quedarían en runbooks. Un sistema crítico no puede depender de la memoria de una sola persona.