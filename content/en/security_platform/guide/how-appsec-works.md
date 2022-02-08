---
title: How Application Security works in Datadog
kind: guide
---

## Overview

Application Security monitors application-level attacks aiming to exploit code-level vulnerabilities.

Application Security records information about each request and applies security rules in-app. This information enriches your APM traces with security data.

## Threat detection methods

Datadog uses multiple pattern sources, including the [OWASP ModSecurity Core Rule Set][1] to detect known threats and vulnerabilities in HTTP requests. When an HTTP request matches one of those rules, a security signal is generated in Datadog.

Signals are automatically created when Datadog detects meaningful attacks targeting your production services. It provides you with visibility on the attackers and the targeted services. You can set monitors with thresholds to determine which attacks you want to be notified about.

## Attack types

* **Unqualified attacks** match inbound HTTP requests with known attack patterns, but don't have any correlation to the business-logic.
* **Contextualized attacks** have a correlation between known attack patterns and business-logic.
* A **Vulnerability is triggered** when there is a correlation between attack patterns, and there's evidence of a successful vulnerability trigger.

### Detecting vulnerabilities

If a vulnerability is triggered during an attack, the full context from the trace can help you detect code-level vulnerabilities. 


[1]: https://owasp.org/www-project-modsecurity-core-rule-set/
