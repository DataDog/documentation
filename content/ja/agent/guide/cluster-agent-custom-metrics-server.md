---
title: Cluster Agent のカスタムメトリクスサーバー
kind: ガイド
further_reading:
  - link: agent/kubernetes/host_setup
    tag: ビデオ
    text: Datadog Cluster Agent
---
## はじめに

Kubernetes v1.2 では、[Horizontal Pod Autoscaling][1] が導入されました。Kubernetes v1.6 では、ユーザー定義でありクラスター内から収集されたカスタムメトリクスの自動スケーリングが導入されました。Kubernetes v1.10 では、外部メトリクスのサポートが導入されたため、ユーザーは、Datadog によって収集されたクラスターの外部からメトリクスを自動スケーリングできます。カスタムおよび外部メトリクスプロバイダーは、メトリクスサーバーとは対照的に、ユーザーが実装および登録する必要があるリソースです。v1.0.0 の時点で、[Datadog Cluster Agent][2] のカスタムメトリクスサーバーは、外部メトリクス用の External Metrics Provider インターフェイスを実装しています。

このガイドでは、Datadog メトリクスに基づいて Kubernetes ワークロードを設定および自動スケーリングする方法について説明します。

## 要件

1. Kubernetes >v1.10 を実行して、API サーバーに対して External Metrics Provider リソースを登録できるようにします。
2. 集計レイヤーを有効にします。有効にする方法については、[Kubernetes 集計レイヤーの構成ドキュメント][3]を参照してください。

## チュートリアル

### 予備免責事項

外部メトリクスを介した自動スケーリングでは、Node Agent を実行する必要はありません。Datadog アカウントでメトリクスを使用可能にするだけで済みます。それでも、このガイドでは、Node Agent によって収集された NGINX メトリクスに基づいた NGINX デプロイの自動スケーリングについて説明します。

以下を前提とします。

1. [オートディスカバリー][4]プロセスが有効で機能する状態で、Node Agent を（理想的には DaemonSet から）実行しています。
2. [オプション] Datadog Cluster Agent と安全に通信するように Agent を構成し、Node Agent によって収集されたメタデータの強化を有効にします。詳細については、[セキュリティの前提セクション][5]を参照してください。

### Datadog Cluster Agent のスピンアップ

[Datadog Cluster Agent][6] をスピンアップするには、次の手順を実行します。

1. 適切な RBAC ルールを作成します。Datadog Cluster Agent は、API サーバーと Node Agent の間のプロキシとして機能し、一部のクラスターレベルのリソースにアクセスする必要があります。

    `kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/agent-rbac.yaml"`

   次の出力が生成されます。

    ```
    clusterrole.rbac.authorization.k8s.io "datadog-cluster-agent" created
    clusterrolebinding.rbac.authorization.k8s.io "datadog-cluster-agent" created
    serviceaccount "datadog-cluster-agent" created
    ```

2. Datadog Cluster Agent とそのサービスを作成します。Datadog Cluster Agent のデプロイマニフェストに `<API_キー>` と `<アプリキー>` を追加します。

3. `DD_EXTERNAL_METRICS_PROVIDER_ENABLED` 変数を `true` に設定して HPA 処理を有効にします。

4. リソースをスピンアップします。
  * `kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/agent-services.yaml"`
  * `kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/hpa-example/cluster-agent-hpa-svc.yaml"`
  * `kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-deployment.yaml"`

**注**: 最初のサービスは Node Agent と Datadog Cluster Agent 間の通信に使用されますが、2 番目のサービスは External Metrics Provider を登録するために Kubernetes によって使用されます。

この時点で、次のような状態になっているはずです。

```text
PODS:

NAMESPACE     NAME                                     READY     STATUS    RESTARTS   AGE
default       datadog-cluster-agent-7b7f6d5547-cmdtc   1/1       Running   0          28m

SVCS:

NAMESPACE     NAME                            TYPE        CLUSTER-IP        EXTERNAL-IP   PORT(S)         AGE
default       datadog-custom-metrics-server   ClusterIP   192.168.254.87    <none>        443/TCP         28m
default       datadog-cluster-agent           ClusterIP   192.168.254.197   <none>        5005/TCP        28m

```

### 外部メトリクスプロバイダー

Datadog Cluster Agent が起動して実行されたら、これをサービスに External Metrics Provider として登録し、ポート `443` を公開します。そのためには、次の RBAC ルールを適用します。

`kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/hpa-example/rbac-hpa.yaml"`

次の結果が生成されます。

```text
clusterrolebinding.rbac.authorization.k8s.io "system:auth-delegator" created
rolebinding.rbac.authorization.k8s.io "dca" created
apiservice.apiregistration.k8s.io "v1beta1.external.metrics.k8s.io" created
clusterrole.rbac.authorization.k8s.io "external-metrics-reader" created
clusterrolebinding.rbac.authorization.k8s.io "external-metrics-reader" created
```

Datadog Cluster Agent を実行してサービスを登録したら、HPA マニフェストを作成し、Datadog Cluster Agent が Datadog からメトリクスをプルできるようにします。

