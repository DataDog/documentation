---
algolia:
  tags:
  - ecs
aliases:
- /ja/agent/amazon_ecs/
further_reading:
- link: /agent/amazon_ecs/logs/
  tag: ドキュメント
  text: アプリケーションログの収集
- link: /agent/amazon_ecs/apm/
  tag: ドキュメント
  text: アプリケーショントレースの収集
- link: /agent/amazon_ecs/data_collected/#metrics
  tag: Documentation
  text: ECS メトリクスの収集
- link: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
  tag: ブログ
  text: Amazon ECS Anywhere のサポート開始
- link: https://www.datadoghq.com/blog/cloud-cost-management-container-support/
  tag: blog
  text: Datadog Cloud Cost Management で Kubernetes と ECS の支出を把握する
title: Amazon ECS
---

## 概要

Amazon ECS は、Docker コンテナに対応する、拡張性とパフォーマンスに優れたコンテナオーケストレーションサービスです。Datadog Agent を使用すると、クラスター内のすべての EC2 インスタンスの ECS コンテナおよびタスクを監視できます。

<div class="alert alert-info">
<strong>Fargate 上の ECS</strong> を監視したい場合は、<a href="/integrations/ecs_fargate/">AWS Fargate 上の Amazon ECS</a>を参照してください。
</div>

## セットアップ

ECS コンテナおよびタスクを監視するには、ECS クラスター内の**各 EC2 インスタンスに一度**、Datadog Agent をコンテナとしてデプロイします。これは、Datadog Agent コンテナ用のタスク定義を作成し、それをデーモンサービスとしてデプロイすることで実現します。各 Datadog Agent コンテナは、それぞれの EC2 インスタンス上の他のコンテナを監視します。

以下の説明は、EC2クラスターが構成済みであることを前提としています。[クラスター作成に関する Amazon ECS のドキュメント][4]を参照してください。

1. [ECS タスク定義の作成と追加][27]
2. [Datadog Agent をデーモンサービスとしてスケジュール][28]
3. (オプション) [Datadog Agent のその他の機能の設定][29]

**注:** ECS および Docker を併用して Datadog の[オートディスカバリー][5]を実行すると、環境内で実行中のタスクを自動的に検出して監視できます。

### ECS タスク定義の作成

この [ECS タスク定義][30]は、必要な構成で Datadog Agent コンテナを起動します。Agent の構成を変更する必要がある場合、このタスク定義を更新し、デーモンサービスを再デプロイします。このタスク定義は、AWS Management Console または [AWS CLI][9] を使用して構成することができます。

