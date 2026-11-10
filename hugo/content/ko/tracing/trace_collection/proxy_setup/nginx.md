---
aliases:
- /ko/tracing/proxies/nginx
- /ko/tracing/nginx/
- /ko/tracing/setup/nginx/
- /ko/tracing/proxies
- /ko/tracing/setup_overview/nginx/
- /ko/tracing/setup_overview/proxy_setup/
code_lang: nginx
code_lang_weight: 50
further_reading:
- link: https://www.nginx.com/
  tag: 외부 사이트
  text: NGINX 웹사이트
- link: https://kubernetes.github.io/ingress-nginx/user-guide/third-party-addons/opentelemetry/
  tag: 외부 사이트
  text: Ingress-NGINX Controller용 OpenTelemetry
title: NGINX 계측
type: multi-code-lang
---
Datadog APM은 다음 구성에서 NGINX를 지원합니다.
- Datadog 모듈에서 제공하는 추적 기능을 사용하여 프록시로 작동하는 NGINX
- Kubernetes용 Ingress Controller의 역할을 하는 NGINX
- [OpenResty](#openresty-with-datadog-module), OpenResty 전용으로 빌드된 Datadog 모듈을 통해 제공되는 추적 기능을 갖추고 NGINX를 기반으로 빌드됨

## NGINX with Datadog 모듈 {#nginx-with-datadog-module}
Datadog은 분산 추적을 위한 NGINX 모듈을 제공합니다.

### 모듈 설치{#module-installation}
Datadog NGINX 모듈을 설치하려면 다음 지침을 따르세요.
1. [최신 nginx-datadog GitHub 릴리스][1]에서 적절한 버전을 다운로드합니다.
2. 특정 NGINX 버전 및 CPU 아키텍처에 해당하는 tarball을 선택합니다.

각 릴리스에는 NGINX 버전과 CPU 아키텍처 조합당 tarball 2개가 포함되어 있습니다.
메인 tarball에는 Datadog NGINX 모듈인 `ngx_http_datadog_module.so` 파일 하나가 포함되어 있습니다. 두 번째 tarball은 디버그 심볼이며, 선택 사항입니다.

간단하게 설명하기 위해 다음 스크립트에서는 최신 릴리스용 모듈만 다운로드합니다.

```bash
get_latest_release() {
  curl --silent "https://api.github.com/repos/$1/releases/latest" | jq --raw-output .tag_name
}

get_architecture() {
  case "$(uname -m)" in
    aarch64|arm64)
      echo "arm64"
      ;;
    x86_64|amd64)
      echo "amd64"
      ;;
    *)
      echo ""
      ;;
  esac
}

ARCH=$(get_architecture)

if [ -z "$ARCH" ]; then
    echo 1>&2 "ERROR: Architecture $(uname -m) is not supported."
    exit 1
fi

NGINX_VERSION="1.29.0"
RELEASE_TAG=$(get_latest_release DataDog/nginx-datadog)
TARBALL="ngx_http_datadog_module-${ARCH}-${NGINX_VERSION}.so.tgz"

curl -Lo ${TARBALL} "https://github.com/DataDog/nginx-datadog/releases/download/${RELEASE_TAG}/${TARBALL}"
```

`tar`를 사용하여 다운로드한 tarball에서 `ngx_http_datadog_module.so` 파일을 추출하고 NGINX 모듈 디렉터리에 저장합니다. 이 디렉터리의 위치는 일반적으로 `/usr/lib/nginx/modules`입니다.

### Datadog 모듈을 사용한 NGINX 구성{#nginx-configuration-with-datadog-module}
NGINX 구성의 최상단 섹션에서 Datadog 모듈을 로드합니다.

```nginx
load_module modules/ngx_http_datadog_module.so;
```

기본 구성은 로컬 Datadog Agent에 연결하고
모든 NGINX 위치에 대한 트레이스를 생성합니다. 전용
`datadog_*` 지시문을 사용하여 사용자 지정 구성을 지정합니다. 해당 지시문에 대한 설명은 Datadog 모듈의 [API 문서][4]에 나와 있습니다.

예를 들어, 다음 NGINX 구성은 서비스 이름을
`usage-internal-nginx`로, 샘플링 속도를 10%로 설정합니다.

```nginx
load_module modules/ngx_http_datadog_module.so;

http {
  datadog_service_name usage-internal-nginx;
  datadog_sample_rate 0.1;

  # servers, locations...
}
```

## Kubernetes용 Ingress-NGINX 컨트롤러 {#ingress-nginx-controller-for-kubernetes}

Datadog은 Kubernetes에서 Ingress-NGINX 컨트롤러를 모니터링할 수 있도록 지원합니다.
컨트롤러 버전 및 요구 사항에 따라 다음 계측 방법 중 하나를 선택합니다.

- [Datadog 기능을 사용하는 v1.10.0+](#controller-v1100-using-datadogs-features).
- [OpenTelemetry를 사용하는 v1.10.0+](#controller-v1100-using-opentelemetry).
- [v1.9.0 이하](#controller-v190-and-older).

### Datadog 기능을 사용하는 Controller v1.10.0+ {#controller-v1100-using-datadogs-features}

이 계측 방법은 [nginx-datadog][6]을 사용하고 Kubernetes [init-container][7] 메커니즘을 활용하여
Ingress-NGINX Controller 인스턴스 내에 모듈을 설치합니다.

Datadog 모듈을 사용하여 Ingress-NGINX **v1.10.0+**을 계측하려면 다음 단계를 따르세요.

{{< tabs >}}
{{% tab "Kubernetes" %}}

**1. Ingress-NGINX 버전 확인**<br>
Ingress-NGINX 컨트롤러 버전을 확인하고 일치하는 Datadog init-container를 사용할 수 있는지 확인합니다.
시작 문제를 방지하려면 init-container 버전([datadog/ingress-nginx-injection][1])이 컨트롤러 버전과 정확히 일치해야 합니다.
예를 들어, Ingress-NGINX v1.11.3을 실행 중인 경우 [datadog/ingress-nginx-injection:v1.11.3][2]이 필요합니다.

<div class="alert alert-info">다음과 같은 버전 태그는 <code>v1.11.3</code> 롤링 태그입니다. 태그가 동일하게 유지되는 동안 기본 Datadog NGINX 모듈이 업데이트될 수 있습니다. 정확한 버전을 고정하려면 다이제스트를 통해 이미지를 참조하세요(예: <code>datadog/ingress-nginx-injection@sha256:...</code>).</div>

**2. 컨트롤러의 포드 사양 수정**<br>
init-container를 포함하고 Datadog Agent 호스트 환경 변수를 구성하도록 컨트롤러 포드 사양을 업데이트합니다.


{{< highlight yaml "hl_lines=4-10 13-16 19-22 25-26" >}}
    spec:
      template:
        spec:
          initContainers:
            - name: init-datadog
              image: datadog/ingress-nginx-injection:<MY_INGRESS_NGINX_VERSION>
              command: ['/datadog/init_module.sh', '/opt/datadog-modules']
              volumeMounts:
                - name: nginx-module
                  mountPath: /opt/datadog-modules
          containers:
            - name: controller
              image: registry.k8s.io/ingress-nginx/controller:<MY_INGRESS_NGINX_VERSION>
              volumeMounts:
                - name: nginx-module
                  mountPath: /opt/datadog-modules
              env:
                - ...
                - name: DD_AGENT_HOST
                  valueFrom:
                    fieldRef:
                      fieldPath: status.hostIP
          volumes:
            - ...
            - name: nginx-module
              emptyDir: {}
{{< /highlight >}}

**참고**: Datadog Agent에 액세스하는 다른 방법은 [Kubernetes 설치 가이드][1]를 참조하세요.

**3. Ingress-NGINX 구성** <br>
`ConfigMap`을 생성하거나 수정하여 Datadog 모듈을 로드합니다.

{{< highlight yaml "hl_lines=5 7-8" >}}
    kind: ConfigMap
    apiVersion: v1
    ...
    data:
      enable-opentelemetry: "false"
      error-log-level: notice
      main-snippet: |
        load_module /opt/datadog-modules/ngx_http_datadog_module.so;
{{< /highlight >}}

**4. ConfigMap 적용** <br>
Datadog 모듈이 올바르게 로드되도록 업데이트된 `ConfigMap`을 적용합니다.

이 구성은 Datadog 모듈이 로드되어 들어오는 요청을 추적할 준비가 되도록 합니다.

[1]: https://hub.docker.com/r/datadog/ingress-nginx-injection
[2]: https://hub.docker.com/layers/datadog/ingress-nginx-injection/v1.11.3/images/sha256-19ea2874d8a4ebbe4de0bf08faeb84c755cd71f1e8740ce2d145c5cf954a33a1
{{% /tab %}}

{{% tab "Helm" %}}
**1. Ingress-NGINX 버전 확인**<br>
Ingress-NGINX 컨트롤러 버전을 확인하고 일치하는 Datadog init-container를 사용할 수 있는지 확인합니다.
시작 문제를 방지하려면 init-container 버전([datadog/ingress-nginx-injection][1])이 컨트롤러 버전과 정확히 일치해야 합니다.
예를 들어, Ingress-NGINX v1.11.3을 실행 중인 경우 [datadog/ingress-nginx-injection:v1.11.3][2]이 필요합니다.

<div class="alert alert-info">다음과 같은 버전 태그는 <code>v1.11.3</code> 롤링 태그입니다. 태그가 동일하게 유지되는 동안 기본 Datadog NGINX 모듈이 업데이트될 수 있습니다. 정확한 버전을 고정하려면 다이제스트를 통해 이미지를 참조하세요(예: <code>datadog/ingress-nginx-injection@sha256:...</code>).</div>

**2. Helm 차트 값 재정의**<br>
Ingress-NGINX Helm 차트를 사용자 지정하고 필요한 Datadog 모듈을 로드하려면 YAML 파일을 생성하거나 다음 구성으로 기존 파일을 수정합니다.

{{< code-block lang="yaml" filename="values.yaml" >}}
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
  extraEnvs:
    - name: DD_AGENT_HOST
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
{{< /code-block >}}

**3. 배포**<br>
`-f` 플래그를 사용하여 Helm 릴리스를 설치하거나 업그레이드하여 이전 단계에서 생성한 사용자 지정 값을 적용합니다.

```shell
helm install my-release ingress-nginx/ingress-nginx -f values.yaml
```

[1]: https://hub.docker.com/r/datadog/ingress-nginx-injection
[2]: https://hub.docker.com/layers/datadog/ingress-nginx-injection/v1.11.3/images/sha256-19ea2874d8a4ebbe4de0bf08faeb84c755cd71f1e8740ce2d145c5cf954a33a1

{{% /tab %}}
{{< /tabs >}}

### OpenTelemetry를 사용하는 Controller v1.10.0+ {#controller-v1100-using-opentelemetry}

{{< tabs >}}
{{% tab "Kubernetes" %}}

**1. Datadog Agent 준비** <br>
Datadog Agent에서 [gRPC OTLP 수집이 활성화][1]되어 OpenTelemetry Collector 역할을 수행할 수 있는지 확인합니다.

**2. Ingress 컨트롤러 구성** <br>
시작하려면 Ingress 컨트롤러의 포드 사양에 `HOST_IP` 환경 변수가 설정되어 있는지 확인하세요. 그렇지 않은 경우, 포드 사양 내의 `env` 블록에 다음 항목을 추가합니다.

```yaml
- name: HOST_IP
  valueFrom:
    fieldRef:
      fieldPath: status.hostIP
- name: OTEL_EXPORTER_OTLP_ENDPOINT
  value: "http://$(HOST_IP):4317"
```

다음으로, 컨트롤러에 대한 OpenTelemetry 계측을 활성화합니다. 다음 세부 정보로 ConfigMap을 생성하거나 편집합니다.

{{< highlight yaml "hl_lines=7-11" >}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: ingress-nginx-controller
  namespace: ingress-nginx
data:
  enable-opentelemetry: "true"
  otel-sampler: AlwaysOn
  # Defaults
  # otel-service-name: "nginx"
  # otel-sampler-ratio: 0.01
{{< /highlight >}}

[1]: /ko/opentelemetry/otlp_ingest_in_the_agent/

{{% /tab %}}

{{% tab "Helm" %}}
**1. Datadog Agent 준비** <br>
Datadog Agent에서 [gRPC OTLP 수집이 활성화][1]되어 OpenTelemetry Collector 역할을 수행할 수 있는지 확인합니다.

**2. Helm 차트 값 재정의**<br>
Ingress-NGINX Helm 차트를 사용자 지정하고 필요한 Datadog 모듈을 로드하려면 YAML 파일을 생성하거나 다음 구성으로 기존 파일을 수정합니다.

{{< code-block lang="yaml" filename="values.yaml" >}}
controller:
  opentelemetry:
    enabled: true
  config:
    otel-service-name: "nginx"
    otel-sampler: AlwaysOn
    otel-sampler-ratio: 0.01
  extraEnvs:
    - name: HOST_IP
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
    - name: OTEL_EXPORTER_OTLP_ENDPOINT
      value: "http://$(HOST_IP):4317"
{{< /code-block >}}

**3. 배포**
`-f` 플래그를 사용하여 Helm 릴리스를 설치하거나 업그레이드하여 이전 단계에서 생성한 사용자 지정 값을 적용합니다.

```shell
helm install my-release ingress-nginx/ingress-nginx -f values.yaml
```

[1]: /ko/opentelemetry/otlp_ingest_in_the_agent/
{{% /tab %}}
{{< /tabs >}}

### 컨트롤러 v1.9.0 이하 {#controller-v190-and-older}
Datadog 추적을 활성화하려면 ConfigMap을 생성하거나 편집하여 `enable-opentracing: "true"` 및 트레이스를 보낼 `datadog-collector-host`를 설정합니다.
ConfigMap의 이름은 Ingress-NGINX 컨트롤러 컨테이너의 명령줄 인수에 명시적으로 언급되어 있으며, 기본값은 `--configmap=<POD_NAMESPACE>/nginx-configuration`입니다.
`ingress-nginx`를 Helm 차트를 통해 설치한 경우 ConfigMap의 이름은 `<RELEASE_NAME>-nginx-ingress-controller` 패턴을 따릅니다.

Ingress 컨트롤러는 `nginx.conf` 및 `/etc/nginx/opentracing.json` 파일을 둘 다 관리합니다. 모든 `location` 블록에 대해 추적 기능이 활성화됩니다.

{{< highlight yaml "hl_lines=6-7 9-15" >}}
kind: ConfigMap
apiVersion: v1
metadata:
  name: nginx-configuration
  namespace: ingress-nginx
  labels:
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
data:
  enable-opentracing: "true"
  datadog-collector-host: $HOST_IP
  # Defaults
  # datadog-service-name: "nginx"
  # datadog-collector-port: "8126"
  # datadog-operation-name-override: "nginx.handle"
  # datadog-sample-rate: "1.0"
{{< /highlight >}}

또한 컨트롤러의 포드 사양에 `HOST_IP` 환경 변수가 설정되어 있는지 확인합니다. 환경 변수 `POD_NAME` 및 `POD_NAMESPACE`가 포함된 `env:` 블록에 이 항목을 추가합니다.

```yaml
- name: HOST_IP
  valueFrom:
    fieldRef:
      fieldPath: status.hostIP
```

주석을 사용하여 Ingress별로 다른 서비스 이름을 설정하려면 다음과 같이 입력하세요.

```yaml
  nginx.ingress.kubernetes.io/configuration-snippet: |
      opentracing_tag "service.name" "custom-service-name";
```
위 내용은 기본 `nginx-ingress-controller.ingress-nginx` 서비스 이름을 재정의합니다.

## OpenResty with Datadog 모듈 {#openresty-with-datadog-module}

OpenResty는 NGINX를 기반으로 구축되었으며, 각 `nginx-datadog` 릴리스에는 해당 모듈의 별도 OpenResty 빌드가 포함되어 있습니다.

OpenResty용 Datadog NGINX 모듈을 설치하려면 다음 단계를 따르세요.
1. [최신 `nginx-datadog` GitHub 릴리스][1]에서 적절한 `openresty-` 접두사가 붙은 버전을 다운로드합니다.
2. OpenResty 버전 및 CPU 아키텍처와 일치하는 tarball을 선택합니다. OpenResty의 기반이 되는 NGINX 코어 버전이 아니라 `openresty -v`의 4부분으로 구성된 OpenResty 버전(예: `1.31.1.1`)을 사용하세요.
3. tarball에서 `ngx_http_datadog_module.so`를 추출하여 `/usr/local/openresty/nginx/modules`에 저장합니다. 디렉터리가 존재하지 않으면 생성합니다.
4. `/usr/local/openresty/nginx/conf/nginx.conf`의 맨 위에서 모듈을 로드합니다.

    ```nginx
    load_module modules/ngx_http_datadog_module.so;
    ```

모듈의 [API 문서][4]에서 설명하는 `datadog_*` 지시문과 `DD_*` 환경 변수는 OpenResty에서도 NGINX와 동일하게 작동합니다.

## 트레이스를 로그에 상호 연동 {#correlating-traces-to-logs}

APM 추적을 활성화한 후 트레이스를 해당 NGINX 로그에 연결할 수 있습니다. 이러한 상호 연동을 통해 각 트레이스와 스팬이 해당 요청 중에 생성된 특정 로그 이벤트에 연결되므로 둘 사이를 전환하며 문제를 해결할 수 있습니다.

### 전제 조건 {#prerequisites}

시작하기 전에 다음 사항을 확인하세요.
- 이 가이드의 앞부분에 나와 있는 단계에 따라 NGINX에 대해 APM 추적을 활성화했습니다.
- NGINX에 대한 Datadog 로그 수집을 구성했습니다.

### 1단계: NGINX 로그에 트레이스 ID와 스팬 ID 주입 {#step-1-inject-trace-and-span-ids-into-nginx-logs}

트레이스 ID와 스팬 ID를 포함하도록 `log_format` 지시문을 수정합니다. 사용하는 변수는 계측 방법에 따라 다릅니다. 설정에 맞는 지침을 보려면 아래에서 적절한 탭을 선택합니다.

{{< tabs >}}
{{% tab "Datadog NGINX 모듈" %}}

[Datadog NGINX 모듈][100]을 설치한 경우 `$datadog_trace_id` 및 `$datadog_span_id` 변수를 사용합니다. 추적되지 않는 요청의 경우 이 값은 `-`입니다.

NGINX 구성 파일을 업데이트합니다(예: `/etc/nginx/nginx.conf`).

```nginx
http {
  log_format main_datadog '$remote_addr - $remote_user [$time_local] "$request" '
                         '$status $body_bytes_sent "$http_referer" '
                         '"$http_user_agent" "$http_x_forwarded_for" '
                         'dd.trace_id="$datadog_trace_id"' 'dd.span_id="$datadog_span_id"';

  access_log /var/log/nginx/access.log main_datadog;
}
```
[100]: https://github.com/DataDog/nginx-datadog/releases/latest

{{% /tab %}}
{{% tab "OpenTelemetry" %}}

[NGINX OpenTelemetry 모듈][100]을 사용하는 경우 `$otel_trace_id` 및 `$otel_span_id` 변수를 사용합니다. 추적되지 않는 요청의 경우 이 값은 빈 문자열입니다.

NGINX 구성 파일을 업데이트합니다(예: `/etc/nginx/nginx.conf`).

```nginx
http {
  log_format main_opentelemetry '$remote_addr - $remote_user [$time_local] "$request" '
                               '$status $body_bytes_sent "$http_referer" '
                               '"$http_user_agent" "$http_x_forwarded_for" '
                               'dd.trace_id="$otel_trace_id"' 'dd.span_id="$otel_span_id"' ;

  access_log /var/log/nginx/access.log main_opentelemetry;
}
```
[100]: https://nginx.org/en/docs/ngx_otel_module.html
{{% /tab %}}
{{< /tabs >}}

변경 사항을 저장한 후 NGINX 구성을 다시 로드합니다. 예시는 다음과 같습니다.

```sh
sudo nginx -s reload
```

### 2단계: 트레이스 ID와 스팬 ID를 구문 분석하도록 로그 파이프라인 구성 {#step-2-configure-the-log-pipeline-to-parse-the-trace-and-span-ids}

기본적으로 로그는 `dd.trace_id` 및 `dd.span_id`를 16진수 형식으로 캡처합니다.

```
10.244.0.1 - - [12/Sep/2025:22:41:03 +0000] "GET /health HTTP/1.1" 200 87 0.002 "-" "kube-probe/1.32" "-" dd.trace_id="68c4a17f000000009aed12af2ccb1ead" dd.span_id="9aed12af2ccb1ead"
```

Datadog에서 로그와 트레이스의 상호 연동을 활성화하려면 이러한 ID를 16진수에서 10진수로 변환하도록 로그 처리 파이프라인을 구성합니다. 사용하는 계측 방법에 관계없이 동일한 단계를 따르세요.

1. Datadog에서 [{{< ui >}}Log Configuration{{< /ui >}}][9] 페이지로 이동합니다.
2. 활성 NGINX 파이프라인 위에 마우스를 가져가고 {{< ui >}}Clone{{< /ui >}} 아이콘을 클릭하여 편집 가능한 버전을 만듭니다.
3. 복제된 파이프라인을 클릭합니다.
4. {{< ui >}}Add Processor{{< /ui >}}를 클릭합니다.
5. 프로세서 유형으로 [Grok 구문 분석 도구][11]를 선택합니다.
6. 로그 이벤트에서 트레이스 ID 속성을 추출하도록 다음 구문 분석 규칙을 정의합니다. 이 규칙은 Datadog 모듈과 OpenTelemetry 출력 둘 다에 작동합니다.
   ```text
   extract_correlation_ids %{data} dd.trace_id="%{notSpace:dd.trace_id:nullIf("-")}" dd.span_id="%{notSpace:dd.span_id:nullIf("-")}"
   ```
7. {{< ui >}}Create{{< /ui >}}를 클릭합니다.
8. {{< ui >}}Add Processor{{< /ui >}}를 다시 클릭합니다.
9. 프로세서 유형으로 [Trace ID Remapper][10]를 선택합니다. 이 프로세서는 구문 분석된 ID를 해당 APM 트레이스와 연결합니다.
10. {{< ui >}}Set trace id attribute(s){{< /ui >}} 필드에 `dd.trace_id`를 입력합니다.
11. {{< ui >}}Create{{< /ui >}}를 클릭합니다.
12. {{< ui >}}Add Processor{{< /ui >}}를 다시 클릭합니다.
13. 프로세서 유형으로 [Span ID Remapper][12]를 선택합니다. 이 프로세서는 구문 분석된 ID를 해당 APM 스팬과 연결합니다.
14. {{< ui >}}Set span id attribute(s){{< /ui >}} 필드에 `dd.span_id`를 입력합니다.
15. {{< ui >}}Create{{< /ui >}}를 클릭합니다.
16. 새 파이프라인을 저장하고 활성화합니다.

파이프라인이 활성화되면 새로운 NGINX 로그가 해당 트레이스 및 스팬과 자동으로 상호 연동됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/nginx-datadog/releases/latest
[2]: https://hub.docker.com/layers/library/nginx/1.23.2-alpine/images/sha256-0f2ab24c6aba5d96fcf6e7a736333f26dca1acf5fa8def4c276f6efc7d56251f?context=explore
[3]: https://hub.docker.com/layers/library/amazonlinux/2.0.20230119.1/images/sha256-db0bf55c548efbbb167c60ced2eb0ca60769de293667d18b92c0c089b8038279?context=explore
[4]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md
[6]: https://github.com/DataDog/nginx-datadog/
[7]: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/
[8]: /ko/logs/guide/ease-troubleshooting-with-cross-product-correlation
[9]: https://app.datadoghq.com/logs/pipelines
[10]: /ko/logs/log_configuration/processors/trace_remapper/
[11]: /ko/logs/log_configuration/processors/grok_parser/
[12]: /ko/logs/log_configuration/processors/span_remapper/