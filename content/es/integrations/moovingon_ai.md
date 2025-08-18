---
app_id: moovingon-ai
app_uuid: 1a02140e-4927-49c9-8442-dff81a18c703
assets:
  dashboards:
    moovingon.ai Overview: assets/dashboards/moovingon.ai_overview.json
  logs: {}
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.moovingon.com/
  name: moovingon
  sales_email: sales@moovingon.com
  support_email: support@moovingon.com
categories:
- notificaciones
- rum
- automatización
- colaboración
- gestión de eventos
- events
- seguimiento de problemas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/moovingon_ai/README.md
display_on_public_website: true
draft: false
git_integration_title: moovingon_ai
integration_id: moovingon-ai
integration_title: moovingon.ai
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: moovingon_ai
public_title: moovingon.ai
short_description: moovingon.ai es una plataforma de orquestación y automatización
  de NOCs
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Notifications
  - Category::Incidents
  - Category::Automation
  - Category::Collaboration
  - Category::Event Management
  - Category::Alerting
  - Category::Issue Tracking
  - Offering::Integration
  - Queried Data Type::Events
  - Submitted Data Type::Events
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: moovingon.ai es una plataforma de orquestación y automatización de
    NOCs
  media:
  - caption: Directrices de moovingon.ai
    image_url: images/moovingon_ai-guidelines.png
    media_type: imagen
  - caption: Eventos de moovingon.ai
    image_url: images/moovingon_ai-events.png
    media_type: imagen
  - caption: Integraciones de moovingon.ai
    image_url: images/moovingon.ai-integrations.png
    media_type: imagen
  - caption: Dashboard de información general de moovingon.ai
    image_url: images/moovingon_ai-overview-dashbard.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: moovingon.ai
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general
[moovingon.ai][1] es una plataforma para la gestión de operaciones en la nube y NOC. Consolida las alertas a través de tu conjunto de observabilidad y las asocia con manuales automatizados para la remediación de alertas e incidentes. Con esta integración, puedes utilizar la potencia de Datadog y moovingon.ai para una gestión de incidentes eficiente y automatizada.

moovingon.ai utiliza los monitores, logs y los datos de evento de Datadog para la correlación y agregación de alertas.
Entre las principales características de integración se incluyen:

1. **Gestión de alertas focalizadas**: dentro de moovingon.ai, utiliza el dashboard de moovingon.ai para agrupar todas tus alertas de Datadog proporcionándote un control sencillo y una visibilidad clara.
2. **Gestión integral de incidentes**: todas las acciones de remediación realizadas en moovingon.ai se envían a Datadog como eventos para mayor claridad de cumplimiento y remediación.
3. **Análisis exhaustivo**: utiliza los análisis proporcionados por moovingon.ai para obtener información de las alertas de Datadog en Datadog. Esto ayuda a la toma de decisiones proactiva y al análisis de tendencias.

## Ajuste

### Instalación

1. Haz clic en **Connect Accounts** (Conectar cuentas) para iniciar sesión en moovingon.ai.
2. Introduce un nombre para la integración de Datadog y **Submit** (Enviar).
3. Ve a la pantalla de Datadog OAuth2 y haz clic en el botón **Authorize** (Autorizar).
4. Opcionalmente, para gestionar todas las notificaciones desde monitores de Datadog dentro de moovingon.ai, haz clic en **Install/Update the webhook** (Instalar/Actualizar el webhook). Como alternativa, basta con adjuntar la etiqueta @webhook-moovingon_ai al monitor deseado.

## Desinstalación

1. Dentro de la cuenta de moovingon.ai, ve a **Settings** --> **Templates** (Configuración --> Plantillas) y elimina todas las plantillas relacionadas de Datadog.
2. Ve a **Setings** --> **Integrations** (Configuración --> Integraciones) y elimina la integración de Datadog.
3. Dentro de Datadog, **Integrations** --> **Integrations** (Integraciones --> Integraciones).
4. Haz clic en el cuadro de moovingon.ai y haz clic en **Uninstall integration** (Desinstalar integración).


### Métricas

moovingon.ai no incluye ninguna métrica.

### Checks de servicio

moovingon.ai no incluye ningún check de servicio.

### Eventos

La integración de moovingon incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de moovingon.ai][2].

## Para leer más

Más enlaces, artículos y documentación útiles:

- [Aumentar la visibilidad de los incidentes de red mediante moovingon.ai y Datadog][3]

[1]: https://moovingon.ai/
[2]: mailto:support@moovingon.com
[3]: https://www.datadoghq.com/blog/moovingon-datadog-marketplace/