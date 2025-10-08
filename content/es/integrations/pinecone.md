---
app_id: pinecone
app_uuid: dd7ebeb0-9910-4897-81b3-d8bc73003413
assets:
  dashboards:
    pinecone_pod: assets/dashboards/pinecone_pod_overview.json
    pinecone_serverless: assets/dashboards/pinecone_serverless_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - pinecone.index.fullness
      metadata_path: metadata.csv
      prefix: pinecone.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10363
    source_type_name: Pinecone
  monitors:
    Index is approaching limit: assets/monitores/index_fullness.json
    Writes to Index Exceed Threshold: assets/monitors/serverless_writes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
- almacenes de datos
- ia/ml
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: pinecone
integration_id: pinecone
integration_title: Pinecone
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: pinecone
public_title: Pinecone
short_description: Base de datos vectorial basada en la nube para aplicaciones de
  IA de alto rendimiento.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Data Stores
  - Category::AI/ML
  - Submitted Data Type::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Base de datos vectorial basada en la nube para aplicaciones de IA de
    alto rendimiento.
  media:
  - caption: Información general del dashboard basado en pod de Pinecone
    image_url: images/pinecone-dashboard.png
    media_type: imagen
  - caption: Información general del dashboard sin servidor de Pinecone
    image_url: images/pinecone-serverless-dashboard.png
    media_type: imagen
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/ai-integrations/
  - resource_type: Blog
    url: https://docs.datadoghq.com/integrations/pinecone/
  support: README.md#Support
  title: Pinecone
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

- **Optimización del rendimiento y control del uso**: observa y realiza un seguimiento de acciones específicas (por ejemplo, recuento de solicitudes) dentro de Pinecone para identificar solicitudes de aplicaciones con alta latencia o uso. Monitoriza tendencias y obtén información procesable para mejorar la utilización de recursos y reducir el gasto.

- **Alerta automática en métricas**: recibe alertas cuando la plenitud del índice alcance un determinado umbral. También puedes crear tus propios monitores personalizados para alertar sobre métricas y umbrales específicos.

- **Localización y clasificación de los picos inesperados de uso o latencia**: visualiza rápidamente anomalías en uso o latencia en un dashboard de Datadog de Pinecone. Visualiza métricas a lo largo del tiempo para comprender mejor las tendencias y determinar la gravedad de un pico.

## Requisitos

La monitorización de Pinecone con Datadog requiere:

- Un plan Enterprise o Enterprise Dedicated de Pinecone.
- Índices basados en pods o en sin servidor: Datadog admite tanto la captura de métricas basadas en pods como sin servidor.


## Configuración

### Instalación

1. Inicia sesión en tu [cuenta de Pinecone][1].
2. Navega hasta la pestaña **API Keys** (Claves de API).
3. Crea una clave de API.
4. Copia la clave de API creada en el portapapeles.

### Configuración

1. Navega hasta la pestana de configuración dentro del [cuadro de integración de Pinecone][2] de Datadog.
2. Introduce el ID de tu proyecto de Pinecone, que encontrarás en la lista del proyecto en la consola de Pinecone.
3. Sólo para entornos basados en pods: selecciona tu entorno. Los proyectos en entornos sin servidor pueden dejarlo en blanco.
4. Pega tu clave de API copiada.


## Datos recopilados

### Métricas
{{< get-metrics-from-git "pinecone" >}}


### Logs

Pinecone no recopila logs.

### Checks de servicio

Pinecone no incluye ningún check de servicio.

### Eventos

Pinecone no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][4].

[1]: https://app.pinecone.io/
[2]: https://app.datadoghq.com/account/settings#integrations/pinecone
[3]: https://github.com/DataDog/integrations-internal-core/blob/main/pinecone/metadata.csv
[4]: https://docs.datadoghq.com/es/help/