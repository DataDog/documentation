---
title: Custom Reports
aliases:
- /software_catalog/eng_reports/custom_reports/
further_reading:
- link: "dashboards/"
  tag: "Documentation"
  text: "Datadog Dashboards"
---

{{< callout url="https://www.datadoghq.com/product-preview/idp-preview-features/" d_target="#signupModal" btn_hidden="false" header="Join the Preview for Custom Reports in IDP!" >}}
{{< /callout >}}

## Overview

With Custom Reports, you can embed any Datadog Dashboard directly into the IDP Overview for all users at your organization. This simplifies customizing the Overview page so different users can find relevant information directly in IDP, without context switching. 

{{< img src="/tracing/eng_reports/idp-custom-reports.png" alt="Example custom report in IDP Overview page" style="width:100%;" >}}

## Managing Custom Reports

In IDP > Overview, see **Custom Reports**. 

Users with the [Software Catalog write permission][1], included in the default Datadog Admin Role and Datadog Standard Role, can manage Custom Reports. You can add, remove, or adjust the order of Datadog Dashboards that appear in the Custom Reports section. 

**Note:** Custom Reports are set at the organization level. All users in the org will see the same list of Custom Reports in the IDP Overview page. Individual [Dashboard permissions][2] also apply to any Dashboards added to IDP. 

{{< img src="/tracing/eng_reports/idp-custom-reports-edit.png" alt="IDP Custom Report modal" style="width:100%;" >}}

You can view a Datadog Dashboard directly in the IDP Overview page, and adjust template variable filters and the timeframe. 

To edit the dashboard or set up scheduled PDF reports via email or Slack, click **Edit Report**. Then, you will see the Datadog Dashboard. Any changes you make to this dashboard are also applied to the IDP Overview page.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /internal_developer_portal/software_catalog/set_up/#write-permission
[2]: /dashboards/configure/#permissions



