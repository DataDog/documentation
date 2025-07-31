---
title: Evaluations
description: Learn how to configure Evaluations for your LLM application.
aliases:
    - /tracing/llm_observability/evaluations/
    - /llm_observability/configuration/
---

## Overview

LLM Observability offers several ways to support evaluations:

### Out-of-the-Box Evaluations

Datadog builds and supports [Out-of-the-Box Evaluations][1] to support common use cases. You can enable and configure them within the LLM Observability application.

### Submit Custom Evaluations

You can also [Submit Custom Evaluations][2] using Datadog's API. This mechanism is great if you have your own evaluation system, but would like to centralize that information within Datadog.

### Evaluation Integrations

Datadog also supports integrations with some 3rd party evaluation frameworks, such as [Ragas][3] and [NeMo][4].

### Sensitive Data Scanner integration

In addition to evaluating the input and output of LLM requests, agents, workflows, or the application, LLM Observability integrates with [Sensitive Data Scanner][5], which helps prevent data leakage by identifying and redacting any sensitive information (such as personal data, financial details, or proprietary information) that may be present in any step of your LLM application. 

By proactively scanning for sensitive data, LLM Observability ensures that conversations remain secure and compliant with data protection regulations. This additional layer of security reinforces Datadog's commitment to maintaining the confidentiality and integration of user interactions with LLMs.

### Permissions

[LLM Observability Write permissions][6] are necessary to configure evaluations.

[1]: /llm_observability/evaluations/ootb_evaluations
[2]: /llm_observability/evaluations/submit_evaluations
[3]: /llm_observability/evaluations/ragas_evaluations
[4]: /llm_observability/evaluations/submit_nemo_evaluations
[5]: /security/sensitive_data_scanner/
[6]: /account_management/rbac/permissions/#llm-observability