---
title: Application Security
kind: documentation
disable_sidebar: true
further_reading:
- link: "/security_platform/guide/how-appsec-works/"
  tag: "Guide"
  text: "Learn how Application Security works"
- link: "/security_platform/application_security/setup_and_configure/#compatibility"
  tag: "Documentation"
  text: "Learn more about language and framework compatibility"
---

{{< img src="/security_platform/application_security/app-sec-landing-page.png" alt="The Application Security landing page in Datadog, which displays your services, suspicious requests, and detected signals" width="75%">}}

Datadog Application Security provides protection against application-level threats by identifying and blocking attacks that target code-level vulnerabilities, such as SQL injections and cross-site scripting (XSS) exploits.

Application Security leverages Datadog [tracing libraries][1], the [Datadog Agent][2], and in-app detection rules to detect threats in your application environment and trigger signals whenever a vulnerability or attack occurs.

For example, if a threat is detected, a security signal is generated in Datadog, which triggers notifications in-app and for your configured apps or services. Your team can access these signals in Datadog and begin investigation by leveraging the deep observability data provided by Application Security and APM distributed tracing in one panel.

## Configure your environment

Powered by provided [out-of-the-box rules][3], Application Security detects threats without the manual configuration of rules for an Agent or provider. If you're already using Datadog [APM][1], setup only requires implementation of one environment variable to get started.

To start configuring your environment to detect threats with Application Security, follow the [in-app instructions][4] and supplemental [Getting Started documentation][5]. Once configured, you can also create and configure your own [custom signal rules][6] to tailor detection methods to your environment. Once a threat is detected, begin investigating and remediating security signals in Datadog.

## Investigate and remediate security signals

Security signals are available for triage in the [Security Signals Explorer][7]. Click on any security signal to see what happened and the suggested steps to remediate the issue. In the same panel, view traces with their correlated attack flow and request information to gain further context.

## Next steps

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/
[2]: /agent/
[3]: /security_platform/default_rules/#cat-application-security
[4]: /security/appsec
[5]: /security_platform/application_security/getting_started/
[6]: /security_platform/application_security/custom_signal_rules/
[7]: /security/appsec/signals
