---
app_id: aws-fargate
app_uuid: 4c298061-c7d2-4ce6-ab3e-5378039de65a
assets:
  dashboards:
    Amazon Fargate: assets/dashboards/amazon_fargate_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ecs.fargate.cpu.user
      metadata_path: metadata.csv
      prefix: ecs.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10033
    source_type_name: Amazon Fargate
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- cloud
- containers
- network
- orchestration
- provisioning
- tracing
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ecs_fargate/README.md
display_on_public_website: true
draft: false
git_integration_title: ecs_fargate
integration_id: aws-fargate
integration_title: Amazon ECS on AWS Fargate
integration_version: 4.3.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: ecs_fargate
public_title: Amazon ECS on AWS Fargate
short_description: ECS Fargate を使用して実行中のコンテナのメトリクスを追跡する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::クラウド
  - Category::コンテナ
  - Category::ネットワーク
  - Category::オーケストレーション
  - Category::プロビジョニング
  - Category::Tracing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: ECS Fargate を使用して実行中のコンテナのメトリクスを追跡する
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon ECS on AWS Fargate
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

<div class="alert alert-warning">このページでは、ECS Fargate インテグレーションについて説明します。EKS Fargate については、Datadog の <a href="http://docs.datadoghq.com/integrations/eks_fargate">EKS Fargate インテグレーション</a>に関するドキュメントをご覧ください。
</div>

ECS Fargate で実行されているすべてのコンテナからメトリクスを取得します。

- CPU/メモリ使用量および制限のメトリクス
- Datadog インテグレーションまたはカスタムメトリクスを使用して、Fargate で実行されているアプリケーションを監視

Datadog Agent は、ECS のタスクメタデータエンドポイントでタスク定義のコンテナのメトリクスを取得します。このエンドポイントに関する [ECS のドキュメント][1]には、以下のように記載されています。

- このエンドポイントは、タスクに関連付けられたすべてのコンテナの Docker 統計 JSON を返します。返される統計の詳細については、Docker API ドキュメント内の [ContainerStats][2] を参照してください。

タスクメタデータエンドポイントは、タスク定義自体の内部からのみ使用できます。このため、Datadog Agent を監視する各タスク定義内の追加コンテナとして実行する必要があります。

このメトリクスの収集を有効にするために必要な構成は、タスク定義内で環境変数 `ECS_FARGATE` を `"true"` にすることだけです。

**注**: Network Performance Monitoring (NPM) は、ECS Fargate ではサポートされていません。

## セットアップ

以下の手順では、AWS ECS Fargate 内で Datadog Container Agent をセットアップします。**注**: Fargate インテグレーションを最大限活用するには、Datadog Agent バージョン 6.1.1 以降が必要です。

Datadog Agent を持たないタスクも Cloudwatch でメトリクスを報告しますが、Autodiscovery、詳細なコンテナメトリクス、トレーシングなどの機能には Agent が必要です。さらに、Cloudwatch メトリクスは粒度が低く、Datadog Agent を通じて直接発送されるメトリクスより報告のレイテンシーが高くなります。

### インストール

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

これらの例では、[AWS Secrets Manager に格納されているプレーンテキストのシークレットの ARN][6] を参照して、`DD_API_KEY` 環境変数を設定することもできます。タスク定義ファイルの `containerDefinitions.secrets` セクションの下に `DD_API_KEY` 環境変数を配置します。タスク実行ロールが AWS Secrets Manager からシークレットを取得するのに必要な権限を持っていることを確認します。

#### IAM ポリシーの作成と修正

ECS Fargate メトリクスの収集に必要な以下の権限を [Datadog IAM ポリシー][7]に追加してください。詳細については、AWS ウェブサイト上の [ECS ポリシー][8]を参照してください。

| AWS アクセス許可                   | 説明                                                       |
| -------------------------------- | ----------------------------------------------------------------- |
| `ecs:ListClusters`               | 使用できるクラスターをリストします。                                          |
| `ecs:ListContainerInstances`     | クラスターのインスタンスをリストします。                                      |
| `ecs:DescribeContainerInstances` | リソースおよび実行中のタスクに関するメトリクスを追加するためのインスタンスを記述します。 |

#### レプリカサービスとしてのタスクの実行

ECS Fargate では、タスクを [Replica サービス][9]として実行するオプションしかありません。Datadog Agent は、アプリケーションやインテグレーションコンテナと同じタスク定義内で実行されます。

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
### メトリクスの収集

上述のように Datadog Agent をセットアップすると、オートディスカバリーを有効にした状態で [ecs_fargate チェック][10]がメトリクスを収集します。その他のメトリクスを収集するには、同じタスク内の他のコンテナに Docker ラベルを追加します。

