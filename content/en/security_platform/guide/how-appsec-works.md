---
title: How Application Security works in Datadog
kind: guide
---

## Overview

Application Security monitors application-level attacks aiming to exploit code-level vulnerabilities.

Application Security records information about each request and applies security rules in-app. This information enriches your APM traces with security data.

Traditional Web Application Firewalls (WAFs) are usually deployed at the perimeter and have no context of the application behavior. Application Security provides WAF-like capabilities with additional application context and lower false positives.

## Threat detection methods

Datadog uses multiple pattern sources, including the [OWASP ModSecurity Core Rule Set][1] to detect known threats and vulnerabilities in HTTP requests. When an HTTP request matches one of those rules, a security signal is generated in Datadog.

Security Signals are automatically created when Datadog detects meaningful attacks targeting your production services. It provides you with visibility on the attackers and the targeted services. You can set custom detection rules with thresholds to determine which attacks you want to be notified about.

## Coverage

Application Security categorizes attack attempts into different threat types:

* **Unqualified attacks** match inbound HTTP requests with known attack patterns, but don't have any correlation to the business-logic.
* **Contextualized attacks** have a correlation between known attack patterns and business-logic.
* A **Vulnerability is triggered** when there is a correlation between attack patterns, and there's evidence of a successful vulnerability trigger.

Application Security includes over 100 OOTB detection rules that help protect against many different kinds of attacks, including the following:

* SQL injections
* Code Injections 
* Shell Injections
* NoSQL injections 
* Cross-Site Scripting (XSS) 
* Sever-side Request Forgery (SSRF)

### Detecting vulnerabilities

If a vulnerability is triggered during an attack, the full context from the trace can help you detect code-level vulnerabilities. 

### How Application Security protects against Log4Shell

 Application Security identifies Log4Shell attack payloads and provides visibility into vulnerable apps that attempt to remotely load malicious code. When used in tandem with the rest of [Datadog's Security Platform][2], you can fully investigate to identify common post-exploitation activity, and proactively remediate potentially exposed Java applications acting as an attack vector.

## Data security and PII

Application Security does not obfuscate sensitive information or Personal Identifiable Information (PII). To keep this sensitive data from being sent to Datadog, [configure the Datadog Agent or Tracer for data security][3].


[1]: https://owasp.org/www-project-modsecurity-core-rule-set/
[2]: /security_platform/
[3]: /tracing/setup_overview/configure_data_security/?tab=http
