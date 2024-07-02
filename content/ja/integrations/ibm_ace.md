---
"app_id": "ibm-ace"
"app_uuid": "81e0df5f-8778-4558-88c3-884dcab5ce89"
"assets":
  "dashboards":
    "IBM ACE Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": ibm_ace.messages.current
      "metadata_path": metadata.csv
      "prefix": ibm_ace.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10262"
    "source_type_name": IBM ACE
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/ibm_ace/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "ibm_ace"
"integration_id": "ibm-ace"
"integration_title": "IBM ACE"
"integration_version": "2.2.2"
"is_public": true
"manifest_version": "2.0.0"
"name": "ibm_ace"
"public_title": "IBM ACE"
"short_description": "Monitor IBM ACE resource statistics and message flows."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitor IBM ACE resource statistics and message flows.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": IBM ACE
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [IBM ACE][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### IBM MQ

IBM ACE からメトリクスメッセージを消費するためには、[IBM MQ][3] サーバーが必要です。

<div class="alert alert-warning">
For Linux, make sure to set the LD_LIBRARY_PATH environment variable as described in the <a href="https://docs.datadoghq.com/integrations/ibm_mq/">IBM MQ setup</a> before continuing.
</div>

### IBM ACE

1. バージョン 12.0.2.0 以上がインストールされていることを確認します。
2. 以下のような `<MQ_POLICY_NAME>.policyxml` という形式の [MQEndpoint ポリシー][4]ファイルを適用します。
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <policies>
        <policy policyType="MQEndpoint" policyName="<MQ_POLICY_NAME>" policyTemplate="MQEndpoint">
            <connection>CLIENT</connection>
            <destinationQueueManagerName>...</destinationQueueManagerName>
            <queueManagerHostname>...</queueManagerHostname>
            <listenerPortNumber>1414</listenerPortNumber>
            <channelName>...</channelName>
            <securityIdentity><MQ_SECURITY_IDENTITY></securityIdentity>
        </policy>
    </policies>
    ```
3. `mqsisetdbparms -n mq::<MQ_SECURITY_IDENTITY> -u <user> -p <password>` を実行して、資格情報を[設定][5]します。
4. `server.conf.yaml` ファイルを以下の構成で更新します。
    ```yaml
    remoteDefaultQueueManager: '{DefaultPolicies}:<MQ_POLICY_NAME>'
    Events:
      OperationalEvents:
        MQ:
          enabled: true
      BusinessEvents:
        MQ:
          enabled: true
          outputFormat: json
    Statistics:
      Resource:
        reportingOn: true
      Snapshot:
        publicationOn: active
        outputFormat: json
        accountingOrigin: basic
        nodeDataLevel: advanced
        threadDataLevel: basic
    Monitoring:
      MessageFlow:
        publicationOn: active
        eventFormat: MonitoringEventV2
    AdminLog:
      enabled: true
      fileLog: true
      consoleLog: true
      consoleLogFormat: ibmjson
    ```
5. IBM ACE を再起動します。

### インストール

IBM ACE チェックは [Datadog Agent][6] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### 構成

1. ibm_ace のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `ibm_ace.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル ibm_ace.d/conf.yaml][7] を参照してください。

2. [Agent を再起動します][8]。

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `ibm_ace` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "ibm_ace" >}}


### イベント

IBM ACE インテグレーションには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "ibm_ace" >}}


### ログ収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
    logs_enabled: true
    ```

2. To start collecting your IBM ACE logs, add this configuration block to your `ibm_ace.d/conf.yaml` file:

    ```yaml
    logs:
      - type: file
        path: /home/aceuser/ace-server/log/integration_server.txt
        source: ibm_ace
    ```

    Change the `path` parameter value based on your environment. See the [sample `ibm_ace.d/conf.yaml` file][7] for all available configuration options.

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。


[1]: https://www.ibm.com/docs/en/app-connect/12.0?topic=overview-app-connect-enterprise-introduction
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://www.ibm.com/products/mq
[4]: https://www.ibm.com/docs/en/app-connect/12.0?topic=properties-mqendpoint-policy
[5]: https://www.ibm.com/docs/en/app-connect/12.0?topic=mq-connecting-secured-queue-manager
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://github.com/DataDog/integrations-core/blob/master/ibm_ace/datadog_checks/ibm_ace/data/conf.yaml.example
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/ibm_ace/metadata.csv
[11]: https://github.com/DataDog/integrations-core/blob/master/ibm_ace/assets/service_checks.json
[12]: https://docs.datadoghq.com/help/

