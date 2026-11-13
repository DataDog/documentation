---
description: 팀 및 대기열별로 GPU 할당량 사용량을 추적하고, 수요가 할당량을 초과하는 GPU 유형을 찾아 워크로드가 보류되거나 퇴출되는
  이유를 파악합니다.
further_reading:
- link: /gpu_monitoring/setup
  tag: 문서
  text: GPU Monitoring 설정하기
- link: /gpu_monitoring/fleet
  tag: 문서
  text: Fleet 페이지에서 GPU 플릿 살펴보기
- link: /gpu_monitoring
  tag: 문서
  text: GPU Monitoring 기능에 대해 자세히 알아보기
title: GPU Monitoring을 활용한 GPU 용량 계획
---
{{< callout url="https://www.datadoghq.com/product-preview/gpu-monitoring-capacity-planning/" >}}
GPU Monitoring의 Capacity Planning은 얼리 액세스 미리 보기로 제공되고 있습니다. 액세스를 요청하려면 양식을 작성하세요.
{{< /callout >}}

## 개요 {#overview}

많은 팀이 고가의 GPU 풀을 공유할 때, 어떤 팀이 장치를 충분히 활용하지 못하고 있는지 파악하기 어렵습니다. 또한 리소스 경합을 탐지하고 작업이 보류 상태에 머무는 이유를 파악하기도 어렵습니다. GPU Monitoring의 Capacity Planning 페이지에서는 플랫폼 팀과 워크로드 소유자가 대기열 전반의 GPU 프로비저닝 현황을 하나의 공통 보기에서 확인할 수 있습니다. 수동 필터링이나 쿼리가 필요하지 않습니다. 이를 사용하여 워크로드를 안정적으로 실행하고 GPU 플릿의 활용도를 높이세요.

Capacity Planning 페이지에서는 다음과 같은 질문에 대한 답을 확인할 수 있습니다.

- **어떤 팀이나 프로젝트가 할당량을 초과하여 사용하거나 할당량보다 적게 사용하고 있습니까?** 사용되지 않는 할당량을 찾고 조직 전체에 컴퓨팅 리소스를 공정하게 재할당하세요.
- **어떤 GPU 유형에서 수요가 할당량을 초과합니까?** 수요가 할당량을 초과하는 지점을 파악하여 용량을 추가할 수 있습니다.
- **워크로드의 현재 상태는 무엇입니까?** 각 워크로드가 승인되었는지, 보류 중인지, 퇴출되었는지 여부와 사용하는 GPU 수를 확인하세요.
- **워크로드가 지연되거나 퇴출되는 이유는 무엇입니까?** 보류 중이거나 선점된 워크로드를 해당 대기열의 할당량 및 리소스 경합과 연결하여 분석하세요.

{{< img src="gpu_monitoring/capacity-planning-page.png" alt="워크로드 목록 위에 GPU 할당량, 할당되었으나 유휴 상태인 GPU, 선점 및 플릿 커버리지 그래프가 표시된 GPU Monitoring의 Capacity Planning 페이지" style="width:100%;" >}}

## 전제 조건 {#prerequisites}

Capacity Planning 페이지를 사용하려면 다음 조건을 충족해야 합니다.
- [GPU Monitoring이 활성화된][1] Datadog Agent 7.84.1 이상을 실행 중이어야 합니다. 업그레이드하려면 [Fleet Automation을 사용하여 Agent 업그레이드][2]를 참조하세요.
- GPU 워크로드가 Kubernetes에서 실행됩니다.
- Datadog에서 [Kueue 통합][3]을 활성화했습니다. 자세한 내용은 [Kueue 통합 문서][4]를 참조하세요.

## Capacity Planning 페이지 살펴보기 {#explore-the-capacity-planning-page}

시작하려면 GPU Monitoring의 [Capacity Planning 페이지][5]로 이동합니다.

### 팀 및 대기열별 필터링 {#filter-by-team-and-queue}

페이지 상단의 필터를 사용하여 보기 범위를 지정합니다. {{< ui >}}Team{{< /ui >}}, {{< ui >}}Cluster Name{{< /ui >}}, {{< ui >}}Cluster Queue{{< /ui >}}, {{< ui >}}Resource Flavor{{< /ui >}}, {{< ui >}}Provider{{< /ui >}}, {{< ui >}}Datacenter{{< /ui >}} 및 {{< ui >}}Environment{{< /ui >}}별로 필터링할 수 있습니다. 필터링된 보기를 저장하면 나중에 다시 확인할 수 있습니다.

### 할당량 및 사용률 {#quota-and-utilization}

페이지 상단의 그래프는 전체 플릿에서 GPU 할당량이 어떻게 사용되는지 보여줍니다.

| 그래프 | 설명 |
|-------|-------------|
| GPU Quota Unallocated - Count | ClusterQueue별로 그룹화된, 할당량에 포함되지만 사용되지 않는 GPU 수 |
| GPU Quota Unallocated - Percent | ClusterQueue별로 그룹화된, 사용되지 않는 GPU 할당량의 비율 |
| Idle Allocated GPUs | ClusterQueue별로 그룹화된, 할당되었지만 엔진 작업을 수행하지 않는 GPU 수 |
| Preemption Rate | ClusterQueue별로 그룹화된, 승인된 워크로드당 선점으로 퇴출된 워크로드 수 |
| Fleet GPU Coverage | 전체 플릿에서 할당된 GPU 할당량을 활성, 유휴 및 미귀속 장치로 구분한 현황 |
| Saturation - GPUs Over Quota | 명목 할당량을 초과하여 사용한 GPU 수를 기준으로 순위가 매겨진 ClusterQueue 및 ResourceFlavor 쌍 |

미할당 할당량이 많거나 할당된 GPU 중 유휴 상태인 GPU가 많은 대기열은 재할당 대상이 될 수 있습니다. 지속적으로 할당량을 초과하거나 선점률이 높은 대기열에는 추가 용량이 필요할 수 있습니다.

### 대기열 및 워크로드 {#queues-and-workloads}

페이지 하단의 표에는 두 개의 탭이 있습니다.

- {{< ui >}}Queues{{< /ui >}}: 각 대기열의 할당량과 사용량을 나열합니다.
- {{< ui >}}Workloads{{< /ui >}}: 각 워크로드의 팀, 클러스터, ClusterQueue, ResourceFlavor별 GPU 사용량 및 {{< ui >}}Admitted{{< /ui >}}와 같은 최신 상태를 나열합니다.

{{< ui >}}Workloads{{< /ui >}} 탭을 사용하여 워크로드의 현재 상태를 확인하고 보류 중이거나 퇴출된 워크로드를 조사합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/gpu_monitoring/setup
[2]: /ko/agent/guide/upgrade_agent_fleet_automation/
[3]: https://app.datadoghq.com/integrations?search=kueue
[4]: /ko/integrations/kueue/
[5]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=capacity-planning