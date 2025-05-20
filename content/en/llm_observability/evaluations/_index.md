---
title: Evaluations
description: Learn how to configure Evaluations for your LLM application.
aliases:
    - /tracing/llm_observability/evaluations/
further_reading:
- link: "/llm_observability/evaluations/ootb_evaluations"
  tag: "Documentation"
  text: "Learn about Out of the Box Evaluations"
- link: "/llm_observability/evaluations/submit_evaluations"
  tag: "Documentation"
  text: "Learn about submitting Custom Evaluations"
- link: "/llm_observability/evaluations/ragas_evaluations"
  tag: "Documentation"
  text: "Learn about integrating with Ragas"
- link: "/llm_observability/evaluations/submit_nemo_evaluations"
  tag: "Documentation"
  text: "Learn about integrating with NeMo"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">LLM Observability is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

LLM Observability offers several ways to support evaluations.

### Out of the Box Evaluations

[Out of the Box Evaluations][1] are built and supported by Datadog to support common use cases. You can enable and configure them within the LLM Observability application.

### Submit Custom Evaluations

You can also [Submit Custom Evaluations][2] using our API. This mechanism is great if you have your own evaluation system, but would like to centralize that information within Datadog.

### Evaluation Integrations

We also support integration with some 3rd party evaluation frameworks, such as [Ragas][3] and [NeMo][4].

### Sensitive Data Scanner integration

In addition to evaluating conversations, LLM Observability integrates with [Sensitive Data Scanner][5], which helps prevent data leakage by identifying and flagging any sensitive information (such as personal data, financial details, or proprietary information) that may be present in conversations. 

By proactively scanning for sensitive data, LLM Observability ensures that conversations remain secure and compliant with data protection regulations. This additional layer of security reinforces Datadog's commitment to maintaining the confidentiality and integration of user interactions with LLMs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/evaluations/ootb_evaluations
[2]: /llm_observability/evaluations/submit_evaluations
[3]: /llm_observability/evaluations/ragas_evaluations
[4]: /llm_observability/evaluations/submit_nemo_evaluations
[5]: /security/sensitive_data_scanner/
