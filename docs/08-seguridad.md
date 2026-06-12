# 08. Seguridad

## Enfoque

La seguridad debe estar en el diseño, no solo al final. La PSTA maneja decisiones sensibles, por eso los servicios deben autenticarse entre sí y los datos deben protegerse en tránsito, en reposo y en logs.

## Servicio a servicio

La comunicación interna usaría mTLS y tokens de servicio con permisos específicos. Un servicio no debería poder llamar cualquier otro servicio solo porque está dentro de la red.

Cada token debe tener claims mínimos: servicio emisor, audiencia, permisos, expiración y ambiente.

## Datos sensibles

Los datos sensibles se deben cifrar en reposo y en tránsito. En logs y auditoría solo se guarda lo necesario para explicar la decisión, evitando secretos, OTP, tokens o datos financieros completos.

## Controles principales

* mTLS entre servicios.
* JWT de servicio con expiración corta.
* Rotación de secretos.
* Principio de mínimo privilegio.
* Cifrado de datos sensibles.
* Enmascaramiento en logs.
* Revisión de seguridad en cambios de autenticación, riesgo y auditoría.

## Criterio

La seguridad no puede depender solo del canal de entrada. En una arquitectura distribuida, cada servicio debe validar quién lo llama, qué puede hacer y qué datos puede consultar.
