---
aliases:
- /ja/infrastructure/livecontainers/legacy
further_reading:
- link: /infrastructure/containers
  tag: Documentation
  text: コンテナビュー
kind: faq
title: ライブコンテナのレガシー構成
---

## 概要

このページでは、古い Agent バージョンのライブコンテナをセットアップするための手順を説明します。これらの手順は、Datadog Agent バージョン 7.21.1 から 7.27.0 および Cluster Agent 1.9.0 から 1.11.0 に適用されます。

{{< tabs >}}
{{% tab "Helm" %}}

公式の [Datadog Helm チャート][1]を使用している場合、

- チャートのバージョンは 2.4.5 以上、2.10.0 以前を使用してください。チャートバージョン 2.10.0 以降をお使いの場合は、[最新のコンフィギュレーション手順][2]を参照してください。
  **注**: Agent および Cluster Agent のバージョンが、Helm チャート [values.yaml][3] ファイルで必要最低限以上のバージョンでハードコードされるようにしてください。
- [values.yaml][3] で `datadog.orchestratorExplorer.enabled` を `true` に設定します。
- 新しいリリースをデプロイします。

一部のセットアップでは、Process Agent と Cluster Agent で Kubernetes クラスター名が自動検出されません。この場合、機能は起動せず、Cluster Agent ログで以下のような警告が表示されます。`Orchestrator explorer enabled but no cluster name set: disabling`。この場合、`datadog.clusterName` を [values.yaml][3] でクラスター名に設定します。

[1]: https://github.com/DataDog/helm-charts
[2]: /ja/infrastructure/livecontainers/#configuration
[3]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "DaemonSet" %}}

Cluster Agent が動作していて、Agent が通信可能である必要があります。コンフィギュレーションについては、[Cluster Agent のセットアップ][1]を参照してください。

1. 以下の環境変数を使用して、Cluster Agent コンテナを設定します。

    ```yaml
      - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
        value: "true"
    ```

2. 以下の RBAC アクセス許可を使用して、Cluster Agent ClusterRole を設定します。

    **注**:  `apps` apiGroups の場合は、ライブコンテナに
    一般的な Kubernetes リソース (`pods`、`services`、`nodes` など) を収集する権限が必要です。
   これは、[Cluster Agent のセットアップ][1]に従っていれば、すでに RBAC にあります。ない場合は、追加されていることを確認してください (`deployments`、`replicasets` の後):

    ```yaml
      ClusterRole:
      - apiGroups:  # To create the datadog-cluster-id ConfigMap
        - ""
        resources:
        - configmaps
        verbs:
        - create
        - get
        - update
      ...
      - apiGroups:  # Required to get the kube-system namespace UID and generate a cluster ID
        - ""
        resources:
        - namespaces
        verbs:
        - get
      ...
      - apiGroups:  # To collect new resource types
        - "apps"
        resources:
        - deployments
        - replicasets
        - daemonsets
        - statefulsets
        verbs:
        - list
        - get
        - watch
     - apiGroups:
       - networking.k8s.io
       resources:
       - ingresses
       verbs:
       - list
       - watch
    ```

    これらのアクセス許可は、Agent DaemonSet や Cluster Agent Deployment と同じネームスペースに `datadog-cluster-id` ConfigMap を作成したり、デプロイや ReplicaSets を収集するために必要です。

    Cluster Agent により `cluster-id` ConfigMap が作成されない場合、Agent ポッドは起動せず、`CreateContainerConfigError` ステータスに陥ります。この ConfigMap が存在しないために Agent ポッドが動かない場合は、Cluster Agent アクセス許可を更新しポッドを再起動して ConfigMap を作成すると、Agent ポッドは自動的に回復します。

3. Agent DaemonSet で実行される Process Agent は、有効かつ実行中（プロセス収集を実行する必要はありません）であり、かつ以下のオプションで構成されている必要があります。

    ```yaml
    - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
      value: "true"
    - name: DD_ORCHESTRATOR_CLUSTER_ID
      valueFrom:
        configMapKeyRef:
          name: datadog-cluster-id
          key: id
    ```

一部のセットアップでは、Process Agent と Cluster Agent で Kubernetes クラスター名が自動検出されません。この場合、機能は起動せず、Cluster Agent ログで以下のような警告が表示されます。`Orchestrator explorer enabled but no cluster name set: disabling`。この場合、Cluster Agent と Process Agent の両方の `env` セクションに以下のオプションを追加する必要があります。

  ```yaml
  - name: DD_CLUSTER_NAME
    value: "<YOUR_CLUSTER_NAME>"
  ```

[1]: /ja/agent/cluster_agent/setup/
{{% /tab %}}
{{< /tabs >}}