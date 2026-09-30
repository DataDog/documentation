---
app_id: uptime
app_uuid: 937f96ea-644f-4903-9f74-cdc5e8b46dd8
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: uptime.response_time
      metadata_path: metadata.csv
      prefix: uptime
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10001
    source_type_name: Uptime
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Uptime
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- notifications
- metrics
- event management
- os & system
- testing
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/uptime/README.md
display_on_public_website: true
draft: false
git_integration_title: uptime
integration_id: uptime
integration_title: Uptime.com
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: uptime
public_title: Uptime.com
short_description: Monitorización Uptime y de rendimiento simplificada
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Notificaciones
  - Category::Métricas
  - Category::Gestión de eventos
  - Category::Sistema operativo y sistema
  - Category::Tests
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integración
  configuration: README.md#Configuración
  description: Monitorización Uptime y de rendimiento simplificada
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Uptime.com
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Uptime.com es un completo servicio de monitorización de sitios web que proporciona alertas en tiempo real y análisis detallados del rendimiento de tus aplicaciones web y tus API.

La integración Uptime.com en Datadog mejora las capacidades de monitorización combinando la monitorización de Uptime.com con la plataforma Datadog. Entre sus principales funciones se incluyen:

- Las alertas de Uptime.com generan automáticamente eventos correspondientes en Datadog.
- A los eventos de Datadog se les puede asignar una prioridad más baja y comentarlos para su seguimiento.
- Los tiempos de respuesta de checks se rastrean como métricas en Datadog.
- Las métricas se actualizan cada 5 minutos con 5 puntos de datos de checks con intervalos de 1 minuto.

Esta integración te permite identificar y resolver de forma proactiva problemas de rendimiento, minimizando los tiempos de inactividad del sistema y mejorando la fiabilidad general del sitio.

![Gráfico de Uptime.com][1]

## Configuración

### Configuración

Para activar la integración Datadog en tu cuenta de Uptime, ve a [Notifications > Integrations (Notificaciones > Integraciones)][2] y elige Datadog como tipo de proveedor al añadir un nuevo perfil de notificaciones push.

A continuación se describen los campos que se muestran al configurar Datadog en tu cuenta de Uptime:
shell
- Nombre: El nombre de referencia que quieres asignar a tu perfil de Datadog. Puede ayudarte a organizar varios perfiles de proveedor en tu cuenta de Uptime.

- Clave de API: <span class="hidden-api-key">\${api_key}</span>

- Clave de aplicación: <span class="app_key" data-name="uptime"></span>

Después de configurar tu perfil de Datadog, asigna el perfil a un grupo de contactos situado en _Alerting > Contacts_ (Alerta > Contactos). El perfil se asigna en el campo **Push Notifications** (Notificaciones push) dentro del grupo de contactos.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "uptime" >}}


### Eventos

La integración Uptime envía un evento a tu flujo (stream) de eventos Datadog cuando se produce o resuelve una alerta.

### Checks de servicios

El check de Uptime no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/uptime/images/snapshot.png
[2]: https://uptime.com/integrations/manage/
[3]: https://github.com/DataDog/integrations-extras/blob/master/uptime/metadata.csv
[4]: https://docs.datadoghq.com/es/help/