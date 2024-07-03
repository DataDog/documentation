---
aliases:
- /ko/events/guides/migrating_from_stream_to_explorer
- /ko/events/guides/migrating_to_new_events_features
further_reading:
- link: https://www.datadoghq.com/blog/datadog-events/
  tag: 블로그
  text: 개선된 Datadog Events로 더 빠르게 문제 해결

title: 새로운 이벤트 기능으로 마이그레이션
---

<div class="alert alert-warning">
Datadog의 기존 이벤트 스트림(Event Stream) 및 이벤트 모니터링이 <strong>2022년 6월 30일</strong>에 중단됩니다. Datadog은 모든 고객을 새롭고 향상된 이벤트 경험으로 마이그레이션하고 있습니다. 이 페이지에는 이번 마이그레이션에 대한 중요한 정보가 포함되어 있습니다. 중단일 전에 이 페이지의 단계에 따라 기존 이벤트 시각화 및 모니터가 계속해서 제대로 작동하는지 확인하세요.</div>



## 이벤트 기능을 변경하는 이유는 무엇인가요?

초기 기능 중 하나인 Datadog의 이벤트 스트림은 출시한지 10년이 넘었습니다. 새로운 이벤트 경험에는 이벤트에서 더 많은 가치를 얻을 수 있는 새로운 기능이 다수 포함되어 있습니다. 그 예로는 이벤트 분석, 이벤트에서 메트릭을 생성하는 기능, 이벤트를 사후 처리하는 파이프라인 생성 기능, 로그 관리 및 APM과 같은 다른 Datadog 제품에 효과적으로 호환되는 훨씬 친숙하고 직관적인 쿼리 구문 등이 있습니다.

## 마이그레이션 일정은 어떻게 되나요?

<strong>2022년 3월</strong> - 새로운 Events Explorer 및 분석에 액세스할 수 있습니다. Datadog는 API로 관리되지 않는 고객 대시보드 및 모니터링의 마이그레이션을 시작합니다.

<strong>2022년 5월 5일</strong> - Events Explorer를 위해 이벤트 스트림이 중단됩니다.

<strong>2022년 5월 19일</strong> - 이 날짜부터 Datadog은 마이그레이션되지 않은 이벤트 모니터를 계속 평가하지만, 편집은 더 이상 할 수 없습니다. 새 이벤트 모니터는 새 구문을 사용해야 합니다.

<strong>2022년 6월 30일</strong> - Datadog은 마이그레이션되지 않은 이벤트 모니터의 평가를 중지합니다. 레거시 이벤트 모니터가 작동을 멈춥니다.

## 어떤 조치를 취해야 하나요?

외부 API 기반 도구(예: Terraform 또는 스크립트)를 사용하여 대시보드 또는 모니터를 관리하지 <strong>않으면</strong> <strong>별도 조치를 취할 필요가 없습니다</strong>. Datadog은 2022년 4월 30일 이전에 대시보드와 모니터를 마이그레이션합니다. Datadog은 기존 모니터를 유지할 것이지만, 이는 음소거 처리되며 Datadog은 늦어도 2022년 6월 30일까지 평가를 중단할 예정입니다.

<strong>Terraform 또는 기타 API 기반 스크립트</strong>를 사용하여 <strong>대시보드</strong> 전부나 일부를 관리하는 경우 Datadog은 이벤트 위젯 및 오버레이의 쿼리를 새 구문으로 마이그레이션하지만, 2022년 6월 30일 이전에 동기화 상태를 유지하려면 스크립트를 업데이트해야 합니다.

<strong>Terraform 또는 기타 API 기반 스크립트</strong>를 사용하여 <strong>모니터</strong> 전부나 일부를 관리하는 경우에는 2022년 6월 30일까지 업데이트해야 합니다. 이 날짜 이후에 Datadog은 마이그레이션되지 않은 모니터의 새 버전을 생성하고 기존 모니터를 음소거 처리하여 계속 경고를 표시합니다.

또한 Datadog은 업데이트를 제안하거나 모니터에 업데이트를 적용하여 모니터 마이그레이션을 지원할 수 있습니다.

## 뭐가 바뀌나요?

### 이벤트 익스플로러

Events Explorer는 인프라스트럭처와 서비스 또는 모니터링 경고에서 생성된 가장 최근 이벤트를 표시합니다. 이는 이벤트 스트림을 대체하고 더 친숙하고 직관적인 쿼리 구문을 제공합니다. 자세한 내용은 [Events Explorer][1]를 참조하세요.

### 이벤트 애널리틱스

{{< img src="service_management/events/events-analytics.png" alt="'source:cloudtrail'로 필터링된 Event Analytics 표시 화면" >}}

Events Explorer에서 이벤트를 보고 검색하는 것 외에도 이제 시계열, 상위 목록 또는 표로 그래프 표시를 하고 주어진 쿼리에 대한 이벤트 수를 그룹화할 수 있습니다. 자세한 내용은 [Event Analytics][2]를 참조하세요.

