---
app_id: altostra
app_uuid: c22d6f84-3404-4638-99bc-7cb19ab4508a
assets:
  dashboards:
    Altostra: assets/dashboards/altostra.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: altostra.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10181
    source_type_name: Altostra
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Altostra
  sales_email: support@altostra.com
  support_email: support@altostra.com
categories:
- 自動化
- cloud
- 構成 & デプロイ
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/altostra/README.md
display_on_public_website: true
draft: false
git_integration_title: altostra
integration_id: altostra
integration_title: Altostra
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: altostra
public_title: Altostra
short_description: Altostra から Datadog へクラウドアプリケーションログを自動的に送信
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
  - Category::Automation
  - Category::Cloud
  - Category::Configuration & Deployment
  - Category::Log Collection
  configuration: README.md#Setup
  description: Altostra から Datadog へクラウドアプリケーションログを自動的に送信
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Altostra
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Altostra は、クラウドコンピューティングサービスと統合し、開発チームにエンドツーエンドのワークフローを提供します。

Datadog Altostra インテグレーションにより、Altostra プロジェクトを実装中に自動的にインスツルメントして、Datadog アカウントにログやメトリクスを送信できます。インテグレーションのコンフィギュレーションは、デプロイ環境ごとに制御できます。

## 計画と使用

### インフラストラクチャーリスト

Datadog Altostra インテグレーションは組み込まれているため、インストールは必要ありません。

### ブラウザトラブルシューティング

Datadog のインテグレーションは、アカウント設定ぺージの[インテグレーション][1]にある Altostra Web Console でご利用いただけます。

1. Altostra アカウント設定の [Integrations][1] セクションにアクセスします。
2. **Datadog** インテグレーションの **Connect** をクリックします。
3. インテグレーションの**表示名**を入力します。
4. Datadog アカウントの **API キー**を入力します。
5. **OK** をクリックしてインテグレーションの構成を完了します。
6. [Environments][2] を開き、ログ送信を構成する環境をクリックします。
7. _Settings_ で、前のステップで構成したインテグレーションを **Log shipping** の選択肢から選択します。
8. **Save Changes** をクリックします。

### 検証

1. Lambda 関数を含む Altostra プロジェクトを、Datadog へのログ送信を構成した任意の環境にデプロイします。
2. Lambda 関数を呼び出します。
3. Datadog の _Logs_ ビューに Lambda 関数のログが表示されます。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://app.altostra.com/team/settings/integrations/logging
[2]: https://app.altostra.com/environments
[3]: /ja/help