---
app_id: blink
app_uuid: f2bd43a7-bbc5-4f69-89b7-437afbbff9fd
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10316
    source_type_name: Blink
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.blinkops.com/
  name: Blink
  sales_email: support@blinkops.com
  support_email: support@blinkops.com
categories:
- automatización
- nube
- rum
- notificaciones
- orquestación
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/blink/README.md
display_on_public_website: true
draft: false
git_integration_title: blink
integration_id: blink
integration_title: Blink
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: blink
public_title: Blink
short_description: Blink es una plataforma de automatización sin código para la seguridad
  y la infraestructura.
supported_os:
- linux
- Windows
- MacOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Cloud
  - Category::Incidents
  - Category::Notifications
  - Category::Orchestration
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Blink es una plataforma de automatización sin código para la seguridad
    y la infraestructura.
  media:
  - caption: Crea y actualiza automáticamente los incidentes de Datadog mediante flujos
      de trabajo interactivos de Blink.
    image_url: images/incident.png
    media_type: imagen
  - caption: Consulta rápidamente una lista de todas las incidencias activas de Datadog
      desde tu automatización Blink.
    image_url: images/list-incidents.png
    media_type: imagen
  - caption: Conecta la integración de Blink para empezar a crear automatizaciones
      que tomen medidas en respuesta a los incidentes de Datadog.
    image_url: images/connection-creation.png
    media_type: imagen
  - caption: Una automatización de Blink programada automáticamente que crea incidencias
      en Datadog.
    image_url: images/new-incident.png
    media_type: imagen
  overview: README.md#Overview
  support: support@blinkops.com
  title: Blink
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

[Blink][1] es una plataforma de bajo código/sin código (LCNC) que permite la respuesta automatizada a incidentes, operaciones nativas en la nube y flujos de trabajo de operaciones de seguridad. Blink transforma las tareas manuales en automatizaciones interactivas respaldadas por la seguridad y fiabilidad de una plataforma nativa en la nube. Cada script o ticket se convierte en una automatización totalmente gestionada.

La interfaz de usuario y [biblioteca de automatización][2] vienen con automatizaciones y casos de uso preconfigurados basados en Datadog. Blink te ayuda a conseguir una mayor eficiencia de la nube y unos SLA más competitivos, con menos cuellos de botella operativos.

Esta integración lista para usar te permite lo siguiente:

- Activar automatizaciones de Blink basadas en eventos utilizando incidentes de Datadog.
- Crear y actualizar automáticamente incidencias en Datadog desde Blink.
- Ver incidentes o eventos desde el explorador de eventos de Datadog en Blink.
- Enriquecer y corregir automáticamente los incidentes de Datadog mediante automatizaciones de Blink.

Para obtener más información sobre Blink, consulta la [documentación sobre Blink][3].

## Configuración 

Visita [nuestra documentación][4] para obtener más información sobre cómo conectar tu espacio de trabajo Datadog a Blink.

## Desinstalación

Para desinstalar la integración, basta con eliminar la conexión correspondiente de Datadog en tu espacio de trabajo de Blink.

Una vez eliminados, se revocan todas las autorizaciones o tokens de acceso anteriores.

## Datos recopilados 

### Eventos

Esto integración envía eventos e incidentes a Datadog donde puedes buscar y actualizar cualquier incidente relevante en Blink. 

### Monitors (Monitores)

Puede ver, modificar y crear monitores de Datadog en Blink.

### Métricas

Blink no incluye ninguna métrica, sin embargo, puedes consultar y hacer listas de métricas desde tu entorno de Datadog para utilizarlas en automatizaciones de Blink.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con [soporte técnico de Blink][5].

[1]: https://www.blinkops.com/
[2]: https://library.blinkops.com/automations?vendors=Datadog
[3]: https://www.docs.blinkops.com/docs/integrations/datadog/actions
[4]: https://www.docs.blinkops.com/docs/integrations/datadog
[5]: mailto:support@blinkops.com