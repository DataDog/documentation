---
aliases:
- /ko/monitors/monitor_types/custom_check
- /ko/monitors/create/types/custom_check/
- /ko/monitors/types/custom_check/
description: 임의 서비스 검사 상태를 모니터링합니다.
further_reading:
- link: /monitors/notify/
  tag: 설명서
  text: Configure your monitor notifications
- link: /monitors/downtimes/
  tag: 설명서
  text: Schedule a downtime to mute a monitor
- link: /monitors/manage/status/
  tag: 설명서
  text: 모니터 상태를 확인하세요
title: 서비스 검사 모니터
---

## 개요

서비스 검사 모니터에는 Agent에 포함된 [{{< translate key="integration_count" >}}개 이상의 통합][1] 중 하나로 보고되지 않는 모든 서비스 검사가 포함됩니다. 서비스 검사는 [커스텀 Agent 검사][2], [DogStatsD][3] 또는 [API][4]를 사용하여 Datadog으로 보낼 수 있습니다. 자세한 내용은 [서비스 검사 개요][5]를 참조하세요.

## 모니터 생성

Datadog에서 [서비스 검사 모니터][6]를 생성하려면 기본 탐색 메뉴인 *Monitors** --> **New Monitor** --> **Service Check**를 사용합니다.

### 서비스 검사 선택

드롭다운 메뉴에서 서비스 검사를 선택합니다.

### 모니터 범위 선택

호스트 이름, 태그를 선택하거나 `All Monitored Hosts`를 선택하여 모니터링할 범위를 선택합니다. 특정 호스트를 제외해야 하는 경우 두 번째 필드를 사용하여 이름이나 태그를 나열합니다.

* 포함 필드는 `AND` 로직을 사용합니다. 포함되려면 나열된 모든 호스트 이름과 태그가 호스트에 있어야 합니다.
* 제외 필드는 `OR` 로직을 사용합니다. 나열된 호스트 이름 또는 태그가 있는 모든 호스트는 제외됩니다.

### 경고 조건 설정

이 섹션에서 **Check Alert** 또는 **Cluster Alert**를 선택합니다.

{{< tabs >}}
{{% tab "Check Alert" %}}

검사 알림은 검사 그룹별로 제출된 연속 상태를 추적하고 이를 임계값과 비교합니다.

검사 알림 설정

1. 검사를 보고하는 각 `<GROUP>`에 대해 별도의 알림을 트리거합니다.
    * 검사 그룹화는 알려진 그룹화 목록에서 또는 사용자가 지정합니다. 서비스 검사 모니터의 경우 검사별 그룹화가 명시되지 않으므로 직접 지정해야 합니다.

2. 선택한 장애가 연속적으로 발생하면 경고를 트리거합니다:`<NUMBER>`
    * 알림을 트리거하는 `CRITICAL` 상태의 연속 실행 횟수를 선택합니다. 예를 들어 검사가 실패할 때 즉시 알림을 받으려면 `1` 위험 상태에 대한 모니터 경고를 트리거합니다.

3. Unknown 상태에 대해 `Do not notify` 또는 `Notify`를 선택합니다.
    * `Notify`를 선택하면 `UNKNOWN`으로 전환될 때 알림을 트리거합니다. [모니터 상태 페이지][1]에서 `UNKNOWN` 상태에 있는 그룹의 상태 표시줄은 `NODATA` 회색을 사용합니다. 모니터의 전반적인 상태는 `OK`로 유지됩니다.

4. 연속 성공 횟수를 선택하여 알림을 해결합니다: `<NUMBER>`
    * 알림을 해결하는 `OK` 상태의 연속 실행 횟수를 선택합니다. 예를 들어 문제가 해결되었는지 확인하려면 `4``OK`상태에서 모니터를 해결합니다.


[1]: /ko/monitors/manage/status
{{% /tab %}}
{{% tab "Cluster Alert" %}}

클러스터 알림은 특정 상태의 검사 비율을 계산하고 이를 임계값과 비교합니다.

고유한 태그 조합으로 태그가 지정된 각 검사는 클러스터에서 고유한 검사로 간주됩니다. 클러스터 비율 계산에서는 각 태그 조합의 마지막 검사 상태만 고려됩니다.

{{< img src="monitors/monitor_types/process_check/cluster_check_thresholds.png" alt="클러스터 검사 임계값" style="width:90%;">}}

예를 들어, 환경별로 그룹화된 클러스터 검사 모니터는 환경에 대한 검사 중 70% 이상이 `CRITICAL` 상태를 제출하면 알림을 트리거할 수 있고, 환경에 대한 검사 중 70% 이상이 `WARN` 상태를 제출하면 경고할 수 있습니다.

클러스터 알림을 설정하려면:

1. 태그에 따라 검사를 그룹화할지를 결정합니다. `Ungrouped`는 모든 소스의 상태 비율을 계산합니다. `Grouped`는 그룹별로 상태 비율을 계산합니다.

2. 알림 및 알림 임계값의 백분율을 선택합니다. 하나의 설정(알림 또는 경고)만 필요합니다.

{{% /tab %}}
{{< /tabs >}}

#### 고급 경고 조건

[데이터 없음][8], [자동 해결][9] 및 [새 그룹 지연][10] 옵션에 대한 자세한 내용은 [모니터 설정][7] 설명서를 참조하세요.

### 알림

**Say what's happening** 및 **Notify your team** 섹션에 대한 자세한 지침은 [알림][11] 페이지를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/
[2]: /ko/developers/custom_checks/write_agent_check/
[3]: /ko/developers/dogstatsd/
[4]: /ko/api/v1/service-checks/
[5]: /ko/developers/service_checks/#overview
[6]: https://app.datadoghq.com/monitors/create/custom
[7]: /ko/monitors/configuration/#advanced-alert-conditions
[8]: /ko/monitors/configuration/#no-data
[9]: /ko/monitors/configuration/#auto-resolve
[10]: /ko/monitors/configuration/#new-group-delay
[11]: /ko/monitors/notify/