---
aliases:
- /es/tracing/software_catalog/integrations
- /es/tracing/service_catalog/integrations
- /es/service_catalog/integrations
- /es/software_catalog/integrations
further_reading:
- link: /tracing/software_catalog/service_definition_api/
  tag: Documentación
  text: Más información sobre la API de definición de servicios
- link: /integrations/opsgenie/
  tag: Documentación
  text: Más información sobre la integración de OpsGenie
- link: /integrations/pagerduty/
  tag: Documentación
  text: Más información sobre la integración en PagerDuty
title: Integraciones
---
{{% site-region region="gov" %}}
<div class="alert alert-danger">
Las integraciones de PagerDuty y de OpsGenie del portal interno de desarrolladores no son compatibles con el sitio {{< region-param key=dd_datacenter code="true" >}}.
</div>
{{% /site-region %}}

## Información general

Cuando configuras una cuenta de servicio de una [integración de Datadog][1], puedes incorporar metadatos de tus integraciones en definiciones de entidades del [Software Catalog][16]. Desde ahí, puedes utilizar el [Action Catalog][31] para consultar sistemas externos o activar acciones -como crear incidentes o actualizar tickets- sin salir de Datadog.

{{< callout url="https://forms.gle/PzXWxrnGaQPiVf9M8" d_target="#signupModal" btn_hidden="false" header="Solicitar una integración nueva" >}}
{{< /callout >}}

## Colaboración, gestión de incident (incidente) y tickets

| Integración  | Descripción    | Ejemplos de acciones (Action Catalog) |
|--------------|----------------|----------------------------------|
| [PagerDuty][2] | Añade metadatos de PagerDuty a un servicio de manera que el Software Catalog muestre y enlace con información como quién está de guardia y si hay incidentes activos de PagerDuty para el servicio. | `Get current on-call`, `Trigger incident (incidente)` <br> [Consultar todas las acciones disponibles.][32] |
| [OpsGenie][3] | Añade metadatos de OpsGenie a un servicio de manera que el Software Catalog muestre y enlace a información como quién está de guardia para el servicio. | `Acknowledge alert`, `Get current on call` <br> [Consultar todas las acciones disponibles.][33] |
| [StatusPage][4] | Crea, actualiza y recupera detalles sobre incidentes y componentes. | `Create an incident (incidente)`, `Update component status` <br> [Consultar todas las acciones disponibles.][34] |
| [Freshservice][5] | Crea, actualiza y consulte tickets de Freshservice. | `List tickets`, `Update ticket` <br> [Consultar todas las acciones disponibles.][35] |
| [Slack][6] | Envía alertas o actualizaciones de incident (incidente) a los canales de Slack y realiza la gestión de canales. | `Invite users to channel`, `Set channel topic` <br> [Consultar todas las acciones disponibles.][36] |
| [Microsoft Teams][7] | Envía mensajes o avisos a los canales de Teams para colaborar en incident (incidente). | `Make a decision`, `Send a message` <br> [Consultar todas las acciones disponibles.][37] |
| [Jira][8] | Crea y actualiza versiones directamente desde Datadog. | `Create issue`, `Add comment` <br> [Consultar todas las acciones disponibles.][38] |
| [Asana][9] | Crea y actualiza tareas de Asana, asigna usuarios y aplica etiquetas (tags). | `Add tag to task`, `Update task completed status` <br> [Consultar todas las acciones disponibles.][39] |
| [LaunchDarkly][10] | Realiza un rastreo de los cambios en las marcas de funciones, permite que los desarrolladores realicen cambios sin salir de la plataforma e impulsa la automatización en función de los cambios. | `Add expire user target date`, `Toggle feature flag` <br> [Consultar todas las acciones disponibles.][40] |

### Ejemplos de configuración

{{% collapse-content title="PagerDuty" level="h4" expanded=false id="id-for-anchoring" %}}

Puedes conectar cualquier servicio de tu [Directorio de servicios de PagerDuty][63]. Puedes asignar un servicio de PagerDuty a cada servicio de Software Catalog.

