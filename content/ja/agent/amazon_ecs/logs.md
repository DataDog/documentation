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
## セットアップ

ECS コンテナ内で実行中のアプリケーションにより書き込まれるログをすべて収集し、Datadog アプリケーションに送信する方法は、以下のとおりです。

{{< tabs >}}
{{% tab "Linux" %}}

1. [前述の手順](#aws-cli)に従い Datadog Agent をインストールします。
2. 次の構成で [datadog-agent-ecs.json][1] ファイル (オリジナルの Amazon Linux AMI を使用している場合は [datadog-agent-ecs1.json][2]) を更新します。

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

3. ログが `stdout/stderr` に書き込まれ、Agent によって収集されるように、コンテナ定義に `logConfiguration.logDriver` パラメーターが含まれていないことを確認してください。このパラメーターが `awslogs` に設定されている場合、[AWS Lambda を使用して CloudWatch から ECS ログを収集する][3]ことで、Agent なしで Amazon ECS ログを収集します。

[1]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[2]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json
[3]: https://www.datadoghq.com/blog/monitoring-ecs-with-datadog/
{{% /tab %}}
{{% tab "Windows" %}}

1. [前述の手順](#aws-cli)に従い Datadog Agent をインストールします。
2. 次の構成を使用して [datadog-agent-ecs-win.json][1] ファイルを更新します。

    ```text
    {
      "containerDefinitions": [
        (...)
          "mountPoints": [
            (...)
            {
              "containerPath": "/etc/passwd",
              "sourceVolume": "passwd",
              "readOnly": true
            },
            (...)
          ],
          "environment": [
            (...)
            {
              "name": "DD_PROCESS_AGENT_ENABLED",
              "value": "true"
            }
          ]
        }
      ],
      "volumes": [
        (...)
        {
          "host": {
            "sourcePath": "/etc/passwd"
          },
          "name": "passwd"
        },
        (...)
      ],
      "family": "datadog-agent-task"
    }
    ```

3. ログが `stdout/stderr` に書き込まれ、Agent によって収集されるように、コンテナ定義に `logConfiguration.logDriver` パラメーターが含まれていないことを確認してください。このパラメーターが `awslogs` に設定されている場合、[AWS Lambda を使用して CloudWatch から ECS ログを収集する][2]ことで、Agent なしで Amazon ECS ログを収集します。

[1]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs-win.json
[2]: https://www.datadoghq.com/blog/monitoring-ecs-with-datadog/
{{% /tab %}}
{{< /tabs >}}

## ログのインテグレーションを有効にする

各コンテナに使用するインテグレーションを特定するには、`source` 属性を使用します。この属性をコンテナのラベルで直接上書きすれば、[ログのインテグレーション][1]が有効になります。このプロセスの詳細については、Datadog の[ログのオートディスカバリー ガイド][2]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/logs/processing/#log-processing
[2]: https://docs.datadoghq.com/ja/logs/log_collection/docker/?tab=containerinstallation#activate-log-integrations