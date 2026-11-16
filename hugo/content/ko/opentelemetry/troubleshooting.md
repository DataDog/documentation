---
further_reading:
- link: https://opentelemetry.io/docs/collector/troubleshooting/
  tag: 외부 사이트
  text: OpenTelemetry 문제 해결하기
title: 문제 해결하기
---
Datadog에서 OpenTelemetry를 사용할 때 예상치 못한 동작이 발생하면 이 가이드가 문제 해결에 도움이 될 수 있습니다. 문제가 계속되면 추가 지원을 위해 [Datadog 지원팀][1]에 문의하세요.

## 잘못되었거나 예상치 못한 호스트 이름 {#incorrect-or-unexpected-hostnames}

Datadog에서 OpenTelemetry를 사용할 때 다양한 호스트 이름 관련 문제가 발생할 수 있습니다. 다음 섹션에서는 일반적인 시나리오와 그 해결책을 다룹니다.

### Kubernetes 호스트 이름과 노드 이름이 다른 경우 {#different-kubernetes-hostname-and-node-name}

**증상**: Kubernetes에 배포할 때 Datadog에서 보고하는 호스트 이름이 예상 노드 이름과 일치하지 않습니다.

**원인**: 이는 일반적으로 `k8s.node.name`(및 필요시 `k8s.cluster.name`) 태그가 누락되어 발생합니다.

**해결책**:

1. 애플리케이션 배포의 `k8s.pod.ip` 속성을 구성합니다. 

   ```yaml
   env:
     - name: MY_POD_IP
       valueFrom:
         fieldRef:
           apiVersion: v1
           fieldPath: status.podIP
     - name: OTEL_RESOURCE_ATTRIBUTES
       value: k8s.pod.ip=$(MY_POD_IP)
   ```

2. Collector에서 `k8sattributes` 프로세서를 활성화합니다.

   ```yaml
   k8sattributes:
   [...]
   processors:
     - k8sattributes
   ```

또는 `datadog.host.name` 속성을 사용하여 호스트 이름을 재정의할 수 있습니다.

   ```yaml
   processors:
     transform:
       trace_statements:
         - context: resource
           statements:
             - set(attributes["datadog.host.name"], "${NODE_NAME}")
   ```

호스트 식별 속성에 대한 자세한 내용은 [OpenTelemetry 시맨틱 규칙을 호스트 이름에 매핑][2]을 참조하세요. 설정에 권장되는 호스트 이름 구성은 [호스트 이름 및 태깅][9]을 참조하세요.

### AWS Fargate 배포 시 예상치 못한 호스트 이름이 표시되는 경우 {#unexpected-hostnames-with-aws-fargate-deployment}

**증상**: AWS Fargate 환경에서 트레이스에 잘못된 호스트 이름이 보고될 수 있습니다.

**원인**: Fargate 환경에서는 기본 리소스 탐지가 ECS 메타데이터를 제대로 식별하지 못해 잘못된 호스트 이름이 할당될 수 있습니다.

**해결책**:

Collector 구성에서 `resourcedetection` 프로세서를 구성하고 `ecs` 탐지기를 활성화하세요.

```yaml
processors:
  resourcedetection:
    detectors: [env, ecs]
    timeout: 2s
    override: false
```

### 게이트웨이 Collector가 호스트 메타데이터를 전달하지 않는 경우 {#gateway-collector-not-forwarding-host-metadata}

**증상**: 게이트웨이 배포 시 여러 호스트의 텔레메트리가 단일 호스트에서 오는 것처럼 보이거나 호스트 메타데이터가 제대로 전달되지 않습니다.

**원인**: 게이트웨이 Collector 구성이 Agent Collector의 호스트 메타데이터 속성을 보존하거나 제대로 전달하지 않을 때 발생합니다.

**해결책**:

1. Agent Collector가 호스트 메타데이터를 수집하고 전달하도록 구성합니다.

   ```yaml
   processors:
     resourcedetection:
       detectors: [system, env]
     k8sattributes:
       passthrough: true
   ```

2. 게이트웨이 Collector가 필요한 메타데이터를 추출하고 전달하도록 구성합니다.

   ```yaml
   processors:
     k8sattributes:
       extract:
         metadata: [node.name, k8s.node.name]
     transform:
       trace_statements:
         - context: resource
           statements:
             - set(attributes["datadog.host.use_as_metadata"], true)
   
   exporters:
     datadog:
       hostname_source: resource_attribute
   ```

자세한 내용은 [OpenTelemetry 시맨틱 규칙을 인프라 목록 호스트 정보에 매핑하기][3]를 참조하세요.

### 동일한 호스트가 서로 다른 이름으로 여러 번 표시되는 경우 {#the-same-host-shows-up-multiple-times-under-different-names}

