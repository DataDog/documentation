---
title: Application Security Management
kind: documentation
description: Monitor threats targeting production system, leveraging the execution context provided by distributed traces.
disable_sidebar: true
further_reading:
- link: "/security_platform/application_security/setup_and_configure/#compatibility"
  tag: "Documentation"
  text: "Learn more about language and framework compatibility"
- link: "https://www.datadoghq.com/blog/datadog-application-security/"
  tag: "Blog"
  text: "Introducing Datadog Application Security"
- link: "/security_platform/application_security/how-appsec-works/"
  tag: "Documentation"
  text: "How Application Security Management Works"
- link: "https://www.datadoghq.com/product/security-platform/application-security-monitoring/"
  tag: "Product Page"
  text: "Datadog Application Security Management"
---

{{< img src="/security_platform/application_security/app-sec-landing-page.png" alt="A security signal panel in Datadog, which displays attack flows and flame graphs" width="75%">}}

Datadog Application Security Management (ASM) provides protection against application-level attacks that aim to exploit code-level vulnerabilities, such as Server-Side-Request-Forgery (SSRF), SQL injection, Log4Shell, and Reflected Cross-Site-Scripting (XSS). You can monitor and protect apps hosted directly on a server, Docker, Kubernetes, AWS ECS, and (for supported languages) AWS Fargate.

ASM leverages Datadog [tracing libraries][1], the [Datadog Agent][2], and in-app detection rules to detect and protect against threats in your application environment and trigger security signals whenever an attack targets your production system, or a vulnerability is triggered from the code.

When a threat is detected, a security signal is generated in Datadog. For `HIGH` or `CRITICAL` severity security signals, notifications can be sent to Slack, email, or PagerDuty to notify your team and provide real-time context around threats.

Once a security signal is triggered, quickly pivot to investigate and protect in Datadog. Leverage the deep observability data provided by ASM and APM distributed tracing, in one view, to resolve application issues. Analyze attack flows, view flame graphs, and review correlated trace and log data to pinpoint application vulnerabilities. Eliminate context switching by flowing through application data into remediation and mitigation steps, all within the same panel.

With ASM, you can cut through the noise of continuous trace data to focus on securing and protecting your environment.

Until you fully remediate the potential vulnerabilities lying in the application's code, ASM enables you to slow down the attackers by blocking their IPs temporarily or permanently, in 1-click. This feature is currently in private beta, please contact us through [this form][7] to access early previews.

## Understanding how application security is implemented in Datadog

If you're curious how Application Security Management is structured and how it uses tracing data to identify security problems, read [How Application Security Management Works][3].

## Configure your environment

Powered by provided [out-of-the-box rules][4], ASM detects threats without manual configuration. If you already have Datadog [APM][1] configured on a physical or virtual host, setup only requires setting one environment variable to get started.

To start configuring your environment to detect and protect threats with ASM, follow the [Getting Started documentation][5]. Once ASM is configured, you can begin investigating and remediating security signals in the [Security Signals Explorer][6].

## Investigate and remediate security signals

In the [Security Signals Explorer][6], click on any security signal to see what happened and the suggested steps to mitigate the attack. In the same panel, view traces with their correlated attack flow and request information to gain further context.

## Next steps

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/
[2]: /agent/
[3]: /security_platform/application_security/how-appsec-works/
[4]: /security_platform/default_rules/#cat-application-security
[5]: /security_platform/application_security/getting_started/
[6]: /security_platform/explorer/
[7]: https://dashcon.io/appsec
