---
further_reading:
- link: /opentelemetry/setup/collector_exporter/
  tag: 설명서
  text: 오픈 텔레메트리 컬렉터 설정
- link: /infrastructure/list/
  tag: 설명서
  text: 인프라 목록
- link: /infrastructure/resource_catalog/
  tag: 설명서
  text: Resource Catalog
title: Datadog 확장
---
## 개요 {#overview}

OpenTelemetry 컬렉터 Contrib [modules v0.129.0][4] 버전 이상부터는 Datadog Extension이 OpenTelemetry 컬렉터의 [contrib 배포판][5]에 포함되어 있습니다. 또한 OpenTelemetry 컬렉터의 [사용자 지정 빌드][6]에서도 사용할 수 있습니다. [DDOT 컬렉터][8]에서는 확장 프로그램이 자동으로 활성화됩니다.

Datadog Extension을 사용하면 [Fleet Automation][7], [인프라 목록][2] 및 [Resource Catalog][3]를 사용하여 Datadog에서 직접 OpenTelemetry 컬렉터 구성 및 빌드 정보를 조회할 수 있습니다. 이 확장 프로그램은 권장되는 OTLP HTTP 익스포터 설정 및 Datadog Exporter와 함께 작동합니다.

{{< img src="/agent/fleet_automation/fleet-automation-pipeline-view.png" alt="Fleet Automation의 파이프라인 시각화를 통해 OTel 컬렉터 구성 조회" style="width:100%;" >}}

## 주요 기능 {#key-features}

- **컬렉터 구성 가시성**: 인프라에 있는 모든 OTel 컬렉터의 전체 구성을 조회하세요.
- **빌드 정보**: 컬렉터 버전, 빌드 세부 정보 및 구성 요소 정보를 확인하세요.
- **로컬 검사 엔드포인트**: 로컬 디버깅 및 구성 확인을 위해 HTTP 엔드포인트를 사용하세요.
- **Fleet Management**: Datadog UI에서 OpenTelemetry 컬렉터 플릿을 모니터링하고 관리하세요.

## 설정 {#setup}

<div class="alert alert-danger"><a href="/opentelemetry/setup/ddot_collector/">DDOT 컬렉터</a>를 사용하는 경우, Datadog Extension을 <strong>수동으로</strong> 구성하지 마세요. 모든 DDOT 컬렉터 버전에서 자동으로 활성화됩니다.</div>

### 1. 컬렉터 구성에 Datadog Extension 추가 {#1-add-the-datadog-extension-to-your-collector-configuration}

OpenTelemetry 컬렉터 구성 파일에서 Datadog Extension을 구성합니다.

```yaml
extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    # hostname: "my-collector-host"  # Optional: must match the hostname in exported telemetry

service:
  extensions: [datadog]
```

### 2. 활성 텔레메트리 파이프라인 구성 {#2-configure-an-active-telemetry-pipeline}

최소 하나의 활성 텔레메트리 파이프라인을 구성하고 해당 데이터를 Datadog으로 내보냅니다. 권장 구성의 경우 [OTLP HTTP 익스포터 설정][9]을 사용하세요.

이 확장 프로그램은 컬렉터 및 호스트 메타데이터를 사용하여 보고된 구성을 Datadog의 해당 호스트와 연결합니다.

### 3. (선택 사항) 사용자 지정 리소스 속성 추가 {#3-optional-add-custom-resource-attributes}

Datadog Extension은 컬렉터의 내부 텔레메트리에서 리소스 속성을 자동으로 수집하여 Datadog으로 전송하는 메타데이터 페이로드에 포함합니다. 배포 환경, 팀 또는 Kubernetes 클러스터 이름과 같은 사용자 지정 속성을 연결하려면 `service.telemetry.resource` 아래에 설정합니다.

```yaml
service:
  telemetry:
    resource:
      deployment.environment.name: production
      team.name: platform
      k8s.cluster.name: prod-us-east1-cluster-a
```