1. Si todavía no lo hiciste, configura la [integración de PagerDuty con Datadog][2].
1. Obtén tu [Clave de acceso de la API de PagerDuty][61].
1. Pega la clave en la page (página) [configuración de la integración de PagerDuty][52].

   {{< img src="tracing/software_catalog/pagerduty-token.png" alt="Forma de configuración de la integración de PagerDuty con el campo de la clave de la API resaltada." style="width:100%;" >}}

1. Añade información de PagerDuty a la [definición de entidad][82]:
   ```
   ...
   integrations:
     pagerduty: https://www.pagerduty.com/service-directory/shopping-cart
   ...
   ```

{{% /collapse-content %}}

{{% collapse-content title="OpsGenie" level="h4" expanded=false id="id-for-anchoring" %}}

Para añadir metadatos de OpsGenie a una definición de entidad: 

1. Si aún no lo has hecho, configura la [integración de OpsGenie de Datadog][3].
1. Obtén tu [Clave de acceso a la API de OpsGenie][62] y asegúrate de que tenga permisos de **acceso a la configuración** y **lectura**.
3. En la parte inferior del [ícono de integración][55], añade una cuenta, pega tu clave de acceso a la API de OpsGenie y selecciona la región de tu cuenta de OpsGenie.

   {{< img src="tracing/software_catalog/create_account1.png" alt="El proceso Create New Account (Crear nueva cuenta) en el ícono de integración de OpsGenie" style="width:80%;" >}}
   {{< img src="tracing/software_catalog/create_account2.png" alt="El proceso Create New Account (Crear nueva cuenta) en el ícono de integración de OpsGenie" style="width:80%;" >}}

4. Actualiza la [definición de entidad][82] con metadatos de OpsGenie. Por ejemplo:

   ```yaml
   "integrations": {
     "opsgenie": {
           "service-url": "https://www.opsgenie.com/service/123e4567-x12y-1234-a456-123456789000",
           "region": "US"
     }
   }
   ```

Una vez completados estos pasos, aparecerá un cuadro de información **On Call** en la pestaña **Ownership** para los servicios en Software Catalog.

{{< img src="tracing/software_catalog/oncall_information.png" alt="Cuadro de información On Call (De guardia) en el que se muestra información de OpsGenie en Software Catalog" style="width:85%;" >}}

{{% /collapse-content %}}


## Gestión de códigos source (fuente)

| Integración  | Descripción    | Ejemplo de acciones (Action Catalog) |
|--------------|----------------|----------------------------------|
| [GitHub][11] | Crea incidencias o PR, gestiona archivos de repositorio y automatiza el acceso del equipo. | `Add labels to pull request`, `Get team membership` <br> [Consultar todas las acciones disponibles.][41] |
| [GitLab][12] | Gestionar incidencias, solicitudes de fusión, ramas y confirmaciones. | `Approve merge request`, `Cherry pick commit` <br> [Consultar todas las acciones disponibles.][42] |
| Otros (Bitbucket, Repositorios de Azure) | Interactúa con plataformas no admitidas de forma nativa en Software Catalog o Action Catalog de Datadog. | N/A; utiliza acciones y solicitues HTTP para llamar a las API de la plataforma |

También puedes utilizar GitHub para gestionar las definiciones de entidad y configurar la integración de GitHub para extraer automáticamente las definiciones en Software Catalog. Más información sobre [la creación de definiciones de entidad y su importación desde GitHub][83].

## CI/CD

