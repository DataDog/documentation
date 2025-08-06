---
app_id: symantec-endpoint-protection
app_uuid: e334ac09-0038-408b-8666-cba88c3217e6
assets:
  dashboards:
    Symantec Endpoint Protection - Application Control: assets/dashboards/symantec_endpoint_protection_application_control.json
    Symantec Endpoint Protection - Overview: assets/dashboards/symantec_endpoint_protection_overview.json
    Symantec Endpoint Protection - Risk: assets/dashboards/symantec_endpoint_protection_risk.json
    Symantec Endpoint Protection - Scan: assets/dashboards/symantec_endpoint_protection_scan.json
    Symantec Endpoint Protection - Security: assets/dashboards/symantec_endpoint_protection_security.json
    Symantec Endpoint Protection - System: assets/dashboards/symantec_endpoint_protection_system.json
    Symantec Endpoint Protection - Traffic: assets/dashboards/symantec_endpoint_protection_traffic.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 26728495
    source_type_name: Symantec Endpoint Protection
  logs:
    source: symantec-endpoint-protection
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- security
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/symantec_endpoint_protection/README.md
display_on_public_website: true
draft: false
git_integration_title: symantec_endpoint_protection
integration_id: symantec-endpoint-protection
integration_title: Symantec Endpoint Protection
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: symantec_endpoint_protection
public_title: Symantec Endpoint Protection
short_description: Symantec Endpoint Protection ログのインサイトを取得。
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
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Symantec Endpoint Protection ログのインサイトを取得。
  media:
  - caption: Symantec Endpoint Protection - Overview
    image_url: images/symantec_endpoint_protection_overview.png
    media_type: image
  - caption: Symantec Endpoint Protection - Scan
    image_url: images/symantec_endpoint_protection_scan.png
    media_type: image
  - caption: Symantec Endpoint Protection - Risk
    image_url: images/symantec_endpoint_protection_risk.png
    media_type: image
  - caption: Symantec Endpoint Protection - Application Control
    image_url: images/symantec_endpoint_protection_application_control.png
    media_type: image
  - caption: Symantec Endpoint Protection - Security
    image_url: images/symantec_endpoint_protection_security.png
    media_type: image
  - caption: Symantec Endpoint Protection - System
    image_url: images/symantec_endpoint_protection_system.png
    media_type: image
  - caption: Symantec Endpoint Protection - Traffic
    image_url: images/symantec_endpoint_protection_traffic.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Symantec Endpoint Protection
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

[Symantec Endpoint Protection][1] は、マルウェア、リスク、脆弱性からネットワーク内のノートパソコン、デスクトップ、サーバーを保護するクライアントサーバーソリューションです。Symantec Endpoint Protection は、ウイルス防御と高度な脅威防御を組み合わせて、ウイルス、ワーム、トロイの木馬、アドウェアなどの既知および未知の脅威からクライアントコンピューターを能動的に保護します。Symantec Endpoint Protection は、ルートキットやゼロデイ攻撃、変異するスパイウェアなど、従来のセキュリティ対策を回避する高度な攻撃からも保護します。

このインテグレーションは、Symantec Endpoint Protection から次のログを取り込み、情報を付加します:

- **監査ログ**: ポリシーの更新、ポリシーの割り当てなど、ポリシーの変更を記録します。
- **リスクログ**: マルウェア、脆弱性、不審なアクティビティなど、エンドポイントで検出された潜在的なセキュリティリスクを追跡・記録します。
- **スキャンログ**: 検出されたマルウェア、スキャン設定、ユーザー情報など、アンチウイルスのスキャン結果を記録します。
- **システムログ**: すべての管理アクティビティ、クライアントアクティビティ、サーバーアクティビティ、`client_server` のアクティビティを記録します。
- **セキュリティログ**: 攻撃、コンプライアンス、デバイス制御など、セキュリティ関連のイベントを記録します。
- **アプリケーション制御ログ**: ブロックされたアプリケーションや許可されたアプリケーションなど、アプリケーション制御に関するイベントを記録します。
- **トラフィックログ**: 受信・発信接続、プロトコル、ポートなどのネットワークトラフィックイベントを記録します。

