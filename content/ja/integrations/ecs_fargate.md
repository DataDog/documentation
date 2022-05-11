---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Amazon Fargate: assets/dashboards/amazon_fargate_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- aws
- containers
- log collection
- orchestration
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ecs_fargate/README.md
display_name: Amazon Fargate
draft: false
git_integration_title: ecs_fargate
guid: 7484e55c-99ec-45ad-92f8-28e798796411
integration_id: aws-fargate
integration_title: Amazon ECS on AWS Fargate
integration_version: 3.1.1
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ecs.
metric_to_check: ecs.fargate.cpu.user
name: ecs_fargate
public_title: Datadog-Amazon ECS on AWS Fargate インテグレーション
short_description: ECS Fargate を使用して実行中のコンテナのメトリクスを追跡する
support: コア
supported_os:
- linux
- mac_os
- windows
---



## 概要

**注**: このページでは、ECS Fargate インテグレーションについて説明します。EKS Fargate については、Datadog の[EKS Fargate インテグレーション][1]のドキュメントを参照してください。

ECS Fargate で実行されているすべてのコンテナからメトリクスを取得します。

- CPU/メモリ使用量および制限のメトリクス
- Datadog インテグレーションまたはカスタムメトリクスを使用して、Fargate で実行されているアプリケーションを監視

Datadog Agent は、ECS のタスクメタデータエンドポイントでタスク定義のコンテナのメトリクスを取得します。このエンドポイントに関する [ECS のドキュメント][2]には、以下のように記載されています。

このエンドポイントは、タスクに関連付けられたすべてのコンテナの Docker 統計 JSON を返します。返される統計の詳細については、Docker API ドキュメント内の [ContainerStats][3] を参照してください。

タスクメタデータエンドポイントは、タスク定義自体の内部からのみ使用できます。このため、Datadog Agent をタスク定義内の追加コンテナとして実行する必要があります。

このメトリクスの収集を有効にするために必要な構成は、タスク定義内で環境変数 `ECS_FARGATE` を `"true"` にすることだけです。

## セットアップ

以下の手順では、AWS ECS Fargate 内で Datadog Container Agent をセットアップします。**注**: Fargate インテグレーションを最大限活用するには、Datadog Agent バージョン 6.1.1 以降が必要です。

Datadog Agent を持たないタスクも Cloudwatch でメトリクスを報告しますが、Autodiscovery、詳細なコンテナメトリクス、トレーシングなどの機能には Agent が必要です。さらに、Cloudwatch メトリクスは粒度が低く、Datadog Agent を通じて直接発送されるメトリクスより報告のレイテンシーが高くなります。

### インストール

Datadog で ECS Fargate タスクを監視するには、アプリケーションと同じタスク定義内のコンテナとして Agent を実行します。Datadog でメトリクスを収集するには、各タスク定義にアプリケーションコンテナのほかに Datadog Agent コンテナを含める必要があります。以下のセットアップ手順を実行します。

1. **ECS Fargate タスクの作成**
2. **IAM ポリシーの作成と修正**
3. **レプリカサービスとしてのタスクの実行**

#### ECS Fargate タスクの作成

Fargate の主要な作業単位はタスクで、これはタスク定義内で設定されます。タスク定義は、Kubernetes のポッドに相当します。タスク定義には 1 つ以上のコンテナが含まれる必要があります。Datadog Agent を実行するには、アプリケーションコンテナおよび Datadog Agent コンテナを実行するためのタスク定義を作成します。

以下の手順は、[AWS CLI ツール][4]または [Amazon Web Console][5] を使用したタスクの構成方法を示します。

##### Web UI

