---
aliases:
- /ja/tracing/faq/terminology
- /ja/tracing/guide/terminology
- /ja/tracing/guide/distributed_tracing/
- /ja/tracing/advanced/
- /ja/tracing/api
- /ja/tracing/faq/distributed-tracing/
description: パフォーマンス向上のためにコードを操作する
further_reading:
- link: https://app.datadoghq.com/release-notes?category=APM
  tag: リリースノート
  text: Datadog APM の最新リリースをチェック！ (アプリログインが必要です)。
- link: /tracing/guide/setting_primary_tags_to_scope/
  tag: Documentation
  text: トレースにプライマリタグとセカンダリタグを追加する
- link: /tracing/guide/add_span_md_and_graph_it/
  tag: Documentation
  text: カスタムタグをスパンに追加して、パフォーマンスをフィルタリング、グループ化する
- link: /tracing/guide/security/
  tag: Documentation
  text: トレースから PII を自動的にスクラブする
- link: /tracing/metrics/metrics_namespace/
  tag: Documentation
  text: トレースメトリクスとそのタグについて学ぶ
- link: /tracing/glossary/
  tag: Documentation
  text: APM の用語と概念を学ぶ
- link: https://www.datadoghq.com/blog/span-based-metrics/
  tag: ブログ
  text: スパンベースのメトリクスを生成し、アプリケーションパフォーマンスの過去の傾向を追跡
kind: documentation
title: APM
---

{{< vimeo 381554158 >}}

</br>

Datadog Application Performance Monitoring (APM) は、Web サービス、キュー、データベースがリクエスト、エラー、レイテンシーを監視するための**標準のパフォーマンスダッシュボード**を使用して、アプリケーションを詳細に可視化します。分散型トレースは、ホスト、コンテナ、プロキシ、サーバーレス機能全体で、ブラウザセッション、ログ、プロファイル、synthetic チェック、ネットワーク、プロセス、インフラストラクチャーのメトリクスに**シームレスに関連付けられます**。コードのホットスポットで、遅延しているトレースの調査から、パフォーマンスのボトルネックになっている**特定のコード行**を識別へ直接移動できます。

Datadog APM で使用される用語の紹介は、[APM の用語と概念][1]を参照してください。

## Datadog へトレースを送信

モノリスからマイクロサービスに移行すると、ホスト、コンテナ、またはサーバーレス機能全体の Datadog APM の設定に数分しかかかりません。

トレースの対象が[プロキシ][3]または [AWS Lambda 関数][4]およびホスト全体なのか、また自動インスツルメンテーション、dd-trace-api、または [OpenTelemetry][5] のいずれを使用するのかに応じて、ご使用の環境および言語に [Datadog Tracing Library を追加][2]します。

{{< partial name="apm/apm-compatibility.html" >}}

<br>

## Datadog に流入するデータ、Datadog が保持するデータの制御と管理

{{< img src="tracing/apm_lifecycle/apm_lifecycle_0.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="APM ライフサイクル" >}}

トレースは、インスツルメントされたアプリケーションで開始し Datadog へ流れます。高スループットのサービスの場合は、[Ingestion Controls][1] を使用して取り込みを表示、制御できます。取り込まれたすべてのトレースは、15 分間ライブ検索および分析が可能です。また、タグベースのカスタム[保持フィルター][7]を使用して、ビジネスに有用なトレースを 15 日間保持し、検索、分析できます。

{{< img src="tracing/index/RetentionFilterTracingPage.png" alt="トレースの保持と収集"  style="width:100%;">}}

## スパンからカスタムメトリクスを生成

取り込んだすべてのスパンから 15 か月間保持される[メトリクスを生成][8]して、主要なビジネスおよびパフォーマンスの指標を作成、長期的に監視します。

{{< img src="tracing/index/SpantoMetricsPreview.png" alt="取り込んだスパンからカスタムメトリクスを生成する"  style="width:100%;">}}

## トレースと他のテレメトリーとの連携

[アプリケーションログ][9]と、自動トレース ID 挿入による単一の分散リクエストのトレースを並べて表示することができます。[実際のユーザーセッション][10]とトレースをリンクさせ、ユーザーの経験や報告された問題に対応する正確なトレースを確認することができます。フロントエンド、ネットワーク、バックエンドのリクエストにまたがる障害の根本原因を見つけるために、トレースと[シミュレーションテストのリンク][11]を行います。

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="ログとトレースをつなげる"  style="width:100%;">}}

## ライブトレースとインデックストレースの確認

[取り込んだトレースの検索][12]を任意のタグで、15 分間ライブで実行できます。停止中に任意のスパンの任意のタグでパフォーマンスを分析し、影響を受けたユーザーやトランザクションを特定します。リクエストフローを示すマップやその他の視覚化により、コードが何をしているのか、どこでパフォーマンスを向上させることができるのかを理解することができます。

{{< img src="tracing/live_search/live-search.mp4" alt="Live Search リスト表示" video="true" >}}

## サービスに対する深い洞察力を得る

トレースから自動生成されたサービスマップとサービスパフォーマンスメトリクスおよびモニターアラート状態のモニタリングにより[サービスの依存関係を理解します][13]。

{{< img src="tracing/index/ServiceMapInspect.mp4" alt="サービスマップ" video=true style="width:100%;">}}

リクエスト、エラー、レイテンシーパーセンタイルに関する[サービスメトリクスを監視][14]します。インフラストラクチャーに関連づけられた個々のデータベースクエリまたはエンドポイントを分析します。

{{< img src="tracing/index/ServicePage.png" alt="サービスページ" style="width:100%;">}}

[サービスパフォーマンスを監視][15]して、ローリング、ブルー/グリーン、シャドウ、またはカナリアデプロイに対しバージョン間で比較します。

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="サービス詳細画面のバージョン"  style="width:100%;">}}

## 本番環境コードのプロファイル

CPU、メモリ、または I/O を最も多く消費するコード行を特定するために、常時稼働の本番環境プロファイリングにより[アプリケーションのレイテンシーを向上][16]し、リソースの計算を最適化します。

{{< img src="tracing/index/Profiling.png" alt="プロファイリング"  style="width:100%;">}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/glossary/
[2]: /ja/tracing/trace_collection/dd_libraries/java
[3]: /ja/tracing/trace_collection/proxy_setup/
[4]: /ja/serverless/distributed_tracing
[5]: /ja/tracing/trace_collection/open_standards/
[6]: /ja/tracing/trace_pipeline/ingestion_controls/
[7]: /ja/tracing/trace_pipeline/trace_retention/#retention-filters
[8]: /ja/tracing/trace_pipeline/generate_metrics/
[9]: /ja/tracing/other_telemetry/connect_logs_and_traces/
[10]: /ja/real_user_monitoring/connect_rum_and_traces
[11]: /ja/synthetics/apm/
[12]: /ja/tracing/trace_explorer/#live-search-for-15-minutes
[13]: /ja/tracing/services/services_map/
[14]: /ja/tracing/services/service_page/
[15]: /ja/tracing/services/deployment_tracking/
[16]: /ja/profiler/