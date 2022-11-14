---
aliases:
- let-1rp-8fi
- /security_monitoring/default_rules/let-1rp-8fi
- /security_monitoring/default_rules/appsec-ognl-attempts
disable_edit: true
integration_id: application-security
kind: documentation
rule_category:
- Application Security
security: attack
source: application-security
title: OGNL injection attempts on route processing OGNL expressions
type: security_rules
---

### Goal
Detect Java code injections attempts on web services executing OGNL expressions. Such security activity generally indicates that an attacker is trying to discover and exploit a potential OGNL code injection which can turn into a Remote Code Execution.

OGNL is an expression language that lets an application execute dynamic code in the application context. The expression starts as a string and can be made to execute. Upon execution, it is able to read or set access to Java objects available in its context, or call methods. OGNL injection is powerful and can achieve total takeover of an application.  

### Strategy
Monitor application security events to detect OGNL payloads (`@appsec.rule_id:(dog-000-002 OR dog-000-003)`) or more generic Java code injection payloads (`@appsec.type:java_code_injection`) on distributed traces where OGNL expressions are compiled (`@_dd.appsec.enrichment.has_ognl:true`).

Generate an Application Security Signal with `MEDIUM` severity if the payload is OGNL specific, `LOW` if generic.

### Triage and response
1. Consider blocking the attacking IPs temporarily to prevent them from reaching deeper parts of your production systems.
2. Investigate the context in which OGNL queries are being executed. Check if any user parameter is used to craft the expression.
