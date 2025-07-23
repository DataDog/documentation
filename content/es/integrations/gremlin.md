---
app_id: gremlin
app_uuid: 451a4863-1767-4c11-8831-d196ae4643d0
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: gremlin.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10031
    source_type_name: Gremlin
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Gremlin
  sales_email: support@gremlin.com
  support_email: support@gremlin.com
categories:
- seguimiento de problemas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/gremlin/README.md
display_on_public_website: true
draft: false
git_integration_title: gremlin
integration_id: gremlin
integration_title: Gremlin
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: gremlin
public_title: Gremlin
short_description: Enviar eventos que ocurren en Gremlin a Datadog
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Seguimiento de incidentes
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Enviar eventos que ocurren en Gremlin a Datadog
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/gremlin-datadog/
  support: README.md#Soporte
  title: Gremlin
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Visualiza, vuelve a ejecutar y detén los ataques en Gremlin directamente desde Datadog.

Emparejar Gremlin con [eventos][1] Datadog es una forma eficaz de añadir contexto de prueba de fallos a tus flujos de trabajo de Datadog.

- Superpón eventos de ataques a tus dashboards para saber exactamente cómo y cuándo Gremlin afecta a tus métricas.
- Mostrar, volver a ejecutar y detener ataques en Gremlin desde tu [Flujo de eventos][2] Datadog

![snapshot][3]

## Configuración

### Configuración

Para activar esta integración, necesitas pasar tu clave de API Datadog a Gremlin. Puedes hacerlo en la [página Integraciones][4], haciendo clic en el botón **Add** (Añadir) en la fila de **Datadog**. Se te pedirá que introduzcas su **Clave de API Datado**. Una vez introducida, se inicializa la integración.

- Clave de API: <span class="hidden-api-key">\${api_key}</span>

Deberías empezar a ver eventos de esta integración en tu [Flujo de eventos][2].

## Datos recopilados

### Métricas

La integración Gremlin no proporciona métricas.

### Eventos

La integración Gremlin envía eventos a tu [Flujo de eventos Datadog][4] cuando se inician o detienen ataques en Gremlin.

### Checks de servicios

La integración Gremlin no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorización de Gremlin de su propio servicio de Ingeniería del Caos con Datadog][6]

[1]: https://docs.datadoghq.com/es/getting_started/#events
[2]: https://app.datadoghq.com/event/stream
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/gremlin/images/events-overlay.png
[4]: https://app.gremlin.com/settings/integrations
[5]: https://docs.datadoghq.com/es/help/
[6]: https://www.datadoghq.com/blog/gremlin-datadog/