**증상**: 단일 호스트가 Datadog에서 여러 이름으로 표시됩니다. 예를 들어, OpenTelemetry Collector(OTel 로고 포함)의 항목 하나와 Datadog Agent의 다른 항목 하나가 표시될 수 있습니다.

**원인**: 호스트 이름 리소스 속성을 하나로 통일하지 않은 상태에서 둘 이상의 수집 방법(예: OTLP + Datadog Agent 또는 DogStatsD + OTLP)으로 호스트를 모니터링하면 Datadog은 각 경로를 별도의 호스트로 처리합니다.

**해결책**:
1. 동일한 머신에서 Datadog으로 데이터를 전송하는 모든 활성 텔레메트리 수집 경로를 식별합니다.
2. 하나의 호스트 이름 소스를 선택하고 Datadog Agent의 호스트 이름을 사용할지 특정 리소스 속성(예: `k8s.node.name`)을 사용할지 결정합니다.
3. 각 경로(Agent, Collector 등)가 일관된 호스트 이름을 보고하도록 구성합니다. 예를 들어, OTLP 속성으로 호스트 이름을 설정하는 경우 변환 프로세서를 다음과 같이 구성하세요.
    ```yaml
    processors:
      transform:
        trace_statements:
          - context: resource
            statements:
              - set(attributes["datadog.host.name"], "shared-hostname")
    ```
4. Datadog(인프라 목록, 호스트 맵 등)에서 검증하여 호스트가 이제 하나의 이름으로 표시되는지 확인합니다.

## 시작 후 호스트 태그가 지연되는 경우 {#host-tag-delays-after-startup}

**증상**: Datadog Agent 또는 OpenTelemetry Collector를 시작한 후 텔레메트리 데이터에 호스트 태그가 표시되는 데 지연이 발생할 수 있습니다. 이 지연은 일반적으로 10분 미만으로 지속되지만 경우에 따라 40~50분까지 늘어날 수 있습니다.

**원인**: 이 지연은 태그가 텔레메트리 데이터와 연결되기 전에 호스트 메타데이터가 Datadog 백엔드에서 처리되고 인덱싱되어야 하기 때문에 발생합니다.

**해결책**:

Datadog Exporter 구성(`host_metadata::tags`) 또는 Datadog Agent의 `tags` 섹션에 구성된 호스트 태그는 텔레메트리 데이터에 즉시 적용되지 않습니다. 백엔드에서 호스트 메타데이터 처리가 완료되면 태그가 표시됩니다.

구성에 맞는 지침을 확인하려면 설정을 선택하세요.

{{< tabs >}}
{{% tab "Datadog Agent OTLP Ingestion" %}}

호스트 태그가 처리될 때까지의 공백을 메우려면 `datadog.yaml`에서 `expected_tags_duration`을 구성하세요.

```yaml
expected_tags_duration: "15m"
```

이 구성은 지정된 기간(이 예에서는 15분) 동안 모든 텔레메트리에 예상 태그를 추가합니다.

{{% /tab %}}

{{% tab "OpenTelemetry Collector" %}}

`transform` 프로세서를 사용하여 호스트 태그를 OTLP 속성으로 설정하세요. 예를 들어, 환경 및 팀 태그를 추가하려면 다음과 같이 구성하세요.

```yaml
processors:
  transform:
    trace_statements:
      - context: resource
        statements:
          # OpenTelemetry semantic conventions
          - set(attributes["deployment.environment.name"], "prod")
          # Datadog-specific host tags
          - set(attributes["ddtags"], "env:prod,team:backend")
...
```

이 접근 방식은 OpenTelemetry 시맨틱 규칙과 Datadog 전용 호스트 태그를 결합하여 OpenTelemetry 및 Datadog 환경 모두에서 올바르게 작동하도록 합니다.

{{% /tab %}}
{{< /tabs >}}

## 텔레메트리에서 인프라 태그가 누락되는 경우 {#infrastructure-tags-are-missing-from-telemetry}

**증상**: DDOT Collector 구성에서 `infraattributes` 프로세서를 활성화했지만 Kubernetes 수준 태그(예: `k8s.pod.name`, `k8s.namespace.name` 또는 포드 레이블)가 트레이스, 메트릭 또는 로그에 나타나지 않습니다.

**원인**: `infraattributes` 프로세서는 소스 컨테이너를 식별하기 위해 수신되는 텔레메트리에 특정 리소스 속성이 필요합니다.

입력에 `container.id` 리소스 속성이 없으면 프로세서가 자동으로 탐지를 시도합니다. 다음 방법이 우선순위가 높은 순서부터 낮은 순서까지 시도됩니다.

