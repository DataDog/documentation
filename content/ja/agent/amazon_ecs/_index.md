---
title: Amazon ECS
kind: ドキュメント
aliases:
  - /ja/integrations/amazon_ecs/
further_reading:
  - link: /agent/amazon_ecs/logs/
    tag: Documentation
    text: アプリケーションログの収集
  - link: /agent/amazon_ecs/apm/
    tag: Documentation
    text: アプリケーショントレースの収集
  - link: '/agent/amazon_ecs/data_collected/#metrics'
    tag: Documentation
    text: ECS メトリクスの収集
---
## 概要

Amazon ECS on EC2 は、EC2 インスタンスで実行される Docker コンテナ用の拡張性とパフォーマンスに優れたコンテナ管理サービスです。

このページは [Datadog コンテナ Agent v6][1] を使用した Amazon ECS のセットアップについて説明します。他のセットアップについては、以下を参照してください。

- [Amazon ECS 向け Datadog Container Agent v5 のセットアップ][2]
- [オートディスカバリーを使用した Datadog Host Agent のセットアップ][3]

**注**: **Fargate で ECS を設定する場合は、[代わりにこのドキュメント][4]に従ってください。**

## セットアップ

ECS コンテナおよびタスクを Datadog でモニタリングするには、ECS クラスターの各 EC2 インスタンスでエージェントをコンテナとして実行します。以下にセットアップ方法を説明します。

1. ECS タスクを追加
2. IAM ポリシーの作成と修正
3. Datadog エージェントをDaeson サービスとしてスケジュール

稼働中の EC2 Container Service クラスターが構成されていない場合は、[ECS ドキュメント内の Getting Started セクション][5]を参照してください。

### メトリクスの収集

#### ECS タスクの作成

