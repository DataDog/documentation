---
title: Manage Incident Management with Terraform
description: "Use the Datadog Terraform provider to manage incident types, custom fields, responder roles, notification templates, notification rules, and postmortem templates."
further_reading:
- link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs"
  tag: "Documentation"
  text: "Terraform provider for Datadog"
- link: "/incident_response/incident_management/setup_and_configuration/"
  tag: "Documentation"
  text: "Incident Management setup and configuration"
- link: "/incident_response/incident_management/guides/test_incidents/"
  tag: "Documentation"
  text: "Using test incidents for training and testing"
- link: "/account_management/api-app-keys/"
  tag: "Documentation"
  text: "Datadog API and Application Keys"
---

## Overview

Datadog Incident Management lets you standardize how your organization declares, triages, and resolves incidents. As your usage grows, with more teams, incident types, custom fields, and routing rules, managing that configuration by hand in the UI becomes hard to review, replicate across orgs, and keep consistent. The [Terraform provider for Datadog][1] lets you manage Incident Management configuration the same way you manage your infrastructure: version-controlled, peer-reviewed, and reproducible across environments.

This guide covers common scenarios for adopting Incident Management with Terraform. These include defining incident types, adding custom fields and roles, and configuring notification templates, notification rules, and postmortem templates.

### What you can manage with Terraform

| Resource | Purpose |
| --- | --- |
| `datadog_incident_type` | The category of incident (for example, "Security Incident" or "Customer Impacting"). Anchors everything else below. |
| `datadog_incident_user_defined_field` | Custom fields responders fill out on an incident (dropdowns, text, autocomplete, and more). |
| `datadog_incident_user_defined_role` | Custom responder roles beyond the built-in Incident Commander and Responder roles. |
| `datadog_incident_notification_template` | Reusable message templates for incident notifications. |
| `datadog_incident_notification_rule` | Rules that decide when and who gets notified as incidents change. |
| `datadog_incident_postmortem_template` | Templates that control where and how postmortem documents are generated for an incident type. |

Every one of these resources is scoped to a `datadog_incident_type`, so that's where you start.

## Prerequisites

- A Datadog account with [Incident Management][2] enabled.
- An [API key and Application key][3] with permission to manage incident settings.
- [Terraform][4] version 1.0 or later.
- The Datadog Terraform provider. Add it to your configuration:

{{< code-block lang="terraform" >}}
terraform {
  required_providers {
    datadog = {
      source  = "DataDog/datadog"
      version = ">= 4.17.0" # use the latest version that ships datadog_incident_postmortem_template
    }
  }
}

provider "datadog" {
  api_key = var.datadog_api_key
  app_key = var.datadog_app_key
}
{{< /code-block >}}

<div class="alert alert-info">Pass <code>api_key</code> and <code>app_key</code> using environment variables (<code>DD_API_KEY</code>, <code>DD_APP_KEY</code>) or a secrets manager rather than hardcoding them in <code>.tf</code> files.</div>

## Define an incident type

An incident type is the anchor resource: every custom field, role, notification template, and notification rule is scoped to one. Start with the simplest possible definition:

{{< code-block lang="terraform" >}}
resource "datadog_incident_type" "security" {
  name        = "Security Incident"
  description = "Security-related incidents requiring immediate attention"
}
{{< /code-block >}}

### Add stricter controls to an incident type

For your highest-severity incident type, you likely want tighter controls: no deleting incidents, no accidental test-incident noise, and timestamps that stay locked after they're set. The `configuration` attribute controls this behavior. Every field is optional and falls back to the default shown below if omitted:

{{< code-block lang="terraform" >}}
resource "datadog_incident_type" "customer_impacting" {
  name        = "Customer Impacting"
  description = "Incidents that impact customers"

  configuration = {
    private_incidents             = false
    private_incidents_by_default  = false
    allow_workflows                = true
    allow_incident_deletion        = false # prevent accidental deletion of customer-impacting incidents
    editable_timestamps            = false
    test_incidents                 = false # don't allow test incidents of this type
    create_message                 = "Confirm customer impact before declaring. Page #on-call-leads if unsure."
    slug_source                    = "default"
  }
}
{{< /code-block >}}

