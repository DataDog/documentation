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
- A configured integration account for the provider. To create or update API-key accounts, request **Integrations Manage** (`manage_integrations`). Cloud integration setup has separate [AWS, Azure, and GCP configuration permissions][providers-9].
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

In the provider form's {{< ui >}}Account{{< /ui >}} selector, select an existing account, or open {{< ui >}}+ Add new account{{< /ui >}} and choose the provider. Save the integration settings, then return to Gateway setup.

Some accounts use a separate integration page:

- **Vertex AI** opens the [Google Cloud integration][providers-3], where you configure a service account with Vertex AI access.
- **Baseten** opens the Baseten integration, where you configure a key permitted to call Model APIs.
- **Azure AI Foundry** offers {{< ui >}}+ Set up the Azure integration{{< /ui >}}. Complete [Azure integration setup][providers-4], return to the form, and select the app registration.

Integration credentials remain separate from the Datadog credential the application uses to call Gateway. Rotate upstream credentials in the integration settings.

## Add a provider

1. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Models{{< /ui >}} > {{< ui >}}Provider accounts{{< /ui >}}][providers-5] and click {{< ui >}}New Provider{{< /ui >}}.
2. In {{< ui >}}Details{{< /ui >}}, select the provider's integration account and complete its connection settings. See the [Choose a provider account](#choose-a-provider-account) section.
3. Enter a display name and a unique slug, such as `production-openai`. The slug becomes part of every direct model request. The connected account and slug cannot be changed after creation.
4. In {{< ui >}}Models{{< /ui >}}, review {{< ui >}}Discovered models{{< /ui >}}. Gateway automatically enables discovered models. [Add models manually](#add-a-model-manually) if the provider does not return a model you need.
5. Review the cost multiplier and the prices in the [Model Catalog][providers-6]. A custom model price takes precedence over the provider multiplier. Confirm pricing before relying on spend reporting or budgets.
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

Use **Custom Provider** for endpoints that accept OpenAI Chat Completions, OpenAI Responses, Anthropic Messages, or System One requests. These are the operations available in the Gateway form.

Custom endpoints authenticate with a bearer API key. The {{< ui >}}Provider{{< /ui >}} field in the account editor only fills in a default base URL. AI Gateway doesn't use it to choose a request format or authentication method: select the request formats under {{< ui >}}Supported operations{{< /ui >}} in step 6.

1. In the account selector, select {{< ui >}}+ Add new account{{< /ui >}} > {{< ui >}}Custom Provider{{< /ui >}}.
2. Enter a {{< ui >}}Name{{< /ui >}} and select a {{< ui >}}Provider{{< /ui >}} label. The account editor offers OpenAI, Anthropic, Gemini, Azure OpenAI, `AWS Bedrock`, and Custom. Select the actual request formats separately in step 6.
3. Set {{< ui >}}Base URL{{< /ui >}} to the HTTPS API base URL, including the required base path, for example `https://llm.example.com/v1`. AI Gateway discovers models by calling `GET <BASE_URL>/models`, so the endpoint must implement the OpenAI [List models](https://platform.openai.com/docs/api-reference/models/list) API and return `{"object": "list", "data": [{"id": "<MODEL_ID>", ...}]}`. If it doesn't, [add its models manually](#add-a-model-manually).
4. Enter the upstream {{< ui >}}API Key{{< /ui >}}. If the {{< ui >}}Authentication{{< /ui >}} selector is displayed, select {{< ui >}}API key{{< /ui >}} for this setup.
5. Add any {{< ui >}}Custom Headers{{< /ui >}} required by the endpoint, then click {{< ui >}}Save{{< /ui >}}.
6. Back in the Gateway provider form, select the saved account. Under {{< ui >}}Supported operations{{< /ui >}}, select the request formats this endpoint accepts.
7. Review discovery and any manual models, then complete provider creation.

The selected operations become the defaults for discovered models and newly added manual models. Declaring an operation does not add support to the upstream endpoint. Test each request format the application needs.

## Identify models in requests

Gateway distinguishes the caller-facing model identifier from the identifier sent upstream:

| Setting | Purpose | Example |
|---|---|---|
| Provider slug | Identifies the Gateway provider account. | `production-openai` |
| Model ID | Identifies a model within that Gateway provider. | `approved-model` |
| Provider model ID | Identifies the upstream model or deployment. Defaults to **Model ID** when blank. | `deployment-name` |

For those example values, the application sends:

```json
{"model": "production-openai/approved-model"}
```

Gateway sends `deployment-name` as the upstream model identifier. Use the complete `<PROVIDER_SLUG>/<MODEL_ID>` from the Gateway catalog, rather than the upstream identifier alone.

### Add a model manually

AI Gateway discovers a provider's models from its model list. Add a model manually when a model the provider serves isn't in that list. For example, OpenAI serves `codex-auto-review`, the model Codex uses for automatic reviews, but doesn't list it in its models API.

1. In the provider's {{< ui >}}Models{{< /ui >}} stage, under {{< ui >}}Manually add model{{< /ui >}}, click {{< ui >}}Add model{{< /ui >}}.
2. Enter a unique {{< ui >}}Model ID{{< /ui >}} within the provider.
3. Enter {{< ui >}}Provider model ID{{< /ui >}} if it differs from the Model ID. For Vertex AI, the field is {{< ui >}}Provider resource path{{< /ui >}} and requires a full resource path, such as:

   ```text
   projects/<PROJECT_ID>/locations/<LOCATION>/publishers/google/models/<PUBLISHER_MODEL_ID>
   ```

4. Select the supported operations that the upstream model accepts, then save the provider.
5. Check the model's operations, enabled state, and price in the Model Catalog. Send a request to verify the mapping.

A manual entry does not grant upstream model access or Gateway caller access. Configure both before testing it.

## Verify the connection

1. Open the saved provider. Under {{< ui >}}How to call this provider{{< /ui >}}, select a model and request format to view a generated example.
2. Run the example with the application's Datadog credential and the Gateway endpoint for the correct [Datadog site][providers-8]. For a model that supports Chat Completions:

   ```shell
   curl -X POST "https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai/v1/chat/completions" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <DATADOG_ACCESS_TOKEN>" \
     -d '{
       "model": "<PROVIDER_SLUG>/<MODEL_ID>",
       "messages": [{"role": "user", "content": "Reply with hello."}]
     }'
   ```

3. Confirm a successful model response. Click {{< ui >}}View in Traces{{< /ui >}} and find the matching Gateway request by timestamp, caller, provider, and model.
4. Confirm the served destination and token usage. If the request succeeds but spend is missing, check model pricing separately.
5. Repeat with each operation the application uses. Success with one API does not verify another API, region, or model.

## Manage providers

AI Gateway supports these model families on each provider. It also supports custom OpenAI-compatible endpoints.

| Model family | OpenAI | Anthropic | GCP Vertex AI | Amazon Bedrock | Azure OpenAI |
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
| The wrong model is requested. | Compare the Gateway Model ID with the upstream Provider model ID or Vertex resource path. |
| Gateway returns HTTP `401` or `403`. | Check `ai_gateway_usage`, credential scope, and the access policy for the requested model or route. |
| A request format fails. | Check the model's supported operations and the upstream endpoint's capabilities. |

Provider status updates after model synchronization or Gateway requests. Review the timestamp and error details, and verify a real request after fixing the connection.

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
