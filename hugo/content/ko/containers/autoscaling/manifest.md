---
description: Datadog UI에서 노출되지 않는 옵션에 액세스하려면 YAML에서 DatadogPodAutoscaler 사용자 지정 리소스를
  구성하세요.
further_reading:
- link: /containers/autoscaling/
  tag: 설명서
  text: Kubernetes Autoscaling
- link: /containers/guide/manage-datadogpodautoscaler-with-argocd/
  tag: 설명서
  text: ArgoCD로 DatadogPodAutoscaler 관리
- link: /containers/guide/manage-datdadogpodautoscaler-with-terraform/
  tag: 설명서
  text: Terraform으로 DatadogPodAutoscaler 관리
title: DatadogPodAutoscaler 매니페스트 참조
---
`DatadogPodAutoscaler`(DPA) 사용자 지정 리소스는 단일 Kubernetes 워크로드에 대한 자동 크기 조정 동작을 정의합니다. {{< ui >}}Export Recommendation{{< /ui >}}을 포함하는 [Autoscaling UI][1]에서 시작하는 것이 좋습니다. 워크로드를 구성한 다음 생성된 매니페스트를 복사하세요. 매니페스트를 직접 편집하면 사용자 지정 리소스 정의(CRD)의 모든 필드에 액세스할 수 있으며, DPA를 GitOps 워크플로의 일반적인 부분으로 만들 수 있습니다. 이때 매니페스트는 검토되고 버전 관리되는 단일 정보 소스가 됩니다.

이 페이지에서는 매니페스트에서 사용할 수 있는 구성 옵션을 다룹니다. 이 페이지의 예제는 API 버전 `datadoghq.com/v1alpha2`를 사용합니다.

설정 및 필수 구성 요소는 [Kubernetes Autoscaling][2]을 참조하세요. 해당 페이지에서는 Datadog Cluster Agent에서 Workload Autoscaling과 Admission Controller 활성화, 필요한 Agent 버전, [in-place vertical scaling][3] 활성화에 대해 다룹니다.

## 매니페스트 구조 {#anatomy-of-a-manifest}

다음 주석이 포함된 스켈레톤은 `DatadogPodAutoscaler`의 구조를 보여줍니다. `targetRef`를 제외한 모든 필드는 선택 사항입니다.

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
  name: my-app                      # required: conventionally the workload name
  namespace: my-namespace           # required: must match the target workload
  annotations:                      # optional
    ad.datadoghq.com/tags: '{"team": "my-team"}'   # optional: tags on this DPA's telemetry
spec:
  owner: Local                      # optional: Local = this manifest is the source of truth (use for GitOps)
                                    # Remote = created and managed from the Datadog UI

  targetRef:                        # required: the workload being autoscaled - one DPA per workload
    apiVersion: apps/v1
    kind: Deployment
    name: my-app

  applyPolicy:                      # optional
    mode: Apply                     # Apply | Preview (Preview = compute recommendations, change nothing)

    scaleUp:                        # optional: horizontal, upward
      strategy: Max                 # Max | Min | Disabled
      stabilizationWindowSeconds: 600
      rules:
        - type: Percent             # Percent | Pods
          value: 50
          periodSeconds: 120        # 1..3600

    scaleDown:                      # optional: horizontal, downward
      strategy: Max
      stabilizationWindowSeconds: 600
      rules:
        - type: Percent
          value: 10
          periodSeconds: 1800

    update:                         # optional: vertical
      strategy: Auto                # Auto | Disabled | TriggerRollout
      # resizePendingPeriod: 600    # see Vertical rollout timing
      # rolloutFallbackDelay: 900   # see Vertical rollout timing

  constraints:                      # optional
    minReplicas: 3
    maxReplicas: 100
    containers:                     # optional: per-container vertical configuration
      - name: "*"                   # "*" matches all containers
        enabled: true
        controlledResources: [cpu, memory]
        controlledValues: RequestsAndLimits   # RequestsAndLimits | RequestsOnly
        minAllowed:
          cpu: "500m"
          memory: 1Gi
        maxAllowed:
          cpu: "4"
          memory: 8Gi

  objectives:                       # optional: configures horizontal scaling (also used by multidimensional). Exactly one entry.
    - type: ContainerResource       # PodResource | ContainerResource | CustomQuery
      containerResource:
        container: my-app
        name: cpu                   # cpu | memory
        value:
          type: Utilization         # Utilization | AbsoluteValue
          utilization: 65

  fallback:                         # optional: in-cluster horizontal fallback if recommendations go stale
    horizontal:
      enabled: true
      direction: ScaleUp            # ScaleUp | ScaleDown | All (default ScaleUp)
      triggers:
        staleRecommendationThresholdSeconds: 600   # 100..3600, default 600

  options:                          # optional
    burstable: false                # true = remove CPU limits, keep CPU request recommendations
    outOfMemory:
      bumpUpRatio: "1.2"            # +20% memory limit after an OOMKill (default)
