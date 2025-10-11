---
app_id: temporal-cloud
app_uuid: 4fc358f8-ab2d-43ae-86e5-129ef4e4e6a1
assets:
  dashboards:
    Temporal Cloud - Overview: assets/dashboards/temporal_cloud_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: temporal.cloud.v0_frontend_service_request
      metadata_path: metadata.csv
      prefix: temporal.cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 32597071
    source_type_name: Temporal Cloud
  monitors:
    High gRPC error percentage: assets/monitors/high_grpc_error_percentage.json
    High service latency: assets/monitors/high_service_latency.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- herramientas de desarrollo
- métricas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/temporal_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: temporal_cloud
integration_id: temporal-cloud
integration_title: Temporal Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: temporal_cloud
public_title: Temporal Cloud
short_description: Obtén información sobre la salud del sistema, la eficiencia del
  flujo de trabajo, la ejecución de tareas y los cuellos de botella en el rendimiento
  de tu instancia.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Developer Tools
  - Category::Metrics
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Obtén información sobre la salud del sistema, la eficiencia del flujo
    de trabajo, la ejecución de tareas y los cuellos de botella en el rendimiento
    de tu instancia.
  media:
  - caption: Temporal Cloud - Información general 1
    image_url: images/temporal_cloud_overview_1.png
    media_type: imagen
  - caption: Temporal Cloud - Información general 2
    image_url: images/temporal_cloud_overview_2.png
    media_type: imagen
  - caption: Temporal Cloud - Información general 3
    image_url: images/temporal_cloud_overview_3.png
    media_type: imagen
  - caption: Temporal Cloud - Información general 4
    image_url: images/temporal_cloud_overview_4.png
    media_type: imagen
  - caption: Temporal Cloud - Información general 5
    image_url: images/temporal_cloud_overview_5.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Temporal Cloud
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-core -->
## Información general

[Temporal Cloud][1] es una plataforma escalable para la orquestación de flujos de trabajo complejos, que permite a los desarrolladores centrarse en la creación de aplicaciones, sin preocuparse por la tolerancia a fallos y la coherencia.

Esta integración reúne las métricas de Temporal Cloud en Datadog, ofreciendo información sobre la salud del sistema, la eficiencia del flujo de trabajo, la ejecución de tareas y los cuellos de botella en el rendimiento.

## Configuración

### Generar una URL del endpoint de métricas en Temporal Cloud

1. Para generar un certificado de autoridad de certificación (CA) y un certificado de entidad final, consulta la [gestión de certificados][2].
    - **Nota**: Un certificado de CA raíz caducado invalida todos los certificados posteriores. Para evitar interrupciones en tus sistemas, utiliza certificados con periodos de validez prolongados.
2. Inicia sesión en [Temporal Cloud][3] con un rol de propietario de cuenta o de administrador general.
3. Ve a **Settings** (Configuración) y selecciona la pestaña **Observabilidad**.
4. En la sección **Certificates** (Certificados), añade tu certificado de CA raíz (contenido del archivo `.pem`) y guárdalo.
    - **Nota**: Si ya existe un endpoint de observabilidad configurado, puedes añadir tu certificado de CA raíz.
5. Haz clic en **Save** (Guardar) para generar la URL del endpoint en la sección **Endpoint**. La URL debe tener el siguiente aspecto: `https://<account_id>.tmprl.cloud/prometheus`.


### Conectar tu cuenta de Temporal Cloud a Datadog

1. Añade tu ID de cuenta, el contenido del archivo del certificado de entidad final y el contenido del archivo de claves del certificado de entidad final.
    |Parámetros |Descripción |
    |--------------------|--------------------|
    |ID de cuenta |ID de cuenta de Temporal Cloud que se utilizará como parte de la URL del endpoint de métricas: `https://<account_id>.tmprl.cloud/prometheus`.|
    |Contenido del archivo del certificado de entidad final |Contenido del certificado de entidad final para el acceso seguro y la comunicación con el endpoint de métricas.|
    |Contenido del archivo de claves del certificado de entidad final |Contenido de la clave del certificado de entidad final para el acceso seguro y la comunicación con el endpoint de métricas.|

2. Haz clic en el botón **Save** (Guardar) para guardar la configuración.


## Datos recopilados

### Métricas
{{< get-metrics-from-git "temporal_cloud" >}}



### Checks de servicio

La integración Temporal Cloud no incluye checks de servicios.

### Eventos

La integración Temporal Cloud no incluye eventos.

## Ayuda

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://temporal.io/cloud/
[2]: https://docs.temporal.io/cloud/certificates#use-certstrap/
[3]: https://cloud.temporal.io/
[4]: https://github.com/DataDog/integrations-core/blob/master/temporal_cloud/metadata.csv
[5]: https://docs.datadoghq.com/es/help/