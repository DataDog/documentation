---
description: Amazon Elastic Container Service マネージドインスタンスに Datadog Agent をインストールして設定する
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
- link: /agent/amazon_ecs/tags/
  tag: ドキュメント
  text: コンテナから送信された全データにタグを割り当てる
- link: https://www.datadoghq.com/blog/ecs-default-monitors/
  tag: ブログ
  text: デフォルトのモニターと ECS エクスプローラーを使用して、ECS の問題をより迅速に検出して修正します。
title: Amazon ECS マネージドインスタンス
---
Datadog Container Monitoring を使用すると、[Amazon ECS マネージドインスタンス][29]で実行されているアプリケーションを可視化できます。

### 仕組み {#how-it-works}
ECS マネージドインスタンスを Datadog で監視するには、Datadog Agentを**デーモンタスク**として実行します。デーモンタスクを使用すると、マネージドインスタンスがクラスターに参加するたびに、ECS が各ホストに自動的にデプロイできるようになります。これにより、アプリケーションのタスク定義を変更しなくても、インスタンス上のすべてのコンテナを完全に可視化できます。

## セットアップ{#setup}

<div class="alert alert-info">このセットアップには、Datadog Agent 7.77.0 以降が必要です。</div>

以下の手順は、ECS マネージドインスタンスクラスターが設定済みであることを前提としています。[クラスターの作成に関する Amazon ECS マネージドインスタンスのドキュメント][1]を参照してください。