```

### 지원되는 대상 워크로드 {#supported-target-workloads}

| `targetRef.kind` | `apiVersion` | 상태 |
|---|---|---|
| `Deployment` | `apps/v1` | 지원됨 |
| `Rollout` (Argo Rollouts) | `argoproj.io/v1alpha1` | 지원됨 |
| `StatefulSet` | `apps/v1` | 지원됨 |

Argo Rollout의 경우 `targetRef`가 해당 Rollout이 관리하는 Deployment가 아니라 Rollout 자체를 가리키도록 설정하세요.

```yaml
  targetRef:
    apiVersion: argoproj.io/v1alpha1
    kind: Rollout
    name: my-app
```

### 크기 조정 모드 선택 {#choose-a-scaling-mode}

`objectives` 및 `applyPolicy.update.strategy`의 조합에 따라 DPA가 수평, 수직 또는 두 방향 모두로 크기를 조정할지가 결정됩니다.

| `objectives` 설정 | `applyPolicy.update.strategy` | 결과 모드 |
|---|---|---|
| 예 | `Disabled` (또는 설정되지 않음) | 수평 전용 |
| 아니요 | `Auto` | 수직 전용 |
| 예 | `Auto` | 다차원(둘 다) |

## 컨테이너 제약 조건 {#container-constraints}

대부분의 수직 옵션은 `spec.constraints.containers[]`을 통해 지정됩니다.

| 필드 | 유형 | 기본값 | 의미 |
|---|---|---|---|
| `name` | 문자열, **필수** | - | 컨테이너 이름 또는 자체 항목이 없는 모든 컨테이너와 일치하는 `"*"`([컨테이너 제외](#exclude-a-container) 참조) |
| `enabled` | 불리언 | `true` | `false`이 컨테이너의 리소스 자동 크기 조정을 비활성화함 |
| `controlledResources` | `cpu`의 목록, `memory` | `[cpu, memory]` | 수직 권장 사항을 받을 리소스 빈 목록은 `enabled: false` |와 동일합니다.
| `controlledValues` | 열거형 | `RequestsAndLimits` | 권장 사항이 요청 _및_ 제한을 모두 기록할지, 아니면 요청만 기록할지 여부 |
| `minAllowed` | 리소스 맵 | - | 컨테이너 요청에 대한 하한값 |
| `maxAllowed` | 리소스 맵 | - | 컨테이너 요청에 대한 상한값 |

`constraints.containers`가 완전히 생략되면 **모든** 컨테이너에 대해 제한 없이 리소스 크기 조정이 활성화됩니다.

## CPU 및 메모리 적정 크기 조정 {#right-size-cpu-and-memory}

DPA가 수평 크기 조정(`objectives`)과 수직 크기 조정(`update.strategy: Auto`)을 결합할 때 기본 동작은 **메모리에 대해서만** 수직 권장 사항을 생성하는 것입니다. CPU 요청 및 제한은 변경되지 않으며, `VerticalAbleToRecommend` 조건은 `Unknown`로 표시될 수 있습니다.

DPA가 CPU는 변경하지 않고 메모리만 적정 크기로 조정하는 경우 그 이유는 다음과 같습니다. 이는 서비스 품질(QoS) 클래스 보존과는 관련이 없습니다.

`controlledResources`를 사용하여 수직 권장 사항을 받을 리소스를 지정하세요.

| `controlledResources` | 생성된 수직 권장 사항 |
|---|---|
| 설정되지 않음 | 메모리만(기본값) |
| `[memory]` | 메모리만, 설정되지 않은 경우와 동일 |
| `[cpu, memory]` | **메모리 및 CPU** |
| `[cpu]` | CPU만 |

전체 예시:

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
  name: my-app
  namespace: my-namespace
spec:
  owner: Local
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  applyPolicy:
    mode: Apply
    update:
      strategy: Auto              # required - without it, nothing vertical is applied
  constraints:
    minReplicas: 3
    maxReplicas: 60
    containers:
      - name: "*"
        controlledResources:
          - cpu                   # opts CPU into vertical rightsizing
          - memory
        controlledValues: RequestsAndLimits
  objectives:
    - type: ContainerResource
      containerResource:
        container: my-app
        name: cpu
        value:
          type: Utilization
          utilization: 65
```

