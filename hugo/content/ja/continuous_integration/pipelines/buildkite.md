---
aliases:
- /ja/continuous_integration/setup_pipelines/buildkite
further_reading:
- link: /continuous_integration/pipelines
  tag: ドキュメント
  text: パイプラインの実行結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: ドキュメント
  text: カスタムタグと測定値を追加して Pipeline Visibility を拡張する
title: Buildkite 向けの CI Visibility のセットアップ
---
## 概要 {#overview}

[Buildkite][1] は、独自のインフラストラクチャー上でビルドを実行できる継続的インテグレーションおよびデプロイメントプラットフォームです。クラウドでのオーケストレーションを管理しながら、セキュリティとビルド環境のカスタマイズを完全に制御できます。

Buildkite 向け CI Visibility をセットアップすることで、リソース使用量の最適化、オーバーヘッドの削減、ソフトウェア開発ライフサイクルの速度と品質の向上が実現します。

### 互換性 {#compatibility}

| Pipeline Visibility | プラットフォーム | 定義 |
|---|---|---|
| [Partial retries][9] | Partial pipelines | 部分的に再試行されたパイプライン実行を表示します|
| Infrastructure metric correlation | Infrastructure metric correlation |  ビルドエージェントのジョブを[インフラストラクチャーホストメトリクス][6]に関連付けます。|
| [Manual steps][12] | Manual steps | 手動でトリガーされたパイプラインを表示します。|
| [Queue time][13] | Queue time | パイプラインのジョブが処理される前にキューに残っている時間を表示します。|
| [Custom tags][10] [and measures at runtime][11] | Custom tags and measures at runtime | ランタイムの[カスタムタグと測定値][6]を構成します。|
| [Custom spans][14] | Custom spans | パイプラインのカスタムスパンを構成します。|
| [クリティカルパスで CI ジョブをフィルタリングする][17] | クリティカルパスで CI ジョブをフィルタリングする | クリティカルパスのジョブでフィルタリングします。|
| [実行時間][18] | 実行時間  | パイプラインによるジョブ実行時間を表示します。|
| Logs correlation | Logs correlation | パイプラインおよびジョブのスパンをログに関連付け、[ジョブログの収集][20]を有効にします。|


### 用語 {#terminology}

次の表は、Datadog CI Visibility と Buildkite の概念のマッピングを示しています。

| Datadog                    | Buildkite                       |
|----------------------------|---------------------------------|
| Pipeline                   | Build (パイプラインの実行) |
| Job                        | Job (ステップの実行)       |

## Datadog インテグレーションの構成 {#configure-the-datadog-integration}

[Buildkite][1] の Datadog インテグレーションをセットアップするには、次の手順を実行します。

