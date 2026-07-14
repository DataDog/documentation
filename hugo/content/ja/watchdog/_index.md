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
- link: https://www.datadoghq.com/blog/ai-powered-metrics-monitoring/
  tag: ブログ
  text: Anomaly detection, predictive correlations - Using AI-assisted metrics monitoring
title: Datadog WatchdogTM
---
## 概要

Watchdog は Datadog の AI エンジンであり、Datadog プラットフォーム全体の可観測性データから抽出した自動化されたアラート、インサイト、根本原因分析を提供します。Watchdog は、インフラストラクチャーを継続的に監視し、最も重要なシグナルへの注意を促し、問題の検出、トラブルシューティング、解決を支援します。 

Watchdog の機能はすべてビルトインで提供され、セットアップは必要ありません。

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/781921620/rendition/1080p/file.mp4?loc=external&signature=8889419b739e3398d03a72edca4f96909144567e045d30deeb8f9345c43a682d" poster="/images/poster/watchdog.png" >}}

<br/>

### プロアクティブアラート

Watchdog は、システム、アプリケーション、およびデプロイメントで想定される動作のベースラインをプロアクティブに計算します。このベースラインは、異常動作の検出に使用されます。

{{< whatsnext desc="">}}
  {{< nextlink href="/watchdog/alerts">}}<u>Watchdog アラート</u>: Watchdog アラートの表示と解釈方法: 各アラートで提供される情報、アラートの対象、Datadog 内で Watchdog アラートを確認できる場所。{{< /nextlink >}}
  {{< nextlink href="/watchdog/faulty_deployment_detection">}}<u>デプロイメント不良の検出</u>: Watchdog はどのようにして欠陥のあるコードデプロイメントを見つけるか。{{< /nextlink >}}
{{< /whatsnext >}}

Watchdog アルゴリズムのカスタマイズ:
  * [異常検知アルゴリズム][7]
  * [予測値アルゴリズム][8]
  * [外れ値アルゴリズム][9]

### 調査の支援

調査を支援するため、Watchdog はすべてのエクスプローラーでコンテキストベースのインサイトを表示し、根本原因を検索し、ユーザへの影響を判断します。

{{< whatsnext desc="">}}
  {{< nextlink href="/watchdog/insights">}}<u>Watchdog Insights</u>: Watchdog Insights は、問題の特定と解決に役立つレコメンデーションエンジンです。{{< /nextlink >}}
  {{< nextlink href="/watchdog/rca">}}<u>根本原因分析</u>: Watchdog の根本原因分析 (RCA) 機能が異常の根本原因を見つける方法と、提供された情報の使用方法。{{< /nextlink >}}
  {{< nextlink href="/watchdog/impact_analysis">}}<u>影響分析</u>: 異常がユーザに悪影響を与える場合、Watchdog はどのようにしてそれを特定するのか。{{< /nextlink >}}
{{< /whatsnext >}}

## トラブルシューティング

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