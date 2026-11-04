---
description: 프로비저닝 개선 및 비용 최적화를 위한 전체 GPU 플릿의 실시간 인사이트
further_reading:
- link: https://www.datadoghq.com/blog/datadog-gpu-monitoring/
  tag: 블로그
  text: Datadog GPU Monitoring으로 AI 인프라 최적화 및 문제 해결
- link: /gpu_monitoring/explorer
  tag: 문서
  text: GPU Monitoring 탐색기
title: GPU Monitoring Summary 페이지
---
## 개요 {#overview}

[GPU Monitoring Summary 페이지][0]는 선택한 기간의 전체 GPU 플릿을 분석하고 온프레미스 및 클라우드 장치 전반에 걸친 통합 인사이트를 보여줍니다. 이 페이지는 다음과 같은 주요 질문에 대한 답을 제공합니다.
- 전체 플릿 중 효율적으로 사용되는 비율과 완전히 유휴 상태인 비율은 각각 얼마나 됩니까?
- 유휴 시간을 기준으로 리소스 낭비가 가장 심한 팀, 서비스 또는 클러스터는 어디입니까?
- 워크로드 수요와 할당량 사용 효율성을 고려하여 이러한 장치를 더 효율적으로 프로비저닝하려면 어떻게 해야 합니까?
- 기존 GPU 플릿에서 더 많은 가치를 창출하려면 어떤 최적화 조치를 취할 수 있습니까?

