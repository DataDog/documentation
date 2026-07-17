---
algolia:
  tags:
  - opentelemetry
  - open telemetry
  - otel
aliases:
- /ja/tracing/setup_overview/open_standards/
- /ja/opentelemetry/interoperability/
cascade:
  algolia:
    rank: 70
further_reading:
- link: /opentelemetry/compatibility/
  tag: ドキュメント
  text: Feature Compatibility
- link: /opentelemetry/instrument/
  tag: ドキュメント
  text: アプリケーションのインスツルメンテーション
- link: /opentelemetry/setup/
  tag: ドキュメント
  text: データを Datadog に送信する
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  tag: ブログ
  text: Datadog と OpenTelemetry のパートナーシップ
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: ブログ
  text: W3C Trace Context に対応した OpenTelemetry インスツルメンテーションされたアプリのモニタリング
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: ブログ
  text: OpenTelemetry コレクターから Datadog エクスポーター経由で Datadog にメトリクスとトレースを送信する
- link: https://www.datadoghq.com/blog/opentelemetry-logs-datadog-exporter/
  tag: ブログ
  text: Datadog Exporter で OpenTelemetry Collector からログを転送する
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/
  tag: ブログ
  text: Agent における OTLP の取り込み
- link: https://www.datadoghq.com/blog/aws-opentelemetry-lambda-layer-datadog/
  tag: ブログ
  text: OpenTelemetry 用の AWS のマネージド Lambda レイヤーについて
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: ブログ
  text: Datadog RUM イベントと OpenTelemetry インスツルメンテーションされたアプリケーションのトレースを相関させる
- link: https://www.datadoghq.com/blog/opentelemetry-runtime-metrics-datadog/
  tag: ブログ
  text: Datadog APM で OTel インスツルメンテーションさ れたアプリのランタイムメトリクスを監視する
- link: https://www.datadoghq.com/blog/otel-deployments/
  tag: ブログ
  text: OpenTelemetry のデプロイメントを選択する方法
- link: https://learn.datadoghq.com/courses/otel-with-datadog
  tag: ラーニングセンター
  text: Datadog を利用した OpenTelemetry の紹介
- link: https://learn.datadoghq.com/courses/understanding-opentelemetry
  tag: ラーニングセンター
  text: OpenTelemetry について理解する
title: Datadog の OpenTelemetry
---
{{< learning-center-callout hide_image="true" header="学習センターで「Datadog を利用した OpenTelemetry の紹介」をお試しくださいer" btn_title="今すぐ登録" btn_url="https://learn.datadoghq.com/courses/otel-with-datadog">}}
  OpenTelemetry を構成して、Datadog にメトリクス、トレース、ログをエクスポートし、プラットフォームで収集したデータを探索する方法について説明します。
{{< /learning-center-callout >}}

## 概要 {#overview}

[OpenTelemetry][1] (OTel) は、テレメトリデータを収集し、ルーティングするための標準化されたプロトコルを提供します。既存の Datadog インフラストラクチャーを使用している場合であっても、ベンダーに依存しないセットアップを好む場合であっても、Datadog では、OpenTelemetry でインスツルメンテーションされたアプリケーションからテレメトリデータを収集し分析するための複数の方法がサポートされています。

### なぜ Datadog と OpenTelemetry か？{#why-opentelemetry-with-datadog}

Datadog では、ソースに関係なく、すべてのアプリケーションテレメトリに対して高度な監視可能性が提供されています。OpenTelemetry をサポートすることにより、Datadog では以下のものが提供されています。

- **柔軟性と選択肢**: 標準化されたインスツルメンテーションを使用しながら、技術ニーズの進化に応じて適応する自由を維持します。
- **包括的な言語サポート**: テクノロジースタック全体を通じてアプリケーションが一貫して監視されます。
- **統一インスツルメンテーション**: システム全体でインスツルメンテーションに対する単一のアプローチが維持されます。
- **強力な分析**: OpenTelemetry の標準化が Datadog の堅牢な分析、視覚化、アラート機能と組み合わされています。