이 기능을 사용하려면 Datadog Cluster Agent 7.78.0 이상이 필요합니다. 이전 버전에서는 `controlledResources` 필드가 CRD에서 허용되지만 아무런 영향을 미치지 않습니다.

## 버스터블 모드로 CPU 제한 제거 {#remove-cpu-limits-with-burstable-mode}

CPU 제한 권장 사항은 여러 날에 걸쳐 측정된 지속적인 사용량의 백분위수를 기준으로 산출됩니다. 짧은 워밍업 스파이크(예: JVM 시작 시)는 이러한 백분위수에 거의 영향을 미치지 않으므로, 권장 CPU 제한이 너무 낮아져 잘못된 시점에 애플리케이션이 스로틀링될 수 있습니다. 메모리는 최대 메모리 사용량이 신뢰할 수 있는 상한값을 제공하므로 같은 방식의 영향을 받지 않습니다.

버스터블 모드는 **CPU 제한을 완전히 제거**하면서도 CPU _요청_ 권장 사항을 계속 적용합니다.

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
  name: my-java-app
  namespace: my-namespace
spec:
  owner: Local
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-java-app
  applyPolicy:
    mode: Apply
    update:
      strategy: Auto
  options:
    burstable: true
```

`options.burstable`이 설정되지 않은 경우, Cluster Agent의 클러스터 전체 기본값이 적용됩니다. 단일 워크로드를 기본 동작에서 제외하려면 `false`로 명시적으로 설정하세요.

포드에 미치는 영향:

| | 이전 | 이후 |
|---|---|---|
| CPU 요청 | `1` | `400m` (권장 사항) |
| CPU 제한 | `2` | **제거됨** |
| 메모리 요청 | `500Mi` | `450Mi` (권장 사항) |
| 메모리 제한 | `2Gi` | `2Gi`, 유지됨 |

활성화하기 전에 다음 사항을 확인하세요.

- **Guaranteed** QoS였던 포드는 **Burstable** QoS가 됩니다. 이는 노드 압박 상황에서 포드의 축출 우선순위를 변경합니다.
- CPU 제한이 없으면 컨테이너는 사용 가능한 노드 CPU를 소비할 수 있습니다. 커널 CPU 공유는 여전히 적용됩니다.
- Burstable 모드**가 CPU 제한에 대해**`controlledValues`보다 우선합니다. 둘 다 설정된 경우, Burstable이 우선합니다.

## OOMKill 메모리 증가폭 조정 {#tune-the-oomkill-memory-bump}

OOMKill 발생 후 메모리 제한은 당시 적용 중이던 제한값 대비 20% 상향 조정됩니다. 이 증가는 즉시 적용되며 워크로드가 안정될 때까지 이후의 각 OOMKill 발생 시마다 반복됩니다.

비율을 변경하려면 다음과 같이 하세요.

```yaml
spec:
  options:
    outOfMemory:
      bumpUpRatio: "1.5"      # 1.2 = +20% (default), 1.5 = +50%
```

값을 따옴표로 묶으세요. 이는 부동 소수점 숫자가 아닌 Kubernetes 수량입니다.

**상향 조정 시기** 메모리 사용량이 이전 최고치를 크게 상회할 수 있는 워크로드의 경우 비율을 높이세요. 더 큰 증가폭을 설정하면 적절한 메모리 제한에 더 빨리 도달하며 워크로드가 안정되기 전까지 여러 차례 연속으로 상향 조정되는 것을 방지할 수 있습니다. 비율을 높일 때는 `minAllowed` 메모리 하한선([컨테이너별 경계 설정](#set-per-container-bounds) 참조)도 함께 설정하여 권장 주기 사이에 제한이 안전한 값보다 낮아지지 않도록 하세요.

## 요청만 적정 크기로 조정 {#right-size-requests-only}

(버스트 헤드룸, 플랫폼 요구 사항 또는 QoS 보장을 위해) 제한을 의도적으로 조정했고 Datadog이 **요청**만 적정 크기로 조정하도록 하려면 `controlledValues: RequestsOnly`를 사용하세요.

```yaml
spec:
  constraints:
    containers:
      - name: my-app
        controlledResources: [cpu, memory]
        controlledValues: RequestsOnly     # limits are not right-sized
