---
description: RRULE 고급 일정 패턴을 사용하여 중요 작업에 대해 매일, 매주, 매월 간격의 사용자 지정 모니터 일정을 구성하세요.
disable_toc: false
further_reading:
- link: https://docs.datadoghq.com/monitors/configuration/?tab=thresholdalert#evaluation-frequency
  tag: 설명서
  text: 모니터 평가 빈도에 대해 알아보기
- link: /monitors/downtimes
  tag: 설명서
  text: 다운타임
- link: /monitors/configuration/?tab=thresholdalert#evaluation-window
  tag: 설명서
  text: 누적 시간 윈도우
title: 모니터 평가 빈도 사용자 지정
---
## 개요 {#overview}

특정 평가 시간을 설정하고 모니터 평가 빈도를 제어하여 환경에서 실행되는 중요 작업의 실행 과정을 추적하세요. 모니터 사용자 지정 일정을 통해 cron 작업과 같이 지속적인 모니터링이 필요하지 않은 시스템 및 프로세스에 대해 경보를 보낼 수 있습니다.

모니터 사용자 지정 일정은 매일, 매주, 매월 일정 간격이 있는 이벤트, 로그, 메트릭 모니터에서 지원됩니다.

## 구성 {#configuration}

{{< img src="/monitors/guide/custom_schedules/add_custom_schedule.png" alt="모니터 구성에 사용자 지정 일정을 추가하는 버튼" style="width:100%;" >}}

{{< ui >}}Add Custom Schedule{{< /ui >}}을 클릭하여 평가 빈도를 설정합니다.

<div class="alert alert-danger">모니터에서 사용자 지정 일정이 활성화되면 사용자 지정 일정을 비활성화할 수 없습니다. 사용자 지정 일정은 모니터 생성 중에만 추가 또는 제거할 수 있습니다. {{< ui >}}Remove non-reporting groups{{< /ui >}} 설정은 사용할 수 없습니다. 이 문제를 해결하려면 사용자 지정 일정이 없는 새 모니터를 생성하세요.
</div>

{{< tabs >}}
{{% tab "일(Day)" %}}
하루 중 모니터 평가 시간을 선택하세요.

예를 들어, 다음 모니터는 매일 오후 8시에 일일 백업 작업이 각 데이터베이스 인스턴스에 성공 이벤트를 생성했는지 확인합니다.

{{< img src="monitors/guide/custom_schedules/custom_day.png" alt="일일 백업 작업의 결과로 각 데이터베이스 인스턴스에 성공 이벤트가 생성되었는지 매일 오후 8시에 확인하는 모니터 설정" style="width:100%;" >}}

{{% /tab %}}

{{% tab "주(Week)" %}}
한 주 중 모니터 평가 요일과 시간을 선택하세요.

예를 들어, 다음 모니터는 매주 화요일과 토요일 오전 6시에 각 개별 캠페인에 마케팅 이메일이 전송되었는지를 확인합니다.

{{< img src="monitors/guide/custom_schedules/custom_week.png" alt="각 개별 캠페인에 마케팅 이메일이 전송되었는지 매주 화요일과 토요일 오전 6시에 확인하는 모니터 설정" style="width:100%;" >}}

{{% /tab %}}

{{% tab "월(Month)" %}}
한 달 중 모니터 평가 일자와 시간을 선택하세요.

예를 들어, 다음 모니터는 매월 첫 번째 날에 고객 인보이스를 생성하는 cron 작업이 성공적으로 실행되었는지 확인합니다.

