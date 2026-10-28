---
aliases:
- /ko/agent/kubernetes/appsec
- /ko/security/application_security/setup/kubernetes/appsec-injector
description: Kubernetes 인그레스 프록시 및 게이트웨이에 대해 App and API Protection 자동 활성화
further_reading:
- link: /containers/kubernetes/apm/
  tag: 설명서
  text: 애플리케이션 트레이스 수집
- link: /containers/kubernetes/log/
  tag: 설명서
  text: 애플리케이션 로그 수집
- link: /security/application_security/setup/kubernetes/envoy-gateway
  tag: 설명서
  text: Envoy Gateway용 App and API Protection
- link: /security/application_security/setup/kubernetes/istio
  tag: 설명서
  text: Istio용 App and API Protection
- link: /security/application_security/setup/nginx/ingress-controller
  tag: 설명서
  text: ingress-nginx용 App and API Protection
- link: /security/default_rules/?category=cat-application-security
  tag: 설명서
  text: OOTB App and API Protection 규칙
- link: /security/application_security/troubleshooting
  tag: 설명서
  text: App and API Protection 문제 해결
site_support_id: containers_kubernetes_appsec
title: Kubernetes용 App and API Protection
---
이 페이지에서는 Kubernetes용 [App and API Protection][11]을 설정하여 지원되는 Kubernetes 인그레스 프록시 및 게이트웨이가 인프라 에지에서 API 검색, 위협 탐지 및 인라인 차단을 실행하도록 자동으로 구성하는 방법을 설명합니다.

## 개요 {#overview}

Kubernetes용 App and API Protection은 Kubernetes 클러스터에서 지원되는 인그레스 프록시 및 게이트웨이를 자동으로 구성하여 Application Security 모니터링을 활성화합니다. 이를 통해 수동 프록시 구성이 필요하지 않으며, 개별 서비스를 수정하거나 애플리케이션 전체에 트레이서를 배포하지 않고도 API 전반에 걸친 보안 커버리지를 제공합니다.

### 자동 구성을 수행하는 주체 {#what-performs-the-automatic-configuration}

Kubernetes용 App and API Protection은 다음을 수행하는 Kubernetes 컨트롤러(Datadog Cluster Agent에서 실행)를 사용합니다.
클러스터에서 지원되는 프록시를 - **자동으로 감지**합니다.
- **프록시를 구성**하여 외부 Application Security 프로세서를 통해 트래픽을 라우팅합니다.
인그레스 계층을 통과하는 모든 트래픽에 대해 - **위협 탐지를 활성화**합니다.
Helm을 사용한 중앙 집중식 구성을 통해 - **운영을 간소화**합니다.

### 지원되는 프록시 {#supported-proxies}

지원되는 프록시 목록 및 프록시별 설정 단계는 [설정 페이지][10]를 참조하세요.

## 제한 사항 {#limitations}

### 사이드카 모드 {#sidecar-mode}
- Datadog Cluster Agent 7.80.2 이상이 필요합니다.
- 각 게이트웨이 포드는 자체 프로세서 인스턴스를 실행하므로 포드당 리소스 사용량이 증가합니다.

### 외부 모드 {#external-mode}
- Datadog Cluster Agent 7.80.2 이상이 필요합니다.
- 보안 프로세서는 수동으로 배포 및 확장해야 합니다.
- 배포된 서비스에 적절한 네트워크 정책이 필요할 수 있습니다.
  - 서비스 포트의 프록시 포드에서
  - 트레이스용 Datadog Agent로

### 프록시 호환성 {#proxy-compatibility}
- 프록시 버전 호환성에 대한 자세한 내용은 [호환성 설명서][8]를 참조하세요.

## 전제 조건 {#prerequisites}

Kubernetes용 App and API Protection을 활성화하기 전에 다음 사항을 확인하세요.

- 실행 중인 Kubernetes 클러스터(버전 1.20 이상)
- [Datadog Cluster Agent 7.80.2 이상][1]이 클러스터에 설치 및 구성됨
- 하나 이상의 [지원되는 프록시][10]가 설치됨
- [Remote Configuration][4]이 활성화되어 Datadog UI를 통해 공격자를 차단할 수 있음

## 작동 방식 {#how-it-works}

Kubernetes용 App and API Protection은 두 가지 배포 모드를 지원합니다.

