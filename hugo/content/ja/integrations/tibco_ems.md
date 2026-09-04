---
app_id: tibco-ems
app_uuid: 32445b00-582f-4e56-9c4d-87944d5c347b
assets:
  dashboards:
    Tibco EMS Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: tibco_ems.server.uptime
      metadata_path: metadata.csv
      prefix: tibco_ems.
    process_signatures:
    - tibemsd
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 19354115
    source_type_name: tibco_ems
  monitors:
    Tibco EMS server uptime: assets/monitors/server_uptime.json
  saved_views:
    Tibco EMS Error Logs Overview: assets/saved_views/error_logs_overview.json
    Tibco EMS Logs Overview: assets/saved_views/logs_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- モニター
- ログの収集
- メッセージキュー
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/tibco_ems/README.md
display_on_public_website: true
draft: false
git_integration_title: tibco_ems
integration_id: tibco-ems
integration_title: Tibco EMS
integration_version: 2.1.0
is_public: true
manifest_version: 2.0.0
name: tibco_ems
public_title: Tibco EMS
short_description: キュー サイズ、コンシューマー 数、未 ACK のメッセージなどを追跡します。
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Offering::Integration
  - Category::Metrics
  - Category::Log Collection
  - Category::Message Queues
  configuration: README.md#Setup
  description: キュー サイズ、コンシューマー 数、未 ACK のメッセージなどを追跡します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Tibco EMS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [TIBCO Enterprise Message Service][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

TIBCO EMS チェックは [Datadog Agent][3] パッケージに含まれています。サーバー上での追加のインストールは不要です。

### 構成

1. Agent の構成ディレクトリのルートにある `conf.d/` フォルダー内の `tibco_ems.d/conf.yaml` ファイルを編集して、TIBCO EMS のパフォーマンス データの収集を開始します。利用可能な構成オプションはすべて、[サンプル tibco_ems.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

#### メトリクスの収集

##### Tibco EMS コマンド スクリプトを作成する

Tibco EMS インテグレーションは、Tibco EMS が提供する `tibemsadmin` CLI ツールを利用します。`$sys.admin` キューへの呼び出し回数を減らすために、Datadog は Tibco へのクエリをバッチ化するスクリプトを使用します。Tibco EMS のメトリクスを収集するには、スクリプトのパスと `tibemsadmin` バイナリの絶対パスをインテグレーションの構成に渡します。

*注*: `dd-agent` ユーザーには `tibemsadmin` バイナリの実行権限が必要です。
1. 次の内容で `show_commands` という名前のファイルを作成します:
```text
    show connections full
    show durables
    show queues
    show server
    show stat consumers
    show stat producers
    show topics
```


2. `tibco_ems.d/conf.yaml` ファイルに次の構成ブロックを追加して、[Tibco EMS メトリクス](#metrics) の収集を開始します:

```yaml
init_config:
instances:
    ## @param script_path - 文字列 - 任意
    ## メトリクスを収集するために実行されるスクリプトへのパス。スクリプトはサブ プロセスによって実行されるため、
    ## スクリプトへのパスを指定する必要があります。これはスクリプトへの絶対パスでなければなりません。
    #
    script_path: <SCRIPT_PATH>

    ## @param tibemsadmin - 文字列 - 任意
    ## tibemsadmin のコマンドまたはパス (例: /usr/bin/tibemsadmin または docker exec <container> tibemsadmin)
    ## は、インスタンスで上書きできます。
    ##
    ## これは `init_config` で定義された `tibemsadmin` を上書きします。
    #
    tibemsadmin: <TIBEMSADMIN>
```

3. Datadog への Tibco EMS メトリクスの送信を開始するには、[Agent を再起動][5] します。

#### ログ収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent では、ログの収集はデフォルトで無効になっています。`datadog.yaml` ファイルでログを有効にします:

   ```yaml
   logs_enabled: true
   ```

2. Tibco EMS のログ収集を開始するには、次の構成ブロックを `tibco_ems.d/conf.yaml` ファイルに追加します:

   ```yaml
   logs:
     - type: file
       path: <PATH_TO_LOG_FILE>
       service: <MY_SERVICE>
       source: tibco_ems
   ```

    `service` と `path` のパラメーター値を変更し、環境に合わせて設定してください。利用可能な構成オプションのすべてについては [サンプル tibco_ems.yaml][4] を参照してください。

3. [Agent を再起動します][5]。

### 検証

[Agent の status サブ コマンドを実行][6] し、Checks セクションの `tibco_ems` を確認します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "tibco_ems" >}}


### イベント

TIBCO EMS インテグレーションにはイベントは含まれていません。

### サービスチェック

TIBCO EMS インテグレーションにはサービス チェックは含まれていません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問い合わせください。


[1]: https://docs.tibco.com/products/tibco-enterprise-message-service
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/tibco_ems/datadog_checks/tibco_ems/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/tibco_ems/metadata.csv
[8]: https://docs.datadoghq.com/ja/help/