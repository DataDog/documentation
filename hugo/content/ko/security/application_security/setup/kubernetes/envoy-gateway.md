---
aliases:
- /ko/security/application_security/setup/envoy-gateway
code_lang: envoy-gateway
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/envoyproxy/go-control-plane/cmd/serviceextensions
  tag: 소스 코드
  text: Envoy 통합 소스 코드
- link: /security/default_rules/?category=cat-application-security
  tag: 설명서
  text: OOTB App and API Protection 규칙
- link: /security/application_security/troubleshooting
  tag: 설명서
  text: App and API Protection 문제 해결
title: Envoy Gateway용 App and API Protection 활성화
---
[Envoy Gateway][1]에서 관리하는 트래픽에 대해 Datadog [App and API Protection][12]을 활성화하여 인프라 에지에서 트래픽을 검사하고 보호할 수 있습니다.

## 전제 조건 {#prerequisites}

- [Envoy Gateway][1]가 설치된 실행 중인 Kubernetes 클러스터.
- Kubernetes 클러스터에 [Datadog Agent가 설치 및 구성][2]되어 있습니다.
  - [Remote Configuration][3]을 활성화 및 구성하여 Datadog UI를 통해 공격자를 차단할 수 있게 합니다.
  - 보안 프로세서 서비스가 자체 트레이스를 Agent로 보낼 수 있도록 Agent에서 [APM][4]을 활성화합니다.
    - 필요시 [Cluster Agent Admission Controller][5]를 활성화하여 Datadog Agent 호스트 정보를 App and API Protection 보안 프로세서 서비스에 자동으로 주입합니다.

## Kubernetes용 App and API Protection을 사용한 자동화된 구성 {#automated-configuration-with-app-and-api-protection-for-kubernetes}

<div class="alert alert-info">
  자동화된 구성은 보안 프로세서 배포 및 <code>EnvoyExtensionPolicy</code> 생성을 처리합니다. 대부분의 사용자에게 권장되는 방식입니다.
</div>

### 설정 {#setup}

