## Datadog Operator のバージョン 1.0 に移行する

<div class="alert alert-warning">
Operator での <code>v1alpha1</code> <code>DatadogAgent</code> の照合は、v1.2.0+ 以降非推奨となっており、v1.7.0 で削除される予定です。削除後は、Datadog Operator で <code>v1alpha1</code> <code>DatadogAgent</code> CRD の照合を構成できなくなります。ただし、<code>datadogCRDs.migration.datadogAgents.conversionWebhook.enabled</code> を使用して、変換 Webhook を有効にした <code>v1alpha1</code> マニフェストを適用することはできます。
</div>

<div class="alert alert-warning">
<code>DatadogAgent</code> <code>v1alpha1</code> と変換 Webhook は、v1.8.0 で削除される予定です。削除後は、以前のバージョンの Operator を使用しない限り、移行できなくなります。
</div>


Datadog Operator v0.X では、DatadogAgent カスタムリソースの `v1alpha1` を使用しています。Datadog Operator v1.X は `v2alpha1` を調整します。

このガイドでは、`v1alpha1/DatadogAgent` から `v2alpha1/DatadogAgent` のカスタムリソースに移行する方法について説明します。

### 要件

0.X バージョンの Datadog Operator で `v1alpha1` を使用していて、アップグレードしたい場合は、変換 Webhook 機能を使用する必要があります。

まず、チャートの必要最小限のバージョンとその依存関係を確認することから始めます。

```
名前                    チャートバージョン   アプリバージョン 説明
datadog/datadog-crds    1.0.0           1           Datadog Kubernetes CRDs chart
```

Datadog Operator チャートの場合

```
名前                        チャートバージョン   アプリバージョン 説明
datadog/datadog-operator    1.0.0           1.0.0       Datadog Operator
```

#### cert マネージャーのインストール
まだ cert マネージャーをお持ちでない場合は、Helm でインストールします。

チャートを追加します。

```
helm repo add jetstack https://charts.jetstack.io
```

そして、インストールします。

```
 helm install \
  cert-manager jetstack/cert-manager \
  --version v1.11.0 \
  --set installCRDs=true
```

### 移行

以下のコマンドを実行して、Datadog Operator を再デプロイし、DatadogAgent のバージョン `v2alpha1` を保存するように Kubernetes を構成します。

```
helm upgrade \
    datadog-operator datadog/datadog-operator \
    --set image.tag=1.0.0 \
    --set datadogCRDs.migration.datadogAgents.version=v2alpha1 \
    --set datadogCRDs.migration.datadogAgents.useCertManager=true \
    --set datadogCRDs.migration.datadogAgents.conversionWebhook.enabled=true
```

これにより、変換 webhook サーバー (Datadog Operator が実行) は、既存の DatadogAgent オブジェクトを変換します。

`v1alpha1` のバージョンを持っていて移行する場合は、変換したバージョンを保存して、変換したバージョンのみのデプロイを開始することをお勧めします。`v2alpha1`の DatadogAgent のみをデプロイしたら、変換 Webhook を無効にすることができます。

### 注

`datadog-operator` チャートのバージョン 1.0.0 から、フィールド `image.tag` のデフォルト値は `1.0.0` で、`datadogCRDs.migration.datadogAgents.version` は `v2alpha1` です。

これは、Datadog Operator のバージョン &lt; 1.0.0、保存バージョン `v1alpha1` から GA バージョン `1.0.0`、保存バージョン `v2alpha1` への移行を説明するコマンドに設定されているものです。

### 実装の詳細

これは、証明書マネージャーが DatadogAgent CRD を変異させ、API Server が変換 webhook に連絡するために使用する `caBundle` を文書化するために使用する自己署名証明書 (発行元を使用) を作成します。

Datadog Operator は `v2alpha1` オブジェクトのリコンサイラーを実行し、ポート 9443 で公開される変換 webhook サーバーを起動します。API Server はこのサーバーを使用して `v1alpha1` DatadogAgent を `v2alpha1` に変換します。

### ライフサイクル

変換 webhook は無期限で実行するものではありません。Datadog は、過渡期にオブジェクトを移行するためにのみ推奨しています。

変換後は、DatadogAgent の新しいバージョンを保存し、変換を無効にして、`v2alpha1` オブジェクトのみをデプロイすることができます。

### Troubleshooting

#### DatadogAgent リソースの `v2alpha1` バージョンが見当たりません。

`v1alpha1` と `v2alpha1` が提供されるため、どちらのバージョンを見たいかを指定する必要があるかもしれません。

```
kubectl get datadogagents.v2alpha1.datadoghq.com datadog-agent
```

#### 変換がうまくいきません。

Datadog Operator ポッドのログには、変換 webhook が有効になっていること、サーバーが稼働していること、証明書がウォッチされていることが表示されるはずです。

