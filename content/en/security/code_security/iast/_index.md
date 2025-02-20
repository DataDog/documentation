---
title: Runtime Code Analysis (IAST)
disable_toc: false
aliases:
- /security/application_security/code_security/
---

## Overview

Datadog Runtime Code Analysis (IAST) identifies code-level vulnerabilities in your services, using an Interactive Application Security Testing (IAST) approach to find vulnerabilities within your application code based on your Datadog application instrumentation.

IAST enables Datadog to identify vulnerabilities using legitimate application traffic instead of relying on external tests that could require extra configuration or periodic scheduling. It also monitors your code’s interactions with other components of your stack, such as libraries and infrastructure, providing an up-to-date view of your attack surface area.

For a list of supported services, see the [Library Compatibility Requirements][5]. IAST detection rules support the following languages:

| Severity | Detection Rule                        | Java  | .NET  | Node.js | Python |
| -------- | ------------------------------------- | ----- | ----- | ------- |--------|
| Critical | NoSQL Injection                       | FALSE | TRUE  | TRUE    | FALSE  |
| Critical | SQL Injection                         | TRUE  | TRUE  | TRUE    | TRUE   |
| Critical | Server-Side Request Forgery (SSRF)    | TRUE  | TRUE  | TRUE    | TRUE   |
| Critical | Code Injection                        | FALSE | FALSE | TRUE    | FALSE  |
| Critical | Command Injection                     | TRUE  | TRUE  | TRUE    | TRUE   |
| High     | LDAP Injection                        | TRUE  | TRUE  | TRUE    | FALSE  |
| High     | Hardcoded Secrets                     | TRUE  | TRUE  | TRUE    | FALSE  |
| High     | Hardcoded Passwords                   | FALSE | FALSE | TRUE    | FALSE  |
| High     | Path Traversal                        | TRUE  | TRUE  | TRUE    | TRUE   |
| High     | Trust Boundary Violation              | TRUE  | TRUE  | FALSE   | FALSE  |
| High     | Cross-Site Scripting (XSS)            | TRUE  | TRUE  | FALSE   | FALSE  |
| High     | Untrusted Deserialization             | TRUE  | FALSE | FALSE   | FALSE  |
| High     | Unvalidated Redirect                  | TRUE  | TRUE  | TRUE    | FALSE  |
| High     | XPath Injection                       | TRUE  | TRUE  | FALSE   | FALSE  |
| High     | Header Injection                      | TRUE  | TRUE  | TRUE    | TRUE   |
| High     | Directory Listing Leak                | TRUE  | FALSE | FALSE   | FALSE  |
| High     | Default HTML Escape Invalid           | TRUE  | FALSE | FALSE   | FALSE  |
| High     | Verb Tampering                        | TRUE  | FALSE | FALSE   | FALSE  |
| Medium   | No SameSite Cookie                    | TRUE  | TRUE  | TRUE    | TRUE   |
| Medium   | Insecure Cookie                       | TRUE  | TRUE  | TRUE    | TRUE   |
| Medium   | No HttpOnly Cookie                    | TRUE  | TRUE  | TRUE    | TRUE   |
| Medium   | Weak Hashing                          | TRUE  | TRUE  | TRUE    | TRUE   |
| Medium   | Weak Cipher                           | TRUE  | TRUE  | TRUE    | TRUE   |
| Medium   | Stacktrace Leak                       | TRUE  | TRUE  | FALSE   | FALSE  |
| Medium   | Reflection Injection                  | TRUE  | TRUE  | FALSE   | FALSE  |
| Medium   | Insecure Authentication Protocol      | TRUE  | TRUE  | FALSE   | FALSE  |
| Medium   | Hardcoded Key                         | FALSE | TRUE  | FALSE   | FALSE  |
| Medium   | Insecure JSP Layout                   | TRUE  | FALSE | FALSE   | FALSE  |
| Low      | HSTS Header Missing                   | TRUE  | TRUE  | TRUE    | FALSE  |
| Low      | X-Content-Type-Options Header Missing | TRUE  | TRUE  | TRUE    | FALSE  |
| Low      | Weak Randomness                       | TRUE  | TRUE  | TRUE    | TRUE   |
| Low      | Admin Console Active                  | TRUE  | FALSE | FALSE   | FALSE  |
| Low      | Session Timeout                       | TRUE  | FALSE | FALSE   | FALSE  |
| Low      | Session Rewriting                     | TRUE  | FALSE | FALSE   | FALSE  |

