---
aliases:
- /ko/security/application_security/threats/setup/threat_detection/gateway_api
- /ko/security/application_security/threats_detection/gateway_api
- /ko/security/application_security/setup/gateway-api
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/k8s.io/gateway-api
  tag: 소스 코드
  text: Gateway API 통합 소스 코드
- link: /security/default_rules/?category=cat-application-security
  tag: 설명서
  text: OOTB App and API Protection 규칙
- link: /security/application_security/troubleshooting
  tag: 설명서
  text: App and API Protection 트러블슈팅
title: Kubernetes에서 Gateway API에 대해 AAP 활성화
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection은 정부 기관용 Datadog 사이트 US1-FED에서 미리 보기로 제공되고 있습니다.
</div>
{{< /site-region >}}

<div class="alert alert-danger">
  Gateway API용 AAP는 실험적 기능입니다. 사용해 보려면 아래 지침을 따르세요.
</div>

## 개요 {#overview}

**Datadog AppSec Gateway API Request Mirror**는 Kubernetes Gateway API의 **RequestMirror** 기능을 활용하여 Datadog App &API Protection 엔드포인트로 트래픽을 복제함으로써 애플리케이션 보안을 강화합니다. 이를 통해 기본 요청 흐름에 영향을 주지 않으면서 잠재적인 애플리케이션 수준 공격, API 엔드포인트 검색 등을 실시간으로 탐지하고 분석할 수 있습니다.

## 전제 조건 {#prerequisites}

- [Gateway API CRD가 설치된][9] Kubernetes 클러스터.
- [Gateway API RequestMirror 필터와 호환되는 컨트롤러][10].
- 로컬 머신에 [Go][11] 1.23 이상이 설치되어 있어야 합니다.

## 위협 탐지 활성화 {#enabling-threat-detection}

### 설치 {#installation}

1. **[Kubernetes 설치 가이드][12]에 따라 Kubernetes 클러스터에 Datadog Agent를 배포합니다**.

2. **Datadog Agent를 구성하여** APM을 전송 수단으로 사용하여 [수신되는 AppSec 페이로드를 지원하도록][13] 설정합니다.

3. **원하는 네임스페이스(예:**)에 AppSec Gateway API Request Mirror를 서비스와 함께 배포합니다`datadog`:

   ```bash
   kubectl apply -f https://raw.githubusercontent.com/DataDog/dd-trace-go/refs/heads/main/contrib/k8s.io/gateway-api/cmd/request-mirror/deployment.yml
   ```

4. **배포 확인**:

   ```bash
   kubectl get pods -l app=request-mirror
   ```

5. **Gateway 리소스에 패치를 적용하여** 배포가 있는 네임스페이스에 대한 액세스를 허용합니다.

   ```bash
   git clone https://github.com/DataDog/dd-trace-go.git
   cd dd-trace-go
   go run ./contrib/k8s.io/gateway-api/cmd/patch-gateways
   ```

   패치 동작을 사용자 지정하기 위한 옵션을 보려면 `-help` 플래그를 사용하세요.

6. **HTTPRoute 리소스에 패치를 적용하여** 트래픽을 서비스로 리디렉션합니다.

   ```bash
   go run ./contrib/k8s.io/gateway-api/cmd/patch-httproutes
   ```

   이 명령은 모든 네임스페이스의 모든 `HTTPRoute` 리소스에 [RequestMirror][14] 필터를 추가합니다. 구성 옵션은 `-help` 플래그를 사용하세요.

   **참고**: 이 명령을 정기적으로 실행하면 새로 생성된 모든 `HTTPRoute` 리소스에 `RequestMirror` 필터가 자동으로 포함됩니다. `HTTPRoute` 리소스가 수정되는 CI/CD 파이프라인에 결과 패치를 추가하는 것을 고려하세요.

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Signals 탐색기 및 세부 정보, Vulnerabilities 탐색기 및 세부 정보를 보여주는 동영상입니다." video="true" >}}

## 구성 {#configuration}

### 환경 변수 {#environment-variables}

Gateway API Request Mirror 배포는 다음 환경 변수를 사용하여 구성할 수 있습니다.

| 환경 변수                 | 기본값 | 설명                                                                                                                |
|--------------------------------------|---------------|----------------------------------------------------------------------------------------------------------------------------|
| `DD_REQUEST_MIRROR_LISTEN_ADDR`      | `:8080`       | 요청 미러 서비스가 들어오는 미러링된 요청을 수신 대기하는 주소 및 포트                                   |
| `DD_REQUEST_MIRROR_HEALTHCHECK_ADDR` | `:8081`       | 상태 검사 엔드포인트가 제공되는 주소 및 포트                                                                 |

