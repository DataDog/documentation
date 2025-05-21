---
title: Investigate Sensitive Data Issues
aliases:
  - /sensitive_data_scanner/investigate_sensitive_data_issues/
  - /sensitive_data_scanner/guide/investigate_sensitive_data_issues/
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

Datadog's Sensitive Data Scanner can help prevent sensitive data leaks and limit non-compliance risks by identifying, classifying, and optionally redacting sensitive data. When a sensitive data issue is found, you might have the following questions:

- What sensitive data has been exposed?
- What is the priority of the sensitive data exposure?
- How severe is the issue in terms of spread and volume?
- Where did the sensitive data come from?

The Sensitive Data Scanner's [Summary][1] page categorizes and prioritizes sensitive data issues so that you can investigate, collaborate, and document your findings, and answer those questions.

{{< img src="sensitive_data_scanner/sds_summary_20250203.png" alt="The summary page showing an overview of sensitive issues broken down by priority" style="width:100%;" >}}

## Triage sensitive data issues

Navigate to the [Summary][1] page to see all sensitive data issues within the selected time frame and start investigating issues.

{{< tabs >}}
{{% tab "Telemetry Data" %}}

In the **Sensitive Data Issues** section, filter by a priority level to see only issues with that priority level in the **Issues Overview** section. In the **Cases** section, filter by a case status to see issues associated to cases with that status in the **Issues Overview** section.

To investigate an issue:

1. Click on the issue in the **Issues Overview**.
2. In the issue panel, click **View Recent Changes** to navigate to [Audit Trail][3] and see if there are any recent configuration changes that caused the sensitive data issue.
3. Use the following options to explore different types of data matching the query:
    a. To view all logs related to the query in Log Explorer, click **View All Logs**.<br>
    b. To view all traces matching the query in Trace Explorer, click **View All APM Spans**.<br>
    c. To view all RUM events matching the query, click **View All RUM Events**.<br>
    d. To view all events matching the query, click **View All Events**.
  {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/issues_panel_02_01_2024.png" alt="The issues panel showing a critical visa card scanner issue" style="width:50%;">}}
4. In the **Blast Radius** section:<br>
    a. View the Top 10 services, hosts, and environments impacted by this sensitive data issue.<br>
    b. Click on a service to see more information about the service in the **Software Catalog**.<br>
    c. Click on a host to see more information about the host in the Infrastructure List page.
  {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/blast_radius_02_01_2024.png" alt="The issues panel showing the top 10 impacted services" style="width:50%;">}}
If you want to modify the Scanning Rule that was used to detect the sensitive data issue, click **Modify Rule** at the top of the panel.

Additionally, you can also:
- Use [Case Management][1] to track, triage, and investigate the issue, click **Create Case** at the top of the panel. Associated cases are surfaced in the Summary page.
- Use [Incident Management][2] to create an incident, you can add the issue to an existing incident or declare a new incident. Click the **Declare Incident** dropdown menu to add the issue to an existing incident. Click **Declare Incident** to declare a new incident.
- Use [Audit Trail][3] to see who may have accessed this sensitive data within Datadog, **View in Audit Trail** in the **Users who accessed these events** section.

{{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/case_mgmt_02_01_2024.png" alt="The case page showing information about the security issue, the assignee and creator of the case, and a timeline of events" style="width:60%;">}}

[1]: /service_management/case_management/
[2]: /service_management/incident_management/
[3]: /account_management/audit_trail

{{% /tab %}}
{{% tab "Cloud Storage" %}}

Click the **Datastores with Sensitive Data** tab to see all sensitive data issues for Cloud Storage.

In the **xxx Datastores with Sensitive section**, click on any of the dropdown menus to filter on datastores based on the type of sensitive data, account, region, team and so on.

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
            1. Click **See remediation** to see more information on how to remediate the issue.
            1. Under **More Actions**, you can add a Jira issue, run workflows, or add a comment.
        To run a workflow, select **Run Workflow** and then in the workflow browser, search and select a workflow to run. See [Automate Security Workflows with Workflow Automation][1] for more information.
          1. Click on the different tabs to see the severity breakdown, related logs, and timeline of the issue.

        {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/datastore_side_panel.png" alt="The datastore issue side panel showing the S3 buckets should have Block Public Access enabled misconfiguration" style="width:90%;">}}

[1]: /security/cloud_security_management/review_remediate/workflows/

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/summary