```

| `controlledValues` | 요청 | 제한 |
|---|---|---|
| `RequestsAndLimits` (기본값) | 권장 | 권장 |
| `RequestsOnly` | 권장 | 적정 크기로 조정되지 않음, **단** 포드 사양을 유효하게 유지하기 위해 제한을 변경해야 하는 경우는 예외(아래 참조) |

주의해야 할 상호 작용:

- `request == limit`인 컨테이너에서 요청을 낮추면 Guaranteed QoS 클래스가 유지되지 않습니다. Guaranteed가 필요한 경우 `RequestsAndLimits`를 유지하세요. 추천기는 `request == limit` 컨테이너를 명시적으로 처리합니다.
- Burstable 모드는 CPU 제한에 대해 이를 재정의합니다([Burstable 모드로 CPU 제한 제거](#remove-cpu-limits-with-burstable-mode) 참조).
- **OOMKill 처리는 여전히 메모리 제한을 조정합니다.** `RequestsOnly`는 메모리 증가를 억제하지 않습니다. OOMKill 발생 후 메모리 제한이 상향 조정되며, 요청 또한 그에 따라 상향 조정될 수 있습니다(Kubernetes는 요청이 제한을 초과하는 모든 포드를 거부합니다). `RequestsOnly`를 '제한이 _적정 크기로 조정되지 않음_'이라는 의미로 해석해야 하며, '제한이 절대 수정되지 않음'이라는 의미는 아닙니다. [OOMKill 메모리 증가 조정](#tune-the-oomkill-memory-bump)를 참조하세요.

조합 선택:

| 목표 | 구성 |
|---|---|
| 모두 적정 크기로 조정 | `controlledResources: [cpu, memory]` + `controlledValues: RequestsAndLimits` |
| 요청만 적정 크기로 조정하고 제한은 설정된 대로 유지 | `controlledValues: RequestsOnly` |
| 메모리만 적정 크기로 조정하고 CPU는 그대로 유지 | `controlledResources: [memory]` |
| CPU 요청만 적정 크기로 조정하고 CPU 제한은 전혀 두지 않음 | `options.burstable: true` |
| 컨테이너를 완전히 그대로 유지 | `enabled: false` |

## 컨테이너별 경계 설정 {#set-per-container-bounds}

`minAllowed`와 `maxAllowed`는 추천기가 생성할 수 있는 리소스 요청을 제한합니다. 지연 시간에 민감한 워크로드에 권장됩니다. 또한 OOM 증가 비율을 변경할 때([OOMKill 메모리 증가 조정](#tune-the-oomkill-memory-bump) 참조) 권장 주기 사이에 메모리 요청이 안전한 최솟값 아래로 떨어지지 않도록 설정하는 것이 권장됩니다.

```yaml
spec:
  constraints:
    minReplicas: 2
    maxReplicas: 100
    containers:
      - name: api
        enabled: true
        minAllowed:
          cpu: "1"
          memory: 1Gi
        maxAllowed:
          cpu: "4"
          memory: 5Gi
      - name: worker
        enabled: true          # no bounds - recommendations are unconstrained
```

## 컨테이너 제외{#exclude-a-container}

컨테이너를 수직 권장 사항이나 수평 신호 또는 둘 다에서 제외할 수 있습니다.

### 수직 권장 사항에서 컨테이너 제외{#exclude-a-container-from-vertical-recommendations}

```yaml
spec:
  constraints:
    containers:
      - name: my-app
        enabled: true
      - name: istio-proxy
        enabled: false          # resources for this container are never modified
```

동일한 구성을 명시적으로 지정할 수도 있습니다.

```yaml
      - name: istio-proxy
        controlledResources: []   # empty list is equivalent to enabled: false
