---
title: Configuration
description: Learn how to configure topics and evaluations for your LLM applications on the Configuration page.
further_reading:
- link: "/llm_observability/terms/"
  tag: "Documentation"
  text: "Learn about Evaluations"
- link: "/llm_observability/submit_evaluations/"
  tag: "Documentation"
  text: "Learn how to submit Evaluations"
- link: "/llm_observability/setup"
  tag: "Documentation"
  text: "Learn how to set up LLM Observability"
---

## Overview

You can configure your LLM applications on the Settings page to optimize your application's performance and security.

Evaluations
: Enables Datadog to assess your LLM application on dimensions like Quality, Security, and Safety. By enabling evaluations, you can assess the effectiveness of your application's responses and maintain high standards for both performance and user safety. For more information about evaluations, see [Terms and Concepts][1].

Topics
: Helps identify irrelevant input for the `topic relevancy` out-of-the-box evaluation, ensuring your LLM application stays focused on its intended purpose.

## Connect your account

{{< tabs >}}
{{% tab "OpenAI" %}}

<div class="alert alert-info">If you are a HIPAA organization with a Business Associate Agreement (BAA) with Datadog, any OpenAI API keys you integrate must be from your OpenAI account with a BAA and zero data retention.</div>

Connect your OpenAI account to LLM Observability with your OpenAI API key. LLM Observability uses the `GPT-4o mini` model for Evaluations.

1. In Datadog, navigate to [**LLM Observability > Settings > Integrations**][1].
1. Select **Connect** on the OpenAI tile.
1. Follow the instructions on the tile.
   - Provide your OpenAI API key. Ensure that this key has **write** permission for **model capabilities**.
1. Enable **Use this API key to evaluate your LLM applications**.

{{< img src="llm_observability/configuration/openai-tile.png" alt="The OpenAI configuration tile in LLM Observability. Lists instructions for configuring OpenAI and providing your OpenAI API key." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
{{% /tab %}}
{{% tab "Azure OpenAI" %}}

<div class="alert alert-info">Azure OpenAI is not supported for HIPAA organizations with a Business Associate Agreement (BAA) with Datadog.</div>

Connect your Azure OpenAI account to LLM Observability with your OpenAI API key. We strongly recommend using the **GPT-4o mini** model for Evaluations.

1. In Datadog, navigate to [**LLM Observability > Settings > Integrations**][1].
1. Select **Connect** on the Azure OpenAI tile.
1. Follow the instructions on the tile.
   - Provide your Azure OpenAI API key. Ensure that this key has **write** permission for **model capabilities**.
   - Provide the Resource Name, Deployment ID, and API version to complete integration.

{{< img src="llm_observability/configuration/azure-openai-tile.png" alt="The Azure OpenAI configuration tile in LLM Observability. Lists instructions for configuring Azure OpenAI and providing your API Key, Resource Name, Deployment ID, and API Version." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
{{% /tab %}}
{{% tab "Anthropic" %}}

<div class="alert alert-info">Anthropic is not supported for HIPAA organizations with a Business Associate Agreement (BAA) with Datadog.</div>

Connect your Anthropic account to LLM Observability with your Anthropic API key. LLM Observability uses the `Haiku` model for Evaluations.

1. In Datadog, navigate to [**LLM Observability > Settings > Integrations**][1].
1. Select **Connect** on the Anthropic tile.
1. Follow the instructions on the tile.
   - Provide your Anthropic API key. Ensure that this key has **write** permission for **model capabilities**.

{{< img src="llm_observability/configuration/anthropic-tile.png" alt="The Anthropic configuration tile in LLM Observability. Lists instructions for configuring Anthropic and providing your Anthropic API key." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
{{% /tab %}}
{{% tab "Amazon Bedrock" %}}

<div class="alert alert-info">AWS Bedrock is not supported for HIPAA organizations with a Business Associate Agreement (BAA) with Datadog.</div>

Connect your Amazon Bedrock account to LLM Observability with your AWS Account. LLM Observability uses the `Haiku` model for Evaluations.

1. In Datadog, navigate to [**LLM Observability > Settings > Integrations**][1].
1. Select **Connect** on the Amazon Bedrock tile.
1. Follow the instructions on the tile.

{{< img src="llm_observability/configuration/amazon-bedrock-tile.png" alt="The Amazon Bedrock configuration tile in LLM Observability. Lists instructions for configuring Amazon Bedrock." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
{{% /tab %}}
{{< /tabs >}}
## Select and enable evaluations

1. Navigate to [**LLM Observability > Settings > Evaluations**][2].
1. Click on the evaluation you want to enable.
   - Configure an evaluation for all of your LLM applications by selecting **Configure Evaluation**, or you select the edit icon to configure the evaluation for an individual LLM application.
   - Evaluations can be disabled by selecting the disable icon for an individual LLM application.
1. If you select **Configure Evaluation**, select the LLM application(s) you want to configure your evaluation for.
1. Select **OpenAI**, **Azure OpenAI**, **Anthropic**, or **Amazon Bedrock** as your LLM provider.
1. Select the account you want to run the evaluation on.
1. Choose whether you want the evaluation to run on traces (the root span of each trace) or spans (which include LLM, Workflow, and Agent spans).
   - If you select to run the evaluation on spans, you must select at least one span name to save your configured evaluation.
1. Select the span names you would like your evaluation to run on. (Optional if traces is selected).
1. Optionally, specify the tags you want this evaluation to run on and choose whether to apply the evaluation to spans that match any of the selected tags (Any of), or all of the selected tags (All of).
1. Select what percentage of spans you would like this evaluation to run on by configuring the **sampling percentage**. This number must be greater than 0 and less than or equal to 100. A Sampling Percentage of 100% means that the evaluation runs on all valid spans, whereas a sampling percentage of 50% means that the evaluation runs on 50% of valid spans.

After you click **Save**, LLM Observability uses the LLM account you connected to power the evaluation you enabled.

For more information about evaluations, see [Terms and Concepts][1].

### Estimated Token Usage

LLM Observability provides metrics to help you monitor and manage the token usage associated with evaluations that power LLM Observability. The following metrics allow you to track the LLM resources consumed to power evaluations:


- `ml_obs.estimated_usage.llm.input.tokens`
- `ml_obs.estimated_usage.llm.output.tokens`
- `ml_obs.estimated_usage.llm.total.tokens`

Each of these metrics has `ml_app`, `model_server`, `model_provider`, `model_name`, and `evaluation_name` tags, allowing you to pinpoint specific applications, models, and evaluations contributing to your usage.

## Provide topics for topic relevancy

Providing topics allows you to use the [topic relevancy][3] evaluation.

1. Go to [**LLM Observability > Applications**][4].
1. Select the application you want to add topics for.
1. At the bottom of the left sidebar, select **Configuration**.
1. Add topics in the pop-up modal.

Topics can contain multiple words and should be as specific and descriptive as possible. For example, for an LLM application that was designed for incident management, add "observability", "software engineering", or "incident resolution". If your application handles customer inquiries for an e-commerce store, you can use "Customer questions about purchasing furniture on an e-commerce store".


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/terms/
[2]: https://app.datadoghq.com/llm/settings/evaluations
[3]: /llm_observability/terms/#topic-relevancy
[4]: https://app.datadoghq.com/llm/applications