1. Buildkite で {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notification Services{{< /ui >}} に移動し、{{< ui >}}Datadog Pipeline Visibility{{< /ui >}} の横にある {{< ui >}}Add{{< /ui >}} ボタンをクリックします。
2. 以下の情報をフォームに入力してください。
   *  {{< ui >}}Description{{< /ui >}}: `Datadog CI Visibility integration` など、将来インテグレーションを識別しやすくするための説明。
   * {{< ui >}}API key{{< /ui >}}: [Datadog API キー][2]。
   * {{< ui >}}Datadog site{{< /ui >}}: `{{< region-param key="dd_site" code="true" >}}`
   *  {{< ui >}}Pipelines{{< /ui >}}: すべてのパイプライン、またはトレースするパイプラインのサブセットを選択します。
   *  {{< ui >}}Branch filtering{{< /ui >}}: すべてのブランチをトレースする場合は空のままにするか、トレースするブランチのサブセットを選択します。
3. インテグレーションを保存するには、{{< ui >}}Add Datadog Pipeline Visibility Notification{{< /ui >}} をクリックします。

### ジョブログの収集 {#collect-job-logs}

Buildkite Agent からのジョブログを、OpenTelemetry ログとして [Datadog OTLP ログエンドポイント][23]へエクスポートします。エクスポートを有効にするには、Buildkite の [OpenTelemetry ジョブログエクスポートドキュメント][22]に従います。

Datadog は、ログを CI Visibility とは別に課金します。[Log Management][21] で、ログの保持期間、除外フィルター、インデックスを構成します。これらのルールを Buildkite ログに適用するには、`datadog.product:cipipeline` タグと `source:buildkite` タグでフィルターします。

{{% collapse-content title="Datadog Buildkite インテグレーション (レガシー)" level="h4" expanded=false id="legacy-buildkite-integration-job-log-collection" %}}

Datadog Buildkite インテグレーションは、ジョブログを収集するためのレガシーな方法です。OpenTelemetry を使用できない場合は、Datadog の担当者にお問い合わせください。

インストールおよび構成の手順については、[Buildkite インテグレーションドキュメント][19]を参照してください。

<div class="alert alert-warning">このインテグレーションは、Buildkite API を介してジョブログを取得します。ログの収集によって、Buildkite API のレート制限の大部分が消費される可能性があります。</div>

{{% /collapse-content %}}

## 高度な構成 {#advanced-configuration}

### カスタムタグの設定 {#set-custom-tags}

カスタムタグは、`buildkite-agent meta-data set` コマンドを使用して Buildkite トレースに追加できます。
`dd_tags.` で始まるキーを持つメタデータタグは、ジョブスパンおよびパイプラインスパンに追加されます。これらの
タグを使用して、パイプラインの検索と整理を行うための文字列ファセットを作成できます。

以下の YAML は、チーム名と Go バージョンのタグが設定されたシンプルな
パイプラインを示しています。

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
- `go.version: go version go1.17 darwin/amd64`(出力はランナーによって異なります)

結果として得られるパイプラインは次のようになります。

{{< img src="ci/buildkite-custom-tags.png" alt="カスタムタグ付きの Buildkite パイプラインのトレース" style="width:100%;">}}

`dd-measures.` で始まり、数値を含むキーを持つメタデータはすべて次のように設定されます。
数値メジャーの作成に使用できるメトリックタグ。

これらのタグを作成するには、`buildkite-agent meta-data set` コマンドを使用します。

たとえば、次のコマンドを使用してパイプライン内のバイナリサイズを測定できます。

```yaml
steps:
  - commands:
    - go build -o dst/binary .
    - ls -l dst/binary | awk '{print \$5}' | tr -d '\n' | buildkite-agent meta-data set "dd_measures.binary_size"
    label: Go build
```

出来上がったパイプラインは、パイプラインスパンに以下のようなタグが表示されます。

- `binary_size: 502` (出力はファイルサイズによって異なります)

この例では、`binary_size` の値を使用して、経時的なバイナリサイズの変化をプロットできます。

### インフラストラクチャー メトリクスとジョブの相関付け {#correlate-infrastructure-metrics-to-jobs}

Buildkite エージェントを使用している場合、ジョブとそれを実行しているインフラストラクチャーを関連付けることができます。
この機能を利用するには、Buildkite エージェントを実行しているホストに [Datadog Agent][7] をインストールします。

## 部分的パイプラインとダウンストリームパイプラインの表示 {#view-partial-and-downstream-pipelines}

[CI Visibility Explorer][15] で、次のフィルターを使用して検索クエリをカスタマイズできます。

{{< img src="ci/partial_retries_search_tags.png" alt="検索クエリに Partial Pipeline:retry が入力されている [Pipeline executions] (パイプライン実行) ページ" style="width:100%;">}}

| ファセット名 | ファセット ID | 使用可能な値 |
|---|---|---|
| Downstream Pipeline (ダウンストリームパイプライン) | `@ci.pipeline.downstream` | `true`、`false` |
| Manually Triggered (手動トリガー) | `@ci.is_manual` | `true`、`false` |
| Partial Pipeline (部分パイプライン) | `@ci.partial_pipeline` | `retry`、`paused`、`resumed` |

ページの左側にあるファセットパネルを使用して、これらのフィルターを適用することもできます。

{{< img src="ci/partial_retries_facet_panel.png" alt="[Partial Pipeline] (部分パイプライン) ファセットが展開され、値 Retry が選択され、[Partial Retry] (部分的なリトライ) ファセットが展開され、値 true が選択されているファセットパネル" style="width:20%;">}}

## Datadog でパイプラインデータを視覚化する{#visualize-pipeline-data-in-datadog}

[**CI Pipeline List**][3] ページおよび [**Executions**][4] ページには、パイプラインの完了後にデータが取り込まれます。

[{{< ui >}}CI Pipeline List{{< /ui >}}] (CI パイプラインリスト) ページには、各リポジトリのデフォルトブランチのデータのみが表示されます。詳しくは、[CI パイプラインの検索と管理][16]を参照してください。

## 参考資料 {#further-reading}

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
[14]: /ja/glossary/#custom-span
[15]: /ja/continuous_integration/explorer
[16]: /ja/continuous_integration/search/#search-for-pipelines
[17]: /ja/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[18]: /ja/glossary/#pipeline-execution-time
[19]: /ja/integrations/buildkite/
[20]: /ja/continuous_integration/pipelines/buildkite/#collect-job-logs
[21]: /ja/logs/
[22]: https://buildkite.com/docs/agent/self-hosted/monitoring-and-observability/tracing#exporting-job-logs-as-opentelemetry-logs
[23]: /ja/opentelemetry/setup/otlp_ingest/logs/