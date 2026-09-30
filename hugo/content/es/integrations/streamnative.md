---
app_id: streamnative
app_uuid: e92fa53b-f620-4167-bdaa-31ac3bc6be35
assets:
  dashboards:
    StreamNative - Health: assets/dashboards/streamnative_health.json
    StreamNative - Kafka Connect: assets/dashboards/streamnative_kafka_connect.json
    StreamNative - Pulsar Resource: assets/dashboards/streamnative_pulsar_resource.json
    StreamNative - Sink Connector: assets/dashboards/streamnative_sink_connector.json
    StreamNative - Source Connector: assets/dashboards/streamnative_source_connector.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - streamnative.pulsar_resource.pulsar_consumers_count
      metadata_path: metadata.csv
      prefix: streamnative.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 27153739
    source_type_name: StreamNative
  monitors:
    Backlog size exceeding threshold: assets/monitors/backlog_size_exceeding_threshold.json
    Messaging service is down: assets/monitors/messaging_service_down.json
    Webservice is down: assets/monitors/webservice_down.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/streamnative/README.md
display_on_public_website: true
draft: false
git_integration_title: streamnative
integration_id: streamnative
integration_title: StreamNative
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: streamnative
public_title: StreamNative
short_description: Obtén información sobre los datos de métricas de StreamNative.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Obtén información sobre los datos de métricas de StreamNative.
  media:
  - caption: StreamNative - Salud
    image_url: images/streamnative_health.png
    media_type: imagen
  - caption: StreamNative - Kafka Connect
    image_url: images/streamnative_kafka_connect.png
    media_type: imagen
  - caption: StreamNative - Recurso Pulsar
    image_url: images/streamnative_pulsar_resource.png
    media_type: imagen
  - caption: StreamNative - Conector de sumideros
    image_url: images/streamnative_sink_connector.png
    media_type: imagen
  - caption: StreamNative - Conector de fuentes
    image_url: images/streamnative_source_connector.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: StreamNative
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-core -->


## Información general

[StreamNative][1] proporciona una plataforma de mensajería y streaming de eventos de nivel empresarial basada en Apache Pulsar. Ofrece soluciones de streaming de datos escalables y en tiempo real con características como multiinquilino, replicación geográfica e integración continua con servicios de nube.

La integración StreamNative recopila los siguientes tipos de [métricas][2]:

1. Health
2. Recurso Pulsar
3. Conector de fuentes
4. Conector de sumideros
5. Kafka Connect

## Configuración

### Generar credenciales de API en StreamNative

1. Inicia sesión en la [cuenta de la consola de StreamNative Cloud][3].
2. Haz clic en el icono del perfil y ve a la pestaña **Cuentas y accesos**.
3. Busca la cuenta de servicio con permisos de **Admin** o un enlace al rol `metrics-viewer`.
   - Si no existe una cuenta de servicio, selecciona **New -> Service Account** (Nuevo -> Cuenta de servicio) para crear una, y asegúrate de activar la opción **Super Admin**.
   - Para vincular una cuenta de servicio con el rol `metrics-viewer`, consulta la documentación [metrics-viewer rolebinding][4].
4. En la parte derecha de la cuenta de servicio elegida, haz clic en el botón `...`.
5. Selecciona **Download OAuth2 Key** (Descargar clave OAuth2) para obtener el **ID de cliente** y el **Secreto de cliente**.

### Obtener el `Organization ID` y el `Instance Name`

1. Haz clic en el icono del perfil y selecciona **Organizations** (Organizaciones).
2. Selecciona la **Organización** de la que deben recopilarse datos.
3. En el menú desplegable **Select an Instance** (Seleccionar una instancia), obtén el **Nombre de la instancia**.


### Conectar tu cuenta de StreamNative a Datadog

1. Añade tu ID de organización, nombre de instancia, ID de cliente y secreto de cliente.
    |Parámetros |Descripción |
    |--------------------|--------------------|
    | ID de organización | ID de organización de tu cuenta de StreamNative.|
    |Nombre de instancia |Nombre de instancia de la organización correspondiente.|
    | ID de cliente | ID de cliente de tu cuenta de servicio.|
    |Secreto de cliente |Secreto de cliente de tu cuenta de servicio.|
2. Haz clic en el botón **Save** (Guardar) para guardar la configuración.


## Datos recopilados

### Logs 

La integración StreamNative no incluye logs.

### Métricas

La integración StreamNative recopila y envía las siguientes métricas a Datadog.

{{< get-metrics-from-git "streamnative" >}}

### Checks de servicio

La integración StreamNative no incluye checks de servicios.

### Eventos

La integración StreamNative no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://streamnative.io/
[2]: https://docs.streamnative.io/docs/cloud-metrics-api#metrics-endpoint
[3]: https://console.streamnative.cloud/
[4]: https://docs.streamnative.io/docs/cloud-metrics-api#metrics-authorization
[5]: https://docs.datadoghq.com/es/help/