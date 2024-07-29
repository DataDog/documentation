---
title: Mute Issues in Cloud Security Management
further_reading:
- link: "security/default_rules"
  tag: "Documentation"
  text: "Explore out-of-the-box security detection rules"
aliases:
  - /security/cloud_security_management/mute_issues
products:
  - name: CSM Misconfigurations
    url: /security/cloud_security_management/misconfigurations/
    icon: cloud-security-management
  - name: CSM Identity Risks
    url: /security/cloud_security_management/identity_risks/
    icon: cloud-security-management
---

{{< product-availability >}}

There may be times when a misconfiguration, issue, or identity risk doesn't match the use case for your business, or you choose to accept it as a known risk. To ignore them, you can mute the underlying misconfiguration, issue, or identity risk for the impacted resources.

For example, the CSM Misconfigurations rule ['Block Public Access' feature is enabled for S3 bucket][1] evaluates whether an S3 bucket is publicly accessible. If you have an S3 bucket with static assets that are meant to be publicly shared, you can mute the misconfiguration for the S3 bucket.

**Note**: Muting a misconfiguration removes it from the calculation of your posture score.

{{< img src="security/csm/mute_issue.png" alt="The Mute Issue dialog box contains fields for specifying the reason and duration of the mute" style="width:100%;">}}

1. On the misconfiguration, issue, or identity risk side panel, select one or more resources.
2. Select **Actions** > **Mute for...**.
3. Select a reason for the mute, for example, a fix is pending, it's a false positive, or it's an accepted risk.
4. Enter an optional **Description**.
5. Select the duration of the mute.
6. Click **Mute**.

### Unmute an issue

Muted issues automatically unmute after the specified mute duration expires. You can also manually unmute an issue.

1. On the misconfiguration, issue, or identity risk side panel, select the resources with the muted issue.
2. Select **Actions** > **Unmute**.
3. Select a reason for the unmute, for example, there's no pending fix, it was a human error, or it's no longer an accepted risk.
4. Enter an optional **Description**.
5. Click **Unmute**.

### Audit your muted issues

To view your organization's muted issues:

- Sort by the **Muted** column on the Security Inbox and Misconfigurations issue explorer.
- Filter the Security Inbox, Misconfigurations, and Identity Risks issue explorer using the **Muted** facet.

To audit the mute history for a misconfiguration:

1. Open the misconfiguration side panel.
2. Select the resource with the muted misconfiguration.
3. On the **Overview** tab, use the **Resource evaluation over time** timeline to view when the misconfiguration was muted or unmuted over a specified period of time (up to six months).

{{< img src="security/csm/muted_finding_evaluation_over_time.png" alt="The resource evaluation over time timeline shows the history of the misconfiguration including periods when it was muted" style="width:90%;">}}

4. Click the **Timeline** tab to view a chronological history of the misconfiguration. Hover over a mute or unmute action to view additional details, such as the reason for the mute, how long the mute is intended to last, and who muted it.

{{< img src="security/csm/muted_finding_timeline.png" alt="The Timeline tab shows a chronological history of the misconfiguration, including details on when a misconfiguration was muted" style="width:90%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/default_rules/cis-aws-1.5.0-2.1.5/
