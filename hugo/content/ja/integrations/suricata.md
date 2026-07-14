---
app_id: suricata
app_uuid: d5d0689e-8684-4663-b31b-d1947b7ccefd
assets:
  dashboards:
    Suricata - Alert: assets/dashboards/suricata_alert.json
    Suricata - Anomaly: assets/dashboards/suricata_anomaly.json
    Suricata - DHCP: assets/dashboards/suricata_dhcp.json
    Suricata - DNs: assets/dashboards/suricata_dns.json
    Suricata - Flow: assets/dashboards/suricata_flow.json
    Suricata - Network Protocols: assets/dashboards/suricata_network_protocols.json
    Suricata - Overview: assets/dashboards/suricata_overview.json
    Suricata - SMB (DCERPC, NTLMSSP, Kerberos): assets/dashboards/suricata_smb.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 17124993
    source_type_name: suricata
  logs:
    source: suricata
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
- https://github.com/DataDog/integrations-core/blob/master/suricata/README.md
display_on_public_website: true
draft: false
git_integration_title: suricata
integration_id: suricata
integration_title: suricata
integration_version: 2.0.0
is_public: true
manifest_version: 2.0.0
name: suricata
public_title: suricata
short_description: Suricata のログを可視化し、洞察を得られます。
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
  description: Suricata のログを可視化し、洞察を得られます。
  media:
  - caption: Suricata - 概要
    image_url: images/suricata_overview.png
    media_type: image
  - caption: Suricata - アラート
    image_url: images/suricata_alert.png
    media_type: image
  - caption: Suricata - 異常
    image_url: images/suricata_anomaly.png
    media_type: image
  - caption: Suricata - フロー
    image_url: images/suricata_flow.png
    media_type: image
  - caption: Suricata - DNS
    image_url: images/suricata_dns.png
    media_type: image
  - caption: Suricata - DHCP
    image_url: images/suricata_dhcp.png
    media_type: image
  - caption: Suricata - ネットワークプロトコル
    image_url: images/suricata_network_protocols.png
    media_type: image
  - caption: Suricata - SMB (DCERPC, NTLMSSP, Kerberos)
    image_url: images/suricata_smb.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: suricata
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

[Suricata][1] は多くの民間企業や公共機関で利用され、主要ベンダーによってアセット保護のために組み込まれている、高性能なオープンソースのネットワーク解析および脅威検知ソフトウェアです。

このインテグレーションでは、Alert、Anomaly、HTTP、DNS、FTP、FTP_DATA、TLS、TFTP、SMB、SSH、Flow、RDP、DHCP、ARP の各ログタイプに対する付加情報と可視化を提供します。アラートや異常、ネットワーク接続、DNS、DHCP 活動の詳細な可視化や、インテグレーションに含まれるダッシュボードでのネットワークプロトコル分析を容易にします。

## セットアップ

### インストール

Suricata インテグレーションをインストールするには、以下の Agent インストールコマンドを実行し、続いて下記の手順に従ってください。詳細については、[Integration Management][2] のドキュメントを参照してください。

**注**: Agent のバージョンが 7.57.0 以上の場合、この手順は不要です。

Linux の場合、以下を実行してください。
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-suricata==1.0.0
  ```

### 構成

#### ログ収集

1. Datadog Agent では、ログ収集はデフォルトで無効になっています。`datadog.yaml` ファイルで有効にしてください。

   ```yaml
   logs_enabled: true
   ```

2. Suricata のログを収集するには、`suricata.d/conf.yaml` ファイルに以下の構成ブロックを追加します。

   利用可能な構成オプションについては、[sample suricata.d/conf.yaml][3] を参照してください。

   ```yaml
   logs:
     - type: file
       path: /var/log/suricata/eve.json
       service: suricata
       source: suricata
   ```
   **注**: Suricata アプリケーションの `suricata.yaml` で `eve-log` の出力を有効にし、以下のポイントに対応していることを確認してください。
   1. `suricata.yaml` ファイルの `eve-log` 設定では、`filetype` パラメータを `regular` のままにしておいてください。
   2. Suricata の出力ファイルのデフォルトパスは `/var/log/suricata`、デフォルトのファイル名は `eve.json` です。これらを変更している場合は、`conf.yaml` ファイル内の `path` パラメータを修正してください。

3. [Agent を再起動します][4]。

### 検証

[Agent のステータスサブコマンドを実行][5]し、Checks セクション内に `suricata` があることを確認してください。

## 収集データ

### Logs

Suricata インテグレーションでは、以下のログタイプが収集されます。

| 形式     | イベントタイプ    |
| ---------  | -------------- |
| JSON | alert, anomaly, http, dns, ftp, ftp_data, tls. tftp, smb, ssh, flow, rdp, dhcp, arp|

### メトリクス

Suricata インテグレーションにはメトリクスは含まれていません。

### イベント

Suricata インテグレーションにはイベントは含まれていません。

### サービスチェック

Suricata インテグレーションにはサービスチェックは含まれていません。

## トラブルシューティング

ログファイルを監視している際に **Permission denied** エラーが表示される場合は、`dd-agent` ユーザーに対してファイルの読み取り権限を付与してください。

  ```shell
  sudo chown -R dd-agent:dd-agent /var/log/suricata/eve.json
  ```

追加のサポートが必要な場合は、[Datadog サポート][6]にお問い合わせください。

[1]: https://suricata.io/
[2]: https://docs.datadoghq.com/ja/agent/guide/integration-management/?tab=linux#install
[3]: https://github.com/DataDog/integrations-core/blob/master/suricata/datadog_checks/suricata/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/help/