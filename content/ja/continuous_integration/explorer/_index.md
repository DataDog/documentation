---
title: Continuous Integration Visibility Explorer
description: Learn how to search and filter your pipeline executions in the CI Visibility Explorer.
further_reading:
  - link: /continuous_integration/pipelines/
    tag: Documentation
    text: Explore pipeline data to resolve build problems
  - link: "https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/"
    tag: ブログ
    text: Datadog CI モニターによるパイプラインアラートの構成
---

## 概要

The CI Visibility Explorer allows you to [search and filter](#search-and-filter), [visualize](#visualize), and [export](#export) pipeline executions at multiple levels using any tag.

Navigate to [**Software Delivery** > **CI Visibility** > **Executions**][5] to see your CI pipeline execution results across the following levels: **Pipeline**, **Stage**, **Job**, **Step**, and **Command**.

{{< img src="/continuous_integration/pipeline_executions.png" text="CI Pipeline Executions ページ" style="width:100%" >}}

## Default CI facets

The **CI** panel on the left lists default facets you can use to search for your pipeline executions.

| ファセット | 説明 |
|---|---|
| CI Status | The status of the CI execution: `Success` , `Failure`, or `Canceled`. |
| CI Instance | The instance name of the CI provider. |
| Duration | パイプラインが実行される時間。 |
| Pipeline ID | パイプラインの ID。 |
| CI Provider | CI プロバイダーの名前。 |
| Node Labels | ノードのラベル。 |
| Node Name | ノードの名前。 |
| Partial Pipeline | Refers to CI pipeline executions that include retries, manual approvals, or other incomplete sequences. |
| Partial Retry | Indicates whether the CI execution was a retry of a previous execution. |
| Manually Triggered | Indicates whether the CI execution was manually triggered. |
| パラメーター | The user-defined parameters when a pipeline or job triggers. |
| Pipeline Number | パイプラインの番号。 |
| Pipeline URL | パイプラインの URL。 |
| Queue Time | The total duration a job or task spent waiting in the CI queue before execution. |
| デプロイ | The GitLab environment deployed with a CI pipeline. |
| Deployment Action | The action taken within GitLab's deployed environment. |
| Command Name | The user-defined identifier for a specific command within the CI pipeline. |
| コマンド | The command line that was run to generate the custom pipeline span. |
| Downstream Pipeline | Indicates if this pipeline is downstream of another pipeline. |
| Upstream Pipeline ID | Identifier for the pipeline execution that precedes and triggers the current pipeline. |
| Step Name | The name assigned to a specific step within a CI pipeline. |
| エラードメイン | The type of error for a CI execution such as a provider, user, or unknown. |
| Run time | The total duration spent executing the CI pipeline. |
| Wait time | The total time spent waiting for manual approval within a CI execution. |
| Is Deployment | Indicates whether a job within the pipeline initiated a deployment. |
| Contains Deployment | Indicates whether the pipeline includes any jobs that trigger a deployment. |

For more information about common facets that you can use as part of your search query in the CI Visibility Explorer, see [Pipeline Execution Facets][3]. 

## パイプライン実行の詳細とトレース

選択した時間枠でのパイプラインの実行に関する集計データを確認できます。検索フィールドとファセットを使用して、調査したい実行までリストをスコープします。上部のボタンを使用して、リストを変更してパイプライン、ステージ、またはジョブを表示します。

以下は、最もアクティブなパイプラインの継続時間、失敗したパイプラインの継続時間、パイプラインの実行時間を可視化する 3 つのグラフで、それぞれ継続時間の累積に切り替えるオプションがあります。これらのグラフは左上で選択したレベル (`Pipeline`、`Stage`、`Job` など) にスコープされます。

{{< img src="ci/pipeline_explorer_trends.png" alt="エクスプローラービューのトレンドグラフ: Duration、Errored、Executions" style="width:100%;">}}

Each pipeline execution is reported as a trace, which includes stage and job information. Access individual pipeline, stage, and job execution traces by clicking on an execution in the list (similar to clicking into a pipeline execution from the Pipeline Details view).

CI pipeline data is available in [dashboards][6] and [notebooks][7], enabling build engineering teams to customize their communication about high-priority work and CI trends over time.

## 検索とフィルター

You can narrow down, broaden, or shift your focus on a subset of pipeline executions by clicking on the facets to the left or writing your own custom query in the search bar. When you select and deselect facets, the search bar automatically reflects your changes. Similarly, you can modify the search bar query or write a query from scratch in the search bar to select and deselect the facets on the left.

- To learn how to search for pipelines, see [Search and Manage][1].
- クエリの作成方法については、[検索構文][2]を参照してください。

## 分析

Group your queried pipeline executions into higher-level entities such as fields, patterns, and transactions in order to derive or consolidate information. By using [facets][3], which you do not need to create to search for attributes, you can accomplish the following actions:

- CI/CD パイプラインで実行されているテストの進捗を検索し、追跡します。
- すべての CI/CD ジョブの実行を調査して、失敗したテスト実行を特定してトラブルシューティングします。

## 視覚化

Select a visualization type to visualize the outcomes of your filters and aggregations and better understand your pipeline executions. For example, you can view your pipeline executions in a list to organize your pipeline data into columns, or in a [timeseries graph][8] to measure your pipeline data over time.

## エクスポート

[Export your view][4] in the CI Visibility Explorer to reuse it later or in different contexts.

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/search
[2]: /continuous_integration/explorer/search_syntax
[3]: /continuous_integration/explorer/facets
[4]: /continuous_integration/explorer/saved_views
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: https://app.datadoghq.com/dashboard/lists
[7]: https://app.datadoghq.com/notebook/list
[8]: https://app.datadoghq.com/ci/pipeline-executions?viz=timeseries
