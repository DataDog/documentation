---
algolia:
  tags:
  - apm
  - application performance monitoring
  - distributed tracing
  - trace
  - tracing
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
  text: Datadog APM の最新リリースをチェック！(アプリログインが必要です)
- link: https://learn.datadoghq.com/courses/getting-started-apm
  tag: ラーニングセンター
  text: APM メトリクスとトレースの概要
- link: https://www.datadoghq.com/blog/monitor-rust-otel/
  tag: ブログ
  text: OpenTelemetry を使用して Rust アプリケーションを監視する方法
- link: https://www.datadoghq.com/blog/span-based-metrics/
  tag: ブログ
  text: スパンベースのメトリクスを生成し、アプリケーションパフォーマンスの過去の傾向を追跡
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: ブログ
  text: APM セキュリティビューでリスク、脆弱性、攻撃を可視化する
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: ブログ
  text: Datadog で Azure App Service 上の Linux Web アプリを監視する
- link: https://www.datadoghq.com/blog/monitor-apis-datadog-api-catalog/
  tag: ブログ
  text: Datadog API カタログで API のパフォーマンス、セキュリティ、所有権を管理する
- link: https://www.datadoghq.com/blog/software-catalog/
  tag: ブログ
  text: Software Catalog でデベロッパー エクスペリエンスとコラボレーションを向上させる
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: ブログ
  text: Datadog の CSI ドライバーにより、高パフォーマンスの監視可能性を提供して Kubernetes 環境のセキュリティを確保する
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: APM の理解を深めるためのインタラクティブセッションに参加しましょう
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: ブログ
  text: Datadog で GitLab ソースコード統合を使用して迅速にトラブルシューティングを実行する
- link: https://www.datadoghq.com/blog/pubsub-cloud-run-tracing
  tag: ブログ
  text: Datadog を使用して Cloud Run で Google Pub/Sub ワークロードをトレースする
- link: https://www.datadoghq.com/blog/analyzing-roundtrip-query-latency
  tag: ブログ
  text: 往復クエリレイテンシーの分析