1. **보안 프로세서**를 아래 [Datadog 보안 프로세서 서비스 배포](#step-1-deploy-the-datadog-security-processor-service)에 표시된 배포 매니페스트를 사용하여 배포합니다.
2. **자동 구성**을 Datadog Operator 또는 Helm을 사용하여 활성화합니다.

   {{< tabs >}}
   {{% tab "Datadog Operator" %}}

   `DatadogAgent` 리소스에 주석을 추가합니다. 서비스 이름 주석은 필수이며 보안 프로세서 서비스와 일치해야 합니다.

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

   다음 구성을 적용합니다.

   ```bash
   kubectl apply -f datadog-agent.yaml
   ```

   {{% /tab %}}
   {{% tab "Helm" %}}

   다음 내용을 `values.yaml`에 추가합니다.

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

   Datadog Helm 차트를 설치하거나 업그레이드합니다.

   ```bash
   helm upgrade -i datadog-agent datadog/datadog -f values.yaml
   ```

   {{% /tab %}}
   {{< /tabs >}}

   이를 활성화하면 Datadog Cluster Agent는 다음을 수행합니다.
   - Envoy Gateway 설치를 감지합니다
   - 각 Gateway에 대해 `EnvoyExtensionPolicy` 리소스를 생성합니다
   - 보안 프로세서로 트래픽을 라우팅하도록 정책을 구성합니다
3. **생성된 정책을 확인하여 구성을 검증합니다**.
   ```bash
   kubectl get envoyextensionpolicy -A
   ```

구성 옵션 및 문제 해결에 대한 내용은 [Kubernetes용 App and API Protection][13]를 참조하세요.

## 수동 구성(대안) {#manual-configuration-alternative}

특정 게이트웨이를 세부적으로 제어하려면 수동 설정을 사용하세요.

1. 클러스터에 Datadog Security Processor 서비스를 배포합니다.
2. 해당 서비스를 가리키는 `EnvoyExtensionPolicy`를 구성합니다.

### 1단계: Datadog 보안 프로세서 서비스 배포 {#step-1-deploy-the-datadog-security-processor-service}

이 gRPC 서버는 App and API Protection 분석을 위해 Envoy로부터 요청과 응답을 수신합니다.

Envoy Gateway에서 액세스할 수 있는 네임스페이스에 배포하세요. Docker 이미지는 [Datadog Go tracer GitHub 레지스트리][6]에 있습니다.

매니페스트 예(`datadog-aap-extproc-service.yaml`):

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

#### 보안 프로세서 구성 옵션 {#configuration-options-for-the-security-processor}

Datadog Security Processor는 다음과 같은 설정을 제공합니다.

| 환경 변수                      | 기본값       | 설명                                                                                                                              |
|-------------------------------------------|---------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_SERVICE_EXTENSION_HOST`               | `0.0.0.0`           | gRPC 서버 수신 주소입니다.                                                                                                           |
| `DD_SERVICE_EXTENSION_PORT`               | `443`               | gRPC 서버 포트입니다.                                                                                                                        |
| `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`   | `80`                | 서비스 상태 점검을 위한 HTTP 서버 포트입니다.                                                                                                      |
| `DD_SERVICE_EXTENSION_TLS`                | `true`          | gRPC TLS 계층을 활성화합니다.                                                                                                      |
| `DD_SERVICE_EXTENSION_TLS_KEY_FILE`       | `localhost.key` | 기본 gRPC TLS 계층 키를 변경합니다.                                                                           |
| `DD_SERVICE_EXTENSION_TLS_CERT_FILE`      | `localhost.crt` | 기본 gRPC TLS 계층 인증서를 변경합니다.                                                                           |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`       | `10485760`                 | 처리할 본문의 최대 크기(바이트)입니다. `0`으로 설정하면 본문이 처리되지 않습니다. 권장 값은 `10485760`(10MB)입니다. (본문 처리를 완전히 활성화하려면 External Processing 필터 구성에서 `allowModeOverride` 옵션도 설정해야 합니다.) |
| `DD_SERVICE`                              | `serviceextensions` | Datadog UI에 표시되는 서비스 이름입니다.                                                                                                    |


다음 환경 변수를 사용하여 보안 프로세서에서 Datadog Agent로의 연결을 구성하세요.

| 환경 변수                   | 기본값 | 설명                                                                      |
|----------------------------------------|---------------|----------------------------------------------------------------------------------|
| `DD_AGENT_HOST`                        | `localhost`   | Datadog Agent의 호스트 이름 또는 IP입니다.                                            |
| `DD_TRACE_AGENT_PORT`                  | `8126`        | 트레이스 수집용 Datadog Agent 포트입니다.                                  |

보안 프로세서는 [Datadog Go Tracer][7]를 기반으로 구축되었으며 해당 환경 변수를 모두 상속합니다. [Go SDK 구성][8] 및 [App and API Protection 라이브러리 구성][9]을 참조하세요.

<div class="alert alert-info">
  Datadog 보안 프로세서는 Datadog Go 트레이서를 기반으로 구축되었으므로 일반적으로 트레이서와 동일한 릴리스 프로세스를 따르며, Docker 이미지에는 해당 트레이서 버전 태그가 지정됩니다(예: <code>v2.2.2</code>). 경우에 따라 공식 트레이서 릴리스 사이에 초기 릴리스 버전이 게시될 수 있으며, 해당 이미지에는 다음과 같은 접미사가 태그로 지정됩니다. <code>-docker.1</code>.
</div>

### 2단계: EnvoyExtensionPolicy 구성 {#step-2-configure-an-envoyextensionpolicy}

`EnvoyExtensionPolicy`를 사용하여 Envoy Gateway가 Datadog 보안 프로세서를 호출하도록 지시합니다. 정책을 Gateway 또는 특정 HTTPRoute/GRPCRoute 리소스에 연결할 수 있습니다.

이렇게 하면 선택한 Gateway의 모든 트래픽이 Datadog 보안 프로세서로 전송됩니다. 매니페스트 예(`datadog-aap-extproc-eep.yaml`):

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

#### 교차 네임스페이스 참조 {#crossnamespace-reference}

보안 프로세서 `Service`가 정책과 **다른 네임스페이스**에 있는 경우, 프로세서의 네임스페이스에 [ReferenceGrant][10]를 추가합니다. 예를 들어, `datadog-aap-eep-rg.yaml`과 같은 매니페스트를 사용하여 이 작업을 수행할 수 있습니다.

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

### 3단계: 유효성 검사 {#step-3-validate}

정책을 적용한 후, 대상 게이트웨이/경로를 통과하는 트래픽은 App and API Protection에 의해 검사됩니다.

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Signals 탐색기 및 세부 정보, Vulnerabilities 탐색기 및 세부 정보를 보여주는 동영상입니다." video="true" >}}

## 제한 사항 {#limitations}

관측 가능성 모드(비동기 분석)는 Envoy Gateway에서 사용할 수 없습니다.

Envoy Gateway 통합 호환성에 대한 자세한 내용은 [Envoy Gateway 통합 호환성 페이지][11]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://gateway.envoyproxy.io/docs/
[2]: /ko/containers/kubernetes/installation/?tab=datadogoperator
[3]: /ko/agent/remote_config/?tab=helm#enabling-remote-configuration
[4]: /ko/tracing/guide/setting_up_apm_with_kubernetes_service/?tab=datadogoperator
[5]: /ko/tracing/guide/setting_up_apm_with_kubernetes_service/?tab=datadogoperator#cluster-agent-admission-controller
[6]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
[7]: https://github.com/DataDog/dd-trace-go
[8]: /ko/tracing/trace_collection/library_config/go/
[9]: /ko/security/application_security/policies/library_configuration/
[10]: https://gateway-api.sigs.k8s.io/api-types/referencegrant/
[11]: /ko/security/application_security/setup/compatibility/envoy-gateway
[12]: /ko/security/application_security/
[13]: /ko/containers/kubernetes/appsec