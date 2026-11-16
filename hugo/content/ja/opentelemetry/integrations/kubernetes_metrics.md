---
description: OpenTelemetry を使用して、Kubernetes リソースデータとインフラストラクチャーメトリクスを Datadog に送信します。
further_reading:
- link: /opentelemetry/setup/
  tag: ドキュメント
  text: OpenTelemetry データを Datadog に送信する
- link: https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/
  tag: ドキュメント
  text: Unified Service Tagging
- link: https://github.com/DataDog/opentelemetry-examples/tree/main/guides/kubernetes
  tag: GitHub
  text: コレクター構成の例
title: Kubernetes メトリクス
---
## 概要 {#overview}

Datadog Agent をインストールせずに、OpenTelemetry を使用して Kubernetes データを Datadog に送信します。必要なデータに合わせてセットアップを選択します。

| 目標 | コンポーネント | セットアップ |
|---|---|---|
| Kubernetes Explorer でポッド、デプロイメント、その他のリソースデータを表示する|  `k8sobjects` レシーバーを備えたクラスターコレクター 1 台| [OTLP 経由で Kubernetes リソースを送信][15] |
| Datadog の標準 Kubernetes ダッシュボードにデータを入力する| `kube-state-metrics`クラスターコレクター 1 台、およびノードごとにノードコレクター 1 台| このガイドに従う|

以下の完全なセットアップでは、[Kubernetes - Overview][1] ダッシュボード用の Kubernetes インフラストラクチャー メトリクスと、[Kubernetes Explorer][10] 用のリソースデータを収集します。アプリケーションのインスツルメンテーションは行いません。

{{< img src="/opentelemetry/collector_exporter/kubernetes_metrics.png" alt="「Kubernetes - Overview」ダッシュボード。クラスターとそのコンテナのステータスやリソース使用量など、コンテナのメトリクスを表示します。" style="width:100%;" >}}

このセットアップでは、次の 3 つのコンポーネントを使用します。

- **[`kube-state-metrics`][8]** は、デプロイメント、ノード、ポッドなどの Kubernetes オブジェクトに関するメトリクスを生成します。
- **クラスターコレクター**。単一レプリカのデプロイメントとして実行され、クラスター全体のメトリクスとエクスプローラー用のリソースデータを収集します。
- **ノードコレクター**。DaemonSet として実行され、CPU やメモリ使用量など、各ノードからメトリクスを収集します。

クラスターコレクターは、Prometheus レシーバーを使用して `kube-state-metrics` をスクレイピングします。Prometheus サーバーをインストールする必要はありません。これらのメトリクスは、Kubernetes エクスプローラーからリンクされているダッシュボードに反映されます。`k8sobjects` レシーバーは、エクスプローラーのリソースデータを提供します。

## セットアップ {#setup}

これらの手順により、`default` 名前空間に新しいコレクターがデプロイされます。すでに Kubernetes メトリクスを収集している場合は、追加のコレクターをデプロイする前に既存の設定を確認し、重複した収集を回避してください。

### 前提条件 {#prerequisites}

- [Helm][2] および `kubectl`。クラスター内でワークロードをデプロイし、RBAC リソースを作成する権限が必要です。
- [Datadog API key][6] と [Datadog site][5]。

OpenTelemetry Collector [Helm chart][9] v0.156.2 以降、および OpenTelemetry Collector Contrib v0.159.0 以降を使用してください。以下のコマンドは、コレクターイメージを v0.159.0 に固定します。

エクスプローラーに使用される `k8sobjects` レシーバーは、Kubernetes API サーバーの負荷を増加させる可能性があります。Datadog は、Kubernetes 1.33 以降の使用と、収集を拡大する前に小規模なクラスターでテストすることを推奨しています。[Kubernetes エクスプローラーの制限事項][12]を参照してください。

{{< site-region region="gov,gov2" >}}<div class="alert alert-warning">OpenTelemetry を使用した Kubernetes エクスプローラーは、以下では利用できません。 {{< region-param key="dd_site_name" >}}.</div>{{< /site-region >}}

### インストール {#installation}

#### 1. kube-state-metrics のインストール {#1-install-kube-state-metrics}

`prometheus-community` Helm リポジトリを追加し、`kube-state-metrics` をインストールします。

```sh
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install kube-state-metrics prometheus-community/kube-state-metrics \
  --namespace default
```

参照設定は `kube-state-metrics.default.svc:8080` をスクレイピングします。別のサービス名または名前空間を使用している場合は、`cluster-collector.yaml` 内の Prometheus レシーバーターゲットを更新してください。

#### 2. Datadog シークレットの作成 {#2-create-a-datadog-secret}

API キーとサイトを設定し、コレクターの名前空間にシークレットを作成します。

