---
app_id: drata-integration
app_uuid: c06736af-282f-4b3c-a9e6-2b049dbc0e2a
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10311
    source_type_name: Drata
author:
  homepage: https://www.drata.com/
  name: Drata
  sales_email: sales@drata.com
  support_email: support@drata.com
categories:
- コンプライアンス
- ログの収集
- セキュリティ
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/drata/README.md
display_on_public_website: true
draft: false
git_integration_title: drata
integration_id: drata-integration
integration_title: Drata
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: drata
public_title: Drata
short_description: Datadog のコンプライアンス情報を Drata に取り込む
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - カテゴリ::コンプライアンス
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Datadog のコンプライアンス情報を Drata に取り込む
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Drata
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Drata は、企業のセキュリティ管理を継続的に監視して証拠を収集するとともに、コンプライアンスワークフローをエンドツーエンドで効率化し、監査に対応できるようにするセキュリティおよびコンプライアンス自動化プラットフォームです。

このインテグレーションにより、[Drata][1] のお客様は、API インテグレーションを通じて、Datadog から Drata にコンプライアンス関連のログやイベントを転送することができます。

## 計画と使用

このインテグレーションを設定するには、アクティブな [Drata アカウント][2]が必要です。また、Datadog の適切な[管理者権限][3]も必要となります。

### インフラストラクチャーリスト

1. このインテグレーションをインストールするには、API キーとアプリキーを作成する必要があります。
2. Datadog でサービスアカウントを作成し、"Datadog Read Only" Role を適用して、この接続に限定的な権限を付与することをお勧めします。
3. Datadog の組織設定に移動し、[API キーの作成][4]を行います。キーには、`Drata` のような意味のある名前を付けます。
4. API `Key` をコピーして保存します。
5. 組織設定内で、[アプリケーションキーを作成][5]します。
6. アプリケーションキーをコピーして保存します。
7. API キーとアプリケーションキーを Datadog の Drata 接続ドロワーに貼り付けます。
8. Drata は Datadog API からユーザーと構成データの同期を開始し、コンプライアンスモニターが失敗している場合は通知されます。


## Agent

ヘルプが必要ですか？[Datadog サポート][6]または [support@drata.com][7] にお問い合わせください。


[1]: https://www.drata.com
[2]: https://drata.com/demo
[3]: https://docs.datadoghq.com/ja/account_management/rbac/permissions/
[4]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#add-an-api-key-or-client-token
[5]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#add-application-keys
[6]: https://docs.datadoghq.com/ja/help/
[7]: mailto:support@drata.com