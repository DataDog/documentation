---
aliases:
- /ja/continuous_integration/setup_pipelines/codefresh
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Explore Pipeline Execution Results and Performance
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Troubleshooting CI Visibility
title: Set up Tracing on Codefresh Pipelines
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

## 概要

[Codefresh][1] is a continuous integration and delivery platform built for Kubernetes which offers automation features that streamline the building, testing, and deploying of your applications. 

Set up tracing in Codefresh to collect data on each step of your pipelines, analyze performance bottlenecks, troubleshoot operational challenges, and monitor your deployment workflows.

### 互換性

| Pipeline Visibility | プラットフォーム | 定義 |
|---|---|---|
| [Partial retries][7] | Partial pipelines | View partially retried pipeline executions. |
| [Manual steps][8] | Manual steps | View manually triggered pipelines. |
| [Parameters][9] | パラメーター | Set custom parameters (for example, [Codefresh variables][6]) when a pipeline is triggered. |
| [Pipeline failure reasons][10] | Pipeline failure reasons | Identify pipeline failure reasons from error messages. |

## Datadog インテグレーションの構成

To set up the Datadog integration for [Codefresh][1]:

1. Codefresh の **[Account Settings > Configuration > Integrations][2]** に移動し、Datadog の行の **CONFIGURE** をクリックします。
2. **ADD INTEGRATION** をクリックします。
3. 以下の情報をフォームに入力してください。
   * **Datadog site**: ドロップダウンから {{< region-param key="dd_site" code="true" >}} を選択します。
   * **Token**: [Datadog API キー][3]を追加します。
4. インテグレーションを保存するには、**SAVE** をクリックします。

## Datadog でパイプラインデータを視覚化する

The [**CI Pipeline List**][4] and [**Executions**][5] pages populate with data after the pipelines finish.

The **CI Pipeline List** page shows data for only the default branch of each repository.

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://codefresh.io/
[2]: https://g.codefresh.io/account-admin/account-conf/integration/datadog
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: https://codefresh.io/docs/docs/codefresh-yaml/variables/#user-provided-variables
[7]: /ja/glossary/#partial-retry
[8]: /ja/glossary/#manual-step
[9]: /ja/glossary/#parameter
[10]: /ja/glossary/#pipeline-failure