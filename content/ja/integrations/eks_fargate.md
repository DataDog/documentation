---
app_id: eks-fargate
app_uuid: f5919a4b-4142-4889-b9c0-6ecdab299ebb
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: eks.fargate.pods.running
      metadata_path: metadata.csv
      prefix: eks.fargate.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: EKS Fargate
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- cloud
- AWS
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/eks_fargate/README.md
display_on_public_website: true
draft: false
git_integration_title: eks_fargate
integration_id: eks-fargate
integration_title: Amazon EKS on AWS Fargate
integration_version: 3.2.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: eks_fargate
oauth: {}
public_title: Amazon EKS on AWS Fargate
short_description: Amazon EKS のメトリクス、トレース、およびログを収集します。
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Cloud
  - Category::AWS
  - Category::Log Collection
  configuration: README.md#Setup
  description: Amazon EKS のメトリクス、トレース、およびログを収集します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon EKS on AWS Fargate
---



## 概要

**注**: このページでは、EKS Fargate インテグレーションについて説明します。ECS Fargate については、Datadog の [ECS Fargate インテグレーション][1]のドキュメントを参照してください。

AWS Fargate 上にデプロイされている Amazon EKS は、マネージド型の Kubernetes サービスで、標準の Kubernetes 環境で展開とメンテナンスの特定の側面を自動化します。Kubernetes ノードは AWS Fargate によって管理され、ユーザーから分離されるように抽象化されています。

## セットアップ

以下の手順では、AWS Fargate 上にデプロイされている Amazon EKS 内にあるコンテナで Datadog Agent v7.17 以上をセットアップする方法を説明します。AWS Fargate を使用していない場合は、[Datadog-Amazon EKS インテグレーションドキュメント][2]を参照してください。

AWS Fargate ポッドは物理的なポッドではありません。つまり、CPU、メモリなどの[ホストベースのシステムチェック][3]を除外します。AWS Fargate ポッドからデータを収集するには、次の機能を有効にするカスタム RBAC を使用して、Agent をアプリケーションポッドのサイドカーとして実行してください。

- アプリケーションコンテナと Agent を実行しているポッドからの Kubernetes メトリクス収集
- [オートディスカバリー][4]
- 同じポッド内のコンテナをターゲットにするようにカスタム Agent チェックを構成
- 同じポッド内のコンテナをターゲットにする APM と DogStatsD

### EC2 ノード

[AWS Fargate プロファイル][5]でポッドを fargate 上で実行するように指定しない場合、ポッドは従来の EC2 マシンを使用できます。その場合は、[Datadog-Amazon EKS インテグレーションセットアップ][6]を参照して、インテグレーションからデータを収集してください。これを機能させるには、Agent を EC2 型のワークロードとして実行します。Agent のセットアップは、[Kubernetes エージェントのセットアップ][7]と同じで、すべてのオプションが利用可能です。EC2 ノード上に Agent をデプロイするには、[Datadog Agent の DaemonSet セットアップ][8]を使用します。

### インストール

AWS EKS Fargate で可観測性が最も高いカバレッジ監視ワークロードを実現するには、次の Datadog インテグレーションをインストールします。

- [Kubernetes][9]
- [AWS][10]
- [EKS][11]
- [EC2][12] (EC2 型のノードを実行している場合)

また、EKS を使用して実行している他の AWS サービス（[ELB][13]など）のインテグレーションをセットアップします。

#### 手動インストール

インストールするには、カスタム Agent イメージ `datadog/agent` (バージョン 7.17 以降) をダウンロードします。

Agent がサイドカーとして実行されている場合、同じポッド上のコンテナとのみ通信できます。監視するすべてのポッドに対して Agent を実行します。

### コンフィギュレーション

Fargate ノード上の AWS EKS Fargate で実行しているアプリケーションからデータを収集するには、次のセットアップ手順に従います。

