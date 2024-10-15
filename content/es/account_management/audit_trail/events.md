---
aliases:
- /es/account_management/audit_trail_events/
further_reading:
- link: /account_management/audit_trail/
  tag: Documentación
  text: Obtén más información sobre Audit Trail
title: Eventos de Audit Trail
---

## Información general

[Audit Trail de Datadog][1] registra más de 100 tipos de eventos de auditoría de toda la plataforma Datadog. Estos eventos se clasifican en diferentes categorías de productos, en forma de nombres de eventos.

#### Eventos de plataforma
- [Gestión del acceso](#access-management-events)
- [Agent](#Agent)
- [Solicitud de API](#api-request-events)
- [Autenticación](#authentication-events)
- [Dashboard](#dashboard-events)
- [Integración](#integration-events)
- [Monitor](#monitor-events)
- [Notebook](#notebook-events)
- [OAuth](#oauth-events)
- [Gestión de organizaciones](#organization-management-events)
- [Notificaciones de seguridad](#security-notification-events)
- [Gestión de equipos](#teams-management-events)

#### Eventos específicos de productos
- [Application Performance Monitoring (APM)](#application-performance-monitoring-apm-events)
- [Application Security Management (ASM)](#application-security-management)
- [Audit Trail](#audit-trail-events)
- [CI Visibility](#ci-visibility-events)
- [Plataforma de seguridad en la nube](#cloud-security-platform-events)
- [Instrumentación dinámica](#dynamic-instrumentation-events)
- [Seguimiento de errores](#error-tracking-events)
- [Log Management](#log-management-events)
- [Métricas](#metrics-events)
- [Real User Monitoring](#real-user-monitoring-events)
- [Sensitive Data Scanner](#sensitive-data-scanner-events)
- [Objetivos de nivel de servicio (SLOs)](#service-level-objectives-slo-events)
- [Monitorización Synthetic](#synthetic-monitoring-events)
- [Tablas de referencias](#reference-table-events)
- [Flujos de trabajo](#workflow-eventos)


Consulta la [documentación de Audit Trail][2] para obtener más información sobre cómo instalar y configurar Audit Trail.

## Eventos de auditoría

### Eventos de gestión de acceso

| Nombre        | Descripción del evento de auditoría                                          | Consultar el navegador de auditorías                           |
| ----------- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Clave de aplicación][3] (Usuario de cuenta de servicio) | Un usuario ha creado, modificado o eliminado una clave de aplicación para un usuario de cuenta de servicio. | `@evt.name:"Access Management" @asset.type:application_key` |
| [Métodos de autenticación][4] (Organización) | Un usuario ha modificado los métodos de autenticación autorizados para una organización, así como los valores anteriores y nuevos. | `@evt.name:"Access Management" @asset.type:identity_provider` |
| [Correo electrónico][5]       | Se ha añadido, deshabilitado o verificado un correo electrónico en la cuenta de Datadog como usuario de la cuenta. | `@evt.name:"Access Management" @asset.type:user` |
| [Rol modificado][6]  | Se ha modificado un rol, así como los permisos anteriores y nuevos. | `@evt.name:"Access Management" @asset.type:role @action:modified` |
| [Rol creado o eliminado][7] | Se ha creado o eliminado un rol en la organización. | `@evt.name:"Access Management" @asset.type:role @action:(created OR deleted)` |
| [Solicitud de acceso a un rol][8] | Un usuario ha creado, respondido o eliminado una solicitud de acceso a un rol, así como el valor de la solicitud de acceso. | `@evt.name:"Access Management" @asset.type:role_request` |
| [Rol del usuario][6] | Se ha añadido o eliminado un usuario de un rol en la organización. | `@evt.name:"Access Management" @asset.type:role @action:modified` |
| [Contraseña][9] | Un usuario ha modificado su contraseña en la organización. | `@evt.name:"Access Management" @asset.type:password @action:modified` |
| [Política de restricción][10] | Se ha modificado una política de restricción para un recurso. | `@evt.name:"Access Management" @asset.type:restriction_policy @action:(modified OR deleted)` |
| [Actualización de correo electrónico (Asistencia)][11] | El servicio de asistencia de Datadog ha actualizado el correo electrónico de un usuario. | `@evt.name:"Access Management" @evt.actor.type:SUPPORT_USER @asset.type:user @action:modified` |
| [Invitación de usuario (Asistencia)][12] | El servicio de asistencia de Datadog ha invitado a un usuario a la organización. | `@evt.name:"Access Management" @evt.actor.type:SUPPORT_USER @asset.type:user @action:created` |
| [Rol del usuario (Asistencia)][100] | El servicio de asistencia de Datadog ha añadido o eliminado un usuario de un rol en la organización. | `@evt.name:"Access Management" @evt.actor.type:SUPPORT_USER @asset.type:role @action:modified` |
| [Rol modificado (Asistencia)][101] | El servicio de asistencia de Datadog ha modificado un rol, así como los permisos anteriores y nuevos. | `@evt.name:"Access Management" @evt.actor.type:SUPPORT_USER @asset.type:role @action:modified` |

### Agent

| Nombre                                    | Descripción de un evento de auditoría                          | Consultar el navegador de auditorías                                             |
|-----------------------------------------| --------------------------------------------------  | ------------------------------------------------------------------- |
| [Agent habilitado][13]                    | Se ha habilitado un nuevo Datadog Agent.                    | `@evt.name:"Datadog Agent" @action:created`                         |
| [Flare del Agent creado][14]               | Se ha creado un flare de Datadog Agent para los tickets de asistencia. | `@evt.name:"Datadog Agent" @action:created @asset.type:agent_flare` |
| [Configuración del Agent actualizada][15]      | Se ha actualizado una configuración del Datadog Agent.          | `@evt.name:"Datadog Agent" @action:modified`                        |


### Eventos de solicitud de API

| Nombre  | Descripción del evento de auditoría                          | Consultar el navegador de auditorías              |
|-------------| --------------------------------------------------  | ------------------------------------ |
| [Solicitud de API][16] | Se ha enviado una solicitud de API en algún lugar de la plataforma Datadog. | `@evt.name:Request @action:accessed` |

### Eventos de Application Performance Monitoring (APM)
| Nombre | Descripción del evento de auditoría                                          | Consultar el navegador de auditorías                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Filtro de retención][17] | Un usuario ha creado, modificado o eliminado un [filtro de retención][18], así como los valores anteriores o nuevos de la configuración del filtro de retención. | `@evt.name:APM @asset.type:retention_filter` |
| [Métrica basada en tramos (spans)][19] | Un usuario ha creado, modificado o eliminado una [métrica basada en tramos][20], así como los valores anteriores o nuevos de configuración de la métrica. | `@evt.name:APM @asset.type:custom_metrics` |
| [Faceta][21] | Un usuario ha creado, modificado o eliminado una [faceta][22], así como los valores anteriores o nuevos de configuración de la faceta. | `@evt.name:APM @asset.type:facet` |
| [Nombre de la operación principal][23] | Un usuario ha creado, modificado o eliminado el [nombre de la operación principal][24] de un servicio, así como los valores de configuración anteriores o nuevos. | `@evt.name:APM @asset.type:service_operation_name` |
| [Segunda etiqueta (tag) principal][25] | Un usuario ha añadido, modificado o eliminado la [segunda etiqueta principal][26], así como los valores de configuración anteriores o nuevos.  | `@evt.name:APM @asset.type:second_primary_tag` |
| [Frecuencias de muestreo configuradas de forma remota][27] | Un usuario ha configurado las frecuencias de muestreo de APM de forma remota.  | `@evt.name:APM @asset.type:samplerconfig` |

### Application Security Management

{{% audit-trail-asm %}}

### Eventos de Audit Trail

| Nombre  | Descripción del evento de auditoría                          | Consultar el navegador de auditorías              |
|-------------| --------------------------------------------------  | ------------------------------------ |
| [Descargar como CSV][28] | Un usuario exporta la lista de eventos de auditoría como CSV | `@evt.name:Audit Trail @asset.type:audit_events_csv` |

### Eventos de autenticación

| Nombre                    | Descripción del evento de auditoría                                                                    | Consultar el navegador de auditorías                                 |
|--------------------------------| --------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [Clave de API][29] (Parámetros de organización)         | Se ha accedido, listado, creado o eliminado una clave de API en la página Organization Settings (Parámetros de organización).        | `@evt.name:Authentication @asset.type:api_key`          |
| [Clave de aplicación][30] (Parámetros de organización) | Se ha accedido, listado, creado o eliminado una clave de aplicación en la página Organization Settings (Parámetros de organización).| `@evt.name:Authentication @asset.type:application_key`  |
| [Clave de API pública][31] (Parámetros de organización)  | Se ha accedido, listado, creado o eliminado una clave de API pública en la página Organization Settings (Parámetros de organización).  | `@evt.name:Authentication @asset.type:public_api_key`   |
| [Inicio de sesión de usuario][32]                     | Un usuario inicia sesión en Datadog y sigue el método de autenticación utilizado.                                  | `@evt.name:Authentication @action:login`                |

### Eventos de CI Visibility
| Nombre                            | Descripción del evento de auditoría                                   | Consultar el navegador de auditorías                                                                                               |
|---------------------------------|--------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| [Rama por defecto del repositorio][33] | Un usuario ha modificado la rama por defecto de un repositorio.          | `@evt.name:"CI Visibility" @asset.type:ci_app_repository @action:modified`                                            |
| [Parámetros del servicio de test][34]     | Un usuario ha creado o modificado los parámetros del servicio de test.   | `@evt.name:"CI Visibility" @asset.type:ci_app_test_service_settings (@action:created OR @action:modified)`            |
| [Configuración de la cuenta de GitHub][35]   | Un usuario ha modificado la configuración de la cuenta de GitHub.             | `@evt.name:"CI Visibility" @asset.type:github_opt_ins (@action:modified OR @action:deleted)`                          |
| [Filtros de exclusión][36]         | Se han modificado los filtros de exclusión.                    | `@evt.name:"CI Visibility" @asset.type:ci_app_exclusion_filters @action:modified`                                     |
| [Regla de las pruebas de calidad][37]        | Un usuario ha creado, modificado o eliminado una regla de una prueba de calidad. | `@evt.name:"CI Visibility" @asset.type:ci_app_quality_gates (@action:created OR @action:modified OR @action:deleted)` |

### Eventos de la plataforma de seguridad en la nube

{{% audit-trail-security-platform %}}

### Eventos de dashboard

| Nombre               | Descripción del evento de auditoría                                                                        | Consultar el navegador de auditorías                                               |
| -------------------| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------   |
| [Dashboard creado][38] | Se ha creado un dashboard y el nuevo valor de JSON del dashboard.                                    | `@evt.name:Dashboard @asset.type:dashboard @action:created`             |
| [Dashboard eliminado][39] | Se ha eliminado un dashboard y el valor anterior de JSON del dashboard.                              | `@evt.name:Dashboard @asset.type:dashboard @action:deleted`             |
| [dashboard integrado][40] (Roadie) | Un dashboard de Datadog se ha [integrado a un tercero][41] y un usuario visualiza el dashboard.                      | `@evt.name:Dashboard @asset.type:embed @action:accessed`                |
| [dashboard modificado][42] | Se ha modificado un dashboard, así como los valores de JSON anteriores y nuevos del dashboard.                   | `@evt.name:Dashboard @asset.type:dashboard @action:modified`            |
| [usuario(s) del dashboard añadido(s)][43] | Un usuario ha añadido los ID de usuario que pueden acceder a un dashboard, así como la lista de nuevos ID de usuario.                 | `@evt.name:Dashboard @asset.type:dashboard_share_acl @action:created`   |
| [usuario(s) del dashboard eliminado(s)][44] | Un usuario ha eliminado los ID de usuario que pueden acceder a un dashboard, así como la lista de los ID de usuario eliminados.       | `@evt.name:Dashboard @asset.type:dashboard_share_acl @action:deleted`   |
| [URL pública consultada][45] | Se consulta una URL de dashboard pública.                                                               | `@evt.name:Dashboard @asset.type:dashboard @action:accessed`            |
|[URL pública generada o eliminada][46]  | Se genera o elimina una URL pública para ver un dashboard.                             | `@evt.name:Dashboard @asset.type:dashboard_share_link`            |

### Eventos de instrumentación dinámica

| Nombre     | Descripción del evento de auditoría                                          | Consultar el navegador de auditorías                           |
| -------- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Probe de logs][47] | Un usuario ha creado, modificado o eliminado correctamente un probe de logs con instrumentación dinámica. | `@evt.name:"Dynamic Instrumentation" @action:(created OR modified OR deleted) @asset.type:log_probe` |
| [Probe de métricas][48] | Un usuario ha creado, modificado o eliminado correctamente un probe de métricas con instrumentación dinámica. | `@evt.name:"Dynamic Instrumentation" @action:(created OR modified OR deleted) @asset.type:span_probe` |
| [Probe de tramos][49] | Un usuario ha creado, modificado o eliminado correctamente un probe de tramos con instrumentación dinámica. | `@evt.name:"Dynamic Instrumentation" @action:(created OR modified OR deleted) @asset.type:metric_probe` |

### Eventos de seguimiento de errores

| Nombre     | Descripción del evento de auditoría                                          | Consultar el navegador de auditorías                           |
| -------- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Seguimiento de errores para la activación de logs][50] | Un usuario ha habilitado o deshabilitado el seguimiento de errores para la generación de logs. | `@evt.name:"Error Tracking" @action:(created OR deleted) @asset.type:error_tracking_logs` |
| [Crear o modificar el filtro de inclusión][51] | Un usuario ha añadido o modificado un filtro de inclusión. | `@evt.name:"Error Tracking" @asset.type:error_tracking_inclusion_filter` |

### Eventos de integración

| Nombre     | Descripción del evento de auditoría                                          | Consultar el navegador de auditorías                           |
| -------- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Recurso][52] | Cada vez que se añade, modifica o elimina un recurso (canal, servicio, webhook, cuenta, instancia, etc.) de una integración, así como los valores de configuración anteriores y nuevos. | `@evt.name:Integration @asset.type:integration` |

### Eventos de Log Management
| Nombre | Descripción del evento de auditoría                                          | Consultar el navegador de auditorías                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Configuración de archivos][53] | Un usuario ha creado, modificado o eliminado la configuración de un archivo, así como los valores de configuración anteriores y nuevos. | `@evt.name:"Log Management" @asset.type:archive` |
| [Métrica personalizada][54] | Un usuario ha creado, modificado o eliminado una métrica personalizada para logs, así como los valores de configuración anteriores y nuevos de la métrica personalizada. | `@evt.name:"Log Management" @asset.type:"custom metric"` |
| [Configuración del filtro de exclusión][55] | Un usuario ha creado, modificado o eliminado la configuración de un filtro de exclusión, así como los valores de configuración anteriores y nuevos. | `@evt.name:"Log Management" @asset.type:"exclusion filter"` |
| [Faceta][56] | Un usuario ha creado, modificado o eliminado una faceta en el navegador de logs. así como los valores de configuración anteriores y nuevos de la faceta.| `@evt.name:"Log Management" @asset.type:facet` |
| [Vista del historial][57] | Un usuario ha creado, modificado, cancelado o eliminado una vista de historial de logs, así como los valores de configuración anteriores y nuevos de la vista del historial. | `@evt.name:"Log Management" @asset.type:historical_view` |
| [Configuración del índice][58] | Un usuario ha creado, modificado o eliminado la configuración de un índice, así como los valores de configuración anteriores y nuevos. | `@evt.name:"Log Management" @asset.type:index` |
| [Pipeline de logs][59] | Un usuario ha creado, modificado o eliminado un pipeline de logs o un pipeline anidado, así como los valores de configuración anteriores y nuevos. | `@evt.name:"Log Management" @asset.type:pipeline` |
| [Procesador][60] | Un usuario ha creado, modificado o eliminado un procesador en un pipeline, así como los valores de configuración anteriores y nuevos. | `@evt.name:"Log Management" @asset.type:pipeline_processor` |
| [Consulta][61] (Beta pública)| Un usuario ha ejecutado una consulta de la lista de Log Management en el explorador de logs, los dashboards o a través de la API pública. | `@evt.name:"Log Management" @asset.type:logs_query` |
| [Configuración de consultas de restricción][62] | Un usuario ha creado, modificado o eliminado la configuración de una consulta de restricción en logs, así como los valores de configuración anteriores y nuevos. | `@evt.name:"Log Management" @asset.type:restriction_query` |
| [Configuración de atributos estándar][63] | Un usuario ha creado, modificado o eliminado la configuración de un atributo estándar en logs, así como los valores de configuración anteriores y nuevos. | `@evt.name:"Log Management" @asset.type:standard_attribute` |
| [Descargar como CSV][64] | Un usuario exporta una lista de logs como CSV | `@evt.name:"Log Management" @asset.type:logs_csv` |

### Eventos de métricas
| Nombre | Descripción del evento de auditoría                                          | Consultar el navegador de auditorías                           |
| ---- |------------------------------------------------------------------- | --------------------------------------------------|
| [Métrica personalizada creada][65] | Un usuario ha creado una métrica personalizada, así como el nuevo valor de configuración de la métrica personalizada. | `@evt.name:Metrics @asset.type:metric @action:created` |
| [Métrica personalizada eliminada][66] | Un usuario ha eliminado una métrica personalizada, así como el anterior valor de configuración de la métrica personalizada. | `@evt.name:Metrics @asset.type:metric @action:deleted` |
| [Métrica personalizada modificada][67] | Un usuario ha modificado una métrica personalizada, así los valores de configuración anteriores y nuevos de la métrica personalizada. | `@evt.name:Metrics @asset.type:metric @action:modified` |

### Eventos de monitor

| Nombre             | Descripción de eventos de auditoría                                           | Consultar el navegador de auditorías                                  |
| ---------------- | -------------------------------------------------------------------- | ---------------------------------------------------------|
| [Monitor creado][68]  | Se crea un monitor y el nuevo valor de JSON del monitor.                 | `@evt.name:Monitor @asset.type:monitor @action:created`  |
| [Monitor eliminado][69]  | Se elimina un monitor y el anterior valor de JSON del monitor.           | `@evt.name:Monitor @asset.type:monitor @action:deleted`  |
| [Monitor modificado][70] | Se modifica un monitor y los valores anteriores y nuevos de JSON del monitor. | `@evt.name:Monitor @asset.type:monitor @action:modified` |
| [Monitor resuelto][71] | Se resuelve un monitor.                                               | `@evt.name:Monitor @asset.type:monitor @action:resolved` |

### Eventos de Notebook

| Nombre              | Descripción del evento de auditoría                                            | Consultar el navegador de auditorías                                     |
| ----------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- |
| [Notebook creado][72]  | Se crea un notebook y el nuevo valor de JSON del notebook.                 | `@evt.name:Notebook @asset.type:notebook @action:created`   |
| [Notebook eliminado][73]  | Se elimina un notebook y el anterior valor de JSON del notebook.           | `@evt.name:Notebook @asset.type:notebook @action:deleted`   |
| [Notebook modificado][74] | Se modifica un notebook y los valores anteriores y nuevos de JSON del notebook. | `@evt.name:Notebook @asset.type:notebook @action:modified`  |

### Eventos de OAuth

| Nombre         | Descripción del evento de auditoría                                                                    | Consultar el navegador de auditorías                  |
| ------------ | --------------------------------------------------------------------------------------------- | -----------------------------------------|
| [Cliente de OAuth][75] | Un usuario ha creado, modificado o eliminado un cliente de OAuth, así como los valores anteriores y nuevos del cliente de OAuth. | `@evt.name:OAuth @asset.type:oauth_client` |

### Eventos de gestión de organizaciones

| Nombre                 | Descripción del evento de auditoría                                                       | Consultar el navegador de auditorías                                           |
| -------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------|
| [Configuración de Audit Trail][76] | Un usuario ha modificado los parámetros de Audit Trail, así como los parámetros anteriores y nuevos. | `@evt.name:"Organization Management" @asset.type:audit_logs_settings` |
| [Organización secundaria creada][77] | Un usuario ha creado una nueva organización secundaria para una organización existente en Datadog. | `@evt.name:"Organization Management" @asset.type:organization @action:created` |

### Eventos de Real User Monitoring (RUM)
| Nombre | Descripción del evento de auditoría                                          | Consultar el navegador de auditorías                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Solicitud RUM creada][78] | Un usuario ha creado o eliminado una aplicación en RUM, así como el tipo de aplicación (Navegador, Flutter, iOS, React Native, Android). | `@evt.name:"Real User Monitoring" @asset.type:real_user_monitoring_application @action:(created OR deleted)` |
| [Solicitud RUM modificada][79] | Un usuario ha modificado una aplicación en RUM, el nuevo valor de la aplicación y el tipo de aplicación (Navegador, Flutter, iOS, React Native, Android). | `@evt.name:"Real User Monitoring" @asset.type:real_user_monitoring_application @action:modified` |
| [Repetición de sesión visualizada][80] | Un usuario ha visualizado una repetición de sesión. | `@evt.name:"Real User monitoring" @asset.type:session_replay @action:accessed` |

### Eventos de notificaciones de seguridad
| Nombre                 | Descripción del evento de auditoría                                                       | Consultar el navegador de auditorías                                           |
| -------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------|
| [Token filtrado][81] | Datadog ha detectado una clave de API o de aplicación de Datadog filtrada que debería revocarse.| `@evt.name:"Security Notification" @asset.type:(api_key OR application_key) @action:notification` |
| [Anulación del método de inicio de sesión][82] | Datadog ha detectado una anulación del método de inicio de sesión de usuario que es diferente de los métodos de inicio de sesión predeterminados establecidos para la organización.| `@evt.name:"Security Notification" @asset.type:user @action:notification` |
| [Inicio de sesión inusual][83] | Datadog ha detectado un evento de inicio de sesión inusual.| `@evt.name:"Security Notification" @asset.type:unusual_login @action:notification` |
| [Usuario invitado mediante correo electrónico desechable][102] | Datadog ha detectado que un usuario con un correo electrónico de un proveedor de correo gratuito o desechable ha sido invitado a la organización.| `@evt.name:"Security Notification" @asset.type:user_invite @action:notification` |

### Eventos de Sensitive Data Scanner
| Nombre | Descripción del evento de auditoría                                          | Consultar el navegador de auditorías                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Grupo de análisis][84] | Un usuario ha creado, modificado o eliminado un grupo de análisis en Sensitive Data Scanner, así como los valores de configuración anteriores y nuevos. | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_group` |
| [Regla de análisis][85] | Un usuario ha creado, modificado o eliminado una regla de análisis de un grupo de análisis en Sensitive Data Scanner, así como los valores de configuración anteriores y nuevos. | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_rule` |

### Eventos de objetivos de nivel de servicio (SLOs)

| Nombre          | Descripción del evento de auditoría                                                                       | Consultar el navegador de auditorías                  |
| ------------- | ------------------------------------------------------------------------------------------------ | -----------------------------------------|
| [SLO][86]           | Un usuario crea, modifica o elimina un SLO, así como los valores anteriores y nuevos del SLO.| `@evt.name:SLO @asset.type:slo`            |
| [Corrección de SLO][87]| Un usuario crea, modifica o elimina una corrección de SLO, así como los valores anteriores y nuevos de la corrección de SLO. | `@evt.name:SLO @asset.type:slo_correction` |


### Eventos de monitorización de Synthetic
| Nombre                     | Descripción del evento de auditoría                                          | Consultar el navegador de auditorías                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [Ubicación privada][88] | Un usuario ha creado o eliminado una ubicación privada para tests de Synthetic. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_private_location` |
| [Test de Synthetic creado o eliminado][89] | Un usuario ha creado o eliminado un test de Synthetic. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:(created OR deleted)` |
| [Test de Synthetic modificado][90] | Un usuario ha modificado un test de Synthetic, así como los valores de configuración anteriores y nuevos. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:modified` |
| [Variable de Synthetic][91] | Un usuario ha creado, modificado o eliminado una variable de Synthetic. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_variable` |
| [Configuración de Synthetic][92] | Un usuario ha modificado la configuración de Synthetic (cuotas, acceso a localizaciones privadas), así como los valores de configuración anteriores y nuevos. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_settings @action:modified` |

### Eventos de la tabla de referencia
| Nombre                     | Descripción del evento de auditoría                                          | Consultar el navegador de auditorías                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [Tabla de referencia][93] | Un usuario creó, eliminó o modificó una tabla de referencia. | `@evt.name:"Reference Tables" @asset.type:reference_table @action:(created OR deleted OR modified)` |
| [Archivo de tabla de referencia][94] | Un usuario cargó o importó un archivo con un proveedor de nube para una tabla de referencia. | `@evt.name:"Reference Tables" @asset.type:reference_table_file @action:(uploaded OR imported)` |                                                      |

### Eventos de gestión de equipos
| Nombre                     | Descripción del evento de auditoría                                          | Consultar el navegador de auditorías                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [Gestión de equipos][95] | Un usuario ha creado, eliminado o modificado un equipo o una asociación de equipos. | `@evt.name:"Teams Management" @action:(created OR deleted OR modified)` |

### Eventos de flujo de trabajo
| Nombre                     | Descripción del evento de auditoría                                          | Consultar el navegador de auditorías                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [Flujo de trabajo][96] | Un usuario ha creado, eliminado o modificado un flujo de trabajo, o se ha ejecutado un flujo de trabajo. | `@evt.name:"Workflows" @asset.type:workflow @action:(created OR deleted OR modified OR executed)` |
| [Planificación de flujo de trabajo][97] | Un usuario ha creado, eliminado o modificado una planificación de un flujo de trabajo. | `@evt.name:"Workflows" @asset.type:workflow_schedule @action:(created OR deleted OR modified)` |
| [Acción de flujo de trabajo][98] | Un usuario ha respondido a una notificación de Slack durante la ejecución de un flujo de trabajo. | `@evt.name:"Workflows" @asset.type:workflow_action @action:(responded)` |
| [Conexión personalizada][99] | Un usuario ha creado, eliminado o modificado una conexión. | `@evt.name:"Custom Connections" @asset.type:custom_connection @action:(created OR deleted OR modified)` |

## Lectura adicional

{{< nombre parcial="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit-trail
[2]: /es/account_management/audit_trail/
[3]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Aapplication_key
[4]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Aidentity_provider
[5]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Auser
[6]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arole%20%40action%3Amodified
[7]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arole%20%40action%3A%28created%20OR%20deleted%29
[8]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arole_request
[9]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Apassword%20%40action%3Amodified
[10]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arestriction_policy
[11]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40evt.actor.type%3ASUPPORT_USER%20%40asset.type%3Auser%20%40action%3Amodified%20
[12]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40evt.actor.type%3ASUPPORT_USER%20%40asset.type%3Auser%20%40action%3Acreated%20
[13]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Datadog%20Agent%22%20%40action%3Acreated%20
[14]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Datadog%20Agent%22%20%40asset.type%3Aagent_flare%20%40action%3Acreated
[15]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Datadog%20Agent%22%20%40action%3Amodified%20
[16]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ARequest%20%40action%3Aaccessed
[17]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Aretention_filter
[18]: /es/tracing/trace_pipeline/trace_retention/#retention-filters
[19]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Acustom_metrics
[20]: /es/tracing/trace_pipeline/generate_metrics/
[21]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Afacet
[22]: /es/tracing/trace_explorer/facets/
[23]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Aservice_operation_name
[24]: /es/tracing/guide/configuring-primary-operation/
[25]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Asecond_primary_tag
[26]: /es/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[27]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAPM%20%40asset.type%3Asamplerconfig
[28]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Audit%20Trail%22%20%40asset.type%3Aaudit_events_csv
[29]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Aapi_key
[30]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Aapplication_key
[31]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Apublic_api_key
[32]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40action%3Alogin
[33]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI%20Visibility%22%20%40asset.type%3Aci_app_repository%20%40action%3Amodified
[34]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI%20Visibility%22%20%40asset.type%3Aci_app_test_service_settings%20%28%40action%3Acreated%20OR%20%40action%3Amodified%29
[35]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI%20Visibility%22%20%40asset.type%3Agithub_opt_ins%20%28%40action%3Amodified%20OR%20%40action%3Adeleted%29
[36]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI%20Visibility%22%20%40asset.type%3Aci_app_exclusion_filters%20%40action%3Amodified
[37]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI%20Visibility%22%20%40asset.type%3Aci_app_quality_gates%20%28%40action%3Acreated%20OR%20%40action%3Amodified%20OR%20%40action%3Adeleted%29
[38]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Acreated
[39]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Adeleted
[40]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Aembed%20%40action%3Aaccessed
[41]: https://roadie.io/docs/integrations/datadog/
[42]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Amodified
[43]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_acl%20%40action%3Acreated
[44]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_acl%20%40action%3Adeleted
[45]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Aaccessed
[46]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_link
[47]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Dynamic%20Instrumentation%22%20%40asset.type%3Alog_probe
[48]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Dynamic%20Instrumentation%22%20%40asset.type%3Ametric_probe
[49]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Dynamic%20Instrumentation%22%20%40asset.type%3Aspan_probe
[50]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Error%20Tracking%22%20%40asset.type%3Aerror_tracking_logs%20%40action%3A%28created%20OR%20deleted%29
[51]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Error%20Tracking%22%20%40asset.type%3Aerror_tracking_inclusion_filter
[52]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AIntegration%20%40asset.type%3Aintegration
[53]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Aarchive
[54]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3A%22custom%20metric%22
[55]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3A%22exclusion%20filter%22
[56]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Afacet
[57]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Ahistorical_view
[58]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Aindex
[59]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Apipeline
[60]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Apipeline_processor
[61]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Alogs_query
[62]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Arestriction_query
[63]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Astandard_attribute
[64]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Alogs_csv
[65]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Acreated
[66]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Adeleted
[67]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Amodified
[68]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Acreated
[69]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Adeleted
[70]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Amodified
[71]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Aresolved
[72]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Acreated
[73]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Adeleted
[74]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Amodified
[75]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AOAuth%20%40asset.type%3Aoauth_client
[76]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Organization+Management%22+%40asset.type%3Aaudit_logs_settings
[77]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Organization%20Management%22%20%40asset.type%3Aorganization%20%40action%3Acreated
[78]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Real%20User%20Monitoring%22%20%40asset.type%3Areal_user_monitoring_application%20%40action%3A%28created%20OR%20deleted%29
[79]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%E2%80%9CReal%20User%20Monitoring%E2%80%9D%20%40asset.type%3Areal_user_monitoring_application%20%40action%3Amodified
[80]: https://app.datadoghq.com/audit-trail?query=%40asset.type%3Asession_replay%20%40evt.name%3A%22Real%20User%20Monitoring%22%20%40action%3Aaccessed%20
[81]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Security%20Notification%22%20%40asset.type%3A%28api_key%20OR%20application_key%29
[82]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Security%20Notification%22%20%40action%3Anotification%20%40asset.type%3Auser
[83]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Security%20Notification%22%20%40action%3Anotification%20%40asset.type%3Aunusual_login
[84]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Sensitive%20Data%20Scanner%22%20%40asset.type%3Asensitive_data_scanner_scanning_group
[85]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Sensitive%20Data%20Scanner%22%20%40asset.type%3Asensitive_data_scanner_scanning_rule
[86]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ASLO%20%40asset.type%3Aslo
[87]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ASLO%20%40asset.type%3Aslo_correction
[88]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_private_location
[89]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_test%20%40action%3A%28created%20OR%20deleted%29
[90]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_test%20%40action%3Amodified
[91]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_variable
[92]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_settings%20%40action%3Amodified
[93]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Reference%20Tables%22%20%40asset.type%3Areference_table%20%40action%3A%28created%20OR%20deleted%20OR%20modified%29
[94]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Reference%20Tables%22%20%40asset.type%3Areference_table%20%40action%3A%28uploaded%20OR%20imported%29
[95]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Teams%20Management%22%20%40action%3A%28created%20OR%20deleted%20OR%20modified%29
[96]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AWorkflows%20%40asset.type%3Aworkflow%20%40action%3A%28modified%20OR%20created%20OR%20deleted%20OR%20executed%29
[97]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AWorkflows%20%40asset.type%3Aworkflow_schedule%20%40action%3A%28modified%20OR%20created%20OR%20deleted%29
[98]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AWorkflows%20%40asset.type%3Aworkflow_action%20%40action%3Aresponded
[99]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Custom%20Connections%22%20%40asset.type%3Acustom_connection
[100]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40evt.actor.type%3ASUPPORT_USER%20%40asset.type%3Arole%20%40action%3Amodified%20
[101]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40evt.actor.type%3ASUPPORT_USER%20%40asset.type%3Arole%20%40action%3Amodified%20
[102]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Security%20Notification%22%20%40action%3Anotification%20%40asset.type%3Auser_invite