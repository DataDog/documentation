---
algolia:
  tags:
  - watchdog
aliases:
- /ja/tracing/watchdog
cascade:
  algolia:
    rank: 70
description: アプリケーションとインフラストラクチャーの潜在的な問題を自動的に検出
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Watchdog
  tag: リリースノート
  text: Datadog Watchdog の最新リリースをチェック！ (アプリログインが必要です)。
- link: https://www.datadoghq.com/blog/datadog-bits-generative-ai/
  tag: ブログ
  text: 新しい DevOps のコパイロット、Bits AI のご紹介
- link: /logs/
  tag: ドキュメント
  text: ログの収集
- link: /tracing/
  tag: ドキュメント
  text: トレースの収集
- link: https://www.datadoghq.com/blog/datadog-watchdog-automated-root-cause-analysis/
  tag: ブログ
  text: Watchdog RCA による自動化された根本原因分析
- link: https://www.datadoghq.com/blog/watchdog-impact-analysis/
  tag: ブログ
  text: Watchdog Impact Analysis によるユーザーインパクト範囲の把握
- link: https://www.datadoghq.com/blog/watchdog-live-processes/
  tag: ブログ
  text: ライブプロセス用 Watchdog Insights によるワークロードのパフォーマンス異常に対するトラブルシューティング
title: Datadog WatchdogTM
---
## 概要

Watchdog は Datadog の AI エンジンで、Datadog プラットフォーム全体にわたる可観測性データを基にした自動化されたアラート、洞察、根本原因分析を提供します。Watchdog は、インフラストラクチャーを継続的に監視し、最も重要なシグナルに注意を促し、問題の検出、トラブルシューティング、解決を支援します。

Watchdog 機能はすべて内蔵されており、セットアップの必要はありません。

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/781921620/rendition/1080p/file.mp4?loc=external&signature=8889419b739e3398d03a72edca4f96909144567e045d30deeb8f9345c43a682d" poster="/images/poster/watchdog.png" >}}

<br/>

### プロアクティブアラート

Watchdog は、システム、アプリケーション、デプロイメントに対して予期される動作のベースラインをプロアクティブに計算します。このベースラインは、異常な動作を検出するために使用されます。

{{< whatsnext desc="">}}
  {{< nextlink href="/watchdog/alerts">}}<u>Watchdog Alerts</u>: Watchdog Alerts の表示と解釈方法: 各アラートが提供する情報、アラートのカバー範囲、Datadog 全体での Watchdog アラートの検索場所。{{< /nextlink >}}
  {{< nextlink href="/watchdog/faulty_deployment_detection">}}<u>Faulty Deployment Detection</u>: Watchdog が不具合のあるコードデプロイメントをどのように特定するか。{{< /nextlink >}}
{{< /whatsnext >}}

Watchdog アルゴリズムをカスタマイズするには
  * [異常アルゴリズム][7]
  * [予測アルゴリズム][8]
  * [外れ値アルゴリズム][9]

### 調査支援

Watchdog は調査を支援するため、すべてのエクスプローラーでコンテキストベースの洞察を表示し、根本原因を検索し、ユーザーへの影響を判断します。

{{< whatsnext desc="">}}
  {{< nextlink href="/watchdog/insights">}}<u>Watchdog Insights</u>: Watchdog Insights は、問題の特定と解決を支援するレコメンデーションエンジンです。{{< /nextlink >}}
  {{< nextlink href="/watchdog/rca">}}<u>Root Cause Analysis</u>: Watchdog Root Cause Analysis (RCA) が異常の根本原因を見つける方法と、提供された情報の使用方法。{{< /nextlink >}}
  {{< nextlink href="/watchdog/impact_analysis">}}<u>Impact Analysis</u>: Watchdog がユーザーに悪影響を与える異常を特定する方法。{{< /nextlink >}}
{{< /whatsnext >}}

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][1]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: /ja/watchdog/alerts
[3]: /ja/watchdog/faulty_deployment_detection/
[4]: /ja/watchdog/insights?tab=logmanagement
[5]: /ja/watchdog/rca/
[6]: /ja/watchdog/impact_analysis/
[7]: /ja/monitors/types/anomaly/#anomaly-detection-algorithms
[8]: /ja/monitors/types/forecasts/?tab=linear#algorithms
[9]: /ja/monitors/types/outlier/?tab=dbscan#algorithms