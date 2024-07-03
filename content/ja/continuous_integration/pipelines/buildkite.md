---
aliases:
- /ja/continuous_integration/setup_pipelines/buildkite
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Explore Pipeline Execution Results and Performance
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Troubleshooting CI Visibility
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: Documentation
  text: カスタムタグと測定値を追加してパイプラインの可視性を拡張する
title: Set up Tracing on a Buildkite Pipeline
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

## 概要

[Buildkite][1] is a continuous integration and deployment platform that allows you to run builds on your own infrastructure, providing you with full control over security and customizing your build environment while managing orchestration in the cloud.

Set up tracing on Buildkite to optimize your resource usage, reduce overhead, and improve the speed and quality of your software development lifecycle. 

### 互換性

| Pipeline Visibility | プラットフォーム | 定義 |
|---|---|---|
| [Partial retries][9] | Partial pipelines | View partially retried pipeline executions. |
| インフラストラクチャーメトリクスの相関 | Infrastructure metric correlation | Correlate jobs to [infrastructure host metrics][6] for Buildkite agents. |
| [Manual steps][12] | Manual steps | View manually triggered pipelines. |
| [Queue time][13] | Queue time | View the amount of time pipeline jobs sit in the queue before processing. |
| [Custom tags][10] [and measures at runtime][11] | Custom tags and measures at runtime | Configure [custom tags and measures][6] at runtime. |

## Datadog インテグレーションの構成

To set up the Datadog integration for [Buildkite][1]:

1. Buildkite の **Settings > Notification Services** に移動し、add a **Datadog Pipeline Visibility** integration をクリックします。
2. 以下の情報をフォームに入力してください。
   * **Description**: Datadog CI Visibility インテグレーションのように、将来的にインテグレーションを識別するのに役立つ説明です。
   * **API key**: [Datadog API キー][2]です。
   * **Datadog site**: {{< region-param key="dd_site" code="true" >}}
   * **Pipelines**: トレースするすべてのパイプラインまたはパイプラインのサブセットを選択します。
   * **Branch filtering**: すべてのブランチをトレースする場合は空のままにします。または、トレースしたいブランチのサブセットを選択します。
3. **Add Datadog Pipeline Visibility Notification** をクリックして、インテグレーションを保存します。

### カスタムタグの設定

カスタムタグは `buildkite-agent meta-data set` コマンドを使用して Buildkite トレースに追加することができます。
`dd_tags.` で始まるキーを持つメタデータタグはすべて、ジョブとパイプラインのスパンに追加されます。これらのタグを使用して、パイプラインを検索および整理するための文字列ファセットを作成することができます。

以下の YAML は、チーム名と Go バージョンのタグが設定されたシンプルなパイプラインを表しています。

```yaml
steps:
  - command: buildkite-agent meta-data set "dd_tags.team" "backend"
  - command: go version | buildkite-agent meta-data set "dd_tags.go.version"
    label: Go version
  - commands: go test ./...
    label: Run tests
```

Datadog では、ルートスパンだけでなく、関連するジョブスパンにも以下のタグが表示されます。

- `team: backend`
- `go.version: go version go1.17 darwin/amd64` (出力はランナーに依存します)

その結果、パイプラインは次のようになります。

{{< img src="ci/buildkite-custom-tags.png" alt="カスタムタグによる Buildkite パイプラインのトレース" style="width:100%;">}}

Any metadata with a key starting with `dd-measures.` and containing a numerical value will be set as
a metric tag that can be used to create numerical measures. You can use the `buildkite-agent meta-data set`
command to create such tags. This can be used for example to measure the binary size in a pipeline:

```yaml
steps:
  - commands:
    - go build -o dst/binary .
    - ls -l dst/binary | awk '{print \$5}' | tr -d '\n' | buildkite-agent meta-data set "dd_measures.binary_size"
    label: Go build
```

出来上がったパイプラインは、パイプラインスパンに以下のようなタグが表示されます。

- `binary_size: 502` (出力はファイルサイズに依存します)

この例では、`binary_size` の値を使って、バイナリーサイズの経時変化をプロットすることができます。

## Datadog でパイプラインデータを視覚化する

The [**CI Pipeline List**][3] and [**Executions**][4] pages populate with data after the pipelines finish.

The **CI Pipeline List** page shows data for only the default branch of each repository.

### インフラストラクチャーメトリクスとジョブの相関付け

If you are using Buildkite agents, you can correlate jobs with the infrastructure that is running them.
For this feature to work, install the [Datadog Agent][7] in the hosts running the Buildkite agents.

### 部分的およびダウンストリームパイプラインを表示する

**Executions** ページでは、検索バーで以下のフィルターを使用することができます。

`Downstream Pipeline`
: 可能な値: `true`、`false`

`Manually Triggered`
: 可能な値: `true`、`false`

`Partial Pipeline`
: 可能な値: `retry`、`paused`、`resumed`

{{< img src="ci/partial_retries_search_tags.png" alt="検索クエリに Partial Pipeline:retry を入力したパイプラインの実行画面" style="width:100%;">}}

これらのフィルターは、ページの左側にあるファセットパネルからも適用することができます。
{{< img src="ci/partial_retries_facet_panel.png" alt="Partial Pipeline ファセットが展開され、値 Retry が選択されたファセットパネル、Partial Retry ファセットが展開され、値 true が選択されたファセットパネル" style="width:40%;">}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://buildkite.com
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/ci/pipelines
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: /ja/continuous_integration/pipelines/buildkite/#view-partial-and-downstream-pipelines
[6]: /ja/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[7]: /ja/agent/
[8]: /ja/continuous_integration/pipelines/buildkite/#correlate-infrastructure-metrics-to-jobs
[9]: /ja/glossary/#partial-retry
[10]: /ja/glossary/#custom-tag
[11]: /ja/glossary/#custom-measure
[12]: /ja/glossary/#manual-step
[13]: /ja/glossary/#queue-time