---
app_id: ossec-security
app_uuid: 595fcf0f-a306-43bf-a282-a729764961fa
assets:
  dashboards:
    OSSEC - Audit/Internal: assets/dashboards/ossec_audit_internal.json
    OSSEC - FTPD: assets/dashboards/ossec_ftpd.json
    OSSEC - Firewall: assets/dashboards/ossec_firewall.json
    OSSEC - Overview: assets/dashboards/ossec_overview.json
    OSSEC - PAM: assets/dashboards/ossec_pam.json
    OSSEC - SSHD: assets/dashboards/ossec_sshd.json
    OSSEC - Syslog: assets/dashboards/ossec_syslog.json
    OSSEC - Web: assets/dashboards/ossec_web.json
    OSSEC - Windows: assets/dashboards/ossec_windows.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 19889856
    source_type_name: ossec-security
  logs:
    source: ossec-security
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- alerting
- log collection
- security
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ossec_security/README.md
display_on_public_website: true
draft: false
git_integration_title: ossec-security
integration_id: ossec-security
integration_title: ossec-security
integration_version: 2.0.0
is_public: true
manifest_version: 2.0.0
name: ossec_security
public_title: ossec-security
short_description: OSSEC アラートを可視化して洞察を得られます。
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
  description: OSSEC アラートを可視化して洞察を得られます。
  media:
  - caption: OSSEC - 内部監査
    image_url: images/ossec_audit_internal.png
    media_type: image
  - caption: OSSEC - ファイアウォール
    image_url: images/ossec_firewall.png
    media_type: image
  - caption: OSSEC - 概要
    image_url: images/ossec_overview.png
    media_type: image
  - caption: OSSEC - PAM
    image_url: images/ossec_pam.png
    media_type: image
  - caption: OSSEC - SSHD
    image_url: images/ossec_sshd.png
    media_type: image
  - caption: OSSEC - Syslog
    image_url: images/ossec_syslog.png
    media_type: image
  - caption: OSSEC - Web
    image_url: images/ossec_web.png
    media_type: image
  - caption: OSSEC - Windows
    image_url: images/ossec_windows.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: ossec-security
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

[OSSEC][1] はオープンソースのホスト型侵入検知システムです。ログ分析、整合性チェック、Windows レジストリ監視、ルートキット検知、リアルタイムアラートおよびアクティブレスポンスを実行します。これにより、さまざまな IT インフラストラクチャー全体のセキュリティイベントを監視および管理できます。

このインテグレーションは、以下の種類のログを取り込みます。
- FTPD
- ファイアウォール
- システム
- Syslog
- SSHD
- PAM
- Windows
- Web アクセス

これらのログを、すぐに利用できるダッシュボードで詳細に可視化できます。

## セットアップ

### インストール

OSSEC Security インテグレーションをインストールするには、以下の Agent インストールコマンドとその後の手順を実行します。詳細については、[Integration Management][2] のドキュメントを参照してください。

**注**: Agent バージョンが 7.57.0 以上の場合、この手順は不要です。

