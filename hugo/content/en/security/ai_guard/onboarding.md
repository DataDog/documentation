---
title: Get Started with AI Guard
further_reading:
- link: /security/ai_guard/
  tag: Documentation
  text: AI Guard
- link: /security/ai_guard/setup/
  tag: Documentation
  text: Set Up AI Guard
- link: /security/ai_guard/signals/
  tag: Documentation
  text: AI Guard Security Signals
- link: "https://www.datadoghq.com/blog/ai-guard"
  tag: "Blog"
  text: "Protect agentic AI applications with Datadog AI Guard"
- link: "https://www.datadoghq.com/blog/llm-guardrails-best-practices/"
  tag: "Blog"
  text: "LLM guardrails: Best practices for deploying LLM apps securely"
---

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">{{< prodname >}}AI Guard{{< /prodname >}} isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

{{< prodname >}}AI Guard{{< /prodname >}} helps secure your AI apps and agents in real time against prompt injection, jailbreaking, tool misuse, and sensitive data exfiltration attacks. {{< prodname >}}AI Guard{{< /prodname >}} can also detect sensitive data such as PII and secrets in LLM conversations. This page describes how to set it up so you can keep your data secure against these AI-based threats.

For an overview on {{< prodname >}}AI Guard{{< /prodname >}}, see [{{< prodname >}}AI Guard{{< /prodname >}}][13].

## Setup

To set up {{< prodname >}}AI Guard{{< /prodname >}}, you need to create API keys, install an SDK, configure retention filters, and set {{< prodname >}}AI Guard{{< /prodname >}} policies including blocking, evaluation sensitivity, and sensitive data scanning.

For full setup instructions, see [Set Up AI Guard][15].

## View AI Guard data in Datadog {#in-datadog}

After completing the [setup steps][15] and using an [SDK][21] to instrument your code, you can view your data in Datadog on the [AI Guard page][6].

<div class="alert alert-info">You can't see data in Datadog for evaluations performed directly using the REST API.</div>

## Security signals {#security-signals}

{{< prodname >}}AI Guard{{< /prodname >}} generates security signals when it detects threats such as prompt injection, jailbreaking, or tool misuse. You can create custom detection rules, set thresholds for notifications, and investigate signals alongside other application security threats.

For more information, see [AI Guard Security Signals][14].

## Set up Datadog Monitors for alerting {#set-up-datadog-monitors}

To create monitors for alerting at certain thresholds, you can use [Datadog Monitors][9]. You can monitor {{< prodname >}}AI Guard{{< /prodname >}} evaluations with either APM traces or with metrics. For both types of monitor, you should set your alert conditions, name for the alert, and define notifications; Datadog recommends using Slack.

### APM monitor

Follow the instructions to create a new [APM monitor][10], with its scope set to {{< ui >}}Trace Analytics{{< /ui >}}.

- To monitor evaluation traffic, use the query `@ai_guard.action: (DENY OR ABORT)`.
- To monitor blocked traffic, use the query `@ai_guard.blocked:true`.

### Metric monitor

Follow the instructions to create a new [metric monitor][11].

- To monitor evaluation traffic, use the metric `datadog.ai_guard.evaluations` with the tags `action:deny OR action:abort`.
- To monitor blocked traffic, use the metric `datadog.ai_guard.evaluations` with the tag `blocking_enabled:true`.

## Evaluate conversations in AI Guard Playground {#playground}

The [{{< ui >}}AI Guard Playground{{< /ui >}}][19] lets you test {{< prodname >}}AI Guard{{< /prodname >}} evaluations directly from the Datadog UI, without writing any code. Submit a conversation, including user input, assistant output, and tool calls, and see the evaluation result (action and reason) in real time.

Use the Playground to:
- Experiment with different prompt patterns and see how {{< prodname >}}AI Guard{{< /prodname >}} responds.
- Verify that {{< prodname >}}AI Guard{{< /prodname >}} correctly detects prompt injection, jailbreaking, or unsafe tool calls.
- Tweak the evaluation sensitivity threshold and see how it affects detection results. You can then adjust the threshold in {{< prodname >}}AI Guard{{< /prodname >}}'s [evaluation sensitivity][20] settings.
- Test sensitive data scanning on your conversations.
- Add [evaluation context][22] to a conversation to see how it affects false positives, before applying that context to a service's policy.
- Share evaluation results with your team during development.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[6]: https://app.datadoghq.com/security/ai-guard/
[9]: /monitors/
[10]: /monitors/types/apm/?tab=traceanalytics
[11]: /monitors/types/metric/
[13]: /security/ai_guard/
[14]: /security/ai_guard/signals/
[15]: /security/ai_guard/setup/
[19]: https://app.datadoghq.com/security/ai-guard/playground
[20]: /security/ai_guard/setup/#evaluation-sensitivity
[21]: /security/ai_guard/setup/sdk/
[22]: /security/ai_guard/setup/#evaluation-context
