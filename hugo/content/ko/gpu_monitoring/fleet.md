---
description: 모든 GPU 가속 호스트의 인벤토리는 성능 문제를 진단하는 데 도움이 됩니다.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-gpu-monitoring/
  tag: 블로그
  text: Datadog GPU Monitoring으로 AI 인프라 최적화 및 문제 해결
title: GPU Monitoring 플릿 페이지
---
## 개요 {#overview}

[GPU Fleet Explorer][0]는 지정된 기간 동안 AI 인프라(GPU 디바이스, 호스트, Ray 클러스터 등) 및 AI 워크로드(포드, Kube 컨테이너, 학습 실행 등) 전반에 대해 상세 분석 결과를 제공합니다. 이 페이지는 GPU 사용률, 호스트 수준의 메트릭, 비용을 포함한 리소스 텔레메트리를 통해 프로비저닝 비효율성과 워크로드 성능 최적화 요소를 파악하는 데 도움이 됩니다. 또한 Datadog은 플릿과 워크로드에 영향을 미치는 문제를 실시간으로 탐지하여 보여주며, 이를 해결하는 방법에 대한 지침을 제시합니다.

## 기본 제공 모니터를 통해 문제 탐지 {#detect-issues-with-out-of-the-box-monitors}

Datadog은 다음과 같은 일반적인 GPU 문제를 실시간으로 탐지하는 기본 제공(OOTB) 모니터 템플릿을 여러 개 제공합니다.

- 온도 급증
- 전력 제한 스로틀링
- 충족되지 않은 GPU 요청
- XID 오류
- ECC 오류
- 버스트 워크로드
- 유휴 디바이스

조직의 필요에 맞게 모니터 임계값을 사용자 지정할 수 있습니다.

이 템플릿에 액세스하려면 페이지 오른쪽 상단 모서리의 {{< ui >}}Monitors{{< /ui >}} 드롭다운을 클릭합니다.

{{< img src="gpu_monitoring/fleet-ootb-monitors.jpg" alt="GPU Fleet 페이지 오른쪽 상단 모서리의 모니터 드롭다운은 온도, 전력 제한 스로틀링, 충족되지 않은 GPU 요청, 심각한 XID 오류, 일반 XID 오류, ECC 오류, 버스트 워크로드, 유휴 디바이스에 대한 OOTB 모니터 템플릿을 보여줍니다." style="width:40%;" >}}

## 태그별 플릿 분석 {#break-down-your-fleet-by-any-tag}

GPU Fleet Explorer는 AI 워크로드부터 기본 AI 인프라까지 전체적인 가시성을 제공합니다. 포드 및 학습 실행과 같은 워크로드 엔터티와 디바이스, 호스트, 클러스터 등 인프라 엔터티 간에 전환할 수 있습니다.

{{< img src="gpu_monitoring/gpu-fleet-sidenav.jpg" alt="AI 인프라 엔터티(디바이스, 호스트, Kube 클러스터, Ray 클러스터)와 AI 워크로드 엔터티(포드, Kube 컨테이너, 학습 실행)를 보여주는 측면 탐색 바" style="width:30%;" >}}

**참고**: 측면 탐색의 Kube 클러스터, 포드, Kube 컨테이너 옵션은 Kubernetes를 사용하는 경우에만 표시됩니다.

페이지 상단의 필터 드롭다운을 사용하여 특정 {{< ui >}}Provider{{< /ui >}}, {{< ui >}}Device Type{{< /ui >}}, {{< ui >}}Cluster{{< /ui >}}, {{< ui >}}Region{{< /ui >}}, {{< ui >}}Service{{< /ui >}}, {{< ui >}}Data Center{{< /ui >}}, {{< ui >}}Environment{{< /ui >}}, {{< ui >}}Team{{< /ui >}}별로 필터링합니다.

또한 검색 및 그룹화 필드를 사용하여 기타 태그별로 {{< ui >}}Search{{< /ui >}}하거나 {{< ui >}}Group{{< /ui >}}할 수 있습니다. 예를 들어 {{< ui >}}Service{{< /ui >}}별로 그룹화하여 각 고유 서비스에 대한 표의 행을 확인할 수 있습니다. 항목 옆의 {{< ui >}}\>{{< /ui >}} 버튼을 클릭하여 해당 서비스 관련 디바이스를 확인하세요.

{{< img src="gpu_monitoring/host_row_expansion-2.png" alt="서비스별로 사용 중인 디바이스 유형을 보여주는 GPU Fleet 표(행 확장 버튼 강조 표시)" style="width:90%;" >}}

