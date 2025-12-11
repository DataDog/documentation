---
app_id: twilio
app_uuid: 488f85eb-ce17-4c50-a6e9-78d61f360693
assets:
  dashboards:
    twilio: assets/dashboards/twilio_overview.json
  integration:
    auto_install: false
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10406
    source_type_name: Twilio
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- gestión de costos
- gestión de eventos
- rastreo de problemas
- recopilación de logs
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: twilio
integration_id: twilio
integration_title: Twilio
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: twilio
public_title: Twilio
short_description: Monitoriza problemas de rendimiento, reduce costos e identifica
  amenazas a la seguridad en todos tus recursos de Twilio.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cost Management
  - Category::Event Management
  - Category::Issue Tracking
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Monitoriza problemas de rendimiento, reduce costos e identifica amenazas
    a la seguridad en todos tus recursos de Twilio.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-twilio-with-datadog/
  - resource_type: documentación
    url: https://docs.datadoghq.com/integrations/twilio/
  support: README.md#Support
  title: Twilio
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-internal-core -->


## Información general

La integración de Twilio de Datadog recopila una amplia variedad de logs para analizar problemas de rendimiento y detectar amenazas en todos sus recursos de Twilio. Utiliza el dashboard predefinido para agregar alertas, solucionar problemas de mensajes y errores de llamadas y recopilar información completa de registro de eventos y rastreo de cambios para tu cuenta de Twilio.

En forma predeterminada, esta integración recopila logs de [Alert Resource][1]. Estos logs proporcionan detalles de los errores o advertencias encontradas cuando Twilio hace una solicitud de webhook a tu servidor o cuando tu aplicación hace una solicitud a la API REST.

<div class="alert alert-info">Puedes utilizar Cloud Cost Management para obtener información sobre tus datos de costos de Twilio. Consulta la <a href="https://docs.datadoghq.com/cloud_cost_management/saas_costs/?tab=twilio">página de integraciones de costos SaaS</a> para obtener más información.</div>

### Logs de mensajes

Un log de recurso de [Mensaje][2] representa un mensaje entrante o saliente. Se generará un log cuando se produzca cualquiera de los siguientes casos:

- Creas un recurso de mensaje (es decir, envías un mensaje saliente) a través de la API REST
- Twilio ejecuta una instrucción TwiML
- Alguien envía un mensaje a uno de tus números de Twilio o direcciones de canal de mensajería

Utilizas estos logs para rastrear la entrega total y solucionar errores de mensajes. Datadog nunca recopila los cuerpos de los mensajes.

### Logs de resumen de llamadas

Los logs de [Recurso de resumen de llamadas][3] proporcionan una información general de los metadatos y el rendimiento de todas las llamadas realizadas desde tu cuenta de Twilio. Para obtener información práctica sobre tus llamadas, habilita [Voice Insights Advanced Features][4] de Twilio para tu cuenta.

### Logs de eventos:

Monitoriza Twilio Event Resources para un registro completo de eventos y un rastreo de cambios para los recursos de Twilio. Los eventos se registran cuando suministras un número telefónico, cambias la configuración de seguridad de tu cuenta, eliminas un registro, etc. Los eventos registran virtualmente cada acción realizada en Twilio, sin importar si esa acción se realizó a través de la API, por un usuario en la consola de Twilio o incluso por un empleado de Twilio.

Datadog [Cloud SIEM][5] analiza y correlaciona logs de eventos de Twilio para detectar amenazas a tu entorno en tiempo real.

## Configuración

### Instalación

1. [Genera una clave de la API y un secreto de la API][6] a través de la interfaz de usuario de Twilio.
2. Busca el SID de tu cuenta en el dashboard de la consola de Twilio, en Información de la cuenta.
3. En el [cuadro de integración de Twilio][7], introduce el SID de tu clave de API de Twilio, el secreto de la API y el SID de la cuenta de Twilio desde la que deseas ingerir los datos.
4. Si utilizas Cloud Cost Management y activas la recopilación de datos de costos, estos serán visibles en [Cloud Cost Management][8] en 24 horas. ([datos recopilados][9])

### Validación

Busca tus logs de Datadog con `source:twilio`. Si has instalado la integración correctamente, deberías ver eventos de Twilio.

## Datos recopilados

### Métricas

La integración de Twilio no incluye ninguna métrica.

### Checks de servicio

La integración de Twilio no incluye ningún check de servicio.

### Eventos

La integración de Twilio ingiere [recursos de eventos][1].

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

[1]: https://www.twilio.com/docs/usage/monitor-alert
[2]: https://www.twilio.com/docs/messaging/api/message-resource
[3]: https://www.twilio.com/docs/voice/voice-insights/api/call/call-summary-resource
[4]: https://www.twilio.com/docs/voice/voice-insights/advanced-features
[5]: https://app.datadoghq.com/security/siem/home
[6]: https://www.twilio.com/docs/iam/api-keys#create-an-api-key
[7]: https://app.datadoghq.com/integrations/twilio
[8]: https://app.datadoghq.com/cost
[9]: https://docs.datadoghq.com/es/cloud_cost_management/saas_costs/?tab=twilio#data-collected
[10]: https://docs.datadoghq.com/es/help/