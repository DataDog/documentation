---
title: Investigate Sensitive Data Issues
kind: documentation
further_reading:
    - link: "/sensitive_data_scanner/"
      tag: "Documentation"
      text: "Set up Sensitive Data Scanner"
    - link: "https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/"
      tag: "Blog"
      text: "Discover, triage, and remediate sensitive data issues at scale with Sensitive Data Scanner"
---

## Overview

Sensitive Data Scanner is a stream-based, pattern matching service used to identify, tag, and optionally redact or hash sensitive data. When a sensitive data issue is found, you might have the following questions:

- What sensitive data has been exposed?
- What is the priority of the sensitive data exposure?
- How severe is the issue in terms of spread and volume?
- Where did the sensitive data come from?

The Sensitive Data Scanner's [Summary][1] page categorizes and prioritizes sensitive data issues so that you can investigate, collaborate, and document your findings, and answer those questions.

{{<img src="sensitive_data_scanner/sds_summary_12_01_24.png" alt="The Sensitive Data Scanner summary page showing the number of sensitive data issues, the number of scanning rules enabled, and a list of issues" style="width:80%;">}}

## Triage sensitive data issues

Use the [Summary][1] page to see all sensitive data issues within the selected timeframe and start investigating issues.

In the **Sensitive Data Issues** section, filter by a priority level to see only issues with that priority level in the **Issues Overview** section. In the **Cases** section, filter by a case status to see issues associated to cases with that status in the **Issues Overview** section.

To investigate an issue:

1. Click on the issue in the **Issues Overview**.
2. In the issue panel, click **View Recent Changes** to navigate to Audit Trail and see if there are any recent configuration changes that caused the sensitive data issue.
3. Click **View All Logs** to see in Log Explorer all logs matching the query.  
Click **View All APM Spans** to see in Trace Explorer all traces matching the query.  
Click **View All RUM Events** to see in RUM Explorer all RUM events matching the query.  
Click **View All Events** to see in Events Explorer all events matching the query.
4. In the **Blast Radius** section:  
    a. View the Top 10 services, hosts, and environments impacted by this sensitive data issue.  
    b. Click on a service to see more information about the service in the **Service Catalog**.  
    c. Click on a host to see more information about the host in the Infrastructure List page.

If you want to use [Case Management][2] to track, triage, and investigate the issue, click **Create Case** at the top of the panel. Associated cases are surfaced in the Summary page.

If you want to use [Incident Management][3] to create an incident, you can add the issue to an existing incident or declare a new incident. Click the **Declare Incident** dropdown menu to add the issue to an existing incident. Click **Declare Incident** to declare a new incident.

If you want to modify the Scanning Rule that was used to detect the sensitive data issue, click **Modify Rule** at the top of the panel.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/summary
[2]: /service_management/case_management/
[3]: /service_management/incident_management/
