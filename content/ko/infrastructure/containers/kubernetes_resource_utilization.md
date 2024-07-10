---
aliases:
- /ko/infrastructure/containers/kubernetes_resources
further_reading:
- link: https://www.datadoghq.com/blog/rightsize-kubernetes-workloads/
  tag: 블로그
  text: Kubernetes 워크로드 규모 효율화를 위한 실용적인 팁
title: Kubernetes 리소스 활용도
---

{{< img src="infrastructure/livecontainers/kubernetes_resource_utilization.png" alt="쿠버네티스(Kubernetes) 리소스 활용도 보기" >}}

Datadog의 [Kubernetes 리소스 활용도][3] 보기를 사용하면 인프라스트럭처 전반에서 Kubernetes 워크로드가 컴퓨팅 리소스를 어떻게 사용하고 있는지에 대한 인사이트를 얻을 수 있습니다. 이를 통해 리소스 사용량을 파악하고 크기 조정 및 용량 계획에 대한 보다 나은 결정을 내릴 수 있을 뿐만 아니라 CPU 또는 메모리 낭비를 줄일 수 있습니다.

리소스 요청과 제한이 파드의 현재 사용량과 얼마나 잘 일치하는지 지속적으로 업데이트되는 상태를 통해 Kubernetes 클러스터 내에서 빈(bin) 패킹을 개선할 수 있습니다.

## 전제 조건

- Datadog Agent v7.45.0+
- [Orchestrator 탐색기][1] 사용

## 사용법

Datadog에서 **Infrastructure**> [**Kubernetes**][2]로 이동하여 [**Resource Utilization** 탭][3]을 선택합니다.

**Pods**에서 페이지가 열리며, 기본적으로 `kube_cluster_name`, `kube_namespace`, `kube_deployment`에 의해 그룹화됩니다.

CPU와 메모리에 대한 크기 최적화는 일반적으로 개별적으로 수행됩니다. 표의 데이터는 **CPU**와 **Memory** 토글로 나뉩니다.

#### 기본 열

{{< tabs >}}
{{% tab "CPU" %}}
- **포드 그룹**: 기본적으로 배포를 나타내지만 오른쪽 상단의 **그룹별** 필드에 지정한 내용에 따라 달라집니다. 이 열에는 각 그룹의 파드에 대한 사용량, 요청 및 한도의 합계가 포함됩니다.
- **CPU 유휴**: 미사용 CPU의 양으로, 사용량과 요청 간 차이의 합으로 계산됩니다.
- **CPU 사용량/요청**: 사용량의 합을 요청의 합으로 나눈 비율입니다.
- **CPU 사용량/한도**: 사용량의 합을 한도의 합으로 나눈 비율입니다.
- **CPU 그래프**: 시간의 흐름에 따른 사용량, 요청 및 한도의 변화를 보여주는 선 그래프입니다. 각 행을 클릭하면 더 긴 타임프레임을 볼 수 있습니다.
{{% /tab %}}
{{% tab "메모리" %}}
- **파드 그룹**: 기본적으로 배포를 나타내지만 오른쪽 상단의 **Group by** 필드에 지정한 내용에 따라 달라집니다. 이 열에는 각 그룹의 파드에 대한 사용량, 요청 및 한도의 합계가 포함됩니다.
- **메모리 미사용**: 미사용 메모리의 양으로, 사용량과 요청 간의 차이의 합으로 계산됩니다.
- **메모리 사용량/요청**: 사용량의 합을 요청의 합으로 나눈 비율입니다.
- **메모리 사용량/한도**: 사용량의 합을 한도의 합으로 나눈 비율입니다.
- **메모리 그래프**: 시간의 흐름에 따른 사용량, 요청 및 한도의 변화를 보여주는 선 그래프입니다. 각 행을 클릭하면 더 긴 타임프레임을 볼 수 있습니다.
{{% /tab %}}
{{< /tabs >}}

우측 상단의 **Customize** 버튼을 사용하여 확인하고자 하는 다른 열을 선택합니다. 색상 코딩은 파드 프로비저닝의 과잉/부족 정도를 반영합니다.

#### 상세 보기

행을 클릭하면 각 그룹의 CPU 및 메모리 데이터 조합이 포함된 측면 패널이 열리고 각 파드 또는 컨테이너에 대한 자세한 그래프와 파드의 상위 목록이 표시됩니다.

{{< img src="infrastructure/livecontainers/kubernetes_resource_utilization_panel.png" alt="쿠버네티스(Kubernetes) 리소스 활용 측면 패널" >}}

개별 파드 또는 컨테이너 그래프는 부하 불균형이 발생할 경우 그룹에 영향을 미칠 수 있는 이상값을 식별하는 데 도움이 됩니다. 기본적으로 그래프는 개별 파드를 표시하기 위해 `pod_name`으로 그룹화됩니다. 이를 `kube_container_name` 그룹 기준으로 변경하여 멀티 컨테이너 파드의 경우 오버/언더 프로비저닝에 가장 많이 기여하는 컨테이너를 식별할 수 있습니다.

### 유휴 리소스 최적화

유휴 CPU와 메모리는 파드가 즉시 스로틀링되거나 종료되지 않고 애플리케이션을 확장할 수 있는 공간을 확보하는 데 필요합니다.

유휴 CPU 및 메모리가 너무 많으면 불필요한 비용이 증가할 수 있지만 리소스 사용이 증가하면 성능과 안정성이 저하될 위험이 있습니다.

이러한 균형을 유지하려면 그래프를 조정하여 더 긴 타임스팬을 확인하고, 가장 최근의 사용량만을 기준으로 리소스 크기를 결정하지 마세요. 이 메트릭은 표준 Kubernetes 메트릭이므로 모든 Datadog 메트릭과 마찬가지로 쿼리할 수 있습니다. 예를 들어 필요 시 지난 15개월 동안 전체 해상도로 쿼리할 수 있습니다.

{{< img src="infrastructure/livecontainers/kubernetes_resource_utilization_metrics.png" alt="쿠버네티스(Kubernetes) 리소스 활용도 메트릭" >}}

### 알려진 제한사항

요청 또는 한도를 설정하지 않은 컨테이너가 있는 파드가 하나 이상 포함된 그룹에는 메트릭이 표시되지 않습니다. Datadog은 이러한 지표가 없으면 사용 비율을 추론할 수 없기 때문입니다. 메트릭이 없는 이러한 그룹은 정렬 순서에 관계없이 마지막에 표시됩니다.

그룹에 대한 리소스 요청 및 한도의 합계는 해당 그룹에 속한 리소스의 상태와 무관합니다. 이러한 값은 동반 메트릭 그래프에 표시되는 값과 다를 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/infrastructure/containers/orchestrator_explorer?tab=datadogoperator#setup
[2]: https://app.datadoghq.com/kubernetes
[3]: https://app.datadoghq.com/orchestration/resource/pod?groups=tag%23kube_deployment%2Ctag%23kube_namespace%2Ctag%23kube_cluster_name