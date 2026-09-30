---
app_id: zeek
app_uuid: 81ba5f4a-0e85-48c3-9ba3-2e5ea37b1ed2
assets:
  dashboards:
    Corelight Suricata: assets/dashboards/corelight_suricata.json
    Zeek - Connections: assets/dashboards/zeek_connections.json
    Zeek - DHCP: assets/dashboards/zeek_dhcp.json
    Zeek - DNS: assets/dashboards/zeek_dns.json
    Zeek - Datared: assets/dashboards/zeek_datared.json
    Zeek - Detection: assets/dashboards/zeek_detection.json
    Zeek - Diagnostics: assets/dashboards/zeek_diagnostics.json
    Zeek - Files: assets/dashboards/zeek_files.json
    Zeek - Miscellaneous: assets/dashboards/zeek_miscellaneous.json
    Zeek - Network Observations: assets/dashboards/zeek_network_observations.json
    Zeek - Network Protocols: assets/dashboards/zeek_network_protocols.json
    Zeek - Network Protocols (NTP, SNMP, SSL): assets/dashboards/zeek_network_protocols_ntp_snmp_ssl.json
    Zeek - Syslog: assets/dashboards/zeek_syslog.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 6777560
    source_type_name: zeek
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- security
- ネットワーク
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/zeek/README.md
display_on_public_website: true
draft: false
git_integration_title: zeek
integration_id: zeek
integration_title: Zeek
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: zeek
public_title: Zeek
short_description: Zeek ログからインサイトを得て、Cloud SIEM に接続する
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::Log Collection
  - Category::Security
  - Category::Network
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Zeek ログからインサイトを得て、Cloud SIEM に接続する
  media:
  - caption: Zeek - Connections
    image_url: images/zeek_connections.png
    media_type: image
  - caption: Zeek - DHCP
    image_url: images/zeek_dhcp.png
    media_type: image
  - caption: Zeek - DNS
    image_url: images/zeek_dns.png
    media_type: image
  - caption: Zeek - Network Protocols
    image_url: images/zeek_network_protocols.png
    media_type: image
  - caption: Zeek - Detection
    image_url: images/zeek_detection.png
    media_type: image
  - caption: Zeek - Diagnostics
    image_url: images/zeek_diagnostics.png
    media_type: image
  - caption: Zeek - Files
    image_url: images/zeek_files.png
    media_type: image
  - caption: Zeek - Network Observations
    image_url: images/zeek_network_observations.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Zeek
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

[Zeek][1] はネットワーク セキュリティ監視のためのプラットフォームです。Zeek は観測内容を解釈し、高精度かつコンパクトなトランザクションログとファイルコンテンツを生成します。出力は完全にカスタマイズでき、ディスク上で手動レビューする場合や、セキュリティ情報イベント管理 (SIEM) などアナリスト向けのツールで分析する場合に適しています。

This integration ingests the following logs:
- 接続ログ
- DNS および DHCP ログ
- ネットワークプロトコル
- ファイル
- 検知
- その他のイベントタイプ

標準で用意されているダッシュボードを使えば、ネットワーク接続、DNS と DHCP のアクティビティ、詳細なネットワークプロトコル分析、ファイルおよび証明書の分析、セキュリティ検知と観測、コンプライアンス監視を詳細に可視化できます。

## セットアップ

### インストール

Zeek インテグレーションをインストールするには、次の Agent インストール コマンドを実行し、以下の手順に従ってください。詳細は [Integration Management][2] ドキュメントを参照してください。

**注**: Agent バージョン >= 7.52.0 ではこの手順は不要です。

