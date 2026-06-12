# 10. Estrategia de equipo y operación
Equipo propuesto

Para construir la PSTA no propondría un equipo gigante, sino un equipo pequeño con buen criterio y ownership claro.

Rol	Responsabilidad
Líder técnico backend	Diseño, decisiones técnicas y coordinación de dominios.
Backend engineers	Construcción de servicios y contratos.
Engineer SRE/DevOps	CI/CD, infraestructura, monitoreo y operación.
QA automation	Pruebas funcionales, contrato, carga y regresión.
Security engineer	Revisión de autenticación, cifrado y permisos.
Product/Business owner	Priorización y alineación con negocio.
Experto de fraude/riesgo	Validación de reglas, señales y umbrales.
Cómo evitar silos

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

Usaría guardias con escalamiento:

L1: monitoreo inicial y clasificación.
L2: equipo PSTA.
L3: especialistas de riesgo, autenticación, infraestructura o seguridad.

Las decisiones importantes quedarían en ADRs, runbooks y postmortems. Un sistema crítico no puede depender de la memoria de una sola persona.