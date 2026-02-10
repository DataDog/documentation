---
title: Evaluation compatibility
description: Learn about the compatibility requirements for evaluations.
---

## Evaluation compatibility

The supported third party LLM providers are OpenAI, Azure OpenAI, Anthropic, and Bedrock Anthropic.

### Managed evaluations

Managed evaluations are supported for the following configurations.

| Evaluation                      | DD-trace version  |  LLM Provider                 | Applicable span |
| --------------------------------| ----------------- | ------------------------------| ----------------|
| [Tool Selection][1]             | v3.12+            | OpenAI, Azure OpenAI          | LLM only        |
| [Tool Argument Correctness][2]  | v3.12+            | OpenAI, Azure OpenAI          | LLM only        |
| [Goal Completeness][3]          | Fully supported   | OpenAI, Azure OpenAI          | LLM only        |
| [Hallucination][4]              | v2.18+            | OpenAI                        | LLM only        |
| [Language Mismatch][10]         | Fully supported   | Self hosted                   | All span kinds  |

### Custom LLM-as-a-judge evaluations

Custom LLM-as-a-judge evaluations are supported for the following configurations.

| Evaluation       | DD-trace version | LLM Provider                                          | Applicable span |
| ---------------- | ---------------- | ----------------------------------------------------- | --------------- |
| [Boolean][11]    | Fully supported  | All third party LLM providers                         | All span kinds  |
| [Score][11]      | Fully supported  | OpenAI, Azure OpenAI, Anthropic, VertexAI, AI Gateway | All span kinds  |
| [Categorical][11]| Fully supported  | OpenAI, Azure OpenAI, Anthropic, VertexAI, AI Gateway | All span kinds  |
| [JSON][11]       | Fully supported  | OpenAI, Azure OpenAI, Anthropic, VertexAI, AI Gateway | All span kinds  |

#### Template LLM-as-a-judge evaluations

Existing templates for custom LLM-as-a-judge evaluations are supported for the following configurations.

| Evaluation              | DD-trace version | LLM Provider                  | Applicable span |
| ----------------------- | ---------------- | ----------------------------- | --------------- |
| [Failure to Answer][5]  | Fully supported  | All third party LLM providers | All span kinds  |
| [Sentiment][6]          | Fully supported  | All third party LLM providers | All span kinds  |
| [Toxicity][7]           | Fully supported  | All third party LLM providers | All span kinds  |
| [Prompt Injection][8]   | Fully supported  | All third party LLM providers | All span kinds  |
| [Topic Relevancy][9]    | Fully supported  | All third party LLM providers | All span kinds  |

[1]: /llm_observability/evaluations/managed_evaluations/agent_evaluations#tool-selection
[2]: /llm_observability/evaluations/managed_evaluations/agent_evaluations#tool-argument-correctness
[3]: /llm_observability/evaluations/managed_evaluations/agent_evaluations#goal-completeness
[4]: /llm_observability/evaluations/managed_evaluations#hallucination
[5]: /llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#failure-to-answer
[6]: /llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#sentiment
[7]: /llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#toxicity
[8]: /llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#prompt-injection
[9]: /llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#topic-relevancy
[10]: /llm_observability/evaluations/managed_evaluations#language-mismatch
[11]: /llm_observability/evaluations/custom_llm_as_a_judge_evaluations#define-the-evaluation-output

