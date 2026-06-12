# 06. Infraestructura

## Enfoque

La infraestructura debe acompañar la criticidad del sistema. Autenticación y riesgo no pueden depender de una sola zona, un solo nodo o una sola instancia.

La propuesta es desplegar la PSTA en Kubernetes, con servicios distribuidos en varias zonas y dependencias administradas cuando tenga sentido: base de datos, broker de eventos, cache y observabilidad.

## Alta disponibilidad

Los servicios principales deben correr con varias réplicas:

* Transaction Security Service
* Risk Decision Service
* Authentication Policy Service
* Factor Orchestrator
* Fraud Response Service
* Audit Service

Si una réplica falla, Kubernetes la reemplaza. Si una zona falla, el balanceador deja de enviar tráfico hacia esa zona y las demás continúan atendiendo.

## Recuperación ante desastres

El objetivo es mantener el diseño alineado con el reto:

| Indicador | Objetivo                              |
| --------- | ------------------------------------- |
| RTO       | Recuperación máxima en 15 minutos     |
| RPO       | Pérdida máxima de datos de 30 minutos |

Para lograrlo, los datos críticos deben tener réplica multi-zona, backups automáticos y pruebas periódicas de restauración. No basta con tener backups; hay que probar que sirven.

## Escalamiento

No todos los componentes escalan igual.

Los servicios sin estado escalan horizontalmente por métricas como CPU, memoria, RPS, latencia y cola de solicitudes.

Los componentes con estado, como bases de datos, Redis o broker de eventos, deben escalar con más cuidado: particiones, réplicas, capacidad de I/O y tamaño de almacenamiento.

## Picos de tráfico

Ante picos, primero escalan los servicios que están en el camino crítico de la transacción:

1. API Gateway
2. Transaction Security Service
3. Risk Decision Service
4. Authentication Policy Service
5. Factor Orchestrator

El costo del pico se controla escalando solo lo necesario. No tiene sentido crecer todos los componentes al mismo tiempo si el cuello de botella está en riesgo, autenticación o eventos.

## Criterio de diseño

La infraestructura no debe ocultar fallas, sino permitir que el sistema falle de forma controlada.

Si hay saturación, es preferible rechazar rápido una operación riesgosa antes que aprobarla con menos seguridad o dejarla en estado incierto.
