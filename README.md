# PSTA Technical Challenge

## Plataforma de Seguridad Transaccional Adaptativa

Este repositorio contiene la propuesta técnica para el diseño de una **Plataforma de Seguridad Transaccional Adaptativa (PSTA)**, orientada a integrar los dominios de **autenticación** y **monitoreo de riesgo transaccional** sobre una arquitectura backend resiliente, observable y preparada para operación crítica.

La solución se aborda desde el **Camino 1 — Arquitectura Profunda**, priorizando el diseño de dominio, la arquitectura lógica y física, los flujos críticos, la resiliencia, la observabilidad, la seguridad y la estrategia de construcción y operación del sistema.

Adicionalmente, se incluye un **MVP funcional mínimo en TypeScript**, con enfoque de **Clean Architecture**, para demostrar de forma acotada cómo podría implementarse la lógica de decisión de riesgo, reason codes y selección de acciones de autenticación.

---

## Enfoque de la entrega

La entrega principal no busca implementar una plataforma bancaria completa, sino demostrar una propuesta técnica coherente, sustentable y trazable para resolver la causa raíz del reto: la falta de comunicación efectiva entre autenticación y monitoreo transaccional.

El diseño propone que ambos dominios mantengan responsabilidades separadas, pero colaboren mediante:

* Decisiones sincrónicas de baja latencia para el flujo transaccional.
* Eventos asincrónicos para correlación, auditoría y retroalimentación de riesgo.
* Políticas adaptativas para seleccionar el factor de autenticación según el nivel de riesgo.
* Observabilidad, resiliencia y operación continua como capacidades de primer nivel.

---

## Entregables

| #  | Entregable                       | Archivo                                                                                |
| -- | -------------------------------- | -------------------------------------------------------------------------------------- |
| 0  | Resumen ejecutivo                | [docs/00-resumen-ejecutivo.md](docs/00-resumen-ejecutivo.md)                           |
| 1  | Diseño de dominio DDD            | [docs/01-diseno-dominio-ddd.md](docs/01-diseno-dominio-ddd.md)                         |
| 2  | Arquitectura lógica              | [docs/02-arquitectura-logica.md](docs/02-arquitectura-logica.md)                       |
| 3  | Arquitectura física              | [docs/03-arquitectura-fisica.md](docs/03-arquitectura-fisica.md)                       |
| 4  | Flujos de escenarios             | [docs/04-flujos-escenarios.md](docs/04-flujos-escenarios.md)                           |
| 5  | Estrategia DevOps                | [docs/05-devops.md](docs/05-devops.md)                                                 |
| 6  | Infraestructura                  | [docs/06-infraestructura.md](docs/06-infraestructura.md)                               |
| 7  | Observabilidad                   | [docs/07-observabilidad.md](docs/07-observabilidad.md)                                 |
| 8  | Seguridad                        | [docs/08-seguridad.md](docs/08-seguridad.md)                                           |
| 9  | Resiliencia                      | [docs/09-resiliencia.md](docs/09-resiliencia.md)                                       |
| 10 | Estrategia de equipo y operación | [docs/10-estrategia-equipo-operacion.md](docs/10-estrategia-equipo-operacion.md)       |
| 11 | Decisiones arquitectónicas       | [docs/11-decisiones-arquitectonicas-adr.md](docs/11-decisiones-arquitectonicas-adr.md) |
| 12 | Conclusiones y alcance           | [docs/12-conclusiones-y-alcance.md](docs/12-conclusiones-y-alcance.md)                 |

---

## Diagramas

Los diagramas se mantienen en formato **PlantUML** para que puedan versionarse como código y evolucionar junto con la documentación.

| Diagrama                                       | Archivo fuente                                                                             |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------ |
| C4 - Contexto                                  | [diagrams/c4-context.puml](diagrams/c4-context.puml)                                       |
| C4 - Contenedores                              | [diagrams/c4-containers.puml](diagrams/c4-containers.puml)                                 |
| Componentes - Dominio de riesgo                | [diagrams/components-risk-domain.puml](diagrams/components-risk-domain.puml)               |
| Componentes - Dominio de autenticación         | [diagrams/components-auth-domain.puml](diagrams/components-auth-domain.puml)               |
| Secuencia - Transacción de bajo riesgo         | [diagrams/sequence-low-risk-transaction.puml](diagrams/sequence-low-risk-transaction.puml) |
| Secuencia - Indisponibilidad de Clave Dinámica | [diagrams/sequence-dynamic-key-outage.puml](diagrams/sequence-dynamic-key-outage.puml)     |
| Secuencia - Ataque de velocidad                | [diagrams/sequence-velocity-attack.puml](diagrams/sequence-velocity-attack.puml)           |
| Despliegue multi-zona                          | [diagrams/deployment-multizone.puml](diagrams/deployment-multizone.puml)                   |

---

## MVP funcional de apoyo

El MVP funcional se encuentra en:

[ mvp/risk-decision-demo ](mvp/risk-decision-demo)

Este MVP no representa una implementación completa de la PSTA. Su objetivo es mostrar, de manera simple y ejecutable, cómo se podrían expresar en código algunos conceptos centrales de la arquitectura:

* Cálculo básico de score de riesgo.
* Clasificación del nivel de riesgo.
* Selección de acción requerida.
* Reason codes para auditoría y explicabilidad.
* Simulación de un patrón de ataque de velocidad.
* Separación por capas usando Clean Architecture.
* Pruebas unitarias sobre reglas de decisión.

---

## Estructura del repositorio

```text
psta_technical_challenge/
│
├── README.md
│
├── docs/
│   ├── 00-resumen-ejecutivo.md
│   ├── 01-diseno-dominio-ddd.md
│   ├── 02-arquitectura-logica.md
│   ├── 03-arquitectura-fisica.md
│   ├── 04-flujos-escenarios.md
│   ├── 05-devops.md
│   ├── 06-infraestructura.md
│   ├── 07-observabilidad.md
│   ├── 08-seguridad.md
│   ├── 09-resiliencia.md
│   ├── 10-estrategia-equipo-operacion.md
│   ├── 11-decisiones-arquitectonicas-adr.md
│   └── 12-conclusiones-y-alcance.md
│
├── diagrams/
│   ├── c4-context.puml
│   ├── c4-containers.puml
│   ├── components-risk-domain.puml
│   ├── components-auth-domain.puml
│   ├── sequence-low-risk-transaction.puml
│   ├── sequence-dynamic-key-outage.puml
│   ├── sequence-velocity-attack.puml
│   └── deployment-multizone.puml
│
├── assets/
│
├── mvp/
│   └── risk-decision-demo/
│
└── entrega/
```

---

## Decisiones principales

Las decisiones arquitectónicas más relevantes de la propuesta son:

1. Separar los dominios de autenticación y riesgo, pero conectarlos mediante decisiones sincrónicas y eventos de dominio.
2. Usar una arquitectura orientada a eventos para correlación, auditoría y retroalimentación de riesgo.
3. Mantener el flujo de decisión transaccional con baja latencia mediante servicios especializados y contratos claros.
4. Aplicar autenticación adaptativa según nivel de riesgo, evitando fricción innecesaria en transacciones habituales.
5. Diseñar desde el inicio para resiliencia, observabilidad, seguridad y operación continua.

---

## Alcance consciente

Esta entrega no pretende construir una solución productiva completa ni reemplazar el conocimiento especializado de fraude financiero. Las reglas, umbrales y señales de riesgo propuestas deben ser validadas con expertos del dominio de fraude, riesgo y cumplimiento.



