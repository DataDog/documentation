---
app_id: checkpoint-quantum-firewall
app_uuid: 4b6b8ef9-e079-4ee4-877e-8f4aafbf8a1d
assets:
  dashboards:
    'Checkpoint Quantum Firewall: Anti Bot': assets/dashboards/checkpoint_quantum_firewall_anti_bot.json
    'Checkpoint Quantum Firewall: Anti Exploit': assets/dashboards/checkpoint_quantum_firewall_anti_exploit.json
    'Checkpoint Quantum Firewall: Anti Malware': assets/dashboards/checkpoint_quantum_firewall_anti_malware.json
    'Checkpoint Quantum Firewall: Anti Ransomware': assets/dashboards/checkpoint_quantum_firewall_anti_ransomware.json
    'Checkpoint Quantum Firewall: Anti Spam & Email Security': assets/dashboards/checkpoint_quantum_firewall_anti_spam_and_email_security.json
    'Checkpoint Quantum Firewall: Anti Virus': assets/dashboards/checkpoint_quantum_firewall_anti_virus.json
    'Checkpoint Quantum Firewall: Application Control': assets/dashboards/checkpoint_quantum_firewall_application_control.json
    'Checkpoint Quantum Firewall: Audit': assets/dashboards/checkpoint_quantum_firewall_audit.json
    'Checkpoint Quantum Firewall: DLP': assets/dashboards/checkpoint_quantum_firewall_dlp.json
    'Checkpoint Quantum Firewall: Firewall': assets/dashboards/checkpoint_quantum_firewall_firewall.json
    'Checkpoint Quantum Firewall: HTTPS Inspection': assets/dashboards/checkpoint_quantum_firewall_https_inspection.json
    'Checkpoint Quantum Firewall: IPS': assets/dashboards/checkpoint_quantum_firewall_ips.json
    'Checkpoint Quantum Firewall: Identity Awareness': assets/dashboards/checkpoint_quantum_firewall_identity_awareness.json
    'Checkpoint Quantum Firewall: Threat Emulation': assets/dashboards/checkpoint_quantum_firewall_threat_emulation.json
    'Checkpoint Quantum Firewall: URL Filtering': assets/dashboards/checkpoint_quantum_firewall_url_filtering.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 6852689
    source_type_name: checkpoint-quantum-firewall
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- security
- network
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/checkpoint_quantum_firewall/README.md
display_on_public_website: true
draft: false
git_integration_title: checkpoint_quantum_firewall
integration_id: checkpoint-quantum-firewall
integration_title: Checkpoint Quantum Firewall
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: checkpoint_quantum_firewall
public_title: Checkpoint Quantum Firewall
short_description: Checkpoint Quantum Firewall のログを Datadog で可視化
supported_os:
- windows
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::Security
  - Category::Network
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Checkpoint Quantum Firewall のログを Datadog で可視化
  media:
  - caption: Checkpoint Quantum Firewall - Audit
    image_url: images/checkpoint_quantum_firewall_audit.png
    media_type: image
  - caption: Checkpoint Quantum Firewall - Application Control
    image_url: images/checkpoint_quantum_firewall_application_control.png
    media_type: image
  - caption: Checkpoint Quantum Firewall - URL Filtering
    image_url: images/checkpoint_quantum_firewall_url_filtering.png
    media_type: image
  - caption: Checkpoint Quantum Firewall - Identity Awareness
    image_url: images/checkpoint_quantum_firewall_identity_awareness.png
    media_type: image
  - caption: Checkpoint Quantum Firewall - IPS
    image_url: images/checkpoint_quantum_firewall_ips.png
    media_type: image
  - caption: Checkpoint Quantum Firewall - Firewall
    image_url: images/checkpoint_quantum_firewall_firewall.png
    media_type: image
  - caption: Checkpoint Quantum Firewall - Threat Emulation
    image_url: images/checkpoint_quantum_firewall_threat_emulation.png
    media_type: image
  - caption: Checkpoint Quantum Firewall - Anti Bot
    image_url: images/checkpoint_quantum_firewall_anti_bot.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Checkpoint Quantum Firewall
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

[Check Point Next Generation Firewall][1] は、アプリケーション コントロール と IPS 保護を備えたセキュリティ ゲートウェイであり、セキュリティ イベントを統合管理できます。追加機能として、Identity Awareness、URL Filtering、Anti‑Bot、Anti‑Virus、Anti‑Spam が含まれています。

このインテグレーションは、URL Filtering ログ、Anti‑Bot ログ、Application Control、Firewall、Identity Awareness、IPS、Threat Emulation などのイベント タイプをログ パイプラインで取り込み、ログを拡充し Datadog 標準属性へ正規化します。これにより、許可/ブロックされた URL、ボットの詳細、アクセスされたアプリケーション データ、ファイアウォールが生成したイベント、コンピュータ アイデンティティとマシン IP アドレスの対応付けなどの詳細インサイトを提供するダッシュボードを利用できます。

## セットアップ

### インストール

Checkpoint Quantum Firewall インテグレーションをインストールするには、以下の手順に従ってください。

