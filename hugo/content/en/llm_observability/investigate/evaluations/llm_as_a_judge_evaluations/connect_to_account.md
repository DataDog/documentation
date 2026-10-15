---
title: Connect your LLM provider account
aliases:
- /llm_observability/evaluations/custom_llm_as_a_judge_evaluations/connect_to_account/
- /llm_observability/configure/evaluations/llm_as_a_judge_evaluations/connect_to_account/
description: How to connect to your LLM provider account to support judge LLM based evaluations
further_reading:
- link: "/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations"
  tag: "Documentation"
  text: "Learn about custom LLM-as-a-judge evaluators"
---

## Connect your LLM provider account

Configure the LLM provider you would like to use for bring-your-own-key (BYOK) evaluations. You only have to complete this step once.

{{< tabs >}}
{{% tab "OpenAI" %}}

<div class="alert alert-danger">If you are subject to HIPAA, you are responsible for ensuring that you connect only to an OpenAI account that is subject to a business associate agreement (BAA) and meets all requirements for HIPAA compliance.</div>

Connect your OpenAI account to Agent Observability with your OpenAI API key.

1. In Datadog, navigate to [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1].
1. Select {{< ui >}}Connect{{< /ui >}} on the OpenAI tile.
1. Follow the instructions on the tile.
   - Provide your OpenAI API key. Ensure that this key has {{< ui >}}write{{< /ui >}} permission for {{< ui >}}model capabilities{{< /ui >}}.
