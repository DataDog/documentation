---
app_id: xmatters
app_uuid: fff150f0-a26a-48eb-a16b-21e426e6835e
assets:
  integration:
    auto_install: true
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 164
    source_type_name: xMatters
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- event management
- collaboration
- incidents
- notifications
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: xmatters
integration_id: xmatters
integration_title: xMatters
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: xmatters
public_title: xMatters
short_description: Utiliza xMatters como canal de notificación en las alertas y eventos
  de Datadog.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Event Management
  - Category::Collaboration
  - Category::Incidents
  - Category::Notifications
  - Offering::Integration
  configuration: README.md#Setup
  description: Utiliza xMatters como canal de notificación en las alertas y eventos
    de Datadog.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: xMatters
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
![Información general de xMatters][1]

## Información general

xMatters es una plataforma de disponibilidad de servicios digitales que evita que los problemas tecnológicos se conviertan en problemas de negocio. Las grandes empresas, los SRE ágiles y los equipos de DevOps innovadores confían en su respuesta proactiva a incidencias, su automatización y su servicio de gestión para mantener la visibilidad y el control operativos en el entorno tecnológico altamente fragmentado de hoy en día. xMatters para Datadog integra a las personas en tus cadenas de herramientas que abarcan equipos y silos.

Conecta Datadog a xMatters para:

- Activar las notificaciones de xMatters con respuestas integradas en todas tus herramientas informáticas
- Notificar a los encargados de la resolución en función de las reglas de escalado, los horarios de guardia, las habilidades y la localización
- Consultar el horario de guardia actual de xMatters en Datadog
- Configurar opciones de respuesta que activan otras integraciones de xMatters e impulsar el flujo de trabajo para tareas como la creación de tiques, la actualización de consolas, el envío de notificaciones adicionales y el inicio de la colaboración por chat y llamada en conferencia
- Añade informes y análisis adicionales a tus procesos operativos

## Configuración

### Instalación

Para configurar la integración de xMatters y Datadog:

- Genera una [nueva clave de aplicación][2] para su uso por xMatters.
- [Configura el proceso de xMatters][3].
- Configura cada uno de los webhooks de xMatters con la [integración de webhooks de Datadog][4].

## Datos recopilados

### Métricas

La integración de xMatters no incluye ninguna métrica.

### Eventos

La integración de xMatters recopila eventos.

### Checks de servicio

La integración de xMatters no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: images/xmatters.png
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://help.xmatters.com/integrations/#cshid=DATADOG
[4]: https://app.datadoghq.com/account/settings#integrations/webhooks
[5]: https://docs.datadoghq.com/es/help/