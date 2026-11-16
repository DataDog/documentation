---
description: Utilice Terraform para administrar la configuración de Incident Management,
  incluidos los tipos de incidentes, campos de propiedades, roles de respuesta, reglas
  de notificación, plantillas de postmortem y plantillas de notificación.
disable_toc: false
further_reading:
- link: /incident_response/incident_management/
  tag: Documentación
  text: Obtenga más información sobre Incident Management
- link: /incident_response/incident_management/guides/test_incidents/
  tag: Documentación
  text: Uso de incidentes de prueba para capacitación y prueba
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
  tag: Documentación
  text: Proveedor de Terraform para Datadog
title: Administre Incident Management con Terraform
---
## Descripción general {#overview}

Puede utilizar Terraform para administrar su configuración de Incident Management a través de Datadog API. Esta guía cubre los recursos de Incident Management disponibles en el [registro de Terraform][1] y enlaza con la documentación de Datadog correspondiente para cada uno.

Configurar manualmente los tipos de incidentes, campos, roles y reglas de notificación en la UI funciona bien para un puñado de equipos. Se vuelve más difícil escalar a medida que su organización crece, por ejemplo, al estandarizar la configuración en cientos de equipos o al migrar desde otra herramienta de Incident Management. Terraform le permite definir esta configuración como código, por lo que puede crearla y actualizarla mediante programación y mantenerla consistente en toda su organización.

También puede [importar][2] sus configuraciones existentes de tipos de incidentes, notificaciones y plantillas de postmortem a Terraform, y hacer referencia a configuraciones existentes como [fuentes de datos][3] de Terraform.

### Qué puede administrar con Terraform {#what-you-can-manage-with-terraform}

