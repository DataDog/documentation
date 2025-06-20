---
app_id: buddy
app_uuid: f9d740e2-31b5-427c-a65b-41984656cc73
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: buddy.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10004
    source_type_name: Buddy
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Buddy
  sales_email: support@buddy.works
  support_email: support@buddy.works
categories:
- automation
- developer tools
- event management
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/buddy/README.md
display_on_public_website: true
draft: false
git_integration_title: buddy
integration_id: buddy
integration_title: Buddy
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: buddy
public_title: Buddy
short_description: Automatización de entrega con un solo clic con vistas previas de
  sitios web funcionales para desarrolladores web.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automatización
  - Category::Herramientas para desarrolladores
  - Category::Gestión de eventos
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::integración
  configuration: README.md#Setup
  description: Automatización de entrega con un solo clic con vistas previas de sitios
    web funcionales para desarrolladores web.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Buddy
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general
Buddy es una plataforma de automatización de integración continua que se puede utilizar para crear, probar y desplegar sitios web y aplicaciones.

La integración de Buddy te permite:

- Enviar eventos sobre tus despliegues de Buddy a Datadog.
- Correlacionar los detalles de despliegues con tus métricas de Datadog.
- Detectar fuentes de picos de rendimiento en tus pipelines.

![datadog-integration][1]

## Configuración

- En la configuración de tu cuenta de Datadog, ve a [Integrations -> APIs][2] y copia el token **API Key**.

- [Inicia sesión en tu cuenta de Buddy][3] y ve al pipeline con la acción de despliegue que deseas rastrear.

- Haz clic en el signo más al final del pipeline y selecciona **Datadog** en la sección **Notifications**.

- Ingresa el nombre de tu cuenta de Datadog y pega la clave API que copiaste.

- Utiliza los [parámetros de Buddy][4] para definir el título del evento y el contenido enviado, por ejemplo:

```text
# Event title
${'${execution.pipeline.name} execution #${execution.id}'}

# Content
${'${execution.to_revision.revision} - ${execution.to_revision.message}'}
```

- Cuando estés listo, haz clic en **Add action** y ejecuta el pipeline. En cada despliegue exitoso, Buddy envía un evento a Datadog:

![snapshot][5]

## Datos recopilados

### Métricas

El check de Buddy no incluye métricas.

### Eventos

Todos los eventos de despliegue de Buddy se envían a tu [flujo de eventos de Datadog][6]

### Checks de servicio

El check de Buddy no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][7].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/buddy/images/datadog-integration.png
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.buddy.works/login
[4]: https://buddy.works/knowledge/deployments/what-parameters-buddy-use
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/buddy/images/snapshot.png
[6]: https://docs.datadoghq.com/es/events/
[7]: https://docs.datadoghq.com/es/help/