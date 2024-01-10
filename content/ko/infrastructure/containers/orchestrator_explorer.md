---
kind: 도움말
title: Orchestrator Explorer
---

{{< img src="infrastructure/livecontainers/orch_ex.png" alt="Kubernetes 파드를 보여주는 Orchestrator Explorer." style="width:80%;">}}

## 개요

Datadog Agent와 Cluster Agent는 [Orchestrator Explorer][1]에 대한  Kubernetes 리소스를 검색할 수 있습니다. 이 기능을 사용하면 특정 네임스페이스 또는 가용성 영역에서 파드, 배포 및 기타 Kubernetes 개념의 상태를 모니터링하고, 배포 내에서 실패한 파드의 리소스 사양을 보고, 노드 활동을 관련 로그와 상호 연관시키는 등의 작업을 수행할 수 있습니다.

Orchestrator Explorer를 사용하려면 **Agent 버전 >= 7.27.0** 및 **Cluster Agent 버전 >= 1.11.0**이 필요합니다.

**참고**: Kubernetes 버전 1.25 이상인 경우 필요한 최소 Cluster Agent 버전은 7.40.0입니다.

## 설정

[Process Agent가 활성화 되었는지][2]를 확인합니다. Datadog Operator 또는 공식 Helm 차트를 사용하는 경우  Orchestrator Explorer가 기본적으로 활성화됩니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Orchestrator 탐색기는 기본적으로 Datadog Operator에서 활성화됩니다.

인증을 위해 `datadog-agent.yaml`에서 `features.orchestratorExplorer.enabled` 파라미터가 `true`로 설정되어 있는지 확인하세요.  

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    orchestratorExplorer:
      enabled: true
```

{{% /tab %}}
{{% tab "Helm" %}}

[공식 Helm 차트][3]를 사용하는 경우 Orchestrator 탐색기가 기본적으로 활성화됩니다.

인증을 위해 [`values.yaml`][4] 파일에서 `orchestratorExplorer.enabled` 파라미터가 `true`로 설정되어 있는지 확인합니다:

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
  orchestratorExplorer:
    enabled: true
```

그런 다음 Helm 차트를 업그레이드합니다.

[3]: https://github.com/DataDog/helm-charts
[4]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "수동" %}}
수동 설정은 [DaemonSet로 Orchestrator 탐색기 설정][5]을 참조하세요.

[5]: /ko/infrastructure/faq/set-up-orchestrator-explorer-daemonset
{{% /tab %}}
{{< /tabs >}}

## 사용법

### 보기

페이지의 왼쪽 상단에 있는 **Select Resources** 드롭다운 메뉴에서 **Pods**, **Clusters**, **Namespaces** 및 기타 Kubernetes 리소스 사이에서 토글하세요.

이러한 각 보기에는 상태, 이름, Kubernetes 라벨과 같은 필드별로 데이터를 정리하는데 유용한 데이터 테이블과 파드 및 쿠버네티스 클러스터에 대한 전반적인 진행 상황을 제공하는 클러스터 맵이 포함되어 있습니다.

{{< img src="infrastructure/livecontainers/orch_ex_replicasets.png" alt="요약 모드에서 Workloads > Replica Sets를 표시하기 위해 Orchestrator 탐색기가 열림" style="width:80%;">}}

### 기능 및 패싯별로 그룹화

태그 또는 Kubernetes 라벨 별로 파드를 그룹화하면 정보를 더 빠르게 찾을 수 있는 집계된 보기가 나타납니다. 페이지 오른쪽 상단의 "Group by" 막대를 사용하거나 특정 태그 또는 라벨을 클릭하고 아래 그림과 같이 컨텍스트 메뉴에서 기능별로 그룹을 찾습니다.

{{< img src="infrastructure/livecontainers/orch_ex_groupby.png" alt="팀별 그룹화 예시" style="width:80%;">}}

페이지 왼쪽에 있는 패싯을 사용하여 리소스를 그룹화하거나 CrashLoopBackOff 파드 상태의 파드와 같이 가장 중요한 리소스를 필터링할 수도 있습니다.

{{< img src="infrastructure/livecontainers/crashloopbackoff.mp4" alt="CrashLoopBackOff 파드 상태 그룹화 예시" video=true style="width:80%;">}}

### 클러스터 맵

클러스터 맵은 파드와 Kubernetes 클러스터에 대한 더 큰 그림을 제공합니다. 사용자 지정 그룹과 필터를 사용하여 모든 리소스를 한 화면에서 함께 볼 수 있으며, 파드의 색상을 채울 메트릭을 선택할 수 있습니다.

세부 패널을 채우려면 원 또는 그룹을 클릭하여 클러스터 맵에서 리소스를 살펴보세요.

