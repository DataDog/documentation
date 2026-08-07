---
app_id: cisco-secure-firewall
app_uuid: 15c8217d-1a43-4efb-a338-053fca68169d
assets:
  dashboards:
    Cisco Secure Firewall - Application and Identity-based Firewall: assets/dashboards/cisco_secure_firewall_application_and_identity_firewall.json
    Cisco Secure Firewall - Command Interface: assets/dashboards/cisco_secure_firewall_command_interface.json
    Cisco Secure Firewall - Failover: assets/dashboards/cisco_secure_firewall_failover.json
    Cisco Secure Firewall - IP Stack: assets/dashboards/cisco_secure_firewall_ip_stack.json
    Cisco Secure Firewall - Intrusion Protection System: assets/dashboards/cisco_secure_firewall_intrusion_protection_system.json
    Cisco Secure Firewall - OSPF and RIP Routing: assets/dashboards/cisco_secure_firewall_ospf_and_rip_routing.json
    Cisco Secure Firewall - Overview: assets/dashboards/cisco_secure_firewall_overview.json
    Cisco Secure Firewall - Resource Manager: assets/dashboards/cisco_secure_firewall_resource_manager.json
    Cisco Secure Firewall - SNMP: assets/dashboards/cisco_secure_firewall_snmp.json
    Cisco Secure Firewall - Security Events: assets/dashboards/cisco_secure_firewall_security_events.json
    Cisco Secure Firewall - Threat Detection: assets/dashboards/cisco_secure_firewall_threat_detection.json
    Cisco Secure Firewall - Transparent Firewall: assets/dashboards/cisco_secure_firewall_transparent_firewall.json
    Cisco Secure Firewall - User Authentication: assets/dashboards/cisco_secure_firewall_user_authentication.json
    Cisco Secure Firewall - VPN Failover: assets/dashboards/cisco_secure_firewall_vpn_failover.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 6690422
    source_type_name: cisco-secure-firewall
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- network
- security
- log collection
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cisco_secure_firewall/README.md
display_on_public_website: true
draft: false
git_integration_title: cisco_secure_firewall
integration_id: cisco-secure-firewall
integration_title: Cisco Secure Firewall
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: cisco_secure_firewall
public_title: Cisco Secure Firewall
short_description: Cisco Secure Firewall ログのインサイトを取得
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
  - Category::Network
  - Category::Security
  - Category::Log Collection
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Cisco Secure Firewall ログのインサイトを取得
  media:
  - caption: Cisco Secure Firewall - SNMP
    image_url: images/cisco_secure_firewall_snmp.png
    media_type: image
  - caption: Cisco Secure Firewall - アプリケーション ＆ アイデンティティ ベース ファイアウォール
    image_url: images/cisco_secure_firewall_application_and_identity_based_firewall.png
    media_type: image
  - caption: Cisco Secure Firewall - フェイルオーバー
    image_url: images/cisco_secure_firewall_failover.png
    media_type: image
  - caption: Cisco Secure Firewall - 侵入防御システム
    image_url: images/cisco_secure_firewall_intrusion_protection_system.png
    media_type: image
  - caption: Cisco Secure Firewall - IP スタック
    image_url: images/cisco_secure_firewall_ip_stack.png
    media_type: image
  - caption: Cisco Secure Firewall - 脅威検出
    image_url: images/cisco_secure_firewall_threat_detection.png
    media_type: image
  - caption: Cisco Secure Firewall - トランスペアレント ファイアウォール
    image_url: images/cisco_secure_firewall_transparent_firewall.png
    media_type: image
  - caption: Cisco Secure Firewall - ユーザー認証
    image_url: images/cisco_secure_firewall_user_authentication.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco Secure Firewall
---

<!-- SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

