---
aliases:
- /ko/security/application_security/threats_detection/istio
- /ko/security/application_security/setup/istio
- /ko/security/application_security/setup/standalone/istio
code_lang: istio
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/envoyproxy/go-control-plane/cmd/serviceextensions
  tag: 소스 코드
  text: Envoy 통합 소스 코드
- link: /security/default_rules/?category=cat-application-security
  tag: 문서
  text: OOTB App and API Protection 규칙
- link: /security/application_security/troubleshooting
  tag: 문서
  text: App and API Protection 문제 해결하기
title: Istio용 App and API Protection 활성화
---
Istio 서비스 메시 내에서 App and API Protection을 활성화하여 인프라 에지에서 트래픽을 검사하고 보호할 수 있습니다. 이는 Istio Ingress Gateway 또는 사이드카 수준에서 작동합니다.

## 전제 조건 {#prerequisites}

시작하기 전에 다음이 있는지 확인하세요.

- [Istio][1]가 설치된 실행 중인 Kubernetes 클러스터가 있습니다.
- Kubernetes 클러스터에 [Datadog Agent가 설치 및 구성][2]되어 있습니다.
  - [Remote Configuration][3]을 활성화 및 구성하여 Datadog UI를 통해 공격자를 차단할 수 있게 합니다.
  - Agent에서 [APM][4]을 활성화합니다. 이를 통해 보안 프로세서 서비스가 자체 트레이스를 Agent로 보낼 수 있습니다.
    - 필요시 [Cluster Agent Admission Controller][5]를 활성화하여 Datadog Agent 호스트 정보를 App and API Protection 보안 프로세서 서비스에 자동으로 주입합니다.

## Kubernetes용 App and API Protection을 사용한 자동화된 구성 {#automated-configuration-with-app-and-api-protection-for-kubernetes}

<div class="alert alert-info">
  <p>자동화된 구성은 <strong>사이드카 모드</strong>를 사용합니다. 보안 프로세서가 Istio 게이트웨이 포드에 주입된 컨테이너로 실행됩니다. 별도의 프로세서 배포가 필요하지 않습니다.</p>
  <p><strong>외부 모드</strong> 설정은 <a href="/containers/kubernetes/appsec/">Kubernetes용 App and API Protection</a>을 참조하세요.</p>
</div>

### 설정 {#setup}

Helm 또는 Datadog Operator를 사용하여 자동 구성을 활성화합니다.

{{< tabs >}}
{{% tab "Helm" %}}

다음 내용을 `values.yaml`에 추가합니다.

```yaml
datadog:
  appsec:
    injector:
      enabled: true
      # mode defaults to "sidecar" when omitted
```

Datadog Helm 차트를 설치하거나 업그레이드합니다.

```bash
helm upgrade -i datadog-agent datadog/datadog -f values.yaml
```

{{% /tab %}}
{{% tab "Datadog Operator" %}}

`DatadogAgent` 리소스에 주석을 추가합니다. 사이드카 모드가 기본값이므로 주입기를 활성화하는 것만으로 충분합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/appsec.injector.enabled: "true"
```

다음을 적용합니다.

```bash
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{< /tabs >}}

이를 활성화하면 Datadog Cluster Agent는 다음을 수행합니다.
- Istio 게이트웨이 포드에 사이드카 프로세서 컨테이너를 주입합니다.
- 트래픽을 동일 위치의 사이드카 프로세서로 라우팅하기 위한 `EnvoyFilter` 리소스를 생성합니다.
- 새로운 Istio 게이트웨이를 모니터링하고 자동으로 구성합니다.

생성된 필터를 확인하여 구성을 **검증합니다**.

```bash
kubectl get envoyfilter -n istio-system
```

사이드카 리소스 조정 및 문제 해결은 [Kubernetes용 App and API Protection][12]을 참조하세요.

## 수동 구성(대안) {#manual-configuration-alternative}

특정 게이트웨이나 사이드카를 세부적으로 제어하려면 아래의 수동 설정을 사용하세요. 다음 두 단계로 진행됩니다.
1. Datadog 보안 프로세서 서비스를 배포합니다.
2. Istio Ingress Gateway(또는 사이드카)에서 이 서비스로 트래픽을 전달하도록 `EnvoyFilter`를 구성합니다.

### 1단계: Datadog 보안 프로세서 서비스 배포 {#step-1-deploy-the-datadog-security-processor-service}

이 gRPC 서버는 App and API Protection 분석을 위해 Envoy로부터 요청과 응답을 수신합니다.

Istio Ingress Gateway에서 액세스할 수 있는 네임스페이스에 배포하세요. Docker 이미지는 [Datadog Go tracer GitHub 레지스트리][6]에 있습니다.

매니페스트 예시(`datadog-aap-extproc-service.yaml`):

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

#### 보안 프로세서 구성 옵션 {#configuration-options-for-the-security-processor}

Datadog 보안 프로세서는 다음과 같은 설정을 제공합니다.

