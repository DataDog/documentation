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
description: アラートプラットフォームでのモニターの作成、通知と自動化の構成、モニター管理
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Alerting
  tag: リリースノート
  text: Datadog Alerting の最新リリースをチェック！ (アプリログインが必要です)。
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: 効果的なモニターの作成に関するインタラクティブなセッションに参加できます
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: ブログ
  text: モニター入門 重要事項をアラート
- link: /api/v1/monitors/
  tag: Documentation
  text: Datadog モニター API
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: ブログ
  text: Datadog モニター通知ルールでモニター アラートをルーティングする
title: モニター
---

## 概要

Datadog モニターはインフラストラクチャーへの重要な可視性を提供し、パフォーマンス問題や障害を事前に検出し、リアルタイムに対応できるようにします。モニターを構成して主要なメトリクスやしきい値を追跡することにより、組織は即座にアラートを受け取り、問題が顧客に影響を及ぼしたりシステムのダウンタイムを引き起こす前に迅速に対応できます。

アラーティングプラットフォームを使用してメトリクス、インテグレーションの利用可能性、およびネットワークエンドポイントを確認することで、重要な変更を監視します。Datadog モニターにより、以下のことが可能になります。
- 監視および対応プロセスを簡素化する
- 運用効率を高める
- パフォーマンスを最適化する

## 開始する

Datadog モニターを開始する最も迅速な方法は、[推奨モニター][1]を使用することです。これらは Datadog およびインテグレーションパートナーによって事前に構成された Datadog 内のモニターのコレクションです。

また、ラーニングセンターのラボ環境で最初から独自のモニターを作成することもできます。または、「モニターの開始」ガイドに従ってアプリケーションにモニターを設定することもできます。

{{< whatsnext desc="以下のリソースを使用してモニターを作成してください。" >}}
    {{< nextlink href="/getting_started/monitors/" >}}モニターの開始: メトリクスベースのモニターを構築する方法に関するガイド{{< /nextlink >}}
    {{< nextlink href="/monitors/types/" >}}モニターの種類からモニターを作成する{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/getting-started-monitors" >}}ラーニングセンター: サンドボックス環境でモニターを構築する{{< /nextlink >}}
{{< /whatsnext >}}

## 集計データを分析する

データは十分に理解され、詳細化され、スコープによってタグ付けされ、長期間保持される必要があります。アラートや診断には、緊急度のレベルに応じてさまざまなデータタイプを使用します。すべてのアプリケーションをインスツルメントし、複雑なシステムの包括的な測定と可観測性のために可能な限り関連するデータを収集します。

Datadog を使用して、アプリケーションの健全性とインフラストラクチャーの状態を測定します。Datadog プラットフォーム全体からデータを使用して潜在的な問題に対してアラートを設定します。

## 重要なことにアラートする

[モニター通知][2]をセットアップして、チームに問題を通知し、トラブルシューティングのガイダンスを提供します。通知を適切な担当者にルーティングし、テンプレート変数を活用して詳細を含め、メールや Slack でアラートを送信するときにスナップショットを添付します。

アラートによる疲労を軽減し、チームが必要なときにアラートの解決に集中できるようにします。アプリケーションのメンテナンス中にアラートをミュートするために[ダウンタイム][3]を作成します。

## 次のステップ

モニターとアラートは、IT システムやアプリケーションの信頼性、パフォーマンス、および可用性を確保するために不可欠なツールです。これらは運用効率の維持、ユーザーエクスペリエンスの改善、および潜在的なリスクの軽減に役立ち、問題が拡大する前に迅速な検出と対応を行うことを可能にします。モニターの機能についてさらに詳しくは、以下をご覧ください。
1. [ダウンタイムをスケジュールしてモニターをミュートする][4]
1. [モニターを整理および管理する][5]
1. [ステータスページでアラートを調査する][6]
1. [Monitor Quality ページで誤って構成されたモニターを解決する][7]

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/recommended
[2]: /ja/monitors/notify
[3]: /ja/monitors/downtimes
[4]: /ja/monitors/downtimes/?tab=bymonitorname
[5]: /ja/monitors/manage
[6]: /ja/monitors/status/status_page
[7]: /ja/monitors/quality/