---
aliases:
- /ko/monitors/monitor_types/event
- /ko/monitors/create/types/event/
description: Datadog에서 수집한 이벤트를 모니터링하세요.
further_reading:
- link: /events/
  tag: 문서
  text: Event Management 개요
- link: /monitors/notify/
  tag: 문서
  text: 모니터 알림 설정하기
- link: /monitors/downtimes/
  tag: 문서
  text: 모니터 음소거를 위한 가동 중지 예약하기
- link: /monitors/status/
  tag: 문서
  text: 모니터 상태 점검하기
title: 이벤트 모니터
---
## 개요 {#overview}

Datadog은 모니터, Watchdog 및 Error Tracking을 포함한 다양한 제품에서 이벤트를 자동으로 생성합니다. 또한 Agent와 설치된 통합에서 생성된 이벤트를 추적하고, 타사의 경보 이벤트, 변경 요청, 배포 및 구성 변경 등의 소스에서 이벤트를 수집할 수 있습니다.

<div class="alert alert-info">이벤트 모니터는 <a href="/monitors/status/events/">모니터 이벤트</a>에 대해 경보를 발생시키지 않습니다. 무한 루프가 발생할 수 있기 때문입니다.</a></div>

이벤트 모니터는 검색 쿼리와 일치하는 수집된 이벤트에 대해 경보를 발생시켜 팀에 가장 중요한 이벤트에 집중할 수 있도록 합니다.

## 모니터 생성 {#monitor-creation}

Datadog에서 이벤트 모니터를 생성하려면 [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Event{{< /ui >}}][1]로 이동하세요.

<div class="alert alert-info">계정당 이벤트 모니터는 기본적으로 1000개로 제한됩니다. 이 제한에 도달한 경우 <a href="/monitors/configuration/#set-alert-aggregation">다중 경보</a>를 사용하거나 <a href="/help/">지원팀에 문의</a>하는 것을 고려하세요.</div>

### 검색 쿼리 정의 {#define-the-search-query}

검색 쿼리를 정의하면 상단 그래프가 업데이트됩니다.

1. [Event Explorer 검색 구문][2]을 사용하여 검색 쿼리를 구성합니다.
2. 이벤트 수, 패싯, 태그 또는 속성을 기준으로 모니터링할 항목을 선택합니다.
    * Datadog은 선택한 시간 범위 동안의 이벤트 수를 평가한 다음 임계값 조건과 비교합니다.
    * 일부 속성 및 태그의 경우 Datadog은 집계 값(예: 평균, 중앙값, 최소값 또는 합계)을 평가합니다.
    * {{< ui >}}Monitor over a facet{{< /ui >}}: 패싯을 선택하면 모니터는 해당 패싯의 고유 값 개수를 기준으로 경보를 발생시킵니다.
      
3. (선택 사항)이벤트를 차원별로 그룹화합니다. 

   쿼리와 일치하는 모든 이벤트는 최대 4개의 이벤트 패싯 값을 기준으로 그룹으로 집계됩니다. 차원이 여러 개인 경우 먼저 첫 번째 차원을 기준으로 상위 값을 결정하고, 그 상위 값 내에서 두 번째 차원의 상위 값을 결정하는 방식으로 마지막 차원까지 순차적으로 결정합니다. 차원 제한은 전체 차원 수에 따라 달라집니다.
   * **1개 패싯**: 상위 1,000개 값
   * **2개 패싯**: 패싯당 상위 30개 값(최대 900개 그룹)
   * **3개 패싯**: 패싯당 상위 10개 값(최대 1,000개 그룹)
   * **4개 패싯**: 패싯당 상위 5개 값(최대 625개 그룹)

   이벤트 모니터에 여러 쿼리나 수식이 정의된 경우 각 차원에 대해 상위 또는 하위 값의 수를 선택할 수 있습니다.

   상위 값에 대한 총 제한은 패싯 수와 관계없이 1,000개입니다. 상위 값을 1,000보다 큰 수로 늘리면 Datadog은 결과 조합 수가 1,000 미만이 되도록 다른 차원의 상위 값을 조정합니다. 모든 그룹화의 기본 상위 값은 10이며, 네 번째 패싯은 예외적으로 기본값이 상위 5개 값입니다.

   예를 들어, 검색 쿼리에 네 개의 그룹화가 있는 이벤트 모니터는 다음과 같이 구성할 수 있습니다.
   * **첫 번째 패싯**: 상위 10개 값
   * **두 번째 패싯**: 상위 10개 값
   * **세 번째 패싯**: 상위 5개 값
   * **네 번째 패싯**: 상위 2개 값

