---
app_id: azure-active-directory
app_uuid: 8c4717a8-93f0-4de6-b79b-1e7f52c94895
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10106
    source_type_name: Azure Active Directory
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- nube
- recopilación de logs
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/azure_active_directory/README.md
display_on_public_website: true
draft: false
git_integration_title: azure_active_directory
integration_id: azure-active-directory
integration_title: Microsoft Entra ID
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_active_directory
public_title: Microsoft Entra ID
short_description: Analizar tus logs de actividad de Microsoft Entra ID
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Log Collection
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Configuración
  description: Analizar tus logs de actividad de Microsoft Entra ID
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Microsoft Entra ID
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-core -->


## Información general

Microsoft Entra ID es un servicio de gestión de identidades y accesos alojado en la nube que permite a los usuarios acceder a recursos externos.
Esta integración te permite reenviar tus logs de auditoría e inicio de sesión de [Microsoft Entra ID][1] a Datadog.

## Configuración

### Instalación

Esta integración reenvía logs a Datadog utilizando Azure con Event Hubs. Configura Entra ID para reenviar logs de actividad al centro de eventos.

### Configuración

1. Configura el pipeline de reenvío de logs desde Azure a Datadog utilizando centros de eventos siguiendo la guía [Enviar logs de Azure a Datadog][2].

2. En el portal Azure, selecciona _Microsoft Entra ID > Monitorización > Logs de auditoría_.

3. Selecciona **Configuración de datos de exportación**.

4. En el panel de configuración de Diagnóstico, realiza una de las siguientes acciones:

   - Para modificar la configuración existente, selecciona **Editar configuración**.
   - Para añadir configuraciones nuevas, selecciona **Añadir configuración de diagnóstico**. Puedes tener hasta tres configuraciones.

5. Selecciona la casilla **Transmitir a un centro de eventos**.

6. Selecciona la suscripción de Azure y el nombre de espacio de centros de eventos que creaste anteriormente para enrutar los Logs hacia ellos.

7. Realiza una de las siguientes acciones o ambas. Datadog recomienda seleccionar ambas.

   - Para enviar los logs de auditoría, selecciona la casilla de check **AuditLogs**.
   - Para enviar logs de inicio de sesión, selecciona la casilla de check **SignInLogs**.

8. Selecciona **Guardar**.

Los logs deberían empezar a entrar en Datadog en 15 minutos.
Para más detalles sobre la configuración, consulta el [Tutorial de Azure][3].

## Datos recopilados

#### Recopilación de logs

Esta integración te permite configurar la ingesta de logs para los logs de actividad de Microsoft Entra ID.

Esto incluye lo siguiente:

   - Inicios de sesión: Proporciona información sobre el uso de las aplicaciones gestionadas y las actividades de inicio de sesión de los usuarios.

   - Logs de auditoría: Proporciona trazabilidad a través de logs para todos los cambios realizados por diversas funciones en Azure AD.  

### Métricas

Microsoft Entra ID no incluye métricas.

### Eventos

Datadog envía eventos de vencimientos de credenciales, que proporcionan una visibilidad de los vencimientos de credenciales de registros de aplicaciones Azure, claves de Key Vault, secretos de Key Vault y certificados de Key Vault. La integración Microsoft Entra ID debe estar instalada para recibir eventos de registros de aplicaciones Azure. La recepción de eventos de Azure también requiere la instalación de la [integración Azure][4].


- Los **eventos de caducidad** se envían 60, 30, 15 y 1 día antes de la caducidad de las credenciales y una vez después de la caducidad.
- Los **eventos de permisos faltantes** se envían cada 15 días. Un evento de permisos faltantes enumera las Key Vaults para las cuales Datadog no ha recibido permisos. Si no se han realizado cambios en relación con los permisos de Key Vault en el ciclo anterior de 15 días, la notificación del evento no se vuelve a enviar.

Puedes consultar estos eventos en el Explorador de eventos][5].

**Notas**: 

- Para recopilar los eventos de caducidad del registro de aplicaciones Azure, [habilita el acceso a la API Microsoft Graph][6].
- Si un certificado y su clave y secreto asociados caducan exactamente al mismo tiempo, se envía un único evento de caducidad para todos los recursos.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].

[1]: https://learn.microsoft.com/entra/identity/monitoring-health/overview-monitoring-health
[2]: https://docs.datadoghq.com/es/logs/guide/azure-logging-guide/
[3]: https://learn.microsoft.com/entra/identity/monitoring-health/howto-stream-logs-to-event-hub
[4]: https://docs.datadoghq.com/es/integrations/azure/
[5]: https://app.datadoghq.com/event/explorer
[6]: https://docs.datadoghq.com/es/integrations/guide/azure-graph-api-permissions/
[7]: https://docs.datadoghq.com/es/help