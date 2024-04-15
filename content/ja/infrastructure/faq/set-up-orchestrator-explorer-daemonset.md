---
further_reading:
- link: /infrastructure/containers
  tag: Documentation
  text: コンテナビュー

title: DaemonSet で Orchestrator Explorer を設定する
---

DaemonSet を使用した Orchestrator Explorer のセットアップ方法を説明します。

[Cluster Agent][1] バージョン >= 1.11.0 は、DaemonSet を構成する前に必要となります。Cluster Agent が実行中で Agent と通信できることを確認してください。コンフィギュレーションの詳細は、[Cluster Agent のセットアップ][2]を参照してください。

1. 以下の環境変数を使用して、Cluster Agent コンテナを設定します。

    ```yaml
      - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
        value: "true"
    ```

2. 以下の RBAC アクセス許可を使用して、Cluster Agent ClusterRole を設定します。

   特に `apps` および `batch` apiGroups の場合は、ライブコンテナに　
   一般的な Kubernetes リソース (``pods`、`services`、
   `nodes` など) を収集する権限が必要です。これは、[Cluster
   Agent のセットアップ][2]に従っていれば、すでに RBAC にあります。ない場合は、
   追加されていることを確認してください (`deployments`、`replicasets` の後):

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
        - "batch"
        resources:
        - cronjobs
        - jobs
        verbs:
        - list
        - get
        - watch
      - apiGroups:
        - ""
        resources:
        - serviceaccounts
        verbs:
        - list
        - get
        - watch
      - apiGroups:
        - rbac.authorization.k8s.io
        resources:
        - roles
        - rolebindings
        - clusterroles
        - clusterrolebindings
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
      ...
    ```

    これらのアクセス許可は、Agent DaemonSet や Cluster Agent Deployment と同じネームスペースに `datadog-cluster-id` ConfigMap を作成したり、サポート対象の Kubernetes リソースを収集するために必要です。

   Cluster Agent により `cluster-id` ConfigMap が作成されない場合、Agent ポッドはリソースを収集することができません。この場合は Cluster Agent のアクセス許可を更新し、ポッドを再起動して ConfigMap を作成した後、Agent ポッドを再起動します。

3. Agent DaemonSet で実行される Process Agent は、有効かつ実行中（プロセス収集を実行する必要はありません）であり、かつ以下のオプションで構成されている必要があります。

    ```yaml
    - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
      value: "true"
    ```

4. (オプション) 収集されるリソースを指定するには、インスタンスセクションでコレクターを設定します。ConfigMap 内に `orchestrator.yaml` を作成します。構成例:

     ```yaml
      apiVersion: v1
      kind: ConfigMap
      metadata:
        name: orchestrator-config
      data:
        orchestrator.yaml: |-
          ad_identifiers:
            - _kube_orchestrator
          init_config:
          instances:
            - collectors:
              - batch/v1/cronjobs
     ```

     `collectors` で使用可能な値は `<collector_name>` (例: "cronjobs") または `<apigroup_and_version>/<collector_name>` (例: "batch/v1/cronjobs") です。CRD の場合は、`<apigroup_and_version>/<collector_name>` のみ使用できます。

   Cluster Agent のコンテナにマウントします。

     ```yaml
     containers:
       - name: cluster-agent
         ...
         volumeMounts:
           - name: orchestrator-config
             mountPath: /conf.d
             readOnly: true
     ...
     volumes:
       - name: orchestrator-config
         configMap:
           name: orchestrator-config
           items:
           - key: orchestrator.yaml
             path: orchestrator.yaml
     ```

一部のセットアップでは、Process Agent と Cluster Agent で Kubernetes クラスター名が自動検出されません。この場合、機能は起動せず、Cluster Agent ログで以下のような警告が表示されます。`Orchestrator explorer enabled but no cluster name set: disabling`。この場合、Cluster Agent と Process Agent の両方の `env` セクションに以下のオプションを追加します。

  ```yaml
  - name: DD_CLUSTER_NAME
    value: "<YOUR_CLUSTER_NAME>"
  ```

  [1]: /containers/cluster_agent/
  [2]: /containers/cluster_agent/setup/?tab=daemonset
