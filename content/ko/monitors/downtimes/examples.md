---
aliases:
- /ko/monitors/guide/suppress-alert-with-downtimes
further_reading:
- link: monitors/downtimes/
  tag: 설명서
  text: 다운타임
- link: api/latest/downtimes/
  tag: 설명서
  text: 다운타임 API 레퍼런스
title: 예시
---

## 개요

다운타임을 활용하여 정기적인 유지 보수, 테스트, 오토 스케일링을 실행하는 동안 불필요한 알림을 제거할 수 있습니다.
또한, [다운타임 API][1]를 사용하여 고급 유지 보수 일정 형식을 관리하거나 클라우드 인스턴스 크기를 조정할 때 모니터를 동적으로 음소거할 수 있습니다.

이 가이드에는 다음 사용 사례의 다운타임 설정 방법이 설명되어 있습니다.

* [주말 중 다운타임](#주말-중-다운타임)
* [영업시간 외 다운타임](#영업시간-외-다운타임)
* [매월 n번째 평일에 반복되는 다운타임](#recurring-downtime-on-the-nth-weekday-of-the-month)


## 사전 필수 조건

본 지침은 API의 활용에 관해 다루고 있으므로, API 키와 관리자 권한이 있는 애플리케이션 키가 필요합니다. 자세한 내용은 [Datadog 계정 API 키 페이지][2]에서 확인하실 수 있습니다.
`<DATADOG_API_KEY>` 및 `<DATADOG_APP_KEY>`의 모든 항목을 사용자 Datadog API 키와 Datadog 애플리케이션 키로 각각 교체하세요.

본 가이드는 사용자가 `CURL`과 함께 터미널을 갖고 있으며, [다운타임 도움말 페이지][3]를 확인한 것으로 가정하고 작성되었습니다.

## 사용 사례

### 주말 중 다운타임

만약 기업의 ERP나 회계 소프트웨어처럼 주중에만 사용하는 서비스를 모니터링한다면, 주중에만 알림이 필요할 것입니다.
다음 API 호출을 사용하면 `env:prod` 태그에 해당하는 모든 모니터에 대해 주말 동안 알림을 끌 수 있습니다.

{{< tabs >}}
{{% tab "API " %}}

```shell
curl -X POST "https://api.<DATADOG_SITE>/api/v2/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"data":{"type":"downtime","attributes":{"monitor_identifier":{"monitor_tags":["*"]},"scope":"env:prod","display_timezone":"Europe/Berlin","message":"","mute_first_recovery_notification":false,"notify_end_types":["expired","canceled"],"notify_end_states":["alert","warn","no data"],"schedule":{"timezone":"Europe/Berlin","recurrences":[{"start":"2023-09-16T00:00","duration":"24h","rrule":"FREQ=WEEKLY;INTERVAL=1;BYDAY=SA,SU"}]}}}'
```

옵션으로 다운타임에 `message`을 추가하여 동료에게 다운타임 생성 이유와 목적을 알릴 수 있습니다(예: `Muting all monitors in production environment over the weekend`).

플레이스홀더 값 `<DATADOG_SITE>`를 Datadog 계정의 사이트 파라미터로 교체합니다. [Datadog 사이트][1] 문서를 참조하세요. `start`와 `end` 파라미터를 원하는 일정에 맞게 변경합니다. 예시:

* `start=$(date +%s)`
* `end=$(date -v+24H +%s)`

그리고 cURL 명령에서 `"start": '"${start}"'`를 입력하세요.

**응답:**

```json
{
  "data": {
    "id": "16d09s97-1a70-11ee-8319-dasan1997",
    "type": "downtime",
    "attributes": {
      "scope": "env:prod",
      "canceled": null,
      "schedule": {
        "current_downtime": {
          "start": "2023-09-16T22:00:00+00:00",
          "end": "2023-09-17T22:00:00+00:00"
        },
        "timezone": "Europe/Berlin",
        "recurrences": [
          {
            "start": "2023-09-16T00:00",
            "duration": "24h",
            "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=SA,SU"
          }
        ]
      },
      "notify_end_states": ["warn", "alert", "no data"],
      "monitor_identifier": { "monitor_tags": ["*"] },
      "status": "scheduled",
      "display_timezone": "Europe/Berlin",
      "notify_end_types": ["canceled", "expired"],
      "created": "2023-07-04T13:41:06.855440+00:00",
      "modified": "2023-07-04T13:41:06.855440+00:00",
      "mute_first_recovery_notification": false,
      "message": ""
    },
    [..]
  },
  [..]
}

```

[1]: https://docs.datadoghq.com/ko/getting_started/site
{{% /tab %}}
{{% tab "UI" %}}

[다운타임 페이지 관리][1]를 열어 새 다운타임을 일정을 설정합니다. `recurring`을 선택합니다.

{{< img src="monitors/guide/downtimes_weekend.png" alt="주말 동안 경고를 음소거하기 위해 반복 일정을 사용하여 다운타임 설정" style="width:100%;" >}}

[1]: https://app.datadoghq.com/monitors#downtime
{{% /tab %}}
{{< /tabs >}}

### 영업시간 외 다운타임

동일한 예시를 활용하여 주중에도 영업시간 외에는 해당 기능을 중지하는 것이 좋습니다.

{{< tabs >}}
{{% tab "API " %}}

다음의 API 호출을 통해 중에는 오후 8시부터 오전 6시까지 경고를 중지할 수 있습니다.

```shell
curl -X POST "https://api.<DATADOG_SITE>/api/v1/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"data":{"type":"downtime","attributes":{"monitor_identifier":{"monitor_tags":["*"]},"scope":"env:prod","display_timezone":"Europe/Berlin","message":"","mute_first_recovery_notification":false,"notify_end_types":["expired","canceled"],"notify_end_states":["alert","warn","no data"],"schedule":{"timezone":"Europe/Berlin","recurrences":[{"start":"2023-07-10T18:00","duration":"12h","rrule":"FREQ=DAILY;INTERVAL=1"}]}}}}'
```

옵션으로 다운타임에 `message`를 추가하여 동료에게 다운타임 생성 이유와 목적을 알릴 수 있습니다. 플레이스홀더 값  `<DATADOG_SITE>`을  Datadog 계정의 사이트 파라미터로 교체하려면 [Datadog 사이트][1] 문서를 참조하세요. `start` 및 `end` 파라미터를 원하는 일정에 맞게 변경합니다.

**응답:**

```json
{
  "data": {
    "type": "downtime",
    "id": "16d09s97-1a70-11ee-8319-dasan1997",
    "attributes": {
      "message": "",
      "mute_first_recovery_notification": false,
      "canceled": null,
      "scope": "env:prod",
      "monitor_identifier": { "monitor_tags": ["*"] },
      "modified": "2023-07-05T08:12:17.145771+00:00",
      "created": "2023-07-05T08:12:17.145771+00:00",
      "status": "scheduled",
      "display_timezone": "Europe/Berlin",
      "schedule": {
        "recurrences": [
          {
            "duration": "12h",
            "rrule": "FREQ=DAILY;INTERVAL=1",
            "start": "2023-07-10T18:00"
          }
        ],
        "current_downtime": {
          "end": "2023-07-11T04:00:00+00:00",
          "start": "2023-07-10T16:00:00+00:00"
        },
        "timezone": "Europe/Berlin"
      },
      "notify_end_states": ["alert", "warn", "no data"],
      "notify_end_types": ["canceled", "expired"]
    },
    [..]
  },
  [..]
}
```

[1]: https://docs.datadoghq.com/ko/getting_started/site
{{% /tab %}}
{{% tab "UI" %}}

[다운타임 페이지 관리][1]를 열어 새 다운타임을 일정을 설정합니다. `recurring`을 선택합니다.

{{< img src="monitors/guide/downtime_businesshour.png" alt="영업 시간 외에는 경고를 음소거하기 위해 반복 일정을 사용하여 다운타임 설정" style="width:100%;" >}}

[1]: https://app.datadoghq.com/monitors#downtime
{{% /tab %}}
{{< /tabs >}}

### 영업 시간 및 및 주말 외의 경우 다운타임 통합

영업 시간에만 모니터링 알림을 사용하려면 주중 및 주말에도 모니터링을 음소거합니다. 이를 다운타임 하나로 결합할 수 있습니다. 위의 [영업 시간 외 다운타임](#downtime-outside-of-business-hours) 예에서 계속 이어집니다.

{{< tabs >}}
{{% tab "API " %}}

다음의 API 호출을 통해 주말 내내와 주중에는 오후 8시부터 오전 6시까지 경고를 중지할 수 있습니다.

```bash
curl -X POST "https://api.<DATADOG_SITE>/api/v1/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"data":{"type":"downtime","attributes":{"monitor_identifier":{"monitor_tags":["*"]},"scope":"env:prod","display_timezone":"Europe/Berlin","message":"","mute_first_recovery_notification":false,"notify_end_types":["expired","canceled"],"notify_end_states":["alert","warn","no data"],"schedule":{"timezone":"Europe/Berlin","recurrences":[{"start":"2023-07-09T18:00","duration":"12h","rrule":"FREQ=WEEKLY;INTERVAL=1;BYDAY=SU,MO,TU,WE,TH,FR"},{"start":"2023-07-09T00:00","duration":"24h","rrule":"FREQ=WEEKLY;INTERVAL=1;BYDAY=SA,SU"}]}}}'
```
옵션으로 다운타임에 `message`를 추가하여 동료에게 다운타임 생성 이유와 목적을 알릴 수 있습니다. 플레이스홀더 값  `<DATADOG_SITE>`을  Datadog 계정의 사이트 파라미터로 교체하려면 [Datadog 사이트][1] 문서를 참조하세요. `start` 및 `end` 파라미터를 원하는 일정에 맞게 변경합니다.

**응답:**

```json
{
  "data": {
    "type": "downtime",
    "id": "16d09s97-1a70-11ee-8319-dasan1997",
    "attributes": {
      "monitor_identifier": { "monitor_tags": ["*"] },
      "created": "2023-07-05T08:36:00.917977+00:00",
      "message": "",
      "schedule": {
        "current_downtime": {
          "start": "2023-07-08T22:00:00+00:00",
          "end": "2023-07-10T04:00:00+00:00"
        },
        "timezone": "Europe/Berlin",
        "recurrences": [
          {
            "start": "2023-07-09T18:00",
            "duration": "12h",
            "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=SU,MO,TU,WE,TH,FR"
          },
          {
            "start": "2023-07-09T00:00",
            "duration": "24h",
            "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=SA,SU"
          }
        ]
      },
      "notify_end_states": ["alert", "warn", "no data"],
      "status": "scheduled",
      "scope": "env:prod",
      "modified": "2023-07-05T08:36:00.917977+00:00",
      "mute_first_recovery_notification": false,
      "notify_end_types": ["expired", "canceled"],
      "display_timezone": "Europe/Berlin",
      "canceled": null
    },
    [..]
  },
  [..]
}
```

[1]: https://docs.datadoghq.com/ko/getting_started/site
{{% /tab %}}
{{% tab "UI" %}}

[다운타임 페이지 관리][1]를 열어 새 다운타임을 추가하세요. `recurring`을 선택합니다.

{{< img src="monitors/guide/downtime_business_hour_weekend.png" alt="영업 시간 외 및 주말 내내 경고를 음소거하기 위해 반복 일정을 사용하여 다운타임 설정" style="width:100%;" >}}

[1]: https://app.datadoghq.com/monitors#downtime
{{% /tab %}}
{{< /tabs >}}

### 매월 n번째 평일에 반복되는 다운타임

RRULE을 사용하여 고급 유지 보수를 계획할 수 있습니다.

RRULE(또는 반복 규칙)은 반복 이벤트를 정의하기 위한 표준인 [iCalendar RFC][4]의 속성 이름입니다.

`RRULE`에서 기간을 지정하는 속성은 지원되지 않으며(예를 들어, `DTSTART`, `DTEND`, `DURATION`), 가능한 속성을 확인하려면 [RFC][4]를 참고하세요. [이 도구][5]를 활용하여 RRULE을 생성하고 API 호출에 붙여 넣을 수 있습니다.

**예시**: ERP 앱은 매월 두 번째 화요일 오전 8시에서 10시 사이에 업데이트되어 패치 및 수정 사항을 적용합니다. 여기에 사용될 모니터는 `app:erp`로 지정되며, 해당 모니터들은 다운타임 범위에 사용됩니다.

{{< tabs >}}
{{% tab "API " %}}

`start` 및 `end` 파라미터는 반복 규칙 첫째 날의 예상 시작 및 종료 시점과 일치해야 합니다. 따라서, 해당 규칙의 처음 돌아오는 두 번째 화요일이 7월 11일 화요일이라고 가정한다면, 시작 날짜는 7월 11일 오전 8시여야 하고 지속 시간은 2시간으로 설정해야 합니다.

**API 호출:**

```bash
curl -X POST "https://api.<DATADOG_SITE>/api/v1/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"data":{"type":"downtime","attributes":{"monitor_identifier":{"monitor_tags":["*"]},"scope":"env:prod","display_timezone":"Europe/Berlin","message":"","mute_first_recovery_notification":false,"notify_end_types":["expired","canceled"],"notify_end_states":["alert","warn","no data"],"schedule":{"timezone":"Europe/Berlin","recurrences":[{"start":"2023-07-11T08:00","duration":"2h","rrule":"FREQ=DAILY;INTERVAL=1;BYDAY=2TU"}]}}}'
```

플레이스홀더 값 `<DATADOG_SITE>`를 Datadog 계정의 사이트 파라미터로 교체합니다. [Datadog 사이트][1] 문서를 참조하세요. `start`와 `end` 파라미터를 원하는 일정에 맞게 변경합니다.

**응답:**

```json
{
  "data": {
    "type": "downtime",
    "id": "16d09s97-1a70-11ee-8319-dasan1997",
    "attributes": {
      "mute_first_recovery_notification": false,
      "notify_end_types": ["canceled", "expired"],
      "created": "2023-07-05T08:50:19.678427+00:00",
      "display_timezone": "Europe/Berlin",
      "modified": "2023-07-05T08:50:19.678427+00:00",
      "status": "scheduled",
      "canceled": null,
      "notify_end_states": ["warn", "alert", "no data"],
      "message": "",
      "schedule": {
        "recurrences": [
          {
            "duration": "2h",
            "start": "2023-07-11T08:00",
            "rrule": "FREQ=DAILY;INTERVAL=1;BYDAY=2TU"
          }
        ],
        "current_downtime": {
          "end": "2023-07-11T08:00:00+00:00",
          "start": "2023-07-11T06:00:00+00:00"
        },
        "timezone": "Europe/Berlin"
      },
      "scope": "env:prod",
      "monitor_identifier": { "monitor_tags": ["*"] }
    },
    [..]
  },
  [..]
}
```

[1]: https://docs.datadoghq.com/ko/getting_started/site
{{% /tab %}}
{{% tab "UI" %}}

[다운타임 페이지 관리][1]를 열어 새 다운타임을 추가하세요. `recurring`를 선택하고 `Use RRULE`를 선택합니다.

{{< img src="monitors/downtimes/downtime_guide_rrule.png" alt="매달 둘째 주 화요일에 경고를 음소거하기 위해 반복 RRULE 일정을 사용하여 다운타임 설정" style="width:100%;">}}

[1]: https://app.datadoghq.com/monitors#downtime
{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/api/v2/downtimes/
[2]: https://docs.datadoghq.com/ko/api/v1/authentication/
[3]: https://docs.datadoghq.com/ko/monitors/downtimes/
[4]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[5]: https://icalendar.org/rrule-tool.html