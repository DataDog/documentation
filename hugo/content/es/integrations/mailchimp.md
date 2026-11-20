---
app_id: mailchimp
app_uuid: ec79b5f5-df6b-4603-bdd1-399284f2093d
assets:
  dashboards:
    Mailchimp - Audiences: assets/dashboards/mailchimp_audience.json
    Mailchimp - Campaigns: assets/dashboards/mailchimp_campaign.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: mailchimp.campaigns.count
      metadata_path: metadata.csv
      prefix: mailchimp.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 21603492
    source_type_name: Mailchimp
  monitors:
    Too Many Abuse Reports: assets/monitors/abuse_report_rate.json
    Too Many Unsubscribes: assets/monitors/unsubscribe_rate.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/mailchimp/README.md
display_on_public_website: true
draft: false
git_integration_title: mailchimp
integration_id: mailchimp
integration_title: Mailchimp
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: mailchimp
public_title: Mailchimp
short_description: Monitoriza el rendimiento y uso de las campañas y audiencias de
  Mailchimp.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Métricas
  - Oferta::Integración
  - Submitted Data Type::Metrics
  configuration: README.md#Configuración
  description: Monitoriza el rendimiento y uso de las campañas y audiencias de Mailchimp.
  media:
  - caption: 'Mailchimp: campañas'
    image_url: images/mailchimp_campaigns.png
    media_type: imagen
  - caption: 'Mailchimp: audiencias'
    image_url: images/mailchimp_audiences.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Mailchimp
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

[Mailchimp][1] es una plataforma de marketing integrada, diseñada para que las empresas creen, envíen y analicen campañas de correo electrónico. Ofrece herramientas de gestión de audiencias, automatización del marketing e información para aumentar la participación y hacer crecer tu negocio. Las empresas pueden diseñar correos electrónicos, gestionar suscriptores y realizar un seguimiento del rendimiento de las campañas.

Esta integración ingiere las siguientes métricas:

- Informes (métricas relacionadas con las campañas)
- Listas/audiencia (métricas relacionadas con las audiencias)

La integración de Mailchimp recopila métricas de campañas y listas, dirigiéndolas a Datadog para su análisis. Esta integración proporciona información que incluye el total de campañas, el rendimiento del correo electrónico, las tasas de clics, las tasas de apertura, las tasas de rebote, las cancelaciones de suscripción y los informes de abuso. Presenta estadísticas consolidadas de las campañas enviadas en los últimos 30 días, junto con muchas otras métricas, todas accesibles a través de dashboards.

## Configuración

### Generar credenciales de API en Mailchimp

1. Inicia sesión en tu [cuenta de Mailchimp][2]. 
2. Comprueba la url del prefijo del servidor. Es la parte `xxxx`de la url (por ejemplo: `https://xxxx.admin.mailchimp.com/`).
3. Haz clic en el icono de perfil y selecciona la opción Profile (Perfil).
4. Ve a la pestaña **Extras** y haz clic en **API keys** (Claves de API) en el menú desplegable.
5. Desplázate hasta la sección **Your API Keys** (Tus claves de API) y haz clic en **Create A Key** (Crear una clave).
6. Introduce el nombre que prefieras para la clave de API y haz clic en **Generate Key** (Generar clave). Tu clave de API ya está generada.


### Conecta tu cuenta de Mailchimp a Datadog

1. Añade tu clave de API de marketing y el prefijo de servidor
    |Parámetros|Descripción
    |--------------------|--------------------|
    |Clave de API de marketing|Clave de API para tu cuenta de marketing de Mailchimp.|
    |Prefijo del servidor|Prefijo del servidor (por ejemplo: us13) de la cuenta de Mailchimp.|

2. Haz clic en el botón Save (Guardar) para guardar la configuración.

Al utilizar esta integración, otorgas tu permiso a Datadog para acceder a tu cuenta de Mailchimp.

## Datos recopilados

### Métricas

La integración de Mailchimp recopila y envía métricas de campaña y lista (audiencia) a Datadog.

{{< get-metrics-from-git "mailchimp" >}}

### Checks de servicio

La integración de Mailchimp no incluye ningún check de servicio.

### Eventos

La integración de Mailchimp no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://mailchimp.com/
[2]: https://login.mailchimp.com/
[3]: https://docs.datadoghq.com/es/help/