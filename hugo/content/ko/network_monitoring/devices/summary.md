---
further_reading:
- link: /network_monitoring/devices/
  tag: 문서
  text: Network Device Monitoring
- link: /network_monitoring/devices/topology
  tag: 문서
  text: 장치 맵
- link: /network_monitoring/devices/config_management
  tag: 문서
  text: 구성 관리
title: 요약 페이지
---
{{< callout url="https://www.datadoghq.com/product-preview/network-device-summary-page/" header="미리 보기에 참여하세요!">}}
NDM 요약 페이지는 미리 보기로 제공되고 있습니다.
{{< /callout >}}

## 개요 {#overview}

Network Device Monitoring(NDM) **요약 페이지**는 네트워크 엔지니어에게 장치 및 인터페이스 상태, 활성 문제, 최근 구성 변경 사항을 한눈에 보여줍니다. 네트워크 상태를 평가하고 문제를 조사하기 위한 시작점으로 사용하세요.

**참고**: 요약 페이지를 사용하려면 [Network Device Monitoring][1]이 구성되어 있고 최소 하나의 SNMP 모니터링 장치에서 메트릭을 수집하고 있어야 합니다. 설정 지침은 [설정][2]을 참조하세요.

{{< img src="network_device_monitoring/summary/summary_page.png" alt="네트워크 상태, 인터페이스 및 장치 상태, 트래픽, 최근 변경 사항을 보여주는 NDM 요약 페이지" style="width:100%;" >}}

## 요약 페이지 사용 {#using-the-summary-page}

요약 페이지는 네트워크 상태와 활동의 서로 다른 측면을 다루는 여러 섹션으로 구성되어 있습니다. 이 중 세 섹션(**네트워크 상태**, **인터페이스 상태**, **장치 상태**)에서는 추적 중인 항목을 요약하는 상태도 표시합니다.

| 상태 | 의미 |
|-------|---------|
| 양호 | 모든 샘플링된 메트릭이 정상 임계값 내에 있습니다. |
| 저하 | 일부 메트릭이 경고 임계값을 초과했습니다. |
| 불량 | 여러 장치 또는 인터페이스에서 위험 임계값을 초과했습니다. |
| 알 수 없음 | 상태를 평가하기에 데이터가 충분하지 않습니다. |

보기를 사용자 지정하려면 필터 모음을 사용하여 장치 태그(예: `device_namespace`, `device_vendor`, `device_type`, `geolocation`)별로 페이지 범위를 지정하세요. 기본 시간 범위는 {{< ui >}}Past 2 Hours{{< /ui >}}입니다.

### 네트워크 상태 {#network-health}

{{< ui >}}Network health{{< /ui >}} 섹션은 전체 네트워크 상태를 요약합니다.

{{< img src="network_device_monitoring/summary/network_health.png" alt="왼쪽에 Bits AI 요약, 오른쪽에 상태에 따라 색상으로 구분된 노드가 있는 토폴로지 보기를 보여주는 네트워크 상태 섹션" style="width:100%;" >}}

Bits AI 요약은 네트워크의 현재 상태를 설명합니다. 영향을 받는 장치, 인터페이스 및 관찰된 동작과 관련이 있을 수 있는 최근 구성 변경 사항을 강조합니다. {{< ui >}}Chat with Bits Assistant{{< /ui >}}을 클릭하여 후속 질문을 하세요.

[Datadog MCP Server][12]의 `search_ndm_devices`, `get_ndm_device` 및 `search_ndm_interfaces` 도구를 사용하여 Claude Code나 Cursor와 같은 AI 에이전트에서 장치 및 인터페이스 데이터를 쿼리할 수도 있습니다.

요약 아래의 상태 패널에는 상태별 총 장치 수, 활성 모니터 경보 및 경고 수, 활성 문제 수가 표시됩니다. {{< ui >}}View Health{{< /ui >}}를 클릭하여 [장치 상태][5] 보기를 엽니다.

### 인터페이스 상태 {#interface-health}

{{< ui >}}Interface health{{< /ui >}} 섹션에는 정상 임계값을 벗어나 작동하는 상위 인터페이스가 순위별로 표시됩니다. 각 인터페이스에 대해 이 페이지에는 오류율, 폐기율, 그리고 구성된 인터페이스 속도 대비 인바운드 및 아웃바운드 대역폭 사용률이 백분율로 표시됩니다.

{{< img src="network_device_monitoring/summary/interface-performance.png" alt="Bits AI 요약, 오류, 폐기 및 대역폭 열이 있는 상위 인터페이스 표, 대역폭 사용률, 오류 및 폐기에 대한 집계 상태 카드를 보여주는 인터페이스 상태 섹션" style="width:100%;" >}}

Bits AI 요약은 동일한 사이트에서 여러 인터페이스가 포화 상태에 도달하거나 구성 변경 후 오류가 함께 급증하는 경우 등 영향을 받는 인터페이스 전반의 패턴을 강조합니다.

목록 아래의 세 카드는 [{{< ui >}}Bandwidth utilization{{< /ui >}}][6], [{{< ui >}}Errors{{< /ui >}}][7], [{{< ui >}}Discards{{< /ui >}}][8]를 통해 전체 장비의 집계 상태를 보여줍니다. 카드를 클릭하여 평균, 최소, 최대값이 포함된 영향을 받는 인터페이스의 전체 목록을 확인하세요. Errors 및 Discards 세부 보기에는 AI 지원 조사를 위한 {{< ui >}}Ask Bits{{< /ui >}} 버튼도 있습니다.