다음 환경 변수를 사용하여 통합에서 트레이스를 수신하도록 Datadog Agent를 구성하세요.

| 환경 변수                   | 기본값 | 설명                                                           |
|----------------------------------------|---------------|-----------------------------------------------------------------------|
| `DD_AGENT_HOST`                        | `localhost`   | Datadog Agent가 실행되는 호스트 이름|
| `DD_TRACE_AGENT_PORT`                  | `8126`        | 트레이스 수집용 Datadog Agent 포트|

### 배포 예시 {#deployment-example}

기본 배포는 미러링된 요청을 위해 8080 포트에서 수신 대기하고 8081 포트에서 상태 검사 엔드포인트를 노출하는 서비스를 생성합니다.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: request-mirror
  labels:
    app.kubernetes.io/component: request-mirror
    app.kubernetes.io/name: datadog
spec:
  strategy:
    type: RollingUpdate
  selector:
    matchLabels:
      app: request-mirror
  template:
    metadata:
      labels:
        app: request-mirror
    spec:
      containers:
        - name: request-mirror
          image: ghcr.io/datadog/dd-trace-go/request-mirror:latest
          ports:
            - containerPort: 8080
              name: http
          livenessProbe:
            httpGet:
              path: /
              port: 8081
          readinessProbe:
            httpGet:
              path: /
              port: 8081
          env:
            - name: DD_AGENT_HOST
              value: "datadog-agent"  # Adjust to your Agent service name
---
apiVersion: v1
kind: Service
metadata:
  name: request-mirror
spec:
  selector:
    app: request-mirror
  ports:
    - name: http
      port: 8080
      targetPort: 8080
```

## Datadog Go Tracer 및 Gateway API 통합 {#datadog-go-tracer-and-gateway-api-integration}

<div class="alert alert-info">
  AAP Gateway API 통합은 Datadog Go Tracer를 기반으로 구축되었습니다. 이는 트레이서와 동일한 릴리스 프로세스를 따르며, 해당 Docker 이미지에는 대응하는 트레이서 버전이 태그로 지정됩니다.
</div>

Gateway API 통합은 [Datadog Go Tracer][6]를 사용하며 트레이서의 모든 환경 변수를 상속합니다. [Go SDK 구성][7] 및 [AAP 라이브러리 구성][8]에서 더 많은 정보를 찾을 수 있습니다.

## APM 트레이싱 활성화 {#enabling-apm-tracing}

기본적으로 요청 미러 트레이스는 Datadog의 APM 제품을 활성화하지 않습니다. APM 트레이싱 기능 없이 App and API Protection을 사용하려면 이것이 기본 동작입니다. 

APM 트레이싱을 활성화하려면 요청 미러 배포에서 환경 변수 `DD_APM_TRACING_ENABLED=true`를 설정하세요.

App and API Protection을 사용하는 동안 APM 트레이싱을 명시적으로 비활성화하려면 다음과 같이 하세요.

1. 배포를 구성할 때, `DD_APM_TRACING_ENABLED=false` 환경 변수와 `DD_APPSEC_ENABLED=true` 환경 변수를 함께 사용하세요.
2. 이 구성은 Datadog으로 전송되는 APM 데이터 양을 App and API Protection 제품에 필요한 최소한으로 줄입니다.

자세한 내용은 [독립형 App and API Protection][15]을 참조하세요.

## 제한 사항 {#limitations}

Gateway API 통합에는 다음과 같은 제한 사항이 있습니다.

- HTTP 응답에 액세스할 수 없습니다.
- 요청 차단을 적용할 수 없습니다.
- HTTP 요청 본문 분석에는 JSON만 지원됩니다.

더 세밀한 분석 및 기타 AAP 기능을 사용하려면 다른 AAP 통합을 시도해 보세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /ko/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[6]: https://github.com/DataDog/dd-trace-go
[7]: /ko/tracing/trace_collection/library_config/go/
[8]: /ko/security/application_security/policies/library_configuration/
[9]: https://gateway-api.sigs.k8s.io/guides/#installing-gateway-api
[10]: https://gateway-api.sigs.k8s.io/implementations
[11]: https://go.dev/doc/install
[12]: /ko/containers/kubernetes/installation/
[13]: /ko/tracing/guide/setting_up_apm_with_kubernetes_service/
[14]: https://gateway-api.sigs.k8s.io/guides/http-request-mirroring/
[15]: /ko/security/application_security/setup/standalone/