```

일반적인 패턴은 알려진 사이드카를 제외한 모든 항목을 자동 확장하는 것입니다.

```yaml
spec:
  constraints:
    containers:
      - name: "*"
        enabled: true
        controlledResources: [cpu, memory]
      - name: istio-proxy
        enabled: false
```

**`"*"`와 명명된 항목의 결합 방식:** `"*"` 항목은 명명된 항목이 **없는** 모든 컨테이너에 적용됩니다. 자체 명명된 항목이 있는 컨테이너는 해당 이름 아래에 선언된 설정만 적용합니다. 두 항목은 **병합되지 않으므로**, 와일드카드는 해당 컨테이너에 아무런 영향을 주지 않습니다.

위 예시에서 `istio-proxy`는 `enabled: false`에 의해서만 제어되며 와일드카드로부터 `controlledResources`를 상속받지 않습니다. 포드 내의 다른 모든 컨테이너는 와일드카드 항목을 사용합니다.

**참고**: 경계를 설정하기 위해서만 명명된 항목을 추가하는 경우, 유지하려는 와일드카드 설정을 반복해서 지정하세요. 아래 예시에서 `my-app`은 와일드카드에 설정된 `RequestsOnly` 대신 기본값 `RequestsAndLimits`로 폴백됩니다.

```yaml
      - name: "*"
        controlledValues: RequestsOnly
      - name: my-app
        maxAllowed:
          memory: 8Gi          # controlledValues is NOT inherited - repeat it if you want it
```

### 수평 신호에서 컨테이너 제외{#exclude-a-container-from-the-horizontal-signal}

`enabled: false`는 _수직_ 동작만 제어합니다. 수평 목표는 별도로 선택되며, 사이드카가 크기 조정 결정을 가장 자주 왜곡하는 지점도 바로 여기입니다.

```yaml
  objectives:
    # Recommended: scale on the application container's CPU
    - type: ContainerResource
      containerResource:
        container: my-app
        name: cpu
        value:
          type: Utilization
          utilization: 65
```

다음 포드 수준 구성은 사이드카가 있을 때 오해의 소지가 있는 결과를 낼 수 있습니다.

```yaml
  objectives:
    # Risky when sidecars are present: pod-level utilization is diluted by
    # sidecar requests, so a busy application container can appear idle.
    - type: PodResource
      podResource:
        name: cpu
        value:
          type: Utilization
          utilization: 65
```

**권장 사항**: 포드에 사이드카가 있는 경우, 메인 컨테이너로 범위를 한정한 `ContainerResource`를 사용하세요. `PodResource`는 단일 컨테이너 포드에만 사용하세요.

## 사이드카 구성 {#configure-sidecars}

### 일반 사이드카 (`spec.containers`) {#ordinary-sidecars-speccontainers}

특별한 작업은 필요하지 않습니다. 이들은 다른 컨테이너와 마찬가지로 경계를 설정하거나 제외 또는 타겟팅할 수 있습니다. [컨테이너 제외](#exclude-a-container)를 참조하세요.


### 네이티브 사이드카(`restartPolicy: Always`를 사용하는 `spec.initContainers`) {#native-sidecars-specinitcontainers-with-restartpolicy-always}

Kubernetes 1.29 이상은 `initContainers`에서 `restartPolicy: Always`를 사용하여 선언하는 장기 실행 사이드카를 지원하며, 이를 [네이티브 사이드카][4] 패턴이라고 합니다. 네이티브 사이드카는 포드의 전체 수명 동안 실행됩니다.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  template:
    spec:
      initContainers:
        - name: log-shipper
          image: log-shipper:1.2
          restartPolicy: Always      # this is what makes it a native sidecar
          resources:
            requests: {cpu: 100m, memory: 128Mi}
            limits:   {memory: 256Mi}
      containers:
        - name: my-app
          image: my-app:4.5
          resources:
            requests: {cpu: "1", memory: 2Gi}
            limits:   {cpu: "2", memory: 4Gi}
```

**네이티브 사이드카는 완전히 지원됩니다.** 이들은 일반 컨테이너로 취급됩니다. 즉, 권장 사항이 생성되어 적용되고, 워크로드의 컨테이너 목록에 표시되어 구성하거나 제외할 수 있습니다. 다른 컨테이너와 마찬가지로 `constraints.containers[]`에서 **이름**으로 참조하세요. DPA 사양에는 별도의 `initContainers` 블록이 없으며, `"*"` 항목이 네이티브 사이드카에도 적용됩니다.

