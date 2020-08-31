---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: ibm_mq
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - 処理
  - メッセージング
  - ログの収集
  - オートディスカバリー
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/ibm_mq/README.md'
display_name: IBM MQ
git_integration_title: ibm_mq
guid: 873153b6-5184-438a-8a32-1e2d2e490dde
integration_id: ibm-mq
integration_title: IBM MQ
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ibm_mq.
metric_to_check: ibm_mq.queue.usage
name: ibm_mq
public_title: Datadog-IBM MQ インテグレーション
short_description: IBM MQ はメッセージキューです
support: コア
supported_os:
  - linux
  - mac_os
---
## 概要

このチェックは [IBM MQ][1] バージョン 5 から 9.0 を監視します。

## セットアップ

### インストール

IBM MQ チェックは [Datadog Agent][2] パッケージに含まれています。

IBM MQ チェックを使用するには、次を行う必要があります。

1. [IBM MQ クライアント][3] 9.1 以上がインストールされていることを確認します (IBM MQ サーバーがインストールされていない場合)。
2. ライブラリの場所を指定する LD_LIBRARY_PATH と C_INCLUDE_PATH を更新します。

例:

```text
export LD_LIBRARY_PATH=/opt/mqm/lib64:/opt/mqm/lib:$LD_LIBRARY_PATH
export C_INCLUDE_PATH=/opt/mqm/inc

```

**注**: Agent v6 以上は、`upstart`、`systemd`、または `launchd` を使用して datadog-agent サービスをオーケストレーションします。場合によっては、サービス構成ファイルに環境変数を追加する必要があります。サービス構成ファイルのデフォルトの場所は、以下の通りです。

- Upstart (Linux): `/etc/init/datadog-agent.conf`
- Systemd (Linux): `/lib/systemd/system/datadog-agent.service`
- Launchd (MacOS): `~/Library/LaunchAgents/com.datadoghq.agent.plist`
  - これは、MacOS SIP が無効になっている場合にのみ機能します (セキュリティポリシーによっては推奨されない場合があります)。これは [SIP パージ `LD_LIBRARY_PATH` 環境変数][4]が原因です。

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

#### アクセス許可と認証

IBM MQ でアクセス許可をセットアップする方法はいくつかあります。実際のセットアップの動作に応じて、MQ 内に読み取り専用アクセス許可を持つ `datadog` ユーザーを作成します。

**注**: "Queue Monitoring" を有効にして、少なくとも "Medium" に設定する必要があります。これは、MQ UI または mqsc コマンドを使用して実行できます。

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

### コンフィギュレーション

#### ホスト

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

##### メトリクスの収集

1. IBM MQ のパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `ibm_mq.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル ibm_mq.d/conf.yaml][5] を参照してください。
   IBM MQ を構成するオプションはいくつかあり、使用方法によって構成は変わります。

   - `channel`: IBM MQ チャンネル
   - `queue_manager`: 指定されたキューマネージャー
   - `host`: IBM MQ が実行されているホスト
   - `port`: IBM MQ が公開しているポート

    ユーザー名とパスワードのセットアップを使用している場合、`username` と `password` を設定できます。ユーザー名が設定されていない場合、Agent プロセスの所有者が使用されます（例: `dd-agent`）。

    **注**: このチェックは、`queues` パラメーターで設定したキューのみを監視します

    ```yaml
    queues:
      - APP.QUEUE.1
      - ADMIN.QUEUE.1
    ```

2. [Agent を再起動します][6]。

##### ログの収集

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

3. [Agent を再起動します][6]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][7]をガイドとして参照して、次のパラメーターを適用します。

##### メトリクスの収集

| パラメーター            | 値                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `<インテグレーション名>` | `ibm_mq`                                                                                                                        |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                                                                                   |
| `<インスタンスコンフィギュレーション>`  | `{"channel": "DEV.ADMIN.SVRCONN", "queue_manager": "datadog", "host":"%%host%%", "port":"%%port%%", "queues":["<キュー名>"]}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][8]を参照してください。

| パラメーター      | 値                                                                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "ibm_mq", "service": "<サービス名>", "log_processing_rules": {"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{2}/\d{2}/\d{4}"}}` |

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `ibm_mq` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "ibm_mq" >}}


### サービスのチェック

**ibm_mq.can_connect**:<br/>
何らかの理由で Agent が MQ サーバーに接続できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**ibm_mq.queue_manager**:<br/>
Agent がキューマネージャーから統計を取得できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**ibm_mq.queue**:<br/>
Agent がキュー統計を取得できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**ibm_mq.channel**:<br/>
Agent がチャンネル統計を取得できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**ibm_mq.channel.status**:<br/>
ステータスが INACTIVE/STOPPED/STOPPING の場合は、`CRITICAL` を返します。ステータスが RUNNING の場合は、`OK` を返します。ステータスが RUNNING になると推定される場合は、`WARNING` を返します。

### イベント

IBM MQ には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog を使用した IBM MQ メトリクスおよびログの監視][12]

[1]: https://www.ibm.com/products/mq
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://developer.ibm.com/messaging/mq-downloads
[4]: https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/RuntimeProtections/RuntimeProtections.html#//apple_ref/doc/uid/TP40016462-CH3-SW1
[5]: https://github.com/DataDog/integrations-core/blob/master/ibm_mq/datadog_checks/ibm_mq/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[8]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/ibm_mq/metadata.csv
[11]: https://docs.datadoghq.com/ja/help/
[12]: https://www.datadoghq.com/blog/monitor-ibmmq-with-datadog