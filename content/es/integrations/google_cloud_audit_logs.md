---
categories:
- nube
- google cloud
- recopilación de logs
- seguridad
custom_kind: integración
dependencies: []
description: Visualiza el dashboard de logs de auditoría.
doc_link: ''
draft: false
git_integration_title: logs_auditoría_google_cloud
has_logo: true
integration_id: logs_auditoría_google_cloud
integration_title: Dashboard de logs de auditoría Google en Datadog
integration_version: ''
is_public: true
manifest_version: '1.0'
name: logs_auditoría_google_cloud
public_title: Dashboard de logs de auditoría Google en Datadog
short_description: Visualiza el dashboard de logs de auditoría.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

La monitorización de logs de auditoría de GCP permite comprender mejor quién accede a un recurso, cómo lo hace y si el acceso estaba permitido o no.

Existen cuatro tipos de logs de auditoría.
* **Logs de auditoría de eventos del sistema**: Generados por defecto por GCP, los logs de auditoría de eventos del sistema contienen entradas de log de acciones de Google Cloud que modifican la configuración de los recursos. Los logs de auditoría de eventos del sistema son generados por los sistemas de Google, no son guiados por la acción directa del usuario.
* **Logs de auditoría de la actividad del administrador**: Generados por defecto por GCP, los logs de auditoría de la actividad del administrador contienen entradas de log de llamadas a la API u otras acciones que modifican la configuración o los metadatos de los recursos. Por ejemplo, estos logs registran cuando los usuarios crean instancias de máquina virtual (VM) o cambian los permisos de gestión de identidad y acceso.
* **Logs de auditoría del acceso a datos**: [Habilitados por separado][1] para cada recurso, los logs de auditoría del acceso a datos contienen llamadas a la API que leen la configuración o los metadatos de los recursos, así como las llamadas a la API dirigidas por el usuario que crean, modifican o leen datos de recursos proporcionados por el usuario. Los logs de auditoría del acceso a datos no registran las operaciones de acceso a los datos en recursos que se comparten públicamente.
* **Logs de auditoría denegados por políticas**: Generados de forma predeterminada, la generación de logs en la nube registra los logs de auditoría denegados por políticas cuando el servicio Google Cloud deniega el acceso a un usuario o [cuenta de servicio][2] debido a la infracción de una política de seguridad.

Puedes reenviar estos logs a través de un tema Pub/Sub utilizando las [instrucciones de recopilación de logs][3] de la página de la integración Google Cloud Platform.

Para obtener más información, consulta [Comprender logs de auditoría][4] o [Prácticas recomendadas para la monitorización de logs de auditoría de GCP][5].

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][6].

[1]: https://cloud.google.com/logging/docs/audit/configure-data-access
[2]: https://cloud.google.com/iam/docs/service-accounts
[3]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[4]: https://cloud.google.com/logging/docs/audit/understanding-audit-logs
[5]: https://www.datadoghq.com/blog/monitoring-gcp-audit-logs/
[6]: https://docs.datadoghq.com/es/help/