| 리소스 속성                              | 탐지 방법                  |
|--------------------------------------------------|-----------------------------------|
| `process.pid` (int)                              | 컨테이너의 외부 PID 기반 |
| `datadog.container.cgroup_inode` (int)           | 컨테이너의 cgroup inode 기반 |
| `k8s.pod.uid` (str) + `k8s.container.name` (str) | 컨테이너의 포드 및 이름 기반 |

텔레메트리가 이러한 탐지 방법에 필요한 속성을 하나도 제공하지 않으면 프로세서가 해당 Kubernetes 메타데이터를 조회할 수 없습니다.

**해결책**:

다음 단계를 순서대로 수행하여 텔레메트리에 필요한 속성이 포함되어 있는지 확인하세요.

1.  **SDK 자동 계측 사용(권장)**: 사용 중인 언어의 OpenTelemetry 자동 계측 최신 버전으로 업그레이드합니다. `container.id` 또는 `process.pid`를 자동으로 제공하는 경우가 많으므로 이 방법을 먼저 사용하는 것이 좋습니다. 이러한 속성이 자동으로 추가되지 않으면 SDK 설명서를 확인하세요. 일부 SDK(예: Go)는 이를 활성화하기 위한 특정 설정(예: [resource.WithContainerID][8])을 제공합니다.

2.  **리소스 속성 수동 설정**: 자동 계측으로 필요한 속성이 추가되지 않는 경우 `OTEL_RESOURCE_ATTRIBUTES`를 사용하여 리소스 속성을 수동으로 설정합니다. 이를 통해 프로세서는 `k8s.pod.uid` 및 `k8s.container.name` 탐지 방법을 사용할 수 있습니다. 예시는 다음과 같습니다.
    ```yaml
    env:
      - name: OTEL_SERVICE_NAME
        value: {{ .Chart.Name }}
      - name: OTEL_K8S_NAMESPACE
        valueFrom:
          fieldRef:
            apiVersion: v1
            fieldPath: metadata.namespace
      - name: OTEL_K8S_NODE_NAME
        valueFrom:
          fieldRef:
            apiVersion: v1
            fieldPath: spec.nodeName
      - name: OTEL_K8S_POD_NAME
        valueFrom:
          fieldRef:
            apiVersion: v1
            fieldPath: metadata.name
      - name: OTEL_K8S_POD_ID
        valueFrom:
          fieldRef:
            apiVersion: v1
            fieldPath: metadata.uid
      - name: OTEL_RESOURCE_ATTRIBUTES
        value: >-
          service.name=$(OTEL_SERVICE_NAME),
          k8s.namespace.name=$(OTEL_K8S_NAMESPACE),
          k8s.node.name=$(OTEL_K8S_NODE_NAME),
          k8s.pod.name=$(OTEL_K8S_POD_NAME),
          k8s.pod.uid=$(OTEL_K8S_POD_ID),
          k8s.container.name={{ .Chart.Name }},
          host.name=$(OTEL_K8S_NODE_NAME),
          deployment.environment.name=$(OTEL_K8S_NAMESPACE)
    ```
3. **Collector의 `resourcedetection` 프로세서 사용**: SDK 또는 애플리케이션 수준에서 리소스 속성을 설정할 수 없는 경우 Collector의 `resourcedetection` 프로세서를 사용할 수 있습니다. `infraattributes` 앞에 배치하세요.

4.  **속성 검증**: DDOT Collector 파이프라인에서 `debug` 익스포터를 사용하여 필요한 리소스 속성(예: `container.id`, `process.pid`, `k8s.pod.uid`)이 텔레메트리에 있는지 확인합니다.

이 프로세서에서 사용하는 속성에 대한 자세한 내용은 [Infrastructure Attribute Processor 문서][7]를 참조하세요.

## 'team' 속성을 Datadog 팀 태그로 매핑할 수 없는 경우 {#unable-to-map-team-attribute-to-datadog-team-tag}

**증상**: OpenTelemetry 구성에서 리소스 속성으로 설정했음에도 불구하고 Datadog의 로그 및 트레이스에 팀 태그가 나타나지 않습니다.

**원인**: 이는 `ddtags` 속성을 사용하여 OpenTelemetry 리소스 속성을 Datadog의 태그 형식으로 명시적으로 매핑해야 하기 때문에 발생합니다.

**해결책**:

OpenTelemetry Collector의 변환 프로세서를 사용하여 팀 리소스 속성을 `ddtags` 속성으로 매핑하세요.

```yaml
processors:
  transform/datadog_team_tag:
    metric_statements:
      - context: datapoint
        statements:
          - set(attributes["ddtags"], Concat(["team:", resource.attributes["team"]],""))
    log_statements:
      - context: log
        statements:
          - set(attributes["ddtags"], Concat(["team:", resource.attributes["team"]],""))
    trace_statements:
      - context: span
        statements:
          - set(attributes["ddtags"], Concat(["team:", resource.attributes["team"]],""))
```

