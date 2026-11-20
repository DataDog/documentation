---
aliases:
- /ko/monitors/monitor_types/integration
- /ko/monitors/create/types/integration/
description: 특정 통합의 메트릭 값 또는 서비스 상태 모니터
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
title: 통합 모니터
---

## 개요

통합 모니터로 설치된 [통합][1]이 실행 중인지 확인합니다. 보다 자세히 모니터링하려면 메트릭 모니터를 사용하여 통합 관련 특정 정보를 측정할 수 있습니다.

## 모니터 생성

다음에 따라 Datadog에서 [통합 모니터][2]를 생성합니다.

1. 기본 탐색에서 *Monitors --> New Monitor --> Integration*으로 이동합니다.
2. 통합을 검색하거나 목록 또는 이미지에서 선택합니다.

### 통합 메트릭

[메트릭 모니터][3] 문서의 지침에 따라 통합 메트릭 모니터를 생성합니다. 통합 메트릭 모니터 유형을 사용하면 [Manage Monitors][4] 페이지에서 통합 모니터 유형 패싯으로 모니터를 선택할 수 있습니다.

**참고**: 통합 모니터를 구성하려면, 통합이 메트릭 또는 서비스 점검을 제출하는지 확인하세요.

#### 검사 선택

통합 점검이 하나만 있는 경우 선택할 필요가 없습니다. 그렇지 않은 경우 모니터에 대한 점검을 선택합니다.

#### 모니터 범위 선택

호스트 이름, 태그를 선택하거나 `All Monitored Hosts`를 선택하여 모니터링할 범위를 선택합니다. 특정 호스트를 제외해야 하는 경우 두 번째 필드를 사용하여 이름이나 태그를 나열합니다.

* 포함 필드는 `AND` 로직을 사용합니다. 목록에 있는 모든 호스트 이름과 태그가 호스트에 있어야 해당 호스트가 포함됩니다.
* 제외 필드는 `OR` 로직을 사용합니다. 목록에 있는 호스트 이름 또는 태그가 있는 호스트는 제외됩니다.

#### 경고 조건 설정

이 섹션에서 **Check Alert** 또는 **Cluster Alert**를 선택합니다.

{{< tabs >}}
{{% tab "Check Alert" %}}

검사 알림은 검사 그룹별로 제출된 연속 상태를 추적하고 이를 임계값과 비교합니다.

검사 알림 설정

1. 검사를 보고하는 각 `<GROUP>`에 대해 별도의 알림을 트리거합니다.

    Check 그룹화는 알려진 그룹화 목록에서 지정 또는 사용자가 지정합니다. 통합 모니터의 경우 검사별 그룹화가 명시되어 있습니다. 예를 들어, Postgres 통합에는 `db`, `host`, `port` 태그가 지정됩니다.

2. 연속 실패 횟수를 선택하여 알림을 트리거합니다:`<NUMBER>`

    각 검사 실행은 `OK`,  `WARN`, `CRITICAL` 또는 `UNKNOWN` 중 하나의 상태를 제출합니다. 알림을 트리거하는 `CRITICAL` 상태의 연속 실행 횟수를 선택합니다. 예를 들어, 데이터베이스에서 연결에 실패한 단일 오류가 있을 수 있습니다. 이 값을 `> 1`로 설정하면 해당 오류를 무시하지만, 두 번 이상 연속 실패한 오류의 경우 알림을 트리거합니다.

3. 통합 검사가 `UNKNOWN` 상태를 보고하면, 알 수 없는 상태에 대해 `Do not notify` 또는 `Notify`를 선택합니다.

    활성화하면 `UNKNOWN`으로 전환할 때 알림을 트리거합니다. [monitor status page][1]에서 `UNKNOWN` 상태 그룹의 상태 표시줄은 `NODATA` 회색으로 표시됩니다. 모니터의 전반적 상태는 `OK`로 유지됩니다.

4. 연속 성공 횟수를 선택하여 알림을 해결합니다: `<NUMBER>`

   알림을 해결하는 `OK` 상태의 연속 실행 횟수를 선택합니다.


[1]: /ko/monitors/status
{{% /tab %}}
{{% tab "Cluster Alert" %}}

클러스터 알림은 특정 상태의 검사 비율을 계산하고 이를 임계값과 비교합니다.

클러스터 알림을 설정하려면:

1. 태그에 따라 검사를 그룹화할지 결정합니다. `Ungrouped`는 모든 소스의 상태 비율을 계산합니다. `Grouped`는 그룹별로 상태 비율을 계산합니다.

2. 알림 임계값의 백분율을 선택합니다.

고유한 태그 조합으로 태그가 지정된 각 검사는 클러스터에서 고유한 검사로 간주됩니다. 클러스터 비율 계산에서는 각 태그 조합의 마지막 검사 상태만 고려됩니다.

{{< img src="monitors/monitor_types/process_check/cluster_check_thresholds.png" alt="클러스터 검사 임계값" style="width:90%;">}}

예를 들어, 환경별로 그룹화된 클러스터 검사 모니터는 환경 검사 중 70% 이상이 `CRITICAL` 상태를 제출하면 알림을 트리거할 수 있고, 환경 검사 중 50% 이상이 `WARN` 상태를 제출하면 경고할 수 있습니다.
{{% /tab %}}
{{< /tabs >}}

#### 고급 알림 조건

[데이터 없음][6], [자동 해결][7] 및 [새 그룹 지연][8] 옵션에 대한 자세한 내용은 [모니터 설정][5] 문서를 참조하세요.

#### 알림

**Configure notifications and automations** 섹션에 관한 자세한 지침은 [Notifications][9] 페이지를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/
[2]: https://app.datadoghq.com/monitors/create/integration
[3]: /ko/monitors/types/metric/
[4]: https://app.datadoghq.com/monitors/manage
[5]: /ko/monitors/configuration/#advanced-alert-conditions
[6]: /ko/monitors/configuration/#no-data
[7]: /ko/monitors/configuration/#auto-resolve
[8]: /ko/monitors/configuration/#new-group-delay
[9]: /ko/monitors/notify/