---
app_id: sentry
app_uuid: c5e6ea68-6042-405f-abda-1e4fced494ee
assets:
  integration:
    auto_install: true
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 56
    source_type_name: Sentry
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- collaboration
- issue tracking
- event management
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: sentry
integration_id: sentry
integration_title: Sentry
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sentry
public_title: Sentry
short_description: Consulta las excepciones de Sentry en tu flujo de eventos de Datadog.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Collaboration
  - Category::Issue Tracking
  - Category::Event Management
  - Offering::Integration
  configuration: README.md#Setup
  description: Consulta las excepciones de Sentry en tu flujo de eventos de Datadog.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/datadog-sentry-integration-collaborative-bug-fixing/
  support: README.md#Troubleshooting
  title: Sentry
---

<!--  FUENTE https://github.com/DataDog/integrations-internal-core -->
{{< img src="integrations/sentry/sentry.png" alt="Evento de Sentry" popup="true">}}

## Información general

Sentry proporciona monitorización del rendimiento de aplicaciones y seguimiento de errores basados en la nube y autoalojados que ayudan a los equipos de software a ver con mayor claridad, resolver más rápido y aprender de manera continua. 

La integración de Sentry de Datadog reenvía de manera automática los eventos de Sentry al flujo de eventos de Datadog, lo que te permite buscar y comentar errores y correcciones de fallos, y correlacionar los errores de Sentry con métricas y datos de tus demás sistemas.

## Configuración

### Instalación

Configuración de la integración de Sentry:

1. Inicia sesión en Sentry.
2. Dirígete a **Settings > Projects** (Configuración > Proyectos) y selecciona el proyecto adecuado.
3. En el lado izquierdo, selecciona **Legacy Integrations** (Integraciones heredadas).
4. Desplázate hasta **Webhooks integration** (Integración de webhooks), haz clic en el control deslizante para activarla y, a continuación, haz clic en **Configure Plugin** (Configurar complemento).
5. En **Callback URLs'** (URLs de devolución de llamada), ingresa la URL de devolución de llamada que se copió del cuadro de la integración.
6. Haz clic en **Save changes** (Guardar cambios).
7. Si es necesario, habilita la integración al hacer clic en **Enable Plugin** (Habilitar complemento).

De manera predeterminada, Sentry envía un ping al webhook con datos de eventos cada vez que hay una excepción nueva (en lugar de una instancia nueva de una excepción ya registrada). Si quieres activadores diferentes (o adicionales), puedes configurarlos en la sección de alertas de la configuración de tu proyecto.

### Añadir un nombre de host a los errores (opcional)

En ocasiones, el nombre del servidor que informa Sentry puede no coincidir con el nombre de host que reconoce Datadog. A fin de solucionarlo, establece un valor personalizado para la etiqueta (tag) `server_name`, que se adjunta a cada evento.

Para usar un nombre de host diferente y conservar el valor `server_name` predeterminado de Sentry, establece una etiqueta `hostname` en tus eventos. Consulta la documentación de Sentry sobre la [Personalización de etiquetas][1] para tu lenguaje específico.

## Solucionar problemas

### No se muestran los errores de Sentry en Datadog

Si no se muestran los errores de Sentry en Datadog, es probable que no se esté activando el webhook de Sentry. Esto podría deberse a las siguientes situaciones:

**Las alertas solo se envían cuando se activa una regla**:<br>
Por ejemplo, si la condición de la regla es «cuando se produce un evento por primera vez», no se envía una alerta hasta que se genera un problema nuevo. Según la cantidad de problemas únicos que reciba tu proyecto, esto puede llevar cierto tiempo.

**La integración de notificaciones se encuentra deshabilitada**:<br>
Asegúrate de que la integración de notificaciones se encuentre habilitada en las acciones de la regla, ya sea como servicio específico o en «todos los servicios habilitados».

## Referencias adicionales

- [Corrección de errores colaborativa con la integración de Sentry de Datadog][2]

[1]: https://docs.sentry.io/platforms/java/enriching-events/tags/
[2]: https://www.datadoghq.com/blog/datadog-sentry-integration-collaborative-bug-fixing/