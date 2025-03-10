---
aliases:
- /ko/synthetics/private_locations/monitoring
description: 프라이빗 위치를 모니터링하세요
further_reading:
- link: getting_started/synthetics/private_location
  tag: 설명서
  text: 프라이빗 위치로 시작하기
- link: synthetics/private_locations/dimensioning
  tag: 설명서
  text: 프라이빗 위치 측정
- link: agent/
  tag: 설명서
  text: Datadog Agent 설치
title: 프라이빗 위치 모니터링
---

## 개요

프라이빗 위치에는 프라이빗 위치 상태를 높은 수준에서 추적할 수 있는 기본 [메트릭][1] 세트가 있습니다. [Settings][2] 페이지에 있는 각 프라이빗 위치의 측사이드 패널에서 이러한 메트릭을 시각화하거나 [대시보드][3]에서 그래프로 표시할 수 있습니다.

{{<img src="synthetics/private_locations/pl_monitoring_table_reporting_1.png" alt="Private location monitor list" style="width:100%;">}}

 [**Synthetics Settings**][2]의 **Private Locations** 탭에는 보고 상태 및 모니터 상태와 함께 프라이빗 위치가 표시됩니다.

비공개 위치를 클릭하면 **Health** 및 **Metadata** 세부정보가 포함된 패널이 나타납니다. **Health** 탭의 표에는 모든 보고 작업자와 이들이 실행 중인 이미지 버전이 표시됩니다. 새 이미지 버전을 위해 끌어와야 하는 작업자 수를 파악할 수 있습니다.

**Monitors**에서는 프라이빗 위치에 문제가 있을 때와 `ALERT`와 같은 상태 경고를 볼 수 있습니다. 예를 들어, 프라이빗 위치가 보고를 중지하거나, 프라이빗 위치의 프로비저닝이 부족하거나, 프라이빗 위치 작업자가 오래된 이미지 버전을 실행하는 경우 등이 있습니다.

{{<img src="synthetics/private_locations/pl_monitoring_side_panel.png" alt="Private location monitoring side panel" style="width:100%;">}}

## 기본 모니터

프라이빗 위치를 생성하면 세 개의 모니터가 계정에 추가됩니다.

| 모니터 이름                                                                        | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|-------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **[Synthetic Private Locations] {{location_id.name}} stopped reporting**              | 이 모니터는 [`synthetics.pl.worker.running`][1] 메트릭이 프라이빗 위치 중 하나에 대한 데이터 보고를 중지할 때 `NO DATA` 경고를 트리거합니다. 이는 프라이빗 위치 작업자가 수명을 다 했거나 실행이 중단되었을 수 있음을 나타냅니다.                                                                                                                                                                                                                                                                                  |
| **[Synthetic Private Locations] {{location_id.name}} is underprovisioned**            | 이 모니터는 [`synthetics.pl.worker.remaining_slots`][1] 메트릭이 30분 동안 평균 1.5 미만으로 떨어지면 `ALERT`을 트리거합니다. 이는 프라이빗 위치의 프로비저닝이 부족했음을 나타냅니다. [프라이빗 위치를 수직 또는 수평으로 확장][4]하여 프라이빗 위치에 할당된 모든 테스트를 실행하기에 충분한 리소스가 있는지 확인하세요.                                                                                                                                                      |
| **[Synthetic Private Locations] {{location_id.name}} uses an outdated image version** | 이 모니터는 [`synthetics.pl.worker.outdated`][1] 메트릭이 프라이빗 위치 중 하나에 대해 `1`을 보고하기 시작할 때 `ALERT`를 트리거합니다. 이는 프라이빗 위치 작업자 중 한 명 이상이 프라이빗 위치 이미지의 오래된 버전을 실행하고 있음을 나타냅니다. [Google Container Registry][5] 또는 [Windows Installer List][8]에서 최신 이미지 버전을 확인하고 `latest` 태그가 포함된 `datadog/synthetics-private-location-worker` 이미지를 가져와 작업자를 해당 이미지 버전으로 업그레이드하세요. |

기본적으로 이러한 모니터에는 핸들이 설정되지 않습니다. 모니터 중 하나가 실패하기 시작할 때 경고를 받으려면 모니터의 [Notification 섹션][6]에 핸들을 추가하세요.

**Monitors** 탭의 모니터에는 프라이빗 위치 ID에 해당하는 그룹이 있거나 `location_id:<ID_OF_THE_PL>` 태그가 지정되어 있습니다.

## Datadog Agent로 프라이빗 위치 모니터링

기본 제공되는 프라이빗 위치 메트릭 외에도 Datadog은 프라이빗 위치와 함께 [Datadog Agent][7] 설치를 권장합니다.

[Datadog Agent][7]는 기본 작업자에 대한 상태 메트릭(예: 메모리 사용량, 제한, CPU 및 디스크)을 제공하여 프라이빗 위치에 대한 심층적인 가시성을 제공합니다. 이러한 메트릭을 사용하여 그래프를 생성하고 리소스 부족에 대한 경고를 설정할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/synthetics/metrics/
[2]: https://app.datadoghq.com/synthetics/settings/private-locations
[3]: /ko/dashboards/
[4]: /ko/synthetics/private_locations/dimensioning
[5]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker
[6]: /ko/monitors/notify/
[7]: /ko/agent/
[8]: https://ddsynthetics-windows.s3.amazonaws.com/installers.json