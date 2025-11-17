---
title: Runtime Code Analysis (IAST)
disable_toc: false
aliases:
  - /security/application_security/code_security/
further_reading:
  - link: "https://www.datadoghq.com/blog/datadog-code-security/"
    tag: "Blog"
    text: "Protect the life cycle of your application code and libraries with Datadog Code Security"
---

## Overview

Datadog Runtime Code Analysis (IAST) identifies code-level vulnerabilities in your services, using an Interactive Application Security Testing (IAST) approach to find vulnerabilities within your application code based on your Datadog application instrumentation.

IAST enables Datadog to identify vulnerabilities using legitimate application traffic instead of relying on external tests that could require extra configuration or periodic scheduling. It also monitors your code’s interactions with other components of your stack, such as libraries and infrastructure, providing an up-to-date view of your attack surface area.

For a list of supported services, see the [Library Compatibility Requirements][5]. IAST detection rules support the following languages:

| Severity | Detection Rule                        | Code                        | Java | .NET | Node.js | Python |
|----------|---------------------------------------|-----------------------------|------|------|---------|--------|
| Critical | NoSQL Injection                       | NOSQL_MONGODB_INJECTION     | FALSE | TRUE | TRUE | FALSE |
| Critical | SQL Injection                         | SQL_INJECTION               | TRUE | TRUE | TRUE | TRUE |
| Critical | Server-Side Request Forgery (SSRF)    | SSRF                        | TRUE | TRUE | TRUE | TRUE |
| Critical | Code Injection                        | CODE_INJECTION              | FALSE | FALSE | TRUE | FALSE |
| Critical | Command Injection                     | COMMAND_INJECTION           | TRUE | TRUE | TRUE | TRUE |
| High | LDAP Injection                        | LDAP_INJECTION              | TRUE | TRUE | TRUE | FALSE |
| High | Email HTML Injection | EMAIL_HTML_INJECTION                            | TRUE  | TRUE  | TRUE    | FALSE  |
| High | Hardcoded Secrets                     | HARDCODED_SECRET            | TRUE | TRUE | TRUE | FALSE |
| High | Hardcoded Passwords                   | HARDCODED_PASSWORD          | FALSE | FALSE | TRUE | FALSE |
| High | Path Traversal                        | PATH_TRAVERSAL              | TRUE | TRUE | TRUE | TRUE |
| High | Trust Boundary Violation              | TRUST_BOUNDARY_VIOLATION    | TRUE | TRUE | FALSE | FALSE |
| High | Cross-Site Scripting (XSS)            | XSS                         | TRUE | TRUE | FALSE | FALSE |
| High | Untrusted Deserialization             | UNTRUSTED_DESERIALIZATION   | TRUE | FALSE | FALSE | FALSE |
| High | Unvalidated Redirect                  | UNVALIDATED_REDIRECT        | TRUE | TRUE | TRUE | FALSE |
| High | XPath Injection                       | XPATH_INJECTION             | TRUE | TRUE | FALSE | FALSE |
| High | Header Injection                      | HEADER_INJECTION            | TRUE | TRUE | TRUE | TRUE |
| High | Directory Listing Leak                | DIRECTORY_LISTING_LEAK      | TRUE | FALSE | FALSE | FALSE |
| High | Default HTML Escape Invalid           | DEFAULT_HTML_ESCAPE_INVALID | TRUE | FALSE | FALSE | FALSE |
| High | Verb Tampering                        | VERB_TAMPERING              | TRUE | FALSE | FALSE | FALSE |
| Medium | No SameSite Cookie                    | NO_SAMESITE_COOKIE          | TRUE | TRUE | TRUE | TRUE |
| Medium | Insecure Cookie                       | INSECURE_COOKIE             | TRUE | TRUE | TRUE | TRUE |
| Medium | No HttpOnly Cookie                    | NO_HTTPONLY_COOKIE          | TRUE | TRUE | TRUE | TRUE |
| Medium | Weak Hashing                          | WEAK_HASH                   | TRUE | TRUE | TRUE | TRUE |
| Medium | Weak Cipher                           | WEAK_CIPHER                 | TRUE | TRUE | TRUE | TRUE |
| Medium | Stacktrace Leak                       | STACKTRACE_LEAK             | TRUE | TRUE | FALSE | FALSE |
| Medium | Reflection Injection                  | REFLECTION_INJECTION        | TRUE | TRUE | FALSE | FALSE |
| Medium | Insecure Authentication Protocol      | INSECURE_AUTH_PROTOCOL      | TRUE | TRUE | FALSE | FALSE |
| Medium | Hardcoded Key                         | HARDCODED_KEY               | FALSE | TRUE | FALSE | FALSE |
| Medium | Insecure JSP Layout                   | INSECURE_JSP_LAYOUT         | TRUE | FALSE | FALSE | FALSE |
| Low | HSTS Header Missing                   | HSTS_HEADER_MISSING         | TRUE | TRUE | TRUE | FALSE |
| Low | X-Content-Type-Options Header Missing | XCONTENTTYPE_HEADER_MISSING | TRUE | TRUE | TRUE | FALSE |
| Low | Weak Randomness                       | WEAK_RANDOMNESS             | TRUE | TRUE | TRUE | TRUE |
| Low | Admin Console Active                  | ADMIN_CONSOLE_ACTIVE        | TRUE | FALSE | FALSE | FALSE |
| Low | Session Timeout                       | SESSION_TIMEOUT             | TRUE | FALSE | FALSE | FALSE |
| Low | Session Rewriting                     | SESSION_REWRITING           | TRUE | FALSE | FALSE | FALSE |

## How IAST detects vulnerabilities
Datadog Runtime Code Analysis (IAST) utilizes the same tracing libraries as Datadog APM, enabling it to monitor live application traffic and detect code-level vulnerabilities in real time. It follows this process:

- **Tracking data sources:**: IAST observes data entering your application from external sources such as request URLs, bodies, or headers. These inputs are tagged and monitored throughout their lifecycle.
- **Analyzing data flow**: The Datadog tracing library tracks how the input data moves through the application—even if it's transformed, split, or combined. This allows IAST to understand if and how the original input reaches sensitive parts of the code.
- **Identifying vulnerable points**: IAST detects code locations where user-controlled inputs are used in potentially insecure ways—for example, in SQL queries, dynamic code execution, or HTML rendering.
- **Confirming the vulnerability**: A vulnerability is only reported when IAST can confirm that tainted input reaches a vulnerable point in the code. This approach minimizes false positives and ensures that findings are actionable.

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

## Vulnerability lifecycle

Datadog automatically manages the lifecycle of vulnerabilities detected by IAST to ensure findings remain accurate and relevant over time.

- **Automatic closure:**
Vulnerabilities detected by IAST are automatically closed by Datadog when they haven't been observed for **14 days** since their last detection.

- **Service version updates:**
If a new version of the service is deployed in the environment where the vulnerability was originally detected, the vulnerability is automatically closed **24 hours** after it is no longer seen in that new version.

- **Reopening logic:**
If a vulnerability that was previously closed is detected again within the following **15 months**, Datadog automatically reopens it.

## Enable Runtime Code Analysis (IAST)

To enable IAST, configure the [Datadog Tracing Library][9]. Detailed instructions for both methods can be found in the [**Security > Code Security > Settings**][10] section.

If you need additional help, contact [Datadog support][11].

## Disable Code Security
For information on disabling IAST, see [Disabling Code Security][12].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

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
