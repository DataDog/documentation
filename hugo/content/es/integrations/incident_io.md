---
app_id: incident-io
app_uuid: 95ee2e88-d2ee-45f8-a4d6-2cb9eced79ee
assets:
  dashboards:
    incident.io - Incidents Overview: assets/dashboards/incident-io_incidents_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 25431122
    source_type_name: incident.io
  logs:
    source: incident-io
  monitors:
    Critical public incident: assets/monitors/critical_public_incident.json
    High number of public incidents: assets/monitors/high_number_of_public_incidents.json
    Public incident reopened: assets/monitors/public_incident_reopened.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- rum
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/incident_io/README.md
display_on_public_website: true
draft: false
git_integration_title: incident_io
integration_id: incident-io
integration_title: incident.io
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: incident_io
public_title: incident.io
short_description: Obtén información sobre las actividades relacionadas con incidentes
  en incident.io.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Incidents
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Configuración
  description: Obtén información sobre las actividades relacionadas con incidentes
    en incident.io.
  media:
  - caption: 'incident.io: información general sobre los incidentes 1'
    image_url: images/incident-io_incidents_overview_1.png
    media_type: imagen
  - caption: 'incident.io: información general sobre los incidentes 2'
    image_url: images/incident-io_incidents_overview_2.png
    media_type: imagen
  - caption: 'incident.io: información general sobre los incidentes 3'
    image_url: images/incident-io_incidents_overview_3.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: incident.io
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

[incident.io][1] ayuda a las empresas a declarar, colaborar, comunicarse y aprender de los eventos que perturban el curso normal de su actividad, desde la caída de infraestructuras críticas hasta las filtraciones de datos y los incidentes de seguridad. Se trata de un servicio que ayuda a los equipos a gestionar con eficacia los incidentes y las interrupciones. Suele ofrecer características como informes de incidentes, seguimiento y flujos de trabajo de resolución.

Integra tu cuenta de incident.io con Datadog para obtener información sobre las actividades relacionadas con incidentes.

## Configuración

Completa las siguientes instrucciones para configurar esta integración y obtener eventos de incidentes de incident.io a través de un webhook.

### Configuración

#### Configuración del webhook
Configura el endpoint de Datadog para reenviar eventos de incidentes de incident.io como logs a Datadog. Para obtener más detalles, consulta la documentación de incident.io sobre [webhooks][2].

1. Selecciona una clave de API existente o crea una nueva haciendo clic en uno de los siguientes botones: <!-- UI Component to be added by Datadog team -->
2. Inicia sesión en tu [cuenta de incident.io][3] como propietario de la organización.
3. Ve a **Settings > Webhooks** (Configuración > Webhooks).
4. Haz clic en **Add Endpoint** (Añadir endpoint).
5. Introduce la URL del webhook que generaste en el paso 1.
6. Selecciona el tipo de incidentes que quieres enviar a Datadog en la sección **Subscribe to events** (Suscribirse a eventos).
7. Haz clic en **Create** (Crear).

## Datos recopilados

### Logs
La integración de incident.io ingiere los siguientes logs:
- Logs de eventos de incidentes públicos
- Logs de eventos de incidentes privados
- Logs de eventos de acción y seguimiento

### Métricas

incident.io no incluye métricas.

### Checks de servicios

incident.io no incluye checks de servicio.

### Eventos

incident.io no incluye eventos.

## Asistencia

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][4].

[1]: https://incident.io/
[2]: https://api-docs.incident.io/tag/Webhooks/
[3]: https://app.incident.io/
[4]: https://docs.datadoghq.com/es/help/