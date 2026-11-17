---
aliases:
- /ko/security/application_security/setup/nginx/kubernetes/
further_reading:
- link: /security/application_security/how-it-works/
  tag: 문서
  text: App and API Protection의 작동 방식
- link: /security/default_rules/?category=cat-application-security
  tag: 문서
  text: OOTB App and API Protection 규칙
- link: /security/application_security/troubleshooting
  tag: 문서
  text: App and API Protection 문제 해결
title: Kubernetes에서 Nginx용 App and API Protection 설정
type: multi-code-lang
---
{{< partial name="app_and_api_protection/callout.html" >}}

# Datadog에 대한 Ingress-nginx 지원 {#ingress-nginx-support-for-datadog}

[Ingress-nginx][1]는 [Kubernetes Ingress Controller][2]로,
NGINX를 역방향 프록시 및 로드 밸런서로 사용합니다. Kubernetes 클러스터에서는 보안상의 이유로 외부 액세스가 기본적으로 제한됩니다.
Ingress Controller는 규칙을 사용하여 외부 트래픽이 서비스에 도달하는 방식을 제어합니다.

ingress-nginx 컨트롤러에 대해 [App and API Protection][10]을 활성화하여 클러스터 엣지에서 트래픽을 검사하고 보호할 수 있습니다. Datadog은 다음 두 가지 설정 방법을 지원합니다.

- **자동 구성** (권장): Datadog Cluster Agent가 ingress-nginx 컨트롤러 포드에 `nginx-datadog` 모듈을 주입합니다.
- **수동 구성**: Datadog init 컨테이너와 NGINX 구성 스니펫을 직접 추가합니다.

## Kubernetes용 App and API Protection을 사용한 자동화된 구성 {#automated-configuration-with-app-and-api-protection-for-kubernetes}

<div class="alert alert-info">
  자동 구성을 사용하면 Datadog Cluster Agent가 <code>nginx-datadog</code> 수동 init 컨테이너나 NGINX 스니펫을 변경하지 않고 ingress-nginx 컨트롤러 포드에 모듈을 주입할 수 있습니다. 대부분의 사용자에게 권장되는 방식입니다.
</div>

### 설정 {#setup}

이 설정에 필요한 항목은 다음과 같습니다.

- Datadog Cluster Agent `v7.79.0` 이상
- Helm 방식의 경우 Datadog Helm 차트 `v3.217.0` 이상
- Datadog Operator 방식의 경우 Datadog Operator `v1.31.0` 이상

Datadog Operator 또는 Helm을 사용하여 자동 구성을 활성화합니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

`DatadogAgent` 리소스의 `spec.features.appsec.injector` 섹션에서 인젝터를 구성합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    appsec:
      injector:
        enabled: true
        # Optional: override the path where the nginx-datadog module is mounted
        # in the controller pod (default: /modules_mount)
        # nginx:
        #   moduleMountPath: /modules_mount
```

구성을 적용합니다.

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
      # Optional: override the path where the nginx-datadog module is mounted
      # in the controller pod (default: /modules_mount)
      # nginx:
      #   moduleMountPath: "/modules_mount"
```

Datadog Helm 차트(`v3.217.0` 이상)를 설치하거나 업그레이드합니다.

```bash
helm upgrade -i datadog-agent datadog/datadog -f values.yaml
```

{{% /tab %}}
{{< /tabs >}}

자동 구성을 활성화하면 Datadog Cluster Agent가 다음 작업을 수행합니다.

- ingress-nginx 컨트롤러 포드 탐지
- `nginx-datadog` 모듈을 컨트롤러에 주입
- 모듈을 로드하고 App and API Protection을 적용하도록 컨트롤러 구성

이 설정을 변경하지 않고도 [Remote Configuration][8]을 통해 App and API Protection을 켜거나 끌 수 있습니다.

구성 옵션에 대한 내용은 [Kubernetes용 App and API Protection][9]을 참조하세요.

### 검증 {#validate}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Signals 탐색기 및 세부 정보, Vulnerabilities 탐색기 및 세부 정보를 보여주는 동영상입니다." video="true" >}}

## 수동 구성(대안) {#manual-configuration-alternative}

ingress-nginx 컨트롤러는 [Kubernetes 리소스][3]를 통해 관리되지만
의도된 사용 사례를 벗어나는 기본 NGINX 구성의 사용자 지정은 일반적으로 제한적입니다. 하지만 ingress-nginx는
확장된 기능을 위해 NGINX 모듈을 추가할 수 있도록 허용합니다. `nginx-datadog`을 통해 이 기능을 활용할 수 있도록 Datadog에서는 **init 컨테이너**를 제공합니다.

### ingress-nginx에서 `nginx-datadog`을 활성화하는 방법 {#how-to-enable-nginx-datadog-in-ingress-nginx}
`nginx-datadog`을 ingress-nginx와 통합하려면 Datadog [init 컨테이너][4]를 포드
사양에 추가하고 `nginx-datadog` 모듈을 로드하도록 NGINX를 구성합니다.

다음 Helm 값은 `nginx-datadog` 모듈을 ingress-nginx 컨트롤러에 주입하는 방법을 보여줍니다.