title: APM
---
{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/381554158/rendition/1080p/file.mp4?loc=external&signature=e19b4e64632c3b1a42b11cb27fca2682dfadecd4690774c005ba2f5079b6a416" poster="/images/poster/tracing.png" >}}

</br>


{{< learning-center-callout header="エンゲージメントウェビナーセッションに参加する" hide_image="true" btn_title="サインアップ" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=APM">}}
  初級または中級のトレーニングセッションに参加して、Datadog Application Performance Monitoring (APM) が、ブラウザやモバイルアプリケーションからバックエンドサービスやデータベースに至るまで、AI を活用したコードレベルの分散トレースをどう提供しているか、詳細をご確認ください。
{{< /learning-center-callout >}}

## 概要 {#overview}

Datadog Application Performance Monitoring (APM) は、アプリケーションを詳細に可視化することで、パフォーマンスのボトルネックを特定し、問題をトラブルシューティングし、サービスを最適化することを可能にします。分散トレース、すぐに使えるダッシュボード、他のテレメトリとのシームレスな相関により、Datadog APM は、アプリケーションのパフォーマンスとユーザーエクスペリエンスを最適化するのに役立ちます。

Datadog APM で使用される用語の紹介は、[APM の用語と概念][1]を参照してください。

## はじめに {#getting-started}

Datadog APM を始める最も簡単な方法は、シングルステップインスツルメンテーションです。このアプローチでは、Datadog Agent をインストールし、アプリケーションをインスツルメントする手順が 1 ステップにまとまっており、追加の設定ステップは不要です。詳しくは、[シングルステップインスツルメンテーション][27]をお読みください。

よりカスタマイズが必要なセットアップに対応するため、Datadog は Datadog SDK と Datadoc UI の[Dynamic Instrumentation][30]を使ったカスタムインスツルメンテーションをサポートしています。詳しくは、[アプリケーションインスツルメンテーション][2]をお読みください。

<div class="alert alert-info">Datadog APM が初めての場合は、<a href="https://docs.datadoghq.com/getting_started/tracing/">APM の製品概要</a>をお読みいただき、トレースを Datadog に送信する方法について詳細をご確認ください。</div>

## ユースケース {#use-cases}

Datadog APM がそれぞれのユースケースにどのように対応できるか、いくつかの例をご紹介します。

| 実現したいこと...| Datadog APMがどう役立つか |
| ----------- | ----------- |
| リクエストがシステム内をどのように流れるかを理解する。| [Trace Explorer][21] を使用して、分散サービス全体を対象にクエリを実行して、エンドツーエンドのトレースを視覚化します。|
| 個別サービスの健全性とパフォーマンスを監視する。| [サービス詳細ページ][26]と[リソースページ][28]を使用し、パフォーマンスメトリクスの分析、デプロイメントの追跡、問題のあるリソースの特定を通じてサービスの健全性を評価します。|
| トレースをDBM、RUM、ログ、Synthetics、プロファイルと相関付ける。| [APM データとその他のテレメトリーとの相関付け][20]を実行し、データにコンテキストを付与して、より包括的な分析を可能にします。|
| Datadog へのデータの流れを制御する。| [Ingestion Control[6] を使用して、サービスやリソースごとの取り込みの構成とサンプリングレートを調整します。[保持フィルター][7]を使用して、どのスパンを 15 日間保持するかを選択します。|

### Trace Explorer {#trace-explorer}

[Trace Explorer][21] を使用すると、トレースをリアルタイムで検索および分析できます。パフォーマンスのボトルネックの特定、エラーのトラブルシューティング、関連ログやメトリクスへのピボットにより、問題を取り巻くコンテキストを完全に理解することができます。

{{< img src="/tracing/trace_explorer/trace_explorer.png" alt="Trace Explorer ビュー。" style="width:100%;" >}}

### サービス詳細画面 {#service-page}

[サービス詳細ページ][26]は、サービスのパフォーマンスを監視し、[デプロイ中にバージョン間の比較][15]を行うのに役立ちます。

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="サービス詳細画面上のバージョン" style="width:100%;">}}

### トレースを他のテレメトリーと相関付ける {#correlating-traces-with-other-telemetry}

Datadog APM は、ログ、リアルユーザーモニタリング (RUM)、Synthetic モニタリングなどとシームレスに連携します。

- [アプリケーションログをトレースと並べて表示する][9]ことで、特定のリクエスト、サービス、バージョンに関するログを見つけることができます。
- [RUM セッションをバックエンドのトレースと関連付ける][10]ことで、バックエンドのパフォーマンスがユーザーエクスぺリンスに与える影響を理解できます。
- [Synthetic テストをトレースと関連付ける][11]ことで、フロントエンドとバックエンドの両方のリクエストに関して、障害のトラブルシューティングを行うことができます。

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="ログとトレースの接続" style="width:100%;">}}

### 取り込み制御と保持フィルター {#ingestion-controls-and-retention-filters}

トレースはインスツルメンツされたアプリケーションで開始され、Datadog に取り込まれます。

Datadog APM には、トレースデータの量と保持を管理するためのツールが用意されています。[Ingestion Control][6] を使用することにより、サンプリングレートを調整したり、[保持フィルター][7]を使用して保存するスパンを制御したりします。

{{< img src="/tracing/apm_lifecycle/apm_lifecycle_0.png" alt="Datadog APM を通るデータの流れ" style="width:100%;" >}}

## トラブルシューティング {#troubleshooting}

トラブルシューティングのサポートについては、[APM トラブルシューティング][29]ガイドをご覧ください。

## 参考資料 {#further-reading}

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
[10]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm
[11]: /ja/synthetics/apm/
[12]: /ja/tracing/trace_explorer/#live-search-for-15-minutes
[13]: /ja/tracing/services/services_map/
[14]: /ja/tracing/services/service_page/
[15]: /ja/tracing/services/deployment_tracking/
[16]: /ja/profiler/
[17]: /ja/tracing/trace_collection/automatic_instrumentation/
[18]: /ja/tracing/trace_collection/custom_instrumentation/
[19]: /ja/tracing/metrics/
[20]: /ja/tracing/other_telemetry/
[21]: /ja/tracing/trace_explorer/
[22]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[23]: /ja/agent/
[24]: /ja/tracing/metrics/metrics_namespace/
[25]: /ja/tracing/metrics/runtime_metrics/
[26]: /ja/tracing/services/service_page/
[27]: /ja/tracing/trace_collection/single-step-apm/
[28]: /ja/tracing/services/resource_page/
[29]: /ja/tracing/troubleshooting/
[30]: /ja/tracing/dynamic_instrumentation/