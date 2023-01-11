---
aliases:
- /ja/integrations/amazon_ecs/
- /ja/agent/amazon_ecs/
further_reading:
- link: /agent/amazon_ecs/logs/
  tag: ドキュメント
  text: アプリケーションログの収集
- link: /agent/amazon_ecs/apm/
  tag: ドキュメント
  text: アプリケーショントレースの収集
- link: /agent/amazon_ecs/data_collected/#metrics
  tag: ドキュメント
  text: ECS メトリクスの収集
- link: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
  tag: ブログ
  text: Amazon ECS Anywhere のサポート開始
kind: documentation
title: Amazon ECS
---

## 概要

Amazon ECS は、Docker コンテナに対応する、拡張性とパフォーマンスに優れたコンテナオーケストレーションサービスです。Datadog Agent と使用すると、クラスター内のすべての EC2 インスタンスの ECS コンテナおよびタスクを監視できます。

このページは Datadog コンテナ Agent を使用した Amazon ECS のセットアップについて説明します。他のセットアップについては、以下を参照してください。

- [Amazon ECS 向け Datadog Container Agent v5 のセットアップ][1]
- [オートディスカバリーを使用した Datadog Host Agent のセットアップ][2]

**注**: **ECS on Fargate** をセットアップする場合は、[Amazon ECS on AWS Fargate][3] の手順を参照してください。EC2 インスタンスにデプロイされた Datadog Agent コンテナは、Fargate Tasks を監視することはできません。また、AWS Batch はサポートされていません。

## セットアップ

ECS の Datadog Agent は、ECS クラスター内の各 EC2 インスタンスに一度、コンテナとしてデプロイする必要があります。これは、Datadog Agent コンテナ用のタスク定義を作成し、それをデーモンサービスとしてデプロイすることで実現します。各 Datadog Agent コンテナは、それぞれの EC2 インスタンス上の他のコンテナを監視します。

稼働中の EC2 Container Service クラスターが構成されていない場合は、[ECS ドキュメント内の Getting Started セクション][4]を参照してクラスターを設定、構成します。構成したら、下記のセットアップ手順に従います。

