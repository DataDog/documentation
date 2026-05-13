---
aliases:
- /ja/guides/process
- /ja/graphing/infrastructure/process/
further_reading:
- link: https://www.datadoghq.com/blog/live-process-monitoring/
  tag: ブログ
  text: Datadog でのプロセスのモニタリング
- link: /infrastructure/process/generate_process_metrics/
  tag: よくあるご質問
  text: メトリクスでプロセスデータの保持期間を高めます
- link: /infrastructure/livecontainers
  tag: よくあるご質問
  text: 環境内のすべてのコンテナのリアルタイム表示
- link: https://www.datadoghq.com/blog/monitor-third-party-software-with-live-processes/
  tag: ブログ
  text: 保存ビューでソフトウェアのパフォーマンスとリソース消費を相関付ける
- link: https://www.datadoghq.com/blog/process-level-data/
  tag: ブログ
  text: プロセスレベルのアプリとネットワークデータを使用して、より迅速にトラブルシューティングを行います
- link: https://www.datadoghq.com/blog/watchdog-live-processes/
  tag: ブログ
  text: ライブプロセス用 Watchdog Insights によるワークロードのパフォーマンス異常に対するトラブルシューティング
title: ライブプロセス
---
<div class="alert alert-info">
ライブプロセスおよびライブプロセスモニタリングは、エンタープライズプランに含まれています。他のすべてのプランについては、アカウント担当者に連絡するか、<a href="mailto:success@datadoghq.com">success@datadoghq.com</a>までご連絡いただき、この機能のリクエストを行ってください。
</div>

## はじめに {#introduction}

Datadogのライブプロセスにより、インフラストラクチャー上で実行中のプロセスをリアルタイムで可視化できます。ライブプロセスを使用すると、以下のことができます：

* すべての実行中のプロセスを１か所で表示する
* ホストやコンテナのリソース消費をプロセスレベルで分類します
* 特定のホスト、特定のゾーン、または特定のワークロードで実行中のプロセスをクエリする
* システムメトリクスを使用して、実行する内部およびサードパーティーソフトウェアのパフォーマンスを 2 秒の粒度でモニターします
* ダッシュボードとノートブックにコンテキストを追加します

{{< img src="infrastructure/process/live_processes_main.png" alt="ライブプロセスの概要" >}}

## インストール {#installation}

エージェント 5 を使用している場合は、この [特定のインストールプロセス][1] に従ってください。エージェント 6 または 7 を使用している場合は、[以下の指示を参照してください][2]。

{{< tabs >}}
{{% tab "Linux/Windows" %}}

Datadog Agent をインストールしたら、[Agent のメイン構成ファイル][1]を編集し、次のパラメーターを `true` に設定して、ライブプロセスの収集を有効にします：

```yaml
process_config:
  process_collection:
    enabled: true
```

さらに、いくつかの構成オプションを環境変数として設定できます。

**注**: 環境変数として設定されたオプションは、構成ファイルで定義されている設定を上書きします。

設定が完了したら、[Agent を再起動][2]します。


[1]: /ja/agent/configuration/agent-configuration-files/
[2]: /ja/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

[Docker Agent][1] の手順に従い、必要に応じて他のカスタム設定に加えて、以下の属性を渡します。

```text
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED=true
```

**注**:

- 標準インストールでコンテナ情報を収集するには、`dd-agent` ユーザーが `docker.sock` へのアクセス許可を持つ必要があります。
- エージェントをコンテナとして実行しても、ホストプロセスを収集することができます。


[1]: /ja/agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "Helm" %}}

次のプロセスコレクション構成で [datadog-values.yaml][1] ファイルを更新します。

```yaml
datadog:
    # (...)
    processAgent:
        enabled: true
        processCollection: true
```

次に、Helm チャートをアップグレードします。

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

**注**: エージェントをコンテナとして実行しても、ホストプロセスを収集することができます。

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Datadog OperatorDatadog オペレーター" %}}

あなたの `datadog-agent.yaml` で `features.liveProcessCollection.enabled` を `true` に設定してください。

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

**注**: エージェントをコンテナとして実行しても、ホストプロセスを収集することができます。

{{% /tab %}}
{{% tab "Kubernetes (手動)" %}}

DaemonSet の作成に使用された `datadog-agent.yaml` マニフェスト内に、以下の環境変数、ボリュームマウント、およびボリュームを追加します:

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

詳細については、標準の [DaemonSet インストール][1]のページおよび [Docker Agent][2] の情報ページを参照してください。

**注**: エージェントをコンテナとして実行しても、ホストプロセスを収集することができます。

