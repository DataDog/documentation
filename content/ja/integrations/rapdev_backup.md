---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-backup
app_uuid: f0a2c15e-9c53-4645-aedc-5a28af130308
assets:
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: rapdev.backup
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10194
    source_type_name: RapDev Backup
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- マーケットプレイス
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_backup
integration_id: rapdev-backup
integration_title: Backup Automator
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_backup
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: バックアップ
  short_description: インテグレーションの定額料金
  unit_price: 500
public_title: Backup Automator
short_description: Datadog ダッシュボード、Synthetic、モニター、ノートブックをバックアップします
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Datadog ダッシュボード、Synthetic、モニター、ノートブックをバックアップします
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Backup Automator
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

この Agent チェックの目的は、Datadog アカウントのダッシュボード、Synthetic テスト、モニター、ノートブックの zip バックアップを作成することです。そのバックアップは、ローカルマシン、またはサポートされている他のプラットフォーム (AWS、Azure、GitHub など) の 1 つに保存できます。

## リアルユーザーモニタリング

### データセキュリティ

このインテグレーションには、メトリクスは含まれません。

### ヘルプ

このインテグレーションには、Agent が Datadog API と通信できる場合は `OK` を返すサービスチェック `rapdev.backup.can_connect` があり、それ以外の場合は `CRITICAL` を報告します。

### ヘルプ

このインテグレーションには、イベントは含まれません。

## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- サポート: support@rapdev.io
- セールス: sales@rapdev.io
- チャット: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？RapDev へ[お問い合わせ](mailto:support@rapdev.io)ください！導入のサポートをいたします。*

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
[4]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_permissions-to-switch.html
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-v6-python-3/?tab=hostagent
[7]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html
[8]: https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys
[9]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html
[10]: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-backup" target="_blank">こちらをクリック</a>してください。