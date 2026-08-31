---
description: Observability Pipelines を使用して、Datadog、Amazon S3、Splunk、Microsoft Sentinel
  などの送信先に、独自のインフラストラクチャー内でログ、メトリクス、トレースを収集、処理、ルーティングする方法を学びます。
disable_toc: false
further_reading:
- link: /observability_pipelines/configuration/explore_templates/
  tag: ドキュメント
  text: Pipelines のセットアップ
- link: /observability_pipelines/configuration/set_up_pipelines/
  tag: ドキュメント
  text: ユースケースとテンプレートをチェックする
- link: /observability_pipelines/configuration/install_the_worker/
  tag: ドキュメント
  text: Observability Pipelines Worker をインストールする
- link: /agent/configuration/dual-shipping/#yaml-configuration
  tag: ドキュメント
  text: Observability Pipelines によるデュアル送信
- link: /observability_pipelines/guide/strategies_for_reducing_log_volume/
  tag: ドキュメント
  text: ログ量を削減するための戦略
- link: https://learn.datadoghq.com/courses/course-getting-started-observability-pipelines
  tag: ラーニングセンター
  text: Observability Pipelines の利用を開始する
- link: https://www.datadoghq.com/blog/observability-pipelines-reference-tables-log-enrichment/
  tag: ブログ
  text: Reference Tables と Observability Pipelines を使用して、動的に更新されるコンテキストをログに追加する
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: ブログ
  text: Observability Pipelines を使用して、AI アプリから ClickHouse および Datadog に OTel データをルーティングする
- link: https://www.datadoghq.com/blog/observability-pipelines-sensitive-data-redaction/
  tag: ブログ
  text: Observability Pipelines を使用して、オンプレミスでログから機密データを削除する
- link: https://www.datadoghq.com/blog/observability-pipelines-dual-ship-logs/
  tag: ブログ
  text: Datadog Observability Pipelines でログをデュアル送信する
- link: https://www.datadoghq.com/blog/observability-pipelines-log-volume-control/
  tag: ブログ
  text: Datadog Observability Pipelines でログボリュームを制御する
- link: https://www.datadoghq.com/blog/observability-pipelines-archiving/
  tag: ブログ
  text: Datadog へのシンプルで手頃な移行のために、Observability Pipelines でログをアーカイブする
- link: https://www.datadoghq.com/blog/observability-pipelines/
  tag: ブログ
  text: Datadog Observability Pipelines でログを簡単に集約、処理、ルーティングする
- link: https://www.datadoghq.com/blog/observability-pipelines-stream-logs-in-ocsf-format/
  tag: ブログ
  text: Observability Pipelines を使用して、OCSF 形式のログを任意のセキュリティベンダーやデータレイクにストリーミングする
- link: https://www.datadoghq.com/blog/observability-pipelines-route-logs-microsoft-sentinel/
  tag: ブログ
  text: Datadog Observability Pipelines を使用して、Microsoft Sentinel への SIEM 移行を簡素化する
- link: https://www.datadoghq.com/blog/sled-observability-pipelines/
  tag: ブログ
  text: Datadog Observability Pipelines を使用して、都道府県、地方自治体、および教育機関がログを柔軟かつ効率的に管理する方法
- link: https://www.datadoghq.com/blog/optimize-high-volume-logs/
  tag: ブログ
  text: 可視性を損なうことなく大量のログデータを最適化する方法
- link: https://www.datadoghq.com/blog/archive-search/
  tag: ブログ
  text: Datadog Archive Search を使用して、過去のログをより効率的に検索する
- link: https://www.datadoghq.com/blog/introducing-datadog-cloudprem/
  tag: ブログ
  text: Datadog BYOC Logs を使用して、ペタバイト規模のログを独自のインフラストラクチャーに保存および検索する
- link: https://www.datadoghq.com/blog/manage-high-volume-logs-with-observability-pipeline-packs/
  tag: ブログ
  text: Observability Pipelines の Packs を使用して、あらゆる SIEM またはデータレイクのログコストを管理する
- link: https://www.datadoghq.com/blog/observability-pipelines-otel-cost-control/
  tag: ブログ
  text: ベンダーニュートラルなログの収集とコスト管理のために、OpenTelemetry と Observability Pipelines を使用する
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: ブログ
  text: Datadog Observability Pipelines 使用して、MSSP 向けのログの収集と集約を簡素化する
- link: https://www.datadoghq.com/blog/manage-metrics-cost-control-with-observability-pipelines
  tag: ブログ
  text: Observability Pipelines を使用して、環境内のメトリクスボリュームとタグを管理する
title: Observability Pipelines
---
## 概要 {#overview}

{{< img src="observability_pipelines/op_marketecture_06042025.png" alt="さまざまなソースから集約され、自身の環境内の Observability Pipelines Worker によって処理およびエンリッチ化され、選択したセキュリティ、分析、ストレージの送信先にルーティングされるデータを示す図" style="width:100%;" >}}

