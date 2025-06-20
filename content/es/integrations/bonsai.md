---
app_id: bonsai
app_uuid: ec3141f4-b722-4eaa-be49-47c6eec76da9
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: bonsai.req.total
      metadata_path: metadata.csv
      prefix: bonsai.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10053
    source_type_name: Bonsai
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Bonsai
  sales_email: dev@onemorecloud.com
  support_email: dev@onemorecloud.com
categories:
- métricas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/bonsai/README.md
display_on_public_website: true
draft: false
git_integration_title: bonsai
integration_id: bonsai
integration_title: Bonsai
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: bonsai
public_title: Bonsai
short_description: Bonsai Managed Elasticsearch
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Metrics
  - Supported OS::Windows
  - Offering::Integration
  configuration: README.md#Setup
  description: Bonsai Managed Elasticsearch
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Bonsai
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Rastrea las métricas a nivel de solicitud para tus clústeres de Bonsai para:

- Visualizar el rendimiento de tus clústeres
- Correlacionar el rendimiento de la búsqueda con el rendimiento de la aplicación
- Crear alertas

![snapshot][1]

## Configuración

Para integrar tu clúster con Datadog es necesario enviar tu clave API a la aplicación bonsai.

### Obtener clave API

En Datadog, ve a [Integrations --> API][2] y copia tu clave de API.

![snapshot][3]

### Enviar clave API

Ve a [Bonsai --> Clusters][4] y haz clic en el clúster que deseas integrar. Ve a la pestaña Manage y desplázate hasta la parte inferior de la página.

En la sección "Datadog Integration", pega tu clave API y haz clic en "Activate Datadog".

![snapshot][5]

### Verificar

Si tu clave es válida, deberías ver la integración como activa.

![snapshot][6]

En pocos minutos, las métricas de solicitud estarán disponibles en tu dashboard de Datadog.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "bonsai" >}}


Las métricas están etiquetadas para cada clúster, por lo que puedes segmentar en función de los clústeres. Las etiquetas (tags) tienen el siguiente aspecto:

```text
cluster:my-cluster-slug
```

### Eventos

La integración Bonsai no incluye eventos.

### Checks de servicio

La integración Bonsai no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/snapshot.png
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/copy_key.png
[4]: https://app.bonsai.io/clusters
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/activate_datadog.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/datadog_activated.png
[7]: https://github.com/DataDog/integrations-extras/blob/master/bonsai/metadata.csv
[8]: https://docs.datadoghq.com/es/help/