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
  text: プロセスレベルのアプリとネットワークデータを使用して、より迅速にトラブルシューティングを行う
- link: https://www.datadoghq.com/blog/watchdog-live-processes/
  tag: ブログ
  text: Live Processes 用 Watchdog Insights によるワークロードのパフォーマンス異常に対するトラブルシューティング
title: Live Processes
---
<div class="alert alert-info">
Live Processes および Live Process Monitoring は Enterprise プランに含まれています。その他のプランをご利用の場合にこの機能をリクエストするには、アカウント担当者または <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> にご連絡ください。
</div>

## はじめに {#introduction}

Datadog の Live Processes により、インフラストラクチャー上で実行中のプロセスをリアルタイムで可視化できます。Live Processes を使用すると、以下のことができます。

* 実行中のプロセスを 1 か所で表示する
* ホストやコンテナのリソース消費をプロセスレベルで分類する
* 特定のホストや特定のゾーンで実行中のプロセスや、特定のワークロードを実行するプロセスをクエリする
* システムメトリクスを使用して、実行する内部およびサードパーティソフトウェアのパフォーマンスを 2 秒の粒度でモニターする
* ダッシュボードとノートブックにコンテキストを追加する

{{< img src="infrastructure/process/live_processes_main.png" alt="Live Processes の概要" >}}

## インストール {#installation}

Agent 5 をご使用の場合は、この [特定のインストール手順][1] に従ってください。Agent 6 または 7 をご使用の場合は、[以下の手順を参照してください][2]。

{{< tabs >}}
{{% tab "Linux/Windows" %}}

Datadog Agent をインストールしたら、[Agent のメイン構成ファイル][1] を編集し、次のパラメーターを `true` に設定して、Live Processes の収集を有効にします。

```yaml
process_config:
  process_collection:
    enabled: true
```

さらに、いくつかの構成オプションを環境変数として設定できます。

**注**: 環境変数として設定されたオプションは、構成ファイルで定義されている設定を上書きします。

設定が完了したら、[Agent を再起動][2] します。


[1]: /ja/agent/configuration/agent-configuration-files/
[2]: /ja/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

[Docker Agent][1] の手順に従い、必要に応じてほかのカスタム設定に加えて、以下の属性を渡します。

```text
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED=true
```

**注**:

- 標準インストールでコンテナ情報を収集するには、`dd-agent` ユーザーが `docker.sock` へのアクセス許可を持っている必要があります。
- 引き続き、Agent をコンテナとして実行してホストプロセスを収集することもできます。


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

**注**: 引き続き、Agent をコンテナとして実行してホストプロセスを収集することもできます。

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Datadog Operator" %}}

ご使用の `datadog-agent.yaml` で、`features.liveProcessCollection.enabled` を `true` に設定します。

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
{{% tab "Kubernetes (手動)" %}}

DaemonSet の作成に使用された `datadog-agent.yaml` マニフェスト内に、以下の環境変数、ボリュームマウント、およびボリュームを追加します。

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

詳細については、標準の [DaemonSet インストール][1] のページおよび [Docker Agent][2] の情報ページを参照してください。

**注**: 引き続き、Agent をコンテナとして実行してホストプロセスを収集することもできます。

[1]: /ja/containers/guide/kubernetes_daemonset
[2]: /ja/agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "AWS ECS Fargate" %}}

<div class="alert alert-info">Datadog で ECS Fargate プロセスを表示できます。ECS Fargate コンテナとの関係を確認するには、Datadog Agent v7.50.0 以降を使用してください。</div>

プロセスを収集するには、Datadog Agent がタスク内でコンテナとして実行されている必要があります。

ECS Fargate でプロセスモニタリングを有効にするには、タスク定義内の Datadog Agent コンテナ定義で `DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED` 環境変数を `true` に設定します。

たとえば、次のようにします。

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

