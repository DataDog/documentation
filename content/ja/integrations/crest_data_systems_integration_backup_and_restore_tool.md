---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-integration-backup-and-restore-tool
app_uuid: bac70338-c588-4766-90ea-3ca10fe259d1
assets:
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 28271702
    source_type_name: crest_data_systems_integration_backup_and_restore_tool
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_integration_backup_and_restore_tool
integration_id: crest-data-systems-integration-backup-and-restore-tool
integration_title: Backup and Restore Tool
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_integration_backup_and_restore_tool
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: integration-backup-and-restore-tool
  short_description: Integration Backup and Restore Tool (IBRT) インテグレーション向けの料金は、月額の定額制です。
  unit_price: 499.0
public_title: Integration Backup and Restore Tool
short_description: Agent の設定ファイル、インテグレーション、および依存関係をすべてバックアップし、必要に応じてすばやくリストアできます。
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
  - Category::Marketplace
  - Offering::Integration
  configuration: README.md#Setup
  description: Agent の設定ファイル、インテグレーション、および依存関係をすべてバックアップし、必要に応じてすばやくリストアできます。
  media:
  - caption: Integration Backup and Restore Overview
    image_url: images/integration_backup_restore_overview.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Integration Backup and Restore Tool
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Integration Backup and Restore Tool (IBRT) を使って、Datadog での体験をさらにレベルアップしましょう。この強力なツールにより、Datadog の設定を簡単にバックアップできるため、Agent のアップグレードや移行後でも、すぐに元の構成を復元できます。

### 機能

- Datadog の設定を、次の内容も含めて丸ごとバックアップします。
    - インテグレーション
    - 依存関係
    - 設定ファイル (例: 各インテグレーションの `datadog.yaml` や `conf.yaml` など)
- 複数のバックアップ先に対応しており、用途に合わせて最適な場所にバックアップを保存できます。
- 柔軟なバックアップ スケジュール:
    - 必要なタイミングでオンデマンド バックアップを実行できます。
    - 要件に応じて、定期バックアップを自動実行するようにスケジュールできます。
- リストア時には、次のようなオプションを選択できます。
    1. **Agent の移行または再インストール**: すべてのインテグレーションをインストールし、各インテグレーションの `conf.yaml` や `datadog.yaml` などの YAML ファイルをコピーして、スムーズな移行を実現します。
    2. **Agent のアップグレード**: インテグレーションを YAML 設定としてインストールし、アップグレード処理の間も依存関係を保持します。

### サポートされているバックアップ先

- ローカル マシン
- リモート マシン
- クラウド サービス:
    - AWS S3 バケット
    - Azure Blob Storage
    - Google Cloud Storage

### 使いやすさ

手作業でのインストールや設定が必要な従来型のバックアップ方法とは異なり、IBRT はシンプルで便利なバックアップ手段を提供します。Agent レベルでオンデマンド コマンドを実行して Datadog の設定をすぐにバックアップしたり、要件に合わせて定期バックアップを自動実行するようスケジュールしたりできます。さらに、バックアップからのリストアも同じくらい簡単で、1 つのスクリプトを実行するだけで設定を元どおりに復元できます。

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。

* サポートメール: [datadog.integrations@crestdata.ai][7]
* 営業メール: [datadog-sales@crestdata.ai][8]
* Web サイト: [crestdata.ai][3]
* よくあるご質問: [Crest Data Datadog Marketplace インテグレーションのよくあるご質問][6]

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.crestdata.ai/datadog-integrations-readme/IBRT.pdf
[5]: https://docs.datadoghq.com/ja/agent/
[6]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[7]: mailto:datadog.integrations@crestdata.ai
[8]: mailto:datadog-sales@crestdata.ai

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-integration-backup-and-restore-tool" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。