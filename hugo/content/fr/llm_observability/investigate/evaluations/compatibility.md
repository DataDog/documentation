---
aliases:
- /fr/llm_observability/evaluations/evaluation_compatibility/
- /fr/llm_observability/configure/evaluations/compatibility/
description: Découvrez les exigences de compatibilité pour les évaluateurs.
title: Compatibilité des évaluateurs
---
## Compatibilité des évaluateurs {#evaluator-compatibility}

Les fournisseurs LLM tiers pris en charge sont OpenAI, Azure OpenAI, Anthropic, Amazon Bedrock, Vertex AI et Custom Provider.

### Évaluateurs gérés {#managed-evaluators}

Les évaluateurs gérés sont pris en charge pour les configurations suivantes.

| Évaluateur                       | Version DD-trace  |  Fournisseur LLM                 | Span applicable |
| --------------------------------| ----------------- | ------------------------------| ----------------|
| [Inadéquation de langue][10]         | Entièrement pris en charge   | Auto-hébergé                   | Tous les types de span  |

### Évaluateurs personnalisés LLM-as-a-judge {#custom-llm-as-a-judge-evaluators}

Les évaluateurs personnalisés LLM-as-a-judge sont pris en charge pour les configurations suivantes.

| Évaluateur        | Version DD-trace | Fournisseur LLM                  | Span applicable |
| ---------------- | ---------------- | ----------------------------- | --------------- |
| [Booléen][11]    | Entièrement pris en charge  | Tous les fournisseurs LLM tiers | Tous les types de span  |
| [Score][11]      | Entièrement pris en charge  | Tous les fournisseurs LLM tiers | Tous les types de span  |
| [Catégoriel][11]| Entièrement pris en charge  | Tous les fournisseurs LLM tiers | Tous les types de span  |
| [JSON][11]       | Entièrement pris en charge  | Tous les fournisseurs LLM tiers | Tous les types de span  |

#### Modèles d'évaluateur LLM-as-a-judge {#llm-as-a-judge-evaluator-templates}

Les modèles existants pour les évaluateurs personnalisés LLM-as-a-judge sont pris en charge pour les configurations suivantes.

| Évaluateur               | Version DD-trace | Fournisseur LLM                  | Span applicable |
| ----------------------- | ---------------- | ----------------------------- | --------------- |
| [Défaut de réponse][5]  | Entièrement pris en charge  | Tous les fournisseurs LLM tiers | Tous les types de span  |
| [Hallucination][4]      | Entièrement pris en charge  | Tous les fournisseurs LLM tiers | LLM uniquement        |
| [Sentiment][6]          | Entièrement pris en charge  | Tous les fournisseurs LLM tiers | Tous les types de span  |
| [Toxicité][7]           | Entièrement pris en charge  | Tous les fournisseurs LLM tiers | Tous les types de span  |
| [Injection de prompt][8]   | Entièrement pris en charge  | Tous les fournisseurs LLM tiers | Tous les types de span  |
| [Pertinence du sujet][9]    | Entièrement pris en charge  | Tous les fournisseurs LLM tiers | Tous les types de span  |
| [Sélection d'outil][1]             | Entièrement pris en charge | Tous les fournisseurs LLM tiers | LLM uniquement |
| [Exactitude des arguments de l'outil][2]  | Entièrement pris en charge | Tous les fournisseurs LLM tiers | LLM uniquement |
| [Exhaustivité de l'objectif][3]          | Entièrement pris en charge | Tous les fournisseurs LLM tiers | LLM uniquement |


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