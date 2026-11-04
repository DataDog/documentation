---
aliases:
- /ko/opentelemetry/collector_exporter/hostname_tagging
description: Datadog으로 전송되는 OpenTelemetry 텔레메트리에 대해 호스트 식별 및 태그 지정을 일관되게 구성합니다.
further_reading:
- link: /opentelemetry/setup/collector_exporter/
  tag: 설명서
  text: OpenTelemetry Collector 설정
- link: /opentelemetry/mapping/hostname/
  tag: 설명서
  text: 호스트 이름에 OpenTelemetry 시맨틱 규칙 매핑
title: 호스트 이름 및 태깅
---
{{< img src="opentelemetry/collector_exporter/hostname_tagging.png" alt="OpenTelemetry에서 수집된 호스트 이름 정보" style="width:100%;" >}}

## 개요 {#overview}

Datadog은 OpenTelemetry 리소스 속성을 사용하여 메트릭, 트레이스 및 로그를 호스트와 일치시킵니다. 호스트의 모든 텔레메트리가 호스트를 동일한 방식으로 식별하면 해당 호스트의 시그널 간 상관관계를 파악할 수 있으며, 텔레메트리는 호스트의 태그를 상속합니다.

호스트 이름 결정 순서와 지원되는 리소스 속성의 전체 목록은 [Mapping OpenTelemetry Semantic Conventions to Hostnames][8]를 참조하세요.

## 호스트 이름 권장 사항 {#hostname-recommendations}

올바른 구성은 텔레메트리를 Datadog으로 전송하는 방식에 따라 다릅니다. 텔레메트리 경로에 해당하는 각 설정을 확인하고 관련 섹션의 지침을 따릅니다. 예를 들어, 노드 수준 Collector가 게이트웨이를 통해 텔레메트리를 전송하는 경우 노드 수준 Collector와 게이트웨이에 대한 권장 사항을 모두 따릅니다.

