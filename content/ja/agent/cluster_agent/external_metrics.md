---
title: カスタムメトリクスサーバー
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/datadog-cluster-agent/'
    tag: ブログ
    text: Datadog Cluster Agent のご紹介
  - link: 'https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/'
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
---
## はじめに

Horizontal Pod Autoscaling 機能は、[Kubernetes v1.2][1] で導入され、`CPU` などの基本的なメトリクスの自動スケーリングを可能にしますが、アプリケーションと一緒に実行するには `metrics-server` というリソースが必要です。Kubernetes v1.6 では、[カスタムメトリクス][2]を自動スケーリングすることが可能です。
カスタムメトリクスはユーザー定義であり、クラスター内から収集されます。Kubernetes v1.10 の時点で、外部メトリクスのサポートが導入され、Datadog によって収集されたクラスター外部からのメトリクスを自動スケーリングします。

カスタムおよび外部メトリクスプロバイダーは、メトリクスサーバーとは対照的に、ユーザーが実装および登録する必要があるリソースです。

v1.0.0 の時点で、Datadog Cluster Agent のカスタムメトリクスサーバーは、外部メトリクス用の External Metrics Provider インターフェイスを実装しています。このドキュメントページでは、設定方法と、Datadog メトリクスに基づいて Kubernetes ワークロードを自動スケーリングする方法について説明します。

## 要件

1. Kubernetes >v1.10 を実行して、API サーバーに対して External Metrics Provider リソースを登録できるようにします。
2. 集計レイヤーを有効にします。[Kubernetes 集計レイヤーの構成ドキュメント][3]を参照してください。

## Cluster Agent 外部メトリクスサーバーをセットアップする

### カスタムメトリクスサーバー

カスタムメトリクスサーバーを有効にするには、[Datadog Cluster Agent のセットアップ][4]手順に従いますが、[ステップ 3 - Cluster Agent とそのサービスの作成][5]で Datadog Cluster Agent のデプロイマニフェストを編集する場合は、次の追加手順に従ってください。

1. Datadog Cluster Agent のデプロイで、`DD_EXTERNAL_METRICS_PROVIDER_ENABLED` を `true` に設定します。
2. Datadog [API とアカウントのアプリケーションキー][6]を使って、Datadog Cluster Agent のデプロイで、`<DD_APP_KEY>` と `<DD_API_KEY>` を構成します。
3. `DATADOG_HOST` を `https://{{< region-param key="dd_full_site" >}}` に設定します (デフォルトは `https://app.datadoghq.com`)。

### External Metrics Provider を登録する

Datadog Cluster Agent が起動して実行されたら

1. `datadog-custom-metrics-server` サービスを作成し、次の `custom-metric-server.yaml` マニフェストでポート `443` を公開します。

    ```yaml
      kind: Service
      apiVersion: v1
      metadata:
        name: datadog-custom-metrics-server
      spec:
        selector:
          app: datadog-cluster-agent
        ports:
        - protocol: TCP
          port: 443
          targetPort: 443
    ```

   この変更を適用するには、`kubectl apply -f custom-metric-server.yaml` を実行します

2. [`rbac-hpa.yaml` RBAC ルールファイル][7]をダウンロードします。
3. サービスを介して Cluster Agent を External Metrics Provider として登録し、上記の RBAC ルールを適用してポート `443` を公開します。
    ```
    kubectl apply -f rbac-hpa.yaml
    ```

## HPA を実行する

Datadog Cluster Agent を実行してサービスを登録したら、[HPA][8] マニフェストを作成し、メトリクスに `type: External` を指定して、Datadog Cluster Agent に Datadog からメトリクスをプルするよう通知します。

```yaml
spec:
  metrics:
    - type: External
      external:
      metricName: "<METRIC_NAME>"
      metricSelector:
        matchLabels:
          <TAG_KEY>: <TAG_VALUE>
```

**例**: Datadog メトリクス `nginx.net.request_per_s` に基づいて NGINX デプロイを自動スケーリングする HPA マニフェスト

