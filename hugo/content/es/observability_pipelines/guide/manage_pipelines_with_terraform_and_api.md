---
description: Aprenda a crear y actualizar pipelines mediante la API o Terraform.
disable_toc: false
further_reading:
- link: /observability_pipelines/set_up_pipelines
  tag: documentación
  text: Configure un pipeline
- link: /api/latest/observability-pipelines/
  tag: documentación
  text: API de Observability Pipelines
title: Administre Observability Pipelines con la API o Terraform
---
## Descripción general {#overview}

Si administra muchas implementaciones de Observability Pipelines y desea reducir los errores de configuración manual, puede utilizar la API o Terraform para administrar sus pipelines mediante programación. Esta guía describe cómo configurar y actualizar sus pipelines con la [API](#manage-pipelines-with-the-api) o [Terraform](#manage-pipelines-with-terraform).

## Requisitos previos {#prerequisites}

Antes de comenzar, asegúrese de:

- Tener las claves de Datadog API y de aplicación para la autenticación.<br>**Nota**: La clave de API debe estar [habilitada para Remote Configuration][1].
- Si va a utilizar Terraform:
  - Tener instalada la versión más reciente de Terraform en su máquina.
  - Revise el [proveedor de Terraform de Datadog][2] y el [recurso de Observability Pipelines][3].
- Si va a utilizar la API, revise las especificaciones del punto de conexión de la [API de Observability Pipelines][4] y los parámetros de configuración adicionales.

## Administre pipelines con la API {#manage-pipelines-with-the-api}

Puede realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) con la API de Observability Pipelines. Esta sección describe cómo utilizar estos puntos de conexión en su flujo de trabajo. Para cada solicitud de ejemplo, reemplace los siguientes marcadores de posición:

- `<PIPELINE_ID>` con el identificador obtenido cuando se creó el pipeline
- `<DD_API_KEY>` con su clave de Datadog API
- `<DD_APP_KEY>` con su clave de aplicación de Datadog

Las cargas útiles de ejemplo también incluyen valores de muestra de `id` (como `my-processor-group` y `datadog-agent-source`) para fuentes, procesadores y destinos. Estos son nombres que usted elige y puede renombrar para que se ajusten a sus propias convenciones. Los valores `type` (como `datadog_agent`, `filter` y `datadog_logs`) son fijos y deben coincidir con un tipo de componente admitido.


### Crear una pipeline {#create-a-pipeline}

Para [crear una pipeline][5], envíe una solicitud `POST` con una carga útil JSON que defina el nombre de la pipeline y sus componentes principales: fuentes, procesadores y destinos.

Ejemplo de solicitud:

```bash
curl -X POST "https://api.datadoghq.com/api/v2/remote_config/products/obs_pipelines/pipelines" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: <DD_API_KEY>" \
-H "DD-APPLICATION-KEY: <DD_APP_KEY>" \
-d '{
  "data": {
    "attributes": {
      "config": {
        "destinations": [
          { "id": "datadog-logs-destination", "type": "datadog_logs", "inputs": ["my-processor-group"] }
        ],
        "pipeline_type": "logs",
        "processor_groups": [
          {
            "enabled": true,
            "id": "my-processor-group",
            "include": "service:my-service",
            "inputs": [
              "datadog-agent-source"
            ],
            "processors": [
              { "id": "filter-processor", "enabled": true, "type": "filter", "include": "service:my-service" }
            ]
          }
        ],
        "sources": [
          { "id": "datadog-agent-source", "type": "datadog_agent" }
        ]
      },
      "name": "Main Observability Pipeline"
    },
    "type": "pipelines"
  }
}'
```

### Recuperar una configuración de pipeline {#retrieve-a-pipeline-configuration}

Para [auditar o verificar una configuración de pipeline existente][6], envíe una solicitud `GET` con el ID de pipeline específico.

Ejemplo de solicitud:

```bash
curl -X GET "https://api.datadoghq.com/api/v2/remote_config/products/obs_pipelines/pipelines/<PIPELINE_ID>" \
-H "Accept: application/json" \
-H "DD-API-KEY: <DD_API_KEY>" \
-H "DD-APPLICATION-KEY: <DD_APP_KEY>"
```

### Actualizar una pipeline existente {#update-an-existing-pipeline}

Para [actualizar la configuración de una pipeline existente][7], envíe una solicitud `PUT` con los cambios de la pipeline en la carga útil JSON.

Ejemplo de solicitud:

