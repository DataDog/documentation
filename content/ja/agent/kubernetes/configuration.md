---
aliases:
- /ja/integrations/faq/gathering-kubernetes-events
- /ja/agent/kubernetes/event_collection
kind: documentation
title: Kubernetes 上の Datadog Agent の構成
---

## 概要

Kubernetes 環境に Datadog Agent をインストールした後、追加の構成オプションを選択することができます。

## ライブコンテナ

[Datadog Agent][1] と [Cluster Agent][2] は、[ライブコンテナ][3]の Kubernetes リソースを取得するように構成できます。この機能により、特定のネームスペースまたはアベイラビリティーゾーンのポッド、デプロイメント、その他の Kubernetes の概念の状態を監視したり、デプロイメント内で失敗したポッドのリソース仕様を確認したり、ノードアクティビティを関係するログに関連付けたりすることが可能になります。

コンフィギュレーションの説明や追加の情報については、[ライブコンテナ][4]ドキュメントを参照してください。

## イベント収集

{{< tabs >}}
{{% tab "Operator" %}}

Cluster Agent で Kubernetes のイベントを収集するには、`datadog-agent.yaml` マニフェストで `clusterAgent.config.collectEvents` を `true` に設定します。

例:

```
clusterAgent:
  config:
    collectEvents: true
```

また、ノード Agent で Kubernetes のイベントを収集する場合は、`datadog-agent.yaml` マニフェストで `agent.config.collectEvents` を `true` に設定します。

例:

```
agent:
  config:
    collectEvents: true
```

{{% /tab %}}
{{% tab "Helm" %}}

Kubernetes のイベントを Datadog Cluster Agent で収集したい場合は、`value.yaml` ファイルで `clusterAgent.enabled`、`datadog.collectEvents`、`clusterAgent.rbac.create` オプションを `true` に設定してください。

Cluster Agent を使用しない場合でも、`value.yaml` ファイルで `datadog.leaderElection`、`datadog.collectEvents`、`agents.rbac.create` オプションを `true` に設定すれば、ノード Agent に Kubernetes イベントを収集させることができます。

{{% /tab %}}
{{% tab "DaemonSet" %}}

Kubernetes クラスターからイベントを収集する場合は、Agent マニフェストで環境変数 `DD_COLLECT_KUBERNETES_EVENTS` と `DD_LEADER_ELECTION` を `true` に設定します。または、[Datadog Cluster Agent イベント収集][1]を使用します

[1]: /ja/agent/cluster_agent/event_collection/
{{% /tab %}}
{{< /tabs >}}

## インテグレーション

クラスター内で Agent が実行されたら、[Datadog のオートディスカバリー機能][5]を使いポッドからメトリクスとログを自動的に収集します。

## 環境変数

DaemonSet を使用する Datadog Agent で使用できる環境変数の一覧は以下のとおりです。Helm を使用している場合は、[helm/charts GitHub repository][6] にある `datadog-value.yaml` ファイルに対する構成オプションの全リストを参照してください。Operator を使用している場合は、[Operator 構成][7]のドキュメントを参照してください。

### グローバルオプション

