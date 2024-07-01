---
aliases:
- /ja/agent/guide/cluster-agent-custom-metrics-server
- /ja/agent/cluster_agent/external_metrics
- /ja/containers/cluster_agent/external_metrics
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
title: Cluster Agent のカスタムメトリクスと外部メトリクスによるオートスケーリング
---

## 概要

[Kubernetes v1.2][1] で導入された Horizontal Pod Autoscaling は、`CPU` などの基本的なメトリクスからオートスケールが可能ですが、アプリケーションと一緒に実行するために `metrics-server` というリソースが必要になります。Kubernetes v1.6 では、[カスタムメトリクス][2]からオートスケールを行うことができます。

カスタムメトリクスは、ユーザー定義で、クラスター内から収集されます。Kubernetes v1.10 では、外部メトリクスのサポートが導入され、Datadog によって収集されたメトリクスなどのクラスター外からの任意のメトリクスに基づいてオートスケールされるようになりました。

まずは、Cluster Agent を External Metrics Provider として登録する必要があります。次に、Cluster Agent の提供するメトリクスに依拠するよう HPA を調整します。

v1.0.0 の時点で、Datadog Cluster Agent のカスタムメトリクスサーバーは、外部メトリクス用の External Metrics Provider インターフェイスを実装しています。このページでは、その設定方法と、Datadog メトリクスに基づいて Kubernetes ワークロードをオートスケーリングする方法について説明します。

## セットアップ

### 要件

1. Kubernetes >v1.10: API サーバーに対して External Metrics Provider リソースを登録する必要があります。
2. Kubernetes の[集計層][3]を有効化します。
3. 有効な [Datadog API キー**および**アプリケーションキー][8]。

### インストール

{{< tabs >}}
{{% tab "Helm" %}}

Helm の Cluster Agent で外部メトリクスサーバーを有効にするには、[values.yaml][1] ファイルを以下の構成で更新してください。有効な Datadog API キー、アプリケーションキーを提供し、`clusterAgent.metricsProvider.enabled` を `true` に設定します。その後、Datadog Helm チャートを再デプロイします。

  ```yaml
  datadog:
    apiKey: <DATADOG_API_KEY>
    appKey: <DATADOG_APP_KEY>
    #(...)

  clusterAgent:
    enabled: true
    # metricsProvider を有効化して Datadog のメトリクスに基づきスケール可能に設定
    metricsProvider:
      # clusterAgent.metricsProvider.enabled
      # メトリクスプロバイダーを有効にする場合は、true に設定
      enabled: true
  ```

これにより必要な RBAC コンフィギュレーションが自動的に更新され、Kubernetes が利用可能な `Service` と `APIService` がそれぞれ設定されます。

キーは、データキー `api-key` と `app-key` を含む、事前に作成された `Secrets` の名前を `datadog.apiKeyExistingSecret` と `datadog.appKeyExistingSecret` という構成で参照することで設定することもできます。

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Operator" %}}

Datadog Operator で管理する Cluster Agent で外部メトリクスサーバーを有効にするには、まず [Datadog Operator のセットアップ][1]を行います。次に、有効な Datadog API キー、アプリケーションキーを提供し、`DatadogAgent` カスタムリソースで `features.externalMetricsServer.enabled` を `true` に設定します。

  ```yaml
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    global:
      credentials:
        apiKey: <DATADOG_API_KEY>
        appKey: <DATADOG_API_KEY>

    features:
      externalMetricsServer:
        enabled: true
  ```

Operator により必要な RBAC コンフィギュレーションが自動的に更新され、Kubernetes が利用可能な `Service` と `APIService` がそれぞれ設定されます。

キーは、あらかじめ作成された `Secrets` の名前と、Datadog API およびアプリケーションキーを格納したデータキーを参照することで設定することもできます。
  ```yaml
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    global:
      credentials:
        apiSecret:
          secretName: <SECRET_NAME>
          keyName: <KEY_FOR_DATADOG_API_KEY>
        appSecret:
          secretName: <SECRET_NAME>
          keyName: <KEY_FOR_DATADOG_APP_KEY>

    features:
      externalMetricsServer:
        enabled: true
  ```

[1]: /ja/agent/guide/operator-advanced
{{% /tab %}}
{{% tab "Daemonset" %}}

#### カスタムメトリクスサーバー

