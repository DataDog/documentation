---
aliases:
- /ja/agent/amazon_ecs/logs
further_reading:
- link: /agent/amazon_ecs/apm/
  tag: Documentation
  text: Collect your application traces
- link: /agent/amazon_ecs/data_collected/#metrics
  tag: Documentation
  text: Collect ECS metrics
title: Amazon ECS Log Collection
---

## 概要

Datadog Agent 6+ は、コンテナからログを収集します。ECS コンテナからログを収集する推奨方法は、Agent のタスク定義内でログ収集を有効にすることです。これは、以前使用していた[タスク定義ファイル][7]を修正し、[更新したタスク定義を登録][8]することで実行できます。また、Amazon Web UI から直接タスク定義を編集することもできます。

有効化すると、Datadog Agent コンテナは、自身と同じホスト上の他のアプリケーションコンテナから発行されるログを収集します。これは、`default` または `json-file` ロギングドライバーを使用しているときに `stdout` と `stderr` ログストリームに出力されるログに限定されます。

- コンテナが*その*コンテナ内に隔離されたログファイルを作成している場合、Agent コンテナがこれらのログファイルにアクセスできるように、いくつかの[追加手順](#log-file-within-a-container)を実行する必要があります。
- コンテナが[ログを CloudWatch に送信するために `awslogs` ロギングドライバー][9]を使用している場合、これらのログは Agent から見えません。代わりに、これらのログを収集するために、[AWS ログ収集インテグレーション][10]のいずれかを使用します。

#### AWS Fargate

To set up log collection for AWS Fargate, see [AWS Fargate Log Collection][13].

## インストール

### ECS タスク定義

実行中の ECS コンテナからすべてのログを収集するには、[オリジナルの ECS セットアップ][11]の Agent のタスク定義を、以下の環境変数とマウントで更新します。

{{< tabs >}}
{{% tab "Linux" %}}

必要な基本構成は、[datadog-agent-ecs-logs.json][1] を参考にします。タスク定義には、以下のものが必要です。

  ```json
  {
    "containerDefinitions": [
      {
        (...)
        "mountPoints": [
          (...)
          {
            "containerPath": "/opt/datadog-agent/run",
            "sourceVolume": "pointdir",
            "readOnly": false
          },
          {
            "containerPath": "/var/lib/docker/containers",
            "sourceVolume": "containers_root",
            "readOnly": true
          }
        ],
        "environment": [
          (...)
          {
            "name": "DD_LOGS_ENABLED",
            "value": "true"
          },
          {
            "name": "DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL",
            "value": "true"
          }
        ]
      }
    ],
    "volumes": [
      (...)
      {
        "host": {
          "sourcePath": "/opt/datadog-agent/run"
        },
        "name": "pointdir"
      },
      {
        "host": {
          "sourcePath": "/var/lib/docker/containers/"
        },
        "name": "containers_root"
      }
    ],
    "family": "datadog-agent-task"
  }
  ```

[1]: /resources/json/datadog-agent-ecs-logs.json
{{% /tab %}}
{{% tab "Windows" %}}

必要な基本構成は、[datadog-agent-ecs-win-logs.json][1] を参考にします。タスク定義には、以下のものが必要です。

  ```json
  {
    "containerDefinitions": [
      {
        (...)
        "mountPoints": [
          (...)
          {
            "containerPath": "C:/programdata/datadog/run",
            "sourceVolume": "pointdir",
            "readOnly": false
          },
          {
            "containerPath": "c:/programdata/docker/containers",
            "sourceVolume": "containers_root",
            "readOnly": true
          }
        ],
        "environment": [
          (...)
          {
            "name": "DD_LOGS_ENABLED",
            "value": "true"
          },
          {
            "name": "DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL",
            "value": "true"
          }
        ]
      }
    ],
    "volumes": [
      (...)
      {
        "name": "pointdir",
        "dockerVolumeConfiguration": {
          "autoprovision": true,
          "scope": "shared",
          "driver": "local"
        }
      },
      {
        "host": {
          "sourcePath": "c:/programdata/docker/containers"
        },
        "name": "containers_root"
      }
    ],
    "family": "datadog-agent-task"
  }
  ```

[1]: /resources/json/datadog-agent-ecs-win-logs.json
{{% /tab %}}
{{< /tabs >}}

これらのタスク定義では、環境変数 `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true` を設定して、Agent が検出したすべてのコンテナからログを収集します。この環境変数を `false` に設定すると、コンテナに[オートディスカバリーラベル](#autodiscovery-labels)が存在する場合にのみログを収集するように設定されます。

Agent のタスク定義のローカルファイルを所有している場合、[更新されたタスク定義の登録][8]の手順を繰り返すことができます。これにより、新しいリビジョンが作成されます。Datadog Agent の Daemon Service で、この更新されたリビジョンを参照することができます。

## カスタムログ収集

### オートディスカバリーラベル
環境変数 `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true` が設定されている場合、Agent はデフォルトで検出したすべてのコンテナからログを収集します。これらの収集されたログには、`service` タグと `source` タグにそれぞれのコンテナのショートイメージ名が設定されています。オートディスカバリー用の ECS アプリケーションコンテナで Docker Labels を提供することで、Agent が*その*コンテナに対して使用するログ構成をカスタマイズすることができます。

オートディスカバリー構成の使用方法については、[Docker Log Collection セットアップ手順][12]を参照してください。例えば、以下のログ構成では、収集するログの `source` と `service` をオーバーライドしています。

```json
[{"source": "example-source", "service": "example-service"}]
```

ECS に関しては、ログを出力するアプリケーションコンテナのタスク定義の `dockerLabels` 内にあるラベル `com.datadoghq.ad.logs` に追加することができます。

```json
{
  "containerDefinitions": [
    {
      "name": "<CONTAINER_NAME>",
      "image": "<CONTAINER_IMAGE>",
      "dockerLabels": {
        "com.datadoghq.ad.logs": "[{\"source\": \"example-source\", \"service\": \"example-service\"}]"
      }
    }
  ]
}
```

[ログ構成にタグを追加する][4]、または任意の `log_processing_rules` による[高度なログ収集オプション][5]でさらにカスタマイズすることができます。

### コンテナ内のログファイル

Docker (`default` または `json-file` ドライバー) は `stdout` と `stderr` ログストリームを Agent がすぐに見つけられるフォーマットで公開します。しかし、コンテナがコンテナ内で孤立したログファイルを作成している場合、Agent はそのファイルに対してネイティブに可視性を持ちません。Datadog は、コンテナ化されたアプリケーションで `stdout` と `stderr` 出力ストリームを使用して、ログ収集をより自動的にセットアップすることを推奨します。これが不可能な場合、オートディスカバリーログ構成を提供して目的のファイルパスを指定し、Agent コンテナとアプリケーションコンテナがログファイルを含むホスト上のディレクトリを共有するようにすることができます。

以下のログ構成は、Agent に対して、`/var/log/example/app.log` パスに[このカスタムログファイルを収集する][3]ことを指示します。
```json
[{
  "type": "file",
  "path": "/var/log/example/app.log",
  "source": "example-source",
  "service": "example-service"
}]
```

例: 以下のタスク定義では、以下のことを実行します。
* ファイル `/var/log/example/app.log` にいくつかのログを書き込む
* ログの構成を設定するための `dockerLabels` を存在させる
* この `/var/log/example` ディレクトリに対してホストパス `volumes` と `mountPoints` を指定する

```json
{
  "containerDefinitions": [
    {
      "name": "example-logger",
      "image": "busybox",
      "entryPoint": ["/bin/sh", "-c", "--"],
      "command": ["while true; do sleep 1; echo `date` example file log >> /var/log/example/app.log; done;"],
      "mountPoints": [
        {
          "containerPath": "/var/log/example",
          "sourceVolume": "applogs"
        }
      ],
      "dockerLabels": {
        "com.datadoghq.ad.logs": "[{\"type\":\"file\",\"path\":\"/var/log/example/app.log\",\"source\":\"example-source\",\"service\":\"example-service\"}]"
      }
    }
  ],
  "volumes": [
    {
      "host": {
        "sourcePath": "/var/log/example"
      },
      "name": "applogs"
    }
  ],
  "family": "example-logger"
}
```

構成のファイルパスは、常に Agent からの相対パスです。同じ `volume` と `mountPoint` が Agent のタスク定義内に存在し、そのログファイルを可視化する必要があります。

ECS によるボリューム管理の詳細については、[AWS Bind マウントのドキュメント][6]を参照してください。

**注**: コンテナでこのような構成を使用する場合、`stdout` と `stderr` のログストリームはコンテナから自動的に収集されず、ファイルのみ収集されます。コンテナのストリームとファイルの両方から収集する必要がある場合は、構成で明示的にこれを有効にします。例:

```json
[
  {
    "type": "file",
    "path": "/var/log/example/app.log",
    "source": "example-file",
    "service": "example-service"
  },
  {
    "source": "example-stream",
    "service": "example-service"
  }
]
```

## ログのインテグレーションを有効にする

各コンテナに使用するインテグレーションを特定するには、`source` 属性を使用します。この属性をコンテナのラベルで直接上書きすれば、[Datadog ログのインテグレーション][2]が有効になります。このプロセスの詳細については、Datadog の[ログのオートディスカバリー ガイド][1]を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/docker/log/?tab=containerinstallation#log-integrations
[2]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[3]: /ja/agent/logs/?tab=tailfiles#custom-log-collection
[4]: /ja/getting_started/tagging/assigning_tags/?tab=noncontainerizedenvironments#methods-for-assigning-tags
[5]: /ja/agent/logs/advanced_log_collection?tab=docker
[6]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/bind-mounts.html
[7]: /ja/containers/amazon_ecs/?tab=awscli#managing-the-task-definition-file
[8]: /ja/containers/amazon_ecs/?tab=awscli#registering-the-task-definition
[9]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html
[10]: /ja/integrations/amazon_web_services/?tab=allpermissions#log-collection
[11]: /ja/containers/amazon_ecs/?tab=awscli#setup
[12]: /ja/containers/docker/log/?tab=dockerfile#log-integrations
[13]: /ja/integrations/ecs_fargate/?tab=webui#log-collection