- **사이드카 모드**(기본값): Application Security 프로세서가 각 게이트웨이 포드에 직접 주입된 사이드카 컨테이너로 실행됩니다. 별도의 프로세서 배포가 필요하지 않으며, 프로세서는 게이트웨이 포드와 함께 자동으로 확장됩니다.
- **외부 모드**: 단일 중앙 집중식 Application Security 프로세서 배포가 클러스터의 모든 게이트웨이 트래픽을 처리합니다. 전체 클러스터에 대해 하나의 공유 프로세서를 관리하려는 경우 이 모드를 사용하세요.

기본 사이드카 모드를 설정하려면 [사이드카 모드 설정](#set-up-sidecar-mode)을 참조하세요. 대신 중앙 집중식 프로세서를 배포하려면 [외부 모드 설정](#set-up-external-mode)을 참조하세요.

## 사이드카 모드 설정 {#set-up-sidecar-mode}

사이드카 모드에서 보안 프로세서는 각 게이트웨이 포드에 직접 주입된 컨테이너로 실행됩니다. Cluster Agent가 주입을 자동으로 처리하므로 별도의 프로세서 배포나 서비스가 필요하지 않습니다.

### 사이드카 모드 사용 시기 {#when-to-use-sidecar-mode}

- 별도의 프로세서 배포 및 서비스를 관리하지 않으려는 경우
- 각 게이트웨이 포드와 프로세서를 같은 위치에 배치하려는 경우

### 설정 {#setup}

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml`에 다음 내용을 추가합니다. 주입기가 프로세서 배포를 자동으로 처리하므로 `processor.service.*` 값이 필요하지 않습니다.

```yaml
datadog:
  appsec:
    injector:
      enabled: true
      # mode defaults to "sidecar" when omitted
```

Datadog Helm 차트(버전 3.153 이상)를 설치하거나 업그레이드합니다.

```bash
helm upgrade -i datadog-agent datadog/datadog -f values.yaml
```

{{% /tab %}}
{{% tab "Datadog Operator" %}}

이 옵션을 사용하려면 Datadog Operator 버전 1.27.1 이상이 필요합니다.

`DatadogAgent` 리소스에 주석을 추가합니다. 사이드카 모드가 기본값이므로 주입기를 활성화하는 것만으로 충분합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/appsec.injector.enabled: "true"
```

구성을 적용합니다.

```bash
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{< /tabs >}}

### 사이드카 구성 참조 {#sidecar-configuration-reference}

모든 사이드카 파라미터는 `datadog.appsec.injector.sidecar` 아래에 중첩된 Helm 값으로 사용하거나 `DatadogAgent` 주석(Datadog Operator 버전 1.27.1 이상)으로 사용할 수 있습니다.

`sidecar.image`
: **Datadog Operator 주석**: `agent.datadoghq.com/appsec.sidecar.image`
: **유형**: 문자열
: **기본값**: `ghcr.io/datadog/dd-trace-go/service-extensions-callout`
: **설명**: 사이드카 컨테이너 이미지

`sidecar.imageTag`
: **Datadog Operator 주석**: `agent.datadoghq.com/appsec.sidecar.image_tag`
: **유형**: 문자열
: **기본값**: `v2.6.0`
: **설명**: 사이드카 컨테이너 이미지 태그

`sidecar.port`
: **Datadog Operator 주석**: `agent.datadoghq.com/appsec.sidecar.port`
: **유형**: 정수
: **기본값**: `8080`
: **설명**: 사이드카 프로세서용 gRPC 수신 포트

`sidecar.healthPort`
: **Datadog Operator 주석**: `agent.datadoghq.com/appsec.sidecar.health_port`
: **유형**: 정수
: **기본값**: `8081`
: **설명**: 사이드카 프로세서용 상태 검사 포트

`sidecar.bodyParsingSizeLimit`
: **Datadog Operator 주석**: `agent.datadoghq.com/appsec.sidecar.body_parsing_size_limit`
: **유형**: 정수
: **기본값**: `0`
: **설명**: 처리할 최대 요청 본문 크기(바이트). `0`은 본문 처리를 비활성화합니다. 본문 구문 분석을 완전히 비활성화하려면 `-1`을 사용하세요.

`sidecar.resources.requests.cpu`
: **Datadog Operator 주석**: `agent.datadoghq.com/appsec.sidecar.resources.requests.cpu`
: **유형**: 문자열
: **기본값**: `10m`
: **설명**: 사이드카 컨테이너에 대한 CPU 요청

`sidecar.resources.requests.memory`
: **Datadog Operator 주석**: `agent.datadoghq.com/appsec.sidecar.resources.requests.memory`
: **유형**: 문자열
: **기본값**: `128Mi`
: **설명**: 사이드카 컨테이너에 대한 메모리 요청

`sidecar.resources.limits.cpu`
: **Datadog Operator 주석**: `agent.datadoghq.com/appsec.sidecar.resources.limits.cpu`
: **유형**: 문자열
: **기본값**: `""`
: **설명**: 사이드카 컨테이너에 대한 CPU 제한(선택 사항)

`sidecar.resources.limits.memory`
: **Datadog Operator 주석**: `agent.datadoghq.com/appsec.sidecar.resources.limits.memory`
: **유형**: 문자열
: **기본값**: `""`
: **설명**: 사이드카 컨테이너에 대한 메모리 제한(선택 사항)

## 외부 모드 설정 {#set-up-external-mode}

외부 모드에서는 클러스터의 모든 게이트웨이 트래픽을 처리하는 단일 중앙 집중식 Application Security 프로세서를 배포합니다. Cluster Agent는 지원되는 프록시가 이 프로세서로 트래픽을 라우팅하도록 자동으로 구성합니다.

### 아키텍처 {#architecture}

-  **보안 프로세서 배포**: 관련 서비스가 포함된 Kubernetes 배포로 중앙 집중식 Application Security 프로세서를 배포합니다.
-  **자동 프록시 감지**: 컨트롤러는 Kubernetes 인포머를 사용하여 클러스터에서 지원되는 프록시 리소스를 감시합니다.
-  **자동 구성**: 프록시가 감지되면 컨트롤러는 보안 프로세서 서비스로 트래픽을 라우팅하는 데 필요한 프록시 구성을 생성합니다.
-  **트래픽 처리**: 게이트웨이는 보안 분석을 위해 Kubernetes 서비스를 통해 보안 프로세서로 트래픽을 라우팅합니다.

### 이점 {#benefits}

- **리소스 효율성**: 모든 게이트웨이의 트래픽을 처리하는 단일 공유 프로세서
- **중앙 집중식 관리**: 모니터링, 확장 및 구성을 위한 단일 배포
- **코드형 인프라**: Helm 값을 통해 구성 관리
- **비침습적**: 애플리케이션 코드 변경 불필요
- **확장성**: 추가 구성 없이 새 게이트웨이 추가

### 단계 1: 보안 프로세서 배포 {#step-1-deploy-the-security-processor}

게이트웨이에서 전달된 트래픽을 분석하는 보안 프로세서 서비스를 배포합니다. 프록시별 배포 세부 정보는 해당 프록시의 [설정 설명서][10]를 참조하세요.

배포 예시:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: datadog-aap-extproc-deployment
  namespace: datadog
spec:
  replicas: 2
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
        image: ghcr.io/datadog/dd-trace-go/service-extensions-callout:v2.4.0
        ports:
        - name: grpc
          containerPort: 443
        - name: health
          containerPort: 80
        env:
        # Use the address of the datadog agent service in your cluster
        - name: DD_AGENT_HOST
          value: "datadog-agent.datadog.svc.cluster.local"

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
  name: datadog-aap-extproc-service
  namespace: datadog
spec:
  ports:
  - name: grpc
    port: 443
    targetPort: grpc
  selector:
    app: datadog-aap-extproc
  type: ClusterIP
```

매니페스트를 적용합니다.

```bash
kubectl apply -f datadog-aap-extproc-service.yaml
```

### 단계 2: 자동 구성 활성화 {#step-2-enable-automatic-configuration}

Helm 또는 Datadog Operator를 사용하여 Datadog Cluster Agent가 보안 프로세서 서비스를 가리키도록 지정합니다.

**참고:** 프로세서 서비스 이름(`datadog-aap-extproc-service`)은 1단계에서 배포한 서비스와 일치해야 합니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

이 옵션을 사용하려면 Datadog Operator 버전 1.27.1 이상이 필요합니다.

`DatadogAgent` 리소스에 주석을 추가합니다. 서비스 이름 주석은 필수이며 보안 프로세서 서비스와 일치해야 합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/appsec.injector.enabled: "true"
    agent.datadoghq.com/appsec.injector.mode: "external"
    agent.datadoghq.com/appsec.injector.processor.service.name: "datadog-aap-extproc-service"  # Required: must match your security processor service name
    agent.datadoghq.com/appsec.injector.processor.service.namespace: "datadog"
```

구성을 적용합니다.

```bash
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

Helm 값을 사용하여 Kubernetes용 App and API Protection을 구성합니다. 다음 내용을 `values.yaml`에 추가합니다.

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

Datadog Helm 차트(버전 3.153 이상)를 설치하거나 업그레이드합니다.

```bash
helm upgrade -i datadog-agent datadog/datadog -f values.yaml
```

{{% /tab %}}
{{< /tabs >}}

### 3단계: 설치 확인 {#step-3-verify-the-installation}

Cluster Agent가 프록시를 감지했는지 확인하세요.

```bash
kubectl logs -n datadog deployment/datadog-cluster-agent | grep appsec
```

#### 프록시 구성 검증 {#verify-proxy-configuration}

컨트롤러가 프록시에 대한 프록시 구성 리소스를 생성했는지 확인하세요. 프록시별 검증 명령은 해당 프록시의 [설정 설명서][10]를 참조하세요.

Datadog Cluster Agent는 클러스터에서 수행되어 성공 또는 실패한 각 작업에 대한 이벤트를 생성합니다.

#### 트래픽 처리 테스트 {#test-traffic-processing}

게이트웨이를 통해 요청을 보내고 Datadog [App and API Protection][5] UI에 나타나는지 확인하세요.

1. Datadog에서 [Security > Application Security][5]로 이동합니다.
2. 게이트웨이 트래픽에서 보안 신호를 찾습니다.
3. 위협 탐지가 활성화되어 있는지 확인합니다.

## 구성 참조 {#configuration-reference}

### 자동 구성 옵션 {#automatic-configuration-options}

`enabled`
: **Datadog Operator 주석**: `agent.datadoghq.com/appsec.injector.enabled`
: **유형**: 부울
: **기본값**: `false`
: **설명**: 통합 활성화 또는 비활성화

`mode`
: **Datadog Operator 주석**: `agent.datadoghq.com/appsec.injector.mode`
: **유형**: 문자열
: **기본값**: `""`, 비어 있는 경우 기본값은 sidecar입니다.
: **설명**: 주입 모드: `"sidecar"` 또는 `"external"`

`autoDetect`
: **Datadog Operator 주석**: `agent.datadoghq.com/appsec.injector.autoDetect`
: **유형**: 부울
: **기본값**: `true`
: **설명**: 지원되는 프록시 자동 감지 및 구성

`proxies`
: **Datadog Operator 주석**: `agent.datadoghq.com/appsec.injector.proxies`
: **유형**: JSON 배열
: **기본값**: `[]`
: **설명**: 구성할 프록시 유형의 수동 목록. 유효한 값은 [설정 페이지][10]를 참조하세요.

`processor.service.name`
: **Datadog Operator 주석**: `agent.datadoghq.com/appsec.injector.processor.service.name`
: **유형**: 문자열
: **기본값**: 없음
: **설명**: **필수 항목.** 보안 프로세서 Kubernetes 서비스의 이름

`processor.service.namespace`
: **Datadog Operator 주석**: `agent.datadoghq.com/appsec.injector.processor.service.namespace`
: **유형**: 문자열
: **기본값**: Cluster Agent가 실행 중인 네임스페이스로 기본 설정됩니다.
: **설명**: 보안 프로세서 서비스가 배포된 네임스페이스

`processor.address`
: **Datadog Operator 주석**: `agent.datadoghq.com/appsec.injector.processor.address`
: **유형**: 문자열
: **기본값**: `{service.name}.{service.namespace}.svc`
: **설명**: 전체 서비스 주소 재정의

`processor.port`
: **Datadog Operator 주석**: `agent.datadoghq.com/appsec.injector.processor.port`
: **유형**: 정수
: **기본값**: `443`
: **설명**: 보안 프로세서 서비스의 포트

### 외부 모드에서 업그레이드{#upgrading-from-external-mode}

외부 모드를 사용하던 이전 버전에서 업그레이드하는 경우, 기본 모드가 sidecar로 변경되었습니다. 외부 모드를 계속 사용하려면 Helm 값에 `mode: "external"`을 명시적으로 설정하세요.

```yaml
datadog:
  appsec:
    injector:
      enabled: true
      mode: "external"
      processor:
        service:
          name: datadog-aap-extproc-service
          namespace: datadog
```

### 특정 리소스 제외{#opting-out-specific-resources}

레이블을 추가하여 특정 게이트웨이 또는 GatewayClass 리소스를 자동 구성에서 제외할 수 있습니다.

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: my-gateway
  namespace: my-namespace
  labels:
    appsec.datadoghq.com/enabled: "false"  # Exclude this gateway from automatic configuration
spec:
  # ... gateway configuration
```

레이블이 `appsec.datadoghq.com/enabled: "false"`인 리소스는 무시됩니다. 이 기능은 다음과 같은 경우에 유용합니다.
- 특정 게이트웨이를 수동으로 구성하는 경우
- 테스트를 위해 App and API Protection을 일시적으로 비활성화하는 경우
- 보안 모니터링에서 특정 게이트웨이를 제외하는 경우

**참고**: 기본적으로 모든 리소스가 포함됩니다. 레이블이 `"false"`로 명시적으로 설정된 리소스만 제외됩니다.

## 문제 해결 {#troubleshooting}

모든 오류는 Kubernetes 이벤트로 기록됩니다. 계측하려는 게이트웨이 또는 GatewayClass에서 이벤트를 확인하세요.

### 자동 구성이 프록시를 감지하지 못함 {#automatic-configuration-not-detecting-proxies}

**증상**: 프록시 구성 리소스가 생성되지 않습니다.

**해결 방법**:
- `autoDetect`가 `true`로 설정되어 있는지, 또는 프록시가 수동으로 지정되었는지 확인하세요.
- Cluster Agent 로그에서 프록시 감지 메시지를 확인하세요.
- 프록시가 설치되어 있으며 예상되는 Kubernetes 리소스(Gateway, GatewayClass)가 존재하는지 확인하세요.
- `proxies` 파라미터를 사용하여 프록시 유형을 수동으로 지정해 보세요.

### 프록시 구성이 생성되지 않음 {#proxy-configuration-not-created}

**증상**: 컨트롤러가 실행 중이지만 구성 리소스가 누락되었습니다.

**해결 방법**:
- Cluster Agent 로그에서 RBAC 권한 오류를 확인하세요.
- Cluster Agent 서비스 계정에 프록시 구성 리소스를 생성할 권한이 있는지 확인하세요.
- 프로세서 서비스가 존재하며 액세스 가능한지 확인하세요.
- 기존 정책이나 필터가 충돌하는지 확인하세요.

### 트래픽이 처리되지 않음 {#traffic-not-being-processed}

**증상**: Datadog UI에 보안 이벤트가 나타나지 않습니다.

**해결 방법**:
- 보안 프로세서 배포가 실행 중인지 확인하세요. `kubectl get pods -n datadog -l app=datadog-aap-extproc`
- 구성의 이 부분과 관련하여 리버스 프록시의 경고 로그를 확인하세요.
- 프로세서 로그에서 연결 오류를 확인하세요. `kubectl logs -n datadog -l app=datadog-aap-extproc`
- 프로세서 서비스가 올바르게 구성되었고 확인 가능한지 확인하세요.
- 게이트웨이 포드에서 프로세서 서비스로의 연결을 테스트하세요.
- Datadog Agent에서 [Remote Configuration][4]이 활성화되어 있는지 확인하세요.

### 보안 프로세서 연결 문제 {#security-processor-connection-issues}

**증상**: 게이트웨이가 보안 프로세서에 도달할 수 없습니다.

**해결 방법**:
- 프로세서 서비스 이름과 네임스페이스가 구성과 일치하는지 확인하세요.
- 네임스페이스 간 트래픽을 차단하는 NetworkPolicy 규칙이 있는지 확인하세요.
- 게이트웨이 포드에서 DNS 확인을 테스트하세요. `nslookup datadog-aap-extproc-service.datadog.svc.cluster.local`
- 프로세서 포트 구성이 서비스 정의와 일치하는지 확인하세요.

### RBAC 권한 오류 {#rbac-permission-errors}

**증상**: Cluster Agent 로그에 권한 거부 오류가 표시됩니다.

**해결 방법**:
- Cluster Agent ClusterRole에 다음 권한이 포함되어 있는지 확인하세요.
  - `gateway.networking.k8s.io/gateways`
  - `gateway.networking.k8s.io/gatewayclasses`
- ClusterRoleBinding이 올바른 서비스 계정을 참조하는지 확인하세요.
- 최신 버전의 Datadog Helm 차트 또는 Datadog Operator를 사용하고 있는지 확인하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/containers/kubernetes/installation/
[4]: /ko/agent/remote_config/?tab=helm#enabling-remote-configuration
[5]: https://app.datadoghq.com/security/appsec
[8]: /ko/security/application_security/setup/compatibility/
[10]: /ko/security/application_security/setup/kubernetes/
[11]: /ko/security/application_security/