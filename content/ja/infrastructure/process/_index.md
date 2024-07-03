---
aliases:
- /ja/guides/process
- /ja/graphing/infrastructure/process/
further_reading:
- link: https://www.datadoghq.com/blog/live-process-monitoring/
  tag: Blog
  text: Monitor your processes with Datadog
- link: /infrastructure/process/generate_process_metrics/
  tag: Documentation
  text: Increase the retention of process data with metrics
- link: /infrastructure/livecontainers
  tag: ドキュメント
  text: Get real-time visibility of all of the containers across your environment
- link: https://www.datadoghq.com/blog/monitor-third-party-software-with-live-processes/
  tag: Blog
  text: Correlate software performance and resource consumption with saved views
- link: https://www.datadoghq.com/blog/process-level-data/
  tag: Blog
  text: Troubleshoot faster with process-level app and network data
- link: https://www.datadoghq.com/blog/watchdog-live-processes/
  tag: Blog
  text: Troubleshoot anomalies in workload performance with Watchdog Insights for
    Live Processes
kind: documentation
title: Live Processes
---


<div class="alert alert-warning">
Live Processes is included in the Enterprise plan. For all other plans, contact your account representative or <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> to request this feature.
</div>

## Introduction

Datadog's Live Processes gives you real-time visibility into the processes running on your infrastructure. Use Live Processes to:

* View all of your running processes in one place
* Break down the resource consumption on your hosts and containers at the process level
* Query for processes running on a specific host, in a specific zone, or running a specific workload
* Monitor the performance of the internal and third-party software you run using system metrics at two-second granularity
* Add context to your dashboards and notebooks

{{< img src="infrastructure/process/live_processes_main.png" alt="Live Processes Overview" >}}

## インストール

If you are using Agent 5, follow this [specific installation process][1]. If you are using Agent 6 or 7, [see the instructions below][2].

{{< tabs >}}
{{% tab "Linux/Windows" %}}

Once the Datadog Agent is installed, enable Live Processes collection by editing the [Agent main configuration file][1] by setting the following parameter to `true`:

```yaml
process_config:
  process_collection:
    enabled: true
```

Additionally, some configuration options may be set as environment variables.

**Note**: Options set as environment variables override the settings defined in the configuration file.

After configuration is complete, [restart the Agent][2].


[1]: /ja/agent/configuration/agent-configuration-files/
[2]: /ja/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

Follow the instructions for the [Docker Agent][1], passing in the following attributes, in addition to any other custom settings as appropriate:

```text
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED=true
```

**Note**:

- To collect container information in the standard install, the `dd-agent` user must have permissions to access `docker.sock`.
- Running the Agent as a container still allows you to collect host processes.


[1]: /ja/agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "Helm" %}}

Update your [datadog-values.yaml][1] file with the following process collection configuration:

```yaml
datadog:
    # (...)
    processAgent:
        enabled: true
        processCollection: true
```

Then, upgrade your Helm chart:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

**注**: 引き続き、Agent をコンテナとして実行してホストプロセスを収集することもできます。

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Datadog Operator" %}}

In your `datadog-agent.yaml`, set `features.liveProcessCollection.enabled` to `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    liveProcessCollection:
      enabled: true
```

{{% k8s-operator-redeploy %}}

**注**: 引き続き、Agent をコンテナとして実行してホストプロセスを収集することもできます。

{{% /tab %}}
{{% tab "Kubernetes (Manual)" %}}

In the `datadog-agent.yaml` manifest used to create the DaemonSet, add the following environmental variables, volume mount, and volume:

```yaml
 env:
    - name: DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED
      value: "true"
  volumeMounts:
    - name: passwd
      mountPath: /etc/passwd
      readOnly: true
  volumes:
    - hostPath:
        path: /etc/passwd
      name: passwd
```

See the standard [DaemonSet installation][1] and the [Docker Agent][2] information pages for further documentation.

**注**: 引き続き、Agent をコンテナとして実行してホストプロセスを収集することもできます。

