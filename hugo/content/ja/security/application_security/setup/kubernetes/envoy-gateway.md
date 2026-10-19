---
aliases:
- /ja/security/application_security/setup/envoy-gateway
code_lang: envoy-gateway
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/envoyproxy/go-control-plane/cmd/serviceextensions
  tag: ソースコード
  text: Envoy インテグレーションのソースコード
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: OOTB App and API Protection ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: App and API Protection のトラブルシューティング
title: Envoy Gateway 向け App and API Protection の有効化
---
[Envoy Gateway][1] によって管理されるトラフィックに対して Datadog [App and API Protection][12] を有効にすることで、インフラストラクチャーのエッジでトラフィックを検査および保護できます。

## 前提条件 {#prerequisites}

- [Envoy Gateway][1] がインストールされた Kubernetes クラスターが実行中であること。
- Kubernetes クラスターに [Datadog Agent がインストールされ、構成されていること][2]。
  - Datadog UI を使用して攻撃者をブロックできるように、[Remote Configuration][3] を有効化して構成します。
  - セキュリティプロセッサーサービスが独自のトレースを Agent に送信できるように、Agent で [APM][4] を有効化します。
    - 必要に応じて、[Cluster Agent Admission Controller][5] を有効にして、Datadog Agent のホスト情報を App and API Protection セキュリティプロセッサーサービスに自動的に注入できるようにします。

## Kubernetes 向け App and API Protection による自動構成 {#automated-configuration-with-app-and-api-protection-for-kubernetes}

<div class="alert alert-info">
  自動構成では、セキュリティプロセッサーのデプロイと、 <code>EnvoyExtensionPolicy</code> 作成が行われます。これは、ほとんどのユーザーに推奨されるアプローチです。
</div>

### セットアップ {#setup}

