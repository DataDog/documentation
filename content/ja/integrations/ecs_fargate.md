---
"app_id": "aws-fargate"
"app_uuid": "4c298061-c7d2-4ce6-ab3e-5378039de65a"
"assets":
  "dashboards":
    "Amazon Fargate": "assets/dashboards/amazon_fargate_overview.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "ecs.fargate.cpu.user"
      "metadata_path": "metadata.csv"
      "prefix": "ecs."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10033"
    "source_type_name": "Amazon Fargate"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "aws"
- "cloud"
- "containers"
- "network"
- "orchestration"
- "provisioning"
- "tracing"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/ecs_fargate/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "ecs_fargate"
"integration_id": "aws-fargate"
"integration_title": "Amazon ECS on AWS Fargate"
"integration_version": "4.3.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "ecs_fargate"
"public_title": "Amazon ECS on AWS Fargate"
"short_description": "Track metrics for containers running with ECS Fargate"
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::AWS"
  - "Category::Cloud"
  - "Category::Containers"
  - "Category::Network"
  - "Category::Orchestration"
  - "Category::Provisioning"
  - "Category::Tracing"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Track metrics for containers running with ECS Fargate"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Amazon ECS on AWS Fargate"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

<div class="alert alert-warning"> This page describes the ECS Fargate integration. For EKS Fargate, see the documentation for Datadog's <a href="http://docs.datadoghq.com/integrations/eks_fargate">EKS Fargate integration</a>.
</div>

Get metrics from all your containers running in ECS Fargate:

- CPU/Memory usage & limit metrics
- Monitor your applications running on Fargate using Datadog integrations or custom metrics.

The Datadog Agent retrieves metrics for the task definition's containers with the ECS task metadata endpoint. According to the [ECS Documentation][1] on that endpoint:

- This endpoint returns Docker stats JSON for all of the containers associated with the task. For more information about each of the returned stats, see [ContainerStats][2] in the Docker API documentation.

The Task Metadata endpoint is only available from within the task definition itself, which is why the Datadog Agent needs to be run as an additional container within each task definition to be monitored.

The only configuration required to enable this metrics collection is to set an environment variable `ECS_FARGATE` to `"true"` in the task definition.

**Note**: Network Performance Monitoring (NPM) is not supported for ECS Fargate.

## セットアップ

The following steps cover setup of the Datadog Container Agent within AWS ECS Fargate. **Note**: Datadog Agent version 6.1.1 or higher is needed to take full advantage of the Fargate integration.

Tasks that do not have the Datadog Agent still report metrics with Cloudwatch, however the Agent is needed for Autodiscovery, detailed container metrics, tracing, and more. Additionally, Cloudwatch metrics are less granular, and have more latency in reporting than metrics shipped directly through the Datadog Agent.

### インストール

<div class="alert alert-info">You can also monitor AWS Batch jobs on ECS Fargate. See <a href="#installation-for-aws-batch">Installation for AWS Batch</a>.
</div>

Datadog で ECS Fargate タスクを監視するには、アプリケーションコンテナと**同じタスク定義**内のコンテナとして Agent を実行します。Datadog でメトリクスを収集するには、各タスク定義にアプリケーションコンテナのほかに Datadog Agent コンテナを含める必要があります。以下のセットアップ手順を実行します。

1. **ECS Fargate タスクの作成**
2. **IAM ポリシーの作成と修正**
3. **レプリカサービスとしてのタスクの実行**

#### ECS Fargate タスクの作成

Fargate の主要な作業単位はタスクで、これはタスク定義内で設定されます。タスク定義は、Kubernetes のポッドに相当します。タスク定義には 1 つ以上のコンテナが含まれる必要があります。Datadog Agent を実行するには、アプリケーションコンテナおよび Datadog Agent コンテナを実行するためのタスク定義を作成します。

以下の手順は、[Amazon Web Console][3]、[AWS CLI ツール][4]、または [AWS CloudFormation][5] を使用したタスクの構成方法を示します。

{{< tabs >}}
{{% tab "Web UI" %}}
##### Web UI タスク定義


{{< site-region region="us,us3,us5,eu,ap1,gov" >}}

