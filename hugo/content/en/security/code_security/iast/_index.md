---
title: Runtime Code Analysis (IAST)
disable_toc: false
aliases:
  - /security/application_security/code_security/
further_reading:
  - link: "https://www.datadoghq.com/blog/datadog-code-security/"
    tag: "Blog"
    text: "Protect the life cycle of your application code and libraries with Datadog Code Security"
  - link: https://www.datadoghq.com/blog/code-security-secret-scanning
    tag: Blog
    text: Detect and block exposed credentials with Datadog Secret Scanning
  - link: /security/code_security/iast/setup/
    tag: Documentation
    text: Set up Runtime Code Analysis (IAST)
  - link: /security/code_security/iast/security_controls/
    tag: Documentation
    text: Security Controls
  - link: /security/ticketing_integrations
    tag: Documentation
    text: Ticketing integrations
  - link: /security/automation_pipelines/
    tag: Documentation
    text: Automation Pipelines
  - link: /security/notifications/
    tag: Documentation
    text: Security Notifications
---

## Overview

Datadog Runtime Code Analysis (IAST) identifies code-level vulnerabilities in your services, using an Interactive Application Security Testing (IAST) approach to find vulnerabilities within your application code based on your Datadog application instrumentation. IAST enables Datadog to identify vulnerabilities using legitimate application traffic instead of relying on external tests that could require extra configuration or periodic scheduling. It also monitors your code's interactions with other components of your stack, such as libraries and infrastructure, providing an up-to-date view of your attack surface area.

## How it works

Runtime Code Analysis (IAST) uses the Datadog tracing library to follow user-controlled data as it flows through your application at runtime. A vulnerability is only reported when IAST can confirm that tainted input reaches a vulnerable point in the code, which keeps findings actionable.

- **Tracking data sources:** IAST observes data entering your application from external sources such as request URLs, bodies, or headers. These inputs are tagged and tracked throughout their lifecycle.
- **Analyzing data flow:** The Datadog tracing library tracks how input data moves through the application, even when it is transformed, split, or combined. This allows IAST to understand if and how the original input reaches sensitive parts of the code.
- **Identifying vulnerable points:** IAST detects code locations where user-controlled inputs are used in potentially insecure ways—for example, in SQL queries, dynamic code execution, or HTML rendering.
- **Confirming the vulnerability:** A vulnerability is only reported when IAST can confirm that tainted input actually reaches a vulnerable point in the code. This approach minimizes false positives and keeps findings actionable.

## Supported vulnerability types

Datadog IAST detects the following code-level vulnerability types across supported languages. Coverage may vary by language and framework; for framework-level support, see [Compatibility Requirements][5].

