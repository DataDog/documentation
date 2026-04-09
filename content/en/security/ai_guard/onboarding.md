---
title: Get Started with AI Guard
private: true
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
- link: "https://www.datadoghq.com/blog/llm-guardrails-best-practices/"
  tag: "Blog"
  text: "LLM guardrails: Best practices for deploying LLM apps securely"
---

{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

AI Guard helps secure your AI apps and agents in real time against prompt injection, jailbreaking, tool misuse, and sensitive data exfiltration attacks. AI Guard can also detect sensitive data such as PII and secrets in LLM conversations. This page describes how to set it up so you can keep your data secure against these AI-based threats.

For an overview on AI Guard, see [AI Guard][13].

## Setup

To set up AI Guard, you need to create API keys, install a tracer library, configure retention filters, and set AI Guard policies including blocking, evaluation sensitivity, and sensitive data scanning.

For full setup instructions, see [Set Up AI Guard][15].

## Evaluate conversations in AI Guard Playground {#playground}

The [AI Guard Playground][19] lets you test AI Guard evaluations directly from the Datadog UI, without writing any code. Submit a conversation, including user input, assistant output, and tool calls, and see the evaluation result (action and reason) in real time.

Use the Playground to:
- Experiment with different prompt patterns and see how AI Guard responds.
- Verify that AI Guard correctly detects prompt injection, jailbreaking, or unsafe tool calls.
- Tweak the evaluation sensitivity threshold and see how it affects detection results. You can then adjust the threshold in AI Guard's [evaluation sensitivity][20] settings.
- Test sensitive data scanning on your conversations.
- Share evaluation results with your team during development.

## View AI Guard data in Datadog {#in-datadog}

After completing the [setup steps][15] and using an [SDK][21] to instrument your code, you can view your data in Datadog on the [AI Guard page][6].

<div class="alert alert-info">You can't see data in Datadog for evaluations performed directly using the REST API.</div>

## Set up Datadog Monitors for alerting {#set-up-datadog-monitors}

To create monitors for alerting at certain thresholds, you can use [Datadog Monitors][9]. You can monitor AI Guard evaluations with either APM traces or with metrics. For both types of monitor, you should set your alert conditions, name for the alert, and define notifications; Datadog recommends using Slack.

### APM monitor

Follow the instructions to create a new [APM monitor][10], with its scope set to **Trace Analytics**.

- To monitor evaluation traffic, use the query `@ai_guard.action: (DENY OR ABORT)`.
- To monitor blocked traffic, use the query `@ai_guard.blocked:true`.

### Metric monitor

Follow the instructions to create a new [metric monitor][11].

- To monitor evaluation traffic, use the metric `datadog.ai_guard.evaluations` with the tags `action:deny OR action:abort`.
- To monitor blocked traffic, use the metric `datadog.ai_guard.evaluations` with the tag `blocking_enabled:true`.

## Security signals {#security-signals}

AI Guard generates security signals when it detects threats such as prompt injection, jailbreaking, or tool misuse. You can create custom detection rules, set thresholds for notifications, and investigate signals alongside other application security threats.

For more information, see [AI Guard Security Signals][14].

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
