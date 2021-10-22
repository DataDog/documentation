---
"assets":
  "dashboards":
    "NerdVision Overview": assets/dashboards/overview.json
  "metrics_metadata": metadata.csv
  "monitors": {}
  "saved_views": {}
  "service_checks": assets/service_checks.json
"author":
  "homepage": "https://nerd.vision"
  "name": NerdVision
"categories":
- マーケットプレイス
- ログの収集
- モニタリング
"creates_events": true
"ddtype": "crawler"
"dependencies": []
"display_name": "NerdVision"
"draft": false
"git_integration_title": "nerdvision"
"guid": "5f778314-2ff5-4601-ac36-aa2955c0b4d4"
"integration_id": "nerdvision"
"integration_title": "NerdVision"
"is_public": true
"kind": "integration"
"maintainer": "support@nerd.vision"
"manifest_version": "1.0.0"
"metric_prefix": "nerdvision."
"metric_to_check": "nerdvision.clients"
"name": "nerdvision"
"pricing":
- "billing_type": tag_count
  "metric": datadog.marketplace.nerdvision.clients
  "tag": hostname
  "unit_label": クライアント
  "unit_price": !!int "2"
"public_title": "NerdVision"
"short_description": ".NET、Java、Python、Node 向けのライブデバッガ。"
"support": "パートナー"
"supported_os":
- linux
- mac_os
- windows
"terms":
  "eula": assets/eula.pdf
  "legal_email": support@nerd.vision
---



## 概要

### NerdVision とは？

{{< img src="marketplace/nerdvision/images/screenshot.png" alt="nerdvision" >}}

NerdVision はアプリケーション内にいつでも詳細なインサイトを収集できるライブデバッギングプラットフォームです。
NerdVision はアプリケーションにトレースポイントをインストールし、再起動やコードの変更を行うことなくアプリケーションの状態についての
データを収集します。

サインアップすると、このインテグレーションはダッシュボードを作成し、NerdVision グループのすべてのイベントとログを Datadog のオーガニゼーションに
同期します。

#### ウォッチャーと条件付き構文

条件付き構文を使用して、トレースポイントのトリガーを確認したい特定のケースに絞り込みます。ウォッチャーを追加して
コンテキストを拡張し、問題に対して最も重要なデータまたは変数キャプチャの一部に含まれないデータを含むよう設定します。

### NerdVision Datadog ダッシュボード

Datadog ダッシュボードはコード内でトレースポイントがトリガーされる際の重要なインサイトを提供します。
このデータを活用してデバッグのホットスポットを特定することができます。

{{< img src="marketplace/nerdvision/images/screenshot_datadog.png" alt="Datadog" >}}

### イベント

トリガーされる各トレースポイントは、適切なタグと NerdVision でデータを閲覧できるリンクを含むイベントとして Datadog に送信されます。
トレースポイントを利用して、トレースポイントがトリガーされるフレームでアクティブなスタック全体および変数を
収集することができます。

{{< img src="marketplace/nerdvision/images/datadog_event.png" alt="Datadog" >}}

### ログ

動的なロギングにより、コードのどの箇所にでも新しいログメッセージを挿入し、欠けていたデータを追加することができます。
トリガーされるそれぞれのログメッセージは、NerdVision で処理されてからすぐに Datadog と同期されます。

{{< img src="marketplace/nerdvision/images/datadog_log.png" alt="Datadog" >}}

### メトリクス

NerdVision はオンラインクライアントおよびトレースポイントのトリガー向けにメトリクスを生成します。

### サービスのチェック

NerdVision には、サービスのチェック機能は含まれません。

## サポート

サポートまたはリクエストをご希望の場合は、以下のチャンネルから NerdVision にお問い合わせください。

メールアドレス: support@nerd.vision

[こちら](https://docs.nerd.vision/)でドキュメントをご確認いただけます。

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、[こちらをクリック](https://app.datadoghq.com/marketplace/app/nerdvision/pricing)してください。

