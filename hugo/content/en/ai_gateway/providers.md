---
title: Connect Providers to AI Gateway
description: Connect provider accounts and custom endpoints to AI Gateway, discover or add models, and verify requests with Datadog credentials.
further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

An AI Gateway provider connects a Datadog integration account to a set of models. Applications call those models with Datadog credentials instead of receiving the upstream provider's credentials.

Create separate providers when workloads need different upstream accounts, regions, or access policies. Give each provider a stable slug: callers include that slug in the model identifier.

## Prerequisites

- [AI Gateway access][providers-1] for the Datadog organization.
- The `ai_gateway_config_read` and `ai_gateway_config_write` permissions to configure providers and models.
- A configured integration account for the provider. To create or update API-key accounts, request **Integrations Manage** (`manage_integrations`). Cloud integration setup has separate [AWS, Azure, and Google Cloud configuration permissions][providers-9].
- Upstream credentials that can **invoke models**, not only read usage or metrics. Complete any required model-access approvals in the upstream account.
- A [personal access token or service access token][providers-2] for verification. Both its principal and credential scope must allow `ai_gateway_usage`.

## Choose a provider account

The account selector offers the providers available to the organization. Provider and model capabilities vary; check the operations on the selected model before choosing an API.

| Provider | Account and connection settings |
|---|---|
| OpenAI | OpenAI integration account with an API key that can call the required models. |
| Anthropic | Anthropic integration account with an API key that can call the required models. |
| Azure OpenAI | Azure OpenAI integration account configured with the resource name, API key, deployment ID, and API version. |
| Amazon Bedrock | AWS integration account enabled for Bedrock. Select the **Region** used for inference. |
| Vertex AI | Google Cloud integration account with Vertex AI access. Select the **Project** and **Location** used for inference. |
| Azure AI Foundry | Azure integration app registration and a **Foundry resource ID**. See the [Azure AI Foundry](#azure-ai-foundry) section. |
| Baseten | Baseten integration account with an API key permitted to call Baseten Model APIs. A metrics-only key is insufficient. |
| Fireworks AI | Fireworks AI integration account and API key. |
| Together AI | Together AI integration account and API key. |
| TypeSafe | TypeSafe integration account and API key for System One models, which answer typed questions about supplied state instead of generating conversation text. |
| Custom Provider | Integration account containing an HTTPS API base URL, API key, and any required custom headers. See the [Custom endpoints](#custom-endpoints) section. |

### Add an integration account

In the provider form's {{< ui >}}Account{{< /ui >}} selector, select an existing account, or open {{< ui >}}+ Add new account{{< /ui >}} and choose the provider. Save the integration settings, then return to AI Gateway setup.

Some accounts use a separate integration page:

- **Vertex AI** opens the [Google Cloud integration][providers-3], where you configure a service account with Vertex AI access.
- **Baseten** opens the Baseten integration, where you configure a key permitted to call Model APIs.
- **Azure AI Foundry** offers {{< ui >}}+ Set up the Azure integration{{< /ui >}}. Complete [Azure integration setup][providers-4], return to the form, and select the app registration.

Integration credentials remain separate from the Datadog credential the application uses to call AI Gateway. Rotate upstream credentials in the integration settings.

## Add a provider

1. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Models{{< /ui >}} > {{< ui >}}Provider accounts{{< /ui >}}][providers-5] and click {{< ui >}}New provider account{{< /ui >}}.
2. In {{< ui >}}Details{{< /ui >}}, select the provider's integration account and complete its connection settings. See the [Choose a provider account](#choose-a-provider-account) section.
3. Enter a display name and a unique slug, such as `production-openai`. The slug becomes part of every direct model request. The connected account and slug cannot be changed after creation.
4. In {{< ui >}}Models{{< /ui >}}, review {{< ui >}}Discovered models{{< /ui >}}. AI Gateway enables discovered models on the provider automatically. Callers can use them only after you grant access in the {{< ui >}}Access{{< /ui >}} step. [Add models manually](#add-a-model-manually) if the provider does not return a model you need.
5. Review the cost multiplier. It scales automatically detected prices, and a custom model price takes precedence over it. After you create the provider, confirm prices in [{{< ui >}}Models{{< /ui >}} > {{< ui >}}Model catalog{{< /ui >}}][providers-6] before relying on spend reporting or budgets.
6. In {{< ui >}}Access{{< /ui >}}, choose who can call the provider's models. See [Control model access][providers-7].
7. In {{< ui >}}Review{{< /ui >}}, check the account, slug, models, and access assignments, then click {{< ui >}}Create provider{{< /ui >}}.
8. Open the saved provider and [verify a model request](#verify-the-connection).

Discovery is not a complete inference test. For example, Vertex AI can list a public model catalog without permission to invoke models in the selected project. Azure deployment discovery can also succeed without sufficient inference permissions.

<!-- vale Datadog.headings = NO -->
### Azure AI Foundry
<!-- vale Datadog.headings = YES -->

Azure AI Foundry uses the Azure integration's app registration. It is a separate account type from Azure OpenAI.

Before creating the provider, grant the app registration:

- **Monitoring Reader** on the Azure subscription, to discover deployments.
- **Foundry User** (named **Azure AI User** in older tenants) on the Foundry resource, to invoke models.

In the Azure portal, open the Foundry resource, then **Overview > JSON View > Resource ID**. Enter that value in {{< ui >}}Foundry resource ID{{< /ui >}}. Its format is:

```text
/subscriptions/<SUBSCRIPTION_ID>/resourceGroups/<RESOURCE_GROUP>/providers/Microsoft.CognitiveServices/accounts/<RESOURCE_NAME>
```

Use the parent resource ID, without a trailing `/projects/<PROJECT_NAME>` path. Hub-based project IDs under `Microsoft.MachineLearningServices/workspaces` are not supported.

The form generates Azure CLI role-assignment commands for the selected account and resource. Run them with an Azure identity authorized to assign those roles. Role changes can take a few minutes to apply. Verify both discovery and inference after they take effect.

### Custom endpoints

Use **Custom Provider** for endpoints that accept OpenAI Chat Completions, OpenAI Responses, Anthropic Messages, or System One requests. These are the operations available in the AI Gateway form.

Custom endpoints authenticate with a bearer API key. The {{< ui >}}Provider{{< /ui >}} field in the account editor only fills in a default base URL. AI Gateway doesn't use it to choose a request format or authentication method: select the request formats under {{< ui >}}Supported operations{{< /ui >}} in step 6.

1. In the account selector, select {{< ui >}}+ Add new account{{< /ui >}} > {{< ui >}}Custom Provider{{< /ui >}}.
2. Enter a {{< ui >}}Name{{< /ui >}} and select a {{< ui >}}Provider{{< /ui >}} label. The account editor offers OpenAI, Anthropic, Gemini, Azure OpenAI, `AWS Bedrock`, and Custom. Select the actual request formats separately in step 6.
3. Set {{< ui >}}Base URL{{< /ui >}} to the HTTPS API base URL, including the required base path, for example `https://llm.example.com/v1`. AI Gateway discovers models by calling `GET <BASE_URL>/models`, so the endpoint must implement the OpenAI [List models](https://platform.openai.com/docs/api-reference/models/list) API and return `{"object": "list", "data": [{"id": "<MODEL_ID>", ...}]}`. If it doesn't, [add its models manually](#add-a-model-manually).
4. Enter the upstream {{< ui >}}API Key{{< /ui >}}. If the {{< ui >}}Authentication{{< /ui >}} selector is displayed, select {{< ui >}}API key{{< /ui >}} for this setup.
5. Add any {{< ui >}}Custom Headers{{< /ui >}} required by the endpoint, then click {{< ui >}}Save{{< /ui >}}.
6. Back in the AI Gateway provider form, select the saved account. Under {{< ui >}}Supported operations{{< /ui >}}, select the request formats this endpoint accepts.
7. Review discovery and any manual models, then complete provider creation.

The selected operations become the defaults for discovered models and newly added manual models. Declaring an operation does not add support to the upstream endpoint. Test each request format the application needs.

## Identify models in requests

AI Gateway distinguishes the caller-facing model identifier from the identifier sent upstream:

| Setting | Purpose | Example |
|---|---|---|
| Provider slug | Identifies the AI Gateway provider account. | `production-openai` |
| Model ID | Identifies a model within that AI Gateway provider. | `approved-model` |
| Provider model ID | Identifies the upstream model or deployment. Defaults to **Model ID** when blank. | `deployment-name` |

For those example values, the application sends:

```json
{"model": "production-openai/approved-model"}
```

AI Gateway sends `deployment-name` as the upstream model identifier. Use the complete `<PROVIDER_SLUG>/<MODEL_ID>` from the AI Gateway catalog, rather than the upstream identifier alone.

### Add a model manually

AI Gateway discovers a provider's models from its model list. Add a model manually when a model the provider serves isn't in that list. For example, OpenAI serves `codex-auto-review`, the model Codex uses for automatic reviews, but doesn't list it in its models API.

1. In the provider's {{< ui >}}Models{{< /ui >}} stage, under {{< ui >}}Manually add model{{< /ui >}}, click {{< ui >}}Add model{{< /ui >}}.
2. Enter a unique {{< ui >}}Model ID{{< /ui >}} within the provider.
3. Enter {{< ui >}}Provider model ID{{< /ui >}} if it differs from the Model ID. For Vertex AI, the field is {{< ui >}}Provider resource path{{< /ui >}} and takes the publisher model path. Do not include the project or location, because AI Gateway adds them from the provider's connection settings:

   ```text
   publishers/google/models/<PUBLISHER_MODEL_ID>
   ```

4. Select the supported operations that the upstream model accepts, then save the provider.
5. Check the model's enabled state in the provider's {{< ui >}}Models{{< /ui >}} section and its price in the Model catalog. Send a request to verify the mapping.

A manual entry does not grant upstream model access or AI Gateway caller access. Configure both before testing it.

## Verify the connection

1. Open the saved provider. Under {{< ui >}}How to call this provider{{< /ui >}}, select a model and request format to view a generated example.
2. Run the example with the application's Datadog credential and the AI Gateway endpoint for the correct [Datadog site][providers-8]. For a model that supports Chat Completions:

   ```shell
   curl -X POST "https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai/v1/chat/completions" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <DATADOG_ACCESS_TOKEN>" \
     -d '{
       "model": "<PROVIDER_SLUG>/<MODEL_ID>",
       "messages": [{"role": "user", "content": "Reply with hello."}]
     }'
   ```

3. Confirm a successful model response. Click {{< ui >}}View in Traces{{< /ui >}} and find the matching AI Gateway request by timestamp, caller, provider, and model.
4. Confirm the served destination and token usage. If the request succeeds but spend is missing, check model pricing separately.
5. Repeat with each operation the application uses. Success with one API does not verify another API, region, or model.

## Use subscription providers

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Subscription providers are in Preview. To enable them for your organization, contact your Customer Success Manager.
{{< /callout >}}

With a subscription provider, users run Claude Code and Codex through AI Gateway on their own Claude or ChatGPT subscriptions instead of an API key. Each user signs in to the coding agent with their own account, and Anthropic or OpenAI bills the usage to that user's subscription. AI Gateway applies access policies and rate limits, attributes each request to the Datadog user who sent it, and records the request in Agent Observability.

Subscription providers support the following coding agents:

| Coding agent | Vendor | Required subscription |
|---|---|---|
| Claude Code | Anthropic | Claude Pro, Max, Team, or Enterprise |
| Codex | OpenAI | A ChatGPT plan that includes Codex |

**Note**: Anthropic Console API credentials do not provide access to a Claude subscription. Requests sent with an Anthropic API key are billed per token.

Each user authenticates to AI Gateway with their own Datadog [personal access token][subscription-1] in the `dd-application-key` header, not an API key or application key. For details on how the headers work, see the [Authenticate requests](/ai_gateway/applications/#authenticate-requests) section.

### Create a subscription provider

1. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Models{{< /ui >}} > {{< ui >}}Provider accounts{{< /ui >}}][subscription-2] and click {{< ui >}}New provider account{{< /ui >}}.
2. On the {{< ui >}}Details{{< /ui >}} step, select {{< ui >}}Use each person's own subscription instead of an integration account{{< /ui >}}. You cannot change this setting after you create the provider.
3. In {{< ui >}}Vendor{{< /ui >}}, select {{< ui >}}Anthropic{{< /ui >}} for Claude Code or {{< ui >}}OpenAI{{< /ui >}} for Codex. To support both coding agents, create a subscription provider for each vendor.
4. Enter a provider name and a unique slug. Claude Code and Codex send this slug in the `x-ai-gateway-provider` header to route requests to this provider.
5. Optional: On the {{< ui >}}Models{{< /ui >}} step, add models to set custom prices for cost estimates or to limit access to specific models. If you do not add models, users can use any model that their subscription includes.
6. On the {{< ui >}}Access{{< /ui >}} step, choose who can use the provider. See [Grant access to a subscription provider](#grant-access-to-a-subscription-provider).
7. Review the configuration and click {{< ui >}}Create provider{{< /ui >}}.

After you create the provider, open it to copy its Claude Code settings or Codex configuration.

### Grant access to a subscription provider

To use a subscription provider, a user needs access through the [default policy](/ai_gateway/access_control/#default-policy) or an [access policy](/ai_gateway/access_control/#access-policies). Grant access on the provider's {{< ui >}}Access{{< /ui >}} step when you create the provider. To grant access later, go to [{{< ui >}}Policies{{< /ui >}} > {{< ui >}}Org defaults{{< /ui >}}][subscription-5] or [{{< ui >}}Policies{{< /ui >}} > {{< ui >}}Model access{{< /ui >}}][subscription-4]. Choose which models the access covers:

- {{< ui >}}All models{{< /ui >}}: Any model that each user's subscription includes. In a policy, select the provider itself rather than individual models.
- {{< ui >}}Specific models{{< /ui >}}: Only the selected models, even if a user's subscription includes more. This option appears after you add models to the provider. In a policy, select the individual models.

A request for a model outside a user's access returns HTTP `403` with the `no_permitted_target` error code and the message `access denied: model "<PROVIDER_SLUG>/<MODEL_ID>" is not allowed by your access policies`.

### Set up Claude Code

Point Claude Code to AI Gateway, then sign in with your Claude account:

<div class="alert alert-warning">Before you sign in, unset <code>ANTHROPIC_API_KEY</code> and <code>ANTHROPIC_AUTH_TOKEN</code> in your environment and Claude Code settings, and remove the <code>apiKeyHelper</code> setting. Check all settings sources, including managed settings. These credential sources can override your subscription sign-in. Requests sent with an Anthropic API key are billed per token.</div>

1. Add the following to your Claude Code user settings file, `~/.claude/settings.json`. Do not add it to a project settings file that you commit to source control. Replace `<PERSONAL_ACCESS_TOKEN>` with your Datadog [personal access token][subscription-1], and `<PROVIDER_SLUG>` with the slug of the Anthropic subscription provider.

   ```json
   {
     "env": {
       "ANTHROPIC_BASE_URL": "https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai",
       "ANTHROPIC_CUSTOM_HEADERS": "dd-application-key: <PERSONAL_ACCESS_TOKEN>\nx-ai-gateway-provider: <PROVIDER_SLUG>"
     }
   }
   ```

   AI Gateway reads your personal access token from the `dd-application-key` header and removes the token before it forwards the request to Anthropic. The `x-ai-gateway-provider` header routes every request to the subscription provider. For more about these headers, see the [Authenticate requests](/ai_gateway/applications/#authenticate-requests) section.

   To use environment variables instead, set `ANTHROPIC_BASE_URL` and `ANTHROPIC_CUSTOM_HEADERS`, with each header in `ANTHROPIC_CUSTOM_HEADERS` on its own line.

2. Start Claude Code, run `/login`, and sign in with your Claude account (not an Anthropic Console account).

To run Claude Code without an interactive sign-in, run `claude setup-token`, then set the `CLAUDE_CODE_OAUTH_TOKEN` environment variable to the token that it prints. Store the token as a secret.

### Set up Codex

Add AI Gateway as a model provider in Codex, then sign in with your ChatGPT account:

1. Add the following to your Codex configuration file, `~/.codex/config.toml`. Place `model_provider` before the first table in the file. Replace `<PROVIDER_SLUG>` with the slug of the OpenAI subscription provider.

   ```toml
   model_provider = "datadog"

   [model_providers.datadog]
   name = "Datadog AI Gateway"
   base_url = "https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai/v1"
   wire_api = "responses"
   requires_openai_auth = true
   env_http_headers = { "DD-APPLICATION-KEY" = "DD_PAT" }
   http_headers = { "x-ai-gateway-provider" = "<PROVIDER_SLUG>" }
   ```

   With `requires_openai_auth = true`, Codex sends your ChatGPT credentials in the `Authorization` header. Codex reads your personal access token from the `DD_PAT` environment variable and sends it in the `dd-application-key` header. AI Gateway removes the token before it forwards the request. For more about these headers, see the [Authenticate requests](/ai_gateway/applications/#authenticate-requests) section.

2. Set the `DD_PAT` environment variable to your Datadog [personal access token][subscription-1].
3. Run `codex login` and sign in with your ChatGPT account. To sign in from another device, such as your phone, run `codex login --device-auth`.

### Verify subscription traffic

1. Send a prompt from Claude Code or Codex.
2. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Overview{{< /ui >}}][subscription-3] and find the request under the subscription provider. To inspect its span, click a bar and select {{< ui >}}View traces{{< /ui >}}, or click a row in a ranking.
3. Confirm that the usage appears on the usage page of your Claude or ChatGPT plan.

### How AI Gateway handles subscription traffic

- **Billing**: Anthropic or OpenAI bills each request to the subscription of the user who sent it. A subscription provider has no integration account, so AI Gateway never sends your organization's provider credentials with subscription traffic.
- **Models**: Without models on the provider, the vendor decides which models each user can use, based on their plan. Claude Code and Codex show their built-in model lists, which can include models that a user's access does not allow.
- **Cost**: Traces record an API-equivalent cost for models with a price, using any custom price you set. Models you don't add to the provider have no price and are recorded as unpriced. The recorded cost is not your subscription bill.
- **Budgets**: [Budgets](/ai_gateway/spend_controls/#set-budgets) don't count or block subscription traffic. If you select {{< ui >}}Track existing usage for current period{{< /ui >}} when you create a budget, its starting spend can include earlier subscription traffic.
- **Rate limits**: A [rate limit](/ai_gateway/spend_controls/#set-rate-limits) that matches subscription traffic counts it together with other matching traffic. In Enforce mode, the rate limit rejects subscription requests over the limit.
- **Routing rules**: A [routing rule](/ai_gateway/routing/) cannot include a subscription provider, and a destination for a [model served by any provider](/ai_gateway/routing/#model-served-by-any-provider) skips subscription providers. Instead, Claude Code and Codex pin the provider with the `x-ai-gateway-provider` header.
- **Request formats**: An Anthropic subscription provider serves only Anthropic Messages, including token counting. An OpenAI subscription provider serves only OpenAI Responses, and sends requests to ChatGPT, not to the OpenAI API. A request in another format returns HTTP `400` with the `unsupported_operation` error code. AI Gateway never sends a subscription sign-in to another vendor.
- **Credentials**: AI Gateway does not check which vendor credential a client sends to a subscription provider. If a client sends an API key, such as `ANTHROPIC_API_KEY`, the vendor bills that key per token.
- **Activity**: On the [{{< ui >}}Overview{{< /ui >}}][subscription-3] page, subscription traffic appears with all other traffic. Filter by the subscription provider to see it separately. A vendor `401` or `429` response, such as for an expired sign-in or an exceeded plan limit, counts as a provider error.

### Troubleshoot subscription providers

To check your setup without using a subscription, send a request without a sign-in to an Anthropic subscription provider. This request checks your personal access token, the provider slug, and access. Replace `<MODEL_ID>` with a Claude model ID that your access allows:

```shell
curl -X POST "https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai/v1/messages" \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -H "dd-application-key: <PERSONAL_ACCESS_TOKEN>" \
  -H "x-ai-gateway-provider: <PROVIDER_SLUG>" \
  -d '{"model": "<MODEL_ID>", "max_tokens": 16, "messages": [{"role": "user", "content": "Woof!"}]}'
```

If your setup is correct, Anthropic returns HTTP `401` with an `authentication_error`. This response is expected: AI Gateway accepted and forwarded the request, and Anthropic rejected it because the request has no subscription credentials. You are not billed for the request.

| Symptom | Cause | Fix |
|---|---|---|
| The subscription option doesn't appear, or creating the provider returns HTTP `403` with `subscription_providers_disabled`. | Subscription providers are not enabled for your organization. | Contact your Customer Success Manager. |
| A request returns HTTP `403` with `no_permitted_target`. | The user's access does not include the provider or the model. | Grant access to the whole provider or to the model. See [Grant access to a subscription provider](#grant-access-to-a-subscription-provider). |
| Claude Code shows `Failed to authenticate.` followed by `access denied: model "<PROVIDER_SLUG>/<MODEL_ID>" is not allowed by your access policies`. | AI Gateway denied the model. Claude Code adds `Failed to authenticate.` to every `403` response, so the error is not a sign-in problem. | Grant access to the model or to the whole provider. |
| A request returns HTTP `400` with `model_not_found`. | The `x-ai-gateway-provider` slug doesn't match a configured provider. | Check the slug on the provider's page. |
| A request returns HTTP `400` with `unsupported_operation`. | The request used an API that the subscription provider doesn't serve. | Use Anthropic Messages with an Anthropic subscription provider, and OpenAI Responses with an OpenAI subscription provider. |
| Anthropic or OpenAI returns HTTP `401` during a session. | The subscription sign-in is missing or expired. | Sign in again: run `/login` in Claude Code, or run `codex login`. |
| Usage is billed per token instead of to the subscription. | Claude Code sends an API credential from `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, or `apiKeyHelper`. | Remove the setting, then sign in with `/login`. |
| Saving a routing rule fails with `is a subscription provider, which callers reach by pinning it rather than through a routing rule`. | Routing rules cannot include a subscription provider. | Remove the provider from the rule. Claude Code and Codex pin the provider with the `x-ai-gateway-provider` header. |
| Codex logs `failed to refresh available models`. | AI Gateway does not return Codex's model list. | No action is needed. Codex uses its built-in model list. |

## Manage providers

AI Gateway supports these model families on each provider. It also supports custom OpenAI-compatible endpoints.

| Model family | OpenAI | Anthropic | Google Cloud Vertex AI | Amazon Bedrock | Azure OpenAI |
|---|:---:|:---:|:---:|:---:|:---:|
| OpenAI GPT | {{< X >}} | | | {{< X >}} | {{< X >}} |
| Anthropic Claude | | {{< X >}} | {{< X >}} | {{< X >}} | |
| Gemini | | | {{< X >}} | | |

Gemini models are available only through Google Cloud Vertex AI providers. AI Gateway does not support the Gemini API (`generativelanguage.googleapis.com`) as a provider, and does not support the Gemini Interactions API on Vertex AI.

Open a provider from the list to review its connection, models, generated requests, and traffic. Click {{< ui >}}Edit provider{{< /ui >}} to change its display name or model settings. Manage caller access through access policies.

The slug, provider type, integration account, and connection configuration cannot be changed after you create the provider. To move to a different integration account or slug, create another provider, verify it, then update dependent applications and routing rules. Before deleting a provider, review the dependency impact shown in the confirmation. A decision model chooses the destination for a smart routing rule. If a rule uses this provider as its decision model, select another decision model before deleting the provider.

### Diagnose connection problems

| Symptom | Check |
|---|---|
| The account is missing or unavailable. | Check that it is saved in the same Datadog organization, enabled for the integration, and available to this workload. |
| Model discovery fails. | Open the provider's status details. Review the upstream status and suggested fix, then use {{< ui >}}Open integration{{< /ui >}} to update credentials when available. |
| Discovery works, but inference fails. | Check upstream invocation permissions, model approvals, deployment configuration, region, and project. For Foundry, confirm both Azure roles. |
| The wrong model is requested. | Compare the AI Gateway Model ID with the upstream Provider model ID or Vertex resource path. |
| AI Gateway returns HTTP `401` or `403`. | Check `ai_gateway_usage`, credential scope, and the access policy for the requested model or route. |
| A request format fails. | Check the model's supported operations and the upstream endpoint's capabilities. |

Provider status updates after model synchronization or AI Gateway requests. Review the timestamp and error details, and verify a real request after fixing the connection.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[providers-1]: /ai_gateway/getting_started/#prerequisites
[providers-2]: /ai_gateway/applications/#authenticate-requests
[providers-3]: /integrations/google_cloud_platform/
[providers-4]: /integrations/azure/
[providers-5]: https://app.datadoghq.com/llm/gateway/providers
[providers-6]: https://app.datadoghq.com/llm/gateway/model-catalog
[providers-7]: /ai_gateway/access_control/
[providers-8]: /getting_started/site/
[providers-9]: /account_management/rbac/permissions/#integrations
[subscription-1]: /account_management/personal-access-tokens/
[subscription-2]: https://app.datadoghq.com/llm/gateway/providers
[subscription-3]: https://app.datadoghq.com/llm/gateway
[subscription-4]: https://app.datadoghq.com/llm/gateway/access
[subscription-5]: https://app.datadoghq.com/llm/gateway/governance/general
