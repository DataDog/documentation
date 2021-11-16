---
title: カスタムメトリクスサーバー
kind: documentation
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
---
## 概要

Horizontal Pod Autoscaling 機能は、[Kubernetes v1.2][1] で導入され、`CPU` などの基本的なメトリクスの自動スケーリングを可能にしますが、アプリケーションと一緒に実行するには `metrics-server` というリソースが必要です。Kubernetes v1.6 では、[カスタムメトリクス][2]を自動スケーリングすることが可能です。
カスタムメトリクスはユーザー定義であり、クラスター内から収集されます。Kubernetes v1.10 の時点で、外部メトリクスのサポートが導入され、Datadog によって収集されたクラスター外部からのメトリクスを自動スケーリングします。

カスタムおよび外部メトリクスプロバイダーは、メトリクスサーバーとは対照的に、ユーザーが実装および登録する必要があるリソースです。

v1.0.0 の時点で、Datadog Cluster Agent のカスタムメトリクスサーバーは、外部メトリクス用の External Metrics Provider インターフェイスを実装しています。このドキュメントページでは、設定方法と、Datadog メトリクスに基づいて Kubernetes ワークロードを自動スケーリングする方法について説明します。

## セットアップ

### 要件

1. Kubernetes >v1.10 を実行して、API サーバーに対して External Metrics Provider リソースを登録できるようにします。
2. 集計レイヤーを有効にします。詳細については、[Kubernetes 集計レイヤーの構成][3]を参照してください。

### インストール

{{< tabs >}}
{{% tab "Helm" %}}

Helm の Cluster Agent で外部メトリクスサーバーを有効にするには、以下の Cluster Agent コンフィギュレーションで [datadog-values.yaml][1] ファイルを更新します。`clusterAgent.metricsProvider.enabled` を `true` に設定した後、Datadog Helm チャートを再デプロイします。

  ```yaml
  clusterAgent:
    enabled: true
    # metricsProvider を有効化して Datadog のメトリクスに基づきスケール可能に設定
    metricsProvider:
      # clusterAgent.metricsProvider.enabled
      # Set this to true to enable Metrics Provider
      enabled: true
  ```

これにより必要な RBAC コンフィギュレーションが自動的に更新され、Kubernetes が利用可能な `Service` と `APIService` がそれぞれ設定されます。

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Daemonset" %}}

#### カスタムメトリクスサーバー

カスタムメトリクスサーバーを有効にするには、まずクラスタ内で [Datadog Cluster Agent のセットアップ][1] の指示に従います。ベースのデプロイが成功したことを確認したら、次の手順で Datadog Cluster Agent の `Deployment` マニフェストを編集します:

1. `DD_EXTERNAL_METRICS_PROVIDER_ENABLED` 環境変数を `true` に設定します
2. 環境変数 `DD_APP_KEY` と `DD_API_KEY` セットの**双方**があることを確認します
3. `DD_SITE` 環境変数を Datadog サイトに設定したことを確認します:  {{< region-param key="dd_site" code="true" >}}。デフォルトは `US` サイト `datadoghq.com` となります。

#### 外部メトリクスプロバイダーサービスを登録する

Datadog Cluster Agent が稼働したらいくつかの追加 RBAC ポリシーを適用し、`Service` を設定して対応するリクエストのルーティングを行います。

1. `datadog-custom-metrics-server` という名前で `Service` を作成し、以下の `custom-metric-server.yaml` マニフェストでポート `443` を公開します:

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
    **注意:** Cluster Agent はデフォルトで、これらのリクエストをポート  `443` で受け取るようにになっています。しかし、Cluster Agent の `Deployment` が環境変数 `DD_EXTERNAL_METRICS_PROVIDER_PORT` に他のポート値を設定している場合は、それに応じてこの `Service` の `targetPort` を変更してください。

   `kubectl apply -f custom-metric-server.yaml` を実行してこの `Service` を適用します
2.  [`rbac-hpa.yaml` RBAC ルールファイル][2]をダウンロードします。
3. このファイルを適用して Cluster Agent を外部メトリクスプロバイダーに登録します:
    ```
    kubectl apply -f rbac-hpa.yaml
    ```

[1]: /ja/agent/cluster_agent/setup/?tab=daemonset
[2]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/hpa-example/rbac-hpa.yaml
{{% /tab %}}
{{< /tabs >}}

## 使用方法

Datadog Cluster Agent を実行してサービスを登録したら、[HPA][4] マニフェストを作成してメトリクスに `type: External` を指定し、Datadog Cluster Agent のサービスからメトリクスを引き出すよう HPA に通知します。

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

### サンプル HPA
Datadog メトリクスに基づいて NGINX デプロイをオートスケールする HPA マニフェストです:

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

**注**: このマニフェストには:

- HPAは、`nginx` と呼ばれるデプロイを自動スケーリングするように構成されています。
- 作成されるレプリカの最大数は `3` で、最小数は `1` です。
- 使用されるメトリクスは `nginx.net.request_per_s` であり、スコープは `kube_container_name: nginx` です。このメトリクス形式は、Datadog の形式に対応しています。

30 秒ごとに、Kubernetes は Datadog Cluster Agent にクエリを送信してこのメトリクスの値を取得し、必要に応じて比例してオートスケールを行います。高度なユースケースでは、同じ HPA に複数のメトリクスを持たせることが可能です。[Kubernetes 水平ポッドオートスケーリング][5]に記載の通り、提案された値のうち最大のものが選択されます。