Datadog Observability Pipelines を使用すると、自身のインフラストラクチャー内での収集と処理が可能になり、 {{< tooltip text="logs, metrics, and traces" tooltip="ユースケースや価格については、アカウントマネージャーにお問い合わせください。" >}} データを異なる送信先にルーティングできます。これにより、オブザーバビリティデータが環境から送信される前にデータを制御できるようになります。

すぐに使えるテンプレートを使用して、機密データの編集、データのエンリッチ化、ノイズの多いイベントのフィルタリング、Datadog、SIEM ツール、クラウドストレージなどの送信先へのデータルーティングを行うパイプラインを構築できます。

## 主要コンポーネント {#key-components}

### Observability Pipelines Worker {#observability-pipelines-worker}

Observability Pipelines Worker はインフラストラクチャー内で実行され、データの集約、処理、ルーティングを行います。

<div class="alert alert-info">
Datadog では、Observability Pipelines Worker (OPW) をマイナーリリースやパッチリリースのたび、または少なくとも月に 1 回更新することを推奨しています。<br><br> OPW のメジャーバージョンにアップグレードし、常に最新の状態に保つことが、最新の OPW 機能、修正、およびセキュリティアップデートを入手するための唯一のサポートされている方法です。最新の Worker バージョンに更新するには、<a href="/observability_pipelines/configuration/install_the_worker/#upgrade-the-worker">Worker のアップグレード</a>を参照してください</a>。
</div>

### Observability Pipelines UI {#observability-pipelines-ui}

Observability Pipelines UI は、以下を実行できる一元化されたコントロールプレーンを提供します。

-  ガイド付きテンプレートを使用してパイプラインを構築および編集します。
-  Worker をデプロイおよび管理します。
-  モニターを有効にしてパイプラインの健全性を追跡します。

## 開始する {#get-started}

1. [Observability Pipelines][1] に移動します。
1. ユースケースに基づいて[テンプレート](#common-use-cases-and-templates)を選択します。
1. パイプラインをセットアップします。
    1. ログ[ソース][2] を選択します。
    1. [プロセッサ][3] を構成します。
    1. 1 つ以上の [送信先][4] を追加します。
1. 環境に [Worker をインストール][5] します
1. パイプラインの健全性をリアルタイムで監視するためにモニターを有効にします。

詳細な手順については、[パイプラインのセットアップ][6] を参照してください。

## 一般的なユースケースとテンプレート {#common-use-cases-and-templates}

Observability Pipelines には、一般的なデータルーティングおよび変換ワークフロー向けの構築済みテンプレートが含まれています。ニーズに合わせて完全にカスタマイズしたり組み合わせたりすることができます。

{{< img src="observability_pipelines/eight_templates.png" alt="8 つのテンプレートを表示する Observability Pipelines UI" style="width:100%;" >}}

### テンプレート {#templates}

{{< tabs >}}
{{% tab "ログ" %}}

| テンプレート | 説明 |
|----------|-------------|
| ログをアーカイブする | 長期保存および再ハイドレーションのために、生のログを Amazon S3、Google Cloud Storage、または Azure Storage に保存します。|
| ログをデュアル送信する | 同じログストリームを複数の送信先 (Datadog や SIEM など) に送信します。|
| ログベースのメトリクスを生成する | 大容量のログをカウントまたは分布メトリクスに変換し、ストレージの必要量を削減します。|
| ログエンリッチメント | 参照テーブルや静的マッピングからメタデータを追加し、クエリをより効果的にします。|
| ログボリュームの制御 | 保存前に価値の低いログをフィルタリングすることで、インデックス化されたログの量を削減します。|
| 機密データの削除 | 組み込みルールまたはカスタムルールを使用して、個人を特定できる情報 (PII) やシークレットを検出して削除します。|
| ログを分割する | ログをタイプ (例: セキュリティとアプリケーション) ごとに異なるツールへルーティングします。|

{{% /tab %}}
{{% tab "メトリクス" %}}

| テンプレート | 説明 |
|----------|-------------|
| メトリクスタグのガバナンス | 必要なメトリクスのみを保持し、メトリクスのタグ付けを標準化し、不要なタグを削除してカーディナリティの増大を防ぐことで、メトリクスの品質と量を管理します。|

{{% /tab %}}
{{% tab "トレース" %}}

| テンプレート | 説明 |
|----------|-------------|
| トレースサンプリング | トレースを取り込み、処理し、ルーティングすることで、トラブルシューティングや分析に必要なトレースを保持しながらコストを管理します。|

{{% /tab %}}
{{< /tabs >}}

詳細については、[テンプレートのチェック][7] を参照してください。

## 詳細情報 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/sources/
[3]: /ja/observability_pipelines/processors/
[4]: /ja/observability_pipelines/destinations/
[5]: /ja/observability_pipelines/configuration/install_the_worker/
[6]: /ja/observability_pipelines/configuration/set_up_pipelines/
[7]: /ja/observability_pipelines/configuration/explore_templates/