OpenTelemetry をすでに使用しているか、または導入を検討しているかのどちらの場合であっても、Datadog はニーズに応じた柔軟なオプションを提供します。

### 重要な決定{#key-decisions}

Datadog 利用を伴う OpenTelemetry を使用する際には、2つの重要な決定を下す必要があります。

- [アプリケーションにインスツルメンテーションを施す方法](#instrument-your-applications)
- [データを Datadog に送信する方法](#send-opentelemetry-data-to-datadog)

利用可能な機能は、これらの選択に依存します。たとえば、Datadog SDK と共に OpenTelemetry API を使用する場合、OpenTelemetry SDK だけを使用するよりも多くの Datadog 機能にアクセスできます。

詳細については、[機能の互換性][9]をお読みください。

## アプリケーションのインスツルメンテーション {#instrument-your-applications}

OpenTelemetry と Datadog を使ってアプリケーションにインスツルメンテーションを施す方法はいくつかあります。アプローチごとには、提供される機能とベンダー中立性のレベルが異なります。

- **フル OpenTelemetry**: ベンダー中立セットアップのために OpenTelemetry SDK と API を使用します。
- **OpenTelemetry API**: Datadog の SDK 実装と共に OpenTelemetry API を使用します。
- **OpenTelemetry インスツルメンテーションライブラリ**: Datadog の監視可能性を追加のフレームワークや技術に拡張します。

詳細については、[アプリケーションのインスツルメンテーション][8]をご覧ください。

## OpenTelemetry のデータを Datadog に送信する {#send-opentelemetry-data-to-datadog}

アプリケーションやサービスが OpenTelemetry ライブラリでインスツルメントされている場合、トレース、メトリクス、ログのデータを Datadog に取り込む方法を選択することができます。

<div class="alert alert-info"><strong>自分にとってどのセットアップが最適か分からない場合</strong><br><a href="/opentelemetry/compatibility/">機能の互換性</a>の表を見て、どの Datadog 機能がサポートされているかを理解してください。</div>

### オプション 1: Datadog Agent と DDOT コレクターを使用する (推奨) {#option-1-use-the-datadog-agent-with-ddot-collector-recommended}

{{< img src="/opentelemetry/setup/ddot-collector-2.png" alt="Datadog Agent 組み込みの DDOT コレクターのアーキテクチャの概要。" style="width:100%;" >}}

**最適用途**: OpenTelemetry のベンダー中立性と Datadog エコシステムの革新性を両方活用したいユーザー向け、たとえば、

- Fleet Automation
- ライブ Container Monitoring
- Kubernetes エクスプローラー
- Live Processes
- Cloud Network Monitoring
- Universal Service Monitoring
- {{< translate key="integration_count" >}}+ Datadog インテグレーション

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/" >}}DDOT Collector で Datadog Agent を使用する方法の詳細{{< /nextlink >}}
{{< /whatsnext >}}

### オプション 2: OpenTelemetry Collector を使用する場合 {#option-2-use-the-opentelemetry-collector}

{{< img src="/opentelemetry/setup/otel-collector.png" alt="図: コード内で OpenTelemetry SDK から OTLP 経由でデータが、Datadog エクスポーターを使用して OpenTelemetry コレクターを実行しているホストに転送され、次にそこから Datadog の監視可能性プラットフォームに転送されます。" style="width:100%;" >}}

**最適用途**: 完全にベンダー中立なセットアップを望む新規または既存の OpenTelemetry ユーザー。

- Datadog に OpenTelemetry データを送信するための完全なベンダー中立性
- テールベースのサンプリングやデータ変換などの柔軟な構成オプション

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/" >}}OpenTelemetry コレクターの使用についての詳細{{< /nextlink >}}
{{< /whatsnext >}}

### 追加のセットアップオプション {#additional-setup-options}

直接 OTLP 取り込みなど、その他のセットアップオプションについて詳しくは、[データを Datadog に送信する][7]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[7]: /ja/opentelemetry/setup
[8]: /ja/opentelemetry/instrument/
[9]: /ja/opentelemetry/compatibility/