```
kubectl logs datadog-operator-XXX-YYY
[...]
{"level":"INFO","ts":"2023-02-16T16:47:07Z","logger":"controller-runtime.webhook","msg":"Registering webhook","path":"/convert"}
{"level":"INFO","ts":"2023-02-16T16:47:07Z","logger":"controller-runtime.builder","msg":"Conversion webhook enabled","GVK":"datadoghq.com/v2alpha1, Kind=DatadogAgent"}
{"level":"INFO","ts":"2023-02-16T16:47:07Z","logger":"setup","msg":"starting manager"}
{"level":"INFO","ts":"2023-02-16T16:47:07Z","logger":"controller-runtime.webhook.webhooks","msg":"Starting webhook server"}
{"level":"INFO","ts":"2023-02-16T16:47:07Z","logger":"controller-runtime.certwatcher","msg":"Updated current TLS certificate"}
{"level":"INFO","ts":"2023-02-16T16:47:07Z","logger":"controller-runtime.webhook","msg":"Serving webhook server","host":"","port":9443}
{"level":"INFO","ts":"2023-02-16T16:47:07Z","msg":"Starting server","path":"/metrics","kind":"metrics","addr":"0.0.0.0:8383"}
{"level":"INFO","ts":"2023-02-16T16:47:07Z","msg":"Starting server","kind":"health probe","addr":"0.0.0.0:8081"}
{"level":"INFO","ts":"2023-02-16T16:47:07Z","logger":"controller-runtime.certwatcher","msg":"Starting certificate watcher"}
[...]
```

#### 登録されたエンドポイントの変換に登録されたサービスを確認するにはどうすればよいですか？

```
kubectl describe service datadog-operator-webhook-service
[...]
Name:              datadog-operator-webhook-service
Namespace:         default
[...]
Selector:          app.kubernetes.io/instance=datadog-operator,app.kubernetes.io/name=datadog-operator
[...]
Port:              <unset>  443/TCP
TargetPort:        9443/TCP
Endpoints:         10.88.3.28:9443
```

#### 変換 webhook の登録サービスを確認するにはどうすればよいですか？

```
kubectl describe crd datadogagents.datadoghq.com
[...]
  Conversion:
    Strategy:  Webhook
    Webhook:
      Client Config:
        Ca Bundle:  LS0t[...]UtLS0tLQo=
        Service:
          Name:       datadog-operator-webhook-service
          Namespace:  default
          Path:       /convert
          Port:       443
      Conversion Review Versions:
        v1
```

#### CRD に `caBundle` がありません。

CRD に正しいアノテーション `cert-manager.io/inject-ca-from: default/datadog-operator-serving-cert` があることを確認します。また、`cert-manager-cainjector` ポッドのログを確認します。

目立つものがない場合は、ログレベルを 5 (デバッグ) に設定するとよいでしょう。

```
kubectl edit deploy cert-manager-cainjector -n cert-manager
[...]
    spec:
      containers:
      - args:
        - --v=5
[...]
```

以下などのログが表示されるはずです。

```
[...]
I0217 08:11:15.582479       1 controller.go:178] cert-manager/certificate/customresourcedefinition/generic-inject-reconciler "msg"="updated object" "resource_kind"="CustomResourceDefinition" "resource_name"="datadogagents.datadoghq.com" "resource_namespace"="" "resource_version"="v1"
I0217 08:25:24.989209       1 sources.go:98] cert-manager/certificate/customresourcedefinition/generic-inject-reconciler "msg"="Extracting CA from Certificate resource" "certificate"="default/datadog-operator-serving-cert" "resource_kind"="CustomResourceDefinition" "resource_name"="datadogagents.datadoghq.com" "resource_namespace"="" "resource_version"="v1"
[...]
```
### ロールバック

`v2alpha1` を使って Datadog Operator の新バージョンに移行したが、旧バージョンにロールバックしたい場合、Datadog は次のように推奨しています。
- Datadog Operator のデプロイを 0 レプリカにスケーリングする。
  ```
  kubectl scale deploy datadog-operator --replicas=0
  ```
- チャートをアップグレードして `v1alpha1` を保存し、Datadog Operator が 0.8.X イメージを使用するようにする。
  ```
  helm upgrade \
    datadog-operator datadog/datadog-operator \
    --set image.tag=0.8.4 \
    --set datadogCRDs.migration.datadogAgents.version=v1alpha1 \
    --set datadogCRDs.migration.datadogAgents.useCertManager=false \
    --set datadogCRDs.migration.datadogAgents.conversionWebhook.enabled=false
  ```
- 以前の DatadogAgent `v1alpha1` オブジェクトを再デプロイする。

**注**: Datadog Agent の DaemonSet は、このプロセスでロールバックされます。
