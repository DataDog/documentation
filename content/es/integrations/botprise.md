---
app_id: botprise
app_uuid: 91806afb-9bd7-4ab2-91e4-7c7f2d05780f
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: botprise.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10113
    source_type_name: botprise
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Botprise
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- events
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/botprise/README.md
display_on_public_website: true
draft: false
git_integration_title: botprise
integration_id: botprise
integration_title: Botprise
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: botprise
public_title: Botprise
short_description: Integración Botprise para monitorizar eventos generados
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Integración Botprise para monitorizar eventos generados
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Botprise
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->
## Información general

La integración de Botprise con Datadog te permite enviar eventos generados de [Botprise][1] a Datadog mediante un webhook. Esto ayuda a monitorizar tus aplicaciones y a garantizar que Botprise funcione como se espera.

![image-datadog-botprise-events][2]

## Configuración

Para utilizar la integración de Botprise con Datadog, debes ser cliente de Botprise. Para obtener más información sobre Botprise, consulta [https://www.botprise.com/][1].

### Instalación


### Configuración
1. Instala el Datadog Agent en tus dispositivos de laboratorio.
2. Después de una instalación exitosa, tus dispositivos comienzan a enviar datos a Datadog. Visualiza los datos en la [lista de hosts de Datadog][3].
3. En Datadog, crea un monitor para cada uno de los hosts. Datadog genera alertas basadas en las reglas del monitor.
4. Configura cada monitor para [métricas][4] y el valor de umbral respectivo.
5. Modifica la configuración del monitor para crear un ticket [ServiceNow][5] para cada una de las alertas entrantes.
6. Genera una [clave API y una clave de aplicación][6] para llamar a las API Rest de Datadog.


## Datos recopilados

### Métricas

La integración Botprise no proporciona métricas.

### Checks de servicio

La integración Botprise no incluye checks de servicio.

### Eventos

Todos los eventos se envían al flujo (stream) de eventos de Datadog.

### Configuración
Para utilizar la API de Datadog, debes introducir una [clave API y una clave de aplicación][6].

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][7].

[1]: https://www.botprise.com/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/botprise/images/datadog-botprise-events.png
[3]: https://app.datadoghq.com/infrastructure/map
[4]: https://docs.datadoghq.com/es/metrics/
[5]: https://developer.servicenow.com/dev.do#!/home
[6]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[7]: https://docs.datadoghq.com/es/help/