해당 섹션으로 이동하려면 아래 섹션 제목을 클릭하세요.
- [전체 플릿 사용량](#usage-across-fleet)
- [비용 및 활용도](#cost--utilization)
- [할당 및 프로비저닝](#allocation-and-provisioning)
- [워크로드 최적화 기회](#workload-optimization-opportunities)

## 전체 플릿 사용량 {#usage-across-fleet}

운영 효율성은 전체 비용을 결정하는 핵심 요소입니다. GPU 플릿 사용률을 파악하면 과도한 프로비저닝을 방지하고 유휴 GPU에 드는 비용을 절감할 수 있습니다.

### GPU 플릿 퍼널 시각화 {#gpu-fleet-funnel-visualization}

Datadog GPU Monitoring은 온프레미스 및 클라우드 장치 모두에 대한 관측 가능성을 하나의 통합된 보기에서 제공합니다.

이 시각화에서는 주요 클라우드 공급자(AWS, GCP, Azure, Oracle Cloud), 온프레미스 환경 또는 Coreweave 및 Lambda Labs와 같은 GPUaaS 공급자에 걸친 전체 GPU 플릿을 세부적으로 분석하여 모든 Kubernetes 클러스터, 호스트 및 GPU 장치를 보여줍니다.

이 퍼널은 유휴 장치, 사용률이 낮은 GPU 코어, 리소스 재조정이 필요한 리소스 부족 등 팀의 리소스 활용 과정에서 발생하는 성능 문제나 프로비저닝 비효율성도 보여줍니다.

{{< img src="gpu_monitoring/funnel-5.jpg" alt="'한눈에 보는 GPU 플릿'이라는 제목의 퍼널 시각화 전체, 활성 및 유효 장치 수, Kubernetes 할당 현황, 1주일 예측을 포함한 시간대별 장치 할당 현황을 표시합니다." style="width:90%;" >}}

퍼널의 단계는 다음과 같이 정의됩니다.
- {{< ui >}}Total Devices{{< /ui >}}: GPU Monitoring이 올바르게 구성되어 메트릭을 보고하고 있는 GPU 장치 수
- {{< ui >}}Active Devices{{< /ui >}}: 워크로드에 실제로 사용되어 가치를 창출하는 GPU 장치 수
- {{< ui >}}Effective Devices{{< /ui >}}: 선택한 기간의 50%를 넘는 시간 동안 가동된 GPU 장치 수

Kubernetes를 사용하고 Kubernetes 통합을 활성화한 경우, Kubernetes Allocation에 관한 추가 정보가 표시되어 GPU 장치 중 몇 개가 Kubernetes 워크로드에 {{< ui >}}Allocated{{< /ui >}}되는지 확인할 수 있습니다.

### 시간 경과에 따른 장치 할당 {#device-allocation-over-time}

AI 워크로드에서 리소스 사용량이 예기치 않게 급증할 수 있습니다. 따라서 사용 가능한 GPU를 새로 유입되는 워크로드에 맞게 할당하는 것이 중요합니다. 이 섹션에서는 GPU를 과도하게 할당하여 유휴 상태로 두고 있는지, 리소스를 충분히 프로비저닝하지 않아 중요한 작업이 지연되고 있는지 파악할 수 있습니다.

예를 들어, 할당된 장치 수의 예측값이 급증한다면 향후 워크로드에 추가 GPU 장치가 필요할 수 있습니다.

## 비용 및 활용도 {#cost-utilization}

{{< img src="gpu_monitoring/cost-and-utilization2.jpg" alt="Cost & Utilization 페이지에 클러스터별 시간 경과에 따른 총 GPU 사용 시간과 예상 비용, 유휴 시간 및 예상 유휴 비용을 기준으로 한 상위 클러스터를 포함한 유휴 GPU 분석 결과가 표시된 모습" style="width:90%;" >}}

이 섹션을 사용하여 전체 클라우드 GPU 비용과 사용 효율성을 추적하고, 리소스 낭비가 가장 심한 클러스터, 팀 또는 서비스별로 분석하세요.

**참고**: 총 클라우드 GPU 비용을 확인하려면 Datadog UI에서 [AWS][3], [Google Cloud][4], [Azure][5] 또는 [Oracle][6] 클라우드 통합을 활성화해야 합니다.

총 GPU 사용 시간 또는 예상 클라우드 GPU 비용을 클릭하면 시간 경과에 따른 추세를 확인할 수 있습니다. 또한 1주, 1개월 또는 3개월 기간을 선택하여 서비스나 클러스터 등의 주요 태그를 기준으로 세부 분석할 수 있습니다. {{< ui >}}Idle GPU Breakdown{{< /ui >}} 아래에서 장치가 완전히 유휴 상태로 남아 있어 리소스 낭비가 가장 심한 팀, 서비스 또는 클러스터를 정확히 파악할 수 있습니다. 엔터티를 클릭하여 [Explorer][1]에서 열고 추가로 최적화하세요. 예를 들어, 특정 클러스터에 많은 비용이 발생한다면 [Explorer][1] 페이지에서 포드 수준의 사용량을 확인하고 포드를 종료하거나 클러스터 크기를 조정할 수 있습니다.

## 할당 및 프로비저닝 {#allocation-and-provisioning}

이 섹션을 사용하여 GPU 할당 및 용량에 대한 인사이트를 얻으세요. 이를 통해 GPU 제약으로 인한 워크로드 실패 문제를 해결하고 플릿의 운영 효율성을 개선할 수 있습니다.

### 클라우드 공급자 인스턴스별 분류 {#cloud-provider-instance-breakdown}

주요 클라우드 공급자를 통해 배포된 GPU를 사용하는 경우, 이 위젯에서 플릿의 클라우드 인스턴스 유형별 구성을 확인할 수 있습니다.

{{< img src="gpu_monitoring/instance_breakdown.png" alt="클라우드 공급자 인스턴스별 분석 위젯" style="width:90%;" >}}

### 장치 유형별 분석 {#device-type-breakdown}

AI 워크로드가 실패하는 원인은 코드 성능이 아니라 사용 가능한 GPU 장치 수일 수 있습니다. 이 위젯은 모든 GPU 장치 유형의 가용성을 표시하고 완전히 포화된 장치 유형 풀을 강조하여 추가 장치가 필요할 수 있음을 알려줍니다.

장치 유형 풀에 추가 프로비저닝이 필요한지 확인하려면 이 데이터를 아래에 있는 {{< ui >}}Unmet GPU requests{{< /ui >}} 위젯의 데이터와 비교하세요.

**참고**: 특정 장치 유형에서 사용 가능한 장치 수가 전체 장치 수의 5% 미만이면 해당 장치 유형이 빨간색으로 강조 표시됩니다.

{{< img src="gpu_monitoring/device_type.png" alt="GPU 장치 유형별 가용성" style="width:90%;" >}}

### GPU 리소스가 부족한 영역을 정확히 파악하여 프로비저닝 결정 지원(Kubernetes 필요) {#pinpoint-areas-with-insufficient-gpu-resources-to-guide-provisioning-decisions-kubernetes-required}

**참고**: 이 섹션은 Kubernetes 사용자만 사용할 수 있습니다. 

이 섹션을 사용하여 Kubernetes 클러스터에서 충족되지 않은 GPU 요청 수를 확인하세요.

{{< img src="gpu_monitoring/unmet-requests-2.png" alt="충족되지 않은 GPU 요청 수를 기준으로 정렬한 Kubernetes 클러스터 상위 목록" style="width:90%;" >}}

충족되지 않은 GPU 요청 수가 많은 Kubernetes 클러스터가 있는 경우, 해당 클러스터의 {{< ui >}}Device Type Breakdown{{< /ui >}} 위젯을 확인하여 특정 서비스가 어떤 장치 유형을 사용하는지 파악하고, {{< ui >}}Device Allocation over time{{< /ui >}} 위젯에서 과거 수요를 추적할 수도 있습니다. 이를 통해 이러한 클러스터와 장치 유형에 지속적으로 리소스가 부족하게 프로비저닝되는지 확인할 수 있습니다.

**참고**: 적절한 태그를 전송하고 있는데도 서비스나 클러스터가 나열되지 않는다면, 선택한 기간 동안 모든 서비스와 클러스터에 GPU 리소스가 충분했음을 의미합니다.

## 워크로드 최적화 기회 {#workload-optimization-opportunities}

GPU는 팀 인프라 예산에서 가장 비용이 많이 드는 항목인 경우가 많으므로 GPU 워크로드의 비용 최적화는 매우 중요합니다. 이 섹션에서는 GPU를 비효율적으로 사용하는 워크로드를 찾아내고 낭비되는 비용을 특정 워크로드 및 리소스 사용량과 연관 지어 보여줍니다.

### 비효율적인 포드(Kubernetes 필요) {#ineffective-pods-kubernetes-required}

**참고**: 이 섹션은 Kubernetes 사용자만 사용할 수 있습니다. 

GPU 인프라 투자 효과를 극대화하려면 GPU 장치가 지속적으로 가동되도록 하는 것이 중요합니다. 이 위젯은 어떤 포드가 연결된 GPU 장치를 비효율적으로 사용하고 있는지 보여줍니다. 표는 기본적으로 {{< ui >}}SM activity{{< /ui >}}를 기준으로 정렬됩니다.

{{< img src="gpu_monitoring/inefficient_pods.png" alt="SM Engine Activity 수준을 기준으로 정렬한 비효율적인 포드 표" style="width:90%;" >}}

비효율적인 포드를 클릭하면 Kubernetes Explorer 페이지에서 해당 포드를 볼 수 있는 옵션이 포함된 메뉴가 열립니다. Kubernetes Explorer 페이지에서 포드의 상세 보기에 액세스하고 {{< ui >}}GPU{{< /ui >}} 탭을 클릭하여 관련 GPU 장치를 확인할 수 있습니다.

예를 들어, SM 활동 시계열 그래프의 값이 50% 미만으로 떨어지는 것을 확인할 수 있습니다. 그런 다음 해당 기간 동안 장치의 {{< ui >}}Memory Utilization{{< /ui >}} 및 {{< ui >}}Graphics Activity{{< /ui >}} 값이 급증했는지 확인할 수 있습니다. 급증했다면 이것이 SM Engine Activity가 낮은 원인입니다(유휴 장치). 이를 해결하려면 포드 소유자와 워크로드를 더 적은 수의 장치로 통합하거나, 더 작은 GPU를 사용하거나, 기존 GPU에서 더 높은 처리량을 얻을 수 있도록 코드를 최적화하는 방안을 논의할 수 있습니다.

이 위젯은 하나 이상의 포드가 호스트의 공유 리소스를 불균형적으로 많이 사용하는 '시끄러운 이웃(noisy neighbors)'을 식별하는 데도 도움이 됩니다. 예를 들어, 한 포드가 특정 호스트의 CPU를 모두 사용하여 같은 호스트의 다른 포드가 CPU 리소스를 사용하지 못할 수 있습니다.

### 좀비 프로세스(Live Processes 필요) {#zombie-processes-live-processes-required}

**참고**: 이 섹션은 [Live Processes][2] 제품을 설치한 고객만 사용할 수 있습니다. 

좀비 프로세스는 GPU 용량을 불필요하게 점유하므로 GPU 비용 낭비의 주요 원인이 되는 경우가 많습니다. 이 위젯은 다른 워크로드에 GPU 용량을 확보해 주기 위해 종료해야 할 좀비 프로세스를 나열합니다.

{{< img src="gpu_monitoring/zombie_processes.png" alt="GPU 용량을 확보하기 위해 종료해야 할 좀비 프로세스를 SM Engine Activity 기준으로 정렬한 표" style="width:90%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[0]: https://app.datadoghq.com/gpu-monitoring
[1]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=fleet
[2]: /ko/infrastructure/process/?tab=linuxwindows
[3]: /ko/getting_started/integrations/aws/
[4]: /ko/getting_started/integrations/google_cloud/?tab=orglevel
[5]: /ko/getting_started/integrations/azure/?tab=createanappregistration
[6]: /ko/getting_started/integrations/oci/