```yaml
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  name: nginxext
spec:
  minReplicas: 1
  maxReplicas: 3
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  metrics:
  - type: External
    external:
      metricName: nginx.net.request_per_s
      metricSelector:
        matchLabels:
            kube_container_name: nginx
      targetAverageValue: 9
```

このマニフェストで次のことに注意してください。

- HPAは、`nginx` と呼ばれるデプロイを自動スケーリングするように構成されています。
- 作成されるレプリカの最大数は `3` で、最小数は `1` です。
- 使用されるメトリクスは `nginx.net.request_per_s` であり、スコープは `kube_container_name: nginx` です。このメトリクス形式は、Datadog の形式に対応しています。

Kubernetes は 30 秒ごとに Datadog Cluster Agent にクエリを実行してこのメトリクスの値を取得し、必要に応じて比例的に自動スケーリングします。高度なユースケースでは、同じ HPA に複数のメトリクスを含めることができます。[Kubernetes 水平ポッド自動スケーリングのドキュメント][9]で確認できるように、提案された値の最大値は選択された値です。

**注**: 複数の Cluster Agent を実行すると、API の使用量が増えます。Datadog Cluster Agent は、Kubernetes の約 45 の HPA オブジェクトに対して 1 時間に 120 の呼び出しを行います。45 以上の HPA を実行することで、同じ組織内からメトリクスをフェッチする際の呼び出し数が増えます。

## DatadogMetric CRD を使用した、カスタムクエリによるオートスケーリング (Cluster Agent v1.7.0 以上)

`DatadogMetric` CRD および Datadog Cluster Agent v1.7.0 以上を使用して、Datadog クエリをオートスケール

### カスタムクエリ要件

オートスケールが正常に動作するには、クエリが以下のルールに従う必要があります。

- クエリの構文は正確で**なければなりません**。正確でない場合、オートスケールに使用される**すべて**のメトリクスが更新されません (オートスケールが停止します)。
- クエリ結果は 1 つの系列のみを出力**しなければなりません** (それ以上の場合、結果は無効とみなされます)。
- クエリからは、少なくとも 2 つのタイムスタンプを持つポイントの結果が得られる**必要があります** (1 つのポイントを返すクエリの使用も可能ですが、この場合オートスケールは不完全なポイントを使用する可能性があります)。

**注**: クエリは任意ですが、開始および終了時間は `Now() - 5 minutes` および `Now()` に設定されます

### Datadog Cluster Agent で DatadogMetric を使用するためのセットアップ

`DatadogMetric` CRD の使用を有効にするには、以下の追加手順を実行します。

1. `DatadogMetric` CRD をクラスターにインストールします。

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/helm-charts/master/crds/datadoghq.com_datadogmetrics.yaml"
    ```

2. Datadog Cluster Agent RBAC マニフェストを更新します (`DatadogMetric` CRD の使用を許可するために更新されています)。

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent-datadogmetrics/cluster-agent-rbac.yaml"
    ```

3. Datadog Cluster Agent のデプロイで、`DD_EXTERNAL_METRICS_PROVIDER_USE_DATADOGMETRIC_CRD` を `true` に設定します。

### DatadogMetric を使用するための HPA セットアップ

セットアップ手順が完了したら、`DatadogMetric` リソースの作成を開始します。`DatadogMetric` はネームスペース規則のリソースです。HPA はあらゆる `DatadogMetric` を参照できますが、HPA と同じネームスペースで作成することをおすすめします。

**注**: 複数の HPA を同じ `DatadogMetric` で使用できます。

以下のマニフェストで `DatadogMetric` を作成できます。

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogMetric
metadata:
  name: <your_datadogmetric_name>
spec:
  query: <your_custom_query>
```

**例**: Datadog メトリクス `nginx.net.request_per_s` に基づいて NGINX デプロイをオートスケールする `DatadogMetric` オブジェクト

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogMetric
metadata:
  name: nginx-requests
spec:
  query: max:nginx.net.request_per_s{kube_container_name:nginx}.rollup(60)
```

