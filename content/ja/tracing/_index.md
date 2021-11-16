---
title: APM & Continuous Profiler
kind: documentation
description: パフォーマンス向上のためにコードを操作する
further_reading:
  - link: /tracing/guide/setting_primary_tags_to_scope/
    tag: Documentation
    text: トレースにプライマリタグとセカンダリタグを追加する
  - link: /tracing/guide/add_span_md_and_graph_it/
    tag: Documentation
    text: カスタムタグをスパンに追加して、パフォーマンスを分類する
  - link: /tracing/guide/security/
    tag: Documentation
    text: トレースから PII を自動的にスクラブする
  - link: /tracing/guide/metrics_namespace/
    tag: Documentation
    text: トレースメトリクスとそのタグについて学ぶ
  - link: /tracing/visualization/
    tag: Documentation
    text: APM の UI の利用について学ぶ
aliases:
  - /ja/tracing/faq/terminology
  - /ja/tracing/guide/terminology
  - /ja/tracing/guide/distributed_tracing/
  - /ja/tracing/advanced/
  - /ja/tracing/api
  - /ja/tracing/faq/distributed-tracing/
---
{{< vimeo 381554158 >}}

</br>

Datadog APM と Continuous Profiler は、Web サービス、キュー、データベースがリクエスト、エラー、レイテンシーを監視するための**標準のパフォーマンスダッシュボード**を使用して、アプリケーションを詳細に可視化します。分散型トレースは、ホスト、コンテナ、プロキシ、サーバーレス機能全体で、ブラウザセッション、ログ、プロファイル、synthetic チェック、ネットワーク、プロセス、インフラストラクチャーのメトリクスに**シームレスに関連付けられます**。コードのホットスポットで、遅延しているトレースの調査から、パフォーマンスのボトルネックになっている**特定のコード行**を識別へ直接移動できます。

#### Tracing Without Limits: トレースジャーニー

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-0.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースジャーニー" >}}

トレースは、インスツルメントされたアプリケーションで開始し Datadog へ流れ、トレースの 100%、1 秒につき最大 50 トレース（APM ホストあたり）まで収集します。高スループットのサービスに必要な場合は、[Ingestion Controls][1] を使用してこれを表示、制御できます。収集されたすべてのトレースは、15 分間ライブ検索および分析が可能です。また、タグベースのカスタム[保持フィルター][2]を使用して、ビジネスに有用なトレースを 15 日間保持し、検索、分析できます。

## Datadog へトレースを送信

モノリスからマイクロサービスに移行すると、ホスト、コンテナ、またはサーバーレス機能全体の Datadog APM の設定に数分しかかかりません。

[Datadog Tracing Library を追加し][3]、ご使用の環境および言語、トレースの対象が[プロキシ][4]または [AWS Lambda 関数][5]全体なのか、また自動インスツルメンテーション、dd-trace-api、[OpenTracing、または OpenTelemetry][6] のいずれを使用するのかに応じて、手順を見つけます。

{{< partial name="apm/apm-compatibility.html" >}}

<br>

## Datadog APM の確認

これで、トレースを Datadog に送信するようにアプリケーションを構成したので、アプリケーションのパフォーマンスに関する情報を入手できます。

### サービスマップ

トレースから自動生成されたサービスマップとサービスパフォーマンスメトリクスおよびモニターアラート状態のモニタリングにより[サービスの依存関係を理解します][7]。

{{< img src="tracing/index/ServiceMapInspect.gif" alt="サービスマップ"  style="width:100%;">}}

### サービスパフォーマンスダッシュボード

リクエスト、エラー、レイテンシーパーセンタイルに関する[サービスメトリクスを監視][8]します。インフラストラクチャーに関連づけられたデータベースクエリまたはエンドポイントにドリルダウンします。

{{< img src="tracing/index/ServicePage.gif" alt="サービスページ"  style="width:100%;">}}

### Continuous Profiler

CPU、メモリ、または I/O を最も多く消費するコード行を特定するために、常時稼働の本番環境プロファイリングにより[アプリケーションのレイテンシーを向上][9]し、リソースの計算を最適化します。

{{< img src="tracing/index/Profiling.png" alt="プロファイリング"  style="width:100%;">}}

### Live search

タグを使用して、サンプリングなしのライブで 15 分間、[トレースの 100% を検索][10]します。

{{< img src="tracing/live_search/LiveSearch.mp4" alt="Live Search" video="true" >}}

### Live analytics

停止中に、15 分間ライブで[任意のタグにより任意のスパンのパフォーマンスを分析][11]し、影響を受けたユーザーまたはトランザクションを特定します。

{{< img src="tracing/live_search/LiveAnalytics.mp4" alt="Live Analytics" video="true" >}}

### デプロイ追跡

[サービスパフォーマンスを監視][12]して、ローリング、ブルー/グリーン、シャドウ、またはカナリアデプロイに対しバージョン間で比較します。

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="サービス詳細画面のバージョン"  style="width:100%;">}}

### トレースの取り込みと保存

タグベースの保持フィルターで、[最も重要なトレースを保持][13]し、インデックス化されたすべてのスパンで 15 日間分析を実行します。

{{< img src="tracing/index/RetentionFilterTracingPage.png" alt="トレースの保持と収集"  style="width:100%;">}}

### すべてのスパンからカスタムメトリクスを生成

取り込んだすべてのスパンから 15 か月間保持される[メトリクスを生成][14]して、主要なビジネスおよびパフォーマンスの指標を作成、監視します。

{{< img src="tracing/index/SpantoMetricsPreview.png" alt="取り込んだスパンからカスタムメトリクスを生成する"  style="width:100%;">}}

### ログと分散型トレースの接続

自動トレース ID インジェクションを使用した単一の分散リクエストのトレースと[アプリケーションログを並べて表示][15]します。

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="ログとトレースをつなげる"  style="width:100%;">}}

### リアルユーザーモニタリングとトレースの接続

[リアルユーザーセッションとトレースをリンク][16]して、ユーザーエクスペリエンスと報告された問題に対応する正確なトレースを確認します。

{{< img src="tracing/index/RumTraces.gif" alt="RUM セッションとトレースを接続する"  style="width:100%;">}}

### Synthetic テストデータとトレースの接続

トレースに[シュミレーションされた API テストをリンクして][17]、フロントエンド、ネットワーク、バックエンドリクエスト全体における障害の根本原因を突き止めます。

{{< img src="tracing/index/Synthetics.gif" alt="Synthetic テスト"  style="width:100%;">}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_retention_and_ingestion/#ingestion-controls
[2]: /ja/tracing/trace_retention_and_ingestion/#retention-filters
[3]: /ja/tracing/setup_overview/setup/java
[4]: /ja/tracing/setup_overview/proxy_setup/
[5]: /ja/tracing/setup_overview/serverless_functions/
[6]: /ja/tracing/setup_overview/open_standards/
[7]: /ja/tracing/visualization/services_map/
[8]: /ja/tracing/visualization/service/
[9]: /ja/tracing/profiler/
[10]: /ja/tracing/trace_search_and_analytics/#live-search-for-15-minutes
[11]: /ja/tracing/trace_search_and_analytics/#live-analytics-for-15-minutes
[12]: /ja/tracing/deployment_tracking/
[13]: /ja/tracing/trace_retention_and_ingestion/
[14]: /ja/tracing/generate_metrics/
[15]: /ja/tracing/connect_logs_and_traces/
[16]: /ja/real_user_monitoring/connect_rum_and_traces
[17]: /ja/synthetics/apm/