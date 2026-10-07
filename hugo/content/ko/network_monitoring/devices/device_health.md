---
description: 네트워크 장치 문제를 감지하고 NDM의 구성 변경 사항과 연관시킵니다.
further_reading:
- link: /network_monitoring/devices/config_management
  tag: 설명서
  text: Network Configuration Management
- link: /bits_ai/bits_investigation/
  tag: 설명서
  text: Bits Investigation
- link: /network_monitoring/devices/troubleshooting
  tag: 설명서
  text: NDM 트러블슈팅
- link: https://www.datadoghq.com/blog/end-to-end-network-operations-with-bits/
  tag: 블로그
  text: Datadog으로 L7에서 L1까지의 네트워크 문제 해결
title: 장치 상태
---
{{< callout url="https://www.datadoghq.com/product-preview/network-device-remediation-with-bits/" btn_hidden="false" header="장치 상태는 미리 보기로 제공되고 있습니다">}}
{{< /callout >}}

## 개요 {#overview}

[장치 상태][1]는 인프라 전반의 네트워크 장치 문제를 표면화하고 이러한 문제와 구성 변경 사항의 연관성을 파악할 수 있도록 지원합니다. 장치 상태를 사용하여 다음을 할 수 있습니다.

- 전체 장치에서 성능이 저하된 장치 및 영향받은 메트릭 식별
- 하나의 타임라인에서 메트릭 이상 징후와 구성 변경 사항의 연관성 파악
- [Bits Investigation][2]을 시작하여 근본 원인 식별
- 조사 흐름에서 구성 변경 사항을 직접 롤백하여 문제에 대응

전체 장치 문제를 전체적으로 확인하려면 [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Devices{{< /ui >}} > {{< ui >}}Health{{< /ui >}}][1]로 이동하세요. 특정 장치의 활성 문제를 보려면 [장치][3] 목록이나 NDM 시각화에서 해당 장치를 선택하여 장치 측면 패널에서 활성 문제를 여세요.

## 문제 조사 {#investigate-an-issue}

문제를 선택하면 다음 정보가 표시되는 문제 패널이 열립니다.

- 발생한 상황을 알기 쉽게 설명한 요약
- 문제가 시작된 시점과 심각도를 보여주는 영향받은 메트릭 그래프
- 장치에서 구성 변경이 발생한 시점을 보여주는 타임라인 오버레이(이를 통해 메트릭 이상 징후와 특정 변경 사항의 연관성 파악 가능)

{{< img src="network_device_monitoring/health/investigate-issue.png" alt="인터페이스 ge0/0의 대역폭 사용량 감소를 보여주는 장치 상태 문제 화면. 근본 원인 요약, 구성 변경 마커가 있는 시계열 그래프, Bits Investigation을 통해 추가 조사를 수행할 수 있는 버튼이 표시되어 있습니다." style="width:100%;" >}}

### Bits Investigation 시작하기 {#launch-a-bits-investigation}

선택한 문제에서 [Bits Investigation][2]을 트리거할 수 있습니다. Bits Investigation은 문제를 분석하고 다음을 제공합니다.

- 조사 및 조사 결과에 대한 단계별 요약
- 알기 쉽게 설명한 근본 원인 분석

Bits Investigation을 시작하려면 {{< ui >}}Investigate further with Bits{{< /ui >}}를 클릭하세요. {{< ui >}}View full investigation{{< /ui >}}을 클릭하여 새 탭에서 전체 조사를 여세요. 자세한 내용은 [Bits Investigation][2]을 참조하세요.

### 제안된 수정 사항 적용 {#apply-a-proposed-fix}

제안된 수정 사항(예: 마지막으로 신뢰할 수 있는 버전으로 구성 롤백)을 적용하여 문제 패널에서 직접 조치를 취하세요. 적용할 정확한 구성 변경 사항의 diff를 확인하세요.

{{< img src="network_device_monitoring/health/proposed-fix.png" alt="이전 구성 버전으로의 롤백을 보여주는 제안된 수정 사항 패널로, 수정 사항 적용 버튼과 현재 실행 중인 구성 및 제안된 수정 사항의 나란히 비교된 diff가 포함되어 있습니다." style="width:100%;" >}}

### 영향을 받는 장치 및 종속성 조회 {#view-impacted-devices-and-dependencies}

문제 패널에는 동일한 문제로 인해 영향을 받을 수 있는 다른 장치 및 종속성도 표시되어 네트워크 전반의 영향 범위를 평가하는 데 도움이 됩니다. 추가 조사를 수행하려면 다이어그램이나 영향을 받는 장치 목록에서 장치를 선택하여 해당 장치 페이지를 여세요.

{{< img src="network_device_monitoring/health/affected-devices-and-dependencies.png" alt="연결된 장치를 보여주는 ny-edge 장치에 대한 종속성 맵과 성능 저하로 표시된 9개의 영향을 받는 장치 목록입니다." style="width:100%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/devices/health
[2]: /ko/bits_ai/bits_investigation/
[3]: https://app.datadoghq.com/devices