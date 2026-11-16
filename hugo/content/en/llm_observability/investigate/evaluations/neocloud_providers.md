---
title: Neocloud Providers
description: Run custom LLM-as-a-judge evaluators on open-weight and fine-tuned models hosted on Baseten, Fireworks AI, or Together AI.
further_reading:
- link: "/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations"
  tag: "Documentation"
  text: "Learn about custom LLM-as-a-judge evaluators"
- link: "/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/connect_to_account"
  tag: "Documentation"
  text: "Connect an LLM provider account"
- link: "/llm_observability/improve/playground"
  tag: "Documentation"
  text: "Test prompts in Playground"
---

## Overview

Neocloud providers host open-weight models, such as DeepSeek, Qwen, GLM, and Llama, behind an OpenAI-compatible API. Agent Observability supports three neocloud providers:

- Baseten
- Fireworks AI
- Together AI

After you connect an account, you can use its models as the judge for [custom LLM-as-a-judge evaluators][1] and in [Playground][2].

## Use cases

- **Run evaluators on an open-weight model**: Use a model such as DeepSeek, Qwen, or GLM as the judge instead of a proprietary model.
- **Use your own fine-tuned model as the judge**: Enter the model ID of a model you fine-tuned on Fireworks AI or Together AI.
- **Reuse the provider your application already calls**: Run evaluations with the same account and models your application uses in production.

## Supported providers

| Provider     | API endpoint                            | Models you can use                                                                     |
|--------------|-----------------------------------------|----------------------------------------------------------------------------------------|
| Baseten      | `https://inference.baseten.co/v1`       | Models served by Baseten Model APIs. Dedicated deployments are not supported.          |
| Fireworks AI | `https://api.fireworks.ai/inference/v1` | Any model your API key can call through this endpoint, including fine-tuned models.   |
| Together AI  | `https://api.together.xyz/v1`           | Any model your API key can call through this endpoint, including fine-tuned models.   |

Neocloud providers are not available to organizations with HIPAA enabled.

## Set up an evaluator with a neocloud model

### Connect your account

1. In Datadog, navigate to [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][3].
1. Select {{< ui >}}Connect{{< /ui >}} on the Baseten, Fireworks AI, or Together AI tile.
1. Provide your API key. For Baseten, the key must be able to call Model APIs.

For more details, see [Connect an LLM provider account][4].

### Create the evaluator

1. Navigate to the Agent Observability [Evaluators page][5]. Select {{< ui >}}Create Evaluator{{< /ui >}}, then select {{< ui >}}Create your own{{< /ui >}}.
1. In the {{< ui >}}Account{{< /ui >}} dropdown menu, select your Baseten, Fireworks AI, or Together AI account.
1. In the {{< ui >}}Model{{< /ui >}} dropdown menu, select a model from the provider's list. For an unlisted model, such as a fine-tuned model, type its model ID and select {{< ui >}}Use model ID{{< /ui >}}.
1. Write your system and user prompts. See [Configure the prompt][6].
1. Define the evaluation output. Neocloud models support [Structured Output][7] and [Keyword Search Output][8]. Structured Output support varies by model. If the model's responses do not match your output schema, use Keyword Search Output.
1. Set the evaluation scope, then select {{< ui >}}Test Evaluator{{< /ui >}} to check that the model returns valid results before you publish. See [Test and preview][9].

## Choose a judge model

- **Test before you publish**: Open-weight models vary in how well they follow instructions and output schemas. Run the evaluator on sample spans before you enable it.
- **Compare judges in offline experiments**: Run the evaluator in an [offline experiment][10] to compare an open-weight judge with your current judge on one dataset.
- **Enable reasoning** to see why the model reached each result, which helps you spot a judge that misreads your rubric.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations
[2]: /llm_observability/improve/playground
[3]: https://app.datadoghq.com/llm/settings/integrations
[4]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/connect_to_account
[5]: https://app.datadoghq.com/llm/evaluations
[6]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/#configure-the-prompt
[7]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/#structured-output
[8]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/#keyword-search-output
[9]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/#test-and-preview
[10]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/#using-in-offline-experiments
