---
title: Managed Evaluations
description: Learn how to configure managed evaluations for your LLM applications.
further_reading:
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: Blog
  text: Gain visibility into Strands Agents workflows with Datadog LLM Observability
- link: "/llm_observability/terms/"
  tag: "Documentation"
  text: "Learn about LLM Observability core concepts"
- link: "/llm_observability/instrumentation"
  tag: "Documentation"
  text: "Learn how to instrument your LLM application"
aliases:
    - /llm_observability/evaluations/ootb_evaluations
---

## Overview

Managed evaluations are built-in tools to assess your LLM application. LLM Observability associates evaluations with individual
spans so you can view the inputs and outputs that led to a specific evaluation.

Learn more about the [compatibility requirements][2].

## Create new evaluations

1. Navigate to [**AI Observability > Evaluations**][1].
1. Click on the **Create Evaluation** button on the top right corner.
1. Select a specific managed evaluation. This will open the evalution editor window.

After you click **Save and Publish**, the evaluation goes live. Alternatively, you can **Save as Draft** and edit or enable them later.

## Edit existing evaluations

1. Navigate to [**AI Observability > Evaluations**][1].
1. Hover over the evaluation you want to edit and click the **Edit** button.

### Supported managed evaluations

- [Language Mismatch][3] - Flags responses that are written in a different language than the user’s input
- [Sensitive Data Scanning][4] - Flags the presence of sensitive or regulated information in model inputs or outputs


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/evaluations
[2]: /llm_observability/evaluations/evaluation_compatibility
[3]: /llm_observability/evaluations/managed_evaluations/quality_evaluations#language-mismatch
[4]: /llm_observability/evaluations/managed_evaluations/security_and_safety_evaluations#sensitive-data-scanning
