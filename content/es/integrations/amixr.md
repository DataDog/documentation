---
app_id: amixr
app_uuid: 051b4bbe-d7cc-46bf-9a66-169ab7d5a4aa
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: amixr.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10103
    source_type_name: Amixr
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Amixr
  sales_email: ildar@amixr.io
  support_email: ildar@amixr.io
categories:
- events
- automatización
- colaboración
- rum
- notificaciones
- orquestación
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/amixr/README.md
display_on_public_website: true
draft: false
git_integration_title: amixr
integration_id: amixr
integration_title: Amixr
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amixr
public_title: Amixr
short_description: Gestión de alertas fácil para desarrolladores con una excelente
  integración con Slack
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Alertar
  - Categoría::Automatización
  - Categoría::Colaboración
  - Categoría::Incidentes
  - Categoría::Notificaciones
  - Categoría::Orquestación
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Gestión de alertas fácil para desarrolladores con una excelente integración
    con Slack
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Amixr
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Utiliza Amixr para gestionar alertas con una integración de Slack:

- Recopilar y analizar alertas y otros eventos de Datadog
- Configurar rotaciones de guardia con el calendario de Google o en Slack
- Configurar cadenas de escalamiento automático
- Recibir alertas con llamadas telefónicas y SMS
- Orquestar la gestión de incidencias con GitOps

![Amixr_Interface][1]

## Configuración

### Instalación

No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

En Amixr:

1. Ve a *Settings > Connect New Monitorings > Datadog > How to connect*.
2. Copia la URL del webhook de Datadog.

En Datadog:

1. Ve a la página **Integrations** desde la barra lateral.
2. Busca **webhook** en la barra de búsqueda.
3. Introduce un nombre para la integración, por ejemplo: `amixr-alerts-prod`.
4. Pega la URL del webhook del paso anterior.
5. Haz clic en el botón de guardar.

### Validación

En Datadog:

1. Ve a la página **Events** desde la barra lateral.
2. Escribe `@webhook-<integration name><YOUR TEXT HERE>`, por ejemplo: `@webhook-amixr-alerts-prod test alert`.
3. Haz clic en el botón de publicar.

En Amixr:

1. Navega a **Incidents** desde la barra lateral para verificar si se recibió la alerta.

## Datos recopilados

### Métricas

La integración de Amixr no incluye ninguna métrica.

### Checks de servicios

La integración de Amixr no incluye ningún check de servicio.

### Eventos

La integración de Amixr no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Amixr][2].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/amixr/images/amixr-interface.png
[2]: https://amixr.io/support/