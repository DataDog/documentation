---
app_id: cribl-stream
app_uuid: 2ef15aea-af91-4769-940c-2b124e4d04a6
assets:
  dashboards:
    cribl_stream_overview: assets/dashboards/cribl_stream_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: cribl.logstream.health.outputs
      metadata_path: metadata.csv
      prefix: cribl.logstream.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10391
    source_type_name: Cribl
author:
  homepage: https://cribl.io
  name: Cribl
  sales_email: sales@cribl.io
  support_email: support@cribl.io
categories:
- AWS
- azure
- nube
- contenedores
- Kubernetes
- google cloud
- recopilación de logs
- seguridad
- métricas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cribl_stream/README.md
display_on_public_website: true
draft: false
git_integration_title: cribl_stream
integration_id: cribl-stream
integration_title: Cribl Stream
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cribl_stream
public_title: Cribl Stream
short_description: Recopilación de datos de observabilidad en un pipeline de telemetría
  de datos independiente del proveedor
supported_os:
- linux
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Submitted Data Type::Metrics
  - Category::AWS
  - Category::Azure
  - Category::Cloud
  - Category::Containers
  - Category::Kubernetes
  - Category::Google Cloud
  - Category::Log Collection
  - Category::Security
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Recopilación de datos de observabilidad en un pipeline de telemetría
    de datos independiente del proveedor
  media:
  - caption: La observabilidad lo cambia todo
    image_url: images/observability_changes.png
    media_type: vídeo
    vimeo_id: 567294419
  - caption: Dashboard de Cribl Stream para Datadog
    image_url: images/cribl_dashboard_for_datadog.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Cribl Stream
  uninstallation: README.md#Uninstallation
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-extras -->


## Información general
[Cribl Stream][1] te ayuda a procesar logs de datos de máquinas, datos de instrumentación, datos de aplicaciones y métricas en tiempo real y los envía a la plataforma de análisis de tu elección. Te permite:

- Añadir contexto a tus datos enriqueciéndolos con información procedente de fuentes de datos externas.
- Ayudar a asegurar tus datos, editando, enmascarando o cifrando los campos confidenciales.
- Optimizar tus datos, según tus requisitos de rendimiento y costos.

Esto es para la versión autoalojada de Cribl Stream. 

Utiliza el dashboard predefinido para ver el rendimiento del flujo (stream) con métricas de base como eventos por segundo, bytes por segundo, tipos de entrada, tipos de salida y métricas de infraestructura. La monitorización de porcentajes de reducción por eventos o bytes, que es útil para mejorar el rendimiento de la búsqueda o los costos de licencias e infraestructura para los sistemas de análisis.

## Configuración
Puedes enviar tu Cribl Stream [métricas internas][2] a la API de Datadog. 

### Instalación

#### Datadog
Ve a [_API Keys_][3] en Parámetros de la organización y crea una clave de la API para que Cribl envíe datos.

#### Cribl
1. En Cribl, ve a _Quick Connects_ y haz clic en el botón _+Add Source_. 
![step1][4]
2. Desplázate hacia abajo a _System Internal_, pasa el mouse sobre _Cribl Internal_ y selecciona _Select Existing_. Activa _CriblLogs_ y _CriblMetrics_.  
 - **Nota**: Ambas fuentes deben tener activado **Conexión rápida** en lugar de **Rutas**.
![step3][5]

3. Haz clic en el botón _+Add Destination_.
4. Desplázate al ícono _Datadog_ y haz clic en _+Add New_.
5. Dale un nombre a la entrada (por ejemplo, Cribl_Datadog).
![step4][6]

6. A continuación, introduce tu _Datadog API Key_ y selecciona tu sitio de Datadog.
7. Añade cualquier etiqueta (tag) de Datadog, un campo de mensaje, una fuente o información del host. Para obtener más información, consulta la [documentación de destino de Cribl Datadog][7].
8. Haz clic en _Save_.
10. Selecciona _Passthru_ para conectar las métricas de Cribl con tu destino de Datadog.
![step5][8]

![complete][9]

## Desinstalación
Utiliza la opción [eliminar el dashboard][10] en la configuración del dashboard de Cribl Stream para eliminar el dashboard de Cribl Stream. Elimina el destino de Datadog desde el despliegue de Cribl Stream para detener el envío de datos.

## Datos recopilados
### Métricas
{{< get-metrics-from-git "cribl-stream" >}}

### Eventos
La integración de Cribl Stream no incluye ningún evento.
### Checks de servicio
La integración de Cribl Stream no incluye ningún check de servicio.

## Solucionar problemas
¿Necesitas ayuda? Ponte en contacto con [soporte técnico de Cribl][12].

[1]: https://cribl.io/stream
[2]: http://docs.cribl.io/logstream/sources-cribl-internal/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/cribl_dd_1.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/cribl_dd_3.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/cribl_dd_4.png
[7]: https://docs.cribl.io/stream/destinations-datadog
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/cribl_dd_6.png
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/cribl_dd_5.png
[10]: https://docs.datadoghq.com/es/dashboards/#delete-dashboard
[11]: https://github.com/DataDog/integrations-extras/blob/master/cribl_stream/metadata.csv
[12]: https://cribl.io/support