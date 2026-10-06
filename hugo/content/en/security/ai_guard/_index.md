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

{{< site-region region="gov" >}}
<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

{{< callout url="https://www.datadoghq.com/product-preview/coding-agent-security-guardrails/" header="false" >}}
AI Guard for coding agents is in Preview. If you're interested in this feature, complete the form to request access.
{{< /callout >}}

AI Guard evaluates the prompts, model responses, and tool calls in your AI applications and agents in real time, and blocks calls that carry an attack or expose sensitive data. AI Guard runs inline with your agent, works with any LLM provider, and records every evaluation in Datadog so you can investigate threats alongside the rest of your application traces.

AI Guard protects two kinds of agents: custom agents that your team builds and runs, and coding agents, such as Claude Code, that your developers use. Unless a section says otherwise, the AI Guard documentation covers custom agents.

AI Guard protects against prompt injection and jailbreaking, tool misuse, and sensitive data exfiltration. Together, these protections address the [agentic lethal trifecta][1]: privileged system access, exposure to untrusted data, and outbound communication.

## How AI Guard works

AI Guard sits in the critical path of LLM interactions, so it can stop unsafe prompts or tool calls before they're acted on.

1. AI Guard receives the conversation from one of two places:

   - The AI Guard SDK inside your agent, which evaluates before each model call or tool call.

   - A plugin on an AI gateway, which evaluates LLM traffic from every agent that routes through the gateway.

1. AI Guard evaluates the full conversation, including the system prompt, against the applicable security policy.
1. AI Guard returns an `ALLOW` or `DENY` with a reason. For `DENY` results, the subsequent action depends on the enforcement mode specified in the policy:

   - In the default {{< ui >}}Monitor only{{< /ui >}} mode, AI Guard reports the action without blocking.
   - In {{< ui >}}Block unsafe{{< /ui >}} mode, AI Guard stops the request.

1. AI Guard records the evaluation as an AI Guard span. 

1. Detection rules watch evaluation outcomes and create a security signal when a rule is triggered.

Policies and detection rules are separate layers. Policies determine what AI Guard flags or blocks at evaluation time. Detection rules determine which outcomes become signals that your team triages.

### How AI Guard evaluates threats

AI Guard uses models, not fixed rules, to detect threats. Model-based detection judges each prompt and tool call in the context of the full conversation, so AI Guard can catch attacks that don't match a known pattern.

Datadog manages the detection models. To adjust how AI Guard applies them to a service, use the controls in a policy, such as evaluation sensitivity and evaluation context.

Each evaluation runs in up to two passes:

1. A fast classifier screens the conversation. Most evaluations finish in this pass.
1. If the classifier flags the conversation as suspicious, AI Guard escalates it to a large language model for a deeper assessment.

Images skip the classifier and always go to the second pass, so image evaluation has higher latency than text evaluation.

Sensitive data scanning works differently. It uses Sensitive Data Scanner rules, not models, to find personally identifiable information and secrets.

### Key terms: spans, traces, and signals

Knowing these AI Guard concepts helps you triage, evaluate, and remediate AI Guard data. 

Trace
: The full record of one request to your agent, from the incoming request to the response. A trace includes every model call and tool call the agent makes along the way.

AI Guard span
: The record of one AI Guard evaluation within a trace. Each time AI Guard checks a prompt, response, or tool call, it adds a span that shows what it checked, the action it returned, and why.

Signal
: An alert that flags AI Guard activity for your team to review. Datadog creates a signal when evaluation results match a detection rule, such as several `DENY` actions from the same service in a short time.

One trace can contain several AI Guard spans, and one signal can summarize spans from many traces.

## How to use AI Guard

AI Guard supports the full life cycle of securing AI agents, from finding unprotected services to responding to active attacks.

1. [Set up AI Guard][2] for target agents. The default security policy starts monitoring agent calls immediately. 
1. [Explore AI security][3] to find additional unprotected agents and onboard them.
1. [Manage AI Guard policies][4] as needed, optionally [previewing evaluations][5] before applying changes.
1. [Redact sensitive data][6] that AI Guard detects in prompts and responses.
1. [Triage signals][7] that detection rules create from AI Guard evaluation outcomes.
1. [Investigate spans][8] to filter AI Guard evaluations for a specific service, user, or concern.

AI Guard works with any target model, including models from OpenAI, Anthropic, Amazon Bedrock, Google Vertex AI, and Azure. It can be especially useful for open source and self-hosted models with fewer built-in security protections.

AI Guard complements Agent Observability by adding runtime security to LLM applications and agents you already monitor. Agent Observability gives developers and researchers visibility into LLM and agent usage, including cost, model usage, and traces. AI Guard gives security teams runtime protection, threat detection, and governance features such as policies that control what agents are allowed to do.

## Attack categories

AI Guard classifies each threat it detects into an attack category, such as instruction override or jailbreak. Use attack categories to understand what a policy protects against and to filter signals and spans.

