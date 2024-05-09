---
aliases:
- /ko/monitors/monitor_types/network
- /ko/monitors/create/types/network/
description: TCP/HTTP 엔드포인트의 상태를 확인하세요.
further_reading:
- link: /monitors/notify/
  tag: 설명서
  text: 모니터 알림 설정
- link: /monitors/downtimes/
  tag: 설명서
  text: 모니터 음소거를 위한 다운타임을 예약하세요.
- link: /monitors/manage/status/
  tag: 설명서
  text: 모니터 상태 점검
kind: 설명서
title: 네트워크 모니터
---

## 개요

네트워크 모니터는 Agent에서 사용할 수 있는 TCP 및 HTTP 검사를 포함합니다. Agent 설정에 대한 자세한 내용은 [HTTP 검사][1] 또는 [TCP 검사][2] 문서를 참조하세요.

## 모니터 생성

Datadog에서 [네트워크 모니터][3]를 생성하려면 기본 탐색인 *Monitors --> New Monitor --> Network*로 이동합니다.

### 네트워크 상태

#### 검사 선택

* 네트워크 검사 유형(`ssl`, `http`, `tcp`)을 선택합니다.
* 특정 엔드포인트 또는 `All monitored <TYPE> endpoints`를 선택합니다.

#### 모니터 범위 선택

호스트 이름, 태그를 선택하거나 `All Monitored Hosts`를 선택하여 모니터링할 범위를 선택합니다. 특정 호스트를 제외해야 하는 경우 두 번째 필드를 사용하여 이름이나 태그를 나열합니다.

* 포함 필드는 `AND` 로직을 사용합니다. 포함되려면 나열된 모든 호스트 이름과 태그가 호스트에 있어야 합니다.
* 제외 필드는 `OR` 로직을 사용합니다. 나열된 호스트 이름 또는 태그가 있는 모든 호스트는 제외됩니다.

#### 경고 조건 설정

이 섹션에서 **Check Alert** 또는 **Cluster Alert**를 선택합니다.

{{< tabs >}}
{{% tab "Check Alert" %}}

검사 알림은 검사 그룹별로 제출된 연속 상태를 추적하고 이를 임계값과 비교합니다.

검사 알림 설정

1. 검사를 보고하는 각 `<GROUP>`에 대해 별도의 알림을 트리거합니다.

   검사 그룹화는 알려진 그룹화 목록에서 또는 사용자가 지정합니다. 네트워크 모니터의 경우 검사별 그룹화가 명시되어 있습니다. 예를 들어, HTTP 검사에는 `host`, `instance`, `url` 태그가 지정됩니다.

2. 선택한 장애가 연속적으로 발생하면 경고를 트리거합니다:`<NUMBER>`

   각 검사 실행은 `OK`, `WARN` 또는 `CRITICAL` 중 하나의 상태를 제출합니다. 알림을 트리거하는 `CRITICAL` 상태의 연속 실행 횟수를 선택합니다. 예를 들어, HTTP 검사에 연결이 실패한 단일 오류가 있을 수 있습니다. 이 값을 `> 1`로 설정하면 오류가 무시되지만 두 번 이상 연속 실패한 문제에 대해서는 알림을 트리거합니다.

3. 연속 성공 횟수를 선택하여 알림을 해결합니다: `<NUMBER>`

   알림을 해결하는 `OK` 상태의 연속 실행 횟수를 선택합니다.

{{% /tab %}}
{{% tab "Cluster Alert" %}}

클러스터 알림은 특정 상태의 검사 비율을 계산하고 이를 임계값과 비교합니다.

클러스터 알림을 설정하려면:

1. 태그에 따라 검사를 그룹화할지를 결정합니다. `Ungrouped`는 모든 소스의 상태 비율을 계산합니다. `Grouped`는 그룹별로 상태 비율을 계산합니다.

2. 알림 임계값의 백분율을 선택합니다.

{{% /tab %}}
{{< /tabs >}}

#### 고급 경고 조건

[데이터 없음][5], [자동 해결][6] 및 [새 그룹 지연][7] 옵션에 대한 자세한 내용은 [모니터 설정][4] 설명서를 참조하세요.

#### 알림

**Say what's happening** 및 **Notify your team** 섹션에 대한 자세한 지침은 [알림][8] 페이지를 참조하세요.

### 네트워크 메트릭

[메트릭 모니터][10] 문서의 지침에 따라 네트워크 메트릭 모니터를 생성합니다. 네트워크 메트릭 모니터 유형을 사용하면 [모니터 관리][9] 페이지의 네트워크 모니터 유형 패싯에서 모니터를 선택할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/http_check/
[2]: /ko/integrations/tcp_check/
[3]: https://app.datadoghq.com/monitors#create/network
[4]: /ko/monitors/configuration/#advanced-alert-conditions
[5]: /ko/monitors/configuration/#no-data
[6]: /ko/monitors/configuration/#auto-resolve
[7]: /ko/monitors/configuration/#new-group-delay
[8]: /ko/monitors/notify/
[9]: https://app.datadoghq.com/monitors/manage
[10]: /ko/monitors/types/metric