[1]: /ja/containers/guide/kubernetes_daemonset
[2]: /ja/agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "AWS ECS Fargate" %}}

<div class="alert alert-warning">You can view your ECS Fargate processes in Datadog. To see their relationship to ECS Fargate containers, use the Datadog Agent v7.50.0 or later.</div>

In order to collect processes, the Datadog Agent must be running as a container within the task.

To enable process monitoring in ECS Fargate, set the `DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED` environment variable to `true` in the Datadog Agent container definition within the task definition.

例:

```json
{
    "taskDefinitionArn": "...",
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            "image": "public.ecr.aws/datadog/agent:latest",
            ...
            "environment": [
                {
                    "name": "DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED",
                    "value": "true"
                }
                ...
             ]
         ...
         }
    ]
  ...
}
```

To start collecting process information in ECS Fargate, add the [`PidMode` parameter][3] to the Task Definition and set it to `task` as follows:

```text
"pidMode": "task"
```

Once enabled, use the `AWS Fargate` Containers facet on the [Live Processes page][1] to filter processes by ECS, or enter `fargate:ecs` in the search query.

{{< img src="infrastructure/process/fargate_ecs.png" alt="Processes in AWS Fargate" >}}

For more information about installing the Datadog Agent with AWS ECS Fargate, see the [ECS Fargate integration documentation][2].

[1]: https://app.datadoghq.com/process
[2]: /ja/integrations/ecs_fargate/#installation
[3]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#other_task_definition_params

{{% /tab %}}
{{< /tabs >}}

### I/O 統計

I/O とオープンファイルの統計情報は、昇格した権限で実行される Datadog system-probe によって収集することができます。system-probe の process モジュールを有効にするには、次の構成を使用します。

1. 下記のシステムプローブのコンフィギュレーションの例をコピーします。

   ```shell
   sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
   ```

2. `/etc/datadog-agent/system-probe.yaml` を編集し、process モジュールを有効にします。

   ```yaml
   system_probe_config:
     process_config:
       enabled: true
   ```

5. [Agent を再起動します][12]。

   ```shell
   sudo systemctl restart datadog-agent
   ```

   **注**: システムで `systemctl` コマンドを利用できない場合は、代わりに次のコマンドを実行します: `sudo service datadog-agent restart`。


### プロセス引数のスクラビング

ライブプロセスページに機密データが表示されないように、Agent はプロセスコマンドラインからの機密性の高い引数をスクラビングします。この機能はデフォルトで有効になっており、以下の語のいずれかと一致するプロセス引数は、値が表示されません。

```text
"password", "passwd", "mysql_pwd", "access_token", "auth_token", "api_key", "apikey", "secret", "credentials", "stripetoken"
```

**注**: この一致では、**大文字と小文字は区別されません**。

{{< tabs >}}
{{% tab "Linux/Windows" %}}

`datadog.yaml` ファイルの `process_config` セクションの下にある `custom_sensitive_words` フィールドを使用すると、独自のリストを定義して、デフォルトのリストと統合することができます。ワイルドカード (`*`) を使用して、一致の範囲を独自に定義できます。ただし、ワイルドカード (`'*'`) 単独の使用は、機密語としてサポートされていません。

```yaml
process_config:
    scrub_args: true
    custom_sensitive_words: ['personal_key', '*token', 'sql*', '*pass*d*']
```

**注**: `custom_sensitive_words` 内の語には、英数字、アンダースコア、およびワイルドカード (`'*'`) のみを使用できます。ワイルドカードのみの機密語はサポートされていません。

次の図に、ライブプロセスページに表示されたプロセスの一例を示します。上の構成を使用して、プロセス引数が非表示にされています。

{{< img src="infrastructure/process/process_arg_scrubbing.png" alt="プロセス引数のスクラビング" style="width:100%;">}}

`scrub_args` を `false` に設定すると、プロセス引数のスクラビングを完全に無効化できます。

`datadog.yaml` 構成ファイルで `strip_proc_arguments` フラグを有効にすることで、プロセスの**すべての**引数をスクラビングすることもできます。