컬렉터는 `service.name`, `service.version` 및 `service.instance.id`(무작위로 생성된 UUID)를 내부 텔레메트리에 자동으로 연결합니다. 이 항목들을 수동으로 설정할 필요는 없습니다.

### 4. (선택 사항) 게이트웨이 토폴로지 구성(미리 보기) {#4-optional-configure-gateway-topology-preview}

Datadog에 도달하기 전에 하나 이상의 게이트웨이 컬렉터를 통해 텔레메트리를 전달하는 OpenTelemetry 컬렉터 게이트웨이 설정이 있는 경우, Datadog Extension은 [Fleet Automation][7]에서 연결된 파이프라인 그래프로 나타나도록 토폴로지를 게시할 수 있습니다.

{{< img src="opentelemetry/integrations/datadog_extension_gateway_topology.png" alt="두 계층의 게이트웨이 컬렉터를 통해 Datadog으로 전달되는 DaemonSet 컬렉터를 보여주는 Fleet Automation의 게이트웨이 토폴로지 뷰" style="width:100%;" >}}

이 보기를 활성화하려면 파이프라인의 각 컬렉터를 다음과 같이 구성하세요.

- 에이전트 또는 DaemonSet 컬렉터의 경우`deployment_type`을 `daemonset`로 설정하고 게이트웨이 컬렉터의 경우 `gateway`로 설정합니다.
- 다운스트림 게이트웨이로 전달하는 컬렉터에 `gateway_destination`을 설정합니다. 값은 `<namespace>/<service>` 형식의 수신 게이트웨이용 Kubernetes Service입니다.
- 게이트웨이 컬렉터에 `gateway_service`를 설정합니다. 값은 게이트웨이 포드 앞단의 Kubernetes Service입니다.
- 다중 계층 파이프라인의 **중간** 게이트웨이는 **`gateway_service`(자체 서비스)와 `gateway_destination`(다음 게이트웨이)을 모두 설정합니다**.
- 파이프라인의 모든 컬렉터에서 `service.telemetry.resource` 아래에 `k8s.cluster.name`을 설정합니다. 이는 **필수**입니다. `gateway_service` 및 `gateway_destination`과 함께 Fleet Automation이 파이프라인 그래프를 재구성하는 데 사용하는 조인 키를 형성합니다.
- 컬렉터 내부 메트릭을 활성화하여 확장 프로그램이 **트래픽 표시** 토글을 통해 그래프의 각 에지에 로그, 메트릭 또는 트레이스 볼륨 데이터를 할당할 수 있도록 합니다. [OpenTelemetry 컬렉터 상태 메트릭][10]을 참조하세요.

아래 예시는 일반적인 2계층 사례를 다룹니다. 노드 로컬 DaemonSet이 게이트웨이 Deployment로 전달하고, 게이트웨이 Deployment가 Datadog Exporter를 사용하여 Datadog으로 전송합니다.

각 컬렉터는 `service.telemetry.metrics`을 통해 Prometheus 풀 엔드포인트에서 자체 상태 메트릭을 노출하고, `prometheus/internal` 수신기로 해당 엔드포인트를 스크랩하며, 애플리케이션 텔레메트리와 동일한 메트릭 파이프라인을 통해 결과를 라우팅합니다. 이를 통해 토폴로지 보기의 각 노드와 에지에 데이터가 표시됩니다.

#### DaemonSet 컬렉터 {#daemonset-collector}

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  prometheus/internal:
    config:
      scrape_configs:
        - job_name: otelcol-internal
          scrape_interval: 10s
          static_configs:
            - targets: ['localhost:8888']

exporters:
  otlp:
    endpoint: otelcol-gateway.monitoring.svc.cluster.local:4317
    tls:
      insecure: true

extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    deployment_type: daemonset
    gateway_destination: monitoring/otelcol-gateway

