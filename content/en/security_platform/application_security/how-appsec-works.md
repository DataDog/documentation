---
title: How Application Security Management Works in Datadog
kind: documentation
aliases:
  - /security_platform/guide/how-appsec-works/
further_reading:
- link: "/security_platform/application_security/setup_and_configure/#compatibility"
  tag: "Documentation"
  text: "Learn more about language and framework compatibility"
- link: "https://www.datadoghq.com/blog/datadog-application-security/"
  tag: "Blog"
  text: "Introducing Datadog Application Security"
- link: "/security_platform/application_security/getting_started/"
  tag: "Documentation"
  text: "Get started with Application Security Management"
---

## Overview

Datadog Application Security Management (ASM) provides observability into application-level attacks that aim to exploit code-level vulnerabilities, and into any bad actors targeting your systems.

APM records information about each application request, referred to as traces. Datadog ASM uses the same library as APM to monitor your traffic, and flags attack attempts based on suspicious requests that match known attack patterns. Security signals are automatically created when Datadog detects application attacks impacting your services. The signals identify meaningful threats for you review instead of assessing each individual attack attempt. Depending on your security signal settings, you can receive notifications from Slack, email, or PagerDuty.

Traditional Web Application Firewalls (WAFs) are usually deployed at the perimeter and have no context of the application behavior. For ASM to be effective, it must be embedded in the application to get access to the data. Datadog ASM leverages known attack patterns, similar to a Web Application Firewall (WAF) but with additional application context to increase the signal to noise ratio, lowering false positives.

Datadog ASM identifies bad actors by collecting client IP addresses and manually-added user tags on all requests.

## Identify services exposed to application attacks

Datadog ASM uses the information APM is already collecting, and flags traces containing attack attempts. Services exposed to application attacks are highlighted directly in the security views embedded in APM ([Service Catalog][14], [Service Page][15], [Traces][16]).

Because APM collects a sample of your application traffic, enabling ASM in the tracing library is necessary to effectively monitor and protect your services.

## Compatibility

For Datadog ASM to be compatible with your Datadog configuration, you must have APM enabled, and [send traces to Datadog][1]. ASM uses the same libraries used by APM, so you don't need to deploy and maintain another library. Steps to enable Datadog ASM are specific to runtime language. Check to see if your language is supported in the [ASM prerequisites][2].

## Performance

Datadog ASM uses processes already contained in the Agent and APM, so there are negligible performance implications when using it. When APM is enabled, the Datadog Library generates distributed traces. Datadog ASM flags security activity in traces by using known attack patterns. Correlation between the attack patterns and the execution context provided by the distributed trace triggers security signals based on detection rules.

{{< img src="security_platform/application_security/How_Application_Security_Works_d1.png" alt="A diagram illustrates that the Datadog tracer library operates at the application service level and sends traces to the Datadog backend. The Datadog backend flags actionable security signals and sends a notification to the relevant application, such as PagerDuty, Jira or Slack." >}}

## Data Sampling and Retention

In the tracing library, Datadog ASM collects all traces that include security data. A default [retention filter][13] ensures the retention of all security-related traces in the Datadog platform.

## Data privacy

There are multiple methods used to avoid your sensitive information being indexed. To take further action, you can set up [custom and static scrubbers][3], and use [exclusion filters][4].


**Note:** Datadog ASM does not automatically obfuscate sensitive information or PII. To keep this sensitive data from being sent to Datadog, [configure the Datadog Agent or Tracer for data security][3].

Contact Support to delete sensitive data that may have been indexed.

## Threat detection methods

Datadog uses multiple pattern sources, including the [OWASP ModSecurity Core Rule Set][5] to detect known threats and vulnerabilities in HTTP requests. When an HTTP request matches one of [the OOTB detection rules][6], a security signal is generated in Datadog.

Security Signals are automatically created when Datadog detects meaningful attacks targeting your production services. It provides you with visibility on the attackers and the targeted services. You can set custom detection rules with thresholds to determine which attacks you want to be notified about.

## Built-in protection

<div class="alert alert-info">One-click IP blocking is in private beta. Access early preview through <a href="https://dashcon.io/appsec" target="_blank">this form</a>.</div>

Datadog ASM offers built-in protection capabilities to slow down attacks and attackers. 

IP blocking actions are implemented through the [tracing libraries][9], not introducing any new dependencies in your stack.
IP blocking actions are sent remotely using the Remote Configuration protocol, a secure channel between the Datadog platform and your infrastructure, through the [Datadog Agent][12].

You can block attackers' IPs that are flagged in ASM Security Signals temporarily or permanently with a single click in the Datadog UI.

From there, all services already protected by ASM block incoming requests performed by the blocked IP, for the specified duration. All blocked traces are tagged with `security_response.block_ip` and displayed in the [Traces Explorer][10]. Services where ASM is disabled aren't protected.


{{< img src="/security_platform/application_security/asm-blocking-ui.png" alt="A security signal panel in Datadog ASM, allowing to block the attackers' IPs" width="75%">}}

## Coverage

Datadog ASM categorizes attack attempts into different threat types:

* **Unqualified attacks** match inbound HTTP requests with known attack patterns. For example, no correlation with the service's business-logic is found after correlating with the execution context provided by the trace.
* **Contextualized attacks** correlate the attack attempts performed on the service with a matching business-logic. For example, SQL injection patterns on a service performing SQL statements.
* A **Vulnerability is triggered** when an attack attempt gives evidence that a vulnerability has been successfully exploited, after matching known attack patterns.

Datadog ASM includes over 100 attack patterns that help protect against [many different kinds of attacks][7], including the following vulnerabilities:

* SQL injections
* Code injections
* Shell injections
* NoSQL injections
* Cross-Site Scripting (XSS)
* Sever-side Request Forgery (SSRF)

## How Datadog ASM protects against Log4Shell

 Datadog ASM identifies Log4j Log4Shell attack payloads and provides visibility into vulnerable apps that attempt to remotely load malicious code. When used in tandem with the rest of [Datadog's Cloud SIEM][8], you can investigate to identify common post-exploitation activity, and proactively remediate potentially vulnerable Java web services acting as an attack vector.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: /security_platform/application_security/getting_started/#prerequisites
[3]: /tracing/configure_data_security/?tab=http
[4]: /security_platform/cloud_siem/guide/how-to-setup-security-filters-using-cloud-siem-api/
[5]: https://owasp.org/www-project-modsecurity-core-rule-set/
[6]: /security_platform/default_rules/#cat-application-security
[7]: https://app.datadoghq.com/security/appsec/event-rules
[8]: /security_platform/cloud_siem/
[9]: /tracing/
[10]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.blocked%3Atrue
[11]: /security_platform/application_security/add-user-info/?tab=set_user
[12]: /agent/
[13]: /tracing/trace_pipeline/trace_retention/
[14]: /tracing/service_catalog/#security-view
[15]: /tracing/services/service_page/#security
[16]: /tracing/trace_explorer/trace_view/?tab=security#more-information
