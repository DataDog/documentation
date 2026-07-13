---
title: Severity Modifier Rules
products:
  - name: Cloud Security
    url: /security/cloud_security_management/
    icon: cloud-security-management
  - name: Code Security
    url: /security/code_security/
    icon: security-code-security
  - name: App and API Protection
    url: /security/application_security/
    icon: app-sec
  - name: Workload Protection
    url: /security/workload_protection/
    icon: security-workload-security
further_reading:
  - link: "/security/automation_pipelines"
    tag: "Documentation"
    text: "Automation Pipelines"
---

{{< product-availability >}}

Configure severity modifier rules to adjust finding severities to reflect your organization's business context. For example, downgrade findings on isolated environments to reduce noise, or upgrade findings on databases containing personally identifiable information (PII) so they receive immediate attention.

## Create a severity modifier rule

1. In Datadog, go to **Security** > **Settings** > [**Findings Automation**][2]. Click **Add a New Rule**, then select **Modify Severity Level**. The Create a New Rule page opens.
1. Under **Rule name**, enter a descriptive name for the rule; for example, "Increase severity for services accessing PII databases".
1. Add your rule criteria into the following fields:
    - **Any of these types**: The types of findings that the rule should check for. Available types include:
      - Runtime Code Vulnerability
      - Static Code Vulnerability
      - Library Vulnerability
      - Secret
      - Infrastructure as Code
      - Container Image Vulnerability
      - Host Vulnerability
      - Misconfiguration
      - Attack Path
      - Identity Risk
      - API Security
      - Workload Activity
    - **Any of these tags or attributes**: The resource tags or attributes that must match for the rule to apply.
1. Optionally, click **Add Severity** to filter findings by severity level. The rule matches against each finding's Datadog-adjusted severity, before any user-defined adjustments.
1. Define the severity modification action:
    - **Set to a specific level**: Sets matching findings to a fixed severity. Choose from **Info / None**, **Low**, **Medium**, **High**, or **Critical**.
      <div class="alert alert-info"><strong>Info / None</strong> is only valid for some finding types; see <a href="#severity-floors-by-finding-type">Severity floors by finding type</a>.</div>
    - **Shift up or down one level**: Increases or decreases the severity of matching findings by one level. See [Severity floors by finding type](#severity-floors-by-finding-type) for the lowest severity a finding type can shift down to, and [Evaluation order](#evaluation-order) for what happens when a finding is already at that bound.
1. Optionally, enter a **Description** explaining why the rule applies. This text appears in the severity breakdown panel when a user views a modified finding.
1. Click **Save**. The rule applies to new findings immediately and starts checking existing findings within the next hour.

**Note**: You cannot use `@severity` or `@severity_details.user_adjusted` in the rule query. Severity modifier rules are evaluated against the Datadog-adjusted severity (`@severity_details.adjusted.value`), not the `@severity` value stored in the finding.

## Evaluation order

Severity modifier rules are the first step in the automation pipeline and run before mute, due date, inbox, and ticket creation rules. Within severity modifier rules, Datadog uses a first-match policy: findings are evaluated against your rules in order, and the first matching rule is applied. No further severity modifier rules are evaluated for that finding.

A rule counts as a match only if applying its action would change the finding's severity. If the action would leave the severity unchanged (for example, a shift action that has already reached a severity bound, or a set action that targets the finding's current severity), the rule does not match, and Datadog continues evaluating subsequent severity modifier rules for that finding.

Because severity modifier rules run first, all downstream automation rules—including mute rules—see the modified severity when they are evaluated.

## Identify modified findings

Findings affected by a severity modifier rule display a visual indicator in explorer list views and in the finding's side panel header. Hovering over the indicator shows the automation rule responsible for the change:

{{< img src="security/automation_pipelines/severity_pill_popover.png" alt="A findings explorer item that displays a severity pill with a modifier indicator. A pop-over provides more information about the automation rule responsible for adjusting the finding's severity" style="width:65%;" >}}

For findings that have a CVSS score (Container Image Vulnerability, Host Vulnerability, Library Vulnerability, and Runtime Code Vulnerability), the side panel severity section also includes a breakdown showing:
- The original severity level, CVSS score, and CVSS vector before modification.
- The name of the automation rule that triggered, with a direct link to the rule.
- The resulting severity level and adjusted CVSS score.

{{< img src="security/automation_pipelines/severity_breakdown.png" alt="A finding side panel showing the severity breakdown, with the original severity, CVSS score, and CVSS vector; the automation rule that triggered the change; and the resulting severity level and adjusted CVSS score" style="width:100%;" >}}

## Severity floors by finding type

Not all finding types use the same severity scale. The following table shows the lowest severity available for each finding type:

| Finding type | Lowest severity |
|---|---|
| API Security | Info |
| Attack Path | Info |
| Identity Risk | Info |
| Misconfiguration | Info |
| Workload Activity | Info |
| Container Image Vulnerability | None |
| Host Vulnerability | None |
| Library Vulnerability | None |
| Infrastructure as Code | Low |
| Runtime Code Vulnerability | Low |
| Secret | Low |
| Static Code Vulnerability | Low |

**Info / None** is not available for finding types that use **Low** as their lowest severity. Including such finding types in the rule and selecting **Info / None** results in a validation error.

## Findings with Unknown severity

Severity modifier rules handle findings with an **Unknown** severity as follows:

- **Shift action**: The rule does not match findings with **Unknown** severity. Because the rule does not match, subsequent severity modifier rules can still be evaluated for that finding.
- **Set action**: If the **Unknown** severity is included in the rule's severity selector, the rule matches and replaces **Unknown** with the specified target severity. You cannot set a finding's severity to **Unknown** using a severity modifier rule.

## Vulnerability findings and CVSS scores

For vulnerability findings that have a Datadog-adjusted CVSS score, a severity modifier also updates the adjusted score stored in `@severity_details.user_adjusted`. The updated score is set to approximately the midpoint of the target severity's CVSS v3 range:

| Target severity | CVSS v3 range |
|---|---|
| None | 0.0 |
| Low | 0.1–3.9 |
| Medium | 4.0–6.9 |
| High | 7.0–8.9 |
| Critical | 9.0–10.0 |

The original CVSS vector is never modified. No synthetic vector is generated to match the adjusted score. Because a rule only matches when it changes the finding's severity, the score is adjusted only when the severity itself changes; see [Evaluation order](#evaluation-order).

## Auto-closed and passed findings

Severity modifiers are not cleared or updated for findings that transition to auto-closed or where the evaluation result is **pass**. If the rule that originally modified a finding is later edited or deleted, those findings retain the severity that was set when they closed.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=modify_severity
