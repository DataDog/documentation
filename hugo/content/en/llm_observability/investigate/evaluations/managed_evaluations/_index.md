---
title: Managed Evaluators
description: Learn how to configure managed evaluators for your LLM applications.
further_reading:
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: Blog
  text: Gain visibility into Strands Agents workflows with Datadog LLM Observability
- link: "/llm_observability/quickstart/terms/"
  tag: "Documentation"
  text: "Learn about Agent Observability terms and concepts"
- link: "/llm_observability/setup"
  tag: "Documentation"
  text: "Learn how to set up Agent Observability"
aliases:
    - /llm_observability/evaluations/ootb_evaluations
    - /llm_observability/configure/evaluations/ootb_evaluations
    - /llm_observability/evaluations/managed_evaluations/
    - /llm_observability/configure/evaluations/managed_evaluations/
---

## Overview

Managed evaluators are built-in tools to assess your LLM application. Agent Observability associates evaluations with individual
spans so you can view the inputs and outputs that led to a specific evaluation.

Learn more about the [compatibility requirements][2].

## Create new evaluators {#create-new-evaluations}

1. Navigate to [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Evaluators{{< /ui >}}][1].
1. Click on the {{< ui >}}Create Evaluator{{< /ui >}} button on the top right corner.
1. Select a specific managed evaluator. This will open the evaluator editor window.

After you click {{< ui >}}Save and Publish{{< /ui >}}, the evaluator goes live. Alternatively, you can {{< ui >}}Save as Draft{{< /ui >}} and edit or enable it later.

## Edit existing evaluators {#edit-existing-evaluations}

1. Navigate to [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Evaluators{{< /ui >}}][1].
1. Hover over the evaluator you want to edit and click the {{< ui >}}Edit{{< /ui >}} button.

### Supported managed evaluators

- [Language Mismatch][3] - Flags responses that are written in a different language than the user’s input
- [Sensitive Data Scanning][4] - Flags the presence of sensitive or regulated information in model inputs or outputs


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/evaluations
[2]: /llm_observability/investigate/evaluations/compatibility
[3]: /llm_observability/investigate/evaluations/language_mismatch
[4]: /llm_observability/investigate/evaluations/managed_evaluations/security_and_safety_evaluations