ECS Fargate でプロセス情報の収集を開始するには、タスク定義に [`pidMode` パラメーター][3] を追加し、以下のように `task` に設定します:

```text
"pidMode": "task"
```

有効化したら、[Live Processes ぺージ][1] で `AWS Fargate` Containers ファセットを使用して ECS で実行されているプロセスをフィルタリングするか、検索クエリに `fargate:ecs` を入力します。

{{< img src="infrastructure/process/fargate_ecs.png" alt="AWS Fargate のプロセス" >}}

AWS ECS Fargate で Datadog Agent をインストールする方法の詳細については、[ECS Fargate インテグレーションのドキュメント][2]を参照してください。

[1]: https://app.datadoghq.com/process
[2]: /ja/integrations/ecs_fargate/#installation
[3]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#other_task_definition_params

{{% /tab %}}
{{< /tabs >}}

### I/O 統計 {#io-stats}

I/O とオープンファイルの統計情報は、昇格した権限で実行される Datadog システムプローブによって収集することができます。これらの統計情報を収集するには、システムプローブのプロセスモジュールを有効にします。

1. 下記のシステムプローブの構成の例をコピーします。

   ```shell
   sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
   ```

2. `/etc/datadog-agent/system-probe.yaml` を編集してプロセスモジュールを有効にします。

   ```yaml
   system_probe_config:
     process_config:
       enabled: true
   ```

5. [Agent を再起動][12] します:

   ```shell
   sudo systemctl restart datadog-agent
   ```

   **注**: システムで `systemctl` コマンドを利用できない場合は、代わりに次のコマンドを実行します。`sudo service datadog-agent restart`


### プロセス収集のフットプリント最適化 {#optimized-process-collection-footprint}

Linux では、(個別のプロセスエージェントではなく) コア Datadog Agent でコンテナおよびプロセス収集を実行することで、Datadog Agent の全体的なフットプリントを削減します。Datadog Agent v7.65.0 以降では、これがデフォルトで有効になっています。 **注**: プロセスエージェントは、[Cloud Network Monitoring][14] では引き続き必要です。

この機能の Agent ステータスは、`Process Component` セクションに記載されています。たとえば、次のようになります。

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

### プロセス引数のスクラビング {#process-arguments-scrubbing}

Live Processes ページで機密データを非表示にするために、Agent はプロセスコマンドラインから機密性の高い引数をスクラビングします。この機能はデフォルトで有効になっており、以下のいずれかの単語に一致するプロセス引数では値が非表示になります。

```text
"password", "passwd", "mysql_pwd", "access_token", "auth_token", "api_key", "apikey", "secret", "credentials", "stripetoken"
```

**注**: この一致では、**大文字と小文字は区別されません**。

{{< tabs >}}
{{% tab "Linux/Windows" %}}

`custom_sensitive_words` ファイルの `process_config` セクションにある `datadog.yaml` フィールドを使用して、独自のリストを定義して、デフォルトのリストと統合します。ワイルドカード (`*`) を使用して、一致のスコープを独自に定義できます。ただし、ワイルドカード (`'*'`) 単独の使用は、機密語としてサポートされていません。

```yaml
process_config:
    scrub_args: true
    custom_sensitive_words: ['personal_key', '*token', 'sql*', '*pass*d*']
```

**注**: `custom_sensitive_words` 内の単語には、英数字、アンダースコア、ワイルドカード (`'*'`) のみを使用できます。ワイルドカードのみの機密語はサポートされていません。

次の図に、Live Processes ページに表示されたプロセスの一例を示します。上の構成を使用して、プロセス引数が非表示にされています。

{{< img src="infrastructure/process/process_arg_scrubbing.png" alt="プロセス引数のスクラビング" style="width:100%;">}}

`scrub_args` を `false` に設定すると、プロセス引数のスクラビングを完全に無効化できます。