| 텔레메트리 전송 방식 | 권장 사항 |
|---|---|
| [Datadog Agent를 통한 OTLP 수집](#otlp-ingestion-by-the-datadog-agent) | 텔레메트리를 생성하는 모든 호스트에서 Agent를 실행합니다. 호스트 이름 속성을 생략하거나 Agent 호스트 이름으로 설정합니다. |
| [Datadog으로 직접 내보내는 DDOT Collector](#ddot-collector-exporting-directly-to-datadog) | DDOT은 기본적으로 Datadog Exporter 파이프라인에 `infraattributes` 프로세서를 추가합니다. 호스트에서 `allow_hostname_override`를 활성화합니다. Fargate에서는 플랫폼 리소스 속성을 제공합니다. |
| [OTLP를 통해 Datadog으로 내보내는 OpenTelemetry Collector](#opentelemetry-collector-exporting-to-datadog-over-otlp) | 각 호스트 또는 Kubernetes 노드에서 Collector를 실행합니다. 권장 구성의 `resource_detection` 프로세서를 유지하고, Kubernetes에서는 `k8s_attributes` 프로세서를 유지합니다. |
| [Collector 없는 직접 OTLP 수집](#direct-otlp-intake-without-a-collector) | 내보내기 전에 SDK 또는 관리형 플랫폼에서 호스트 또는 플랫폼 리소스 속성을 설정합니다. |
| [게이트웨이를 통해 내보내는 Collector](#collector-exporting-through-a-gateway) | 노드 수준 Collector에 호스트 정보를 추가하고 게이트웨이를 통과할 때도 해당 리소스 속성을 유지합니다. |
| [Datadog Exporter를 사용하는 기존 구성](#existing-configurations-using-the-datadog-exporter) | 각 호스트 또는 Kubernetes 노드에서 Collector를 실행하고 권장 설정과 동일한 프로세서를 구성합니다. |

### Datadog Agent에 의한 OTLP 수집 {#otlp-ingestion-by-the-datadog-agent}

OTLP 텔레메트리를 생성하는 모든 호스트에 Datadog Agent를 배포합니다. Datadog은 한 호스트에서 다른 호스트의 Agent로 텔레메트리를 보내는 것을 지원하지 않습니다. 설정 지침은 [Datadog Agent에 의한 OTLP 수집][11]을 참조하세요.

수신되는 텔레메트리에 유효한 [호스트 이름 속성][8]이 없는 경우, Datadog은 Agent 호스트 이름을 사용합니다. `host.name`, `host.id` 또는 다른 호스트 이름 속성을 설정하는 경우, 중복 호스트를 방지하기 위해 해당 속성을 Agent 호스트 이름으로 설정합니다. 호스트 이름 결정 방식을 재정의하려면 `datadog.host.name` 리소스 속성을 Agent 호스트 이름으로 설정합니다.

### Datadog으로 직접 내보내는 DDOT Collector {#ddot-collector-exporting-directly-to-datadog}

DDOT Collector의 `infraattributes` 프로세서는 OTLP 텔레메트리에 인프라 속성 및 태그를 추가합니다. 기본적으로 DDOT는 Datadog Exporter를 사용하는 파이프라인에 이 프로세서를 추가합니다. 이 프로세서는 인프라 태그를 조회할 수 있도록 소스 컨테이너를 식별하는 리소스 속성이 필요합니다. 지원되는 속성 및 문제 해결 단계는 [텔레메트리에서 인프라 태그가 누락됨][10]을 참조하세요.

나머지 구성은 DDOT Collector가 호스트에서 실행되는지 여부에 따라 다릅니다.

#### 호스트 기반 배포 {#host-based-deployments}

이는 [Kubernetes DaemonSet][9]으로 배포되거나 [Linux][14] 및 [Windows][15] 호스트에서 실행되는 DDOT Collector에 적용됩니다.

DDOT Collector는 Datadog Agent 내부에서 실행되므로 수신되는 텔레메트리의 호스트 이름 속성이 Agent 호스트 이름과 다른 이름으로 확인될 수 있습니다. 이 경우 하나의 노드가 두 개의 호스트로 표시됩니다. 대신 Agent 호스트 이름을 사용하려면 `allow_hostname_override`를 활성화합니다.

```yaml
processors:
  infraattributes:
    allow_hostname_override: true
```

`infraattributes`가 아직 포함되어 있지 않다면 각 파이프라인의 `processors` 목록에 추가합니다. DDOT는 해당 프로세서가 목록에 없는 파이프라인에 자체 복사본을 자동으로 추가하며, 이 복사본에는 기본 설정이 적용됩니다.

#### Fargate 사이드카 배포 {#fargate-sidecar-deployments}

이는 Datadog Agent가 애플리케이션과 동일한 작업 또는 포드에서 사이드카 컨테이너로 실행되는 [ECS Fargate][16] 및 [EKS Fargate][17]의 DDOT Collector에 적용됩니다.

Fargate는 호스트 기반 배포를 지원하지 않으므로 [호스트 기반 지침](#host-based-deployments)이 적용되지 않습니다. 대신 `infraattributes`에 필요한 플랫폼 리소스 속성을 제공합니다.

- ECS Fargate에서는 ECS 리소스 탐지기를 OpenTelemetry SDK에 추가하여 `aws.ecs.task.arn` 속성을 제공합니다.
- EKS Fargate에서는 SDK에 EKS 리소스 탐지기를 추가하거나 DDOT Collector 구성에 `[env, eks]` 탐지기가 포함된 리소스 탐지 프로세서를 추가합니다. 예시는 [EKS Fargate 설치 가이드][17]를 참조하세요.

### OTLP를 통해 Datadog으로 내보내는 OpenTelemetry Collector {#opentelemetry-collector-exporting-to-datadog-over-otlp}

이는 Collector가 OTLP HTTP 익스포터를 사용하여 Datadog으로 텔레메트리를 전송하는 [권장 OpenTelemetry Collector 설정][21]에 적용됩니다.

각 호스트 또는 Kubernetes 노드에서 Collector를 하나씩 실행하고, 동일한 호스트 또는 노드에 있는 Collector로 텔레메트리를 전송합니다. 권장 구성에는 이미 각 환경에 대한 호스트 탐지 설정이 포함되어 있습니다. 권장 구성을 수정하는 경우 다음 설정을 유지합니다.

- **호스트 및 VM**: `system` 탐지기가 포함된 `resource_detection` 프로세서 클라우드 공급자를 사용하는 경우 해당 공급자의 탐지기를 추가합니다.
- **Docker**: Collector는 컨테이너 내부에서 호스트를 탐지할 수 없습니다. Collector의 `OTEL_RESOURCE_ATTRIBUTES` 환경 변수에 `host.name`을 설정합니다.
- **Kubernetes**: `k8s_attributes` 및 `resource_detection` 프로세서 클라우드가 아닌 Kubernetes의 경우, Collector의 `OTEL_RESOURCE_ATTRIBUTES` 환경 변수에 `k8s.node.name`을 설정합니다. 클라우드 Kubernetes의 경우, 환경 변수 대신 클라우드 공급자용 탐지기를 사용합니다.

호스트 탐지 기능이 없는 Collector 구성에 호스트 탐지를 추가하려면 [Collector에서 호스트 이름 프로세서 구성](#collector-configuration)을 참조하세요.

권장 설정의 `span_metrics` 커넥터는 호스트 속성을 디멘션으로 사용하므로 APM 트레이스 메트릭에 호스트 태그가 유지됩니다. 구성을 수정하는 경우 모든 디멘션을 유지합니다. 자세한 내용은 [스팬 메트릭 커넥터][24]를 참조하세요.

권장 설정은 AWS Lambda, ECS Fargate, EKS Fargate와 같은 서버리스 또는 작업 기반 런타임을 지원하지 않습니다. 이러한 환경에 대해서는 [Collector 없는 직접 OTLP 수집](#direct-otlp-intake-without-a-collector)을 참조하세요.

<div class="alert alert-info">호스트 이름 리소스 속성은 텔레메트리를 식별하지만 <a href="/infrastructure/list/">Infrastructure Host List</a>에는 호스트를 추가하지 않습니다. 권장 구성에는 Infrastructure Host List를 채우는 <a href="/opentelemetry/integrations/host_metrics/">호스트 메트릭 수신기</a>가 포함되어 있습니다. 이를 제거하면 호스트가 해당 목록에 표시되지 않습니다. GKE Autopilot 및 AKS Automatic 예시 구성에서는 이를 생략합니다.</div>

### Collector 없는 직접 OTLP 수집 {#direct-otlp-intake-without-a-collector}

이는 텔레메트리가 Datadog Agent나 OpenTelemetry Collector를 거치지 않고 [Datadog OTLP 수집][22]으로 직접 전송되는 경우에 적용됩니다. 예를 들면 다음과 같습니다.

- OpenTelemetry SDK를 사용하여 내보내는 호스트의 애플리케이션
- AWS Lambda, ECS Fargate, Azure Functions, Cloud Run 등의 [서버리스 플랫폼][12]
- [관리형 플랫폼][13]

텔레메트리를 내보내기 전에 해당 환경의 리소스 속성을 설정합니다. SDK의 내장 리소스 탐지기를 사용할 수 있으면 활성화하고, 그렇지 않으면 속성을 직접 설정합니다. 서버리스 및 관리형 플랫폼에서는 `host.name` 대신 플랫폼 리소스 속성으로 워크로드를 식별합니다.

ECS Fargate 또는 EKS Fargate에서 DDOT Collector를 사이드카로 실행하는 경우 [Fargate 사이드카 배포](#fargate-sidecar-deployments)를 참조하세요.

### 게이트웨이를 통해 내보내는 Collector {#collector-exporting-through-a-gateway}

이는 OpenTelemetry Collector 게이트웨이 배포 및 [Kubernetes에서 게이트웨이로 배포된 DDOT Collector][18]에 적용됩니다.

게이트웨이 배포 환경에서는 Datadog으로 텔레메트리를 내보내는 Collector가 해당 텔레메트리를 생성한 호스트에서 실행되지 않습니다. 텔레메트리가 호스트 정보 없이 게이트웨이에 도달하면 여러 호스트의 텔레메트리가 게이트웨이의 호스트 이름으로 통합되거나 각 게이트웨이 포드가 별도의 호스트로 등록될 수 있습니다.

노드 수준 Collector에 호스트 정보를 추가합니다. 그런 다음 리소스 속성을 다시 탐지하지 않고 유지하도록 게이트웨이를 구성합니다.

- **OpenTelemetry Collector**: Kubernetes에서 노드 수준 Collector에 `k8s_attributes` 프로세서를 패스스루 모드로 추가하고 `resource_detection` 프로세서도 추가합니다. 클라우드 Kubernetes에서는 해당 클라우드 공급자에 맞는 탐지기를 사용합니다. [Collector에서 호스트 이름 프로세서 구성](#collector-configuration)의 **Kubernetes DaemonSet -> Gateway** 예시를 참조하세요.
- **DDOT Collector**: [DDOT 게이트웨이 설치 가이드][18]에 표시된 대로 DaemonSet 구성에 `infraattributes` 프로세서를 유지합니다.

게이트웨이 배포에서 잘못된 호스트가 보고되는 경우 [게이트웨이 Collector가 호스트 메타데이터를 전달하지 않음][19]을 참조하세요.

### Datadog Exporter를 사용하는 기존 구성 {#existing-configurations-using-the-datadog-exporter}

이는 기존 [Datadog Exporter를 사용하는 OpenTelemetry Collector 구성][20]에 적용됩니다. 새로운 Collector 구성에는 [권장 OpenTelemetry Collector 설정][21]을 사용합니다.

각 호스트 또는 Kubernetes 노드에서 Collector를 실행하고 [권장 설정](#opentelemetry-collector-exporting-to-datadog-over-otlp)과 동일한 방식으로 호스트 탐지를 구성합니다. 이 페이지의 [프로세서 예시](#collector-configuration)는 Datadog Exporter와 함께 사용할 수 있습니다. Amazon EKS에서의 Datadog Exporter 전체 구성 예시는 [`k8s-values.yaml`][4]을 참조하세요.

Collector가 게이트웨이로 데이터를 전달하는 경우 [게이트웨이 권장 사항](#collector-exporting-through-a-gateway)도 따르세요.

## 호스트 이름 문제 진단 {#diagnose-hostname-issues}

Datadog은 APM 트레이스 호스트 이름이 없거나, 임시 Kubernetes 포드 이름과 유사하거나, Datadog Agent가 보고한 호스트 이름과 다른 경우 `datadog.apm.hostname_issue` 게이지를 내보냅니다. 이 메트릭은 청구에 영향을 주지 않습니다.

<div class="alert alert-info"> <code>issue_type</code> 값은 휴리스틱을 기반으로 하므로 구성이 올바르더라도 이러한 값이 생성될 수 있습니다. 한 노드가 두 개의 호스트로 표시되거나, 트레이스가 해당 호스트에 연결되지 않거나, 호스트 태그가 없는 경우 등 이미 발견된 호스트 이름 문제를 조사하려면 이 메트릭을 사용합니다.</div>

트레이스 하나에는 `issue_type`이 최대 하나만 존재합니다. 다음 표에서 가능한 원인과 해결 방법을 확인합니다.

| `issue_type` | 표시 내용 | 권장 조치 |
|---|---|---|
| `pod_like_gateway_mismatch` | 트레이스 호스트 이름이 Agent 호스트 이름과 다르며 Kubernetes 포드 이름과 유사합니다. | [게이트웨이 권장 사항](#collector-exporting-through-a-gateway)을 따릅니다. 노드 수준 Collector에서 Kubernetes 노드 정보를 추가하고 게이트웨이를 통과할 때도 해당 리소스 속성을 유지합니다. |
| `gateway_hostname_mismatch` | 트레이스 호스트 이름이 Agent 호스트 이름과 다릅니다. | [게이트웨이 권장 사항](#collector-exporting-through-a-gateway)을 따르고 게이트웨이를 통과할 때도 호스트 이름 리소스 속성을 유지합니다. |
| `empty_hostname` | Datadog이 트레이스에 사용할 수 있는 호스트 이름을 수신하지 못했습니다. | [설정에 맞는 권장 사항](#hostname-recommendations)을 따르고 필요한 호스트 또는 플랫폼 리소스 속성을 제공합니다. |
| `pod_like_hostname` | 트레이스 호스트 이름이 일시적인 Kubernetes 포드 이름과 유사합니다. | 텔레메트리가 포드 대신 노드, 호스트 또는 플랫폼을 식별하도록 [사용 중인 환경](#hostname-recommendations)에 맞게 호스트 탐지를 구성합니다. |

사용 가능한 메트릭 태그에는 `issue_type`, `host`, `env`, `service`, `version` 및 `span_source`가 포함됩니다. 영향을 받는 스팬에는 동일한 `issue_type` 태그가 지정되며, 이 태그를 사용하여 트레이스 예시를 찾고 리소스 속성을 확인할 수 있습니다.

포드 이름과 유사한 문제 유형을 판단할 때 일반적인 Kubernetes 포드 명명 패턴을 휴리스틱으로 사용합니다. 구성을 업데이트한 후 새 트레이스를 확인하여 해당 문제 유형이 더 이상 나타나지 않는지 확인합니다.

## Collector에서 호스트 이름 프로세서 구성 {#collector-configuration}

[리소스 탐지 프로세서][2]를 사용하여 호스트 및 클라우드 속성을 탐지하고, [Kubernetes 속성 프로세서][3]를 사용하여 Kubernetes 메타데이터를 추가합니다. 트레이스, 메트릭 및 로그 파이프라인에 프로세서를 추가합니다. Kubernetes에서는 `k8s_attributes`를 `resource_detection`보다 앞서 나열합니다. 이 예시는 OTLP HTTP 익스포터와 Datadog Exporter 모두에서 작동합니다.

권장 설정의 호스트, Docker 및 Kubernetes 구성에는 이미 이러한 프로세서가 포함되어 있습니다. 권장 구성의 프로세서를 이 예시로 대체하지 마세요. 권장 `k8s_attributes` 프로세서는 포드 메타데이터를 사용하여 `service.name` 및 기타 서비스 속성도 설정합니다. 게이트웨이, 기존 Datadog Exporter 구성 및 호스트 탐지 기능이 없는 기타 Collector 구성에 이 예시를 사용합니다.

구성 요소 이름 `resource_detection` 및 `k8s_attributes`는 OpenTelemetry Collector Contrib v0.153.0 이상이 필요합니다. 이전 버전에서는 `resourcedetection` 및 `k8sattributes`를 사용합니다. 이후 버전에서는 두 이름 모두 허용됩니다.

테스트를 거친 전체 구성은 [권장 OpenTelemetry Collector 설정][21]을 참조하세요.

{{< tabs >}}
{{% tab "호스트" %}}

Collector 구성에 다음을 추가합니다.

```yaml
processors:
  resource_detection:
    detectors: [env, system]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
    system:
      resource_attributes:
        # Optional: send CPU and OS details to the Infrastructure Host List
        os.description:
          enabled: true
        host.arch:
          enabled: true
        host.cpu.vendor.id:
          enabled: true
        host.cpu.family:
          enabled: true
        host.cpu.model.id:
          enabled: true
        host.cpu.model.name:
          enabled: true
        host.cpu.stepping:
          enabled: true
        host.cpu.cache.l2.size:
          enabled: true
```

클라우드 공급자를 사용하는 경우 해당 공급자의 탐지기를 `detectors` 목록 맨 앞에 추가합니다.

- Amazon EC2: `[ec2, env, system]`
- Google Cloud: `[gcp, env, system]`
- Azure: `[azure, env, system]`

{{% /tab %}}

{{% tab "Docker" %}}

Collector는 컨테이너 내부에서 호스트 정보를 탐지할 수 없습니다. Collector 컨테이너의 `OTEL_RESOURCE_ATTRIBUTES` 환경 변수(예: `OTEL_RESOURCE_ATTRIBUTES=host.name=<YOUR_HOST_NAME>`)에 `host.name`을 설정합니다. 그런 다음 `env` 탐지기를 사용하여 해당 값을 읽습니다.

```yaml
processors:
  resource_detection:
    detectors: [env]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
```

{{% /tab %}}

{{% tab "Kubernetes DaemonSet" %}}

이 예시에서는 [OpenTelemetry Collector Helm 차트][101]를 사용합니다.

`values.yaml`에 다음 내용을 추가합니다. 서비스 계정 및 클러스터 역할은 `k8s_attributes` 프로세서에 포드 메타데이터에 대한 읽기 권한을 부여합니다. 클라우드가 아닌 Kubernetes에서는 `OTEL_RESOURCE_ATTRIBUTES`가 노드 이름을 호스트 이름으로 설정합니다. Helm 차트는 `OTEL_K8S_NODE_NAME`을 설정합니다.

```yaml
extraEnvs:
  # Non-cloud Kubernetes only
  - name: OTEL_RESOURCE_ATTRIBUTES
    value: "k8s.node.name=$(OTEL_K8S_NODE_NAME)"
serviceAccount:
  create: true
clusterRole:
  create: true
  rules:
    - apiGroups: [""]
      resources: ["pods", "namespaces", "nodes"]
      verbs: ["get", "watch", "list"]
    - apiGroups: ["apps"]
      resources: ["replicasets"]
      verbs: ["get", "list", "watch"]
    - apiGroups: ["extensions"]
      resources: ["replicasets"]
      verbs: ["get", "list", "watch"]
```

이 구성에서는 차트의 `kubernetesAttributes` 프리셋을 활성화하지 마세요. 이 프리셋은 `k8sattributes`라는 이름의 두 번째 프로세서를 추가합니다.

Collector 구성에 다음을 추가합니다.

```yaml
processors:
  k8s_attributes:
    passthrough: false
    auth_type: "serviceAccount"
    pod_association:
      - sources:
          - from: resource_attribute
            name: k8s.pod.uid
      - sources:
          - from: resource_attribute
            name: k8s.pod.ip
      - sources:
          - from: resource_attribute
            name: k8s.pod.name
          - from: resource_attribute
            name: k8s.namespace.name
      - sources:
          - from: connection
    extract:
      metadata:
        - k8s.pod.name
        - k8s.pod.uid
        - k8s.deployment.name
        - k8s.node.name
        - k8s.namespace.name
        - k8s.pod.start_time
        - k8s.replicaset.name
        - k8s.replicaset.uid
        - k8s.daemonset.name
        - k8s.daemonset.uid
        - k8s.job.name
        - k8s.job.uid
        - k8s.cronjob.name
        - k8s.statefulset.name
        - k8s.statefulset.uid
        - container.image.name
        - container.image.tag
        - container.id
        - k8s.container.name
      labels:
        - tag_name: kube_app_name
          key: app.kubernetes.io/name
          from: pod
        - tag_name: kube_app_instance
          key: app.kubernetes.io/instance
          from: pod
        - tag_name: kube_app_version
          key: app.kubernetes.io/version
          from: pod
        - tag_name: kube_app_component
          key: app.kubernetes.io/component
          from: pod
        - tag_name: kube_app_part_of
          key: app.kubernetes.io/part-of
          from: pod
        - tag_name: kube_app_managed_by
          key: app.kubernetes.io/managed-by
          from: pod
  resource_detection:
    detectors: [env, system]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
    system:
      resource_attributes:
        host.name:
          enabled: false # Containers report inaccurate host names
```

관리형 Kubernetes 배포에서는 `resource_detection` 프로세서를 해당 환경에 맞는 변형으로 바꾸고 `OTEL_RESOURCE_ATTRIBUTES`는 생략합니다. Amazon EKS, EKS Auto Mode, Google GKE 및 Azure AKS에 해당하는 변형은 [관리형 Kubernetes 배포][102]를 참조하세요.

[101]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector
[102]: /ko/opentelemetry/setup/collector_exporter/#managed-kubernetes-distributions
{{% /tab %}}

{{% tab "Kubernetes DaemonSet -> Gateway" %}}

DaemonSet과 게이트웨이 각각의 `values.yaml` 파일에 **Kubernetes DaemonSet** 탭에 표시된 서비스 계정 및 클러스터 역할을 추가합니다. 차트의 `kubernetesAttributes` 프리셋을 활성화하지 마세요.

DaemonSet:

```yaml
processors:
  k8s_attributes:
    passthrough: true
    auth_type: "serviceAccount"
  resource_detection:
    detectors: [env, system]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
    system:
      resource_attributes:
        host.name:
          enabled: false # Containers report inaccurate host names
```

클라우드가 아닌 Kubernetes에서는 **Kubernetes DaemonSet** 탭에 표시된 대로 DaemonSet에서 `OTEL_RESOURCE_ATTRIBUTES`를 설정합니다. 관리형 Kubernetes 배포에서는 [관리형 Kubernetes 배포][201]에 나와 있는 해당 환경에 맞는 변형으로 `resource_detection` 프로세서를 바꿉니다.

패스스루 모드에서 DaemonSet의 `k8s_attributes` 프로세서는 포드 IP 주소만 추가합니다. 게이트웨이의 `k8s_attributes` 프로세서는 해당 주소를 사용하여 Kubernetes API에서 포드 메타데이터를 조회합니다.

Gateway:

```yaml
processors:
  k8s_attributes:
    passthrough: false
    auth_type: "serviceAccount"
    pod_association:
      - sources:
          - from: resource_attribute
            name: k8s.pod.ip
    extract:
      metadata:
        - k8s.pod.name
        - k8s.pod.uid
        - k8s.deployment.name
        - k8s.node.name
        - k8s.namespace.name
        - k8s.pod.start_time
        - k8s.replicaset.name
        - k8s.replicaset.uid
        - k8s.daemonset.name
        - k8s.daemonset.uid
        - k8s.job.name
        - k8s.job.uid
        - k8s.cronjob.name
        - k8s.statefulset.name
        - k8s.statefulset.uid
        - container.image.name
        - container.image.tag
        - container.id
        - k8s.container.name
      labels:
        - tag_name: kube_app_name
          key: app.kubernetes.io/name
          from: pod
        - tag_name: kube_app_instance
          key: app.kubernetes.io/instance
          from: pod
        - tag_name: kube_app_version
          key: app.kubernetes.io/version
          from: pod
        - tag_name: kube_app_component
          key: app.kubernetes.io/component
          from: pod
        - tag_name: kube_app_part_of
          key: app.kubernetes.io/part-of
          from: pod
        - tag_name: kube_app_managed_by
          key: app.kubernetes.io/managed-by
          from: pod
```

[201]: /ko/opentelemetry/setup/collector_exporter/#managed-kubernetes-distributions
{{% /tab %}}

{{% tab "Kubernetes 게이트웨이" %}}

애플리케이션이 DaemonSet Collector를 거치지 않고 게이트웨이로 직접 텔레메트리를 전송하는 경우 이 구성을 사용합니다. 게이트웨이의 `values.yaml`에 **Kubernetes DaemonSet** 탭에 표시된 서비스 계정 및 클러스터 역할을 추가합니다. 차트의 `kubernetesAttributes` 프리셋을 활성화하지 마세요.

Collector 구성에 다음을 추가합니다.

```yaml
processors:
  k8s_attributes:
    passthrough: false
    auth_type: "serviceAccount"
    pod_association:
      - sources:
          - from: resource_attribute
            name: k8s.pod.ip
    extract:
      metadata:
        - k8s.pod.name
        - k8s.pod.uid
        - k8s.deployment.name
        - k8s.node.name
        - k8s.namespace.name
        - k8s.pod.start_time
        - k8s.replicaset.name
        - k8s.replicaset.uid
        - k8s.daemonset.name
        - k8s.daemonset.uid
        - k8s.job.name
        - k8s.job.uid
        - k8s.cronjob.name
        - k8s.statefulset.name
        - k8s.statefulset.uid
        - container.image.name
        - container.image.tag
        - container.id
        - k8s.container.name
      labels:
        - tag_name: kube_app_name
          key: app.kubernetes.io/name
          from: pod
        - tag_name: kube_app_instance
          key: app.kubernetes.io/instance
          from: pod
        - tag_name: kube_app_version
          key: app.kubernetes.io/version
          from: pod
        - tag_name: kube_app_component
          key: app.kubernetes.io/component
          from: pod
        - tag_name: kube_app_part_of
          key: app.kubernetes.io/part-of
          from: pod
        - tag_name: kube_app_managed_by
          key: app.kubernetes.io/managed-by
          from: pod
```

{{% /tab %}}
{{< /tabs >}}

### 수집된 데이터 {#data-collected}

다음 표는 이러한 프로세서가 추가할 수 있는 리소스 속성을 나열합니다. **Datadog 태그** 열에는 Datadog이 해당 속성을 기반으로 생성하는 태그가 있는 경우 그 태그가 표시됩니다.

{{% collapse-content title="리소스 속성 및 Datadog 태그" level="p" %}}

| OpenTelemetry 속성 | Datadog 태그 | 프로세서 |
|---|---|---|
| `host.arch` |  | `resource_detection`(`system`) |
| `host.name` |  | `resource_detection`(`system` 또는 클라우드 탐지기) |
| `host.id` |  | `resource_detection`(클라우드 탐지기) |
| `host.cpu.vendor.id` |  | `resource_detection`(`system`) |
| `host.cpu.family` |  | `resource_detection`(`system`) |
| `host.cpu.model.id` |  | `resource_detection`(`system`) |
| `host.cpu.model.name` |  | `resource_detection`(`system`) |
| `host.cpu.stepping` |  | `resource_detection`(`system`) |
| `host.cpu.cache.l2.size` |  | `resource_detection`(`system`) |
| `os.description` |  | `resource_detection`(`system`) |
| `os.type` |  | `resource_detection`(`system`) |
| `cloud.provider` | `cloud_provider` | `resource_detection`(클라우드 탐지기) |
| `cloud.platform` |  | `resource_detection`(클라우드 탐지기) |
| `cloud.account.id` |  | `resource_detection`(클라우드 탐지기) |
| `cloud.region` | `region` | `resource_detection`(클라우드 탐지기) |
| `cloud.availability_zone` | `zone` | `resource_detection`(클라우드 탐지기) |
| `host.type` |  | `resource_detection`(클라우드 탐지기) |
| `gcp.gce.instance.hostname` |  | `resource_detection`(`gcp`) |
| `gcp.gce.instance.name` |  | `resource_detection`(`gcp`) |
| `k8s.cluster.name` | `kube_cluster_name` | `resource_detection`(클라우드 Kubernetes 탐지기) |
| `host.image.id` |  | `resource_detection`(`ec2`) |
| `aws.ecs.cluster.arn` | `ecs_cluster_name` | `resource_detection`(`ecs`) |
| `aws.ecs.task.arn` | `task_arn` | `resource_detection`(`ecs`) |
| `aws.ecs.task.family` | `task_family` | `resource_detection`(`ecs`) |
| `aws.ecs.task.revision` | `task_version` | `resource_detection`(`ecs`) |
| `aws.ecs.launchtype` |  | `resource_detection`(`ecs`) |
| `aws.log.group.names` |  | `resource_detection`(`ecs`) |
| `aws.log.group.arns` |  | `resource_detection`(`ecs`) |
| `aws.log.stream.names` |  | `resource_detection`(`ecs`) |
| `aws.log.stream.arns` |  | `resource_detection`(`ecs`) |
| `azure.vm.name` |  | `resource_detection`(`azure`) |
| `azure.vm.size` |  | `resource_detection`(`azure`) |
| `azure.vm.scaleset.name` |  | `resource_detection`(`azure`) |
| `azure.resourcegroup.name` |  | `resource_detection`(`azure`) |
| `k8s.namespace.name` | `kube_namespace` | `k8s_attributes` |
| `k8s.pod.name` | `pod_name` | `k8s_attributes` |
| `k8s.pod.uid` |  | `k8s_attributes` |
| `k8s.pod.start_time` |  | `k8s_attributes` |
| `k8s.deployment.name` | `kube_deployment` | `k8s_attributes` |
| `k8s.replicaset.name` | `kube_replica_set` | `k8s_attributes` |
| `k8s.replicaset.uid` |  | `k8s_attributes` |
| `k8s.daemonset.name` | `kube_daemon_set` | `k8s_attributes` |
| `k8s.daemonset.uid` |  | `k8s_attributes` |
| `k8s.statefulset.name` | `kube_stateful_set` | `k8s_attributes` |
| `k8s.statefulset.uid` |  | `k8s_attributes` |
| `k8s.container.name` | `kube_container_name` | `k8s_attributes` |
| `k8s.job.name` | `kube_job` | `k8s_attributes` |
| `k8s.job.uid` |  | `k8s_attributes` |
| `k8s.cronjob.name` | `kube_cronjob` | `k8s_attributes` |
| `k8s.node.name` |  | `k8s_attributes` |
| `container.id` | `container_id` | `k8s_attributes` |
| `container.image.name` | `image_name` | `k8s_attributes` |
| `container.image.tag` | `image_tag` | `k8s_attributes` |

{{% /collapse-content %}}

## 사용자 지정 태그 지정 {#custom-tagging}

### 사용자 지정 호스트 태그 {#custom-host-tags}

#### OTLP 리소스 속성으로 지정 {#as-otlp-resource-attributes}

사용자 지정 호스트 태그를 추가하려면 `datadog.host.tag.` 접두사를 사용하여 리소스 속성을 설정합니다.

[OpenTelemetry SDK][5]에서는 `OTEL_RESOURCE_ATTRIBUTES` 환경 변수를 사용하여 설정합니다.

```shell
OTEL_RESOURCE_ATTRIBUTES=datadog.host.tag.<CUSTOM_TAG_NAME>=<CUSTOM_TAG_VALUE>
```

Collector에서는 리소스 프로세서를 사용하여 설정합니다.

```yaml
processors:
  resource:
    attributes:
    - key: datadog.host.tag.<CUSTOM_TAG_NAME>
      action: upsert
      from_attribute: <SOURCE_ATTRIBUTE>
```

**참고**: Datadog Exporter의 경우, 사용자 지정 호스트 태그를 사용하려면 [인프라 목록 호스트 정보][7]에 설명된 옵트인이 필요합니다.

#### Datadog Exporter에서 {#in-the-datadog-exporter}

[Datadog Exporter][20]를 사용하는 기존 구성에서는 익스포터의 `host_metadata` 섹션에서 사용자 지정 호스트 태그를 설정할 수도 있습니다.

```yaml
exporters:
  datadog:
    host_metadata:
      tags: ["team:infra", "<TAG_KEY>:<TAG_VALUE>"]
```

이 태그는 호스트 이름이 익스포터의 호스트 메타데이터에 있는 호스트 이름과 일치하는 텔레메트리에만 적용됩니다. 모든 호스트의 텔레메트리에 태그를 지정하려면 프로세서를 사용합니다. 사용 가능한 모든 옵션은 [Datadog Exporter 구성 예시][6]를 참조하세요.

### 호스트 별칭 {#host-aliases}

호스트 별칭을 설정하려면 `datadog.host.aliases` 리소스 속성을 설정합니다. 예를 들어, 변환 프로세서를 사용합니다.

```yaml
processors:
  transform:
    trace_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.aliases"], ["alias1", "alias2", "alias3"])
```

**참고**: Datadog Exporter를 사용하는 경우, 호스트 별칭을 사용하려면 [인프라 목록 호스트 정보][7]에 설명된 옵트인이 필요합니다.

### 사용자 지정 컨테이너 태그 {#custom-container-tags}

사용자 지정 컨테이너 태그를 추가하려면 `datadog.container.tag.` 접두사가 있는 리소스 속성을 설정합니다.

[OpenTelemetry SDK][5]에서는 `OTEL_RESOURCE_ATTRIBUTES` 환경 변수를 사용하여 설정합니다.

```shell
OTEL_RESOURCE_ATTRIBUTES=datadog.container.tag.<CUSTOM_TAG_NAME>=<CUSTOM_TAG_VALUE>
```

Collector에서는 리소스 프로세서를 사용하여 설정합니다.

```yaml
processors:
  resource:
    attributes:
    - key: datadog.container.tag.<CUSTOM_TAG_NAME>
      action: upsert
      from_attribute: <SOURCE_ATTRIBUTE>
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourcedetectionprocessor/README.md
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/k8sattributesprocessor/README.md
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/k8s-values.yaml
[5]: https://opentelemetry.io/docs/languages/js/resources/
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml
[7]: /ko/opentelemetry/mapping/host_metadata/
[8]: /ko/opentelemetry/mapping/hostname/
[9]: /ko/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/
[10]: /ko/opentelemetry/troubleshooting/#infrastructure-tags-are-missing-from-telemetry
[11]: /ko/opentelemetry/setup/otlp_ingest_in_the_agent/
[12]: /ko/opentelemetry/setup/otlp_ingest/serverless/
[13]: /ko/opentelemetry/setup/otlp_ingest/managed_platforms/
[14]: /ko/opentelemetry/setup/ddot_collector/install/linux/
[15]: /ko/opentelemetry/setup/ddot_collector/install/windows/
[16]: /ko/opentelemetry/setup/ddot_collector/install/ecs_fargate/
[17]: /ko/opentelemetry/setup/ddot_collector/install/eks_fargate/
[18]: /ko/opentelemetry/setup/ddot_collector/install/kubernetes_gateway/
[19]: /ko/opentelemetry/troubleshooting/#gateway-collector-not-forwarding-host-metadata
[20]: /ko/opentelemetry/setup/collector_exporter/datadog_exporter/
[21]: /ko/opentelemetry/setup/collector_exporter/
[22]: /ko/opentelemetry/setup/otlp_ingest/
[24]: /ko/opentelemetry/setup/collector_exporter/#span-metrics-connector