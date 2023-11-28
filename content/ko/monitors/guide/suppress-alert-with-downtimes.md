---
aliases:
- /ko/monitors/guide/supress-alert-with-downtimes
further_reading:
- link: api/v1/downtimes/
  tag: 설명서
  text: 다운타임 API 레퍼런스
- link: /monitors/downtimes/
  tag: 설명서
  text: 다운타임 문서화
kind: 가이드
title: 다운타임을 이용한 경고 중지
---


## 개요

다운타임을 활용하여 정기적인 유지 보수, 테스트, 오토 스케일링을 실행하는 동안 불필요한 알림을 제거할 수 있습니다.
또한, [다운타임 API][1]를 사용하여 고급 유지 보수 일정 형식을 관리하거나 클라우드 인스턴스 크기를 조정할 때 모니터를 동적으로 음소거할 수 있습니다.

이 가이드에는 다음 사용 사례의 다운타임 설정 방법이 설명되어 있습니다.

* [주말 중 다운타임](#주말-중-다운타임)
* [영업시간 외 다운타임](#영업시간-외-다운타임)
* [매월 n번째 평일에 반복되는 다운타임](#recurring-downtime-on-the-nth-weekday-of-the-month)

## 전제 조건

본 가이드가 API의 활용에 관해 다루고 있으므로, API 키와 관리자 권한이 있는 애플리케이션 키가 필요합니다. 자세한 내용은 [Datadog 계정 API 키 페이지][2]에서 확인하실 수 있습니다.
`<DATADOG_API_KEY>` 및 `<DATADOG_APP_KEY>`의 모든 항목을 사용자 Datadog API 키와 Datadog 애플리케이션 키로 각각 교체하세요.

본 가이드는 사용자가 `CURL`과 함께 터미널을 갖고 있으며, [다운타임 도움말 페이지][3]를 확인한 것으로 가정하고 작성되었습니다.

## 예시

### 주말 중 다운타임

만약 기업의 ERP나 회계 소프트웨어처럼 주중에만 사용하는 서비스를 모니터링한다면, 주중에만 알림이 필요할 것입니다.
다음 API 호출을 사용하면 `env:prod` 태그에 해당하는 모든 모니터에 대해 주말 동안 알림을 끌 수 있습니다.

{{< tabs >}}
{{% tab "API " %}}

```bash
curl -X POST "https://api.<DATADOG_SITE>/api/v1/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"scope": "env:prod","start":"1613779200","end":"1613865599", "recurrence": {"type": "weeks","period": 1,"week_days": ["Sat","Sun"]}}'
```

플레이스홀더 값 `<DATADOG_SITE>`를 {{< region-param key="dd_site" code="true" >}}로 교체합니다. 그리고 `start`와 `end` 매개 변수를 원하는 일정에 맞게 변경합니다. 예시:

* `start=$(date +%s)`
* `end=$(date -v+24H +%s)`

그리고 cURL 명령에서 `"start": '"${start}"'`를 입력하세요.

**응답:**

```json
{
    "recurrence": {
        "until_date": null,
        "until_occurrences": null,
        "week_days": ["Sat", "Sun"],
        "type": "weeks",
        "period": 1
    },
    "end": 1613865599,
    "monitor_tags": ["*"],
    "child_id": null,
    "canceled": null,
    "monitor_id": null,
    "org_id": 1111111,
    "disabled": false,
    "start": 1613779200,
    "creator_id": 987654321,
    "parent_id": null,
    "timezone": "UTC",
    "active": false,
    "scope": ["env:prod"],
    "message": null,
    "downtime_type": 2,
    "id": 123456789,
    "updater_id": null
}
```

{{% /tab %}}
{{% tab "UI" %}}

[다운타임 페이지 관리][1]를 열어 새 다운타임을 추가하세요. 그리고 `recurring`을 선택하세요.

{{< img src="monitors/guide/downtimes_weekend.jpg" alt="주말 중 다운타임" style="width:60%;" >}}

[1]: https://app.datadoghq.com/monitors#downtime
{{% /tab %}}
{{< /tabs >}}

### 영업시간 외 다운타임

동일한 예시를 활용하여 주중에도 영업시간 외에는 해당 기능을 중지하는 것이 좋습니다.

다음의 API 호출을 통해 중에는 오후 8시부터 오전 6시까지 경고를 중지할 수 있습니다.

{{< tabs >}}
{{% tab "API " %}}

```bash
curl -X POST "https://api.<DATADOG_SITE>/api/v1/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"scope": "env:prod","start":"1613844000","end":"1613887200", "recurrence": {"type": "days","period": 1}}'
```
플레이스홀더 값 `<DATADOG_SITE>`를 {{< region-param key="dd_site" code="true" >}}로 교체합니다. 그리고 `start`와 `end` 매개 변수를 원하는 일정에 맞게 변경합니다.

**응답:**

```json
{
    "recurrence": {
        "until_date": null,
        "until_occurrences": null,
        "week_days": null,
        "type": "days",
        "period": 1
    },
    "end": 1613887200,
    "monitor_tags": ["*"],
    "child_id": null,
    "canceled": null,
    "monitor_id": null,
    "org_id": 1111111,
    "disabled": false,
    "start": 1613844000,
    "creator_id": 987654321,
    "parent_id": null,
    "timezone": "UTC",
    "active": false,
    "scope": ["env:prod"],
    "message": null,
    "downtime_type": 2,
    "id": 123456789,
    "updater_id": null
}
```

{{% /tab %}}
{{% tab "UI" %}}

[다운타임 페이지 관리][1]를 열어 새 다운타임을 추가하세요. `recurring`을 선택하세요.

{{< img src="monitors/guide/downtime_businesshour.jpg" alt="영업시간 외 다운타임" style="width:60%;" >}}

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

`type` 매개 변수는 반드시 `rrule`로 설정되어야 합니다.
`start` 및 `end` 매개 변수는 반복 규칙 첫째 날의 예상 시작 및 종료 시점과 일치해야 합니다. 따라서, 처음 돌아오는 두 번째 화요일이 3월 9일이라고 가정한다면, 시작 시점은 3월 9일 오전 8시여야 하고 종료 시점은 3월 9일 오전 10시여야 합니다:

**API 호출:**

```bash
curl -X POST "https://api.<DATADOG_SITE>/api/v1/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"scope": "app:erp","start":"1615276800","end":"1615284000", "recurrence": {"type":"rrule","rrule":"FREQ=MONTHLY;INTERVAL=1;BYDAY=2TU"}}'
```

플레이스 홀더 값 `<DATADOG_SITE>`를 {{< region-param key="dd_site" code="true" >}}로 대체하세요. 그리고 `start`와 `end`의 값을 당신이 원하는 일정으로 대체하세요.

**응답:**

```json
{
    "recurrence": {
        "type": "rrule",
        "rrule": "FREQ=MONTHLY;INTERVAL=1;BYDAY=2TU"
    },
    "end": 1615284000,
    "monitor_tags": ["*"],
    "child_id": null,
    "canceled": null,
    "monitor_id": null,
    "org_id": 1111111,
    "disabled": false,
    "start": 1615276800,
    "creator_id": 987654321,
    "parent_id": null,
    "timezone": "UTC",
    "active": false,
    "scope": ["app:erp"],
    "message": null,
    "downtime_type": 2,
    "id": 123456789,
    "updater_id": null
}
```

{{% /tab %}}
{{% tab "UI" %}}

[다운타임 페이지 관리][1]를 열어 새 다운타임을 추가하세요. `recurring`을 선택하세요.

{{< img src="monitors/downtimes/downtime_guide_rrule.jpg" alt="다운타임 반복 규칙" style="width:80%;">}}

[1]: https://app.datadoghq.com/monitors#downtime
{{% /tab %}}
{{< /tabs >}}

### 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/api/v1/downtimes/
[2]: https://docs.datadoghq.com/ko/api/v1/authentication/
[3]: https://docs.datadoghq.com/ko/monitors/downtimes/
[4]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[5]: https://icalendar.org/rrule-tool.html
