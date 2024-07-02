---
title: Pipeline Execution Facets
description: Learn about default facets that you can use to search your pipeline executions in the CI Visibility Explorer.
further_reading:
- link: continuous_integration/search/
  tag: Documentation
  text: Learn how to search your pipelines
- link: continuous_integration/explorer/
  tag: Documentation
  text: CI Visibility Explorer について
---

## 概要

Facets are user-defined tags and attributes from your pipelines. They are useful for both [qualitative](#qualitative-facets) and [quantitative](#quantitative-measures) data analysis. Facets allow you to manipulate your pipelines in your [CI Pipeline monitors][1], and in search queries that appear on [dashboards][2] and in [notebooks][3].

[Creating facets](#creating-facets) is **not required** for [searching pipeline executions][5]. Autocomplete capabilities use existing facets, but also any input that matches incoming pipeline executions applies.

## Common facets

Navigate to [**Software Delivery** > **CI Visibility** > **Executions**][7] to access the list of facets left of the pipeline executions list.

{{< img src="/continuous_integration/facets-pipelines.png" text="CI Visibility Explorer の Pipeline Executions ページの Facets リスト" style="width:100%" >}}

The [CI Visibility Explorer][4] includes the following out-of-the-box facets:

| ファセット | 説明 |
|---|---|
| CI Provider | Name of the CI provider (GitHub, GitLab, and more). |
| Pipeline Name | Name of the CI pipeline. |
| Node Name | Name of the CI node that executed the pipeline, stage, or job. |
| Node Labels | Labels associated with the CI node that executed the pipeline, stage, or job. |
| Pipeline URL | Provider URL for a pipeline execution. |
| Pipeline ID | ID of the pipeline. |
| Pipeline Number | Execution number of a CI pipeline, provided by the CI Provider. This increases when partially retrying a pipeline. |
| Job URL | Provider URL for a job execution. |
| Stage Name | Name of the CI stage. |
| Job Name | Name of the CI job. |
| Kubernetes Namespace | The namespace in which the Kubernetes Pod is running. |
| Kubernetes Pod Name | Name of the Kubernetes Pod. |
| Image Tag | Kubernetes Container image tag. |
| Container Name | Kubernetes Container name tag. |
| Image Name | Kubernetes Container image name tag. |
| コンテナ ID | Kubernetes Container ID. |
| Kubernetes Container Name | Name of the Kubernetes Container. |
| Kubernetes Deployment | The Kubernetes Deployment a pod belongs to. |
| Kubernetes Stateful Set | The Kubernetes StatefulSet a pod belongs to. |
| Repository URL | URL of the Git repository. |
| Repository ID | ID that uniquely identifies a Git repository. |
| Commit SHA | Git Commit SHA. |
| Branch | Git Branch. |
| タグ | Git Tag. |
| Author Email | Git Author Email. |
| Committer Email | Git Committer Email. |
| Committer Date | Git Committer Date. |
| Author Date | Git Author Date. |
| Env | The environment in which the CI pipeline is running. |
| Resource | The resource utilized by the CI pipeline. |
| Operation Name | The operation performed within the CI pipeline. |
| エラーの種類 | Type of error encountered during the CI execution. |
| タイプ | Type of the CI execution or entity. |
| Complete Trace | Full trace of the CI pipeline execution. |
| Duration | The duration of the execution in seconds. |
| バージョン | Version of the CI pipeline or tool used. |
| Is Default Branch | Indicates if the execution was run on the default branch of the Git repository. |

You can use facets in the CI Visibility Explorer to:

- [Search for and filter pipeline executions][5]
- Perform pipeline analytics
- Start troubleshooting once your pipelines complete


### 定性的ファセット

次が必要な場合は、定性的ファセットを使用します。

- **Get relative insights** for values.
- **一意な値**を数える**。
- Frequently **filter** your pipeline executions against particular values. For example, create a facet on an environment tag to scope troubleshooting down to development, staging, or production environments.<br>

**注:** タグのフィルタリングにファセットは必須ではありませんが、調査中に頻繁に使用するタグのファセットを定義すると、解決までの時間を短縮するのに役立ちます。

### 定量的メジャー

次が必要な場合は、定量的メジャーを使用します。

- **Aggregate** values from multiple pipeline executions.
- **Range filter** your pipeline executions.
- **Sort** your pipeline executions against that value.

#### 種類

メジャーには、同等の機能のために、長整数またはダブル値があります。

#### 単位

メジャーは、クエリ時および表示時の桁数を処理するための単位 (**time** (秒) または **size** (バイト)) をサポートしています。単位は、メジャー自体のプロパティであり、フィールドのプロパティではありません。

For example, consider a `duration` measure in nanoseconds. Suppose pipeline executions from `service:A` have `duration:10000000`, meaning `10 milliseconds`. Supposed pipeline executions from `service:B` have `duration:5000000`, meaning `5 milliseconds`. Use `duration:>2ms` to consistently query pipeline execution tags from both services at once. For more information about search queries, see [Search Syntax][6].

## ファセットパネル

検索バーを使うと、包括的かつインタラクティブにデータをフィルタリングしグループ化することができます。ただし、多くの場合は、ファセットパネルを使った方がよりわかりやすくデータに移動できます。ファセットを開くと、現在のクエリのスコープのコンテンツのサマリーが表示されます

検索バーと URL には、ファセットパネルで選択した内容が自動的に反映されます。

- **Facets (qualitative)** come with a top list of unique values, and a count of pipeline executions matching each of them.
- **メジャー (定量的)** には、最小値と最大値を示すスライダーが付いています。スライダーを使用するか、数値を入力して、検索クエリを別の範囲に絞り込みます。


### ファセットのグループ化

ファセットは、ファセットリスト内で意味のあるテーマにグループ化されます。ファセットグループの割り当てや再割り当てはファセットリストにしか影響せず、検索や分析には影響しません。

### ファセットのフィルタリング

ファセットパネルのファセットの検索ボックスを使用して、ファセットリスト全体を絞り込み、操作する必要があるファセットに移動することができます。ファセット検索では、ファセット表示名とフィールド名を使用して、結果の範囲を絞り込みます。

## ファセットの作成

Creating a facet on a pipeline execution attribute or tag is not a mandatory step to search for pipeline executions. Facets are useful if you wish to add a meaningful description to a specific pipeline execution attribute, or if you want the attribute values to appear on the Facets list.

### Creating facets from the Pipeline Executions side panels

The easiest way to create a facet is to add it from the Pipeline Executions side panel so that most of the facet details are pre-filled.

{{< img src="continuous_integration/create_facet.png" alt="CI Pipeline Execution サイドパネルからファセットを作成する" style="width:100%;">}}

1. Navigate to a pipeline execution of interest in the [CI Visibility Explorer][4] that contains the field to create a facet on.
2. Open the Pipeline Executions side panel by selecting the pipeline execution from the list.
3. Click on the desired field (in the **Info** tab for a pipeline execution's span) and create a facet from there:

   - フィールドに数値がある場合、ファセットまたはメジャーのいずれかを作成できます。
   - フィールドに文字列値がある場合、ファセットの作成のみが可能です。

### ファセットリストからのファセット作成

If finding a pipeline execution that has the desired field is not an option, create a facet directly from the facet panel by clicking **+ Add**.

{{< img src="continuous_integration/add_facet.png" alt="ファセットサイドパネルからファセットを追加" style="width:30%;">}}

このファセットの基底のフィールド（キー）名を定義します。

- インフラストラクチャータグにタグキー名を使用します。
- Use the attribute path for pipeline execution attributes, with `@` prefix.

Autocomplete based on the content in pipeline executions of the current views helps you to define the proper field name. But you can use virtually any value here, specifically in the case that you don't yet have matching pipeline executions received by Datadog.

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/ci
[2]: /dashboards/
[3]: /notebooks/
[4]: /continuous_integration/explorer
[5]: /continuous_integration/search
[6]: /continuous_integration/explorer/search_syntax/
[7]: https://app.datadoghq.com/ci/pipeline-executions