| 環境変数         | 説明                                                                                                                                                                                                                                                                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`         | Datadog API キー (**必須**)                                                                                                                                                                                                                                                                                                              |
| `DD_ENV`             | 出力されるすべてのデータにグローバル `env` タグを設定します。                                                                                                                                                                                                                                                                                                  |
| `DD_HOSTNAME`        | メトリクスに使用するホスト名 (自動検出が失敗した場合)                                                                                                                                                                                                                                                                                             |
| `DD_TAGS`            | スペース区切りのホストタグ。例: `simple-tag-0 tag-key-1:tag-value-1`                                                                                                                                                                                                                                                                 |
| `DD_SITE`            | メトリクス、トレース、ログの送信先サイト。`DD_SITE` は {{< region-param key="dd_site" code="true">}} で、デフォルトは `datadoghq.com` です。                                                                                                                                                                                               |
| `DD_DD_URL`          | メトリクス送信用 URL を上書きします。設定は任意です。                                                                                                                                                                                                                                                                                      |
| `DD_CHECK_RUNNERS`   | Agent はデフォルトですべてのチェックを同時に実行します (デフォルト値は `4` ランナーです)。チェックを順次実行する場合は、値を `1` に設定してください。ただし、多数のチェック (または時間のかかるチェック) を実行する必要がある場合、`collector-queue` コンポーネントが遅延して、ヘルスチェックに失敗する可能性があります。ランナーの数を増やすと、チェックを並行して実行できます。 |
| `DD_LEADER_ELECTION` | クラスターで複数の Agent インスタンスが実行されている場合は、この変数を `true` に設定して、イベント収集の重複を回避します。                                                                                                                                                                                                                         |

### プロキシ設定

Agent v6.4.0 (トレース Agent の場合は v6.5.0) より、以下の環境変数を使用して Agent のプロキシ設定を上書きできるようになりました。

| 環境変数             | 説明                                                            |
|--------------------------|------------------------------------------------------------------------|
| `DD_PROXY_HTTP`          | `http` リクエスト用のプロキシとして使用する HTTP URL です。                     |
| `DD_PROXY_HTTPS`         | `https` リクエスト用のプロキシとして使用する HTTPS URL です。                   |
| `DD_PROXY_NO_PROXY`      | プロキシを使用すべきではない場合に必要となる、URL をスペースで区切ったリストです。      |
| `DD_SKIP_SSL_VALIDATION` | Agent と Datadog との接続で問題が発生した場合にテストを実施するオプションです。 |

プロキシ設定の詳細については、[Agent v6 プロキシのドキュメント][8]を参照してください。

### オプションの収集 Agent

セキュリティまたはパフォーマンス上の理由により、オプションの収集 Agent はデフォルトで無効になっています。このエージェントを有効にするには、以下の環境変数を使用します。

| 環境変数                    | 説明                                                                                                                                                                                                                                                  |
|---------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APM_ENABLED`                | トレース Agent による [トレースの収集][4]を有効にします。                                                                                                                                                                                                           |
| `DD_LOGS_ENABLED`               | ログ Agent による[ログの収集][5]を有効にします。                                                                                                                                                                                                              |
| `DD_PROCESS_AGENT_ENABLED`      | プロセス Agent による[ライブプロセスの収集][6]を有効にします。Docker ソケットがある場合、[ライブコンテナービュー][8]はすでにデフォルトで有効になっています。`false` に設定すると、[ライブプロセスの収集][6]と[ライブコンテナービュー][8]が無効になります。 |
| `DD_COLLECT_KUBERNETES_EVENTS ` | Agent でのイベント収集を有効にします。クラスターで複数の Agent インスタンスを実行している場合は、`DD_LEADER_ELECTION` も `true` に設定します。                                                                                                                       |

ライブコンテナビューを有効にするには、DD_PROCESS_AGENT_ENABLED を `true` に設定した上で Process Agent を実行していることをご確認ください。

### DogStatsD (カスタムメトリクス)

カスタムメトリクスを [StatsD プロトコル][9]で送信します。

| 環境変数                     | 説明                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | 他のコンテナからの DogStatsD パケットをリスニングします (カスタムメトリクスの送信に必要)。                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | 計算するヒストグラムのパーセンタイル (スペース区切り)。デフォルトは `0.95` です。                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | 計算するヒストグラムの集計 (スペース区切り)。デフォルトは "max median avg count" です。                                                          |
| `DD_DOGSTATSD_SOCKET`            | リスニングする Unix ソケットのパス。`rw` でマウントされたボリューム内にある必要があります。                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Unix ソケットのメトリクス用にコンテナの検出とタグ付けを有効にします。                                                                                            |
| `DD_DOGSTATSD_TAGS`              | この DogStatsD サーバーが受信するすべてのメトリクス、イベント、サービスのチェックに付加する追加タグ。たとえば `"env:golden group:retrievers"` のように追加します。 |

詳しくは、[Unix ドメインソケット上の DogStatsD][10] を参照してください。

### タグ付け

Datadog は Kubernetes から一般的なタグを自動的に収集します。さらに多くのタグを抽出するには、次のオプションを使用します。

| 環境変数                            | 説明             |
|-----------------------------------------|-------------------------|
| `DD_KUBERNETES_POD_LABELS_AS_TAGS`      | ポッドラベルを抽出します      |
| `DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS` | ポッドアノテーションを抽出します |

詳細については、[Kubernetes タグの抽出][11]ドキュメントを参照してください。

### シークレットファイルの使用

インテグレーションの資格情報を Docker や Kubernetes のシークレットに格納し、オートディスカバリーテンプレートで使用できます。詳細については、[シークレット管理][12]を参照してください。

