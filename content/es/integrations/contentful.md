---
app_id: contentful
app_uuid: 7aa10661-8d2e-49ab-8b37-a8aa8eccc5d1
assets:
  dashboards:
    Contentful - Activity Overview: assets/dashboards/contentful_activity_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 21609350
    source_type_name: Contentful
  logs:
    source: contentful
  monitors:
    'Contentful: Scheduled Action has failed': assets/monitors/scheduled_action_failed.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- herramientas para desarrolladores
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/contentful/README.md
display_on_public_website: true
draft: false
git_integration_title: contentful
integration_id: contentful
integration_title: Contentful
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: contentful
public_title: Contentful
short_description: Obtén información sobre las actividades de Contentful relacionadas
  con el contenido y otras acciones.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Developer Tools
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Obtén información sobre las actividades de Contentful relacionadas
    con el contenido y otras acciones.
  media:
  - caption: 'Contentful: información general de la actividad 1'
    image_url: images/contentful_activity_overview_1.png
    media_type: imagen
  - caption: 'Contentful: información general de la actividad 2'
    image_url: images/contentful_activity_overview_2.png
    media_type: imagen
  - caption: 'Contentful: información general de la actividad 3'
    image_url: images/contentful_activity_overview_3.png
    media_type: imagen
  - caption: 'Contentful: información general de la actividad 4'
    image_url: images/contentful_activity_overview_4.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Contentful
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

[Contentful][1] es una plataforma de gestión de contenidos (artículos, fotos y vídeos) que permite a las empresas crear, gestionar y distribuir contenidos digitales a través de diversos canales, como sitios web y aplicaciones móviles, mediante su interfaz intuitiva y sus sólidos API o SDK.

Integra con Datadog para obtener información sobre las actividades de Contentful relacionadas con el contenido y otras acciones como parte de tus espacios y entornos de Contentful.

## Configuración

Sigue las instrucciones a continuación para configurar esta integración para tu espacio de Contentful.

### Configuración

#### Configuración del webhook
Configura el endpoint de Datadog para reenviar eventos de Contentful como logs a Datadog. Consulta [Información general del webhook de Contentful][2] para más detalles.

1. Copia la URL generada dentro de la pestaña **Configuration** (Configuración) en el [cuadro de integración de Contentful][3].
2. Inicia sesión en tu [cuenta de Contentful][4] como administrador del espacio.
3. Ve a **Settings > Webhooks** (Configuración > Webhooks).
4. Haz clic en **Add Webhook** (Añadir webhook).
5. Añade un nombre e introduce la URL del webhook que generaste en el paso 1.
6. Para **URL**, selecciona el método `POST`, y para **Active** (Activo), selecciona true.
7. Selecciona el tipo de evento de **Content** (Contenido) y **Action** (Acción) que deseas enviar a Datadog.
8. Configura filtros para activar el webhook para entidades específicas si es necesario.
9. En **Content type** (Tipo de contenido), selecciona `application/json`.
10. En **Payload** (Carga útil), selecciona `Customize the webhook payload` y, a continuación, pega lo siguiente en el campo de entrada:
    ```
    {
      "event": "{ /topic }",
      "user": "{ /user/sys/id }",
      "details": "{ /payload }"
    }
    ```
11. Haz clic en **Save** (Guardar).

## Datos recopilados

### Logs
La integración de Contentful ingiere los siguientes logs:
- Eventos de contenido relacionados con Entries, Assets Y Content Types (Entradas, Activos y Tipos de contenido).
- Eventos de acción relacionados con Scheduled Actions y Bulk Actions (Acciones programadas y Acciones en bloque).
- Otros eventos relacionados con Tasks (Tareas) y Comments (Comentarios).

### Métricas

La integración de Contentful no incluye ninguna métrica.

### Eventos

La integración de Contentful no incluye ningún evento.

### Checks de servicio

La integración de Contentful no incluye ningún check de servicio.

## Asistencia

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].


[1]: https://www.contentful.com/products/platform/
[2]: https://www.contentful.com/developers/docs/webhooks/overview/
[3]: https://app.datadoghq.com/integrations/contentful
[4]: https://be.contentful.com/login/
[5]: https://docs.datadoghq.com/es/help/