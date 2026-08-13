---
algolia:
  tags:
  - monitors
  - alerts
aliases:
- /ja/guides/monitors/
- /ja/guides/monitoring/
- /ja/guides/alerting/
- /ja/guides/monitors/the-conditions
- /ja/monitoring
cascade:
  algolia:
    rank: 70
    tags:
    - alerts
    - alerting
    - monitoring
description: アラートプラットフォームを使って、モニターの作成、通知や自動化の構成、モニターの管理を行います。
further_reading:
- link: /api/v1/monitors/
  tag: ドキュメント
  text: Datadog モニター API
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: 効果的なモニターの作成に関するインタラクティブなセッションに参加しましょう。
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: ブログ
  text: 'モニター入門: 重要事項をアラート'
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: ブログ
  text: Datadog モニター通知ルールを使用して、モニターのアラートをルーティングします。
- link: https://www.datadoghq.com/blog/ecs-default-monitors/
  tag: ブログ
  text: デフォルトのモニターと ECS エクスプローラーを使用して、ECS の問題をより迅速に検出して修正します。
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization
  tag: ブログ
  text: 'Datadog の大規模な最適化: Zendesk におけるコスト効率の良い監視可能性'
- link: https://www.datadoghq.com/blog/human-name-detection
  tag: ブログ
  text: Sensitive Data Scanner の ML を使用してログ内の人名を検出する
- link: https://app.datadoghq.com/release-notes?category=Alerting
  tag: リリースノート
  text: Datadog Alerting の最新リリースをチェックしてください。(アプリログインが必要です)。
- link: https://learn.datadoghq.com/courses/apm-monitors-and-alerting
  tag: ラーニングセンター
  text: APM モニターとアラート
title: モニター
---
## 概要 {#overview}

Datadog モニターは、インフラストラクチャーに対する重要な可視性を提供し、パフォーマンスの問題や障害に対して、プロアクティブな検出とリアルタイム対応を可能にします。重要なメトリクスとしきい値を追跡するようにモニターを構成することで、組織は即座にアラートを受け取り、顧客に影響が出たりシステムのダウンタイムが起きたりする前に問題に対処できます。

アラートプラットフォームを使用してメトリクス、インテグレーションの利用可能性、およびネットワークエンドポイントをチェックすることで、重要な変化を監視します。Datadog モニターにより、以下のことが可能になります。
- 監視および対応プロセスを簡素化する
- 運用効率を高める
- パフォーマンスを最適化する

## 始める {#get-started}

Datadog モニターを始める最速の方法は、[モニターテンプレート][1] を使用することです。これらは、Datadog と統合パートナーによって事前に構成されている Datadog 内のモニターのコレクションです。

ラーニングセンターのラボ環境で最初から独自のモニターを作成することもできます。または、「モニターの開始」ガイドに従ってアプリケーションにモニターを作成することもできます。

{{< whatsnext desc="以下のリソースを使用してモニターを作成してください。" >}}
    {{< nextlink href="/getting_started/monitors/" >}}モニターを使い始める: メトリックベースのモニターを構築する方法に関するガイド{{< /nextlink >}}
    {{< nextlink href="/monitors/types/" >}}モニターの種類からモニターを作成する{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/getting-started-monitors" >}}ラーニングセンター: サンドボックスラボ環境でモニターを構築する{{< /nextlink >}}
{{< /whatsnext >}}

## 集計データを分析する{#analyze-aggregate-data}

データは十分に理解され、詳細で、スコープによってタグ付けされており、長期にわたって保持されるべきです。緊急度に基づいて、アラートと診断で異なるデータタイプを使用してください。すべてのアプリケーションに対して計測を実装し、複雑なシステムの包括的な測定と可観測性のために、できるだけ多くの関連データを収集してください。

Datadog を使用して、アプリケーションの健康状態とインフラストラクチャーの状態を測定します。潜在的な問題に関するアラートを作成するために、Datadog プラットフォーム全体のデータを使用します。

## 重要なことにアラートを出す{#alert-on-what-matters}

[モニター通知][2] を設定して、チームに問題を通知し、トラブルシューティングのガイダンスを提供します。通知を正しい人にルーティングし、詳細を含めるためにテンプレート変数を活用し、メールや Slack でアラートを送信する際にスナップショットを添付します。

アラート疲労を軽減し、本当に問題になる時にチームがアラートの解決に集中できるようにします。アプリケーションメンテナンス中にアラートをミュートするために [ダウンタイム][3] を作成します。

## 次のステップ{#whats-next}

モニターとアラートは、IT システムとアプリケーションの信頼性、パフォーマンス、可用性を確保するための重要なツールです。悪化する前に問題を迅速に検出し、対応できるようにすることで、運用効率の維持、ユーザーエクスペリエンスの向上、潜在的リスクの軽減に役立ちます。モニターの機能について詳しく学ぶ:
1. [ダウンタイムをスケジュールしてモニターをミュートする][4]
1. [モニターを整理および管理する][5]
1. [Status ページでアラートを調査する][6]
1. [Monitor Quality ページで誤って構成されたモニターを解決する][7]

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/templates
[2]: /ja/monitors/notify
[3]: /ja/monitors/downtimes
[4]: /ja/monitors/downtimes/?tab=bymonitorname
[5]: /ja/monitors/manage
[6]: /ja/monitors/status/status_page
[7]: /ja/monitors/quality/