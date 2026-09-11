---
app_id: pingdom-v3
app_uuid: d7f6a5a2-9614-45f1-9022-2ca1eba7bd5c
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: pingdom.response_time
      metadata_path: metadata.csv
      prefix: pingdom.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 615
    source_type_name: Pingdom
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
- notificaciones
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: pingdom_v3
integration_id: pingdom-v3
integration_title: Pingdom
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: pingdom_v3
public_title: Pingdom
short_description: Consulta tiempos de actividad, tiempos de respuesta y alertas recopilados
  por Pingdom en Datadog.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Métricas
  - Categoría::Notificaciones
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Consulta tiempos de actividad, tiempos de respuesta y alertas recopilados
    por Pingdom en Datadog.
  media: []
  overview: README.md#Información general
  support: README.md#Solucionar problemas
  title: Pingdom
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Información general

Realiza un seguimiento de las métricas de rendimiento de Pingdom basadas en usuarios en Datadog, para correlacionarlas con otros eventos y otras métricas pertinentes.

La integración Pingdom V3 actúa de forma similar a la [integración Pingdom en Datadog (obsoleta)][1], pero utiliza la versión 3.1 de la [API Pingdom][2].

![Gráficos Pingdom en un dashboard de Datadog][3]

## Configuración

### Generar token de API

1. Inicia sesión en tu [cuenta de Pingdom][4].
2. Ve a Settings > Pingdom API (Configuración > API Pingdom).
3. Haz clic en Add API token (Añadir token de API). Dale un nombre y permisos de lectura-escritura al token. Guarda el token en algún sitio, ya que no podrás volver a acceder a él.

### Instalación y configuración

1. Abre el [cuadro de integración de Pingdom V3][5].
2. Introduce el nombre y el token de API en los campos correspondientes. Las métricas y los checks configurados en Pingdom se recopilan en Datadog.
3. Administra etiquetas (tags) de checks en Pingdom. Las etiquetas añadidas a un check en Pingdom se añaden automáticamente a un check en Datadog. Excluya checks añadiendo la etiqueta `datadog-exclude`. 

## Datos recopilados

### Métricas
{{< get-metrics-from-git "pingdom_v3" >}}


### Eventos

La integración Pingdom no incluye eventos.

### Checks de servicio

La integración Pingdom extrae checks de transacciones y los informa como checks de servicio.

En el caso del check `pingdom.status`, los resultados de los checks de transacciones de Pingdom se correlacionan con los resultados de los checks de servicio de Datadog de la siguiente manera:

| Estado de Datadog | Estado de Pingdom      |
| -------------- | ------------------- |
| `OK`           | `up`                |
| `CRITICAL`     | `down`              |
| `WARNING`      | `unconfirmed_down`  |
| `UNKNOWN`      | `unknown`, `paused` |

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][7].

[1]: https://docs.datadoghq.com/es/integrations/pingdom/
[2]: https://docs.pingdom.com/api/
[3]: images/pingdom_dashboard.png
[4]: https://my.pingdom.com/
[5]: https://app.datadoghq.com/account/settings#integrations/pingdom-v3
[6]: https://github.com/DataDog/integrations-internal-core/blob/main/pingdom/metadata.csv
[7]: https://docs.datadoghq.com/es/help