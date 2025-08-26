---
app_id: upstash
app_uuid: fe1f17e3-11a4-4e44-b819-8781ebcc86f8
assets:
  dashboards:
    Upstash-Kafka-Overview: assets/dashboards/upstash_kafka_overview.json
    Upstash-Redis-Overview: assets/dashboards/upstash_redis_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - upstash.metadata.metric_publish
      metadata_path: metadata.csv
      prefix: upstash.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10412
    source_type_name: Upstash
  oauth: assets/oauth_clients.json
author:
  homepage: https://upstash.com
  name: Upstash
  sales_email: sales@upstash.com
  support_email: support@upstash.com
categories:
- nube
- ai/ml
- almacenes de datos
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/upstash/README.md
display_on_public_website: true
draft: false
git_integration_title: upstash
integration_id: upstash
integration_title: Upstash
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: upstash
public_title: Upstash
short_description: Visualiza métricas para bases de datos y clústeres de Kafka desde
  Upstash
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Category::Cloud
  - Category::AI/ML
  - Category::Data Stores
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Visualiza métricas para bases de datos y clústeres de Kafka desde Upstash
  media:
  - caption: Métricas de base de datos de Upstash Redis
    image_url: images/upstash-redis-overview-dashboard.png
    media_type: imagen
  - caption: Métricas de Upstash Kafka
    image_url: images/upstash-kafka-overview-dashboard.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Upstash
  uninstallation: README.md#Uninstallation
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-extras -->


## Información general

Upstash es un proveedor de datos serverless que habilita Redis®, Kafka y soluciones de mensajería/programación para una diversa gama de aplicaciones que proporciona velocidad, simplicidad y una experiencia fluida para el desarrollador. Upstash utiliza las API de Redis y Kafka y está diseñado para:

* funciones serverless (AWS Lambda)
* Cloudflare Workers
* Fastly Compute@Edge
* Next.js Edge, Remix y mucho más
* Aplicaciones web o móviles del lado del cliente
* Desarrollo de la IA
* WebAssembly y otros entornos en los que se prefiere HTTP a las conexiones de TCP.

Para centralizar tu stack tecnológico de monitorización y permitir una visión completa de tus datos, la integración de Upstash envía las siguientes métricas a Datadog:
    * Tasa de aciertos y errores
    * Latencia de lectura/escritura (p99)
    * Espacio clave
    * Número de conexiones
    * Ancho de banda
    * Tamaño total de datos
    * Rendimiento

## Configuración

### Instalación

Visita [Upstash][1] para registrarte gratuitamente. Una vez registrado, visita el [ícono de integración de Upstash][2] en Datadog e instala la integración. Una vez instalado, ve a la pestaña **Configurar** y haz clic en **Conectar Cuentas**. Esto te guiará a través del flujo de Datadog OAuth para conceder a Upstash acceso a tus métricas de la base de datos.

## Desinstalación

Para eliminar la integración de Datadog de Upstash, ve a la [página de integraciones de Upstash][3] y haz clic en **Eliminar**. Además, desinstala esta integración de Datadog haciendo clic en el botón **Desinstalar integración** en la página [ícono de integración][2]. Una vez desinstalada este integración, se revocarán todas las autorizaciones anteriores.

Además, asegúrate de que todas las claves de la API asociadas a esta integración se hayan desactivado buscando `upstash` en la [página de gestión de claves de la API][4].

## Datos recogidos

### Métricas
{{< get-metrics-from-git "upstash" >}}

### Eventos
La integración de Upstash no incluye ningún evento.

### Checks de servicio

La integración de Upstash no incluye ningún check de servicio.

## Asistencia técnica
¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Upstash][6].

[1]: https://upstash.com
[2]: https://app.datadoghq.com/integrations/upstash
[3]: https://console.upstash.com/integration/datadog
[4]: https://app.datadoghq.com/organization-settings/api-keys?filter=Upstash
[5]: https://github.com/DataDog/integrations-extras/blob/master/upstash/metadata.csv
[6]: mailto:support@upstash.com