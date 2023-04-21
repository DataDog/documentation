---
aliases:
- /kr/monitors/monitor_uptime_widget/
- /kr/monitors/slos/
description: SLO 상태 추적
further_reading:
- link: https://www.datadoghq.com/blog/slo-monitoring-tracking/
  tag: 블로그
  text: Datadog을 사용하여 SLO의 상태 및 오류 예산 추적
- link: https://learn.datadoghq.com/courses/intro-to-slo
  tag: 학습 센터
  text: 서비스 수준 목표(Service Level Objectives)에 대한 소개
- link: https://www.datadoghq.com/blog/service-page/
  tag: 블로그
  text: 서비스 원격 측정, 오류 추적, SLO 등
- link: https://www.datadoghq.com/blog/monitor-service-performance-with-slo-alerts/
  tag: 블로그
  text: SLO 경보를 이용해 서비스 성능 사전 예방 모니터링
kind: 설명서
title: 서비스 수준 목표(Service Level Objectives)
---

{{< vimeo 382481078 >}}

{{< jqmath-vanilla >}}

<br />

## 개요

서비스 수준 목표(Service Level Objectives) 또는 SLO는 사이트 안정성 엔지니어링 툴킷의 핵심이며, 애플리케이션 성능에 대해 명확한 목표를 정의할 수 있는 프레임 워크를 제공합니다. 이를 통해 각 팀이 일관된 고객 경험을 제공하고 기능 개발과 플랫폼 안정성의 균형을 유지하며 내부 및 외부 사용자와의 커뮤니케이션을 개선할 수 있도록 합니다. 

## 주요 용어

서비스 수준 표시기(SLI)
: 서비스 성능 또는 신뢰성에 대한 정량적 측정입니다. Datadog SLO에서 SLI는 하나의 메트릭 또는 하나 이상의 모니터의 집합입니다.

서비스 수준 목표(SLO)
: 특정 기간 동안의 SLI에 대한 목표 백분율.

서비스 수준 계약 (SLA)
: 서비스에 대한 고객의 기대치와 서비스 제공자가 이를 달성하지 못할 시 발생하는 결과를 규정하는 고객과 서비스 제공자 사이의 명시적 또는 암묵적 합의.

오류 예산
: SLO 목표 백분율(100% - 목표 백분율)에서 파생되며, 제품 개발에 투자되는 불확실성이 높은 양.

## 설정

Datadog의 [서비스 수준 목표(Service Level Objectives) 상태 페이지][1]를 참조하여 새 SLO를 생성하거나 기존 SLO를 관리할 수 있습니다. 또한 대시보드에 [SLO 요약 위젯][2]을 추가하여 SLO 상태를 한눈에 볼 수 있습니다.

### 설정

1. [SLO 상태 페이지][1]에서 **새 SLO +**를 선택합니다.
2. SLO의 소스를 정의합니다. [메트릭][3] 또는 [모니터][4]에서 SLO를 생성할 수 있습니다.
3. SLO의 목표 및 시간 창(지난 7일, 30일 또는 90일)을 설정합니다. Datadog은 규정된 SLA보다 더 엄격하게 목표를 설정할 것을 권장합니다. 두 개 이상의 시간 창을 설정할 시 기본으로 사용할 시간 창을 선택합니다. 이 시간 창은 SLO 목록에 표시되며, 기본적으로 최단 시간 창이 선택됩니다.
4. 마지막으로 SLO 제목을 입력하고 설명과 링크 및 태그를 추가한 후 저장합니다. 

SLO를 설정한 후 [서비스 수준 목표(Service Level Objectives) 목록 보기][1]에서 SLO를 선택하여 세부 정보 사이드 패널을 엽니다. 사이드 패널에는 SLI 기록의 상태 표시줄(모니터 기반 SLO) 또는 막대그래프(메트릭 기반 SLO)와 함께 각 SLO 대상에 대한 전체 상태 백분율 및 남은 오류 예산이 표시됩니다. 하나의 [다중 경보 모니터][5]를 사용하여 그룹화된 모니터 기반 SLO를 생성하거나 [`sum by`조항][6]을 사용하여 그룹화된 메트릭 기반 SLO를 생성한 경우 각 개별 그룹에 대한 상태 백분율 및 남은 오류 예산이 전체 상태 백분율 및 남은 오류 예산과 함께 표시됩니다.

**예:** 가용 영역 당 지연 시간 추적을 위해 모니터 기반 SLO를 생성하는 경우 전체 SLO 및 SLO가 추적 중인 각 개별 가용 영역에 대한 상태 백분율과 남은 오류 예산이 표시됩니다.