{{< img src="gpu_monitoring/filters_and_groupings-3.png" alt="GPU Fleet 페이지 상단의 필터 드롭다운 및 그룹화 선택기" style="width:90%;" >}}

## 사용 사례 기반 조회 및 권장 사항 {#use-case-driven-views-and-recommendations}
GPU 모니터링의 Fleet Explorer 페이지에서는 두 가지 전용 사용 사례에 기반한 조회 기능을 제공합니다.

- **프로비저닝**: 용량을 할당하고 할당량을 관리합니다.
- **성능**: 워크로드 효율성과 처리량을 최적화합니다.

### 프로비저닝 {#provisioning}
{{< ui >}}Provisioning{{< /ui >}} 탭은 디바이스를 워크로드에 할당하는 데 영향을 미치는 하드웨어 상태 문제를 감지하고 이를 해결하는 방법에 대한 지침을 제시합니다.

{{< img src="gpu_monitoring/provisioning-tab-3.jpg" alt="프로비저닝 사용 사례 기반 조회" style="width:90%;" >}}

Datadog은 감지된 각 문제에 대해 해결에 도움이 되는 단계별 수정 조치를 권장합니다.

{{< img src="gpu_monitoring/critical-xid-recommendation.jpg" alt="심각한 XID 오류 발생 시 권장 수정 조치" style="width:60%;" >}}

#### 프로비저닝 요약 그래프 {#provisioning-summary-graph}

요약 그래프는 선택한 사용 사례 기반 조회와 연결된 주요 텔레메트리의 기본 제공(OOTB) 시각화를 제시합니다. 프로비저닝 사용 사례의 경우 프로비저닝된 디바이스, 할당된 디바이스, 활성 디바이스에 대한 세부 정보를 보여주므로 낭비되는 유휴 비용을 회수하고 워크로드에 할당할 수 있는 사용 가능한 디바이스를 다시 확인할 수 있습니다.

{{< img src="gpu_monitoring/summary-graph.jpg" alt="프로비저닝된 디바이스, 할당된 디바이스, 활성 디바이스에 대한 세부 정보를 보여주는 요약 그래프" style="width:90%;" >}}

사용 가능한 옵션과 각각의 의미는 아래 섹션을 확장해 표에서 확인하세요.

{{% collapse-content title="프로비저닝 요약 그래프 옵션의 전체 목록 확인하기" level="h5" expanded=false id="provisioning-summary-graph-table" %}}
| 옵션              | 정의                                                |
| -------------------- | ---------------------------------------------------------- |
| 프로비저닝된 디바이스  | 프로비저닝된 디바이스와 활성 디바이스에 대한 세부 정보입니다.       |
| 할당된 디바이스    | 사용 가능한 디바이스(할당/미할당)에 대한 세부 정보입니다. |
| 활성 디바이스       | 할당된 디바이스(활성/유휴)에 대한 세부 정보입니다.          |
{{% /collapse-content %}}

### 성능 {#performance}
{{< ui >}}Performance{{< /ui >}} 탭은 GPU 디바이스에서 실행 중인 워크로드를 지연시키는 하드웨어 상태 또는 워크로드 문제를 감지합니다. 이 탭은 플랫폼 엔지니어와 AI/ML 팀이 해당 문제를 해결하는 방법을 찾을 수 있는 단일 소스와 지침을 제공합니다.

{{< img src="gpu_monitoring/performance-tab-3.jpg" alt="성능 사용 사례 기반 조회" style="width:90%;" >}}

Datadog은 감지된 각 문제에 대해 해결에 도움이 되는 단계별 수정 조치를 권장합니다.

{{< img src="gpu_monitoring/power-cap-recommendation.jpg" alt="GPU 전력 제한 스로틀링 문제 발생 시 권장 수정 조치" style="width:60%;" >}}

#### 성능 요약 그래프 {#performance-summary-graph}

요약 그래프는 선택한 사용 사례 기반 조회와 연결된 주요 텔레메트리의 기본 제공(OOTB) 시각화를 제시합니다. 성능 사용 사례의 경우 GPU 활용률이나 GPU 포화도와 같은 주요 리소스 활용 메트릭을 네트워크 패브릭 메트릭, 전력, 온도 등과 함께 관련 세부 정보를 보여줍니다.

{{< img src="gpu_monitoring/summary-graph-performance.jpg" alt="GPU 활용률, GPU 포화도, GPU 메모리에 대한 세부 정보를 보여주는 요약 그래프" style="width:90%;" >}}

사용 가능한 옵션과 각각의 의미는 아래 섹션을 확장해 표에서 확인하세요.

