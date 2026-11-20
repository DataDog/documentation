---
app_id: cisco-secure-web-appliance
app_uuid: 0973c912-7ad3-4cf3-ad50-d43660e031dd
assets:
  dashboards:
    'Cisco Secure Web Appliance: Access Logs': assets/dashboards/cisco_secure_web_appliance_access_logs.json
    'Cisco Secure Web Appliance: L4TM Logs': assets/dashboards/cisco_secure_web_appliance_l4tm_logs.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 27607355
    source_type_name: Cisco Secure Web Appliance
  logs:
    source: cisco-secure-web-appliance
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
- https://github.com/DataDog/integrations-core/blob/master/cisco_secure_web_appliance/README.md
display_on_public_website: true
draft: false
git_integration_title: cisco_secure_web_appliance
integration_id: cisco-secure-web-appliance
integration_title: Cisco Secure Web Appliance
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: cisco_secure_web_appliance
public_title: Cisco Secure Web Appliance
short_description: Web プロキシのフィルタリングとスキャンの活動、および Layer-4 Traffic Monitor の活動に関するインサイトを得る
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
  description: Web プロキシのフィルタリングとスキャンの活動、および Layer-4 Traffic Monitor の活動に関するインサイトを得る
  media:
  - caption: Cisco Secure Web Appliance - Access Logs
    image_url: images/cisco_secure_web_appliance_access_logs.png
    media_type: image
  - caption: Cisco Secure Web Appliance - L4TM Logs
    image_url: images/cisco_secure_web_appliance_l4tm_logs.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco Secure Web Appliance
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

[Cisco Secure Web Appliance][1] は、リスクの高いサイトを自動的にブロックし、ユーザーにアクセスを許可する前に未知のサイトをテストすることで、組織を保護します。インターネット トラフィックを中継・監視し、マルウェア、機密データの漏えい、生産性の低下、その他のインターネット ベースの脅威から内部ネットワークを保護するためにポリシーを適用します。


このインテグレーションは次のログ タイプを取り込みます:
- アクセス ログ: Web プロキシのフィルタリングとスキャンのすべての活動を記録します。
- L4TM ログ: Layer 4 Traffic Monitor のすべての活動を記録します。

標準搭載 (OOTB) のダッシュボードにより、Web プロキシのフィルタリングとスキャンの活動、および Layer-4 Traffic Monitor の活動に関する詳細なインサイトを可視化できます。さらに、標準搭載 (OOTB) の検知ルールも利用でき、潜在的なセキュリティ脅威を効果的に監視・対応するのに役立ちます。

**免責事項**: このインテグレーションの使用により、個人情報を含むデータが収集される場合があります。これらのデータの取り扱いは Datadog との契約に従います。Cisco は、インテグレーションの使用を通じて送信されるエンド ユーザー情報 (個人データを含む) のプライバシー、セキュリティ、完全性について責任を負いません。

## セットアップ

### インストール

Cisco Secure Web Appliance インテグレーションをインストールするには、以下の Agent インストール コマンドを実行し、その後の手順に従ってください。詳細については、[Integration Management][2] ドキュメントを参照してください。

**注**: Agent バージョン >= 7.58.0 ではこの手順は不要です。

