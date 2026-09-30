---
app_id: linux-audit-logs
app_uuid: 276c2367-72a9-4f50-95d6-998e4b2ca0df
assets:
  dashboards:
    Linux Audit Logs - Overview: assets/dashboards/linux_audit_logs_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    source_type_id: 42347665
    source_type_name: Linux 監査ログ
  logs:
    source: linux-audit-logs
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- security
- network
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/linux_audit_logs/README.md
display_on_public_website: true
draft: false
git_integration_title: linux_audit_logs
integration_id: linux-audit-logs
integration_title: Linux Audit Logs
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: linux_audit_logs
public_title: Linux 監査ログ
short_description: Linux 監査ログからインサイトを得る。
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Log Collection
  - Category::Security
  - Category::Network
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Linux 監査ログからインサイトを得る。
  media:
  - caption: Linux Audit Logs - 概要
    image_url: images/linux_audit_logs_overview_1.png
    media_type: image
  - caption: Linux 監査ログ - 概要
    image_url: images/linux_audit_logs_overview_2.png
    media_type: image
  - caption: Linux 監査ログ - 概要
    image_url: images/linux_audit_logs_overview_3.png
    media_type: image
  - caption: Linux 監査ログ - 概要
    image_url: images/linux_audit_logs_overview_4.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Linux 監査ログ
---

<!-- SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

[Linux Audit Logs][1] は、システム イベント、ユーザー アクティビティ、セキュリティ関連のアクションに関する詳細情報を記録します。監査ログは、システムの完全性を監視し、不正アクセスを検出し、セキュリティ ポリシーと規制の遵守を保証するために不可欠です。

このインテグレーションは、次のようなさまざまなタイプのログを対象に、エンリッチメントと可視化の機能を提供します。
- **強制アクセス制御 (MAC)** の構成とステータス   
- **MAC ポリシー**
- **ロール**の割り当て、削除、およびユーザーのロールの変更  
- **監査** の構成変更と監査デーモン イベント (中断、構成の変更など)   
- **ユーザー認証**イベント  
- **ユーザー アカウント** 資格情報の変更  
- **ユーザーとグループ**の管理に関するアクティビティ
- **SELinux ユーザー** エラー
- **Access Vector Cache (AVC)** ログ

このインテグレーションは、**Red Hat**、**Ubuntu**、**CentOS** Linux オペレーティング システムでこれらのログをサポートしています。

このインテグレーションは、Linux 監査ログを収集し、分析のために Datadog に送信します。すぐに使えるダッシュボードとログ エクスプローラーを通じて視覚的なインサイトを提供し、すぐに使える Cloud SIEM 検出ルールを使用してセキュリティ上の脅威の監視と対応を支援します。

* [Log Explorer][2]
* [Cloud SIEM][3]

## セットアップ

### インストール

Linux Audit Logs インテグレーションをインストールするには、次の Agent インストール コマンドを実行します。詳細は [Integration Management][4] を参照してください。

**注**: Agent バージョンが 7.66.0 以上の場合、この手順は不要です。

Linux の場合、以下を実行してください。
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-linux-audit-logs==1.0.0
  ```

### 設定

#### 監査デーモン (`auditd`) のインストール

1. Linux に `auditd` をインストールします。
    - **Debian/Ubuntu:**

      ```shell
      sudo apt-get update
      sudo apt-get install auditd
      ```

    - **CentOS/RHEL:**

      ```shell
      sudo yum install audit
      ```

2. 監査デーモンを起動します。

    ```shell
    sudo systemctl start auditd
    ```

3. 監査デーモンを有効化し、ブート時に起動するようにします。
    ```shell
    sudo systemctl enable auditd
    ```

4. 監査デーモンのステータスを確認します。
    ```shell
    sudo systemctl status auditd
    ```

#### 監査デーモン (`auditd`) の構成

1. `dd-agent` ユーザーに、ローテーションされた監査ログ ファイルの読み取り権限を付与します。
    ```shell
    sudo grep -q "^log_group=" /etc/audit/auditd.conf && sudo sed -i 's/^log_group=.*/log_group=dd-agent/' /etc/audit/auditd.conf || echo "log_group=dd-agent" | sudo tee -a /etc/audit/auditd.conf
    ```

2. 監査デーモンを再起動します。
    ```shell
    sudo systemctl restart auditd
    ```

### 検証

[Agent の status サブ コマンドを実行][5] し、Checks セクションで `linux_audit_logs` を探します。

## 収集データ

### メトリクス

Linux Audit Logs インテグレーションには、メトリクスは含まれません。

### ログ収集

1. Datadog Agent ではデフォルトでログ収集は無効になっています。`datadog.yaml` ファイルで有効化してください。

   ```yaml
   logs_enabled: true
   ```

2. `dd-agent` ユーザーに `audit.log` ファイルへの読み取りアクセス権を付与します。

    ```shell
    sudo chown -R dd-agent:dd-agent /var/log/audit/audit.log
    ```

3. Linux 監査ログの収集を開始するには、次の構成ブロックを `linux_audit_logs.d/conf.yaml` ファイルに追加します。

   利用可能な設定オプションについては、[サンプルの linux_audit_logs.d/conf.yaml][6] を参照してください。

   ```yaml
   logs:
     - type: file
       path: /var/log/audit/audit.log
       service: linux-audit-logs
       source: linux-audit-logs
   ```
   **注**: `service` と `source` の値は適切なログ パイプラインの処理に不可欠なため、変更しないでください。

4. [Agent を再起動します][7]。

### イベント

Linux Audit Logs インテグレーションには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問い合わせください。

[1]: https://linux.org/
[2]: https://docs.datadoghq.com/ja/logs/explorer/
[3]: https://www.datadoghq.com/product/cloud-siem/
[4]: https://docs.datadoghq.com/ja/agent/guide/integration-management/?tab=linux#install
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/linux_audit_logs/datadog_checks/linux_audit_logs/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/help/