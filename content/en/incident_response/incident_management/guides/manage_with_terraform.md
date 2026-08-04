---
title: Manage Incident Management with Terraform
description: "Use Terraform to manage Incident Management configuration, including incident types, custom fields, responder roles, notification templates and rules, and postmortem templates."
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

You can use Terraform to manage your Incident Management configuration through the Datadog API. This guide covers the Incident Management resources available in the [Terraform registry][1] and links to the corresponding Datadog documentation for each.

Configuring incident types, fields, roles, and notification rules by hand in the UI works well for a handful of teams. It becomes harder to scale as your organization grows, for example, when standardizing configuration across hundreds of teams or migrating from another incident management tool. Terraform lets you define this configuration as code, so you can create and update it programmatically and keep it consistent across your organization.

You can also [import][2] your existing incident type, notification, and postmortem template configurations into Terraform, and reference existing configurations as Terraform [data sources][3].

### What you can manage with Terraform

| Resource | Purpose |
| --- | --- |
| [Incident types](#incident-types) (`datadog_incident_type`) | The category of incident (for example, "Security Incident" or "Customer Impacting"). Anchors everything else in this table. |
| [Custom fields](#custom-fields) (`datadog_incident_user_defined_field`) | Structured data responders fill out on an incident, such as root cause or affected region. |
| [Responder roles](#responder-roles) (`datadog_incident_user_defined_role`) | Custom roles beyond the built-in Incident Commander and Responder. |
| [Notification templates](#notification-templates) (`datadog_incident_notification_template`) | Reusable message content for incident notifications. |
| [Notification rules](#notification-rules) (`datadog_incident_notification_rule`) | Rules that decide when and who gets notified as incidents change. |
| [Postmortem templates](#postmortem-templates) (`datadog_incident_postmortem_template`) | Where and how a postmortem document is generated for an incident type. |

## Set up the Datadog Terraform provider

If you haven't already, configure the [Datadog Terraform provider][4] to interact with Datadog APIs through a Terraform configuration.

## Incident types

Incident types let you apply different settings, fields, roles, and notification behavior to different classes of incidents, such as security incidents versus customer-impacting incidents. Every other resource on this page is scoped to an incident type, so define your incident types first. Use the [incident type resource][6] to create and configure incident types, including settings such as incident deletion, [test incidents][7], and [private incidents][8].

To learn how this works in Datadog, see [Incident Types][5].

## Custom fields

Custom fields let responders capture structured data on an incident, for example, root cause or affected region. Use the [incident user-defined field resource][10] to create custom fields and scope them to an incident type.

For background on custom fields, see [Property Fields][9].

## Responder roles

Responder roles define the roles people can be assigned during an incident. Examples include Incident Commander or a custom role like Comms Lead. Use the [incident user-defined role resource][12] to create custom responder roles. Scope each role to an incident type.

To learn how responder roles work in Datadog, see [Responder Types][11].

## Notification templates

Notification templates define reusable message content for incident notifications. Use the [incident notification template resource][14] to create templates scoped to an incident type.

For background, see [Notification Templates][13].

## Notification rules

Notification rules determine when a notification fires, who it's sent to, and which template it uses. Use the [incident notification rule resource][16] to create rules based on triggers such as incident creation or a saved change. Conditions on a rule can include severity or affected services.

To learn how this works in Datadog, see [Notification Rules][15].

## Postmortem templates

Postmortem templates control where a postmortem document is generated for an incident type—a Datadog Notebook, a Confluence page, or a Google Doc. They also control what content the document starts with. Use the [incident postmortem template resource][18] to configure this per incident type.

For background, see [Postmortem Templates][17].

## Full configuration example

The following example combines several of these resources into one configuration:

- A `datadog_incident_type`
- A `datadog_incident_user_defined_field` and `datadog_incident_user_defined_role`, both scoped to that type
- A `datadog_incident_notification_template`
- A `datadog_incident_notification_rule` that uses the template

{{< code-block lang="terraform" >}}
resource "datadog_incident_type" "customer_impacting" {
  name        = "Customer Impacting"
  description = "Incidents that impact customers"
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
  enabled                = true
  trigger                = "incident_created_trigger"
  visibility              = "organization"
  handles                = ["@pagerduty-on-call"]
  incident_type           = datadog_incident_type.customer_impacting.id
  notification_template   = datadog_incident_notification_template.sev1_alert.id

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
