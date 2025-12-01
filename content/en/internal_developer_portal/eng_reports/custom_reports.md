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

With Custom Reports, you can embed any Datadog Dashboard directly into the IDP Overview for all users at your organization. This makes it easy to customize the Overview Page so that different users can find the information they need directly in IDP, without context switching. 

{{< img src="/tracing/eng_reports/idp-custom-reports.png" alt="Example custom report in IDP Overview page" style="width:100%;" >}}

## Managing Custom Reports

Navigate to IDP > Overview, and you will see a “Custom Reports” section on the left navigation. Users with the [Software Catalog write permission][1], which is included in the default Datadog Admin Role and Datadog Standard Role, can manage Custom Reports. You can add, remove, or adjust the order of Datadog Dashboards that appear in the Custom Reports section. Note that Custom Reports are set at the organization level, so all users will see the same list of Custom Reports in the IDP Overview page. [Dashboard permissions][2] will also apply to any Dashboards added to IDP. 

{{< img src="/tracing/eng_reports/idp-custom-reports-edit.png" alt="IDP Custom Report modal" style="width:100%;" >}}

Once you add a Datadog Dashboard, you can view it directly in the IDP Overview page and also adjust template variable filters and the timeframe. To edit the dashboard or set up scheduled PDF reports via Email or Slack, click on “Edit Report” at the top right corner. You will be taken to the Datadog Dashboard, and any changes you make will be applied to the IDP Overview page, as well.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /internal_developer_portal/software_catalog/set_up/#write-permission
[2]: /dashboards/configure/#permissions



