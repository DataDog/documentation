---
aliases:
- /es/software_catalog/set_up/new_to_datadog
- /es/tracing/software_catalog/setup
- /es/software_catalog/setup
- /es/tracing/service_catalog/setup
- /es/service_catalog/setup
- /es/software_catalog/create_entries/
- /es/software_catalog/enrich_default_catalog/create_entries
- /es/service_catalog/create_entries/
- /es/service_catalog/enrich_default_catalog/create_entries
- /es/api_catalog/add_entries
- /es/service_catalog/customize/create_entries/
- /es/software_catalog/customize/create_entries
disable_toc: false
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: Sitio externo
  text: Crear y gestionar definiciones de servicio con Terraform
- link: /integrations/github
  tag: Documentación
  text: Más información sobre la integración GitHub
- link: /api/latest/service-definition/
  tag: API
  text: Más información sobre la API de definición de servicios
- link: /api/latest/software-catalog/
  tag: API
  text: Más información sobre la API de Software Catalog
title: Crear entidades
---

## Información general

Para añadir [definiciones de entidad][13] a Software Catalog, puedes:
- crear definiciones manualmente a través de la interfaz de usuario de Datadog.
- gestionar las definiciones en el código y automatizar la importación a través de GitHub, Terraform o la API de Datadog.

## A través de la interfaz de usuario de Datadog

Para crear definiciones de entidades en la interfaz de usuario de Datadog:

1. Ve a la página [Software Catalog Setup & Config][3] (Configuración de Software Catalog).
1. Haz clic en **Create a New Entry** (Crear una nueva entrada).
1. Especifica los detalles de tu servicio, incluidos metadatos como propiedad y enlaces a documentación.
1. (Opcional) Cambia a **YAML** o **JSON** para ver el código generado y el comando cURL. En los editores de código, Datadog marca automáticamente los datos no válidos. 

   {{< img src="tracing/software_catalog/software_catalog_definition_yaml.png" alt="Editor de metadatos de servicio que muestra la definición de servicios de muestra." >}}

1. Envía los metadatos haciendo clic en **Save Entry** (Guardar entrada) o ejecutando el comando cURL proporcionado.

   **Nota**: Debes tener [Permiso de escritura de Software Catalog][2] para guardar la entrada. 


## Mediante la automatización

Para automatizar la importación a través de GitHub, Terraform, el proveedor de metadatos de software de Datadog o la API de definición de servicios de Datadog:

### Crear la definición de entidad

1. Crea `service.datadog.yaml` o `entity.datadog.yaml` para definir tu entidad (Datadog acepta ambos nombres de archivo).
1. Nombra tu entidad en el campo `dd-service` (esquema versión v2.2 o anterior) o `name` (esquema versión v3.0+).

   Por ejemplo:

   {{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
    schema-version: v2.2
    dd-service: my-unmonitored-cron-job
    team: e-commerce
    lifecycle: production
    application: shopping-app
    description: important cron job for shopist backend
    tier: "2"
    type: web
    contacts:
    - type: slack
    contact: https://datadogincidents.slack.com/archives/XXXXX
    links:
    - name: Common Operations
    type: runbook
    url: https://datadoghq.atlassian.net/wiki/
    - name: Disabling Deployments
    type: runbook
    url: https://datadoghq.atlassian.net/wiki/
    tags: []
    integrations:
    pagerduty:
    service-url: https://datadog.pagerduty.com/service-directory/XXXXXXX
    Recursos externos (opcional)
   {{< /code-block >}}

1. (Opcional) Registra varios servicios en un archivo YAML separando cada definición con tres guiones (`---`).

### Importar la definición 

Importa la definición de una de las siguientes maneras:

1. **Terraform**: crea e importa la definición como un [recurso de Terraform][4]. 

   **Nota**: La creación y gestión de servicios en Software Catalog a través de pipelines automatizados requiere el [proveedor de Datadog][5] v3.16.0 o posterior.

1. **APIs de Datadog**: importa tu definición utilizando la [API de Definición de servicios][7] (para el esquema v2.x) o la [API de Software Catalog][8] (para el esquema v3+), que son soluciones de código abierto de acción de GitHub.
1. **GitHub**: configura la [integración de Datadog y GitHub](#github-integration) para gestionar e importar tus definiciones.

#### Integración en GitHub

Configura la [integración con GitHub][9] para enlazar directamente desde donde ves la definición del servicio en Software Catalog hasta donde está almacenado y es editable en GitHub. Datadog busca los archivos `service.datadog.yaml` y `entity.datadog.yaml` en cada repositorio con permisos de lectura.

Para instalar la integración de GitHub:
1. Navega hasta el [cuadro de integración][10].
2. Haz clic en **Link GitHub Account** (Cuenta de enlace de GitHub) en la pestaña **Repo Configuration** (Configuración del repositorio).

Cuando la integración de GitHub está configurado para tus definiciones, aparece un botón **Edit in GitHub** (Editar en GitHb) en la pestaña **Definition** (Definición) y te enlaza con GitHub para confirmar los cambios.

{{< img src="tracing/software_catalog/svc_cat_contextual_link.png" alt="Un botón Editar en GitHub aparece en la pestaña Definición de un servicio en Software Catalog" style="width:90%;" >}}

Una vez actualizados los archivos YAML de tus repositorios, los cambios se propagan al Software Catalog. Puedes registrar varios servicios en un archivo YAML creando varios documentos YAML. Separa cada documento con tres guiones (`---`).

Para evitar sobrescrituras accidentales, crea y modifica tus archivos de definición con la integración de GitHub o con los [endpoints de la API de definición][11]. Actualizar el mismo servicio utilizando tanto GitHub como la API puede dar lugar a sobrescrituras involuntarias.  

##### Validación de la integración

Para validar las definiciones de servicio incorporadas por la integración de GitHub de Datadog, puedes ver los eventos cuando se actualizan los servicios o cuando se produce un error. Para ver los errores de validación en [Event Management][12], filtra por `source:software_catalog` y `status:error`. Ajusta el marco temporal según sea necesario.

{{< img src="tracing/software_catalog/github_error_event.png" alt="Evento de Github que muestra un mensaje de error desde la definición de servicio." >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[2]: /es/internal_developer_portal/software_catalog/set_up#role-based-access-and-permissions
[3]: https://app.datadoghq.com/software/settings/get-started
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest
[7]: /es/api/latest/service-definition/
[8]: /es/api/latest/software-catalog/
[9]: /es/integrations/github/
[10]: https://app.datadoghq.com/integrations/github
[11]: /es/api/latest/software-catalog/#create-or-update-entities
[12]: https://app.datadoghq.com/event/explorer
[13]: /es/internal_developer_portal/software_catalog/entity_model