커스텀 그룹 및 필터를 사용하여 모든 리소스를 한 화면에서 함께 볼 수 있으며, 파드 색상을 채울 메트릭을 선택할 수 있습니다.

{{< img src="infrastructure/livecontainers/cluster-map.mp4" alt="사용자 지정 그룹 및 필터가 포함된 클러스터 맵" video=true style="width:80%;">}}

### 정보 패널

테이블의 행이나 클러스터 맵의 개체를 클릭하면 사이드 패널에서 특정 리소스에 대한 정보를 볼 수 있습니다.

{{< img src="infrastructure/livecontainers/orch_ex_panel.png" alt="프로세스에 열려 있는 측면 패널의 리소스 보기." style="width:80%;">}}

측면 패널의 **YAML** 탭에는 전체 리소스 정의가 표시됩니다. **Agent 버전 7.44.0**부터는 7일 동안의 정의 기록도 포함되어 있으므로 시간 경과에 따라 여러 버전에서 변경된 사항을 비교할 수 있습니다.

{{< img src="infrastructure/livecontainers/orch_ex_manifest_history.png" alt="yaml 히스토리 기능을 보여주는 측면 패널의 리소스 보기" style="width:80%;">}}

다른 탭에는 선택한 리소스의 트러블슈팅을 위한 자세한 정보가 표시됩니다:

* [**로그**][9]: 컨테이너 또는 리소스의 로그를 확인합니다. 로그를 클릭하면 로그 탐색기에서 관련 로그를 볼 수 있습니다.
* [**APM**][11]: 트레이스의 날짜, 서비스, 기간, 방법 및 상태 코드를 포함하여 컨테이너 또는 리소스에서 트레이스를 확인합니다.
* [메트릭**][10]: 컨테이너 또는 리소스에 대한 실시간 메트릭을 확인합니다. 이 탭에서 그래프를 전체 화면으로 보거나, 스냅샷을 공유하거나, 내보낼 수 있습니다.
* **프로세스**: 이 리소스의 컨테이너에서 실행 중인 모든 프로세스를 확인합니다.
* **네트워크**: 소스, 대상, 송수신된 볼륨, 처리량 필드 등 컨테이너 또는 리소스의 네트워크 성능을 볼 수 있습니다. **Destination** 필드를 사용하여 `DNS` 또는 `ip_type`와 같은 태그로 검색하거나 **Group by** 필터를 사용하여 `pod_name` 또는 `service`와 같은 태그별로 네트워크 데이터를 그룹화할 수 있습니다.
* [**이벤트**][12]: 리소스에 대한 모든 Kubernetes 이벤트를 확인합니다.
* **모니터**: 이 리소스에 대해 태그가 지정되거나 범위가 지정되거나 그룹화된 모니터를 봅니다.

이 리소스에 대한 자세한 대시보드를 보려면 이 패널의 오른쪽 상단에 있는 대시보드 보기를 클릭합니다.

{{< img src="infrastructure/livecontainers/view-pod-dashboard.png" alt="라이브 컨테이너 개요에서 파드 대시보드로 연결되는 링크" style="width:80%;">}}

### 리소스 사용

_리소스 활용 페이지에 대해서는 [리소스 활용][13]을 참조하세요._

Kubernetes Explorer 탭에서 다양한 리소스 사용률 메트릭을 탐색할 수 있습니다.

{{< img src="infrastructure/livecontainers/orch_ex_resource_utilization.png" alt="컨테이너 리소스 활용" style="width:80%;">}}

이러한 모든 열은 정렬을 지원하므로 리소스 활용도에 따라 개별 워크로드를 정확히 파악할 수 있습니다.

{{< img src="infrastructure/livecontainers/orch_ex_resource_utilization_sorted_column.png" alt="열이 정렬된 컨테이너 리소스 활용" style="width:50%;">}}

## 참고 사항 및 알려진 이슈

* 데이터는 일정한 간격으로 자동 업데이트됩니다. 베타 버전에서는 업데이트 간격이 변경될 수 있습니다.
* Deployments 또는 ReplicaSets가 1000개 이상인 클러스터에서는 Cluster Agent의 CPU 사용량이 증가할 수 있습니다. Helm 차트에서 컨테이너 스크러빙을 비활성화하는 옵션이 있습니다. 자세한 내용은 [Helm 차트 리포지토리][15]를 참고하세요.

[1]: https://app.datadoghq.com/orchestration/overview
[2]: /ko/infrastructure/containers/?tab=datadogoperator#setup

[9]: /ko/logs
[10]: /ko/metrics
[11]: /ko/tracing
[12]: /ko/events
[13]: /ko/infrastructure/containers/kubernetes_resource_utilization
[15]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog