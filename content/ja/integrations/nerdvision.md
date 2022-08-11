---
app_id: nerdvision
app_uuid: dace6217-8e5b-4b96-ae65-b0b58d44cc3e
assets:
  dashboards:
    NerdVision Overview: assets/dashboards/overview.json
  integration:
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: nerdvision.clients
      metadata_path: metadata.csv
      prefix: nerdvision.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: NerdVision
author:
  homepage: https://nerd.vision
  name: NerdVision
  sales_email: support@nerd.vision
  support_email: support@nerd.vision
  vendor_id: nerdvision
categories:
- マーケットプレイス
- containers
- ログの収集
- モニタリング
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: nerdvision
integration_id: nerdvision
integration_title: NerdVision
integration_version: ''
is_public: true
kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: nerdvision
oauth: {}
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.nerdvision.clients
  product_id: クライアント
  short_description: デバッグ・データ収集ツール。
  tag: hostname
  unit_label: クライアント
  unit_price: 2
public_title: NerdVision
short_description: .NET、Java、Python、Node 向けのライブデバッガ
supported_os:
- linux
- mac os
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Mac OS
  - Supported OS::Windows
  - Category::Marketplace
  - Category::Containers
  - Category::Log Collection
  - Category::Monitoring
  - Offering::Software License
  - Offering::Integration
  configuration: README.md#Setup
  description: .NET、Java、Python、Node 向けのライブデバッガ
  media:
  - caption: NerdVision のインタラクティブデバッガ。
    image_url: images/debugger.png
    media_type: image
  - caption: NerdVision のキャプチャエラー一覧。
    image_url: images/error_list.png
    media_type: image
  - caption: Datadog の NerdVision ダッシュボード。
    image_url: images/screenshot_datadog.png
    media_type: image
  - caption: NerdVision のスナップショットの詳細。
    image_url: images/snapshot_details.png
    media_type: image
  - caption: NerdVision のスナップショット一覧。
    image_url: images/snapshot_list.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: NerdVision
---



## 概要

### NerdVision とは？

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

### イベント

トリガーされる各トレースポイントは、適切なタグと NerdVision でデータを閲覧できるリンクを含むイベントとして Datadog に送信されます。
トレースポイントを利用して、トレースポイントがトリガーされるフレームでアクティブなスタック全体および変数を
収集することができます。

### ログ管理

動的なロギングにより、コードのどの箇所にでも新しいログメッセージを挿入し、欠けていたデータを追加することができます。
トリガーされるそれぞれのログメッセージは、NerdVision で処理されてからすぐに Datadog と同期されます。

### メトリクス

NerdVision はオンラインクライアントおよびトレースポイントのトリガー向けにメトリクスを生成します。

### サービスのチェック

NerdVision には、サービスのチェック機能は含まれません。

## サポート

サポートまたはリクエストをご希望の場合は、以下のチャンネルから NerdVision にお問い合わせください。

メールアドレス: support@nerd.vision

[こちら](https://docs.nerd.vision/)でドキュメントをご確認いただけます。

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/nerdvision" target="_blank">こちらをクリック</a>してください。