{{% collapse-content title="성능 요약 그래프 옵션의 전체 목록 확인하기" level="h5" expanded=false id="performance-summary-graph-table" %}}
| 옵션              | 정의                                                                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU 활용률            | CPU가 사용자 스페이스 프로세스를 실행하는 데 소요된 시간의 백분율입니다.                                                                                                                                                        |
| 호스트 메모리         | 사용 가능한 메모리 중 사용 중인 메모리의 백분율입니다.                                                                                                                                                                                    |
| GPU 활용률            | 각 스트리밍 멀티프로세서가 활성 상태였던 시간의 평균 백분율입니다(값이 낮을수록 유휴 시간이 많음을 의미).                                                                                                                |
| GPU 포화도      | 해당 기간 동안 GPU의 병렬 실행 용량이 얼마나 충분히 사용되고 있는지 측정합니다(모든 SM에서 스트리밍 멀티프로세서당 지원되는 최대 워프 대비 활성 워프의 평균 비율).            |
| GPU 메모리          | 총 GPU 메모리 한도 대비 사용된 GPU 메모리의 비율입니다.                                                                                                                                                               |
| PCIe RX             | GPU 장치에서 PCI를 통해 수신한 바이트입니다(초당).                                                                                                                                                             |
| PCIe TX             | PCI를 통해 GPU 장치로 송신된 바이트입니다(초당).                                                                                                                                                            |
| NVLink RX           | 모든 NVLINK 링크의 총 RX입니다.                                                                                                                                                                                          |
| NVLink TX           | 모든 NVLINK 링크의 총 TX입니다.                                                                                                                                                                                          |
| 그래픽 활동   | 해당 시간 간격 동안 GPU가 컴퓨팅 작업을 수행한 시간의 비율입니다. GPU가 사용 중인지 유휴 상태인지 대략적으로 나타내는 신호입니다.                                                                                     |
| 전력               | GPU 장치의 전력 사용량입니다. GA100 및 이전 아키텍처에서는 해당 시점의 순간 전력을 나타냅니다. 최신 아키텍처에서는 1초간 평균 전력 소모량(W)을 나타냅니다. |
| 온도         | GPU 장치의 온도입니다.                                                                                                                                                                                            |
| SM 클록            | SM 클록 주파수를 MHz 단위로 나타낸 것입니다.                                                                                                                                                                                             |
| NVLink 활성 링크 | 장치의 활성 NVLINK 링크 수입니다.                                                                                                                                                                          |
| ECC 오류          | 수정되지 않은 ECC 오류의 총 개수입니다.                                                                                                                                                                                 |
| XID 오류          | 하드웨어 또는 드라이버 수준의 문제를 나타내는 NVIDIA XID 오류가 발생한 횟수입니다.                                                                                                                                                |
{{% /collapse-content %}}

## GPU 기반 인프라의 인벤토리 {#inventory-of-your-gpu-powered-infrastructure}

이 표에서는사용자가 선택한 태그 기준으로 GPU 기반 인프라에 대한 세부 정보를 제시합니다. {{< ui >}}Group by{{< /ui >}} 필드에서 추가 태그를 지정하지 않은 경우, {{< ui >}}Cluster{{< /ui >}}, {{< ui >}}Host{{< /ui >}}, or {{< ui >}}Device{{< /ui >}} 등 선택한 조회 기준으로 그룹화됩니다.

톱니바퀴 아이콘을 클릭하면 표에 어느 메트릭이 표시될지 사용자 지정할 수 있습니다. 사용할 수 있는 메트릭 전체 목록을 보려면 아래 섹션을 확장하세요. 