```yaml
spec:
  constraints:
    containers:
      - name: my-app
        controlledResources: [cpu, memory]
        controlledValues: RequestsAndLimits
      - name: log-shipper        # native sidecar, referenced by name
        enabled: false
```

주의할 점:

- `restartPolicy: Always`가 네이티브 사이드카를 구분하는 기준입니다. 일반 init 컨테이너(애플리케이션이 시작되기 전에 실행이 완료되는 컨테이너)는 네이티브 사이드카가 아니며 DPA에 의해 관리되지 않습니다.
- **비용 및 절감액 수치는 네이티브 사이드카를 과소 집계할 수 있습니다.** 이들의 리소스 요청은 별도의 집계 항목으로 보고되므로, 네이티브 사이드카가 있는 워크로드에 표시되는 비용 수치가 관찰된 사용량과 일치하지 않는 것처럼 보일 수 있습니다. 이는 비용 표시에만 영향을 미치는 알려진 제한 사항이며, 권장 사항에는 영향을 주지 않습니다.
- **주입된 사이드카**(예: Istio)는 포드 수준에서 변경 승인 웹훅에 의해 추가되며 Deployment 매니페스트에는 나타나지 않습니다. 컨테이너 목록은 워크로드 매니페스트만이 아니라 실행 중인 포드를 기준으로 조정되므로 이러한 사이드카도 인식됩니다.
- **자동 확장된 컨테이너를 Agent 수집에서 제외하지 마세요.** `DatadogPodAutoscaler`는 Agent가 관리하는 컨테이너에 대해 수집한 메트릭에 의존합니다. 자동 확장된 워크로드의 컨테이너가 Agent의 컨테이너 검색 구성을 통해 필터링되면 해당 컨테이너에 대한 메트릭이 없으므로 적정 크기로 조정할 수 없습니다. 자동 확장된 워크로드의 컨테이너가 수집에서 제외되지 않았는지 확인하세요. 포함 및 제외 규칙이 작동하는 방식은 [컨테이너 검색 관리][7]를 참조하세요.

## 추가 매니페스트 옵션 {#additional-manifest-options}

### 미리 보기(드라이런) 모드 {#preview-dry-run-mode}

```yaml
spec:
  applyPolicy:
    mode: Preview     # recommendations are computed and visible in .status, but nothing is applied
```

임시 정지 스위치로 유용합니다. 수평 구성이 유효하지 않은 경우 수직 적정 크기 조정은 계속 실행됩니다. `mode: Preview`를 설정하면 문제를 수정하는 동안 두 작업이 모두 중지됩니다.

### 한 가지 크기 조정 방향 비활성화{#disable-one-scaling-direction}

```yaml
spec:
  applyPolicy:
    scaleUp:
      strategy: Max
    scaleDown:
      strategy: Disabled     # never scale down
    update:
      strategy: Auto
```

