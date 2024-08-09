---
app_id: ibm-mq
app_uuid: d29a1df9-6038-41f5-b017-82bf45f58767
assets:
  dashboards:
    IBM MQ: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ibm_mq.queue.usage
      metadata_path: metadata.csv
      prefix: ibm_mq.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10049
    source_type_name: IBM MQ
  logs:
    source: ibm_mq
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- メッセージキュー
- ネットワーク
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ibm_mq/README.md
display_on_public_website: true
draft: false
git_integration_title: ibm_mq
integration_id: ibm-mq
integration_title: IBM MQ
integration_version: 6.3.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: ibm_mq
public_title: IBM MQ
short_description: IBM MQ はメッセージキューです
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Message Queues
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: IBM MQ はメッセージキューです
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: IBM MQ
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは [IBM MQ][1] バージョン 9.1 以降を監視します。

## 計画と使用

### インフラストラクチャーリスト

IBM MQ チェックは [Datadog Agent][2] パッケージに含まれています。

IBM MQ チェックを使用するには、[IBM MQ クライアント][3]バージョン 9.1+ がインストールされていることを確認してください (Agent ホストに互換バージョンの IBM MQ サーバーがすでにインストールされている場合を除く)。例えば、[9.3 再頒布可能クライアント][4]です。現在、IBM MQ チェックは z/OS 上の IBM MQ サーバーへの接続をサポートしていません。

#### Linux の場合

ライブラリの場所を含めるために `LD_LIBRARY_PATH` を更新してください。この環境変数がまだ存在しない場合は作成してください。
例えば、クライアントを `/opt` の下にインストールした場合

```text
export LD_LIBRARY_PATH=/opt/mqm/lib64:/opt/mqm/lib:$LD_LIBRARY_PATH
```

**注**: Agent v6 以上は、`upstart`、`systemd`、または `launchd` を使用して datadog-agent サービスをオーケストレーションします。場合によっては、サービス構成ファイルに環境変数を追加する必要があります。サービス構成ファイルのデフォルトの場所は、以下の通りです。

- Upstart (Linux): `/etc/init/datadog-agent.conf`
- Systemd (Linux): `/lib/systemd/system/datadog-agent.service`
- Launchd (MacOS): `~/Library/LaunchAgents/com.datadoghq.agent.plist`
  - これは、MacOS SIP が無効になっている場合にのみ機能します (セキュリティポリシーによっては推奨されない場合があります)。これは [SIP パージ `LD_LIBRARY_PATH` 環境変数][5]が原因です。

以下は、`systemd` の構成の例です。

```yaml
[Unit]
Description="Datadog Agent"
After=network.target
Wants=datadog-agent-trace.service datadog-agent-process.service
StartLimitIntervalSec=10
StartLimitBurst=5

[Service]
Type=simple
PIDFile=/opt/datadog-agent/run/agent.pid
Environment="LD_LIBRARY_PATH=/opt/mqm/lib64:/opt/mqm/lib:$LD_LIBRARY_PATH"
User=dd-agent
Restart=on-failure
ExecStart=/opt/datadog-agent/bin/agent/agent run -p /opt/datadog-agent/run/agent.pid

[Install]
WantedBy=multi-user.target
```

以下は、`upstart` の構成の例です。

```conf
description "Datadog Agent"

start on started networking
stop on runlevel [!2345]

respawn
respawn limit 10 5
normal exit 0

console log
env DD_LOG_TO_CONSOLE=false
env LD_LIBRARY_PATH=/opt/mqm/lib64:/opt/mqm/lib:$LD_LIBRARY_PATH

setuid dd-agent

script
  exec /opt/datadog-agent/bin/agent/agent start -p /opt/datadog-agent/run/agent.pid
end script

post-stop script
  rm -f /opt/datadog-agent/run/agent.pid
end script
```Agent

