---
title: Severity Adjustment
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
  - link: "/security/automation_pipelines/modify_severity/"
    tag: "Documentation"
    text: "Severity Modifier Rules"
---

{{< product-availability >}}

Manually adjust the severity of a finding to reflect your organization's business context, without creating a [severity modifier rule][1].

## Supported products

You can manually adjust the severity of findings in the following products:

- [Cloud Security][2]
- [Code Security][3]
- [App and API Protection][4]
- [Workload Protection][5]

## Adjust the severity of a finding

1. Open a finding.
2. Click {{< ui >}}Adjust Severity{{< /ui >}}. The **Adjust Severity** window opens.

   {{< img src="security/manual_severity_adjustment/adjust_severity_button.png" alt="The Adjust Severity window open on a finding, with a severity not yet selected" style="width:100%;" >}}

3. Select the new severity; for example, **Critical**.
4. Enter an optional description.

   {{< img src="security/manual_severity_adjustment/adjust_severity_modal.png" alt="The Adjust Severity window with Critical selected as the new severity and a custom description entered" style="width:100%;" >}}

5. Click {{< ui >}}Adjust Severity{{< /ui >}} to confirm. The **Adjust Severity** window closes.

To automatically adjust the severity of findings that meet certain criteria, see [Severity Modifier Rules][1].

## Adjust severity of multiple findings at once

To adjust the severity of several findings in a single action:

1. In the findings explorer, select up to 50 findings.
2. Click {{< ui >}}Severity{{< /ui >}}. The **Adjust Severity** window opens.

   {{< img src="security/manual_severity_adjustment/bulk_severity_button.png" alt="The Adjust Severity window open for multiple selected findings, with a severity not yet selected" style="width:100%;" >}}

3. Select the new severity; for example, **Critical**.
4. Enter an optional description.

   {{< img src="security/manual_severity_adjustment/bulk_severity_modal.png" alt="The Adjust Severity window for multiple selected findings, with Critical selected as the new severity and a custom description entered" style="width:100%;" >}}

5. Click {{< ui >}}Adjust Severity{{< /ui >}} to confirm. The **Adjust Severity** window closes.

## Identify modified findings

Findings with a manually adjusted severity display a visual indicator in explorer list views and in the finding's side panel header. Hover over the indicator to see who adjusted the severity, and any description entered.

{{< img src="security/manual_severity_adjustment/severity_pill_popover.png" alt="A severity pill showing a severity increase, with a pop-over displaying who adjusted the severity and the description entered" style="width:65%;" >}}

For findings that have a CVSS score (Container Image Vulnerability, Host Vulnerability, Library Vulnerability, and Runtime Code Vulnerability), the side panel severity section also includes a breakdown showing:
- The original severity level, CVSS score, and CVSS vector before adjustment.
- The name of the user who made the adjustment, and any description entered.
- The resulting severity level and adjusted CVSS score.

{{< img src="security/manual_severity_adjustment/severity_breakdown.png" alt="A finding side panel showing the severity breakdown, with the original severity, CVSS score, and CVSS vector; the user who made the adjustment; and the resulting severity level and adjusted CVSS score" style="width:100%;" >}}

## Severity floors by finding type

Not all finding types use the same severity scale. The following table shows the lowest severity you can manually adjust a finding to:

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

## Vulnerability findings and CVSS scores

For vulnerability findings that have a Datadog-adjusted CVSS score, manually adjusting the severity also updates the adjusted score stored in `@severity_details.user_adjusted`. The updated score is set to approximately the midpoint of the target severity's CVSS v3 range:

| Target severity | CVSS v3 range |
|---|---|
| None | 0.0 |
| Low | 0.1–3.9 |
| Medium | 4.0–6.9 |
| High | 7.0–8.9 |
| Critical | 9.0–10.0 |

The original CVSS vector is never modified. No synthetic vector is generated to match the adjusted score.

## Permissions

To adjust the severity of findings, you must have the `security_monitoring_findings_write` or `appsec_vm_write` permission. See [Role Based Access Control][6] for more information about Datadog's default roles and granular role-based access control permissions.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/automation_pipelines/modify_severity/
[2]: https://app.datadoghq.com/security/compliance
[3]: https://app.datadoghq.com/security/code-security
[4]: https://app.datadoghq.com/security/appsec/inventory/finding
[5]: https://app.datadoghq.com/security/workload-protection/findings
[6]: /account_management/rbac/permissions/#cloud-security-platform
