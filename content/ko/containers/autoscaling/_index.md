---
aliases:
- /ko/containers/monitoring/autoscaling
description: Datadog 메트릭과 지능형 스케일링 권장 사항을 사용하여 Kubernetes 워크로드 자동 확장
further_reading:
- link: /infrastructure/containers/kubernetes_resource_utilization
  tag: 설명서
  text: Kubernetes 리소스 활용
- link: /account_management/rbac/permissions
  tag: 설명서
  text: Datadog 역할 권한
- link: /agent/remote_config/
  tag: 설명서
  text: Remote Configuration
- link: https://www.datadoghq.com/blog/autoscaling-custom-metrics
  tag: 블로그
  text: 사용자 지정 메트릭을 활용한 Kubernetes 워크로드 확장
- link: https://www.datadoghq.com/blog/kubernetes-custom-query-autoscaling
  tag: 블로그
  text: Custom Query Scaling을 사용한 Kubernetes 워크로드 최적화
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: 블로그
  text: DDOT 게이트웨이를 통해 OpenTelemetry 파이프라인을 중앙에서 관리 및 제어
- link: https://www.datadoghq.com/blog/datadog-kubernetes-autoscaling/
  tag: 블로그
  text: Datadog Kubernetes Autoscaling으로 워크로드 규모를 적정화하고 비용 절감
title: Kubernetes Autoscaling
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">
  이 기능은 Datadog for Government({{< region-param key="dd_datacenter" >}}) 사이트에서는 사용할 수 없습니다.
</div>
{{< /site-region >}}

Datadog Kubernetes Autoscaling은 Kubernetes 리소스를 지속적으로 모니터링하여 즉각적인 스케일링 권장 사항과 Kubernetes 워크로드의 다차원 자동 확장 기능을 제공합니다. Datadog 웹 인터페이스 또는 `DatadogPodAutoscaler` 사용자 지정 리소스를 사용하여 자동 확장을 배포할 수 있습니다.

## 작동 방식 {#how-it-works}
Datadog은 기존 Datadog Agent에서 수집되는 실시간 및 과거 사용률 메트릭, 이벤트 신호를 활용하여 권장 사항을 생성합니다. 사용자는 이러한 권장 사항을 검토한 후 적용 여부를 선택할 수 있습니다.

