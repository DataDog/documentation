---
title: LLM Providers
description: The LLM providers you can use to run custom LLM-as-a-judge evaluators, and how to choose a provider and model.
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

[Custom LLM-as-a-judge evaluators][1] run on a model from an LLM provider account that you connect to Agent Observability. Datadog calls the model with your credentials, so the provider bills you for the evaluation tokens. Connected accounts are also available in [Playground][2].

## Supported providers

| Provider        | Models you can use                                                                                   | Output types                    | Images and audio |
|-----------------|------------------------------------------------------------------------------------------------------|---------------------------------|------------------|
| OpenAI          | Models that support the Chat Completions API                                                         | Structured (Keyword Search for audio) | Images, audio |
| Azure OpenAI    | Your Azure OpenAI deployments. The model must support structured output.                             | Structured                      | No               |
| Anthropic       | Claude models                                                                                        | Structured, Keyword Search      | Images           |
| Amazon Bedrock  | Models enabled in your AWS account, by model name or inference profile ARN                           | Structured, Keyword Search      | No               |
| Vertex AI       | Models available in your Google Cloud project and location                                           | Structured                      | No               |
| Baseten         | Models served by Baseten Model APIs. Dedicated deployments are not supported.                        | Structured, Keyword Search      | No               |
| Fireworks AI    | Any model your API key can call, including fine-tuned models                                         | Structured, Keyword Search      | No               |
| Together AI     | Any model your API key can call, including fine-tuned models                                         | Structured, Keyword Search      | No               |
| Custom Provider | Models served by any endpoint compatible with the OpenAI API, such as an AI gateway or a self-hosted model server | Structured, Keyword Search | No        |

All providers also support [Post-Processing][3] of JSON output. For details on each output type, see [Define the evaluation output][4]. For the image and audio models each provider supports, see [Image and Audio Evaluators][5].

To connect an account, see [Connect an LLM provider account][6].

## Choose a provider

- **Use a model directly from its developer**: Connect OpenAI or Anthropic.
- **Use the cloud account your application already runs in**: Connect Azure OpenAI, Amazon Bedrock, or Vertex AI to use its models, regions, and quotas.
- **Use an open-weight or fine-tuned model**: Connect Baseten, Fireworks AI, or Together AI to use models such as DeepSeek, Qwen, GLM, or Llama. Fireworks AI and Together AI also serve models you fine-tuned.
- **Use your own endpoint**: Connect a Custom Provider to route evaluations through an AI gateway or a model you host. A Custom Provider can authenticate with an API key or with OAuth 2.0 access tokens from your identity provider.

## Select the model

When you [create an evaluator][7], select an {{< ui >}}Account{{< /ui >}}, then a {{< ui >}}Model{{< /ui >}}. Some providers need more input:

- **Amazon Bedrock**: Choose a region the account is configured for. Then select a model name or provide an inference profile ARN.
- **Vertex AI**: Choose a project and a location. For details on location options, see [Google's Vertex AI locations documentation][8].
- **Baseten, Fireworks AI, and Together AI**: Select a model from the provider's list. For an unlisted model, such as a fine-tuned model, type its model ID and select {{< ui >}}Use model ID{{< /ui >}}.

## Tips for choosing a judge model

- **Test before you publish**: Models vary in how well they follow instructions and output schemas. Run the evaluator on sample spans with [Test and preview][9] before you enable it.
- **Use Keyword Search Output as a fallback**: If a model's responses do not match your output schema, switch to Keyword Search Output where supported.
- **Compare judges in offline experiments**: Run the evaluator in an [offline experiment][10] to compare two judge models on one dataset.
- **Enable reasoning** to see why the model reached each result, which helps you spot a judge that misreads your rubric.

## HIPAA

Baseten, Fireworks AI, and Together AI are not available to organizations with HIPAA enabled. For other providers, if you are subject to HIPAA, connect only to an account covered by a business associate agreement (BAA). The account must meet all HIPAA compliance requirements.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations
[2]: /llm_observability/improve/playground
[3]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/#post-processing
[4]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/#define-the-evaluation-output
[5]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/image_and_audio_evaluations
[6]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/connect_to_account
[7]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/#configure-the-prompt
[8]: https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations
[9]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/#test-and-preview
[10]: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/#using-in-offline-experiments
