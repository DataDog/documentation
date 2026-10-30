---
title: AI Guard
description: AI Guard evaluates the prompts, model responses, and tool calls in your AI applications and agents in real time.
further_reading:
  - link: "https://www.datadoghq.com/blog/ai-guard/"
    tag: "Blog"
    text: "Protect agentic AI applications with Datadog AI Guard"
  - link: "https://www.datadoghq.com/blog/llm-guardrails-best-practices/"
    tag: "Blog"
    text: "LLM guardrails: Best practices for deploying LLM apps securely"
  - link: "https://www.datadoghq.com/blog/securing-ai-agents-guardrail-placement/"
    tag: "Blog"
    text: "Securing AI agents: Why guardrail placement is a key design decision"
---

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

AI Guard evaluates the prompts, model responses, and tool calls in your AI applications and agents in real time, and blocks calls that carry an attack or expose sensitive data. AI Guard runs inline with your agent, works with any model provider, and records every evaluation in Datadog so you can investigate threats alongside the rest of your application traces.

AI Guard protects against prompt injection and jailbreaking, tool misuse, and sensitive data exfiltration. Together, these protections address the [agentic lethal trifecta][1]: privileged system access, exposure to untrusted data, and outbound communication.

AI Guard protects two kinds of agents: custom agents that your team builds and runs, and coding agents, such as Claude Code, that your developers use. Unless indicated otherwise, this AI Guard documentation covers custom agents.

{{< callout url="https://www.datadoghq.com/product-preview/coding-agent-security-guardrails/" header="false" >}}
AI Guard for coding agents is in Preview.
{{< /callout >}}

## How AI Guard works

AI Guard sits in the critical path of your agent's model calls, so AI Guard can stop unsafe prompts and tool calls before the agent acts on them.

1. AI Guard receives the conversation from one of two places:

   - The Datadog SDK in your agent, which sends the conversation to AI Guard around each model call and tool call, through an integration or through SDK calls in your code.

   - A plugin on an AI gateway, which sends the model traffic of every agent that routes through the gateway.

1. AI Guard evaluates the full conversation, including the system prompt, using the settings in the applicable policy.
1. AI Guard returns an `ALLOW` or `DENY` action, with the reason for it. For a `DENY` action, what happens next depends on the enforcement mode in the policy:

   - In the default {{< ui >}}Monitor only{{< /ui >}} mode, AI Guard reports the action without blocking the request.
   - In {{< ui >}}Block unsafe{{< /ui >}} mode, the request is blocked. Integrations stop the call, and the SDK raises an error that your code handles.

1. The Datadog SDK records the evaluation as an AI Guard span. With a retention filter, Datadog keeps every AI Guard span.

1. Detection rules watch evaluation outcomes and create a security signal when a rule is triggered.

Policies and detection rules are separate layers. Policies determine what AI Guard flags or blocks at evaluation time. Detection rules determine which outcomes become signals that your team triages.

### How AI Guard evaluates threats

AI Guard uses models to detect threats. Model-based detection judges each prompt and tool call in the context of the full conversation, so AI Guard can catch attacks that don't match a known pattern.

Datadog manages the detection models. To adjust how AI Guard applies them to a service, use the controls in a policy, such as evaluation sensitivity and evaluation context.

Each evaluation runs in up to two passes:

1. A fast classifier screens the conversation. Most evaluations finish in this pass.
1. If the classifier flags the conversation as suspicious, AI Guard escalates the conversation to a large language model for a deeper assessment.

Images skip the classifier and always go to the second pass, so image evaluation has higher latency than text evaluation.

Custom rules and sensitive data scanning work differently. Custom rules flag messages that match a keyword or regular expression. Sensitive data scanning uses Sensitive Data Scanner rules to find personally identifiable information and secrets.

### Key concepts: traces, spans, and signals

Knowing key AI Guard concepts helps you triage signals, evaluate AI Guard decisions, and remediate threats.

Trace
: The full record of one request to your agent, from the incoming request to the response. A trace includes every model call and tool call the agent makes along the way.

AI Guard span
: The record of one AI Guard evaluation within a trace. Each time AI Guard checks a prompt, response, or tool call, the Datadog SDK adds a span that shows the content checked, the action returned, and the reason.

Signal
: An alert that flags AI Guard activity for your team to review. Datadog creates a signal when evaluation results match a detection rule, such as several `DENY` actions from the same service in a short time.

One trace can contain several AI Guard spans, and one signal can summarize spans from many traces.

## How to use AI Guard

AI Guard supports the full life cycle of securing AI agents, from finding unprotected services to responding to active attacks.

1. [Set up AI Guard][2] for target agents. The default security policy starts monitoring agent calls immediately.
1. Explore AI security to find additional unprotected agents and onboard them.
1. [Manage AI Guard policies][4] as needed, optionally previewing evaluations before applying changes.
1. [Redact sensitive data][6] that AI Guard detects in prompts and responses.
1. [Triage signals][7] that detection rules create from AI Guard evaluation outcomes.
1. [Investigate spans][8] to filter AI Guard evaluations for a specific service, user, or concern.

