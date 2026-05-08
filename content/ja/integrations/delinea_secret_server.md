---
app_id: delinea-secret-server
app_uuid: 69a8e7df-7ed3-451c-948b-43303a5219e3
assets:
  dashboards:
    Delinea Secret Server - Overview: assets/dashboards/delinea_secret_server_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    source_type_id: 41132309
    source_type_name: Delinea Secret Server
  logs:
    source: delinea-secret-server
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- security
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/delinea_secret_server/README.md
display_on_public_website: true
draft: false
git_integration_title: delinea_secret_server
integration_id: delinea-secret-server
integration_title: Delinea Secret Server
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: delinea_secret_server
public_title: Delinea Secret Server
short_description: Delinea Secret Server のログを可視化します。
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
  description: Delinea Secret Server のログを可視化します。
  media:
  - caption: Delinea Secret Server - Overview 1
    image_url: images/delinea_secret_server_overview_1.png
    media_type: image
  - caption: Delinea Secret Server - Overview 2
    image_url: images/delinea_secret_server_overview_2.png
    media_type: image
  - caption: Delinea Secret Server - Overview 3
    image_url: images/delinea_secret_server_overview_3.png
    media_type: image
  - caption: Delinea Secret Server - Overview 4
    image_url: images/delinea_secret_server_overview_4.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Delinea Secret Server
---

<!-- SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

[Delinea Secret Server][1] は、組織が特権資格情報を安全に保存・管理し、アクセスを制御できるように設計された、エンタープライズ グレードのパスワード管理ソリューションです。機密データのセキュリティ強化、情報漏えいリスクの低減、パスワード管理プロセスの効率化を目的としています。

このインテグレーションは、次のログを取り込み、内容を補強します。

- **Secret Server Logs**: ユーザーが保存済みシークレット、フォルダー、グループ、ユーザーに対して (表示、追加、変更など) の操作を行ったイベントを表します。ユーザーの識別情報、操作の発生元、操作対象のアイテムなどの詳細が含まれます。

ログを収集すると、Delinea Secret Server はそれらを Datadog に送信して分析できる状態にします。組み込みのログ パイプラインにより、ログはパースおよび補強されるため、検索と分析をスムーズに行えます。このインテグレーションでは、すぐに使えるダッシュボードで Secret Server Logs のインサイトを提供し、監視とセキュリティを強化するための Cloud SIEM 検知ルールも同梱されています。

## セットアップ

### インストール

Delinea Secret Server インテグレーションをインストールするには、次の Agent インストール コマンドを実行し、その後の手順に従ってください。詳細は [インテグレーション管理][2] のドキュメントを参照してください。

**注**: Agent バージョンが 7.65.0 以上の場合、この手順は不要です。

Linux コマンド:

  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-delinea-secret-server==1.0.0
  ```

### 構成

#### ログ収集

1. ログ収集は Datadog Agent ではデフォルトで無効です。`datadog.yaml` ファイルで有効化してください。

    ```yaml
    logs_enabled: true
    ```

2. Delinea Secret Server のログ収集を開始するには、この設定ブロックを `delinea_secret_server.d/conf.yaml` ファイルに追加します。

   ```yaml
      logs:
       - type: tcp/udp
         port: <PORT>
         source: delinea-secret-server
         service: delinea-secret-server
      ```

      利用可能な設定オプションについては、[sample delinea_secret_server.d/conf.yaml][3] を参照してください。Delinea Secret Server 側の syslog 転送設定に合わせて、適切なプロトコル (TCP または UDP) を選択してください。

      **注**: service と source の値は変更しないでください。これらはパイプラインの動作に不可欠なパラメータです。

3. [Agent を再起動][4] します。

#### Delinea Secret Server から syslog メッセージ転送を設定

1. **Delinea Secret Server** プラットフォームにログインします。
2. **Settings** > **All Settings** に移動します。
3. **Configuration** > **General** > **Application** に移動します。
4. **Edit** をクリックします。
5. **Enable Syslog/CEF Log Output** にチェックを入れます。
6. 次の情報を入力します:

    - **Syslog/CEF Server**: Syslog/CEF Server のアドレスを入力します。
    - **Syslog/CEF Port**: Syslog/CEF Server のポートを入力します。
    - **Syslog/CEF Protocol**: TCP または UDP を選択します。
    - **Syslog/CEF Time Zone**: UTC Time を選択します。
    - **Syslog/CEF DateTime Format**: ISO 8601 を選択します。
    - **Syslog/CEF Site**: CEF/Syslogs を実行するサイトを選択します。

7. **Save** をクリックします。

### 検証

[Agent の status サブコマンドを実行][5] し、Checks セクション配下に `delinea_secret_server` が表示されることを確認します。

## 収集データ

### ログ

Delinea Secret Server インテグレーションは Secret Server Logs を収集します。

### メトリクス

Delinea Secret Server インテグレーションにはメトリクスは含まれません。

### イベント

Delinea Secret Server インテグレーションにはイベントは含まれません。

### サービス チェック

Delinea Secret Server インテグレーションにはサービス チェックは含まれません。

## トラブルシューティング

### ポート バインド時の Permission denied

Agent ログでポート バインド時に **Permission denied** エラーが表示される場合は、次の手順を参照してください。

   1. 1024 未満のポート番号にバインドするには、昇格した権限が必要です。`setcap` コマンドを使って、ポートへのアクセスを付与してください:

      - `setcap` コマンドを使って、ポートへのアクセスを付与します:

         ```shell
         sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
         ```

      - `getcap` コマンドを実行して、セットアップが正しいことを確認します:

         ```shell
         sudo getcap /opt/datadog-agent/bin/agent/agent
         ```

         期待される出力:

         ```shell
         /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
         ```

         **注**: Agent をアップグレードするたびに、この `setcap` コマンドを再実行してください。

   2. [Agent を再起動][4] します。

### データが収集されない

ファイアウォールが有効になっている場合、設定したポートへのトラフィックがバイパスされていることを確認してください。

### Port already in use

**Port <PORT-NO\> Already in Use** エラーが表示される場合は、次の手順を参照してください。以下の例では PORT-NO = 514 とします。

Syslog を使用しているシステムで、Agent がポート 514 で Delinea Secret Server のログをリッスンしている場合、Agent ログに `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use` というエラーが出ることがあります。

デフォルトでは、Syslog はポート 514 を使用します。このエラーを解消するには、次のいずれか **1 つ** を実行してください:

- Syslog を無効化します。
- Agent が別の使用可能なポートをリッスンするように設定します。

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://delinea.com/products/secret-server
[2]: https://docs.datadoghq.com/ja/agent/guide/integration-management/?tab=linux#install
[3]: https://github.com/DataDog/integrations-core/blob/master/delinea_secret_server/datadog_checks/delinea_secret_server/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/help/