このタスクにより Datadog コンテナが起動します。コンフィギュレーションを変更するには、このタスクの定義を更新します（[方法はこのガイドで後述](#create-or-modify-your-iam-policy)）。

[APM][6]、[DogStatsD][7]、または[ログ管理][8]を使用している場合は、タスク定義で適当なフラグを設定します。

  - APM を使用している場合は、ダウンストリーム コンテナがトレースを Agent サービスに渡せるように `portMappings` を設定します。APM はポート `8126` の `TCP` を使用してトレースを受け取るため、これをタスクの定義で `hostPort` として設定します。

**注**: 他のコンテナからのトレース収集を有効にするには、`DD_APM_NON_LOCAL_TRAFFIC` 環境変数を `true` に設定する必要があります。[APM とコンテナの詳細はこちら][9]をご確認ください。

  - DogStatsD を使用している場合、タスクの定義でポート `8125` の `hostPort` を `UDP` と設定します。

**注**: 他のコンテナからの DogStatsD メトリクス収集を有効にするには、`DD_DOGSTATSD_NON_LOCAL_TRAFFIC` 環境変数を `true` に設定する必要があります。

  - ログ管理を使用している場合は、このトピックの[ログの収集][8]セクションを参照してください。

EC2 インスタンスでセキュリティグループ設定を再度チェックします。これらのポートが非公開であること確認してください。Datadog では、プライベート IP アドレスを使用してトレースをコンテナからエージェントへ渡します。

タスクの構成は [AWS CLI ツール][10]や Amazon Web コンソールでも行えます。

{{< tabs >}}
{{% tab "AWS CLI" %}}

1. Linux コンテナで [datadog-agent-ecs.json][1] (オリジナルの Amazon Linux 1 AMI を使用している場合は [datadog-agent-ecs1.json][2]) をダウンロードします。Windows の場合は [datadog-agent-ecs-win.json][3] をダウンロードします。
2. `datadog-agent-ecs.json` を編集し、アカウントの [Datadog API キー][4]を使用して `<YOUR_DATADOG_API_KEY>` を設定します。
3. オプション - [Agent 健全性チェック](#agent-health-check)を追加します。
4. オプション - Datadog EU サイトをご利用の場合は、`datadog-agent-ecs.json` を編集して `DD_SITE` を `DD_SITE:datadoghq.eu` に設定します。
5. オプション - ログの収集を有効にするには、[ログの収集][5]を参照してください。 
6. オプション - プロセスの収集を有効にするには、[プロセスの収集](#プロセス-の-収集)を参照してください。
7. オプション - トレースの収集を有効にするには、[トレースの収集 (APM)][6] を参照してください。
8. オプション - ネットワークの収集を有効にするには、[ネットワークパフォーマンスモニタリング (NPM)](#network-performance-monitoring-collection) を参照してください
9. 次のコマンドを実行します。

```bash
aws ecs register-task-definition --cli-input-json <path to datadog-agent-ecs.json>
```

##### Agent 健全性チェック

ECS タスク定義に次を追加して、Agent 健全性チェックを作成します。

```json
"healthCheck": {
  "retries": 3,
  "command": ["CMD-SHELL","agent health"],
  "timeout": 5,
  "interval": 30,
  "startPeriod": 15
}
```

[1]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[2]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json
[3]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs-win.json
[4]: https://app.datadoghq.com/account/settings#api
[5]: /ja/agent/amazon_ecs/logs/
[6]: /ja/agent/amazon_ecs/apm/
{{% /tab %}}
{{% tab "Web UI" %}}

1. AWS コンソールにログインし、EC2 コンテナサービス セクションに移動します。
2. Datadog を追加するクラスターをクリックします。
3. 左側の **Task Definitions** をクリックし、**Create new Task Definition** ボタンをクリックします。
4. **Task Definition Name** に入力します（例: `datadog-agent-task`）。
5. **Add volume** リンクをクリックします。
6. **Name** に `docker_sock` と入力します。**Source Path** に、Linux の場合は `/var/run/docker.sock`、Windows の場合は `\\.\pipe\docker_engine` と入力し、**Add** をクリックします。
7. Linux に限り、ボリュームをもう 1 つ追加して、名前を `proc`、ソースパスを `/proc/` に設定します。
8. Linux の場合のみ、ボリュームをもう 1 つ追加して、名前を `cgroup`、ソースパスを `/sys/fs/cgroup/` (オリジナルの Amazon Linux 1 AMI を使用している場合は `/cgroup/`) に設定します。
9. **Add container** ボタンをクリックします。
10. **Container name** に `datadog-agent` と入力します。
11. **Image** に `gcr.io/datadoghq/agent:latest` と入力します。
12. **Maximum memory** に `256` と入力します。**注**: 多くのリソースを使用する場合は、メモリの上限を上げる必要があります。
13. **Advanced container configuration** セクションまでスクロールし、**CPU units** に `10` と入力します。
14. **Env Variables** に、**Key** `DD_API_KEY` を追加し、値に Datadog API キーを入力します。こうした守秘性の高い情報を S3 に保管したい場合は、[ECS の構成ガイド][1]を参照してください。*
15. `DD_TAGS` キーを使用して、追加するタグに別の環境変数を追加します。
16. **Storage and Logging** セクションまで下へスクロールします。
17. **Mount points** で **docker_sock** ソースボリュームを選択し、コンテナのパスに Linux の場合は `/var/run/docker.sock`、Windows の場合は `\\.\pipe\docker_engine` と入力します。**Read only** のチェックボックスをオンにします。
18. Linux に限り、**proc** 用に別のマウントポイントを追加し、コンテナのパスに `/host/proc/` と入力します。**Read only** チェックボックスをオンにします。
19. Linux の場合のみ、3 つ目のマウント ポイントを追加して **cgroup** を選択し、コンテナのパスに `/host/sys/fs/cgroup` と入力します。**Read only** チェックボックスをオンにします。

**注**: Datadog タスク定義で CPU を 10 台使用するように設定すると、`service:datadog-agent` の `aws.ecs.cpuutilization` が 1000% と表示されることがあります。これは AWS が CPU 使用率を表示する際の独特な現象です。CPU の台数を増やすことで、グラフの歪曲を回避できます。

[1]: http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-agent-config.html#ecs-config-s3
{{% /tab %}}
{{< /tabs >}}

#### IAM ポリシーの作成と修正

Amazon ECS のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][11]に追加します。ECS ポリシーの詳細については、[AWS Web サイトのガイド][12]を参照してください。

| AWS アクセス許可                   | 説明                                                   |
| -------------------------------- | ------------------------------------------------------------- |
| `ecs:ListClusters`               | 既存のクラスターのリストを返します。                          |
| `ecs:ListContainerInstances`     | 指定されたクラスター内のコンテナインスタンスのリストを返します。 |
| `ecs:ListServices`               | 指定したクラスターで実行されているサービスを一覧表示します。   |
| `ecs:DescribeContainerInstances` | Amazon ECS コンテナインスタンスについて説明します。                     |

#### Agent をデーモンサービスとして実行

Datadog Agent は、各 EC2 インスタンス上の 1 つのコンテナーで実行するのが理想的です。最も簡単なのは、Datadog Agent を[デーモン サービス][13]として実行する方法です。

##### Datadog の ECS タスクを使用して、AWS でデーモンサービスをスケジューリングする

1. AWS コンソールにログインし、ECS クラスターページに移動します。Agent を実行するクラスターをクリックします。
2. 新しいサービスを作成するには、「サービス」で **Create** ボタンをクリックします。
3. 起動タイプに EC2 を選択し、先に作成したタスク定義を選択します。
4. サービスタイプに `DAEMON` を選択し、サービス名を入力したら **Next** をクリックします。
5. サービスは各インスタンスで 1 度しか実行されないため、ロードバランサーは不要です。選択せずに **Next** をクリックします。
6. デーモンサービスはオートスケーリングを必要としないので、**Next Step** の後に **Create Service** をクリックします。

#### 実行中のサービスを動的に検出しモニタリング

ECS および Docker を併用して Datadog の[オートディスカバリー][14]を実行すると、環境内で実行中のタスクを自動的に検出して監視できます。

#### AWSVPC モード

Agent バージョン 6.10 以降は、ホストインスタンスのセキュリティグループが関連するポート上の適用可能なコンテナに到達できるよう、セキュリティグループが設定されている場合には、適用可能なコンテナに `awsvpc` モードが対応しています。

Agent を `awsvpc` モードで実行することは可能ですが、これは推奨されるセットアップではありません。Agent を DogStatsD メトリクスや APM トレースに到達させるための ENI IP を取得することが難しい可能性があるからです。
代わりに、ブリッジモードで Agent をポートマッピングとともに実行すると、 [メタデータサーバを介するホスト IP][6] を簡単に取得できます。

### プロセスの収集

以下の方法で、コンテナの処理情報を収集し Datadog に送信します。

{{< tabs >}}
{{% tab "Linux" %}}

1. [前述の手順](#aws-cli)に従い Datadog Agent をインストールします。
2. 次の構成で [datadog-agent-ecs.json][1] ファイル (オリジナルの Amazon Linux AMI を使用している場合は [datadog-agent-ecs1.json][2]) を更新します。

```json
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

[1]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[2]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json
{{% /tab %}}
{{% tab "Windows" %}}

1. [前述の手順](#aws-cli)に従い Datadog Agent をインストールします。
2. 次の構成を使用して [datadog-agent-ecs-win.json][1] ファイルを更新します。

```json
{
  "containerDefinitions": [
    (...)
      "environment": [
        (...)
        {
          "name": "DD_PROCESS_AGENT_ENABLED",
          "value": "true"
        }
      ]
    }
  ],
  "family": "datadog-agent-task"
}
```

[1]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs-win.json
{{% /tab %}}
{{< /tabs >}}

### ネットワークパフォーマンスモニタリングの収集 (Linux のみ)

 1. [前述の手順](#aws-cli)に従い Datadog Agent をインストールします。
  - 初めてインストールする場合は `datadog-agent-ecs.json` ファイル、[datadog-agent-sysprobe-ecs.json][15] (オリジナルの Amazon Linux AMI を使用している場合は [datadog-agent-sysprobe-ecs1.json][16]) を使用できます。使用方法については、[上記の指示](#AWS-cli)に従ってください。AWS UI では `linuxParameters` を追加できないため、初回の NPM セットアップでは CLI が必要です。
 2. タスク定義がすでに存在する場合は、次のコンフィギュレーションで [datadog-agent-ecs.json][17] ファイル (オリジナルの Amazon Linux AMI を使用している場合は [datadog-agent-ecs1.json][18]) を更新します。

 ```json
 {
   "containerDefinitions": [
     (...)
       "mountPoints": [
         (...)
         {
           "containerPath": "/sys/kernel/debug",
           "sourceVolume": "debug"
         },
         (...)
       ],
       "environment": [
         (...)
         {
           "name": "DD_SYSTEM_PROBE_ENABLED",
           "value": "true"
         }
       ],
       "linuxParameters": {
        "capabilities": {
          "add": [
            "SYS_ADMIN",
            "SYS_RESOURCE",
            "SYS_PTRACE",
            "NET_ADMIN"
          ]
        }
      },
   ],
   "requiresCompatibilities": [
    "EC2"
   ],
   "volumes": [
     (...)
     {
      "host": {
        "sourcePath": "/sys/kernel/debug"
      },
      "name": "debug"
     },
     (...)
   ],
   "family": "datadog-agent-task"
 }
 ```

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][19]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[2]: https://docs.datadoghq.com/ja/integrations/faq/agent-5-amazon-ecs/
[3]: https://docs.datadoghq.com/ja/agent/docker/integrations/?tab=docker
[4]: https://docs.datadoghq.com/ja/integrations/ecs_fargate/
[5]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_GetStarted_EC2.html
[6]: /ja/agent/amazon_ecs/apm/
[7]: /ja/developers/dogstatsd/
[8]: /ja/agent/amazon_ecs/logs/
[9]: https://docs.datadoghq.com/ja/tracing/setup/docker/
[10]: https://aws.amazon.com/cli
[11]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#datadog-aws-iam-policy
[12]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_amazonelasticcontainerservice.html
[13]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_daemon
[14]: https://docs.datadoghq.com/ja/agent/autodiscovery/
[15]: https://docs.datadoghq.com/resources/json/datadog-agent-sysprobe-ecs.json
[16]: https://docs.datadoghq.com/resources/json/datadog-agent-sysprobe-ecs1.json
[17]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[18]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json
[19]: https://docs.datadoghq.com/ja/help/