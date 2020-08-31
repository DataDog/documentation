---
aliases:
  - /ja/integrations/ecs/
categories:
  - cloud
  - containers
  - aws
  - log collection
ddtype: check
dependencies: []
description: コンテナ ステータスのモニタリングやリソース使用状況のトラッキングなど。
doc_link: 'https://docs.datadoghq.com/integrations/amazon_ecs/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/amazon-ecs-metrics'
    tag: ブログ
    text: キー ECS メトリクスの監視
  - link: 'https://docs.datadoghq.com/integrations/ecs_fargate'
    tag: Documentation
    text: ECS Fargate インテグレーション
git_integration_title: amazon_ecs
has_logo: true
integration_title: Amazon ECS on EC2
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_ecs
public_title: Datadog-Amazon ECS on EC2 インテグレーション
short_description: コンテナ ステータスのモニタリングやリソース使用状況のトラッキングなど。
version: '1.0'
---
## 概要

Amazon ECS on EC2 は、EC2 インスタンスで実行される Docker コンテナ用の拡張性とパフォーマンスに優れたコンテナ管理サービスです。

このページは [Datadog コンテナ Agent v6][1] を使用した AWS ECS のセットアップについて説明します。他のセットアップについては、以下を参照してください。

- [AWS ECS 向け Datadog コンテナエージェント v5 のセットアップ][2]
- [オートディスカバリーを使用した Datadog Host Agent のセットアップ][3]

## セットアップ

ECS コンテナおよびタスクを Datadog でモニタリングするには、ECS クラスターの各 EC2 インスタンスでエージェントをコンテナとして実行します。以下にセットアップ方法を説明します。

1. ECS タスクを追加
2. IAM ポリシーの作成と修正
3. Datadog エージェントをDaeson サービスとしてスケジュール

稼働中の EC2 Container Service クラスターが構成されていない場合は、[ECS ドキュメント内の Getting Started セクション][4]を参照してください。

### メトリクスの収集

#### ECS タスクの作成

このタスクにより Datadog コンテナが起動します。コンフィグレーションを変更するには、このタスクの定義を更新します（方法はこのガイドで後述）。APM、DogStatsD、ログを使用している場合は、タスク定義に適切なフラグを設定します。