```yaml
controller:
  config: 
    main-snippet: "load_module /modules_mount/ngx_http_datadog_module.so;"
  opentelemetry:
    enabled: false
  extraModules:
    - name: nginx-datadog
      image:
        registry: docker.io
        image: datadog/ingress-nginx-injection
        # The tag should match the version of the ingress-nginx controller
        # For example, this will inject the Datadog module for ingress v1.10.0
        # Check <https://hub.docker.com/repository/docker/datadog/ingress-nginx-injection/tags> 
        # for the list of all versions supported.
        tag: "v1.10.0"
        distroless: false
```

[자세한 예시][5]를 살펴보면 `nginx-datadog`을 통해 ingress-nginx를 설정하는 데 도움을 얻을 수 있습니다.

### 작동하는 방식 {#how-does-it-work}
Init 컨테이너는 Kubernetes 포드에서 메인 컨테이너보다 먼저 실행되는 특수 컨테이너입니다. 이 경우
Datadog init 컨테이너는 `nginx-datadog` 모듈을 공유 볼륨으로 복사하는 역할을 하며,
메인 ingress-nginx 컨테이너가 공유 볼륨에 액세스할 수 있습니다.

메인 ingress-nginx 컨트롤러가 시작될 때 `load_module` 지시문을 사용하여 NGINX 구성이 업데이트되어야 하며,
이를 통해 Datadog 모듈을 로드할 수 있습니다.

<div class="alert alert-danger">
Datadog에서는 <b>각 ingress-nginx 컨트롤러 버전에 대한</b> 특정 init 컨테이너를 제공하며, 이러한 버전은 <code>v1.10.0</code>부터 시작합니다. <b>각</b> init 컨테이너가 기본 NGINX 버전과 일치해야 하므로 이는 매우 중요합니다. 호환성을 확인하려면 Datadog init 컨테이너 버전이 ingress-nginx 버전과 일치하는지 확인하세요.
</div>

### OpenTelemetry와의 상호 작용 {#interaction-with-opentelemetry}
기본적으로 ingress-nginx에는 `enable-opentelemetry: true` 설정을 사용하여 활성화할 수 있는 OpenTelemetry(oTel) 모듈이 포함되어 있으며,
이 설정은 [ingress-nginx ConfigMap][6]에 있습니다.
그러나 추적에 `nginx-datadog`을 사용하는 경우에는 OpenTelemetry를 **비활성화**하여
oTel 및 Datadog 모듈에서 중복 추적 데이터가 발생하지 않도록 방지하는 것이 좋습니다.

OpenTelemetry를 비활성화하려면 `enable-opentelemetry: false`를 설정하세요.

### AppSec 활성화{#enabling-appsec}

AppSec에서 제공하는 WAF를 활성화하여 보안 위협으로부터 애플리케이션을 보호할 수 있습니다. 이렇게 하려면 AppSec 구성을 포함하도록 Helm 값을 업데이트하세요.

```yaml
controller:
  config:
    main-snippet: |
      load_module /modules_mount/ngx_http_datadog_module.so;
      # AppSec thread pool configuration (adjust threads and max_queue as needed)
      thread_pool waf_thread_pool threads=2 max_queue=16;
    http-snippet: |
      # Enable AppSec
      datadog_appsec_enabled on;
      datadog_waf_thread_pool_name waf_thread_pool;
  opentelemetry:
    enabled: false
  extraModules:
    - name: nginx-datadog
      image:
        registry: docker.io
        image: datadog/ingress-nginx-injection
        tag: "v1.10.0"
        distroless: false
```

**주요 구성 파라미터:**
- `thread_pool waf_thread_pool`: AppSec 처리를 위한 전용 스레드 풀을 생성합니다. 트래픽 패턴과 사용 가능한 리소스에 따라 `threads`와 `max_queue`의 값을 조정합니다.
- `datadog_appsec_enabled on`: 위협 탐지 및 보호를 위해 Application Security 모듈을 활성화합니다. Remote Configuration을 통해 AppSec을 활성화하거나 비활성화할 수 있도록 이 파라미터는 생략할 수 있습니다.
- `datadog_waf_thread_pool_name waf_thread_pool`: 일치하는 요청을 구성된 스레드 풀과 연결합니다.

더 많은 구성 옵션은 [구성 참조][7]를 확인하세요.

<div class="alert alert-info">
운영 환경에서는 스레드 풀 성능을 모니터링하고 트래픽 볼륨과 지연 시간 요구 사항에 따라 <code>threads</code> 및 <code>max_queue</code> 파라미터를 조정하세요.
</div>

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/kubernetes/ingress-nginx
[2]: https://kubernetes.io/docs/concepts/services-networking/ingress/
[3]: https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/
[4]: https://hub.docker.com/r/datadog/ingress-nginx-injection
[5]: https://github.com/DataDog/nginx-datadog/tree/master/example/ingress-nginx
[6]: https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#enable-opentelemetry
[7]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md
[8]: /ko/agent/remote_config/?tab=helm#enabling-remote-configuration
[9]: /ko/containers/kubernetes/appsec
[10]: /ko/security/application_security/