`DatadogMetric` を作成したら、次の `DatadogMetric` を使用するために HPA を構成する必要があります。

```yaml
spec:
  metrics:
    - type: External
      external:
        metricName: "datadogmetric@<namespace>:<datadogmetric_name>"
```

**例**: `nginx-requests` という名前の `DatadogMetric` を使用した HPA。両オブジェクトが `nginx-demo` のネームスペースにあることを前提とする。

```yaml
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  name: nginxext
spec:
  minReplicas: 1
  maxReplicas: 3
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  metrics:
  - type: External
    external:
      metricName: datadogmetric@nginx-demo:nginx-requests
      targetAverageValue: 9
```

HPA を `DatadogMetric` にリンクしたら、Datadog Cluster Agent がカスタムクエリを使用して HPA に値を提供し始めます。

### 外部メトリクスを使用した、既存 HPA の自動移行

`DD_EXTERNAL_METRICS_PROVIDER_USE_DATADOGMETRIC_CRD` を `true` に設定したものの、依然として `DatadogMetric` を参照**しない** HPA がある場合、通常の構文 (`datadogmetric@...` を使用した `DatadogMetric` を参照しない) がサポートされます。

Datadog Cluster Agent は、自動的にそのネームスペース (`dcaautogen-` で始まる名前) で `DatadogMetric` リソースを作成してこれに対応するため、`DatadogMetric` への移行がスムーズになります。

`DatadogMetric` を参照するよう HPA を後で移行することを選択すると、自動生成されたリソースは数時間後に Datadog Cluster Agent によりクリーンアップされます。

### DatadogMetric に関する問題のトラブルシューティング

Datadog Cluster Agent は、すべての `DatadogMetric` リソースの `status` サブリソースを更新し、クエリ結果を Datadog に反映します。どこかに問題があった場合、これが状況を理解するための主な情報源となります。

**例**: `DatadogMetric` の `status` 部分:

```yaml
status:
  conditions:
  - lastTransitionTime: "2020-06-22T14:38:21Z"
    lastUpdateTime: "2020-06-25T09:21:00Z"
    status: "True"
    type: Active
  - lastTransitionTime: "2020-06-25T09:00:00Z"
    lastUpdateTime: "2020-06-25T09:21:00Z"
    status: "True"
    type: Valid
  - lastTransitionTime: "2020-06-22T14:38:21Z"
    lastUpdateTime: "2020-06-25T09:21:00Z"
    status: "True"
    type: Updated
  - lastTransitionTime: "2020-06-25T09:00:00Z"
    lastUpdateTime: "2020-06-25T09:21:00Z"
    status: "False"
    type: Error
  currentValue: "1977.2"
```

4 種類の表示により、`DatadogMetric` の現在の状態がわかります。

- `Active`: Datadog では、少なくとも 1つの HPA が参照している場合に `DatadogMetric` をアクティブとみなします。非アクティブな `DatadogMetrics` は、API の使用を最小化するため更新されません。
- `Valid`: 関連するクエリの回答が有効である場合、`DatadogMetric` が有効であると表示されます。「有効でない」状態とは、カスタムクエリが意味的に正しくないことを意味します。詳しくは、`Error` フィールドを参照してください。
- `Updated`: この表示は、Datadog Cluster Agent が `DatadogMetric` に触れると**必ず**更新されます。
- `Error`: この `DatadogMetric` の処理がエラーをトリガーすると、この状態が true となりエラーの詳細を表示します。

`currentValue` は Datadog から収集された値で、HPA へ返される値となります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/#before-you-begin
[2]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-custom-metrics
[3]: https://kubernetes.io/docs/tasks/access-kubernetes-api/configure-aggregation-layer
[4]: /ja/agent/cluster_agent/setup/
[5]: /ja/agent/cluster_agent/setup/#step-3-create-the-cluster-agent-and-its-service
[6]: https://app.datadoghq.com/account/settings#api
[7]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/hpa-example/rbac-hpa.yaml
[8]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale
[9]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-multiple-metrics