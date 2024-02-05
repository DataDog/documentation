---
algolia:
  tags:
  - apm
  - application performance monitoring
  - distributed tracing
aliases:
- /ja/tracing/faq/terminology
- /ja/tracing/guide/terminology
- /ja/tracing/guide/distributed_tracing/
- /ja/tracing/advanced/
- /ja/tracing/api
- /ja/tracing/faq/distributed-tracing/
cascade:
  algolia:
    rank: 70
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
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: ブログ
  text: APM セキュリティビューでリスク、脆弱性、攻撃を視覚化する
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: ブログ
  text: Datadog で Azure App Service 上の Linux Web アプリを監視する
- link: https://www.datadoghq.com/blog/monitor-apis-datadog-api-catalog/
  tag: ブログ
  text: Datadog API カタログで API のパフォーマンス、セキュリティ、所有権を管理する
- link: https://dtdg.co/fe
  tag: 基盤の活用
  text: APM の理解を深めるためのインタラクティブなセッションにご参加ください
kind: documentation
title: APM
---

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/381554158/rendition/1080p/file.mp4?loc=external&signature=e19b4e64632c3b1a42b11cb27fca2682dfadecd4690774c005ba2f5079b6a416" poster="/images/poster/tracing.png" >}}

</br>

Datadog Application Performance Monitoring (APM) は、Web サービス、キュー、データベースがリクエスト、エラー、レイテンシーを監視するための**標準のパフォーマンスダッシュボード**を使用して、アプリケーションを詳細に可視化します。分散型トレースは、ホスト、コンテナ、プロキシ、サーバーレス機能全体で、ブラウザセッション、ログ、プロファイル、synthetic チェック、ネットワーク、プロセス、インフラストラクチャーのメトリクスに**シームレスに関連付けられます**。コードのホットスポットで、遅延しているトレースの調査から、パフォーマンスのボトルネックになっている**特定のコード行**を識別へ直接移動できます。

Datadog APM で使用される用語の紹介は、[APM の用語と概念][1]を参照してください。

## はじめに

モノリスからマイクロサービスに移行すると、ホスト、コンテナ、またはサーバーレス関数全体の Datadog APM の設定に数分しかかかりません。

<div class="alert alert-info">
<strong>ベータ版: シングルステップ APM インスツルメンテーション</strong> - Datadog Agent のインストール時に APM インスツルメンテーションを有効にして、アプリケーションパフォーマンスモニタリングを素早く開始することができます。このオプションは、コードを変更することなく、自動的にサービスをインスツルメンテーションします。詳細については、<a href="/tracing/trace_collection/single-step-apm">シングルステップ APM インスツルメンテーション</a>をお読みください。
</div>

**[アプリケーションインスツルメンテーション][2]を読んで、Datadog APM を使い始めましょう。**

[プロキシのトレース][3]、[AWS Lambda 関数][4]のトレース、[自動インスツルメンテーション][17]や[カスタムインスツルメンテーション][18]の使用など、環境と言語に合わせて Datadog トレーシングライブラリを追加します。

## Datadog に流入するデータ、Datadog が保持するデータの制御と管理

{{< img src="tracing/apm_lifecycle/apm_lifecycle_0.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="APM ライフサイクル" >}}

トレースは、インスツルメントされたアプリケーションで開始し Datadog へ流れます。高スループットのサービスの場合は、[Ingestion Controls][1] を使用して取り込みを表示、制御できます。取り込まれたすべてのトレースは、15 分間ライブ検索および分析が可能です。また、タグベースのカスタム[保持フィルター][7]を使用して、ビジネスに有用なトレースを 15 日間保持し、検索、分析できます。

{{< img src="tracing/index/RetentionFilterTracingPage.png" alt="トレースの保持と収集" style="width:100%;">}}

## スパンからカスタムメトリクスを生成

取り込んだすべてのスパンから 15 か月間保持される[メトリクスを生成][8]して、主要なビジネスおよびパフォーマンスの指標を作成、長期的に監視します。

{{< img src="tracing/index/SpantoMetricsPreview.png" alt="取り込んだスパンからカスタムメトリクスを生成する" style="width:100%;">}}

## トレースを他のテレメトリーと相関付ける

[アプリケーションログ][9]と、自動トレース ID 挿入による単一の分散リクエストのトレースを並べて表示することができます。[実際のユーザーセッション][10]とトレースをリンクさせ、ユーザーの経験や報告された問題に対応する正確なトレースを確認することができます。フロントエンド、ネットワーク、バックエンドのリクエストにまたがる障害の根本原因を見つけるために、トレースと[シミュレーションテストのリンク][11]を行います。

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="ログとトレースをつなげる" style="width:100%;">}}

## ライブトレースとインデックストレースの確認

[取り込んだトレースの検索][12]を任意のタグで、15 分間ライブで実行できます。停止中に任意のスパンの任意のタグでパフォーマンスを分析し、影響を受けたユーザーやトランザクションを特定します。リクエストフローを示すマップやその他の視覚化により、コードが何をしているのか、どこでパフォーマンスを向上させることができるのかを理解することができます。

{{< img src="tracing/live_search/live-search.mp4" alt="Live Search リスト表示" video="true" >}}

## サービスに対する深い洞察力を得る

トレースから自動生成されたサービスマップとサービスパフォーマンスメトリクスおよびモニターアラート状態のモニタリングにより[サービスの依存関係を理解します][13]。

{{< img src="tracing/index/ServiceMapInspect.mp4" alt="サービスマップ" video=true style="width:100%;">}}

リクエスト、エラー、レイテンシーパーセンタイルに関する[サービスメトリクスを監視][14]します。インフラストラクチャーに関連づけられた個々のデータベースクエリまたはエンドポイントを分析します。

{{< img src="tracing/index/ServicePage.png" alt="サービスページ" style="width:100%;">}}

[サービスパフォーマンスを監視][15]して、ローリング、ブルー/グリーン、シャドウ、またはカナリアデプロイに対しバージョン間で比較します。

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="サービス詳細画面のバージョン" style="width:100%;">}}

## 本番環境コードのプロファイル

CPU、メモリ、または I/O を最も多く消費するコード行を特定するために、常時稼働の本番環境プロファイリングにより[アプリケーションのレイテンシーを向上][16]し、リソースの計算を最適化します。

{{< img src="tracing/index/Profiling.png" alt="プロファイリング" style="width:100%;">}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/glossary/
[2]: /ja/tracing/trace_collection/
[3]: /ja/tracing/trace_collection/proxy_setup/
[4]: /ja/serverless/distributed_tracing
[5]: /ja/tracing/trace_collection/otel_instrumentation/
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
[17]: /ja/tracing/trace_collection/automatic_instrumentation/
[18]: /ja/tracing/trace_collection/custom_instrumentation/