```yaml
process_config:
    strip_proc_arguments: true
```

{{% /tab %}}

{{% tab "Helm" %}}

Helm チャートを使い、デフォルトのリストにマージされる独自のリストを定義できます。環境変数 `DD_SCRUB_ARGS` と `DD_CUSTOM_SENSITIVE_WORDS` を `datadog-values.yaml` ファイルに追加し、Datadog Helm チャートをアップグレードします。

```yaml
datadog:
    # (...)
    processAgent:
        enabled: true
        processCollection: true
    agents:
        containers:
            processAgent:
                env:
                - name: DD_SCRUB_ARGS
                  value: "true"
                - name: DD_CUSTOM_SENSITIVE_WORDS
                  value: "personal_key,*token,*token,sql*,*pass*d*"
```


ワイルドカード (`*`) を使用して、一致のスコープを独自に定義できます。ただし、ワイルドカード (`'*'`) 単独の使用は、機密語としてサポートされていません。

`DD_SCRUB_ARGS` を `false` に設定すると、プロセス引数のスクラビングを完全に無効化できます。

また、`datadog-values.yaml` ファイルで `DD_STRIP_PROCESS_ARGS` 変数を有効にすることで、プロセスの**すべての**引数をスクラビングすることもできます。

```yaml
datadog:
    # (...)
    processAgent:
        enabled: true
        processCollection: true
agents:
    containers:
        processAgent:
            env:
            - name: DD_STRIP_PROCESS_ARGS
              value: "true"
```

{{% /tab %}}
{{< /tabs >}}


## クエリ

### プロセスのスコーピング

プロセスは、本質的に極めてカーディナリティの高いオブジェクトです。関連するプロセスを表示するようにスコープを絞り込むには、テキストフィルターやタグフィルターを使用します。

#### テキストフィルター

検索バーにテキスト文字列を入力すると、コマンドラインやパスにそのテキスト文字列を含むプロセスの照会に、あいまい検索が使用されます。2 文字以上の文字列を入力すると結果が表示されます。下の例では、Datadog のデモ環境を文字列 `postgres /9.` でフィルタリングしています。

**注**: `/9.` はコマンドパスの一部と一致し、`postgres` はコマンド自体と一致しています。

{{< img src="infrastructure/process/postgres.png" alt="Postgres" style="width:80%;">}}

複合クエリで複数の文字列検索を組み合わせるには、以下のブール演算子を使用します。

`AND`
: **積**: 両方の条件を含むイベントが選択されます（何も追加しなければ、AND がデフォルトです）。<br>**例**: `java AND elasticsearch`

`OR`
: **和**: いずれかの条件を含むイベントが選択されます。<br> **例**: `java OR python`

`NOT` / `!`
: **排他**: 後続の条件はイベントに含まれません。単語  `NOT` または文字 `!` のどちらを使用しても、同じ演算を行うことができます。<br> **例**: `java NOT elasticsearch` または `java !elasticsearch`

演算子をグループ化するには括弧を使用します。例: `(NOT (elasticsearch OR kafka) java) OR python`。

#### タグフィルター

プロセスのフィルタリングには、`host`、`pod`、`user`、`service` などの Datadog [タグ][3]を使用することもできます。検索バーに直接タグフィルターを入力するか、ページ左側のファセットパネルで選択します。

Datadog は自動的に `command` タグを生成するので、以下をフィルタリングできます。

- サードパーティソフトウェア、例: `command:mongod`、`command:nginx`
- コンテナ管理ソフトウェア、例: `command:docker`、`command:kubelet`
- 一般的なワークロード、例、`command:ssh`、`command:CRON`

### プロセスの集約

[タグ付け][3]はナビゲーションを強化します。すべての既存のホストレベルのタグに加えて、プロセスは `user` でもタグ付けされます。

さらに、ECS コンテナ内のプロセスは、以下でもタグ付けされます。

- `task_name`
- `task_version`
- `ecs_cluster`

Kubernetes コンテナ内のプロセスは、以下でタグ付けされます。