| Recurso | Propósito |
| --- | --- |
| [Tipos de incidentes](#incident-types) (`datadog_incident_type`) | La categoría del incidente (por ejemplo, "Security Incident" o "Customer Impacting"). También incluye la configuración en la página [Información][19], como incidentes privados y eliminación de incidentes. Ancla todo lo demás en esta tabla. |
| [Campos de propiedades](#property-fields) (`datadog_incident_user_defined_field`) | Datos estructurados que los responsables completan en un incidente, como la causa raíz o la región afectada. También se utiliza para configurar los niveles de gravedad y estado en la página [Información][19]. |
| [Responder roles](#responder-roles) (`datadog_incident_user_defined_role`) | Roles personalizados más allá de los built-in Incident Commander y Responder. |
| [Reglas de notificación](#notification-rules) (`datadog_incident_notification_rule`) | Reglas que deciden cuándo y quién recibe notificaciones a medida que cambian los incidentes. |
| [Plantillas de postmortem](#postmortem-templates) (`datadog_incident_postmortem_template`) | Dónde y cómo se genera un documento de postmortem para un tipo de incidente. |
| [Plantillas de notificación](#notification-templates) (`datadog_incident_notification_template`) | Contenido de mensaje reutilizable para notificaciones de incidentes. |

## Configure el proveedor de Datadog Terraform {#set-up-the-datadog-terraform-provider}

Si aún no lo ha hecho, configure el [Datadog Terraform provider][4] para interactuar con la Datadog API a través de una configuración de Terraform.

## Tipos de incidentes {#incident-types}

Los tipos de incidentes le permiten aplicar diferentes configuraciones, campos, roles y comportamiento de notificación a diferentes clases de incidentes, como Security incidents frente a customer-impacting incidents. Todos los demás recursos de esta página están en el contexto de un tipo de incidente, así que defina primero sus tipos de incidentes. Utilice el bloque `configuration` en el [recurso de tipo de incidente][6] para crear tipos de incidentes y establecer los interruptores que se encuentran en la página [Información][19], como la eliminación de incidentes, [incidentes de prueba][7] e [incidentes privados][8]. Los niveles de gravedad y estado, que también se encuentran en la página [Información][19], se configuran con el [recurso de campo definido por el usuario de incidentes][10].

Para obtener información sobre cómo funciona esto en Datadog, consulte [Tipos de incidentes][5].

## Campos de propiedades {#property-fields}

Los campos de propiedades permiten a los responsables capturar datos estructurados sobre un incidente, por ejemplo, la causa raíz o la región afectada. Utilice el [recurso de campo definido por el usuario de incidentes][10] para crear campos de propiedades y asignarles el contexto de un tipo de incidente.

Para obtener información sobre cómo funciona esto en Datadog, consulte [Campos de propiedades][9].

## Roles de respuesta {#responder-roles}

Los roles de respuesta definen los roles que se pueden asignar a las personas durante un incidente. Algunos ejemplos incluyen Incident Commander o un rol personalizado como Comms Lead. Utilice el [recurso de rol definido por el usuario de incidentes][12] para crear roles de respuesta personalizados. Asigne a cada uno el contexto de un tipo de incidente.

Para obtener información sobre cómo funciona esto en Datadog, consulte [Responder Roles][11].

## Reglas de notificación {#notification-rules}

Las reglas de notificación determinan cuándo se dispara una notificación, a quién se envía y qué plantilla utiliza. Utilice el [recurso de regla de notificación de incidentes][16] para crear reglas basadas en activadores como la creación de un incidente o un cambio guardado. Las condiciones de una regla pueden incluir la gravedad o los servicios afectados.

Para saber cómo funciona esto en Datadog, consulte [Reglas de notificación][15].

## Plantillas de postmortem {#postmortem-templates}

Las plantillas de postmortem controlan dónde se genera un documento de postmortem para un tipo de incidente. Las plantillas estandarizan el contenido que se espera que complete el autor del postmortem al definir secciones y encabezados específicos en el documento. Utilice el [recurso de plantilla de postmortem de incidentes][18] para configurar esto por tipo de incidente.

Para saber cómo funciona esto en Datadog, consulte [Plantillas de postmortem][17].

## Plantillas de notificación {#notification-templates}

Las plantillas de notificación definen contenido de mensaje reutilizable para las notificaciones de incidentes. Utilice el [recurso de plantilla de notificación de incidente][14] para crear plantillas y asignarles el contexto de un tipo de incidente.

Para saber cómo funciona esto en Datadog, consulte [Plantillas de notificación][13].

## Ejemplo de configuración completa {#full-configuration-example}

El siguiente ejemplo combina varios de estos recursos en una sola configuración:

- Un `datadog_incident_type` con un bloque `configuration` que deshabilita la eliminación de incidentes y habilita los incidentes de prueba
- Un `datadog_incident_user_defined_field` y `datadog_incident_user_defined_role`, ambos asignados al contexto de ese tipo
- Un `datadog_incident_notification_template`
- Un `datadog_incident_notification_rule` que utiliza la plantilla

{{< code-block lang="terraform" >}}
resource "datadog_incident_type" "customer_impacting" {
  name        = "Customer Impacting"
  description = "Incidents that impact customers"
  configuration = {
    private_incidents            = false
    private_incidents_by_default = false
    allow_workflows              = true
    allow_incident_deletion      = false
    editable_timestamps          = false
    test_incidents               = true
    create_message               = ""
    slug_source                  = "default"
  }
}

resource "datadog_incident_user_defined_field" "root_cause" {
  name          = "root_cause"
  type          = "dropdown"
  incident_type = datadog_incident_type.customer_impacting.id

  valid_value {
    display_name = "Service Bug"
    value        = "service_bug"
  }
}

resource "datadog_incident_user_defined_role" "tech_lead" {
  name          = "Tech Lead"
  incident_type = datadog_incident_type.customer_impacting.id
}

resource "datadog_incident_notification_template" "sev1_alert" {
  name          = "SEV-1 Customer Impact Template"
  subject       = "SEV-1 Incident: {{incident.title}}"
  category      = "alert"
  incident_type = datadog_incident_type.customer_impacting.id
  content       = "SEV-1 declared: {{incident.title}}. Status: {{incident.status}}."
}

resource "datadog_incident_notification_rule" "sev1_sev2_created" {
  enabled               = true
  trigger               = "incident_created_trigger"
  visibility            = "organization"
  handles               = ["@pagerduty-on-call"]
  incident_type         = datadog_incident_type.customer_impacting.id
  notification_template = datadog_incident_notification_template.sev1_alert.id

  conditions {
    field  = "severity"
    values = ["SEV-1", "SEV-2"]
  }
}
{{< /code-block >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[2]: https://developer.hashicorp.com/terraform/cli/import
[3]: https://developer.hashicorp.com/terraform/language/data-sources
[4]: /es/integrations/terraform/
[5]: /es/incident_response/incident_management/setup_and_configuration/#incident-types
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_type
[7]: /es/incident_response/incident_management/guides/test_incidents/
[8]: /es/incident_response/incident_management/setup_and_configuration/information/#private-incidents-incident-visibility
[9]: /es/incident_response/incident_management/setup_and_configuration/property_fields/
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_user_defined_field
[11]: /es/incident_response/incident_management/setup_and_configuration/responder_roles/
[12]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_user_defined_role
[13]: /es/incident_response/incident_management/setup_and_configuration/templates/#messages
[14]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_notification_template
[15]: /es/incident_response/incident_management/setup_and_configuration/notification_rules/
[16]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_notification_rule
[17]: /es/incident_response/incident_management/setup_and_configuration/templates/#postmortems
[18]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_postmortem_template
[19]: /es/incident_response/incident_management/setup_and_configuration/information/