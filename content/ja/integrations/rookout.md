---
app_id: rookout
app_uuid: a82a4f89-0690-48cf-bad0-9603fb652f44
assets:
  dashboards:
    rookout_overview: assets/dashboards/rookout_overview.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: rookout.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Rookout for Datadog
author:
  homepage: https://rookout.com
  name: Rookout
  sales_email: support@rookout.com
  support_email: support@rookout.com
categories: []
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rookout/README.md
display_on_public_website: true
draft: false
git_integration_title: rookout
integration_id: rookout
integration_title: Rookout ライブデバッグ
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: rookout
oauth: {}
public_title: Rookout ライブデバッグ
short_description: Rookout を使って本番環境で動作するコードからメトリクスを収集する
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
  - Offering::UI Extension
  configuration: README.md#Setup
  description: Rookout を使って本番環境で動作するコードからメトリクスを収集する
  media:
  - caption: Datadog Rookout インテグレーションデモ
    image_url: images/video_thumbnail.png
    media_type: ビデオ
    vimeo_id: 642104223
  - caption: Rookout デバッガー
    image_url: images/app1.png
    media_type: image
  - caption: Rookout デバッグセッションの構成
    image_url: images/app2.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Rookout ライブデバッグ
---



## 概要

### 説明

[Rookout][1] は、クラウドネイティブのデバッグとライブデータ収集のための破壊的なデベロッパーソリューションです。Rookout の Non-Breaking Breakpoints は、余分なコーディング、再デプロイ、再起動の必要がなく、あらゆるタイプのデータをその場で収集することができます。

Rookout は、Kubernetes、マイクロサービス、サーバーレス、サービスメッシュベースのアプリケーションなど、実稼働環境とモダンアーキテクチャのデバッグのためにゼロから設計されています。

Rookout のインテグレーションにより、本番環境などで稼働しているコードを停止したり再デプロイすることなく、メトリクスを収集することができます。

### 使用方法

Rookout のインテグレーションは、次の 2 つのコンポーネントで構成されています。

- コードからメトリクスポイントを収集することを可能にするダッシュボードウィジェット用のコンテキストメニュー項目。
- Rookout で設定したすべてのメトリクスポイントを表示するカスタムウィジェット。

**コンテキストメニュー項目**

1 つまたは複数のサーバーまたはサービスを表すタイムスリープウィジェットをクリックすると、新しいコンテキストメニュー項目が表示されます。

"Set metric points” をクリックすると、Rookout アプリが起動し、自動的に正しいインスタンスが選択されます。

**カスタムダッシュボードウィジェット**

Rookout ウィジェットをダッシュボードに追加すると、メトリクスポイントを設定した場所を確認することができます。

## セットアップ

### コンフィギュレーション

Rookout コンテキストメニュー項目をダッシュボードの時系列ウィジェットに追加するには、そのタイトルに rookout ラベルフィルターを追加する必要があります。

例えば、ある時系列が `cartservice` というサービスのメトリクスを表示している場合、Rookout のコンテキストメニューで自動的に `k8s_deployment:cartservice` というラベルフィルターを使った Rookout セッションを開始させたいとします。

そのためには、時系列ウィジェットのタイトルに `[k8s_deployment:cartservice]` を追加します。

## 収集データ

### メトリクス

Rookout には、メトリクスは含まれません。

### サービスのチェック

Rookout には、サービスのチェック機能は含まれません。

### イベント

Rookout には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Rookout サポート][2]までお問合せください。

[1]: https://rookout.com
[2]: mailto:support@rookout.com