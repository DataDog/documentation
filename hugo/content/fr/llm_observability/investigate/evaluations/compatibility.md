---
aliases:
- /fr/llm_observability/evaluations/evaluation_compatibility/
- /fr/llm_observability/configure/evaluations/compatibility/
description: Découvrez les exigences de compatibilité pour les évaluateurs.
title: Compatibilité des évaluateurs
---
## Compatibilité des évaluateurs {#evaluator-compatibility}

Les fournisseurs LLM tiers pris en charge sont OpenAI, Azure OpenAI, Anthropic, Amazon Bedrock, Vertex AI, Baseten, Fireworks AI, Together AI et Custom Provider.

### Évaluateurs gérés {#managed-evaluators}

Les évaluateurs gérés sont pris en charge pour les configurations suivantes.

| Évaluateur                       | Version DD-trace  |  Fournisseur LLM                 | Span applicable |
| --------------------------------| ----------------- | ------------------------------| ----------------|
| [Language Mismatch][10]         | Entièrement pris en charge   | Auto-hébergé                   | Tous les types de span  |

### Évaluateurs LLM-as-a-judge personnalisés {#custom-llm-as-a-judge-evaluators}

Les évaluateurs LLM-as-a-judge personnalisés sont pris en charge pour les configurations suivantes.

| Évaluateur        | Version DD-trace | Fournisseur LLM                  | Span applicable |
| ---------------- | ---------------- | ----------------------------- | --------------- |
| [Boolean][11]    | Entièrement pris en charge  | Tous les fournisseurs LLM tiers | Tous les types de span  |
| [Score][11]      | Entièrement pris en charge  | Tous les fournisseurs LLM tiers | Tous les types de span  |
| [Categorical][11]| Entièrement pris en charge  | Tous les fournisseurs LLM tiers | Tous les types de span  |
| [JSON][11]       | Entièrement pris en charge  | Tous les fournisseurs LLM tiers | Tous les types de span  |

#### Modèles d’évaluateurs LLM-as-a-judge {#llm-as-a-judge-evaluator-templates}

Les modèles existants pour les évaluateurs LLM-as-a-judge personnalisés sont pris en charge pour les configurations suivantes.

| Évaluateur               | Version DD-trace | Fournisseur LLM                  | Span applicable |
| ----------------------- | ---------------- | ----------------------------- | --------------- |
| [Failure to Answer][5]  | Entièrement pris en charge  | Tous les fournisseurs LLM tiers | Tous les types de span  |
| [Hallucination][4]      | Entièrement pris en charge  | Tous les fournisseurs LLM tiers | LLM uniquement        |
| [Sentiment][6]          | Entièrement pris en charge  | Tous les fournisseurs LLM tiers | Tous les types de span  |
| [Toxicity][7]           | Entièrement pris en charge  | Tous les fournisseurs LLM tiers | Tous les types de span  |
| [Prompt Injection][8]   | Entièrement pris en charge  | Tous les fournisseurs LLM tiers | Tous les types de span  |
| [Topic Relevancy][9]    | Entièrement pris en charge  | Tous les fournisseurs LLM tiers | Tous les types de span  |
| [Tool Selection][1]             | Entièrement pris en charge | Tous les fournisseurs LLM tiers | LLM uniquement |
| [Tool Argument Correctness][2]  | Entièrement pris en charge | Tous les fournisseurs LLM tiers | LLM uniquement |
| [Goal Completeness][3]          | Entièrement pris en charge | Tous les fournisseurs LLM tiers | LLM uniquement |


[1]: /fr/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#tool-selection
[2]: /fr/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#tool-argument-correctness
[3]: /fr/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#goal-completeness
[4]: /fr/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#hallucination
[5]: /fr/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#failure-to-answer
[6]: /fr/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#sentiment
[7]: /fr/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#toxicity
[8]: /fr/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#prompt-injection
[9]: /fr/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#topic-relevancy
[10]: /fr/llm_observability/investigate/evaluations/language_mismatch
[11]: /fr/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations#define-the-evaluation-output