service:
  telemetry:
    metrics:
      level: normal
      readers:
        - pull:
            exporter:
              prometheus:
                host: 0.0.0.0
                port: 8888
                without_type_suffix: true
                without_units: true
    resource:
      k8s.cluster.name: my-cluster
      k8s.node.name: ${env:K8S_NODE_NAME}
      k8s.pod.name: ${env:K8S_POD_NAME}
  extensions: [datadog]
  pipelines:
    metrics:
      receivers: [otlp, prometheus/internal]
      exporters: [otlp]
    traces:
      receivers: [otlp]
      exporters: [otlp]
    logs:
      receivers: [otlp]
      exporters: [otlp]
```

DaemonSet의 `metrics` 파이프라인에는 `prometheus/internal`이 포함되어 있어 컬렉터 자체의 상태 메트릭이 애플리케이션 텔레메트리와 함께 OTLP를 통해 게이트웨이로 전송되고, 게이트웨이의 Datadog Exporter를 통해 Datadog에 도달합니다.

#### Gateway 컬렉터 {#gateway-collector}

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  prometheus/internal:
    config:
      scrape_configs:
        - job_name: otelcol-internal
          scrape_interval: 10s
          static_configs:
            - targets: ['localhost:8888']

exporters:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    metrics:
      resource_attributes_as_tags: true
    sending_queue:
      batch:
        flush_timeout: 10s

extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    deployment_type: gateway
    gateway_service: monitoring/otelcol-gateway

service:
  telemetry:
    metrics:
      level: normal
      readers:
        - pull:
            exporter:
              prometheus:
                host: 0.0.0.0
                port: 8888
                without_type_suffix: true
                without_units: true
    resource:
      k8s.cluster.name: my-cluster
      k8s.node.name: ${env:K8S_NODE_NAME}
      k8s.pod.name: ${env:K8S_POD_NAME}
  extensions: [datadog]
  pipelines:
    metrics:
      receivers: [otlp, prometheus/internal]
      exporters: [datadog]
    traces:
      receivers: [otlp]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      exporters: [datadog]
```

게이트웨이의 `metrics` 파이프라인은 전달된 텔레메트리(OTLP를 통해 DaemonSet에서 전송됨)와 `prometheus/internal`에서 생성된 자체 내부 메트릭을 모두 수신한 다음 모든 데이터를 Datadog으로 내보냅니다.

#### 다중 계층 게이트웨이 파이프라인 {#multi-layer-gateway-pipelines}

게이트웨이 계층이 두 개 이상인 파이프라인의 경우 중간 계층에서 `gateway_service`와 `gateway_destination`을 함께 설정합니다. 예를 들어, DaemonSet과 Layer-1 게이트웨이 사이에 Layer-2 게이트웨이가 있는 3계층 토폴로지에서 Layer-2 게이트웨이 확장은 다음과 같이 구성됩니다.

```yaml
extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    deployment_type: gateway
    gateway_service: monitoring/otelcol-gateway-l2
    gateway_destination: monitoring/otelcol-gateway-l1
```

DaemonSet은 `monitoring/otelcol-gateway-l2`로 전달하고, Layer-2 게이트웨이는 `monitoring/otelcol-gateway-l1`로 전달하며, Layer-1 게이트웨이는 Datadog으로 전송합니다. 각 컬렉터는 동일한 `k8s.cluster.name`을 보고합니다.

## 구성 옵션 {#configuration-options}