<div class="alert alert-info">다음을 <code>resource.attributes["team"]</code> 설정에서 속성 이름이 다른 경우 실제 속성 이름으로 바꾸세요(예: <code>resource.attributes["arm.team.name"]</code>).</div>

구성을 검증하려면 다음 단계를 따르세요.

1. OpenTelemetry Collector를 다시 시작해 변경 사항을 적용합니다.
2. 테스트 로그 및 트레이스를 생성합니다.
3. Datadog 로그 및 트레이스에 팀 태그가 나타나는지 확인합니다.
4. 팀 태그가 필터링 및 대시보드에서 예상대로 작동하는지 검증합니다.

## Containers 페이지에 컨테이너 태그가 표시되지 않는 경우 {#container-tags-not-appearing-on-containers-page}

**증상**: Datadog의 Containers 페이지에 컨테이너 태그가 표시되지 않아 컨테이너 모니터링 및 관리 기능에 영향을 줍니다.

**원인**: 컨테이너 리소스 속성이 Datadog에서 예상하는 컨테이너 메타데이터 형식으로 올바르게 매핑되지 않을 때 발생합니다.

**해결책**:

Datadog Agent에서 OTLP 수집을 사용할 때는 올바른 컨테이너 메타데이터 연결을 보장하기 위해 특정 리소스 속성을 설정해야 합니다. 자세한 내용은 [리소스 속성 매핑][4]을 참조하세요.

구성을 검증하려면 다음 단계를 따르세요.

1. 원시 트레이스 데이터를 확인하여 컨테이너 ID와 태그가 Datadog 형식으로 올바르게 변환되었는지 확인합니다(예: `container.id`는 `container_id`가 되어야 함).
2. 컨테이너 메타데이터가 Containers 페이지에 표시되는지 검증합니다.

## Catalog 및 대시보드에서 메트릭이 누락되는 경우 {#missing-metrics-in-catalog-and-dashboards}

**증상**: 메트릭이 올바르게 수집되었음에도 불구하고 Catalog 및 대시보드에 표시되지 않습니다.

**원인**: 이는 일반적으로 잘못되었거나 제대로 매핑되지 않은 시맨틱 규칙으로 인해 발생합니다.

**해결책**:

구성을 검증하려면 다음 단계를 따르세요.

1. 메트릭에 필요한 [시맨틱 규칙][4]이 포함되어 있는지 확인합니다.
2. 메트릭 이름이 OpenTelemetry 명명 규칙을 따르는지 검증합니다.
3. [메트릭 매핑 참조][5]를 사용하여 메트릭이 Datadog 형식으로 올바르게 변환되고 있는지 확인합니다.

<div class="alert alert-info">시맨틱 규칙을 사용할 때는 메트릭 명명 및 속성에 대한 최신 OpenTelemetry 사양을 따르고 있는지 확인하세요.</div>

## 포트 바인딩 오류 또는 연결 실패가 발생하는 경우 {#port-binding-errors-and-connection-failures}

**증상**: DDOT Collector를 배포할 때 포트 충돌이나 바인딩 문제가 발생하거나 애플리케이션이 DDOT Collector에 연결할 수 없습니다.

**원인**: 이는 일반적으로 포트 명명 충돌, 잘못된 포트 구성 또는 여러 서비스가 동일한 포트를 사용하려고 할 때 발생합니다.

**해결책**:

Datadog Operator는 기본적으로 OpenTelemetry Collector를 포트 `4317`(이름: `otel-grpc`) 및 `4318`(이름: `otel-http`)에 자동으로 바인딩합니다.

기본 포트를 명시적으로 재정의하려면 `features.otelCollector.ports` 파라미터를 사용하세요.

```yaml
# Enable Features
features:
  otelCollector:
    enabled: true
    ports:
      - containerPort: 4317
        hostPort: 4317
        name: otel-grpc
      - containerPort: 4318
        hostPort: 4318
        name: otel-http
```

<div class="alert alert-danger"> <code>4317</code> 포트 및 <code>4318</code>포트를 구성할 때는 포트 충돌을 방지하기 위해 각각 기본 이름인 <code>otel-grpc</code> 포트 및 <code>otel-http</code> 포트 이름을 사용해야 합니다.</div>

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help/
[2]: /ko/opentelemetry/schema_semantics/hostname/
[3]: /ko/opentelemetry/schema_semantics/host_metadata/
[4]: /ko/opentelemetry/schema_semantics/semantic_mapping/
[5]: /ko/opentelemetry/schema_semantics/metrics_mapping/#metrics-mappings
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#readme
[7]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#readme
[8]: https://pkg.go.dev/go.opentelemetry.io/otel/sdk/resource#WithContainerID
[9]: /ko/opentelemetry/config/hostname_tagging/#hostname-recommendations