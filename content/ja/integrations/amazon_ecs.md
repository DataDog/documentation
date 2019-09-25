---
aliases:
  - /ja/integrations/ecs/
categories:
  - cloud
  - containers
  - aws
  - log collection
ddtype: クローラー
dependencies: []
description: コンテナ ステータスのモニタリングやリソース使用状況のトラッキングなど
doc_link: 'https://docs.datadoghq.com/integrations/amazon_ecs/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/amazon-ecs-metrics'
    tag: ブログ
    text: キー ECS メトリクスの監視
  - link: 'https://github.com/DataDog/datadog-trace-agent'
    tag: GitHub
    text: トレース エージェントのソースコード
git_integration_title: amazon_ecs
has_logo: true
integration_title: Amazon Elastic Container Service (ECS)
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_ecs
public_title: Datadog と Amazon Elastic Container Service (ECS) のインテグレーション
short_description: コンテナ ステータスのモニタリングやリソース使用状況のトラッキングなど
version: '1.0'
---
## 概要
Amazon Elastic Container Service (ECS) は、EC2 インスタンスで実行されるDockerコンテナ用の拡張性とパフォーマンスに優れたコンテナ管理サービスです。

このページは [Datadog コンテナ Agent v6][1] を使用した AWS ECS のセットアップについて説明します。他のセットアップについては、以下を参照してください。

* [AWS ECS 向け Datadog コンテナエージェント v5 のセットアップ][2]
* [オートディスカバリーを使用した Datadog Host Agent のセットアップ][3]

## セットアップ

ECS コンテナおよびタスクを Datadog でモニタリングするには、ECS クラスターの各 EC2 インスタンスでエージェントをコンテナとして実行します。以下にセットアップ方法を説明します。

1. **ECS タスクを追加**
2. **IAM ポリシーの作成と修正**
3. **Datadog エージェントをDaeson サービスとしてスケジュール**

稼働中の EC2 Container Service クラスターが構成されていない場合は、[ECS ドキュメント内の Getting Started セクション][4]を参照してください。

### メトリクスの収集
#### ECS タスクの作成

このタスクにより Datadog コンテナが起動します。コンフィグレーションを変更するには、このタスクの定義を更新します（方法はこのガイドで後述）。APM、DogStatsD、ログを使用している場合は、タスク定義に適切なフラグを設定します。

* APM を使用する場合は `portMappings` を設定し、ダウンストリームのコンテナからトレースデータがエージェントサービスに渡るようにします。APM はポート `8126` と `TCP` を使用してトレースを受け取るため、このポートを `hostPort` としてタスク定義内で設定します。なお、他のコンテナからトレースを収集するには、`DD_APM_NON_LOCAL_TRAFFIC` 環境変数を `true` に設定しておく必要があります。[APM とコンテナの詳細はこちら][5]を参照してください。

* DogStatsD を使用している場合は、タスクの定義で `8125` の `hostPort` を `UDP` に設定します。他のコンテナからDogStatsD のメトリクス収集を有効にするには、`DD_DOGSTATSD_NON_LOCAL_TRAFFIC` 環境変数を `true` に設定する必要があります。

