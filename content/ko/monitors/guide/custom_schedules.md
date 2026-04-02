---
disable_toc: false
further_reading:
- link: https://docs.datadoghq.com/monitors/configuration/?tab=thresholdalert#evaluation-frequency
  tag: 설명서
  text: 모니터 평가 빈도 알아보기
- link: /monitors/downtimes
  tag: 설명서
  text: 다운타임
- link: /monitors/configuration/?tab=thresholdalert#evaluation-window
  tag: 설명서
  text: 누적 시간 창
title: 모니터 평가 빈도 사용자 지정
---

## 개요

특정 평가 시간을 설정하고 모니터 평가 주기를 제어하여 환경에서 실행되는 핵심 작업의 실행을 추적하세요. 모니터 커스텀 일정은 cron 작업 등 지속적인 모니터링이 필요하지 않은 시스템과 프로세스의 알림을 받을 수 있도록 해줍니다.

모니터 커스텀 일정은 매일, 매주, 매월 일정 간격이 있는 이벤트, 로그, 메트릭 모니터에서 지원됩니다.

## 구성

{{< img src="/monitors/guide/custom_schedules/add_custom_schedule.png" alt="모니터 설정에서 커스텀 일정을 추가하는 버튼" style="width:100%;" >}}

**Add Custom Schedule**를 클릭하여 평가 주기를 설정합니다.

<div class="alert alert-danger">커스텀 일정이 모니터에서 활성화되면 일정을 비활성화할 수 없습니다. 커스텀 일정은 모니터 생성 중에만 추가하거나 제거할 수 있습니다.</div>

{{< tabs >}}
{{% tab "Day" %}}
하루 중 모니터가 평가하는 시간을 선택하세요.

예를 들어, 다음 모니터는 매일 오후 8시에 일일 백업 작업이 각 데이터베이스 인스턴스에 성공 이벤트를 생성했는지 확인합니다.

{{< img src="monitors/guide/custom_schedules/custom_day.png" alt="일일 백업 작업의 결과로 각 데이터베이스에 성공 이벤트가 생성되었는지 매일 오후 8시에 확인하는 모니터 설정" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Week" %}}
한 주 중 모니터가 평가하도록 하려는 일자와 시간을 선택하세요.

예를 들어, 다음 모니터는 매주 화요일과 토요일 오전 6시에 각 개별 캠페인에 마케팅 이메일이 전송되었는지를 확인합니다.

{{< img src="monitors/guide/custom_schedules/custom_week.png" alt="각 개별 캠페인에 마케팅 이메일이 전송되었는지 매주 화요일 및 토요일 오전 6시에 확인하는 모니터 설정" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Month" %}}
한 달 중 모니터가 평가하는 일자와 시간을 선택하세요.

예를 들어, 다음 모니터는 매월 첫 번째 날에 고객 인보이스를 생성하는 cron 작업이 성공적으로 실행되었는지 확인합니다.

{{< img src="monitors/guide/custom_schedules/custom_month.png" alt="매월 첫 번째 날에 고객 인보이스를 생성하는 cron 작업이 성공적으로 실행되었는지 확인하는 모니터 설정" style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## RRULES

반복 규칙(RRULE)은 [iCalendar RFC][1]의 속성 이름으로, 반복되는 이벤트를 정의하는 표준입니다. [공식 RRULE 생성기][2]를 사용하여 반복되는 규칙을 생성하세요. RRULE을 활용하여 향상된 방법으로 일정 사용 사례를 지원하세요.

모니터에 커스텀 RRULE을 작성하려면 **Use RRULE**을 클릭합니다.

**참고**: 
- RRULE에서 기간을 정의하는 속성은 지원되지 않습니다(예: DTSTART, DTEND, DURATION).
- 평가 주기는 1일 이상이어야 합니다. 더 짧은 주기의 평가의 경우 기본 모니터 일정을 사용하세요.

#### 예: 매월 마지막 날에 평가하는 모니터
```text
FREQ=MONTHLY;BYMONTHDAY=28,29,30,31;BYSETPOS=-1
```
{{< img src="monitors/guide/custom_schedules/RRULE_last_day_month.png" alt="UI에 사용된 RRULE 구문, 매월 마지막 날에 평가" style="width:90%;" >}}

#### 예: 두 달마다 해당 월 첫 번째 및 마지막 일요일에 평가하는 모니터

```text
FREQ=MONTHLY;INTERVAL=2;BYDAY=1SU,-1SU
```

{{< img src="monitors/guide/custom_schedules/RRULE_month_last_sunday.png" alt="UI에 사용된 RRULE 구문, 두 달마다 해당 월 첫 번째 및 마지막 일요일에 평가" style="width:90%;" >}}

## 커스텀 일정을 사용해 모니터 행동 알리기

기본 일정을 사용하는 모니터는 기본 평가 주기로 쿼리를 실행하고 모니터 상태 전환(예: 모니터가 WARN->OK, OK->ALERT로 변경되는 경우)에 따라 알림을 전송합니다.

아래 타임라인은 기본 일정의 모니터 행동을 설명합니다. 모니터는 상태 변경에 따라 알림을 전송합니다.

{{< img src="monitors/guide/custom_schedules/alerting_behavior_regular.png" alt="비주얼 다이어그램, 30분 평가 주기로 기본 일정에 모니터 상태 전환 시 알림을 전송하는 모니터 표시" style="width:100%;" >}}

커스텀 일정의 모니터의 경우, 매일, 매주, 매월 기준으로 개별 평가 결과에 따라 알림을 전송합니다. 각 평가는 이전 평가와 독립적이며, 결과가 OK가 아닌 경우에 알림을 전송합니다.

아래 타임라인은 커스텀 일정이 실행되는 모니터 행동을 설명합니다. 기본 일정 모니터와 달리 커스텀 일정 모니터는 모니터 상태에 따라 평가 시간 동안 알림을 전송합니다.
{{< img src="monitors/guide/custom_schedules/alerting_behavior_custom.png" alt="비주얼 다이어그램, 매일 평가 주기로 커스텀 일정의 모니터 상태에 따라 알림을 전송하는 모니터 표시 " style="width:100%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://icalendar.org/rrule-tool.html
[2]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html