- [AWS EKS Fargate RBAC ルールをセットアップ](#aws-eks-fargate-rbac)。
- [Agent をサイドカーとしてデプロイ](#running-the-agent-as-a-sidecar)。
- Datadog の[メトリクス](#metrics-collection)、[ログ](#log-collection)、[イベント](#events-collection)、[トレース](#traces-collection) の収集をセットアップします。

Datadog Live Container View に EKS Fargate コンテナを表示するには、ポッド仕様で `shareProcessNamespace` を有効にします。[プロセス収集](#process-collection)を参照してください。

#### AWS EKS Fargate RBAC

AWS EKS Fargate で Agent をサイドカーとしてデプロイする場合は、次の Agent RBACを使用します。

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: datadog-agent
rules:
  - apiGroups:
    - ""
    resources:
    - nodes
    - namespaces
    - endpoints
    verbs:
    - get
    - list
  - apiGroups:
      - ""
    resources:
      - nodes/metrics
      - nodes/spec
      - nodes/stats
      - nodes/proxy
      - nodes/pods
      - nodes/healthz
    verbs:
      - get
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: datadog-agent
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: datadog-agent
subjects:
  - kind: ServiceAccount
    name: datadog-agent
    namespace: default
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: datadog-agent
  namespace: default
```

#### Agent をサイドカーとして実行します

Fargate 型のポッドからデータの収集を開始するには、Datadog Agent v7.17 以上をアプリケーションのサイドカーとしてデプロイします。これは、ポッドで実行されているアプリケーションからマトリクスを収集するために必要な最小コンフィギュレーションです。Datadog Agent のサイドカーをデプロイするため、マニフェストに `DD_EKS_FARGATE=true` が追加されていることに注意してください。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<APPLICATION_NAME>"
 namespace: default
spec:
 selector:
   matchLabels:
     app: "<APPLICATION_NAME>"
 replicas: 1
 template:
   metadata:
     labels:
       app: "<APPLICATION_NAME>"
     name: "<POD_NAME>"
   spec:
     serviceAccountName: datadog-agent
     containers:
     - name: "<APPLICATION_NAME>"
       image: "<APPLICATION_IMAGE>"
     ## Agent をサイドカーとして実行
     - image: datadog/agent
       name: datadog-agent
       env:
       - name: DD_API_KEY
         value: "<YOUR_DATADOG_API_KEY>"
         ## DD_SITE を "datadoghq.eu" に設定して
         ## Agent データを Datadog EU サイトに送信
       - name: DD_SITE
         value: "datadoghq.com"
       - name: DD_EKS_FARGATE
         value: "true"
       - name: DD_CLUSTER_NAME
         value: "<CLUSTER_NAME>"
       - name: DD_KUBERNETES_KUBELET_NODENAME
         valueFrom:
           fieldRef:
             apiVersion: v1
             fieldPath: spec.nodeName
      resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
```

**注**: `<YOUR_DATADOG_API_KEY>` を[組織の Datadog API キー][14]に置き換えることを忘れないでください。

**注**: メトリクスが目的のクラスターでタグ付けされるように、`DD_TAGS` のリストに希望の `kube_cluster_name:<CLUSTER_NAME>` を追加してください。ここで、スペースで区切られた `<KEY>:<VALUE>` タグを追加することができます。Agent が `7.34+` と `6.34+` の場合は、これは必要ありません。代わりに、`DD_CLUSTER_NAME` 環境変数を設定します。

#### Cluster Agent または Cluster Checks Runner の実行

Datadog では、[イベント収集][15]、[Kubernetes リソースビュー][16]、[クラスターチェック][17]などの機能を利用するために、Cluster Agent を実行することを推奨しています。

EKS Fargate を使用する場合、EKS クラスターが混合ワークロード (Fargate/非 Fargate) を実行しているかどうかによって、2 つのシナリオが考えられます。

EKS クラスターが Fargate と非 Fargate のワークロードを実行し、Node Agent DaemonSet を介して非 Fargate ワークロードを監視する場合は、このデプロイに Cluster Agent/Cluster Checks Runner を追加します。詳細については、[Cluster Agent の設定][18]を参照してください。

Cluster Agent トークンは、監視したい Fargate タスクから到達可能でなければなりません。Helm Chart や Datadog Operator を使用している場合、対象のネームスペースにシークレットが作成されるため、デフォルトでは到達不可能です。

これを正しく動作させるためには、2 つの選択肢があります。

* ハードコードされたトークン値 (Helm では `clusterAgent.token`、Datadog Operator では `credentials.token`) を使用する。便利だが、安全性は低い。
* 手動で作成したシークレット (Helm では `clusterAgent.tokenExistingSecret`、Datadog Operator では利用不可) を使用し、Fargate タスクを監視する必要があるすべてのネームスペースに複製する。

EKS クラスターが Fargate ワークロードのみを実行する場合、スタンドアロンの Cluster Agent のデプロイが必要です。そして、上記のように、トークンを到達可能にするための 2 つのオプションのうち 1 つを選択します。

以下の Helm の `values.yaml` を使用します。

```yaml
datadog:
  apiKey: <YOUR_DATADOG_API_KEY>
  clusterName: <CLUSTER_NAME>
agents:
  enabled: false
clusterAgent:
  enabled: true
  replicas: 2
```


どちらの場合も、Cluster Agent との通信を可能にするために、Datadog Agent のサイドカーマニフェストを変更する必要があります。

```yaml
       env:
        - name: DD_CLUSTER_AGENT_ENABLED
          value: "true"
        - name: DD_CLUSTER_AGENT_AUTH_TOKEN
          value: <hardcoded token value> # シークレットを使用する場合は、valueFrom: を使用します
        - name: DD_CLUSTER_AGENT_URL
          value: https://<CLUSTER_AGENT_SERVICE_NAME>.<CLUSTER_AGENT_SERVICE_NAMESPACE>.svc.cluster.local:5005
        - name: DD_ORCHESTRATOR_EXPLORER_ENABLED # Kubernetes リソースビューを取得するために必要です
          value: "true"
        - name: DD_CLUSTER_NAME
          value: <CLUSTER_NAME>
```

## クラスターのパフォーマンス

EKS クラスターのパフォーマンスを把握するには、[Cluster Check Runner][19] を有効にして [`kube-state-metrics`][20] サービスからメトリクスを収集します。

## メトリクスの収集

### インテグレーションのメトリクス

[アプリケーションコンテナでオートディスカバリーラベル][21]を使用して、[サポートされている Agent インテグレーション][22]のメトリクス収集を開始します。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<APPLICATION_NAME>"
 namespace: default
spec:
 replicas: 1
 selector:
   matchLabels:
     app: "<APPLICATION_NAME>"
 template:
   metadata:
     labels:
       app: "<APPLICATION_NAME>"
     name: "<POD_NAME>"
     annotations:
      ad.datadoghq.com/<CONTAINER_NAME>.check_names: '[<CHECK_NAME>]'
      ad.datadoghq.com/<CONTAINER_IDENTIFIER>.init_configs: '[<INIT_CONFIG>]'
      ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances: '[<INSTANCE_CONFIG>]'
   spec:
     serviceAccountName: datadog-agent
     containers:
     - name: "<APPLICATION_NAME>"
       image: "<APPLICATION_IMAGE>"
     ## Agent をサイドカーとして実行
     - image: datadog/agent
       name: datadog-agent
       env:
       - name: DD_API_KEY
         value: "<YOUR_DATADOG_API_KEY>"
         ## DD_SITE を "datadoghq.eu" に設定して
         ## Agent データを Datadog EU サイトに送信
       - name: DD_SITE
         value: "datadoghq.com"
       - name: DD_EKS_FARGATE
         value: "true"
       - name: DD_KUBERNETES_KUBELET_NODENAME
         valueFrom:
           fieldRef:
             apiVersion: v1
             fieldPath: spec.nodeName
      resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
```

**注**:

- `<YOUR_DATADOG_API_KEY>` を[組織の Datadog API キー][14]に置き換えることを忘れないでください。
- ホストからの `cgroups` ボリュームを Agent にマウントできないため、Fargate ではコンテナメトリクスを使用できません。[Live Containers][23] ビューは、CPU およびメモリに 0 を報告します。

### DogStatsD

アプリケーションコンテナから [DogStatsD メトリクス][24]を Datadog に転送するように、Agent コンテナのコンテナポート `8125` を設定します。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<APPLICATION_NAME>"
 namespace: default
spec:
 replicas: 1
 selector:
   matchLabels:
     app: "<APPLICATION_NAME>"
 template:
   metadata:
     labels:
       app: "<APPLICATION_NAME>"
     name: "<POD_NAME>"
   spec:
     serviceAccountName: datadog-agent
     containers:
     - name: "<APPLICATION_NAME>"
       image: "<APPLICATION_IMAGE>"
     ## Agent をサイドカーとして実行
     - image: datadog/agent
       name: datadog-agent
       ## DogStatsD メトリクスの収集にポート 8125 を有効化
       ports:
        - containerPort: 8125
          name: dogstatsdport
          protocol: UDP
       env:
       - name: DD_API_KEY
         value: "<YOUR_DATADOG_API_KEY>"
         ## DD_SITE を "datadoghq.eu" に設定して
         ## Agent データを Datadog EU サイトに送信
       - name: DD_SITE
         value: "datadoghq.com"
       - name: DD_EKS_FARGATE
         value: "true"
       - name: DD_KUBERNETES_KUBELET_NODENAME
         valueFrom:
           fieldRef:
             apiVersion: v1
             fieldPath: spec.nodeName
      resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
```

**注**: `<YOUR_DATADOG_API_KEY>` を[組織の Datadog API キー][14]に置き換えることを忘れないでください。

### ライブコンテナ

Datadog Agent v6.19+ は、EKS Fargate インテグレーションのライブコンテナをサポートします。ライブコンテナは、[Containers][23] ページに表示されます。

### ライブプロセス

Datadog Agent v6.19+ は、EKS Fargate インテグレーションのライブプロセスをサポートします。ライブプロセスは、[Processes][25] ページに表示されます。ライブプロセスを有効にするには、[ポッドの仕様で shareProcessNamespace を有効にします][26]。

### Kubernetes リソースビュー

Kubernetes のリソースビューを収集するには、[Cluster Agent の設定](#running-the-cluster-agent-or-the-cluster-checks-runner)が必要です。

## ログの収集

### Fluent Bit で EKS on Fargate からログを収集。

EKS のログを CloudWatch Logs にルーティングする [Fluent Bit][27] と Datadog にログをルーティングする [Datadog Forwarder][28] で EKS Fargate ログを監視することができます。

1. CloudWatch へログを送信するよう Fluent Bit を構成するには、 CloudWatch Logs を出力先として指定する Kubernetes ConfigMap を作成します。ConfigMap は、ロググループ、リージョン、プレフィックス、文字列、そしてロググループの自動作成の有無を指定します。

   ```yaml
    kind: ConfigMap
    apiVersion: v1
    metadata:
      name: aws-logging
      namespace: aws-observability
    data:
      output.conf: |
        [OUTPUT]
            Name cloudwatch_logs
            Match   *
            region us-east-1
            log_group_name awslogs-https
            log_stream_prefix awslogs-firelens-example
            auto_create_group true
   ```
2. [Datadog Forwarder][28] を使用して、Cloudwatch からログを収集し、Datadog に送信します。

## トレースの収集

Agent コンテナにコンテナポート `8126` をセットアップして、アプリケーションコンテナからトレースを収集します。[トレーシングのセットアップ方法について、ご確認ください][29]。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<APPLICATION_NAME>"
 namespace: default
spec:
 replicas: 1
 selector:
   matchLabels:
     app: "<APPLICATION_NAME>"
 template:
   metadata:
     labels:
       app: "<APPLICATION_NAME>"
     name: "<POD_NAME>"
   spec:
     serviceAccountName: datadog-agent
     ## cgroup v2 による発信点検出のため、Agent をアプリケーションと同じネームスペースに配置する
     shareProcessNamespace: true
     containers:
     - name: "<APPLICATION_NAME>"
       image: "<APPLICATION_IMAGE>"
     ## Agent をサイドカーとして実行
     - image: datadog/agent
       name: datadog-agent
       ## トレースの収集にポート 8126 を有効化
       ports:
        - containerPort: 8126
          name: traceport
          protocol: TCP
       env:
       - name: DD_API_KEY
         value: "<YOUR_DATADOG_API_KEY>"
         ## DD_SITE を "datadoghq.eu" に設定して
         ## Agent データを Datadog EU サイトに送信
       - name: DD_SITE
         value: "datadoghq.com"
       - name: DD_EKS_FARGATE
         value: "true"
       - name: DD_APM_ENABLED
         value: "true"
       - name: DD_KUBERNETES_KUBELET_NODENAME
         valueFrom:
           fieldRef:
             apiVersion: v1
             fieldPath: spec.nodeName
      resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
```

**注**: `<YOUR_DATADOG_API_KEY>` を[組織の Datadog API キー][14]に置き換えることを忘れないでください。

## イベント収集

AWS EKS Fargate API サーバーからイベントを収集するには、[EKS クラスター内の Datadog Cluster Agent](#running-the-cluster-agent-or-the-cluster-checks-runner) を実行し、[Cluster Agent のイベント収集を有効にします][23]。

または、Datadog Cluster Agent をセットアップしてクラスターチェックを有効にするだけでなく、クラスターチェックランナーをデプロイすることもできます。

**注**: Fargate のポッドで Datadog Cluster Agent を実行する場合も、イベントを収集することができます。

## プロセスの収集

Agent 6.19+/7.19+ の場合、[プロセス収集][30]を使用できます。ポッド仕様で `shareProcessNamespace` を有効にして、Fargate ポッドで実行されているすべてのプロセスを収集します。例:

```
apiVersion: v1
kind: Pod
metadata:
  name: <名前>
spec:
  shareProcessNamespace: true
...
```

**注**: CPU とメモリのメトリクスは使用できません。

## 収集データ

### メトリクス

eks_fargate チェックは、`pod_name` と `virtual_node` でタグ付けされたハートビートメトリクス `eks.fargate.pods.running` を提出するために、ユーザーは実行中のポッドの数を追跡できます。

### サービスのチェック

eks_fargate にはサービスチェックが含まれていません。

### イベント

eks_fargate にはイベントが含まれていません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][25]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [AWS Fargate 監視のための主要メトリクス][31]
- [AWS Fargate ワークロードからのメトリクスおよびログの収集方法][32]
- [Datadog を使用した AWS Fargate モニタリング][33]

[1]: http://docs.datadoghq.com/integrations/ecs_fargate/
[2]: http://docs.datadoghq.com/integrations/amazon_eks/
[3]: http://docs.datadoghq.com/integrations/system
[4]: https://docs.datadoghq.com/ja/getting_started/agent/autodiscovery/
[5]: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html
[6]: http://docs.datadoghq.com/integrations/amazon_eks/#setup
[7]: http://docs.datadoghq.com/agent/kubernetes
[8]: http://docs.datadoghq.com/agent/kubernetes/daemonset_setup
[9]: https://app.datadoghq.com/account/settings#integrations/kubernetes
[10]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[11]: https://app.datadoghq.com/account/settings#integrations/amazon-eks
[12]: https://app.datadoghq.com/account/settings#integrations/amazon-ec2
[13]: http://docs.datadoghq.com/integrations/kubernetes
[14]: https://app.datadoghq.com/organization-settings/api-keys
[15]: https://docs.datadoghq.com/ja/agent/kubernetes/?tab=helm#event-collection
[16]: https://docs.datadoghq.com/ja/infrastructure/livecontainers/#kubernetes-resources-view
[17]: https://docs.datadoghq.com/ja/agent/cluster_agent/clusterchecks/#overview
[18]: http://docs.datadoghq.com/agent/cluster_agent/setup/
[19]: https://docs.datadoghq.com/ja/containers/guide/clustercheckrunners
[20]: https://github.com/kubernetes/kube-state-metrics
[21]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[22]: https://docs.datadoghq.com/ja/integrations/#cat-autodiscovery
[23]: https://app.datadoghq.com/containers
[24]: http://docs.datadoghq.com/tracing/setup
[25]: https://app.datadoghq.com/process
[26]: https://kubernetes.io/docs/tasks/configure-pod-container/share-process-namespace/
[27]: https://aws.amazon.com/blogs/containers/fluent-bit-for-amazon-eks-on-aws-fargate-is-here/
[28]: https://docs.datadoghq.com/ja/serverless/libraries_integrations/forwarder/
[29]: http://docs.datadoghq.com/tracing/#send-traces-to-datadog
[30]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/?tab=k8sfile#process-collection
[31]: https://www.datadoghq.com/blog/aws-fargate-metrics/
[32]: https://www.datadoghq.com/blog/tools-for-collecting-aws-fargate-metrics/
[33]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/