`datadog.yaml` 構成ファイルで `strip_proc_arguments` フラグを有効にすることで、プロセスの**すべての**引数をスクラビングすることもできます。

```yaml
process_config:
    strip_proc_arguments: true
```

{{% /tab %}}

{{% tab "Helm" %}}

Helm チャートを使用して、デフォルトのリストにマージされる独自のリストを定義できます。環境変数 `DD_SCRUB_ARGS` と `DD_CUSTOM_SENSITIVE_WORDS` を `datadog-values.yaml` ファイルに追加し、Datadog Helm チャートをアップグレードします。

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


## クエリ {#queries}

### プロセスのスコーピング {#scoping-processes}

プロセスは、本質的に極めてカーディナリティの高いオブジェクトです。関連するプロセスを表示するようにスコープを絞り込むには、テキストフィルターやタグフィルターを使用します。

#### テキストフィルター {#text-filters}

検索バーにテキスト文字列を入力すると、コマンドラインやパスにそのテキスト文字列を含むプロセスをクエリする際に、曖昧文字列検索が使用されます。2 文字以上の文字列を入力すると結果が表示されます。以下の例では、Datadog のデモ環境を文字列 `postgres /9.` でフィルタリングしています。

**注**: `/9.` はコマンドパスの一部と一致し、`postgres` はコマンド自体と一致しています。

{{< img src="infrastructure/process/postgres.png" alt="Postgres" style="width:80%;">}}

複合クエリで複数の文字列検索を組み合わせるには、以下のブール演算子を使用します。

`AND`
: **積**: 両方の条件を含むイベントが選択されます (何も追加しなければ、AND がデフォルトで使用されます)。<br> **例**: `java AND elasticsearch`

`OR`
: **和**: いずれかの条件を含むイベントが選択されます。<br> **例**: `java OR python`

`NOT` / `!`
: **排他**: 後続の条件がイベントに含まれません。単語 `NOT` または文字 `!` のどちらを使用しても、同じ演算を行うことができます。<br> **例**: `java NOT elasticsearch` または `java !elasticsearch`

演算子をグループ化するには括弧を使用します。たとえば、`(NOT (elasticsearch OR kafka) java) OR python` です。

#### タグフィルター {#tag-filters}

プロセスのフィルタリングには、`host`、`pod`、`user`、`service` などの Datadog [タグ][3] を使用することもできます。検索バーに直接タグフィルターを入力するか、ページ左側のファセットパネルで選択します。

Datadog は自動的に `command` タグを生成するので、以下をフィルタリングできます。

- サードパーティソフトウェア、例: `command:mongod`、`command:nginx`
- コンテナ管理ソフトウェア、例: `command:docker`、`command:kubelet`
- 一般的なワークロード、例: `command:ssh`、`command:CRON`

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

[Unified Service Tagging][4] の構成がある場合、`env`、`service`、`version` は自動的に取得されます。
これらのタグが利用できるようになると、APM、ログ、メトリクス、プロセスデータを結びつけられるようになります。
**注**: この設定はコンテナ化環境にのみ適用されます。

#### カスタムタグの作成ルール {#rules-to-create-custom-tags}
<div class="alert alert-info">
ここでは、 <code>Process Tags Read</code> および <code>Process Tag Write</code>  Datadog ロールのアクセス許可が必要です。<br/>
</div>

コマンドラインに基づいてプロセスに手動でタグを追加するためのルール定義を作成できます。

1. [**Manage Process Tags**] (プロセスタグの管理) タブで、[_New Process Tag Rule_] (新規プロセスタグルール) ボタンを選択します。
2. 参照用のプロセスを選択します。
3. タグのパースおよび一致基準を定義します。
4. 検証に合格したら、新しいルールを作成します。

ルールが作成されると、ルール基準に一致するすべてのプロセスコマンドライン値でタグが利用可能になります。これらのタグは検索で利用可能で、[ライブプロセスモニター][6] や [Custom Metrics][13] の定義で使用できます。

