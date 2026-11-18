---
title: Configure AI Gateway with the API
description: Manage AI Gateway providers, routing rules, access policies, budgets, rate limits, and data capture with the AI Gateway API.
further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
  - link: "/api/latest/ai-gateway/"
    tag: "API"
    text: "AI Gateway API reference"
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

The [AI Gateway API][2] manages the same configuration as the AI Gateway pages in Datadog, so you can set it up from a script, a CI job, or an agent. The API is in Preview and might change before general availability.

## Authenticate API calls

Send a Datadog [API key][3] in the `DD-API-KEY` header and an [application key][4] in the `DD-APPLICATION-KEY` header. The application key's owner needs a role with `ai_gateway_config_read` to read configuration and `ai_gateway_config_write` to change it. While AI Gateway is in Preview, its permissions can't be added to a scoped application key, so use an unscoped key.

These keys authenticate configuration calls. To send model requests, see [Authenticate requests](/ai_gateway/applications/#authenticate-requests).

## API resources

| AI Gateway page | API resource | Path |
|---|---|---|
| Provider accounts | Providers | `/api/v2/providers` |
| Routing | Routing rules | `/api/v2/routing-rules` |
| Access policies | Model groups | `/api/v2/model-groups` |
| Budgets | Budgets | `/api/v2/budgets` |
| Rate limits | Rate limits | `/api/v2/rate-limits` |
| Data capture | Data capture | `/api/v2/data-capture/configuration`, `/api/v2/data-capture/overrides` |

A provider uses an existing [integration account][1] for its credentials. Create the integration account in Datadog before you create the provider through the API.

## Example: route requests through a new routing rule

The following calls create a routing rule, give a Datadog team access to it, and add a budget for that team. They use the provider slug and model ID from [Add a provider](/ai_gateway/providers/#add-a-provider) and a team UUID from the [Teams API][5].

1. Create a routing rule that sends every request to one model. Add more objects to `tiers` to fall back to other models in order.

   ```shell
   curl -X POST "{{< region-param key="dd_api" code="true" >}}/api/v2/routing-rules" \
     -H "DD-API-KEY: ${DD_API_KEY}" \
     -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
     -H "Content-Type: application/json" \
     -d '{
       "data": {
         "type": "routing-rules",
         "attributes": {
           "slug": "<RULE_SLUG>",
           "tiers": [
             {
               "ordering": "configured",
               "targets": [{"type": "model", "provider": "<PROVIDER_SLUG>", "model": "<MODEL_ID>"}]
             }
           ]
         }
       }
     }'
   ```

2. Create a model group that contains the routing rule. A new routing rule has no access until a model group includes it.

   ```shell
   curl -X POST "{{< region-param key="dd_api" code="true" >}}/api/v2/model-groups" \
     -H "DD-API-KEY: ${DD_API_KEY}" \
     -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
     -H "Content-Type: application/json" \
     -d '{
       "data": {
         "type": "model-groups",
         "attributes": {
           "name": "<MODEL_GROUP_NAME>",
           "routing_rule_slugs": ["<RULE_SLUG>"],
           "bindings": [
             {"relation": "viewer", "principals": ["org:<ORG_UUID>"]},
             {"relation": "editor", "principals": ["team:<TEAM_UUID>"]}
           ]
         }
       }
     }'
   ```

   Bindings give principals the access levels from [Access policies](/ai_gateway/access_control/#access-policies): `runner` and `editor` can call the group's models and routing rules, and `viewer` can only see the group. Principals are `user:<USER_UUID>`, `team:<TEAM_UUID>`, or `org:<ORG_UUID>`. Every model group needs:
   - The organization as a `viewer` or higher. Find your organization UUID in the `relationships.org.data.id` field of a [Users API][6] response.
   - At least one `editor`.
   - Only one relation for each principal.

3. Create a budget for the team. `capacity_microcents` is the spend limit in millionths of a US cent, so `100000000` is $1.00. `enforcement` is `BLOCK` or `NOTIFY` (Alert-only), and `window_policy` is `DAILY`, `WEEKLY`, or `MONTHLY`.

   ```shell
   curl -X POST "{{< region-param key="dd_api" code="true" >}}/api/v2/budgets" \
     -H "DD-API-KEY: ${DD_API_KEY}" \
     -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
     -H "Content-Type: application/json" \
     -d '{
       "data": {
         "type": "budgets",
         "attributes": {
           "name": "<BUDGET_NAME>",
           "team_id": "<TEAM_UUID>",
           "capacity_microcents": 100000000,
           "window_policy": "MONTHLY",
           "enforcement": "NOTIFY",
           "warning_threshold": 0.9
         }
       }
     }'
   ```

4. Send a request with `router/<RULE_SLUG>` as the model, as a member of the team. See [Send a request](/ai_gateway/getting_started/#send-a-request).

Changes made through the API appear in [Audit Trail][7] under the application key's owner. To find them, search for `@asset.type:(ai_gateway_routing_rule OR ai_gateway_budget OR ai_gateway_model_group)`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/
[2]: /api/latest/ai-gateway/
[3]: /account_management/api-app-keys/#api-keys
[4]: /account_management/api-app-keys/#application-keys
[5]: /api/latest/teams/
[6]: /api/latest/users/
[7]: /account_management/audit_trail/