[1]: /ja/containers/guide/kubernetes_daemonset
[2]: /ja/agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "AWS ECS Fargate" %}}

<div class="alert alert-info">ECS Fargate プロセスを Datadog で表示できます。ECS Fargate コンテナとの関係を確認するには、Datadog Agent v7.50.0 以降を使用してください。</div>

プロセスを収集するには、Datadog Agent がタスク内でコンテナとして実行されている必要があります。

ECS Fargate でプロセスモニタリングを有効にするには、タスク定義内の Datadog Agent のコンテナ定義で `DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED` 環境変数を `true` に設定します。

たとえば、以下のとおりです。

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

ECS Fargate でプロセス情報の収集を開始するには、タスク定義に [`pidMode` パラメータ][3] を追加し、次のように `task` に設定してください:

```text
"pidMode": "task"
```

一度有効化すると、[Live Processes ページ][1] で `AWS Fargate` Containers ファセットを使用して ECS で実行中のプロセスをフィルタリングするか、検索クエリに `fargate:ecs` を入力します。

{{< img src="infrastructure/process/fargate_ecs.png" alt="AWS Fargate のプロセス" >}}

AWS ECS Fargate で Datadog Agent をインストールする方法の詳細については、[ECS Fargate インテグレーションのドキュメント][2]を参照してください。

[1]: https://app.datadoghq.com/process
[2]: /ja/integrations/ecs_fargate/#installation
[3]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#other_task_definition_params

{{% /tab %}}
{{< /tabs >}}

### I/O 統計 {#io-stats}

I/O およびオープンファイルの統計は、特権昇格された状態で実行される Datadog システムプローブによって収集できます。これらの統計を収集するには、システムプローブのプロセスモジュールを有効にします:

1. システムプローブの設定例をコピーします:

   ```shell
   sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
   ```

2. `/etc/datadog-agent/system-probe.yaml` を編集してプロセスモジュールを有効にします:

   ```yaml
   system_probe_config:
     process_config:
       enabled: true
   ```

5. [エージェントを再起動します][12]:

   ```shell
   sudo systemctl restart datadog-agent
   ```

   **注**: `systemctl` コマンドがシステムで利用できない場合は、代わりに次のコマンドを実行してください: `sudo service datadog-agent restart`


### 最適化されたプロセス収集のフットプリント {#optimized-process-collection-footprint}

Linux では、Datadog Agent の全体的なフットプリントは、別のプロセスエージェントではなく、コア Datadog Agent でコンテナおよびプロセス収集を実行することによって削減されます。Datadog Agent v7.65.0 以降では、これがデフォルトで有効になっています。 **注**: プロセスエージェントは[Cloud Network Monitoring][14]に依然として必要です。

この機能のエージェントステータスは、`Process Component`セクションに記載されています。例えば：

```text
=================
Process Component
=================


  Enabled Checks: [process rtprocess]
  System Probe Process Module Status: Not running
  Process Language Detection Enabled: False

  =================
  Process Endpoints
  =================
    https://process.datadoghq.com. - API Key ending with:
        - *****

  =========
  Collector
  =========
    Last collection time: 2026-01-14 10:04:49
    Docker socket: /var/run/docker.sock
    Number of processes: 48
    Number of containers: 0
    Process Queue length: 0
    RTProcess Queue length: 0
    Connections Queue length: 0
    Event Queue length: 0
    Pod Queue length: 0
    Process Bytes enqueued: 0
    RTProcess Bytes enqueued: 0
    Connections Bytes enqueued: 0
    Event Bytes enqueued: 0
    Pod Bytes enqueued: 0
    Drop Check Payloads: []
    Number of submission errors: 0
```

### プロセス引数のスクラビング{#process-arguments-scrubbing}

Live Processesページで機密データを隠すために、エージェントはプロセスコマンドラインから機密引数をスクラブします。この機能はデフォルトで有効になっており、以下の単語のいずれかに一致するプロセス引数はその値が隠されます。

```text
"password", "passwd", "mysql_pwd", "access_token", "auth_token", "api_key", "apikey", "secret", "credentials", "stripetoken"
```

**注**: 一致は**大文字と小文字を区別しません**。

{{< tabs >}}
{{% tab "Linux/Windows" %}}

`custom_sensitive_words`フィールドを使用して、`datadog.yaml`ファイルの`process_config`セクションでデフォルトのリストとマージされる独自のリストを定義してください。ワイルドカード（`*`）を使用して、独自の一致範囲を定義してください。ただし、単一のワイルドカード（`'*'`）は機密ワードとしてサポートされていません。