1. [AWS Web Console][4] にログインし、ECS セクションに移動します。
2. 左メニューの **Task Definitions** をクリックし、**Create new Task Definition** ボタンをクリックするか、既存の Fargate タスク定義を選択します。
3. 新しいタスク定義の場合
    1. 起動タイプとして **Fargate** を選択し、**Next step** ボタンをクリックします。
    2. **Task Definition Name** にタスク定義名を入力します (`my-app-and-datadog` など)。
    3. タスク実行 IAM ロールを選択します。下の [IAM ポリシーの作成と修正](#create-or-modify-your-iam-policy)セクションで、権限の要件を確認します。
    4. ニーズに合わせて **Task memory** と **Task CPU** を選択します。
4. Datadog Agent コンテナの追加を開始するには、**Add container** ボタンをクリックします。
    1. **Container name** に `datadog-agent` と入力します。
    2. **Image** に `public.ecr.aws/datadog/agent:latest` と入力します。
    3. **Env Variables** には、**Key** `DD_API_KEY` を追加し、値として [Datadog API キー][41]を入力します。
    4. **キー** `ECS_FARGATE` と値 `true` を使用して、もう 1 つ環境変数を追加します。**Add** をクリックしてコンテナを追加します。
    5. **Key** `DD_SITE` と値 {{< region-param key="dd_site" code="true" >}} を使用して、別の環境変数を追加します。設定しない場合、これはデフォルトで `datadoghq.com` になります。
    6. (Windows のみ) 作業ディレクトリとして `C:\` を選択します。
5. タスク定義に他のアプリケーションコンテナを追加します。インテグレーションメトリクスの収集の詳細については、[ECS Fargate のインテグレーションセットアップ][12]を参照してください。
6. **Create** をクリックしてタスク定義を作成します。

[4]: https://aws.amazon.com/console
[12]: http://docs.datadoghq.com/integrations/faq/integration-setup-ecs-fargate
[41]: https://app.datadoghq.com/organization-settings/api-keys

{{< /site-region >}}


{{% /tab %}}

{{% tab "AWS CLI" %}}
##### AWS CLI タスク定義

1. [datadog-agent-ecs-fargate.json][1] をダウンロードします。**注**: Internet Explorer をお使いの場合は、以下に記載の JSON ファイルを含む gzip ファイルとしてダウンロードされる場合があります。

{{< site-region region="us,us3,us5,eu,ap1,gov" >}}
2. JSON を `TASK_NAME`、[Datadog API キー][41]、および適切な `DD_SITE` ({{< region-param key="dd_site" code="true" >}}) で更新します。**注**: 環境変数 `ECS_FARGATE` はすでに `"true"` に設定されています。

[41]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

3. タスク定義に他のアプリケーションコンテナを追加します。インテグレーションメトリクスの収集の詳細については、[ECS Fargate のインテグレーションセットアップ][2]を参照してください。
4. オプション - Agent 健全性チェックを追加します。

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
5. 次のコマンドを実行して ECS タスク定義を登録します。

```bash
aws ecs register-task-definition --cli-input-json file://<ファイルへのパス>/datadog-agent-ecs-fargate.json
```

[1]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs-fargate.json
[2]: http://docs.datadoghq.com/integrations/faq/integration-setup-ecs-fargate
{{% /tab %}}

{{% tab "CloudFormation" %}}
##### AWS CloudFormation タスク定義

 [AWS CloudFormation][1] テンプレートを使用して Fargate コンテナを構成することができます。CloudFormation テンプレート内で `AWS::ECS::TaskDefinition` リソースを使用して Amazon ECS タスクを設定し、そのタスクで必要な起動タイプとして `FARGATE` を指定します。


{{< site-region region="us,us3,us5,eu,ap1,gov" >}}
下記の CloudFormation テンプレートに [Datadog API キー][41]を入れて更新します。また、必要に応じて適切な `DD_SITE` ({{< region-param key="dd_site" code="true" >}}) 環境変数も設定します。設定しない場合、デフォルトは `datadoghq.com` になります。

[41]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}


```yaml
Resources:
  ECSTaskDefinition:
    Type: 'AWS::ECS::TaskDefinition'
    Properties:
      NetworkMode: awsvpc
      RequiresCompatibilities:
        - FARGATE
      Cpu: 256
      Memory: 512
      ContainerDefinitions:
        - Name: datadog-agent
          Image: 'public.ecr.aws/datadog/agent:latest'
          Environment:
            - Name: DD_API_KEY
              Value: <DATADOG_API_KEY>
            - Name: ECS_FARGATE
              Value: true
```

最後に、他のアプリケーションコンテナを `ContainerDefinitions` 内に含め、CloudFormation を通してデプロイします。

CloudFormation のテンプレートと統語法に関する詳細は、[AWS CloudFormation タスク定義のドキュメント][2]をご参照ください。


[1]: https://aws.amazon.com/cloudformation/
[2]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-taskdefinition.html
{{% /tab %}}

{{< /tabs >}}


#### レプリカサービスとしてのタスクの実行

The only option in ECS Fargate is to run the task as a [Replica Service][6]. The Datadog Agent runs in the same task definition as your application and integration containers.

{{< tabs >}}
{{% tab "Web UI" %}}

##### Web UI レプリカサービス

1. [AWS Web Console][1] にログインし、ECS セクションに移動します。必要に応じて、**Networking only** クラスターテンプレートを使用してクラスターを作成します。
2. Datadog Agent を実行するクラスターを選択します。
3. **Services** タブで、**Create** ボタンをクリックします。
4. **Launch type** で、**FARGATE** を選択します。
5. **Task Definition** で、先ほど作成したタスクを選択します。
6. **Service name** に入力します。
7. **Number of tasks** に `1` と入力し、**Next step** ボタンをクリックします。
8. **Cluster VPC**、**Subnets**、および **Security Groups** を選択します。
9. **Load balancing** と **Service discovery** をオプションで設定します。
10. **Next step** ボタンをクリックします。
11. **Auto Scaling** は、オプションで設定します。
12. **Next step** ボタンをクリックし、**Create service** ボタンをクリックします。

[1]: https://aws.amazon.com/console
{{% /tab %}}

{{% tab "AWS CLI" %}}
##### AWS CLI レプリカサービス

[AWS CLI ツール][1]を使用して次のコマンドを実行します。

**注**: Fargate バージョン 1.1.0 以降が必要です。したがって、以下のコマンドでは、プラットフォームバージョンを指定します。

必要に応じてクラスターを作成します。

```bash
aws ecs create-cluster --cluster-name "<クラスター名>"
```

クラスターのサービスとしてタスクを実行します。

```bash
aws ecs run-task --cluster <CLUSTER_NAME> \
--network-configuration "awsvpcConfiguration={subnets=["<PRIVATE_SUBNET>"],securityGroups=["<SECURITY_GROUP>"]}" \
--task-definition arn:aws:ecs:us-east-1:<AWS_ACCOUNT_NUMBER>:task-definition/<TASK_NAME>:1 \
--region <AWS_REGION> --launch-type FARGATE --platform-version 1.4.0
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}