**참고:** 남은 오류 예산은 백분율로 표시되며 다음 공식을 사용하여 계산됩니다:

$$\text"error budget remaining" = 100 * {\text"current status" - \text" target"} / { 100 - \text"target"}$$

### SLO 목표 설정

오류 예산 및 오류 예산 경보를 잘 활용하려면 SLO 목푯값을 100% 미만으로 설정해야 합니다.

100% 목표를 설정한다는 것은 오류 예산이 100%—SLO 목표와 같기 때문에 0%의 오류 예산을 갖는다는 것을 의미합니다. 허용 가능한 위험을 나타내는 오류 예산을 확인함으로써 고객 대면 서비스 안정성 유지와 기능 개발 투자라는 상충되는 우선순위를 조정할 수 있습니다. 또한 목푯값이 100%인 SLO는  SLO 경보 평가에서 0의 오류로 분류됩니다.

**참고:** SLO에 대해 지정할 수 있는 소수 자릿수는 SLO 유형과 선택한 시간 창에 따라 다릅니다. 각 SLO 유형에 대한 자세한 내용은 아래 링크를 참조하세요.

[모니터 기반 SLO][7]: 7일 및 30일 목표는 소수점 이하 두 자리까지, 90일 목표는 소수점 이하 세 자리까지 허용됩니다.

[메트릭 기반 SLO][8]: 모든 목표에 대해 소수점 이하 세 자리까지 허용됩니다.

## SLO 편집

SLO를 편집하려면 목록 보기에서 SLO의 행 위에 마우스를 올려놓고 행 오른쪽에 나타나는 연필 아이콘을 클릭하거나 행을 클릭하여 세부 정보 사이드 패널을 연 후 패널 오른쪽 상단에 있는 톱니 모양 아이콘에서 편집 버튼을 선택합니다.

## SLO 검색 및 확인

[서비스 수준 목표(Service Level Objectives) 상태 페이지][1]에서 고급 검색을 실행하여 모든 SLO를 검색, 확인, 편집, 복제 및 삭제할 수 있습니다.

{{< img src="monitors/service_level_objectives/slo_status_page.png" alt="SLO status page showing faceted search and calendar Weekly view" style="width:100%;" >}}

고급 검색을 사용하면 다양한 SLO의 속성을 조합해 SLO를 조회할 수 있습니다.

* `name` 및  `description`- 본문 검색
* `time window` - 7일, 30일, 90일
* `type` -  메트릭, 모니터 
* `creator`
* `tags` - 데이터 센터, env, 서비스, 팀 등.

검색을 실행하려면 왼쪽 측면의 패싯 체크박스와 상단에 있는 검색 창을 사용하세요. 박스를 선택하면 검색 창이 해당 쿼리로 업데이트됩니다. 마찬가지로 검색 창의 쿼리를 수정할 때(또는 처음부터 새로 작성할 때) 체크박스를 통해 변경할 수 있습니다. 쿼리 결과는 쿼리를 편집할 때 실시간으로 업데이트되며, 검색 버튼은 사용되지 않습니다.

**기본**, **주별**, **월별** 옵션을 통해 13개월 이상 기간 동안의 SLO 상태를 주 및 월 단위로 확인할 수 있습니다.

각각의 SLO를 편집하려면 해당 SLO 위에 마우스를 올려놓고 해당 행의 오른쪽에 나타나는 다음 버튼을 사용합니다: *편집**, **복제**, **삭제**. SLO에 대한 자세한 내용을 보려면 테이블의 행을 클릭하여 세부 정보 사이드 패널을 엽니다.

**참고**: [Apple AppStore][10] 및 [Google Play Store][11]에서 제공하는 [Datadog Mobile App][9]을 다운로드하여 모바일 기기 홈 화면에서 SLO를 확인할 수 있습니다.