Linux コマンド
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-zeek==1.0.0
  ```

#### オープンソース版 Zeek
1. Zeek マシンに [Agent をインストール][3]してください。
2. JSON ログ出力用に [Corelight Zeek プラグイン][4]をインストールしてください。
    ```
    /opt/zeek/bin/zkg install corelight/json-streaming-logs
    ```
3. ZKG パッケージをロードしてください。
    ```
    echo -e "\n# Load ZKG packages\n@load packages" >> /opt/zeek/share/zeek/site/local.zeek
    ```
4. Zeek を再起動してください。
    ```
    /opt/zeek/bin/zeekctl install
    ```
    ```
    /opt/zeek/bin/zeekctl restart
    ```

#### Corelight Zeek
* [Datadog Agent][3] がインストールされ、稼働していることを確認してください。

### 構成

#### オープンソース版 Zeek
1. Datadog Agent で、ログの収集はデフォルトで無効になっています。`datadog.yaml` で有効にします。
    ```yaml
    logs_enabled: true
    ```

2. Zeek ログの収集を開始するには、次の設定ブロックを `zeek.d/conf.yaml` ファイルに追加してください。

    利用可能な設定オプションについては[サンプル zeek.d/conf.yaml][5] を参照してください。

   ```yaml
    logs:
    - type: file
      path: /opt/zeek/logs/current/*.log
      exclude_paths:
        - /opt/zeek/logs/current/*.*.log
      service: zeek
      source: zeek
   ```

    **注**: 監視中に未サポートまたは不要なログ ファイルが取り込まれないよう、`exclude_paths` パラメータに対象ログ ファイルのパスを含めてください。


   ```yaml
    # 除外パスの例
    exclude_paths:
      - /opt/zeek/logs/current/ntlm.log
      - /opt/zeek/logs/current/radius.log
      - /opt/zeek/logs/current/rfb.log
   ```

3. [Agent を再起動します][6]。

#### Corelight Zeek
1. デフォルトでは Datadog Agent でのログ収集は無効になっています。datadog.yaml で有効化してください:
    ```yaml
    logs_enabled: true
    ```

2. ログの収集を開始するには、この設定ブロックを `zeek.d/conf.yaml` ファイルに追加してください。
    ```yaml
    logs:
    - type: tcp
      port: <PORT>
      service: corelight
      source: zeek
    ```

3. [Agent を再起動します][6]。

4. Corelight から Syslog メッセージを転送する設定
    1. Web ブラウザを開き、Corelight センサーの IP アドレスまたはホスト名にアクセスします。
    2. 管理者資格情報でログインします。
    3. Zeek 設定ページへ移動します。正確なパスはセンサーのファームウェア バージョンによって異なる場合があります。
    4. 「Zeek」または「Logging」に関連するオプションを探します。一般的なパス例:
      - Settings > Logging
      - Configuration > Zeek > Logging
    5. Zeek ログ用の syslog 出力を有効にするオプションを見つけ、チェックボックスまたはトグルをオンにします。
    6. Syslog サーバーの詳細を指定します:
       - **Syslog server IP address**: Zeek ログを送信する宛先 IP アドレス
       - **Syslog port**: Syslog サーバーが待ち受けているポート (通常は 514)
       - **Facility**: 使用する syslog ファシリティ
       - **Severity level**: 送信するイベントの最小重大度
    7. **Save** または **Apply** ボタンをクリックして設定を保存します。


### 検証

[Agent の status サブコマンド][7]を実行し、Checks セクションに `zeek` があることを確認します。

## 収集データ

### Logs

Zeek インテグレーションは以下のログ タイプを収集します。

| 形式     | イベントタイプ    |
| ---------  | -------------- |
| オープンソース版 Zeek - JSON 形式 | conn, dhcp, dns, ftp, http, ntp, rdp, smtp, snmp, socks, ssh, ssl, syslog, tunnel, files, pe, intel, notice, signatures, traceroute, known-certs, known-modbus, known-services, known-hosts, software, x509, dpd, weird, captureloss, reporter, ldap, ldap-search, smb-files, smb-mappings |
| Corelight Zeek - Syslog RFC 3164 (レガシー) 形式 | conn, dhcp, dns, ftp, http, ntp, rdp, smtp, snmp, socks, ssh, ssl, syslog, tunnel, files, pe, intel, notice, signatures, traceroute, known-certs, known-modbus, known-services, known-hosts, software, x509, dpd, weird, captureloss, reporter, ldap, ldap-search, smb-files, smb-mappings, conn-long, conn-red, encrypted-dns, generic-dns-tunnels, smtp-links, suricata-corelight |

### メトリクス

Zeek インテグレーションにはメトリクスは含まれていません。

### イベント

Zeek インテグレーションにはイベントは含まれません。

### サービスチェック

Zeek インテグレーションにはサービスチェックは含まれません。

## トラブルシューティング

### オープンソース版 Zeek:

ログファイルを監視している際に **Permission denied** エラーが表示される場合は、`dd-agent` ユーザーに対してファイルの読み取り権限を付与してください。

  ```shell
  sudo chown -R dd-agent:dd-agent /opt/zeek/current/
  ```

### Corelight Zeek:

**Permission denied while port binding:**

Agent ログでポートバインド中に **Permission denied** エラーが表示された場合は、以下の手順を参照してください。

1. Binding to a port number under 1024 requires elevated permissions. Grant access to the port using the `setcap` command:
    ```shell
    sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
    ```

2. Verify the setup is correct by running the `getcap` command:

    ```shell
    sudo getcap /opt/datadog-agent/bin/agent/agent
    ```

    正しければ、次のように出力されます。

    ```shell
    /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
    ```

    **Note**: Re-run this `setcap` command every time you upgrade the Agent.

3. [Agent を再起動します][6]。

**Data is not being collected:**

Make sure that traffic is bypassed from the configured port if the firewall is enabled.

**Port already in use:**

**Port <PORT-NO> Already in Use** エラーが表示された場合は、以下の手順を参照してください。例として PORT-NO = 514:

Syslog を使用しているシステムで、Agent が Zeek ログをポート 514 で受信しようとすると、Agent ログに次のエラーが表示されることがあります: `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`

このエラーは、Syslog がデフォルトでポート 514 を使用しているために発生します。次のいずれか**一つ**の方法で解決してください:
- Syslog を無効化する
- Agent が他の空きポートで待ち受けるように設定する

さらにサポートが必要な場合は [Datadog サポート][8]までお問い合わせください。

[1]: https://zeek.org/
[2]: https://docs.datadoghq.com/ja/agent/guide/integration-management/?tab=linux#install
[3]: https://docs.datadoghq.com/ja/agent/
[4]: https://github.com/corelight/json-streaming-logs
[5]: https://github.com/DataDog/integrations-core/blob/master/cisco_secure_firewall/datadog_checks/cisco_secure_firewall/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/ja/help/