{{% tab "CloudFormation" %}}
##### AWS CloudFormation レプリカサービス

CloudFormation テンプレートでは、前の例で作成した `ECSTaskDefinition` リソースを、作成する `AWS::ECS::Service` リソースに参照させることができます。この後、レプリカサービスに `Cluster` や `DesiredCount` など、アプリケーションに必要なパラメーターを指定します。

```yaml
Resources:
  ECSTaskDefinition:
    #(...)
  ECSService:
    Type: 'AWS::ECS::Service'
    Properties:
      Cluster: <CLUSTER_NAME>
      TaskDefinition:
        Ref: "ECSTaskDefinition"
      DesiredCount: 1
      #(...)
```

CloudFormation のテンプレートと統語法に関する詳細は、[AWS CloudFormation ECS サービスのドキュメント][1]をご参照ください。

[1]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-service.html
{{% /tab %}}

{{< /tabs >}}

To provide your Datadog API key as a secret, see [Using secrets](#using-secrets).

#### Installation for AWS Batch

To monitor your AWS Batch jobs with Datadog, see [AWS Batch with ECS Fargate and the Datadog Agent][7]

#### IAM ポリシーの作成と修正

ECS Fargate のメトリクスを収集するには、次のアクセス許可を [Datadog IAM ポリシー][8]に追加します。詳細については、AWS ウェブサイト上の [ECS ポリシー][9]を参照してください。

| AWS アクセス許可                   | 説明                                                       |
| -------------------------------- | ----------------------------------------------------------------- |
| `ecs:ListClusters`               | 使用できるクラスターをリストします。                                          |
| `ecs:ListContainerInstances`     | クラスターのインスタンスをリストします。                                      |
| `ecs:DescribeContainerInstances` | リソースおよび実行中のタスクに関するメトリクスを追加するためのインスタンスを記述します。 |

#### シークレットの使用
As an alternative to populating the `DD_API_KEY` environment variable with your API key in plaintext, you can instead reference the [ARN of a plaintext secret stored in AWS Secrets Manager][10]. Place the `DD_API_KEY` environment variable under the `containerDefinitions.secrets` section of the task or job definition file. Ensure that the task/job execution role has the necessary permission to fetch secrets from AWS Secrets Manager.

### メトリクスの収集

上述のように Datadog Agent をセットアップすると、オートディスカバリーを有効にした状態で [ecs_fargate チェック][11]がメトリクスを収集します。その他のメトリクスを収集するには、同じタスク内の他のコンテナに Docker ラベルを追加します。

インテグレーションは Linux と Windows で動作しますが、一部のメトリクスは OS に依存します。Windows で実行したときに公開されるメトリクスは、すべて Linux でも公開されますが、Linux でしか利用できないメトリクスもあります。このインテグレーションで提供されるメトリクスの一覧は、[データ収集](#data-collected)を参照してください。このリストでは、どのメトリクスが Linux 専用であるかも指定されています。

インテグレーションメトリクスの収集の詳細については、[ECS Fargate のインテグレーションセットアップ][12]を参照してください。

#### DogStatsD

メトリクスは [DogStatsD][13] を使用して UDP ポート 8125 を介して収集されます。

#### その他の環境変数

Docker Agent コンテナと共に使用できる環境変数については、[Docker Agent][14] ページを参照してください。**注**: 一部の変数は Fargate では使用できません。


| 環境変数               | 説明                                    |
|------------------------------------|------------------------------------------------|
| `DD_DOCKER_LABELS_AS_TAGS`         | docker コンテナラベルを抽出します                |
| `DD_CHECKS_TAG_CARDINALITY`        | タグをチェックメトリクスに追加します                      |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | タグをカスタムメトリクスに追加します                     |

グローバルなタグ付けには、`DD_DOCKER_LABELS_AS_TAGS` の使用をお勧めします。Agent は、この方法を使用して、コンテナラベルからタグを取得します。それには、他のコンテナに適切なラベルを追加する必要があります。ラベルは、[タスク定義][15]で直接追加できます。

Agent コンテナのフォーマット

```json
{
  "name": "DD_DOCKER_LABELS_AS_TAGS",
  "value": "{\"<収集するラベル名>\":\"<DATADOG_用タグキー>\"}"
}
```

Agent コンテナの例

```json
{
  "name": "DD_DOCKER_LABELS_AS_TAGS",
  "value": "{\"com.docker.compose.service\":\"service_name\"}"
}
```

CloudFormation 例 (YAML):

```yaml
      ContainerDefinitions:
        - #(...)
          Environment:
            - Name: DD_DOCKER_LABELS_AS_TAGS
              Value: "{\"com.docker.compose.service\":\"service_name\"}"
```

**注**: `DD_HOSTNAME` を使用しないでください。Fargate には、ユーザーに対するホストという概念がないからです。従来からホストタグを割り当てるために `DD_TAGS` が使用されていますが、Datadog Agent バージョン 6.13.0 では、環境変数を使用してインテグレーションメトリクスにグローバルタグを設定することもできます。

### クローラーベースのメトリクス

Datadog Agent によって収集されるメトリクスのほかに、Datadog には CloudWatch ベースの ECS インテグレーションがあります。このインテグレーションは、[Amazon ECS CloudWatch メトリクス][16]を収集します。

そこに記載されているように、Fargate タスクも次のようにメトリクスを報告します。

> The metrics made available will depend on the launch type of the tasks and services in your clusters or batch jobs. If you are using the Fargate launch type for your services then CPU and memory utilization metrics are provided to assist in the monitoring of your services.

この方法は Datadog Agent を使用しないため、インテグレーションタイルで **ECS** をチェックすることで、AWS インテグレーションを構成する必要があります。これで、自動的に Datadog が CloudWatch メトリクス (Datadog 内の `aws.ecs.*` ネームスペースを使用) を取得します。ドキュメントの[収集データ][17]セクションを参照してください。

必要なメトリクスがこれだけの場合は、このインテグレーションに依存して CloudWatch メトリクスを使用して収集できます。**注**: CloudWatch データは粒度が低く (有効にした監視の種類に応じて 1-5 分)、Datadog への報告にも遅延があります。これは、Agent を使用して Datadog にデータをプッシュするのではなく、AWS の API 制限の範囲内で CloudWatch からデータを収集する必要があるためです。

Datadog のデフォルトの CloudWatch クローラーは、10 分ごとにメトリクスをポーリングします。クローリングスケジュールを速くする必要がある場合は、それが可能かどうかを [Datadog のサポートチーム][18]にお問い合わせください。**注**: CloudWatch の API 呼び出しは課金対象なので、AWS 側のコストが増大します。

### ログ収集

Fargate のログを監視するには、次のどちらかを使用します。
- Datadog の Fluent Bit 出力プラグインで構築した AWS FireLens インテグレーションで、ログを Datadog に直接送信
- ログドライバー `awslogs` を使って CloudWatch Log Group にログを保存し、Lambda 関数で Datadog にログをルーティング

Datadog では、Fargate のタスクで直接 Fluent Bit を構成できるため、AWS FireLens の利用を推奨しています。

**Note**: Log collection with Fluent Bit and FireLens is not supported for AWS Batch on ECS Fargate.

#### Fluent Bit と FireLens

Datadog の Fluent Bit アウトプットプラグインに組み込まれている AWS FireLens インテグレーションを構成して、監視している FireLens のログデータを Datadog ログと接続します。この構成の完全な[タスク定義例はこちら][19]にあります。

1. 既存の Fargate タスクで Fluent Bit FireLens ログルーターコンテナを追加します。 FireLens の有効化については、専用の [AWS Firelens ドキュメント][20]を参照してください。Fargate コンテナの定義については、[AWS コンテナ定義ドキュメント][21]を参照してください。AWS では、[リージョン別 Docker イメージ][22]の使用を推奨しています。下記に、Fluent Bit イメージが構成されたタスク定義の例を示します。

   ```json
   {
     "essential": true,
     "image": "amazon/aws-for-fluent-bit:stable",
     "name": "log_router",
     "firelensConfiguration": {
       "type": "fluentbit",
       "options": { "enable-ecs-log-metadata": "true" }
     }
   }
   ```

    コンテナがシリアル化された JSON ログを stdout 上で公開している場合は、ログが Datadog 内で正しくパースされるよう、次の [追加 FireLens コンフィギュレーション][23]を使用する必要があります。

   ```json
   {
     "essential": true,
     "image": "amazon/aws-for-fluent-bit:stable",
     "name": "log_router",
     "firelensConfiguration": {
       "type": "fluentbit",
       "options": {
         "enable-ecs-log-metadata": "true",
         "config-file-type": "file",
         "config-file-value": "/fluent-bit/configs/parse-json.conf"
       }
     }
   }
   ```

    これにより、シリアル化された JSON が `log:` フィールドから上位レベルのフィールドに変換されます。詳細については、[JSON がシリアル化されたコンテナの stdout ログをパースしている][23] AWS サンプルを参照してください。

2. 次に、同じ Fargate タスクで、ログを送信する目的のコンテナに対して、ログ構成を定義します。このログ構成は、AWS FireLens をログドライバーとし、Fluent Bit にデータを出力するものである必要があります。下記に、ログドライバーに FireLens が使用され、Fluent Bit にデータを出力しているタスク定義の例を示します。


{{< site-region region="us" >}}
  ```json
  {
    "logConfiguration": {
      "logDriver": "awsfirelens",
      "options": {
        "Name": "datadog",
        "apikey": "<DATADOG_API_KEY>",
        "Host": "http-intake.logs.datadoghq.com",
        "dd_service": "firelens-test",
        "dd_source": "redis",
        "dd_message_key": "log",
        "dd_tags": "project:fluentbit",
        "TLS": "on",
        "provider": "ecs"
      }
    }
  }
  ```
{{< /site-region >}}


{{< site-region region="us3" >}}
  ```json
  {
    "logConfiguration": {
      "logDriver": "awsfirelens",
      "options": {
        "Name": "datadog",
        "apikey": "<DATADOG_API_KEY>",
        "Host": "http-intake.logs.us3.datadoghq.com",
        "dd_service": "firelens-test",
        "dd_source": "redis",
        "dd_message_key": "log",
        "dd_tags": "project:fluentbit",
        "TLS": "on",
        "provider": "ecs"
      }
    }
  }
  ```
{{< /site-region >}}


{{< site-region region="us5" >}}
  ```json
  {
    "logConfiguration": {
      "logDriver": "awsfirelens",
      "options": {
        "Name": "datadog",
        "apikey": "<DATADOG_API_KEY>",
        "Host": "http-intake.logs.us5.datadoghq.com",
        "dd_service": "firelens-test",
        "dd_source": "redis",
        "dd_message_key": "log",
        "dd_tags": "project:fluentbit",
        "TLS": "on",
        "provider": "ecs"
      }
    }
  }
  ```
{{< /site-region >}}


{{< site-region region="eu" >}}
  ```json
  {
    "logConfiguration": {
      "logDriver": "awsfirelens",
      "options": {
        "Name": "datadog",
        "apikey": "<DATADOG_API_KEY>",
        "Host": "http-intake.logs.datadoghq.eu",
        "dd_service": "firelens-test",
        "dd_source": "redis",
        "dd_message_key": "log",
        "dd_tags": "project:fluentbit",
        "TLS": "on",
        "provider": "ecs"
      }
    }
  }
  ```
{{< /site-region >}}


{{< site-region region="gov" >}}
  ```json
  {
    "logConfiguration": {
      "logDriver": "awsfirelens",
      "options": {
        "Name": "datadog",
        "apikey": "<DATADOG_API_KEY>",
        "Host": "http-intake.logs.ddog-gov.datadoghq.com",
        "dd_service": "firelens-test",
        "dd_source": "redis",
        "dd_message_key": "log",
        "dd_tags": "project:fluentbit",
        "TLS": "on",
        "provider": "ecs"
      }
    }
  }
  ```
{{< /site-region >}}



{{< site-region region="us,us3,us5,eu,ap1,gov" >}}
**注**: `apikey` と `Host` は、それぞれのサイト `http-intake.logs.`{{< region-param key="dd_site" code="true" >}} から相対的に設定します。利用可能なパラメーターの完全なリストは、[Datadog Fluent Bit ドキュメント][24]に記載されています。

[24]: https://docs.datadoghq.com/integrations/fluentbit/#configuration-parameters
{{< /site-region >}}


`dd_service`、`dd_source`、`dd_tags` は、任意のタグに調整することができます。

3. Fargate タスクの実行中は常に、Fargate タスクが管理するコンテナの情報を含むコンテナログが、Fluent Bit から Datadog に送信されるようになります。[Log Explorer ページ][24]で生ログを確認したり、ログ用の[モニターを作成][25]し [Live Container ビュー][26]で確認したりすることが可能です。

{{< tabs >}}
{{% tab "Web UI" %}}
##### Web UI

Fluent Bit コンテナを既存のタスク定義に追加するには、**Log router integration** の下にある **Enable FireLens integration** チェックボックスをオンにすると、自動的に `log_router` コンテナが作成されます。これは地域の画像を取り込みますが、`latest` の代わりに `stable` の画像タグを使用することをお勧めします。**Apply** をクリックすると、ベースとなるコンテナが作成されます。さらに `firelensConfiguration` をカスタマイズするには、下部にある **Configure via JSON** ボタンをクリックして、手動で編集します。

これを追加した後、タスク定義でログを送信するアプリケーションコンテナを編集し、**Log driver** を `awsfirelens` に変更し、**Log options** に上記の例で示されたキーを記入します。

{{% /tab %}}

{{% tab "AWS CLI" %}}
##### AWS CLI

既存の JSON タスク定義ファイルを編集して、前のセクションで説明したように、`log_router` コンテナとアプリケーションコンテナの更新した `logConfiguration` を含めます。これが終わったら、次のコマンドでタスク定義の新しいリビジョンを作成します。

```bash
aws ecs register-task-definition --cli-input-json file://<ファイルへのパス>/datadog-agent-ecs-fargate.json
```

{{% /tab %}}

{{% tab "CloudFormation" %}}
##### AWS CloudFormation

[AWS CloudFormation][1] のテンプレートを使用するには、`AWS::ECS::TaskDefinition` リソースを使用し、`Datadog` オプションを設定して、ログ管理を構成する必要があります。

例えば、Fluent Bit が Datadog にログを送信するように構成する場合


{{< site-region region="us" >}}
```yaml
Resources:
  ECSTaskDefinition:
    Type: 'AWS::ECS::TaskDefinition'
    Properties:
      NetworkMode: awsvpc
      RequiresCompatibilities:
          - FARGATE
      Cpu: 256
      Memory: 1GB
      ContainerDefinitions:
        - Name: tomcat-test
          Image: 'tomcat:jdk8-adoptopenjdk-openj9'
          LogConfiguration:
            LogDriver: awsfirelens
            Options:
              Name: datadog
              apikey: <DATADOG_API_KEY>
              Host: http-intake.logs.datadoghq.com
              dd_service: test-service
              dd_source: test-source
              TLS: 'on'
              provider: ecs
          MemoryReservation: 500
        - Name: log_router
          Image: 'amazon/aws-for-fluent-bit:stable'
          Essential: true
          FirelensConfiguration:
            Type: fluentbit
            Options:
              enable-ecs-log-metadata: true
          MemoryReservation: 50
```
{{< /site-region >}}


{{< site-region region="us3" >}}
```yaml
Resources:
  ECSTaskDefinition:
    Type: 'AWS::ECS::TaskDefinition'
    Properties:
      NetworkMode: awsvpc
      RequiresCompatibilities:
          - FARGATE
      Cpu: 256
      Memory: 1GB
      ContainerDefinitions:
        - Name: tomcat-test
          Image: 'tomcat:jdk8-adoptopenjdk-openj9'
          LogConfiguration:
            LogDriver: awsfirelens
            Options:
              Name: datadog
              apikey: <DATADOG_API_KEY>
              Host: http-intake.logs.us3.datadoghq.com
              dd_service: test-service
              dd_source: test-source
              TLS: 'on'
              provider: ecs
          MemoryReservation: 500
        - Name: log_router
          Image: 'amazon/aws-for-fluent-bit:stable'
          Essential: true
          FirelensConfiguration:
            Type: fluentbit
            Options:
              enable-ecs-log-metadata: true
          MemoryReservation: 50
```
{{< /site-region >}}


{{< site-region region="us5" >}}
```yaml
Resources:
  ECSTaskDefinition:
    Type: 'AWS::ECS::TaskDefinition'
    Properties:
      NetworkMode: awsvpc
      RequiresCompatibilities:
          - FARGATE
      Cpu: 256
      Memory: 1GB
      ContainerDefinitions:
        - Name: tomcat-test
          Image: 'tomcat:jdk8-adoptopenjdk-openj9'
          LogConfiguration:
            LogDriver: awsfirelens
            Options:
              Name: datadog
              apikey: <DATADOG_API_KEY>
              Host: http-intake.logs.us5.datadoghq.com
              dd_service: test-service
              dd_source: test-source
              TLS: 'on'
              provider: ecs
          MemoryReservation: 500
        - Name: log_router
          Image: 'amazon/aws-for-fluent-bit:stable'
          Essential: true
          FirelensConfiguration:
            Type: fluentbit
            Options:
              enable-ecs-log-metadata: true
          MemoryReservation: 50
```
{{< /site-region >}}


{{< site-region region="eu" >}}
```yaml
Resources:
  ECSTaskDefinition:
    Type: 'AWS::ECS::TaskDefinition'
    Properties:
      NetworkMode: awsvpc
      RequiresCompatibilities:
          - FARGATE
      Cpu: 256
      Memory: 1GB
      ContainerDefinitions:
        - Name: tomcat-test
          Image: 'tomcat:jdk8-adoptopenjdk-openj9'
          LogConfiguration:
            LogDriver: awsfirelens
            Options:
              Name: datadog
              apikey: <DATADOG_API_KEY>
              Host: http-intake.logs.datadoghq.eu
              dd_service: test-service
              dd_source: test-source
              TLS: 'on'
              provider: ecs
          MemoryReservation: 500
        - Name: log_router
          Image: 'amazon/aws-for-fluent-bit:stable'
          Essential: true
          FirelensConfiguration:
            Type: fluentbit
            Options:
              enable-ecs-log-metadata: true
          MemoryReservation: 50
```
{{< /site-region >}}


{{< site-region region="gov" >}}
```yaml
Resources:
  ECSTaskDefinition:
    Type: 'AWS::ECS::TaskDefinition'
    Properties:
      NetworkMode: awsvpc
      RequiresCompatibilities:
          - FARGATE
      Cpu: 256
      Memory: 1GB
      ContainerDefinitions:
        - Name: tomcat-test
          Image: 'tomcat:jdk8-adoptopenjdk-openj9'
          LogConfiguration:
            LogDriver: awsfirelens
            Options:
              Name: datadog
              apikey: <DATADOG_API_KEY>
              Host: http-intake.logs.ddog-gov.datadoghq.com
              dd_service: test-service
              dd_source: test-source
              TLS: 'on'
              provider: ecs
          MemoryReservation: 500
        - Name: log_router
          Image: 'amazon/aws-for-fluent-bit:stable'
          Essential: true
          FirelensConfiguration:
            Type: fluentbit
            Options:
              enable-ecs-log-metadata: true
          MemoryReservation: 50
```
{{< /site-region >}}


CloudFormation のテンプレートと統語法に関する詳細は、[AWS CloudFormation ドキュメント][2]をご参照ください。


[1]: https://aws.amazon.com/cloudformation/
[2]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-taskdefinition.html
{{% /tab %}}

{{< /tabs >}}

**注**: プレーンテキストで `apikey` を公開しないようにするには、[TaskDefinition シークレット][27]を使用します。

#### AWS ログドライバー

`awslogs` ログドライバーと Lambda 関数を使用して Fargate ログを監視し、Datadog にルーティングします。

1. Define the log driver as `awslogs` in the application container in the task or job you want to collect logs from. [Consult the AWS Fargate developer guide][28] for instructions.

2. This configures your Fargate tasks or jobs to send log information to Amazon CloudWatch Logs. The following shows a snippet of a task/job definition where the awslogs log driver is configured:

   ```json
   {
     "logConfiguration": {
       "logDriver": "awslogs",
       "options": {
         "awslogs-group": "/ecs/fargate-task|job-definition",
         "awslogs-region": "us-east-1",
         "awslogs-stream-prefix": "ecs"
       }
     }
   }
   ```

    For more information about using the `awslogs` log driver in your task or job definitions to send container logs to CloudWatch Logs, see [Using the awslogs Log Driver][29]. This driver collects logs generated by the container and sends them to CloudWatch directly.

3. 最後に、[Datadog Lambda Log Forwarder 関数][30]を使用して CloudWatch からログを収集し、Datadog に送信します。

### トレースの収集


{{< site-region region="us,us3,us5,eu,ap1,gov" >}}
1. Follow the [instructions above](#installation) to add the Datadog Agent container to your task or job definition with the additional environment variable `DD_APM_ENABLED` set to `true`. Set the `DD_SITE` variable to {{< region-param key="dd_site" code="true" >}}. It defaults to `datadoghq.com` if you don't set it.
{{< /site-region >}}


2. セットアップに基づいてアプリケーションをインスツルメントします。

   **注**: Fargate APM のアプリケーションでは、`DD_AGENT_HOST` を**設定しない**でください。デフォルトの `localhost` で動作します。

   | 言語                           |
   |------------------------------------|
   | [Java][31] |
   | [Python][32] |
   | [Ruby][33] |
   | [Go][34] |
   | [Node.js][35] |
   | [PHP][36] |
   | [C++][37] |
   | [.NET Core][38] |
   | [.NET Framework][39] |

   [Datadog へのトレースの送信][40]の一般的な情報を参照してください。

3. Ensure your application is running in the same task or job definition as the Datadog Agent container.

### プロセスの収集

<div class="alert alert-warning">You can view your ECS Fargate processes in Datadog. To see their relationship to ECS Fargate containers, use the Datadog Agent v7.50.0 or later.</div>

You can monitor processes in ECS Fargate in Datadog by using the [Live Processes page][41]. To enable process collection, add the [`PidMode` parameter][42] in the Task Definition and set it to `task` as follows:

```text
"pidMode": "task"
```
ECS でプロセスをフィルタリングするには、`AWS Fargate` コンテナファセットを使用するか、Live Processes ページの検索クエリに `fargate:ecs` と入力します。

## すぐに使えるタグ

The Agent can autodiscover and attach tags to all data emitted by the entire task or an individual container within this task or job. The list of tags automatically attached depends on the Agent's [cardinality configuration][43].

  | タグ                           | カーディナリティ  | ソース               |
  |-------------------------------|--------------|----------------------|
  | `container_name`              | 大         | ECS API              |
  | `container_id`                | 大         | ECS API              |
  | `docker_image`                | Low          | ECS API              |
  | `image_name`                  | Low          | ECS API              |
  | `short_image`                 | Low          | ECS API              |
  | `image_tag`                   | Low          | ECS API              |
  | `ecs_cluster_name`            | 小          | ECS API              |
  | `ecs_container_name`          | Low          | ECS API              |
  | `task_arn`                    | オーケストレーター | ECS API              |
  | `task_family`                 | Low          | ECS API              |
  | `task_name`                   | Low          | ECS API              |
  | `task_version`                | Low          | ECS API              |
  | `availability-zone`           | 小          | ECS API              |
  | `region`                      | 小          | ECS API              |

## 収集データ

### メトリクス
{{< get-metrics-from-git "ecs_fargate" >}}


### イベント

ECS Fargate チェックには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "ecs_fargate" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][18]までお問合せください。

## その他の参考資料

- Blog post: [Monitor AWS Fargate applications with Datadog][44]
- よくあるご質問: [ECS Fargate のインテグレーションセットアップ][12]
- Blog post: [Monitor your Fargate container logs with FireLens and Datadog][45]
- Blog post: [Key metrics for monitoring AWS Fargate][46]
- Blog post: [How to collect metrics and logs from AWS Fargate workloads][47]
- Blog post: [AWS Fargate monitoring with Datadog][48]
- Blog post: [Graviton2-powered AWS Fargate deployments][49]
- Blog post: [Monitor AWS Fargate for Windows containerized apps][50]
- Blog post: [Monitor processes running on AWS Fargate with Datadog][51]
- Blog post: [Monitor AWS Batch on Fargate with Datadog][52]


[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-metadata-endpoint.html
[2]: https://docs.docker.com/engine/api/v1.30/#operation/ContainerStats
[3]: https://aws.amazon.com/console
[4]: https://aws.amazon.com/cli
[5]: https://aws.amazon.com/cloudformation/
[6]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_replica
[7]: https://docs.datadoghq.com/containers/guide/aws-batch-ecs-fargate
[8]: https://docs.datadoghq.com/integrations/amazon_web_services/#installation
[9]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_ecs.html
[10]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[11]: https://github.com/DataDog/integrations-core/blob/master/ecs_fargate/datadog_checks/ecs_fargate/data/conf.yaml.example
[12]: http://docs.datadoghq.com/integrations/faq/integration-setup-ecs-fargate
[13]: https://docs.datadoghq.com/developers/dogstatsd/
[14]: https://docs.datadoghq.com/agent/docker/#environment-variables
[15]: https://docs.aws.amazon.com/AmazonECS/latest/userguide/task_definition_parameters.html#container_definition_labels
[16]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cloudwatch-metrics.html
[17]: https://docs.datadoghq.com/integrations/amazon_ecs/#data-collected
[18]: https://docs.datadoghq.com/help/
[19]: https://github.com/aws-samples/amazon-ecs-firelens-examples/tree/mainline/examples/fluent-bit/datadog
[20]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html
[21]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definitions
[22]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html#firelens-using-fluentbit
[23]: https://github.com/aws-samples/amazon-ecs-firelens-examples/tree/master/examples/fluent-bit/parse-json
[24]: https://app.datadoghq.com/logs
[25]: https://docs.datadoghq.com/monitors/monitor_types/
[26]: https://docs.datadoghq.com/infrastructure/livecontainers/?tab=linuxwindows
[27]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ecs-taskdefinition-secret.html
[28]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html
[29]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html
[30]: https://docs.datadoghq.com/logs/guide/forwarder/
[31]: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/java?tab=containers#automatic-instrumentation
[32]: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/python?tab=containers#instrument-your-application
[33]: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/ruby#instrument-your-application
[34]: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/go/?tab=containers#activate-go-integrations-to-create-spans
[35]: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/nodejs?tab=containers#instrument-your-application
[36]: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/php?tab=containers#automatic-instrumentation
[37]: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/cpp?tab=containers#instrument-your-application
[38]: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/dotnet-core?tab=containers#custom-instrumentation
[39]: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/dotnet-framework?tab=containers#custom-instrumentation
[40]: https://docs.datadoghq.com/tracing/setup/
[41]: https://app.datadoghq.com/process
[42]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#other_task_definition_params
[43]: https://docs.datadoghq.com/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables
[44]: https://www.datadoghq.com/blog/monitor-aws-fargate
[45]: https://www.datadoghq.com/blog/collect-fargate-logs-with-firelens/
[46]: https://www.datadoghq.com/blog/aws-fargate-metrics/
[47]: https://www.datadoghq.com/blog/tools-for-collecting-aws-fargate-metrics/
[48]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/
[49]: https://www.datadoghq.com/blog/aws-fargate-on-graviton2-monitoring/
[50]: https://www.datadoghq.com/blog/aws-fargate-windows-containers-support/
[51]: https://www.datadoghq.com/blog/monitor-fargate-processes/
[52]: https://www.datadoghq.com/blog/monitor-aws-batch-on-fargate/
