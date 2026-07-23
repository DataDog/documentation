---
title: Investigate Sensitive Data Findings
description: Triage and investigate Sensitive Data Scanner findings on the Findings page, including Blast Radius analysis, impacted services, Case Management, and Incident Management integration.
aliases:
  - /sensitive_data_scanner/investigate_sensitive_data_issues/
  - /sensitive_data_scanner/guide/investigate_sensitive_data_issues/
  - /security/sensitive_data_scanner/guide/investigate_sensitive_data_issues/
further_reading:
    - link: "sensitive_data_scanner/setup/telemetry_data/"
      tag: "Documentation"
      text: "Set up Sensitive Data Scanner for Telemetry Data"
    - link: "sensitive_data_scanner/setup/cloud_storage/"
      tag: "Documentation"
      text: "Set up Sensitive Data Scanner for Cloud Storage"
    - link: "https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/"
      tag: "Blog"
      text: "Discover, triage, and remediate sensitive data issues at scale with Sensitive Data Scanner"
---

## Overview

Datadog's Sensitive Data Scanner can help prevent sensitive data leaks and limit non-compliance risks by identifying, classifying, and optionally redacting sensitive data. When a sensitive data finding is found, you might have the following questions:

- What sensitive data has been exposed?
- What is the priority of the sensitive data exposure?
- How severe is the finding in terms of spread and volume?
- Where did the sensitive data come from?

The Sensitive Data Scanner's [Findings][1] page categorizes and prioritizes sensitive data findings so that you can investigate, collaborate, and document your findings, and answer those questions.

{{< img src="sensitive_data_scanner/sds_findings_explorer.png" alt="Sensitive Data Scanner Findings explorer grouped by rule, with the US Passport Scanner rule expanded to show critical findings, match counts, and weekly trend charts." style="width:100%;" >}}

## Triage sensitive data findings

Navigate to the [Findings][1] page to see all sensitive data findings within the selected time frame and start investigating them.

{{< tabs >}}
{{% tab "Logs" %}}

The Logs Findings explorer is an updated experience for investigating log findings. If you have at least one log finding, this explorer opens by default. APM, RUM, and Events findings are not available in this explorer. To view those findings, click {{< ui >}}Go back{{< /ui >}} in the banner at the top of the page.

To investigate a log finding:

1. Use {{< ui >}}Group by{{< /ui >}} to organize findings by {{< ui >}}Rule{{< /ui >}}, {{< ui >}}Logs Pattern{{< /ui >}}, or {{< ui >}}Service{{< /ui >}}. To surface findings where sensitive data is actively exposed, filter by {{< ui >}}Leaking{{< /ui >}} in the {{< ui >}}Match State{{< /ui >}} facet.
2. Click a finding to open the detail panel.
3. At the top of the panel, check {{< ui >}}First Detected{{< /ui >}} and {{< ui >}}Last Detected{{< /ui >}} to understand how long the exposure has been active.
4. In the summary section, review {{< ui >}}Match State{{< /ui >}}, {{< ui >}}Service{{< /ui >}}, {{< ui >}}Environment{{< /ui >}}, and {{< ui >}}Total matches{{< /ui >}} to understand the scope of the exposure.
5. Review the {{< ui >}}Logs Pattern{{< /ui >}} to understand the format of the log line where sensitive data was detected.
6. In the {{< ui >}}Example Logs{{< /ui >}} section, review up to 5 representative examples of affected logs. When an example log expires it is replaced with the next matching event. Click {{< ui >}}Show log{{< /ui >}} to expand an example and inspect its log message, fields, and attributes inline. By default, example logs are stored for 3 days and are accessible to all users with the Data Scanner Read permission. To store these representative logs for a different period, contact [Support][1].
7. Review {{< ui >}}Matches Trend{{< /ui >}} to see how match volume has changed over the past week. Use {{< ui >}}Related Access and Configuration Events{{< /ui >}} to check whether recent access events or changes to the scanning group or scanning rule line up with changes in match volume.

Additionally, you can:
- Use {{< ui >}}Apply Targeted Obfuscation{{< /ui >}} to obfuscate future sensitive data matches in new logs for this finding, or extend obfuscation to the entire service. If redaction is already enabled, use this section to verify how matching logs are obfuscated.
- Use {{< ui >}}Tune Detection Logic{{< /ui >}} to edit the scanning rule's keywords or apply suppressions for false positives or risk-accepted data.

[1]: /help

{{% /tab %}}
{{% tab "APM, RUM, and Events" %}}

