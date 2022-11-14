---
aliases:
- csp-nc6-zb3
- /security_monitoring/default_rules/csp-nc6-zb3
- /security_monitoring/default_rules/appsec-ssrf-attempts-http-calls
disable_edit: true
integration_id: application-security
kind: documentation
rule_category:
- Application Security
source: application-security
title: SSRF attempts on route executing network queries
type: security_rules
---

### Goal
Detect Server-Side Request Forgery (SSRF) attempts on web services performing external HTTP requests. Such security activity generally indicates that an attacker is trying to discover and exploit a potential SSRF vulnerability.

Server-Side Request Forgery (SSRF) is a web security vulnerability that allows an attacker to deceive the application and make requests to an unintended location.

In a typical SSRF attack, the attacker might cause the server to make a connection to internal-only services within an organization's infrastructure. In other cases, they may be able to force the server to connect to arbitrary external systems, potentially leaking sensitive data.

### Strategy
Monitor application security events to detect SSRF (`@appsec.type: ssrf`) on distributed traces where external HTTP requests are performed (`@_dd.appsec.enrichment.has_http_client:true`).

Generate an Application Security Signal with `MEDIUM` severity.

### Triage and response
1. Consider blocking the attacking IP(s) temporarily to prevent them to reach deeper parts of your production systems.
2. Check the `TARGETED URLS` to see if there is any suspicious call not intended by the application.
3. Investigate if the parameters are ending up in the HTTP call without sanitization. If they do, fix the code.
