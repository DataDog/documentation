---
title: Evaluation compatibility
description: Learn about the compatibility requirements for evaluations.
---

## Evaluation compatibility

### Managed evaluations

Managed evaluations are supported via the following configurations.

| Evaluation                      | DD-trace version  |  LLM Provider                 | Applicable span |
| --------------------------------| ----------------- | ------------------------------| ----------------|
| [Tool Selection][1]             | v3.12+            | OpenAI, Azure OpenAI          | LLM only        |
| [Tool Argument Correctness][2]  | v3.12+            | OpenAI, Azure OpenAI          | LLM only        |
| [Goal Completeness][3]          | Fully supported   | OpenAI, Azure OpenAI          | LLM only        |
| [Hallucination][4]              | v2.18+            | OpenAI                        | LLM only        |
| [Sentiment][5]                  | Fully supported   | All third party LLM providers | All span kinds  |
| [Toxicity][6]                   | Fully supported   | All third party LLM providers | All span kinds  |
| [Prompt Injection][7]           | Fully supported   | All third party LLM providers | All span kinds  |
| [Topic Relevancy][8]            | Fully supported   | All third party LLM providers | All span kinds  |
| [Language Mismatch][9]          | Fully supported   | Self hosted                   | All span kinds  |

The current list of supported third party LLM providers are OpenAI, Azure OpenAI, Anthropic and Bedrock Anthropic.

### Custom llm-as-a-judge evaluations

Managed evaluations are supported via the following configurations.

| Evaluation                      | DD-trace version  |  LLM Provider                 | Applicable span |
| --------------------------------| ----------------- | ------------------------------| ----------------|
| [Boolean][10]                   | Fully supported   | All third party LLM providers | All span kinds |
| [Score][10]                     | Fully supported     | OpenAI, Azure OpenAI        | All span kinds |
| [Categorical][10]               | Fully supported   | OpenAI, Azure OpenAI          | All span kinds |

The current list of supported third party LLM providers are OpenAI, Azure OpenAI, Anthropic and Bedrock Anthropic.

[1]: /llm_observability/evaluations/managed_evaluations/agent_evaluations#tool-selection
[2]: /llm_observability/evaluations/managed_evaluations/agent_evaluations#tool-argument-correctness
[3]: /llm_observability/evaluations/managed_evaluations/agent_evaluations#goal-completeness
[4]: /llm_observability/evaluations/managed_evaluations#hallucination
[5]: /llm_observability/evaluations/managed_evaluations#sentiment
[6]: /llm_observability/evaluations/managed_evaluations#toxicity
[7]: /llm_observability/evaluations/managed_evaluations#prompt-injection
[8]: /llm_observability/evaluations/managed_evaluations#topic-relevancy
[9]: /llm_observability/evaluations/managed_evaluations#language-mismatch
[10]: /llm_observability/evaluations/custom_llm_as_a_judge_evaluations#define-the-evaluation-output