Linux コマンド
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-ossec_security==1.0.0
  ```

### 設定

#### ログの収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。`datadog.yaml` で有効にします。

    ```yaml
    logs_enabled: true
    ```
2. `ossec_security.d/conf.yaml` ファイルに以下の設定ブロックを追加して、ログ収集を開始します。

    OSSEC アラートデータの収集には UDP を使用してください。
    利用可能な設定オプションについては、[サンプルの ossec_security.d/conf.yaml][3] を参照してください。

    ```yaml
      logs:
      - type: udp
        port: <PORT>
        source: ossec-security
        service: ossec-security
    ```
    **注**: パイプラインの動作に不可欠なため、service と sourceの値は変更しないことを推奨します。

3. [Agent を再起動します][4]。

#### OSSEC で syslog メッセージ転送を設定する 
  1. `/var/ossec/etc/ossec.conf` に以下の設定を追加します。

      この例では、すべてのアラートがポート 8080 の 1.1.1.1 に JSON 形式で送信されます。
      ```xml
        <syslog_output>
          <server>1.1.1.1</server>
          <port>8080</port>
          <format>json</format>
        </syslog_output>
      ```

      * `server` タグには Datadog Agent が稼働しているホストの IP アドレスを指定してください。

      * `port` タグには Datadog Agent が待ち受けているポートを指定してください。

      注: OSSEC Security パイプラインは JSON 形式のログのみ解析するため、必ず JSON 形式を使用してください。 

  2. client-syslog プロセスを有効にします。
      ```shell
      /var/ossec/bin/ossec-control enable client-syslog
      ```

  3. OSSEC サービスを再起動します。
      ```shell
      /var/ossec/bin/ossec-control restart
      ```

#### ファイアウォール ログ収集を有効化します (任意)。 
OSSEC サーバーはデフォルトでファイアウォールのアラートログを転送しません。OSSEC サーバー経由でファイアウォールアラートログを転送するには、以下の手順を実行します。

  1. `/var/ossec/rules/firewall_rules.xml` にある `firewall_rules.xml` ファイルを探します。

  2. `firewall_rules.xml` を編集し、ファイルから以下の行をすべて削除します。
  ```xml
  <options>no_log</options>
  ``` 

  3. OSSEC サーバーを再起動します。
  ```shell
  /var/ossec/bin/ossec-control restart
  ```

#### OSSEC Security の Datadog ログパイプラインで UTC 以外のタイムゾーンを指定する方法

Datadog はデフォルトで、すべてのログが UTC タイムゾーンであるとみなします。OSSEC のログが UTC 以外の場合は、OSSEC Security Datadog パイプラインで適切なタイムゾーンを指定してください。

OSSEC Security パイプラインでタイムゾーンを変更する方法:

  1. Datadog アプリの [**Pipelines** ページ][5]に移動します。

  2. **Filter Pipelines** の検索ボックスに「OSSEC Security」と入力します。

  3. OSSEC Security パイプラインにカーソルを合わせ、**clone** ボタンをクリックします。これにより、OSSEC Security パイプラインの編集可能なクローンが作成されます。

  4. 次の手順で Grok Parser を編集します。
      - クローンされたパイプライン内で「Grok Parser: Parsing OSSEC alerts」という名前のプロセッサを探し、パイプラインにカーソルを合わせて `Edit` ボタンをクリックします。
      - **Define parsing rules** のセクションで、
        - 文字列 `UTC` を、OSSEC サーバーのタイムゾーンに対応する [TZ 識別子][6]に変更します。たとえばタイムゾーンが IST の場合は、`Asia/Calcutta` に変更します。
      - **update** ボタンをクリックします。



### 検証

[Agent のステータスサブコマンド][7] を実行し、Checks セクションに `ossec_security` があるか確認してください。

## 収集データ

### ログ

| 形式     | イベントタイプ    |
| ---------  | -------------- |
| JSON | syslog, sshd, pam, ossec, windows, firewall, ftpd, web_access |

### メトリクス

OSSEC Security インテグレーションにはメトリクスは含まれていません。

### イベント

OSSEC Security インテグレーションにはイベントは含まれていません。

### サービスチェック

OSSEC Security インテグレーションにはサービスチェックは含まれていません。

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

**データが収集されない場合:**

ファイアウォールが有効な場合、設定したポートへの通信が許可されていることを確認してください。

**すでに使用されているポートの場合:**

- **Port <PORT_NUMBER> Already in Use** エラーが発生したら、以下の手順を参照してください。次の例はポート 514 を想定しています。

- Syslog を使用しているシステムで、Agent がポート 514 で OSSEC ログを待ち受けている場合、Agent のログに `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use` というエラーが表示されることがあります。これは Syslog がデフォルトでポート 514 を使用しているためです。これを解決するには、以下のいずれかの手順を実行してください。

    - Syslog を無効にする。
    - Agent を他の利用可能なポートで待ち受けるよう設定する。


さらなるサポートが必要な場合は、[Datadog サポート][8]にお問い合わせください。

[1]: https://www.ossec.net/
[2]: https://docs.datadoghq.com/ja/agent/guide/integration-management/?tab=linux#install
[3]: https://github.com/DataDog/integrations-core/blob/master/ossec_security/datadog_checks/ossec_security/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://app.datadoghq.com/logs/pipelines
[6]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/ja/help/