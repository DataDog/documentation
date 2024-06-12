---
app_id: upstash
app_uuid: fe1f17e3-11a4-4e44-b819-8781ebcc86f8
assets:
  dashboards:
    Upstash-Overview: assets/dashboards/upstash_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: upstash.db.totaldatasize
      metadata_path: metadata.csv
      prefix: upstash.db.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10412
    source_type_name: Upstash
author:
  homepage: https://upstash.com
  name: Upstash
  sales_email: sales@upstash.com
  support_email: support@upstash.com
categories:
- クラウド
- ai/ml
- data stores
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/upstash/README.md
display_on_public_website: true
draft: false
git_integration_title: upstash
integration_id: upstash
integration_title: Upstash
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: upstash
public_title: Upstash
short_description: Upstash からの帯域幅、キースペース、レイテンシー、ヒット/ミス率のデータを視覚化する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Category::Cloud
  - Category::AI/ML
  - Category::Data Stores
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Upstash からの帯域幅、キースペース、レイテンシー、ヒット/ミス率のデータを視覚化する
  media:
  - caption: Upstash データベースメトリクス
    image_url: images/upstash-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Upstash
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Upstash は、さまざまなアプリケーションに対して Redis®、Kafka、およびメッセージング/スケジューリングソリューションを提供するサーバーレスデータプロバイダーで、速さ、シンプルさ、そしてシームレスな開発体験を実現します。Upstash は Redis と Kafka の API を使用し、以下の用途向けに設計されています。

* サーバーレス関数 (AWS Lambda)
* Cloudflare Workers
* Fastly Compute@Edge
* Next.js Edge、Remix など
* クライアント側の Web またはモバイルアプリケーション
* AI 開発
* WebAssembly など、TCP 接続よりも HTTP が優先される環境

モニタリングスタックを集約し、データの全体的な視野を確保するために、Upstash インテグレーションは次のメトリクスを Datadog に送信します。
    * ヒット/ミス率
    * 読み書きレイテンシー (p99)
    * キースペース
    * 接続数
    * 帯域幅
    * 総データサイズ
    * スループット

## 計画と使用

### インフラストラクチャーリスト

[Upstash][1] にアクセスして無料でサインアップしてください。登録が完了したら、Datadog の [Upstash インテグレーションタイル][2]にアクセスし、インテグレーションをインストールします。インストールが完了したら、**Configure** タブに移動し、**Connect Accounts** をクリックします。これにより、Datadog の OAuth フローが案内され、Upstash がデータベースメトリクスにアクセスできるようになります。

## アンインストール

Upstash から Datadog インテグレーションを削除するには、[Upstash インテグレーションページ][3]に移動して、**Remove** をクリックします。また、Datadog からこのインテグレーションをアンインストールするには、[インテグレーションタイル][2]の **Uninstall Integration** ボタンをクリックします。このインテグレーションをアンインストールすると、それまでのすべての認可が取り消されます。

さらに、このインテグレーションに関連するすべての API キーが無効になっていることを、[API キー管理ページ][4]で `upstash` を検索して確認してください。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "upstash" >}}

### ヘルプ
Upstash インテグレーションには、イベントは含まれません。

### ヘルプ

Upstash インテグレーションには、サービスのチェック機能は含まれません。

## Agent
ご不明な点は、[Upstash のサポートチーム][6]までお問い合わせください。

[1]: https://upstash.com
[2]: https://app.datadoghq.com/integrations/upstash
[3]: https://console.upstash.com/integration/datadog
[4]: https://app.datadoghq.com/organization-settings/api-keys?filter=Upstash
[5]: https://github.com/DataDog/integrations-extras/blob/master/upstash/metadata.csv
[6]: mailto:support@upstash.com