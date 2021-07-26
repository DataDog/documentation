---
aliases:
  - /ja/integrations/mesos_master/
  - /ja/integrations/mesos_slave/
integration_title: Mesos
is_public: true
kind: インテグレーション
short_description: クラスターリソース使用状況、マスターおよびスレーブカウント、タスクステータスなどを追跡 and more.
---
このチェックは Mesos マスターのメトリクスを収集します。Mesos スレーブのメトリクスについては、[Mesos スレーブインテグレーションのドキュメント][1]を参照してください。

![Mesos マスターダッシュボード][2]

## 概要

このチェックは、Mesos マスターから以下の情報に関するメトリクスを収集します。

- クラスターリソース
- スレーブ (登録済み、アクティブ、非アクティブ、接続済み、切断済みなど)
- タスクの数 (失敗、終了、ステージング済み、実行中など)
- フレームワークの数 (アクティブ、非アクティブ、接続済み、切断済み)

その他にも多数あります。

## セットアップ

### インストール

DC/OS の有無にかかわらず、Mesos でのインストールは同じです。各 Mesos マスターノードで datadog-agent コンテナを実行します。

```shell
docker run -d --name datadog-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -e DD_API_KEY=<YOUR_DATADOG_API_KEY> \
  -e MESOS_MASTER=true \
  -e MARATHON_URL=http://leader.mesos:8080 \
  datadog/agent:latest
```

上のコマンドの Datadog API キーと Mesos Master の API URL は、適切な値に置き換えてください。

### コンフィグレーション

正しい Master URL を渡して datadog-agent を起動した場合、Agent は、既にデフォルトの `mesos_master.d/conf.yaml` を使用してマスターからメトリクスを収集しています。ほかに必要な構成はありません。使用可能なすべての構成オプションの詳細については、[サンプル mesos_master.d/conf.yaml][3] を参照してください。

ただし、マスターの API が自己署名証明書を使用しない場合は、`mesos_master.d/conf.yaml` で `disable_ssl_validation: true` を設定してください。

