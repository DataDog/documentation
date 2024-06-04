---
title: Code Security
kind: documentation
further_reading:
- link: "/security/application_security/how-appsec-works/"
  tag: "Documentation"
  text: "How Application Security Management Works"
- link: "https://www.datadoghq.com/blog/iast-datadog-code-security/"
  tag: "Blog"
  text: "Enhance application security in production with Datadog Code Security"
- link: "https://www.datadoghq.com/blog/application-code-vulnerability-detection/"
  tag: "Blog"
  text: "Find vulnerabilities in your code with Datadog Code Security"
- link: "https://www.datadoghq.com/blog/code-security-owasp-benchmark/"
  tag: "Blog"
  text: "Datadog Code Security achieves 100 percent accuracy in OWASP Benchmark by using an IAST approach"
---

<div class="alert alert-info">Code security vulnerability detection is in beta. To use it for your service, follow the <a href="/security/application_security/enabling/">Setup instructions.</a></div>

## Overview

Datadog Code Security identifies code-level vulnerabilities in your services and provides actionable insights and recommended fixes. 

For a list of supported services, see [Library Compatibility Requirements][5].

Code Security uses an Interactive Application Security Testing (IAST) approach to find vulnerabilities within your application code. IAST uses instrumentation embedded in your code like application performance monitoring (APM). 

Code Security also monitors your code’s interactions with other components of your stack, such as libraries and infrastructure. IAST enables Datadog to identify vulnerabilities using legitimate application traffic instead of relying on external tests that could require extra configuration or periodic scheduling. 

Code Security's runtime application monitoring provides an up-to-date view of your attack surface that enables you to quickly identify potential issues.

## Code-level vulnerabilities list

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

**Note:** Python is in private beta. Fill out [this form][6] to request a beta.

## Explore and manage code vulnerabilities

The [Vulnerability Explorer][1] uses real-time threat data to help you quickly understand the vulnerabilities presenting an active danger to your system, ordered by severity.

{{< img src="/security/application_security/code_security/vulnerability_explorer_code_vulnerabilities.png" alt="Code Security in the Vulnerability Explorer" style="width:100%;" >}}

To help you quickly triage, each vulnerability contains a brief description of the issue, including: 

- Services impacted.
- Vulnerability type.
- When the problem was first detected.
- The exact file and line number where the vulnerability was found.

{{< img src="/security/application_security/code_security/vulnerability-details.png" alt="Code Security vulnerability details" style="width:100%;" >}}

Each vulnerability detail includes a risk score (see screenshot below) and a severity rating: critical, high, medium, or low. 

The risk score is tailored to the specific runtime context, including factors such as where the vulnerability is deployed and whether the service is targeted by attacks currently. 

{{< img src="/security/application_security/code_security/vulnerability_prioritization.png" alt="Code Security vulnerability prioritization" style="width:100%;" >}}

## Remediation

Datadog Code Security automatically provides the information teams need to understand exactly where a vulnerability is in an application, from the affected filename down to the exact method and line number.

{{< img src="/security/application_security/code_security/code_security_remediation.png" alt="Code Security vulnerability remediation" style="width:100%;" >}}

When the [GitHub integration][7] is enabled, Code Security shows the first impacted version of a service, the commit that introduced the vulnerability, and a snippet of the vulnerable code. This information gives teams insight into where and when a vulnerability occurred and prioritize their work.

{{< img src="/security/application_security/code_security/vulnerability_code_snippet.png" alt="Code vulnerability snippet" style="width:100%;" >}}

The [Vulnerability Explorer][1] offers remediation recommendations for detected vulnerabilities. 

{{< img src="/security/application_security/code_security/remediation_recommendations.png" alt="Remediation recommendations" style="width:100%;" >}}

Recommendations enable you to change the status of a vulnerability, assign it to a team member for review, and create a Jira issue for tracking.

**Note:** To create Jira issues for vulnerabilities, you must configure the Jira integration, and have the `manage_integrations` permission. For detailed instructions, see the [Jira integration][3] documentation, as well as the [Role Based Access Control][4] documentation.

## Enabling code security vulnerability detection 

To enable code security vulnerability detection capability, set the `DD_IAST_ENABLED` environment variable to `true` in your application configuration, and restart your service.

For detailed steps, see [Enabling code security vulnerability detection][2].

### Disabling code security vulnerability detection 

To disable code security vulnerability detection capability, remove the `DD_IAST_ENABLED=true` environment variable from your application configuration, and restart your service.

If you need additional help, contact [Datadog support][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/vm/code
[2]: /security/application_security/enabling/tracing_libraries/code_security/java/
[3]: /integrations/jira/
[4]: /account_management/rbac/permissions/#integrations
[5]: /security/application_security/enabling/compatibility/
[6]: https://docs.google.com/forms/d/1wsgbd80eImvJSjXe5y5VCjAW0zzn5p3CoCLsOy0vqsk/
[7]: /integrations/github/