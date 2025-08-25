---
title: Mute Issues in Cloud Security
further_reading:
- link: "security/default_rules"
  tag: "Documentation"
  text: "Explore out-of-the-box security detection rules"
aliases:
  - /security/cloud_security_management/mute_issues
products:
  - name: Cloud Security Misconfigurations
    url: /security/cloud_security_management/misconfigurations/
    icon: cloud-security-management
  - name: Cloud Security Identity Risks
    url: /security/cloud_security_management/identity_risks/
    icon: cloud-security-management
---

{{< product-availability >}}

There may be times when a misconfiguration, issue, or identity risk doesn't match the use case for your business, or you choose to accept it as a known risk. To ignore them, you can mute the underlying misconfiguration, issue, or identity risk for the impacted resources.

For example, the Cloud Security Misconfigurations rule [S3 buckets should have 'Block Public Access' enabled][1] evaluates whether an S3 bucket is publicly accessible. If you have an S3 bucket with static assets that are meant to be publicly shared, you can mute the misconfiguration for the S3 bucket.

**Note**: Muting a misconfiguration removes it from the calculation of your posture score.

{{< img src="security/csm/mute_issue-3.png" alt="The Mute Issue dialog box contains fields for specifying the reason and duration of the mute" style="width:70%;">}}

1. Find the triage status dropdown for the resource.
   - In the misconfiguration, identity risk, or vulnerability explorers, the dropdown is in the **Triage** column for each resource. Alternatively, you can select one or more resources, then click the **Set State** dropdown that appears, so you can mute your entire selection at once.
   - When you're viewing a resource in a side panel, under **Next Steps**, the dropdown is under **Triage**.
2. Open the dropdown with the current triage status and click **Muted**. The **Mute issue** window opens.
3. Select a reason for the mute; for example, it's a false positive, it's an accepted risk, or a fix is pending.
4. Enter an optional **Description**.
5. Select the duration of the mute.
6. Click **Mute**. The **Mute issue** window closes.

To automatically mute issues that meet certain criteria, see [Mute Rules][2].

## Unmute an issue

Muted issues automatically unmute after the specified mute duration expires. You can also manually unmute an issue.

1. Find the triage status dropdown for the resource.
   - In the misconfiguration, identity risk, or vulnerability explorers, the dropdown is in the **Triage** column for each resource. Alternatively, you can select one or more resources, then click the **Set State** dropdown that appears, so you can unmute your entire selection at once.
   - When you're viewing a resource in a side panel, under **Next Steps**, the dropdown is under **Triage**.
2. Click **Muted** to open the dropdown, then select a new triage status. The triage status updates immediately for the selected resources.

## Audit your muted issues

To view your organization's muted issues:

1. By default, all issue explorers hide muted issues. To view muted issues on the Misconfigurations and Identity Risks issue explorers, remove the `@workflow.triage.status:(open OR in-progress)` filter from the search bar.
1. Depending on the issue explorer you're using, sort or filter the issues:
   - On the Misconfigurations issue explorer, sort by the **Muted** column.
   - On the Misconfigurations or Identity Risks issue explorers, filter issues using the **Muted** facet.
   - On the Vulnerabilities issue explorer, click the **Muted** tab.

To audit the mute history for a misconfiguration:

1. Open the misconfiguration side panel.
2. Select the resource with the muted misconfiguration.
3. Click the **Timeline** tab to view a chronological history of the misconfiguration. Hover over a mute or unmute action to view additional details, such as the reason for the mute, how long the mute is intended to last, and who muted it.

{{< img src="security/csm/muted_finding_timeline-2.png" alt="The Timeline tab shows a chronological history of the misconfiguration, including details on when a misconfiguration was muted" style="width:90%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/default_rules/hkp-p6b-f7w/
[2]: /security/automation_pipelines/mute