{{% collapse-content title="사용 가능한 메트릭 전체 목록 보기" level="h3" expanded=false id="metric-full-list" %}}
| 메트릭                   | 정의                                                                                                                                                                                                              | 메트릭 이름                                        | 프로비저닝 탭 | 성능 탭 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ---------------- | --------------- |
| 유휴 비용                |  (2일이 넘는 기간에 대해서만 0이 아님) 예약되고 할당되었지만, 사용되지 않은 GPU 리소스의 비용입니다.                                                                                              | `gpu_monitoring.estimated_idle_cost`               | ✓                 | ✓               |
| 전체 장치            | Datadog의 GPU 모니터링이 올바르게 구성되어 메트릭을 보고하는 GPU 장치입니다.                                                                                                                                    | `kubernetes_state.node.gpu_capacity`               | ✓                 | —               |
| 사용 가능한 Kubernetes     | Kubernetes 오케스트레이터에 따라 전원이 켜져 있고 할당 가능한 상태인 정상 GPU 장치입니다.                                                                                                          | `kubernetes_state.node.gpu_allocatable`            | ✓                 | —               |
| 할당된 장치        |  (Kubernetes 사용 중인 경우에만 사용 가능) 워크로드에 할당된 장치의 개수입니다.                                                                                                                           | `gpu.device.total`                                 | ✓                 | —               |
| 미할당 장치      | 해당 기간 동안 할당되지 않은 상태이며 사용 가능한 장치의 개수입니다.                                                                                                                                                 |                                                    | ✓                 | —               |
| 활성 장치           | 현재 워크로드에 사용되고 있거나 사용 중인 장치의 개수입니다. Kubernetes를 사용 중인 경우: 현재 워크로드에 사용되고 있는 할당된 장치 개수입니다.                                                                   | `gpu.gr_engine_active`                             | ✓                 | —               |
| 유휴 장치             | 워크로드에 할당되었으나 해당 기간 동안 작업을 수행하지 않은 GPU 장치입니다. `gpu.gr_engine_active`가 0이면 장치가 유휴 상태로 간주됩니다.                                                                        | `gpu.gr_engine_active`                             | ✓                 | —               |
| CPU 활용률           | CPU가 사용자 스페이스 프로세스를 실행하는 데 소요된 시간의 백분율입니다.                                                                                                                                       | `system.cpu.user`                                  | —                 | ✓               |
| 호스트 메모리              | 사용 가능한 메모리 중 사용 중인 메모리의 백분율입니다.                                                                                                                                                                                    | `system.mem.pct_usable`                            | —                 | ✓               |
| GPU 활용률          | 각 스트리밍 멀티프로세서가 활성 상태였던 시간의 평균 백분율입니다(값이 낮을수록 유휴 시간이 많음을 나타냄).                                                                                                                           | `gpu.sm_active`                                    | —                 | ✓               |
| GPU 포화도           | 해당 기간 동안 GPU의 병렬 실행 용량이 얼마나 충분히 사용되고 있는지 측정합니다(모든 SM에서 스트리밍 멀티프로세서당 지원되는 최대 워프 대비 활성 워프의 평균 비율).                 | `gpu.sm_occupancy`                                 | —                 | ✓               |
| GPU 메모리               | 총 GPU 메모리 한도 대비 사용된 GPU 메모리의 비율입니다.                                                                                                                                                                 | `100 - (gpu.memory.free / gpu.memory.limit * 100)` | —                 | ✓               |
| PCIe RX 처리량       | GPU 장치에서 PCI를 통해 수신한 바이트입니다(초당).                                                                                                                                                              | `gpu.pci.throughput.rx`                            | —                 | ✓               |
| PCIe TX 처리량       | PCI를 통해 GPU 장치로 송신된 바이트입니다(초당).                                                                                                                                                             | `gpu.pci.throughput.tx`                            | —                 | ✓               |
| NVLink RX                | 모든 NVLINK 링크의 총 RX입니다.                                                                                                                                                                                           | `gpu.nvlink.throughput.raw.rx`                     | —                 | ✓               |
| NVLink TX                | 모든 NVLINK 링크의 총 TX입니다.                                                                                                                                                                                           | `gpu.nvlink.throughput.raw.tx`                     | —                 | ✓               |
| 전력                    | GPU 장치의 전력 사용량입니다.<br>**참고**: GA100 및 이전 아키텍처에서는 해당 시점의 순간 전력을 나타냅니다.<br>최신 아키텍처에서는 1초간 평균 전력 소모량(W)을 나타냅니다. | `gpu.power.usage`                                  | —                 | ✓               |
| 온도              | GPU 장치의 온도입니다.                                                                                                                                                                                            | `gpu.temperature`                                  | —                 | ✓               |
{{% /collapse-content %}} 

## 세부 정보 사이드 패널 {#details-side-panel}

플릿 표에서 아무 행이나 클릭하면 선택한 클러스터, 호스트 또는 장치의 세부 정보가 기재된 사이드 패널이 열립니다.

### 연결된 엔터티 {#connected-entities}

Datadog의 GPU Monitoring은 NVIDIA의 DCGM Exporter에 의존할 필요가 없습니다. 이 모니터링은 Datadog Agent를 사용해 직접 GPU를 관찰하여 풀과 프로세스의 GPU 사용량 및 비용에 관한 인사이트를 제공합니다. 모든 세부 조회의 {{< ui >}}Connected Entities{{< /ui >}} 섹션 아래에서 SM 활동, GPU 코어 활용률(시스템 프로브를 활성화한 경우에만), 포드, 프로세스, Slurm 작업의 메모리 사용량을 확인할 수 있습니다. 이 정보를 보면 어느 워크로드를 중단하거나 최적화해야 총 지출을 절감할 수 있는지 파악하는 데 도움이 됩니다. 

