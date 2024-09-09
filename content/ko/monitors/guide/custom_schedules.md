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

{{< beta-callout url="https://docs.datadoghq.com/help/" btn_hidden="false" >}}
모니터 사용자 지정 일정 기능은 비공개 베타 버전입니다. 액세스를 요청하려면 Datadog 지원팀에 문의하세요.
{{< /beta-callout >}}

## 개요

특정 평가 시간을 설정하고 모니터의 평가 빈도를 제어하여 환경에서 실행 중인 중요한 작업의 실행을 추적합니다. 모니터 사용자 지정 일정을 사용하면 cron 작업과 같이 지속적으로 모니터링할 필요가 없는 시스템 및 프로세스에 대해 경고할 수 있습니다.


모니터 사용자 지정 일정은 일별, 주별 및 월별 일정 간격을 사용하여 이벤트, 로그 및 메트릭 모니터에서 지원됩니다.

## 설정

{{< img src="/monitors/guide/custom_schedules/add_custom_schedule.png" alt="모니터링 설정에서 커스텀 일정을 추가하는 버튼" style="width:100%;" >}}

**Add Custom Schedule**을 클릭하여 평가 빈도를 설정합니다.

<div class="alert alert-warning">모니터링에서 커스텀 예약을 실행한 후에는 실행 중지할 수 없습니다.
</div>

{{< tabs >}}
{{% tab "Day" %}}
하루 중 모니터를 평가할 시간을 선택합니다.

예를 들어 다음 모니터는 매일 오후 8시에 일일 백업 작업이 각 데이터베이스 인스턴스에 대해 성공 이벤트를 생성했는지 확인합니다.

{{< img src="monitors/guide/custom_schedules/custom_day.png" alt="매일 오후 8시에 매일 백업 작업의 결과로 각 데이터베이스 인스턴스에 대해 성공 이벤트가 생성되었는지 확인하는 모니터 설정." style="width:100%;" >}}

{{% /tab %}}

{{% tab "Week" %}}
모니터를 평가할 요일과 시간을 선택합니다.

예를 들어, 다음 모니터는 매주 화요일과 토요일 오전 6시에 각 개별 캠페인에 대해 마케팅 이메일이 전송되었는지 확인합니다.

{{< img src="monitors/guide/custom_schedules/custom_week.png" alt="매주 화, 토요일 오전 6시에 개별 캠페인별로 마케팅 이메일이 발송되었는지 확인하는 모니터 설정" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Month" %}}
모니터가 평가할 날짜와 시간을 선택하세요.

예를 들어 다음 모니터는 매월 1일 고객 인보이스를 생성하는 cron 작업이 성공적으로 실행되었는지 확인합니다.

{{< img src="monitors/guide/custom_schedules/custom_month.png" alt="매월 1일 고객 인보이스를 생성하는 cron 작업이 성공적으로 실행되었는지 확인하는 모니터링 설정." style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## RRULES

반복 규칙(RRULE)은 반복 이벤트를 정의하는 표준인 [iCalendar RFC][1]의 속성 이름입니다. 반복 규칙을 생성하려면 [공식 RRULE 생성기][2]를 사용하세요. 고급 스케줄링 사용 사례를 다루기 위해 RRULE을 활용하세요.

모니터에 대한 커스텀 RRULE을 작성하려면 **Use RRULE**을 클릭합니다.

**참고**: 
- RRULE에서 기간을 지정하는 속성(예: DTSTART, DTEND, DURATION)은 지원되지 않습니다.
- 평가 빈도는 하루 이상이어야 하며, 평가 빈도가 짧으면 기본 모니터 일정을 사용합니다.

#### 예시: 모니터는 매월 말일에 평가합니다.
```text
FREQ=MONTHLY;BYMONTHDAY=28,29,30,31;BYSETPOS=-1
```
{{< img src="monitors/guide/custom_schedules/RRULE_last_day_month.png" alt="UI에서 매월 마지막 날을 평가하는 데 사용되는 RRULE 구문" style="width:90%;" >}}

#### 예시: 모니터는 격월로 매월 첫째 주와 마지막 주 일요일에 평가합니다:

```text
FREQ=MONTHLY;INTERVAL=2;BYDAY=1SU,-1SU
```

{{< img src="monitors/guide/custom_schedules/RRULE_month_last_sunday.png" alt="UI에서 격월로 매월 첫째 주와 마지막 주 일요일에 평가하는 데 사용되는 RRULE 구문" style="width:90%;" >}}

## 커스텀 일정이 있는 모니터의 알림 동작

기본 스케줄링을 사용하는 모니터는 기본 평가 빈도로 쿼리를 실행하고 모니터 상태 전환(예: 모니터가 WARN에서 OK로 또는 OK에서 ALERT로 전환되는 경우)에 따라 알림을 보냅니다.

아래 타임라인은 기본 스케줄링을 사용하는 모니터의 동작을 보여줍니다. 모니터는 상태 변경에 해당하는 알림을 보냅니다.

{{< img src="monitors/guide/custom_schedules/alerting_behavior_regular.png" alt="모니터가 30분 평가 빈도로 기본 일정에 대한 모니터 상태 전환을 기반으로 보내는 알림을 보여주는 시각적 다이어그램" style="width:100%;" >}}

반면, 사용자 지정 일정을 사용하는 모니터링은 매일, 매주 또는 매월 기준으로 평가하고 개별 평가 결과에 따라 알림을 보냅니다. 각 평가는 이전 평가와 독립적이며 결과가 양호하지 않을 때 알림을 보냅니다.

아래 타임라인은 사용자 지정 일정에 따라 실행되는 모니터의 동작을 보여줍니다. 기본 예약 모니터와 달리 사용자 지정 예약 모니터는 모니터 상태에 따라 평가 시간 동안 경고를 보냅니다.
{{< img src="monitors/guide/custom_schedules/alerting_behavior_custom.png" alt="모니터가 일일 평가 빈도를 사용하여 사용자 지정 일정에 대해 모니터 상태를 기반으로 보내는 알림을 보여주는 시각적 다이어그램" style="width:100%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://icalendar.org/rrule-tool.html
[2]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html