```yaml
process_config:
    scrub_args: true
    custom_sensitive_words: ['personal_key', '*token', 'sql*', '*pass*d*']
```

**注**: `custom_sensitive_words`内の単語は、英数字、アンダースコア、またはワイルドカード（`'*'`）のみを含む必要があります。ワイルドカードのみの機密ワードはサポートされていません。

次の図に、ライブプロセスページに表示されたプロセスの一例を示します。上の構成を使用して、プロセス引数が非表示にされています。

{{< img src="infrastructure/process/process_arg_scrubbing.png" alt="プロセス引数のスクラビング" style="width:100%;">}}

`scrub_args`を`false`に設定すると、プロセス引数のスクラビングを完全に無効化できます。

また、`datadog.yaml`設定ファイルで`strip_proc_arguments`フラグを有効にすることで、プロセスから**すべて**の引数をスクラブすることもできます。

```yaml
process_config:
    strip_proc_arguments: true
```

{{% /tab %}}

{{% tab "Helm" %}}

Helmチャートを使用して、デフォルトのリストとマージされる独自のリストを定義できます。環境変数`DD_SCRUB_ARGS`と`DD_CUSTOM_SENSITIVE_WORDS`を`datadog-values.yaml`ファイルに追加し、Datadog Helmチャートをアップグレードしてください：

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


ワイルドカード（`*`）を使用して、独自の一致範囲を定義してください。ただし、単一のワイルドカード（`'*'`）は機密ワードとしてサポートされていません。

`DD_SCRUB_ARGS`を`false`に設定すると、プロセス引数のスクラビングを完全に無効化できます。

また、`datadog-values.yaml`ファイルで`DD_STRIP_PROCESS_ARGS`変数を有効にすることで、プロセスから**すべて**の引数をスクラブすることもできます。

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


## クエリ {#queries}

### プロセスのスコーピング {#scoping-processes}

プロセスは本質的に非常に高いカーディナリティのオブジェクトです。関連するプロセスを表示するためにスコープを絞るには、テキストフィルターとタグフィルターを使用できます。

#### テキストフィルター {#text-filters}

検索バーにテキスト文字列を入力すると、その文字列がコマンドラインやパスに含まれるプロセスを照会するためにファジー文字列検索が使用されます。2文字以上の文字列を入力して結果を表示します。以下は、文字列 `postgres /9.` でフィルタリングされた Datadog のデモ環境です。

**注**: `/9.` はコマンドパスの一部と一致し、`postgres` はコマンド自体と一致しています。

{{< img src="infrastructure/process/postgres.png" alt="Postgres" style="width:80%;">}}

複合クエリで複数の文字列検索を組み合わせるには、以下のブール演算子を使用します。

`AND`
: **積**: 両方の条件を含むイベントが選択されます (何も追加しなければ、AND がデフォルトで採用されます)<br> **例**: `java AND elasticsearch`

`OR`
: **和**: いずれかの条件を含むイベントが選択されます <br> **例**: `java OR python`

`NOT` / `!`
: **除外**: 以下の用語はイベントに含まれません。同じ操作を行うために、単語 `NOT` または `!` 文字を使用できます<br> **例**: `java NOT elasticsearch` または `java !elasticsearch`

演算子をグループ化するために括弧を使用してください。たとえば、 `(NOT (elasticsearch OR kafka) java) OR python` 。

#### タグフィルター {#tag-filters}

Datadog の [タグ][3] を使用して、プロセスをフィルタリングすることもできます。例: `host`, `pod`, `user`, `service`。タグフィルターを検索バーに直接入力するか、ページの左側のファセットパネルで選択してください。

Datadog は自動的に `command` タグを生成するので、以下をフィルタリングできます:

- サードパーティ製ソフトウェア、たとえば: `command:mongod`, `command:nginx`
- コンテナ管理ソフトウェア、例えば: `command:docker`, `command:kubelet`
- 一般的なワークロード、例えば: `command:ssh`, `command:CRON`

#### コンテナ化環境タグ {#containerized-environment-tags}

さらに、ECS コンテナ内のプロセスは、以下でもタグ付けされます。

- `task_name`
- `task_version`
- `ecs_cluster`

Kubernetes コンテナ内のプロセスは、以下でタグ付けされます。

- `pod_name`
- `kube_service`
- `kube_namespace`
- `kube_replica_set`
- `kube_daemon_set`
- `kube_job`
- `kube_deployment`
- `kube_cluster_name`

