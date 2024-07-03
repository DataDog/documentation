---
aliases:
- /ja/continuous_integration/setup_pipelines/custom
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Explore Pipeline Execution Results and Performance
- link: /continuous_integration/guides/pipeline_data_model
  tag: Documentation
  text: Learn about the Pipeline Data Model and Execution Types
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Troubleshooting CI Visibility
title: Send custom pipelines to Datadog
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

## 概要

You can send custom pipelines through HTTP using the [public API endpoint][1]. For more information about how pipeline executions are modeled, see [Pipeline Data Model and Execution Types][2].

### 互換性

| Pipeline Visibility | プラットフォーム | 定義 |
|---|---|---|
| [Custom tags][5] [and measures at runtime][6] | Custom tags and measures at runtime | Configure [custom tags and measures][7] at runtime. |
| [Manual steps][8] | Manual steps | View manually triggered pipelines. |
| [Parameters][9] | パラメーター | Set custom parameters when a pipeline is triggered. |
| [Partial retries][10] | Partial pipelines | View partially retried pipeline executions. |
| [Pipeline failure reasons][11] | Pipeline failure reasons | Identify pipeline failure reasons from error messages. |
| [Queue time][12] | Queue time | View the amount of time pipeline jobs sit in the queue before processing. |

## Datadog でパイプラインデータを視覚化する

The [**CI Pipeline List**][3] and [**Executions**][4] pages populate with data after the pipelines are accepted for processing.

The **CI Pipeline List** page shows data for only the default branch of each repository.

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/latest/ci-visibility-pipelines/#send-pipeline-event
[2]: /ja/continuous_integration/guides/pipeline_data_model/
[3]: https://app.datadoghq.com/ci/pipelines
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: /ja/glossary/#custom-tag
[6]: /ja/glossary/#custom-measure
[7]: /ja/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[8]: /ja/glossary/#manual-step
[9]: /ja/glossary/#parameter
[10]: /ja/glossary/#partial-retry
[11]: /ja/glossary/#pipeline-failure
[12]: /ja/glossary/#queue-time