| Severity | Detection Rule                        | Java | .NET | Node.js | Python |
|----------|---------------------------------------|------|------|---------|--------|
| Critical | NoSQL Injection                       | FALSE | TRUE | TRUE | FALSE |
| Critical | SQL Injection                         | TRUE | TRUE | TRUE | TRUE |
| Critical | Server-Side Request Forgery (SSRF)    | TRUE | TRUE | TRUE | TRUE |
| Critical | Code Injection                        | FALSE | FALSE | TRUE | FALSE |
| Critical | Command Injection                     | TRUE | TRUE | TRUE | TRUE |
| High | LDAP Injection                        | TRUE | TRUE | TRUE | FALSE |
| High | Email HTML Injection                  | TRUE | TRUE | TRUE | FALSE |
| High | Hardcoded Secrets                     | TRUE | TRUE | TRUE | FALSE |
| High | Hardcoded Passwords                   | FALSE | FALSE | TRUE | FALSE |
| High | Path Traversal                        | TRUE | TRUE | TRUE | TRUE |
| High | Trust Boundary Violation              | TRUE | TRUE | FALSE | FALSE |
| High | Cross-Site Scripting (XSS)            | TRUE | TRUE | FALSE | FALSE |
| High | Untrusted Deserialization             | TRUE | FALSE | FALSE | FALSE |
| High | Unvalidated Redirect                  | TRUE | TRUE | TRUE | FALSE |
| High | XPath Injection                       | TRUE | TRUE | FALSE | FALSE |
| High | Header Injection                      | TRUE | TRUE | TRUE | TRUE |
| High | Directory Listing Leak                | TRUE | FALSE | FALSE | FALSE |
| High | Default HTML Escape Invalid           | TRUE | FALSE | FALSE | FALSE |
| High | Verb Tampering                        | TRUE | FALSE | FALSE | FALSE |
| Medium | No SameSite Cookie                   | TRUE | TRUE | TRUE | TRUE |
| Medium | Insecure Cookie                      | TRUE | TRUE | TRUE | TRUE |
| Medium | No HttpOnly Cookie                   | TRUE | TRUE | TRUE | TRUE |
| Medium | Weak Hashing                         | TRUE | TRUE | TRUE | TRUE |
| Medium | Weak Cipher                          | TRUE | TRUE | TRUE | TRUE |
| Medium | Stacktrace Leak                      | TRUE | TRUE | FALSE | FALSE |
| Medium | Reflection Injection                 | TRUE | TRUE | FALSE | FALSE |
| Medium | Insecure Authentication Protocol     | TRUE | TRUE | FALSE | FALSE |
| Medium | Hardcoded Key                        | FALSE | TRUE | FALSE | FALSE |
| Medium | Insecure JSP Layout                  | TRUE | FALSE | FALSE | FALSE |
| Low | HSTS Header Missing                   | TRUE | TRUE | TRUE | FALSE |
| Low | X-Content-Type-Options Header Missing | TRUE | TRUE | TRUE | FALSE |
| Low | Weak Randomness                       | TRUE | TRUE | TRUE | TRUE |
| Low | Admin Console Active                  | TRUE | FALSE | FALSE | FALSE |
| Low | Session Timeout                       | TRUE | FALSE | FALSE | FALSE |
| Low | Session Rewriting                     | TRUE | FALSE | FALSE | FALSE |

## Key capabilities

### Review and prioritize vulnerabilities

The [Vulnerabilities Explorer for IAST][1] provides a dedicated, vulnerability-centric view of the code-level vulnerabilities detected by IAST. All findings in this explorer correspond to vulnerabilities confirmed in services running with the Datadog tracing library and IAST enabled. Each Code Security capability has its own explorer (SAST, SCA, IAST, Secrets Scanning, and IaC), so IAST findings are not mixed with other types in this view.

Each finding includes a short description, the impacted services, the vulnerability type, the first and last detection times, and the exact file, method, and line number where the issue was confirmed. You can filter results by service, team, environment, severity, and other facets to focus on the work that matters to your group.

#### Datadog severity score

Because IAST detects vulnerabilities in your first-party code, findings do not have a public CVE or CVSS score. Datadog assigns a **base severity** for each vulnerability type (for example, Command Injection or SQL Injection), and then adjusts that base into the **Datadog Severity Score** based on runtime context and exploitability signals observed in your environment. These factors help distinguish theoretical risk from vulnerabilities that are more likely to be exploited in real-world environments. The table below describes how each factor influences the final score.

| Risk factor | How it is evaluated | Impact on the score |
|---|---|---|
| Base severity | Defined by Datadog based on the vulnerability type (for example, Command Injection, SQL Injection). | Starting point for the severity score. |
| Production runtime context | Whether the affected service is running in a production environment. | Decreased if the service is not running in production. |
| Under attack | Evidence of active attack activity targeting the service. | Decreased if there is no observed attack activity. |

### Remediate a code vulnerability

Click any finding in the [Vulnerabilities Explorer for IAST][1] to open the vulnerability side panel, which gives developers and security engineers the full context needed to fix the issue.

The panel summarizes the finding's severity, vulnerability type, due date, and runtime indicators (such as **Exposed to Attacks** and **Service In Production**), and shows where the vulnerability was confirmed in your code, when it was first and last detected, which service, environment, and team it impacts, and relevant standards references like the CWE. When the [GitHub][7], [GitLab][8], or [Azure DevOps][18] integration is enabled, Datadog also surfaces the commit that introduced the vulnerability and a snippet of the vulnerable code.

The side panel includes tabs for **Data Flow** (how tainted input reaches the vulnerable sink), **Remediation** (step-by-step guidance and example code for your framework), **Datadog Severity Breakdown** (how runtime context shaped the score), and **More Information** (related references). From the **Next Steps** panel on the right, you can change the finding's status, mute it, create a Jira or ServiceNow ticket, or jump straight to the remediation steps.

