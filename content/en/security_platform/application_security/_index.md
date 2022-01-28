---
title: Application Security
kind: documentation
description: Monitor threats targeting production system, leveraging the execution context provided by distributed traces.
is_beta: true
disable_sidebar: true
further_reading:
- link: "/security_platform/guide/how-appsec-works/"
  tag: "Guide"
  text: "Learn how Application Security works"
- link: "/security_platform/application_security/setup_and_configure/#compatibility"
  tag: "Documentation"
  text: "Learn more about language and framework compatibility"
---

<div class="alert alert-warning">
Application Security is currently in public beta. See the <a href="https://app.datadoghq.com/security/appsec">in-app instructions</a> to get started.
</div>

{{< img src="/security_platform/application_security/app-sec-landing-page.png" alt="The Application Security landing page in Datadog, which displays your services, suspicious requests, and detected signals" width="75%">}}

Datadog Application Security monitors application-level attacks aiming to exploit code-level vulnerabilities, such as Server-Side-Request-Forgery (SSRF), SQL injection, Log4Shell, and Reflected Cross-Site-Scripting (XSS).

Application Security leverages Datadog [tracing libraries][1], the [Datadog Agent][2], and in-app detection rules to detect threats in your application environment and trigger signals whenever an attack targets your production system, or a vulnerability is triggered from the code.

For example, if a `HIGH` or `CRITICAL` threat is detected, a security signal is generated in Datadog. Notifications for these signals can be sent to Slack or email, or Pagerduty, for instance. Your team can access these signals in Datadog and begin investigation by leveraging the deep observability data provided by Application Security and APM distributed tracing in one panel.

## Configure your environment

Powered by provided [out-of-the-box rules][3], Application Security detects threats without manual configuration. If you're already using Datadog [APM][1], setup only requires setting one environment variable to get started.

To start configuring your environment to detect threats with Application Security, follow the [Getting Started documentation][5]. Once configured, you can begin investigating and remediating security signals in the [Security Signals Explorer][7].

## Investigate and remediate security signals

In the [Security Signals Explorer][7], click on any security signal to see what happened and the suggested steps to remediate the issue. In the same panel, view traces with their correlated attack flow and request information to gain further context.

## Next steps

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/
[2]: /agent/
[3]: /security_platform/default_rules/#cat-application-security
[4]: /security/appsec
[5]: /security_platform/application_security/getting_started/
[6]: /security_platform/application_security/custom_signal_rules/
[7]: /security/appsec/signals
