---
aliases:
- /es/monitors/incident_management/notification_rules
- /es/monitors/incident_management/incident_settings
- /es/service_management/incident_management/incident_settings/
- /es/incident_response/incident_management/incident_settings
description: Configure y personalice su experiencia de Incident Management
title: Configuración y ajustes
---
## Descripción general {#overview}

Use [Configuración de incidentes][1] para personalizar aspectos de la experiencia de Incident Management para toda su organización. Esta configuración le permite alinear su uso de Incident Management con sus procesos existentes.

## Tipos de incidentes {#incident-types}

Los tipos de incidentes le permiten aplicar diferentes configuraciones a diferentes clases de incidentes. La respuesta para un incidente de seguridad puede ser muy diferente de la respuesta para una interrupción del servicio. Con los tipos de incidentes, puede personalizar cada respuesta.

Para crear un tipo de incidente:
1. Vaya a la página de [Configuración de incidentes][1].
1. Haga clic en **Agregar tipo de incidente**.
1. Especifique un nombre de tipo de incidente.
1. (Opcional) Agregue una descripción.

## Configuración global {#global-settings}

| Configuración     | Descripción    |
| ---  | ----------- |
| Analytics Dashboard | Personalice el Analytics Dashboard para el botón de Analytics en la página principal de Incidents. De forma predeterminada, esto enlaza con el template Incident Management Overview dashboard para [Analytics][1]. |
| Automatizaciones de monitor| Cree menciones de incidentes que se puedan usar en un [mensaje de notificación del monitor][2] para crear incidentes automáticamente cuando se active el monitor. |

## Personalizar la respuesta ante incidentes {#customize-incident-response}

{{< whatsnext desc="Establezca personalizaciones adicionales en lo siguiente:">}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/information" >}}Información{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/integrations" >}}Integrations{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/post_incident/follow-ups" >}}Seguimientos{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/notification_rules" >}}Reglas de notificación{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/property_fields" >}}Campos de propiedad{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/transition_forms" >}}Formularios de transición{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/responder_types" >}}Responder Types{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/templates" >}}Plantillas{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/automations" >}}Automatizaciones{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/incidents/settings
[2]: /es/monitors/notify/