수직 전용 크기 조정의 경우 `objectives`를 생략하고 `update.strategy: Auto`를 설정하세요. [크기 조정 모드 선택](#choose-a-scaling-mode) 표를 참조하세요. `objectives`가 없으면 수평 크기 조정이 적용될 대상이 없으므로 `scaleUp`과 `scaleDown`을 `Disabled`로 설정할 필요도 없습니다.

### 수직 롤아웃 타이밍{#vertical-rollout-timing}

컨트롤러는 사용 가능한 경로 중 중단을 최소화하는 방식으로 수직 변경을 적용하며, 해당 경로가 정체되면 다음 단계로 전환합니다. 두 필드가 각 단계에서 대기하는 시간을 제어합니다.

```yaml
spec:
  applyPolicy:
    update:
      strategy: Auto
      resizePendingPeriod: 600      # 1..3600 seconds
      rolloutFallbackDelay: 900     # 1..3600 seconds
```

| 필드 | 제어 항목|
|---|---|
| `resizePendingPeriod` | kubelet이 크기 조정을 보류 중(수락되었으나 진행되지 않음, 종종 노드에 여유 공간이 부족하기 때문)으로 보고할 때 포드를 축출하기 전까지의 대기 시간 |
| `rolloutFallbackDelay` | 일반적으로 PodDisruptionBudget에 의해 포드 축출이 차단된 경우 전체 롤아웃으로 폴백하기 전까지의 대기 시간 |

둘 다 선택 사항이며 1~3600초로 설정할 수 있습니다. 설정하지 않으면 컨트롤러의 기본 제공 값이 적용됩니다.

축출 비용이 높은 경우(긴 워밍업, 대규모 캐시, 느린 드레인) - **`resizePendingPeriod`를 높이세요**. 기존 크기를 더 오래 유지하는 대신 재시작 횟수를 줄일 수 있습니다.
엄격한 PodDisruptionBudget이 적용된 워크로드에서는 일시적인 예산 제약으로 인해 즉시 전체 롤아웃으로 전환되지 않도록 - **`rolloutFallbackDelay`를 높이세요**.
재시작 비용이 낮고 권장 사항을 더 빨리 적용하려면 - **둘 중 하나를 낮추세요**.

이 설정들은 변경 사항이 _어떻게_ 적용되는지를 제어하며, 변경이 _발생하는지 여부_는 제어하지 않습니다. 변경을 완전히 중단하려면 `update.strategy: Disabled` 또는 `applyPolicy.mode: Preview`를 사용하세요. 이 필드들은 [인플레이스 수직 스케일링][3]에 적용됩니다. 클러스터 수준 활성화 및 Kubernetes 요구 사항은 개요를 참조하세요.

### 로컬 폴백 튜닝{#local-fallback-tuning}

```yaml
spec:
  fallback:
    horizontal:
      enabled: true
      direction: ScaleUp          # default; use All to allow fallback scale-in as well
      triggers:
        staleRecommendationThresholdSeconds: 600    # 100..3600
```

폴백 권장 사항은 Agent가 수집한 메트릭을 기반으로 클러스터 내부에서 계산되므로, Datadog이 임계값 내에 권장 사항을 제공하지 못하더라도 크기 조정은 계속됩니다.

이 기능은 Cluster Agent와 노드 Agent 모두에서 클러스터 측 구성도 필요합니다. [Kubernetes Autoscaling][2]을 참조하거나 [Datadog 지원팀][6]에 문의하세요.

### 절대값 목표{#absolute-value-objectives}

사용률 백분율 대신 절대값을 목표로 지정합니다.

```yaml
  objectives:
    - type: ContainerResource
      containerResource:
        container: my-app
        name: cpu
        value:
          type: AbsoluteValue
          absoluteValue: "1.5"     # target cores per pod
```

### 사용자 지정 쿼리 목표{#custom-query-objectives}

CPU나 메모리 대신 원하는 Datadog 메트릭을 기준으로 크기를 조정합니다.

```yaml
  objectives:
    - type: CustomQuery
      customQuery:
        window: 5m
        request:
          queries:
            - name: a
              source: Metrics
              metrics:
                query: "avg:my.queue.depth{service:my-app}"
        value:
          type: AbsoluteValue
          absoluteValue: "100"
```

`source`는 `ApmMetrics`일 수도 있으며, `service`, `resourceName`, `operationName`, `stat` 등의 필드를 포함합니다.

사용자 지정 쿼리는 **수평 크기 조정에만** 지원됩니다. 사용자 지정 쿼리와 수직 크기 조정을 결합하는 것은 **지원되지 않습니다**. 오토스케일러가 임의의 쿼리가 어느 차원에 적용되어야 하는지 추론할 수 없기 때문입니다.

### DPA 텔레메트리 태그 지정 {#tag-a-dpas-telemetry}

```yaml
metadata:
  annotations:
    ad.datadoghq.com/tags: '{"team": "my-team", "tier": "critical"}'
```

이 작업은 이 DPA에 대해 내보내는 자동 확장 텔레메트리에 태그를 추가합니다. Cluster Agent가 내보내는 메트릭 목록은 [Datadog Cluster Agent 통합][5]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/orchestration/scaling/workload
[2]: /ko/containers/autoscaling/
[3]: /ko/containers/autoscaling/#in-place-vertical-scaling
[4]: https://kubernetes.io/docs/concepts/workloads/pods/sidecar-containers/
[5]: /ko/integrations/datadog-cluster-agent/#metrics
[6]: /ko/help/
[7]: /ko/containers/guide/container-discovery-management/