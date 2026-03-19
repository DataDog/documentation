---
title: Connect your LLM provider account
description: How to connect to your LLM provider account to support judge LLM based evaluations
further_reading:
- link: "/llm_observability/evaluations/custom_llm_as_a_judge_evaluations"
  tag: "Documentation"
  text: "Learn about custom LLM-as-a-judge evaluations"
---

## Connect your LLM provider account

Configure the LLM provider you would like to use for bring-your-own-key (BYOK) evaluations. You only have to complete this step once.

{{< tabs >}}
{{% tab "OpenAI" %}}

<div class="alert alert-danger">If you are subject to HIPAA, you are responsible for ensuring that you connect only to an OpenAI account that is subject to a business associate agreement (BAA) and meets all requirements for HIPAA compliance.</div>

Connect your OpenAI account to LLM Observability with your OpenAI API key. LLM Observability uses the `GPT-4o mini` model for evaluations.

1. In Datadog, navigate to [**LLM Observability > Settings > Integrations**][1].
1. Select **Connect** on the OpenAI tile.
1. Follow the instructions on the tile.
   - Provide your OpenAI API key. Ensure that this key has **write** permission for **model capabilities**.
1. Enable **Use this API key to evaluate your LLM applications**.
1. LLM Observability requires that the `complete/chat` API endpoint be available for the selected model. See [OpenAI's model overview page][3] for details about which models support this endpoint.

{{< img src="llm_observability/configuration/openai-tile.png" alt="The OpenAI configuration tile in LLM Observability. Lists instructions for configuring OpenAI and providing your OpenAI API key." style="width:100%;" >}}

LLM Observability does not support [data residency][2] for OpenAI.

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://platform.openai.com/docs/guides/your-data#which-models-and-features-are-eligible-for-data-residency
[3]: https://developers.openai.com/api/docs/models
{{% /tab %}}
{{% tab "Azure OpenAI" %}}

<div class="alert alert-danger">If you are subject to HIPAA, you are responsible for ensuring that you connect only to an Azure OpenAI account that is subject to a business associate agreement (BAA) and meets all requirements for HIPAA compliance.</div>

Connect your Azure OpenAI account to LLM Observability with your OpenAI API key. Datadog strongly recommends using the `GPT-4o mini` model for evaluations. The selected model version must support [structured output][8] and require the Chat Completions api be available. A full list of such models can be found [here][9].

1. In Datadog, navigate to [**LLM Observability > Settings > Integrations**][1].
1. Select **Connect** on the Azure OpenAI tile.
1. Follow the instructions on the tile.
   - Provide your Azure OpenAI API key. Ensure that this key has **write** permission for **model capabilities**.
   - Provide the Resource Name, Deployment ID, and API version to complete integration.

{{< img src="llm_observability/configuration/azure-openai-tile.png" alt="The Azure OpenAI configuration tile in LLM Observability. Lists instructions for configuring Azure OpenAI and providing your API Key, Resource Name, Deployment ID, and API Version." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
[8]: https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/structured-outputs
[9]: https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure?tabs=global-standard-aoai%2Cglobal-standard&pivots=azure-openai
{{% /tab %}}
{{% tab "Anthropic" %}}

<div class="alert alert-danger">If you are subject to HIPAA, you are responsible for ensuring that you connect only to an Anthropic account that is subject to a business associate agreement (BAA) and meets all requirements for HIPAA compliance.</div>

Connect your Anthropic account to LLM Observability with your Anthropic API key. LLM Observability uses the `Haiku` model for evaluations.

1. In Datadog, navigate to [**LLM Observability > Settings > Integrations**][1].
1. Select **Connect** on the Anthropic tile.
1. Follow the instructions on the tile.
   - Provide your Anthropic API key. Ensure that this key has **write** permission for **model capabilities**.

{{< img src="llm_observability/configuration/anthropic-tile.png" alt="The Anthropic configuration tile in LLM Observability. Lists instructions for configuring Anthropic and providing your Anthropic API key." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
{{% /tab %}}
{{% tab "Amazon Bedrock" %}}

<div class="alert alert-danger">If you are subject to HIPAA, you are responsible for ensuring that you connect only to an Amazon Bedrock account that is subject to a business associate agreement (BAA) and meets all requirements for HIPAA compliance.</div>

Connect your Amazon Bedrock account to LLM Observability with your AWS Account. LLM Observability uses the `Haiku` model for evaluations.

1. In Datadog, navigate to [**LLM Observability > Settings > Integrations**][1].
1. Select **Connect** on the Amazon Bedrock tile.
1. Follow the instructions on the tile.

   {{< img src="llm_observability/configuration/amazon-bedrock-tile.png" alt="The Amazon Bedrock configuration tile in LLM Observability. Lists instructions for configuring Amazon Bedrock." style="width:100%;" >}}

4. Be sure to configure the **Invoke models from Amazon Bedrock** role to run evaluations. More details about the InvokeModel action can be found in the [Amazon Bedrock API reference documentation][2].


   {{< img src="llm_observability/configuration/amazon-bedrock-tile-step-2.png" alt="The second step in configuring Amazon Bedrock requiring users to add permissions to the integration account." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html
{{% /tab %}}

{{% tab "GCP Vertex AI" %}}

<div class="alert alert-danger">If you are subject to HIPAA, you are responsible for ensuring that you connect only to a Google Cloud Platform account that is subject to a business associate agreement (BAA) and meets all requirements for HIPAA compliance.</div>

Connect Vertex AI to LLM Observability with your Google Cloud Platform account. LLM Observability uses the `gemini-2.5-flash` model for evaluations.

1. In Datadog, navigate to [**LLM Observability > Settings > Integrations**][1].
1. On the Google Cloud Vertex AI tile, click **Connect** to add a new GCP account, or click **Configure** next to where your existing accounts are listed to begin the onboarding process.
   - You will see all GCP accounts connected to Datadog in this page. However, you must still go through the onboarding process for an account to use it in LLM Observability.
1. Follow the onboarding instructions to configure your account.
   - Add the [**Vertex AI User**][2] role to your account and enable the [**Vertex AI API**][3].

{{< img src="llm_observability/configuration/vertex-ai-pint.png" alt="The Vertex AI onboarding workflow. Follow steps to configure your GCP service account with the right Vertex AI permissions for use with LLM Observability." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://docs.cloud.google.com/vertex-ai/docs/general/access-control#aiplatform.user
[3]: https://console.cloud.google.com/apis/library/aiplatform.googleapis.com
{{% /tab %}}

{{% tab "AI Gateway" %}}
<div class="alert alert-danger">If you are subject to HIPAA, you are responsible for ensuring that you only connect to an AI Gateway that is subject to a business associate agreement (BAA) and meets all requirements for HIPAA compliance.</div>

Your AI Gateway must be compatible with the [OpenAI API specification][2].

Connect your AI Gateway to LLM Observability with your base URL, API key, and headers.

1. In Datadog, navigate to [**LLM Observability > Settings > Integrations**][1].
1. Click the **Configure** tab, then click **New** to create a new gateway.
1. Follow the instructions on the tile.
   - Provide a name for your gateway.
   - Select your provider.
   - Provide your base URL.
   - Provide your API key and optionally any headers.

{{< img src="llm_observability/configuration/ai-gateway-tile-3.png" alt="The AI Gateway configuration tile in LLM Observability. Lists instructions for configuring an ai gateway" style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://platform.openai.com/docs/api-reference/introduction
{{% /tab %}}
{{< /tabs >}}

If your LLM provider restricts IP addresses, you can obtain the required IP ranges by visiting [Datadog's IP ranges documentation][2], selecting your `Datadog Site`, pasting the `GET` URL into your browser, and copying the `webhooks` section.

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: /api/latest/ip-ranges/

