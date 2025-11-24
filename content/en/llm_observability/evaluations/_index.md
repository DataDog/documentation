---
title: Evaluations
description: Learn how to configure Evaluations for your LLM application.
aliases:
    - /tracing/llm_observability/evaluations/
    - /llm_observability/configuration/
---

## Overview

LLM Observability offers several ways to support evaluations. They can be configured by navigating to [**AI Observability > Evaluations**][8].

### Custom LLM-as-a-judge evaluations

[Custom LLM-as-a-judge evaluations][1] allow you to define your own evaluation logic using natural language prompts. You can create custom evaluations to assess subjective or objective criteria (like tone, helpfulness, or factuality) and run them at scale across your traces and spans.

### Managed evaluations

Datadog builds and supports [managed evaluations][2] to support common use cases. You can enable and configure them within the LLM Observability application.

### Submit external evaluations

You can also submit [external evaluations][3] using Datadog's API. This mechanism is great if you have your own evaluation system, but would like to centralize that information within Datadog.

### Evaluation integrations

Datadog also supports integrations with some 3rd party evaluation frameworks, such as [Ragas][4] and [NeMo][5].

### Sensitive Data Scanner integration

In addition to evaluating the input and output of LLM requests, agents, workflows, or the application, LLM Observability integrates with [Sensitive Data Scanner][6], which helps prevent data leakage by identifying and redacting any sensitive information.

### Security

{{< learning-center-callout header="Get real-time security guardrails for your AI apps and agents" btn_title="Join the preview" hide_image="true" btn_url="https://www.datadoghq.com/product-preview/ai-security/">}}
  AI Guard helps secure your AI apps and agents in real time against prompt injection, jailbreaking, tool misuse, and sensitive data exfiltration attacks. Try it today!
{{< /learning-center-callout >}}

### Permissions

[`LLM Observability Write` permissions][7] are necessary to configure evaluations.

### Retrieving spans

LLM Observability offers an [Export API][9] that you can use to retrieve spans for running external evaluations. This helps circumvent the need to keep track of evaluation-relevant data at execution time.

[1]: /llm_observability/evaluations/custom_llm_as_a_judge_evaluations
[2]: /llm_observability/evaluations/managed_evaluations
[3]: /llm_observability/evaluations/external_evaluations
[4]: /llm_observability/evaluations/ragas_evaluations
[5]: /llm_observability/evaluations/submit_nemo_evaluations
[6]: /security/sensitive_data_scanner/
[7]: /account_management/rbac/permissions/#llm-observability
[8]: https://app.datadoghq.com/llm/evaluations
[9]: /llm_observability/evaluations/export_api
