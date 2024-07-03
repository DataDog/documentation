---
aliases:
- /ja/security_platform/guide/how-appsec-works/
further_reading:
- link: /security_platform/application_security/setup_and_configure/#compatibility
  tag: Documentation
  text: Learn more about language and framework compatibility
- link: https://www.datadoghq.com/blog/datadog-application-security/
  tag: Blog
  text: Introducing Datadog Application Security
- link: /security_platform/application_security/getting_started/
  tag: Documentation
  text: Get started with Application Security Management
kind: documentation
title: How Application Security Management Works in Datadog
---

## Overview

Datadog Application Security Management (ASM) provides observability into application-level attacks that aim to exploit code-level vulnerabilities.

APM records information about each HTTP request, referred to as traces. Datadog ASM uses the information APM is already collecting, and flags attack attempts based on suspicious requests that match known attack patterns. Security signals are an aggregation of suspicious requests. Depending on your security signal settings, you can receive notifications from Slack, email, or PagerDuty.

Traditional Web Application Firewalls (WAFs) are usually deployed at the perimeter and have no context of the application behavior. For ASM to be effective, it must be embedded in the application to get access to the data. Datadog ASM leverages known attack patterns, similar to a Web Application Firewall (WAF) but with additional application context to increase the signal to noise ratio, lowering false positives.

## Compatibility

For Datadog ASM to be compatible with your Datadog configuration, you must have APM enabled, and [send traces to Datadog][1]. ASM uses the same libraries used by APM, so you don't need to deploy and maintain another library. Steps to enable Datadog ASM are specific to runtime language. Check to see if your language is supported in the [ASM prerequisites][2].

## Performance

Datadog ASM uses processes already contained in the Agent and APM, so there are negligible performance implications when using it. When APM is enabled, the Datadog Library generates distributed traces. Datadog ASM flags security activity in traces by using known attack patterns. Correlation between the attack patterns and the execution context provided by the distributed trace triggers security signals based on detection rules.

{{< img src="security_platform/application_security/How_Application_Security_Works_d1.png" alt="A diagram illustrates that the Datadog tracer library operates at the application service level and sends traces to the Datadog backend. The Datadog backend flags actionable security signals and sends a notification to the relevant application, such as PagerDuty, Jira or Slack." >}}

## Data privacy

There are multiple methods used to avoid your sensitive information being indexed. To take further action, you can set up [custom and static scrubbers][3], and use [exclusion filters][4].


**Note:** Datadog ASM does not automatically obfuscate sensitive information or PII. To keep this sensitive data from being sent to Datadog, [configure the Datadog Agent or Tracer for data security][3].

Contact Support to delete sensitive data that may have been indexed.

## Threat detection methods

Datadog uses multiple pattern sources, including the [OWASP ModSecurity Core Rule Set][5] to detect known threats and vulnerabilities in HTTP requests. When an HTTP request matches one of [the OOTB detection rules][6], a security signal is generated in Datadog.

Security Signals are automatically created when Datadog detects meaningful attacks targeting your production services. It provides you with visibility on the attackers and the targeted services. You can set custom detection rules with thresholds to determine which attacks you want to be notified about.

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

[1]: /ja/tracing/trace_collection/
[2]: /ja/security_platform/application_security/getting_started/#prerequisites
[3]: /ja/tracing/configure_data_security/?tab=http
[4]: /ja/security_platform/cloud_siem/guide/how-to-setup-security-filters-using-cloud-siem-api/
[5]: https://owasp.org/www-project-modsecurity-core-rule-set/
[6]: /ja/security_platform/default_rules/#cat-application-security
[7]: https://app.datadoghq.com/security/appsec/event-rules
[8]: /ja/security_platform/cloud_siem/