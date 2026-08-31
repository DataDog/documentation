---
app_id: configcat
app_uuid: 22b2d616-b246-457e-8883-a79bee8c467d
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: configcat.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10094
    source_type_name: ConfigCat
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: ConfigCat
  sales_email: developer@configcat.com
  support_email: developer@configcat.com
categories:
- configuración y despliegue
- notificaciones
- suministro
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/configcat/README.md
display_on_public_website: true
draft: false
git_integration_title: configcat
integration_id: configcat
integration_title: ConfigCat
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: configcat
public_title: ConfigCat
short_description: Eventos de cambio de configuración rastreados por Datadog
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Configuración y despliegue
  - Categoría::Notificaciones
  - Categoría::Suministro
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Eventos de cambio de configuración rastreados por Datadog
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: ConfigCat
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Gestiona las funciones y cambia la configuración de tu software mediante [indicadores de funciones de ConfigCat][1], sin necesidad de volver a desplegar el código. Un [dashboard que se puede entrenar en 10 minutos][2] permite que incluso los miembros no técnicos del equipo gestionen las funciones directamente. Despliega en cualquier momento y publica cuando tengas confianza. Dirígete primero a un grupo específico de usuarios con nuevas ideas. Admite pruebas A/B/n y lanzamiento promocional. Proporciona [SDK de código abierto][3] para una fácil integración con cualquier aplicación web, móvil o de backend.

Esta integración garantiza que cada cambio de configuración en ConfigCat se envíe a Datadog como un evento.

*Example:*
![DatadogEvent][4]

## Configuración

1. Debes tener una [suscripción a Datadog][5].
2. Obtén una [clave de API de Datadog][6].
    ![DatadogEvent][7] 
4. Abre la [pestaña de integraciones][8] en el dashboard de ConfigCat.
5. Haz clic en el botón _CONNECT_ de Datadog y configura tu clave de API de Datadog.
6. Ya está todo listo. Continúa y realiza algunos cambios en tus indicadores de funciones, y luego verifica tus eventos en Datadog.


### Desinstalación

1. Abre la [pestaña de integraciones][8] en el dashboard de ConfigCat.
2. Haz clic en el botón DISCONNECT de Datadog y configura tu clave de API de Datadog.

## Datos recopilados

### Métricas

La integración de ConfigCat no incluye métricas.

### Eventos

Todos los eventos relacionados con ConfigCat recopilados aparecen dentro del flujo de eventos de Datadog con la propiedad `source:configcat` y están etiquetados con los nombres de tu producto, configuración y entorno.

Por ejemplo, aquí se muestra cómo buscar eventos que ocurrieron en el entorno de producción `source:configcat production`:

![Filtering][9]

### Checks de servicios

La integración de ConfigCat no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Consulta la [documentación de ConfigCat][10] o ponte en contacto con el [servicio de asistencia de ConfigCat][11].

[1]: https://configcat.com
[2]: https://app.configcat.com
[3]: https://github.com/configcat
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/configcat/images/datadog_event.png
[5]: https://www.datadoghq.com
[6]: https://docs.datadoghq.com/es/account_management/api-app-keys/#api-keys
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/configcat/images/datadog_apikey.png
[8]: https://app.configcat.com/product/integrations
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/configcat/images/datadog_filtering.png
[10]: https://configcat.com/docs/integrations/datadog/
[11]: https://configcat.com/support