| 파라미터 | 설명 | 기본값 |
|-----------|-------------|---------|
| `api.key` | Datadog API 키(필수). | - |
| `api.site` | Datadog 사이트(예: `us5.datadoghq.com`). | `datadoghq.com` |
| `api.fail_on_invalid_key` | API 키가 유효하지 않으면 시작 시 종료됩니다. | `true` |
| `hostname` | 컬렉터의 사용자 지정 호스트 이름. | 자동 감지 |
| `http.endpoint` | 로컬 HTTP 서버 엔드포인트. | `localhost:9875` |
| `http.path` | 메타데이터용 HTTP 서버 경로. | `/metadata` |
| `deployment_type` | 컬렉터가 배포되는 방식을 식별합니다. 이 값은 [Fleet Automation][7]에 표시되며 [게이트웨이 토폴로지](#4-optional-configure-gateway-topology-preview)에 필요합니다. 다음 중 하나: `gateway`, `daemonset` 또는 `unknown`. 기본값 `unknown`은 배포 유형이 설정되지 않았음을 의미합니다. | `unknown` |
| `installation_method` | 컬렉터가 설치된 방식입니다. 다음 중 하나: `kubernetes`, `bare-metal`, `docker`, `ecs-fargate`, `eks-fargate` 또는 설정되지 않음. 컬렉터 v0.148.0 이상에서 사용할 수 있습니다. | 설정되지 않음 |
| `gateway_service` | **게이트웨이** 컬렉터에만 설정합니다. 게이트웨이 컬렉터 포드 앞단에 있는 Kubernetes 서비스입니다. 형식: `service` 또는 `namespace/service`. 컬렉터 v0.150.0 이상에서 사용할 수 있습니다. | - |
| `gateway_destination` | 다운스트림 게이트웨이로 텔레메트리를 전달하는 모든 컬렉터에 설정합니다. 이 컬렉터가 텔레메트리를 전달하는 Kubernetes Service입니다. 수신 게이트웨이 컬렉터의 `gateway_service`와 일치해야 합니다. 형식: `service` 또는 `namespace/service`. 컬렉터 v0.150.0 이상에서 사용할 수 있습니다. | - |
| `proxy_url` | 아웃바운드 요청을 위한 HTTP 프록시 URL입니다. | - |
| `timeout` | HTTP 요청에 대한 타임아웃입니다. | `30s` |
| `tls.insecure_skip_verify` | TLS 인증서 검증을 건너뜁니다. | `false` |

<div class="alert alert-danger">
<strong>호스트 이름 일치</strong>: 사용자 지정 호스트 이름을 지정하는 경우 <code>hostname</code> Datadog Extension의 해당 호스트 이름은 내보낸 텔레메트리의 호스트 이름과 일치해야 합니다. 확장 프로그램은 파이프라인의 애플리케이션 텔레메트리에서 호스트 이름을 유추하지 않으며, 시스템 또는 클라우드 공급자 API나 수동 구성을 통해 호스트 이름을 가져옵니다. Datadog Exporter를 사용하는 경우, 해당 <code>hostname</code> 값도 일치해야 합니다. 그렇지 않으면 Datadog이 텔레메트리를 올바른 호스트와 연관시키지 못할 수 있으며, 중복된 호스트가 나타날 수 있습니다.
</div>

### Datadog Exporter를 사용한 전체 구성 예시 {#complete-configuration-example-with-the-datadog-exporter}

다음 예시는 Datadog Exporter를 사용합니다. 확장 프로그램 자체는 이를 필요로 하지 않습니다. 권장 파이프라인의 경우 [OpenTelemetry 컬렉터 설정][9]의 OTLP HTTP 익스포터 구성을 사용하세요.

```yaml
extensions:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    hostname: "my-collector-host"
    http:
      endpoint: "localhost:9875"
      path: "/metadata"
    proxy_url: "http://proxy.example.com:8080"
    timeout: 30s
    tls:
      insecure_skip_verify: false

exporters:
  datadog/exporter:
    api:
      key: ${env:DD_API_KEY}
      site: {{< region-param key="dd_site" >}}
    hostname: "my-collector-host"
    sending_queue:
      batch:
        flush_timeout: 10s

service:
  extensions: [datadog]
  pipelines:
    traces:
      receivers: [otlp]
      exporters: [datadog/exporter]
    metrics:
      receivers: [otlp]
      exporters: [datadog/exporter]
```

## 컬렉터 구성 조회 {#viewing-collector-configuration}

구성이 완료되면 여러 위치에서 OpenTelemetry 컬렉터 구성 및 빌드 정보를 조회할 수 있습니다.

### Fleet Automation {#fleet-automation}
1. [{{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Fleet Automation{{< /ui >}}][7]으로 이동합니다.
2. 컬렉터 패싯을 사용하여 OTel 컬렉터 호스트를 필터링한 다음 호스트를 클릭합니다.
3. 사이드 패널에서 {{< ui >}}Info{{< /ui >}} 탭을 선택하여 빌드 정보를 조회합니다.
4. {{< ui >}}Configurations{{< /ui >}} 탭을 선택하여 전체 YAML 파일 또는 OTel 컬렉터 구성의 파이프라인 시각화를 조회합니다.

{{< img src="/agent/fleet_automation/fleet-automation-yaml-view.png" alt="Fleet Automation에서 OTel 컬렉터 구성 YAML 조회" style="width:100%;" >}}

### 인프라 목록(호스트 목록) {#infrastructure-list-host-list}

1. Datadog 계정에서 [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Hosts{{< /ui >}}][2]로 이동합니다.
2. OpenTelemetry 컬렉터를 실행 중인 호스트를 클릭합니다(**참고**: `field:apps:otel`로 필터링하여 컬렉터 인스턴스만 표시).
3. 호스트 세부 정보 패널에서 {{< ui >}}OTel Collector{{< /ui >}} 탭을 선택하여 빌드 정보 및 전체 컬렉터 구성을 확인합니다.

### Resource Catalog {#resource-catalog}

1. Datadog 계정에서 [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Resource Catalog{{< /ui >}}][3]로 이동합니다
2. 호스트를 필터링하거나 컬렉터 인스턴스를 검색합니다.
3. OpenTelemetry 컬렉터를 실행 중인 호스트를 클릭합니다.
4. {{< ui >}}Collector{{< /ui >}}까지 아래로 스크롤하여 빌드 정보와 전체 컬렉터 구성을 확인합니다.

## 로컬 HTTP 서버 {#local-http-server}

Datadog Extension에는 디버깅 및 검사를 위한 로컬 HTTP 서버가 포함되어 있습니다.

```bash
# Access collector metadata locally
curl http://localhost:9875/metadata
```

이 엔드포인트는 다음을 제공합니다.
- 컬렉터 구성(민감한 정보 제거)
- 빌드 정보 및 버전 세부 정보
- 활성 구성 요소 목록
- 확장 프로그램 상태

## 문제 해결 {#troubleshooting}

### Datadog에 구성이 표시되지 않음 {#configuration-not-appearing-in-datadog}

1. **호스트 이름 일치 여부 확인**: Datadog Extension 호스트 이름이 내보낸 텔레메트리의 호스트 이름과 일치하는지 확인하세요. Datadog Exporter를 사용하는 경우 해당 호스트 이름도 일치하는지 확인하세요.
2. **API 키 확인**: API 키가 유효하며 적절한 권한을 보유하고 있는지 확인하세요.
3. **컬렉터 로그 확인**: 확장 프로그램 초기화 및 데이터 제출 로그를 확인하세요.
4. **확장 프로그램 활성화 확인**: 서비스 구성에 확장 프로그램이 나열되어 있는지 확인하세요.

### HTTP 서버 문제 {#http-server-issues}

1. **포트 충돌**: 9875 포트를 사용할 수 있는지 확인하거나 다른 포트를 구성하세요.
2. **네트워크 액세스**: 디버그 위치에서 HTTP 서버에 액세스할 수 있는지 확인하세요.
3. **로그 확인**: HTTP 서버 시작 문제와 관련된 확장 프로그램 로그를 검토하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/infrastructure
[3]: https://app.datadoghq.com/infrastructure/catalog
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.129.0
[5]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/tag/v0.129.1
[6]: https://opentelemetry.io/docs/collector/custom-collector/
[7]: https://app.datadoghq.com/fleet
[8]: /ko/opentelemetry/setup/ddot_collector/
[9]: /ko/opentelemetry/setup/collector_exporter/
[10]: /ko/opentelemetry/integrations/collector_health_metrics/