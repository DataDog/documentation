---
aliases:
- /ko/llm_observability/evaluations/evaluation_compatibility/
- /ko/llm_observability/configure/evaluations/compatibility/
description: 평가자 호환성 요구 사항에 대해 알아봅니다.
title: 평가자 호환성
---
## 평가자 호환성 {#evaluator-compatibility}

지원되는 타사 LLM 공급자는 OpenAI, Azure OpenAI, Anthropic, Amazon Bedrock, Vertex AI 및 Custom Provider입니다.

### 관리형 평가자 {#managed-evaluators}

관리형 평가자는 다음 구성에서 지원됩니다.

| 평가자                       | DD-trace 버전  |  LLM 공급자                 | 적용 대상 스팬 |
| --------------------------------| ----------------- | ------------------------------| ----------------|
| [언어 불일치][10]         | 완전 지원   | 자체 호스팅                   | 모든 스팬 유형  |

### 사용자 지정 LLM-as-a-judge 평가자 {#custom-llm-as-a-judge-evaluators}

사용자 지정 LLM-as-a-judge 평가자는 다음 구성에서 지원됩니다.

| 평가자        | DD-trace 버전 | LLM 공급자                  | 적용 대상 스팬 |
| ---------------- | ---------------- | ----------------------------- | --------------- |
| [불리언][11]    | 완전 지원  | 모든 타사 LLM 공급자 | 모든 스팬 유형  |
| [점수][11]      | 완전 지원  | 모든 타사 LLM 공급자 | 모든 스팬 유형  |
| [범주형][11]| 완전 지원  | 모든 타사 LLM 공급자 | 모든 스팬 유형  |
| [JSON][11]       | 완전 지원  | 모든 타사 LLM 공급자 | 모든 스팬 유형  |

#### LLM-as-a-judge 평가자 템플릿 {#llm-as-a-judge-evaluator-templates}

사용자 지정 LLM-as-a-judge 평가자를 위한 기존 템플릿은 다음 구성에서 지원됩니다.

| 평가자               | DD-trace 버전 | LLM 공급자                  | 적용 대상 스팬 |
| ----------------------- | ---------------- | ----------------------------- | --------------- |
| [답변 실패][5]  | 완전 지원  | 모든 타사 LLM 공급자 | 모든 스팬 유형  |
| [환각][4]      | 완전 지원  | 모든 타사 LLM 공급자 | LLM 전용        |
| [감성][6]          | 완전 지원  | 모든 타사 LLM 공급자 | 모든 스팬 유형  |
| [유해성][7]           | 완전 지원  | 모든 타사 LLM 공급자 | 모든 스팬 유형  |
| [프롬프트 인젝션][8]   | 완전 지원  | 모든 타사 LLM 공급자 | 모든 스팬 유형  |
| [주제 관련성][9]    | 완전 지원  | 모든 타사 LLM 공급자 | 모든 스팬 유형  |
| [도구 선택][1]             | 완전 지원 | 모든 타사 LLM 공급자 | LLM 전용 |
| [도구 인수 정확성][2]  | 완전 지원 | 모든 타사 LLM 공급자 | LLM 전용 |
| [목표 완결성][3]          | 완전 지원 | 모든 타사 LLM 공급자 | LLM 전용 |


[1]: /ko/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#tool-selection
[2]: /ko/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#tool-argument-correctness
[3]: /ko/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#goal-completeness
[4]: /ko/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#hallucination
[5]: /ko/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#failure-to-answer
[6]: /ko/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#sentiment
[7]: /ko/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#toxicity
[8]: /ko/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#prompt-injection
[9]: /ko/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations#topic-relevancy
[10]: /ko/llm_observability/investigate/evaluations/language_mismatch
[11]: /ko/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations#define-the-evaluation-output