---
aliases:
- /es/tracing/software_catalog/integrations
- /es/tracing/service_catalog/integrations
- /es/service_catalog/integrations
- /es/software_catalog/integrations
description: Conecte Internal Developer Portal con herramientas de terceros, incluyendo
  PagerDuty, Opsgenie, GitHub, Jira y plataformas de CI/CD para enriquecer los metadatos
  del Catálogo y automatizar acciones.
further_reading:
- link: /internal_developer_portal/catalog/entity_model/
  tag: Documentación
  text: Obtenga información sobre la API de definición de servicio
- link: /integrations/opsgenie/
  tag: Documentación
  text: Obtenga información sobre la integración con Opsgenie
- link: /integrations/pagerduty/
  tag: Documentación
  text: Obtenga información sobre la integración con PagerDuty
title: Integrations
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">
Las integraciones de PagerDuty y Opsgenie para Internal Developer Portal no son compatibles en el {{< region-param key=dd_datacenter code="true" >}} sitio.
</div>
{{% /site-region %}}
  
## Descripción general {#overview}

Cuando configura una cuenta de servicio para una [integración de Datadog][1], puede incorporar metadatos de sus integraciones en las definiciones de entidad del [Catálogo][16]. Desde allí, puede usar el [Action Catalog][31] para consultar sistemas externos o activar acciones—como crear incidentes o actualizar tickets—sin salir de Datadog.

{{< callout url="https://forms.gle/PzXWxrnGaQPiVf9M8" header="Solicite una nueva integración" >}}
{{< /callout >}}

## Colaboración, gestión de incidentes y gestión de tickets {#collaboration-incident-management-and-ticketing}

| Integración  | Descripción    | Ejemplos de acciones (Action Catalog) |
|--------------|----------------|----------------------------------|
| [PagerDuty][2] | Agregue metadatos de PagerDuty a un servicio para que el Catálogo muestre y enlace información como quién está de guardia y si hay incidentes activos de PagerDuty para el servicio. | `Get current on-call`, `Trigger incident` <br> [Ver todas las acciones disponibles.][32] |
| [Opsgenie][3] | Agregue metadatos de Opsgenie a un servicio para que el Catálogo muestre y enlace información como quién está de guardia para el servicio. | `Acknowledge alert`, `Get current on call` <br> [Ver todas las acciones disponibles.][33] |
| [StatusPage][4] | Cree, actualice y recupere detalles sobre incidentes y componentes. | `Create an incident`, `Update component status` <br> [Ver todas las acciones disponibles.][34] |
| [Freshservice][5] | Cree, actualice y consulte tickets de Freshservice. | `List tickets`, `Update ticket` <br> [Ver todas las acciones disponibles.][35] |
| [Slack][6] | Envíe alertas de incidentes o actualizaciones a canales de Slack y realice la gestión de canales. | `Invite users to channel`, `Set channel topic` <br> [Ver todas las acciones disponibles.][36] |
| [Microsoft Teams][7] | Envíe mensajes o avisos a canales de Teams para la colaboración en incidentes. | `Make a decision`, `Send a message` <br> [Ver todas las acciones disponibles.][37] |
| [Jira][8] | Cree y actualice incidencias directamente desde Datadog. | `Create issue`, `Add comment` <br> [Ver todas las acciones disponibles.][38] |
| [Asana][9] | Cree y actualice tareas de Asana, asigne usuarios y aplique etiquetas. | `Add tag to task`, `Update task completed status` <br> [Ver todas las acciones disponibles.][39] |
| [LaunchDarkly][10] | Realice un seguimiento de los cambios en los indicadores de funciones, permita que los desarrolladores realicen cambios sin salir de la plataforma e impulse la automatización en función de los cambios | `Add expire user target date`, `Toggle feature flag` <br> [Ver todas las acciones disponibles.][40] |

### Ejemplos de configuración {#setup-examples}

{{% collapse-content title="PagerDuty" level="h4" expanded=false id="pagerduty-setup" %}}

Puede conectar cualquier servicio en su [Directorio de servicios de PagerDuty][63]. Puede asignar un servicio de PagerDuty a cada servicio en el Catálogo.

1. Si aún no lo ha hecho, configure la [integración de Datadog con PagerDuty][2].
1. Obtenga su [clave de API de PagerDuty][61].
1. Pegue la clave en la página de [PagerDuty Integration Setup][52].

   {{< img src="tracing/software_catalog/pagerduty-token.png" alt="Formulario de configuración de la integración de PagerDuty con el campo de clave de API resaltado." style="width:100%;" >}}

1. Agregue información de PagerDuty a la [definición de entidad][82]:
   ```
   ...
   integrations:
     pagerduty: https://www.pagerduty.com/service-directory/shopping-cart
   ...
   ```

{{% /collapse-content %}}

{{% collapse-content title="Opsgenie" level="h4" expanded=false id="opsgenie-setup" %}}

Para agregar metadatos de Opsgenie a una definición de entidad: 