[Cisco Secure Firewall Threat Defense (FTD)][1] は、統合管理を備えた脅威特化型の次世代ファイアウォール (NGFW) です。攻撃の前、最中、そして後に高度な脅威防御を提供します。[Cisco Secure Firewall Management Center (FMC)][2] は、オンプレミスおよび仮想環境で Cisco Secure Firewall Threat Defense (FTD) のイベントとポリシーを一元管理するプラットフォームです。

このインテグレーションは、Cisco Secure FMC を使用して Cisco Secure FTD から次のログを取り込み、情報を付加します:
- ユーザー認証ログ
- SNMP ログ
- フェイルオーバー ログ
- トランスペアレント ファイアウォール ログ
- 脅威検出ログ
- セキュリティ イベント
- IP スタック ログ
- アプリケーション ファイアウォール ログ
- アイデンティティ ベース ファイアウォール ログ
- コマンド インターフェイス ログ
- OSPF ルーティング ログ
- RIP ルーティング ログ
- リソース マネージャー ログ
- VPN フェイルオーバー ログ
- 侵入防御システム ログ
- ダイナミック アクセス ポリシー
- IP アドレス割り当て

SNMP リクエスト、アイデンティティ ベース ファイアウォール ログ、リアルタイム脅威分析、セキュリティ検出と監視、そしてコンプライアンス監視を、すぐに利用できるダッシュボードで詳細に可視化できます。

## セットアップ

### インストール

Cisco Secure Firewall インテグレーションをインストールするには、以下の Agent インストール コマンドを実行し、その後の手順に従ってください。詳細は[インテグレーション管理ドキュメント][3]を参照してください。

**注**: Agent バージョン >= 7.52.0 の場合、この手順は不要です。