## 散布図 {#scatter-plot}

散布図分析を使用すると、2 つのメトリクスを比較してコンテナのパフォーマンスをより的確に把握できます。

[Processes ページ][5] で散布図分析にアクセスするには、[_Show Summary graph_] (サマリーグラフを表示) ボタンをクリックし、[Scatter Plot] (散布図) タブを選択します。

{{< img src="infrastructure/process/scatterplot_selection.png" alt="散布図の選択" style="width:60%;">}}

デフォルトでは、グラフは `command` タグキーでグループ化されます。各ドットのサイズは、そのグループ内のプロセスの数を表します。ドットをクリックすると、グループに参加している個別のプロセスとポッドとコンテナが表示されます。

グラフの上部にあるオプションを使用して、散布図分析を制御できます。

- 表示するメトリクスの選択。
- 2 つのメトリクスの集計方法の選択。
- X 軸と Y 軸の目盛の選択 (_線形_/_対数_)。

{{< img src="infrastructure/process/scatterplot.png" alt="コンテナの調査" style="width:80%;">}}

## プロセスモニター {#process-monitors}

複数のホストまたはタグにまたがるプロセスグループの数に基づいてアラートを生成するには、[ライブプロセスモニター][6] を使用します。プロセスアラートは、[モニターページ][7] で構成できます。詳細は、[ライブプロセスモニターのドキュメント][6] を参照してください。

{{< img src="infrastructure/process/process_monitor.png" alt="プロセスモニター" style="width:80%;">}}

## ダッシュボードとノートブックでのプロセス {#processes-in-dashboards-and-notebooks}

ダッシュボードやノートブックでプロセスメトリクスをグラフ化するには、[時系列ウィジェット][8] を使用します。構成するには、次のようにします。
1. プロセスをデータソースとして選択します。
2. 検索バーのテキスト文字列を使用してフィルタリングします。
3. グラフ化するプロセスメトリクスを選択します。
4. `From` フィールドのタグを使用してフィルタリングします。

{{< img src="infrastructure/process/process_widget.png" alt="プロセスウィジェット" style="width:80%;">}}

## サードパーティソフトウェアのモニタリング {#monitoring-third-party-software}

### 自動検出インテグレーション {#autodetected-integrations}

Datadog ではプロセス収集を使用して、ホストで実行されているテクノロジーを自動検出します。これにより、こうしたテクノロジーのモニターに役立つ Datadog インテグレーションが識別されます。この自動検出されたインテグレーションは、[インテグレーションの検索][1] に表示されます。

{{< img src="getting_started/integrations/ad_integrations.png" alt="自動検出インテグレーション" >}}

各インテグレーションには、次の 2 つのステータスタイプのいずれかがあります。

- **+ Detected** (+ 検出済み): このインテグレーションは、それを実行しているホストでは有効になっていません。
- **✓ Partial Visibility** (✓ 部分的な可視性): このインテグレーションは、一部で有効になっていますが、すべての関連ホストで実行されているわけではありません。

インテグレーションを実行しているが、インテグレーションが有効になっていないホストは、インテグレーションタイルの [**Hosts**] (ホスト) タブにあります。

### インテグレーションビュー {#integration-views}

{{< img src="infrastructure/process/integration_views.png" alt="インテグレーションビュー" >}}

サードパーティソフトウェアが検出されると、Live Processes はそのソフトウェアのパフォーマンスを分析するのに役立ちます。
1. まず、ページ右上の *Views* (ビュー) をクリックし、Nginx、Redis、Kafka などの、あらかじめ設定されたオプションの一覧を開きます。
2. そのソフトウェアを実行中の処理のみにページを限定するビューを選択します。
3. 重いプロセスを調べる場合は、[*Integration Metrics*] (インテグレーションメトリクス) タブに切り替え、基盤となるホストにあるソフトウェアの健全性を分析します。関連する Datadog インテグレーションを有効にしてある場合は、インテグレーションから収集されたすべてのパフォーマンスメトリクスを表示できるため、問題がホストレベルなのかソフトウェアレベルなのかを判断できます。たとえば、プロセス CPU と MySQL クエリのレイテンシーが相関して急上昇する場合、全表スキャンなどの集中的な操作が、同じ基盤となるリソースに依存する別の MySQL クエリの実行を遅らせていることが考えられます。

