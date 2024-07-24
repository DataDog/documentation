---
app_id: vantage
app_uuid: 2784a986-2673-4189-a3b8-320755f6c2b4
assets: {}
author:
  homepage: https://www.vantage.sh
  name: Vantage
  sales_email: sales@vantage.sh
  support_email: support@vantage.sh
categories:
- コスト管理
- クラウド
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/vantage/README.md
display_on_public_website: true
draft: false
git_integration_title: vantage
integration_id: vantage
integration_title: Vantage
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/terms-of-service.pdf
manifest_version: 2.0.0
name: vantage
public_title: Vantage
short_description: Datadog のコストをインポートし、他のインフラストラクチャー費用と一緒に追跡することができます
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Offering::Integration
  - Category::Cost Management
  - Category::Cloud
  configuration: README.md#Setup
  description: Datadog のコストをインポートし、他のインフラストラクチャー費用と一緒に追跡することができます
  media:
  - caption: Datadog の月額コストと予算
    image_url: assets/images/vantage-datadog-budget-forecast.png
    media_type: image
  - caption: Datadog のコスト - サービス別グループ分け
    image_url: assets/images/vantage-datadog-grouped-report.png
    media_type: image
  - caption: プロバイダー比較の概要
    image_url: assets/images/vantage-datadog-provider-summary.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Vantage
  uninstallation: README.md#Uninstallation
---



## 概要

Vantage は、クラウドコストの透明性と最適化のためのプラットフォームです。このインテグレーションにより、Datadog ユーザーは Datadog のコストを Vantage にインポートし、AWS、Snowflake、Kubernetes など、他のインフラストラクチャー費用と一緒に追跡することができるようになります。

## セットアップ

### インストール

[Vantage][1] にアクセスし、無料で登録します。登録が完了したら、[Vantage インテグレーションページ][2]にアクセスし、Datadog インテグレーションを追加してください。これにより、Datadog OAUTH2 フローを使用して、Vantage が請求および使用量にアクセスできるようになります。

### コンフィギュレーション

インテグレーションが完了したら、Vantage で Datadog のコスト調査を開始します。特定の Datadog 組織およびサービスに対するフィルターを作成し、サポートされている他の Vantage プロバイダーのコストと一緒に表示することができます。

## アンインストール

Vantage から Datadog インテグレーションを削除するには、[Vantage インテグレーションページ][2]に移動して、**Remove** をクリックします。また、Datadog からこのインテグレーションをアンインストールするには、以下の **Uninstall Integration** ボタンをクリックします。このインテグレーションをアンインストールすると、それまでのすべての認可が取り消されます。

さらに、このインテグレーションに関連するすべての API キーが無効になっていることを、[API キー管理ページ][3]でインテグレーション名を検索して確認してください。

## サポート

ご不明な点は、[Vantage のサポートチーム][4]までお問い合わせください。


[1]: https://console.vantage.sh
[2]: https://console.vantage.sh/settings/integrations
[3]: https://app.datadoghq.com/organization-settings/api-keys?filter=Vantage
[4]: mailto:support@vantage.sh