# 01. Diseño de dominio DDD

## Enfoque

La causa raíz del reto es que autenticación y riesgo existen, pero no trabajan juntos en tiempo real. Por eso, el diseño no parte de crear más servicios, sino de separar bien las responsabilidades y definir cómo deben conversar.

La idea base es simple:

> Riesgo calcula qué tan peligrosa es una operación. Autenticación aplica el nivel de seguridad necesario. La plataforma transaccional coordina la decisión.

## Mapa de dominio

| Contexto                  | Responsabilidad                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------- |
| Seguridad Transaccional   | Coordina la decisión antes de ejecutar una transacción.                               |
| Monitoreo de Riesgo       | Calcula el score y detecta patrones sospechosos.                                      |
| Política de Autenticación | Traduce el riesgo en una acción: permitir, retar, retener o bloquear.                 |
| Autenticación             | Ejecuta el factor solicitado: silencioso, Clave Dinámica, push, biometría o fallback. |
| Confianza de Dispositivo  | Determina si un dispositivo es conocido, nuevo o sospechoso.                          |
| Confianza de Sesión       | Ajusta la confianza durante una sesión activa según el comportamiento.                |
| Respuesta Antifraude      | Aplica bloqueos, retenciones o generación de casos.                                   |
| Auditoría                 | Registra decisiones, señales usadas, políticas aplicadas y resultados.                |

## Modelo resumido

El contexto de **Seguridad Transaccional** actúa como orquestador. Recibe la solicitud, pide una evaluación de riesgo, consulta la política de autenticación y decide si la operación continúa, exige reto o se bloquea.

El contexto de **Monitoreo de Riesgo** calcula un score con señales como monto, dispositivo, ubicación, canal, beneficiario, sesión y comportamiento reciente. También detecta patrones como múltiples transferencias pequeñas hacia cuentas nuevas.

La **Política de Autenticación** convierte ese nivel de riesgo en una acción concreta. Por ejemplo:

| Riesgo  | Acción                                   |
| ------- | ---------------------------------------- |
| Bajo    | Permitir o usar autenticación silenciosa |
| Medio   | Exigir factor fuerte                     |
| Alto    | Exigir factor reforzado o retener        |
| Crítico | Bloquear o rechazar                      |

El contexto de **Autenticación** ejecuta el factor definido y reporta el resultado. Ese resultado vuelve a alimentar el riesgo, porque una autenticación fallida o repetida también es una señal.

Los contextos de **Dispositivo** y **Sesión** ayudan a que la seguridad sea adaptativa. Un dispositivo nuevo no debería volverse confiable de inmediato, y una sesión inicialmente segura puede perder confianza si el usuario realiza operaciones sensibles.

Finalmente, **Auditoría** guarda la trazabilidad necesaria para explicar qué decidió el sistema y por qué, sin registrar secretos ni datos sensibles sin protección.

## Eventos principales

Para evitar acoplamiento fuerte, los dominios se comunican también por eventos. En la documentación los dejo en español; en código podrían nombrarse en inglés como contratos técnicos.

| Evento                        | Para qué sirve                                        |
| ----------------------------- | ----------------------------------------------------- |
| Riesgo calculado              | Informa el score y los motivos de riesgo.             |
| Política evaluada             | Indica qué acción de autenticación aplica.            |
| Autenticación exitosa         | Retroalimenta la confianza de sesión y dispositivo.   |
| Autenticación fallida         | Puede elevar el nivel de riesgo.                      |
| Ataque de velocidad detectado | Activa respuesta antifraude.                          |
| Cuenta bloqueada              | Impide nuevas transacciones mientras dure el bloqueo. |

## Decisión de diseño

La decisión principal es no mezclar fraude, autenticación y ejecución transaccional en un solo componente. Separarlos permite evolucionar cada dominio, pero conectarlos mediante decisiones y eventos evita repetir el problema original.

Las reglas reales de fraude no deberían inventarse desde tecnología. Deben definirse con expertos de fraude, riesgo y cumplimiento. La arquitectura deja el sistema preparado para incorporar ese conocimiento de forma segura, auditable y operable.