カスタムメトリクスサーバーを有効にするには、まずクラスタ内で [Datadog Cluster Agent のセットアップ][1] の指示に従います。ベースのデプロイが成功したことを確認したら、次の手順で Datadog Cluster Agent の `Deployment` マニフェストを編集します:

1. `DD_EXTERNAL_METRICS_PROVIDER_ENABLED` 環境変数を `true` に設定します。
2. 環境変数 `DD_APP_KEY` と `DD_API_KEY` セットの**双方**があることを確認します。
3. `DD_SITE` 環境変数を Datadog サイトに設定したことを確認します:  {{< region-param key="dd_site" code="true" >}}。デフォルトは `US` サイト `datadoghq.com` となります。

#### 外部メトリクスプロバイダーサービスを登録する

Datadog Cluster Agent が稼働したらいくつかの追加 RBAC ポリシーを適用し、`Service` を設定して対応するリクエストのルーティングを行います。

1. `datadog-custom-metrics-server` という名前で `Service` を作成し、以下の `custom-metric-server.yaml` マニフェストでポート `8443` を公開します:

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
        port: 8443
        targetPort: 8443
    ```
    **注意:** Cluster Agent はデフォルトで、これらのリクエストをポート  `8443` で受け取るようにになっています。しかし、Cluster Agent の `Deployment` が環境変数 `DD_EXTERNAL_METRICS_PROVIDER_PORT` に他のポート値を設定している場合は、それに応じてこの `Service` の `targetPort` を変更してください。

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

Cluster Agent が有効になれば、HPA 用のメトリクスの取得準備は完了です。以下の 2 つのオプションがあります。
- [DatadogMetric クエリを使ったオートスケーリング](#autoscaling-with-datadogmetric-queries)
- [DatadogMetric クエリを使わないオートスケーリング](#autoscaling-without-datadogmetric-queries)

Datadog は、`DatadogMetric` オプションの使用を推奨しています。これには、`DatadogMetric` CustomResourceDefinition (CRD) のデプロイという追加の手順が必要ですが、実行するクエリの柔軟性が高まります。`DatadogMetric` クエリを使用しない場合、HPA では Kubernetes のネイティブな外部メトリクス形式が使用され、これを Cluster Agent が Datadog のメトリクスクエリに変換します。

## DatadogMetric クエリを使ったオートスケーリング

`DatadogMetric` [Custom Resource Definition (CRD)][6] と Datadog Cluster Agent のバージョン `1.7.0` 以上を使用することで、Datadog のクエリでオートスケールを行うことができます。これはより柔軟なアプローチであり、アプリ内で使用する正確な Datadog クエリでのスケールが可能となります。

### 要件

オートスケールが正常に動作するには、カスタムクエリが以下のルールに従う必要があります。

- クエリの構文は正確で**なければなりません**。正確でない場合、オートスケールに使用される**すべて**のメトリクスが更新されません (オートスケールが停止します)。
- クエリ結果は 1 つの系列のみを出力**しなければなりません** (それ以上の場合、結果は無効とみなされます)。
- クエリからは、少なくとも 2 つの非 NULL タイムスタンプを持つポイントの結果が得られる**必要があります** (1 つのポイントを返すクエリの使用も可能ですが、この場合オートスケールは不完全なポイントを使用する可能性があります)。

**注**: クエリは任意ですが、開始および終了時間はデフォルトで `Now() - 5 minutes` および `Now()` に設定されます

### DatadogMetric CRD のセットアップ

`DatadogMetric` オブジェクトの Custom Resource Definition (CRD) は、Helm、Datadog Operator、または Daemonset を使用して Kubernetes クラスターに追加することができます。

{{< tabs >}}
{{% tab "Helm" %}}

`DatadogMetric` CRD の使用を有効にするには、[values.yaml][1] Helm のコンフィギュレーションを更新して、`clusterAgent.metricsProvider.useDatadogMetrics` を `true` に設定します。 その後、Datadog Helm チャートを再デプロイします:

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
{{% tab "Operator" %}}

`DatadogMetric` CRD の使用をアクティブにするには、`DatadogAgent` カスタムリソースを更新し、`features.externalMetricsServer.useDatadogMetrics` を `true` に設定します。

  ```yaml
  kind: DatadogAgent
  apiVersion: datadoghq.com/v2alpha1
  metadata:
    name: datadog
  spec:
    global:
      credentials:
        apiKey: <DATADOG_API_KEY>
        appKey: <DATADOG_API_KEY>
    features:
      externalMetricsServer:
        enabled: true
        useDatadogMetrics: true
  ```

Operator により必要な RBAC コンフィギュレーションが自動的に更新され、Cluster Agent に `DatadogMetric` リソースを介してこれらの HPA クエリを管理するよう指示します。

{{% /tab %}}
{{% tab "DaemonSet" %}}
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

### DatadogMetric オブジェクトの作成
 `DatadogMetric` カスタムリソースがクラスターに追加されたら、HPA が参照する `DatadogMetric` オブジェクトを作成できます。どの HPA も任意の `DatadogMetric` を参照できますが、Datadog では HPA と同じネームスペースに作成することを推奨しています。

**注**: 複数の HPA を同じ `DatadogMetric` で使用できます。

以下のマニフェストで `DatadogMetric` を作成できます。

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogMetric
metadata:
  name: <DATADOG_METRIC_NAME>
spec:
  query: <CUSTOM_QUERY>
```