インテグレーションは Linux と Windows で動作しますが、一部のメトリクスは OS に依存します。Windows で実行したときに公開されるメトリクスは、すべて Linux でも公開されますが、Linux でしか利用できないメトリクスもあります。このインテグレーションで提供されるメトリクスの一覧は、[データ収集](#data-collected)を参照してください。このリストでは、どのメトリクスが Linux 専用であるかも指定されています。

インテグレーションメトリクスの収集の詳細については、[ECS Fargate のインテグレーションセットアップ][11]を参照してください。

#### ヘルプ

メトリクスは [DogStatsD][12] を使用して UDP ポート 8125 を介して収集されます。

#### その他の環境変数

Docker Agent コンテナと共に使用できる環境変数については、[Docker Agent][13] ページを参照してください。**注**: 一部の変数は Fargate では使用できません。


| 環境変数               | 説明                                    |
|------------------------------------|------------------------------------------------|
| `DD_DOCKER_LABELS_AS_TAGS`         | docker コンテナラベルを抽出します                |
| `DD_CHECKS_TAG_CARDINALITY`        | タグをチェックメトリクスに追加します                      |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | タグをカスタムメトリクスに追加します                     |

グローバルなタグ付けには、`DD_DOCKER_LABELS_AS_TAGS` の使用をお勧めします。Agent は、この方法を使用して、コンテナラベルからタグを取得します。それには、他のコンテナに適切なラベルを追加する必要があります。ラベルは、[タスク定義][14]で直接追加できます。

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

Datadog Agent によって収集されるメトリクスのほかに、Datadog には CloudWatch ベースの ECS インテグレーションがあります。このインテグレーションは、[Amazon ECS CloudWatch メトリクス][15]を収集します。

そこに記載されているように、Fargate タスクも次のようにメトリクスを報告します。

使用できるメトリクスは、クラスター内のタスクとサービスの起動タイプによって異なります。サービスに Fargate 起動タイプを使用している場合は、サービスの監視に役立つように、CPU とメモリの使用率メトリクスが提供されます。

この方法は Datadog Agent を使用しないため、インテグレーションタイルで **ECS** をチェックすることで、AWS インテグレーションを構成する必要があります。これで、自動的に Datadog が CloudWatch メトリクス (Datadog 内の `aws.ecs.*` ネームスペースを使用) を取得します。ドキュメントの[収集データ][16]セクションを参照してください。

必要なメトリクスがこれだけの場合は、このインテグレーションに依存して CloudWatch メトリクスを使用して収集できます。**注**: CloudWatch データは粒度が低く (有効にした監視の種類に応じて 1-5 分)、Datadog への報告にも遅延があります。これは、Agent を使用して Datadog にデータをプッシュするのではなく、AWS の API 制限の範囲内で CloudWatch からデータを収集する必要があるためです。

Datadog のデフォルトの CloudWatch クローラーは、10 分ごとにメトリクスを取得します。クローリングスケジュールを速くする必要がある場合は、それが可能かどうかを [Datadog のサポートチーム][17]にお問い合わせください。**注**: CloudWatch の API 呼び出しは課金対象なので、AWS 側のコストが増大します。

### 収集データ

Fargate のログを監視するには、次のどちらかを使用します。
- Datadog の Fluent Bit 出力プラグインで構築した AWS FireLens インテグレーションで、ログを Datadog に直接送信
- ログドライバー `awslogs` を使って CloudWatch Log Group にログを保存し、Lambda 関数で Datadog にログをルーティング

Datadog では、Fargate のタスクで直接 Fluent Bit を構成できるため、AWS FireLens の利用を推奨しています。

#### Fluent Bit と FireLens

Datadog の Fluent Bit アウトプットプラグインに組み込まれている AWS FireLens インテグレーションを構成して、監視している FireLens のログデータを Datadog ログと接続します。この構成の完全な[タスク定義例はこちら][18]にあります。

1. 既存の Fargate タスクで Fluent Bit FireLens ログルーターコンテナを追加します。 FireLens の有効化については、専用の [AWS Firelens ドキュメント][19]を参照してください。Fargate コンテナの定義については、[AWS コンテナ定義ドキュメント][20]を参照してください。AWS では、[リージョン別 Docker イメージ][21]の使用を推奨しています。下記に、Fluent Bit イメージが構成されたタスク定義の例を示します。

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

   コンテナが標準出力経由でシリアル化された JSON ログを公開している場合、それらが Datadog 内で正確にパースされるよう、この[追加の FireLens 構成][22]を使用してください。

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

    これにより、シリアル化された JSON が `log:` フィールドから上位レベルのフィールドに変換されます。詳細については、[JSON がシリアル化されたコンテナの stdout ログをパースしている][22] AWS サンプルを参照してください。

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

[24]: https://docs.datadoghq.com/ja/integrations/fluentbit/#configuration-parameters
{{< /site-region >}}


`dd_service`、`dd_source`、`dd_tags` は、任意のタグに調整することができます。

3. Fargate タスクの実行中は常に、Fargate タスクが管理するコンテナの情報を含むコンテナログが、Fluent Bit から Datadog に送信されるようになります。[Log Explorer ページ][23]で生ログを確認したり、ログ用の[モニターを作成][24]し [Live Container ビュー][25]で確認したりすることが可能です。

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

**注**: プレーンテキストで `apikey` を公開しないようにするには、[TaskDefinition シークレット][26]を使用します。

#### AWS ログドライバー

`awslogs` ログドライバーと Lambda 関数を使用して Fargate ログを監視し、Datadog にルーティングします。

1. ログを収集したいタスクのアプリケーションコンテナで、ログドライバーを `awslogs` として定義します。手順は、[AWS Fargate デベロッパーガイド][27]を参照してください。

2. これは、Fargate タスクがログ情報を Amazon CloudWatch Logs に送信するように構成します。次は、awslogs ログドライバーを構成するためのタスク定義のスニペットです。

   ```json
   {
     "logConfiguration": {
       "logDriver": "awslogs",
       "options": {
         "awslogs-group": "/ecs/fargate-task-definition",
         "awslogs-region": "us-east-1",
         "awslogs-stream-prefix": "ecs"
       }
     }
   }
   ```

    タスク定義で `awslogs` ログドライバーを使用して、コンテナログを CloudWatch Logs に送信する方法については、[awslogs  ログドライバーを使用する][28]を参照してください。このドライバーは、コンテナが生成したログを収集し、CloudWatch に直接送信します。

3. 最後に、[Datadog Lambda Log Forwarder 関数][29]を使用して CloudWatch からログを収集し、Datadog に送信します。

### トレースの収集


{{< site-region region="us,us3,us5,eu,ap1,gov" >}}
1. [上の手順](#installation)に従ってタスク定義に Datadog Agent コンテナを追加し、追加の環境変数 `DD_APM_ENABLED` を `true` に設定します。`DD_SITE` 変数を {{< region-param key="dd_site" code="true" >}} に設定します。設定しない場合、デフォルトで `datadoghq.com` になります。
{{< /site-region >}}


2. セットアップに基づいてアプリケーションをインスツルメントします。

   **注**: Fargate APM のアプリケーションでは、`DD_AGENT_HOST` を**設定しない**でください。デフォルトの `localhost` で動作します。

   | 言語                           |
   |------------------------------------|
   | [Java][30] |
   | [Python][31] |
   | [Ruby][32] |
   | [Go][33] |
   | [Node.js][34] |
   | [PHP][35] |
   | [C++][36] |
   | [.NET Core][37] |
   | [.NET Framework][38] |

   [Datadog へのトレースの送信][39]の一般的な情報を参照してください。

3. アプリケーションが Datadog Agent コンテナと同じタスク定義内で実行されていることを確認します。

### プロセスの収集

<div class="alert alert-warning">Datadog で ECS Fargate プロセスを表示できます。ECS Fargate コンテナとの関係を確認するには、Datadog Agent v7.50.0 以降を使用します。</div>

[Live Processes ページ][40]を使用することで、ECS Fargate のプロセスを Datadog で監視することができます。プロセス収集を有効にするには、タスク定義に [`PidMode` パラメーター][41]を追加し、以下のように `task` に設定します。

```text
"pidMode": "task"
```
ECS でプロセスをフィルタリングするには、`AWS Fargate` コンテナファセットを使用するか、Live Processes ページの検索クエリに `fargate:ecs` と入力します。

## すぐに使えるタグ

Agent は、タグを自動検出して、タスク全体またはこのタスク内の個別のコンテナにより送信されたすべてのデータに関連付けます。自動的に関連付けられるタグのリストは、Agent の[カーディナリティ構成][42]に基づきます。

  | タグ                           | カーディナリティ  | ソース               |
  |-------------------------------|--------------|----------------------|
  | `container_name`              | 大         | ECS API              |
  | `container_id`                | 大         | ECS API              |
  | `docker_image`                | 小          | ECS API              |
  | `image_name`                  | 小          | ECS API              |
  | `short_image`                 | 小          | ECS API              |
  | `image_tag`                   | 小          | ECS API              |
  | `ecs_cluster_name`            | 小          | ECS API              |
  | `ecs_container_name`          | 小          | ECS API              |
  | `task_arn`                    | オーケストレーター | ECS API              |
  | `task_family`                 | 小          | ECS API              |
  | `task_name`                   | 小          | ECS API              |
  | `task_version`                | 小          | ECS API              |
  | `availability-zone`           | 小          | ECS API              |
  | `region`                      | 小          | ECS API              |

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "ecs_fargate" >}}