1. [ECS タスク定義の作成と追加](#create-an-ecs-task)
2. [Datadog Agent を Daemon サービスとしてスケジュール](#run-the-agent-as-a-daemon-service)
3. **オプション** [Datadog Agent の追加機能の設定](#setup-additional-agent-features)

**注:** ECS および Docker を併用して Datadog の[オートディスカバリー][5]を実行すると、環境内で実行中のタスクを自動的に検出して監視できます。

### ECS タスクの作成

タスク定義は、必要な構成で Datadog Agent コンテナを起動します。Agent の構成を変更する必要がある場合、このタスク定義を更新し、必要に応じてデーモンサービスを再デプロイします。タスク定義は、[AWS CLI ツール][9]または Amazon Web Console のいずれかを使用して構成することができます。

以下のサンプルは、コアインフラストラクチャーを監視するための最小限の構成です。しかし、様々な機能を有効にした追加のタスク定義のサンプルが [Agent の追加機能の設定](#setup-additional-agent-features)のセクションで提供されていますので、それらを代わりに使用することができます。

#### タスク定義ファイルの管理

1. Linux コンテナの場合、[datadog-Agent-ecs.json][20] をダウンロードします。
    1. オリジナルの Amazon Linux 1 AMI を使用している場合は、[datadog-agent-ecs1.json][21] を使用します。
    2. Windows を使用している場合は、[datadog-Agent-ecs-win.json][22] を使用します。

2. ベースとなるタスク定義ファイルを編集する
    1. `<YOUR_DATADOG_API_KEY>` にアカウントの [Datadog API キー][14] を設定します。
    2. 環境変数 `DD_SITE` に {{< region-param key="dd_site" code="true" >}} を設定します。

        **注**: `DD_SITE` 環境変数が明示的に設定されていない場合、値はデフォルトで `US` サイトの `datadoghq.com` に設定されます。その他のサイト (`EU`、`US3`、または `US1-FED`) のいずれかを使用しており、これを設定しない場合は、API キーのメッセージが無効になります。[ドキュメントのサイト選択ドロップダウン][13]を使用して、使用中のサイトに適したドキュメントを確認してください。

3. オプション - 以下を ECS タスクの定義に追加して [ECS Anywhere クラスター][15]にデプロイします。
    ```json
    "requiresCompatibilities": ["EXTERNAL"]
    ```

4. オプション - ECS タスク定義に Agent ヘルスチェックを追加する
    ```json
    "healthCheck": {
      "retries": 3,
      "command": ["CMD-SHELL","agent health"],
      "timeout": 5,
      "interval": 30,
      "startPeriod": 15
    }
    ```

これらの例では、環境変数 `DD_API_KEY` に、[AWS Secret Manager に保存されている "Plaintext" シークレットの ARN][16] を参照することで代用することができます。追加のタグは環境変数 `DD_TAGS` によって追加することができます。

#### タスク定義の登録

{{< tabs >}}
{{% tab "AWS CLI" %}}
タスク定義ファイルを作成したら、以下のコマンドを実行して、これを AWS に登録します。

```bash
aws ecs register-task-definition --cli-input-json <path to datadog-agent-ecs.json>
```
{{% /tab %}}
{{% tab "Web UI" %}}
タスク定義ファイルを作成したら、AWS コンソールにログインしてこれを登録することができます。
1. AWS コンソールにログインし、Elastic コンテナサービス セクションに移動します。
2. 左側の **Task Definitions** をクリックし、**Create new Task Definition** ボタンをクリックします。
3. 起動タイプとして "EC2" を選択します。ECS Anywhere クラスターにエージェントタスクをデプロイする場合は、"External" を選択することもできます。
4. "Configure task and container definitions" ページで、一番下までスクロールし、**Configure via JSON** を選択します。ここから、ファイルから構成をコピーアンドペーストすることができます。
5. JSON タブの **Save** をクリックします。
6. このページから、またはこの **Configure via JSON** プロセスを繰り返すことで、追加の変更を行うことができます。
7. 下部の **Create** をクリックすると、このタスク定義が登録されます。

{{% /tab %}}
{{< /tabs >}}


### Agent を Daemon サービスとして実行

理想的には、各 EC2 インスタンス上で 1 つの Datadog Agent コンテナを実行します。これを実現する最も簡単な方法は、Datadog Agent タスク定義を[デーモンサービス][10]として実行することです。

#### Datadog の ECS タスクを使用して、AWS でDaemon サービスをスケジューリング

1. AWS コンソールにログインし、ECS クラスターページに移動します。Agent を実行するクラスターをクリックします。
2. 新しいサービスを作成するには、「サービス」で **Create** ボタンをクリックします。
3. 起動タイプに EC2 を選択し、先に作成したタスク定義を選択します。
4. サービスタイプに `DAEMON` を選択し、サービス名を入力したら **Next** をクリックします。
5. サービスは各インスタンスで 1 度しか実行されないため、ロードバランサーは不要です。選択せずに **Next** をクリックします。
6. デーモンサービスはオートスケーリングを必要としないので、**Next Step** の後に **Create Service** をクリックします。

### Agent の追加機能の設定
上記の最初のタスク定義は、かなり最小限のものです。このタスク定義は、E CSクラスタ内のコンテナに関するコアメトリクスを収集するための基本構成を持つ Agent コンテナをデプロイします。この Agent は、対応するコンテナ上で発見された [Docker オートディスカバリーラベル][12]に基づいて、Agent インテグレーションを実行することも可能です。

もし、
- APM を使用している場合は、[APM セットアップドキュメント][6]とサンプル [datadog-agent-ecs-apm.json][23] を参照してください。
- ログ管理を使用している場合は、[ログ収集ドキュメント][7]とサンプル [datadog-agent-ecs-logs.json][24] を参照してください。

#### DogStatsD
[DogStatsD][8] を使用している場合、以下のように Dataog Agent のコンテナ定義に 8125/udp のホストポートマッピングを追加することができます。
```json
"portMappings": [
  {
    "hostPort": 8125,
    "protocol": "udp",
    "containerPort": 8125
  }
]
```
また、環境変数 `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` を `true` に設定します。

APM と DogStatsD については、EC2 インスタンスのセキュリティグループ設定をダブルチェックしてください。これらのポートが一般に公開されていないことを確認します。Datadog は、ホストのプライベート IP を使用して、アプリケーションコンテナから Datadog Agent コンテナにデータをルーティングすることを推奨しています。

#### プロセスの収集

Live Container のデータは、Datadog Agent コンテナによって自動的に収集されます。全てのコンテナの Live Process 情報を収集し、Datadog に送信するには、環境変数でタスク定義を更新してください。

```json
{
  "name": "DD_PROCESS_AGENT_ENABLED",
  "value": "true"
}
```

#### ネットワークパフォーマンスのモニタリングの収集

**この機能は、Linux でのみ使用可能です**

1. [前述の手順](#create-an-ecs-task)に従い Datadog Agent をインストールします。
   - 初めてインストールする場合は、[datadog-agent-sysprobe-ecs.json][25] ファイル (Amazon Linux オリジナルの AMI を使用している場合は [datadog-agent-sysprobe-ecs1.json][26]) を使用し、[上記の説明](#managing-the-task-definition-file)で利用することが可能です。**注**: NPM の初期設定は、AWS UI で `linuxParameters` を追加できないため、CLI で行う必要があります。
2. タスク定義がすでに存在する場合は、次のコンフィギュレーションで [datadog-agent-ecs.json][20] ファイル (オリジナルの Amazon Linux AMI を使用している場合は [datadog-agent-ecs1.json][21]) を更新します。

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
            "NET_ADMIN",
            "NET_BROADCAST",
            "NET_RAW",
            "IPC_LOCK",
            "CHOWN"
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

## AWSVPC モード

Agent バージョン 6.10 以降は、ホストインスタンスのセキュリティグループが関連するポート上の適用可能なコンテナに到達できるよう、セキュリティグループが設定されている場合には、適用可能なコンテナに `awsvpc` モードが対応しています。

Agent を `awsvpc` モードで実行することは可能ですが、これは推奨されるセットアップではありません。Agent を DogStatsD メトリクスや APM トレースに到達させるための ENI IP を取得することが難しい可能性があるからです。

代わりに、ブリッジモードで Agent をポートマッピングとともに実行すると、[メタデータサーバを介するホスト IP][6] を簡単に取得できます。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/faq/agent-5-amazon-ecs/
[2]: https://docs.datadoghq.com/ja/agent/docker/integrations/?tab=docker
[3]: https://docs.datadoghq.com/ja/integrations/ecs_fargate/
[4]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_GetStarted_EC2.html
[5]: https://docs.datadoghq.com/ja/agent/autodiscovery/
[6]: /ja/containers/amazon_ecs/apm/
[7]: /ja/containers/amazon_ecs/logs/
[8]: /ja/developers/dogstatsd/?tab=containeragent
[9]: https://aws.amazon.com/cli
[10]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_daemon
[11]: https://docs.datadoghq.com/ja/help/
[12]: https://docs.datadoghq.com/ja/containers/docker/integrations/?tab=docker
[13]: /ja/getting_started/site/
[14]: https://app.datadoghq.com/organization-settings/api-keys
[15]: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
[16]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[20]: /resources/json/datadog-agent-ecs.json
[21]: /resources/json/datadog-agent-ecs1.json
[22]: /resources/json/datadog-agent-ecs-win.json
[23]: /resources/json/datadog-agent-ecs-apm.json
[24]: /resources/json/datadog-agent-ecs-logs.json
[25]: /resources/json/datadog-agent-sysprobe-ecs.json
[26]: /resources/json/datadog-agent-sysprobe-ecs1.json