- `pod_name`
- `kube_pod_ip`
- `kube_service`
- `kube_namespace`
- `kube_replica_set`
- `kube_daemon_set`
- `kube_job`
- `kube_deployment`
- `Kube_cluster`

[統合サービスタグ付け][4]のコンフィギュレーションがある場合、`env`、`service`、`version` も自動的に取得されます。
上記のタグが利用できることで、APM、ログ、メトリクス、プロセスデータを結びつけることができます。
**注**: このセットアップはコンテナ化環境にのみ適用されます。

## 散布図

散布図分析を使用すると、2 つのメトリクスを比較してコンテナのパフォーマンスをより的確に把握できます。

[Processes ページ][5]で散布図分析にアクセスするには、_Show Summary graph_ ボタンをクリックし、"Scatter Plot" タブを選択します。

{{< img src="infrastructure/process/scatterplot_selection.png" alt="Scatter plot 選択" style="width:60%;">}}

デフォルトでは、グラフは `command` タグキーでグループ化されます。ドットのサイズは、各グループ内のプロセスの数を表します。ドットをクリックすると、グループに参加しているすべてのポッドとコンテナが表示されます。

散布図分析の上部にあるクエリを使用して、散布図分析を制御できます。

- 表示するメトリクスの選択。
- 2 つのメトリクスの集計方法の選択。
- X 軸と Y 軸の目盛の選択 (_Linear_/_Log_)。

{{< img src="infrastructure/process/scatterplot.png" alt="コンテナ検査" style="width:80%;">}}

## プロセスモニター

複数のホストまたはタグにまたがるプロセスグループのカウントに基づいてアラートを生成するには、[ライブプロセスモニター][6]を使用します。プロセスアラートは、[モニターページ][7]で構成できます。詳細は、[ライブプロセスモニターのドキュメント][6]を参照してください。

{{< img src="infrastructure/process/process_monitor.png" alt="プロセスモニター" style="width:80%;">}}

## ダッシュボードおよびノートブックでのプロセス

ダッシュボードやノートブックでプロセスメトリクスをグラフ化するには、[時系列ウィジェット][8]を使用します。構成するには、
1. プロセスをデータソースとして選択
2. 検索バーのテキスト文字列を使用してフィルタリング
3. グラフ化するプロセスメトリクスを選択
4. `From` フィールドのタグを使用してフィルタリング

{{< img src="infrastructure/process/process_widget.png" alt="プロセスウィジェット" style="width:80%;">}}

## サードパーティソフトウェアをモニタリング

### 自動検出インテグレーション

Datadog ではプロセス収集を使用して、ホストで実行されているテクノロジーを自動検出します。これにより、こうしたテクノロジーの監視に役立つ Datadog インテグレーションが識別されます。この自動検出されたインテグレーションは、[インテグレーション検索][1]に表示されます。

{{< img src="getting_started/integrations/ad_integrations.png" alt="自動検出されたインテグレーション" >}}

各インテグレーションには、次の 2 つのステータスタイプのいずれかがあります。

- **+ Detected**: このインテグレーションは、それを実行しているホストでは有効になっていません。
- **✓ Partial Visibility**: このインテグレーションは、一部で有効になっていますが、すべての関連ホストで実行されているわけではありません。

インテグレーションを実行しているが、インテグレーションが有効になっていないホストは、インテグレーションタイルの **Hosts** タブにあります。

### インテグレーションビュー

{{< img src="infrastructure/process/integration_views.png" alt="インテグレーションビュー" >}}

サードパーティ製ソフトウェアが検出された後、ライブプロセスはそのソフトウェアのパフォーマンスを分析するのに役立ちます。
1. まず、ページ右上の *Views* をクリックし、Nginx、Redis、Kafka などの予め設定されたオプションの一覧を開きます。
2. そのソフトウェアを実行中の処理のみにページのスコープを設定するビューを選択します。　
3. 重いプロセスを検査する際は、*Integration Metrics* タブに切り替え、基底のホストにあるソフトウェアの健全性を分析します。関連する Datadog インテグレーションを有効にしてある場合は、インテグレーションから収集されたすべてのパフォーマンスメトリクスを表示できるため、問題がホストレベルなのかソフトウェアレベルなのかを判断できます。たとえば、プロセス CPU と MySQL クエリのレイテンシーが相関して急上昇する場合、全表スキャンなどの集中的な操作が、同じ基底のリソースに依存する別の MySQL クエリの実行を遅らせていることが考えられます。

