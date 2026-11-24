---
algolia:
  tags:
  - ecs
aliases:
- /ja/agent/amazon_ecs/
description: Amazon Elastic Container Service に Datadog Agent をインストールして構成する
further_reading:
- link: https://www.datadoghq.com/blog/ecs-managed-instances
  tag: ブログ
  text: Datadog で ECS マネージドインスタンスを監視する
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
- link: https://www.datadoghq.com/blog/cloud-cost-management-container-support/
  tag: ブログ
  text: Datadog Cloud Cost Management で Kubernetes と ECS の支出を把握する
- link: https://www.datadoghq.com/blog/ecs-default-monitors/
  tag: ブログ
  text: デフォルトのモニターと ECS エクスプローラーを使用して、ECS の問題をより迅速に検出して修正する
- link: https://www.datadoghq.com/architecture/using-datadog-with-ecs-fargate/
  tag: Architecture Center
  text: ECS Fargate での Datadog の使用
title: Amazon ECS
---
## 概要 {#overview}

Amazon ECS は、Docker コンテナをサポートするスケーラブルで高性能なコンテナオーケストレーションサービスです。Datadog Agent を使用すると、クラスター内のすべての EC2 インスタンスで ECS コンテナとタスクを監視できます。

Amazon ECS を Datadog で構成するには、**Fleet Automation** を使用するか、**手動でインストール**します。手動でインストールする場合は、Datadog Agent タスク定義を作成してデーモンサービスとしてデプロイすることにより、Amazon EC2 ホストごとに 1 つの Agent コンテナを実行します。各 Agent は、そのホスト上の他のコンテナを監視することになります。詳細については、[手動でインストール](#install-manually)セクションを参照してください。


## Fleet Automation セットアップ {#fleet-automation-setup}
ECS でのセットアップを完了するには、[Fleet Automation のアプリ内インストールガイド][32] に従ってください。アプリ内ガイドで概説されている手順を完了すると、[Fleet Automation][33] が API キーを事前注入した、すぐに使用できるタスク定義または CloudFormation テンプレートを生成します。

{{< img src="agent/basic_agent_usage/ecs_install_page.png" alt="ECS に Datadog Agent をインストールするためのアプリ内手順。" style="width:90%;">}}

<div class="alert alert-info">
<strong>Fargate 上の ECS</strong> を監視する場合は、<a href="/integrations/ecs_fargate/">AWS Fargate 上の Amazon ECS</a> を参照してください。
</div>

<br>

## 手動セットアップ {#manual-setup}

ECS コンテナとタスクを監視するには、Datadog Agent をコンテナとして、ECS クラスター内の **各 EC2 インスタンスで 1 回**デプロイします。これを行うには、Datadog Agent コンテナのタスク定義を作成し、それをデーモンサービスとしてデプロイします。各 Datadog Agent コンテナは、それぞれの EC2 インスタンス上の他のコンテナを監視します。

以下の手順は、EC2 クラスターを構成済みであることを前提としています。[クラスター作成に関する Amazon ECS ドキュメント][4] を参照してください。

1. [ECS タスク定義の作成と追加][27]
2. [Datadog Agent をデーモンサービスとしてスケジュール][28]
3. (オプション) [Datadog Agent のその他の機能の設定][29]

**注:** ECS および Docker と併用して Datadog の [Autodiscovery][5] を使用すると、環境内で稼働中のタスクを自動的に検出して監視することができます。

{{% site-region region="gov,gov2" %}}
## FIPS コンプライアンス {#fips-compliance}

FIPS コンプライアンスについては、一部のセットアップ手順が異なります。[FIPS コンプライアンス][32] ドキュメントの具体的なセットアップ手順を考慮してください。

[32]: /ja/agent/configuration/fips-compliance/
{{% /site-region %}}

### ECS タスク定義の作成 {#create-an-ecs-task-definition}

この [ECS タスク定義][30] は、必要な構成で Datadog Agent コンテナを起動します。Agent の構成を変更する必要がある場合は、このタスク定義を更新してデーモンサービスを再デプロイしてください。AWS マネジメントコンソールまたは [AWS CLI][9] を使用して、このタスク定義を構成できます。

以下のサンプルは、コア インフラストラクチャー監視のための最小限の構成です。ただし、他の機能を使用したい場合は、[Agent のその他の機能の設定](#setup-additional-agent-features)セクションに、さまざまな機能が有効化された追加のタスク定義サンプルが用意されています。

#### タスク定義ファイルの作成と管理 {#create-and-manage-the-task-definition-file}

1. Linux コンテナの場合、[datadog-agent-ecs.json][20] をダウンロードします。
    - Amazon Linux 1 (AL1、旧 Amazon Linux AMI) を使用している場合は、[datadog-agent-ecs1.json][21] を使用します
    - Windows を使用している場合は、[datadog-agent-ecs-win.json][22] を使用します

   <div class="alert alert-info">
   これらのファイルは、コア インフラストラクチャー監視のための最小限の構成を提供します。さまざまな機能が有効化されたその他のタスク定義ファイルのサンプルについては、このページの <a href="#set-up-additional-agent-features">Agent のその他の機能の設定</a>セクションを参照してください。
   </div>
2. ベースとなるタスク定義ファイルを編集します
    - `DD_API_KEY` 環境変数を、`<YOUR_DATADOG_API_KEY>` をアカウントの [Datadog API キー][14] に置き換えることで設定します。または、[AWS Secrets Manager に保存されているシークレットの ARN を指定する][16]こともできます。
    - `DD_SITE` 環境変数を、ご使用の [Datadog サイト][13] に設定します。サイトは以下のとおりです。{{< region-param key="dd_site" code="true" >}}

      <div class="alert alert-info">
      If <code>DD_SITE</code> is not set, it defaults to the <code>US1</code> site, <code>datadoghq.com</code>.
      </div>
    - Optionally, add a `DD_TAGS` environment variable to specify any additional tags.

3. (オプション) [ECS Anywhere クラスター][15] にデプロイするには、ECS タスク定義に以下の行を追加します。
    ```json
    "requiresCompatibilities": ["EXTERNAL"]
    ```

4. (オプション) Datadog Agent ヘルスチェックを追加するには、ECS タスク定義に以下の行を追加します。
    ```json
    "healthCheck": {
      "retries": 3,
      "command": ["CMD-SHELL","agent health"],
      "timeout": 5,
      "interval": 30,
      "startPeriod": 15
    }
    ```


#### タスク定義の登録{#register-the-task-definition}

{{< tabs >}}
{{% tab "AWS CLI" %}}
タスク定義ファイルを作成したら、以下のコマンドを実行して、ファイルを AWS に登録します。

```bash
aws ecs register-task-definition --cli-input-json file://<path to datadog-agent-ecs.json>
```
{{% /tab %}}
{{% tab "Web UI" %}}
タスク定義ファイルを作成したら、AWS コンソールを使用してファイルを登録します。
1. AWS コンソールにログインし、Elastic Container Service セクションに移動します。
2. ナビゲーションペインで [{{< ui >}}Task Definitions{{< /ui >}}] を選択します。[{{< ui >}}Create new task definition{{< /ui >}}] (新しいタスク定義の作成) メニューで、[{{< ui >}}Create new task definition with JSON{{< /ui >}}] (JSON で新しいタスク定義を作成する) を選択します。
3. JSON エディターボックスに、タスク定義ファイルの内容を貼り付けます。
4. [{{< ui >}}Create{{< /ui >}}] を選択します。

{{% /tab %}}
{{< /tabs >}}


### Agent を Daemon サービスとして実行{#run-the-agent-as-a-daemon-service}

各 EC2 インスタンスで 1 つの Datadog Agent コンテナを実行させるには、Datadog Agent タスク定義を[デーモンサービス][10]として実行します。

#### Datadog の ECS タスクを使用して、AWS で Daemon サービスをスケジュール{#schedule-a-daemon-service-in-aws-using-datadogs-ecs-task}

{{< tabs >}}
{{% tab "AWS CLI" %}}
AWS CLI を使用して、前のステップで登録したタスク定義から Daemon サービスを作成します。

```bash
aws ecs create-service \
    --cluster <CLUSTER_NAME> \
    --service-name datadog-agent \
    --task-definition <TASK_FAMILY> \
    --scheduling-strategy DAEMON \
    --launch-type EC2 \
    --region <AWS_REGION>
```
{{% /tab %}}
{{% tab "Web UI" %}}
1. AWS コンソールにログインし、ECS セクションに移動します。[{{< ui >}}Clusters{{< /ui >}}] ページで、Agent を実行するクラスターを選択します。
2. クラスターの [{{< ui >}}Services{{< /ui >}}] タブで、[{{< ui >}}Create{{< /ui >}}] を選択します。
3. {{< ui >}}Service name{{< /ui >}} に `datadog-agent` と入力します。
4. [{{< ui >}}Deployment configuration{{< /ui >}}] で、[{{< ui >}}Service type{{< /ui >}}] に対して [{{< ui >}}Daemon{{< /ui >}}] を選択します。
5. 負荷分散やオートスケーリングの構成は不要です。
6. [{{< ui >}}Next Step{{< /ui >}}]、続いて [{{< ui >}}Create Service{{< /ui >}}] をクリックします。
{{% /tab %}}
{{< /tabs >}}

### Agent のその他の機能の設定 {#set-up-additional-agent-features}

前のセクションで提供されたタスク定義ファイルは最小限のものです。これらのファイルは、ECS クラスター内のコンテナに関するコアメトリクスを収集するための基本構成で Agent コンテナをデプロイします。Agent は、コンテナ上で検出された [Docker ラベルに基づく][12] Agent インテグレーションを実行することもできます。

その他の機能について

#### APM {#apm}
[APM セットアップドキュメント][6] とサンプル [datadog-agent-ecs-apm-uds.json][23] を参照してください。

#### Log Management {#log-management}
[ログ収集ドキュメント][7] とサンプル [datadog-agent-ecs-logs.json][24] を参照してください。

#### DogStatsD {#dogstatsd}

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

この設定により、DogStatsD トラフィックをアプリケーションコンテナから、ホストおよびホストポートを経由して、Datadog Agent コンテナにルーティングできるようになります。ただし、アプリケーションコンテナが、このトラフィック用のホストのプライベート IP アドレスを使用する必要があります。これは、環境変数 `DD_AGENT_HOST` を EC2 インスタンスのプライベート IP アドレスに設定することで有効にできます。このアドレスは、Instance Metadata Service (IMDS) から取得できます。あるいは、初期化時にコード内でこれを設定することも可能です。DogStatsD の実装は APM の場合と同じです。Trace Agent エンドポイントの設定例については、[Trace Agent エンドポイントを構成する][17] を参照してください。

EC2 インスタンスのセキュリティグループ設定で、APM と DogStatsD のポートが公に公開されていないことを確認します。

#### プロセス収集 {#process-collection}

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

#### Cloud Network Monitoring {#cloud-network-monitoring}

<div class="alert alert-danger">
この機能は、Linux でのみ使用可能です。
</div>

サンプルの [Datadog-Agent-sysprobe-ecs.json][25] ファイルを参照してください。

Amazon Linux 1 (AL1、旧 Amazon Linux AMI) を使用している場合は、[datadog-agent-sysprobe-ecs1.json][26] を参照してください。

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
#### Network Path {#network-path}

1. ECS クラスターで [Network Path][31] を有効にするには、`datadog-agent-sysprobe-ecs.json` ファイルに以下の環境変数を追加して、`system-probe` traceroute モジュールを有効にします。

   ```json
      "environment": [
        (...)
        {
          "name": "DD_TRACEROUTE_ENABLED",
          "value": "true"
        }
      ],
   ```

2. 個別のパスを監視するには、こちらの手順に従って[Agent のその他の機能を設定してください](#set-up-additional-agent-features)。

   これらのファイルは、ECS クラスター内のコンテナに関するコアメトリクスを収集するための基本構成で Agent コンテナをデプロイします。Agent は、コンテナ上で検出された Docker ラベルに基づく Agent インテグレーションを実行することもできます。

3. エンドポイントを手動で指定することなく、Network Path を監視し、Agent が実際のネットワークトラフィックに基づいて Network Path を自動的に発見および監視できるようにするには、`datadog-agent-sysprobe-ecs.json` に以下の追加の環境変数を追加します。

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
## AWSVPC モード {#awsvpc-mode}

Agent バージョン 6.10 以降では、アプリケーション関連コンテナに対して `awsvpc` モードがサポートされています。ただし、ホストインスタンスのセキュリティグループが関連するポート上のアプリケーション関連コンテナに到達できるよう、セキュリティグループが設定されていることが条件です。

Agent を `awsvpc` モードで実行することは可能ですが、DogStatsD メトリクスや APM トレースのために Agent に到達するための ENI IP の取得が困難になる可能性があるため、Datadog では推奨していません。代わりに、ブリッジモードで Agent をポートマッピングとともに実行すると、[メタデータサーバーを介するホスト IP][6] を簡単に取得できます。

## トラブルシューティング{#troubleshooting}

サポートが必要な場合は、[Datadog サポート][11] にお問い合わせください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[4]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-ec2-cluster-console-v2.html
[5]: https://docs.datadoghq.com/ja/agent/autodiscovery/
[6]: /ja/containers/amazon_ecs/apm/
[7]: /ja/containers/amazon_ecs/logs/
[8]: /ja/extend/dogstatsd/?tab=containeragent
[9]: https://aws.amazon.com/cli
[10]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_daemon
[11]: https://docs.datadoghq.com/ja/help/
[12]: https://docs.datadoghq.com/ja/containers/docker/integrations/?tab=docker
[13]: /ja/getting_started/site/
[14]: https://app.datadoghq.com/organization-settings/api-keys
[15]: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
[16]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[17]: /ja/containers/amazon_ecs/apm/?tab=ec2metadataendpoint#configure-the-trace-agent-endpoint
[20]: /ja/resources/json/datadog-agent-ecs.json
[21]: /ja/resources/json/datadog-agent-ecs1.json
[22]: /ja/resources/json/datadog-agent-ecs-win.json
[23]: /ja/resources/json/datadog-agent-ecs-apm.json
[24]: /ja/resources/json/datadog-agent-ecs-logs.json
[25]: /ja/resources/json/datadog-agent-sysprobe-ecs.json
[26]: /ja/resources/json/datadog-agent-sysprobe-ecs1.json
[27]: #create-an-ecs-task-definition
[28]: #run-the-agent-as-a-daemon-service
[29]: #set-up-additional-agent-features
[30]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html
[31]: /ja/network_monitoring/network_path
[32]: https://app.datadoghq.com/fleet/install-agent/latest?platform=ecs
[33]: https://app.datadoghq.com/fleet/install-agent/latest?platform=ecs