For repeatable workflows, use **Set up Automation** to apply the same actions automatically to new and existing findings that match your criteria. See [Automate triage and remediation](#automate-triage-and-remediation) for details.

### Create tickets from findings

You can create a bidirectional ticket in Jira or ServiceNow directly from any IAST finding to track and remediate issues in your existing workflows. Ticket status remains synced between Datadog and your ticketing tool, so updates made in either system stay aligned. For more information, see [Ticketing integrations][13].

To create tickets in bulk or as part of a repeatable process, use [Automation Pipelines][14] to automatically open tickets for findings that match conditions such as severity, service, environment, or team.

### Mute findings

To suppress a finding, click **Mute** in the finding details panel. This opens a workflow where you can [create an Automation Rule][15] for context-aware filtering by tag values (for example, by `service` or `env`). Muting a finding hides it from active triage and excludes it from reports.

To restore a muted finding, click **Unmute** in the details panel. You can also use the **Status** filter on the [Vulnerabilities Explorer for IAST][1] to review muted findings.

### Notify on new findings

Route new IAST findings to the right team as soon as they are detected. Datadog notifications support Slack, Microsoft Teams, email, PagerDuty, webhooks, and more, so each team can receive findings where they already work. For setup details, see [Security Notifications][16].

### Automate triage and remediation

Use [Automation Pipelines][14] to apply consistent triage and remediation actions to new and existing IAST findings, without manual intervention. From the **Set up Automation** menu in the finding side panel—or from the Automation Pipelines settings page—you can:

- [Mute findings][15] that match conditions such as service, environment, or vulnerability type.
- [Set a due date][14] based on severity and runtime context, so remediation SLAs are enforced automatically.
- [Add findings to the Security Inbox][14] to focus your team on the highest-priority work.
- [Create tickets][13] in Jira or ServiceNow for matching findings.
- [Notify][16] the right team in Slack, Microsoft Teams, email, or other channels.

Automation Pipelines apply to both newly detected findings and findings that already exist in Datadog, so policy changes are enforced retroactively across your environment.

### Code-level vulnerability context in APM

IAST enriches the information that Application Performance Monitoring (APM) already collects by flagging services where code-level vulnerabilities have been confirmed. Vulnerable services are highlighted directly in the Security view in the [APM Catalog][17], so you can pivot from a vulnerable service to its traces, logs, and infrastructure context in a single click.

## Vulnerability lifecycle

Datadog tracks IAST vulnerabilities at the **service** level, based on what the Datadog tracing libraries confirm in your running applications. A vulnerability is opened when IAST confirms a code-level vulnerability in a running service. A vulnerability is closed when Datadog no longer detects it according to the life cycle rules below.

| Product | Scope | Scenario | When a vulnerability is opened | When a vulnerability is closed |
|---|---|---|---|---|
| IAST | Service | Running service | Datadog confirms a code-level vulnerability in a running service. | After 14 days, if the vulnerability is not detected again during that period. |
| IAST | Service | New service version deployed | Datadog confirms a code-level vulnerability in a running service. | 24 hours after the vulnerability is no longer detected in the new version, in the environment where it was originally detected. |

If a previously closed vulnerability is detected again within 15 months, Datadog automatically reopens it so that recurring issues are not lost.

## Set up Runtime Code Analysis (IAST)

To enable IAST, configure the Datadog Tracing Library for your service. Detailed, language-specific instructions are available in [Set up Runtime Code Analysis (IAST)][9]. If you need additional help, contact [Datadog support][11].

For information on disabling IAST, see [Disabling Code Security][12].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/vm/code
[3]: /integrations/jira/
[4]: /account_management/rbac/permissions/#integrations
[5]: /security/code_security/iast/setup/#using-datadog-tracing-libraries
[7]: /integrations/github/
[8]: /integrations/gitlab/
[18]: /integrations/azure_devops/
[9]: /security/code_security/iast/setup/
[10]: https://app.datadoghq.com/security/configuration/code-security/setup
[11]: https://www.datadoghq.com/support/
[12]: /security/code_security/troubleshooting
[13]: /security/ticketing_integrations
[14]: /security/automation_pipelines/
[15]: /security/automation_pipelines/mute
[16]: /security/notifications/
[17]: https://app.datadoghq.com/services?lens=Security