インテグレーションビュー（ホストごとに Nginx 処理のクエリを集約する場合）や他のカスタムクエリをカスタマイズするには、ページ上部の *+Save* ボタンをクリックします。この操作により、クエリ、テーブルの列の選択、可視化設定が保存されます。保存ビューを作成し、追加のコンフィギュレーション無しに必要な処理へ迅速にアクセスへしたり、チームメイトとプロセスデータを共有したりできます。

## プラットフォームにおけるプロセス

### ライブコンテナ

ライブプロセスは、それぞれのコンテナで実行中のプロセスを監視することで、コンテナデプロイの可視化をさらに強化しています。[ライブコンテナ][9]ページでコンテナをクリックすると、実行中のコマンドやリソース消費量を含むプロセスツリーが表示されます。コンテナメトリクスと共にこのデータを使用し、コンテナやデプロイの不具合の根本的な原因を探ります。

### APM

[APM トレース][10]でサービスのスパンをクリックすると、基礎インフラストラクチャーで実行中のプロセスを確認できます。サービスのスパンプロセスは、リクエスト時にサービスが実行されているホストまたはポッドと相関関係にあります。CPU および RSS メモリなどのプロセスメトリクスをコードレベルのエラーとともに分析することで、アプリケーション特有の問題かインフラストラクチャーの問題かを見分けることができます。プロセスをクリックすると、ライブプロセス ページが開きます。関連するプロセスはサーバーレスおよびブラウザのトレースでサポートされていません。

### ネットワークパフォーマンス監視

[Network Analytics][11] ページで依存関係を調べる際、相互に通信するエンドポイント (サービスなど) の基底のインフラストラクチャーで実行される処理を確認できます。プロセスメタデータを使用して、ネットワークの接続の悪さ (TCP の再送信数が多いことから) やネットワークの呼び出し遅延の高さ (TCP ラウンドトリップタイムが長いことから) の原因が、エンドポイントのリソースを消費する重いワークロードであり、結果、通信の健全性や効率性に影響を与えているかを判断できます。

## リアルタイムの監視

Processes are normally collected at 10s resolution. While actively working with the Live Processes page, metrics are collected at 2s resolution and displayed in real time, which is important for volatile metrics such as CPU. However, for historical context, metrics are ingested at the default 10s resolution.

## 追加情報

- リアルタイム (2 秒) データ収集は 30 分後にオフになります。リアルタイム収集を再開するには、ページをリフレッシュします。
- コンテナのデプロイで、各プロセスのユーザー名を収集するには、`docker-dd-agent` にマウントされた `/etc/passwd` ファイルが必要です。これは公開ファイルですが、プロセス Agent はユーザー名以外のフィールドを使用しません。`user` メタデータフィールド以外のすべての機能は、このファイルにアクセスせずに機能します。**注**: ライブプロセスは、ホストの `passwd` ファイルのみを使用し、コンテナ内に作成されたユーザーのユーザー名解決は実行しません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/faq/agent-5-process-collection/
[2]: /ja/agent/
[3]: /ja/getting_started/tagging/
[4]: /ja/getting_started/tagging/unified_service_tagging
[5]: https://app.datadoghq.com/process
[6]: /ja/monitors/types/process/
[7]: https://app.datadoghq.com/monitors#create/live_process
[8]: /ja/dashboards/widgets/timeseries/#pagetitle
[9]: /ja/infrastructure/livecontainers/
[10]: /ja/tracing/
[11]: /ja/network_monitoring/performance/network_analytics
[12]: /ja/agent/configuration/agent-commands/#restart-the-agent