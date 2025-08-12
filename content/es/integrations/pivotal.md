---
"app_id": "pivotal"
"app_uuid": "c28e887f-43e0-4b99-aa2b-3f02d4f10763"
"assets":
  "integration":
    "auto_install": false
    "events":
      "creates_events": true
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "9"
    "source_type_name": "Pivotal"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "collaboration"
- "issue tracking"
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "pivotal"
"integration_id": "pivotal"
"integration_title": "Pivotal"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "pivotal"
"public_title": "Pivotal"
"short_description": "Pivotal Tracker es un software como servicio (SaaS) de colaboración y gestión de proyectos ágiles"
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Collaboration"
  - "Category::Issue Tracking"
  - "Offering::Integration"
  - "Submitted Data Type::Events"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Pivotal Tracker es un software como servicio (SaaS) de colaboración y gestión de proyectos ágiles"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Pivotal"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

[Pivotal Tracker][1] utiliza historias para ayudar a los equipos a realizar un seguimiento de los proyectos y colaborar a lo largo de las diferentes etapas del ciclo de desarrollo, como la creación de nuevas funciones, la resolución de errores o el tratamiento de la deuda técnica. Conecta Pivotal Tracker a Datadog para:

- Ver y discutir el progreso de tus historias en el Explorador de eventos de Datadog.
- Correlacionar y graficar la finalización de historias con otros eventos y otras métricas en tu sistema.
- Recibir notificaciones sobre las actualizaciones de tus historias.

## Configuración

### Instalación

Para obtener eventos Pivotal en en el Explorador de eventos de Datadog, introduce el token de API generado desde la [página de tu perfil] de Pivotal[2].

![token de pivotal][3]

## Datos recopilados

### Métricas

La integración Pivotal Tracker no incluye métricas.

### Eventos

La integración Pivotal Tracker no incluye eventos.

### Checks de servicio

La integración Pivotal Tracker no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][4].

[1]: https://www.pivotaltracker.com/features
[2]: https://www.pivotaltracker.com/signin
[3]: images/pivotal_token.png
[4]: https://docs.datadoghq.com/help/

