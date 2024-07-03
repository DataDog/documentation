---
aliases:
- /ja/agent/cluster_agent/commands
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Introducing the Datadog Cluster Agent
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: Blog
  text: Autoscale your Kubernetes workloads with any Datadog metric
- link: /agent/cluster_agent/clusterchecks/
  tag: Documentation
  text: Running Cluster Checks with Autodiscovery
- link: /agent/kubernetes/daemonset_setup/
  tag: Documentation
  text: Kubernetes DaemonSet Setup
- link: /agent/cluster_agent/troubleshooting/
  tag: Documentation
  text: Troubleshooting the Datadog Cluster Agent
title: Cluster Agent Commands and Options
---

## Cluster Agent のコマンド

Datadog Cluster Agent には次のコマンドがあります。

`datadog-cluster-agent status`              
: Agent のコンポーネントの概要と健全性を示します。

`datadog-cluster-agent metamap <NODE_NAME>`
: `NODE_NAME` 上に存在するポッドと、エンドポイントなど関連するクラスターレベルのメタデータのマッピングをローカルキャッシュに問い合わせます。`NODE_NAME` を指定しない場合は、クラスターのすべてのノードでマッパーが実行されます。

`datadog-cluster-agent flare <CASE_ID>`
ノードベース Agent と同様に、Cluster Agent は、ログや使用された構成を集計し、サポートチームにアーカイブを転送したり、圧縮してローカルで使用したりすることもできます。**注**: このコマンドは Cluster Agent ポッド内から実行されます。

## Cluster Agent environment variables

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Set Cluster Agent environment variables under `override.clusterAgent.env`:

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    clusterAgent:
      env:
        - name: <ENV_VAR_NAME>
          value: <ENV_VAR_VALUE>
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}
Set Cluster Agent environment variables under `clusterAgent.env`:
{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
clusterAgent:
  env:
    - name: <ENV_VAR_NAME>
      value: <ENV_VAR_VALUE>
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

次の環境変数がサポートされています。

`DD_API_KEY`                                  
: [Datadog API キー][1]。

`DD_CLUSTER_CHECKS_ENABLED`
クラスターチェックのオートディスカバリーを有効にします。デフォルトは `false` です。

`DD_CLUSTER_AGENT_AUTH_TOKEN`                 
: 32-character token that needs to be shared between the node Agent and the Datadog Cluster Agent.

`DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME`
Cluster Agent が公開される Kubernetes サービスの名前。デフォルトは `datadog-cluster-agent` です。

`DD_CLUSTER_NAME`
クラスター名。インスタンスタグとしてすべてのクラスターチェック構成に追加されます。

`DD_CLUSTER_CHECKS_ENABLED`
: When true, enables dispatching logic on the leader Cluster Agent. Default: `false`.

`DD_CLUSTER_CHECKS_NODE_EXPIRATION_TIMEOUT`
ノードベースの Agent が停止していると見なされてプールから削除されるまでの時間（秒単位）。デフォルトは `30` 秒です。

`DD_CLUSTER_CHECKS_WARMUP_DURATION`
リーダーシップの取得からクラスターチェックロジックの開始までの遅延（秒単位）。すべてのノードベースの Agent が先に登録されるようにします。デフォルトは `30` 秒です。

`DD_CLUSTER_CHECKS_CLUSTER_TAG_NAME`
`DD_CLUSTER_NAME` オプションによって設定されるインスタンスタグの名前。デフォルトは `cluster_name` です。

`DD_CLUSTER_CHECKS_EXTRA_TAGS`                
: Adds extra tags to cluster check metrics.

`DD_CLUSTER_CHECKS_ADVANCED_DISPATCHING_ENABLED`
: When true, the leader Cluster Agent collects stats from the cluster-level check runners to optimize check dispatching logic. Default: `false`.

`DD_CLUSTER_CHECKS_CLC_RUNNERS_PORT`
: The port used by the Cluster Agent client to reach cluster-level check runners and collect their stats. Default: `5005`.

`DD_HOSTNAME`
Datadog Cluster Agent に使用するホスト名。

`DD_ENV`
Cluster Agent によって発行されたデータの `env` タグを設定します。Cluster Agent が単一環境内のサービスを監視する場合にのみ推奨されます。

`DD_USE_METADATA_MAPPER`
クラスターレベルのメタデータマッピングを有効にします。デフォルトは `true` です。

`DD_COLLECT_KUBERNETES_EVENTS`
: Kubernetes イベントを収集するように Agent を構成します。デフォルトは `false` です。

`DD_LEADER_ELECTION`
「リーダー選出」を有効にします。この機能を有効にするには、 `DD_COLLECT_KUBERNETES_EVENTS` を `true` に設定します。デフォルトは `false` です。

`DD_LEADER_LEASE_DURATION`
: リーダー選出が有効になっている場合にのみ使用されます。値は秒単位で、デフォルトは 60 です。

`DD_KUBE_RESOURCES_NAMESPACE`
Cluster Agent がリーダー選出、イベント収集 (オプション)、および水平ポッドオートスケーリングに必要な ConfigMap を作成する場所となるネームスペースを構成します。

`DD_KUBERNETES_INFORMERS_RESYNC_PERIOD`
ローカルキャッシュを再同期するために API サーバーに問い合わせる頻度 (秒単位)。デフォルトは 5 分 (`300` 秒) です。


API サーバーと通信しているクライアントのタイムアウト (秒単位)。デフォルトは `60` 秒です。

`DD_METRICS_PORT`                              
: Datadog Cluster Agent のメトリクスを公開するポート。デフォルトはポート `5000` です。

`DD_EXTERNAL_METRICS_PROVIDER_BATCH_WINDOW`
複数のオートスケーラーからのメトリクスバッチを処理するための待機時間 (秒単位)。デフォルトは `10` 秒です。

`DD_EXTERNAL_METRICS_PROVIDER_MAX_AGE`
データポイントが無効になって使用できないと見なされるまでの最大時間 (秒単位)。デフォルトは `120` 秒です。

`DD_EXTERNAL_METRICS_AGGREGATOR`
Datadog メトリクスの集計関数。処理されるすべてのオートスケーラーに適用されます。`sum`/`avg`/`max`/`min` から選択します。

`DD_EXTERNAL_METRICS_PROVIDER_BUCKET_SIZE`
Datadog からのメトリクスの問い合わせに使用するウィンドウのサイズ (秒単位)。デフォルトは `300` 秒です。

`DD_EXTERNAL_METRICS_LOCAL_COPY_REFRESH_RATE`
処理済みメトリクスのローカルキャッシュをグローバルストアと再同期する頻度。Cluster Agent のレプリカが複数ある場合に便利です。

`DD_EXTRA_CONFIG_PROVIDERS`
追加で使用するオートディスカバリー構成プロバイダー。

`DD_EXTRA_LISTENERS`
追加で実行するオートディスカバリーリスナー。

`DD_PROXY_HTTPS`
: HTTPS リクエスト用のプロキシサーバーを設定します。

`DD_PROXY_HTTP`
: HTTP リクエスト用のプロキシサーバーを設定します。

`DD_PROXY_NO_PROXY`
: プロキシをバイパスするホストのリストを設定します。リストはスペース区切りです。

`DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_INIT_RESOURCES_CPU`
: init コンテナの CPU リクエストと制限を構成します。

`DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_INIT_RESOURCES_MEMORY`
: init コンテナのメモリリクエストと制限を構成します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://golang.org/pkg/expvar