---
app_id: ivanti-connect-secure
app_uuid: 6fbaf2b3-bcc9-49b1-bcb6-67239f17a1e0
assets:
  dashboards:
    Ivanti Connect Secure - Administrator Activities: assets/dashboards/ivanti_connect_secure_administrator_activities.json
    Ivanti Connect Secure - Authentication: assets/dashboards/ivanti_connect_secure_authentication.json
    Ivanti Connect Secure - Connection and VPN Tunneling: assets/dashboards/ivanti_connect_secure_connection_and_vpn_tunneling.json
    Ivanti Connect Secure - Overview: assets/dashboards/ivanti_connect_secure_overview.json
    Ivanti Connect Secure - Statistics and System Status: assets/dashboards/ivanti_connect_secure_statistics_and_system_status.json
    Ivanti Connect Secure - Web Requests: assets/dashboards/ivanti_connect_secure_web_requests.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 33282127
    source_type_name: Ivanti Connect Secure
  logs:
    source: ivanti-connect-secure
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
- https://github.com/DataDog/integrations-core/blob/master/ivanti_connect_secure/README.md
display_on_public_website: true
draft: false
git_integration_title: ivanti_connect_secure
integration_id: ivanti-connect-secure
integration_title: Ivanti Connect Secure
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: ivanti_connect_secure
public_title: Ivanti Connect Secure
short_description: Ivanti Connect Secure のログからインサイトを得られます。
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
  - Category::Network
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Ivanti Connect Secure のログからインサイトを得られます。
  media:
  - caption: Ivanti Connect Secure - Overview
    image_url: images/ivanti_connect_secure_overview.png
    media_type: image
  - caption: Ivanti Connect Secure - Web Requests
    image_url: images/ivanti_connect_secure_web_requests.png
    media_type: image
  - caption: Ivanti Connect Secure - Authentication
    image_url: images/ivanti_connect_secure_authentication.png
    media_type: image
  - caption: Ivanti Connect Secure - Connection and VPN Tunneling
    image_url: images/ivanti_connect_secure_connection_and_vpn_tunneling.png
    media_type: image
  - caption: Ivanti Connect Secure - Administrator Activities
    image_url: images/ivanti_connect_secure_administrator_activities.png
    media_type: image
  - caption: Ivanti Connect Secure - Statistics and System Status
    image_url: images/ivanti_connect_secure_statistics_and_system_status.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Ivanti Connect Secure
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

[Ivanti Connect Secure][1] は、従業員、パートナー、顧客に対し、企業データとアプリケーションへの安全で制御されたアクセスを提供します。対象のアプリケーションには、ファイル サーバー、Web サーバー、ネイティブ メッセージング、信頼済みネットワークの外部にあるホステッド サーバーが含まれます。

このインテグレーションは、次の種類のログを解析します:

- **Web Requests** : ログは、Web ベースのリソースに対するクライアント リクエストに関する情報を提供します。成功、失敗、ブロック、拒否、未認証のリクエストが含まれます。
- **Authentication** : ログは、ログイン関連のイベント、SSL ネゴシエーションの失敗、リモート アドレスの変更イベントに関する情報を提供します。
- **Connection** : ログは、接続に関する情報を提供します。転送バイト数、継続時間、ホスト名、IP アドレスなどの詳細が含まれます。
- **VPN Tunneling** : ログは、ACL 関連のアクティビティや、VPN セッション関連のイベントに関する情報を提供します。
- **Statistics** : ログは、同時ユーザー数などのシステム使用状況や、その他のパフォーマンス メトリクスに関する情報を提供します。
- **Administrator Activities** : ログは、管理者が実行したアクションに関する情報を提供します。例: ログイン、構成変更、システム管理タスク。

これらのログから得られる詳細なインサイトは、すぐに使えるダッシュボードで可視化できます。さらに、潜在的なセキュリティ脅威を効果的に監視・対応するための、すぐに使える Cloud SIEM 検知ルールも用意されています。

## セットアップ

### インストール

Ivanti Connect Secure インテグレーションをインストールするには、ターミナルで次の Agent インストール コマンドを実行し、その後に下記の構成手順を完了してください。詳細は [Integration Management][2] ドキュメントを参照してください。

**注**: Agent バージョン >= 7.59.0 では、このステップは不要です。

