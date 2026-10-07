---
app_id: delinea-privilege-manager
app_uuid: 9b65ff08-afbc-4ad2-aaf1-9e06d959e309
assets:
  dashboards:
    Delinea Privilege Manager - Application Control Events: assets/dashboards/delinea_privilege_manager_application_control_events.json
    Delinea Privilege Manager - Local Security Events: assets/dashboards/delinea_privilege_manager_local_security_events.json
    Delinea Privilege Manager - Overview: assets/dashboards/delinea_privilege_manager_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 33204336
    source_type_name: Delinea Privilege Manager
  logs:
    source: delinea-privilege-manager
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
- https://github.com/DataDog/integrations-core/blob/master/delinea_privilege_manager/README.md
display_on_public_website: true
draft: false
git_integration_title: delinea_privilege_manager
integration_id: delinea-privilege-manager
integration_title: Delinea Privilege Manager
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: delinea_privilege_manager
public_title: Delinea Privilege Manager
short_description: Delinea Privilege Manager のイベントに関するインサイトを取得します。
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
  description: Delinea Privilege Manager のイベントに関するインサイトを取得します。
  media:
  - caption: Delinea Privilege Manager - Overview
    image_url: images/delinea_privilege_manager_overview.png
    media_type: image
  - caption: Delinea Privilege Manager - Application Control Events
    image_url: images/delinea_privilege_manager_application_control_events.png
    media_type: image
  - caption: Delinea Privilege Manager - Local Security Events
    image_url: images/delinea_privilege_manager_local_security_events.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Delinea Privilege Manager
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

[Delinea Privilege Manager][1] は Windows および macOS 向けのエンドポイントの最小特権とアプリケーション コントロールのソリューションで、エンタープライズや急成長する組織をスケールしてサポートできます。Delinea Privilege Manager の主要コンポーネントは Local Security と Application Control の 2 つです。

このインテグレーションは、次のログ タイプをサポートします:
- **Application Action Events** : 実行されたアプリケーション、トリガーされたポリシー、日時、コンピューター、ユーザーに関する汎用情報を含みます。
- **Application Justification Events** : 正当化ワークフローが必要なアプリケーションをユーザーが実行した際に生成されます。
- **Bad Rated Application Action Events** : セキュリティ評価が低いアプリケーションがインストールまたは実行されたときに生成されます。
- **Password Disclosure Events** : パスワード開示に関するあらゆるアクティビティを含みます。
- **Newly Discovered File Events** : システム上で新たに検出されたファイルに関する情報を含みます。
- **Change History Events** : Delinea Privilege Manager で行われた変更に関する情報を含みます。

これらのログの詳細なインサイトは、すぐに使えるダッシュボードで確認できます。さらに、このインテグレーションには、監視とセキュリティを強化するための即時利用可能な Cloud SIEM 検知ルールも含まれます。

## セットアップ

### インストール

Delinea Privilege Manager インテグレーションをインストールするには、以下の Agent インストール コマンドを実行し、その後で以降の手順に従ってください。詳細は [Integration Management][2] ドキュメントを参照してください。

**注**: Agent バージョン >= 7.63.0 の場合、この手順は不要です。