#### サンプル DatadogMetric オブジェクト
例えば、Datadog メトリクス `nginx.net.request_per_s` に基づいて NGINX デプロイをオートスケールする `DatadogMetric` オブジェクト:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogMetric
metadata:
  name: nginx-requests
spec:
  query: max:nginx.net.request_per_s{kube_container_name:nginx}.rollup(60)
```

### HPA での DatadogMetric の利用
Cluster Agent をセットアップして、 `DatadogMetric` が作成されたら、HPA を更新して、そのネームスペースと名前に対応する `DatadogMetric` を参照するようにします。一般的なフォーマットとしては、HPA 用のメトリクスを `type: External` として指定し、`datadogmetric@<NAMESPACE>:<DATADOG_METRIC_NAME>` のようにメトリクス名を指定します。

#### DatadogMetric を使った HPA の例
`nginx-requests` という名前の `DatadogMetric` を使用する HPA。両方のオブジェクトがネームスペース `nginx-demo` にあると想定。

`apiVersion: autoscaling/v2` を使用する場合: 

```yaml
apiVersion: autoscaling/v2
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
      metric:
        name: datadogmetric@nginx-demo:nginx-requests
      target:
        type: Value
        value: 9
```

`apiVersion: autoscaling/v2beta1` を使用する場合:

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
      targetValue: 9
```

上記マニフェストの内容:
- HPAは、`nginx` と呼ばれるデプロイを自動スケーリングするように構成されています。
- 作成されるレプリカの最大数は `3` で、最小数は `1` です。
- HPA は ネームスペース `nginx-demo` の `DatadogMetric` `nginx-requests` に依拠します。

`DatadogMetric` が HPA にリンクされたら、Datadog Cluster Agent がこれをアクティブに変更します。その後、Cluster Agent は Datadog にクエリをリクエストし、結果を `DatadogMetric` オブジェクトに格納し、その値を HPA に提供します。

## DatadogMetric クエリを使わないオートスケーリング
`DatadogMetric` を使ったオートスケーリングを希望しない場合は、Kubernetes のネイティブな形式を使用して HPA を作成することができます。Cluster Agent が HPA の形式を Datadog メトリクスクエリに変換します。

Datadog Cluster Agent を実行してサービスを登録したら、[HPA][4] マニフェストを作成してメトリクスに `type: External` を指定します。これにより、Datadog Cluster Agent のサービスからメトリクスを取得するよう HPA に通知されます。

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

### DatadogMetric を使わない HPA の例
`apiVersion: autoscaling/v2` を使用し、Datadog メトリクス `nginx.net.request_per_s` に基づいて NGINX デプロイをオートスケールする HPA マニフェストです:

```yaml
apiVersion: autoscaling/v2
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
      metric:
        name: nginx.net.request_per_s
      target:
        type: Value
        value: 9
```

次のマニフェストは上の HPA マニフェストと同じですが、`apiVersion: autoscaling/v2beta1` を使用しています:
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
      targetValue: 9
