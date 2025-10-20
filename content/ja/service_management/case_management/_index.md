---
algolia:
  tags:
  - 受信トレイ
  - case management
aliases:
- /ja/monitors/case_management/
further_reading:
- link: https://www.datadoghq.com/blog/track-issues-datadog-case-management/
  tag: blog
  text: Datadog Case Management で問題をプロアクティブに追跡し、トリアージし、割り当てる
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: blog
  text: Datadog Workflows と Cloud SIEM で、一般的なセキュリティタスクを自動化し、脅威の先を行く
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: blog
  text: 機密データスキャナーで、機密データの問題を大規模に発見し、トリアージし、修復する
title: Case Management
---

{{% site-region region="gov,ap1" %}}
<div class="alert alert-danger">
Case Management is not available in the {{< region-param key=dd_datacenter code="true" >}} site.
</div>
{{% /site-region %}}

## 概要

{{< img src="/service_management/case_management/case_management_overview_cropped.png" alt="Overview of the Case Management page" style="width:100%;" >}}

Datadog Case Management offers a centralized place to triage, track, and remediate issues detected by Datadog and third-party integrations. After you create a case, you can assign it to a user, establishing clear lines of ownership that persist throughout the lifespan of the case. 

While investigating, populate the case with graphs, logs, and other telemetry data from across Datadog and collaborate with your team members in the activity timeline. Case Management also integrates with tools like Jira, ServiceNow, PagerDuty, Slack, and Microsoft Teams—allowing you to fit Case Management solutions to your organization's processes. 

## はじめに
{{< whatsnext desc="Learn more about case management:">}}
    {{< nextlink href="/service_management/case_management/create_case" >}}Create a case{{< /nextlink >}}
    {{< nextlink href="/service_management/case_management/projects" >}}Projects{{< /nextlink >}}
    {{< nextlink href="/service_management/case_management/create_notifications_and_third_party_tickets" >}}Create notifications and third party tickets{{< /nextlink >}}
    {{< nextlink href="/service_management/case_management/view_and_manage" >}}View and manage cases{{< /nextlink >}}
    {{< nextlink href="/service_management/case_management/settings" >}}Manage membership and status transitions within projects{{< /nextlink >}}


{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}