AI Guard works with any target model, including models from OpenAI, Anthropic, Amazon Bedrock, Google Vertex AI, and Azure. AI Guard can be especially useful for open source and self-hosted models that have fewer built-in security protections.

AI Guard complements Agent Observability by adding runtime security to AI applications and agents you already monitor. Agent Observability gives developers and researchers visibility into model and agent usage, including cost and traces. AI Guard gives security teams runtime protection, threat detection, and governance features such as policies that control what agents are allowed to do.

## Attack categories

AI Guard classifies each threat it detects into an attack category, such as instruction override or jailbreak. Use attack categories to understand what a policy protects against and to filter signals and spans.

AI Guard detects these attack categories:

- Role play
- Authority override
- Instruction override
- Obfuscation
- Destructive tool call
- Denial of service tool call
- Security exploit
- Data exfiltration
- System prompt extraction
- Indirect prompt injection
- Jailbreak

The list of attack categories expands as AI Guard adds detections. For a description of each attack category, click {{< ui >}}What does AI Guard detect?{{< /ui >}} on the {{< ui >}}Policies{{< /ui >}} page.

## Integration methods

AI Guard connects to agents through the AI Guard SDK, which is part of the Datadog SDK. Every integration method runs on the SDK. The methods differ in how much of the connection you build yourself.

Choose the first method that fits your agent:

| Method | What you do | Supported |
| --- | --- | --- |
| [Automatic integrations][9] | Enable AI Guard through environment variables and Datadog SDK configuration. The SDK evaluates calls made through supported libraries, without evaluation calls in your code. | LangChain, OpenAI SDK, Anthropic SDK, AI SDK, and RubyLLM |
| [Manual integrations][10] | Add a plugin or configuration entry that connects a framework to the SDK. | Amazon Strands and LiteLLM Proxy |
| [SDK][11] | Call the SDK in your code at each point you want evaluated. | Python, Node.js, Java, and Ruby |

For languages that the SDK doesn't support, such as Go or .NET, call the [AI Guard HTTP API][15] directly. The HTTP API needs no Datadog Agent or Datadog SDK, but your code must act on the returned action itself. HTTP API evaluations don't create spans, so they don't appear on any AI Guard page in Datadog and don't generate signals.

## Specifications and limitations

Learn what content AI Guard evaluates, how fast it responds, how much traffic it accepts, and how it handles your data.

### Content types and languages

Knowing which content AI Guard evaluates helps you predict which parts of a conversation get checked. AI Guard evaluates only text and images.

- AI Guard doesn't parse document files, such as `.docx` or PDF files. To evaluate a document, extract its text in your application and send the text, or send the content as an image.
- AI Guard supports most languages. Datadog has verified AI Guard detection in these languages: Arabic, Chinese (Simplified), Chinese (Traditional), Dutch, English, French, German, Japanese, Korean, Polish, Portuguese, Russian, and Spanish.

### Latency

Latency indicates how much time evaluation adds to each model call in your agent.

AI Guard evaluations typically complete in under 100 milliseconds. Latency varies with the size of the conversation and the region where your application runs.

Image evaluation takes longer than text evaluation, because the classifier doesn't support images. Image latency also varies more.

### Usage limits

AI Guard usage limits cap how much evaluation traffic each Datadog organization can send. Knowing the limits helps you plan for requests that exceed limits.

The AI Guard evaluation API enforces these limits for each Datadog organization:

| Limit | Value |
| --- | --- |
| Tokens evaluated per minute | 14 million |
| Requests per minute | 700 |

To request higher limits for your organization, contact [Datadog Support][13].

When your organization exceeds a limit, AI Guard stops evaluating requests, and the API returns a `429 Too Many Requests` error. What happens to each request depends on the integration method:

- Automatic and manual integrations let the model call or tool call proceed without an evaluation.
- SDK calls raise an `AIGuardClientError`. Catch this error to decide whether your agent proceeds or stops.

To reduce how many evaluations your agent sends, use the [SDK][11] and call the evaluate method only where you want an evaluation. For example, evaluate only tool calls, or only some tool calls.

### Data residency, retention, and privacy

AI Guard processes all evaluations in the US, regardless of your Datadog site.

Indexed AI Guard spans follow your organization's [APM retention][14] settings. By default, Datadog keeps indexed spans for 15 days. To restrict which users can view AI Guard spans, see [Limit access to AI Guard spans][12].

External model providers that AI Guard uses for evaluation operate under zero data retention. Datadog doesn't train models on your data. AI Guard encrypts data in transit with TLS.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/
[2]: /security/ai_guard/setup/
[4]: /security/ai_guard/policies/
[6]: /security/ai_guard/setup/sensitive_data_redaction/
[7]: /security/ai_guard/signals/#investigate-signals
[8]: /security/ai_guard/signals/#get-additional-context-with-spans
[9]: /security/ai_guard/setup/automatic_integrations/
[10]: /security/ai_guard/setup/manual_integrations/
[11]: /security/ai_guard/setup/sdk/
[12]: /security/ai_guard/setup/#limit-access
[13]: /help/
[14]: /tracing/trace_pipeline/trace_retention/
[15]: /security/ai_guard/setup/http_api/