{{< img src="monitors/service_level_objectives/slos-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="SLOs on iOS and Android">}}

### SLO 태그

SLO 생성 및 편집 시 [SLO 상태 페이지][1]에서 필터를 사용하거나 [SLO 저장된 페이지][12]를 생성하기 위해 태그를 추가할 수 있습니다.

### SLO 기본 페이지

SLO 목록 보기에서 기본 SLO 페이지가 나타납니다.

기본 페이지는 다음을 포함합니다:

- 비어 있는 검색 쿼리
- 조직에서 정의된 모든 SLO 목록
- 왼쪽 패싯 목록에서 사용 가능한 패싯 목록

### 저장된 페이지

저장된 페이지를 사용하면 다음을 공유하여 SLO에 대한 맞춤 검색을 SLO 목록 보기에 저장하고 팀과 공유할 수 있습니다:

- 검색 쿼리
- 패싯의 선택된 하위 집합

목록 보기에서 SLO의 하위 집합을 조회한 후 해당 쿼리를 저장된 페이지에 추가할 수 있습니다.

#### 저장된 페이지 추가 

저장된 페이지를 추가하려면:

1. SLO를 조회합니다.
2. 페이지 상단 왼쪽에 있는 **페이지 저장 +**을 클릭합니다.
3. 페이지의 이름을 입력하고 저장합니다.

#### 저장된 페이지 불러오기

저장된 페이지를 불러오려면 페이지 왼쪽 상단에 있는 **페이지 보기** 버튼을 눌러 *저장된 페이지* 패널을 열고 목록에서 선택합니다. 또는 *저장된 페이지* 패널 상단에 있는 *저장된 페이지 필터링*을 통해 검색할 수도 있습니다.

#### 저장된 페이지 공유

목록에 있는 저장된 페이지 위에 마우스를 놓으면 하이퍼링크 아이콘이 나타납니다. 아이콘을 클릭해 링크를 복사한 후 팀원들과 공유할 수 있습니다.

#### 저장된 페이지 관리

저장된 페이지를 선택하고 쿼리를 수정한 다음 *저장된 페이지* 패널에서 *업데이트* 버튼을 클릭하여 업데이트합니다. 저장된 페이지의 이름을 변경하거나 삭제하려면 *저장된 페이지* 패널에서 행 위로 마우스를 움직여 연필 아이콘 또는 휴지통 아이콘을 클릭합니다.

## SLO 오딧 이벤트

SLO 오딧 이벤트를 사용하면 이벤트 탐색기를 통해 SLO 설정 기록을 추적할 수 있습니다. 오딧 이벤트는 SLO를 생성, 수정 또는 삭제할 때마다 이벤트 탐색기에 추가됩니다. 각 이벤트에는 SLO 설정 정보가 포함되며 스트림은 시간 경과에 따른 SLO의 설정 변경 내역을 제공합니다.

각 이벤트에는 다음과 같은 SLO 설정 정보가 포함됩니다:

- 이름
- 설명
- 목표 백분율 및 시간 창
- 데이터 원본 (모니터 ID 또는 메트릭 쿼리)

이벤트 탐색기에는 세 가지 유형의 SLO 오딧 이벤트가 표시됩니다:

1. `SLO Created`이벤트는 생성 시에 네 가지의 SLO 설정 정보를 모두 보여줍니다.
2. `SLO Modified`이벤트는 수정 중에 변경된 설정 정보를 보여줍니다.
3. `SLO Deleted`이벤트는 SLO가 삭제되기 직전에 가지고 있던 네 가지의 설정 정보를 모두 보여줍니다.

SLO 오딧 이벤트의 전체 목록을 가져오려면 이벤트 탐색기에 `tags:audit,slo`검색 쿼리를 입력합니다. 특정 SLO에 대한 오딧 이벤트 목록을 보려면 SLO의 ID를 사용하여 `tags:audit,slo_id:<SLO ID>`을 입력합니다.

[Datadog 이벤트 API][13]를 사용하여 이벤트 탐색기를 프로그래밍 방식으로 조회할 수도 있습니다.

**참고:** UI에 이벤트가 나타나지 않으면 이벤트 탐색기의 시간 범위를 지난 7일과 같이 더 긴 기간으로 설정해야 합니다.

{{< img src="monitors/service_level_objectives/slo-audit-events.png" alt="SLO audit events"  >}}

예를 들어 특정 SLO의 설정이 수정될 때 알림을 받으려면 `audit,slo_id:<SLO ID>`태그를 통해 `[SLO Modified]`텍스트를 추적하도록 이벤트 모니터를 설정합니다.

{{< img src="monitors/service_level_objectives/slo-event-monitor.png" alt="SLO event monitor"  >}}

## SLO 위젯

SLO 설정을 능동적으로 관리하려면 [이벤트 모니터][14]를 설정하세요. 특정 태그에 해당하는 이벤트가 발생할 때마다 알림을 받을 수 있습니다.

SLO를 생성한 후 SLO 요약 대시보드 위젯을 사용하면 대시보드 메트릭, 로그 및 APM 데이터와 함께 SLO의 상태를 시각화할 수 있습니다. SLO 위젯에 대한 자세한 내용은 [SLO 위젯 설명서][2] 페이지를 참조하시기 바랍니다.

## SLO 상태 수정

상태 수정을 통해 SLO 상태 및 오류 예산 계산에서 특정 기간만 제외할 수 있습니다. 이는 다음을 의미합니다:
- 유지 보수와 같은 다운타임으로 인해 오류 예산이 대폭 감소되는 것을 방지할 수 있습니다.
- SLO를 준수하지 않아도 되는 영업 외 시간을 제외할 수 있습니다.
- 배포로 인한 일시적 문제가 SLO에 부정적인 영향을 미치지 않도록 보장합니다.

수정을 적용하면 지정한 기간이 SLO의 계산에서 제외됩니다.
- 모니터 기반 SLO의 경우 수정 시간 창은 계산되지 않습니다.
- 메트릭 기반 SLO인 경우 수정 창의 모든 양호한 이벤트와 불량 이벤트는 계산되지 않습니다.

임시적인 일회성 수정을 만들거나 정기적으로 발생하는 예측 가능한 조정에 대해 반복 수정을 만들 수 있습니다. 일회성 수정에는 시작 시간과 종료 시간이 필요한 반면 반복 수정에는 시작 시간, 기간 및 간격이 필요합니다. 반복적인 수정은 [iCalendar RFC 5545's RRULE 설명서][15]를 기반으로 이루어지며, 지원되는 규칙은 `FREQ`, `INTERVAL`, `COUNT`, `UNTIL`입니다. 수정을 무한정 반복해야 하는 경우에는 종료 날짜를 지정하지 않아도 됩니다.

어떠한 수정 유형이든 수정 사유를 나타내는 수정 카테고리를 반드시 선택해야 합니다. 사용 가능한 카테고리는 `Scheduled Maintenance`, `Outside Business Hours`, `Deployment`, `Other`입니다. 필요시 설명을 추가할 수 있습니다.

각 SLO는 쿼리 성능을 보장하기 위해 수정 제한을 두고 있습니다. 이러한 제한은 SLO 당 지난 90일에만 적용되므로 지난 90일 이전 기간에 대한 수정은 제한에 포함되지 않습니다. 이는 다음을 의미합니다:
- 일회성 수정에 대한 종료 시간이 지난 90일 이전인 경우 제한에 포함됩니다.
- 반복 수정의 최종 반복 종료 시간이 지난 90일 이전인 경우 제한에 포함되지 않습니다.

SLO 당 90일 제한은 다음과 같습니다:

| 수정 유형   | SLO 당 제한 |
| ----------------- | ------------- |
| 1회          | 100           |
| 매일 반복    | 2             |
| 매주 반복  | 3             |
| 매달 반복 | 5             |

SLO 사이드 패널의 [SLO 상태 수정 API][16] 또는  [Terraform 리소스][17]에서 `Correct Status`를 선택하여  상태 수정을 설정할 수 있습니다.

{{< img src="monitors/service_level_objectives/slo-corrections-ui.png" alt="SLO correction UI"  >}}

#### UI에서 액세스하기

UI에서 SLO 상태 수정에 액세스하려면:

1. 새 SLO를 만들거나 기존 SLO를 클릭합니다.
2. SLO 세부 정보 사이드 패널 보기로 이동합니다.
3. 도구 아이콘 아래에서 **상태 수정**을 선택하여 **상태 수정* 생성 모드에 액세스합니다.
4. **시간 수정 창 선택**에서 `One-Time`과 `Recurring` 중에 선택한 후 수정할 기간을 지정합니다.
5. **수정 유형**을 선택하세요.
6. 필요 시 *참고 사항*을 추가하세요.
7. **수정 적용**을 클릭하세요.

수정한 내용을 편집하거나 삭제하려면 SLO 세부 사이드 패널 보기 상단에 있는 **수정** 탭을 클릭하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo
[2]: /kr/dashboards/widgets/slo/
[3]: /kr/monitors/service_level_objectives/metric/
[4]: /kr/monitors/service_level_objectives/monitor/
[5]: /kr/monitors/types/metric/?tab=threshold#alert-grouping
[6]: /kr/monitors/service_level_objectives/metric/#define-queries
[7]: /kr/monitors/service_level_objectives/monitor/#set-your-slo-targets
[8]: /kr/monitors/service_level_objectives/metric/#set-your-slo-targets
[9]: /kr/mobile
[10]: https://apps.apple.com/app/datadog/id1391380318
[11]: https://play.google.com/store/apps/details?id=com.datadog.app
[12]: /kr/monitors/service_level_objectives/#saved-views
[13]: /kr/api/v1/events/#query-the-event-stream
[14]: /kr/monitors/types/event/
[15]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[16]: /kr/api/latest/service-level-objective-corrections/
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/slo_correction