```bash
curl -X PUT "https://api.datadoghq.com/api/v2/remote_config/products/obs_pipelines/pipelines/<PIPELINE_ID>" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: <DD_API_KEY>" \
-H "DD-APPLICATION-KEY: <DD_APP_KEY>" \
-d '{
  "data": {
    "attributes": {
      "name": "Updated Pipeline Name",
      "config": {
        "sources": [
          { "id": "datadog-agent-source", "type": "datadog_agent" }
        ],
        "processors": [
          { "id": "filter-processor", "type": "filter", "include": "service:my-updated-service", "inputs": ["datadog-agent-source"] }
        ],
        "destinations": [
          { "id": "updated-datadog-logs-destination", "type": "datadog_logs", "inputs": ["filter-processor"] }
        ]
      }
    },
    "type": "pipelines"
  }
}'
```

### Eliminar una pipeline {#delete-a-pipeline}

Para [eliminar una pipeline][8], envíe una solicitud `DELETE` al punto de conexión correspondiente. Una eliminación exitosa resulta en un código de estado `204` que indica que la pipeline ha sido eliminada.

**Nota**: La operación de eliminación es irreversible. Utilice este punto de conexión solo cuando esté seguro de que la pipeline ya no es necesaria.

Ejemplo de solicitud:

```bash
curl -X DELETE "https://api.datadoghq.com/api/v2/remote_config/products/obs_pipelines/pipelines/<PIPELINE_ID>" \
-H "DD-API-KEY: <DD_API_KEY>" \
-H "DD-APPLICATION-KEY: <DD_APP_KEY>"
```

## Administrar pipelines con Terraform {#manage-pipelines-with-terraform}

Puede utilizar recursos de Terraform para crear e implementar una pipeline.

### Crear una pipeline usando Terraform {#create-a-pipeline-using-terraform}

Defina una pipeline utilizando el recurso [datadog_observability_pipeline][9]. Mantenga este archivo en su sistema de control de versiones para realizar un seguimiento de los cambios.

Establezca las siguientes variables de entorno antes de ejecutar Terraform, para que las credenciales no se almacenen en su archivo de configuración:

```shell
export DD_API_KEY=<DD_API_KEY>
export DD_APP_KEY=<DD_APP_KEY>
export DD_HOST={{< region-param key="dd_api" code="true" >}}
```

Ejemplo de configuración de pipeline de Terraform:

```hcl
terraform {
  required_providers {
    datadog = {
      source = "DataDog/datadog"
      version = "~> 3.84"
    }
  }
}

provider "datadog" {}

resource "datadog_observability_pipeline" "main" {
  name = "Main Observability Pipeline"

  config {
    source {
      id = "datadog-agent-source"

      datadog_agent {}
    }

    processor_group {
      id      = "filter-processor"
      enabled = true
      include = "service:my-service"
      inputs  = ["datadog-agent-source"]

      processor {
        id      = "filter-1"
        enabled = true
        include = "service:my-service"

        filter {}
      }
    }

    destination {
      id     = "datadog-logs-destination"
      inputs = ["filter-processor"]

      datadog_logs {}
    }
  }
}
```

Reemplace `service:my-service` con una consulta de búsqueda que coincida con los registros que desea que la pipeline procese.

### Implemente una pipeline con Terraform {#deploy-a-pipeline-with-terraform}

Después de definir una nueva configuración de pipeline o actualizar una configuración existente, ejecute los siguientes comandos de Terraform para implementar su configuración de pipeline:

```bash
terraform init
terraform plan
terraform apply
```

- `terraform init` inicializa su directorio de trabajo.
- `terraform plan` previsualiza los cambios que se están realizando.
- `terraform apply` aplica los cambios, lo que crea o actualiza su pipeline en consecuencia.

Después de implementar la configuración, [instale el Worker][10] para enviar datos a través de la pipeline. Una pipeline no procesa datos hasta que al menos un Worker esté ejecutándose para ella.

**Nota**: No puede eliminar una pipeline activa. Detenga todos los Workers de la pipeline antes de eliminar su bloque de recursos. Consulte [Eliminar una pipeline][11] para obtener más información.


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/remote-config/setup
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
[4]: /es/api/latest/observability-pipelines/
[5]: /es/api/latest/observability-pipelines/create-a-new-pipeline/
[6]: /es/api/latest/observability-pipelines/get-a-specific-pipeline/
[7]: /es/api/latest/observability-pipelines/update-a-pipeline/
[8]: /es/api/latest/observability-pipelines/delete-a-pipeline/
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
[10]: /es/observability_pipelines/configuration/set_up_pipelines/?tab=logs#set-up-a-pipeline-with-the-api
[11]: /es/observability_pipelines/configuration/set_up_pipelines/?tab=logs#delete-a-pipeline