---
title: Managed Evaluations
description: Learn how to configure managed evaluations for your LLM applications.
further_reading:
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: Blog
  text: Gain visibility into Strands Agents workflows with Datadog LLM Observability
- link: "/llm_observability/terms/"
  tag: "Documentation"
  text: "Learn about LLM Observability terms and concepts"
- link: "/llm_observability/setup"
  tag: "Documentation"
  text: "Learn how to set up LLM Observability"
- link: "https://www.datadoghq.com/blog/llm-observability-hallucination-detection/"
  tag: "Blog"
  text: "Detect hallucinations in your RAG LLM applications with Datadog LLM Observability"
aliases:
    - /llm_observability/evaluations/ootb_evaluations
---

## Overview

Managed evaluations are built-in tools to assess your LLM application on dimensions like quality, security, and safety. By creating them, you can assess the effectiveness of your application's responses, including detection of sentiment, topic relevancy, toxicity, failure to answer, and hallucination.

LLM Observability associates evaluations with individual spans so you can view the inputs and outputs that led to a specific evaluation.

LLM Observability managed evaluations leverage LLMs. To connect your LLM provider to Datadog, you need a key from the provider.

Learn more about the [compatibility requirements][19].

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

{{< img src="llm_observability/configuration/openai-tile.png" alt="The OpenAI configuration tile in LLM Observability. Lists instructions for configuring OpenAI and providing your OpenAI API key." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
{{% /tab %}}
{{% tab "Azure OpenAI" %}}

<div class="alert alert-danger">If you are subject to HIPAA, you are responsible for ensuring that you connect only to an Azure OpenAI account that is subject to a business associate agreement (BAA) and meets all requirements for HIPAA compliance.</div>

Connect your Azure OpenAI account to LLM Observability with your OpenAI API key. Datadog strongly recommends using the `GPT-4o mini` model for evaluations. The selected model version must support [structured output][8].

1. In Datadog, navigate to [**LLM Observability > Settings > Integrations**][1].
1. Select **Connect** on the Azure OpenAI tile.
1. Follow the instructions on the tile.
   - Provide your Azure OpenAI API key. Ensure that this key has **write** permission for **model capabilities**.
   - Provide the Resource Name, Deployment ID, and API version to complete integration.

{{< img src="llm_observability/configuration/azure-openai-tile.png" alt="The Azure OpenAI configuration tile in LLM Observability. Lists instructions for configuring Azure OpenAI and providing your API Key, Resource Name, Deployment ID, and API Version." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
[8]: https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/structured-outputs
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
1. Be sure to configure the **Invoke models from Amazon Bedrock** role to run evaluations


{{< img src="llm_observability/configuration/amazon-bedrock-tile.png" alt="The Amazon Bedrock configuration tile in LLM Observability. Lists instructions for configuring Amazon Bedrock." style="width:100%;" >}}

{{< img src="llm_observability/configuration/amazon-bedrock-tile-step2.png" alt="The second step in configuring Amazon Bedrock requires users to add permissions to the integration account. style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
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
<div class="alert alert-info">This feature is in Private Preview. Contact your account team for access.</div>

Your AI Gateway must be compatible with the [OpenAI API specification][2].

Connect your AI Gateway to LLM Observability with your base URL, API key, and headers.

1. In Datadog, navigate to [**LLM Observability > Settings > Integrations**][1].
1. Click the **Configure** tab, then click **New** to create a new gateway.
1. Follow the instructions on the tile.
   - Provide a name for your gateway.
   - Select your provider.
   - Provide your base URL.
   - Provide your API key and optionally any headers.

{{< img src="llm_observability/configuration/ai-gateway-tile-2.png" alt="The AI Gateway configuration tile in LLM Observability. Lists instructions for configuring an ai gateway" style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://platform.openai.com/docs/api-reference/introduction
{{% /tab %}}
{{< /tabs >}}

If your LLM provider restricts IP addresses, you can obtain the required IP ranges by visiting [Datadog's IP ranges documentation][2], selecting your `Datadog Site`, pasting the `GET` URL into your browser, and copying the `webhooks` section.

## Create new evaluations

1. Navigate to [**AI Observability > Evaluations**][1].
1. Click on the **Create Evaluation** button on the top right corner.
1. Select a specific managed evaluation. This will open the evalution editor window.
1. Select the LLM application(s) you want to configure your evaluation for.
1. Select the LLM provider and corresponding  account.
    - If you select an **Amazon Bedrock** account, choose the region the account is configured for.
    - If you select a **Vertex** account, choose a project and location.
1. Configure the data to run the evaluation on:
   - Select **Traces** (filtering for the root span of each trace) or **All Spans** (no filtering).
   - (Optional) Specify any or all **tags** you want this evaluation to run on.
   - (Optional) Select what percentage of spans you would like this evaluation to run on by configuring the **sampling percentage**. This number must be greater than `0` and less than or equal to `100` (sampling all spans).
1. (Optional) Configure evaluation options by selecting what subcategories should be flagged. Only available on some evaluations.

After you click **Save and Publish**, LLM Observability uses the LLM account you connected to power the evaluation you enabled. Alternatively, you can **Save as Draft** and edit or enable them later.

## Edit existing evaluations

1. Navigate to [**AI Observability > Evaluations**][1].
1. Hover over the evaluation you want to edit and click the **Edit** button.

### Estimated token usage

You can monitor the token usage of your managed LLM evaluations using [this dashboard][3].

If you need more details, the following metrics allow you to track the LLM resources consumed to power evaluations:


- `ml_obs.estimated_usage.llm.input.tokens`
- `ml_obs.estimated_usage.llm.output.tokens`
- `ml_obs.estimated_usage.llm.total.tokens`

Each of these metrics has `ml_app`, `model_server`, `model_provider`, `model_name`, and `evaluation_name` tags, allowing you to pinpoint specific applications, models, and evaluations contributing to your usage.


### Quality evaluations

[Quality evaluations][4] help ensure your LLM-powered applications generate accurate, relevant, and safe responses. Managed evaluations automatically score model outputs on key quality dimensions and attach results to traces, helping you detect issues, monitor trends, and improve response quality over time. Datadog offers the following quality evaluations:

- [Topic relevancy][5] - Measures whether the model’s response stays relevant to the user’s input or task
- [Hallucination][6] - Detects when the model generates incorrect or unsupported information presented as fact
- [Failure to Answer][7] - Identifies cases where the model does not meaningfully answer the user’s question
- [Language Mismatch][8] - Flags responses that are written in a different language than the user’s input
- [Sentiment][9] - Evaluates the emotional tone of the model’s response to ensure it aligns with expectations

### Security and Safety evaluations

[Security and Safety evaluations][10] help ensure your LLM-powered applications resist malicious inputs and unsafe outputs. Managed evaluations automatically detect risks like prompt injection and toxic content by scoring model interactions and tying results to trace data for investigation. Datadog offers the following security and safety evaluations:

- [Toxicity][11] - Detects harmful, offensive, or abusive language in model inputs or outputs
- [Prompt Injection][12] - Identifies attempts to manipulate the model into ignoring instructions or revealing unintended behavior
- [Sensitive Data Scanning][13] - Flags the presence of sensitive or regulated information in model inputs or outputs

### Session level evaluations

[Session level evaluations][14] help ensure your LLM-powered applications successfully achieve intended user outcomes across entire interactions. These managed evaluations analyze multi-turn sessions to assess higher-level goals and behaviors that span beyond individual spans, giving insight into overall effectiveness and user satisfaction. Datadog offers the following session-level evaluations:

- [Goal Completeness][15] - Evaluates whether the user’s intended goal was successfully achieved over the course of the entire session

### Agent evaluations

[Agent evaluations][16] help ensure your LLM-powered applications are making the right tool calls and successfully resolving user requests. These checks are designed to catch common failure modes when agents interact with external tools, APIs, or workflows. Datadog offers the following agent evaluations:

- [Tool selection][17] - Verifies that the tool(s) selected by an agent are correct
- [Tool argument correctness][18] - Ensures the arguments provided to a tool by the agent are correct

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/evaluations
[2]: /api/latest/ip-ranges/
[3]: https://app.datadoghq.com/dash/integration/llm_evaluations_token_usage
[4]: /llm_observability/evaluations/managed_evaluations/quality_evaluations
[5]: /llm_observability/evaluations/managed_evaluations/quality_evaluations#topic-relevancy
[6]: /llm_observability/evaluations/managed_evaluations/quality_evaluations#hallucination
[7]: /llm_observability/evaluations/managed_evaluations/quality_evaluations#failure-to-answer
[8]: /llm_observability/evaluations/managed_evaluations/quality_evaluations#language-mismatch
[9]: /llm_observability/evaluations/managed_evaluations/quality_evaluations#sentiment
[10]: /llm_observability/evaluations/managed_evaluations/security_and_safety_evaluations
[11]: /llm_observability/evaluations/managed_evaluations/security_and_safety_evaluations#toxicity
[12]: /llm_observability/evaluations/managed_evaluations/security_and_safety_evaluations#prompt-injection
[13]: /llm_observability/evaluations/managed_evaluations/security_and_safety_evaluations#sensitive-data-scanning
[14]: /llm_observability/evaluations/managed_evaluations/session_level_evaluations
[15]: /llm_observability/evaluations/managed_evaluations/session_level_evaluations#goal-completeness
[16]: /llm_observability/evaluations/managed_evaluations/agent_evaluations
[17]: /llm_observability/evaluations/managed_evaluations/agent_evaluations#tool-selection
[18]: /llm_observability/evaluations/managed_evaluations/agent_evaluations#tool-argument-correctness
[19]: /llm_observability/evaluations/evaluation_compatibility
