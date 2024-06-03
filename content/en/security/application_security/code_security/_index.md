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

Datadog Code Security performs vulnerability detection scans for code vulnerabilities in your ASM enabled services. Code security uses detection rules to identify code vulnerabilities.

You can see the detected code vulnerabilities in the [Vulnerability Explorer][1], sorted by service and code.

{{< img src="/security/application_security/code_security/asm_code_vulnerabilities_2.png" alt="Software Composition Analysis (SCA) explorer page showing code security vulnerabilities." style="width:100%;" >}}

## Supported code detection rules

The Code Security rules used to detect code vulnerabilities have the following language support. 

| Severity | Detection Rule                        | Java  | .NET  | Node.js |
| -------- | ------------------------------------- | ----- | ----- | ------- |
| Critical | NoSQL Injection                       | FALSE | TRUE  | TRUE    |
| Critical | SQL Injection                         | TRUE  | TRUE  | TRUE    |
| Critical | Server-Side Request Forgery (SSRF)    | TRUE  | TRUE  | TRUE    |
| Critical | Command Injection                     | TRUE  | TRUE  | TRUE    |
| High     | LDAP Injection                        | TRUE  | TRUE  | TRUE    |
| High     | Hardcoded Secrets                     | TRUE  | TRUE  | TRUE    |
| High     | Hardcoded Passwords                   | FALSE | FALSE | TRUE    |
| High     | Path Traversal                        | TRUE  | TRUE  | TRUE    |
| High     | Trust Boundary Violation              | TRUE  | TRUE  | FALSE   |
| High     | Cross-Site Scripting (XSS)            | TRUE  | TRUE  | FALSE   |
| High     | Unvalidated Redirect                  | TRUE  | TRUE  | TRUE    |
| High     | XPath Injection                       | TRUE  | TRUE  | FALSE   |
| High     | Header Injection                      | TRUE  | TRUE  | TRUE    |
| High     | Directory Listing Leak                | TRUE  | FALSE | FALSE   |
| High     | Default HTML Escape Invalid           | TRUE  | FALSE | FALSE   |
| High     | Verb Tampering                        | TRUE  | FALSE | FALSE   |
| Medium   | No SameSite Cookie                    | TRUE  | TRUE  | TRUE    |
| Medium   | Insecure Cookie                       | TRUE  | TRUE  | TRUE    |
| Medium   | No HttpOnly Cookie                    | TRUE  | TRUE  | TRUE    |
| Medium   | Weak Hashing                          | TRUE  | TRUE  | TRUE    |
| Medium   | Weak Cipher                           | TRUE  | TRUE  | TRUE    |
| Medium   | Stacktrace Leak                       | TRUE  | TRUE  | FALSE   |
| Medium   | Reflection Injection                  | TRUE  | TRUE  | FALSE   |
| Medium   | Insecure Authentication Protocol      | TRUE  | TRUE  | FALSE   |
| Medium   | Hardcoded Key                         | FALSE | TRUE  | FALSE   |
| Medium   | Insecure JSP Layout                   | TRUE  | FALSE | FALSE   |
| Low      | HSTS Header Missing                   | TRUE  | TRUE  | TRUE    |
| Low      | X-Content-Type-Options Header Missing | TRUE  | TRUE  | TRUE    |
| Low      | Weak Randomness                       | TRUE  | TRUE  | TRUE    |
| Low      | Admin Console Active                  | TRUE  | FALSE | FALSE   |
| Low      | Session Timeout                       | TRUE  | FALSE | FALSE   |
| Low      | Session Rewriting                     | TRUE  | FALSE | FALSE   |

## Enabling code security vulnerability detection 

To enable code security vulnerability detection capability, set the `DD_IAST_ENABLED` environment variable to `true` in your application configuration, and restart your service.

For detailed steps, see [Enabling code security vulnerability detection][2].

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

## Explore and manage code vulnerabilities

**Code Vulnerabilities** in the [Vulnerability Explorer][1] shows a complete list of the code vulnerabilities detected by Datadog Code Security.

Datadog Code Security leverages two techniques to analyze your services:

- Static code analysis in your code repositories (static point of view)
- Runtime analysis in your deployed services (runtime point of view)

By combining both techniques, Code Security monitors code end-to-end, from the code repository commit (static point of view), to the applications running in production (runtime point of view).

To switch to the code repository commit point of view, select **Static**. The static view shows vulnerabilities from the source code in your repositories.

To switch to the real-time point of view for the applications already running, select **Runtime**. The runtime view is the live view of the services monitored by Datadog.

You can also use the following panels to sort code vulnerabilites:

- **High Risk Vulnerabilites**
  - Query: `status:(Open OR "In progress") severity:(Critical OR High) exploit_available:true service_under_attack:true service_in_production:true`
- **Overdue Vulnerabilites**
  - Query: `status:(Open OR "In progress") severity:(Critical OR High) exposureTime:>30`
- **Critical/High Unique Vulnerabilites**
  - Query: `status:(Open OR "In progress") severity:(Critical OR High)`

## Remediation

The [Vulnerability Explorer][1] offers remediation recommendations for detected code vulnerabilities. Recommendations enable you to change the status of a vulnerability, assign it to a team member for review, and create a Jira issue for tracking. They also include a collection of links and references to websites or information sources to help you understand the context behind each code vulnerability.

**Note:** To create Jira issues for vulnerabilities, you must configure the Jira integration, and have the `manage_integrations` permission. For detailed instructions, see the [Jira integration][3] documentation, as well as the [Role Based Access Control][4] documentation.

## Configure Code Security

To scan code vulnerabilities in your services, navigate to [Security -> Application Security -> Settings][12].

In **Code Security**, follow the steps for your programming language.

For detailed steps, see [Enabling code security vulnerability detection][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/vm/code
[2]: /security/application_security/enabling/tracing_libraries/code_security/java/
[3]: /integrations/jira/
[4]: /account_management/rbac/permissions/#integrations