---
title: Custom Reports
aliases:
- /software_catalog/eng_reports/custom_reports/
further_reading:
- link: "dashboards/"
  tag: "Documentation"
  text: "Datadog Dashboards"
---

## Overview

Custom Reports let you embed existing Datadog dashboards directly into the IDP Overview page for all users at your organization. This allows teams to view key engineering insights in one place without context switching navigating between IDP and Dashboards.

{{< img src="/tracing/eng_reports/idp-custom-report.png" alt="Example custom report in IDP Overview page" style="width:100%;" >}}

## Viewing Custom Reports

To view Custom Reports, go to **IDP** > **Overview** and find the **Custom Reports** section. Custom Reports are set at the organization level, so all users see the same list. 

Select a Custom Report to view it directly in the IDP Overview page. You can adjust template variable filters and the time frame in place.

**Note**: Individual [dashboard permissions][2] apply to any dashboards added to IDP's Custom Reports. 

## Managing Custom Reports

Users with the [Software Catalog write permission][1], included in the default Datadog Admin and Datadog Standard Roles, can add, remove, or reorder the dashboards in the Custom Reports section. 

To modify the content of a Custom Report or set up scheduled PDF reports through Slack or email, select **Edit Report**. This opens the underlying dashboard in the Dashboards UI. Edits made in the dashboard, such as changing widgets, updating queries, or adjusting template variables, automatically apply to the Custom Report in IDP. 

{{< img src="/tracing/eng_reports/idp-custom-report-edit.png" alt="IDP Custom Report modal" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /internal_developer_portal/software_catalog/set_up/#write-permission
[2]: /dashboards/configure/#permissions



