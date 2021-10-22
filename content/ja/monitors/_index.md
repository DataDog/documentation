---
title: アラート設定
kind: documentation
disable_sidebar: true
aliases:
  - /ja/guides/monitors/
  - /ja/guides/monitoring/
  - /ja/guides/alerting/
  - /ja/guides/monitors/the-conditions
description: 通知の作成と管理
further_reading:
  - link: 'https://www.datadoghq.com/blog/monitoring-101-alerting/'
    tag: ブログ
    text: モニター入門 重要事項をアラート
  - link: /api/v1/monitors/
    tag: Documentation
    text: Datadog モニター API
---
すべてのインフラストラクチャーを 1 か所から監視していても、重要な変更が発生したことを知る機能がなければ完全とは言えません。Datadog には、メトリクス、インテグレーションのアベイラビリティー、ネットワークエンドポイントなどをアクティブにチェックするモニターを作成する機能が用意されています。

## 概要

{{< whatsnext desc="このセクションには、次のトピックが含まれています。">}}
    {{< nextlink href="/monitors/monitor_types" >}}<u>モニター</u>: メトリクス、インテグレーション、トレース、ログなどについてモニターを作成、編集、または監査します。{{< /nextlink >}}
    {{< nextlink href="/monitors/manage_monitor" >}}<u>モニターの管理</u>: すべてのモニターを 1 か所で確認します。選択したモニターのサービスタグを一括で検索、削除、ミュート、解決、または編集します。{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_status" >}}<u>モニターステータス</u>: 一定期間にわたる特定のモニターのステータスを確認します。{{< /nextlink >}}
    {{< nextlink href="/monitors/check_summary" >}}<u>チェック内容のサマリー</u>: すべてのインテグレーションチェックのステータスを 1 か所で確認します。{{< /nextlink >}}
    {{< nextlink href="/monitors/notifications" >}}<u>通知</u>: モニターが作成されると、その条件が満たされると通知されます。また、メール、サードパーティサービス（Pagerduty など）、または Webhook を使用した他のカスタムエンドポイントでチームメンバーに通知することもできます。{{< /nextlink >}}
    {{< nextlink href="/monitors/downtimes" >}}<u>ダウンタイム</u>: モニターをトリガーせずに、システムのシャットダウン、オフライン保守、またはアップグレードのダウンタイムをスケジュールします。{{< /nextlink >}}
    {{< nextlink href="/monitors/service_level_objectives" >}}<u>サービスレベル目標</u>: メトリクスまたは既存の Datadog モニターを使用して、サービスレベル目標を作成、編集または表示します。{{< /nextlink >}}
   {{< nextlink href="/monitors/incident_management" >}}<u>インシデント管理</u>: インシデントを宣言して管理します。{{< /nextlink >}}
    {{< nextlink href="/monitors/guide" >}}<u>ガイド</u>: モニターとアラートに関するその他の役に立つ記事。{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料


{{< partial name="whats-next/whats-next.html" >}}