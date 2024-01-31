---
title: Code Security
kind: documentation
aliases:  
further_reading:
- link: "/security/application_security/how-appsec-works//"
  tag: "Documentation"
  text: "How Application Security Management Works"
---

<div class="alert alert-info">Code security vulnerabilities detection for Software Composition Analysis is in beta. To use it for your service, follow the <a href="/security/application_security/enabling/">Setup instructions.</a></div>

## Overview

Datadog Software Composition Analysis (SCA) code security vulnerability detection scans for code vulnerabilities in your ASM enabled services, as seen below in the [Vulnerability Explorer][1], sorted by the affected service and code.

{{< img src="/security/application_security/software_composition_analysis/code_security/asm_code_vulnerabilities.png" alt="Software Composition Analysis (SCA) explorer page showing code security vulnerabilities." style="width:100%;" >}}

## Manage code security vulnerabilities

Datadog is able to indicate the file name and line number where the vulnerability is located, without scanning the source code.

The code-level vulnerability types that can be found include:

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

### Disabling code-level vulnerability detection capability

To disable code-level vulnerability detection capability in Vulnerability Management, remove the `DD_IAST_ENABLED=true` environment variable from your application configuration, and restart your service.

If you need additional help, contact [Datadog support][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/vm