以下は、`launchd` の構成の例です。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>KeepAlive</key>
        <dict>
            <key>SuccessfulExit</key>
            <false/>
        </dict>
        <key>Label</key>
        <string>com.datadoghq.agent</string>
        <key>EnvironmentVariables</key>
        <dict>
            <key>DD_LOG_TO_CONSOLE</key>
            <string>false</string>
            <key>LD_LIBRARY_PATH</key>
            <string>/opt/mqm/lib64:/opt/mqm/lib</string>
        </dict>
        <key>ProgramArguments</key>
        <array>
            <string>/opt/datadog-agent/bin/agent/agent</string>
            <string>run</string>
        </array>
        <key>StandardOutPath</key>
        <string>/var/log/datadog/launchd.log</string>
        <key>StandardErrorPath</key>
        <string>/var/log/datadog/launchd.log</string>
        <key>ExitTimeOut</key>
        <integer>10</integer>
    </dict>
</plist>
```

Agent が更新されるたびに、これらのファイルは消去されるため、再更新する必要があります。

または、Linux を使用している場合は、MQ クライアントのインストール後に、ランタイムリンカがライブラリを見つけることができることを確認します。たとえば、ldconfig を使用します。

ld 構成ファイルにライブラリの場所を追加します。

```shell
sudo sh -c "echo /opt/mqm/lib64 > /etc/ld.so.conf.d/mqm64.conf"
sudo sh -c "echo /opt/mqm/lib > /etc/ld.so.conf.d/mqm.conf"
```

バインディングを更新します。

```shell
sudo ldconfig
```

#### Windows の場合

IBM MQ のデータディレクトリに `mqclient.ini` というファイルがあります。通常は `C:\ProgramData\IBM\MQ` です。
環境変数 `MQ_FILE_PATH` を構成し、データディレクトリを指すようにします。

### アクセス許可と認証

IBM MQ で権限を設定する方法はたくさんあります。セットアップの方法にもよりますが、MQ 内に `datadog` ユーザーを作成して、読み取り専用権限と、オプションで `+chg` 権限を設定します。`+chg` 権限は、[リセットキュー統計][6] (`MQCMD_RESET_Q_STATS`) のメトリクスを収集するために必要です。これらのメトリクスを収集したくない場合は、構成で `collect_reset_queue_metrics` を無効にできます。リセットキュー統計のパフォーマンスデータを収集すると、パフォーマンスデータもリセットされます。

**注**: MQ サーバーで "Queue Monitoring" を有効にして、少なくとも "Medium" に設定する必要があります。これは、サーバーのホストで MQ UI または `mqsc` コマンドを使用して実行できます。

```text
> /opt/mqm/bin/runmqsc
5724-H72 (C) Copyright IBM Corp. 1994, 2018.
Starting MQSC for queue manager datadog.


ALTER QMGR MONQ(MEDIUM) MONCHL(MEDIUM)
     1 : ALTER QMGR MONQ(MEDIUM) MONCHL(MEDIUM)
AMQ8005I: IBM MQ queue manager changed.

       :
One MQSC command read.
No commands have a syntax error.
All valid MQSC commands were processed.
```

### ブラウザトラブルシューティング

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

##### メトリクスの収集

1. IBM MQ のパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `ibm_mq.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル ibm_mq.d/conf.yaml][1] を参照してください。
   IBM MQ を構成するオプションはいくつもあり、使用方法によって構成は変わります。

   - `channel`: IBM MQ チャンネル
   - `queue_manager`: 指定されたキューマネージャー
   - `host`: IBM MQ が実行されているホスト
   - `port`: IBM MQ が公開しているポート
   - `convert_endianness`: MQ サーバーが AIX または IBM i で動作している場合、これを有効にする必要があります

    ユーザー名とパスワードのセットアップを使用している場合、`username` と `password` を設定できます。ユーザー名が設定されていない場合、Agent プロセスの所有者 (`dd-agent`) が使用されます。

    **注**: このチェックは、`queues` パラメーターで設定したキューのみを監視します

    ```yaml
    queues:
      - APP.QUEUE.1
      - ADMIN.QUEUE.1
    ```

2. [Agent を再起動します][2]。

##### 収集データ

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. 次に、構成ファイルで適切な MQ ログファイルを指定します。MQ インテグレーションの構成ファイルの下部にある行のコメントを解除し、適宜修正してください。

   ```yaml
     logs:
       - type: file
         path: '/var/mqm/log/<APPNAME>/active/AMQERR01.LOG'
         service: '<APPNAME>'
         source: ibm_mq
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: "\d{2}/\d{2}/\d{4}"
   ```

3. [Agent を再起動します][2]。

