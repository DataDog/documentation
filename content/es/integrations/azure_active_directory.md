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
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/azure_active_directory/README.md
display_on_public_website: true
draft: false
git_integration_title: azure_active_directory
integration_id: azure-active-directory
integration_title: Azure Active Directory
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_active_directory
public_title: Azure Active Directory
short_description: Analizar tus logs de actividad de Azure Active Directory
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
  configuration: README.md#Instalación
  description: Analizar tus logs de actividad de Azure Active Directory
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Active Directory
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-core -->


## Información general

Azure Active Directory es una oferta de Active Directory alojada en la nube de Microsoft Azure.
Esta integración te permite ingerir tus [logs de actividad de Azure AD][1] (logs de auditoría e inicio de sesión) a Datadog.

## Configuración

### Instalación

Esta integración reenvía logs a Datadog utilizando Azure con centros de eventos. Configura Azure AD para reenviar logs de actividad al centro de eventos.

### Configuración

1. Configura el pipeline de reenvío de logs desde Azure a Datadog utilizando centros de eventos siguiendo la guía [Enviar logs de Azure a Datadog][2].

2. En el portal de Azure, selecciona _Azure Active Directory > Monitoriing > Audit logs_.

3. Selecciona **Exportar configuración**.

4. En el panel de configuración de Diagnóstico, realiza una de las siguientes acciones:

   - Para modificar la configuración existente, selecciona **Editar configuración**.
   - Para añadir configuraciones nuevas, selecciona **Añadir configuración de diagnóstico**. Puedes tener hasta tres configuraciones.

5. Selecciona la casilla de check **Flujo (stream) a un centro de eventos** y, a continuación, selecciona **Centro de eventos/Configurar**.

6. Selecciona la suscripción de Azure y el nombre de espacio de centros de eventos que creaste anteriormente para enrutar los Logs hacia ellos.

7. Selecciona OK para salir de la configuración del centro de eventos.

8. Realiza una de las siguientes acciones o ambas. Datadog recomienda seleccionar ambas.

   - Para enviar los logs de auditoría, selecciona la casilla de check **AuditLogs**.
   - Para enviar logs de inicio de sesión, selecciona la casilla de check **SignInLogs**.

9. Selecciona **Guardar**.

Los logs deberían empezar a entrar en Datadog en 15 minutos.
Para más detalles sobre la configuración, consulta el [Tutorial de Azure][3].

## Datos recopilados

#### Recopilación de logs

Esta integración permite configurar la ingesta de logs para los logs de actividad de Azure Active Directory.

Esto incluye lo siguiente:

   - Inicios de sesión: Proporciona información sobre el uso de las aplicaciones gestionadas y las actividades de inicio de sesión de los usuarios.

   - Logs de auditoría: Proporciona trazabilidad a través de logs para todos los cambios realizados por diversas funciones en Azure AD.  

### Métricas

Azure Active Directory no incluye ninguna métrica.

### Eventos

Datadog envía los eventos de caducidad de credenciales, que ofrecen visibilidad sobre la caducidad de credenciales para registros de aplicaciones de Azure, claves de Key Vault, secretos de Key Vault y certificados de Key Vault. La integración de Azure Active Directory debe estar instalada para recibir eventos para los registros de aplicaciones de Azure. La recepción de eventos de Azure también requiere la instalación de la [integración de Azure][4].


- Los **Eventos de caducidad** se envían 60, 30, 15 y 1 día antes de la caducidad de las credenciales y una vez después de la caducidad.
- Los **Eventos de permisos faltantes** se envían cada 15 días. Un evento de permisos faltantes enumera las Key Vaults para las cuales Datadog no ha recibido permisos. Si no se han realizado cambios en relación con los permisos de Key Vault en el ciclo anterior de 15 días, la notificación del evento notificación no se vuelve a enviar.

Puedes consultar estos eventos en el Explorador de eventos][5].

**Notas**:

- Para recopilar los eventos de caducidad del registro de aplicaciones Azure, [habilita el acceso a la API Microsoft Graph][6].
- Si un certificado y su clave y secreto asociados caducan exactamente al mismo tiempo, se envía un único evento de caducidad para todos los recursos.

## Solucionar problemas

¿Necesita ayuda? Ponte en contacto con [Soporte técnico de Datadog][7].

[1]: https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/overview-reports#activity-reports
[2]: https://docs.datadoghq.com/es/logs/guide/azure-logging-guide/
[3]: https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/tutorial-azure-monitor-stream-logs-to-event-hub
[4]: https://docs.datadoghq.com/es/integrations/azure/
[5]: https://app.datadoghq.com/event/explorer
[6]: https://docs.datadoghq.com/es/integrations/guide/azure-graph-api-permissions/
[7]: https://docs.datadoghq.com/es/help