インテグレーションビュー (ホストごとに Nginx 処理のクエリを集約する場合) やほかのカスタムクエリをカスタマイズするには、ページ上部の [*+Save*] (+保存) ボタンをクリックします。この操作により、クエリ、テーブルの列の選択、可視化設定が保存されます。保存ビューを作成して、追加の構成なしに必要なプロセスに迅速にアクセスしたり、チームメイトとプロセスデータを共有したりできます。

## プラットフォームにおけるプロセス {#processes-across-the-platform}

### ライブコンテナ {#live-containers}

Live Processes では、それぞれのコンテナで実行中のプロセスをモニターすることで、コンテナデプロイの可視化をさらに強化しています。[ライブコンテナ][9] ページでコンテナをクリックすると、実行中のコマンドやリソース消費量を含むプロセスツリーが表示されます。ほかのコンテナメトリクスと共にこのデータを使用し、コンテナやデプロイの不具合の根本原因を判別します。

### APM {#apm}

[APM トレース][10] でサービスのスパンをクリックすると、基盤となるインフラストラクチャーで実行中のプロセスを確認できます。サービスのスパンプロセスは、リクエスト時にサービスが実行されているホストまたはポッドと相関関係にあります。CPU および RSS メモリなどのプロセスメトリクスをコードレベルのエラーと共に分析することで、アプリケーション固有の問題なのか、インフラストラクチャーの問題なのかを切り分けることができます。プロセスをクリックすると、Live Processes ページが開きます。関連するプロセスは、サーバーレスおよびブラウザのトレースでサポートされていません。

### Cloud Network Monitoring {#cloud-network-monitoring}

[Network Analytics][11] ページで依存関係を調べる際、相互に通信するエンドポイント (サービスなど) の基盤となるインフラストラクチャーで実行されるプロセスを確認できます。プロセスメタデータを使用して、ネットワーク接続の不具合 (TCP の再送信数が多いことを示唆) やネットワーク呼び出しレイテンシーの高さ (TCP ラウンドトリップタイムが長いことを示唆) の原因が、エンドポイントのリソースを消費する重いワークロードであり、その結果、通信の健全性や効率性に影響を与えているかを判断できます。

## リアルタイムのモニター {#real-time-monitoring}

通常、プロセスは 10 秒間隔で収集されます。Live Processes ページでアクティブに作業している間は、メトリクスが 2 秒間隔で収集され、リアルタイムで表示されます。これは、CPU などの変動が大きいメトリクスで重要です。ただし、履歴として収集する場合は、デフォルトの 10 秒間隔でメトリクスが取り込まれます。

## 追加情報 {#additional-information}

- リアルタイム (2 秒) のデータ収集は 30 分後にオフになります。リアルタイム収集を再開するには、ページをリフレッシュします。
- コンテナのデプロイで、各プロセスのユーザー名を収集するには、`docker-dd-agent` にマウントされた `/etc/passwd` ファイルが必要です。これは公開ファイルですが、プロセスエージェントはユーザー名以外のフィールドを使用しません。Agent が特権なしで実行されている場合は、マウントは行われません。`/etc/passwd` ファイルへのアクセス権がない場合でも、`user` メタデータフィールド以外のすべての機能は動作します。**注**: Live Processes は、ホストの `passwd` ファイルのみを使用し、コンテナ内で作成されたユーザーのユーザー名解決は実行しません。

## 参考資料 {#further-reading}

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