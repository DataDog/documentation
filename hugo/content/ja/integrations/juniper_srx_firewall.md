---
app_id: juniper-srx-firewall
app_uuid: 0451c670-94dc-490e-86b7-b23b5a7cdceb
assets:
  dashboards:
    Juniper SRX Firewall - Authentication Logs: assets/dashboards/juniper_srx_firewall_authentication_logs.json
    Juniper SRX Firewall - Overview: assets/dashboards/juniper_srx_firewall_overview.json
    Juniper SRX Firewall - Security Logs: assets/dashboards/juniper_srx_firewall_security_logs.json
    Juniper SRX Firewall - Session Logs: assets/dashboards/juniper_srx_firewall_session_logs.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    source_type_id: 40625309
    source_type_name: Juniper SRX Firewall
  logs:
    source: juniper-srx-firewall
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
- https://github.com/DataDog/integrations-core/blob/master/juniper_srx_firewall/README.md
display_on_public_website: true
draft: false
git_integration_title: juniper_srx_firewall
integration_id: juniper-srx-firewall
integration_title: Juniper SRX Firewall
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: juniper_srx_firewall
public_title: Juniper SRX Firewall
short_description: Juniper SRX Firewall ログからインサイトを取得
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
  description: Juniper SRX Firewall ログからインサイトを取得
  media:
  - caption: Juniper SRX Firewall - 概要
    image_url: images/juniper_srx_firewall_overview.png
    media_type: image
  - caption: Juniper SRX Firewall - セッション ログ
    image_url: images/juniper_srx_firewall_session_logs.png
    media_type: image
  - caption: Juniper SRX Firewall - セキュリティ ログ
    image_url: images/juniper_srx_firewall_security_logs.png
    media_type: image
  - caption: Juniper SRX Firewall - 認証ログ
    image_url: images/juniper_srx_firewall_authentication_logs.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Juniper SRX Firewall
---

<!-- SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

[Juniper SRX Firewall][1] は、侵入やマルウェアなどの脅威を検知・緩和することで、ネットワーク エッジ、データ センター、クラウド アプリケーションのセキュリティを確保します。

このインテグレーションは次のタイプのログを解析します。

- **セッション ログ**: 開始されたセッション、拒否されたセッション、アプリケーション関連のトラフィック、ドロップされたパケットなど、ネットワーク トラフィックとセッション アクティビティを追跡します。
- **セキュリティ ログ**: マルウェアの検出、侵入の試み、DoS 攻撃、コンテンツ フィルタリングなどのセキュリティ イベントを監視します。
- **認証ログ**: ログイン試行の成否など、認証アクティビティを取得します。

これらのログはすぐに使えるダッシュボードで詳細に可視化でき、事前構築済みの Cloud SIEM 検出ルールでセキュリティを強化して、プロアクティブな脅威の監視と対応を実現できます。

## セットアップ

### インストール

Juniper SRX Firewall インテグレーションをインストールするには、ターミナルで次の Agent インストール コマンドを実行します。詳細は [Integration Management][2] ドキュメントを参照してください。

**注**: Agent バージョンが 7.64.0 以上の場合、この手順は不要です。

```shell
sudo -u dd-agent -- datadog-agent integration install datadog-juniper_srx_firewall==1.0.0
```

### 設定

#### ログ収集の構成

1. ログの収集は Datadog Agent ではデフォルトで無効です。`datadog.yaml` で有効化してください。

   ```yaml
   logs_enabled: true
   ```

2. 次の構成ブロックを `juniper_srx_firewall.d/conf.yaml` ファイルに追加して、ログの収集を開始します。利用可能な構成オプションについては、[`conf.yaml` のサンプル][3] を参照してください。

   ```yaml
   logs:
     - type: udp
       port: <PORT>
       source: juniper-srx-firewall
       service: juniper-srx-firewall
   ```

   **注**:

   - `PORT`: Datadog がリッスンする UDP ポートを指定します (デフォルト: 514)。
   - `service` と `source` の値は適切なログ パイプラインの処理に不可欠なため、変更しないでください。

3. [Agent を再起動][4]します。

#### Juniper SRX Firewall からの syslog メッセージ転送を設定

1. Juniper SRX Firewall CLI にログインします。

2. 設定モードに入ります:
   ```shell
   configure
   ```

3. Datadog Agent にログを送信するために、次のコマンドを実行します。
   ```shell
   set system syslog host <IP-ADDRESS> any any
   set system syslog host <IP-ADDRESS> port <PORT>
   set system syslog host <IP-ADDRESS> structured-data brief
   ```
   **注**:
   - `<IP-ADDRESS>` を Datadog Agent の IP アドレスに置き換えます。
   - `<PORT>` を [ログ収集][5] で設定したものと同じポートに置き換えます。

4. `Security Logging` が有効かどうかを確認します:
   ```shell
   show security log mode
   ```
   有効な場合は、出力に `mode stream;` または `mode event-stream;` が表示されます。

5. `Security Logging` が有効になっている場合は、ログ ストリーミングを設定します:
   ```shell
   set security log stream <NAME> format sd-syslog
   set security log stream <NAME> category all
   set security log stream <NAME> host <IP-ADDRESS>
   set security log stream <NAME> host port <PORT>
   set security log transport protocol udp
   ```

6. 設定を適用して終了します。
   ```
   commit
   exit
   ```

### 検証

[Agent の status サブ コマンドを実行][6] し、**Checks** セクションに `juniper_srx_firewall` が表示されることを確認してください。

## 収集データ

### ログ

| 形式                    | イベントタイプ                                      |
| ------------------------- | ------------------------------------------------ |
| Structured-Data(RFC 5424) | セッション ログ、セキュリティ ログ、認証ログ |

### メトリクス

Juniper SRX Firewall インテグレーションにはメトリクスは含まれていません。

### イベント

Juniper SRX Firewall インテグレーションにはイベントは含まれていません。

### サービス チェック

Juniper SRX Firewall インテグレーションにはサービス チェックは含まれていません。

## トラブルシューティング

### ポート バインド時の Permission denied

Agent のログにポートバインド時の **Permission denied** エラーが表示される場合。

1. 1024 未満のポート番号にバインドするには昇格権限が必要です。`setcap` コマンドでそのポートへのアクセスを許可してください:

   ```shell
   sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
   ```

2. `getcap` コマンドで設定を確認:

   ```shell
   sudo getcap /opt/datadog-agent/bin/agent/agent
   ```

   期待される出力:

   ```shell
   /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
   ```

   **注**: Agent をアップグレードするたびにこの `setcap` コマンドを再実行してください。

3. [Agent を再起動][4]します。

### データが収集されない

ファイアウォールの設定で、設定したポート経由のトラフィックが許可されていることを確認してください。

### Port already in use

Syslog を実行しているシステムで、Agent がポート 514 へのバインドに失敗し、次のエラーが表示されることがあります。

    Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use

このエラーは、Syslog がデフォルトでポート 514 を使用しているために発生します。 

次のいずれかの方法で解決します。
  - Syslog を無効にする。
  - Agent を別の利用可能なポートで待ち受けるように設定する。

追加サポートが必要な場合は [Datadog サポート][7]までお問い合わせください。

[1]: https://www.juniper.net/us/en/products/security/srx-series.html
[2]: https://docs.datadoghq.com/ja/agent/guide/integration-management/?tab=linux#install
[3]: https://github.com/DataDog/integrations-core/blob/master/juniper_srx_firewall/datadog_checks/juniper_srx_firewall/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/integrations/juniper_srx_firewall/#configure-log-collection
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ja/help/