1. Enable {{< ui >}}Use this API key to evaluate your LLM applications{{< /ui >}}.
1. Agent Observability requires that the `complete/chat` API endpoint be available for the selected model. See [OpenAI's model overview page][3] for details about which models support this endpoint.

{{< img src="llm_observability/configuration/openai-tile.png" alt="The OpenAI configuration tile in Agent Observability. Lists instructions for configuring OpenAI and providing your OpenAI API key." style="width:100%;" >}}

Agent Observability does not support [data residency][2] for OpenAI.

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://platform.openai.com/docs/guides/your-data#which-models-and-features-are-eligible-for-data-residency
[3]: https://developers.openai.com/api/docs/models
{{% /tab %}}
{{% tab "Azure OpenAI" %}}

<div class="alert alert-danger">If you are subject to HIPAA, you are responsible for ensuring that you connect only to an Azure OpenAI account that is subject to a business associate agreement (BAA) and meets all requirements for HIPAA compliance.</div>

Connect your Azure OpenAI account to Agent Observability with your OpenAI API key. Datadog strongly recommends using the `GPT-4o mini` model for evaluations. The selected model version must support [structured output][8], and the Chat Completions API must be available. See a [full list of compatible models][9].

1. In Datadog, navigate to [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1].
1. Select {{< ui >}}Connect{{< /ui >}} on the Azure OpenAI tile.
1. Follow the instructions on the tile.
   - Provide your Azure OpenAI API key. Ensure that this key has {{< ui >}}write{{< /ui >}} permission for {{< ui >}}model capabilities{{< /ui >}}.
   - Provide the Resource Name, Deployment ID, and API version to complete integration.

{{< img src="llm_observability/configuration/azure-openai-tile.png" alt="The Azure OpenAI configuration tile in Agent Observability. Lists instructions for configuring Azure OpenAI and providing your API Key, Resource Name, Deployment ID, and API Version." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
[8]: https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/structured-outputs
[9]: https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure?tabs=global-standard-aoai%2Cglobal-standard&pivots=azure-openai
{{% /tab %}}
{{% tab "Anthropic" %}}

<div class="alert alert-danger">If you are subject to HIPAA, you are responsible for ensuring that you connect only to an Anthropic account that is subject to a business associate agreement (BAA) and meets all requirements for HIPAA compliance.</div>

Connect your Anthropic account to Agent Observability with your Anthropic API key.

1. In Datadog, navigate to [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1].
1. Select {{< ui >}}Connect{{< /ui >}} on the Anthropic tile.
1. Follow the instructions on the tile.
   - Provide your Anthropic API key. Ensure that this key has {{< ui >}}write{{< /ui >}} permission for {{< ui >}}model capabilities{{< /ui >}}.

{{< img src="llm_observability/configuration/anthropic-tile.png" alt="The Anthropic configuration tile in Agent Observability. Lists instructions for configuring Anthropic and providing your Anthropic API key." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
{{% /tab %}}
{{% tab "Amazon Bedrock" %}}

<div class="alert alert-danger">If you are subject to HIPAA, you are responsible for ensuring that you connect only to an Amazon Bedrock account that is subject to a business associate agreement (BAA) and meets all requirements for HIPAA compliance.</div>

Connect your Amazon Bedrock account to Agent Observability with your AWS Account.

1. In Datadog, navigate to [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1].
1. Select {{< ui >}}Connect{{< /ui >}} on the Amazon Bedrock tile.
1. Follow the instructions on the tile.

   {{< img src="llm_observability/configuration/amazon-bedrock-tile.png" alt="The Amazon Bedrock configuration tile in Agent Observability. Lists instructions for configuring Amazon Bedrock." style="width:100%;" >}}

4. Be sure to configure the {{< ui >}}Invoke models from Amazon Bedrock{{< /ui >}} role to run evaluations. More details about the InvokeModel action can be found in the [Amazon Bedrock API reference documentation][2].


   {{< img src="llm_observability/configuration/amazon-bedrock-tile-step-2.png" alt="The second step in configuring Amazon Bedrock requiring users to add permissions to the integration account." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html
{{% /tab %}}

{{% tab "GCP Vertex AI" %}}

<div class="alert alert-danger">If you are subject to HIPAA, you are responsible for ensuring that you connect only to a Google Cloud Platform account that is subject to a business associate agreement (BAA) and meets all requirements for HIPAA compliance.</div>

Connect Vertex AI to Agent Observability with your Google Cloud Platform account.

1. In Datadog, navigate to [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1].
1. On the Google Cloud Vertex AI tile, click {{< ui >}}Connect{{< /ui >}} to add a new GCP account, or click {{< ui >}}Configure{{< /ui >}} next to where your existing accounts are listed to begin the onboarding process.
   - You will see all GCP accounts connected to Datadog in this page. However, you must still go through the onboarding process for an account to use it in Agent Observability.
1. Follow the onboarding instructions to configure your account.
   - Add the [{{< ui >}}Vertex AI User{{< /ui >}}][2] role to your account and enable the [{{< ui >}}Vertex AI API{{< /ui >}}][3].

{{< img src="llm_observability/configuration/vertex-ai-pint.png" alt="The Vertex AI onboarding workflow. Follow steps to configure your GCP service account with the right Vertex AI permissions for use with Agent Observability." style="width:100%;" >}}

**Note**: When you run evaluations, the location selector offers single-region, multi-region, and global options. For details on each option, see [Google's Vertex AI locations documentation][4].

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://docs.cloud.google.com/vertex-ai/docs/general/access-control#aiplatform.user
[3]: https://console.cloud.google.com/apis/library/aiplatform.googleapis.com
[4]: https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations
{{% /tab %}}

{{% tab "Custom Provider" %}}
<div class="alert alert-danger">If you are subject to HIPAA, you are responsible for ensuring that you only connect to a custom provider that is subject to a business associate agreement (BAA) and meets all requirements for HIPAA compliance.</div>

Your custom provider endpoint must be compatible with the [OpenAI API specification][2].

Connect your custom provider to Agent Observability with your base URL, a way to authenticate, and optional headers. Datadog can authenticate with an API key, or with short-lived OAuth 2.0 access tokens from your identity provider.

1. In Datadog, navigate to [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1].
1. Select the {{< ui >}}Custom Provider for Agent Observability{{< /ui >}} tile.
1. Click the {{< ui >}}Configure{{< /ui >}} tab, then click {{< ui >}}New{{< /ui >}} to create a provider.
1. Follow the instructions on the tile.
   - Enter a name for your provider.
   - Select your provider.
   - Provide your base URL.
   - Choose an authentication method and provide its credentials, as described below.
   - Optionally, add any headers.

#### Authenticate with an API key

Select {{< ui >}}API key{{< /ui >}} and provide your API key. Datadog sends it to your provider as `Authorization: Bearer <API_KEY>`.

#### Authenticate with OAuth 2.0 client credentials

<div class="alert alert-info">OAuth 2.0 client credentials authentication is in Preview. Contact your Datadog representative to request access.</div>

If your provider, such as an AI gateway, accepts OAuth 2.0 access tokens from your identity provider (IdP), Datadog can obtain short-lived tokens with the [client credentials grant][3] instead of using a static API key. Datadog authenticates to your IdP's token endpoint with a client ID and client secret, caches the access token until shortly before it expires, and sends it to your provider as `Authorization: Bearer <ACCESS_TOKEN>`. The client secret is sent only to your IdP's token URL, never to your provider.

Select {{< ui >}}OAuth 2.0 client credentials{{< /ui >}} and provide:

- {{< ui >}}Token URL{{< /ui >}}: Your IdP's token endpoint. Must use HTTPS.
- {{< ui >}}Client ID{{< /ui >}} and {{< ui >}}Client secret{{< /ui >}}: The credentials of the application that represents Datadog in your IdP.
- {{< ui >}}Scope{{< /ui >}} (optional): Space-separated scopes that your provider requires.
- {{< ui >}}Audience{{< /ui >}} (optional): Only for IdPs that require an `audience` parameter.

When you save the provider, Datadog requests an access token and calls your provider's `/models` endpoint to verify the connection.

To rotate the client secret, generate a new secret in your IdP, update it in Datadog, and then deactivate the old secret. To revoke Datadog's access, deactivate the application in your IdP. Access tokens that were already issued remain valid until they expire, so keep token lifetimes short.

##### Example: Okta

Client credentials on an Okta custom authorization server requires an Okta plan that supports it.

1. In Okta, go to {{< ui >}}Security{{< /ui >}} > {{< ui >}}API{{< /ui >}} > {{< ui >}}Authorization Servers{{< /ui >}} and use a custom authorization server whose audience matches what your provider validates. Your token URL is `<ISSUER>/v1/token`.
1. On the authorization server's {{< ui >}}Scopes{{< /ui >}} tab, add a scope for provider access, such as `gateway.invoke`. Okta requires at least one scope for client credentials requests.
1. Go to {{< ui >}}Applications{{< /ui >}} > {{< ui >}}Create App Integration{{< /ui >}}, select {{< ui >}}API Services{{< /ui >}}, and select {{< ui >}}Use Okta-generated client ID{{< /ui >}}.
   - Under {{< ui >}}Client Credentials{{< /ui >}}, set {{< ui >}}Client authentication{{< /ui >}} to {{< ui >}}Client secret{{< /ui >}}.
   - Under {{< ui >}}General Settings{{< /ui >}}, turn off {{< ui >}}Require Demonstrating Proof of Possession (DPoP) header in token requests{{< /ui >}}.
   - Copy the client ID and client secret.
1. On the authorization server's {{< ui >}}Access Policies{{< /ui >}} tab, add a policy assigned to the application, with a rule that allows the {{< ui >}}Client Credentials{{< /ui >}} grant type and the scope from step 2.
1. In Datadog, enter the token URL, client ID, client secret, and scope. Leave {{< ui >}}Audience{{< /ui >}} empty.

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://platform.openai.com/docs/api-reference/introduction
[3]: https://datatracker.ietf.org/doc/html/rfc6749#section-4.4
{{% /tab %}}
{{< /tabs >}}

If your LLM provider restricts IP addresses, you can obtain the required IP ranges by visiting [Datadog's IP ranges documentation][2], selecting your `Datadog Site`, pasting the `GET` URL into your browser, and copying the `webhooks` section.

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: /api/latest/ip-ranges/
