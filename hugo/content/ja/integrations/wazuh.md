---
app_id: wazuh
app_uuid: 5b1e3f2f-419d-4d9d-bb00-002b58e28835
assets:
  dashboards:
    Wazuh - Cloud Security: assets/dashboards/wazuh_cloud_security.json
    Wazuh - File Integrity Monitoring: assets/dashboards/wazuh_file_integrity_monitoring.json
    Wazuh - MITRE ATT&CK: assets/dashboards/wazuh_MITRE_ATT&CK.json
    Wazuh - Malware Detection: assets/dashboards/wazuh_malware_detection.json
    Wazuh - Overview: assets/dashboards/wazuh_overview.json
    Wazuh - Security Operations: assets/dashboards/wazuh_security_operations.json
    Wazuh - System: assets/dashboards/wazuh_system.json
    Wazuh - Vulnerability Detection: assets/dashboards/wazuh_vulnerability_detection.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 26101213
    source_type_name: Wazuh
  logs:
    source: wazuh
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- アラート
- log collection
- security
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/wazuh/README.md
display_on_public_website: true
draft: false
git_integration_title: wazuh
integration_id: wazuh
integration_title: Wazuh
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: wazuh
public_title: Wazuh
short_description: Wazuh アラートに関するインサイトを得ます。
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
  - Category::Alerting
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Wazuh アラートに関するインサイトを得ます。
  media:
  - caption: Wazuh - Cloud Security
    image_url: images/wazuh-cloud-security.png
    media_type: image
  - caption: Wazuh - File Integrity Monitoring
    image_url: images/wazuh-file-integrity-monitoring.png
    media_type: image
  - caption: Wazuh - Malware Detection
    image_url: images/wazuh-malware-detection.png
    media_type: image
  - caption: Wazuh - MITRE ATT&CK
    image_url: images/wazuh-mitre-attack.png
    media_type: image
  - caption: Wazuh - Overview
    image_url: images/wazuh-overview.png
    media_type: image
  - caption: Wazuh - Security Operations
    image_url: images/wazuh-security-operations.png
    media_type: image
  - caption: Wazuh - System
    image_url: images/wazuh-system.png
    media_type: image
  - caption: Wazuh - Vulnerability Detection
    image_url: images/wazuh-vulnerability-detection.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Wazuh
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

[Wazuh][1] は、複数の IT インフラストラクチャ レイヤーにわたる脅威を検出・分析し、対応する包括的なセキュリティ ソリューションを提供します。Wazuh は、エンドポイント、ネットワーク デバイス、クラウド ワークロード、サード パーティ API、その他のソースからテレメトリを収集し、統合されたセキュリティ監視と保護を実現します。

このインテグレーションは、次の種類のログを解析します:
- **vulnerability-detector** : Wazuh によって生成される脆弱性イベント。
- **malware-detector** : システム内のマルウェアを検出するために Wazuh によって生成される Rootcheck イベント。
- **file-integrity-monitoring** : 権限、コンテンツ、所有権、属性などのファイル変更に関連するイベント。
- **docker** : docker コンテナのアクティビティ イベント。
- **github** : GitHub 組織の監査ログ由来のイベント。
- **google-cloud** : Google Cloud Platform サービスに関連するセキュリティ イベント。
- **amazon** : Amazon AWS サービスからのセキュリティ イベント。
- **office365** : Office 365 に関連するセキュリティ イベント。
- **system** : FTPD、PAM、SSHD、syslog、Windows、dpkg、yum、sudo、su、wazuh、ossec などのサービスからのイベントおよび内部イベント。

これらのログを、すぐに利用できるダッシュボードで詳細に可視化できます。

## セットアップ

### インストール

Wazuh インテグレーションをインストールするには、次の Agent インストール コマンドを実行し、以降の手順に従ってください。詳細は [インテグレーション 管理][2] ドキュメントを参照してください。

**注**: このステップは Agent のバージョンが 7.58.0 以上の場合は不要です。