In the {{< ui >}}Sensitive Data Rule Findings{{< /ui >}} tab, you can filter your sensitive data findings by priority status, case status, and domain.

To investigate a finding:

1. Click on the finding in the list.
2. In the finding panel, click {{< ui >}}View Recent Changes{{< /ui >}} to navigate to [Audit Trail][3] and see if there are any recent configuration changes that caused the sensitive data finding.
3. Use the following options to explore different types of data matching the query:
   1. To view all logs related to the query in Log Explorer, click {{< ui >}}View All Logs{{< /ui >}}.
   1. To view all traces matching the query in Trace Explorer, click {{< ui >}}View All APM Spans{{< /ui >}}.
   1. To view all RUM events matching the query, click {{< ui >}}View All RUM Events{{< /ui >}}.
   1. To view all events matching the query, click {{< ui >}}View All Events{{< /ui >}}.
  {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/findings_panel_20251015.png" alt="The findings panel showing a critical visa card scanner finding" style="width:50%;">}}
4. In the {{< ui >}}Blast Radius{{< /ui >}} section:
   1. View the Top 10 services, hosts, and environments impacted by this sensitive data findings.
   1. Click on a service to see more information about the service in the {{< ui >}}Catalog{{< /ui >}}.
   1. Click on a host to see more information about the host in the Infrastructure List page.
  {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/blast_radius_02_01_2024.png" alt="The findings panel showing the top 10 impacted services" style="width:50%;">}}

   To modify the Scanning Rule that was used to detect the sensitive data finding, click {{< ui >}}Modify Rule{{< /ui >}} at the top of the panel.

Additionally, you can also:
- Use [Case Management][1] to track, triage, and investigate the finding, click {{< ui >}}Create Case{{< /ui >}} at the top of the panel. Associated cases are surfaced in the Findings page.
- Use [Incident Management][2] to create an incident, you can add the finding to an existing incident or declare a new incident. Click the {{< ui >}}Declare Incident{{< /ui >}} dropdown menu to add the finding to an existing incident. Click {{< ui >}}Declare Incident{{< /ui >}} to declare a new incident.
- Use [Audit Trail][3] to see who may have accessed this sensitive data within Datadog, {{< ui >}}View in Audit Trail{{< /ui >}} in the {{< ui >}}Users who accessed these events{{< /ui >}} section.

{{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/case_mgmt_02_01_2024.png" alt="The case page showing information about the security finding, the assignee and creator of the case, and a timeline of events" style="width:60%;">}}

[1]: /incident_response/case_management/
[2]: /incident_response/incident_management/
[3]: /account_management/audit_trail

{{% /tab %}}
{{% tab "Cloud Storage" %}}

Click the {{< ui >}}Datastores with Sensitive Data{{< /ui >}} tab to see all sensitive data findings for Cloud Storage.

To investigate a datastore:

1. Click on a datastore.
1. You can view files where sensitive data was found and then click on a file to inspect it in AWS.
  Datadog recommends doing the following:
    - Review a few files to get a sense of the classification accuracy.
    - Follow up with the team or service owner listed in the side panel to confirm whether sensitive data is meant to be in the bucket.
      - If it is not supposed to be in the bucket, delete the files or move them to an appropriate bucket.
      - If it is supposed to be in the bucket, complete the following steps to improve your security posture:
        1. Click the {{< ui >}}Security{{< /ui >}} tab in the side panel and review the {{< ui >}}Misconfigurations{{< /ui >}} section.
        1. Click on a misconfiguration to see details in Cloud Security.
        1. In the {{< ui >}}Next Steps{{< /ui >}} section:
            1. Under {{< ui >}}Triage{{< /ui >}}, click the dropdown to change the triage status of the signal. The default status is `OPEN`.
            1. Click {{< ui >}}Assign Signal{{< /ui >}} to assign a signal to yourself or another Datadog user.
            1. Click {{< ui >}}See remediation{{< /ui >}} to see more information on how to remediate the finding.
            1. Under {{< ui >}}More Actions{{< /ui >}}, you can add a Jira issue, run workflows, or add a comment.
        To run a workflow, select {{< ui >}}Run Workflow{{< /ui >}} and then in the workflow browser, search and select a workflow to run. See [Automate Security Workflows with Workflow Automation][1] for more information.
          1. Click on the different tabs to see the severity breakdown, related logs, and timeline of the finding.

        {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/datastore_side_panel.png" alt="The datastore finding side panel showing the S3 buckets should have Block Public Access enabled misconfiguration" style="width:90%;">}}

[1]: /security/cloud_security_management/review_remediate/workflows/

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/sensitive-data-scanner/telemetry