기본적으로 Datadog Kubernetes Autoscaling은 추정 CPU 및 메모리 비용 값을 사용하여 비용 절감 기회와 예상 효과를 표시합니다. 또한 [Cloud Cost Management](#idle-cost-and-savings-estimates)와 함께 Kubernetes Autoscaling을 사용하여 실제 인스턴스 유형 비용을 기반으로 한 보고서를 받을 수 있습니다.

자동 워크로드 스케일링은 워크로드별 스케일링 동작을 정의하는 `DatadogPodAutoscaler` 사용자 지정 리소스를 기반으로 동작합니다. Datadog Cluster Agent는 이 사용자 지정 리소스의 컨트롤러 역할을 합니다.

**참고:** 각 클러스터에서는 최대 1,000개의 워크로드에 대해 Datadog Kubernetes Autoscaling 최적화를 적용할 수 있습니다.

### 호환성 {#compatibility}

- **배포판**: 이 기능은 Datadog이 지원하는 모든 [Kubernetes 배포판][5]과 호환됩니다.
- **워크로드 자동 확장**: 이 기능은 Horizontal Pod Autoscaler(HPA) 및 Vertical Pod Autoscaler(VPA)의 대안입니다. Datadog은 워크로드 최적화를 위해 Datadog Kubernetes Autoscaling을 활성화할 때 기존 HPA 또는 VPA를 제거할 것을 권장합니다. 이러한 워크로드는 애플리케이션에서 자동으로 식별됩니다.
**참고:** `applyPolicy` 섹션에서 `mode: Preview`가 포함된 `DatadogPodAutoscaler`를 생성하면 HPA 및/또는 VPA를 유지한 상태로 Datadog Kubernetes Autoscaling을 시험해 볼 수 있습니다.

### 요구 사항 {#requirements}

- [Remote Configuration][1]이 조직 수준과 대상 클러스터의 Agent 모두에서 활성화되어 있어야 합니다. 설정 방법은 [Remote Configuration 활성화][2]를 참조하세요.
- Datadog Agent 업데이트를 위한 [Helm][3].
- (Datadog Operator 사용자용) Datadog Agent 업데이트를 위한 [`kubectl` CLI][4].
- 실시간 자동 확장을 사용하는 경우 Datadog은 최신 Datadog Agent 버전 사용을 권장합니다. 이를 통해 최신 개선 사항과 최적화를 활용할 수 있습니다. 스케일링 권장 사항을 사용하려면 [Kubernetes State Core][9] 통합이 활성화되어 있어야 합니다. <br/><br/>

   | 기능 | 최소 Agent 버전 |
   |---------|----------------------|
   | 앱 내 워크로드 스케일링 권장 사항 | 7.50+ |
   | 실시간 워크로드 스케일링 | 7.66.1+ |
   | Argo Rollout 권장 사항 및 자동 확장 | 7.71+ |
   | 클러스터 자동 확장([미리보기 신청][10]) | 7.72+ |
   | 인플레이스 수직 포드 크기 조정(옵트인) | 7.78+ |
   | 클러스터 프로필 활성화, 워크로드 레이블 | 7.78+ |
   | 클러스터 프로필 활성화, 네임스페이스 레이블 | 7.79+ |

- 다음 사용자 권한 필요:
   - Org Management(Remote Configuration에 필요)
   - API Keys Write(Remote Configuration에 필요)
   - Workload Scaling Write
   - Autoscaling Manage
- (권장) Linux 커널 v5.19 이상 및 cgroup v2

## 설정 {#setup}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. Datadog Operator v1.16.0 이상을 사용하고 있는지 확인하세요. Datadog Operator를 업그레이드하려면:

```shell
helm upgrade datadog-operator datadog/datadog-operator
```

2. `datadog-agent.yaml` 구성 파일에 다음 내용을 추가합니다.

```yaml
spec:
  features:
    autoscaling:
      workload:
        enabled: true
    eventCollection:
      unbundleEvents: true
  override:
    clusterAgent:
      env:
        - name: DD_AUTOSCALING_FAILOVER_ENABLED
          value: "true"
    nodeAgent:
      env:
        - name: DD_AUTOSCALING_FAILOVER_ENABLED
          value: "true"
```

3. [Admission Controller][1]는 Datadog Operator에서 기본적으로 활성화되어 있습니다. 비활성화한 경우 `datadog-agent.yaml`에 아래 강조 표시된 줄을 추가하여 다시 활성화하세요.

{{< highlight yaml "hl_lines=4-5" >}}
...
spec:
  features:
    admissionController:
      enabled: true
...
{{< /highlight >}}

4. 업데이트된 `datadog-agent.yaml` 구성을 적용합니다.

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

[1]: /ko/containers/cluster_agent/admission_controller/

{{% /tab %}}
{{% tab "Helm" %}}

1. Agent 및 Cluster Agent v7.66.1 이상을 사용하고 있는지 확인하세요. `datadog-values.yaml` 구성 파일에 다음 내용을 추가합니다.

```yaml
datadog:
  autoscaling:
    workload:
      enabled: true
  kubernetesEvents:
    unbundleEvents: true
```

2. [Admission Controller][1]는 Datadog Helm 차트에서 기본적으로 활성화되어 있습니다. 비활성화한 경우 `datadog-values.yaml`에 아래 강조 표시된 줄을 추가하여 다시 활성화하세요.
{{< highlight yaml "hl_lines=5-6" >}}
...
clusterAgent:
  admissionController:
    enabled: true
...
{{< /highlight >}}

3. Helm 버전을 업데이트합니다.

```shell
helm repo update
```

4. 업데이트된 `datadog-values.yaml`을 사용하여 Datadog Agent를 다시 배포합니다.

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

[1]: /ko/containers/cluster_agent/admission_controller/

{{% /tab %}}
{{< /tabs >}}

### 유휴 비용 및 절감 효과 추정 {#idle-cost-and-savings-estimates}

{{< tabs >}}
{{% tab "Cloud Cost Management 사용 시" %}}
조직에서 [Cloud Cost Management][1]가 활성화되어 있으면 Datadog Kubernetes Autoscaling은 모니터링되는 기본 인스턴스의 실제 청구 비용을 기반으로 유휴 비용 및 절감 효과 추정치를 표시합니다.

[AWS][2], [Azure][3] 또는 [Google Cloud][4]에 대한 Cloud Cost 설정 지침을 참조하세요.

Cloud Cost Management 데이터는 Kubernetes Autoscaling 기능을 향상시키지만 필수는 아닙니다. Cloud Cost Management가 없어도 Datadog의 모든 워크로드 권장 사항 및 자동 확장 결정은 유효하며 정상적으로 작동합니다.

[1]: /ko/cloud_cost_management
[2]: /ko/cloud_cost_management/aws
[3]: /ko/cloud_cost_management/azure
[4]: /ko/cloud_cost_management/google_cloud
{{% /tab %}}

{{% tab "기본" %}}
Cloud Cost Management가 **활성화되어 있지 않은 경우**, Datadog Kubernetes Autoscaling은 다음 공식과 고정 값을 사용하여 유휴 비용 및 절감 효과 추정치를 표시합니다.

**클러스터 유휴 비용**:

```
  (cpu_capacity - max(cpu_usage, cpu_requests)) * core_rate_per_hour
+ (mem_capacity - max(mem_usage, mem_requests)) * memory_rate_per_hour
```

**워크로드 유휴 비용**:

```
  (max(cpu_usage, cpu_requests) - cpu_usage) * core_rate_per_hour
+ (max(mem_usage, mem_requests) - mem_usage) * memory_rate_per_hour
```

**고정 값**:
- core_rate_per_hour = CPU 코어 시간당 $0.0295
- memory_rate_per_hour = 메모리 GB 시간당 $0.0053


_고정 비용 값은 시간이 지남에 따라 조정될 수 있습니다._
{{% /tab %}}
{{< /tabs >}}

## 사용 방법 {#usage}

### 적정 규모 조정 대상 리소스 식별 {#identify-resources-to-rightsize}

[Autoscaling Summary 페이지][6]는 플랫폼 팀이 조직 전체의 Kubernetes 리소스 절감 기회를 파악하고 주요 클러스터 및 네임스페이스로 범위를 좁힐 수 있는 시작점 역할을 합니다.

[Setup 페이지][11]에서는 여러 워크로드를 선택하여 확장을 적용하고 최적화를 일괄 관리할 수 있습니다.

[Cluster Scaling 보기][7]에서는 클러스터별 총 유휴 CPU, 총 유휴 메모리 및 비용 정보를 제공합니다.

클러스터를 클릭하면 예상 절감액 기준으로 정렬된 워크로드 표와 함께 상세 정보를 확인할 수 있습니다. 개별 애플리케이션 또는 서비스 소유자인 경우 [Workload Scaling 목록 보기][8]에서 팀 또는 서비스 이름으로 직접 필터링할 수도 있습니다.

이러한 보기 중 어느 곳에서든 워크로드의 {{< ui >}}Optimize{{< /ui >}}를 클릭하여 확장 권장 사항을 확인한 후 [워크로드에 Autoscaling 활성화](#enable-autoscaling-for-a-workload) 단계로 진행합니다.

### 워크로드에 Autoscaling 활성화 {#enable-autoscaling-for-a-workload}

최적화할 워크로드를 식별한 후 해당 워크로드의 {{< ui >}}Scaling Recommendation{{< /ui >}}을 검토합니다. 활성화 전에 {{< ui >}}Configure Recommendation{{< /ui >}}을 클릭하여 제약 조건을 추가하거나 목표 사용률을 조정할 수 있습니다.

워크로드에 Autoscaling을 활성화하는 방법은 세 가지입니다. 현재 워크로드 배포 방식에 맞는 경로를 선택하세요.

| 경로 | 적합한 대상 | 시작 위치 | 지속 관리 방법 |
|------|----------|-----------------|--------------------|
| **A. Datadog UI 설정 마법사** | 빠르게 시작하고 즉각적인 시각적 피드백을 통해 설정을 반복적으로 조정하려는 경우 또는 애플리케이션 팀이 더 나은 확장 구성 결정을 내릴 수 있도록 지원하려는 경우| Datadog UI의 [Setup 페이지][11]| UI 또는 클러스터에서 워크로드의 `DatadogPodAutoscaler`를 편집 |
| **B. `DatadogPodAutoscaler` 매니페스트 작성** | 기존 Kubernetes 매니페스트 배포 워크플로(`kubectl`, Helm, ArgoCD, Terraform 또는 기타 GitOps 도구)를 사용하는 경우|  기존 도구 체인을 통해 직접 작성하거나 템플릿화한 YAML 적용 | 매니페스트를 수정한 후 동일한 도구를 통해 다시 적용 |
| **C. [클러스터 프로필](#cluster-profiles) 레이블 적용** | 단일 공유 정책으로 여러 워크로드 또는 네임스페이스에 Autoscaling을 활성화하려는 경우 | 워크로드 또는 네임스페이스에 레이블 지정 `autoscaling.datadoghq.com/profile` | 프로필을 수정하여 관리 중인 모든 워크로드를 업데이트하거나 레이블 변경을 통해 워크로드를 다른 프로필로 이동 |

#### 경로 A: Datadog UI {#path-a-datadog-ui}

가장 빠르게 시작하는 방법은 Datadog UI의 [Setup 페이지][11]를 사용하는 것입니다. 설정 마법사는 다섯 단계인 클러스터 선택, Agent 및 권한 요구 사항 확인, 설치 방법 선택, 확장 템플릿 선택, 배포를 안내합니다. 마법사에서 사용할 수 있는 템플릿:

- **비용 최적화**: 높은 CPU 사용률 목표, 공격적인 축소, 가장 낮은 최소 복제본 수. 비용에 민감한 상태 비저장형 워크로드에 적합합니다.
- **균형 최적화**: 중간 수준의 사용률 목표, 균형 잡힌 확장 및 축소, 대부분의 상태 비저장형 워크로드에 적합합니다.
- **성능 최적화**: 보수적인 사용률 목표, 느린 축소, 더 높은 최소 복제본 수. 상태 저장형 또는 중요한 서비스에 가장 적합합니다.
- **사용자 지정**: 위 템플릿 중 하나를 기반으로 시작한 후 CPU 목표, 복제본 수 및 안정화 기간을 직접 조정합니다.

설정 마법사는 단일 워크로드에서 Autoscaling을 시험해 보거나, 권장 사항을 직접 검토하거나, 소규모 워크로드 집합을 온보딩하는 데 적합합니다. (`Workload Scaling Write` 및 `Autoscaling Manage` 권한 필요)

#### 경로 B: GitOps {#path-b-gitops}

`DatadogPodAutoscaler` 사용자 지정 리소스를 정의하여 워크로드를 대상으로 지정한 후, `kubectl apply`, Helm, ArgoCD, Terraform 또는 기타 GitOps 도구 등 현재 사용 중인 Kubernetes 매니페스트 배포 도구를 통해 적용합니다. 매니페스트 작성 방식은 배포 메커니즘과 관계없이 동일합니다. 비용 최적화, 균형 잡힌 확장, 수직 확장 전용 리사이징, 사용자 지정 쿼리 기반 수평 확장을 위한 즉시 수정 가능한 예제를 보려면 아래의 [예제 구성](#example-datadogpodautoscaler-configurations)을 참조하세요.

도구별 가이드는 다음을 참조하세요.

- [ArgoCD로 DatadogPodAutoscaler 관리][12]
- [Terraform으로 DatadogPodAutoscaler 관리][13]

### DatadogPodAutoscaler 예제 구성 {#example-datadogpodautoscaler-configurations}

다음 예시는 다양한 확장 전략에 대한 일반적인 `DatadogPodAutoscaler` 구성을 보여줍니다. 이를 시작점으로 사용하고 워크로드 요구 사항에 맞게 값을 조정하세요. UI에서 템플릿을 선택하려면 위의 [경로 A](#path-a-datadog-ui-setup-wizard)를 따르세요.

{{< tabs >}}
{{% tab "비용 최적화" %}}

부하가 감소할 때 컨트롤러가 용량을 신속하게 축소해야 하는 비용에 민감한 상태 비저장형 워크로드에 이 템플릿을 사용하세요. 이 템플릿의 핵심 설정은 높은 CPU 사용률 목표(85%)이며, 공격적인 축소 규칙과 최소 복제본 수 1개 설정이 함께 적용됩니다.

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
    name: <WORKLOAD_NAME>
    namespace: <NAMESPACE>
spec:
    targetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: <WORKLOAD_NAME>
    owner: Local
    applyPolicy:
        mode: Apply
        scaleDown:
            rules:
                # Aggressive: allow 50% reduction every 2 minutes
                - periodSeconds: 120
                  type: Percent
                  value: 50
            stabilizationWindowSeconds: 300
        scaleUp:
            rules:
                - periodSeconds: 120
                  type: Percent
                  value: 50
            stabilizationWindowSeconds: 300
        update:
            strategy: Auto
    constraints:
        maxReplicas: 100
        # Allow scaling down to 1 replica for maximum savings
        minReplicas: 1
    objectives:
        # High utilization target to maximize cost efficiency
        - type: PodResource
          podResource:
            name: cpu
            value:
                type: Utilization
                utilization: 85
```

{{% /tab %}}
{{% tab "균형 최적화" %}}

비용 절감과 가용성 사이에서 균형을 원할 때 이 템플릿을 사용하세요. 대부분의 상태 비저장형 워크로드에 적합한 기본 선택입니다. 이 템플릿의 핵심 설정은 중간 수준의 CPU 사용률 목표(70%)와 보수적인 축소 정책(20분마다 20% 축소), 최소 복제본 수 2개를 조합한 것입니다. 컨트롤러는 용량을 빠르게 추가하지만 제거는 천천히 합니다.

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
    name: <WORKLOAD_NAME>
    namespace: <NAMESPACE>
spec:
    targetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: <WORKLOAD_NAME>
    owner: Local
    applyPolicy:
        mode: Apply
        scaleDown:
            rules:
                # Conservative: allow only 20% reduction every 20 minutes
                - periodSeconds: 1200
                  type: Percent
                  value: 20
            stabilizationWindowSeconds: 600
        scaleUp:
            rules:
                - periodSeconds: 120
                  type: Percent
                  value: 50
            stabilizationWindowSeconds: 600
        update:
            strategy: Auto
    constraints:
        maxReplicas: 100
        # Maintain at least 2 replicas for availability
        minReplicas: 2
    objectives:
        # Moderate utilization target balances cost and performance
        - type: PodResource
          podResource:
            name: cpu
            value:
                type: Utilization
                utilization: 70
```

{{% /tab %}}
{{% tab "수직 CPU 및 메모리" %}}

워크로드를 수평 확장할 수 없거나 복제본 수를 변경하지 않고 순수한 적정 규모 조정만 수행하려는 경우 이 템플릿을 사용하세요. 대표적인 예는 단일 인스턴스 서비스, 상태 저장형 워크로드, 리더 선출 구성 요소입니다. 이 템플릿의 핵심 설정은 `scaleDown.strategy: Disabled` 및 `scaleUp.strategy: Disabled`이며, 이로 인해 CPU 및 메모리 권장 사항을 적용하는 `update.strategy: Auto`만 남게 됩니다.

기본적으로 컨트롤러는 롤아웃(포드 축출 후 재생성)을 트리거하여 수직 권장 사항을 적용합니다. Cluster Agent **7.78 이상**에서는 **인플레이스 포드 크기 조정**도 지원합니다. 이 기능은 포드를 재시작하지 않고 CPU 및 메모리 요청과 제한을 업데이트합니다. 인플레이스 크기 조정은 옵트인 방식입니다. Cluster Agent에서 `autoscaling.workload.in_place_vertical_scaling.enabled: true`을 설정하거나 환경 변수 `DD_AUTOSCALING_WORKLOAD_IN_PLACE_VERTICAL_SCALING_ENABLED=true`를 설정해야 합니다.

또한 클러스터는 `pods/resize` 하위 리소스를 제공해야 합니다. 이 기능은 Kubernetes 1.33 이상에서 기본값이며, 여기서 `InPlacePodVerticalScaling` 기능 게이트는 베타 상태입니다. Kubernetes 1.27~1.32에서는 기능 게이트를 `kube-apiserver` 및 모든 `kubelet`에서 활성화해야 합니다.

두 가지 전제 조건이 모두 충족되면 다음과 같이 동작합니다.

- **기본값**: `applyPolicy.update.strategy: Auto`(기본값)이 설정된 워크로드는 인플레이스 방식으로 크기를 조정합니다.
- **폴백**: kubelet이 크기 조정을 `Infeasible`로 보고하면 컨트롤러는 롤아웃 방식으로 대체 수행합니다.
- **옵트아웃**: 클러스터 설정과 관계없이 특정 워크로드가 항상 롤아웃 기반 수직 확장을 사용하도록 하려면 해당 워크로드의 `DatadogPodAutoscaler`에 `applyPolicy.update.strategy: TriggerRollout`를 설정하세요.

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
    name: <WORKLOAD_NAME>
    namespace: <NAMESPACE>
spec:
    targetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: <WORKLOAD_NAME>
    owner: Local
    applyPolicy:
        mode: Apply
        # Horizontal scaling disabled; only vertical resizing
        scaleDown:
            strategy: Disabled
        scaleUp:
            strategy: Disabled
        update:
            strategy: Auto
    constraints:
        maxReplicas: 100
```

{{% /tab %}}
{{% tab "사용자 지정 쿼리 기반 수평 확장" %}}

CPU 및 메모리가 적절한 확장 신호가 아닐 때 이 템플릿을 사용하세요. 예로는 대기열 적체 깊이에 따라 확장해야 하는 큐 워커, 요청 지연 시간에 따라 확장해야 하는 API 서비스가 포함됩니다. 이 템플릿의 핵심 설정은 `objectives` 블록입니다. 이 블록은 사용률 비율 대신 Datadog 메트릭 쿼리와 `AbsoluteValue` 목표값을 참조합니다. 예제 쿼리를 워크로드에 맞는 쿼리로 교체하세요.

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
    name: <WORKLOAD_NAME>
    namespace: <NAMESPACE>
spec:
    targetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: <WORKLOAD_NAME>
    owner: Local
    applyPolicy:
        mode: Apply
        scaleDown:
            rules:
                - periodSeconds: 1200
                  type: Percent
                  value: 20
            stabilizationWindowSeconds: 600
        scaleUp:
            rules:
                - periodSeconds: 120
                  type: Percent
                  value: 50
            stabilizationWindowSeconds: 600
        # Vertical updates disabled — horizontal only
        update:
            strategy: Disabled
    constraints:
        maxReplicas: 100
        minReplicas: 2
    objectives:
        - type: CustomQuery
          customQuery:
            # Replace with your own Datadog metric query
            request:
                formula: usage
                queries:
                    - name: usage
                      source: Metrics
                      metrics:
                        query: avg:redis.info.latency_ms{kube_cluster_name:<CLUSTER_NAME>,kube_namespace:<NAMESPACE>,kube_deployment:<WORKLOAD_NAME>}
            value:
                type: AbsoluteValue
                absoluteValue: 500M
            window: 5m0s
    fallback:
        horizontal:
            # With custom queries, local fallback is not activated by default
            enabled: false
            # Direction can be ScaleUp, ScaleDown or All
            direction: ScaleUp
            # When using custom queries, a CPU or Memory fallback objective is required
            objectives:
                - type: PodResource
                  podResource:
                    name: cpu
                    value:
                        type: Utilization
                        utilization: 70
            triggers:
                staleRecommendationThresholdSeconds: 600
```

{{% /tab %}}
{{< /tabs >}}

### 클러스터 프로필 {#cluster-profiles}

`DatadogPodAutoscalerClusterProfile`은 `DatadogPodAutoscaler` 템플릿을 보관하는 클러스터 범위 리소스입니다. Cluster Agent는 `Deployment` 및 `StatefulSet` 리소스(7.79 이상에서는 해당 리소스가 포함된 네임스페이스 포함)의 `autoscaling.datadoghq.com/profile` 레이블을 감시하고, 일치하는 각 워크로드에 대해 관리형 `DatadogPodAutoscaler`를 생성합니다. 하나의 프로필은 여러 워크로드에 적용될 수 있지만 하나의 워크로드는 여전히 하나의 `DatadogPodAutoscaler`에만 매핑됩니다.

클러스터 프로필과 워크로드 수준 레이블 기능은 Datadog Cluster Agent 7.78.0 이상이 필요합니다. 네임스페이스 수준 활성화(네임스페이스에 레이블을 지정하여 해당 네임스페이스 내의 모든 지원 워크로드를 프로필에 포함)는 Datadog Cluster Agent 7.79.0 이상이 필요합니다. 이보다 이전 버전의 Cluster Agent는 프로필 레이블을 무시합니다.

#### 기본 제공 프로필 {#built-in-profiles}

Cluster Agent에는 세 가지 기본 제공 프로필이 포함되어 있으며, 시작 시 자동으로 다시 생성됩니다. 따라서 사용자가 CRD YAML을 별도로 관리할 필요가 없습니다. 프로필 이름은 예약되어 있습니다.

| 프로필 | CPU 목표 | 최소 복제본 수 | 동작 특성 |
|---|---|---|---|
| `datadog-optimize-cost` | 85% | 1 | 비용에 민감한 상태 비저장형 워크로드. 빠른 확장 및 축소(5분 안정화 기간, 2분마다 50% 단계 조정). |
| `datadog-optimize-balance` | 70% | 2 | 대부분의 상태 비저장형 워크로드에 대한 기본 설정. 균형 잡힌 10분 안정화 기간, 보수적인 축소 정책(20분마다 20% 단계 조정). |
| `datadog-optimize-performance` | 60% | 3 | 상태 저장형 워크로드 또는 지연 시간에 민감한 워크로드. 매우 보수적인 축소 정책(15분 안정화 기간, 30분마다 10% 단계 조정). |

단일 워크로드에서 프로필을 활성화하려면 워크로드의 `metadata.labels`에 레이블을 추가하세요.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  namespace: production
  labels:
    autoscaling.datadoghq.com/profile: datadog-optimize-balance
spec:
  # ...rest of the Deployment spec
```

네임스페이스 내의 모든 지원 워크로드에 프로필을 활성화하려면 네임스페이스에 레이블을 추가하세요(Cluster Agent 7.79.0 이상 필요).

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    autoscaling.datadoghq.com/profile: datadog-optimize-balance
```

#### 사용자 지정 프로필 {#custom-profiles}

기본 제공 프로필 중 어느 것도 원하는 확장 정책과 일치하지 않는 경우 `DatadogPodAutoscalerClusterProfile`을 작성하세요. 프로필은 클러스터 범위 리소스이므로 `--namespace` 플래그 없이 적용하거나 구성 저장소의 클러스터 수준 계층에 배치해야 합니다.

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscalerClusterProfile
metadata:
  name: cost-optimized-strict-floor
spec:
  template:
    applyPolicy:
      mode: Apply
      scaleUp:
        stabilizationWindowSeconds: 300
        rules:
          - type: Percent
            value: 50
            periodSeconds: 120
      scaleDown:
        stabilizationWindowSeconds: 300
        rules:
          - type: Percent
            value: 50
            periodSeconds: 120
    constraints:
      minReplicas: 1
    objectives:
      - type: PodResource
        podResource:
          name: cpu
          value:
            type: Utilization
            utilization: 85
```

동일한 레이블을 사용하여 워크로드 또는 네임스페이스에서 사용자 지정 프로필을 참조할 수 있습니다.

```yaml
metadata:
  labels:
    autoscaling.datadoghq.com/profile: cost-optimized-strict-floor
```

템플릿 본문은 `DatadogPodAutoscaler` 사양에서 사용할 수 있는 필드를 모두 지원하지만 `targetRef`는 제외됩니다(각 워크로드에 대해 Cluster Agent가 자동으로 채워 넣음). `spec.template` 아래에 사용할 수 있는 전체 필드 목록은 앞서 소개한 [예제 구성](#example-datadogpodautoscaler-configurations)을 참조하세요.

#### 활성화 우선순위 {#activation-precedence}

Cluster Agent 7.79.0 이상에서는 네임스페이스 수준 활성화, `excluded` 옵트아웃 및 이들 간의 우선순위 규칙이 추가되었습니다. Cluster Agent 7.78.0에서는 워크로드 수준 레이블만 읽기 때문에 네임스페이스 또는 `excluded` 값과 관련된 아래 규칙은 적용되지 않습니다.

- **워크로드 레이블이 네임스페이스 레이블보다 우선합니다.** 네임스페이스가 `autoscaling.datadoghq.com/profile=ns-profile`로 레이블 지정되고 해당 내부 워크로드가 `autoscaling.datadoghq.com/profile=workload-profile`로 레이블 지정된 경우, 해당 워크로드는 `workload-profile`을 사용합니다.
- **`excluded`을 사용하여 제외할 수 있습니다.** 네임스페이스에 레이블이 지정되어 있을 때 특정 워크로드를 제외하려면 해당 워크로드에 `autoscaling.datadoghq.com/profile: excluded`를 설정하세요. 이는 자동 확장이 적용된 네임스페이스 내에 존재하는 상태 저장형 워크로드 또는 중요한 워크로드에 유용합니다.

  ```yaml
  apiVersion: apps/v1
  kind: StatefulSet
  metadata:
    name: payments-ledger
    namespace: production
    labels:
      autoscaling.datadoghq.com/profile: excluded
  ```

- **알 수 없는 프로필 이름은 무시됩니다.** 워크로드 또는 네임스페이스가 존재하지 않는 프로필을 참조하는 경우 Cluster Agent는 관리형 `DatadogPodAutoscaler`를 생성하지 않으며 오류도 보고하지 않습니다. 이후 해당 이름의 프로필이 생성되면 조정 과정에서 자동으로 할당이 적용됩니다.
- **조정은 자동으로 수행됩니다.** 레이블을 추가, 변경 또는 제거하면 몇 초 내에 관리형 `DatadogPodAutoscaler`에 반영됩니다.

#### 지원되는 워크로드 유형 {#supported-workload-kinds}

프로필 활성화는 `Deployment` 및 `StatefulSet`을 지원합니다. 그 외 유형(예: Argo `Rollout`)의 경우 [경로 B: GitOps](#path-b-gitops)를 사용하여 `DatadogPodAutoscaler`를 직접 작성하세요.

### 권장 사항 수동 배포 {#deploy-recommendations-manually}

Autoscaling을 활성화하지 않고 Datadog의 권장 사항만 사용하려는 경우, 해당 권장 사항을 일회성으로 직접 적용할 수 있습니다. Kubernetes 배포의 리소스를 구성할 때 스케일링 권장 사항에서 제안하는 값을 사용하세요. 또한 {{< ui >}}Export Recommendation{{< /ui >}}을 클릭하면 생성된 `kubectl patch` 명령을 확인할 수 있습니다. Datadog은 계속해서 권장 사항을 갱신하지만, 클러스터는 사용자가 다시 적용할 때만 변경됩니다.

## 대규모 워크로드 관리 {#manage-workloads-at-scale}

워크로드에 Autoscaling이 적용된 후에는 `DatadogPodAutoscaler` 리소스와 Datadog UI를 함께 사용하여 2일차 운영 작업을 수행합니다.

- **스케일링 템플릿 변경** 워크로드의 `DatadogPodAutoscaler` 사양(CPU 목표, 복제본 범위, 확장 및 축소 규칙)을 직접 편집하거나 [Workload Scaling 목록 보기][8]에서 다른 템플릿을 선택할 수 있습니다. 변경 사항은 다음 조정 시 적용됩니다.
- **리소스를 삭제하지 않고 Autoscaling 일시 중지.** `applyPolicy.mode: Preview`를 설정하면 `.status`에서 권장 사항은 계속 표시되지만 컨트롤러가 이를 적용하지 않게 됩니다. 이는 평가 단계에서 HPA 또는 VPA와 함께 사용할 때 유용합니다.
- **배포 상태 모니터링.** Workload Scaling 목록 보기에서는 각 워크로드에 대한 권장 사항의 현재 상태, 마지막으로 적용된 작업 및 조정 오류를 확인할 수 있습니다.
- **깔끔하게 Autoscaling 제거.** Autoscaling을 중지하려면 `DatadogPodAutoscaler` 리소스를 삭제하세요. 기존 포드 리소스는 마지막으로 적용된 값을 유지하며, 다음 롤아웃 시 워크로드는 상위 컨트롤러(Deployment, StatefulSet 등)에 정의된 설정으로 되돌아갑니다.

## 참조 {#reference}

### 수직 확장 권장 사항 계산 방식 {#how-vertical-recommendations-are-calculated}

Datadog은 최근 8일간의 컨테이너 사용량 데이터를 분석하여 CPU 및 메모리에 대한 수직 확장 권장 사항을 계산합니다. 각 리소스에 적용되는 계산 방식은 해당 리소스의 요청과 제한 값이 동일한지 여부에 따라 달라지며, 이는 [Kubernetes Quality of Service(QoS) 클래스][14] 개념을 따릅니다. CPU와 메모리는 독립적으로 평가됩니다. 따라서 하나의 워크로드는 CPU에 대해 Burstable 방식을 사용하고 메모리에 대해서는 Guaranteed 방식을 사용할 수 있으며, 그 반대도 가능합니다.

#### 메모리 권장 사항 {#memory-recommendations}

**Burstable**(메모리 요청이 메모리 제한보다 작은 경우):

| | 계산 방식 |
|---|---|
| **요청 권장 값** | 최근 8일 동안의 메모리 사용량 **95백분위수**를 기준으로 계산합니다. 최근 사용 패턴을 더 중요하게 반영하기 위해 오래된 샘플에는 감소 가중치가 적용됩니다. 그 후 **10% 안전 여유분**이 추가됩니다. |
| **제한 권장 값** | 최근 8일 동안 관측된 **최대 메모리 사용 피크값**을 기준으로 계산합니다. 그 후 **5% 안전 여유분**이 추가됩니다. |

**Guaranteed**(메모리 요청과 제한이 동일한 경우):

| | 계산 방식 |
|---|---|
| **요청 및 제한 권장 값** | 최근 8일 동안 관측된 **최대 메모리 사용 피크값**을 기준으로 계산합니다. **5% 안전 여유분**이 추가됩니다. **OOMKill**이 감지되면 향후 메모리 부족 문제를 방지하기 위해 추가로 **20% 증가분**이 적용됩니다. |

**참고:** 피크 메모리 추적은 8일의 조회 기간 동안 존재했던 모든 컨테이너에서 기록된 최고 메모리 사용량을 반영합니다. 즉, 컨테이너가 해당 기간 이전에 시작되었더라도 시작 시점의 피크 사용량과 같은 값이 권장 사항 계산에 포함됩니다.

#### CPU 권장 사항 {#cpu-recommendations}

**Burstable**(CPU 요청이 CPU 제한보다 작은 경우):

| | 계산 방식 |
|---|---|
| **요청 권장 값** | 최근 8일 동안 현재 요청 대비 CPU 사용량의 **90백분위수**를 기준으로 계산합니다. 최근 사용 패턴을 더 중요하게 반영하기 위해 오래된 샘플에는 감소 가중치가 적용됩니다. 그 후 **10% 안전 여유분**이 추가됩니다. |
| **제한 권장 값** | 최근 8일 동안 현재 요청 대비 CPU 사용량의 **95백분위수**를 기준으로 계산합니다. 그 후 **5% 안전 여유분**이 추가됩니다. 계산된 요청 권장 값이 제한 권장 값을 초과하는 경우에는 요청 값을 요청과 제한 모두에 사용합니다. |

**Guaranteed**(CPU 요청과 CPU 제한이 동일한 경우):

| | 계산 방식 |
|---|---|
| **요청 및 제한 권장 값** | 최근 8일 동안 현재 요청 대비 CPU 사용량의 **95백분위수**를 기준으로 계산합니다. 그 후 **5% 안전 여유분**이 추가됩니다. |

#### 주요 설계 원칙 {#key-design-principles}

- **8일 조회 기간**: 모든 권장 사항은 지난 8일간의 사용량 데이터를 고려합니다. 이를 통해 주간 트래픽 패턴을 포착할 수 있을 만큼 충분한 이력을 확보하면서도 변화에 신속하게 대응할 수 있습니다.
- **감소 가중치**: Burstable 클래스의 요청 권장 사항(CPU 또는 메모리)의 경우 오래된 샘플에는 더 낮은 가중치가 적용됩니다. 따라서 권장 사항이 최근 사용량 변화에 더 빠르게 적응할 수 있습니다.
- **안전 여유분**: 모든 권장 사항에는 예상치 못한 사용량 급증에 대비하기 위해 실제 관측 사용량보다 5~10% 높은 여유분이 포함됩니다.
- **OOMKill 대응**: 메모리가 Guaranteed 클래스(요청 = 제한)이고 OOMKill이 발생한 경우, 반복적인 메모리 부족 오류 가능성을 줄이기 위해 20% 증가분이 적용됩니다.
- **Guaranteed 클래스 유지**: 리소스의 요청과 제한이 동일한 경우 Datadog은 두 값 모두에 대해 보다 보수적인(제한 기준) 계산 방식을 사용하여 권장 사항이 요청과 제한 사이의 간격을 새롭게 만들지 않도록 보장합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/remote_config
[2]: /ko/agent/remote_config/?tab=configurationyamlfile#enable-remote-configuration
[3]: https://helm.sh/
[4]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[5]: /ko/containers/kubernetes/distributions
[6]: https://app.datadoghq.com/orchestration/scaling/summary
[7]: https://app.datadoghq.com/orchestration/scaling/cluster
[8]: https://app.datadoghq.com/orchestration/scaling/workload
[9]: /ko/integrations/kubernetes_state_core/
[10]: https://www.datadoghq.com/product-preview/kubernetes-cluster-autoscaling/
[11]: https://app.datadoghq.com/orchestration/scaling/setup
[12]: /ko/containers/guide/manage-datadogpodautoscaler-with-argocd/
[13]: /ko/containers/guide/manage-datdadogpodautoscaler-with-terraform/
[14]: https://kubernetes.io/docs/concepts/workloads/pods/pod-qos/