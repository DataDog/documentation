---
aliases:
- /ko/monitors/faq/how-to-update-anomaly-monitor-timezone
further_reading:
- link: /monitors/types/anomaly/
  tag: 설명서
  text: 이상 모니터 생성
- link: /monitors/notify/
  tag: 설명서
  text: 모니터 알림 설정
title: 현지 시간대를 고려하여 이상 감지 모니터를 업데이트하는 방법
---

Datadog 모니터는 기본적으로 현지 시간대를 추적하지 않는 UTC 시간을 사용합니다. 보유하고 있는 시스템 유형에 따라 해당 시간대에서 발생하는 현지 활동의 영향을 받을 수 있습니다. 예를 들어, 점심 급증으로 인해 한낮에 급증이 발생할 수 있으며, 이러한 급증은 예기치 않은 이상으로 감지될 수 있습니다. 현지 활동으로 인해 예상치 못한 이상이 발생하는 경우에는 현지 시간대를 고려하여 이상 감지 모니터를 업데이트하세요.

주별 또는 일별 계절성이 있는 민첩하거나 강력한 이상 감지 알고리즘을 사용하는 경우에는 API와 UI를 모두 사용하여 현지 시간대를 고려하도록 이상 감지 모니터를 업데이트할 수 있습니다.

현지 시간대를 고려하도록 설정되기 전 모니터의 예시는 다음과 같습니다.

{{< img src="monitors/guide/dst-off.png" alt="DST 추적 비활성화" >}}

일광 절약 시간을 고려한 모니터의 예시는 다음과 같습니다.

{{< img src="monitors/guide/dst-on.png" alt="DST 추적 활성화" >}}

## UI

UI에서 현지 시간대를 고려하여 이상 감지 모니터를 업데이트하려면 UI에서 [Create a new monitor][1] > [Anomaly monitor][2] 섹션으로 이동하세요. 섹션 3, 경고 조건 설정에서 고급 패널을 열고 모니터를 평가하는 동안 일광 절약을 고려하도록 토글합니다. 그런 다음 추적하려는 시간대와 일치하도록 시간대 드롭다운을 설정합니다.

{{< img src="monitors/guide/anomaly_monitor_timezone_ui.png" alt="UI의 DST 추적" >}}

## API

1.  모니터 API를 통해 업데이트를 요청하려면 다음 정보가 필요합니다.
  - 인증을 위한 [Datadog API 키 및 애플리케이션 키][3]
  - 이상 감지 모니터의 모니터 ID 및 쿼리:
    {{< img src="monitors/guide/anomaly_monitor_timezone.png" alt="모니터 ID 및 쿼리" >}}
  - 메트릭과 관련된 시간대의 TZ 식별 스트링(예: `America/New_York` 또는 `Europe/Paris`)입니다. [List of tz database time zones][4]의 TZ 열에서 원하는 시간대를 찾으세요(표준 형식 권장). <br><br>
2. 이상() 함수 호출에 `timezone` 인수를 추가하여 모니터 쿼리의 업데이트 버전을 만드세요.
  - 예를 들어, 뉴욕의 현지 시간을 사용하도록 위에 표시된 쿼리를 변경하려는 경우 쿼리는 다음과 같이 업데이트해야 합니다.

    ```
    avg(last_4h):anomalies(avg:system.cpu.user{role:trace-cassandra} by {host}, 'basic', 2, direction='both', alert_window='last_15m', interval=60, count_default_zero='true', timezone='America/New_York') >= 1
    ```

3. [Edit a Monitor][5] API를 사용하여 모니터 정의를 업데이트하세요.
  - 예시는 Python, Ruby 및 cURL에서 확인 가능합니다.
  - 기존 설정을 재정의하지 않도록 요청에 ID와 쿼리만 포함하세요. 이름, 메시지, 옵션 및 태그는 필요하지 않습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#/create
[2]: https://app.datadoghq.com/monitors#create/anomaly
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[5]: /ko/api/v1/monitors/#edit-a-monitor