[1]: https://github.com/DataDog/integrations-core/blob/master/ibm_mq/datadog_checks/ibm_mq/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `ibm_mq`                                                                                                                        |
| `<INIT_CONFIG>`      | 空白または `{}`                                                                                                                   |
| `<INSTANCE_CONFIG>`  | `{"channel": "DEV.ADMIN.SVRCONN", "queue_manager": "datadog", "host":"%%host%%", "port":"%%port%%", "queues":["<キュー名>"]}` |

##### 収集データ

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                                                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "ibm_mq", "service": "<サービス名>", "log_processing_rules": {"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{2}/\d{2}/\d{4}"}}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `ibm_mq` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "ibm_mq" >}}


### ヘルプ

IBM MQ には、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "ibm_mq" >}}


## ヘルプ

### リセットキュー統計 MQRC_NOT_AUTHORIZED 権限の警告
以下の警告が表示される場合

```
Warning: Error getting pcf queue reset metrics for SAMPLE.QUEUE.1: MQI Error. Comp: 2, Reason 2035: FAILED: MQRC_NOT_AUTHORIZED
```

これは、`datadog` ユーザーがリセットキューのメトリクスを収集するための `+chg` 権限を持っていないことが原因です。これを解決するには、`datadog` ユーザーに `+chg` 権限を与えて [`setmqaut`][8] キューのリセットメトリクスを収集するか、あるいは `collect_reset_queue_metrics` を無効にしてください。
```yaml
    collect_reset_queue_metrics: false
```

### 高いリソース利用率
IBM MQ チェックはサーバー上でクエリを実行しますが、これらのクエリが高価になり、チェックに劣化をもたらすことがあります。

チェックの実行に時間がかかったり、ホスト上で多くのリソースを消費していることが確認された場合、以下を試してチェックの範囲を縮小できる可能性があります。

* `auto_discover_queues` を使用している場合は、代わりに `queue_patterns` や `queue_regex` を使用して、特定のキューのみを検出するようにしてください。これは、システムが動的なキューを生成している場合に特に有効です。
* `queue_patterns` や `queue_regex` を使用してキューを自動検出する場合は、パターンや正規表現を絞り込んで、より少ないキューにしかマッチしないようにしてみてください。
* チャンネル数が多すぎる場合は `auto_discover_channels` を無効にしてください。
* `collect_statistics_metrics` を無効にします。

### ログのエラー
* `Unpack for type ((67108864,)) not implemented`: このようなエラーが発生し、MQ サーバーが IBM OS で動作している場合は、`convert_endianness` を有効にして Agent を再起動します。

### ログに表示される警告
* `Error getting [...]: MQI Error. Comp: 2, Reason 2085: FAILED: MQRC_UNKNOWN_OBJECT_NAME`: このようなメッセージが表示される場合、インテグレーションが存在しないキューからメトリクスを収集しようとしていることが原因です。これは、構成ミスか、`auto_discover_queues` を使用している場合、インテグレーションが[ダイナミックキュー][9]を発見して、メトリクスを収集しようとしたときに、そのキューがもはや存在しないことが原因です。この場合、より厳格な `queue_patterns` や `queue_regex` を指定して問題を軽減するか、あるいは警告を無視することができます。 


### その他

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog を使用した IBM MQ メトリクスおよびログの監視][11]


[1]: https://www.ibm.com/products/mq
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://www.ibm.com/docs/en/ibm-mq/9.3?topic=roadmap-mq-downloads#mq_downloads_admins__familyraclients__title__1
[4]: https://www.ibm.com/support/fixcentral/swg/selectFixes?parent=ibm~WebSphere&product=ibm/WebSphere/WebSphere+MQ&release=9.3.0.0&platform=All&function=fixid&fixids=*IBM-MQC-Redist-*
[5]: https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/RuntimeProtections/RuntimeProtections.html#//apple_ref/doc/uid/TP40016462-CH3-SW1
[6]: https://www.ibm.com/docs/en/ibm-mq/9.1?topic=formats-reset-queue-statistics
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://www.ibm.com/docs/en/ibm-mq/9.2?topic=reference-setmqaut-grant-revoke-authority
[9]: https://www.ibm.com/docs/en/ibm-mq/9.2?topic=queues-dynamic-model
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://www.datadoghq.com/blog/monitor-ibmmq-with-datadog