#### ログの収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
    logs_enabled: true
    ```

2. Mesos のログの収集を開始するには、次の構成ブロックを `mesos_master.d/conf.yaml` ファイルに追加します。

    ```yaml
    logs:
      - type: file
        path: /var/log/mesos/*
        source: mesos
    ```

   `path` パラメーターの値を環境に合わせて変更するか、デフォルトの Docker stdout を使用します。

    ```yaml
    logs:
      - type: docker
        source: mesos
    ```

    使用可能なすべての構成オプションの詳細については、[サンプル mesos_master.d/conf.yaml][3] を参照してください。

3. [Agent を再起動します][4]。

Kubernetes 環境でログを収集する Agent を構成する追加の情報に関しては、[Datadog ドキュメント][5]を参照してください。

### 検証

Datadog で、メトリクスエクスプローラーを使用して `mesos.cluster` を検索します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "mesos_master" >}}


### イベント

Mesos-master チェックには、イベントは含まれません。

### サービスのチェック

**mesos_master.can_connect**:<br>
Agent が Mesos Master API に接続してメトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## その他の参考資料

- [DC/OS を使用した Mesos への Datadog のインストール][7]




## Mesos スレーブインテグレーション

![Mesos スレーブダッシュボード][8]

## 概要

この Agent チェックは、Mesos スレーブから以下の情報に関するメトリクスを収集します。

- システム負荷
- タスクの数 (失敗、終了、ステージング済み、実行中など)
- エグゼキューターの数 (実行中、途中終了など)

その他にも多数あります。

このチェックは、エグゼキュータータスクごとにサービスチェックも作成します。

## セットアップ

### インストール

[このブログ記事][7]の手順に従って、DC/OS Web UI から各 Mesos エージェントノードに Datadog Agent をインストールします。

### コンフィギュレーション

#### DC/OS

1. DC/OS Web UI で、**Universe** タブをクリックします。**datadog** パッケージを見つけ、Install ボタンをクリックします。
1. **Advanced Installation** ボタンをクリックします。
1. 最初のフィールドに Datadog API キーを入力します。
1. Instances フィールドに、クラスター内のスレーブノードの数を入力します (クラスター内のノードの数は、DC/OS Web UI の左側にある Nodes タブをクリックすると確認できます)。
1. **Review and Install** をクリックし、**Install** をクリックします。

#### Marathon

DC/OS を使用していない場合は、Marathon Web UI を使用するか、次の JSON を API URL にポストして、Datadog Agent アプリケーションを定義します。`<YOUR_DATADOG_API_KEY>` をご使用の API キーに置き換え、インスタンスの数をクラスター内のスレーブノードの数に置き換える必要があります。また、使用される Docker イメージを最新のタグに更新する必要があります。最新のイメージは [Docker Hub][9] にあります。

```json
{
  "id": "/datadog-agent",
  "cmd": null,
  "cpus": 0.05,
  "mem": 256,
  "disk": 0,
  "instances": 1,
  "constraints": [
    ["hostname", "UNIQUE"],
    ["hostname", "GROUP_BY"]
  ],
  "acceptedResourceRoles": ["slave_public", "*"],
  "container": {
    "type": "DOCKER",
    "volumes": [
      {
        "containerPath": "/var/run/docker.sock",
        "hostPath": "/var/run/docker.sock",
        "mode": "RO"
      },
      { "containerPath": "/host/proc", "hostPath": "/proc", "mode": "RO" },
      {
        "containerPath": "/host/sys/fs/cgroup",
        "hostPath": "/sys/fs/cgroup",
        "mode": "RO"
      }
    ],
    "docker": {
      "image": "datadog/agent:latest",
      "network": "BRIDGE",
      "portMappings": [
        {
          "containerPort": 8125,
          "hostPort": 8125,
          "servicePort": 10000,
          "protocol": "udp",
          "labels": {}
        }
      ],
      "privileged": false,
      "parameters": [
        { "key": "name", "value": "datadog-agent" },
        { "key": "env", "value": "DD_API_KEY=<YOUR_DATADOG_API_KEY>" },
        { "key": "env", "value": "MESOS_SLAVE=true" }
      ],
      "forcePullImage": false
    }
  },
  "healthChecks": [
    {
      "protocol": "COMMAND",
      "command": { "value": "/probe.sh" },
      "gracePeriodSeconds": 300,
      "intervalSeconds": 60,
      "timeoutSeconds": 20,
      "maxConsecutiveFailures": 3
    }
  ],
  "portDefinitions": [
    { "port": 10000, "protocol": "tcp", "name": "default", "labels": {} },
    { "port": 10001, "protocol": "tcp", "labels": {} }
  ]
}
```

カスタム `mesos_slave.d/conf.yaml` を構成する場合を除き (通常は `disable_ssl_validation：true` を設定する必要があります)、エージェントのインストール後に必要な作業はありません。

#### ログの収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
    logs_enabled: true
    ```

2. Mesos のログの収集を開始するには、次の構成ブロックを  `mesos_slave.d/conf.yaml` ファイルに追加します。

    ```yaml
    logs:
      - type: file
        path: /var/log/mesos/*
        source: mesos
    ```

    `path` パラメーターの値を環境に合わせて変更するか、デフォルトの Docker stdout を使用します。

    ```yaml
    logs:
      - type: docker
        source: mesos
    ```

    使用可能なすべての構成オプションの詳細については、[sample mesos_slave.d/conf.yaml][10]を参照してください。

3. [Agent を再起動します][4]。

Kubernetes 環境でログを収集する Agent を構成する追加の情報に関しては、[Datadog ドキュメント][5]を参照してください。

### 検証

#### DC/OS

DC/OS Web UI の Services タブに、Datadog Agent が表示されます。Datadog で、メトリクスエクスプローラーを使用して `mesos.slave` を検索します。

#### Marathon

DC/OS を使用していない場合は、正常に実行中のアプリケーションの一覧に datadog-agent が表示されます。Datadog で、メトリクスエクスプローラーを使用して `mesos.slave` を検索します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "mesos_slave" >}}


### イベント

Mesos スレーブチェックには、イベントは含まれません。

### Service Check

**mesos_slave.can_connect**:<br>
Agent が Mesos スレーブメトリクスエンドポイントに接続できない場合は`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**<executor_task_name>.ok**:<br>
mesos_slave チェックは、エグゼキュータータスクごとにサービスチェックを作成し、次のいずれかのステータスを与えます。

|               |                                |
| ------------- | ------------------------------ |
| タスクステータス   | サービスチェックのステータスの結果 |
| TASK_STARTING | AgentCheck.OK                  |
| TASK_RUNNING  | AgentCheck.OK                  |
| TASK_FINISHED | AgentCheck.OK                  |
| TASK_FAILED   | AgentCheck.CRITICAL            |
| TASK_KILLED   | AgentCheck.WARNING             |
| TASK_LOST     | AgentCheck.CRITICAL            |
| TASK_STAGING  | AgentCheck.OK                  |
| TASK_ERROR    | AgentCheck.CRITICAL            |

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## その他の参考資料

- [DC/OS を使用した Mesos への Datadog のインストール][7]


[1]: https://docs.datadoghq.com/ja/integrations/mesos/#mesos-slave-integration
[2]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mesos_master/images/mesos_dashboard.png
[3]: https://github.com/DataDog/integrations-core/blob/master/mesos_master/datadog_checks/mesos_master/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://www.datadoghq.com/blog/deploy-datadog-dcos
[8]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mesos_slave/images/mesos_dashboard.png
[9]: https://hub.docker.com/r/datadog/agent/tags
[10]: https://github.com/DataDog/integrations-core/blob/master/mesos_slave/datadog_checks/mesos_slave/data/conf.yaml.example