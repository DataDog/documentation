---
aliases:
- /ja/security/application_security/threats_detection/istio
- /ja/security/application_security/setup/istio
- /ja/security/application_security/setup/standalone/istio
code_lang: istio
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
title: Istio 向け App and API Protection の有効化
---
Istio サービスメッシュ内で App and API Protection を有効にすることで、インフラストラクチャーのエッジでトラフィックを検査および保護できます。これは、Istio Ingress Gateway またはサイドカーレベルで機能します。

## 前提条件 {#prerequisites}

始める前に、以下があることを確認します。

- [Istio][1] がインストールされた Kubernetes クラスターが実行中であること。
- Kubernetes クラスターに [Datadog Agent がインストールされ、構成されていること][2]。
  - Datadog UI を使用して攻撃者をブロックできるように、[Remote Configuration][3] を有効化して構成します。
  - Agent で [APM][4] を有効にします。これにより、セキュリティプロセッサーサービスが独自のトレースを Agent に送信できるようになります。
    - 必要に応じて、[Cluster Agent Admission Controller][5] を有効にして、Datadog Agent のホスト情報を App and API Protection セキュリティプロセッサーサービスに自動的に注入できるようにします。

## Kubernetes 向け App and API Protection による自動構成 {#automated-configuration-with-app-and-api-protection-for-kubernetes}

<div class="alert alert-info">
  <p>自動構成は<strong>サイドカーモード</strong>を使用します。セキュリティプロセッサーは、Istio ゲートウェイポッドにインジェクトされたコンテナとして実行されます。個別のプロセッサーデプロイは不要です。</p>
  <p><strong>外部モード</strong>のセットアップについては、<a href="/containers/kubernetes/appsec/">App and API Protection for Kubernetes</a> を参照してください。</p>
</div>

### セットアップ {#setup}

Helm または Datadog Operator を使用して、自動構成を有効にします。

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` に次の内容を追加します。

```yaml
datadog:
  appsec:
    injector:
      enabled: true
      # mode defaults to "sidecar" when omitted
```

Datadog Helm チャートをインストールまたはアップグレードします。

```bash
helm upgrade -i datadog-agent datadog/datadog -f values.yaml
```

{{% /tab %}}
{{% tab "Datadog Operator" %}}

`DatadogAgent` リソースにアノテーションを追加します。サイドカーモードがデフォルトであるため、インジェクターを有効にするだけで十分です。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/appsec.injector.enabled: "true"
```

以下を使って適用します。

```bash
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{< /tabs >}}

これを有効にすると、Datadog Cluster Agent によって次の処理が行われます。
- Istio ゲートウェイポッドにサイドカープロセッサーコンテナをインジェクトする
- トラフィックを同じ場所に配置されたサイドカープロセッサーにルーティングするための `EnvoyFilter` リソースを作成する
- 新しい Istio ゲートウェイを監視し、それらを自動的に構成する

作成されたフィルターを確認して、構成を**検証**します。

```bash
kubectl get envoyfilter -n istio-system
```

サイドカーリソースのチューニングおよびトラブルシューティングについては、[Kubernetes 向け App and API Protection][12] を参照してください。

## 手動構成 (代替方法) {#manual-configuration-alternative}

特定のゲートウェイまたはサイドカーをきめ細かく制御する場合は、以下の手動セットアップを使用します。これには 2 つのステップがあります。
1. Datadog セキュリティプロセッサーサービスをデプロイします。
2. Istio Ingress Gateway (またはサイドカー) からこのサービスへトラフィックを転送するための `EnvoyFilter` を設定します。

### ステップ 1: Datadog セキュリティプロセッサーサービスをデプロイする {#step-1-deploy-the-datadog-security-processor-service}

この gRPC サーバーは、Envoy からのリクエストとレスポンスを受信し、App and API Protection の分析を行います。

Istio Ingress Gateway からアクセス可能なネームスペースにデプロイします。Docker イメージは、[Datadog Go tracer GitHub レジストリ][6]にあります。

マニフェストの例 (`datadog-aap-extproc-service.yaml`):

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: datadog-aap-extproc-deployment
  namespace: <your-preferred-namespace> # Change to your preferred namespace, ensure it's resolvable by the Envoy proxy
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
        image: ghcr.io/datadog/dd-trace-go/service-extensions-callout:v2.2.2 # Replace with the latest released version
        ports:
        - name: grpc
          containerPort: 443 # Default gRPC port for the security processor
        - name: health
          containerPort: 80  # Default health check port
        env:
        # ---- Optional: Agent Configuration ----
        # If you enabled the Cluster Agent Admission Controller, you can skip this section as the Agent host information is automatically injected.
        # Otherwise, configure the address of your Datadog Agent for the security processor
        - name: DD_AGENT_HOST
          value: "<your-datadog-agent-service>.<your-datadog-agent-namespace>.svc.cluster.local"
        - name: DD_TRACE_AGENT_PORT # Optional if your Agent's trace port is the default 8126
          value: "8126"

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
  name: datadog-aap-extproc-service # This name will be used in the EnvoyFilter configuration
  namespace: <your-preferred-namespace> # Change to your preferred namespace, ensure it's resolvable by the Envoy proxy
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
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`       | `0`                 | 処理されるボディの最大サイズ (バイト単位)。`0` に設定した場合、ボディは処理されません。推奨値は `10000000` (10MB) です。(ボディの処理を完全に有効にするには、外部処理フィルター設定で `allow_mode_override` オプションも設定する必要があります) |
| `DD_SERVICE_EXTENSION_OBSERVABILITY_MODE` | `false`             | リクエストの非同期分析を有効にします。これにより、ブロッキング機能も無効になります。(監視可能性モードを完全に有効にするには、外部処理フィルター設定でこのオプションも設定する必要があります) |
| `DD_SERVICE`                              | `serviceextensions` | Datadog UI に表示されるサービス名。                                                                                                   |


