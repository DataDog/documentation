---
app_id: kubernetes-state-core
app_uuid: 6fbcfd6b-369d-4e69-8974-87b3fb5d4715
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kubernetes_state.container.running
      metadata_path: metadata.csv
      prefix: kubernetes_state.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Kubernetes State Core
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- incident-teams
- オーケストレーション
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kubernetes_state_core/README.md
display_on_public_website: true
draft: false
git_integration_title: kubernetes_state_core
integration_id: kubernetes-state-core
integration_title: Kubernetes State Core
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: kubernetes_state_core
public_title: Kubernetes State Core
short_description: Pod スケジューリング イベントをキャプチャし、Kubelet のステータスなどを追跡します。
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Offering::Integration
  configuration: README.md#Setup
  description: Pod スケジューリング イベントをキャプチャし、Kubelet のステータスなどを追跡します。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/engineering/our-journey-taking-kubernetes-state-metrics-to-the-next-level/
  support: README.md#Support
  title: Kubernetes State Core
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Kubernetes サービスからメトリクスをリアルタイムに取得すると、以下のことが可能になります。

- Kubernetes の状態を視覚化および監視できます。
- Kubernetes のフェイルオーバーとイベントの通知を受けることができます。

Kubernetes State Metrics Core チェックは [kube-state-metrics バージョン 2+][1] を活用し、レガシーの `kubernetes_state` チェックと比較してパフォーマンスとタグ付けが大幅に改善されています。

レガシーチェックとは対照的に、Kubernetes State Metrics Core チェックでは、クラスターに `kube-state-metrics` をデプロイする必要がなくなりました。

