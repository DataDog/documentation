---
description: Solicite a los responsables de incidentes que completen campos específicos
  al cambiar el estado.
title: Formularios de transición
---
## Descripción general {#overview}

Cada vez que un incidente avanza a través de cambios de estado, puede guiar a los responsables para que completen campos en el incidente con formularios de transición. Estos formularios ayudan a garantizar que la información sobre el incidente se recopile en el momento adecuado del proceso de respuesta a incidentes. Por ejemplo, puede crear un formulario que requiera que los responsables seleccionen Teams y un propietario del postmortem antes de que se resuelva un incidente. Este formulario se mostrará a los responsables a medida que resuelvan el incidente en Datadog, Slack o Microsoft Teams.

{{< img src="/incident_response/incident_management/setup_and_configuration/status_transition_form.png" alt="Formulario de cambio de estado que solicita al usuario que complete los campos obligatorios de Teams y Propietario del postmortem al cambiar un incidente a Resuelto" style="width:70%;" >}}

<div class="alert alert-info">Los campos obligatorios en los formularios de transición se aplican solo a los cambios de estado realizados por una persona. Los cambios de estado automatizados, como los activados a través de la API o <a href="/incident_response/incident_management/setup_and_configuration/automations">automatizaciones de incidentes</a>, no se bloquean.</div>

## Requisitos previos {#prerequisites}

Para configurar formularios de transición, debe tener el `Incident Settings Write` permiso. Para obtener más información, consulte [Permisos de rol de Datadog][1].

## Configure un formulario de transición {#configure-a-transition-form}

1. En Datadog, navegue a **Incidents** > [**Settings**][2].
1. En **Incident Types**, expanda un tipo de incidente para editarlo.
1. Haga clic en la pestaña **Transition Forms**.
1. Seleccione el estado que desea configurar.
1. Elija qué campos aparecen en el formulario. Puede agregar [campos de propiedad][3] y [tipos de responsable][4]. Cualquier campo puede marcarse como obligatorio u opcional.
1. Haga clic en **Guardar**.

[1]: /es/account_management/rbac/permissions/#case-and-incident-management
[2]: https://app.datadoghq.com/incidents/settings
[3]: /es/incident_response/incident_management/setup_and_configuration/property_fields
[4]: /es/incident_response/incident_management/setup_and_configuration/responder_types