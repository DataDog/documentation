---
aliases:
- /ko/monitors/monitor_types/host
- /ko/monitors/create/types/host/
description: 하나 이상의 호스트가 Datadog에 보고하고 있는지 점검
further_reading:
- link: /infrastructure/
  tag: 설명서
  text: 인프라스트럭처 모니터링
- link: /monitors/notify/
  tag: 설명서
  text: 모니터 알림 구성
- link: /monitors/downtimes/
  tag: 설명서
  text: 모니터 숨김을 위한 다운타임 예약
- link: /모니터/상태/
  tag: 설명서
  text: 모니터 상태를 확인하세요
title: 호스트 모니터
---

## 개요

인프라 모니터링은 다양한 통합을 통해 클라우드 호스팅 및 온프레미스 서버 등 전체 IT 환경에 대한 가시성을 제공합니다. 호스트 모니터로 어떤 호스트가 데이터를 제출하거나 제출하지 않는지를 지속적으로 확인하여 가시성을 확보하세요.

모든 Datadog Agent는 `datadog.agent.up` 서비스 점검을 상태 `OK`와 함께 보고합니다. 호스트 모니터를 사용하여 하나 이상의 호스트에서 이 검사를 모니터할 수 있습니다.

<div class="alert alert-danger">AIX 에이전트는 <code>datadog.agent.up</code> 서비스 점검을 보고하지 않습니다. 메트릭 <code>datadog.agent.running</code>을 사용해 AIX 에이전트 가동 시간을 모니터링할 수 있습니다. 에이전트가 Datadog로 보고하면 메트릭에서 <code>1</code> 값을 방출합니다.</div>

## 모니터 생성

Datadog에서 [호스트 모니터][1]를 생성하려면 메인 내비게이션에서 *Monitors --> New Monitor --> Host*로 이동합니다.

### 이름 또는 태그로 호스트 선택

호스트 이름, 태그를 선택하거나 `All Monitored Hosts`를 선택하여 모니터할 호스트를 선택합니다. 특정 호스트를 제외해야 하는 경우, 두 번째 필드를 사용하여 이름이나 태그를 나열합니다.

- 포함 필드는 `AND` 로직을 사용합니다. 목록에 있는 모든 이름과 태그가 호스트에 있어야 해당 호스트가 포함됩니다.
- 제외 필드는 `OR` 로직을 사용합니다. 목록에 있는 이름 또는 태그가 있는 호스트는 제외됩니다.

#### 예시

| 모니터                                                | 포함               | 제외     |
|--------------------------------------------------------|-----------------------|-------------|
| `env:prod` 태그가 있는 모든 호스트 포함              | `env:prod`            | 비워두기 |
| `env:test` 태그가 있는 호스트를 제외하고 모든 호스트 포함 | `All Monitored Hosts` | `env:test`  |

### 경고 조건 설정

이 섹션에서 **Check Alert** 또는 **Cluster Alert**를 선택합니다.

{{< tabs >}}
{{% tab "Check Alert" %}}

검사 알림은 호스트가 지정된 시간 동안 보고를 중단하는지 추적합니다. 검사 실행 후 너무 많은 시간이 지나면 호스트의 데이터 제출에 문제가 있다는 신호일 수 있습니다.

누락된 데이터가 있는지 검사할 시간을 입력합니다. 기본값은 2분입니다.

`datadog.agent.up`이 지정한 시간(분) 이상 `OK` 상태 보고를 중단하면 알림이 트리거됩니다.

{{% /tab %}}
{{% tab "Cluster Alert" %}}

클러스터 알림은 일정 시간 동안 일정 비율의 호스트가 보고를 중단했는지 추적합니다.

클러스터 알림을 설정하려면:

1. 태그에 따라 호스트를 그룹화할지 결정합니다. `Ungrouped`는 모든 포함 호스트의 상태 비율을 계산합니다. `Grouped`는 그룹별로 상태 비율을 계산합니다.
2. 알림 및 경고 임계값의 백분율을 선택합니다. 하나의 설정(알림 또는 경고)만 필요합니다.
3. 누락된 데이터가 있는지 검사할 시간을 입력합니다. 기본값은 2분입니다.

`datadog.agent.up`이 지정한 시간(분) 이상 `OK` 상태 보고를 중단하고 퍼센트 임계값에 도달하면 알림이 트리거됩니다.

{{% /tab %}}
{{< /tabs >}}

### 고급 알림 조건

고급 알림 옵션(자동 해결, 새 그룹 지연 등)에 대한 자세한 지침은 [Monitor Configuration][2] 페이지를 참조하세요.

### 알림

**Configure notifications and automations** 섹션에 대한 자세한 지침은 [Notifications][3] 페이지를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/host
[2]: /ko/monitors/configuration/#advanced-alert-conditions
[3]: /ko/monitors/notify/