### コンテナの無視

ログの収集、メトリクスの収集、オートディスカバリーからコンテナを除外します。Datadog はデフォルトで Kubernetes と OpenShift の `pause` コンテナを除外します。これらの許可リストとブロックリストはオートディスカバリーにのみ適用されます。トレースと DogStatsD は影響を受けません。これらの環境変数は、その値において正規表現をサポートしています。

| 環境変数                   | 説明                                                                                                                                                                                                                        |
|--------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_INCLUDE`         | 処理対象に入れるコンテナの許可リスト (スペース区切り)。すべてを対象に入れる場合は、`.*` を使用します。例: `"image:image_name_1 image:image_name_2"`、`image:.*`                                                                              |
| `DD_CONTAINER_EXCLUDE`         | 処理対象から除外するコンテナのブロックリスト (スペース区切り)。すべてを対象から除外する場合は、`.*` を使用します。例: `"image:image_name_3 image:image_name_4"`、`image:.*`                                                                              |
| `DD_CONTAINER_INCLUDE_METRICS` | メトリクスを含めたいコンテナの許可リスト。                                                                                                                                                                         |
| `DD_CONTAINER_EXCLUDE_METRICS` | メトリクスを除外したいコンテナのブロックリスト。                                                                                                                                                                         |
| `DD_CONTAINER_INCLUDE_LOGS`    | ログを含めたいコンテナの許可リスト。                                                                                                                                                                            |
| `DD_CONTAINER_EXCLUDE_LOGS`    | ログを除外したいコンテナのブロックリスト。                                                                                                                                                                            |
| `DD_AC_INCLUDE`                | **非推奨**: 処理対象に入れるコンテナの許可リスト (スペース区切り)。すべてを対象に入れる場合は、`.*` を使用します。例: `"image:image_name_1 image:image_name_2"`、`image:.*`                                                              |
| `DD_AC_EXCLUDE`                | **非推奨**: 処理対象から除外するコンテナのブロックリスト (スペース区切り)。すべてを対象から除外する場合は、`.*` を使用します。例: `"image:image_name_3 image:image_name_4"` (**注**: この変数はオートディスカバリーに対してのみ有効)、`image:.*` |

その他の例は[コンテナのディスカバリー管理][13] ページでご確認いただけます。

**注**: `kubernetes.containers.running`、`kubernetes.pods.running`、`docker.containers.running`、`.stopped`、`.running.total`、`.stopped.total` の各メトリクスは、この設定の影響を受けません。すべてのコンテナを対象とします。

### その他

| 環境変数                        | 説明                                                                                                                                                                                                                                                         |
|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | コンテナソースの自動検出を上書きして、1 つのソースに制限します (`"docker"`、`"ecs_fargate"`、`"kubelet"` など)。Agent v7.35.0 以降、不要になりました。                                                                                                     |
| `DD_HEALTH_PORT`                    | これを `5555` に設定すると、Agent のヘルスチェックをポート `5555` で公開します。                                                                                                                                                                                                 |
| `DD_CLUSTER_NAME`                   | カスタム Kubernetes クラスター識別子を設定して、ホストエイリアスの衝突を回避します。クラスター名は最大 40 文字で、小文字、数字、およびハイフンのみという制限があります。また、文字で始める必要があり、 数字または文字で終わる必要があります。 |

リスナーおよび構成プロバイダーを追加するには、`DD_EXTRA_LISTENERS` と `DD_EXTRA_CONFIG_PROVIDERS` の環境変数を使用します。これらは `datadog.yaml` 構成ファイルの `listeners` セクションと `config_providers` セクションに定義する変数に追加されます。

[1]: /ja/agent/
[2]: /ja/agent/cluster_agent/
[3]: https://app.datadoghq.com/containers
[4]: /ja/infrastructure/livecontainers/?tab=helm#configuration
[5]: /ja/agent/kubernetes/integrations/
[6]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog#all-configuration-options
[7]: /ja/agent/kubernetes/operator_configuration
[8]: /ja/agent/proxy/#agent-v6
[9]: /ja/developers/dogstatsd/
[10]: /ja/developers/dogstatsd/unix_socket/
[11]: /ja/agent/kubernetes/tag/
[12]: /ja/agent/guide/secrets-management/
[13]: /ja/agent/guide/autodiscovery-management/