- APM を使用する場合は `portMappings` を設定し、ダウンストリームのコンテナからトレースデータがエージェントサービスに渡るようにします。APM はポート `8126` と `TCP` を使用してトレースを受け取るため、このポートを `hostPort` としてタスク定義内で設定します。なお、他のコンテナからトレースを収集するには、`DD_APM_NON_LOCAL_TRAFFIC` 環境変数を `true` に設定しておく必要があります。[APM とコンテナの詳細はこちら][5]を参照してください。
- DogStatsD を使用している場合は、タスクの定義で `8125` の `hostPort` を `UDP` に設定します。他のコンテナからDogStatsD のメトリクス収集を有効にするには、`DD_DOGSTATSD_NON_LOCAL_TRAFFIC` 環境変数を `true` に設定する必要があります。
- ログを使用している場合は、[ログ収集ドキュメント](#ログ-の-収集)を参照してください。

EC2 インスタンスでセキュリティグループ設定を再度チェックします。これらのポートが非公開であること確認してください。Datadog では、プライベート IP アドレスを使用してトレースをコンテナからエージェントへ渡します。

タスクの設定には、[AWS CLI ツール][6]または Amazon Web コンソールを使用できます。

{{< tabs >}}
{{% tab "AWS CLI" %}}

1. Linux コンテナで [datadog-agent-ecs.json][1] (オリジナルの Amazon Linux AMI を使用している場合は [datadog-agent-ecs1.json][2]) をダウンロードします。Windows の場合は [datadog-agent-ecs-win.json][3] をダウンロードします。
2. `datadog-agent-ecs.json` を編集し、アカウントの [Datadog API キー][4]を使用して `<YOUR_DATADOG_API_KEY>` を設定します。
3. オプション - [Agent 健全性チェック](#agent-health-check)を追加します。
4. オプション - Datadog EU サイトをご利用の場合は、`datadog-agent-ecs.json` を編集して `DD_SITE` を `DD_SITE:datadoghq.eu` に設定します。
5. オプション - ログの収集を有効にするには、[ログの収集](#ログ-の-収集)ページを参照してください。 
6. オプション - プロセスの収集を有効にするには、[プロセスの収集](#プロセス-の-収集)を参照してください。
7. オプション - トレースの収集を有効にするには、[トレースの収集 (APM)](#trace-collection)を参照してください。
8. 任意 - ネットワークの収集を有効にするには、[ネットワークパフォーマンスモニタリング (NPM)](#ネットワークパフォーマンスモニタリングの収集) を参照してください
9. 次のコマンドを実行します。

```shell
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
{{% /tab %}}
{{% tab "Web UI" %}}

1. AWS コンソールにログインし、EC2 コンテナサービス セクションに移動します。
2. Datadog を追加するクラスターをクリックします。
3. 左側の **Task Definitions** をクリックし、**Create new Task Definition** ボタンをクリックします。
4. **Task Definition Name** に入力します（例: `datadog-agent-task`）。
5. **Add volume** リンクをクリックします。
6. **Name** に `docker_sock` と入力します。**Source Path** に、Linux の場合は `/var/run/docker.sock`、Windows の場合は `\\.\pipe\docker_engine` と入力し、**Add** をクリックします。
7. Linux に限り、ボリュームをもう 1 つ追加して、名前を `proc`、ソースパスを `/proc/` に設定します。
8. Linux に限り、ボリュームをもう 1 つ追加して、名前を `cgroup`、ソースパスを `/sys/fs/cgroup/` (オリジナルの Amazon Linux AMI を使用している場合は `/cgroup/`) に設定します。
9. **Add container** ボタンをクリックします。
10. **Container name** に `datadog-agent` と入力します。
11. **Image** に `datadog/agent:latest` と入力します。
12. **Maximum memory** に `256` と入力します。**注**: 多くのリソースを使用する場合は、メモリの上限を上げる必要があります。
13. **Advanced container configuration** セクションまでスクロールし、**CPU units** に `10` と入力します。
14. **Env Variables** に、**Key** `DD_API_KEY` を追加し、値に Datadog API キーを入力します。こうした守秘性の高い情報を S3 に保管したい場合は、[ECS の構成ガイド][1]を参照してください。*
15. `DD_TAGS` キーを使用して、追加するタグに別の環境変数を追加します。
16. **Storage and Logging** セクションまで下へスクロールします。
17. **Mount points** で **docker_sock** ソースボリュームを選択し、コンテナのパスに Linux の場合は `/var/run/docker.sock`、Windows の場合は `\\.\pipe\docker_engine` と入力します。**Read only** のチェックボックスをオンにします。
18. Linux に限り、**proc** 用に別のマウントポイントを追加し、コンテナのパスに `/host/proc/` と入力します。**Read only** チェックボックスをオンにします。
19. Linux に限り、**cgroup** 用に 3 つ目のマウントポイントを追加して、コンテナのパスに `/host/sys/fs/cgroup` と入力します。**Read only** チェックボックスをオンにします (オリジナルの Amazon Linux AMI を使用している場合は `/host/cgroup/` を使用してください)。

**注**: Datadog タスク定義で CPU を 10 台使用するように設定すると、`service:datadog-agent` の `aws.ecs.cpuutilization` が 1000% と表示されることがあります。これは AWS が CPU 使用率を表示する際の独特な現象です。CPU の台数を増やすことで、グラフの歪曲を回避できます。

[1]: http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-agent-config.html#ecs-config-s3
{{% /tab %}}
{{< /tabs >}}

#### IAM ポリシーの作成と修正

Amazon ECS のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][7]に追加します。ECS ポリシーの詳細については、[AWS Web サイトのガイド][8]を参照してください。

| AWS アクセス許可                   | 説明                                                   |
| -------------------------------- | ------------------------------------------------------------- |
| `ecs:ListClusters`               | 既存のクラスターのリストを返します。                          |
| `ecs:ListContainerInstances`     | 指定されたクラスター内のコンテナインスタンスのリストを返します。 |
| `ecs:ListServices`               | 指定したクラスターで実行されているサービスを一覧表示します。   |
| `ecs:DescribeContainerInstances` | Amazon ECS コンテナインスタンスについて説明します。                     |

#### Agent をデーモンサービスとして実行

Datadog Agent は、各 EC2 インスタンス上の 1 つのコンテナで実行するのが理想的です。最も簡単なのは、Datadog Agent を[デーモンサービス][9]として実行する方法です。

##### Datadog の ECS タスクを使用して、AWS でデーモンサービスをスケジューリングする

1. AWS コンソールにログインし、ECS クラスターページに移動します。Agent を実行するクラスターをクリックします。
2. 新しいサービスを作成するには、「サービス」で **Create** ボタンをクリックします。
3. 起動タイプに EC2 を選択し、先に作成したタスク定義を選択します。
4. サービスタイプに `DAEMON` を選択し、サービス名を入力したら **Next** をクリックします。
5. サービスは各インスタンスで 1 度しか実行されないため、ロードバランサーは不要です。選択せずに **Next** をクリックします。
6. デーモンサービスはオートスケーリングを必要としないので、**Next Step** の後に **Create Service** をクリックします。

#### 実行中のサービスを動的に検出しモニタリング

ECS および Docker を併用して Datadog の[オートディスカバリー][10]を実行すると、環境内で実行中のタスクを自動的に検出して監視できます。

#### AWSVPC モード

Agent v6.10 以上では、実際のコンテナと Agent コンテナの両方で awsvpc モードがサポートされていますが、以下の条件があります。

1. awsvpc モードのアプリおよび Agent の場合は、セキュリティグループを以下のように設定する必要があります。

    - Agent のセキュリティグループが、関連するポートの該当するコンテナに到達できること。
    - Agent のセキュリティグループが、TCP ポート 51678 でホストインスタンスに到達できること。ECS Agent コンテナは、ホストネットワークモード (デフォルト) で実行されるか、ポートがホストに連結されている必要があります。

2. アプリが awsvpc モードで Agent が bridge モードの場合は、ホストインスタンスのセキュリティグループが、関連するポートの該当するコンテナに到達できるようにセキュリティグループを設定する必要があります。

### リソースタグ収集

ECS リソースタグを収集するには

1. [Amazon ECS コンテナインスタンス][11]が IAM ロールに関連付けられていることを確認します。これは、ECS クラスター作成ウィザードを使用して新しいクラスターを作成するとき、または自動スケーリンググループが使用する起動構成で行うことができます。
2. `ecs:ListTagsForResource` で [Amazon ECS コンテナインスタンス][11]で使用される IAM ロールを更新します。
3. [datadog-agent-ecs.json][12] ファイル (オリジナルの Amazon Linux AMI を使用している場合は [datadog-agent-ecs1.json][13]) を更新して、次の環境変数を追加してリソースタグの収集を有効にします。

    ```json
    {
      "name": "DD_ECS_COLLECT_RESOURCE_TAGS_EC2",
      "value": "true"
    }
    ```

#### 注

- IAM ロールが、基底の EC2 インスタンスではなく、[Amazon ECS コンテナインスタンス][11]に関連付けられていることを確認します。
- ECS リソースタグは EC2 インスタンスからは収集できますが、AWS Fargate からは収集できません。
- この機能には、Datadog Agent v6.17+ または v7.17+ が必要です。
- Agent は、`tasks`、`services`、`container instances` ECS リソースからの ECS タグ収集をサポートします。

### ログの収集

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
              "containerPath": "c:\\programdata\\datadog\\run",
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
            "sourcePath": "c:\\programdata\\datadog\\run"
          },
          "name": "pointdir"
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

#### インテグレーションのためのログ収集を有効にする

各コンテナに使用するインテグレーションを特定するには、`source` 属性を使用します。この属性をコンテナのラベルで直接上書きすれば、[ログのインテグレーション][14]が有効になります。このプロセスの詳細については、Datadog の[ログのオートディスカバリー ガイド][15]を参照してください。

### プロセスの収集

以下の方法で、コンテナの処理情報を収集し Datadog に送信します。

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

```text
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

### トレースの収集

Datadog Agent をインストールした後、トレースの収集を有効にします（オプション）。

1. `datadog/agent` コンテナのタスク定義で次のパラメーターを設定します。

    - ポート マッピング : ホスト / コンテナ ポート `8126`、プロトコル `tcp`:
    ```json
    containerDefinitions": [
    {
      "name": "datadog-agent",
      "image": "datadog/agent:latest",
      "cpu": 10,
      "memory": 256,
      "essential": true,
      "portMappings": [
        {
          "hostPort": 8126,
          "protocol": "tcp",
          "containerPort": 8126
        }
      ],
      ...
    ```
    - **Agent v7.17 以下**の場合、以下の環境変数を追加します。
    ```json
    ...
          "environment": [
            ...
          {
            "name": "DD_APM_ENABLED",
            "value": "true"
          },
          {
            "name": "DD_APM_NON_LOCAL_TRAFFIC",
            "value": "true"
          },
          ...
          ]
    ...
    ```

     [Agent トレースの収集に使用できるすべての環境変数を参照してください][16]。

2. アプリケーションコンテナでコンテナが実行されている基底の各インスタンスのプライベート IP アドレスを `DD_AGENT_HOST` 環境変数に割り当てます。これにより、アプリケーショントレースを Agent に送信できます。[Amazon の EC2 メタデータエンドポイント][17]では、プライベート IP アドレスを検出できます。各ホストのプライベート IP アドレスを取得するには、次の URL に curl を実行します。

    ```shell
    curl http://169.254.169.254/latest/meta-data/local-ipv4
    ```

   次に、APM に渡される各アプリケーション コンテナのトレース Agent  ホスト名の環境変数として結果を設定します。

    ```text
    os.environ['DD_AGENT_HOST'] = <EC2_PRIVATE_IP>
    ```

   ECS アプリケーションの変数が起動時に設定される場合は、`DD_AGENT_HOST` を使ってホスト名を環境変数として設定する_必要があります_。あるいは、Python、JavaScript、Ruby の場合は対象のホスト名をアプリケーションのソースコード内で設定することも可能です。Java と .NET の場合は、ECS タスクでホスト名を設定できます。たとえば、以下のとおりです。

    {{< tabs >}}
{{% tab "Python" %}}

```python
import requests
from ddtrace import tracer


def get_aws_ip():
  r = requests.get('http://169.254.169.254/latest/meta-data/local-ipv4')
  return r.text

tracer.configure(hostname=get_aws_ip())
```

他の言語で Agent ホスト名を設定するには、[Agent ホスト名の変更方法][1]を参照してください。

[1]: https://docs.datadoghq.com/ja/tracing/setup/python/#change-agent-hostname
{{% /tab %}}
{{% tab "Node.js" %}}

```javascript
const tracer = require('dd-trace');
const request = require('request');

request('http://169.254.169.254/latest/meta-data/local-ipv4', function(
    error,
    resp,
    body
) {
    tracer.init({ hostname: body });
});
```

他の言語で Agent ホスト名を設定するには、[Agent ホスト名の変更方法][1]を参照してください。

[1]: https://docs.datadoghq.com/ja/tracing/setup/nodejs/#change-agent-hostname
{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'ddtrace'
require 'net/http'

Datadog.configure do |c|
  c.tracer hostname: Net::HTTP.get(URI('http://169.254.169.254/latest/meta-data/local-ipv4'))
end
```

{{% /tab %}}
{{% tab "Go" %}}

```go
package main

import (
    "net/http"
    "io/ioutil"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

resp, err := http.Get("http://169.254.169.254/latest/meta-data/local-ipv4")
        bodyBytes, err := ioutil.ReadAll(resp.Body)
        host := string(bodyBytes)
   if err == nil {
        //curl コマンドの出力を DD_Agent_host 環境に設定します
        os.Setenv("DD_AGENT_HOST", host)
         // トレース Agent にホスト設定を通知します
        tracer.Start(tracer.WithAgentAddr(host))
        defer tracer.Stop()
```

{{% /tab %}}
{{% tab "Java" %}}

このスクリプトを ECS タスク定義の `entryPoint` フィールドにコピーし、アプリケーション jar および引数フラグで値を更新します。

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); java -javaagent:/app/dd-java-agent.jar <アプリケーション引数フラグ> -jar <アプリケーション_JAR_ファイル/WAR_ファイル>"
]
```

他の言語で Agent ホスト名を設定するには、[Agent ホスト名の変更方法][1]を参照してください。

[1]: https://docs.datadoghq.com/ja/tracing/setup/java/#change-agent-hostname
{{% /tab %}}
{{% tab ".NET" %}}

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); dotnet ${APP_PATH}"
]
```

{{% /tab %}}
{{< /tabs >}}

### ネットワークパフォーマンスモニタリングの収集 (Linux のみ)

 1. [前述の手順](#aws-cli)に従い Datadog Agent をインストールします。
  - 初めてインストールする場合は `datadog-agent-ecs.json` ファイル [datadog-agent-sysprobe-ecs.json][18] (オリジナルの Amazon Linux AMI を使用している場合は [datadog-agent-sysprobe-ecs1.json][19]) を使用できます。使用方法については、[上記の指示](#AWS-cli)に従ってください。AWS UI では `linuxParameters` を追加できないため、初回の NPM セットアップでは CLI が必要です。
 2. タスク定義がすでに存在する場合は、次の構成で [datadog-agent-ecs.json][12] ファイル (オリジナルの Amazon Linux AMI を使用している場合は [datadog-agent-ecs1.json][13]) を更新します。

 ```text
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

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_ecs" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

**注**: `ecs.containerinsights.*` をプレフィックスに持つメトリクスは、[AWS CloudWatch エージェント][21]に基づいています。

### イベント

ノイズを減らすため、AWS ECS とのインテグレーションには自動的にホワイトリストが適用され、特定の単語を含むイベントのみを収集します。具体的には、`drain`、`error`、`fail`、`insufficient memory`、`pending`、`reboot`、`terminate` が対象となり、次のようなイベント データを入手できます。

{{< img src="integrations/amazon_ecs/aws_ecs_events.png" alt="AWS ECS イベント" >}}

ホワイトリストを削除し、Datadog AWS ECS インテグレーションからすべてのイベントを取得できるようにするには、[Datadog のサポートチーム][22]までお問い合わせください。

### サービスのチェック

- **aws.ecs.agent_connected**: Agent が接続できない場合は `CRITICAL`、それ以外の場合は `OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][22]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[2]: https://docs.datadoghq.com/ja/integrations/faq/agent-5-amazon-ecs/
[3]: https://docs.datadoghq.com/ja/agent/autodiscovery/?tab=docker#how-to-set-it-up
[4]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_GetStarted_EC2.html
[5]: https://docs.datadoghq.com/ja/tracing/setup/docker/
[6]: https://aws.amazon.com/cli
[7]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#datadog-aws-iam-policy
[8]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_amazonelasticcontainerservice.html
[9]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_daemon
[10]: https://docs.datadoghq.com/ja/agent/autodiscovery/
[11]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_instances.html
[12]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[13]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json
[14]: https://docs.datadoghq.com/ja/logs/processing/#log-processing
[15]: https://docs.datadoghq.com/ja/logs/log_collection/docker/?tab=containerinstallation#activate-log-integrations
[16]: /ja/agent/docker/apm/#docker-apm-agent-environment-variables
[17]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
[18]: https://docs.datadoghq.com/resources/json/datadog-agent-sysprobe-ecs.json
[19]: https://docs.datadoghq.com/resources/json/datadog-agent-sysprobe-ecs1.json
[20]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ecs/amazon_ecs_metadata.csv
[21]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/deploy-container-insights-ECS-instancelevel.html
[22]: https://docs.datadoghq.com/ja/help/