### 경보 조건 설정 {#set-alert-conditions}

쿼리가 임계값과 비교하여 다음 조건 중 하나를 충족하면 경보가 발생합니다.
- `above`
- `above or equal to`
- `below`
- `below or equal to`
- `equal to`
- `not equal to`

**참고**: 일부 공급자는 이벤트가 **게시**된 시점과 이벤트가 시작된 시점 사이에 상당한 지연을 발생시킵니다. 이 경우 Datadog은 이벤트의 날짜를 발생 시점으로 소급하여 지정하므로 수신 이벤트가 현재 모니터 평가 기간을 벗어날 수 있습니다. 평가 기간을 넓히면 시간 차이를 고려하는 데 도움이 될 수 있습니다.

#### 고급 경보 조건 {#advanced-alert-conditions}

고급 경보 옵션(자동 해결, 평가 지연 등)에 대한 자세한 지침은 [모니터 구성][4] 페이지를 참조하세요.

### Notifications {#notifications}

{{< ui >}}Configure notifications & automations{{< /ui >}} 섹션에 대한 자세한 지침은 [Notifications][5] 페이지를 참조하세요.

#### 이벤트 템플릿 변수 {#event-template-variables}

이벤트 모니터에는 알림 메시지에 포함할 수 있는 다음과 같은 전용 템플릿 변수가 있습니다.

| 템플릿 변수          | 정의                                                                     |
|----------------------------|--------------------------------------------------------------------------------|
| `{{event.id}}`             | The ID of the event.                                                           |
| `{{event.title}}`          | The title of the event.                                                        |
| `{{event.text}}`           | The text of the event.                                                         |
| `{{event.host.name}}`      | The name of the host that generated the event.                                 |
| `{{event.tags}}`           | A list of tags attached to the event.                                          |
| `{{event.tags.<TAG_KEY>}}` | 이벤트에 첨부된 특정 태그 키의 값입니다. 아래 예시를 참조하세요. |

##### 태그 `key:value` 구문 {#tags-keyvalue-syntax}

태그 `env:test`, `env:staging` 및 `env:prod`의 경우 다음과 같습니다.

* `env`는 태그 키입니다.
* `test`, `staging` 및 `prod`는 태그 값입니다.

템플릿 변수는 `입니다.{{event.tags.env}}`. The result of using this template variable is `test`, `staging`, or `prod`.

### 알림 집계 {#notification-aggregation}

경보 그룹화 전략을 구성합니다.
    * {{< ui >}}Simple-Alert{{< /ui >}}: 단순 경보는 모든 보고 소스에 걸쳐 집계됩니다. 집계된 값이 설정된 조건을 충족하면 경보 하나가 발생합니다. 이는 단일 호스트의 메트릭이나 여러 호스트에 걸친 메트릭의 합계를 모니터링하는 데 가장 적합합니다. 이 전략을 선택하면 알림 노이즈를 줄일 수 있습니다.
    * {{< ui >}}Multi Alert{{< /ui >}}: 다중 경보는 그룹 파라미터에 따라 최대 1,000개의 일치하는 그룹에서 각 소스별로 경보를 적용합니다. 설정된 조건을 충족하는 각 그룹에 대해 경보 이벤트가 생성됩니다. 예를 들어, `host`별로 그룹화하여 각 호스트에 대해 별도의 경보를 받을 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/event
[2]: /ko/events/explorer/searching
[3]: /ko/help/
[4]: /ko/monitors/configuration/#advanced-alert-conditions
[5]: /ko/monitors/notify/