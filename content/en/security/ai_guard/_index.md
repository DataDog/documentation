---
title: AI Guard
further_reading:
- link: /security/ai_guard/onboarding/
  tag: Documentation
  text: Get Started with AI Guard
- link: "https://www.datadoghq.com/blog/llm-guardrails-best-practices/"
  tag: "Blog"
  text: "LLM guardrails: Best practices for deploying LLM apps securely"
- link: https://www.datadoghq.com/blog/ai-guard/
  tag: Blog
  text: Protect agentic AI applications with Datadog AI Guard
---

{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

{{< callout url="https://www.datadoghq.com/product-preview/ai-security/"
 btn_hidden="false" header="Join the Preview!">}}
AI Guard is in Preview. Use this form to submit your request today.
{{< /callout >}}

Datadog AI Guard is a defense-in-depth product designed to **inspect**, **block**, and **govern** AI behavior in real time. AI Guard is built to plug in directly with existing Datadog tracing and observability workflows to secure agentic AI systems in production. It sits **inline with your AI app/agent** and layers on top of existing prompt templates, guardrails, and policy checks, to **secure your LLM workflows in the critical path**.

AI Guard protects against prompt injection, jailbreaking, and sensitive data exfiltration attacks with Prompt Protection and Tool Protection. Together, these capabilities protect against the [agentic lethal trifecta][3] - privileged system access, exposure to untrusted data, and outbound communication. These protections work for any target AI model, including OpenAI, Anthropic, Bedrock, VertexAI, and Azure.

For information on how to set up AI Guard, see [Get Started with AI Guard][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/ai_guard/onboarding/
[2]: https://genai.owasp.org/llm-top-10/
[3]: https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/