1. [AWS Web Console][5] にログインし、ECS セクションに移動します。
2. 左メニューの **Task Definitions** をクリックし、**Create new Task Definition** ボタンをクリックします。
3. 起動タイプとして **Fargate** を選択し、**Next step** ボタンをクリックします。
4. **Task Definition Name** にタスク定義名を入力します (`my-app-and-datadog` など)。
5. タスク実行 IAM ロールを選択します。下の [IAM ポリシーの作成と修正](#create-or-modify-your-iam-policy)セクションで、権限の要件を確認します。
6. ニーズに合わせて **Task memory** と **Task CPU** を選択します。
7. **Add container** ボタンをクリックします。
8. **Container name** に `datadog-agent` と入力します。
9. **Image** に `datadog/agent:latest` と入力します。
10. **Memory Limits** に、ソフト制限として `256` を入力します。
11. **Advanced container configuration** セクションまでスクロールし、**CPU units** に `10` と入力します。
12. **Env Variables** に**キー** `DD_API_KEY` を追加し、[Datadog API キー][6]を値として入力します。_シークレットを s3 に保存する場合は、[ECS 構成ガイド][7]を参照してください_。
13. **キー** `ECS_FARGATE` と値 `true` を使用して、もう 1 つ環境変数を追加します。**Add** をクリックしてコンテナを追加します。
14. **Key** `DD_SITE` と値 {{< region-param key="dd_site" code="true" >}} を使用して、別の環境変数を追加します。設定しない場合、これはデフォルトで `datadoghq.com` になります。
15. (Windows のみ) 作業ディレクトリとして `C:\` を選択します。
16. アプリなどの他のコンテナを追加します。インテグレーションメトリクスの収集の詳細については、[ECS Fargate のインテグレーションセットアップ][8]を参照してください。
17. **Create** をクリックしてタスク定義を作成します。

##### AWS CLI

1. [datadog-agent-ecs-fargate][9] をダウンロードします。**注**: Internet Explorer をお使いの場合は、以下に記載の JSON ファイルを含む gzip ファイルとしてダウンロードされる場合があります。
2. JSON を `TASK_NAME`、[Datadog API キー][6]、および適切な `DD_SITE` ({{< region-param key="dd_site" code="true" >}}) で更新します。**注**: 環境変数 `ECS_FARGATE` はすでに `"true"` に設定されています。
3. アプリなどの他のコンテナを追加します。インテグレーションメトリクスの収集の詳細については、[ECS Fargate のインテグレーションセットアップ][8]を参照してください。
4. 次のコマンドを実行して ECS タスク定義を登録します。

```bash
aws ecs register-task-definition --cli-input-json file://<ファイルへのパス>/datadog-agent-ecs-fargate.json
```

##### AWS CloudFormation

 [AWS CloudFormation][10] テンプレートを使用して Fargate コンテナを構成することができます。CloudFormation テンプレート内で `AWS::ECS::TaskDefinition` リソースを使用して Amazon ECS タスクを設定し、そのタスクで必要な起動タイプとして `FARGATE` を指定します。

例:

```yaml
Resources:
  ECSTDNJH3:
    Type: 'AWS::ECS::TaskDefinition'
    Properties:
      NetworkMode: awsvpc
      RequiresCompatibilities:
          - FARGATE
      Cpu: 256
      Memory: 1GB
      ContainerDefinitions:
        - Name: datadog-agent
          Image: 'gcr.io/datadoghq/agent:latest'
          Cpu: 100
          Memory: 256MB
```

CloudFormation のテンプレートと統語法に関する詳細は、[AWS CloudFormation ドキュメント][11]をご参照ください。

#### IAM ポリシーの作成と修正

ECS Fargate のメトリクスを収集するには、次のアクセス許可を [Datadog IAM ポリシー][12]に追加します。詳細については、AWS ウェブサイト上の [ECS ポリシー][13]を参照してください。

| AWS アクセス許可                   | 説明                                                       |
| -------------------------------- | ----------------------------------------------------------------- |
| `ecs:ListClusters`               | 使用できるクラスターをリストします。                                          |
| `ecs:ListContainerInstances`     | クラスターのインスタンスをリストします。                                      |
| `ecs:DescribeContainerInstances` | リソースおよび実行中のタスクに関するメトリクスを追加するためのインスタンスを記述します。 |

#### レプリカサービスとしてのタスクの実行

ECS Fargate では、タスクを [Replica サービス][14]として実行するオプションしかありません。Datadog Agent は、アプリケーションやインテグレーションコンテナと同じタスク定義内で実行されます。

##### AWS CLI

[AWS CLI ツール][4]を使用して次のコマンドを実行します。

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

##### Web UI

1. [AWS Web Console][5] にログインし、ECS セクションに移動します。必要に応じて、**Networking only** クラスターテンプレートを使用してクラスターを作成します。
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

### メトリクスの収集

上述のように Datadog Agent をセットアップすると、オートディスカバリーを有効にした状態で [ecs_fargate チェック][15]がメトリクスを収集します。その他のメトリクスを収集するには、同じタスク内の他のコンテナに Docker ラベルを追加します。

インテグレーションメトリクスの収集の詳細については、[ECS Fargate のインテグレーションセットアップ][8]を参照してください。

#### DogStatsD

メトリクスは [DogStatsD][16] を使用して UDP ポート 8125 を介して収集されます。

他のコンテナからの DogStatsD パケットをリスニングすることによってカスタムメトリクスを送信するには、Datadog Agent コンテナ内の環境変数 `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` を `true` に設定します。

#### その他の環境変数

Docker Agent コンテナと共に使用できる環境変数については、[Docker Agent][17] ページを参照してください。**注**: 一部の変数は Fargate では使用できません。


| 環境変数               | 説明                                    |
|------------------------------------|------------------------------------------------|
| `DD_DOCKER_LABELS_AS_TAGS`         | docker コンテナラベルを抽出します                |
| `DD_CONTAINER_LABELS_AS_TAGS`      | コンテナラベルを抽出する                       |
| `DD_DOCKER_ENV_AS_TAGS`            | docker コンテナー環境変数を抽出します |
| `DD_CONTAINER_ENV_AS_TAGS`         | コンテナ環境変数を抽出する        |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | ポッドラベルを抽出します                             |
| `DD_CHECKS_TAG_CARDINALITY`        | タグをチェックメトリクスに追加します                      |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | タグをカスタムメトリクスに追加します                     |

グローバルなタグ付けには、`DD_CONTAINER_LABELS_AS_TAGS` の使用をお勧めします。Agent は、この方法を使用して、コンテナラベルからタグを取得します。それには、他のコンテナに適切なラベルを追加する必要があります。ラベルは、[タスク定義][18]で直接追加できます。

Agent コンテナのフォーマット

```json
{
  "name": "DD_CONTAINER_LABELS_AS_TAGS",
  "value": "{\"<LABEL_NAME_TO_COLLECT>\":\"<TAG_KEY_FOR_DATADOG>\"}"
}
```

Agent コンテナの例

```json
{
  "name": "DD_CONTAINER_LABELS_AS_TAGS",
  "value": "{\"com.docker.compose.service\":\"service_name\"}"
}
```

CloudFormation 例 (YAML):

```yaml
      ContainerDefinitions:
        - 
          Environment:
            - Name: DD_CONTAINER_LABELS_AS_TAGS
              Value: "{\"com.docker.compose.service\":\"service_name\"}"
```

**注**: `DD_HOSTNAME` を使用しないでください。Fargate には、ユーザーに対するホストという概念がないからです。従来からホストタグを割り当てるために `DD_TAGS` が使用されていますが、Datadog Agent バージョン 6.13.0 では、環境変数を使用してインテグレーションメトリクスにグローバルタグを設定することもできます。

### クローラーベースのメトリクス

Datadog Agent によって収集されるメトリクスのほかに、Datadog には CloudWatch ベースの ECS インテグレーションがあります。このインテグレーションは、[Amazon ECS CloudWatch メトリクス][19]を収集します。

そこに記載されているように、Fargate タスクも次のようにメトリクスを報告します。

使用できるメトリクスは、クラスター内のタスクとサービスの起動タイプによって異なります。サービスに Fargate 起動タイプを使用している場合は、サービスの監視に役立つように、CPU とメモリの使用率メトリクスが提供されます。

この方法は Datadog Agent を使用しないため、インテグレーションタイルで **ECS** をチェックすることで、AWS インテグレーションを構成する必要があります。これで、自動的に Datadog が CloudWatch メトリクス (Datadog 内の `aws.ecs.*` ネームスペースを使用) を取得します。ドキュメントの[収集データ][20]セクションを参照してください。

必要なメトリクスがこれだけの場合は、このインテグレーションに依存して CloudWatch メトリクスを使用して収集できます。**注**: CloudWatch データは粒度が低く (有効にした監視の種類に応じて 1-5 分)、Datadog への報告にも遅延があります。これは、Agent を使用して Datadog にデータをプッシュするのではなく、AWS の API 制限の範囲内で CloudWatch からデータを収集する必要があるためです。

Datadog のデフォルトの CloudWatch クローラーは、10 分ごとにメトリクスをポーリングします。クローリングスケジュールを速くする必要がある場合は、それが可能かどうかを [Datadog のサポートチーム][21]にお問い合わせください。**注**: CloudWatch の API 呼び出しは課金対象なので、AWS 側のコストが増大します。

### ログの収集

Datadog の Fluentbit アウトプットプラグインに構築されている AWS FireLens インテグレーションを使用してログを Datadog に送信したり、`awslogs` ログドライバーと Lambda 関数を使用してログをルーティングしたりすることで、Fargate ログを監視できます。AWS FireLens を使用すると Fluent Bit を Fargate タスクで直接構成できるため、Datadog では AWS FireLens の使用をお勧めしています。

{{< tabs >}}
{{% tab "Fluent Bit and Firelens" %}}
#### Fluent Bit と FireLens

Datadog の Fluent Bit アウトプットプラグインに組み込まれている AWS FireLens インテグレーションを構成して、監視している FireLens のログデータを Datadog ログと接続します。

1. Fargate タスクの FireLens ログルーターコンテナで Fluent Bit を有効化します。FireLens の有効化については、専用の [AWS Firelens ドキュメント][1]を参照してください。Fargate コンテナの定義については、[AWS コンテナ定義ドキュメント][2]を参照してください。AWS では、[リージョン別 Docker イメージ][3]の使用を推奨しています。下記に、Fluent Bit イメージが構成されたタスク定義の例を示します。

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

    コンテナがシリアル化された JSON ログを stdout 上で公開している場合は、ログが Datadog 内で正しくパースされるよう、次の [追加 Firelens コンフィギュレーション][4]を使用する必要があります。

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

    これにより、シリアル化された JSON が `log:` フィールドから上位レベルのフィールドに変換されます。詳細については、[JSON がシリアル化されたコンテナの stdout ログをパースしている][4] AWS サンプルを参照してください。

2. 次に、同じ Fargate タスクで、AWS FireLens をログドライバーとして使用し、Fluent Bit にデータが出力されるようにログコンフィギュレーションを定義します。下記に、ログドライバーに FireLens が使用され、Fluent Bit にデータを出力しているタスク定義の例を示します。
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

  **注**: Datadog EU サイトのオーガニゼーションをご利用の場合は、代わりに `Host` オプションとして `http-intake.logs.datadoghq.eu` を使用してください。ご利用可能なパラメーターの全リストは [Datadog Fluentbit ドキュメント][5]に記載されています。

3. Fargate タスクの実行中は常に、Fargate タスクが管理するコンテナの情報を監視しながら、Fluent Bit から Datadog にコンテナログが送信されるようになります。[Log Explorer ページ][6]で生ログを確認したり、ログ用の[モニターを作成][7]し [Live Container ビュー][8]で確認したりすることが可能です。

[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definitions
[3]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html#firelens-using-fluentbit
[4]: https://github.com/aws-samples/amazon-ecs-firelens-examples/tree/master/examples/fluent-bit/parse-json
[5]: https://docs.datadoghq.com/ja/integrations/fluentbit/#configuration-parameters
[6]: https://app.datadoghq.com/logs
[7]: https://docs.datadoghq.com/ja/monitors/monitor_types/
[8]: https://docs.datadoghq.com/ja/infrastructure/livecontainers/?tab=linuxwindows
{{% /tab %}}
{{% tab "logDriver" %}}

#### AWS ログドライバー

`awslogs` ログドライバーと Lambda 関数を使用して Fargate ログを監視し、Datadog にルーティングします。

1. タスクに Fargate AwsLogDriver を定義します。手順については、[AWS Fargate 開発者ガイドを参照してください][1]。

2. Fargate タスク定義は、ログ構成で awslogs ログドライバーのみをサポートします。これは、Fargate タスクがログ情報を Amazon CloudWatch Logs に送信するように構成します。次は、awslogs ログドライバーを構成するためのタスク定義のスニペットです。

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

    タスク定義で awslogs ログドライバーを使用して、コンテナログを CloudWatch Logs に送信する方法については、[awslogs  ログドライバーを使用する][2]を参照してください。このドライバーは、コンテナが生成したログを収集し、CloudWatch に直接送信します。

3. 最後に、[Lambda 関数][3]を使用して CloudWatch からログを収集し、Datadog に送信します。


[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html
[3]: https://docs.datadoghq.com/ja/integrations/amazon_lambda/#log-collection
{{% /tab %}}
{{< /tabs >}}


### AWS CloudFormation

[AWS CloudFormation][10] のテンプレートを使用するには、`AWS::ECS::TaskDefinition` リソースを使用し、`Datadog` オプションを設定して、ログ管理を構成する必要があります。

例えば、Fluent Bit が Datadog にログを送信するように構成する場合

{{< site-region region="us" >}}
```yaml
Resources:
  ECSTDNJH3:
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
              Host: http-intake.logs.datadoghq.com
              TLS: 'on'
              dd_service: test-service
              dd_source: test-source
              provider: ecs
              apikey: <API_KEY>
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
  ECSTDNJH3:
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
              Host: http-intake.logs.us3.datadoghq.com
              TLS: 'on'
              dd_service: test-service
              dd_source: test-source
              provider: ecs
              apikey: <API_KEY>
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
  ECSTDNJH3:
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
              Host: http-intake.logs.us5.datadoghq.com
              TLS: 'on'
              dd_service: test-service
              dd_source: test-source
              provider: ecs
              apikey: <API_KEY>
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
  ECSTDNJH3:
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
              Host: http-intake.logs.datadoghq.eu
              TLS: 'on'
              dd_service: test-service
              dd_source: test-source
              provider: ecs
              apikey: <API_KEY>
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
  ECSTDNJH3:
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
              Host: http-intake.logs.ddog-gov.datadoghq.com
              TLS: 'on'
              dd_service: test-service
              dd_source: test-source
              provider: ecs
              apikey: <API_KEY>
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

**注**: プレーンテキストで `apikey` を公開しないようにするには、[TaskDefinition シークレット][22]を使用します。

CloudFormation のテンプレートと統語法に関する詳細は、[AWS CloudFormation ドキュメント][11]をご参照ください。

### トレースの収集

1. [上の手順](#installation)に従ってタスク定義に Datadog Agent コンテナを追加し、追加の環境変数 `DD_APM_ENABLED` を `true` に設定し、ポートマッピングでホストポート（**8126** と **tcp** プロトコルを使用）を設定します。`DD_SITE` 変数を {{< region-param key="dd_site" code="true" >}} に設定します。設定しない場合、デフォルトで `datadoghq.com` になります。

2. 現在のセットアップに基づいて[アプリケーションをインスツルメントします][23]。

3. アプリケーションが Datadog Agent コンテナと同じタスク定義内で実行されていることを確認します。

## すぐに使えるタグ

Agent は、タグを自動検出して、タスク全体またはこのタスク内の個別のコンテナにより送信されたすべてのデータにアタッチします。自動的にアタッチされるタグのリストは、Agent の[カーディナリティコンフィギュレーション][24]に基づきます。

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
  | `availability_zone`           | 小          | ECS API              |
  | `region`                      | 小          | ECS API              |

## 収集データ

### メトリクス
{{< get-metrics-from-git "ecs_fargate" >}}
 また、どれが Linux 専用なのかも明記されています。

### イベント

ECS Fargate チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "ecs_fargate" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][21]までお問合せください。

## その他の参考資料

- ブログ記事: [Datadog を使用した AWS Fargate アプリケーションの監視][25]
- よくあるご質問: [ECS Fargate のインテグレーションセットアップ][8]
- ブログ記事: [FireLens と Datadog を使用した Fargate コンテナログの監視][26]
- ブログ記事: [AWS Fargate 監視のための主要メトリクス][27]
- ブログ記事: [AWS Fargate ワークロードからのメトリクスおよびログの収集方法][28]
- ブログ記事: [Datadog を使用した AWS Fargate モニタリング][29]
- ブログ記事: [Graviton2 による AWS Fargate のデプロイ][30]
- ブログ記事: [Windows コンテナ型アプリ向けに AWS Fargate を監視する][31]



[1]: http://docs.datadoghq.com/integrations/eks_fargate
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-metadata-endpoint.html
[3]: https://docs.docker.com/engine/api/v1.30/#operation/ContainerStats
[4]: https://aws.amazon.com/cli
[5]: https://aws.amazon.com/console
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-agent-config.html#ecs-config-s3
[8]: http://docs.datadoghq.com/integrations/faq/integration-setup-ecs-fargate
[9]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs-fargate.json
[10]: https://aws.amazon.com/cloudformation/
[11]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-service.html
[12]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[13]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_ecs.html
[14]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_replica
[15]: https://github.com/DataDog/integrations-core/blob/master/ecs_fargate/datadog_checks/ecs_fargate/data/conf.yaml.example
[16]: https://docs.datadoghq.com/ja/developers/dogstatsd/
[17]: https://docs.datadoghq.com/ja/agent/docker/#environment-variables
[18]: https://docs.aws.amazon.com/AmazonECS/latest/userguide/task_definition_parameters.html#container_definition_labels
[19]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cloudwatch-metrics.html
[20]: https://docs.datadoghq.com/ja/integrations/amazon_ecs/#data-collected
[21]: https://docs.datadoghq.com/ja/help/
[22]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ecs-taskdefinition-secret.html
[23]: https://docs.datadoghq.com/ja/tracing/setup/
[24]: https://docs.datadoghq.com/ja/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables
[25]: https://www.datadoghq.com/blog/monitor-aws-fargate
[26]: https://www.datadoghq.com/blog/collect-fargate-logs-with-firelens/
[27]: https://www.datadoghq.com/blog/aws-fargate-metrics/
[28]: https://www.datadoghq.com/blog/tools-for-collecting-aws-fargate-metrics/
[29]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/
[30]: https://www.datadoghq.com/blog/aws-fargate-on-graviton2-monitoring/
[31]: https://www.datadoghq.com/blog/aws-fargate-windows-containers-support/