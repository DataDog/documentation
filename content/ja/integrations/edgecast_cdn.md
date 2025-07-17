---
app_id: edgecast-cdn
app_uuid: 2b575f7f-4575-4618-8ebd-f35f7d6a5d22
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: edgecast.request_count
      metadata_path: metadata.csv
      prefix: edgecast.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 619
    source_type_name: Edgecast
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- キャッシュ
- モニター
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: edgecast_cdn
integration_id: edgecast-cdn
integration_title: Edgecast
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: edgecast_cdn
public_title: Edgecast
short_description: Datadog メトリクスを使用した Edgecast CDN トラフィックの監視
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Metrics
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Datadog メトリクスを使用した Edgecast CDN トラフィックの監視
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: documentation
    url: https://docs.datadoghq.com/integrations/edgecast_cdn/
  support: README.md#Support
  title: Edgecast
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Edgecast は、エッジコンピューティング、アプリケーションセキュリティ、オーバーザトップビデオストリーミングのためのコンテンツデリバリネットワーク (CDN) やその他のソリューションを提供するグローバルネットワークプラットフォームです。Edgecast のメトリクスを収集し、オリジン別に Web トラフィックを監視することができます。

## セットアップ


### Edgecast クライアントの作成 

1. [Edgecast VDMS アカウント][1]にログインし、**Clients** タブに移動します。
2. **Create New Client** をクリックすると、New Client モーダルが表示されます。
3. 識別するための一意のクライアント名を入力し、**Toggle all ec.analytics** をクリックして、このクライアントがメトリクスを収集できるようにします。
4. **Settings** に移動し、**JWT Expiration in Seconds** を 600 に変更します。
5. **Save** をクリックすると、このクライアントと変更した設定値が保存されます。

### 構成

1. Datadog の [Edgecast インテグレーションタイル][2]内のコンフィギュレーションタブに移動します。
2. Datadog でこのクライアントを識別するための一意の名前を入力します。
3. 上記で作成した Edgecast クライアントからクライアント ID とクライアントシークレットを貼り付けます。
   * 構成した Edgecast クライアントの **Quick Start** タブにある **Getting an access token** リクエストで、`client_id=` の後にあるクライアント ID を探します。
   * 構成した Edgecast クライアントの **Client Secrets** タブで、クライアントシークレットを探します。
4. オプションで、カスタムタグを追加して、このインテグレーションのために収集されたすべてのメトリクスに関連付けます。
   * メトリクスには、オリジンに関連する Edgecast 名が自動的にタグ付けされます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "edgecast-cdn" >}}


### イベント

Edgecast インテグレーションには、イベントは含まれません。

### サービスチェック

Edgecast インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://id.vdms.io
[2]: https://app.datadoghq.com/integrations/edgecast-cdn
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/edgecast_cdn/edgecast_cdn_metadata.csv
[4]: https://docs.datadoghq.com/ja/help