* ログを使用している場合は、[ログ収集ドキュメント](#ログ-の-収集)を参照してください。

EC2 インスタンスでセキュリティグループ設定を再度チェックします。これらのポートが非公開であること確認してください。Datadog では、プライベート IP アドレスを使用してトレースをコンテナからエージェントへ渡します。

タスクの設定には、[AWS CLI ツール][6]または Amazon Web コンソールを使用できます。

##### AWS CLI

1. [datadog-agent-ecs.json][7] (オリジナルの Amazon Linux AMI を使用している場合は [datadog-agent-ecs1.json][8]) をダウンロードします。
2. `datadog-agent-ecs.json` を編集し、アカウントの [Datadog API キー][9]を使用して `<YOUR_DATADOG_API_KEY>` を設定します。
3. オプション - Datadog EU サイトをご利用の場合は、`datadog-agent-ecs.json` を編集して `DD_SITE` を `DD_SITE:datadoghq.eu` に設定します。
4. オプション - ログの収集を有効にするには、[ログの収集](#ログ-の-収集)ページを参照してください。 
5. オプション - プロセスの収集を有効にするには、[プロセスの収集](#プロセス-の-収集)を参照してください。

6. 次のコマンドを実行します。
```
aws ecs register-task-definition --cli-input-json file://path/to/datadog-agent-ecs.json
```

##### Web UI

1. AWS コンソールにログインし、EC2 コンテナサービス セクションに移動します。
2. Datadog を追加するクラスターをクリックします。
3. 左側の **Task Definitions** をクリックし、**Create new Task Definition** ボタンをクリックします。
4. **Task Definition Name** に入力します（例: ```datadog-agent-task```）。
5. **Add volume** リンクをクリックします。
6. **Name** に```docker_sock```、**Source Path** に ```/var/run/docker.sock``` と入力し、**Add** をクリックします。
7. ボリュームをもう 1 つ追加して、名前を ```proc```、ソースパスを ```/proc/``` にします。
8. ボリュームをもう 1 つ追加して、名前を ```cgroup```、ソースパスを ```/sys/fs/cgroup/``` (オリジナルの Amazon Linux AMI を使用している場合は ```/cgroup/```) に設定します。
9. **Add container** ボタンをクリックします。
10. **Container name** に ```datadog-agent``` と入力します。
11. **Image** に ```datadog/agent:latest``` と入力します。
12. **Maximum memory** に ```256``` と入力します。**注**: 多くのリソースを使用する場合は、メモリの上限を上げる必要があります。
13. **Advanced container configuration** セクションが表示されるまでスクロールし、**CPU units** に ```10``` と入力します。
14. **Env Variables** に、**Key** ```DD_API_KEY``` を追加し、値に Datadog API キーを入力します。こうした守秘性の高い情報を S3 に保管したい場合は、[ECS の構成ガイド][10]を参照してください。
15. ```DD_TAGS``` キーを使用して、追加するタグに別の環境変数を追加します。
16. **Storage and Logging** セクションまで下へスクロールします。
17. **Mount points** で **docker_sock** ソースボリュームを選択し、コンテナのパスに ```/var/run/docker.sock``` と入力します。**Read only** のチェックボックスをオンにします。
18. **proc** 用に別のマウントポイントを追加し、コンテナのパスに```/host/proc/``` と入力します。**Read only** チェックボックスをオンにします。
19. **cgroup** 用に 3 つ目のマウントポイントを追加して、コンテナのパスに ```/host/sys/fs/cgroup``` と入力します。**Read only** チェックボックスをオンにします (オリジナルの Amazon Linux AMI を使用している場合は ```/host/cgroup/``` を使用してください)。

**注**: Datadog タスク定義で CPU を 10 台使用するように設定すると、`service:datadog-agent` の `aws.ecs.cpuutilization` が 1000% と表示されることがあります。これは AWS が CPU 使用率を表示する際の独特な現象です。CPU の台数を増やすことで、グラフの歪曲を回避できます。

#### IAM ポリシーの作成と修正

1. Amazon ECS のメトリクスを収集するために、次のアクセス許可を [Datadog IAM ポリシー][11]に追加します。ECS ポリシーの詳細については、[AWS Web サイトのガイドを参照][12]してください。

    | AWS アクセス権限                   | 説明                                                                    |
    |----------------------------------|------------------------------------------------------------------------------------------------------|
    | `ecs:ListClusters`               | 利用可能なクラスターのリスト作成。
    | `ecs:ListContainerInstances`     | クラスターのインスタンスリストを作成。                                                                        |
    | `ecs:DescribeContainerInstances` | リソースや実行中のタスクにメトリクスを追加するインスタンスを記述し、クラスタータグを EC2 インスタンスに追加。|　　

#### エージェントを Daemon サービスとして実行

Datadog Agent は、各 EC2 インスタンス上の 1 つのコンテナで実行するのが理想的です。最も簡単なのは、Datadog Agent を[デーモンサービス][13]として実行する方法です。

##### Datadog の ECS タスクを使用して、AWS でDaemon サービスをスケジューリングする

1. AWS コンソールにログインし、ECS クラスターページに移動します。エージェントを実行するクラスターをクリックします。
2. 新しいサービスを作成するには、「サービス」で **Create** ボタンをクリックします。
3. 起動タイプに EC2 を選択し、先に作成したタスク定義を選択します。
4. サービスタイプに `DAEMON` を選択し、サービス名を入力したら **Next** をクリックします。
5. サービスは各インスタンスで 1 度しか実行されないため、ロードバランサーは不要です。選択せずに **Next** をクリックします。
6. Daemon サービスはオートスケーリングを必要としないので、**Next Step** の後に **Create Service** をクリックします。

#### 実行中のサービスを動的に検出しモニタリング

ECS および Docker を併用して Datadog の[オートディスカバリー][14]を実行すると、環境内で実行中のタスクを自動的に検出して監視できます。

#### AWSVPC モード

Agent v6.10 以上では、実際のコンテナと Agent コンテナの両方で awsvpc モードがサポートされていますが、以下の条件があります。

1. awsvpc モードのアプリおよび Agent の場合は、セキュリティグループを以下のように設定する必要があります。
  * Agent のセキュリティグループが、関連するポートの該当するコンテナに到達できること。
  * Agent のセキュリティグループが、TCP ポート 51678 でホストインスタンスに到達できること。ECS Agent コンテナは、ホストネットワークモード (デフォルト) で実行されるか、ポートがホストに連結されている必要があります。
<br><br>
2. アプリが awsvpc モードで Agent が bridge モードの場合は、ホストインスタンスのセキュリティグループが、関連するポートの該当するコンテナに到達できるようにセキュリティグループを設定する必要があります。

### ログの収集

ECS コンテナ内で実行中のアプリケーションにより書き込まれるログをすべて収集し、Datadog アプリケーションに送信する方法は、以下のとおりです。

1. [前述の手順](#aws-cli)に従い Datadog エージェントをインストールします。
2. 次の構成で [datadog-agent-ecs.json][7] ファイル (オリジナルの Amazon Linux AMI を使用している場合は [datadog-agent-ecs1.json][8]) を更新します。

```
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

#### インテグレーションのためのログ収集を有効にする

各コンテナに使用するインテグレーションを特定するには、`source` 属性を使用します。この属性をコンテナのラベルで直接上書きすれば、[ログのインテグレーション][15]が有効になります。このプロセスの詳細については、Datadog の[ログのオートディスカバリー ガイド][16]を参照してください。

### プロセスの収集

以下の方法で、コンテナの処理情報を収集し Datadog に送信します。

1. [前述の手順](#aws-cli)に従い Datadog エージェントをインストールします。
2. 次の構成で [datadog-agent-ecs.json][7] ファイル (オリジナルの Amazon Linux AMI を使用している場合は [datadog-agent-ecs1.json][8]) を更新します。

```
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

### トレースの収集

Datadog Agent をインストールしたら、`datadog/agent` コンテナのタスク定義で次のパラメーターを設定し、[Datadog トレース Agent][17] を有効にします。

- ポート マッピング : ホスト / コンテナ ポート `8126`、プロトコル `tcp`
- 環境変数 : `DD_APM_ENABLED=true`、`DD_APM_NON_LOCAL_TRAFFIC=true` （他のコンテナからのトレースの収集を有効にする）

#### アプリケーション コンテナ

[Amazon の EC2 のメタデータエンドポイント][18]では、コンテナを実行している各基盤インスタンスのプライベート IP アドレスを調べられます。この IP アドレスをアプリケーションコンテナ内でトレース Agent のホスト名に設定すると、トレースデータをエージェントに渡すことができます。

各ホストのプライベート IP アドレスを取得するには、次の URL に curl を実行し、APM に渡される各アプリケーション コンテナのトレースエージェント ホスト名の環境変数として結果を設定します。

```
curl http://169.254.169.254/latest/meta-data/local-ipv4
```

```
os.environ['DATADOG_TRACE_AGENT_HOSTNAME'] = <EC2_PRIVATE_IP>
```

ECS アプリケーションの変数が起動時に設定される場合は、ホスト名を環境変数として設定する必要があります。

あるいは、対象のホスト名をアプリケーションのソースコード内で設定することも可能です。たとえば、以下のとおりです。

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

{{% /tab %}}
{{% tab "Node.js" %}}

```javascript
const tracer = require('dd-trace')
const request = require('request')

request('http://169.254.169.254/latest/meta-data/local-ipv4', function (error, resp, body){
  tracer.init({hostname: body})
})
```

{{< tabs >}}
{{% tab "Files" %}}

別の言語で Agent ホスト名を設定する例については、[Agent ホスト名の変更][19]に関するドキュメントを参照してください。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_ecs" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント

ノイズを減らすため、AWS ECS とのインテグレーションには自動的にホワイトリストが作成され、次の単語を含むイベントのみを収集します。`drain`、`error`、`fail`、`insufficient memory`、`pending`、`reboot`、`terminate`。以下にイベントの例を示します。

{{< img src="integrations/amazon_ecs/aws_ecs_events.png" alt="AWS ECS Events" responsive="true">}}

ホワイトリストを削除し、Datadog AWS ECS インテグレーションからすべてのイベントを取得できるようにするには、[Datadog のサポートチーム][15]までお問い合わせください。

### サービスのチェック

* **aws.ecs.agent_connected**: Agent が接続できない場合は `CRITICAL`、それ以外の場合は `OK` を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][21]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[2]: https://docs.datadoghq.com/ja/integrations/faq/agent-5-amazon-ecs
[3]: https://docs.datadoghq.com/ja/agent/autodiscovery/?tab=docker#how-to-set-it-up
[4]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_GetStarted_EC2.html
[5]: https://docs.datadoghq.com/ja/tracing/setup/docker
[6]: https://aws.amazon.com/cli
[7]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[8]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json
[9]: https://app.datadoghq.com/account/settings#api
[10]: http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-agent-config.html#ecs-config-s3
[11]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[12]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_ecs.html
[13]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_daemon
[14]: https://docs.datadoghq.com/ja/agent/autodiscovery
[15]: https://docs.datadoghq.com/ja/logs/processing/#log-processing
[16]: https://docs.datadoghq.com/ja/logs/log_collection/docker/?tab=containerinstallation#activate-log-integrations
[17]: https://github.com/DataDog/datadog-trace-agent
[18]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
[19]: https://docs.datadoghq.com/ja/tracing/advanced_usage/?tab=java#change-agent-hostname
[20]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ecs/amazon_ecs_metadata.csv
[21]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}