Linux コマンド
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-wazuh==1.0.0
  ```

### 設定

#### ログの収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。`datadog.yaml` で有効にします。

    ```yaml
    logs_enabled: true
    ```
2. ログ収集を開始するには、この構成ブロックを `wazuh.d/conf.yaml` ファイルに追加します。

    Wazuh アラート データの収集には UDP メソッドを使用します。
    利用可能な構成オプションは、サンプルの [wazuh.d/conf.yaml][3] を参照してください。

    ```yaml
      logs:
      - type: udp
        port: <PORT>
        source: wazuh
        service: wazuh
    ```
    **注**: パイプラインの動作に不可欠なため、service と sourceの値は変更しないことを推奨します。

3. [Agent を再起動します][4]。

#### Wazuh からの syslog メッセージ転送を構成する

  1. Wazuh UI にログインします。左側の Menu に移動します。
  2. **Server management** > **Settings** に移動します。
  3. **Edit configuration** をクリックします。
  4. 次の構成ブロックを追加します:

      この例では、すべてのアラートがポート 8080 の 1.1.1.1 に JSON 形式で送信されます。
      ```xml
        <syslog_output>
          <server>1.1.1.1</server>
          <port>8080</port>
          <format>json</format>
        </syslog_output>
      ```

      * `server` タグには Datadog Agent が稼働しているホストの IP アドレスを指定してください。

      * `port` タグには、Datadog Agent が待ち受けているポート番号を設定します。

      注: JSON 形式の使用は必須です。Wazuh パイプラインは JSON 形式のログのみを解析します。
  5. **Save** ボタンをクリックします。
  6. 保存後、**Restart Manager** ボタンをクリックします。


### 検証

[Agent の status サブコマンドを実行][5] し、Checks セクションで `wazuh` を探します。

## 収集データ

### ログ

| 形式     | イベントタイプ    |
| ---------  | -------------- |
| JSON | vulnerability-detector、file-integrity-monitoring、malware-detector、github、docker、amazon、office365、google-cloud、system など |

### メトリクス

Wazuh インテグレーションにはメトリクスは含まれません。

### イベント

Wazuh インテグレーションにはイベントは含まれません。

### サービスチェック

Wazuh インテグレーションにはサービス チェックは含まれません。

## トラブルシューティング

**ポートバインド時に Permission denied エラーが発生する場合:**

Agent のログにポートバインド時の **Permission denied** エラーが表示される場合。

1. 1024 未満のポートにバインドするには高い権限が必要です。`setcap` コマンドを使用してポートへのアクセスを許可してください。
    ```shell
    sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
    ```

2. `getcap` コマンドを実行し、設定を確認します。

    ```shell
    sudo getcap /opt/datadog-agent/bin/agent/agent
    ```

    正しければ、次のように出力されます。

    ```shell
    /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
    ```

    **注**: Agent をアップグレードするたびに、この `setcap` コマンドを再実行する必要があります。

3. [Agent を再起動します][4]。

想定される問題のトラブルシューティング方法は次のとおりです。

**データが収集されない場合:**

ファイアウォールが有効な場合は、設定したポートへのトラフィックをファイアウォール ルールで許可してください。

**すでに使用されているポートの場合:**

**Port <PORT_NUMBER> Already in Use** エラーが発生したら、以下の手順を参照してください。次の例はポート 514 を想定しています。

- Syslog を使用しているシステムで、Agent がポート 514 で Wazuh ログをリッスンしている場合、Agent ログに次のエラーが表示されることがあります: `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`。このエラーは、デフォルトで Syslog がポート 514 をリッスンしているために発生します。解決するには、次の **いずれか 1 つ** の手順を実行してください:
    - Syslog を無効にする。
    - Agent を他の利用可能なポートで待ち受けるよう設定する。


さらに支援が必要な場合は、[Datadog サポート][6] にお問い合わせください。

[1]: https://wazuh.com/
[2]: https://docs.datadoghq.com/ja/agent/guide/integration-management/?tab=linux#install
[3]: https://github.com/DataDog/integrations-core/blob/master/wazuh/datadog_checks/wazuh/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/help/