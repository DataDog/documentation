---
title: Code Security
kind: documentation
further_reading:
- link: "/security/application_security/how-appsec-works/"
  tag: "Documentation"
  text: "How Application Security Management Works"
---

<div class="alert alert-info">Code security vulnerability detection is in beta. To use it for your service, follow the <a href="/security/application_security/enabling/">Setup instructions.</a></div>

## Overview

Datadog code security vulnerability detection scans for code vulnerabilities in your ASM enabled services, as seen below in the [Vulnerability Explorer][1], sorted by the affected service and code.

{{< img src="/security/application_security/code_security/asm_code_vulnerabilities_2.png" alt="Software Composition Analysis (SCA) explorer page showing code security vulnerabilities." style="width:100%;" >}}

## Enabling code security vulnerability detection 

To enable code security vulnerability detection capability, set the `DD_IAST_ENABLED` environment variable to `true` in your application configuration, and restart your service.

Datadog is able to indicate the filename and line number where the vulnerability is located, without scanning the source code.

The available code security vulnerability types include the following:

- Admin console active
- Command Injection
- Default HTML escape invalid
- Directory listing leak
- Hardcoded Password
- Hardcoded secrets
- Header injection
- HSTS header missing
- Insecure auth protocol
- Insecure Cookie
- Insecure JSP layout
- LDAP injection
- MongoDB injection
- Cookie without HttpOnly flag
- Cookie without SameSite flag
- Path traversal
- Reflection injection
- Server Side Request Forgery (SSRF)
- Session timeout
- Session rewriting
- SQL injection
- Stack trace leak
- Trust boundary violation
- Unvalidated Redirect
- Verb tampering
- Weak cipher
- Weak hash
- Weak randomness
- X-Content-Type-Options header missing
- XPath injection
- XSS

### Disabling code security vulnerability detection 

To disable code security vulnerability detection capability, remove the `DD_IAST_ENABLED=true` environment variable from your application configuration, and restart your service.

If you need additional help, contact [Datadog support][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/vm