또한 모든 이벤트 검색 쿼리에서 15개월 리텐션이 설정된 [메트릭을 생성][3]하여 과거 이벤트를 기반으로 모니터 및 경고를 생성할 수 있습니다.

{{< img src="service_management/events/generate-metrics.png" alt="이벤트 검색 쿼리가 포함된 메트릭 이미지." >}}


### 대시보드의 그래프 이벤트

{{< img src="service_management/events/graph-events.png" alt="Events Analytics">}}

이제 대시보드 내에서 주어진 쿼리에 대한 이벤트를 시계열 그래프, 쿼리값, 상위 목록, 표 등으로 그래프 표시를 할 수 있습니다.

예를 들어, [Monitor Notifications Overview][4] 대시보드를 확인해보세요. 이 대시보드는 모니터 경고 이벤트 추세를 분석하여 설정을 개선하고 경고 피로도를 줄이는 데 도움이 됩니다.

### 새로운 이벤트 모니터 경험

이벤트 모니터는 다른 제품(로그, RUM, APM)과 동일한 표준화된 기능 세트를 사용하도록 이식되었으며, 추가 기능이 있습니다.

이벤트 모니터를 생성할 때 새 쿼리 검색 필드는 레거시 공백 채우기 쿼리가 아닌 자동 완성을 사용합니다.

{{< img src="service_management/events/guides/events-migration-monitor-new.png" alt="모니터 쿼리 구문을 위한 새로운 UI" style="width:100%;" >}}

새 쿼리 검색을 사용하면 Boolean 연산자 또는 와일드카드와 같은 새로운 기능으로 이벤트 모니터에서 복잡한 쿼리를 사용할 수 있습니다.

### 파이프라인

Datadog은 JSON 형식의 이벤트를 자동으로 구문 분석합니다. 이벤트가 JSON 형식이 아닌 경우 처리 파이프라인을 통해 순차적으로 연결한 뒤 구문 분석 및 보강이 이루어집니다. 프로세서는 반구조화된 텍스트에서 유의미한 정보나 속성을 추출하여 패싯으로 재사용합니다. 파이프라인을 통해 전달된 각 이벤트는 모든 파이프라인 필터를 대상으로 테스트를 거칩니다. 필터와 일치하면 모든 프로세서가 다음 파이프라인으로 이동하기 전에 순차적으로 적용됩니다.

## 예약 속성

이 목록은 이벤트와 함께 자동으로 수집된 예약 속성을 설명합니다.

| 속성 | 설명                                                                                                                                                                                                                                |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`    | 메트릭에 정의된 원래 호스트의 이름입니다. Datadog은 Datadog 내 일치하는 호스트에서 해당 호스트 태그를 자동으로 검색하여 이벤트에 적용합니다. 에이전트는 이 값을 자동으로 설정합니다.                          |
| `source`  | 통합 이름 또는 이벤트가 시작된 기술에 해당합니다. 통합 이름과 일치하면 Datadog은 해당 파서 및 패싯을 자동으로 설치합니다. 그 예로는 `nginx`, `postgresql` 등이 있습니다. |
| `status`  | 이벤트의 수준 또는 중요도에 해당합니다.      |
| `service` | 이벤트를 생성하는 애플리케이션 또는 서비스의 이름입니다. |
| `message` | 기본적으로 Datadog은 `message` 속성 값을 이벤트 항목의 본문으로 수집합니다. |                     

## 무엇이 바뀌었나요?

**참고:** 이벤트 전송 프로세스는 동일하게 유지됩니다. API, 에이전트를 사용하여 이벤트를 계속 보내거나 이전과 같이 이메일 기능을 통해 이벤트를 보낼 수 있습니다.

### 이벤트 집계가 더 이상 수행되거나 UI에 표시되지 않습니다.
Datadog은 더 이상 자동으로 이벤트를 집계하지 않으며, 더 이상 `aggregation_key` 속성으로 이벤트를 그룹화하지 않습니다. UI에서 더 이상 이벤트 집계가 표시되지 않습니다.

### 이벤트 코멘트는 더 이상 지원되지 않거나 UI에 표시되지 않습니다.
`user_update` 이벤트 유형이 있는 API를 사용하여 생성된 코멘트는 일반 이벤트로 표시됩니다.

### 쿼리의 상태 재매핑
일부 상태값이 다음과 같이 변경되었습니다.

| 레거시 상태 | 새 상태 |
|---------------|------------|
| 성공       | ok         |
| 경고       | 경고       |
| 정보          | 정보       |
| 오류         | 오류      |

### 쿼리의 소스 재매핑
많은 이벤트 소스 이름이 변경되었습니다. 영향을 받는 [소스 이름][5]의 전체 목록을 참조하세요.

### 모니터 평가 기간은 48시간으로 제한됩니다.
모니터는 48시간을 초과하여 평가되지 않습니다. 더 긴 평가 기간을 사용해야 하는 경우에는 이벤트에서 [커스텀 메트릭 생성][3] 후 메트릭 모니터를 사용할 수 있습니다. 이때 평가 기간은 최대 1개월이 됩니다.

### 최대 4개의 패싯으로만 그룹화할 수 있습니다.
(이전: 무제한 그룹) 그룹의 가장 높은 빈도값인 상위값은 전체 그룹 수에 맞춰 제한됩니다. 예를 들어, 모니터가 패싯 한도보다 더 많이 트리거하는 경우 상위 그룹별로 정렬한 뒤 상위 N개의 그룹만 표시합니다. 예를 들어, 두 개의 패싯으로 그룹화하고 하나의 패싯이 `host`일 경우 호스트는 N = 30이 됩니다.
  * 패싯이 1개이면 상위값이 1,000으로 제한됩니다.
  * 패싯이 2개이면 패싯당 상위값이 30으로 제한됩니다(최대 그룹 900개).
  * 패싯이 3개이면 패싯당 상위값이 10으로 제한됩니다(최대 그룹 1,000개).
  * 패싯이 4개이면 그룹당 상위값은 5로 제한됩니다(최대 그룹 625개).

### 모니터의 복구 기준치는 더 이상 지원되지 않습니다.
이벤트 모니터 기준치는 더 이상 `warning_recovery` 및 `critical_recovery` 기준치 유형을 지원하지 않습니다. 새 이벤트 모니터에서 복구 기준치를 제거해야 합니다.

이러한 기능을 사용하는 경우 [지원팀에 문의][6]하여 대체 솔루션을 찾는 데 도움을 받으세요.

## 예시

### 전후의 이벤트 쿼리 구문 예

GitHub 또는 Chef의 이벤트 표시
: 레거시 구문</br>
`sources:github,chef`
: 새 구문 </br>
`source:(github OR chef)`

`env-prod` 태그가 있는 이벤트 표시
: 레거시 구문</br>
`tags:env-prod`
: 새 구문 </br>
`tags:env-prod`

`#env-prod` 또는 `#db` 태그가 있는 이벤트 표시
: 레거시 구문</br>
`tags:env-prod,db`, `tags:env-prod OR db`
: 새 구문 </br>
`tags:(env-prod OR db)`