## Explore and manage code vulnerabilities

The [Vulnerability Explorer][1] uses real-time threat data to help you understand vulnerabilities endangering your system. Vulnerabilities are ordered by severity.

{{< img src="/code_security/vulnerability_explorer_code_vulnerabilities.png" alt="Code Security in the Vulnerability Explorer" style="width:100%;" >}}

To triage vulnerabilities, each vulnerability contains a brief description of the issue, including:

- Impacted services.
- Vulnerability type.
- First detection.
- The exact file and line number where the vulnerability was found.

{{< img src="/code_security/vulnerability-details.png" alt="Code Security vulnerability details" style="width:100%;" >}}

Each vulnerability detail includes a risk score (see screenshot below) and a severity rating: critical, high, medium, or low.

The risk score is tailored to the specific runtime context, including factors such as where the vulnerability is deployed and whether the service is targeted by active attacks.

{{< img src="/code_security/vulnerability_prioritization.png" alt="Code Security vulnerability prioritization" style="width:100%;" >}}

## Remediate a code vulnerability 

Datadog Code Security automatically provides the information teams need to identify where a vulnerability is in an application, from the affected filename down to the exact method and line number.

{{< img src="/code_security/code_security_remediation.png" alt="Code Security vulnerability remediation" style="width:100%;" >}}

When the [GitHub integration][7] is enabled, Code Security shows the first impacted version of a service, the commit that introduced the vulnerability, and a snippet of the vulnerable code. This information gives teams insight into where and when a vulnerability occurred and helps to prioritize their work.

{{< img src="/code_security/vulnerability_code_snippet.png" alt="Code vulnerability snippet" style="width:100%;" >}}

Detailed remediation steps are provided for each detected vulnerability.

{{< img src="/code_security/remediation_recommendations.png" alt="Remediation recommendations" style="width:100%;" >}}

Recommendations enable you to change the status of a vulnerability, assign it to a team member for review, and create a Jira issue for tracking.

{{< img src="/code_security/vulnerability_jira_ticket.png" alt="creating a Jira ticket from a vulnerability" style="width:100%;" >}}

**Note:** To create Jira issues for vulnerabilities, you must configure the Jira integration, and have the `manage_integrations` permission. For detailed instructions, see the [Jira integration][3] documentation, as well as the [Role Based Access Control][4] documentation.

## Enable Runtime Code Analysis (IAST)

To enable IAST, configure the [Datadog Tracing Library][9]. Detailed instructions for both methods can be found in the [**Security > Code Security > Settings**][10] section.

If you need additional help, contact [Datadog support][11].

## Disable Code Security
For information on disabling IAST, see [Disabling Code Security][12].


[1]: https://app.datadoghq.com/security/appsec/vm/code
[2]: /security/code_security/iast/setup/java/
[3]: /integrations/jira/
[4]: /account_management/rbac/permissions/#integrations
[5]: /security/code_security/iast/setup/#using-datadog-tracing-libraries
[6]: https://docs.google.com/forms/d/1wsgbd80eImvJSjXe5y5VCjAW0zzn5p3CoCLsOy0vqsk/
[7]: /integrations/github/
[9]: /security/code_security/iast/setup/
[10]: https://app.datadoghq.com/security/configuration/code-security/setup
[11]: https://www.datadoghq.com/support/
[12]: /security/code_security/troubleshooting
