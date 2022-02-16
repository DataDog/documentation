---
title: How Application Security works in Datadog
kind: guide
---

## Overview

Application Security monitors application-level attacks aiming to exploit code-level vulnerabilities.

Application Security records information about each request and applies security rules in-app. This information enriches your APM traces with security data.

Traditional Web Application Firewalls (WAFs) are usually deployed at the perimeter and have no context of the application behavior. Application Security provides WAF-like capabilities with additional application context and lower false positives.

### Compatibility

For Application Security to be compatible with your Datadog configuration, you must have APM enabled, and [send traces to Datadog][1]. It uses the same libraries used by the APM suite, so you don't need to deploy and maintain another library for this task. Steps to enable Application Security are specific to runtime language. Check to see if your language is supported in the [Application Security prerequisites][2].

### Performance

Application Security uses processes already contained in the Agent and APM, so there are no performance implications when using it. Application Security collects and enriches trace data from APM. It doesn't require extra overhead for processes like analyzing attack attempts, because it matches against known patterns and flags them.

### Data Privacy

Application Security only scans HTTP request headers, it does not scan the body. 

There are multiple methods used to avoid your sensitive information being indexed. To take further action, you can set up [custom and static scrubbers][3], and use [exclusion filters][4].

The [Sensitive Data Scanner][5] automatically scans traces that have been flagged by Application Security.

Application Security does not automatically obfuscate sensitive information or PII. To keep this sensitive data from being sent to Datadog, [configure the Datadog Agent or Tracer for data security][3].

Contact Support to delete sensitive data that may have been indexed.

## Threat detection methods

Datadog uses multiple pattern sources, including the [OWASP ModSecurity Core Rule Set][6] to detect known threats and vulnerabilities in HTTP requests. When an HTTP request matches one of those rules, a security signal is generated in Datadog.

Security Signals are automatically created when Datadog detects meaningful attacks targeting your production services. It provides you with visibility on the attackers and the targeted services. You can set custom detection rules with thresholds to determine which attacks you want to be notified about.

## Coverage

Application Security categorizes attack attempts into different threat types:

* **Unqualified attacks** match inbound HTTP requests with known attack patterns, but don't have any correlation to the business-logic.
* **Contextualized attacks** have a correlation between known attack patterns and business-logic.
* A **Vulnerability is triggered** when there is a correlation between attack patterns, and there's evidence of a successful vulnerability trigger.

Application Security includes over 100 OOTB detection rules that help protect against [many different kinds of attacks][7], including the following:

* SQL injections
* Code injections
* Shell injections
* NoSQL injections
* Cross-Site Scripting (XSS)
* Sever-side Request Forgery (SSRF)

### How Application Security protects against Log4Shell

 Application Security identifies Log4Shell attack payloads and provides visibility into vulnerable apps that attempt to remotely load malicious code. When used in tandem with the rest of [Datadog's Security Platform][8], you can fully investigate to identify common post-exploitation activity, and proactively remediate potentially exposed Java applications acting as an attack vector.

[1]: /tracing/setup_overview/
[2]: /security_platform/application_security/getting_started/#prerequisites
[3]: /tracing/setup_overview/configure_data_security/?tab=http
[4]: /security_platform/guide/how-to-setup-security-filters-using-cloud-siem-api/
[5]: /account_management/org_settings/sensitive_data_detection/
[6]: https://owasp.org/www-project-modsecurity-core-rule-set/
[7]: https://app.datadoghq.com/security/appsec/event-rules
[8]: /security_platform/
