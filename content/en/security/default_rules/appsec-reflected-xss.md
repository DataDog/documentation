---
aliases:
- s47-2lt-xv9
- /security_monitoring/default_rules/s47-2lt-xv9
- /security_monitoring/default_rules/appsec-reflected-xss
disable_edit: true
integration_id: application-security
kind: documentation
rule_category:
- Application Security
source: application-security
title: Reflected XSS attempts on routes returning HTML
type: security_rules
---

### Goal
Detect Reflected Cross-Site Scripting (XSS) attempts on web services returning HTML. Such security activity generally indicates that an attacker is trying to exploit a potential XSS vulnerability or steal sensitive data.

### Strategy
Monitor reflected cross-site scripting attempts (`@appsec.type: xss`) on services returning HTML (`@http.response.headers.content-type:text\/html*`).  
Excludes requests that use the `HEAD` method (`-@http.method:HEAD`) because they don't return a body and are therefore not vulnerable.

Generate an Application Security Signal with `LOW` severity.

### Triage and response
1. Consider blocking the attacking IP(s) temporarily to prevent them to reach deeper parts of your production systems.
3. Investigate if the parameters are ending up in the HTML body without sanitization. If they do, fix the code.
