---
app_id: google-eventarc
app_uuid: a10c14f9-f630-439f-a181-c49a1ac79dc5
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 346
    source_type_name: Google Eventarc
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- google cloud
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_eventarc
integration_id: google-eventarc
integration_title: Google Eventarc
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_eventarc
public_title: Google Eventarc
short_description: Eventarc te permite importar eventos desde servicios Google, SaaS
  y tus propias aplicaciones.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Google Cloud
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Eventarc te permite importar eventos desde servicios Google, SaaS y
    tus propias aplicaciones.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/incident-response-eventarc-datadog/
  support: README.md#Soporte
  title: Google Eventarc
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Envía tus eventos de Datadog a [Eventarc][1] para su entrega a servicios Google, lo que te permite iniciar flujos de trabajo impulsados por Eventarc con notificaciones de monitor de Datadog.

## Configuración

1. Asegúrate de que la principal [integración GCP][2] está instalada para cada proyecto GCP que recibe notificaciones.

2. [Crea un canal Eventarc][3] en la consola de Google Cloud.

3. En la aplicación Datadog, define el nombre y el token de activación de tu canal en la [sección de notificaciones][4] de un monitor utilizando la sintaxis que se muestra en el siguiente ejemplo:

![La sección "Dinos lo que está pasando" de la página de configuración de un monitor Datadog con el título Tamaño de disco duro supera la capacidad y una línea en el cuerpo de la notificación que envía a un canal eventarc con el siguiente ejemplo: La notificación de alerta será enviada a @eventarc-datadog-sandbox_us-central1_my-channel que activará Función Cloud: Bump Quota.][5]

### Validación

Una vez activada la integración, el canal pasa de **Pendiente** a **Activo** en la consola de Google Cloud.

### Acciones automatizadas

Configura nuevos canales de salida de notificaciones para monitores a fin de iniciar acciones automatizadas con la integración GCP Eventarc. Con las acciones automatizadas, puedes configurar tus recursos GCP para:

  - Utilizar monitores Datadog para iniciar flujos de trabajo de Eventarc
  - Vincular, dentro de Google, funciones Cloud, BigQuery, etc., con monitores Datadog
  - Utilizar la información contenida en el evento de alerta para ejecutar pipelines y runbooks de corrección automática, ejecutar consultas de análisis, etc.

En la [documentación de GCP][6] encontrarás la lista completa de recursos a los que puedes apuntar.

## Datos recopilados

### Métricas

La integración Google Eventarc no incluye métricas.

### Eventos

El Google Eventarc integración no incluye ninguna eventos.

### Checks de servicio

La integración Google Eventarc no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][7].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Automatizar los flujos de trabajo de respuesta a incidentes con Eventarc y Datadog][8]

[1]: https://cloud.google.com/eventarc/docs
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[3]: https://cloud.google.com/eventarc/docs/third-parties/create-channels
[4]: https://docs.datadoghq.com/es/monitors/notify/
[5]: images/eventarc_channel_notification.png
[6]: https://cloud.google.com/eventarc/docs/targets
[7]: https://docs.datadoghq.com/es/help/
[8]: https://www.datadoghq.com/blog/incident-response-eventarc-datadog/