Linux コマンド:
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-cisco_secure_firewall==1.0.0
  ```

### コンフィギュレーション

#### Cisco Secure Firewall

1. Datadog Agent ではデフォルトでログ収集が無効化されています。`datadog.yaml` で有効化してください:
    ```yaml
    logs_enabled: true
    ```

2. Cisco Secure Firewall のログ収集を開始するには、次のコンフィギュレーション ブロックを `cisco_secure_firewall.d/conf.yaml` に追加します。

    利用可能な設定オプションは、[サンプル cisco_secure_firewall.d/conf.yaml][3] を参照してください。

      ```yaml
      logs:
       - type: tcp/udp
         port: <PORT>
         service: cisco-secure-firewall
         source: cisco-secure-firewall
      ```

3. [Agent を再起動します][4]。

4. Cisco Secure Firewall Management Center での Syslog メッセージ転送設定:

    1. **Devices > Platform Settings** を選択し、FTD ポリシーを作成または編集します。
    2. **Syslog > Logging Setup** を選択します。
       - **Enable Logging**: Firepower Threat Defense デバイスのデータ プレーン システム ログを有効化します。
       - **Enable Logging on the failover standby unit**: スタンバイ Firepower Threat Defense デバイスのログを有効化します (利用可能な場合)。
       - **Save** をクリックします。
    3. **Syslog > Syslog Settings** を選択します。
       - **Facility** ドロップダウンから **LOCAL7(20)** を選択します。
       - Syslog メッセージにメッセージ生成日時を含めるには、**Enable Timestamp on Syslog Messages** チェック ボックスをオンにします。
       - Timestamp Format ドロップダウン リストで **RFC 5424 (yyyy-MM-ddTHH:mm:ssZ)** を選択します。
       - Syslog メッセージの冒頭にデバイス識別子を付加したい場合は、**Enable Syslog Device ID** チェック ボックスをオンにし、識別子の種類を選択してください。
          - **Interface**: メッセージ送信インターフェイスに関係なく、選択したインターフェイスの IP アドレスを使用します。セキュリティ ゾーンを選択してください (ゾーンは単一インターフェイスにマップされる必要があります)。
          - **User Defined ID**: 任意の文字列 (最大 16 文字) を使用します。
          - **Host Name**: デバイスのホスト名を使用します。
       - **Save** をクリックします。
    4. **Syslog > Syslog Server** を選択します。
       - **Allow user traffic to pass when TCP syslog server is down** をチェックし、TCP プロトコル使用時に syslog サーバーがダウンしてもトラフィックを許可します。
       - **Add** をクリックし、新しい syslog サーバーを追加します。
          - **IP Address** ドロップダウンで、syslog サーバーの IP アドレスを含むネットワーク ホスト オブジェクトを選択します。
          - プロトコル (TCP または UDP) を選択し、Firepower Threat Defense デバイスと syslog サーバー間の通信ポート番号を入力します。
          - Syslog サーバーとの通信に使用する Device Management Interface、Security Zones、または Named Interfaces を選択します。
            - Security Zones または Named Interfaces: 利用可能なゾーン一覧からインターフェイスを選択し Add をクリックします。
          - **OK** をクリックします。
       - **Save** をクリックします。
    5. **Deploy > Deployment** に進み、ポリシーを割り当て済みデバイスへデプロイします。デプロイが完了するまで変更は適用されません。


### 検証

[Agent のステータス サブコマンドを実行][5]し、Checks セクションで `cisco_secure_firewall` を探してください。

## 収集されるデータ

### ログ

Cisco Secure Firewall インテグレーションは、ユーザー認証、SNMP、フェイルオーバー、トランスペアレント ファイアウォール、IP スタック、アプリケーション ファイアウォール、アイデンティティ ベース ファイアウォール、脅威検出、コマンド インターフェイス、セキュリティ イベント、OSPF ルーティング、RIP ルーティング、リソース マネージャー、VPN フェイルオーバー、侵入防御システムの各ログを収集します。

### メトリクス

Cisco Secure Firewall インテグレーションにはメトリクスは含まれていません。

### イベント

Cisco Secure Firewall インテグレーションにはイベントは含まれていません。

### サービス チェック

Cisco Secure Firewall インテグレーションにはサービス チェックは含まれていません。

## トラブルシューティング

### Cisco Secure Firewall

**ポート バインド時の Permission denied:**

Agent ログでポート バインド時に **Permission denied** エラーが表示された場合は、以下の手順を確認してください。

   1. 1024 未満のポート番号にバインドするには昇格権限が必要です。`setcap` コマンドでそのポートへのアクセスを許可してください:

      - `setcap` コマンドでポートへのアクセスを付与します。

         ```shell
         sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
         ```

      - `getcap` コマンドを実行し、設定が正しいことを確認します。

         ```shell
         sudo getcap /opt/datadog-agent/bin/agent/agent
         ```

         正しければ、次のように出力されます。

         ```shell
         /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
         ```

         **注**: Agent をアップグレードするたびに、この `setcap` コマンドを再実行してください。

   2. [Agent を再起動][4]します。

**データが収集されない:**

ファイアウォールが有効な場合、設定したポートからのトラフィックがバイパスされていることを確認してください。

**ポートが既に使用中:**

**Port <PORT-NO\> Already in Use** エラーが表示される場合は、以下の手順を確認してください。例として PORT-NO = 514 の場合を示します。

Syslog を使用するシステムで Agent がポート 514 で Cisco Secure Firewall ログを受信しようとすると、Agent ログに次のエラーが表示されることがあります: `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`

これは Syslog がデフォルトでポート 514 を使用しているために発生します。解決するには、以下のいずれか **1 つ** の方法を実施してください:
- Syslog を無効化する。
- Agent を別の利用可能なポートで待ち受けるように設定する。

さらなる支援が必要な場合は、[Datadog サポート][6]までお問い合わせください。

[1]: https://www.cisco.com/c/en/us/support/security/firepower-ngfw/series.html
[2]: https://www.cisco.com/c/en/us/products/collateral/security/firesight-management-center/datasheet-c78-736775.html
[3]: https://docs.datadoghq.com/ja/agent/guide/integration-management/?tab=linux#install
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/help/