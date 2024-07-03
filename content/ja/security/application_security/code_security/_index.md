---
further_reading:
- link: /security/application_security/how-appsec-works/
  tag: Documentation
  text: How Application Security Management Works
- link: https://www.datadoghq.com/blog/iast-datadog-code-security/
  tag: ブログ
  text: Enhance application security in production with Datadog Code Security
- link: https://www.datadoghq.com/blog/application-code-vulnerability-detection/
  tag: ブログ
  text: Find vulnerabilities in your code with Datadog Code Security
- link: https://www.datadoghq.com/blog/code-security-owasp-benchmark/
  tag: ブログ
  text: Datadog Code Security achieves 100 percent accuracy in OWASP Benchmark by
    using an IAST approach
title: Code Security
---

## 概要

Datadog Code Security identifies code-level vulnerabilities in your services and provides actionable insights and recommended fixes. 

For a list of supported services, see [Library Compatibility Requirements][5].

Code Security uses an Interactive Application Security Testing (IAST) approach to find vulnerabilities within your application code. IAST uses instrumentation embedded in your code like application performance monitoring (APM). 

Code Security also monitors your code’s interactions with other components of your stack, such as libraries and infrastructure. 

IAST enables Datadog to identify vulnerabilities using legitimate application traffic instead of relying on external tests that could require extra configuration or periodic scheduling. 

Code Security's runtime application monitoring provides an up-to-date view of your attack surface that enables you to quickly identify potential issues.

## Code-level vulnerabilities list

The Code Security detection rules support the following languages. 

| 重大度 | Detection Rule                        | Java  | .NET  | Node.js |
| -------- | ------------------------------------- | ----- | ----- | ------- |
| クリティカル | NoSQL Injection                       | FALSE | TRUE  | TRUE    |
| クリティカル | SQL インジェクション                         | TRUE  | TRUE  | TRUE    |
| クリティカル | Server-Side Request Forgery (SSRF)    | TRUE  | TRUE  | TRUE    |
| クリティカル | コマンドインジェクション                     | TRUE  | TRUE  | TRUE    |
| 大     | LDAP Injection                        | TRUE  | TRUE  | TRUE    |
| 大     | Hardcoded Secrets                     | TRUE  | TRUE  | TRUE    |
| 大     | Hardcoded Passwords                   | FALSE | FALSE | TRUE    |
| 大     | Path Traversal                        | TRUE  | TRUE  | TRUE    |
| 大     | Trust Boundary Violation              | TRUE  | TRUE  | FALSE   |
| 大     | クロスサイトスクリプティング (XSS)            | TRUE  | TRUE  | FALSE   |
| 大     | 無効なリダイレクト                  | TRUE  | TRUE  | TRUE    |
| 大     | XPath Injection                       | TRUE  | TRUE  | FALSE   |
| 大     | Header Injection                      | TRUE  | TRUE  | TRUE    |
| 大     | Directory Listing Leak                | TRUE  | FALSE | FALSE   |
| 大     | Default HTML Escape Invalid           | TRUE  | FALSE | FALSE   |
| 大     | Verb Tampering                        | TRUE  | FALSE | FALSE   |
| 中   | No SameSite Cookie                    | TRUE  | TRUE  | TRUE    |
| 中   | 安全でないクッキー                       | TRUE  | TRUE  | TRUE    |
| 中   | No HttpOnly Cookie                    | TRUE  | TRUE  | TRUE    |
| 中   | Weak Hashing                          | TRUE  | TRUE  | TRUE    |
| 中   | 弱い暗号                           | TRUE  | TRUE  | TRUE    |
| 中   | Stacktrace Leak                       | TRUE  | TRUE  | FALSE   |
| 中   | Reflection Injection                  | TRUE  | TRUE  | FALSE   |
| 中   | Insecure Authentication Protocol      | TRUE  | TRUE  | FALSE   |
| 中   | Hardcoded Key                         | FALSE | TRUE  | FALSE   |
| 中   | Insecure JSP Layout                   | TRUE  | FALSE | FALSE   |
| 小      | HSTS Header Missing                   | TRUE  | TRUE  | TRUE    |
| 小      | X-Content-Type-Options Header Missing | TRUE  | TRUE  | TRUE    |
| 小      | Weak Randomness                       | TRUE  | TRUE  | TRUE    |
| 小      | Admin Console Active                  | TRUE  | FALSE | FALSE   |
| 小      | Session Timeout                       | TRUE  | FALSE | FALSE   |
| 小      | Session Rewriting                     | TRUE  | FALSE | FALSE   |

