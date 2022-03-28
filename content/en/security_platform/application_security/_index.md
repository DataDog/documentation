---
title: Application Security
kind: documentation
description: Monitor threats targeting production system, leveraging the execution context provided by distributed traces.
is_beta: true
disable_sidebar: true
further_reading:
- link: "/security_platform/application_security/setup_and_configure/#compatibility"
  tag: "Documentation"
  text: "Learn more about language and framework compatibility"
- link: "https://www.datadoghq.com/blog/datadog-application-security/"
  tag: "Blog"
  text: "Introducing Datadog Application Security"
- link: "/security_platform/guide/how-appsec-works/"
  tag: "Documentation"
  text: "How Application Security Works in Datadog"
---

<div class="alert alert-warning">
Application Security is in public beta. See the <a href="https://app.datadoghq.com/security/appsec?instructions=all">in-app instructions</a> to get started.
</div>

{{< img src="/security_platform/application_security/app-sec-landing-page.png" alt="A security signal panel in Datadog, which displays attack flows and flame graphs" width="75%">}}

Datadog Application Security monitors application-level attacks aiming to exploit code-level vulnerabilities, such as Server-Side-Request-Forgery (SSRF), SQL injection, Log4Shell, and Reflected Cross-Site-Scripting (XSS).

Application Security leverages Datadog [tracing libraries][1], the [Datadog Agent][2], and in-app detection rules to detect threats in your application environment and trigger signals whenever an attack targets your production system, or a vulnerability is triggered from the code.

When a threat is detected, a security signal is generated in Datadog. For `HIGH` or `CRITICAL` severity security signals, notifications can be sent to Slack, email, or PagerDuty to notify your team and provide real-time context around threats.

Once a signal is triggered, quickly pivot to investigate in Datadog. Leverage the deep observability data provided by Application Security and APM distributed tracing, in one view, to resolve application issues. Analyze attack flows, view flame graphs, and review correlated trace and log data to pinpoint application vulnerabilities. Eliminate context switching by flowing through application data into remediation steps, all within the same panel.

With Application Security, you can cut through the noise of continuous trace data to focus on securing and protecting your environment.

## Configure your environment

Powered by provided [out-of-the-box rules][3], Application Security detects threats without manual configuration. If you're already using Datadog [APM][1], setup only requires setting one environment variable to get started.

To start configuring your environment to detect threats with Application Security, follow the [Getting Started documentation][4]. Once Application Security is configured, you can begin investigating and remediating security signals in the [Security Signals Explorer][5].

## Investigate and remediate security signals

In the [Security Signals Explorer][5], click on any security signal to see what happened and the suggested steps to remediate the issue. In the same panel, view traces with their correlated attack flow and request information to gain further context.

## Next steps

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/
[2]: /agent/
[3]: /security_platform/default_rules/#cat-application-security
[4]: /security_platform/application_security/getting_started/
[5]: /security_platform/explorer/