```sh
export DD_API_KEY="<YOUR_DATADOG_API_KEY>"
export DD_SITE="{{< region-param key="dd_site" >}}"

kubectl create secret generic datadog-secret \
  --namespace default \
  --from-literal="api-key=$DD_API_KEY" \
  --from-literal="dd-site=$DD_SITE"
```

#### 3. コレクターの構成とインストール {#3-configure-and-install-the-collectors}

1. OpenTelemetry Helm チャートリポジトリを追加します。

   ```sh
   helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
   helm repo update
   ```

2. [cluster-collector.yaml][3] と [daemonset-collector.yaml][4] を同じディレクトリにダウンロードします。これらの Helm 値ファイルは `opentelemetry-examples` リポジトリで管理されています。

   ```sh
   CONFIG_URL="https://raw.githubusercontent.com/DataDog/opentelemetry-examples/main/guides/kubernetes/configuration"
   curl -fsSLo cluster-collector.yaml "$CONFIG_URL/cluster-collector.yaml"
   curl -fsSLo daemonset-collector.yaml "$CONFIG_URL/daemonset-collector.yaml"
   ```

3. 両方のファイルで、`config.exporters` 配下の `datadog/exporter` ブロックを推奨される OTLP HTTP エクスポーターに置き換えます。

   ```yaml
   exporters:
     otlp_http:
       endpoint: https://otlp.${env:DD_SITE}
       logs_endpoint: https://otlp.${env:DD_SITE}/v1/logs
       headers:
         dd-api-key: ${env:DD_API_KEY}
         dd-otel-metric-config: >-
           {
           "resource_attributes_as_tags": true,
           "instrumentation_scope_metadata_as_tags": true
           }
       compression: zstd
       compression_params:
         level: 3
       sending_queue:
         batch:
           sizer: bytes
           min_size: 2097152
           max_size: 4194304
   ```

   パイプラインの `exporters` リストにある各 `datadog/exporter` エントリーを `otlp_http` に置き換えます。クラスターコレクターでは、Datadog Exporter の `orchestrator_explorer` オプションを含めないでください。Datadog は、OTLP 経由で到着した `k8sobjects` レシーバーからのリソースデータを認識します。

4. `daemonset-collector.yaml` でトレース処理を更新します。参照ファイルはアプリケーショントレースもサポートしています。
   - ノードコレクターがアプリケーショントレースを受信しない場合は、`datadog/connector`、`traces` および `traces/sampling` パイプラインと、`metrics` パイプラインのレシーバーから `datadog/connector` を削除します。
   - ノードコレクターがアプリケーショントレースを受信する場合は、[推奨される Collector 構成][18]を使用して、`datadog/connector` をアップストリームの `forward/traces_sample` および `span_metrics` コネクタに置き換えます。

   `datadog` 拡張機能とそのエントリーを `service.extensions` の下に保持します。この拡張機能は、ホストのエンリッチメントに使用される Collector メタデータを報告します。テレメトリのエクスポートは行いません。

5. 両方のコレクターが同じクラスター名を報告していることを確認します。
   - 自動的に検出するには、`k8s_api` とプロバイダーの検出器を `resourcedetection.detectors` の下に保持し、他のクラウドプロバイダーの検出器を削除します。[EKS][14]、[AKS][16]、または [GKE][17] 用のプロバイダー検出器とその権限を構成します。
   - それ以外の場合は、`resourcedetection.detectors` を `[k8s_api]` に設定します。`resource/add-cluster-name` のコメントを解除し、両方のファイルで `<YOUR_CLUSTER_NAME>` を同じ値に置き換えます。`resourcedetection` を使用する各パイプラインで、その直後に `resource/add-cluster-name` を追加します。他のプロセッサーはそのままにしておきます。

6. values ファイルが含まれているディレクトリから次のコマンドを実行します。

   ```sh
   # Install the node Collector (DaemonSet)
   helm install otel-daemon-collector open-telemetry/opentelemetry-collector \
     --namespace default \
     -f daemonset-collector.yaml \
     --set image.repository=otel/opentelemetry-collector-contrib \
     --set image.tag=0.159.0

   # Install the cluster Collector (Deployment)
   helm install otel-cluster-collector open-telemetry/opentelemetry-collector \
     --namespace default \
     -f cluster-collector.yaml \
     --set image.repository=otel/opentelemetry-collector-contrib \
     --set image.tag=0.159.0
   ```

### セットアップを確認する {#verify-the-setup}

1. コレクターおよび `kube-state-metrics` ポッドが実行中で準備完了状態であることを確認します。

   ```sh
   kubectl get pods --namespace default \
     -l 'app.kubernetes.io/instance in (otel-daemon-collector,otel-cluster-collector,kube-state-metrics)'
   ```

2. [Kubernetes - Overview][1] ダッシュボードを開き、クラスターを選択します。ノードのリソース使用量および Kubernetes オブジェクトメトリクスを確認します。
3. [Kubernetes エクスプローラー][13]を開き、クラスター名でフィルタリングします。ポッドやデプロイメントなどのリソースが表示されることを確認します。