1. Si aún no lo ha hecho, configure la [integración de Datadog con Opsgenie][3].
1. Obtenga su [clave de API de Opsgenie][62] y asegúrese de que tenga **acceso a la configuración** y **lectura** permisos.
3. En la parte inferior del [mosaico de integración][55], agregue una cuenta, pegue su clave de API de Opsgenie y seleccione la región de su cuenta de Opsgenie.

   {{< img src="tracing/software_catalog/create_account1.png" alt="El flujo de trabajo Crear nueva cuenta en el mosaico de integración de Opsgenie" style="width:80%;" >}}
   {{< img src="tracing/software_catalog/create_account2.png" alt="El flujo de trabajo Crear nueva cuenta en el mosaico de integración de Opsgenie" style="width:80%;" >}}

4. Actualice la [definición de entidad][82] con metadatos de Opsgenie. Por ejemplo:

   ```yaml
   "integrations": {
     "opsgenie": {
           "service-url": "https://www.opsgenie.com/service/123e4567-x12y-1234-a456-123456789000",
           "region": "US"
     }
   }
   ```

Una vez que haya completado estos pasos, aparecerá un cuadro de información **On Call** en la **Ownership** para los servicios en el Catálogo.

{{< img src="tracing/software_catalog/oncall_information.png" alt="Cuadro de información On Call que muestra información de Opsgenie en el Catálogo." style="width:85%;" >}}

{{% /collapse-content %}}


## Gestión de código fuente {#source-code-management}

| Integración  | Descripción    | Ejemplos de acciones (Action Catalog) |
|--------------|----------------|----------------------------------|
| [GitHub][11] | Cree problemas o PR, administre archivos de repositorio y automatice el acceso del equipo. | `Add labels to pull request`, `Get team membership` <br> [Ver todas las acciones disponibles.][41] |
| [GitLab][12] | Administre problemas, solicitudes de fusión, ramas y confirmaciones. | `Approve merge request`, `Cherry pick commit` <br> [Ver todas las acciones disponibles.][42] |
| Otros (Bitbucket, Azure Repos) | Interactúe con plataformas que no son compatibles de forma nativa en el Catálogo de Datadog o el Action Catalog. | N/A; utilice acciones y solicitudes HTTP para llamar a las API de la plataforma |

También puede usar GitHub para administrar definiciones de entidades y configurar la integración de GitHub para extraer definiciones automáticamente al Catálogo. Obtenga más información sobre [cómo crear definiciones de entidades e importarlas desde GitHub][83].

## CI/CD {#cicd}

| Integración  | Descripción    | Ejemplos de acciones (Action Catalog) |
|--------------|----------------|----------------------------------|
| [GitHub Actions][11] | Vea, inicie y coordine flujos de trabajo de CI/CD en GitHub. | `Get latest workflow run`, `Trigger github actions workflow run` <br> [Ver todas las acciones disponibles.][47] |
| [GitLab Pipelines][12] | Administre canalizaciones de proyectos de GitLab, cancele o reintente trabajos y consulte los resultados de las canalizaciones. | `Get latest pipeline`, `Retry jobs in a pipeline` <br> [Ver todas las acciones disponibles.][48] |
| [Jenkins][13] |  Active y administre trabajos de Jenkins. | `Submit Jenkins job`, `Get Jenkins job status` <br> [Ver todas las acciones disponibles.][43] |
| [CircleCI][14] | Interactúe con sus canalizaciones de CI. | `Approve workflow job`, `Get job details` <br> [Ver todas las acciones disponibles.][44] |
| [Azure DevOps Pipelines (ADO)][15] | Active canalizaciones y obtenga datos de ejecución; ideal para iniciar implementaciones o flujos de trabajo de control de calidad basados en la actividad de seguimiento. | `Get pipeline`, `Run pipeline` <br> [Ver todas las acciones disponibles.][45] |

## CMDB e Internal Developer Portals {#cmdbs-and-internal-developer-portals}


Puede importar entidades desde ServiceNow y Backstage al Catálogo de Datadog. Consulte la siguiente documentación para obtener más detalles:

- [Importar entradas desde ServiceNow][84]
- [Importar entradas desde Backstage][85]


## Recursos en la nube {#cloud-resources}

Las integraciones de infraestructura de Datadog y el [Resource Catalog][54] proporcionan un inventario completo de integraciones en AWS, Azure y GCP. También puede aprovechar las más de 1000 acciones de Datadog en el [Action Catalog][31] para crear visualizaciones, acciones y automatizaciones personalizadas.

## Lecturas adicionales {#further-reading}

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
[16]: /es/internal_developer_portal/catalog/
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
[82]: /es/internal_developer_portal/catalog/entity_model
[83]: /es/internal_developer_portal/catalog/set_up/create_entities#github-integration
[84]: /es/internal_developer_portal/catalog/set_up/import_entities#import-from-servicenow
[85]: /es/internal_developer_portal/catalog/set_up/import_entities#entities-from-backstage