### ヘルプ

ECS Fargate チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "ecs_fargate" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][17]までお問合せください。

## その他の参考資料

- ブログ記事: [Datadog を使用した AWS Fargate アプリケーションの監視][43]
- よくあるご質問: [ECS Fargate のインテグレーションセットアップ][11]
- ブログ記事: [FireLens と Datadog を使用した Fargate コンテナログの監視][44]
- ブログ記事: [AWS Fargate 監視のための主要メトリクス][45]
- ブログ記事: [AWS Fargate ワークロードからのメトリクスおよびログの収集方法][46]
- ブログ記事: [Datadog を使用した AWS Fargate モニタリング][47]
- ブログ記事: [Graviton2 による AWS Fargate のデプロイメント][48]
- ブログ記事: [Windows コンテナ型アプリ向けに AWS Fargate を監視する][49]
- ブログ記事: [AWS Fargate 上で実行されるプロセスを Datadog で監視する][50]




[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-metadata-endpoint.html
[2]: https://docs.docker.com/engine/api/v1.30/#operation/ContainerStats
[3]: https://aws.amazon.com/console
[4]: https://aws.amazon.com/cli
[5]: https://aws.amazon.com/cloudformation/
[6]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[7]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[8]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_ecs.html
[9]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_replica
[10]: https://github.com/DataDog/integrations-core/blob/master/ecs_fargate/datadog_checks/ecs_fargate/data/conf.yaml.example
[11]: http://docs.datadoghq.com/integrations/faq/integration-setup-ecs-fargate
[12]: https://docs.datadoghq.com/ja/developers/dogstatsd/
[13]: https://docs.datadoghq.com/ja/agent/docker/#environment-variables
[14]: https://docs.aws.amazon.com/AmazonECS/latest/userguide/task_definition_parameters.html#container_definition_labels
[15]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cloudwatch-metrics.html
[16]: https://docs.datadoghq.com/ja/integrations/amazon_ecs/#data-collected
[17]: https://docs.datadoghq.com/ja/help/
[18]: https://github.com/aws-samples/amazon-ecs-firelens-examples/tree/mainline/examples/fluent-bit/datadog
[19]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html
[20]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definitions
[21]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html#firelens-using-fluentbit
[22]: https://github.com/aws-samples/amazon-ecs-firelens-examples/tree/master/examples/fluent-bit/parse-json
[23]: https://app.datadoghq.com/logs
[24]: https://docs.datadoghq.com/ja/monitors/monitor_types/
[25]: https://docs.datadoghq.com/ja/infrastructure/livecontainers/?tab=linuxwindows
[26]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ecs-taskdefinition-secret.html
[27]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html
[28]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html
[29]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[30]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/java?tab=containers#automatic-instrumentation
[31]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/python?tab=containers#instrument-your-application
[32]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#instrument-your-application
[33]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/go/?tab=containers#activate-go-integrations-to-create-spans
[34]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/nodejs?tab=containers#instrument-your-application
[35]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/php?tab=containers#automatic-instrumentation
[36]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/cpp?tab=containers#instrument-your-application
[37]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/dotnet-core?tab=containers#custom-instrumentation
[38]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/dotnet-framework?tab=containers#custom-instrumentation
[39]: https://docs.datadoghq.com/ja/tracing/setup/
[40]: https://app.datadoghq.com/process
[41]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#other_task_definition_params
[42]: https://docs.datadoghq.com/ja/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables
[43]: https://www.datadoghq.com/blog/monitor-aws-fargate
[44]: https://www.datadoghq.com/blog/collect-fargate-logs-with-firelens/
[45]: https://www.datadoghq.com/blog/aws-fargate-metrics/
[46]: https://www.datadoghq.com/blog/tools-for-collecting-aws-fargate-metrics/
[47]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/
[48]: https://www.datadoghq.com/blog/aws-fargate-on-graviton2-monitoring/
[49]: https://www.datadoghq.com/blog/aws-fargate-windows-containers-support/
[50]: https://www.datadoghq.com/blog/monitor-fargate-processes/