## HPA の実行

この時点で、次のような状態になっているはずです。

```text
PODS

NAMESPACE     NAME                                     READY     STATUS    RESTARTS   AGE
default       datadog-agent-4c5pp                      1/1       Running   0          14m
default       datadog-agent-ww2da                      1/1       Running   0          14m
default       datadog-agent-2qqd3                      1/1       Running   0          14m
[...]
default       datadog-cluster-agent-7b7f6d5547-cmdtc   1/1       Running   0          16m
```

次に、Horizontal Pod Autoscaler マニフェストを作成します。[hpa-manifest.yaml ファイル][7]を見ると、次のことがわかります。

* HPAは、`nginx` と呼ばれるデプロイを自動スケーリングするように構成されています。
* 作成されるレプリカの最大数は `5` で、最小数は `1` です。
* 使用されるメトリクスは `nginx.net.request_per_s` であり、スコープは `kube_container_name: nginx` です。このメトリクス形式は、Datadog の形式に対応しています。

Kubernetes は 30 秒ごとに Datadog Cluster Agent にクエリを実行してこのメトリクスの値を取得し、必要に応じて比例的に自動スケーリングします。
高度なユースケースでは、[Kubernetes 水平ポッド自動スケーリングのドキュメント][8]で確認できるように、同じ HPA に複数のメトリクスを含めることができます。提案された値の最大値は選択された値です。

1. NGINX デプロイを作成します。
  `kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/hpa-example/nginx.yaml"`

2. 次に、HPA マニフェストを適用します。
  `kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/hpa-example/hpa-manifest.yaml"`

NGINX ポッドが対応するサービスで実行されていることが表示されているはずです。

```text
POD:

default       nginx-6757dd8769-5xzp2                   1/1       Running   0          3m

SVC:

NAMESPACE     NAME                  TYPE        CLUSTER-IP        EXTERNAL-IP   PORT(S)         AGE
default       nginx                 ClusterIP   192.168.251.36    none          8090/TCP        3m

HPAS:

NAMESPACE   NAME       REFERENCE          TARGETS       MINPODS   MAXPODS   REPLICAS   AGE
default     nginxext   Deployment/nginx   0/9 (avg)       1         3         1        3m

```

### サービスにストレスをかける

この時点で、セットアップにストレスをかける準備ができています。
ストレスの結果として、Kubernetes は NGINX ポッドを自動スケーリングします。

NGINX サービスの IP を次のようにカールします。

`curl <nginx_svc>:8090/nginx_status`

次のような出力を受け取るはずです。

```shell
$ curl 192.168.254.216:8090/nginx_status

Active connections: 1
server accepts handled requests
 1 1 1
Reading: 0 Writing: 1 Waiting: 0
```

裏側では、1 秒あたりのリクエスト数も増加しました。このメトリクスは、アノテーションを介して NGINX ポッドを検出するオートディスカバリーを使用して、Node Agent によって収集されています。オートディスカバリーの仕組みの詳細については、[オートディスカバリーのドキュメント][9]を参照してください。このため、これにストレスをかけると、Datadog アプリに上昇が見られるはずです。HPA マニフェストでこのメトリクスを参照すると、Datadog Cluster Agent も定期的に最新の値を取得しています。次に、Kubernetes はこの値を取得するために Datadog Cluster Agent にクエリを実行すると、数値がしきい値を超えていることに気づき、それに応じて自動スケーリングします。

これを行うには、次を実行します: `while true; do curl <nginx_svc>:8090/nginx_status; sleep 0.1; done`

1 秒あたりのリクエスト数が急上昇し、NGINX ポッドが自動スケーリングするしきい値である 9 を超えることがすぐにわかります。
次に、新しい NGINX ポッドが作成されていることがわかります。

```text
PODS:

NAMESPACE     NAME                                     READY     STATUS    RESTARTS   AGE
default       datadog-cluster-agent-7b7f6d5547-cmdtc   1/1       Running   0          9m
default       nginx-6757dd8769-5xzp2                   1/1       Running   0          2m
default       nginx-6757dd8769-k6h6x                   1/1       Running   0          2m
default       nginx-6757dd8769-vzd5b                   1/1       Running   0          29m

HPAS:

NAMESPACE   NAME       REFERENCE          TARGETS       MINPODS   MAXPODS   REPLICAS   AGE
default     nginxext   Deployment/nginx   30/9 (avg)     1         3         3         29m

```

[1]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/#before-you-begin
[2]: /ja/agent/cluster_agent/
[3]: https://kubernetes.io/docs/tasks/access-kubernetes-api/configure-aggregation-layer
[4]: /ja/agent/kubernetes/integrations/
[5]: /ja/agent/cluster_agent/setup/
[6]: /ja/agent/kubernetes/cluster/
[7]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/hpa-example/hpa-manifest.yaml
[8]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-multiple-metrics
[9]: /ja/agent/kubernetes/#template-source-kubernetes-pod-annotations