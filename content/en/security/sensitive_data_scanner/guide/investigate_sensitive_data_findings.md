---
title: Investigate Sensitive Data Findings
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

{{< img src="sensitive_data_scanner/findings_20251014.png" alt="The Findings page showing an overview of sensitive findings broken down by priority" style="width:100%;" >}}

## Triage sensitive data findings

Navigate to the [Findings][1] page to see all sensitive data findings within the selected time frame and start investigating them.

{{< tabs >}}
{{% tab "Telemetry Data" %}}

In the **Sensitive Data Rule Findings** tab, you can filter your sensitive data findings by priority status, case status, and domain.

To investigate a finding:

1. Click on the finding in the list.
2. In the finding panel, click **View Recent Changes** to navigate to [Audit Trail][3] and see if there are any recent configuration changes that caused the sensitive data finding.
3. Use the following options to explore different types of data matching the query:
    a. To view all logs related to the query in Log Explorer, click **View All Logs**.<br>
    b. To view all traces matching the query in Trace Explorer, click **View All APM Spans**.<br>
    c. To view all RUM events matching the query, click **View All RUM Events**.<br>
    d. To view all events matching the query, click **View All Events**.
  {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/findings_panel_20251015.png" alt="The findings panel showing a critical visa card scanner finding" style="width:50%;">}}
4. In the **Blast Radius** section:<br>
    a. View the Top 10 services, hosts, and environments impacted by this sensitive data findings.<br>
    b. Click on a service to see more information about the service in the **Software Catalog**.<br>
    c. Click on a host to see more information about the host in the Infrastructure List page.
  {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/blast_radius_02_01_2024.png" alt="The findings panel showing the top 10 impacted services" style="width:50%;">}}
If you want to modify the Scanning Rule that was used to detect the sensitive data finding, click **Modify Rule** at the top of the panel.

Additionally, you can also:
- Use [Case Management][1] to track, triage, and investigate the finding, click **Create Case** at the top of the panel. Associated cases are surfaced in the Findings page.
- Use [Incident Management][2] to create an incident, you can add the finding to an existing incident or declare a new incident. Click the **Declare Incident** dropdown menu to add the finding to an existing incident. Click **Declare Incident** to declare a new incident.
- Use [Audit Trail][3] to see who may have accessed this sensitive data within Datadog, **View in Audit Trail** in the **Users who accessed these events** section.

{{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/case_mgmt_02_01_2024.png" alt="The case page showing information about the security finding, the assignee and creator of the case, and a timeline of events" style="width:60%;">}}

[1]: /incident_response/case_management/
[2]: /incident_response/incident_management/
[3]: /account_management/audit_trail

{{% /tab %}}
{{% tab "Cloud Storage" %}}

Click the **Datastores with Sensitive Data** tab to see all sensitive data findings for Cloud Storage.

To investigate a datastore:

1. Click on a datastore.
1. You can view files where sensitive data was found and then click on a file to inspect it in AWS.
  Datadog recommends doing the following:
    - Review a few files to get a sense of the classification accuracy.
    - Follow up with the team or service owner listed in the side panel to confirm whether sensitive data is meant to be in the bucket.
      - If it is not supposed to be in the bucket, delete the files or move them to an appropriate bucket.
      - If it is supposed to be in the bucket, complete the following steps to improve your security posture:
        1. Click the **Security** tab in the side panel and review the **Misconfigurations** section.
        1. Click on a misconfiguration to see details in Cloud Security.
        1. In the **Next Steps** section:
            1. Under **Triage**, click the dropdown to change the triage status of the signal. The default status is `OPEN`.
            1. Click **Assign Signal** to assign a signal to yourself or another Datadog user.
            1. Click **See remediation** to see more information on how to remediate the finding.
            1. Under **More Actions**, you can add a Jira issue, run workflows, or add a comment.
        To run a workflow, select **Run Workflow** and then in the workflow browser, search and select a workflow to run. See [Automate Security Workflows with Workflow Automation][1] for more information.
          1. Click on the different tabs to see the severity breakdown, related logs, and timeline of the finding.

        {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/datastore_side_panel.png" alt="The datastore finding side panel showing the S3 buckets should have Block Public Access enabled misconfiguration" style="width:90%;">}}

[1]: /security/cloud_security_management/review_remediate/workflows/

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/sensitive-data-scanner/telemetry

