---
aliases:
- /es/llm_observability/evaluations/evaluation_compatibility/
- /es/llm_observability/configure/evaluations/compatibility/
description: Obtenga información sobre los requisitos de compatibilidad para los evaluadores.
title: Compatibilidad del evaluador
---
## Compatibilidad del evaluador {#evaluator-compatibility}

Los proveedores de LLM de terceros compatibles son OpenAI, Azure OpenAI, Anthropic, Amazon Bedrock, Vertex AI y Proveedor personalizado.

### Evaluadores gestionados {#managed-evaluators}

Los evaluadores gestionados son compatibles con las siguientes configuraciones.

| Evaluador                       | Versión de DD-trace  |  Proveedor de LLM                 | Tramo aplicable |
| --------------------------------| ----------------- | ------------------------------| ----------------|
| [Language Mismatch][10]         | Se admite por completo   | Self hosted                   | Todos los tipos de tramo  |

### Evaluadores personalizados de LLM-as-a-judge {#custom-llm-as-a-judge-evaluators}

Los evaluadores personalizados de LLM-as-a-judge son compatibles con las siguientes configuraciones.

| Evaluador        | Versión de DD-trace | Proveedor de LLM                  | Tramo aplicable |
| ---------------- | ---------------- | ----------------------------- | --------------- |
| [Boolean][11]    | Se admite por completo | Todos los proveedores de LLM de terceros | Todos los tipos de tramo  |
| [Score][11]      | Se admite por completo | Todos los proveedores de LLM de terceros | Todos los tipos de tramo  |
| [Categorical][11]| Se admite por completo | Todos los proveedores de LLM de terceros | Todos los tipos de tramo  |
| [JSON][11]       | Se admite por completo | Todos los proveedores de LLM de terceros | Todos los tipos de tramo  |

#### Plantillas para evaluadores LLM-as-a-judge {#llm-as-a-judge-evaluator-templates}

Las plantillas existentes para evaluadores personalizados de LLM-as-a-judge son compatibles con las siguientes configuraciones.

| Evaluador               | Versión de DD-trace | Proveedor de LLM                  | Tramo aplicable |
| ----------------------- | ---------------- | ----------------------------- | --------------- |
| [Failure to Answer][5]  | Se admite por completo  | Todos los proveedores de LLM de terceros | Todos los tipos de tramo  |
| [Alucinación][4]      | Totalmente compatible  | Todos los proveedores de LLM de terceros | Solo LLM        |
| [Sentimiento][6]          | Totalmente compatible  | Todos los proveedores de LLM de terceros | Todos los tipos de tramo  |
| [Toxicidad][7]           | Totalmente compatible  | Todos los proveedores de LLM de terceros | Todos los tipos de tramo  |
| [Inyección de instrucciones][8]   | Totalmente compatible  | Todos los proveedores de LLM de terceros | Todos los tipos de tramo  |
| [Relevancia del tema][9]    | Totalmente compatible  | Todos los proveedores de LLM de terceros | Todos los tipos de tramo  |
| [Selección de herramientas][1]             | Totalmente compatible | Todos los proveedores de LLM de terceros | Solo LLM |
| [Corrección de argumentos de herramientas][2]  | Totalmente compatible | Todos los proveedores de LLM de terceros | Solo LLM |
| [Integridad del objetivo][3]          | Totalmente compatible | Todos los proveedores de LLM de terceros | Solo LLM |


[1]: /es/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#tool-selection
[2]: /es/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#tool-argument-correctness
[3]: /es/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#goal-completeness
[4]: /es/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#hallucination
[5]: /es/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#failure-to-answer
[6]: /es/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#sentiment
[7]: /es/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#toxicity
[8]: /es/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#prompt-injection
[9]: /es/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#topic-relevancy
[10]: /es/llm_observability/investigate/evaluations/language_mismatch
[11]: /es/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations#define-the-evaluation-output