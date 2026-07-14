---
app_id: neoload
app_uuid: 3d16e6da-7ac2-47b4-95c0-0d221686f05a
assets:
  dashboards:
    NeoLoad Performance Testing: assets/dashboards/neoload_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: NeoLoad.Controller.User.Load
      metadata_path: metadata.csv
      prefix: NeoLoad.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10317
    source_type_name: neoload
  logs: {}
author:
  homepage: https://www.tricentis.com/products/performance-testing-neoload
  name: Tricentis
  sales_email: sales@tricentis.com
  support_email: support@tricentis.com
categories:
- notificaciones
- tests
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/neoload/README.md
display_on_public_website: true
draft: false
git_integration_title: neoload
integration_id: neoload
integration_title: NeoLoad
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: neoload
public_title: NeoLoad
short_description: Monitorizar y analizar los resultados de tests de rendimiento de
  NeoLoad
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Notifications
  - Categoría::Tests
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Configuración
  description: Monitorizar y analizar los resultados de tests de rendimiento de NeoLoad
  media:
  - caption: Dashboard de tests de rendimiento de NeoLoad
    image_url: images/neoload-dashboard.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: NeoLoad
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

[Tricentis NeoLoad][1] simplifica y escala los tests de rendimiento de las API y los microservicios, así como los tests de aplicaciones de extremo a extremo mediante funciones basadas en protocolos y navegadores.

Con la integración NeoLoad puedes realizar un seguimiento de las métricas de los tests de rendimiento de NeoLoad para:

- Correlacionar el rendimiento de la aplicación con las métricas de los tests de carga en NeoLoad.
- Analizar y visualizar métricas de NeoLoad en Datadog, como el rendimiento, los errores y el rendimiento, utilizando el dashboard predefinido o el [Explorador de métricas][2].

## Configuración

### Configuración

Para obtener instrucciones detalladas para la configuración de NeoLoad, consulta la [documentación de NeoLoad][3]. A partir de la versión 9.1 de NeoLoad, puedes elegir qué métricas enviar en la configuración de **Push Counters** del conector de Datadog en NeoLoad.

Instala la integración NeoLoad en Datadog para añadir el dashboard de NeoLoad por defecto a tu lista de dashboards.


## Datos recopilados

### Métricas
{{< get-metrics-from-git "neoload" >}}


### Eventos

Todos los eventos de tests de rendimiento de NeoLoad se envían a tu [Explorador de eventos Datadog][5].
NeoLoad envía eventos a la API Datadog cuando comienza y termina un test de rendimiento.
Define la opción en la configuración de **Push Counters** del conector de Datadog en NeoLoad. Disponible a partir de NeoLoad v9.1.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][6] o con el [servicio de asistencia de Tricentis NeoLoad][7].

[1]: https://www.tricentis.com/products/performance-testing-neoload
[2]: https://docs.datadoghq.com/es/metrics/explorer
[3]: https://documentation.tricentis.com/neoload/latest/en/content/reference_guide/datadog.htm
[4]: https://github.com/DataDog/integrations-extras/blob/master/neoload/metadata.csv
[5]: https://docs.datadoghq.com/es/events/
[6]: https://docs.datadoghq.com/es/help/
[7]: https://support-hub.tricentis.com/