1. [デーモンタスク定義ファイルを作成する](#create-a-daemon-task-definition-file)
2. [デーモンタスク定義を登録する](#register-the-daemon-task-definition)
3. [デーモンを作成する](#create-the-daemon)

### デーモンタスク定義ファイルを作成する {#create-a-daemon-task-definition-file}

この ECS デーモンタスク定義により、必要な設定で Datadog Agent コンテナが起動されます。

1. [datadog-agent-ecs-managed-instances-daemon.json][7] をダウンロードします。このファイルは、コアインフラストラクチャーの監視用の最小限の設定を提供します。さまざまな機能を有効にしたその他のサンプルデーモンタスク定義ファイルについては、このページの「[Agent のその他の機能の設定][27]」セクションを参照してください。
2. デーモンタスク定義ファイルを変更します。
    - `<YOUR_DATADOG_API_KEY>` をお使いのアカウントの [Datadog API キー][5]に置き換えて、`DD_API_KEY` 環境変数を設定します。または、[AWS Secrets Manager に保存されているシークレットの ARN を指定][9]することもできます。
    - `DD_SITE` 環境変数をお使いの [Datadog サイト][10]に設定します。サイトは以下のとおりです。{{< region-param key="dd_site" code="true" >}}
3. (オプション) Agent のヘルスチェックを追加するには、ECS デーモンタスク定義に以下を追加します。
    ```json
    "healthCheck": {
      "retries": 3,
      "command": ["CMD-SHELL","agent health"],
      "timeout": 5,
      "interval": 30,
      "startPeriod": 15
    }
    ```

### デーモンタスク定義を登録する {#register-the-daemon-task-definition}

{{< tabs >}}
{{% tab "AWS コンソール" %}}

1. [AWS コンソール][1]にログインし、[Elastic Container Service] セクションに移動します。
2. ナビゲーションペインで [{{< ui >}}Daemon Task Definitions{{< /ui >}}] (デーモンタスク定義) を選択します。[{{< ui >}}Create new daemon task definition{{< /ui >}}] (新しいデーモンタスク定義の作成) メニューで、[{{< ui >}}Create new daemon task definition with JSON{{< /ui >}}] (JSON で新しいデーモンタスク定義を作成する) を選択します。
3. JSON エディターボックスに、デーモンタスク定義ファイルの内容を貼り付けます。
4. [{{< ui >}}Create{{< /ui >}}] (作成) を選択します。

[1]: https://aws.amazon.com/console
{{% /tab %}}

{{% tab "AWS CLI" %}}
[AWS CLI][1] を使用して、以下のコマンドを実行します。

```bash
aws ecs register-daemon-task-definition --cli-input-json file://<path to datadog-agent-ecs-managed-instances-daemon.json>
```
[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}


### デーモンを作成する {#create-the-daemon}

デーモンはキャパシティプロバイダーにアタッチされ、そのキャパシティプロバイダー内の各マネージドインスタンスに自動的にデプロイされます。

{{< tabs >}}
{{% tab "AWS コンソール" %}}
1. [AWS Web コンソール][1]にログインし、[Elastic Container Service] セクションに移動します。
2. Datadog Agent を実行するクラスターを選択します。
3. [{{< ui >}}Daemons{{< /ui >}}] (デーモン) タブで、[{{< ui >}}Create{{< /ui >}}] をクリックします。
4. [{{< ui >}}Daemon Task Definition{{< /ui >}}] (デーモンタスク定義) で、前のステップで作成したデーモンタスク定義を選択します。
5. [{{< ui >}}Daemon name{{< /ui >}}] (デーモン名) を入力します。
6. [{{< ui >}}Capacity Provider{{< /ui >}}] (キャパシティプロバイダー) で、クラスターに関連付けられているキャパシティプロバイダーを選択します。
7. 必要に応じて、残りのオプションフィールドに入力します。
8. [{{< ui >}}Create{{< /ui >}}] をクリックします。

[1]: https://aws.amazon.com/console
{{% /tab %}}
{{% tab "AWS CLI" %}}
[AWS CLI][1] を使用して、以下のコマンドを実行します。

```bash
aws ecs create-daemon \
--daemon-name <DAEMON_NAME> \
--daemon-task-definition-arn <DAEMON_TASK_DEFINITION_ARN> \
--cluster-arn <CLUSTER_ARN> \
--capacity-provider-arns <CAPACITY_PROVIDER_ARN>
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

## Datadog Agent のその他の機能の設定 {#set-up-additional-datadog-agent-features}

### メトリクスの収集 {#metrics-collection}

インテグレーションを有効にするには、ECS タスク定義のアプリケーションコンテナに Docker ラベルアノテーションを追加します。

#### インテグレーションを追加する {#add-an-integration}

##### タスク定義を更新する {#update-the-task-definition}

{{< tabs >}}
{{% tab "AWS コンソール" %}}

1. [AWS Web コンソール][1]にログインし、ECS セクションに移動します。
2. アプリケーションが実行されているクラスターを選択します。
3. [{{< ui >}}Tasks{{< /ui >}}] (タスク) タブをクリックし、ご使用のアプリケーションの [{{< ui >}}Task definition{{< /ui >}}] (タスク定義) をクリックします。
4. [{{< ui >}}Create new revision{{< /ui >}}] (新規リビジョンの作成) ボタンをクリックします。
5. アプリケーションコンテナの下に、以下の [{{< ui >}}Docker labels{{< /ui >}}] (Docker ラベル) を追加します。

| キー                           | 値                                           |
|-------------------------------|-------------------------------------------------|
| com.datadoghq.ad.instances    | `[{"host": "%%host%%", "port": <PORT_NUMBER>}]` |
| com.datadoghq.ad.check_names  | `["<CHECK_NAME>"]`                              |
| com.datadoghq.ad.init_configs | `[{}]`                                          |

6. [{{< ui >}}Update{{< /ui >}}] (更新) ボタンをクリックし、[{{< ui >}}Create{{< /ui >}}] ボタンをクリックします。

[1]: https://aws.amazon.com/console
{{% /tab %}}
{{% tab "AWS CLI" %}}

タスク定義 JSON のアプリケーションコンテナに `dockerLabels` を追加し、[AWS CLI][1] を使用して新しいリビジョンを登録します。

```json
{
  "containerDefinitions": [
    {
      "name": "<APP_CONTAINER_NAME>",
      "dockerLabels": {
        "com.datadoghq.ad.instances": "[{\"host\": \"%%host%%\", \"port\": <PORT_NUMBER>}]",
        "com.datadoghq.ad.check_names": "[\"<CHECK_NAME>\"]",
        "com.datadoghq.ad.init_configs": "[{}]"
      }
    }
  ]
}
```

```bash
aws ecs register-task-definition --cli-input-json file://<path-to-task-definition.json>
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

##### サービスを更新する {#update-the-service}

{{< tabs >}}
{{% tab "AWS コンソール" %}}

1. クラスター内で [{{< ui >}}Services{{< /ui >}}] (サービス) タブをクリックし、[{{< ui >}}Service Name{{< /ui >}}] (サービス名) をクリックします。
2. [{{< ui >}}Update{{< /ui >}}] ボタンをクリックします。
3. [{{< ui >}}Task Definition{{< /ui >}}] で、ドロップダウンメニューから最新の [{{< ui >}}Revision{{< /ui >}}] (リビジョン) を選択します。
4. [{{< ui >}}Update Service{{< /ui >}}] (サービスの更新) ボタンをクリックします。

{{% /tab %}}
{{% tab "AWS CLI" %}}

[AWS CLI][1] を使用して、新しいタスク定義リビジョンでサービスを更新します。

```bash
aws ecs update-service --cluster <CLUSTER_NAME> \
--service <SERVICE_NAME> \
--task-definition <TASK_DEFINITION_ARN>
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

#### 例 {#examples}

{{< tabs >}}
{{% tab "AWS コンソール" %}}
以下の表を参考に、Redis コンテナの [AWS Web コンソール][1]から Docker ラベルを入力します。

| キー                           | 値                                  |
|-------------------------------|----------------------------------------|
| com.datadoghq.ad.instances    | `[{"host": "%%host%%", "port": 6379}]` |
| com.datadoghq.ad.check_names  | `["redisdb"]`                          |
| com.datadoghq.ad.init_configs | `[{}]`                                 |

[1]: https://aws.amazon.com/console
{{% /tab %}}
{{% tab "AWS CLI" %}}
[AWS CLI][1] を使用して Docker ラベル付きの Redis コンテナを構成するには、`containerDefinitions` で以下の JSON を使用してください。

```json
{
  "name": "redis",
  "image": "redis:latest",
  "essential": true,
  "dockerLabels": {
    "com.datadoghq.ad.instances": "[{\"host\": \"%%host%%\", \"port\": 6379}]",
    "com.datadoghq.ad.check_names": "[\"redisdb\"]",
    "com.datadoghq.ad.init_configs": "[{}]"
  }
}
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

#### 別の方法: 構成ファイルをマウントする {#alternative-mount-a-configuration-file}

構成ファイルを Datadog Agent コンテナに直接マウントして、カスタムインテグレーション構成を提供することもできます。

次のファイル構造を作成します。

```
|- datadog
  |- Dockerfile
  |- conf.d
    |-redis.yaml
```

`redis.yaml` ファイルには、[Redis][28] インテグレーション用の構成が含まれています。

{{< code-block lang="yaml" filename="redis.yaml" disable_copy="false" collapsible="true" >}}
ad_identifiers:
  - redis

init_config:

instances:
    - host: %%host%%
      port: 6379
{{< /code-block >}}

`Dockerfile` は、Datadog Agent イメージをビルドし、正しい場所に `redis.yaml` ファイルを含めるために使用されます。

{{< code-block lang="Dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
FROM public.ecr.aws/datadog/agent:latest

COPY conf.d/ /etc/datadog-agent/conf.d/
{{< /code-block >}}

イメージのビルドが完了し、イメージレジストリにイメージがプッシュされたら、ECS デーモンタスク定義でそのカスタムイメージを参照します。

```
{
    "containerDefinitions": [
        {
            "image": "<registry-domain>/<namespace-or-account>/<repository>:<tag>",
            "name": "datadog-agent",
            ...
        }
    ],
    ...
}
```

### トレースの収集 (APM) {#trace-collection-apm}

セットアップに基づいてアプリケーションをインスツルメントします。

| 言語                           |
|------------------------------------|
| [Java][17] |
| [Python][18] |
| [Ruby][19] |
| [Go][20] |
| [Node.js][21] |
| [PHP][22] |
| [C++][23] |
| [.NET Core][24] |
| [.NET Framework][25] |

#### UDS {#uds}

推奨される方法は、UDS (UNIX ドメインソケット) です。デーモンエージェントはホストファイルシステム上でソケットを公開しており、アプリケーションタスクは同じホストパスをマウントすることでこれにアクセスします。

完全なデーモンタスク定義については、サンプル [datadog-agent-ecs-managed-instances-daemon-apm.json][37] ファイルを参照してください。

**デーモンタスク定義を更新**して、`dd-sockets` ホストボリュームとマウントを追加します。

```json
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            ...
            "mountPoints": [
                ...
                {
                    "containerPath": "/var/run/datadog",
                    "readOnly": false,
                    "sourceVolume": "dd-sockets"
                }
            ]
        }
    ],
    "volumes": [
        ...
        {
            "host": {
                "sourcePath": "/var/run/datadog"
            },
            "name": "dd-sockets"
        }
    ]
}
```

Agent は `/var/run/datadog/apm.socket` および `/var/run/datadog/dsd.socket` でソケットファイルを保持します。

**各アプリケーションタスク定義を更新**して、同じホストパスをマウントし、トレーサーを設定します。

```json
{
    "containerDefinitions": [
        {
            "name": "<APP_CONTAINER_NAME>",
            ...
            "environment": [
                {
                    "name": "DD_TRACE_AGENT_URL",
                    "value": "unix:///var/run/datadog/apm.socket"
                }
            ],
            "mountPoints": [
                {
                    "containerPath": "/var/run/datadog",
                    "readOnly": true,
                    "sourceVolume": "dd-sockets"
                }
            ]
        }
    ],
    "volumes": [
        {
            "host": {
                "sourcePath": "/var/run/datadog"
            },
            "name": "dd-sockets"
        }
    ]
}
```

### ログ収集{#log-collection}

ECS マネージドインスタンス上のデーモンモードでは、Agent を介したコンテナログの収集はサポートされていません。

コンテナログを収集するには、以下のいずれかの代替手段を使用してください。

- **AWS FireLens**: アプリケーションタスク定義で Fluent Bit サイドカーを設定します。設定方法については、[ECS Fargate ログ収集のドキュメント][14]を参照してください。
- **`awslogs`ログドライバー**: ログを Amazon CloudWatch Logs にルーティングし、[CloudWatch Logs Lambda Forwarder][30] またはサブスクリプションフィルターを使用して Datadog に転送します。

### プロセス収集 {#process-collection}

すべてのコンテナのライブプロセス情報を収集し、Datadog に送信するには、`DD_PROCESS_AGENT_ENABLED` 環境変数を使用してデーモンタスク定義を更新します。

```json
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            ...
            "environment": [
                ...
                {
                    "name": "DD_PROCESS_AGENT_ENABLED",
                    "value": "true"
                }
            ]
        }
    ]
}
```

### Cloud Network Monitoring {#cloud-network-monitoring}

<div class="alert alert-danger">
この機能は、Linux でのみ使用可能です。
</div>

完全なデーモンタスク定義については、サンプル [datadog-agent-ecs-managed-instances-daemon-sysprobe.json][35] ファイルを参照してください。

以下の構成を含めるように既存のデーモンタスク定義を更新します。

```json
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            ...
            "environment": [
                ...
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
            "mountPoints": [
                ...
                {
                    "containerPath": "/sys/kernel/debug",
                    "sourceVolume": "debug",
                    "readOnly": false
                }
            ]
        }
    ],
    "volumes": [
        ...
        {
            "name": "debug",
            "host": {
                "sourcePath": "/sys/kernel/debug"
            }
        }
    ]
}
```

詳細については、[Cloud Network Monitoring][36] のドキュメントを参照してください。

## サイドカーからデーモンセットアップに移行する {#migrate-from-sidecar-to-daemon-setup}

次の手順に従って、従来のサイドカーデプロイメントからデーモンデプロイメントに移行します。

### 1. デーモンをセットアップする {#1-set-up-the-daemon}

このページの[セットアップ](#setup)手順に従って、デーモンタスク定義を作成および登録し、クラスター上にデーモンを作成します。

### 2. アプリケーションタスク定義から Datadog Agent サイドカーを削除する {#2-remove-the-datadog-agent-sidecar-from-application-task-definitions}

`datadog-agent` サイドカーコンテナを含む各アプリケーションタスク定義で、`containerDefinitions` から `datadog-agent` エントリを削除します。

### 3. APM 構成を更新する {#3-update-apm-configuration}

デーモンエージェントは、共有のタスク内ボリュームを介してではなく、ホストファイルシステム上でトレースソケットを公開します。ホストパスを使用するように各アプリケーションタスク定義を更新します。

サイドカーセットアップで使用されていた空の共有ボリューム (`"host": {}`) を **削除**し、ホストパスボリュームに**置き換え**ます。

```json
{
    "containerDefinitions": [
        {
            "name": "<APP_CONTAINER_NAME>",
            "environment": [
                {
                    "name": "DD_TRACE_AGENT_URL",
                    "value": "unix:///var/run/datadog/apm.socket"
                }
            ],
            "mountPoints": [
                {
                    "containerPath": "/var/run/datadog",
                    "readOnly": true,
                    "sourceVolume": "dd-sockets"
                }
            ]
        }
    ],
    "volumes": [
        {
            "host": {
                "sourcePath": "/var/run/datadog"
            },
            "name": "dd-sockets"
        }
    ]
}
```

以前に UDP を介して (サイドカーの `localhost` アドレスを使用して) トレースを収集していた場合は、上記の構成を使用して UDS に切り替えてください。

### 4. プロセス収集を更新する {#4-update-process-collection}

サイドカーセットアップでは、`pidMode: task` を使用してプロセス収集を有効にしていました。デーモンセットアップでは、代わりに `DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED` 環境変数を使用します。

アプリケーションタスク定義から `pidMode` パラメーターを削除します。次に、デーモンタスク定義に以下が含まれていることを確認します。

```json
{
    "name": "DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED",
    "value": "true"
}
```

### 5. 更新されたタスク定義を登録してデプロイする {#5-register-and-deploy-the-updated-task-definitions}

上記の変更が完了したら、更新された各アプリケーションタスク定義を登録し、関連するサービスを再デプロイします。

{{< tabs >}}
{{% tab "AWS コンソール" %}}

1. AWS コンソールで、[{{< ui >}}Elastic Container Service{{< /ui >}}] > [{{< ui >}}Task Definitions{{< /ui >}}] に移動します。
2. アプリケーションタスク定義を選択し、[{{< ui >}}Create new revision with JSON{{< /ui >}}] (JSON で新しいリビジョンを作成する) をクリックします。
3. 変更を適用し、[{{< ui >}}Create{{< /ui >}}] をクリックします。
4. このタスク定義を使用しているサービスに移動し、[{{< ui >}}Update{{< /ui >}}] をクリックして、新しいリビジョンを選択し、[{{< ui >}}Update Service{{< /ui >}}] をクリックします。

{{% /tab %}}
{{% tab "AWS CLI" %}}

```bash
aws ecs register-task-definition --cli-input-json file://<path-to-updated-task-definition.json>
aws ecs update-service --cluster <CLUSTER_NAME> --service <SERVICE_NAME> --task-definition <NEW_TASK_DEFINITION_ARN>
```

{{% /tab %}}
{{< /tabs >}}

## サイドカーセットアップ (レガシー) {#sidecar-setup-legacy}

<div class="alert alert-warning">

デーモンスケジューリングは、ECS マネージドインスタンスで推奨されるデプロイ方法です。新しいデプロイでは、代わりに[デーモンセットアップ][34]を使用する必要があります。

</div>

サイドカーデプロイモデルでは、Datadog Agent は各アプリケーションタスク定義内の追加コンテナとして実行されます。

### タスク定義ファイルを作成する {#create-the-task-definition-file}

1. [datadog-agent-ecs-managed-instances-sidecar.json][31] をダウンロードします。このファイルは、コアインフラストラクチャーの監視用の最小限の設定を提供します。
2. タスク定義ファイルを変更します。
    - `<YOUR_API_KEY>` をお使いのアカウントの [Datadog API キー][5]に置き換えて、`DD_API_KEY` 環境変数を設定します。または、[AWS Secrets Manager に保存されているシークレットの ARN を指定][9]することもできます。
    - `DD_SITE` 環境変数をお使いの [Datadog サイト][10]に設定します。サイトは以下のとおりです。{{< region-param key="dd_site" code="true" >}}

### タスク定義を登録する {#register-the-task-definition}

{{< tabs >}}
{{% tab "AWS コンソール" %}}

1. [AWS コンソール][1]にログインし、[Elastic Container Service] セクションに移動します。
2. ナビゲーションペインで [{{< ui >}}Task Definitions{{< /ui >}}] を選択します。[{{< ui >}}Create new task definition{{< /ui >}}] (新しいタスク定義の作成) メニューで、[{{< ui >}}Create new task definition with JSON{{< /ui >}}] (JSON で新しいタスク定義を作成する) を選択します。
3. JSON エディターボックスに、タスク定義ファイルの内容を貼り付けます。
4. [{{< ui >}}Create{{< /ui >}}] を選択します。

[1]: https://aws.amazon.com/console
{{% /tab %}}

{{% tab "AWS CLI" %}}
[AWS CLI][1] を使用して、以下のコマンドを実行します。

```bash
aws ecs register-task-definition --cli-input-json file://<path to datadog-agent-ecs-managed-instances-sidecar.json>
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

### レプリカサービスとしてタスクを実行する {#run-the-task-as-a-replica-service}

{{< tabs >}}
{{% tab "AWS コンソール" %}}

1. [AWS Web コンソール][1]にログインし、[Elastic Container Service] セクションに移動します。
2. Datadog Agent を実行するクラスターを選択します。
3. [{{< ui >}}Services{{< /ui >}}] タブで、[{{< ui >}}Create{{< /ui >}}] をクリックします。
4. [{{< ui >}}Task Definition{{< /ui >}}] で、前のステップで作成したタスクを選択します。
5. [{{< ui >}}Service name{{< /ui >}}] を入力します。
6. [{{< ui >}}Launch type{{< /ui >}}] (起動タイプ) で、[{{< ui >}}Capacity Provider{{< /ui >}}] (キャパシティプロバイダー) を選択し、クラスターに関連付けられているマネージドインスタンスキャパシティプロバイダーを選択します。
7. [{{< ui >}}Number of tasks{{< /ui >}}] (タスクの数) に `1` と入力します。[{{< ui >}}Next step{{< /ui >}}] (次のステップ) をクリックします。
8. 必要に応じて、残りのオプションフィールドに入力します。
9. [{{< ui >}}Create service{{< /ui >}}] (サービスの作成) をクリックします。

[1]: https://aws.amazon.com/console
{{% /tab %}}

{{% tab "AWS CLI" %}}
[AWS CLI][1] を使用して、以下のコマンドを実行します。

```bash
aws ecs create-service --cluster <CLUSTER_NAME> \
--service-name <SERVICE_NAME> \
--task-definition <TASK_DEFINITION_ARN> \
--desired-count 1
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

### トレースの収集 (APM) {#trace-collection-apm-1}

#### UDP {#udp}

UDP を介してトレースを収集する場合は、`DD_AGENT_HOST` を設定しないでください。デフォルトの `localhost` 値のままにします。

#### UDS {#uds-1}

UDS を介してトレースを収集するには、次のようにします。
1. `volumes` パラメーターを使用して、空のボリュームをタスク定義に追加します。
2. `mountPoints` パラメーターを使用して、エージェントおよびアプリケーションコンテナにボリュームをマウントします。
3. アプリケーションコンテナで環境変数 `DD_DOGSTATSD_SOCKET` を構成し、`/var/run/datadog/dsd.socket` に設定します。

**例**: UDS を介したトレース収集を構成するコンテナ定義

```json
{
    "containerDefinitions": [
        {
            "image": "public.ecr.aws/datadog/agent:latest",
            "mountPoints": [
                {
                    "containerPath": "/var/run/datadog",
                    "readOnly": false,
                    "sourceVolume": "dd-sockets"
                }
            ],
            "name": "datadog-agent",
            ...
        },
        {
            "environment": [
                {
                    "name": "DD_DOGSTATSD_SOCKET",
                    "value": "/var/run/datadog/dsd.socket"
                }
            ],
            "mountPoints": [
                {
                    "containerPath": "/var/run/datadog",
                    "readOnly": false,
                    "sourceVolume": "dd-sockets"
                }
            ],
            "name": "app",
            ...
        }
    ],
    "volumes": [
        {
            "host": {},
            "name": "dd-sockets"
        }
    ]
}
```

### プロセス収集 {#process-collection-1}

[Live Processes ページ][32]を使用して、Datadog で ECS マネージドインスタンスのプロセスを監視できます。プロセス収集を有効にするには、タスク定義に [`PidMode` パラメーター][33] を追加し、次のようにして `task` に設定します。

```json
"pidMode": "task"
```

## トラブルシューティング {#troubleshooting}

サポートが必要な場合は、[Datadog サポート][26]にお問い合わせください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/getting-started-managed-instances.html
[5]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /ja/resources/json/datadog-agent-ecs-managed-instances-daemon.json
[9]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[10]: /ja/getting_started/site/
[14]: https://docs.datadoghq.com/ja/integrations/ecs_fargate/?tab=awscli#log-collection
[17]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/java?tab=containers#automatic-instrumentation
[18]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/python?tab=containers#instrument-your-application
[19]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/ruby#instrument-your-application
[20]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/go/?tab=containers#activate-go-integrations-to-create-spans
[21]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/nodejs?tab=containers#instrument-your-application
[22]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/php?tab=containers#automatic-instrumentation
[23]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/cpp?tab=containers#instrument-your-application
[24]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/dotnet-core?tab=containers#custom-instrumentation
[25]: https://docs.datadoghq.com/ja/tracing/trace_collection/dd_libraries/dotnet-framework?tab=containers#custom-instrumentation
[26]: https://docs.datadoghq.com/ja/help/
[27]: #set-up-additional-datadog-agent-features
[28]: https://docs.datadoghq.com/ja/integrations/redis/?tab=ecs
[29]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ManagedInstances.html
[30]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[31]: /ja/resources/json/datadog-agent-ecs-managed-instances-sidecar.json
[32]: /ja/process
[33]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#task_definition_pidmode
[34]: #setup
[35]: /ja/resources/json/datadog-agent-ecs-managed-instances-daemon-sysprobe.json
[36]: /ja/network_monitoring/cloud_network_monitoring/
[37]: /ja/resources/json/datadog-agent-ecs-managed-instances-daemon-apm.json