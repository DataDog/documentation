---
app_id: hcp-vault
app_uuid: ad48fccf-95f1-4ead-ae7f-efac1757418a
assets:
  dashboards:
    HCPVault Overview: assets/dashboards/hcp_vault_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: hcp_vault.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10223
    source_type_name: HCPVault
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Datadog
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories: []
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/hcp_vault/README.md
display_on_public_website: true
draft: false
git_integration_title: hcp_vault
integration_id: hcp-vault
integration_title: HCP Vault
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: hcp_vault
public_title: HCP Vault
short_description: HCP Vault のインテグレーションにより、Vault クラスターの概要がわかります。
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
  configuration: README.md#Setup
  description: HCP Vault のインテグレーションにより、Vault クラスターの概要がわかります。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: HCP Vault
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

HCP Vault インテグレーションは、Vault クラスターの概要を提供するため、パフォーマンスとクラスターの健全性を監視することができます。

HCP Vault のメトリクスストリーミングは、すべてのプロダクショングレードのクラスター層で利用できます。この機能は、開発グレードのクラスターでは使用できません。

メトリクスの範囲と解釈の詳細については、HCP Vault メトリクスガイダンス][1]を参照してください。

## 計画と使用

### インフラストラクチャーリスト

以下の構成方法に従ってください。

### 前提条件
- プロダクショングレードの HCP Vault クラスター
- Datadog リージョンと [Datadog API キー][2]
- HCP で割り当てられた Admin または Contributor [ロール][3]を持つアカウント

### ブラウザトラブルシューティング

メトリクスストリーミングを有効にするには

1. HCP Vault cluster Overview から、Metrics view を選択します。

   ![メトリクスストリーミング][4]

2. メトリクスのストリーミングをまだ構成していない場合は、Enable streaming をクリックします。

3. Stream Vault のメトリクスビューから、プロバイダーとして Datadog を選択します。

4. Datadog コンフィギュレーションで、API キーを入力し、Datadog の環境と一致する Datadog のサイトリージョンを選択します。

   ![プロバイダーを選択][5]

5. Save をクリックします。
**注**: HCP Vault は、一度に 1 つのメトリクスエンドポイントへのメトリクスストリーミングのみをサポートしています。

6. Datadog に移動し、インテグレーションタイルの Install をクリックして、インテグレーションを有効にします。これにより、HCP Vault のテレメトリを最大限に活用するウィジェットを備えた HCP Vault ダッシュボードがインストールされます。ダッシュボード一覧で「HCP Vault Overview」を検索すると、ダッシュボードを見つけることができます。
   **注**: ダッシュボードで `cluster` と `project_id` の値を指定して、適切なクラスターのメトリクスを選択します。`cluster` はクラスター作成時に設定したクラスター名です。`project_id` は HCP ポータルの URL `https://portal.cloud.hashicorp.com/orgs/xxxx/projects/xxxx` に存在するものです。

## リアルユーザーモニタリング

### データセキュリティ

メトリクスの範囲と解釈の詳細については、HCP Vault メトリクスガイダンス][1]を参照してください。

### ヘルプ

HCP Vault インテグレーションには、サービスのチェック機能は含まれません。

### ヘルプ

HCP Vault インテグレーションには、イベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://learn.hashicorp.com/collections/vault/cloud
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[3]: https://cloud.hashicorp.com/docs/hcp/access-control
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/hcp_vault/images/metrics-streaming.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/hcp_vault/images/choose-provider.png
[6]: https://docs.datadoghq.com/ja/help/