<div class="alert alert-info"><code>configuration</code> is applied through a separate API call after the incident type itself is created. As a result, the first <code>terraform apply</code> on a new incident type shows two operations, even though it's one resource block.</div>

## Add custom fields to an incident type

Custom fields (user-defined fields) show up on the incident details page and let responders capture structured data, such as root cause, affected region, or customer impact tier.

The following example adds a root-cause dropdown:

{{< code-block lang="terraform" >}}
resource "datadog_incident_user_defined_field" "root_cause" {
  name          = "root_cause"
  display_name  = "Root Cause"
  type          = "dropdown"
  category      = "why_it_happened"
  default_value = "unknown"
  incident_type = datadog_incident_type.customer_impacting.id

  valid_value {
    display_name = "Service Bug"
    value        = "service_bug"
    description  = "A bug in the service code."
  }

  valid_value {
    display_name = "Human Error"
    value        = "human_error"
  }

  valid_value {
    display_name = "Unknown"
    value        = "unknown"
  }
}
{{< /code-block >}}

Supported `type` values are `dropdown`, `multiselect`, `textbox`, `textarray`, `metrictag`, `autocomplete`, `number`, and `datetime`. `category` places the field in the **What Happened** or **Why It Happened** section of the incident timeline; leave it unset to have the field appear under **Attributes** instead.

For example, this required multiselect for affected regions places the field under **What Happened**:

{{< code-block lang="terraform" >}}
resource "datadog_incident_user_defined_field" "affected_regions" {
  name          = "affected_regions"
  display_name  = "Affected Regions"
  type          = "multiselect"
  category      = "what_happened"
  required      = true
  incident_type = datadog_incident_type.customer_impacting.id

  valid_value {
    display_name = "US-East"
    value        = "us-east"
  }

  valid_value {
    display_name = "US-West"
    value        = "us-west"
  }

  valid_value {
    display_name = "EU"
    value        = "eu"
  }
}
{{< /code-block >}}

## Add a custom responder role

Beyond the built-in Incident Commander and Responder roles, you can define roles specific to your incident process, such as a Tech Lead, a Comms Lead, or a Customer Liaison.

The following example defines a single-assignee Tech Lead role:

{{< code-block lang="terraform" >}}
resource "datadog_incident_user_defined_role" "tech_lead" {
  name          = "Tech Lead"
  description   = "The technical lead driving the investigation."
  incident_type = datadog_incident_type.customer_impacting.id

  policy = {
    is_single = true # only one responder can hold this role at a time
  }
}
{{< /code-block >}}

Omit `policy` to default to a multi-assignee role, such as a Comms Lead who can have multiple responders assigned at once:

{{< code-block lang="terraform" >}}
resource "datadog_incident_user_defined_role" "comms" {
  name          = "Comms Lead"
  description   = "Owns external and internal incident communications."
  incident_type = datadog_incident_type.customer_impacting.id
}
{{< /code-block >}}

<div class="alert alert-info">Role names can't collide with the reserved names "Incident Commander" or "Responder".</div>

## Create a notification template

Notification templates define reusable message content for incident notifications, so you don't have to hand-write the same Slack or email message every time.

The following example creates a SEV-1 alert template:

{{< code-block lang="terraform" >}}
resource "datadog_incident_notification_template" "sev1_alert" {
  name          = "SEV-1 Customer Impact Template"
  subject       = "SEV-1 Incident: {{incident.title}}"
  category      = "alert" # alert, incident, or recovery
  incident_type = datadog_incident_type.customer_impacting.id

  content = <<-EOF
A SEV-1 customer-impacting incident has been declared.

Title: {{incident.title}}
Severity: {{incident.severity}}
Status: {{incident.status}}

Join the incident channel for updates.
EOF
}
{{< /code-block >}}

