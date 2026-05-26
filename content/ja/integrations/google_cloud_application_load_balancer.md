---
app_id: google-cloud-application-load-balancer
app_uuid: c6fbbd09-f299-4efa-b364-a83aaed84e60
assets: {}
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- google cloud
- security
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_cloud_application_load_balancer
integration_id: google-cloud-application-load-balancer
integration_title: Google Cloud Application Load Balancer
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_application_load_balancer
public_title: Google Cloud Application Load Balancer
short_description: Datadog App & API Protection で Google Cloud Application Load Balancer
  を保護します。
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
  - Category::Cloud
  - Category::Google Cloud
  - Category::Security
  - Submitted Data Type::Traces
  - Offering::Integration
  configuration: README.md#Setup
  description: Datadog App & API Protection で Google Cloud Application Load Balancer
    を保護します。
  media:
  - caption: Datadog App & API Protection は、Google Cloud Application Load Balancer
      とバックエンド サービスの両方を監視し、実際のエクスプロイトや攻撃を検知してアラートを送信することで、多層防御のセキュリティを提供します。
    image_url: images/image1.png
    media_type: image
  - caption: App & API Protection は、攻撃の詳細、相関付けられたトレース スパン、ロード バランサー レベルでの IP ブロックなどのレスポンス
      アクションを示す詳細なセキュリティ シグナルを提供します。
    image_url: images/image2.png
    media_type: image
  - caption: Datadog App & API Protection は、攻撃の試みに対するエッジ レベルの可視性を提供し、悪意のあるリクエストがバックエンド
      サービスに到達する前に Google Cloud Application Load Balancer でどのように検知されブロックされるかを示します。
    image_url: images/image3.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: documentation
    url: https://docs.datadoghq.com/security/application_security/setup/gcp/service-extensions/?source=gcp-alb-tile-deepdive
  - resource_type: blog
    url: https://www.datadoghq.com/blog/datadog-application-security-management/
  - resource_type: その他
    url: https://cloud.google.com/service-extensions/docs/overview
  support: README.md#Support
  title: Google Cloud Application Load Balancer
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Datadog App & API Protection は、[Google Cloud Service Extensions][1] を使用して、Google Cloud Application Load Balancer の可視性とインラインでの脅威緩和を拡張します。

このインテグレーションを利用すると、API の不正使用、ビジネス ロジックの悪用、コード レイヤーの脅威などの攻撃を、クラウド インフラストラクチャーのエッジで検知してブロックできます。

このインテグレーションは、以下の機能を提供します。
- Datadog Security Signals を使用して、アプリケーション ロード バランサーで脅威をインラインで検知してブロック
- アプリケーション層での攻撃をリアルタイムで把握
- OWASP API の脅威、クレデンシャル スタッフィング、インジェクション攻撃などに対するエッジでの強制適用

## セットアップ

### インストール

インストール手順については、[GCP Service Extensions 向け App and API Protection を有効化する][2]を参照してください。

### 検証

このインテグレーションのインストールを検証するには、既知の攻撃パターンをアプリケーション ロード バランサーに送信してください。たとえば、次の curl スクリプトを実行すると Security Scanner Detected ルールをトリガーできます:

```sh
for ((i=1;i<=250;i++)); 
do
    # 既存のサービスのルートを対象
    curl https://your-load-balancer-url/existing-route -A dd-test-scanner-log;

    # 存在しないサービスのルートを対象
    curl https://your-load-balancer-url/non-existing-route -A dd-test-scanner-log;
done
```

サービス拡張機能を有効化し、既知の攻撃パターンを送信してから数分後に、脅威情報が Application Signals Explorer に表示されます。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://cloud.google.com/service-extensions/docs/overview
[2]: https://docs.datadoghq.com/ja/security/application_security/setup/gcp/service-extensions/?source=gcp-alb-tile-setup
[3]: https://docs.datadoghq.com/ja/help/