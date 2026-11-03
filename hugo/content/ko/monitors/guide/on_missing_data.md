---
description: 메트릭 모니터에서 누락된 데이터를 더 잘 처리할 수 있도록 기존 No Data 구성에서 On Missing Data 옵션으로
  마이그레이션하세요.
further_reading:
- link: /api/latest/monitors/
  tag: API
  text: 모니터 API 설명서
title: On Missing Data 구성으로 마이그레이션하기
---
## 개요 {#overview}

메트릭 모니터는 누락된 데이터를 처리하기 위한 향상된 옵션을 제공하여 누락된 데이터를 실패 모드와 정상 상태로 구분할 수 있도록 합니다. 

이러한 옵션은 Logs, Events, CI, Database, Error Tracking 등 다른 모니터 유형에서 사용할 수 있는 옵션과 동일합니다.

## On Missing Data 옵션 사용의 이점 {#benefits-of-using-on-missing-data-options}

오류와 같은 불량 이벤트 수를 측정할 때 데이터가 탐지되지 않을 경우 모니터에 "OK"가 표시되어야 합니다. 기존 No Data 구성을 사용하면 모니터는 No Data를 보고했습니다. On Missing Data 구성 옵션을 사용하면 모니터가 상태를 더 정확하게 반영하므로 명확성을 향상시킬 수 있습니다.

## UI를 통해 관리되는 모니터 {#monitors-managed-through-the-ui}

UI에서 모니터를 관리하는 경우, 다음에 모니터를 편집할 때 구성이 자동으로 업데이트됩니다. On Missing Data 구성을 더 빨리 업데이트하려면 API를 통한 조정에 관한 다음 섹션을 참조하세요.

## API 또는 Terraform을 통해 관리되는 모니터 {#monitors-managed-through-the-api-or-terraform}

API 또는 Terraform으로 모니터를 관리하는 경우 `notify_no_data` 및 `no_data_timeframe`을 `on_missing_data`로 교체하세요. `on_missing_data`가 시간 창과 동일한 시간 프레임을 사용하므로 `no_data_timeframe` 파라미터는 필요하지 않습니다.  

### API 파라미터 {#api-parameters}

기존 No Data 파라미터인 `notify_no_data`는 기존 모니터에서 계속 사용할 수 있으며, 새로운 `on_missing_data` 기능으로 자동 업그레이드되지 않습니다.

| 파라미터                               | UI 설명                                                                                     |
|-----------------------------------------|----------------------------------------------------------------------------------------------------|
| `"on_missing_data": "show_and_notify_no_data"` | 데이터가 누락된 경우 {{< ui >}}Show NO DATA and notify{{< /ui >}}로 처리됩니다.<br>(이전 명칭: "{{< ui >}}Notify if data is missing{{< /ui >}}")                       |
| `"on_missing_data": "show_no_data"`     | 데이터가 누락된 경우 {{< ui >}}Show NO DATA{{< /ui >}}로 처리됩니다.<br>(이전 명칭: "{{< ui >}}Do not notify if data is missing{{< /ui >}}")                           |
| `"on_missing_data": "resolve"`          | 데이터가 누락된 경우 {{< ui >}}Show OK{{< /ui >}}로 처리됩니다.                                                                       |
| `"on_missing_data": "default"`(합계 또는 카운트 집계를 사용하는 경우) | 데이터가 누락된 경우 {{< ui >}}Evaluate as 0{{< /ui >}}으로 처리됩니다. (또는 기타 기본값)                                  |
| `"on_missing_data": "default"`(다른 모든 집계 유형을 사용하는 경우) | 데이터가 누락된 경우 {{< ui >}}Show last known status{{< /ui >}}로 처리됩니다. |

사용 가능한 모든 필드는 [API 설명서][1]를 참조하세요.

다음은 해당 필드를 사용하는 JSON 모니터의 변경 전후 예시입니다.

**변경 전**  
{{< highlight yaml "hl_lines=11-12" >}}{ 
  "name": "CPU usage is high for host $host.value",  
    "type": "query alert",  
    "query": "avg(last_5m):100 - avg:system.cpu.idle{$host} > 90",  
    "message": "A high CPU usage has been detected for host $host.value, which can impact the system performance.",  
    "tags": [],  
    "options": {  
        "thresholds": { "critical": 90 },  
        "notify_audit": false,  
        "include_tags": false,  
        "notify_no_data": true,  
        "no_data_timeframe": 10  
    }  
}
{{< /highlight >}}


**변경 후**  
{{< highlight yaml "hl_lines=11" >}}{
  "name": "CPU usage is high for host $host.value",  
    "type": "query alert",  
    "query": "avg(last_5m):100 - avg:system.cpu.idle{$host} > 90",  
    "message": "A high CPU usage has been detected for host $host.value, which can impact the system performance.",  
    "tags": [],  
    "options": {  
       "thresholds": { "critical": 90 },  
       "notify_audit": false,  
       "include_tags": false,  
       "on_missing_data": "show_and_notify_no_data"  
    }  
}  
{{< /highlight >}}

## 모니터 기반 SLO {#monitor-based-slos}

SLO는 다음 매핑에 따라 가동 시간과 가동 중지를 처리합니다.

| On Missing Data 구성 | 모니터 상태                 | SLO 처리 방식               |
|-------------------------------|--------------------------------|-----------------------------|
| {{< ui >}}Show OK{{< /ui >}}                       | OK                             | 가동 시간                      |
| {{< ui >}}Show No Data{{< /ui >}}                  | No Data                        | 가동 시간                      |
| {{< ui >}}Show No Data and Notify{{< /ui >}}       | No Data                        | 가동 중지                    |
| {{< ui >}}Show last known status{{< /ui >}}        | 마지막 상태              | OK인 경우, 가동 시간<br>Alert인 경우, 가동 중지 |
| {{< ui >}}Evaluate as zero{{< /ui >}}              | 임계값 구성에 따라 다름 | OK인 경우, 가동 시간<br>Alert인 경우, 가동 중지 |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/api/latest/monitors/