## Create a notification rule

Notification rules decide when a notification fires, who it goes to, and which template it uses. They wire templates up to real-world triggers, such as "a SEV-1 was created" or "severity changed on a saved incident."

The following example notifies on-call responders when a SEV-1 or SEV-2 customer-impacting incident is created:

{{< code-block lang="terraform" >}}
resource "datadog_incident_notification_rule" "sev1_sev2_created" {
  enabled    = true
  trigger    = "incident_created_trigger" # incident_created_trigger or incident_saved_trigger
  visibility = "organization"             # all, organization, or private

  handles = [
    "@pagerduty-on-call",
    "@slack-incident-response",
  ]

  conditions {
    field  = "severity"
    values = ["SEV-1", "SEV-2"]
  }

  # Re-notify the same handles if status or severity changes later
  renotify_on = ["status", "severity"]

  incident_type         = datadog_incident_type.customer_impacting.id
  notification_template = datadog_incident_notification_template.sev1_alert.id
}
{{< /code-block >}}

To narrow a rule to specific services, add a second `conditions` block. Values within a single `conditions` block are ORed; multiple `conditions` blocks are ANDed together:

{{< code-block lang="terraform" >}}
resource "datadog_incident_notification_rule" "prod_services_only" {
  enabled    = true
  trigger    = "incident_created_trigger"
  visibility = "organization"
  handles    = ["@team-payments-oncall"]

  conditions {
    field  = "severity"
    values = ["SEV-1", "SEV-2"]
  }

  conditions {
    field  = "services"
    values = ["payments-api", "payments-worker"]
  }

  incident_type = datadog_incident_type.customer_impacting.id
}
{{< /code-block >}}

## Create a postmortem template

Postmortem templates control where a postmortem document is created for incidents of a given type (a Datadog Notebook, a Confluence page, or a Google Doc) and what content it starts with.

The following example creates a default Datadog Notebook postmortem template:

{{< code-block lang="terraform" >}}
resource "datadog_incident_postmortem_template" "default_notebook" {
  name          = "Standard Postmortem"
  incident_type = datadog_incident_type.customer_impacting.id
  location      = "datadog_notebooks" # datadog_notebooks (default), confluence, or google_docs
  is_default    = true

  content = <<-EOF
# Postmortem: {{incident.title}}

## Summary

## Timeline

## Root Cause

## Action Items
EOF
}
{{< /code-block >}}

To write postmortems to a Confluence space instead, set `location` to `confluence` and provide `confluence_postmortem_settings`:

{{< code-block lang="terraform" >}}
resource "datadog_incident_postmortem_template" "confluence" {
  name          = "Confluence Postmortem"
  incident_type = datadog_incident_type.customer_impacting.id
  location      = "confluence"

  confluence_postmortem_settings {
    account_id = var.confluence_connected_account_id # Datadog connected-account UUID
    space_id   = "ENG"                                # Confluence space key, not a numeric ID
    parent_id  = "393217"                              # numeric parent page ID
  }
}
{{< /code-block >}}

To write postmortems to Google Docs instead, set `location` to `google_docs` and provide `google_docs_postmortem_settings`:

{{< code-block lang="terraform" >}}
resource "datadog_incident_postmortem_template" "google_docs" {
  name          = "Google Docs Postmortem"
  incident_type = datadog_incident_type.customer_impacting.id
  location      = "google_docs"

  google_docs_postmortem_settings {
    account_id       = var.google_drive_connected_account_id # Datadog connected-account UUID
    parent_folder_id = "1eCqLAKQqRHt49J2aqQLGUcnPMzGHkt2B"    # taken from the Drive folder URL
  }
}
{{< /code-block >}}