データが表示されない場合は、コレクターのログでエクスポートエラーを確認します。シークレットに、選択した Datadog サイトの API キーが含まれていることを確認します。

## トレースとインフラストラクチャーのメトリクスの関連付け (オプション) {#correlating-traces-with-infrastructure-metrics}

すでにトレースを送信しているアプリケーションの場合は、[unified service tagging][7] を使用して、アプリケーションのテレメトリとインフラストラクチャーのメトリクスを関連付けます。両方に同じリソース属性を設定します。

- `service.name` は Datadog `service` タグにマップされます。
- `service.version`は Datadog `version` タグにマップされます。
- `deployment.environment.name`は Datadog `env` タグにマップされます。

### アプリケーションの構成 {#application-configuration}

送信されるテレメトリにタグ付けするには、アプリケーションのコンテナ仕様で以下の環境変数を設定します。

```yaml
spec:
  containers:
    - name: my-container
      env:
        - name: OTEL_SERVICE_NAME
          value: "<SERVICE_NAME>"
        - name: OTEL_RESOURCE_ATTRIBUTES
          value: "service.version=<SERVICE_VERSION>,deployment.environment.name=<ENVIRONMENT>"
```

### インフラストラクチャー構成 {#infrastructure-configuration}

対応するアノテーションを Kubernetes `Deployment` メタデータに追加します。Collector の `k8sattributes` プロセッサーは、これらのアノテーションを使用して、インフラストラクチャーメトリクスにサービスコンテキストを付与します。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  annotations:
    # Use resource.opentelemetry.io/ for the k8sattributes processor
    resource.opentelemetry.io/service.name: "<SERVICE_NAME>"
    resource.opentelemetry.io/service.version: "<SERVICE_VERSION>"
    resource.opentelemetry.io/deployment.environment.name: "<ENVIRONMENT>"
spec:
  template:
    metadata:
      annotations:
        resource.opentelemetry.io/service.name: "<SERVICE_NAME>"
        resource.opentelemetry.io/service.version: "<SERVICE_VERSION>"
        resource.opentelemetry.io/deployment.environment.name: "<ENVIRONMENT>"
# ... rest of the manifest
```

## 収集データ {#data-collected}

このインテグレーションは、いくつかの OpenTelemetry レシーバーを使用してメトリクスを収集します。

### kube-state-metrics (Prometheus レシーバーを使用) {#kube-state-metrics-using-prometheus-receiver}

`kube-state-metrics` エンドポイントからスクレイピングされたメトリクスは、Kubernetes API オブジェクトの状態に関する情報を提供します。

### Kubelet 統計レシーバー {#kubelet-stats-receiver}

`kubeletstatsreceiver` は各ノードの Kubelet からメトリクスを収集し、ポッド、コンテナ、ボリュームのリソース使用量に焦点を当てます。

{{< mapping-table resource="kubeletstats.csv">}}

### Kubernetes クラスターレシーバー {#kubernetes-cluster-receiver}

`k8sclusterreceiver` は、ノード、ポッド、およびその他のオブジェクトのステータスや数など、クラスター レベルのメトリクスを収集します。

{{< mapping-table resource="k8scluster.csv">}}

### カウントコネクター{#count-connector}

[カウントコネクター][11]は、パイプラインを通過するメトリクス系列の数をカウントすることで、オブジェクトカウントメトリクスを生成します。これにより、次のメトリクスが生成されます。

{{< mapping-table resource="count-connector.csv">}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/86/kubernetes---overview
[2]: https://helm.sh/docs/intro/install/
[3]: https://github.com/DataDog/opentelemetry-examples/blob/main/guides/kubernetes/configuration/cluster-collector.yaml
[4]: https://github.com/DataDog/opentelemetry-examples/blob/main/guides/kubernetes/configuration/daemonset-collector.yaml
[5]: /ja/getting_started/site/
[6]: /ja/account_management/api-app-keys/#api-keys
[7]: /ja/getting_started/tagging/unified_service_tagging/?tab=kubernetes#opentelemetry
[8]: https://github.com/kubernetes/kube-state-metrics
[9]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/opentelemetry-collector-0.156.2/charts/opentelemetry-collector
[10]: /ja/containers/monitoring/kubernetes_explorer/
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/countconnector
[12]: /ja/containers/monitoring/kubernetes_explorer/?tab=opentelemetrycollector#limitations
[13]: https://app.datadoghq.com/orchestration/overview
[14]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#amazon-eks
[15]: /ja/containers/monitoring/kubernetes_explorer/?tab=opentelemetrycollector#enable-kubernetes-explorer
[16]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#azure-aks
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#gcp-metadata
[18]: /ja/opentelemetry/setup/collector_exporter/?tab=kubernetesmanifestreference#2-configure-and-deploy-the-collector