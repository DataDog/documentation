---
app_id: intercom
app_uuid: cacc2ad1-f88b-4306-af8e-90c76e0478a0
assets:
  dashboards:
    Intercom Activity: assets/dashboards/intercom_activity.json
    Intercom Conversation: assets/dashboards/intercom_conversation.json
    Intercom Data Event: assets/dashboards/intercom_data_event.json
    Intercom News Item: assets/dashboards/intercom_news_item.json
    Intercom Ticket: assets/dashboards/intercom_ticket.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 26100804
    source_type_name: Intercom
  logs:
    source: intercom
  monitors:
    Large Number of Low Rated Conversations: assets/monitors/large_number_of_low_rated_conversations.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- colaboración
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/intercom/README.md
display_on_public_website: true
draft: false
git_integration_title: intercom
integration_id: intercom
integration_title: Intercom
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: intercom
public_title: Intercom
short_description: Obtén información sobre datos de actividades de administración
  de Intercom, eventos de datos, conversaciones, novedades y tickets.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Collaboration
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Obtén información sobre datos de actividades de administración de Intercom,
    eventos de datos, conversaciones, novedades y tickets.
  media:
  - caption: Actividad de Intercom
    image_url: images/intercom_activity.png
    media_type: imagen
  - caption: Evento de datos de Intercom
    image_url: images/intercom_data_event.png
    media_type: imagen
  - caption: Conversación de Intercom
    image_url: images/intercom_conversation_1.png
    media_type: imagen
  - caption: Conversación de Intercom
    image_url: images/intercom_conversation_2.png
    media_type: imagen
  - caption: Novedades de Intercom
    image_url: images/intercom_news_item.png
    media_type: imagen
  - caption: Ticket de Intercom
    image_url: images/intercom_ticket.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Intercom
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

[Intercom][1] es una plataforma de comunicación con el cliente que permite a las empresas interactuar con sus usuarios a través de mensajes en la aplicación, correo electrónico y chat. Ofrece funciones como chat en directo, mensajería automatizada y herramientas de atención al cliente, lo que facilita a las empresas ofrecer experiencias personalizadas a sus clientes.

La integración Intercom recopila de forma fluida datos de actividades de administración, eventos de datos, conversaciones, novedades y tickets, y los introduce en Datadog para su análisis exhaustivo mediante [webhooks][2].

## Configuración

Sigue las instrucciones siguientes para configurar esta integración para tu cuenta de Intercom.

### Configuración

#### Configuración del webhook

Configura el endpoint Datadog para reenviar eventos de Intercom como logs a Datadog. Para ver más detalles, consulta la [información general del webhook de Intercom][3].

1. Copia la URL generada en la pestaña **Configuración** del [cuadro de la integración Intercom][4] de Datadog.
2. Inicia sesión en tu cuenta de [Intercom][5] utilizando una cuenta de usuario con acceso completo a Aplicaciones e Integraciones.
3. Ve a **Configuración**.
4. En la sección Integraciones, selecciona **Centro para desarrolladores**.
5. Haz clic en **New app** (Nueva aplicación).
6. Rellena los datos necesarios para tu solicitud, incluido el nombre y el espacio de trabajo asociado.
7. Haz clic en **Create app** (Crear aplicación).

- #### Configurar temas de webhooks
    1. Selecciona los permisos necesarios
        1. Después de crear la aplicación, ve a la sección *Autenticación* del menú de la izquierda y haz clic en el botón **Edit** (Editar) de la esquina superior derecha.
        2. Por defecto, todos los permisos están habilitados. Asegúrate de que estén habilitados los siguientes permisos específicos:
            - Leer administradores
            - Leer datos de contenido
            - Leer conversaciones
            - Leer eventos
            - Leer tickets
        3. Haz clic en **Save** (Guardar).
    2. Seleccionar temas de webhooks
        1. A continuación, ve a la sección **Webhooks** utilizando el menú de la izquierda.
        2. Introduce la URL del endpoint que generaste en el paso 1 de [configuración del webhook](#webhook-configuration).
        3. En el menú desplegable **Seleccionar un tema**, selecciona los siguientes temas de webhook:
            - admin.activity_log_event.created
            - content_stat.news_item
            - conversation.admin.closed
            - conversation.admin.replied
            - conversation.admin.single.created
            - conversation.admin.snoozed
            - conversation.admin.unsnoozed
            - conversation.priority.updated
            - conversation.rating.added
            - conversation.user.created
            - event.created
            - ticket.admin.assigned
            - ticket.attribute.updated
            - ticket.created
            - ticket.state.updated
            - ticket.team.assigned
        4. Haz clic en **Save** (Guardar).

## Datos recopilados

### Logs

La integración Intercom recopila y envía logs de actividades de administración, tickets, eventos de datos, noticias y conversaciones a Datadog.

### Métricas

La integración Intercom no incluye métricas.

### Eventos

La integración Intercom no incluye eventos.

### Checks de servicio

La integración Intercom no incluye checks de servicios.

## Asistencia

Para obtener más ayuda, ponte en contacto con el [servicio de asistencia de Datadog][6].

[1]: https://www.intercom.com/
[2]: https://developers.intercom.com/docs/references/2.10/webhooks/webhook-models
[3]: https://developers.intercom.com/docs/webhooks
[4]: https://app.datadoghq.com/integrations/intercom
[5]: https://app.intercom.com/
[6]: https://docs.datadoghq.com/es/help/