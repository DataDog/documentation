---
aliases:
  - /ja/integrations/amazon_eks_fargate/
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - クラウド
  - AWS
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/eks_fargate/README.md'
description: Amazon EKS のメトリクス、トレース、およびログを収集します。
display_name: EKS Fargate
git_integration_title: eks_fargate
guid: e9e58fb9-696b-4e3c-9058-c144a1d9a737
integration_id: eks-fargate
integration_title: EKS fargate
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: eks.fargate.
metric_to_check: eks.fargate.pods.running
name: eks_fargate
public_title: Datadog-EKS fargate インテグレーション
short_description: Amazon EKS のメトリクス、トレース、およびログを収集します。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

AWS Fargate 上にデプロイされている Amazon EKS は、マネージド型の Kubernetes サービスで、標準の Kubernetes 環境で展開とメンテナンスの特定の側面を自動化します。Kubernetes ノードは AWS Fargate によって管理され、ユーザーから分離されるように抽象化されています。

## セットアップ

以下の手順では、AWS Fargate 上にデプロイされている Amazon EKS 内にあるコンテナで Datadog Agent v7.17 以上をセットアップする方法を説明します。AWS Fargate を使用していない場合は、[Datadog-Amazon EKS インテグレーションドキュメント][1]を参照してください。

AWS Fargate ポッドは物理的なポッドではありません。つまり、CPU、メモリなどの[ホストベースのシステムチェック][2]を除外します。AWS Fargate ポッドからデータを収集するには、次の機能を有効にするカスタム RBAC を使用して、Agent をアプリケーションポッドのサイドカーとして実行してください。

- アプリケーションコンテナと Agent を実行しているポッドからの Kubernetes メトリクス収集
- [オートディスカバリー][3]
- 同じポッド内のコンテナをターゲットにするようにカスタム Agent チェックを構成
- 同じポッド内のコンテナをターゲットにする APM と DogStatsD

### EC2 ノード

[AWS Fargate プロファイル][4]でポッドを fargate 上で実行するように指定しない場合、ポッドは従来の EC2 マシンを使用できます。その場合は、[Datadog-Amazon EKS インテグレーションセットアップ][5]を参照して、インテグレーションからデータを収集してください。これを機能させるには、Agent を EC2 型のワークロードとして実行します。Agent のセットアップは、[Kuberenetes エージェントのセットアップ][6]と同じで、すべてのオプションが利用可能です。EC2 ノード上に Agent をデプロイするには、[Datadog Agent の DaemonSet セットアップ][7]を使用します。

### インストール

AWS EKS Fargate で可観測性が最も高いカバレッジ監視ワークロードを実現するには、次の Datadog インテグレーションをインストールします。

- [Kubernetes][8]
- [AWS][9]
- [EKS][10]
- [EC2][11] (EC2 型のノードを実行している場合)

また、EKS を使用して実行している他の AWS サービス（[ELB][12]など）のインテグレーションをセットアップします。

#### 手動インストール

インストールするには、カスタム Agent イメージ `datadog/agent` (バージョン 7.17 以降) をダウンロードします。

Agent がサイドカーとして実行されている場合、同じポッド上のコンテナとのみ通信できます。監視するすべてのポッドに対して Agent を実行します。

### コンフィギュレーション

Fargate ノード上の AWS EKS Fargate で実行しているアプリケーションからデータを収集するには、次のセットアップ手順に従います。

- [AWS EKS Fargate RBAC ルールをセットアップ](#aws-eks-fargate-rbac)。
- [Agent をサイドカーとしてデプロイ](#Agent をサイドカーとして実行)。
- Datadog の[メトリクス](#メトリクスの収集)、[イベント](#イベントの収集)、[トレース](#トレースの収集) の収集をセットアップします。

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

**注**: `<DATADOG_API_キー>`を[組織の Datadog API キー][13]に置き換えることを忘れないでください。

## メトリクスの収集

### インテグレーションのメトリクス

[アプリケーションコンテナでオートディスカバリーラベル][14]を使用して、[サポートされている Agent インテグレーション][15]のメトリクス収集を開始します。

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

**注**: `<DATADOG_API_キー>`を[組織の Datadog API キー][13]に置き換えることを忘れないでください。

### DogStatsD

アプリケーションコンテナから [DogStatsD メトリクス][16]を Datadog に転送するように、Agent コンテナのコンテナポート `8125` を設定します。

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

**注**: `<DATADOG_API_キー>`を[組織の Datadog API キー][13]に置き換えることを忘れないでください。

## トレース収集

アプリケーションコンテナからトレースを収集するように、Agent コンテナのコンテナポート `8126` を設定します。[詳細はトレースの設定方法を参照][17]。

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

**注**: `<DATADOG_API_キー>`を[組織の Datadog API キー][13]に置き換えることを忘れないでください。

## イベント収集

AWS EKS Fargate API サーバーからイベントを収集するには、Kubernetes クラスター内の AWS EKS EC2 ポッド上で Datadog Cluster Agent を実行します。

1. [Datadog Cluster Agent をセットアップ][18]。
2. [Cluster Agent のイベント収集を有効にする][19]。

または、Datadog Cluster Agent をセットアップしてクラスターチェックを有効にするだけでなく、クラスターチェックランナーをデプロイすることもできます。

**注**: Fargate のポッドで Datadog Cluster Agent を実行する場合も、イベントを収集することができます。

## 収集データ

### メトリクス

eks_fargate チェックは、`pod_name` と `virtual_node` でタグ付けされたハートビートメトリクス `eks.fargate.pods.running` を提出するために、ユーザーは実行中のポッドの数を追跡できます。

### サービスのチェック

eks_fargate にはサービスチェックが含まれていません。

### イベント

eks_fargate にはイベントが含まれていません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][20]までお問合せください。

[1]: http://docs.datadoghq.com//integrations/amazon_eks/
[2]: http://docs.datadoghq.com//integrations/system
[3]: http://docs.datadoghq.com//agent/autodiscovery
[4]: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html
[5]: http://docs.datadoghq.com/integrations/amazon_eks/#setup
[6]: http://docs.datadoghq.com/agent/kubernetes
[7]: http://docs.datadoghq.com/agent/kubernetes/daemonset_setup
[8]: https://app.datadoghq.com/account/settings#integrations/kubernetes
[9]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[10]: https://app.datadoghq.com/account/settings#integrations/amazon-eks
[11]: https://app.datadoghq.com/account/settings#integrations/amazon-ec2
[12]: http://docs.datadoghq.com/integrations/kubernetes
[13]: https://app.datadoghq.com/account/settings#api
[14]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[15]: https://docs.datadoghq.com/ja/integrations/#cat-autodiscovery
[16]: https://docs.datadoghq.com/ja/developers/dogstatsd
[17]: http://docs.datadoghq.com/tracing/setup
[18]: http://docs.datadoghq.com/agent/cluster_agent/setup
[19]: http://docs.datadoghq.com/agent/cluster_agent/event_collection
[20]: https://docs.datadoghq.com/ja/help