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

You can configure your LLM applications on the Configuration page with settings that can optimize your application's performance and security.

Evaluations
: Enables Datadog to assess your LLM application on dimensions like Quality, Security, and Safety. By enabling evaluations, you can assess the effectiveness of your application's responses and maintain high standards for both performance and user safety. For more information about evaluations, see [Terms and Concepts][1].

Topics
: Helps identify irrelevant input for the `topic relevancy` out-of-the-box evaluation, ensuring your LLM application stays focused on its intended purpose.

## Connect your account

{{< tabs >}}
{{% tab "OpenAI" %}}

Connect your OpenAI account to LLM Observability with your OpenAI API key.

1. In Datadog, navigate to [**LLM Observability > Settings > Integrations**][2].
1. Select **Connect** on the OpenAI tile.
1. Follow the instructions on the tile.
   - Provide your OpenAI API key. Ensure that this key has **write** permission for **model capabilities**.
1. Enable **Use this API key to evaluate your LLM applications**.

{{< img src="llm_observability/configuration/openai-tile-2.png" alt="The OpenAI configuration tile in LLM Observability. Lists instructions for configuring OpenAI and providing your OpenAI API key." style="width:100%;" >}}
{{% /tab %}}

{{% tab "Azure OpenAI" %}}
Connect your Azure OpenAI account to LLM Observability with your OpenAI API key.

1. In Datadog, navigate to [**LLM Observability > Settings > Integrations**][2].
1. Select **Connect** on the Azure OpenAI tile.
1. Follow the instructions on the tile.
   - Provide your Azure OpenAI API key. Ensure that this key has **write** permission for **model capabilities**.
   - Provide the Resource Name, Deployment ID, and API version to complete integration.

{{< img src="llm_observability/configuration/azure-openai-tile-2.png" alt="The Azure OpenAI configuration tile in LLM Observability. Lists instructions for configuring Azure OpenAI and providing your API Key, Resource Name, Deployment ID, and API Version." style="width:100%;" >}}
{{% /tab %}}
{{< /tabs >}}
## Select and enable evaluations

1. Navigate to [**LLM Observability > Settings > Evaluations**][3].
1. Click on the evaluation you want to enable.
1. Select **OpenAI** or **Azure OpenAI** as your LLM provider.
1. Select the account you want to run the evaluation on.
1. Assign the LLM application you want to run the evaluation on.

After you click **Save**, LLM Observability invokes a `GPT-4o mini` model using the API key you provided.

For more information about evaluations, see [Terms and Concepts][1].

### Estimated Token Usage

LLM Observability provides metrics to help you monitor and manage the token usage associated with evaluations that power LLM Observability. The following metrics allow you to track the LLM resources consumed to power evaluations:


- `ml_obs.estimated_usage.llm.input.tokens`
- `ml_obs.estimated_usage.llm.output.tokens`
- `ml_obs.estimated_usage.llm.total.tokens`

Each of these metrics has `ml_app`, `model_server`, `model_provider`, `model_name`, and `evaluation_name` tags, allowing you to pinpoint specific applications, models, and evaluations contributing to your usage.

## Provide topics for topic relevancy

Providing topics allows you to use the [topic relevancy][4] evaluation.

1. Go to [**LLM Observability > Applications**][5].
1. Select the application you want to add topics for.
1. At the bottom of the left sidebar, select **Configuration**.
1. Add topics in the pop-up modal.

Topics can contain multiple words and should be as specific and descriptive as possible. For example, for an LLM application that was designed for incident management, add "observability", "software engineering", or "incident resolution". If your application handles customer inquiries for an e-commerce store, you can use "Customer questions about purchasing furniture on an e-commerce store".


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/terms/
[2]: https://app.datadoghq.com/llm/settings/integrations
[3]: https://app.datadoghq.com/llm/settings/evaluations
[4]: /llm_observability/terms/#topic-relevancy
[5]: https://app.datadoghq.com/llm/applications
