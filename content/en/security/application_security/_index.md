---
title: App and API Protection
description: Monitor threats targeting production system, leveraging the execution context provided by distributed traces.
aliases:
  - /security_platform/application_security
  - /security/application_security/enabling/single_step
  - /security/application_security/enabling/compatibility
  - /security/application_security/enabling
  - /security/application_security/getting_started
  - /security/application_security/threats
further_reading:
- link: "/security/application_security/how-it-works/"
  tag: "Documentation"
  text: "How App and API Protection Works"
- link: "https://www.datadoghq.com/product/security-platform/application-security-monitoring/"
  tag: "Product Page"
  text: "Datadog App and API Protection"
- link: "https://www.datadoghq.com/blog/apm-security-view/"
  tag: "Blog"
  text: "Gain visibility into risks, vulnerabilities, and attacks with APM Security View"
- link: "https://www.datadoghq.com/blog/aws-waf-datadog/"
  tag: "Blog"
  text: "Monitor AWS WAF activity with Datadog"
- link: "https://www.datadoghq.com/blog/security-inbox-prioritization/"
  tag: "Blog"
  text: "How Datadog Security Inbox prioritizes security risks"
- link: "https://www.datadoghq.com/blog/understanding-your-waf/"
  tag: "Blog"
  text: "Understanding your WAF: How to address common gaps in web application security"
- link: "https://www.datadoghq.com/blog/mitigate-account-takeovers/"
  tag: "Blog"
  text: "Mitigate account takeovers with Datadog App and API Protection"
algolia:
  tags: ["asm", "App and API Protection"]
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">App and API Protection is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< img src="/security/application_security/app-sec-landing-page.png" alt="A security signal panel in Datadog, which displays attack flows and flame graphs" width="75%">}}

**App & API Protection (AAP)** provides unified visibility and security for your applications and APIs, helping you detect, investigate, and prevent threats across modern workloads.

Whether you're defending public-facing APIs, internal services, or user-facing applications, AAP equips your teams with realtime OOTB threat detection, posture assessment, and in-app protections.

<div class="alert alert-info">Formerly known as Application Security Monitoring (ASM), AAP now goes beyond runtime threat detection to include API discovery, posture management, and protection capabilities.</div>


## Key capabilities

### API discovery and posture management

* Automatically detect all APIs exposed by your services.  
* Identify unprotected, undocumented, or overly permissive endpoints.  
* Get detailed, contextual findings tied to specific endpoints, misconfigurations, and observed behavior.  
* Evaluate API configurations against posture rules based on security best practices and compliance frameworks (e.g., OWASP API Top 10).

### Runtime threat detection and protection

* Detect real-time threats such as injection attacks, account takeover attempts, and application abuse.  
* Correlate multi-signal attack patterns into actionable insights.  
* Block malicious traffic with In-App WAF rules using attributes like IP, user agent, headers, and more.

## Use cases

* Protect customer data in production APIs  
* Detect and block credential stuffing and ATO attacks  
* Maintain API posture compliance across teams and environments  
* Investigate incidents with correlated trace, log, and security data

## AAP implementation in Datadog

If you're curious how App and API Protection is structured and how it uses tracing data to identify security problems, read [How App and API Protection Works][3].

## Configure your environment

Powered by provided [out-of-the-box rules][4], AAP detects threats without manual configuration. If you already have Datadog [APM][1] configured on a physical or virtual host, setup only requires setting one environment variable to get started.

To start configuring your environment to detect and protect threats with AAP, follow the enabling documentation for each product. Once AAP is configured, you can begin investigating and remediating security signals in the [Security Signals Explorer][6].

## Investigate and remediate security signals

In the [Security Signals Explorer][6], click on any security signal to see what happened and the suggested steps to mitigate the attack. In the same panel, view traces with their correlated attack flow and request information to gain further context.

## Disable AAP

For information on disabling AAP or its features, see the following:

- [Disabling AAP][10]

## Next steps

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/
[2]: /agent/
[3]: /security/application_security/how-it-works/
[4]: /security/default_rules/?category=cat-application-security
[6]: https://app.datadoghq.com/security
[7]: https://dashcon.io/appsec
[8]: /security/code_security/software_composition_analysis/
[9]: /security/code_security/
[10]: /security/application_security/troubleshooting/#disabling-aap
[11]: /security/application_security/troubleshooting/#disabling-software-composition-analysis
[12]: /security/application_security/troubleshooting/#disabling-code-security