Linux コマンド:
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-cisco_secure_web_appliance==1.0.0
  ```

### 構成
選択した取得方法に応じて、Access Logs はポート監視 (取得方法が Syslog Push の場合) またはファイル監視 (取得方法が SCP on Remote Server の場合) のいずれかで収集できます。

L4TM Logs は、取得方法として SCP on Remote Server を使用するファイル監視でのみ収集できます。
#### ログ収集
**Tail File (File Monitoring)**

1. ログの収集は Datadog Agent ではデフォルトで無効です。datadog.yaml で有効化してください:

    ```yaml
    logs_enabled: true
    ```

2. Cisco Secure Web Appliance の L4TM Logs を収集開始するには、次の構成ブロックを cisco_secure_web_appliance.d/conf.yaml に追加してください。

    ```yaml
      logs:
      - type: file
        path: <Path to Directory Where Logs would Get Stored>
        service: l4tm_logs
        source: cisco-secure-web-appliance
    ```

3. Access Logs の取得方法として SCP on Remote Server を選択している場合は、上記の構成に Access Logs 用の構成ブロックを追加して、L4TM Logs と併せて Cisco Secure Web Appliance の Access Logs も収集を開始してください。cisco_secure_web_appliance.d/conf.yaml では、構成は次のようになります。

    ```yaml
      logs:
      - type: file
        path: <Path to Directory Where L4TM Logs would Get Stored>
        service: l4tm_logs
        source: cisco-secure-web-appliance
      - type: file
        path: <Path to Directory Where Access Logs would Get Stored>
        service: access_logs
        source: cisco-secure-web-appliance
    ```
    **注**: `path` の値が、それぞれ `Configure SCP on Remote Server for L4TM Logs` セクションおよび `Configure SCP on Remote Server for Access Logs` セクションで設定した Directory と一致していることを確認してください。

4. [Agent を再起動します][3]。

**Syslog**

1. ログの収集は Datadog Agent ではデフォルトで無効です。datadog.yaml で有効化してください:

    ```yaml
    logs_enabled: true
    ```
2. Access Logs の取得方法として Syslog Push を選択している場合は、構成ファイルに Access Logs 用の構成ブロックを追加し、L4TM Logs と併せて Cisco Secure Web Appliance の Access Logs の収集を開始してください。cisco_secure_web_appliance.d/conf.yaml では、構成は次のようになります。

    Cisco Secure Web Appliance の Access Logs の収集には UDP メソッドを使用します。
    利用可能な構成オプションについては、サンプル [cisco_secure_web_appliance.d/conf.yaml][4] を参照してください。

    ```yaml
      logs:
      - type: file
        path: <Path to Directory Where L4TM Logs would Get Stored>
        service: l4tm_logs
        source: cisco-secure-web-appliance
      logs:
      - type: udp
        port: <PORT>
        service: access_logs
        source: cisco-secure-web-appliance
    ```
    **注**: これらのパラメータはパイプラインの動作に不可欠なため、service と source の値は変更しないでください。

3. [Agent を再起動します][3]。

### Cisco Secure Web Appliance ポータルでの構成

#### タイム ゾーンを GMT に設定する手順
Datadog はすべてのログがデフォルトで GMT タイム ゾーンであることを想定しています。Cisco Secure Web Appliance ポータルで設定されているタイム ゾーンが GMT であることを確認してください。変更手順は次のとおりです:
1. **System Administration** に移動し、**Time Zone** を選択します。
2. **Edit Settings** をクリックします。
3. 地域として **GMT Offset** を選択します。
4. 国として **GMT** を選択します。
5. タイム ゾーンとして **GMT (GMT)** を選択します。
6. 変更を **Submit** し、**Commit Changes** します。

#### Log Subscriptions の構成

#### Access Logs 用に Syslog Push を構成:

**前提条件:**
- ログをプッシュする datadog-agent サーバーの hostname。

**構成:**

1. Cisco Secure Web Appliance UI にログインします。
2. **System Administration** > **Log Subscriptions** に移動します。
3. Access Logs のサブスクリプションを追加するために、**Add Log Subscription** をクリックします。
4. **Log Type** として **Access Logs** を選択します。
5. **Log Name** を入力します。
6. **Log Style** には **Squid** オプションを選択します。
    **注**: Access Logs のデフォルト (squid) ログ スタイルがサポートされています。
7. **Retrieval Method** として **Syslog Push** オプションを選択します。
8. 次の詳細を入力します。

    Hostname: \<Datadog-Agent Host Server>

    Port: \<Default Provided>

    Protocol: UDP

    Maximum message size: \<Valid values for UDP are 1024 to 9216>

    Facility: \<Default Selected>
9. **Submit** をクリックします。
10. **Log Subscriptions** ページ右上の **Commit Changes** をクリックします。
    **注:** これらの変更はコミットされるまで有効になりません。

#### L4TM Logs 用に SCP on Remote Server を構成

**前提条件:**
- Datadog Agent がインストールされている VM/マシンの hostname と username (管理者アカウントの username である必要はありません) が必要です。

**構成:**
1. Cisco Secure Web Appliance UI で **System Administration** > **Log Subscriptions** に移動します。
2. Traffic Monitor Logs のログ サブスクリプションを追加するには、**Add Log Subscription** をクリックします。
3. **Log Type** として **Traffic Monitor Logs** を選択します。
4. 適切な **Log Name** を入力します。
5. **FileName** には、新しい名前を指定するか、デフォルトの名前のままにします。
6. **Retrieval Method** として **SCP on Remote Server** を選択します。
7. 次の情報を入力します。

    SCP Host: \<SCP Host IP Address>

    Directory: \<Path to Directory Where Logs would Get Stored>
    **注:** Directory に他のログ ファイルが存在しないことを確認してください。

    SCP Port: \<Default Port>

    Username: \<SCP Host Username>
8. **Submit** をクリックします。送信後、SSH キーが生成されます。SSH キーは一度しか表示されないため、コピーして保存してください。
9. リモート ホストの `authorized_keys` ファイルに SSH キーを配置し、ログ ファイルをアップロードできるようにします。
10. **Log Subscriptions** ページ右上の **Commit Changes** をクリックします。

    **注:** これらの変更はコミットされるまで有効になりません。

#### Access Logs 用に SCP on Remote Server を構成します。

**前提条件:**
- Datadog Agent がインストールされている VM/マシンの hostname と username (管理者アカウントの username である必要はありません) が必要です。

**構成:**
1. Cisco Secure Web Appliance UI で **System Administration** > **Log Subscriptions** に移動します。
2. Access Logs の新しいログ サブスクリプションを追加するには **Add Log Subscription** をクリックするか、既存の Access Logs Subscription を編集します。
3. 新規にサブスクリプションを追加する場合は、このトピック内の「Configure Syslog Push for Access Logs」セクションで言及されている手順 4〜6 に従ってください。
4. 既存の Access Logs Subscription を編集する場合は、**Retrieval Method** として **SCP on the Remote Server** を選択します。
5. 次の情報を入力します:

    SCP Host: \<SCP Hostname>

    SCP Port: \<Default Provided>

    Directory: \<Path to store the Log Files>
    **注:** Directory に他のログ ファイルが存在しないことを確認してください。

    Username: \<SCP Server Username>
6. **Submit** をクリックします。**Submit** をクリックすると SSH キーが生成されます。SSH キーは一度しか表示されないため、コピーして保存してください。
7. リモート ホストの `authorized_keys` ファイルに SSH キーを配置し、ログ ファイルをアップロードできるようにします。
8. **Log Subscriptions** ページ右上の **Commit Changes** をクリックします。
    **注:** これらの変更はコミットされるまで有効になりません。


構成の詳細については、[Cisco Secure Web Appliance 公式ドキュメント][5] を参照してください。

### 検証

[Agent の status サブコマンドを実行][6] し、Checks セクションで `cisco_secure_web_appliance` を探してください。

## 収集されるデータ

### ログ

| フォーマット     | イベント タイプ    |
| ---------  | -------------- |
| syslog | access_logs, l4tm_logs |

### メトリクス

Cisco Secure Web Appliance にはメトリクスは含まれません。

### イベント

Cisco Secure Web Appliance インテグレーションにはイベントは含まれません。

### サービス チェック

Cisco Secure Web Appliance インテグレーションにはサービス チェックは含まれません。

## トラブル シューティング

**ポート バインド時の Permission denied:**

Agent ログでポート バインド時に **Permission denied** エラーが表示される場合は、次の手順を参照してください。

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

    **注:** Agent をアップグレードするたびに、この `setcap` コマンドを再実行してください。
3. [Agent を再起動します][3]。


**ファイル監視時の Permission denied:**

ログ ファイル監視中に **Permission denied** エラーが表示される場合は、`dd-agent` ユーザーに読み取り権限を付与します。
  ```shell
    sudo chmod g+s Path/to/Directory/Where/Logs/would/Get/Stored/
  ```
  ```shell
    sudo chgrp dd-agent Path/to/Directory/Where/Logs/would/Get/Stored/
  ```


**データが収集されない:**

ファイア ウォールが有効な場合は、設定したポートからのトラフィックがバイパスされていることを確認してください。

**ポートが使用中:**

"**Port \<PORT-NO> Already in Use** エラーが表示される場合は、次の手順を参照してください。以下の例は PORT-NO = 514 の場合です:
Syslog を使用しているシステムで、Agent がポート 514 で access_logs ログをリッスンしていると、Agent ログに次のエラーが表示されることがあります: `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`
このエラーは、デフォルトで Syslog がポート 514 をリッスンしているために発生します。次のいずれか 1 つの手順で解消してください:"
    - Syslog を無効化する
    - Agent を別の空いているポートでリッスンするように構成する


さらなるサポートが必要な場合は、[Datadog サポート][7] までお問い合わせください。

[1]: https://www.cisco.com/site/in/en/products/security/secure-web-appliance/index.html
[2]: https://docs.datadoghq.com/ja/agent/guide/integration-management/?tab=linux#install
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/integrations-core/blob/master/cisco_secure_web_appliance/datadog_checks/cisco_secure_web_appliance/data/conf.yaml.example
[5]: https://www.cisco.com/c/en/us/td/docs/security/wsa/wsa-14-5/user-guide/wsa-userguide-14-5/b_WSA_UserGuide_11_7_chapter_010101.html#task_1686002
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ja/help/