以下のサンプルは、コアインフラストラクチャーを監視するための最小限の構成です。しかし、様々な機能を有効にした追加のタスク定義のサンプルが [Agent の追加機能の設定](#setup-additional-agent-features)のセクションで提供されていますので、それらを代わりに使用することができます。

#### タスク定義ファイルの作成と管理

1. Linux コンテナの場合、[datadog-Agent-ecs.json][20] をダウンロードします。
    - Amazon Linux 1 (AL1、旧 Amazon Linux AMI) 使用している場合は、[datadog-agent-ecs1.json][21] を使用します。
    - Windows を使用している場合は、[datadog-agent-ecs-win.json][22] を使用します。

   <div class="alert alert-info">
   These files provide minimal configuration for core infrastructure monitoring. For more sample task definition files with various features enabled, see the <a href="#set-up-additional-agent-features">Set up additional Agent features</a> section on this page.
   </div>
2. ベースとなるタスク定義ファイルを編集します。
    - `<YOUR_DATADOG_API_KEY>` をアカウントの [Datadog API キー][14]に置き換えて、`DD_API_KEY` 環境変数を設定します。または、[AWS Secrets Manager に保管されたシークレットの ARN を指定][16]することもできます。
    - ご利用の [Datadog サイト][13]を `DD_SITE` 環境変数に設定します。サイトは次のとおりです: {{< region-param key="dd_site" code="true" >}}

      <div class="alert alert-info">
      If <code>DD_SITE</code> is not set, it defaults to the <code>US1</code> site, <code>datadoghq.com</code>.
      </div>
    - オプションで、`DD_TAGS` 環境変数を追加して、追加のタグを指定します。

3. (オプション) [ECS Anywhere クラスター][15]にデプロイするには、ECS タスク定義に以下の行を追加します。
    ```json
    "requiresCompatibilities": ["EXTERNAL"]
    ```

4. (オプション) Agent ヘルスチェックを追加するには、ECS タスク定義に以下の行を追加します。
    ```json
    "healthCheck": {
      "retries": 3,
      "command": ["CMD-SHELL","agent health"],
      "timeout": 5,
      "interval": 30,
      "startPeriod": 15
    }
    ```


#### タスク定義の登録

{{< tabs >}}
{{% tab "AWS CLI" %}}
タスク定義ファイルを作成したら、以下のコマンドを実行して、ファイルを AWS に登録します。

```bash
aws ecs register-task-definition --cli-input-json file://<path to datadog-agent-ecs.json>
```
{{% /tab %}}
{{% tab "Web UI" %}}
タスク定義ファイルを作成したら、AWS コンソールを使用してファイルを登録します。
1. AWS コンソールにログインし、Elastic コンテナサービス セクションに移動します。
2. ナビゲーションペインで **Task Definitions** を選択します。**Create new task definition** メニューで、**Create new task definition with JSO** を選択します。
3. JSON エディターボックスに、タスク定義ファイルの内容を貼り付けます。
4. **Create** を選択します。

{{% /tab %}}
{{< /tabs >}}


### Agent を Daemon サービスとして実行

各 EC2 インスタンスで 1 つの Datadog Agent コンテナを実行させるには、Datadog Agent タスク定義を[デーモンサービス][10]として実行します。

#### Datadog の ECS タスクを使用して、AWS でDaemon サービスをスケジューリング

1. AWS コンソールにログインし、ECS セクションに移動します。**Clusters** ページで Agent を実行するクラスターを選択します。
2. クラスターの **Services** タブ で、**Create** を選択します。
3. **Deployment configuration** の **Service type** で **Daemon** を選択します。
3. 負荷分散やオートスケーリングの構成は不要です。
4. ""Next Step**、**Create Service** の順にクリックします。

### Agent のその他の機能の設定

上記セクションのタスク定義ファイルは最小限のものです。これらのファイルは、ECS クラスター内のコンテナに関するコアメトリクスを収集するための基本構成を持つ Agent コンテナをデプロイします。この Agent は、コンテナ上で発見された [Docker ラベルに基づいて][12]、Agent インテグレーションを実行することも可能です。

その他の機能について

#### APM
[APM セットアップドキュメント][6]とサンプル [datadog-agent-ecs-apm.json][23] を参照してください。

#### Log Management
[ログ収集ドキュメント][7]とサンプル [datadog-agent-ecs-logs.json][24] を参照してください。

#### DogStatsD

[DogStatsD][8] を使用している場合は、Datadog Agent のコンテナ定義を編集して、8125/udp 用のホストポートマッピングを追加し、環境変数 `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` を `true` に設定します。

{{< highlight json "hl_lines=6-12 23-24" >}}
{
 "containerDefinitions": [
  {
   "name": "datadog-agent",
   (...)
   "portMappings": [
     {
      "hostPort": 8125,
      "protocol": "udp",
      "containerPort": 8125
     }
   ],
   "environment" : [
     {
       "name": "DD_API_KEY",
       "value": "<YOUR_DATADOG_API_KEY>"
     },
     {
       "name": "DD_SITE",
       "value": "datadoghq.com"
     },
     {
       "name": "DD_DOGSTATSD_NON_LOCAL_TRAFFIC",
       "value": "true"
     }
   ]
  }
 ],
 (...)
}
{{< /highlight >}}

この設定により、DogStatsD のトラフィックは、アプリケーションコンテナからホストとホストポートを経由して、Datadog Agent コンテナにルーティングされるようになります。ただし、アプリケーションコンテナは、このトラフィックにホストのプライベート IP アドレスを使用する必要があります。これは、環境変数 `DD_AGENT_HOST` に EC2 インスタンスのプライベート IP アドレスを設定することで有効になり、アドレスはインスタンスメタデータサービス (IMDS) から取得することができます。また、初期化時にコードで設定することもできます。DogStatsD の実装は APM と同じで、Agent のエンドポイントの設定例については [Trace Agent のエンドポイントを構成する][17]を参照してください。

EC2 インスタンスのセキュリティグループ設定で、APM と DogStatsD のポートが公に公開されていないことを確認します。

#### プロセスの収集

すべてのコンテナのライブプロセス情報を収集し、Datadog に送信するには、`DD_PROCESS_AGENT_ENABLED` 環境変数を使用してタスク定義を更新します。

{{< highlight json "hl_lines=16-17" >}}
{
 "containerDefinitions": [
  {
   "name": "datadog-agent",
   (...)
   "environment" : [
     {
       "name": "DD_API_KEY",
       "value": "<YOUR_DATADOG_API_KEY>"
     },
     {
       "name": "DD_SITE",
       "value": "datadoghq.com"
     },
     {
       "name": "DD_PROCESS_AGENT_ENABLED",
       "value": "true"
     }
   ]
  }
 ],
 (...)
}
{{< /highlight >}}

#### ネットワークパフォーマンス監視

<div class="alert alert-danger">
この機能は Linux でのみ利用可能です。
</div>

サンプルの [Datadog-Agent-sysprobe-ecs.json][25] ファイルを参照してください。

Amazon Linux 1 (AL1、旧 Amazon Linux AMI) 使用している場合は、[datadog-agent-sysprobe-ecs1.json][26] を参照してください。

すでにタスク定義がある場合は、次の構成を追加してファイルを更新します。

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
           "name": "DD_SYSTEM_PROBE_NETWORK_ENABLED",
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
#### ネットワークパス

<div class="alert alert-info">Datadog Network Performance Monitoring の Network Path はプレビュー中です。登録をご希望の場合は、Datadog の担当者にお問い合わせください。</div>

1. ECS クラスターで [Network Path][31] を有効にするには、`datadog-agent-sysprobe-ecs.json` ファイルに以下の環境変数を追加して、`system-probe` の traceroute モジュールを有効にします。

   ```json
      "environment": [
        (...)
        {
          "name": "DD_TRACEROUTE_ENABLED",
          "value": "true"
        }
      ],
   ```

2. 個別のパスを監視するには、[追加の Agent 機能を設定](#set-up-additional-agent-features)するための手順に従ってください：

   これらのファイルは、ECS クラスター内のコンテナに関するコアメトリクスを収集するための基本構成を持つ Agent コンテナをデプロイします。Agent は、コンテナ上で発見された Docker ラベルに基づいて Agent インテグレーションを実行することも可能です。

3. エンドポイントを手動で指定することなく、ネットワークトラフィックパスを監視し、Agent が実際のネットワークトラフィックに基づいてネットワークパスを自動的に発見および監視できるようにするには、`datadog-agent-sysprobe-ecs.json` に以下の追加の環境変数を追加します。

   ```json
      "environment": [
        (...)
        {
          "name": "DD_NETWORK_PATH_CONNECTIONS_MONITORING_ENABLED",
          "value": "true"
        }
      ],
   ```

4. オプションとして、ワーカーの数 (デフォルトは 4) を構成するには、`datadog-agent-sysprobe-ecs.json` ファイル内の以下の環境変数を調整します。

   ```json
      "environment": [
        (...)
        {
          "name": "DD_NETWORK_PATH_COLLECTOR_WORKERS",
          "value": "10"
        }
      ],
   ```
## AWSVPC モード

Agent バージョン 6.10 以降は、ホストインスタンスのセキュリティグループが関連するポート上の適用可能なコンテナに到達できるよう、セキュリティグループが設定されている場合には、適用可能なコンテナに `awsvpc` モードが対応しています。

Agent を `awsvpc` モードで実行することは可能ですが、Datadog はこれを推奨していません。Agent に到達して DogStatsD メトリクスや APM トレースを取得するための ENI IP を取得することが難しい可能性があるからです。代わりに、Agent をブリッジモードでポートマッピングとともに実行すると、 [メタデータサーバを介してホスト IP][6] をより簡単に取得できます。

{{% site-region region="gov" %}}
#### 行政機関の環境向けの Datadog 用 FIPSプロキシ

<div class="alert alert-danger">
この機能は Linux でのみ利用可能です。
</div>

行政機関のサイトで Datadog にデータを送信するには、`fips-proxy` サイドカーコンテナを追加し、コンテナ ポートを開いて、[サポートされている機能][1]が適切に通信を行えるようにします。

**注**: サイドカーコンテナが適切なネットワーク設定と IAM 権限で構成されていることも確認する必要があります。

```json
 {
   "containerDefinitions": [
     (...)
          {
            "name": "fips-proxy",
            "image": "datadog/fips-proxy:1.1.5",
            "portMappings": [
                {
                    "containerPort": 9803,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9804,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9805,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9806,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9807,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9808,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9809,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9810,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9811,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9812,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9813,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9814,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9815,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9816,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9817,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9818,
                    "protocol": "tcp"
                }
            ],
            "essential": true,
            "environment": [
                {
                    "name": "DD_FIPS_PORT_RANGE_START",
                    "value": "9803"
                },
                {
                    "name": "DD_FIPS_LOCAL_ADDRESS",
                    "value": "127.0.0.1"
                }
            ]
        }
   ],
   "family": "datadog-agent-task"
}
```

また、Datadog Agent のコンテナの環境変数を更新して、FIPS プロキシを介したトラフィックの送信を可能にする必要があります。

```json
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            "image": "public.ecr.aws/datadog/agent:latest",
            (...)
            "environment": [
              (...)
                {
                    "name": "DD_FIPS_ENABLED",
                    "value": "true"
                },
                {
                    "name": "DD_FIPS_PORT_RANGE_START",
                    "value": "9803"
                },
                {
                    "name": "DD_FIPS_HTTPS",
                    "value": "false"
                },
             ],
        },
    ],
   "family": "datadog-agent-task"
}
```
[1]: https://docs.datadoghq.com/ja/agent/configuration/agent-fips-proxy/?tab=helmonamazoneks#supported-platforms-and-limitations
{{% /site-region %}}

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[4]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-ec2-cluster-console-v2.html
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
[17]: /ja/containers/amazon_ecs/apm/?tab=ec2metadataendpoint#configure-the-trace-agent-endpoint
[20]: /resources/json/datadog-agent-ecs.json
[21]: /resources/json/datadog-agent-ecs1.json
[22]: /resources/json/datadog-agent-ecs-win.json
[23]: /resources/json/datadog-agent-ecs-apm.json
[24]: /resources/json/datadog-agent-ecs-logs.json
[25]: /resources/json/datadog-agent-sysprobe-ecs.json
[26]: /resources/json/datadog-agent-sysprobe-ecs1.json
[27]: #create-an-ecs-task-definition
[28]: #run-the-agent-as-a-daemon-service
[29]: #set-up-additional-agent-features
[30]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html
[31]: /ja/network_monitoring/network_path