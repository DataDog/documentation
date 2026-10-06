---
algolia:
  tags:
  - inbox
  - work management
  - case management
aliases:
- /ja/monitors/case_management/
- /ja/service_management/case_management/
- /ja/incident_response/case_management/
further_reading:
- link: https://www.datadoghq.com/blog/datadog-risk-management
  tag: ブログ
  text: Datadog Case Management でリスクを一元管理し、修正する方法
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: ブログ
  text: Datadog Forms を使用して、エンジニアリング組織全体でフィードバックを行動に変える
- link: https://www.datadoghq.com/blog/track-issues-datadog-case-management/
  tag: ブログ
  text: Datadog Case Management で問題をプロアクティブに追跡し、トリアージし、割り当てる
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: ブログ
  text: Datadog Workflows と Cloud SIEM で、一般的なセキュリティタスクを自動化し、脅威の先を行く
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: ブログ
  text: Sensitive Data Scanner で、機密データの問題を大規模に発見し、トリアージし、修復する
- link: https://www.datadoghq.com/blog/datadog-service-management/
  tag: ブログ
  text: Datadog Service Management で高いサービス可用性を確保する
- link: https://www.datadoghq.com/blog/work-management/
  tag: ブログ
  text: Datadog Work Management で人間とエージェントの作業を一元化する
title: Work Management
---
<div class="alert alert-info">Work Management は、以前は Case Management と呼ばれていました。API エンドポイントと権限では、引き続き <code>case</code> という用語を使用します。</div>

## 概要 {#overview}

Datadog Work Management は、Datadog およびサードパーティのインテグレーションによって検出された問題をトリアージ、追跡、修正するための一元化された場所を提供します。ワークアイテムを作成した後、それをユーザーに割り当てることで、ワークアイテムのライフサイクル全体を通じて明確な所有権の所在を確立できます。

調査中は、Datadog 全体から得られるグラフ、ログ、その他のテレメトリデータをワークアイテムに追加し、アクティビティタイムラインでチームメンバーと共同作業を行うことができます。Work Management は、Jira、ServiceNow、PagerDuty、Slack、Microsoft Teams などのツールとも統合されているため、組織のプロセスに合わせて Work Management ソリューションを調整できます。

## はじめに {#getting-started}
{{< whatsnext desc="Work Management の詳細:">}}
    {{< nextlink href="/incident_response/work_management/create_work_item" >}}ワークアイテムの作成{{< /nextlink >}}
    {{< nextlink href="/incident_response/work_management/projects" >}}プロジェクト{{< /nextlink >}}
    {{< nextlink href="/incident_response/work_management/view_and_manage" >}}ワークアイテムの表示と管理{{< /nextlink >}}
    {{< nextlink href="/incident_response/work_management/settings" >}}プロジェクト内のメンバーシップとステータス遷移の管理{{< /nextlink >}}
    {{< nextlink href="/incident_response/work_management/approvals" >}}ワークアイテムの承認{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}