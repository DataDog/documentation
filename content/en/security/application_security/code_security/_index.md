---
title: Code Security
kind: documentation
further_reading:
- link: "/security/application_security/how-appsec-works/"
  tag: "Documentation"
  text: "How Application Security Management Works"
---

<div class="alert alert-info">Code security vulnerability detection for Software Composition Analysis (SCA) is in beta. To use it for your service, follow the <a href="/security/application_security/enabling/">Setup instructions.</a></div>

## Overview

Datadog Software Composition Analysis (SCA) code security vulnerability detection scans for code vulnerabilities in your ASM enabled services, as seen below in the [Vulnerability Explorer][1], sorted by the affected service and code.

{{< img src="/security/application_security/code_security/asm_code_vulnerabilities_2.png" alt="Software Composition Analysis (SCA) explorer page showing code security vulnerabilities." style="width:100%;" >}}

## Enabling code security vulnerability detection 

To enable code security vulnerability detection capability in SCA, set the `DD_IAST_ENABLED=true` environment variable in your application configuration, and restart your service.

Datadog is able to indicate the file name and line number where the vulnerability is located, without scanning the source code.

The code security vulnerability types that can be found include:

- Weak Cipher
- Weak Hash
- SQL injection
- Path traversal
- LDAP injection
- Command Injection
- Server Side Request Forgery (SSRF)
- Insecure Cookie
- Cookie without HttpOnly Flag
- Cookie without SameSite Flag
- Unvalidated Redirect

### Disabling code security vulnerability detection 

To disable code security vulnerability detection capability in SCA, remove the `DD_IAST_ENABLED=true` environment variable from your application configuration, and restart your service.

If you need additional help, contact [Datadog support][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/vm