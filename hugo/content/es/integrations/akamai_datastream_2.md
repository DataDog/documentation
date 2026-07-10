---
app_id: akamai-datastream-2
app_uuid: 9a772881-d31a-4ffb-92bb-7beef1088a55
assets:
  dashboards:
    Akamai DataStream 2: assets/dashboards/akamai_datastream_2_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: akamai_datastream.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10273
    source_type_name: Akamai DataStream 2
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Datadog
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenamiento en caché
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/akamai_datastream_2/README.md
display_on_public_website: true
draft: false
git_integration_title: akamai_datastream_2
integration_id: akamai-datastream-2
integration_title: Akamai DataStream 2
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: akamai_datastream_2
public_title: Akamai DataStream 2
short_description: Envío de tus logs de Akamai DataStream a Datadog
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Envío de tus logs de Akamai DataStream a Datadog
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-akamai-datastream2/
  support: README.md#Support
  title: Akamai DataStream 2
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Akamai DataStream 2 captura logs de rendimiento, seguridad y estado de la CDN de tus propiedades en Akamai Intelligent Edge Platform. Esta integración transmite los datos casi en tiempo real a Datadog.

Puedes utilizar logs de Akamai DataStream 2 para obtener información sobre tendencias a largo plazo, resolver problemas de rendimiento y seguridad y monitorizar flujos de entrega de datos de alto rendimiento. Consulta la [documentación de DataStream 2][1] para obtener más detalles y casos de uso.

## Configuración

### Instalación

Haz clic en **Install Integration** (Instalar integración) para activar un dashboard predefinido para ver logs y métricas de Akamai DataStream 2.

### Configuración

Para configurar Akamai DataStream 2 para que envíe logs a Datadog, sigue [estas instrucciones en el
sitio de documentos técnicos de Akamai](https://techdocs.akamai.com/datastream2/docs/stream-datadog), asegúrate de configurar la fuente de log en `akamai.datastream` y el formato de log en `JSON`.

Asegúrate de que el selector del sitio de Datadog situado a la derecha de la página está configurado en tu [sitio de Datadog][2], y copia la URL del endpoint de logs que aparece a continuación:  

`https://{{< region-param key="http_endpoint" code="true" >}}/v1/input`

### Validación

Para validar que esta integración está configurada correctamente, [busca los logs con la fuente `akamai.datastream`][3]. Es posible que tengas que esperar unos minutos después de configurar el flujo de datos en Akamai antes de que los logs sean visibles en Datadog.

## Datos recopilados

### Métricas

Akamai DataStream 2 no incluye ninguna métrica.

### Checks de servicio

Akamai DataStream 2 no incluye ningún check de servicio.

### Eventos

Akamai DataStream 2 no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][4].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorizar Akamai Datastream 2 con Datadog][5]

[1]: https://techdocs.akamai.com/datastream2/docs
[2]: https://docs.datadoghq.com/es/getting_started/site/
[3]: https://app.datadoghq.com/logs?query=source%3Aakamai.datastream
[4]: https://docs.datadoghq.com/es/help/
[5]: https://www.datadoghq.com/blog/monitor-akamai-datastream2/