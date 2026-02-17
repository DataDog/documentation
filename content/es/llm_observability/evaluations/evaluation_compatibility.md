---
description: Obtén información sobre los requisitos de compatibilidad para las evaluaciones.
title: Compatibilidad de la evaluación
---

## Compatibilidad de la evaluación

Los proveedores externos de LLM compatibles son OpenAI, Azure OpenAI, Anthropic y Bedrock Anthropic.

### Evaluaciones gestionadas

Las evaluaciones gestionadas son compatibles con las siguientes configuraciones.

| Evaluación                      | Versión de DD-trace  |  Proveedor de LLM                 | Tramo aplicable |
| --------------------------------| ----------------- | ------------------------------| ----------------|
| [Selección de herramientas][1]             | v3.12+            | OpenAI, Azure OpenAI          | Solo LLM        |
| [Adecuación del argumento de la herramienta][2]  | v3.12+            | OpenAI, Azure OpenAI          | Solo LLM        |
| [Cumplimiento de objetivos][3]          | Totalmente compatible   | OpenAI, Azure OpenAI          | Solo LLM        |
| [Alucinación][4]              | v2.18+            | OpenAI                        | Solo LLM        |
| [Desajuste lingüístico][10]         | Totalmente compatible   | Autoalojado                   | Todos los tipos de tramo  |

### Evaluaciones personalizadas de LLM como evaluador

Las evaluaciones personalizadas de LLM como evaluador son compatibles con las siguientes configuraciones.

| Evaluación       | Versión de DD-trace | Proveedor de LLM                                          | Tramo aplicable |
| ---------------- | ---------------- | ----------------------------------------------------- | --------------- |
| [Booleano][11]    | Totalmente compatible  | Todos los proveedores externos de LLM                         | Todos los tipos de tramo  |
| [Puntuación][11]      | Totalmente compatible  | OpenAI, Azure OpenAI, Anthropic, VertexAI, AI Gateway | Todos los tipos de tramo  |
| [Categórico][11]| Totalmente compatible  | OpenAI, Azure OpenAI, Anthropic, VertexAI, AI Gateway | Todos los tipos de tramo  |
| [JSON][11]       | Totalmente compatible  | OpenAI, Azure OpenAI, Anthropic, VertexAI, AI Gateway | Todos los tipos de tramo  |

#### Plantilla de evaluaciones de LLM como evaluador

Las plantillas existentes para las evaluaciones personalizadas de LLM como evaluador son compatibles con las siguientes configuraciones.

| Evaluación              | Versión de DD-trace | Proveedor de LLM                  | Tramo aplicable |
| ----------------------- | ---------------- | ----------------------------- | --------------- |
| [Falta de respuesta][5]  | Totalmente compatible  | Todos los proveedores externos de LLM | Todos los tipos de tramo  |
| [Sentimiento][6]          | Totalmente compatible  | Todos los proveedores externos de LLM | Todos los tipos de tramo  |
| [Toxicidad][7]           | Totalmente compatible  | Todos los proveedores externos de LLM | Todos los tipos de tramo  |
| [Inyección de prompts][8]   | Totalmente compatible  | Todos los proveedores externos de LLM | Todos los tipos de tramo  |
| [Relevancia del tema][9]    | Totalmente compatible  | Todos los proveedores externos de LLM | Todos los tipos de tramo  |

[1]: /es/llm_observability/evaluations/managed_evaluations/agent_evaluations#tool-selection
[2]: /es/llm_observability/evaluations/managed_evaluations/agent_evaluations#tool-argument-correctness
[3]: /es/llm_observability/evaluations/managed_evaluations/agent_evaluations#goal-completeness
[4]: /es/llm_observability/evaluations/managed_evaluations#hallucination
[5]: /es/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#failure-to-answer
[6]: /es/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#sentiment
[7]: /es/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#toxicity
[8]: /es/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#prompt-injection
[9]: /es/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#topic-relevancy
[10]: /es/llm_observability/evaluations/managed_evaluations#language-mismatch
[11]: /es/llm_observability/evaluations/custom_llm_as_a_judge_evaluations#define-the-evaluation-output