{{< img src="network_device_monitoring/summary/errors-detail.png" alt="인바운드 및 아웃바운드 오류율 차트, Bits AI 요약, 오류율 및 패킷 수가 포함된 인터페이스 표를 보여주는 Errors 세부 보기" style="width:100%;" >}}

인터페이스를 클릭하여 인터페이스 상태, 메트릭, 구성, 최근 이벤트 등의 세부 정보가 포함된 장치 사이드 패널을 엽니다. 사이드 패널 오른쪽 상단의 {{< ui >}}Open Device Page{{< /ui >}}를 클릭하여 장치 페이지를 열고 장치를 더 자세히 조사할 수 있습니다.

{{< img src="network_device_monitoring/summary/interface-side-panel.png" alt="인터페이스 상태, 대역폭, 모니터 데이터를 보여주는 Interfaces 탭이 열린 장치 사이드 패널" style="width:100%;" >}}

**인터페이스 상태 임계값**

다음 임계값에 따라 인터페이스의 상태가 결정됩니다.

| 신호 | 경고 | 위험 |
|--------|------|----------|
| 대역폭 입/출력 | 80% | 90% |
| 오류 입/출력 | 0.10% | 5% |
| 폐기 입/출력 | 0.10% | 5% |

### 장치 상태 {#device-health}

{{< ui >}}Device health{{< /ui >}} 섹션에는 정상 임계값을 벗어나 작동하는 상위 장치가 순위별로 표시됩니다. 각 장치에 대해 이 페이지에는 CPU, 메모리 및 팬 상태와 함께 선택한 시간 범위에 기록된 구성 변경 사항이 표시됩니다. 기본적으로 장치는 {{< ui >}}CPU{{< /ui >}}로 정렬됩니다. 메모리 압력이 있는 장치를 확인하려면 {{< ui >}}Memory{{< /ui >}}로 정렬하세요.

{{< img src="network_device_monitoring/summary/device-perf.png" alt="Bits AI 요약, CPU 및 메모리 열이 있는 상위 장치 표, 하단의 집계 상태 카드를 보여주는 장치 상태 섹션" style="width:100%;" >}}

Bits AI 요약은 현재 장치 상태를 설명하고 영향을 미쳤을 수 있는 최근 변경 사항이나 이상 징후를 보여줍니다.

목록 아래의 두 카드는 [{{< ui >}}CPU{{< /ui >}}][9] 및 [{{< ui >}}Memory{{< /ui >}}][10]를 통해 집계 상태를 보여줍니다. 카드를 클릭하여 최소값, 최대값 및 지난 24시간의 추세 데이터가 포함된 영향을 받는 장치의 전체 목록을 확인하세요.

장치를 클릭하여 장치 상태, 메트릭, 구성, 최근 이벤트 등의 세부 정보가 포함된 장치 사이드 패널을 엽니다. 사이드 패널 오른쪽 상단의 {{< ui >}}Open Device Page{{< /ui >}}를 클릭하여 장치를 더 자세히 조사하세요.

{{< img src="network_device_monitoring/summary/device-side-panel.png" alt="트리거된 모니터, 장치 태그 및 인터페이스 상태를 보여주는 Device Summary 탭이 열린 장치 사이드 패널" style="width:100%;" >}}

**장치 상태 임계값**

다음 임계값에 따라 장치의 상태가 결정됩니다.

| 신호 | 경고 | 위험 |
|--------|------|----------|
| CPU | 80% | 90% |
| 메모리 | 85% | 95% |

### Traffic {#traffic}

{{< ui >}}Traffic{{< /ui >}} 섹션에서는 [NetFlow][3] 데이터를 사용하여 현재 필터 및 시간 범위에 해당하는 소스와 목적지 간 트래픽 볼륨을 Sankey 다이어그램으로 시각화합니다. {{< ui >}}View NetFlow{{< /ui >}}를 클릭하여 흐름 데이터를 자세히 살펴보세요.

{{< img src="network_device_monitoring/summary/traffic-panel.png" alt="소스 IP, 인터페이스 이름, 장치 이름 및 목적지 IP와 함께 볼륨 기준 상위 25개 흐름의 Sankey 다이어그램을 보여주는 Traffic 섹션" style="width:100%;" >}}

### 변경 사항 {#changes}

{{< ui >}}Changes{{< /ui >}} 섹션에는 [Configuration Management][4]의 최근 네트워크 장치 구성 변경 사항이 표시됩니다. 각 항목에는 영향을 받는 장치, 변경된 내용 요약 및 타임스탬프가 표시됩니다.

{{< img src="network_device_monitoring/summary/changes-panel.png" alt="장치별 최근 구성 변경 사항과 각 변경 사항의 요약 및 타임스탬프를 보여주는 Changes 섹션" style="width:100%;" >}}

[{{< ui >}}View all changes{{< /ui >}}][11]를 클릭하여 전체 Changes 보기를 엽니다. 필터와 시간 범위는 두 보기 간에 공유됩니다. 행을 클릭하면 변경 사항에 대한 세부 정보가 포함된 장치 사이드 패널이 열립니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/network_monitoring/devices/
[2]: /ko/network_monitoring/devices/setup
[3]: /ko/network_monitoring/netflow/
[4]: /ko/network_monitoring/devices/config_management
[5]: /ko/network_monitoring/devices/device_health
[6]: https://app.datadoghq.com/devices/summary/interface-bandwidth
[7]: https://app.datadoghq.com/devices/summary/interface-errors
[8]: https://app.datadoghq.com/devices/summary/interface-discards
[9]: https://app.datadoghq.com/devices/summary/device-cpu
[10]: https://app.datadoghq.com/devices/summary/device-memory
[11]: https://app.datadoghq.com/devices/summary/changes
[12]: /ko/mcp_server/tools/#networks