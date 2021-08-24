---
aliases:
  - /ja/integrations/amazon_eks_fargate/
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - cloud
  - AWS
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/eks_fargate/README.md'
description: Amazon EKS のメトリクス、トレース、およびログを収集します。
display_name: EKS Fargate
draft: false
git_integration_title: eks_fargate
guid: e9e58fb9-696b-4e3c-9058-c144a1d9a737
integration_id: eks-fargate
integration_title: Amazon EKS on AWS Fargate
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: eks.fargate.
metric_to_check: eks.fargate.pods.running
name: eks_fargate
public_title: '"Datadog-Amazon EKS on AWS Fargate インテグレーション"'
short_description: Amazon EKS のメトリクス、トレース、およびログを収集します。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
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

[AWS Fargate プロファイル][5]でポッドを fargate 上で実行するように指定しない場合、ポッドは従来の EC2 マシンを使用できます。その場合は、[Datadog-Amazon EKS インテグレーションセットアップ][6]を参照して、インテグレーションからデータを収集してください。これを機能させるには、Agent を EC2 型のワークロードとして実行します。Agent のセットアップは、[Kuberenetes エージェントのセットアップ][7]と同じで、すべてのオプションが利用可能です。EC2 ノード上に Agent をデプロイするには、[Datadog Agent の DaemonSet セットアップ][8]を使用します。

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
- [Agent をサイドカーとしてデプロイ](#Agent をサイドカーとして実行)。
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
 name: "<アプリケーション名>"
 namespace: default
spec:
 replicas: 1
 template:
   metadata:
     labels:
       app: "<アプリケーション名>"
     name: "<ポッド名>"
   spec:
     serviceAccountName: datadog-agent
     containers:
     - name: "<アプリケーション名>"
       image: "<アプリケーションイメージ>"
     ## Agent をサイドカーとして実行
     - image: datadog/agent
       name: datadog-agent
       env:
       - name: DD_API_KEY
         value: "<DATADOG_API_キー>"
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

## メトリクスの収集

### インテグレーションのメトリクス

[アプリケーションコンテナでオートディスカバリーラベル][15]を使用して、[サポートされている Agent インテグレーション][16]のメトリクス収集を開始します。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<アプリケーション名>"
 namespace: default
spec:
 replicas: 1
 template:
   metadata:
     labels:
       app: "<アプリケーション名>"
     name: "<ポッド名>"
     annotations:
      ad.datadoghq.com/<CONTAINER_NAME>.check_names: '[<チェック名>]'
      ad.datadoghq.com/<CONTAINER_IDENTIFIER>.init_configs: '[<INIT_コンフィグ>]'
      ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances: '[<インスタンス_コンフィグ>]'
   spec:
     serviceAccountName: datadog-agent
     containers:
     - name: "<アプリケーション名>"
       image: "<アプリケーションイメージ>"
     ## Agent をサイドカーとして実行
     - image: datadog/agent
       name: datadog-agent
       env:
       - name: DD_API_KEY
         value: "<DATADOG_API_キー>"
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
- ホストからの `cgroups` ボリュームを Agent にマウントできないため、Fargate ではコンテナメトリクスを使用できません。[Live Containers][17] ビューは、CPU およびメモリに 0 を報告します。

### DogStatsD

アプリケーションコンテナから [DogStatsD メトリクス][18]を Datadog に転送するように、Agent コンテナのコンテナポート `8125` を設定します。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<アプリケーション名>"
 namespace: default
spec:
 replicas: 1
 template:
   metadata:
     labels:
       app: "<アプリケーション名>"
     name: "<ポッド名>"
   spec:
     serviceAccountName: datadog-agent
     containers:
     - name: "<アプリケーション名>"
       image: "<アプリケーションイメージ>"
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
         value: "<DATADOG_API_キー>"
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

Datadog Agent v6.19+ は、EKS Fargate インテグレーションのライブコンテナをサポートします。ライブコンテナは、[Containers][19] ページに表示されます。

### ライブプロセス

Datadog Agent v6.19+ は、EKS Fargate インテグレーションのライブプロセスをサポートします。ライブプロセスは、[Processes][1] ページに表示されます。ライブプロセスを有効にするには、[ポッドの仕様で shareProcessNamespace を有効にします][20]。

## ログの収集

### Fluent Bit で EKS on Fargate からログを収集。

[Fluent Bit][21] を使用して、EKS ログを CloudWatch Logs へ転送できます。

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
            auto_create_group On
   ```

## トレースの収集

Agent コンテナにコンテナポート `8126` をセットアップして、アプリケーションコンテナからトレースを収集します。[トレーシングのセットアップ方法について、ご確認ください][22]。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<アプリケーション名>"
 namespace: default
spec:
 replicas: 1
 template:
   metadata:
     labels:
       app: "<アプリケーション名>"
     name: "<ポッド名>"
   spec:
     serviceAccountName: datadog-agent
     containers:
     - name: "<アプリケーション名>"
       image: "<アプリケーションイメージ>"
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
         value: "<DATADOG_API_キー>"
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

AWS EKS Fargate API サーバーからイベントを収集するには、Kubernetes クラスター内の AWS EKS EC2 ポッド上で Datadog Cluster Agent を実行します。

1. [Datadog Cluster Agent をセットアップ][23]。
2. [Cluster Agent のイベント収集を有効にする][19]。

または、Datadog Cluster Agent をセットアップしてクラスターチェックを有効にするだけでなく、クラスターチェックランナーをデプロイすることもできます。

**注**: Fargate のポッドで Datadog Cluster Agent を実行する場合も、イベントを収集することができます。

## プロセスの収集

Agent 6.19+/7.19+ の場合、[プロセス収集][24]を使用できます。ポッド仕様で `shareProcessNamespace` を有効にして、Fargate ポッドで実行されているすべてのプロセスを収集します。例:

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

ご不明な点は、[Datadog のサポートチーム][1]までお問合せください。

## その他の参考資料

- ブログ記事: [AWS Fargate 監視のための主要メトリクス][24]
- ブログ記事: [AWS Fargate ワークロードからのメトリクスおよびログの収集方法][25]
- ブログ記事: [Datadog を使用した AWS Fargate モニタリング][26]


[1]: https://app.datadoghq.com/process
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
[14]: https://app.datadoghq.com/account/settings#api
[15]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[16]: https://docs.datadoghq.com/ja/integrations/#cat-autodiscovery
[17]: https://docs.datadoghq.com/ja/developers/dogstatsd/
[18]: http://docs.datadoghq.com/tracing/setup
[19]: https://app.datadoghq.com/containers
[20]: https://kubernetes.io/docs/tasks/configure-pod-container/share-process-namespace/
[21]: https://aws.amazon.com/blogs/containers/fluent-bit-for-amazon-eks-on-aws-fargate-is-here/
[22]: http://docs.datadoghq.com/agent/cluster_agent/event_collection
[23]: /ja/agent/cluster_agent/setup/
[24]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/?tab=k8sfile#process-collection
[25]: https://www.datadoghq.com/blog/tools-for-collecting-aws-fargate-metrics/
[26]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/