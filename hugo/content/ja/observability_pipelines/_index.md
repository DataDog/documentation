---
description: Observability Pipelines を使用して、自社のインフラストラクチャー内でログとメトリクスを収集、処理、ルーティングし、Datadog、Amazon
  S3、Splunk、Microsoft Sentinel などの送信先に送る方法について学びます。
disable_toc: false
further_reading:
- link: /observability_pipelines/configuration/explore_templates/
  tag: ドキュメント
  text: パイプラインをセットアップする
- link: /observability_pipelines/configuration/set_up_pipelines/
  tag: ドキュメント
  text: ユースケースとテンプレートを確認する
- link: /observability_pipelines/configuration/install_the_worker/
  tag: ドキュメント
  text: Observability Pipelines Worker をインストールする
- link: /agent/configuration/dual-shipping/#yaml-configuration
  tag: ドキュメント
  text: Observability Pipelines を使ったデュアルシッピング
- link: /observability_pipelines/guide/strategies_for_reducing_log_volume/
  tag: ドキュメント
  text: ログボリュームを削減するための戦略
- link: https://learn.datadoghq.com/courses/course-getting-started-observability-pipelines
  tag: ラーニングセンター
  text: Observability Pipelines を使い始める
- link: https://www.datadoghq.com/blog/observability-pipelines-reference-tables-log-enrichment/
  tag: ブログ
  text: リファレンステーブルと Observability Pipelines を使用して、動的に更新されるコンテキストをログに追加する
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: ブログ
  text: Observability Pipelines を使用して、AI アプリから ClickHouse と Datadog に OTel データをルーティングする
- link: https://www.datadoghq.com/blog/observability-pipelines-sensitive-data-redaction/
  tag: ブログ
  text: Observability Pipelines を使用して、オンプレミスのログから機密データをマスキングする
- link: https://www.datadoghq.com/blog/observability-pipelines-dual-ship-logs/
  tag: ブログ
  text: Datadog Observability Pipelines でログをデュアルシッピングする
- link: https://www.datadoghq.com/blog/observability-pipelines-log-volume-control/
  tag: ブログ
  text: Datadog Observability Pipelines でログボリュームを制御する
- link: https://www.datadoghq.com/blog/observability-pipelines-archiving/
  tag: ブログ
  text: Observability Pipelines でログをアーカイブし、シンプルかつ低コストで Datadog に移行する
- link: https://www.datadoghq.com/blog/observability-pipelines/
  tag: ブログ
  text: Datadog Observability Pipelines でログを簡単に集計、処理、ルーティングする
- link: https://www.datadoghq.com/blog/observability-pipelines-stream-logs-in-ocsf-format/
  tag: ブログ
  text: Observability Pipelines を使用して、OCSF 形式のログを、任意のセキュリティベンダーやデータレイクにストリーミングする
- link: https://www.datadoghq.com/blog/observability-pipelines-route-logs-microsoft-sentinel/
  tag: ブログ
  text: Datadog Observability Pipelines を使用して、Microsoft Sentinel への SIEM 移行を簡素化する
- link: https://www.datadoghq.com/blog/sled-observability-pipelines/
  tag: ブログ
  text: 州、地方自治体、教育機関が Datadog Observability Pipelines を使用してログを柔軟かつ効率的に管理する方法
- link: https://www.datadoghq.com/blog/optimize-high-volume-logs/
  tag: ブログ
  text: 可視性を損なうことなく大容量のログデータを最適化する方法
- link: https://www.datadoghq.com/blog/archive-search/
  tag: ブログ
  text: Datadog Archive Search を使用して、履歴ログを効率的に検索する
- link: https://www.datadoghq.com/blog/introducing-datadog-cloudprem/
  tag: ブログ
  text: Datadog BYOC Logs を使用して、自社のインフラストラクチャー内でペタバイト規模のログを保存・検索する
- link: https://www.datadoghq.com/blog/manage-high-volume-logs-with-observability-pipeline-packs/
  tag: ブログ
  text: Observability Pipelines の Packs を使用して、任意の SIEM やデータレイクでログのコストを管理する
- link: https://www.datadoghq.com/blog/observability-pipelines-otel-cost-control/
  tag: ブログ
  text: ベンダーニュートラルなログ収集とコスト管理のために OpenTelemetry と Observability Pipelines を使用する
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: ブログ
  text: Datadog Observability Pipelines で MSSP のログ収集と集計を簡素化する
- link: https://www.datadoghq.com/blog/manage-metrics-cost-control-with-observability-pipelines
  tag: ブログ
  text: Observability Pipelines を使用して、環境内のメトリクス量とタグを管理する
title: Observability Pipelines
---
## 概要 {#overview}

{{< img src="observability_pipelines/op_marketecture_06042025.png" alt="さまざまなソースからデータを集約し、、自社の環境内の Observability Pipelines Worker で処理およびエンリッチメントした後、任意のセキュリティ、分析、およびストレージの送信先にルーティングする様子を示した図" style="width:100%;" >}}

