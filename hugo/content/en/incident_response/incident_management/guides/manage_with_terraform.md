---
title: Manage Incident Management with Terraform
description: Use Terraform to manage Incident Management configuration, including incident types, property fields, responder types, notification rules, postmortem templates, and notification templates.
disable_toc: false
further_reading:
- link: "/incident_response/incident_management/"
  tag: "Documentation"
  text: "Learn more about Incident Management"
- link: "/incident_response/incident_management/guides/test_incidents/"
  tag: "Documentation"
  text: "Using test incidents for training and testing"
- link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs"
  tag: "Documentation"
  text: "Terraform provider for Datadog"
---

## Overview

You can use Terraform to manage your {{< prodname >}}Incident Management{{< /prodname >}} configuration through the Datadog API. This guide covers the {{< prodname >}}Incident Management{{< /prodname >}} resources available in the [Terraform registry][1] and links to the corresponding Datadog documentation for each.

Configuring incident types, fields, roles, and notification rules by hand in the UI works well for a handful of teams. It becomes harder to scale as your organization grows, for example, when standardizing configuration across hundreds of teams or migrating from another incident management tool. Terraform lets you define this configuration as code, so you can create and update it programmatically and keep it consistent across your organization.

You can also [import][2] your existing incident type, notification, and postmortem template configurations into Terraform, and reference existing configurations as Terraform [data sources][3].

### What you can manage with Terraform

| Resource | Purpose |
| --- | --- |
| [Incident types](#incident-types) (`datadog_incident_type`) | The category of incident (for example, "Security Incident" or "Customer Impacting"). Also includes the settings on the [Information][19] page, such as private incidents and incident deletion. Anchors everything else in this table. |
| [Property fields](#property-fields) (`datadog_incident_user_defined_field`) | Structured data responders fill out on an incident, such as root cause or affected region. Also used to configure severity and status levels on the [Information][19] page. |
| [Responder types](#responder-types) (`datadog_incident_user_defined_role`) | Custom roles beyond the built-in Incident Commander and Responder. |
| [Notification rules](#notification-rules) (`datadog_incident_notification_rule`) | Rules that decide when and who gets notified as incidents change. |
| [Postmortem templates](#postmortem-templates) (`datadog_incident_postmortem_template`) | Where and how a postmortem document is generated for an incident type. |
| [Notification templates](#notification-templates) (`datadog_incident_notification_template`) | Reusable message content for incident notifications. |

## Set up the Datadog Terraform provider

If you haven't already, configure the [Datadog Terraform provider][4] to interact with Datadog APIs through a Terraform configuration.

## Incident types

Incident types let you apply different settings, fields, roles, and notification behavior to different classes of incidents, such as security incidents versus customer-impacting incidents. Every other resource on this page is scoped to an incident type, so define your incident types first. Use the `configuration` block on the [incident type resource][6] to create incident types and set the toggles found on the [Information][19] page, such as incident deletion, [test incidents][7], and [private incidents][8]. Severity and status levels, also found on the [Information][19] page, are configured with the [incident user-defined field resource][10].

To learn how this works in Datadog, see [Incident Types][5].

## Property fields

Property fields let responders capture structured data on an incident, for example, root cause or affected region. Use the [incident user-defined field resource][10] to create property fields and scope them to an incident type.

To learn how this works in Datadog, see [Property Fields][9].

## Responder types

Responder types define the roles people can be assigned during an incident. Examples include Incident Commander or a custom role like Comms Lead. Use the [incident user-defined role resource][12] to create custom responder types. Scope each one to an incident type.

To learn how this works in Datadog, see [Responder Types][11].

## Notification rules

Notification rules determine when a notification fires, who it's sent to, and which template it uses. Use the [incident notification rule resource][16] to create rules based on triggers such as incident creation or a saved change. Conditions on a rule can include severity or affected services.

To learn how this works in Datadog, see [Notification Rules][15].

## Postmortem templates

Postmortem templates control where a postmortem document is generated for an incident type. Templates standardize the content a postmortem writer is expected to populate by defining specific sections and headers in the document. Use the [incident postmortem template resource][18] to configure this per incident type.

To learn how this works in Datadog, see [Postmortem Templates][17].

## Notification templates

Notification templates define reusable message content for incident notifications. Use the [incident notification template resource][14] to create templates scoped to an incident type.

To learn how this works in Datadog, see [Notification Templates][13].

## Full configuration example

The following example combines several of these resources into one configuration:

- A `datadog_incident_type` with a `configuration` block that disables incident deletion and enables test incidents
- A `datadog_incident_user_defined_field` and `datadog_incident_user_defined_role`, both scoped to that type
- A `datadog_incident_notification_template`
- A `datadog_incident_notification_rule` that uses the template

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[2]: https://developer.hashicorp.com/terraform/cli/import
[3]: https://developer.hashicorp.com/terraform/language/data-sources
[4]: /integrations/terraform/
[5]: /incident_response/incident_management/setup_and_configuration/#incident-types
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_type
[7]: /incident_response/incident_management/guides/test_incidents/
[8]: /incident_response/incident_management/setup_and_configuration/information/#private-incidents-incident-visibility
[9]: /incident_response/incident_management/setup_and_configuration/property_fields/
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_user_defined_field
[11]: /incident_response/incident_management/setup_and_configuration/responder_types/
[12]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_user_defined_role
[13]: /incident_response/incident_management/setup_and_configuration/templates/#messages
[14]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_notification_template
[15]: /incident_response/incident_management/setup_and_configuration/notification_rules/
[16]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_notification_rule
[17]: /incident_response/incident_management/setup_and_configuration/templates/#postmortems
[18]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/incident_postmortem_template
[19]: /incident_response/incident_management/setup_and_configuration/information/