以下の環境変数を使用して、セキュリティプロセッサーから Datadog Agent への接続を構成します。

| 環境変数                   | デフォルト値 | 説明                                                                      |
|----------------------------------------|---------------|----------------------------------------------------------------------------------|
| `DD_AGENT_HOST`                        | `localhost`   | Datadog Agent のホスト名または IP。                                           |
| `DD_TRACE_AGENT_PORT`                  | `8126`        | トレース収集用の Datadog Agent のポート。                                 |

セキュリティプロセッサーは [Datadog Go Tracer][7] 上に構築されており、そのすべての環境変数を継承します。[Go SDK の構成][8]および[App and API Protection ライブラリの構成][9]を参照してください。

<div class="alert alert-info">
  Datadog セキュリティプロセッサーは Datadog Go Tracer 上に構築されているため、通常は Tracer と同じリリースプロセスに従い、その Docker イメージには対応する Tracer バージョンのタグが付けられます (例:<code>v2.2.2</code>)。場合によっては、Tracer の公式リリースの合間に早期リリースバージョンが公開されることがあり、これらのイメージには次のようなサフィックスがタグ付けされます ( <code>-docker.1</code>。
</div>

### ステップ 2: EnvoyFilter を構成する {#step-2-configure-an-envoyfilter}

Istio Ingress Gateway またはサイドカープロキシからデプロイした `datadog-aap-extproc-service` にトラフィックを送信するための `EnvoyFilter` リソースを作成します。

{{< tabs >}}
{{% tab "Istio Ingress Gateway" %}}

Istio Ingress Gateway ですべてのトラフィック (North-South トラフィック) に App and API Protection を適用します。

以下のサンプルマニフェスト (`datadog-aap-gateway-filter.yaml`) は、`istio-system` ネームスペースにあるラベル `istio: ingressgateway` を持つデフォルトの Istio Ingress Gateway をターゲットにしています。

**注**: 提供されている構成サンプルを注意深く読み、ご自身のインフラストラクチャーと環境に合わせて調整してください。その他の構成オプションについては、[Envoy セキュリティプロセッサーのドキュメント](https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto)を参照してください。

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: EnvoyFilter
metadata:
  name: datadog-aap-gateway-filter
  namespace: <your-preferred-namespace> # Change to your preferred namespace, ensure it's resolvable by the Envoy proxy
spec:
  ## If workloadSelector is omitted, the following patches apply to Gateway pods in this EnvoyFilter's namespace
  ## Use workloadSelector to target a specific Gateway instance.
  # workloadSelector:
  #   labels:
  #     istio: ingressgateway # Label for the default Istio Gateway implementation
  configPatches:
    # Patch to add the External Processing Filter to the Gateway's HTTP connection manager
    - applyTo: HTTP_FILTER
      match:
        context: GATEWAY
        listener:
          filterChain:
            filter:
              name: "envoy.filters.network.http_connection_manager"
              subFilter:
                name: "envoy.filters.http.router"
      patch:
        # Insert this filter before the router filter. This filter needs to be the earliest filter in the chain to process malicious traffic before the data is sent to an application.
        operation: INSERT_BEFORE
        value:
          name: envoy.filters.http.ext_proc
          typed_config:
            "@type": type.googleapis.com/envoy.extensions.filters.http.ext_proc.v3.ExternalProcessor
            grpc_service:
              envoy_grpc:
                cluster_name: datadog_aap_ext_proc_cluster

              ## Mandatory: Correctly show the service as an Envoy proxy in the UI.
              initial_metadata:
                - key: x-datadog-envoy-integration
                  value: '1'

              ## A timeout configuration for the grpc connection exist but is not useful in our case.
              ## This timeout is for all the request lifetime. A timeout on the route is preferred.
              #timeout: 0s

            ## Optional: Enable fail open mode. Default is false.
            ## Normally, if the security processor fails or times out, the filter fails and Envoy
            ## returns a 5xx error to the downstream client. Setting this to true allows requests
            ## to continue without error if a failure occurs.
            failure_mode_allow: true # It won't cause 5xx error if an error occurs.

            ## Mandatory: Only enable the request and response header modes.
            ## If you want to enable body processing, please see the section below.
            processing_mode:
              request_header_mode: SEND
              response_header_mode: SEND

            ## Optional for headers analysis only but **mandatory** for body processing.
            ## The security processor can dynamically override the processing mode as needed instructing
            ## Envoy to forward request and response bodies to the security processor. Body processing is
            ## enabled when DD_APPSEC_BODY_PARSING_SIZE_LIMIT is set on the security processor container.
            allow_mode_override: true

            ## Optional: Set a timeout by processing message. Default is 200ms.
            ## There is a maxium of 2 messages per requests with headers only and 4 messages maximum
            ## with body processing enabled.
            ## Note: This timeout also includes the data communication between Envoy and the security processor.
            ## Optional: When the body processing is enabled, the timeout should be adjusted to accommodate
            ## the additional possible processing time. Larger payloads will require a longer timeout. 
            #message_timeout: 200ms

            ## Optional: Enable asynchronous mode analysis. Default is false.
            ## This mode will disable all blocking capabilities. The security processor should also be
            ## configured with the DD_SERVICE_EXTENSION_OBSERVABILITY_MODE environment variable.
            ## Beware, there is no flow control implemented in Envoy
            ## (cf https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto#envoy-v3-api-field-extensions-filters-http-ext-proc-v3-externalprocessor-observability-mode)
            #observability_mode: true
            ## Optional: When in asynchronous mode, the message_timeout is not used. This deferred
            ## timeout starts when the http request is finished, to let the security processor
            ## process all processing messages. Default is 5s.
            #deferred_close_timeout: 5s


    # Patch to add the cluster definition for the Datadog External Processing service
    - applyTo: CLUSTER
      match:
        context: GATEWAY
        cluster:
          service: "*"
      patch:
        operation: ADD
        value:
          name: "datadog_aap_ext_proc_cluster" # A unique name for this cluster configuration
          type: STRICT_DNS
          lb_policy: ROUND_ROBIN
          http2_protocol_options: {}
          transport_socket:
            name: envoy.transport_sockets.tls
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.transport_sockets.tls.v3.UpstreamTlsContext
              sni: "localhost"
          load_assignment:
            cluster_name: "datadog_aap_ext_proc_cluster"
            endpoints:
            - lb_endpoints:
              - endpoint:
                  address:
                    socket_address:
                      # Address of the Datadog security processor service
                      address: "datadog-aap-extproc-service.<your-preferred-namespace>.svc.cluster.local" # Adjust if your service name or namespace is different
                      port_value: 443
```

{{% /tab %}}
{{% tab "サイドカー" %}}

この構成は、サービスメッシュ内の特定のポッドの Istio サイドカープロキシをターゲットにすることでそれらのポッドに App and API Protection を適用します。これにより、どのサービスを保護するかについて、よりきめ細かな制御が可能になります。

以下は、ネームスペース `<your-application-namespace>` 内のラベル `app: <your-app-label>` を持つポッドをターゲットとするマニフェスト (`datadog-aap-sidecar-filter.yaml`) の例です。これらの設定は、特定のアプリケーションに合わせて更新する必要があります。

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: EnvoyFilter
metadata:
  name: datadog-aap-sidecar-filter
  namespace: <your-application-namespace> # Namespace of your application
spec:
  workloadSelector:
    labels:
      app: <your-app-label> # Label of your application pods
  configPatches:
    # Patch to add the External Processing HTTP Filter to the Sidecar's connection manager
    - applyTo: HTTP_FILTER
      match:
        context: SIDECAR_INBOUND
        listener:
          filterChain:
            filter:
              name: "envoy.filters.network.http_connection_manager"
              subFilter:
                name: "envoy.filters.http.router"
      patch:
        operation: INSERT_BEFORE
        value:
          name: envoy.filters.http.ext_proc
          typed_config:
            "@type": type.googleapis.com/envoy.extensions.filters.http.ext_proc.v3.ExternalProcessor
            grpc_service:
              envoy_grpc:
                cluster_name: datadog_aap_ext_proc_cluster

              ## Mandatory: Correctly show the service as an Envoy proxy in the UI.
              initial_metadata:
                - key: x-datadog-envoy-integration
                  value: '1'

              ## A timeout configuration for the grpc connection exist but is not useful in our case.
              ## This timeout is for all the request lifetime. A timeout on the route is preferred.
              #timeout: 0s

            ## Optional: Enable fail open mode. Default is false.
            ## Normally, if the security processor fails or times out, the filter fails and Envoy
            ## returns a 5xx error to the downstream client. Setting this to true allows requests
            ## to continue without error if a failure occurs.
            failure_mode_allow: true # It won't cause 5xx error if an error occurs.

            ## Mandatory: Only enable the request and response header modes.
            ## If you want to enable body processing, please see the section below.
            processing_mode:
              request_header_mode: SEND
              response_header_mode: SEND

            ## Optional for headers analysis only but **mandatory** for body processing.
            ## The security processor can dynamically override the processing mode as needed instructing
            ## Envoy to forward request and response bodies to the security processor. Body processing is
            ## enabled when DD_APPSEC_BODY_PARSING_SIZE_LIMIT is set on the security processor container.
            allow_mode_override: true

            ## Optional: Set a timeout by processing message. Default is 200ms.
            ## There is a maxium of 2 messages per requests with headers only and 4 messages maximum
            ## with body processing enabled.
            ## Note: This timeout also includes the data communication between Envoy and the security processor.
            ## Optional: When the body processing is enabled, the timeout should be adjusted to accommodate
            ## the additional possible processing time. Larger payloads will require a longer timeout. 
            #message_timeout: 200ms

            ## Optional: Enable asynchronous mode analysis. Default is false.
            ## This mode will disable all blocking capabilities. The security processor should also be
            ## configured with the DD_SERVICE_EXTENSION_OBSERVABILITY_MODE environment variable.
            ## Beware, there is no flow control implemented in Envoy
            ## (cf https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto#envoy-v3-api-field-extensions-filters-http-ext-proc-v3-externalprocessor-observability-mode)
            #observability_mode: true
            ## Optional: When in asynchronous mode, the message_timeout is not used. This deferred
            ## timeout starts when the http request is finished, to let the security processor
            ## process all processing messages. Default is 5s.
            #deferred_close_timeout: 5s


    # Patch to add the Cluster definition for the Datadog External Processing service
    - applyTo: CLUSTER
      match:
        context: SIDECAR_INBOUND
        cluster:
          service: "*"
      patch:
        operation: ADD
        value:
          name: "datadog_aap_ext_proc_cluster" # A unique name for this cluster configuration
          type: STRICT_DNS
          lb_policy: ROUND_ROBIN
          http2_protocol_options: {}
          transport_socket:
            name: envoy.transport_sockets.tls
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.transport_sockets.tls.v3.UpstreamTlsContext
              sni: "localhost"
          load_assignment:
            cluster_name: "datadog_aap_ext_proc_cluster"
            endpoints:
            - lb_endpoints:
              - endpoint:
                  address:
                    socket_address:
                      # Address of the Datadog security processor service
                      address: "datadog-aap-extproc-service.<your-preferred-namespace>.svc.cluster.local" # Adjust if your service name or namespace is different
                      port_value: 443
```

{{% /tab %}}
{{< /tabs >}}

`EnvoyFilter` を適用すると、Datadog セキュリティプロセッサーが Istio Ingress Gateway または選択されたサイドカーによるトラフィックの処理を開始します。

### ステップ 3: 検証する {#step-3-validate}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="シグナルエクスプローラーとその詳細、および脆弱性エクスプローラーとその詳細を示す動画。" video="true" >}}

## 制限事項 {#limitations}

既知の制限事項:

* リクエストおよび応答本文の検査は、Datadog セキュリティプロセッサー画像バージョン `v2.2.2` 以降を使用している場合にサポートされます。

Istio インテグレーションの互換性に関する詳細については、[Istio インテグレーションの互換性ページ][11]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://istio.io/
[2]: /ja/containers/kubernetes/installation/?tab=datadogoperator
[3]: /ja/agent/remote_config/?tab=helm#enabling-remote-configuration
[4]: /ja/tracing/guide/setting_up_apm_with_kubernetes_service/?tab=datadogoperator
[5]: /ja/tracing/guide/setting_up_apm_with_kubernetes_service/?tab=datadogoperator#cluster-agent-admission-controller
[6]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
[7]: https://github.com/DataDog/dd-trace-go
[8]: /ja/tracing/trace_collection/library_config/go/
[9]: /ja/security/application_security/policies/library_configuration/
[10]: https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto
[11]: /ja/security/application_security/setup/compatibility/istio
[12]: /ja/containers/kubernetes/appsec/