Datadog Observability Pipelines を使用すると、自社のインフラストラクチャー内でログとメトリクスを収集および処理し、そのデータをさまざまな送信先にルーティングできます。これにより、監視可能性データが環境から送信される前に、データを制御できるようになります。

すぐに使えるテンプレートを使用して、機密データのマスキング、データのエンリッチメント、ノイズの多いイベントのフィルタリング、および Datadog、SIEM ツール、クラウドストレージなどの送信先へのデータのルーティングを行うパイプラインを構築できます。

## 主要コンポーネント {#key-components}

### Observability Pipelines Worker {#observability-pipelines-worker}

Observability Pipelines Worker は、自社のインフラストラクチャー内で実行され、データの集約、処理、ルーティングを行います。

<div class="alert alert-info">
Datadog では、マイナーリリースおよびパッチリリースのたびに、または少なくとも月に 1 度、Observability Pipelines Worker (OPW) を更新することを推奨しています。<br><br>OPW のメジャーバージョンにアップグレードして最新の状態に保つことが、最新の OPW 機能、修正、およびセキュリティアップデートを利用するためにサポートされている唯一の方法です。最新の Observability Pipelines Worker バージョンに更新するには、「<a href="/observability_pipelines/configuration/install_the_worker/#upgrade-the-worker">Worker をアップグレードする</a>」を参照してください</a>。
</div>

### Observability Pipelines UI {#observability-pipelines-ui}

Observability Pipelines UI は、下記を実行できる一元化されたコントロールプレーンを提供します。

- ガイド付きテンプレートを使用してパイプラインを構築および編集する
- Worker をデプロイおよび管理する
- モニターを有効にしてパイプラインの健全性を追跡する

## 使い始める {#get-started}

1. [Observability Pipelines][1] に移動します。
1. ユースケースに基づいて[テンプレート](#common-use-cases-and-templates)を選択します。
1. パイプラインをセットアップします。
    1. ログ [ソース][2] を選択します。
    1. [プロセッサー][3] を構成します。
    1. 1 つ以上の [送信先][4] を追加します。
1. 環境に [Worker をインストール][5] します。
1. パイプラインの健全性をリアルタイムで監視するためのモニターを有効にします。

詳細な手順については、「[パイプラインをセットアップする][6]」を参照してください。

## 一般的なユースケースとテンプレート {#common-use-cases-and-templates}

Observability Pipelines には、一般的なデータルーティングおよび変換ワークフロー用の事前構築済みテンプレートが含まれています。ニーズに合わせて完全にカスタマイズしたり、組み合わせたりすることができます。

{{< img src="observability_pipelines/eight_templates.png" alt="8 つのテンプレートを表示する Observability Pipelines UI" style="width:100%;" >}}

### テンプレート {#templates}

{{< tabs >}}
{{% tab "ログ" %}}

| テンプレート | 説明 |
|----------|-------------|
| Archive Logs (ログのアーカイブ) | 長期的な保持と再取り込みのために、未加工のログを Amazon S3、Google Cloud Storage、または Azure Storage に保存します。|
| Dual Ship Logs (ログのデュアルシップ) | 同じログストリームを複数の送信先 (Datadog や SIEM など) に送ります。|
| Generate Log-based Metrics (ログベースのメトリクスの生成) | 大量のログをカウントメトリクスまたはディストリビューションメトリクスに変換し、ストレージの必要量を削減します。|
| Log Enrichment (ログのエンリッチメント) | 参照テーブルや静的マッピングからメタデータを追加し、より効果的なクエリを可能にします。|
| Log Volume Control (ログボリュームの制御) | 保存前に価値の低いログをフィルタリングすることで、インデックス化するログの量を削減します。|
| Sensitive Data Redaction (機密データのマスキング) | 組み込みルールまたはカスタムルールを使用して、個人を特定できる情報 (PII) やシークレットを検出および削除します。|
| Split Logs (ログの分割) | ログをタイプ (セキュリティとアプリケーションなど) ごとに異なるツールへルーティングします。|

{{% /tab %}}
{{% tab "メトリクス" %}}

| テンプレート | 説明 |
|----------|-------------|
| Metric Tag Governance (メトリクスタグのガバナンス) | 必要なメトリクスのみを保持し、メトリクスのタグ付けを標準化し、不要なタグを削除してカーディナリティの増大を防ぐことで、メトリクスの品質と量を管理します。|

{{% /tab %}}
{{< /tabs >}}

詳細については、「[テンプレートを確認する][7]」をご覧ください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/sources/
[3]: /ja/observability_pipelines/processors/
[4]: /ja/observability_pipelines/destinations/
[5]: /ja/observability_pipelines/configuration/install_the_worker/
[6]: /ja/observability_pipelines/configuration/set_up_pipelines/
[7]: /ja/observability_pipelines/configuration/explore_templates/