<div class="alert alert-info"><code>confluence_postmortem_settings</code> is required when <code>location = "confluence"</code>, and <code>google_docs_postmortem_settings</code> is required when <code>location = "google_docs"</code>; the provider validates this pairing at plan time. <code>incident_type</code> is immutable, so changing it forces recreation of the template. <code>is_default</code> maps to a server-side timestamp: the template with the most recently set default timestamp is the effective default for its incident type.</div>

## Full configuration example

A realistic setup wires an incident type to its fields, roles, template, and rule in one module:

{{< code-block lang="terraform" >}}
resource "datadog_incident_type" "customer_impacting" {
  name        = "Customer Impacting"
  description = "Incidents that impact customers"

  configuration = {
    allow_incident_deletion = false
    test_incidents           = false
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
  valid_value {
    display_name = "Human Error"
    value        = "human_error"
  }
}

resource "datadog_incident_user_defined_role" "tech_lead" {
  name          = "Tech Lead"
  incident_type = datadog_incident_type.customer_impacting.id
  policy = {
    is_single = true
  }
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

## Reference existing configuration with data sources

If an incident type, notification template, or notification rule already exists (created in the UI, or in another Terraform root you don't want to import into this one), read it with a data source instead of managing it directly:

{{< code-block lang="terraform" >}}
data "datadog_incident_type" "existing" {
  id = "01234567-89ab-cdef-0123-456789abcdef"
}

data "datadog_incident_notification_template" "existing" {
  id = "52600bb1-e83a-48a1-aa77-6889ddb269b2"
}

resource "datadog_incident_notification_rule" "extra_rule" {
  enabled                = true
  trigger                = "incident_saved_trigger"
  visibility              = "organization"
  handles                = ["@security-team"]
  incident_type           = data.datadog_incident_type.existing.id
  notification_template   = data.datadog_incident_notification_template.existing.id

  conditions {
    field  = "status"
    values = ["resolved"]
  }
}
{{< /code-block >}}

## Import existing resources

If you already created incident types, fields, roles, templates, or rules in the UI, bring them under Terraform management with `terraform import` rather than recreating them:

{{< code-block lang="bash" >}}
terraform import datadog_incident_type.customer_impacting "12345678-1234-1234-1234-1234567890ab"
terraform import datadog_incident_user_defined_field.root_cause "12345678-1234-1234-1234-1234567890ab"
terraform import datadog_incident_user_defined_role.tech_lead "12345678-1234-1234-1234-1234567890ab"
terraform import datadog_incident_notification_template.sev1_alert "11111111-2222-3333-4444-555555555555"
terraform import datadog_incident_notification_rule.sev1_sev2_created "00000000-0000-0000-0000-000000000000"
terraform import datadog_incident_postmortem_template.default_notebook "<template-id>"
{{< /code-block >}}

Find each resource's ID in the Datadog UI ([**Incidents** > **Settings**][5]) or through the corresponding API endpoint, then write a matching resource block before running `terraform plan` to confirm there's no diff.

## Best practices

- **Model one incident type per Terraform module.** Since every other resource in this guide is scoped to an incident type, grouping by incident type keeps blast radius small when you change fields, roles, or notification rules for one incident category.
- **Let Terraform resolve resource order.** Terraform resolves the dependency graph from resource references (for example, `incident_type = datadog_incident_type.x.id`), so you don't need to order blocks by hand. Make sure every child resource references its parent's `id`.
- **Treat `configuration` changes as behavior changes, not cosmetic ones.** Flipping `allow_incident_deletion` or `test_incidents` changes what responders can do. Call these out explicitly in pull request descriptions rather than bundling them with unrelated field additions.
- **Use `terraform plan` before enabling new notification rules.** A misconfigured `conditions` block or wrong `trigger` can page the wrong team. Validate the plan output, and consider rolling out with `enabled = false` first, then enabling it once reviewed.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[2]: /incident_response/incident_management/
[3]: /account_management/api-app-keys/
[4]: https://developer.hashicorp.com/terraform/install
[5]: https://app.datadoghq.com/incidents/settings