Linux コマンド
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-delinea-privilege-manager==1.0.0
  ```

### 構成

#### ログ収集

1. 既定では、Datadog Agent でログ収集は無効です。有効化するには、`datadog.yaml` ファイルを編集します::

    ```yaml
      logs_enabled: true
    ```
2. ログを収集するには、`delinea_privilege_manager.d/conf.yaml` ファイルに次の構成ブロックを追加します。

    利用可能な構成オプションは、サンプルの [delinea_privilege_manager.d/conf.yaml][3] を参照してください。適切なプロトコル (TCP または UDP) は、Delinea Privilege Manager の syslog 転送設定に基づいて選択してください。

    - **TCP**: syslog 転送に TCP を使用する場合、`type` を `tcp` に設定します。
    - **UDP**: syslog 転送に UDP を使用する場合、`type` を `udp` に設定します。

    ```yaml
      logs:
      - type: <tcp/udp>
        port: <PORT>
        source: delinea-privilege-manager
        service: delinea-privilege-manager
    ```
    **注**:
      - `PORT`: ポートは「**Delinea Privilege Manager からの syslog メッセージ転送の設定**」セクションで指定した値と同じにしてください。
      - service と source の値はパイプラインの動作に不可欠なパラメーターのため、変更しないことを推奨します。

3. [Agent を再起動します][4]。

#### Delinea Privilege Manager からの syslog メッセージ転送の設定

  - Syslog サーバー構成の作成
    1. **Admin** > **Configuration** に移動し、**Foreign Systems** タブを選択します。
    2. **Syslog** をクリックして syslog 構成ページを開き、**Create** をクリックします。
    3. 構成名と syslog サーバー アドレス (TCP または UDP) を入力します。
        - TCP の場合、構成は次の形式にします: tcp://[host]:port
        - UDP の場合、構成は次の形式にします: udp://[host]:port

        **host**: datadog-agent が稼働している IP アドレス。

        **port**: syslog メッセージを送信するポート番号。
    4. **Create** をクリックします。入力内容を確認し、Admin Menu に戻ります。
  - Syslog サーバー タスクの設定:
    1. 新しい Syslog 接続を追加したら、ログを Syslog Server に送信するため、**Admin** > **Tasks** に移動します。
    2. **Server Tasks** > **Foreign Systems** のフォルダーを展開し、**SysLog** を選択して、**Create** をクリックします。
    3. **Template** ドロップダウンから **Send Application Action Events to Syslog** テンプレートを選択します。
    4. このタスクの **Name** ( **Application Action Events** に設定 ) と **Event Name** ( **Application Action Events** に設定 ) を追加し、**Event Severity** ( 0-最低、10-最高 ) を指定するか、既定のままにします。

    5. **SysLog System** ドロップダウンから、上で構成した SysLog サーバーの foreign system を選択します。
    6. 必要に応じて **Security Ratings Provider** に値を入力するか、そのままにします。
    7. **Create** をクリックします。

        **注**: **Data source** を変更しないこと、**Replace spaces** トグルが無効になっていることを確認してください。これらのパラメーターを変更すると、Delinea Privilege Manager インテグレーションの機能に直接影響します。

    8. 作成後、Schedule セクションまでスクロールし、**New Schedule** ボタンをクリックします。次の詳細を入力します:
        1. Schedule Details:
            -  **Schedule Name** を入力します。
        2. Schedule:
            1. **Schedule Type** にはドロップダウンから **Shared Schedule** を選択します。
            2. **Shared Schedule** ではドロップダウンから **Quarter-Hour** を選択します。
    9. ページ右上の **Save Changes** ボタンをクリックします。

この手順により、**Application Action Events** の Syslog 転送タスクが構成されます。以下の表に記載の他のイベント タイプについては、各イベントごとに新しいタスクを作成し、対応するテンプレートとイベント名を指定して、同様の手順に従ってください。

  **注**: ステップ 4 では、下表に記載のテンプレートに従って、このタスクの **Name** と **Event Name** を設定してください。**Event Name** は Delinea Privilege Manager Pipeline の動作に不可欠であり、指定どおりに正確に入力する必要があります。

| Template     | Event Name    | Name |
| ---------  | -------------- |--------------
| Send Application Action Events to Syslog | Application Action Events | Application Action Events |
| Send Application Justification Events to Syslog | Application Justification Events | Application Justification Events |
| Send Change History Events to Syslog | Not Applicable | Change History Events |
| Send Newly Discovered File Events to Syslog | Newly Discovered File Events | Newly Discovered File Events |
| Send Password Disclosure Events to Syslog | Password Disclosure Events | Password Disclosure Events |
| Send Bad Rated Application Action Events to Syslog | Bad Rated Application Action Events | Bad Rated Application Action Events |

### 検証

[Agent の status コマンドを実行][5] し、Checks セクションの `Delinea Privilege Manager` を確認します。

## 収集データ

### ログ

| フォーマット     | イベント タイプ    |
| ---------  | -------------- |
| CEF | Application Action Events, Bad Rated Application Action Events, Application Justification Events, Password Disclosure Events, Newly Discovered File Events, Change History Events |

### メトリクス

Delinea Privilege Manager インテグレーションにはメトリクスは含まれません。

### イベント

Delinea Privilege Manager インテグレーションにはイベントは含まれません。

### サービス チェック

Delinea Privilege Manager インテグレーションにはサービス チェックは含まれません。

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

    **注**: Agent をアップグレードするたびに `setcap` コマンドを実行する必要があります。

3. [Agent を再起動します][4]。


**データが収集されない:**

ファイアウォールが有効な場合は、設定したポートへのトラフィックをファイアウォール ルールで許可してください。

**ポートが使用中:**

**Port <PORT_NUMBER> Already in Use** エラーが表示される場合は、次の手順を参照してください。以下はポート 514 の例です:

- Syslog を使用するシステムで、Agent がポート 514 でイベントをリッスンしている場合、Agent ログに次のエラーが表示されることがあります: `Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`。これは既定で Syslog がポート 514 をリッスンしているために発生します。解決するには、次のいずれか **1** つの手順を実施します:
    - Syslog を無効化する。
    - Agent を別の利用可能なポートで待ち受けるように設定する。


さらに支援が必要な場合は、[Datadog サポート][6] にお問い合わせください。

[1]: https://delinea.com/products/privilege-manager
[2]: https://docs.datadoghq.com/ja/agent/guide/integration-management/?tab=linux#install
[3]: https://github.com/DataDog/integrations-core/blob/master/delinea_privilege_manager/datadog_checks/delinea_privilege_manager/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/help/