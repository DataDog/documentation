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
  text: Datadog APM の最新リリースをご覧ください！ (アプリへのログインが必要です)
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

## 概要

Datadog アプリケーションパフォーマンス監視機能 (APM) は、アプリケーションの深いところまで可視化し、パフォーマンスのボトルネックの特定、問題のトラブルシューティング、サービスの最適化を可能にします。分散型トレーシング、すぐに使えるパフォーマンスダッシュボード、その他のテレメトリーデータとのシームレスな相関付けにより、Datadog APM はアプリケーションで最高のパフォーマンスとユーザーエクスペリエンスを実現するのに役立ちます。

Datadog APM で使用される用語の紹介は、[APM の用語と概念][1]を参照してください。

## はじめに

Datadog APM の利用を開始する場合は、シングルステップのインスツルメンテーションを利用するのが最も簡単です。この方法であれば、Datadog Agent のインストールとアプリケーションのインスツルメンテーションをワンステップで行うことができ、追加の構成手順は必要ありません。詳しくは、[シングルステップのインスツルメンテーション][27]をご覧ください。

よりカスタマイズが必要なセットアップに対応するため、Datadog は Datadog トレーシングライブラリを使ったカスタムインスツルメンテーションをサポートしています。詳しくは、[アプリケーションのインスツルメンテーション][2]をご覧ください。

## ユースケース

Datadog APM がそれぞれのユースケースにどのように対応できるか、いくつかの例をご紹介します。

| 実現したいこと| Datadog APM の活用方法 |
| ----------- | ----------- |
| リクエストがシステム内をどのように流れるかを理解する。 | [トレースエクスプローラー][21]を使用して、分散サービス全体を対象にクエリを実行して、エンドツーエンドのトレースを視覚化します。 |
| 個別サービスの健全性とパフォーマンスを監視する。 | [サービス詳細ページ][26]と[リソースページ][28]を使用し、パフォーマンスメトリクスの分析、デプロイメントの追跡、問題のあるリソースの特定を通じてサービスの健全性を評価します。 |
| トレースをDBM、RUM、ログ、Synthetics、プロファイルと相関付ける。 | [APM データとその他のテレメトリーとの相関付け][20]を行い、データにコンテキストを付与して、より包括的な分析を可能にします。 |
| Datadog へのデータの流れを制御する。 | [取り込み制御][6]を使用して、サービスやリソースごとの取り込みの構成とサンプリングレートを調整します。[保持フィルター][7]を使用して、どのスパンを 15 日間保持するかを選択します。 |

### プロファイラーの有効化

[トレースエクスプローラー][21]を使用すると、トレースをリアルタイムで検索・分析することができます。パフォーマンスのボトルネックの特定、エラーのトラブルシューティング、関連ログやメトリクスへのピボットにより、問題を取り巻くコンテキストを完全に理解することができます。

{{< img src="/tracing/trace_explorer/trace_explorer.png" alt="トレースエクスプローラーの画面。" style="width:100%;" >}}

### サービス詳細画面

[サービス詳細ページ][26]は、サービスのパフォーマンスを監視し、[デプロイ中にバージョン間の比較][15]を行うのに役立ちます。

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="サービス詳細画面のバージョン" style="width:100%;">}}

### トレースを他のテレメトリーと相関付ける

Datadog APM は、ログ、リアルユーザーモニタリング (RUM)、Synthetic モニタリングなどとシームレスに連携します。

- [アプリケーションログをトレースと並べて表示する][9]ことで、特定のリクエスト、サービス、バージョンに関するログを見つけることができます。
- [RUM セッションをバックエンドのトレースと関連付ける][10]ことで、バックエンドのパフォーマンスがユーザーエクスぺリンスに与える影響を理解できます。
- [Synthetic テストをトレースと関連付ける][11]ことで、フロントエンドとバックエンドの両方のリクエストに関して、障害のトラブルシューティングを行うことができます。

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="ログとトレースをつなげる" style="width:100%;">}}

### 取り込み制御と保持フィルター

トレースはインスツルメンツされたアプリケーションで開始され、Datadog に取り込まれます。

Datadog APM は、トレースデータの量と保持を管理するためのツールを提供します。[取り込み制御][6]を使用して、サンプリングレートと[保持フィルター][7]を調整することで、どのスパンを保持するかを制御することができます。

{{< img src="/tracing/apm_lifecycle/apm_lifecycle_0.png" alt="Datadog APM を通したデータの流れ。" style="width:100%;" >}}

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
[10]: /ja/real_user_monitoring/platform/connect_rum_and_traces
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