**Note:** Python is in private beta. Fill out [this form][6] to request a beta.

## Explore and manage code vulnerabilities

The [Vulnerability Explorer][1] uses real-time threat data to help you understand vulnerabilities endangering your system. Vulnerabilities are ordered by severity.

{{< img src="/security/application_security/code_security/vulnerability_explorer_code_vulnerabilities.png" alt="Code Security in the Vulnerability Explorer" style="width:100%;" >}}

To triage vulnerabilities, each vulnerability contains a brief description of the issue, including: 

- Impacted services.
- Vulnerability type.
- First detection.
- The exact file and line number where the vulnerability was found.

{{< img src="/security/application_security/code_security/vulnerability-details.png" alt="Code Security vulnerability details" style="width:100%;" >}}

Each vulnerability detail includes a risk score (see screenshot below) and a severity rating: critical, high, medium, or low. 

The risk score is tailored to the specific runtime context, including factors such as where the vulnerability is deployed and whether the service is targeted by active attacks. 

{{< img src="/security/application_security/code_security/vulnerability_prioritization.png" alt="Code Security vulnerability prioritization" style="width:100%;" >}}

## 修復

Datadog Code Security automatically provides the information teams need to identify where a vulnerability is in an application, from the affected filename down to the exact method and line number.

{{< img src="/security/application_security/code_security/code_security_remediation.png" alt="Code Security vulnerability remediation" style="width:100%;" >}}

When the [GitHub integration][7] is enabled, Code Security shows the first impacted version of a service, the commit that introduced the vulnerability, and a snippet of the vulnerable code. This information gives teams insight into where and when a vulnerability occurred and helps to prioritize their work.

{{< img src="/security/application_security/code_security/vulnerability_code_snippet.png" alt="Code vulnerability snippet" style="width:100%;" >}}

Detailed remediation steps are provided for each detected vulnerability.

{{< img src="/security/application_security/code_security/remediation_recommendations.png" alt="Remediation recommendations" style="width:100%;" >}}

Recommendations enable you to change the status of a vulnerability, assign it to a team member for review, and create a Jira issue for tracking.

{{< img src="/security/application_security/code_security/vulnerability_jira_ticket.png" alt="creating a Jira ticket from a vulnerability" style="width:100%;" >}}

**Note:** To create Jira issues for vulnerabilities, you must configure the Jira integration, and have the `manage_integrations` permission. For detailed instructions, see the [Jira integration][3] documentation, as well as the [Role Based Access Control][4] documentation.

## Enabling Code Security 

To enable Code Security, you can use [Single Step Instrumentation][8] or configure the [Datadog Tracing Library][9]. Detailed instructions for both methods can be found in the [**Security > Application Security > Settings**][10] section.

If you need additional help, contact [Datadog support][11].

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/vm/code
[2]: /ja/security/application_security/enabling/tracing_libraries/code_security/java/
[3]: /ja/integrations/jira/
[4]: /ja/account_management/rbac/permissions/#integrations
[5]: /ja/security/application_security/enabling/compatibility/
[6]: https://docs.google.com/forms/d/1wsgbd80eImvJSjXe5y5VCjAW0zzn5p3CoCLsOy0vqsk/
[7]: /ja/integrations/github/
[8]: /ja/security/application_security/enabling/single_step/code_security/?tab=linuxhostorvm
[9]: /ja/security/application_security/enabling/tracing_libraries/code_security/
[10]: https://app.datadoghq.com/security/configuration/asm/setup
[11]: https://www.datadoghq.com/support/