| 환경 변수                      | 기본값       | 설명                                                                                                                              |
|-------------------------------------------|---------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_SERVICE_EXTENSION_HOST`               | `0.0.0.0`           | gRPC 서버 수신 주소입니다.                                                                                                           |
| `DD_SERVICE_EXTENSION_PORT`               | `443`               | gRPC 서버 포트입니다.                                                                                                                        |
| `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`   | `80`                | 서비스 상태 점검을 위한 HTTP 서버 포트입니다.                                                                                                      |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`       | `0`                 | 처리할 본문의 최대 크기(바이트)입니다. `0`으로 설정하면 본문이 처리되지 않습니다. 권장 값은 `10000000`(10MB)입니다. (본문 처리를 완전히 활성화하려면 External Processing 필터 구성에서 `allow_mode_override` 옵션도 설정해야 합니다.) |
| `DD_SERVICE_EXTENSION_OBSERVABILITY_MODE` | `false`             | 요청의 비동기 분석을 활성화합니다. 또한 차단 기능을 비활성화합니다. (관측 가능성 모드를 완전히 활성화하려면 External Processing 필터 구성에서 이 옵션도 설정해야 합니다.) |
| `DD_SERVICE`                              | `serviceextensions` | Datadog UI에 표시되는 서비스 이름입니다.                                                                                                    |


다음 환경 변수를 사용하여 보안 프로세서에서 Datadog Agent로의 연결을 구성하세요.

| 환경 변수                   | 기본값 | 설명                                                                      |
|----------------------------------------|---------------|----------------------------------------------------------------------------------|
| `DD_AGENT_HOST`                        | `localhost`   | Datadog Agent의 호스트 이름 또는 IP입니다.                                            |
| `DD_TRACE_AGENT_PORT`                  | `8126`        | 트레이스 수집용 Datadog Agent 포트입니다.                                  |

보안 프로세서는 [Datadog Go Tracer][7]를 기반으로 구축되었으며 해당 환경 변수를 모두 상속합니다. [Go SDK 구성][8] 및 [App and API Protection 라이브러리 구성][9]을 참조하세요.

<div class="alert alert-info">
  Datadog 보안 프로세서는 Datadog Go Tracer를 기반으로 구축되었으므로 일반적으로 트레이서와 동일한 릴리스 프로세스를 따르며, Docker 이미지에는 해당 트레이서 버전 태그가 지정됩니다(예: <code>v2.2.2</code>). 경우에 따라 공식 트레이서 릴리스 사이에 초기 릴리스 버전이 게시될 수 있으며, 해당 이미지에는 <code>-docker.1</code>과 같은 접미사가 태그로 지정됩니다.
</div>

### 2단계: EnvoyFilter 구성 {#step-2-configure-an-envoyfilter}

Istio Ingress Gateway 또는 사이드카 프록시에서 배포한 `EnvoyFilter`로 트래픽을 보내려면 `datadog-aap-extproc-service` 리소스를 생성하세요.

{{< tabs >}}
{{% tab "Istio Ingress Gateway" %}}

Istio Ingress Gateway를 통과하는 모든 트래픽(North-South 트래픽)에 App and API Protection을 적용합니다.

다음 매니페스트 예시(`datadog-aap-gateway-filter.yaml`)는 `istio-system` 네임스페이스에 있고 `istio: ingressgateway` 레이블이 지정된 기본 Istio Ingress Gateway를 대상으로 합니다.

**참고**: 제공된 예시 구성을 주의 깊게 읽고 인프라 및 환경에 맞게 조정하세요. 더 많은 구성 옵션은 [Envoy 보안 프로세서 문서](https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto)에서 확인할 수 있습니다.

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
{{% tab "사이드카" %}}

이 구성은 서비스 메시 내 특정 포드의 Istio 사이드카 프록시를 대상으로 하여 해당 포드에 App and API Protection을 적용합니다. 이를 통해 어떤 서비스를 보호할지 더 세밀하게 제어할 수 있습니다.

다음은 `<your-application-namespace>` 네임스페이스에서 `app: <your-app-label>` 레이블이 지정된 포드를 대상으로 하는 매니페스트 예시(`datadog-aap-sidecar-filter.yaml`)입니다. 특정 애플리케이션에 맞게 이러한 설정을 업데이트하세요.

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

`EnvoyFilter`를 적용하면 Datadog 보안 프로세서가 Istio Ingress Gateway 또는 선택한 사이드카를 통해 트래픽 처리를 시작합니다.

### 3단계: 유효성 검사 {#step-3-validate}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="신호 탐색기 및 세부 정보, 취약점 탐색기 및 세부 정보를 보여주는 동영상입니다." video="true" >}}

## 제한 사항 {#limitations}

알려진 제한 사항:

* Datadog 보안 프로세서 이미지 버전 `v2.2.2` 이상을 사용하는 경우 요청 및 응답 본문 검사가 지원됩니다.

Istio 통합 호환성에 대한 자세한 내용은 [Istio 통합 호환성 페이지][11]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://istio.io/
[2]: /ko/containers/kubernetes/installation/?tab=datadogoperator
[3]: /ko/agent/remote_config/?tab=helm#enabling-remote-configuration
[4]: /ko/tracing/guide/setting_up_apm_with_kubernetes_service/?tab=datadogoperator
[5]: /ko/tracing/guide/setting_up_apm_with_kubernetes_service/?tab=datadogoperator#cluster-agent-admission-controller
[6]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
[7]: https://github.com/DataDog/dd-trace-go
[8]: /ko/tracing/trace_collection/library_config/go/
[9]: /ko/security/application_security/policies/library_configuration/
[10]: https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto
[11]: /ko/security/application_security/setup/compatibility/istio
[12]: /ko/containers/kubernetes/appsec/