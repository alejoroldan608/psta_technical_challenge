# 03. Arquitectura física

## Enfoque

La PSTA debe correr en una infraestructura multi-zona, porque los servicios de autenticación y riesgo no pueden depender de un único punto de falla.

La idea es mantener los servicios críticos activos en más de una zona, con balanceo de tráfico, escalamiento automático y recuperación rápida si una zona completa falla.

## Distribución propuesta

| Capa           | Componentes                                         |
| -------------- | --------------------------------------------------- |
| Entrada        | WAF, API Gateway y balanceador global               |
| Aplicación     | Servicios backend en Kubernetes                     |
| Mensajería     | Broker de eventos para auditoría y correlación      |
| Datos          | Bases de datos administradas con réplica multi-zona |
| Observabilidad | Métricas, logs, trazas y alertas centralizadas      |

## Servicios en Kubernetes

Los servicios principales correrían como pods independientes:

* Transaction Security Service
* Risk Decision Service
* Authentication Policy Service
* Factor Orchestrator
* Fraud Response Service
* Audit Service

Los servicios sin estado escalan horizontalmente. Los componentes con estado, como bases de datos o broker, se manejan como servicios administrados o clusters especializados, no como pods simples sin estrategia de recuperación.

## Topología de red

El tráfico externo entra por el WAF y el API Gateway. Desde ahí pasa a los servicios internos por red privada.

Los servicios no se exponen directamente a internet. La comunicación interna usa TLS/mTLS, control de permisos por servicio y trazabilidad con correlation id.

## Multi-zona

La plataforma se despliega mínimo en dos zonas activas. Si una zona falla, el balanceador deja de enviarle tráfico y la otra zona continúa operando.

La prioridad es que el flujo transaccional no se caiga completo. En caso de degradación, el sistema debe rechazar rápido las operaciones de alto riesgo antes que aprobarlas con menor seguridad.

## Criterio de diseño

La arquitectura física busca algo simple: que una falla de infraestructura no se convierta automáticamente en una caída funcional del sistema.

Por eso se separan entrada, servicios, mensajería, datos y observabilidad. Cada capa puede escalar o recuperarse sin obligar a rediseñar toda la plataforma.
