---
title: Manage AI Gateway with Terraform
description: Manage AI Gateway routing rules, model access, budgets, rate limits, and data capture with the Datadog Terraform provider.
further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
  - link: "/ai_gateway/api/"
    tag: "Documentation"
    text: "Configure AI Gateway with the API"
  - link: "/integrations/terraform/"
    tag: "Documentation"
    text: "Datadog Terraform provider"
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

The [Datadog Terraform provider][1] manages AI Gateway configuration, so you can review changes in pull requests and apply them from CI. The AI Gateway resources are in Preview and might change before general availability.

| Resource | Manages |
|---|---|
| [`datadog_ai_gateway_provider`][2] | A provider that uses an existing integration account for its credentials. |
| [`datadog_ai_gateway_routing_rule`][3] | A [routing rule](/ai_gateway/routing/) that callers reach as `router/<RULE_SLUG>`. |
| [`datadog_ai_gateway_policy`][4] | A routing policy for requests whose model matches an inbound pattern, for the organization or one user. |
| [`datadog_ai_gateway_model_group`][5] | The providers, models, and routing rules in an [access policy](/ai_gateway/access_control/#access-policies). |
| [`datadog_restriction_policy`][6] | Who can use a model group. Set `resource_id` to `ai-gateway-model-group:<MODEL_GROUP_ID>`. |
| [`datadog_ai_gateway_budget`][7] | A [budget](/ai_gateway/spend_controls/#set-budgets). |
| [`datadog_ai_gateway_rate_limit`][8] | A [rate limit](/ai_gateway/spend_controls/#set-rate-limits). |
| [`datadog_ai_gateway_governance`][9] | The organization's default [data capture](/ai_gateway/security/#configure-data-capture) mode. |
| [`datadog_ai_gateway_data_capture_override`][10] | A data capture override for matching requests. |

This page shows how to onboard workloads with one Terraform module, and how to manage data capture. A workload is one application or service that sends LLM requests through AI Gateway and belongs to one [Datadog team][11].

<!-- TODO: Replace "the first Datadog provider version that includes AI Gateway resources" and <PROVIDER_VERSION> with the released version number (expected 4.31.0). -->

## Prerequisites

- AI Gateway Preview access for your Datadog organization.
- Terraform 1.3 or later, and the first Datadog provider version that includes AI Gateway resources.
- A Datadog [API key and application key][12]. While AI Gateway is in Preview, its permissions can't be added to a scoped application key, so use an unscoped key. The key's owner needs the `ai_gateway_config_read` and `ai_gateway_config_write` permissions and must be able to read Datadog teams. In CI, use a [service account's][13] key.
- At least one [provider](/ai_gateway/providers/#add-a-provider) in AI Gateway. Note its slug.
- An invite-only Datadog team for each workload. Note each team's handle.

## Configure the provider

Export your keys as the `DD_API_KEY` and `DD_APP_KEY` environment variables. The provider reads them from the environment, so they don't appear in your configuration.

In your configuration, require the provider and set the API URL for your [Datadog site][14]:

```hcl
terraform {
  required_version = ">= 1.3"
  required_providers {
    datadog = {
      source  = "DataDog/datadog"
      version = ">= <PROVIDER_VERSION>"
    }
  }
}

provider "datadog" {
  api_url = "{{< region-param key="dd_api" >}}/"
}
```

For other provider settings, see the [Terraform integration][15].

## Onboard workloads with a module

The following [module][16] onboards a workload from one `module` block. For each workload, it creates:

- A routing rule that the workload's applications call as the model `router/<NAME>`. It spreads requests across the models you choose and falls back to other models in order.
- A model group that contains the routing rule, and a restriction policy that gives the workload's team **Runner** access to it.
- A monthly budget for the team's spend that blocks the team's requests once it's spent.
- Optional: A per-minute request rate limit for the team that rejects requests over the limit.

### Create the module

Save the following as `modules/ai_gateway_workload/main.tf` in your Terraform repository:

```hcl
terraform {
  required_providers {
    datadog = {
      source = "DataDog/datadog"
    }
  }
}

variable "name" {
  description = "Workload name in lowercase kebab case. Applications call the model router/<name>."
  type        = string
}

variable "team_handle" {
  description = "Handle of the invite-only Datadog team that owns the workload."
  type        = string
}

variable "provider_slug" {
  description = "Slug of an AI Gateway provider."
  type        = string
}

variable "models" {
  description = "Models and their relative weights, such as { \"gpt-4o\" = 70, \"gpt-4o-mini\" = 30 }."
  type        = map(number)
}

variable "fallback_models" {
  description = "Models to try, in order, when every model in models fails."
  type        = list(string)
  default     = []
}

variable "monthly_budget_usd" {
  description = "Monthly spend limit in US dollars."
  type        = number
}

variable "budget_enforcement" {
  description = "BLOCK rejects the team's requests until the next month once the budget is spent. NOTIFY only sends alerts."
  type        = string
  default     = "BLOCK"
}

variable "requests_per_minute" {
  description = "Request rate limit. Leave unset for no rate limit."
  type        = number
  default     = null
}

variable "rate_limit_mode" {
  description = "ENFORCE rejects requests over the limit. ALERT only reports them."
  type        = string
  default     = "ENFORCE"
}

variable "scope_tags" {
  description = "Request tags, such as { ml_app = \"search-assistant\" }, that narrow the budget and rate limit to the workload's requests."
  type        = map(string)
  default     = {}
}

data "datadog_current_user" "this" {}

data "datadog_teams" "this" {
  filter_keyword = var.team_handle
}

locals {
  # filter_keyword also matches team names and member emails, so keep only the exact handle.
  team_id = one([for team in data.datadog_teams.this.teams : team.id if team.handle == var.team_handle])
}

resource "datadog_ai_gateway_routing_rule" "this" {
  slug = var.name
  tiers = concat(
    [{
      ordering = "weighted_affinity"
      targets  = [for model, weight in var.models : { provider = var.provider_slug, model = model, weight = weight }]
    }],
    [for model in var.fallback_models : {
      ordering = null
      targets  = [{ provider = var.provider_slug, model = model, weight = null }]
    }],
  )

  lifecycle {
    precondition {
      condition     = local.team_id != null
      error_message = "No Datadog team has the handle ${var.team_handle}."
    }
  }
}

resource "datadog_ai_gateway_model_group" "this" {
  name               = var.name
  routing_rule_slugs = [datadog_ai_gateway_routing_rule.this.slug]
}

# A model group needs the organization as a viewer and at least one editor.
# The team gets runner access, which lets its members call the routing rule.
resource "datadog_restriction_policy" "this" {
  resource_id = "ai-gateway-model-group:${datadog_ai_gateway_model_group.this.id}"

  bindings {
    relation   = "viewer"
    principals = ["org:${data.datadog_current_user.this.org_id}"]
  }

  bindings {
    relation   = "editor"
    principals = ["user:${data.datadog_current_user.this.id}"]
  }

  bindings {
    relation   = "runner"
    principals = ["team:${local.team_id}"]
  }
}

resource "datadog_ai_gateway_budget" "this" {
  name                = var.name
  team_id             = local.team_id
  capacity_microcents = ceil(var.monthly_budget_usd * 100000000)
  window_policy       = "MONTHLY"
  enforcement         = var.budget_enforcement
  tags                = length(var.scope_tags) > 0 ? var.scope_tags : null
}

resource "datadog_ai_gateway_rate_limit" "this" {
  count = var.requests_per_minute == null ? 0 : 1

  name                = var.name
  team_id             = local.team_id
  mode                = var.rate_limit_mode
  requests_per_minute = var.requests_per_minute
  tags                = length(var.scope_tags) > 0 ? var.scope_tags : null
}

output "model" {
  description = "Model value that the workload's applications send."
  value       = "router/${datadog_ai_gateway_routing_rule.this.slug}"
}
```

The module makes the user or service account that runs Terraform the model group's editor. A budget's `capacity_microcents` is in millionths of a US cent, so the module multiplies the dollar amount by 100,000,000. To limit tokens instead of requests, add the matching attributes from the [budget][7] and [rate limit][8] resources.

### Add a workload

Add one `module` block for each workload. The following workload sends 70% of the `search` team's requests to `gpt-4o` and 30% to `gpt-4o-mini`, and falls back to `gpt-4.1-mini` when both fail. It blocks the workload's requests after $500 of spend in a month and rejects requests over 600 per minute:

```hcl
module "search_assistant" {
  source = "./modules/ai_gateway_workload"

  name          = "search-assistant"
  team_handle   = "search"
  provider_slug = "openai-prod"

  models          = { "gpt-4o" = 70, "gpt-4o-mini" = 30 }
  fallback_models = ["gpt-4.1-mini"]

  monthly_budget_usd  = 500
  requests_per_minute = 600
  scope_tags          = { ml_app = "search-assistant" }
}

output "search_assistant_model" {
  value = module.search_assistant.model
}
```

Run `terraform init`, `terraform plan`, and `terraform apply`. After you apply the configuration, members of the team can send requests with `router/search-assistant` as the model. Their credential needs the `ai_gateway_usage` permission. Because the example sets `scope_tags`, requests count toward the budget and rate limit when they send the tag as a header: `x-dd-tag-ml_app: search-assistant`. See [Send a request](/ai_gateway/getting_started/#send-a-request).

A `BLOCK` budget needs to price each request, so use a provider whose models have pricing. A request through a provider without pricing fails with `budget_pricing_unavailable`.

### Change or remove a workload

- To change a workload, edit its `module` block and apply the configuration.
- To remove a workload, delete its `module` block and apply the configuration. A deleted budget or rate limit, and the budget's monitor, can't be restored.
- Changes made in Datadog to Terraform-managed resources appear as differences in the next `terraform plan`, and the next `terraform apply` reverts them.
- To manage configuration that you created in Datadog, [import][17] it. Each resource's Terraform Registry page lists its import ID.

## Manage data capture

The organization's default data capture mode and data capture overrides apply across workloads, so manage them outside the workload module. The following example uses an `import` block, which requires Terraform 1.5 or later:

```hcl
# Manage the organization's existing settings instead of creating new ones.
import {
  to = datadog_ai_gateway_governance.org
  id = "organization"
}

# Record request metadata without prompt and response content, unless an override matches.
resource "datadog_ai_gateway_governance" "org" {
  data_capture_mode = "metadata_only"
}

# Record only metadata for one workload's requests, regardless of the organization default.
resource "datadog_ai_gateway_data_capture_override" "search_assistant" {
  name = "search-assistant-metadata-only"
  mode = "metadata_only"
  tags = { ml_app = "search-assistant" }
}
```

- Declare `datadog_ai_gateway_governance` at most once for each organization. Removing it from your configuration leaves the organization's settings unchanged.
- Terraform changes the zero data retention (ZDR) requirement only if you set `zdr_mode`.
- An override change that can turn on full capture for more requests requires `confirm_full_capture = true`. This includes creating a `full_capture` override, and deleting a `metadata_only` override when another override with `full_capture` matches some of the same requests. Review this attribute in pull requests to control where full capture is turned on.
- Terraform sends the `confirm_full_capture` value from its state when it deletes an override. If a deletion is rejected, set `confirm_full_capture = true`, apply, and then delete the override.

## Limitations

- Terraform can't create the integration accounts that hold provider credentials. Create the integration account in Datadog, then add the provider in Datadog or with `datadog_ai_gateway_provider`.
- Manage models and model pricing in Datadog.
- Terraform doesn't manage the [default policy](/ai_gateway/access_control/#default-policy). If the default policy includes a workload's provider, everyone in your organization can call that provider's models directly, not only the workload's team.
- Access granted to a team also applies to members of its sub-teams.
- A `NOTIFY` budget and an `ALERT` rate limit each create a monitor. If your organization has a [monitor configuration policy][18] that requires tags, AI Gateway's monitors don't carry them, and creating the budget or rate limit fails. `BLOCK` budgets and `ENFORCE` rate limits, the module's defaults, are created without a monitor.
- A team bound to a model group must be invite-only. AI Gateway rejects a team that anyone in your organization can join. To fix this, limit who can add members in the team's settings.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/ai_gateway_provider
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/ai_gateway_routing_rule
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/ai_gateway_policy
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/ai_gateway_model_group
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/restriction_policy
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/ai_gateway_budget
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/ai_gateway_rate_limit
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/ai_gateway_governance
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/ai_gateway_data_capture_override
[11]: /account_management/teams/
[12]: /account_management/api-app-keys/
[13]: /account_management/org_settings/service_accounts/
[14]: /getting_started/site/
[15]: /integrations/terraform/
[16]: https://developer.hashicorp.com/terraform/language/modules
[17]: https://developer.hashicorp.com/terraform/cli/import
[18]: /monitors/settings/#tag-policies
