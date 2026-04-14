---
aliases:
- /es/integrations/azure_active_directory
app_id: azure-active-directory
categories:
- azure
- nube
- recopilación de logs
- seguridad
custom_kind: integración
description: Analizar tus logs de actividad de Microsoft Entra ID
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Microsoft Entra ID
---
## Información general

Microsoft Entra ID es un servicio de gestión de identidad y acceso alojado en la nube que permite a los usuarios acceder a recursos externos.
Esta integración te permite reenviar tus logs de auditoría e inicio de sesión de [Microsoft Entra ID](https://learn.microsoft.com/entra/identity/monitoring-health/overview-monitoring-health) a Datadog.

## Configuración

### Instalación

Esta integración reenvía logs a Datadog utilizando Azure con Event Hubs. Configura Entra ID para reenviar logs de actividad al centro de eventos.

### Configuración

1. Configura el pipeline de reenvío de logs desde Azure a Datadog utilizando Centros de eventos, siguiendo la guía [Envío de logs de Azure a Datadog](https://docs.datadoghq.com/logs/guide/azure-logging-guide/).

1. En el portal Azure, selecciona _Microsoft Entra ID > Monitorización > Logs de auditoría_.

1. Selecciona **Configuración de datos de exportación**.

1. En el panel de configuración de Diagnóstico, realiza una de las siguientes acciones:

   - Para modificar la configuración existente, selecciona **Editar configuración**.
   - Para añadir configuraciones nuevas, selecciona **Añadir configuración de diagnóstico**. Puedes tener hasta tres configuraciones.

1. Selecciona la casilla **Transmitir a un centro de eventos**.

1. Selecciona la suscripción de Azure y el nombre de espacio de centros de eventos que creaste anteriormente para enrutar los Logs hacia ellos.

1. Realiza una de las siguientes acciones o ambas. Datadog recomienda seleccionar ambas.

   - Para enviar los logs de auditoría, selecciona la casilla de check **AuditLogs**.
   - Para enviar logs de inicio de sesión, selecciona la casilla de check **SignInLogs**.

1. Selecciona **Guardar**.

Los logs deberían empezar a llegar a Datadog en 15 minutos.
Para obtener más detalles sobre la configuración, consulta el [tutorial de Azure](https://learn.microsoft.com/entra/identity/monitoring-health/howto-stream-logs-to-event-hub).

## Datos recopilados

#### Recopilación de logs

Esta integración te permite configurar la ingesta de logs para los logs de actividad de Microsoft Entra ID.

Esto incluye lo siguiente:

- Inicios de sesión: Proporciona información sobre el uso de las aplicaciones gestionadas y las actividades de inicio de sesión de los usuarios.

- Logs de auditoría - Proporciona trazabilidad de los logs para ver todos los cambios realizados por diversas funciones dentro de Azure AD.

### Métricas

Microsoft Entra ID no incluye métricas.

### Eventos

Datadog envía eventos de expiración de credenciales, que ofrecen visibilidad de las expiraciones de credenciales para registros de aplicaciones Azure, claves de Key Vault, secretos de Key Vault y certificados de Key Vault. La integración Microsoft Entra ID debe estar instalada para recibir eventos de logs de aplicaciones Azure. La recepción de eventos de Azure también requiere la instalación de la [integración de Azure](https://docs.datadoghq.com/integrations/azure/).

- Los **eventos de caducidad** se envían 60, 30, 15 y 1 día antes de la caducidad de las credenciales y una vez después de la caducidad.
- Los **eventos de permisos faltantes** se envían cada 15 días. Un evento de permisos faltantes enumera las Key Vaults para las cuales Datadog no ha recibido permisos. Si no se han realizado cambios en relación con los permisos de Key Vault en el ciclo anterior de 15 días, la notificación del evento no se vuelve a enviar.

Puedes consultar estos eventos en el [Event Explorer](https://app.datadoghq.com/event/explorer).

**Notas**:

- Para recopilar eventos de expiración de logs de aplicaciones Azure, [habilita el acceso a la API Microsoft Graph](https://docs.datadoghq.com/integrations/guide/azure-graph-api-permissions/).
- Si un certificado y su clave y secreto asociados caducan exactamente al mismo tiempo, se envía un único evento de caducidad para todos los recursos.

## Solucionar problemas

¿Necesita ayuda? Póngase en contacto con [Datadog support](https://docs.datadoghq.com/help).