[Unified Service Tagging][4]の設定がある場合、`env`, `service`, `version`は自動的に取得されます。
これらのタグを利用することで、APM、ログ、メトリクス、プロセスデータを結びつけることができます。
**注意**: この設定はコンテナ化環境のみに適用されます。

#### カスタムタグを作成するためのルール {#rules-to-create-custom-tags}
<div class="alert alert-info">
必要です <code>Process Tags Read</code> および <code>Process Tag Write</code>  Datadog ロールのアクセス許可<br/>
</div>

コマンドラインに基づいてプロセスに手動タグを追加するためのルール定義を作成できます。

1.  **プロセスタグ管理**タブで、_新しいプロセスタグルール_ボタンを選択します。
2. 参照用のプロセスを選択します。
3. タグのパースおよび一致基準を定義します。
4. 検証が通過した場合、新しいルールを作成します。

ルールが作成されると、ルール基準に一致するすべてのプロセスコマンドライン値に対してタグが利用可能になります。これらのタグは検索で利用可能で、[Live Process Monitors][6]や[Custom Metrics][13]の定義に使用できます。

## 散布図 {#scatter-plot}

散布図分析を使用すると、2 つのメトリクスを比較してコンテナのパフォーマンスをより的確に把握できます。

[Processes ページ][5]で散布図分析にアクセスするには、_Show Summary graph_ボタンをクリックし、"Scatter Plot"タブを選択します。

{{< img src="infrastructure/process/scatterplot_selection.png" alt="散布図の選択" style="width:60%;">}}

デフォルトでは、グラフは`command`タグキーでグループ化されます。各ドットのサイズは、そのグループ内のプロセスの数を表し、ドットをクリックすると、そのグループに寄与する個々のプロセスとコンテナが表示されます。

グラフの上部にあるオプションを使用して、散布図分析を制御できます。

- 表示するメトリクスの選択。
- 2つのメトリクスの集計方法の選択。
- X軸とY軸の目盛の選択（_線形_/_対数_）。

{{< img src="infrastructure/process/scatterplot.png" alt="コンテナの検査" style="width:80%;">}}

## プロセスモニター {#process-monitors}

[ライブプロセスモニター][6]を使用して、ホストやタグにわたる任意のプロセスグループのカウントに基づいてアラートを生成します。[モニターのページ][7]でプロセスアラートを設定できます。詳細については、[ライブプロセスモニターのドキュメント][6]を参照してください。

{{< img src="infrastructure/process/process_monitor.png" alt="プロセスモニター" style="width:80%;">}}

## ダッシュボードとノートブックのプロセス {#processes-in-dashboards-and-notebooks}

[時系列ウィジェット][8]を使用して、ダッシュボードやノートブックでプロセスメトリクスをグラフ化できます。構成するには、
1. プロセスをデータソースとして選択
2. 検索バーのテキスト文字列を使用してフィルタリング
3. グラフ化するプロセスメトリクスを選択
4. タグを使用して、`From`フィールド内でフィルタリングします。

{{< img src="infrastructure/process/process_widget.png" alt="プロセスウィジェット" style="width:80%;">}}

## サードパーティソフトウェアの監視 {#monitoring-third-party-software}

### 自動検出インテグレーション {#autodetected-integrations}

Datadogは、ホスト上で実行されているテクノロジーを自動検出するためにプロセス収集を使用します。これにより、これらのテクノロジーを監視するのに役立つDatadogのインテグレーションが特定されます。これらの自動検出されたインテグレーションは、[インテグレーション検索][1]に表示されます。

{{< img src="getting_started/integrations/ad_integrations.png" alt="自動検出インテグレーション" >}}

各インテグレーションには、次の 2 つのステータスタイプのいずれかがあります。

- **+ 検出**: このインテグレーションは、それを実行しているホストでは有効になっていません。
- **✓ 部分的な可視性**: このインテグレーションは、一部の関連ホストで有効になっていますが、すべてのホストで実行されているわけではありません。

インテグレーションを実行しているが、インテグレーションが有効になっていないホストは、**ホスト**タブのインテグレーションタイルにあります。

### インテグレーションビュー {#integration-views}

{{< img src="infrastructure/process/integration_views.png" alt="インテグレーションビュー" >}}