```shell
sudo -u dd-agent -- datadog-agent integration install datadog-ivanti_connect_secure==1.0.0
```

### 構成

#### ログ収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。`datadog.yaml` で有効にします。

   ```yaml
   logs_enabled: true
   ```

2. ログの収集を開始するには、この構成ブロックを `ivanti_connect_secure.d/conf.yaml` ファイルに追加します。

   利用可能な構成オプションについては、サンプルの [ivanti_connect_secure.d/conf.yaml][3] を参照してください。

   ```yaml
   logs:
     - type: tcp # or 'udp'
       port: <PORT>
       source: ivanti-connect-secure
       service: ivanti-connect-secure
   ```

   **注**:

   - `PORT`: **Ivanti Connect Secure からの syslog メッセージ転送の構成** セクションで指定したポートと同様の値にしてください。
   - これらのパラメーターはパイプラインの動作に不可欠なため、service と source の値は変更しないことを推奨します。

3. [Agent を再起動します][4]。

#### Ivanti Connect Secure からの syslog メッセージ転送の構成

1. Ivanti Connect Secure Admin Portal にログインします。
2. **System** > **Log/Monitoring** > **Events** に移動します。
3. **Settings** タブをクリックします。
4. **Select Events to Log** の下で、すべてのイベント タイプが選択されていることを確認します。
5. 構成を適用するには **Save Changes** をクリックします。
6. **Syslog Servers** セクションで syslog サーバーの詳細を構成します:
   - **Server name/IP**: `<IP/DOMAIN>:<PORT>` の形式で、syslog サーバーの完全修飾ドメイン名または IP アドレスを入力します。
   - **Type**: ドロップダウンから **TCP** または **UDP** を選択します。
   - **Filter**: ドロップダウンから **JSON: JSON** を選択します。
     <br>必要な詳細を入力したら **Add** をクリックします。
7. **User Access** と **Admin Access** の各タブでも、手順 3 〜 6 を繰り返します。

### 検証

[Agent の status サブコマンドを実行][5] し、Checks セクションで `ivanti_connect_secure` を探します。

## 収集データ

### ログ

| フォーマット | イベント タイプ                                                                                   |
| ------ | --------------------------------------------------------------------------------------------- |
| JSON   | Web Requests, Authentication, Connection, VPN Tunneling, Statistics, Administrator Activities |

### メトリクス

Ivanti Connect Secure インテグレーションにはメトリクスは含まれません。

### イベント

Ivanti Connect Secure インテグレーションにはイベントは含まれません。

### サービス チェック

Ivanti Connect Secure インテグレーションにはサービス チェックは含まれません。

## トラブルシューティング

**ポートバインド時に Permission denied エラーが発生する場合:**

Agent のログにポートバインド時の **Permission denied** エラーが表示される場合。

1. 1024 未満のポート番号へのバインドには昇格した権限が必要です。`setcap` コマンドを使用してポートへのアクセスを付与します:

   ```shell
   sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
   ```

2. セットアップが正しいことを `getcap` コマンドで確認します:

   ```shell
   sudo getcap /opt/datadog-agent/bin/agent/agent
   ```

   期待される出力:

   ```shell
   /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
   ```

   **注**: Agent をアップグレードするたびにこの `setcap` コマンドを再実行してください。

3. [Agent を再起動します][4]。

**データが収集されない:**

ファイアウォールが有効な場合は、設定したポートへのトラフィックをファイアウォール ルールで許可してください。

**ポートが使用中:**

**Port <PORT_NUMBER> Already in Use** エラーが表示される場合は、次の手順を参照してください。以下はポート 514 の例です:

- Syslog を使用するシステムで、Agent がポート 514 でイベントをリッスンしている場合、Agent ログに次のエラーが表示されることがあります: `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`。これは既定で Syslog がポート 514 をリッスンしているために発生します。解決するには、次のいずれか **1** つの手順を実施します:
  - Syslog を無効化する。
  - Agent を別の利用可能なポートで待ち受けるように設定する。

さらに支援が必要な場合は、[Datadog サポート][6] にお問い合わせください。

[1]: https://www.ivanti.com/products/connect-secure-vpn
[2]: https://docs.datadoghq.com/ja/agent/guide/integration-management/?tab=linux#install
[3]: https://github.com/DataDog/integrations-core/blob/master/ivanti_connect_secure/datadog_checks/ivanti_connect_secure/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/help/