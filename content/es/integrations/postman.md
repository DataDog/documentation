---
app_id: postman
app_uuid: 9ba70e31-8e84-4d6b-84a1-95d6ba713df9
assets:
  dashboards:
    Postman API Dashboard: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: postman.monitor.run.total_latency
      metadata_path: metadata.csv
      prefix: postman
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10162
    source_type_name: Postman
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Postman
  sales_email: integrations-partnerships@postman.com
  support_email: integrations-partnerships@postman.com
categories: []
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/postman/README.md
display_on_public_website: true
draft: false
git_integration_title: postman
integration_id: postman
integration_title: Postman
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: postman
public_title: Postman
short_description: Analiza métricas y genera eventos en Datadog a partir de ejecuciones
  de monitorización de Postman.
supported_os:
- Linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Sistema operativo compatible::Windows
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Analiza métricas y genera eventos en Datadog a partir de ejecuciones
    de monitorización de Postman.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Postman
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

[Postman][1] es una plataforma API que simplifica los pasos de creación de una API y agiliza 
la colaboración para que puedas crear mejores API, más rápido.

Esta integración te ayuda a mantenerte actualizado sobre el estado de tus monitores. Te permite:

- Analizar las métricas de ejecuciones de monitorización de Postman en Datadog

- Generar eventos para ejecuciones de monitorización exitosas y fallidas

## Configuración

Puede encontrar instrucciones detalladas en la [documentación de Postman][2]. Las integraciones Postman requieren un plan [Team, Business o Enterprise][3] de Postman.

### Configuración

1. Genera una [clave de API][4] Datadog.
2. Accede a tu cuenta de Postman y ve a la [integración Datadog][5].
3. Selecciona "Add Integration." (Añadir integración).
4. Para enviar métricas y eventos de tu monitor a Datadog:
   - Pon un nombre a tu nueva integración.
   - Selecciona el monitor cuyos datos quieres enviar a Datadog.
   - Introduce tu clave de API Datadog.
   - Selecciona la región Datadog que quieres utilizar.
   - También puedes elegir si quieres enviar eventos, métricas o ambos por cada ejecución.
5. A continuación, selecciona "Add Integration" (Añadir integración) para terminar de configurar la integración.

![Configurar la integración][6]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "postman" >}}


### Checks de servicios

Postman no incluye checks de servicio.

### Eventos

Se genera un evento cada vez que se ejecuta un monitor en Postman. La gravedad del evento se basa en los tests del monitor Postman:

| Gravedad | Descripción                                                           |
|----------|-----------------------------------------------------------------------|
| `Low`    | Si se superan todos los tests.                                                 |
| `Normal` | Si fallan algunos tests o se produce un error en la ejecución de algún evento. |

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [el servicio de asistencia de Postman][8].

[1]: https://www.postman.com/
[2]: https://learning.postman.com/docs/integrations/available-integrations/datadog/
[3]: https://www.postman.com/pricing/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://go.postman.co/integrations/service/datadog
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/postman/images/add-integration-datadog.jpeg
[7]: https://github.com/DataDog/integrations-extras/blob/master/postman/metadata.csv
[8]: https://www.postman.com/support/