サードパーティ製ソフトウェアが検出された後、ライブプロセスはそのソフトウェアのパフォーマンスを分析するのに役立ちます。
1. まず、ページ右上の*ビュー*をクリックして、Nginx、Redis、Kafkaなどの予め設定されたオプションの一覧を開きます。
2. そのソフトウェアを実行中のプロセスのみにページを限定するビューを選択します。
3. 重いプロセスを検査する際は、*インテグレーションメトリクス*タブに切り替えて、基盤となるホスト上のソフトウェアの健康状態を分析します。関連するDatadogインテグレーションをすでに有効にしている場合、ホストレベルとソフトウェアレベルの問題を区別するために、インテグレーションから収集されたすべてのパフォーマンスメトリクスを表示できます。例えば、プロセスのCPUとMySQLクエリのレイテンシに相関するスパイクが見られる場合、フルテーブルスキャンのような集中的な操作が、同じ基盤リソースに依存する他のMySQLクエリの実行を遅延させている可能性があります。

インテグレーションビュー（例えば、ホストごとにNginxプロセスのクエリを集約する場合）や他のカスタムクエリをカスタマイズするには、ページ上部の*+保存*ボタンをクリックします。これにより、クエリ、テーブル列の選択、および視覚化設定が保存されます。追加の設定なしで関心のあるプロセスに迅速にアクセスできる保存されたビューを作成し、チームメイトとプロセスデータを共有します。

## プラットフォームにおけるプロセス {#processes-across-the-platform}

### Live Containers {#live-containers}

Live Processesは、各コンテナで実行されているプロセスを監視することにより、コンテナデプロイメントへの追加の可視性を提供します。[Live Containers][9] ページでコンテナをクリックすると、そのプロセスツリーを表示し、実行中のコマンドとリソース消費を確認できます。このデータを他のコンテナメトリクスと併用して、失敗したコンテナやデプロイメントの根本原因を特定します。

### APM {#apm}

[APM Traces][10] では、サービスのスパンをクリックして、その基盤となるインフラストラクチャー上で実行されているプロセスを確認できます。サービスのスパンプロセスは、リクエスト時にサービスが実行されているホストまたはポッドと相関しています。CPUやRSSメモリなどのプロセスメトリクスをコードレベルのエラーと併せて分析し、アプリケーション固有の問題とより広範なインフラストラクチャーの問題を区別します。プロセスをクリックすると、Live Processes ページに移動します。関連プロセスは、サーバーレスおよびブラウザトレースではサポートされていません。

### Cloud Network Monitoring {#cloud-network-monitoring}

[Network Analytics][11] ページで依存関係を検査すると、エンドポイント間で通信しているサービスなど、基盤となるインフラストラクチャー上で実行されているプロセスを表示できます。プロセスメタデータを使用して、ネットワーク接続の不良（高いTCP再送信数で示される）や高いネットワーク呼び出しのレイテンシ（高いTCP往復時間で示される）が、これらのエンドポイントのリソースを消費する重いワークロードによるものであるかどうかを判断し、それによって通信の健康と効率に影響を与えるかどうかを確認します。

## リアルタイムの監視 {#real-time-monitoring}

プロセスは通常、10秒の解像度で収集されます。Live Processes ページで積極的に作業している間、メトリクスは2秒の解像度で収集され、リアルタイムで表示されます。これは、CPUなどの変動の激しいメトリクスにとって重要です。ただし、歴史的な文脈のために、メトリクスはデフォルトの10秒の解像度で取り込まれます。

## 追加情報 {#additional-information}

- リアルタイム（2秒）データ収集は、30分後にオフになります。リアルタイム収集を再開するには、ページを更新してください。
- コンテナ展開の場合、`/etc/passwd`ファイルが`docker-dd-agent`にマウントされている必要があり、各プロセスのユーザー名を収集します。これは公開ファイルであり、Process Agent はユーザー名以外のフィールドを使用しません。エージェントが特権なしで実行されている場合、マウントは発生しません。`/etc/passwd`ファイルへのアクセスがなくても、`user`メタデータフィールドを除くすべての機能は引き続き動作します。**注**: Live Processes は、ホストの`passwd`ファイルのみを使用し、コンテナ内に作成されたユーザーのユーザー名解決は実行しません。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/faq/agent-5-process-collection/
[2]: /ja/agent/
[3]: /ja/getting_started/tagging/
[4]: /ja/getting_started/tagging/unified_service_tagging
[5]: https://app.datadoghq.com/process
[6]: /ja/monitors/types/process/
[7]: https://app.datadoghq.com/monitors/create/live_process
[8]: /ja/dashboards/widgets/timeseries/#pagetitle
[9]: /ja/infrastructure/livecontainers/
[10]: /ja/tracing/
[11]: /ja/network_monitoring/cloud_network_monitoring/network_analytics
[12]: /ja/agent/configuration/agent-commands/#restart-the-agent
[13]: /ja/metrics/custom_metrics/
[14]: /ja/network_monitoring/cloud_network_monitoring/