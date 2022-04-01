---
title: How Application Security Works in Datadog
kind: guide
---

## Overview

Datadog Application Security monitors application-level attacks aiming to exploit code-level vulnerabilities.

APM records information about each HTTP request, referred to as traces. Datadog Application Security uses the information APM is already collecting, and flags attack attempts based on suspicious requests that match known attack patterns. Security signals are an aggregation of suspicious requests. Depending on your security signal settings, you can receive notifications from Slack, email, or PagerDuty.

Traditional Web Application Firewalls (WAFs) are usually deployed at the perimeter and have no context of the application behavior. For Application Security to be effective, it must be embedded in the application to get access to the data. Datadog Application Security leverages known attack patterns, similar to a Web Application Firewall (WAF) but with additional application context to increase the signal to noise ratio, lowering false positives.

### Compatibility

For Datadog Application Security to be compatible with your Datadog configuration, you must have APM enabled, and [send traces to Datadog][1]. Application Security uses the same libraries used by APM, so you don't need to deploy and maintain another library. Steps to enable Datadog Application Security are specific to runtime language. Check to see if your language is supported in the [Application Security prerequisites][2].

### Performance

Datadog Application Security uses processes already contained in the Agent and APM, so there are no performance implications when using it. When APM is enabled, the Datadog Library generates distributed traces. Datadog Application Security flags security activity in traces by using known attack patterns. Correlation between the attack patterns and the execution context provided by the distributed trace triggers security signals based on detection rules.


### Data privacy

There are multiple methods used to avoid your sensitive information being indexed. To take further action, you can set up [custom and static scrubbers][3], and use [exclusion filters][4].


**Note:** Datadog Application Security does not automatically obfuscate sensitive information or PII. To keep this sensitive data from being sent to Datadog, [configure the Datadog Agent or Tracer for data security][3].

Contact Support to delete sensitive data that may have been indexed.

## Threat detection methods

Datadog uses multiple pattern sources, including the [OWASP ModSecurity Core Rule Set][6] to detect known threats and vulnerabilities in HTTP requests. When an HTTP request matches one of [the OOTB detection rules][7], a security signal is generated in Datadog.

Security Signals are automatically created when Datadog detects meaningful attacks targeting your production services. It provides you with visibility on the attackers and the targeted services. You can set custom detection rules with thresholds to determine which attacks you want to be notified about.

## Coverage

Datadog Application Security categorizes attack attempts into different threat types:

* **Unqualified attacks** match inbound HTTP requests with known attack patterns. For example, no correlation with the service's business-logic is found after correlating with the execution context provided by the trace.
* **Contextualized attacks** correlate the attack attempts performed on the service with a matching business-logic. For example, SQL injection patterns on a service performing SQL statements.
* A **Vulnerability is triggered** when an attack attempt gives evidence that a vulnerability has been successfully exploited, after matching known attack patterns.

Datadog Application Security includes over 100 attack patterns that help protect against [many different kinds of attacks][8], including the following vulnerabilities:

* SQL injections
* Code injections
* Shell injections
* NoSQL injections
* Cross-Site Scripting (XSS)
* Sever-side Request Forgery (SSRF)

### How Datadog Application Security protects against Log4Shell

 Datadog Application Security identifies Log4j Log4Shell attack payloads and provides visibility into vulnerable apps that attempt to remotely load malicious code. When used in tandem with the rest of [Datadog's Cloud SIEM][9], you can investigate to identify common post-exploitation activity, and proactively remediate potentially vulnerable Java web services acting as an attack vector.

[1]: /tracing/setup_overview/
[2]: /security_platform/application_security/getting_started/#prerequisites
[3]: /tracing/setup_overview/configure_data_security/?tab=http
[4]: /security_platform/guide/how-to-setup-security-filters-using-cloud-siem-api/
[5]: /account_management/org_settings/sensitive_data_detection/
[6]: https://owasp.org/www-project-modsecurity-core-rule-set/
[7]: /security_platform/default_rules/#cat-application-security
[8]: https://app.datadoghq.com/security/appsec/event-rules
[9]: /security_platform/cloud_siem/
