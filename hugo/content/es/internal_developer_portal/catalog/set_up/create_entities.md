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
- /es/internal_developer_portal/software_catalog/set_up/create_entities
description: Agregue definiciones de entidades al Catalog a través de la Datadog UI
  o automatizando las importaciones con GitHub, GitLab, Terraform o la Datadog API.
disable_toc: false
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: Sitio externo
  text: Cree y administre definiciones de servicio con Terraform
- link: /integrations/github
  tag: Documentación
  text: Obtenga información sobre la integración con GitHub
- link: /integrations/gitlab-source-code/
  tag: Documentación
  text: Obtenga información sobre la integración con GitLab
- link: /api/latest/service-definition/
  tag: API
  text: Obtenga información sobre la API de definición de servicio
- link: /api/latest/software-catalog/
  tag: API
  text: Obtenga información sobre la Catalog API
title: Crear entidades
---
## Descripción general {#overview}

Para agregar [definiciones de entidades][13] al Catalog, puede:
- crear definiciones manualmente a través de la Datadog UI.
- administrar definiciones en código y automatizar la importación a través de GitHub, GitLab, Terraform o la Datadog API.

## A través de la Datadog UI {#through-the-datadog-ui}

El Catalog proporciona un flujo de trabajo guiado para crear definiciones de entidades. Después de seleccionar un tipo de entidad en el menú desplegable **Kind** (Service, API, System y otros), el formulario presenta campos de metadatos y opciones específicas para ese tipo. Por ejemplo, seleccionar **API** muestra campos para cargar una especificación de OpenAPI o gRPC, mientras que seleccionar **Service** muestra campos para definir el tipo de servicio y el ciclo de vida.

Para crear una definición de entidad:

1. Navegue a la página [Catalog Setup & Config][3].
1. Haga clic en **Create a New Entry**.
1. Seleccione el tipo de entidad en el menú desplegable **Kind**.
1. Complete los campos de metadatos, como la propiedad y los enlaces de referencia.
1. (Opcional) Cambie a **YAML** o **JSON** para ver el código generado y el comando cURL. En los editores de código, Datadog marca automáticamente los datos no válidos.

   {{< img src="tracing/software_catalog/software_catalog_definition_editor.png" alt="Editor de metadatos de servicio que muestra una definición de servicio de ejemplo." >}}

1. Envíe los metadatos haciendo clic en **Save Entry** o ejecutando el comando cURL proporcionado.

   **Nota**: Debe tener [Service Catalog Write permission][2] para guardar la entrada.


## A través de la automatización {#through-automation}

Para automatizar la importación a través de GitHub, GitLab, Terraform, el Datadog Software Metadata Provider o el Datadog Service Definition API:

### Cree la definición de la entidad {#create-the-entity-definition}

1. Create `service.datadog.yaml` o `entity.datadog.yaml` para definir su entidad (Datadog acepta ambos nombres de archivo).
1. Nombre su entidad en el campo `dd-service` (versión de esquema v2.2 o anterior) o `name` (versión de esquema v3.0+).

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
    External Resources (Optional)
   {{< /code-block >}}

1. (Opcional) Registre varios servicios en un solo archivo YAML separando cada definición con tres guiones (`---`).

### Importe la definición {#import-the-definition}

Importe la definición de una de las siguientes maneras:

1. **Terraform**: Cree e importe la definición como un [recurso de Terraform][4]. 
   
   **Nota**: Crear y administrar servicios en el Catalog a través de canalizaciones automatizadas requiere [Datadog Provider][5] v3.16.0 o posterior.

1. **Datadog APIs**: Importe su definición utilizando el [Service Definition API][7] (para el esquema v2.x) o el [Catalog API][8] (para el esquema v3+), las cuales son soluciones de GitHub Action de código abierto.
1. **GitHub o GitLab**: Configure la [integración de GitHub][9] o la [integración de GitLab][14] para administrar e importar sus definiciones.

#### Integraciones de GitHub y GitLab {#github-and-gitlab-integrations}

Configure la [integración de GitHub][9] o la [integración de GitLab][14] para importar definiciones de entidades desde sus repositorios. Datadog busca los archivos `service.datadog.yaml` y `entity.datadog.yaml` en cada repositorio con permisos de lectura.

Después de actualizar los archivos YAML de sus repositorios, sus cambios se propagan al Catalog. Puede registrar varios servicios en un solo archivo YAML creando varios documentos YAML. Separe cada documento con tres guiones (`---`).

Para evitar sobrescrituras accidentales, cree y modifique sus archivos de definición con una integración de código fuente (GitHub o GitLab) o con los [Definition API endpoints][11]. Actualizar el mismo servicio utilizando tanto una integración de código fuente como la API puede resultar en una sobrescritura no deseada.

##### GitHub integration {#github-integration}

Para instalar el GitHub integration:
1. Navegue al [mosaico de integración][10].
2. Haga clic en **Link GitHub Account** en la pestaña **Repo Configuration**.

Cuando el GitHub integration está configurado para sus definiciones, aparece un botón **Edit in GitHub** en la pestaña **Definition** del servicio y lo vincula a GitHub para hacer commit de los cambios.

{{< img src="tracing/software_catalog/svc_cat_contextual_link.png" alt="Aparece un botón Edit in GitHub en la pestaña Definition de un servicio en el Catalog" style="width:90%;" >}}

##### GitLab integration {#gitlab-integration}

Para conectar sus repositorios de GitLab, siga las instrucciones de configuración del [GitLab integration][14], disponibles en el [GitLab integration tile][15]. Almacene sus archivos `service.datadog.yaml` o `entity.datadog.yaml` en un repositorio que Datadog tenga permiso para leer.

##### Validación de la integración {#integration-validation}

Para validar las definiciones de sus servicios ingeridas por el GitHub integration de Datadog, puede visualizar los eventos cuando los servicios se actualizan o cuando hay un error. Para ver los errores de validación en [Event Management][12], filtre por `source:software_catalog` y `status:error`. Ajuste el marco temporal según sea necesario.

{{< img src="tracing/software_catalog/github_error_event.png" alt="Evento de GitHub que muestra un mensaje de error de la definición del servicio." >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /es/internal_developer_portal/catalog/set_up#configure-role-based-access-and-permissions
[3]: https://app.datadoghq.com/software/settings/get-started
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest
[7]: /es/api/latest/service-definition/
[8]: /es/api/latest/software-catalog/
[9]: /es/integrations/github/
[10]: https://app.datadoghq.com/integrations/github
[11]: /es/api/latest/software-catalog/#create-or-update-entities
[12]: https://app.datadoghq.com/event/explorer
[13]: /es/internal_developer_portal/catalog/entity_model
[14]: /es/integrations/gitlab-source-code/
[15]: https://app.datadoghq.com/integrations/gitlab-source-code/