また、すぐに使えるダッシュボードを使用して、上記のログに関する詳細なインサイトを視覚化することもできます。インテグレーションのインストール後、ダッシュボードリストで「symantec-endpoint-protection」を検索することで、ダッシュボードを見つけることができます。

## セットアップ

### インストール

Symantec Endpoint Protection インテグレーションをインストールするには、次の Agent インストール コマンドと以下の手順を実行します。詳細は [インテグレーション管理のドキュメント][2] を参照してください。

**Note**: This step is not necessary for Agent version >= 7.52.0.

Linux command:

  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-symantec_endpoint_protection==1.0.0
  ```

### 構成

#### ログ収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。`datadog.yaml` で有効にします。

    ```yaml
    logs_enabled: true
    ```

2. Symantec Endpoint Protection のログの収集を開始するには、次のコンフィギュレーションブロックを `symantec_endpoint_protection.d/conf.yaml` ファイルに追加します。

    利用可能な設定オプションは、[サンプル symantec_endpoint_protection.d/conf.yaml][2] を参照してください。

      ```yaml
      logs:
       - type: udp
         port: <PORT>
         service: symantec-endpoint-protection
         source: symantec-endpoint-protection
      ```

3. [Agent を再起動します][3]。

4. Symantec Endpoint Protection サーバーからの Syslog メッセージ転送を設定する手順:

    1. **Symantec Endpoint Protection サーバー**にログオンします。
    2. **Admin** をクリックします。
    3. **administrative** パネルで **servers** をクリックします。
    4. ログを転送する **sites** を選択します。
    5. **Configure external logging** をクリックします。
    6. Syslog サーバーへのログ送信を有効にします。
    7. **Syslog サーバーの IP** を入力します。
    8. ネットワークプロトコルとして **UDP** を選択します。
    9. ログを転送する **PORT** を指定します。

### 検証

[Agent のステータスサブコマンドを実行][4]し、Checks セクションで `symantec_endpoint_protection` を探します。

## 収集データ

### ログ

Symantec Endpoint Protection インテグレーションは、監査、リスク、スキャン、セキュリティ、トラフィック、アプリケーション制御、およびシステムのログを収集します。

### メトリクス

Symantec Endpoint Protection インテグレーションには、メトリクスは含まれません。

### イベント

Symantec Endpoint Protection インテグレーションには、イベントは含まれません。

### サービスチェック

Symantec Endpoint Protection インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

### Permission denied while port binding

If you see a **Permission denied** error while port binding in the Agent logs, see the following instructions:

   1. Binding to a port number under 1024 requires elevated permissions. Grant access to the port using the `setcap` command:

      - Grant access to the port using the `setcap` command:

         ```shell
         sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
         ```

      - Verify the setup is correct by running the `getcap` command:

         ```shell
         sudo getcap /opt/datadog-agent/bin/agent/agent
         ```

         正しければ、次のように出力されます。

         ```shell
         /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
         ```

         **Note**: Re-run this `setcap` command every time you upgrade the Agent.

   2. [Agent を再起動します][3]。

### Data is not being collected

Make sure that traffic is bypassed from the configured port if the firewall is enabled.

### Port already in use

If you see the **Port <PORT-NO\> Already in Use** error, see the following instructions. The example below is for PORT-NO = 514:

On systems using Syslog, if the Agent listens for Cisco Secure Firewall logs on port 514, the following error can appear in the Agent logs: `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`.

This error occurs because by default, Syslog listens on port 514. To resolve this error, take **one** of the following steps:

- Disable Syslog.
- Configure the Agent to listen on a different, available port.

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://techdocs.broadcom.com/us/en/symantec-security-software/endpoint-security-and-management/endpoint-protection/all/what-is-v45096464-d43e1648.html
[2]: https://docs.datadoghq.com/ja/agent/guide/integration-management/?tab=linux#install
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ja/help/