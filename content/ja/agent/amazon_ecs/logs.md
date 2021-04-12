---
title: Amazon ECS ログ収集
kind: ドキュメント
further_reading:
  - link: /agent/amazon_ecs/apm/
    tag: Documentation
    text: アプリケーショントレースの収集
  - link: '/agent/amazon_ecs/data_collected/#metrics'
    tag: Documentation
    text: ECS リソースの収集
---
## 概要

Datadog Agent 6 以降は、コンテナからログを収集します。ECS コンテナからログを収集するための推奨される方法は、`datadog-agent-ecs.json` または `datadog-agent-ecs1.json` ファイル内でコンテナ化されたログを有効にすることです。ただし、アプリケーションが任意の容量のファイルにログ (`stdout`/`stderr` に書き込まれないログ) を出力する場合は、[ホストに Datadog Agent をデプロイ](#custom-log-collection)し、カスタムログ収集を使用してファイルを調整する必要があります。

## インストール

### ECS ファイル

ECS コンテナ内で実行中のアプリケーションにより書き込まれるログをすべて収集し、Datadog アプリケーションに送信する方法は、以下のとおりです。

{{< tabs >}}
{{% tab "Linux" %}}

1. [Amazon ECS のセットアップ手順][1]に従います。
2. 次の構成で [datadog-agent-ecs.json][2] ファイル (オリジナルの Amazon Linux AMI を使用している場合は [datadog-agent-ecs1.json][3]) を更新します。

    ```text
    {
        "containerDefinitions": [
        (...)
          "mountPoints": [
            (...)
            {
              "containerPath": "/opt/datadog-agent/run",
              "sourceVolume": "pointdir",
              "readOnly": false
            },
            (...)
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
            },
            (...)
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
        (...)
      ],
      "family": "datadog-agent-task"
    }
    ```

3. ログが `stdout/stderr` に書き込まれ、Agent によって収集されるように、コンテナ定義に `logConfiguration.logDriver` パラメーターが含まれていないことを確認してください。このパラメーターが `awslogs` に設定されている場合、[AWS Lambda を使用して CloudWatch から ECS ログを収集する][4]ことで、Agent なしで Amazon ECS ログを収集します。

[1]: https://docs.datadoghq.com/ja/agent/amazon_ecs/
[2]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[3]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json
[4]: https://www.datadoghq.com/blog/monitoring-ecs-with-datadog/
{{% /tab %}}
{{% tab "Windows" %}}

1. [Amazon ECS のセットアップ手順][1]に従います。
2. 次の構成を使用して [datadog-agent-ecs-win.json][2] ファイルを更新します。

    ```text
    {
      "containerDefinitions": [
        (...)
          "environment": [
            (...)
            {
              "name": "DD_LOGS_ENABLED",
              "value": "true"
            },
            {
              "name": "DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL",
              "value": "true"
            },
            (...)
          ]
        }
      ],
      "family": "datadog-agent-task"
    }
    ```

3. ログが `stdout/stderr` に書き込まれ、Agent によって収集されるように、コンテナ定義に `logConfiguration.logDriver` パラメーターが含まれていないことを確認してください。このパラメーターが `awslogs` に設定されている場合、[AWS Lambda を使用して CloudWatch から ECS ログを収集する][3]ことで、Agent なしで Amazon ECS ログを収集します。

[1]: https://docs.datadoghq.com/ja/agent/amazon_ecs/
[2]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs-win.json
[3]: https://www.datadoghq.com/blog/monitoring-ecs-with-datadog/
{{% /tab %}}
{{< /tabs >}}

### カスタムログ収集

#### 構成ファイル

コンテナがログをファイルに書き込む場合は、[カスタムログ収集のドキュメント][1]に従って、ログのファイルを調整します。

`<PATH_LOG_FILE>/<LOG_FILE_NAME>.log` に保存されているログを `<APP_NAME>` アプリケーションから収集するには、[Agent のコンフィギュレーションディレクトリ][2]のルートに以下の内容の `<APP_NAME>.d/conf.yaml` ファイルを作成します。

```yaml
logs:
  - type: file
    path: "<PATH_LOG_FILE>/<LOG_FILE_NAME>.log"
    service: "<APP_NAME>"
    source: "<SOURCE>"
```

**注**: コンテナメタデータはカスタムログ収集では取得されないため、Agent はコンテナタグをログに自動的に割り当てません。[カスタムタグ][3]を使用してコンテナタグを作成します。

#### コンテナラベル

Agent v7.25.0+/6.25.0+ では、コンテナラベルを使用してファイルの追跡を有効化することができます。こうすることで、ラベルが送信されたコンテナのタグを収集対象のログで受け取ることができます。使用すべき正確なラベルの詳細は、この[例][4]を参照してください。 

**注**: ファイルパスは常に Agent との相対パスになります。ファイルに書き込みを行うコンテナと Agent コンテナ間でディレクトリを共有するために、関連する ECS タスクでの追加コンフィギュレーションが必要です。ECS でのボリュームマネジメントの詳細については、[AWS ドキュメント][5]を参照してください。

## ログのインテグレーションを有効にする

各コンテナに使用するインテグレーションを特定するには、`source` 属性を使用します。この属性をコンテナのラベルで直接上書きすれば、[ログのインテグレーション][1]が有効になります。このプロセスの詳細については、Datadog の[ログのオートディスカバリー ガイド][2]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/logs/?tab=tailfiles#custom-log-collection
[2]: /ja/agent/logs/#custom-log-collection
[3]: /ja/getting_started/tagging/assigning_tags/?tab=noncontainerizedenvironments#methods-for-assigning-tags
[4]: /ja/agent/docker/log/?tab=logcollectionfromfile#examples
[5]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/bind-mounts.html