1. **以下の「[Datadog セキュリティプロセッサーサービスをデプロイする](#step-1-deploy-the-datadog-security-processor-service)」に示されているデプロイマニフェストを使用して、セキュリティプロセッサーをデプロイします**。
2. **Datadog Operator または Helm を使用して、自動構成を有効にします**。

   {{< tabs >}}
   {{% tab "Datadog Operator" %}}

   `DatadogAgent` リソースにアノテーションを追加します。サービス名のアノテーションは必須であり、ご使用のセキュリティプロセッサーサービスと一致している必要があります。

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
     annotations:
       agent.datadoghq.com/appsec.injector.enabled: "true"
       agent.datadoghq.com/appsec.injector.processor.service.name: "datadog-aap-extproc-service"  # Required
       agent.datadoghq.com/appsec.injector.processor.service.namespace: "datadog"
   spec:
     override:
       clusterAgent:
         env:
           - name: DD_CLUSTER_AGENT_APPSEC_INJECTOR_MODE
             value: "external"
   ```

   コンフィギュレーションを適用します。

   ```bash
   kubectl apply -f datadog-agent.yaml
   ```

   {{% /tab %}}
   {{% tab "Helm" %}}

   `values.yaml` に次の内容を追加します。

   ```yaml
   datadog:
     appsec:
       injector:
         enabled: true
         mode: "external"
         processor:
           service:
             name: datadog-aap-extproc-service  # Required: must match your security processor service name
             namespace: datadog                 # Must match the namespace where the service is deployed
   ```

   Datadog Helm チャートをインストールまたはアップグレードします。

   ```bash
   helm upgrade -i datadog-agent datadog/datadog -f values.yaml
   ```

   {{% /tab %}}
   {{< /tabs >}}

   これを有効にすると、Datadog Cluster Agent によって次の処理が行われます。
   - Envoy Gateway のインストールを検出します。
   - 各ゲートウェイの `EnvoyExtensionPolicy` リソースを作成します。
   - トラフィックをセキュリティプロセッサーにルーティングするようにポリシーを構成します。
3. **作成されたポリシーを確認して、構成を検証**します。
   ```bash
   kubectl get envoyextensionpolicy -A
   ```

構成オプションおよびトラブルシューティングについては、「[Kubernetes 向け App and API Protection][13]」を参照してください。

## 手動構成 (代替方法) {#manual-configuration-alternative}

特定のゲートウェイをきめ細かく制御する場合は、手動セットアップを使用します。

1. クラスターに Datadog セキュリティプロセッサーサービスをデプロイします。
2. このサービスを指す `EnvoyExtensionPolicy` を構成します。

### ステップ 1: Datadog セキュリティプロセッサーサービスをデプロイする {#step-1-deploy-the-datadog-security-processor-service}

この gRPC サーバーは、Envoy からのリクエストとレスポンスを受信し、App and API Protection の分析を行います。

Envoy Gateway からアクセス可能な名前空間にデプロイします。Docker イメージは、[Datadog Go tracer GitHub レジストリ][6] にあります。

マニフェストの例 (`datadog-aap-extproc-service.yaml`):

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: datadog-aap-extproc-deployment
  namespace: <your-preferred-namespace> # Change to your preferred namespace, ensure it's resolvable by the Envoy Gateway
  labels:
    app: datadog-aap-extproc
spec:
  replicas: 1 # Adjust replica count based on your load
  selector:
    matchLabels:
      app: datadog-aap-extproc
  template:
    metadata:
      labels:
        app: datadog-aap-extproc
    spec:
      containers:
      - name: datadog-aap-extproc-container
        image: ghcr.io/datadog/dd-trace-go/service-extensions-callout:v2.4.0 # Replace with the latest released version
        ports:
        - name: grpc
          containerPort: 443 # Default gRPC port for the security processor
        - name: health
          containerPort: 80  # Default health check port
        env:
        # Optional: Agent Configuration
        # If you enabled the Cluster Agent Admission Controller, you can skip this section as the Agent host information is automatically injected.
        # Otherwise, configure the address of your Datadog Agent for the security processor
        - name: DD_AGENT_HOST
          value: "<your-datadog-agent-service>.<your-datadog-agent-namespace>.svc.cluster.local"
        - name: DD_TRACE_AGENT_PORT # Optional if your Agent's trace port is the default 8126
          value: "8126"

        # Disable TLS for communication between Envoy Gateway and the security processor. Default is true.
        # Cannot be enabled for now
        - name: DD_SERVICE_EXTENSION_TLS
          value: "false"

        readinessProbe:
          httpGet:
            path: /
            port: health
          initialDelaySeconds: 5
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /
            port: health
          initialDelaySeconds: 15
          periodSeconds: 20
---
apiVersion: v1
kind: Service
metadata:
  name: datadog-aap-extproc-service # This name will be used in the EnvoyExtensionPolicy configuration
  namespace: <your-preferred-namespace> # Change to your preferred namespace, ensure it's resolvable by the Envoy Gateway
  labels:
    app: datadog-aap-extproc
spec:
  ports:
  - name: grpc
    port: 443
    targetPort: grpc
    protocol: TCP
  selector:
    app: datadog-aap-extproc
  type: ClusterIP
```

#### セキュリティプロセッサーの構成オプション {#configuration-options-for-the-security-processor}

Datadog セキュリティプロセッサーでは、以下の設定が公開されます。

| 環境変数                      | デフォルト値       | 説明                                                                                                                              |
|-------------------------------------------|---------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_SERVICE_EXTENSION_HOST`               | `0.0.0.0`           | gRPC サーバーのリスニングアドレス。                                                                                                          |
| `DD_SERVICE_EXTENSION_PORT`               | `443`               | gRPC サーバーのポート。                                                                                                                       |
| `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`   | `80`                | ヘルスチェック用の HTTP サーバーポート。                                                                                                     |
| `DD_SERVICE_EXTENSION_TLS`                | `true`          | gRPC TLS レイヤーを有効にします。                                                                                                     |
| `DD_SERVICE_EXTENSION_TLS_KEY_FILE`       | `localhost.key` | デフォルトの gRPC TLS レイヤーキーを変更します。                                                                          |
| `DD_SERVICE_EXTENSION_TLS_CERT_FILE`      | `localhost.crt` | デフォルトの gRPC TLS レイヤー証明書を変更します。                                                                          |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`       | `10485760`                 | 処理されるボディの最大サイズ (バイト単位)。`0` に設定した場合、ボディは処理されません。推奨値は `10485760` (10MB) です。(ボディの処理を完全に有効にするには、[External Processing] (外部処理) フィルター設定で `allowModeOverride` オプションも設定する必要があります。)|
| `DD_SERVICE`                              | `serviceextensions` |  Datadog UI に表示されるサービス名。                                                                                                   |


以下の環境変数を使用して、セキュリティプロセッサーから Datadog Agent への接続を構成します。

| 環境変数                   | デフォルト値 | 説明                                                                      |
|----------------------------------------|---------------|----------------------------------------------------------------------------------|
| `DD_AGENT_HOST`                        | `localhost`   | Datadog Agent のホスト名または IP。                                           |
| `DD_TRACE_AGENT_PORT`                  | `8126`        | トレース収集用の Datadog Agent のポート。                                 |

セキュリティプロセッサーは [Datadog Go Tracer][7] 上に構築されており、そのすべての環境変数を継承します。「[Go SDK の構成][8]」および「[App and API Protection ライブラリの構成][9]」を参照してください。

<div class="alert alert-info">
  Datadog セキュリティプロセッサーは Datadog Go Tracer 上に構築されているため、通常は Tracer と同じリリースプロセスに従い、その Docker イメージには対応する Tracer バージョンのタグが付けられます (<code>v2.2.2</code>など)。場合によっては、Tracer の公式リリースの合間に早期リリースバージョンが公開されることがあり、これらのイメージには次のようなサフィックスがタグ付けされます ( <code>-docker.1</code>)。
</div>

### ステップ 2: EnvoyExtensionPolicy を構成する {#step-2-configure-an-envoyextensionpolicy}

`EnvoyExtensionPolicy` を使用して、Datadog セキュリティプロセッサーを呼び出すよう Envoy Gateway に指示します。このポリシーは、ゲートウェイまたは特定の HTTPRoute/GRPCRoute リソースにアタッチできます。

これにより、選択したゲートウェイ上のすべてのトラフィックがセキュリティプロセッサーに送信されます。マニフェストの例 (`datadog-aap-extproc-eep.yaml`):

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: EnvoyExtensionPolicy
metadata:
  name: datadog-aap-extproc-eep
  namespace: <your-preferred-namespace> # same namespace as the Gateway
spec:
  targetRefs:
  # Target the entire Gateway
  - group: gateway.networking.k8s.io
    kind: Gateway
    name: <your-gateway-name> # update to your specific gateway name
  # Target specific HTTPRoutes/GRPCRoutes
  #- group: gateway.networking.k8s.io
  #  kind: HTTPRoute
  #  name: <your-http-route-name>
  extProc:
  - backendRefs:
    - group: ""
      kind: Service
      name: datadog-aap-extproc-service
      namespace: <your-preferred-namespace> # namespace of the security processor Service
      port: 443

    # Optional: Enable fail open mode. Default is false.
    # Normally, if the security processor fails or times out, the filter fails and Envoy
    # returns a 5xx error to the downstream client. Setting this to true allows requests
    # to continue without error if a failure occurs.
    failOpen: true

    # Optional: Set a timeout by processing message. Default is 200ms.
    # There is a maxium of 2 messages per requests with headers only and 4 messages maximum
    # with body processing enabled.
    # Note: This timeout also includes the data communication between Envoy and the security processor.
    # The timeout should be adjusted to accommodate the additional possible processing time.
    # Larger payloads will require a longer timeout.
    messageTimeout: 200ms

    processingMode:
      # The security processor can dynamically override the processing mode as needed, instructing
      # Envoy to forward request and response bodies to the security processor.
      allowModeOverride: true
      # Only enable the request and response header modes by default.
      request: {}
      response: {}
```

#### ネームスペース間参照 {#crossnamespace-reference}

セキュリティプロセッサー `Service` がポリシーとは**異なるネームスペース**にある場合は、プロセッサーのネームスペースに [ReferenceGrant][10] を追加します。追加するには、`datadog-aap-eep-rg.yaml` などのマニフェストを使用します。

```yaml
apiVersion: gateway.networking.k8s.io/v1beta1
kind: ReferenceGrant
metadata:
  name: datadog-aap-eep-rg
  namespace: <your-extproc-namespace>   # namespace of the security processor Service
spec:
  from:
  - group: gateway.envoyproxy.io
    kind: EnvoyExtensionPolicy
    namespace: <your-policy-namespace>  # namespace of the EnvoyExtensionPolicy (and the Gateway)
  to:
  - group: ""
    kind: Service
    name: datadog-aap-extproc-service
```

### ステップ 3: 検証する {#step-3-validate}

ポリシーを適用すると、対象のゲートウェイ/ルートを通過するトラフィックが App and API Protection によって検査されるようになります。

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="シグナルエクスプローラーとその詳細、および脆弱性エクスプローラーとその詳細を示すビデオ。" video="true" >}}

## 制限事項 {#limitations}

監視可能モード (非同期分析) は Envoy Gateway では使用できません。

Envoy Gateway インテグレーションの互換性に関する詳細については、「[Envoy Gateway インテグレーションの互換性ページ][11]」を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://gateway.envoyproxy.io/docs/
[2]: /ja/containers/kubernetes/installation/?tab=datadogoperator
[3]: /ja/agent/remote_config/?tab=helm#enabling-remote-configuration
[4]: /ja/tracing/guide/setting_up_apm_with_kubernetes_service/?tab=datadogoperator
[5]: /ja/tracing/guide/setting_up_apm_with_kubernetes_service/?tab=datadogoperator#cluster-agent-admission-controller
[6]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
[7]: https://github.com/DataDog/dd-trace-go
[8]: /ja/tracing/trace_collection/library_config/go/
[9]: /ja/security/application_security/policies/library_configuration/
[10]: https://gateway-api.sigs.k8s.io/api-types/referencegrant/
[11]: /ja/security/application_security/setup/compatibility/envoy-gateway
[12]: /ja/security/application_security/
[13]: /ja/containers/kubernetes/appsec