Kubernetes State Metrics Core は、より詳細なメトリクスとタグを提供するため、従来の `kubernetes_state` チェックに代わる優れたオプションです。詳しくは [Major Changes](#migration-from-kubernetes_state-to-kubernetes_state_core) および [Data Collected](#data-collected) を参照してください。

## セットアップ

### インストール

Kubernetes State Metrics Core チェックは [Datadog Cluster Agent][2] イメージに含まれているため、Kubernetes サーバーに追加でインストールする必要はありません。

### 要件

- Datadog Cluster Agent v1.12+

### 構成

{{< tabs >}}
{{% tab "Helm" %}}

Helm `values.yaml` で、以下を追加します。

```yaml
datadog:
  # (...)
  kubeStateMetricsCore:
    enabled: true
```

{{% /tab %}}
{{% tab "Operator" %}}

`kubernetes_state_core` のチェックを有効にするには、DatadogAgent リソースの設定 `spec.features.kubeStateMetricsCore.enabled` を `true` に設定する必要があります。

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
  features:
    kubeStateMetricsCore:
      enabled: true
```

**注**: Datadog Operator v0.7.0 以上が必要です。

{{% /tab %}}
{{< /tabs >}}

## kubernetes_state から kubernetes_state_core への移行

### タグの削除

元の `kubernetes_state` のチェックでは、いくつかのタグが非推奨とフラグが立てられ、新しいタグに置き換えられています。移行経路を決定するために、どのタグがメトリクスで送信されるかを確認します。

`kubernetes_state_core` のチェックでは、非推奨のタグのみが提出されます。`kubernetes_state` から `kubernetes_state_core` に移行する前に、モニターやダッシュボードで公式タグのみが使用されているか確認します。

以下は、非推奨タグとそれに代わる公式タグの対応表です。

| 非推奨タグ        | 公式タグ                |
|-----------------------|-----------------------------|
| cluster_name          | kube_cluster_name           |
| コンテナ             | kube_container_name         |
| cronjob               | kube_cronjob                |
| daemonset             | kube_daemon_set             |
| deployment            | kube_deployment             |
| hpa                   | horizontalpodautoscaler     |
| image                 | image_name                  |
| job                   | kube_job                    |
| job_name              | kube_job                    |
| namespace             | kube_namespace              |
| phase                 | pod_phase                   |
| pod                   | pod_name                    |
| replicaset            | kube_replica_set            |
| replicationcontroller | kube_replication_controller |
| statefulset           | kube_stateful_set           |

### 後方の非互換性の変更

Kubernetes State Metrics Core チェックには後方互換性がありません。レガシーの `kubernetes_state` チェックから移行する前に、変更点を注意深くお読みください。

`kubernetes_state.node.by_condition`
: ノード名の粒度を持つ新しいメトリクスです。従来のメトリクス `kubernetes_state.nodes.by_condition` はこのメトリクスに置き換えられ、非推奨となります。**注**: このメトリクスは従来のチェックにもバックポートされており、両方のメトリクス (これと置き換えられる従来のメトリクス) が利用可能です。

`kubernetes_state.persistentvolume.by_phase`
: 永続ボリューム名の粒度を備えた新しいメトリクス。`kubernetes_state.persistentvolumes.by_phase` を置き換えます。

`kubernetes_state.pod.status_phase`
: メトリクスは、`pod_name` のようにポッドレベルのタグでタグ付けされます。

`kubernetes_state.node.count`
: このメトリクスには、もう `host` というタグは付いていません。このメトリクスは、ノード数を `kernel_version` `os_image` `container_runtime_version` `kubelet_version` によって集計します。

`kubernetes_state.container.waiting` と `kubernetes_state.container.status_report.count.waiting`
: 待機中の Pod が存在しない場合、これらのメトリクスは 0 の値を発行しなくなりました。非ゼロの値のみを報告します。

`kube_job`
: `kubernetes_state` では、`Job` が `CronJob` をオーナーとしていた場合は `kube_job` タグの値が `CronJob` 名となり、それ以外の場合は `Job` 名となります。`kubernetes_state_core` では、`kube_job` タグの値は常に `Job` 名となり、新たに `kube_cronjob` タグキーが追加されて `CronJob` 名をタグ値として持つようになります。`kubernetes_state_core` に移行する場合、クエリフィルターには新しいタグか `kube_job:foo*` (`foo` は `CronJob` 名) を使用することが推奨されます。

`kubernetes_state.job.succeeded`
: 従来の `kubernetes_state` では `kuberenetes.job.succeeded` は `count` タイプでしたが、`kubernetes_state_core` では `gauge` タイプです。

### ノードレベルのタグ付け

クラスター中心のメトリクスには、ホストやノードレベルのタグは表示されなくなりました。`kubernetes_state.node.by_condition` や `kubernetes_state.container.restarts` のように実際のクラスター内のノードに関連するメトリクスだけが、それぞれのホストやノード レベルのタグを引き続き継承します。

タグをグローバルに追加するには、`DD_TAGS` 環境変数を使用するか、対応する Helm または Operator の設定を使用してください。インスタンス専用のタグは、カスタムの `kubernetes_state_core.yaml` を Cluster Agent にマウントして指定できます。

{{< tabs >}}
{{% tab "Helm" %}}
```yaml
datadog:
  kubeStateMetricsCore:
    enabled: true
  tags: 
    - "<TAG_KEY>:<TAG_VALUE>"
```
{{% /tab %}}
{{% tab "Operator" %}}
```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
    tags:
      - "<TAG_KEY>:<TAG_VALUE>"
  features:
    kubeStateMetricsCore:
      enabled: true
```
{{% /tab %}}
{{< /tabs >}}

`kubernetes_state.container.memory_limit.total` や `kubernetes_state.node.count` のようなメトリクスは、クラスター内のグループの合計数なので、ホストやノードレベルのタグは付与されません。

### 従来のチェック

{{< tabs >}}
{{% tab "Helm" %}}

Helm の `values.yaml` で `kubeStateMetricsCore` を有効にすると、従来の `kubernetes_state` チェック用の自動設定ファイルを Agent が無視するように構成されます。これは両方のチェックを同時に実行しないようにするためです。

それでも移行フェーズで両方のチェックを同時に有効にする場合は、`values.yaml` の `ignoreLegacyKSMCheck` フィールドを無効にします。

**注**: `ignoreLegacyKSMCheck` を無効にすると、Agent は従来の `kubernetes_state` チェック用の自動設定を無視しなくなります。カスタムの `kubernetes_state` 設定ファイルは手動で削除が必要です。

Kubernetes State Metrics Core チェックでは、クラスターに `kube-state-metrics` をデプロイする必要がなくなりました。Datadog Helm Chart の一部として `kube-state-metrics` のデプロイを無効にできます。これを行うには、Helm の `values.yaml` に以下を追加します。

```yaml
datadog:
  # (...)
  kubeStateMetricsEnabled: false
```

{{% /tab %}}
{{< /tabs >}}

**重要な注意:** Kubernetes State Metrics Core チェックは、レガシーの `kubernetes_state` チェックに代わるものです。Datadog は、一貫したメトリクスを保証するために、両方のチェックを同時に有効にしないことをお勧めします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "kubernetes_state_core" >}}


**注**: Kubernetes オブジェクトに [Datadog Standard labels][3] を設定すると、`env`、`service`、`version` タグを取得できます。

### イベント

Kubernetes State Metrics Core チェックには、イベントは含まれません。

### デフォルトのラベルをタグとして使用

#### デフォルト推奨の Kubernetes および Helm ラベル

|  推奨ラベル        | タグ                |
|-----------------------|-----------------------------|
| `app.kubernetes.io/name`         | `kube_app_name`           |
| `app.kubernetes.io/instance`          | `kube_app_instance`           |
| `app.kubernetes.io/version`          | `kube_app_version`           |
| `app.kubernetes.io/component`          | `kube_app_component`           |
| `app.kubernetes.io/part-of`          | `kube_app_part_of`           |
| `app.kubernetes.io/managed-by`          | `kube_app_managed_by`           |
| `helm.sh/chart`          | `helm_chart`           |

#### デフォルト推奨の Kubernetes ノード ラベル

|  推奨ラベル        | タグ                |
|-----------------------|-----------------------------|
| `topology.kubernetes.io/region`  | `kube_region`     |
| `topology.kubernetes.io/zone`    | `kube_zone`       |
| `failure-domain.beta.kubernetes.io/region`   | `kube_region`   |
| `failure-domain.beta.kubernetes.io/zone`     | `kube_zone`     |

#### Datadog ラベル (統合サービスタグ付け)

|  Datadog ラベル        | タグ                |
|-----------------------|-----------------------------|
| `tags.datadoghq.com/env`          | `env`           |
| `tags.datadoghq.com/service`          | `service`           |
| `tags.datadoghq.com/version`          | `version`           |

### サービスチェック

`kubernetes_state.cronjob.complete`
: cronjob の最後のジョブが失敗したかどうか。タグ:`kube_cronjob` `kube_namespace` (標準ラベルの `env` `service` `version`)。

`kubernetes_state.cronjob.on_schedule_check`
: cronjob の次のスケジュールが過去である場合に警告します。タグ: `kube_cronjob` `kube_namespace` (標準ラベルの `env` `service` `version`)。

`kubernetes_state.job.complete`
: ジョブが失敗したかどうか。タグ: `kube_job` または `kube_cronjob` `kube_namespace` (標準ラベルの `env` `service` `version`)。

`kubernetes_state.node.ready`
: ノードの準備ができているかどうか。タグ: `node` `condition` `status`。

`kubernetes_state.node.out_of_disk`
: ノードの準備ができているかどうか。タグ: `node` `condition` `status`。

`kubernetes_state.node.disk_pressure`
: ノードにディスクプレッシャーがかかっているかどうか。タグ: `node` `condition` `status`。

`kubernetes_state.node.network_unavailable`
: ノードネットワークが利用できないかどうか。タグ: `node` `condition` `status`。

`kubernetes_state.node.memory_pressure`
: ノードネットワークにメモリプレッシャーがかかっているかどうか。タグ: `node` `condition` `status`。

### 検証

[Cluster Agent コンテナ内で `status` サブコマンド][4]を実行し、Checks セクションの下に `kubernetes_state_core` があるか確認してください。

## トラブルシューティング

### タイムアウトエラー

デフォルトでは、Kubernetes State Metrics Core チェックは、Kubernetes API サーバーからの応答を 10 秒間待ちます。大規模なクラスターでは、リクエストがタイムアウトし、メトリクスが欠落する可能性があります。

環境変数 `DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT` をデフォルトの 10 秒よりも大きな値に設定することで、これを避けることができます。

{{< tabs >}}
{{% tab "Operator" %}}
`datadog-agent.yaml` を以下の設定で更新してください。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    clusterAgent:
      env:
        - name: DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT
          value: <value_greater_than_10>
```

次に、新しいコンフィギュレーションを適用します。

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```
{{% /tab %}}
{{% tab "Helm" %}}
以下の構成で `datadog-values.yaml` を更新します。

```yaml
clusterAgent:
  env:
    - name: DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT
      value: <value_greater_than_10>
```

次に、Helm チャートをアップグレードします。

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料
- [次世代の Kubernetes State Metrics への取り組み][6]


[1]: https://kubernetes.io/blog/2021/04/13/kube-state-metrics-v-2-0/
[2]: https://docs.datadoghq.com/ja/agent/cluster_agent/
[3]: https://docs.datadoghq.com/ja/getting_started/tagging/unified_service_tagging/#configuration
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://www.datadoghq.com/blog/engineering/our-journey-taking-kubernetes-state-metrics-to-the-next-level/