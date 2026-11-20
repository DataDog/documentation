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

The [AI Gateway API][2] manages the same configuration as the AI Gateway UI in Datadog: providers, routing rules, access policies, budgets, rate limits, and data capture. Use the API to configure AI Gateway from a script, a CI job, or an agent.

## Authenticate API calls

Send a Datadog [API key][3] in the `DD-API-KEY` header and an [application key][4] in the `DD-APPLICATION-KEY` header. The application key's owner needs a role with `ai_gateway_config_read` to read configuration and `ai_gateway_config_write` to change it. Use an unscoped application key, because AI Gateway permissions cannot be added to scoped application keys.

The API key and application key authenticate only configuration calls. To authenticate model requests, see the [Authenticate requests](/ai_gateway/applications/#authenticate-requests) section of the Connect Applications page.

## AI Gateway API resources

Each AI Gateway page in Datadog corresponds to an API resource:

| AI Gateway page | API resource | Path |
|---|---|---|
| Provider accounts | Providers | `/api/v2/providers` |
| Routing | Routing rules | `/api/v2/routing-rules` |
| Model access | Model groups | `/api/v2/model-groups` |
| Budgets | Budgets | `/api/v2/budgets` |
| Rate limits | Rate limits | `/api/v2/rate-limits` |
| Data capture | Data capture | `/api/v2/data-capture/configuration`, `/api/v2/data-capture/overrides` |

A provider uses an existing [integration account][1] for its credentials. Create the integration account in Datadog before you create the provider through the API.

## Example: Create a routing rule, model group, and budget

The following calls create a routing rule, give a Datadog team access to it, and add a budget for that team. They use the provider slug and model ID from the [Add a provider](/ai_gateway/providers/#add-a-provider) section of the Connect Providers page, a team UUID from the [Teams API][5], and the UUID of the user who manages the model group from the [Users API][6].

1. Create a routing rule that sends every request to one model. To fall back to other models in order, add more objects to `tiers`:

   ```shell
   curl -X POST "{{< region-param key="dd_api" code="true" >}}/api/v2/routing-rules" \
     -H "DD-API-KEY: <DATADOG_API_KEY>" \
     -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" \
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

2. Create a model group (an access policy in the Datadog UI) that contains the routing rule. No one can use a new routing rule until a model group includes it:

   ```shell
   curl -X POST "{{< region-param key="dd_api" code="true" >}}/api/v2/model-groups" \
     -H "DD-API-KEY: <DATADOG_API_KEY>" \
     -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" \
     -H "Content-Type: application/json" \
     -d '{
       "data": {
         "type": "model-groups",
         "attributes": {
           "name": "<MODEL_GROUP_NAME>",
           "routing_rule_slugs": ["<RULE_SLUG>"],
           "bindings": [
             {"relation": "viewer", "principals": ["org:<ORG_UUID>"]},
             {"relation": "editor", "principals": ["user:<USER_UUID>"]},
             {"relation": "runner", "principals": ["team:<TEAM_UUID>"]}
           ]
         }
       }
     }'
   ```

   Bindings set each principal's access level. `viewer`, `runner`, and `editor` match the **Viewer**, **Runner**, and **Editor** levels in the [Access policies](/ai_gateway/access_control/#access-policies) section of the Control Model Access page. `runner` and `editor` can call the group's models and routing rules, and `viewer` can only see the group. In this example, the team can call the routing rule as a `runner`, and one user manages the group as its `editor`. Principals use the format `user:<USER_UUID>`, `team:<TEAM_UUID>`, or `org:<ORG_UUID>`. Every model group needs:
   - The organization as a `viewer` or higher. Find your organization UUID in the `relationships.org.data.id` field of a [Users API][6] response.
   - At least one `editor`.
   - Only one relation for each principal.

3. Create a budget for the team. In the request body:

   - `capacity_microcents` is the spend limit in millionths of a US cent. For example, `100000000` is $1.00.
   - `enforcement` is `BLOCK` or `NOTIFY`. `NOTIFY` corresponds to **Alert-only** in the UI.
   - `window_policy` is `DAILY`, `WEEKLY`, or `MONTHLY`.
   - `warning_threshold` is the fraction of the limit that triggers a warning, such as `0.9` for 90%.

   ```shell
   curl -X POST "{{< region-param key="dd_api" code="true" >}}/api/v2/budgets" \
     -H "DD-API-KEY: <DATADOG_API_KEY>" \
     -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" \
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

4. As a member of the team, send a request with `router/<RULE_SLUG>` as the model. See the [Send a request](/ai_gateway/getting_started/#send-a-request) section of the Get Started page.

Changes made through the API appear in [Audit Trail][7] under the application key's owner. Each resource in the table above has its own asset type. To find changes to all of them, search for `@asset.type:(ai_gateway_provider OR ai_gateway_routing_rule OR ai_gateway_model_group OR ai_gateway_budget OR ai_gateway_rate_limit OR ai_gateway_data_capture_override)`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/
[2]: /api/latest/ai-gateway/
[3]: /account_management/api-app-keys/#api-keys
[4]: /account_management/api-app-keys/#application-keys
[5]: /api/latest/teams/
[6]: /api/latest/users/
[7]: /account_management/audit_trail/