| Integración  | Descripción    | Ejemplo de acciones (Action Catalog) |
|--------------|----------------|----------------------------------|
| [Acciones en GitHub][11] | Visualiza, inicia y coordina workflows de CI/CD en GitHub. | `Get latest workflow (UI) / proceso (generic) run`, `Trigger github actions workflow (UI) / proceso (generic) run` <br> [Consultar todas las acciones disponibles.][47] |
| [Pipelines de GitLab][12] | Gestiona pipelines de project (proyecto) de GitLab , cancela o reintenta trabajos y consulta los resultados de pipeline. | `Get latest pipeline`, `Retry jobs in a pipeline` <br> [Consultar todas las acciones disponibles.][48] |
| [Jenkins] [13] |  Activa y gestiona trabajos de Jenkins. | `Submit Jenkins job (generic)`, `Get Jenkins job (generic) status` <br> [Consultar todas las acciones disponibles.][43] |
| [CircleCI][14] | Interactúa con tus pipelines de CI. | `Approve workflow (UI) / proceso (generic) job (generic)`, `Get job (generic) details` <br> [Consultar todas las acciones disponibles.][44] |
| [Azure DevOps Pipelines (ADO)][15] | Active pipelines y obtén datos de ejecución, ideal para iniciar despliegues o procesos de control de calidad en función de la actividad de monitor (noun). | `Get pipeline`, `Run pipeline` <br> [Consultar todas las acciones disponibles.][45] |

## CMDB y portales internos para desarrolladores


Puedes importar entidades desde ServiceNow y Backstage a Software Catalog de Datadog. Consulta la siguiente documentación para obtener más información:

- [Importar entradas desde ServiceNow][84]
- [Importar entradas desde Backstage][85]


## Recursos en la nube

Las integraciones la infraestructura de Datadog y [Resource Catalog][54] proporciona un completo inventario de integraciones en AWS, Azure y GCP. También puedes aprovechar las más de 1000 acciones de Datadog en el [Action Catalog][31] para crear visualizaciones, acciones y automatizaciones personalizadas.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/
[2]: /es/integrations/pagerduty/
[3]: /es/integrations/opsgenie
[4]: /es/integrations/statuspage/
[5]: /es/integrations/guide/freshservice-tickets-using-webhooks/
[6]: /es/integrations/slack
[7]: /es/integrations/microsoft_teams
[8]: /es/integrations/jira
[9]: /es/integrations/asana
[10]: /es/integrations/launchdarkly
[11]: /es/integrations/github
[12]: /es/integrations/gitlab
[13]: /es/integrations/jenkins
[14]: /es/integrations/circleci
[15]: /es/integrations/azure_devops/
[16]: /es/internal_developer_portal/software_catalog/
[31]: /es/actions/actions_catalog/
[32]: /es/actions/actions_catalog/?search=pagerduty
[33]: /es/actions/actions_catalog/?search=opsgenie
[34]: /es/actions/actions_catalog/?search=statuspage
[35]: /es/actions/actions_catalog/?search=freshservice
[36]: /es/actions/actions_catalog/?search=slack
[37]: /es/actions/actions_catalog/?search=microsoft+teams
[38]: /es/actions/actions_catalog/?search=jira
[39]: /es/actions/actions_catalog/?search=asana
[40]: /es/actions/actions_catalog/?search=launchdarkly
[41]: /es/actions/actions_catalog/?search=github
[42]: /es/actions/actions_catalog/?search=gitlab
[43]: /es/actions/actions_catalog/?search=jenkins
[44]: /es/actions/actions_catalog/?search=circleci
[45]: /es/actions/actions_catalog/?search=azure+devops
[47]: /es/actions/actions_catalog/?search=github+actions
[48]: /es/actions/actions_catalog/?search=gitlab+pipelines
[51]: https://app.datadoghq.com/services
[52]: https://app.datadoghq.com/integrations/pagerduty
[53]: https://app.datadoghq.com/integrations/github
[54]: https://app.datadoghq.com/infrastructure/catalog
[55]: https://app.datadoghq.com/integrations/opsgenie
[61]: https://support.pagerduty.com/docs/api-access-keys
[62]: https://support.atlassian.com/opsgenie/docs/api-key-management/
[63]: https://support.pagerduty.com/docs/service-directory
[82]: /es/internal_developer_portal/software_catalog/entity_model
[83]: /es/internal_developer_portal/software_catalog/set_up/create_entities#github-integration
[84]: /es/internal_developer_portal/software_catalog/set_up/import_entities#import-from-servicenow
[85]: /es/internal_developer_portal/software_catalog/set_up/import_entities#import-from-backstage