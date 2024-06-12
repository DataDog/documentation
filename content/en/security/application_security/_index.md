---
title: Application Security Management
kind: documentation
description: Monitor threats targeting production system, leveraging the execution context provided by distributed traces.
aliases:
  - /security_platform/application_security
further_reading:
- link: "/security/application_security/how-appsec-works/"
  tag: "Documentation"
  text: "How Application Security Management Works"
- link: "/security/application_security/threats/"
  tag: "Documentation"
  text: "Threat Management"
- link: "/security/application_security/software_composition_analysis/"
  tag: "Documentation"
  text: "Software Composition Analysis"
- link: "/security/application_security/enabling/#compatibility"
  tag: "Documentation"
  text: "Learn more about language and framework compatibility"
- link: "https://www.datadoghq.com/product/security-platform/application-security-monitoring/"
  tag: "Product Page"
  text: "Datadog Application Security Management"
- link: "https://www.datadoghq.com/blog/datadog-application-security/"
  tag: "Blog"
  text: "Introducing Datadog Application Security"
- link: "https://www.datadoghq.com/blog/secure-serverless-applications-with-datadog-asm/"
  tag: "Blog"
  text: "Secure serverless applications with Datadog ASM"
- link: "https://www.datadoghq.com/blog/securing-cloud-native-applications/"
  tag: "Blog"
  text: "Best practices for application security in cloud-native environments"
- link: "https://www.datadoghq.com/blog/apm-security-view/"
  tag: "Blog"
  text: "Gain visibility into risks, vulnerabilities, and attacks with APM Security View"
- link: "https://www.datadoghq.com/blog/block-attackers-application-security-management-datadog/"
  tag: "Blog"
  text: "Block attackers in your apps and APIs with Datadog Application Security Management"
- link: "https://www.datadoghq.com/blog/threat-modeling-datadog-application-security-management/"
  tag: "Blog"
  text: "Threat modeling with Datadog Application Security Management"
- link: "https://www.datadoghq.com/blog/aws-waf-datadog/"
  tag: "Blog"
  text: "Monitor AWS WAF activity with Datadog"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Application Security Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< img src="/security/application_security/app-sec-landing-page.png" alt="A security signal panel in Datadog, which displays attack flows and flame graphs" width="75%">}}

Datadog Application Security Management (ASM) provides protection against application-level attacks that aim to exploit code-level vulnerabilities, such as Server-Side-Request-Forgery (SSRF), SQL injection, Log4Shell, and Reflected Cross-Site-Scripting (XSS). You can monitor and protect apps hosted directly on a server, Docker, Kubernetes, Amazon ECS, and (for supported languages) AWS Fargate.

ASM leverages Datadog [tracing libraries][1], and the [Datadog Agent][2] to identify services exposed to application attacks. Once configured, ASM leverages in-app detection rules to detect and protect against threats in your application environment and trigger security signals whenever an attack impacts your production system, or a vulnerability is triggered from the code.

When a threat is detected, a security signal is generated in Datadog. For `HIGH` or `CRITICAL` severity security signals, notifications can be sent to Slack, email, or PagerDuty to notify your team and provide real-time context around threats.

Once a security signal is triggered, quickly pivot to investigate and protect in Datadog. Leverage the deep observability data provided by ASM and APM distributed tracing, in one view, to resolve application issues. Analyze attack flows, view flame graphs, and review correlated trace and log data to pinpoint application vulnerabilities. Eliminate context switching by flowing through application data into remediation and mitigation steps, all within the same panel.

With ASM, you can cut through the noise of continuous trace data to focus on securing and protecting your environment.

Until you fully remediate the potential vulnerabilities in your application code, ASM enables you to slow down attackers by blocking their IPs temporarily or permanently, with a single click.

## Understanding how application security is implemented in Datadog

If you're curious how Application Security Management is structured and how it uses tracing data to identify security problems, read [How Application Security Management Works][3].

## Configure your environment

Powered by provided [out-of-the-box rules][4], ASM detects threats without manual configuration. If you already have Datadog [APM][1] configured on a physical or virtual host, setup only requires setting one environment variable to get started.

To start configuring your environment to detect and protect threats with ASM, follow the [Enabling documentation][5]. Once ASM is configured, you can begin investigating and remediating security signals in the [Security Signals Explorer][6].

## Investigate and remediate security signals

In the [Security Signals Explorer][6], click on any security signal to see what happened and the suggested steps to mitigate the attack. In the same panel, view traces with their correlated attack flow and request information to gain further context.

## Investigate risk introduced in upstream open source libraries and dependencies

[Software Composition Analysis (SCA)][8] shows you when your services are at risk because they use or have dependencies on open source libraries that have known vulnerabilities. Investigate vulnerability findings and secure your software by following remediation advice or researching the cause of the vulnerability.

## Next steps

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/
[2]: /agent/
[3]: /security/application_security/how-appsec-works/
[4]: /security/default_rules/?category=cat-application-security
[5]: /security/application_security/enabling/
[6]: https://app.datadoghq.com/security
[7]: https://dashcon.io/appsec
[8]: /security/application_security/software_composition_analysis/