AI Guard detects these attack categories:

- Role play.
- Authority override.
- Instruction override.
- Obfuscation.
- Destructive tool call.
- Denial of service tool call.
- Security exploit.
- Data exfiltration.
- System prompt extraction.
- Indirect prompt injection.
- Jailbreak.

The list of attack categories expands as AI Guard adds detections. For the current list with a description of each category, open the AI Guard {{< ui >}}Policies{{< /ui >}} page in Datadog and click {{< ui >}}What does AI Guard detect?{{< /ui >}}.

## Integration methods

AI Guard connects to your agent through the AI Guard SDK, which is part of the Datadog SDK. Every integration method runs on the SDK. The methods differ in how much of the connection you build yourself.

Choose the first method that fits your agent:

| Method | What you do | Supported |
| --- | --- | --- |
| [Automatic integrations][9] | Enable AI Guard with environment variables. The SDK evaluates calls made through supported libraries, with no code changes. | LangChain, OpenAI SDK, Anthropic SDK, AI SDK, and RubyLLM. |
| [Manual integrations][10] | Add a plugin or configuration entry that connects a framework to the SDK. | Amazon Strands and LiteLLM Proxy. |
| [SDK][11] | Call the SDK in your code at each point you want evaluated. | Python, Node.js, Java, and Ruby. |

For languages that the SDK doesn't support, such as Go or .NET, call the AI Guard HTTP API directly. The HTTP API needs no Datadog Agent or Datadog SDK, but your code must act on the returned action itself. HTTP API evaluations don't create spans, so they don't appear on any AI Guard page in Datadog and don't generate signals.

### Supported frameworks

| Framework or library | Language | Method |
| --- | --- | --- |
| LangChain | Python | Automatic integration. |
| OpenAI SDK | Python, Node.js | Automatic integration. |
| Anthropic SDK | Python, Node.js | Automatic integration. <!-- TODO: current docs list no Anthropic tab for Node.js. Confirm Node.js support. --> |
| AI SDK | Node.js | Automatic integration. |
| RubyLLM | Ruby | Automatic integration. |
| Amazon Strands | Python | Manual integration. |
| LiteLLM Proxy | Python | Manual integration. |
| Any framework | Java | SDK. |

## Specifications and limitations

Learn what content AI Guard evaluates, how fast it responds, how much traffic it accepts, and how it handles your data.

### Content types and languages

AI Guard evaluates text and images only.

- Only extracted text is evaluated. AI Guard doesn't parse documents, and `.docx` files aren't supported. 
- Image evaluation has higher latency than text evaluation, because the fast filtering model doesn't support images.
- AI Guard supports most languages, but Datadog evaluates a subset of languages, including Arabic, Chinese (Simplified), Chinese (Traditional), Dutch, English, French, German, Japanese, Korean, Polish, Portuguese, Russian, and Spanish.

### Latency

Latency indicates how much time evaluation adds to each LLM interaction in your agent.

<!-- TODO: latency figures for text and image evaluation. -->

### Usage limits

The AI Guard evaluation API enforces these limits for each Datadog organization:

| Limit | Value |
| --- | --- |
| Tokens evaluated per day | 2.5 billion. |
| Requests per minute | 700. |

<!-- TODO: Product code shows the defaults above. Confirm and find out whether limits can be raised for an organization. Current docs list 1 billion tokens per day and 12,000 requests per minute per IP address. -->

When your organization exceeds a limit, the API returns a `429 Too Many Requests` error, and AI Guard doesn't evaluate the request:

- Automatic and manual integrations let the LLM call or tool call proceed without an evaluation.
- Direct SDK calls raise an `AIGuardClientError`. Catch this error to decide whether your agent proceeds or stops.

<!-- TODO: confirm integration behavior for manual integrations (Amazon Strands, LiteLLM Proxy) and for Node.js, Java, and Ruby. Verified for the Python OpenAI automatic integration only. -->

### Data retention and privacy

AI Guard spans follow APM retention for indexed spans, which is 15 days by default. To restrict which users can view AI Guard spans, see [Limit access to AI Guard spans][12].

External model providers that AI Guard uses for evaluation operate under zero data retention. 
<!-- TODO: verify against current product and public docs. -->

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/
[2]: /security/ai_guard/setup/
[3]: /security/ai_guard/discover/
[4]: /security/ai_guard/policies/
[5]: /security/ai_guard/simulator/
[6]: /security/ai_guard/sensitive_data_redaction/
[7]: /security/ai_guard/signals/#triage-signals
[8]: /security/ai_guard/signals/#investigate-spans
[9]: /security/ai_guard/setup/automatic_integrations/
[10]: /security/ai_guard/setup/manual_integrations/
[11]: /security/ai_guard/setup/sdk/
[12]: /security/ai_guard/setup/#5-optional-limit-access-to-ai-guard-spans