```

上記マニフェストの内容:

- HPAは、`nginx` と呼ばれるデプロイを自動スケーリングするように構成されています。
- 作成されるレプリカの最大数は `3` で、最小数は `1` です。
- 使用されるメトリクスは `nginx.net.request_per_s` であり、スコープは `kube_container_name: nginx` です。この形式は、Datadog のメトリクス形式に対応しています。

30 秒ごとに、Kubernetes は Datadog Cluster Agent にクエリを送信してこのメトリクスの値を取得し、必要に応じて比例してオートスケールを行います。高度なユースケースでは、同じ HPA に複数のメトリクスを持たせることが可能です。[Kubernetes 水平ポッドオートスケーリング][5]に記載の通り、提案された値のうち最大のものが選択されます。

### 移行

既存の HPA は、外部メトリクスを使用して自動的に移行されます。

`DD_EXTERNAL_METRICS_PROVIDER_USE_DATADOGMETRIC_CRD` を `true` に設定したものの、依然として `DatadogMetric` を参照**しない** HPA がある場合、通常の構文 (`datadogmetric@...` を使用した `DatadogMetric` を参照しない) がサポートされます。

Datadog Cluster Agent は、自動的にそのネームスペース (`dcaautogen-` で始まる名前) で `DatadogMetric` リソースを作成するため、`DatadogMetric` への移行がスムーズになります。

後で HPA を移行して `DatadogMetric` を参照するようにした場合、自動生成されたリソースは数時間後に Datadog Cluster Agent によりクリーンアップされます。

## Cluster Agent によるクエリの実行
Cluster Agent は `DatadogMetric` オブジェクト用に 30 秒ごとにクエリを実行します。また、Cluster Agent は、実行されたメトリクスクエリを 35 件ずつグループ化します。したがって、Datadog メトリクス API に対する 1 つのリクエストには 35 件の`DatadogMetric` クエリが含まれます。

これらのクエリをまとめることで、Cluster Agent はより効率的にクエリを実行し、レート制限を避けることができます。

以上のことから、Cluster Agent は  `DatadogMetric` オブジェクト 35 個あたり、1 時間につき約 120 件の API リクエストを実行することがわかります。`DatadogMetric` オブジェクトをさらに追加したり、オートスケーリング機能を別の Kubernetes クラスターにも追加したりすると、同一組織内でメトリクスを取得するコール数が増加します。

また、Cluster Agent は、それぞれのメトリクスクエリについて、デフォルトで過去 5 分間のデータに対してクエリを実行します。これにより、Cluster Agent のスケーリングが*直近の*データに基づいて行われることが保証されます。ただし、メトリクスクエリがクラウドインテグレーション (AWS、Azure、GCP など) からのデータに依拠している場合、データの[取得にわずかな遅れが生じ][7]、5 分間の中にデータが収まらなくなってしまいます。その場合は、Cluster Agent に環境変数を提供し、メトリクスクエリの対象となる日付範囲とデータの期間を大きくします。

```yaml
- name: DD_EXTERNAL_METRICS_PROVIDER_BUCKET_SIZE
  value: "900"
- name: DD_EXTERNAL_METRICS_PROVIDER_MAX_AGE
  value: "900"
```

## トラブルシューティング

### DatadogMetric のステータス
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

### ターゲットメトリクスの Value と AverageValue
上記の例では、HPA は ターゲットタイプとして `AverageValue` の代わりに `Value` を使用しています。どちらのオプションもサポートされています。状況に応じて、Datadog メトリクスクエリを調整してください。

`Value` を使用する場合、Datadog メトリクスクエリから返されるメトリクス値は HPA にそのまま正確に提供され、スケーリングの判断が行われます。 `AverageValue` を使用する場合は、返されるメトリクス値が現在のポッド数で割られます。クエリと戻り値に基づいて HPA をどのようにスケーリングさせたいかに応じて、`<Metric Value>` を設定してください。

`apiVersion: autoscaling/v2` を使用する場合、ターゲットメトリクスで `Value` を使用する構成は次のようになります。
```yaml
  metrics:
  - type: External
    external:
      metric:
        name: datadogmetric@<NAMESPACE>:<DATADOG_METRIC_NAME>
      target:
        type: Value
        value: <METRIC_VALUE>
```

一方、`AverageValue` の場合は次のようになります。
```yaml
  metrics:
  - type: External
    external:
      metric:
        name: datadogmetric@<NAMESPACE>:<DATADOG_METRIC_NAME>
      target:
        type: AverageValue
        averageValue: <METRIC_VALUE>
```

`apiVersion: autoscaling/v2beta1` の場合、対応するオプションはそれぞれ `targetValue` と `targetAverageValue` になります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/#before-you-begin
[2]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-custom-metrics
[3]: https://kubernetes.io/docs/tasks/access-kubernetes-api/configure-aggregation-layer
[4]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale
[5]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-multiple-metrics
[6]: https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions
[7]: /ja/integrations/guide/cloud-metric-delay
[8]: /ja/account_management/api-app-keys/