**注**: 複数の Cluster Agent を実行すると、API の使用量が増えます。Datadog Cluster Agent は、Kubernetes の約 45 の HPA オブジェクトに対して 1 時間に 120 の呼び出しを行います。45 以上の HPA を実行することで、同じ組織内からメトリクスをフェッチする際の呼び出し数が増えます。

## オートスケーリング

`DatadogMetric` [Custom Resource Definition (CRD)][6] と Datadog Cluster Agent のバージョン `1.7.0` 以上を使用することで、Datadog のクエリでオートスケールを行うことができます。これはより柔軟なアプローチであり、アプリ内で使用する正確な Datadog クエリでのスケールが可能となります。

### 要件

オートスケールが正常に動作するには、カスタムクエリが以下のルールに従う必要があります。

- クエリの構文は正確で**なければなりません**。正確でない場合、オートスケールに使用される**すべて**のメトリクスが更新されません (オートスケールが停止します)。
- クエリ結果は 1 つの系列のみを出力**しなければなりません** (それ以上の場合、結果は無効とみなされます)。
- クエリからは、少なくとも 2 つのタイムスタンプを持つポイントの結果が得られる**必要があります** (1 つのポイントを返すクエリの使用も可能ですが、この場合オートスケールは不完全なポイントを使用する可能性があります)。

**注**: クエリは任意ですが、開始および終了時間は `Now() - 5 minutes` および `Now()` に設定されます

### セットアップ
#### Datadog Cluster Agent

Helm または Daemonset を使用して `DatadogMetric` を使用するように Datadog Cluster Agent を設定します。

{{< tabs >}}
{{% tab "Helm" %}}

`DatadogMetric` CRD の使用を有効にするには、[datadog-values.yaml][1] Helm のコンフィギュレーションを更新して、`clusterAgent.metricsProvider.useDatadogMetrics` を `true` に設定します。 その後、Datadog Helm チャートを再デプロイします:

  ```yaml
  clusterAgent:
    enabled: true
    metricsProvider:
      enabled: true
      # clusterAgent.metricsProvider.useDatadogMetrics
      # DatadogMetric CRD の使用を有効化し、任意の Datadog クエリでオートスケールを実行
      useDatadogMetrics: true
  ```

**注意:** 操作を実行すると CRD の自動インストールが開始されます。CRD が初回の Herm のインストール前に既に存在している場合は競合が発生する可能性があります。

これにより必要な RBAC ファイルが自動的に更新され、Cluster Agent に `DatadogMetric` リソースを介してこれらの HPA クエリを管理するよう指示します。

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Daemonset" %}}
`DatadogMetric` CRD の使用をアクティベートするには、次の手順に従ってください:

1. `DatadogMetric` CRD をクラスターにインストールします。

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/helm-charts/master/crds/datadoghq.com_datadogmetrics.yaml"
    ```

2. Datadog Cluster Agent RBAC マニフェストを更新します (`DatadogMetric` CRD の使用を許可するために更新されています)。

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent-datadogmetrics/cluster-agent-rbac.yaml"
    ```

3. Datadog Cluster Agent のデプロイで、`DD_EXTERNAL_METRICS_PROVIDER_USE_DATADOGMETRIC_CRD` を `true` に設定します。
{{% /tab %}}
{{< /tabs >}}

#### HPA

Cluster Agent をセットアップしたら、`DatadogMetric` オブジェクトを使用するように HPA を構成します。`DatadogMetric` はネームスペース付きのリソースです。どの HPA も任意の `DatadogMetric` を参照できますが、Datadog は HPA と同じネームスペースに作成することをお勧めします。

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

##### サンプル DatadogMetric オブジェクト
`nginx.net.request_per_s` Datadog メトリクスに基づいて NGINX デプロイをオートスケールするための `DatadogMetric` オブジェクト:

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

##### サンプル HPA
`nginx-requests` という名前の `DatadogMetric` を使用する HPA。両方のオブジェクトがネームスペース `nginx-demo` にあると想定:

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

HPA を `DatadogMetric` にリンクしたら、Datadog Cluster Agent がカスタムクエリを使用して HPA に値を提供します。

### 移行

既存の HPA は、外部メトリクスを使用して自動的に移行されます。

`DD_EXTERNAL_METRICS_PROVIDER_USE_DATADOGMETRIC_CRD` を `true` に設定したものの、依然として `DatadogMetric` を参照**しない** HPA がある場合、通常の構文 (`datadogmetric@...` を使用した `DatadogMetric` を参照しない) がサポートされます。

Datadog Cluster Agent は、自動的にそのネームスペース (`dcaautogen-` で始まる名前) で `DatadogMetric` リソースを作成するため、`DatadogMetric` への移行がスムーズになります。

`DatadogMetric` を参照するよう HPA を後で移行することを選択すると、自動生成されたリソースは数時間後に Datadog Cluster Agent によりクリーンアップされます。

### トラブルシューティング

Datadog Cluster Agent は、Datadog へのクエリの結果を反映させるために、すべての `DatadogMetric` リソースの `status` サブリソースの更新を行います。これは動作が失敗した場合に起こる状況を理解するための主な情報源となります。以下を実行してこの情報を出力することができます:

```shell
kubectl describe datadogmetric <RESOURCE NAME>
```

#### 例

`DatadogMetric` の `status` 部分:

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

`currentValue` は Datadog から収集された値で、HPA へ返されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/#before-you-begin
[2]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-custom-metrics
[3]: https://kubernetes.io/docs/tasks/access-kubernetes-api/configure-aggregation-layer
[4]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale
[5]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-multiple-metrics
[6]: https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions