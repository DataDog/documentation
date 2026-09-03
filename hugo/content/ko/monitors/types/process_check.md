---
aliases:
- /ko/monitors/monitor_types/process_check
- /ko/monitors/create/types/process_check/
description: 프로세스가 호스트에서 실행되는지 점검
further_reading:
- link: /monitors/notify/
  tag: 설명서
  text: Configure your monitor notifications
- link: /monitors/downtimes/
  tag: 설명서
  text: Schedule a downtime to mute a monitor
- link: /모니터/상태/
  tag: 설명서
  text: 모니터링 상태 점검
title: 프로세스 검사 모니터
---

## 개요

프로세스 검사 모니터는 Agent 검사 `process.up`이 생성한 상태를 감시합니다. Agent 수준에서 일치하는 프로세스의 수에 따라 [검사 임계값을 구성][1]할 수 있습니다.

## 모니터 생성

Datadog에서 [프로세스 검사 모니터][2]를 생성하려면 메인 내비게이션에서 *Monitors --> New Monitor --> Process Check*로 이동합니다.

### 프로세스 선택

드롭다운 목록에서 모니터할 프로세스를 선택합니다. 검색 기준을 입력하여 목록을 필터링합니다.

### 모니터 범위 선택

호스트 이름, 태그를 선택하거나 `All Monitored Hosts`를 선택하여 모니터할 호스트를 선택합니다. 선택한 프로세스의 상태를 보고하는 호스트 또는 태그만 표시됩니다. 특정 호스트를 제외해야 하는 경우, 두 번째 필드를 사용하여 이름이나 태그를 나열합니다.

* 포함 필드는 `AND` 로직을 사용합니다. 목록에 있는 호스트 이름과 태그가 모두 호스트에 존재해야 해당 호스트가 포함됩니다.
* 제외 필드는 `OR` 로직을 사용합니다. 목록에 있는 이름 또는 태그가 있는 호스트는 제외됩니다.

### 경고 조건 설정

{{< tabs >}}
{{% tab "Check Alert" %}}

검사 알림은 검사 그룹별로 제출한 연속 상태를 추적하여 임계값과 비교합니다. 프로세스 검사 모니터의 경우 `host` 및 `process` 그룹은 정적입니다.

검사 알림 설정

1. 연속 실패 횟수를 선택하여 알림을 트리거합니다:`<NUMBER>`

    각 검사 실행은 `OK`,  `WARN`, `CRITICAL` 중 하나의 상태를 제출합니다. 알림을 트리거하는 `WARN` 및 `CRITICAL` 상태의 연속 실행 횟수를 선택합니다. 예를 들어, 프로세스에서 연결에 실패한 단일 오류가 있을 수 있습니다. 이 값을 `> 1`로 설정하면 해당 오류를 무시하지만, 두 번 이상 연속 실패한 오류의 경우 알림을 트리거합니다.

2. 연속 성공 횟수를 선택하여 알림을 해결합니다: `<NUMBER>`

    알림을 해결하는 `OK` 상태의 연속 실행 횟수를 선택합니다.

{{% /tab %}}
{{% tab "Cluster Alert" %}}

클러스터 알림은 특정 상태의 프로세스 검사 비율을 계산하고 이를 임계값과 비교합니다.

클러스터 알림을 설정하려면:

1. 태그에 따라 프로세스 검사를 그룹화할지 결정합니다. `Ungrouped`는 모든 소스의 상태 비율을 계산합니다. `Grouped`는 그룹별로 상태 비율을 계산합니다.

2. 알림 및 경고 임계값의 백분율을 선택합니다. 하나의 설정(알림 또는 경고)만 필요합니다.

고유한 태그 조합으로 태그가 지정된 각 검사는 클러스터에서 고유한 검사로 간주됩니다. 클러스터 비율 계산에서는 각 태그 조합의 마지막 검사 상태만 고려됩니다.

{{< img src="monitors/monitor_types/process_check/cluster_check_thresholds.png" alt="클러스터 검사 임계값" style="width:90%;">}}

예를 들어, 환경별로 그룹화된 클러스터 검사 모니터는 환경 검사 중 70% 이상이 `CRITICAL` 상태를 제출하면 알림을 트리거할 수 있고, 환경 검사 중 70% 이상이 `WARN` 상태를 제출하면 경고할 수 있습니다.
{{% /tab %}}
{{< /tabs >}}

#### 고급 알림 조건

[데이터 없음][4], [자동 해결][5] 및 [새 그룹 지연][6] 옵션에 관한 자세한 내용은 [모니터 설정][3] 문서를 참조하세요.

### 알림

**Configure notifications and automations** 섹션에 관한 자세한 지침은 [Notifications][7] 페이지를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/process/
[2]: https://app.datadoghq.com/monitors/create/process
[3]: /ko/monitors/configuration/#advanced-alert-conditions
[4]: /ko/monitors/configuration/#no-data
[5]: /ko/monitors/configuration/#auto-resolve
[6]: /ko/monitors/configuration/#new-group-delay
[7]: /ko/monitors/notify/