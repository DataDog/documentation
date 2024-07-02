---
title: Test Run Facets
kind: ドキュメント
description: Learn about default facets that you can use to search your test runs in the Test Visibility Explorer.
further_reading:
- link: tests/search/
  tag: ドキュメント
  text: Learn how to search your tests
- link: tests/explorer/
  tag: ドキュメント
  text: Learn about the Test Visibility Explorer
---

## 概要

Facets are user-defined tags and attributes from your tests. They are useful for both [qualitative](#qualitative-facets) and [quantitative](#quantitative-measures) data analysis. Facets allow you to manipulate your tests in your [CI Test monitors][1], and in search queries that appear on [dashboards][2] and in [notebooks][3].

[Creating facets](#creating-facets) is **not required** for [searching test runs][5]. Autocomplete capabilities use existing facets, but also any input that matches incoming test runs applies.

## Common facets

Navigate to [**Software Delivery** > **Test Visibility** > **Test Runs**][7] to access the list of facets left of the test runs list.

{{< img src="/continuous_integration/facets-tests.png" text="Facets list on the Test Runs page of the Test Visibility Explorer" style="width:100%" >}}

You can use facets in the Test Visibility Explorer to:

- [Search for and filter test runs][5]
- Perform test analytics
- Start troubleshooting once your test runs complete

The [Test Visibility Explorer][4] includes the following out-of-the-box facets:

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

### 定性的ファセット

次が必要な場合は、定性的ファセットを使用します。

- **Get relative insights** for values.
- **一意な値**を数える**。
- Frequently **filter** your test runs against particular values. For example, create a facet on an environment tag to scope troubleshooting down to development, staging, or production environments.<br>

**注:** タグのフィルタリングにファセットは必須ではありませんが、調査中に頻繁に使用するタグのファセットを定義すると、解決までの時間を短縮するのに役立ちます。

### 定量的メジャー

次が必要な場合は、定量的メジャーを使用します。

- **Aggregate** values from multiple test runs.
- **Range filter** your test runs.
- **Sort** your test runs against that value.

#### 種類

メジャーには、同等の機能のために、長整数またはダブル値があります。

#### 単位

メジャーは、クエリ時および表示時の桁数を処理するための単位 (**time** (秒) または **size** (バイト)) をサポートしています。単位は、メジャー自体のプロパティであり、フィールドのプロパティではありません。

For example, consider a `duration` measure in nanoseconds. Suppose test runs from `service:A` have `duration:10000000`, meaning `10 milliseconds`. Supposed test runs from `service:B` have `duration:5000000`, meaning `5 milliseconds`. Use `duration:>2ms` to consistently query test run tags from both services at once. For more information about search queries, see [Search Syntax][6].

## ファセットパネル

検索バーを使うと、包括的かつインタラクティブにデータをフィルタリングしグループ化することができます。ただし、多くの場合は、ファセットパネルを使った方がよりわかりやすくデータに移動できます。ファセットを開くと、現在のクエリのスコープのコンテンツのサマリーが表示されます

検索バーと URL には、ファセットパネルで選択した内容が自動的に反映されます。

- **Facets (qualitative)** come with a top list of unique values, and a count of test runs matching each of them.
- **メジャー (定量的)** には、最小値と最大値を示すスライダーが付いています。スライダーを使用するか、数値を入力して、検索クエリを別の範囲に絞り込みます。

### ファセットのグループ化

ファセットは、ファセットリスト内で意味のあるテーマにグループ化されます。ファセットグループの割り当てや再割り当てはファセットリストにしか影響せず、検索や分析には影響しません。

### ファセットのフィルタリング

ファセットパネルのファセットの検索ボックスを使用して、ファセットリスト全体を絞り込み、操作する必要があるファセットに移動することができます。ファセット検索では、ファセット表示名とフィールド名を使用して、結果の範囲を絞り込みます。

## ファセットの作成

Creating a facet on a test run attribute or tag is not a mandatory step to search for test runs. Facets are useful if you wish to add a meaningful description to a specific test run attribute, or if you want the attribute values to appear on the Facets list.

### Creating facets from the Test Runs side panel

The easiest way to create a facet is to add it from the Test Runs side panel so that most of the facet details are pre-filled.

{{< img src="tests/explorer/create_facet.png" alt="Create a facet from a failed test run in the Test Runs side panel" style="width:100%;">}}

1. Navigate to a test run of interest in the [Test Visibility Explorer][4] that contains the field to create a facet on.
2. Open the Test Runs side panel by selecting the test run from the list.
3. Click on the desired field (in the **Other tags** section for a test run) and create a facet from there:

   - フィールドに数値がある場合、ファセットまたはメジャーのいずれかを作成できます。
   - フィールドに文字列値がある場合、ファセットの作成のみが可能です。

### ファセットリストからのファセット作成

If finding a test run that has the desired field is not an option, create a facet directly from the facet panel by clicking **+ Add**.

{{< img src="continuous_integration/add_facet.png" alt="ファセットサイドパネルからファセットを追加" style="width:30%;">}}

このファセットの基底のフィールド（キー）名を定義します。

- インフラストラクチャータグにタグキー名を使用します。
- Use the attribute path for test run attributes, with `@` prefix.

Autocomplete based on the content in test runs of the current views helps you to define the proper field name. But you can use virtually any value here, specifically in the case that you don't yet have matching test runs received by Datadog.

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/ci
[2]: /dashboards/
[3]: /notebooks/
[4]: /tests/explorer
[5]: /tests/search
[6]: /tests/explorer/search_syntax/
[7]: https://app.datadoghq.com/ci/test-runs