**注**: Agent バージョン >= 7.52.0 ではこの手順は不要です。

1. 1.0 リリース (`checkpoint_quantum_firewall==1.0.0`) を[インストール][2]します。

### 構成

#### ログ収集

**Checkpoint Quantum Firewall:**

1. Datadog Agent ではログ収集はデフォルトで無効になっています。`datadog.yaml` ファイルで有効化してください。

   ```yaml
   logs_enabled: true
   ```

2. Checkpoint Quantum Firewall ログを収集するには、以下の設定ブロックを `checkpoint_quantum_firewall.d/conf.yaml` に追加します。

   利用可能な設定オプションは[サンプル checkpoint_quantum_firewall.d/conf.yaml][3] を参照してください。

   ```yaml
   logs:
     - type: tcp/udp
       port: <PORT>
       service: checkpoint-quantum-firewall
       source: checkpoint-quantum-firewall
   ```

3. [Agent を再起動][4]します。

4. Checkpoint Quantum Firewall からの Syslog メッセージ転送を設定する手順:
   1. Management Server / Log Server のコマンドラインに接続します。
   2. Expert モードでログインし、管理者資格情報を入力します (入力後、Expert モードが有効)。
   3. エクスポートするログの送信先を新規設定するには、次のコマンドを入力します。
      ```yaml
      cp_log_export add name <Name of Log Exporter Configuration> target-server <HostName or IP address of Target Server> target-port <Port on Target Server> protocol {tcp | udp} format json
      ```
      - 上記コマンドでは次の Syslog サーバー詳細を指定してください:

        - name: syslog サーバー名。例: `datadog_syslog`
        - target-server: Checkpoint Quantum Firewall のログを送信する宛先
        - target-port: syslog サーバーが待ち受けるポート (通常 514)
        - protocol: ログ送信に使用するプロトコル名 (TCP/UDP)
        - format: フォーマットは 'json' を指定
   4. Syslog サーバー設定を保存して追加するには、次のコマンドを実行します。
      ```yaml
      cp_log_export restart name <Name of Log Exporter Configuration>
      ```
   5. Syslog の詳細設定は[公式 Checkpoint ドキュメント][5]を参照してください。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションに `checkpoint_quantum_firewall` が表示されることを確認してください。

## 収集データ

### ログ

Checkpoint Quantum Firewall インテグレーションは Firewall、URL Filtering、IPS、Identity Awareness、Application Control、Threat Emulation、Audit、Anti‑Ransomware、Anti‑Spam & Email Security、Anti‑Exploit、Anti‑Bot、Anti‑Virus、HTTPS Inspection、DLP、Anti‑Malware の各ログを収集します。

### メトリクス

Checkpoint Quantum Firewall インテグレーションにはメトリクスは含まれていません。

### イベント

Checkpoint Quantum Firewall インテグレーションにはイベントは含まれていません。

### サービス チェック

Checkpoint Quantum Firewall インテグレーションにはサービス チェックは含まれていません。

## トラブルシューティング

**Checkpoint Quantum Firewall:**

#### ポート バインド時の Permission denied

Agent ログに **Permission denied** エラーが表示された場合は、次の手順を参照してください。

1.  1024 未満のポート番号にバインドするには昇格権限が必要です。以下の手順で設定します。

    - `setcap` コマンドでポートへのアクセスを付与:

      ```
      sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
      ```

    - `getcap` コマンドで設定を確認:

      ```
      sudo getcap /opt/datadog-agent/bin/agent/agent
      ```

      期待される出力:

      ```
      /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
      ```

      **注**: Agent をアップグレードするたびにこの `setcap` コマンドを再実行してください。

2.  [Agent を再起動][4]します。

#### データが収集されない

ファイアウォールが有効な場合、設定したポートのトラフィックがバイパスされているか確認してください。

#### Port already in use

**Port <PORT-NO\> Already in Use** エラーが表示された場合の対処例 (PORT‑NO = 514):

Syslog を使用するシステムで、Agent がポート 514 で Checkpoint Quantum Firewall ログをリッスンしようとすると、Agent ログに `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use` というエラーが出ることがあります。

これは Syslog がデフォルトでポート 514 を使用しているためです。解決策として以下のいずれかを実施してください:

- Syslog を無効化する
- Agent を別の空いているポートでリッスンさせる

追加サポートが必要な場合は [Datadog サポート][7]までお問い合わせください。

[1]: https://www.checkpoint.com/quantum/next-generation-firewall/
[2]: https://docs.datadoghq.com/ja/agent/guide/integration-management/?tab=linux#install
[3]: https://github.com/DataDog/integrations-core/blob/master/checkpoint_quantum_firewall/datadog_checks/checkpoint_quantum_firewall/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://sc1.checkpoint.com/documents/R81.20/WebAdminGuides/EN/CP_R81.20_LoggingAndMonitoring_AdminGuide/Content/Topics-LMG/Log-Exporter-Configuration-in-CLI-Basic.htm?tocpath=Log%20Exporter%7CConfiguring%20Log%20Exporter%20in%20CLI%7C_____1
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ja/help/