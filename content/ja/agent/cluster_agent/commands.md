---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: ブログ
  text: Datadog Cluster Agent のご紹介
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: ブログ
  text: Datadog メトリクスを使用して Kubernetes のワークロードをオートスケーリングする
- link: /agent/cluster_agent/clusterchecks/
  tag: ドキュメント
  text: Autodiscovery によるクラスターチェックの実行
- link: /agent/kubernetes/daemonset_setup/
  tag: ドキュメント
  text: Kubernetes DaemonSet のセットアップ
- link: /agent/cluster_agent/troubleshooting/
  tag: ドキュメント
  text: Datadog Cluster Agent のトラブルシューティング
kind: documentation
title: Cluster Agent のコマンドとオプション
---

## Cluster Agent のコマンド

Datadog Cluster Agent には次のコマンドがあります。

`datadog-cluster-agent status`              
: Agent のコンポーネントの概要と健全性を示します。

`datadog-cluster-agent metamap <NODE_NAME>`
: `NODE_NAME` 上に存在するポッドと、エンドポイントなど関連するクラスターレベルのメタデータのマッピングをローカルキャッシュに問い合わせます。`NODE_NAME` を指定しない場合は、クラスターのすべてのノードでマッパーが実行されます。

`datadog-cluster-agent flare <CASE_ID>`
ノードベース Agent と同様に、Cluster Agent は、ログや使用された構成を集計し、サポートチームにアーカイブを転送したり、圧縮してローカルで使用したりすることもできます。**注**: このコマンドは Cluster Agent ポッド内から実行されます。

## Cluster Agent のオプション

次の環境変数がサポートされています。

`DD_API_KEY`                                  
: [Datadog API キー][1]。

`DD_HOSTNAME`
Datadog Cluster Agent に使用するホスト名。

`DD_ENV`
Cluster Agent によって発行されたデータの `env` タグを設定します。Cluster Agent が単一環境内のサービスを監視する場合にのみ推奨されます。

`DD_CLUSTER_AGENT_CMD_PORT`
Datadog Cluster Agent がサービスを提供するポート。デフォルトは `5005` です。

`DD_USE_METADATA_MAPPER`
クラスターレベルのメタデータマッピングを有効にします。デフォルトは `true` です。

`DD_COLLECT_KUBERNETES_EVENTS`
Kubernetes イベントを収集するように Agent を構成します。デフォルトは `false` です。詳細については、[Cluster Agent イベント収集のドキュメント][2]を参照してください。

`DD_LEADER_ELECTION`
「リーダー選出」を有効にします。この機能を有効にするには、 `DD_COLLECT_KUBERNETES_EVENTS` を `true` に設定します。デフォルトは `false` です。

`DD_LEADER_LEASE_DURATION`                    
: リーダー選出が有効な場合のみ使用されます。リーダー選出についての詳細は、[Cluster Agent イベント収集のドキュメント][2]を参照してください。値は秒数で、デフォルトでは 60 です。

`DD_CLUSTER_AGENT_AUTH_TOKEN`
ノード Agent と Datadog Cluster Agent の間で共有される 32 文字のトークン。

`DD_KUBE_RESOURCES_NAMESPACE`
Cluster Agent がリーダー選出、イベント収集 (オプション)、および水平ポッドオートスケーリングに必要な ConfigMap を作成する場所となるネームスペースを構成します。

`DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME`
Cluster Agent が公開される Kubernetes サービスの名前。デフォルトは `datadog-cluster-agent` です。

`DD_KUBERNETES_INFORMERS_RESYNC_PERIOD`
ローカルキャッシュを再同期するために API サーバーに問い合わせる頻度 (秒単位)。デフォルトは 5 分 (`300` 秒) です。


API サーバーと通信しているクライアントのタイムアウト (秒単位)。デフォルトは `60` 秒です。

`DD_EXPVAR_PORT`
Datadog Cluster Agent から [expvar][3] パブリック変数を取得するためのポート。デフォルトはポート `5000`。

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

`DD_CLUSTER_CHECKS_ENABLED`
クラスターチェックのオートディスカバリーを有効にします。デフォルトは `false` です。

`DD_EXTRA_CONFIG_PROVIDERS`
追加で使用するオートディスカバリー構成プロバイダー。

`DD_EXTRA_LISTENERS`
追加で実行するオートディスカバリーリスナー。

`DD_CLUSTER_NAME`
クラスター名。インスタンスタグとしてすべてのクラスターチェック構成に追加されます。

`DD_CLUSTER_CHECKS_CLUSTER_TAG_NAME`
`DD_CLUSTER_NAME` オプションによって設定されるインスタンスタグの名前。デフォルトは `cluster_name` です。

`DD_CLUSTER_CHECKS_NODE_EXPIRATION_TIMEOUT`
ノードベースの Agent が停止していると見なされてプールから削除されるまでの時間（秒単位）。デフォルトは `30` 秒です。

`DD_CLUSTER_CHECKS_WARMUP_DURATION`
リーダーシップの取得からクラスターチェックロジックの開始までの遅延（秒単位）。すべてのノードベースの Agent が先に登録されるようにします。デフォルトは `30` 秒です。

`DD_CLUSTER_CHECKS_EXTRA_TAGS`
クラスターチェックメトリクスにタグを追加します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/agent/cluster_agent/event_collection/
[3]: https://golang.org/pkg/expvar