{{< img src="monitors/guide/custom_schedules/custom_month.png" alt="매월 첫 번째 날에 고객 인보이스를 생성하는 cron 작업이 성공적으로 실행되었는지 확인하는 모니터 설정" style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## RRULES {#rrules}

반복 규칙(RRULE)은 반복 이벤트를 정의하기 위한 표준인 [iCalendar RFC][1]의 속성 이름입니다. 정기 규칙을 생성하려면 [공식 RRULE 생성기][2]를 사용하세요. RRULE을 활용하여 고급 일정 사용 사례를 처리합니다.

모니터에 사용자 지정 RRULE을 작성하려면 {{< ui >}}Use RRULE{{< /ui >}}을 클릭합니다.

**참고**:
- RRULE에서 기간을 지정하는 속성은 지원되지 않습니다(예: DTSTART, DTEND, DURATION).
- 평가 빈도는 하루 이상이어야 합니다. 평가 빈도를 더 짧게 지정하려면 기본 모니터 일정을 사용하세요.

#### 예: 매월 마지막 날에 평가하는 모니터 {#example-monitor-evaluates-on-the-last-day-of-the-month}

```text
FREQ=MONTHLY;BYMONTHDAY=28,29,30,31;BYSETPOS=-1
```
{{< img src="monitors/guide/custom_schedules/RRULE_last_day_month.png" alt="매월 마지막 날 평가를 위해 UI에서 사용하는 RRULE 구문" style="width:90%;" >}}

#### 예: 두 달마다 해당 월 첫 번째 및 마지막 일요일에 평가하는 모니터: {#example-monitor-evaluates-every-other-month-on-the-first-and-last-sunday-of-the-month}

```text
FREQ=MONTHLY;INTERVAL=2;BYDAY=1SU,-1SU
```

{{< img src="monitors/guide/custom_schedules/RRULE_month_last_sunday.png" alt="두 달마다 해당 월 첫 번째 및 마지막 일요일 평가를 위해 UI에서 사용하는 RRULE 구문" style="width:90%;" >}}

## 사용자 지정 일정을 사용하는 모니터의 경보 동작 {#alerting-behavior-of-monitors-with-custom-schedules}

기본 일정을 사용하는 모니터는 기본 평가 주기로 쿼리를 실행하고 모니터 상태 전환(예: 모니터가 WARN->OK, OK->ALERT로 변경되는 경우)에 따라 알림을 전송합니다.

아래 타임라인은 기본 일정을 사용하는 모니터의 동작을 보여줍니다. 모니터는 상태 변경에 따라 알림을 전송합니다.

{{< img src="monitors/guide/custom_schedules/alerting_behavior_regular.png" alt="30분 주기로 평가가 이루어지는 기본 일정에서 모니터 상태 전환 시 알림을 전송하는 시점을 제시하는 시각적 다이어그램입니다." style="width:100%;" >}}

반면 사용자 지정 일정을 사용하는 모니터는 매일, 매주, 매월 단위로 평가하며 개별 평가 결과를 기반으로 알림을 전송합니다. 각 평가는 이전 평가와 독립적으로 이루어지며 결과가 'OK'로 도출되지 않으면 알림을 전송합니다.

아래 타임라인은 사용자 지정 일정으로 실행되는 모니터의 동작을 보여줍니다. 기본 일정 모니터와 달리, 사용자 지정 일정 모니터는 평가 시간에 모니터 상태를 기준으로 알림을 전송합니다.
{{< img src="monitors/guide/custom_schedules/alerting_behavior_custom.png" alt="매일 평가가 이루어지는 사용자 지정 일정에서 모니터 상태를 기준으로 알림을 전송하는 시점을 제시하는 시각적 다이어그램입니다." style="width:100%;" >}}

## 그룹 보존 {#group-retention}

기본적으로 [그룹 보존][3]은 그룹이 보고를 중단한 후 24시간 또는 48시간 동안 유지되다가 모니터에서 제거됩니다. 사용자 지정 일정을 사용하는 모니터는 그룹을 훨씬 더 오래 보존하며, 보존 기간은 구성한 평가 빈도에 따라 달라집니다.
| 평가 빈도 | 그룹 보존 |
|-----------------------|------------------|
| 일간                 | 30일          |
| 주간                | 90일          |
| 월간               | 180일         |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://icalendar.org/rrule-tool.html
[2]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[3]: https://docs.datadoghq.com/ko/monitors/configuration/?tab=thresholdalert#group-retention-time