**참고**: {{< ui >}}Pods{{< /ui >}} 탭은 Kubernetes를 사용 중인 경우에만 표시됩니다.

{{< tabs >}}
{{% tab "클러스터 사이드 패널" %}}

이 사이드 패널에는 클러스터별 퍼널이 있어 다음과 같은 항목을 나타냅니다.

- 해당 클러스터 내 총합, 할당됨(Kubernetes 사용자만 해당), 활성 및 유효 장치 개수
- 해당 클러스터의 총 비용 및 유휴 비용
- 해당 클러스터에 연결된 엔터티: 포드, 프로세스 및 Slurm 작업
- 해당 클러스터의 4가지 주요 메트릭(사용자 지정 가능): 코어 활용률(시스템 프로브를 활성화한 경우에만), 메모리 활용률, PCIe 처리량 및 그래픽 활동
- 해당 클러스터와 연결된 호스트의 표

{{< img src="gpu_monitoring/cluster_sidepanel.png" alt="유휴 장치, 비용, 연결된 엔터티를 분석하여 보여주는 클러스터별 사이드 패널" style="width:100%;" >}}

{{% /tab %}}

{{% tab "호스트 사이드 패널" %}}

이 사이드 패널에는 호스트별 조회가 있어 다음과 같은 항목을 나타냅니다.

- 공급자, 인스턴스 유형, CPU 활용률, 사용한 시스템 메모리, 시스템 메모리 총합, 시스템 I/O 활용률, SM 활동 및 온도 등 호스트 관련 메타데이터
- (Kubernetes 사용자만 사용 가능) 해당 호스트에 할당된 GPU 장치를 그래픽 엔진 활동 기준으로 분류한 내용
- 해당 호스트에 연결된 엔터티: 포드, 프로세스, Slurm 작업

{{< img src="gpu_monitoring/host_sidepanel.png" alt="해당 호스트 및 연결된 엔터티와 연계된 GPU 장치를 표시하는 호스트별 사이드 패널" style="width:100%;" >}}

{{% /tab %}}

{{% tab "장치 사이드 패널" %}}

이 사이드 패널에는 장치별 조회가 있어 다음과 같은 항목을 나타냅니다.

- 이 장치를 더 효과적으로 사용하는 방법 권장 사항(있는 경우) 
- 장치 관련 세부 정보: 장치 유형, SM 활동, 온도
- GPU와 연계된 4가지 주요 메트릭: SM 활동, 메모리 활용률, 전력, 그래픽 엔진 활동 
- 해당 클러스터에 연결된 엔터티: 포드 및 프로세스

{{< img src="gpu_monitoring/device_sidepanel.png" alt="해당 장치를 보다 효과적으로 사용하는 방법에 대한 권장 사항 및 기타 주요 텔레메트리가 표시되는 장치별 사이드 패널" style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## 설치 권장 사항 {#installation-recommendations}

Datadog은 사용자의 인프라를 적극적으로 조사하여 사용자가 GPU Monitoring으로부터 얻을 수 있는 가치를 감소시키는 설치 간극이 있는지 감지합니다. 이 모달에서는 GPU Monitoring에서 최적의 가치를 얻기 위한 설치 권장 사항을 확인할 수 있습니다. 예를 들어 호스트에 Datadog Agent [최신 버전][1]이 설치되어 있어야 하고, NVIDIA 드라이버 최신 버전을 설치해야 하며 잘못 구성된 호스트가 있는지 검사해야 합니다.

<div class="alert alert-danger">예기치 않은 커널 패닉을 유발할 수 있는 Datadog Agent v7.82.0은 사용하지 마세요.</div>

관련 프로세스 또는 SLURM 작업 기준으로 GPU 리소스 특성과 같은 고급 GPU Monitoring 특징을 조회하려면 각각 [Live Processes][3] 및 [Slurm][4] 통합을 활성화해야 합니다.

{{< img src="gpu_monitoring/installation.png" alt="더 원활한 GPU Monitoring 사용자 경험을 위한 설치 지침을 담은 모달입니다." style="width:90%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[0]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=fleet
[1]: https://github.com/DataDog/datadog-agent/releases
[3]: /ko/infrastructure/process/
[4]: /ko/integrations/slurm/