`#security-group:sg-123` 및 `#role:common-node` 태그가 있는 이벤트 표시
: 레거시 구문</br>
`tags:security-group:sg-123 AND role:common-node`
: 새 구문 </br>
`tags:(security-group:sg-123 AND role:common-node)`

와일드카드를 사용하여 접두사와 접미사 검색
: 레거시 구문</br>
해당 없음
: 새 구문 </br>
`*web`(은)는  `web`(으)로 끝나는 모든 이벤트 메시지에 매칭됩니다.</br>
`source:amazon*`(은)는 소스가 `amazon`(으)로 시작하는 모든 이벤트에 매칭됩니다.

### 전후의 이벤트 모니터 API 구문 예

[이벤트 모니터 API][7]에는 평균 및 카디널리티 반영 방법과 소수의 필수 속성이 포함된 새로운 모니터 쿼리 구문("Event V2 Alert Query" 섹션 참조)이 있습니다.

지난 24시간 동안 Slack 이벤트 없음
: 레거시 구문 </br>
`events('priority:all sources:slack').rollup('count').last('1d') < 1`
: 새 구문 </br>
`events("source:slack").rollup("count").last("1d") < 1`

점검으로 표시된 EC2 인스턴스
: 레거시 구문 </br>
`events('priority:all "Upcoming AWS maintenance event"').by('name,host').rollup('count').last('2d') >= 1`
: 새 구문 </br>
`events("Upcoming AWS maintenance event").rollup("count").by("name,host").last("2d") >= 1`

Zabbix 또는 Prometheus가 오늘 서비스에 대한 경고를 트리거했습니다.
: 레거시 구문 </br>
`events('tags:service priority:all status:error sources:prometheus sources:zabbix).rollup('count').last(‘1d’) > 0`
: 새 구문 </br>
`events("source:(prometheus OR zabbix) status:error tags:service").rollup("count").last("1d") > 0`

`datadog-agent` 서비스에 대해 데이터센터에서 받은 이벤트 없음
: 레거시 구문 </br>
레거시 이벤트 모니터는 더 이상 카디널리티 반영을 지원하지 않습니다.
: 새 구문 </br>
`events("service:datadog-agent").rollup("cardinality", "datacenter").by("service").last("15m") < 1`

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/service_management/events/explorer
[2]: /ko/service_management/events/explorer/analytics
[3]: service_management/events/usage/#custom-metrics
[4]: https://app.datadoghq.com/dash/integration/30532/monitor-notifications-overview
[5]: /ko/service_management/events/guides/new_events_sources/
[6]: /ko/help/
[7]: /ko/api/latest/monitors/#create-a-monitor