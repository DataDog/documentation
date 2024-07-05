---
title: 로그 트러블슈팅
---

Datadog Logs에서 예기치 않은 동작이 발생하는 경우 조사할 수 있는 몇 가지 일반적인 문제가 있으며 이 가이드는 문제를 신속하게 해결하는 데 도움이 될 수 있습니다. 문제가 계속되면 [Datadog 지원팀][1]에 문의하여 추가 지원을 받으세요.

## 로그 누락 - 로그 일일 할당량에 도달함

로그 설정을 변경하지 않았지만 [Logs Explorer][2]에 오늘의 로그가 누락된 것으로 표시됩니다. 일일 할당량에 도달했기 때문에 이런 일이 발생할 수 있습니다.

{{< img src="logs/troubleshooting/daily_quota_reached.png" alt="누락된 로그를 보여주는 막대 그래프와 일일 할당량에 도달했다는 메시지" style="width:90%" >}}

할당량 설정, 업데이트 또는 제거에 대한 자세한 내용은 [일일 할당량 설정][3]을 참조하세요.

## 로그 누락 - 수집 기간을 벗어난 타임스탬프

과거 18시간보다 이전의 타임스탬프가 있는 로그는 수집 시 삭제됩니다.
`datadog.estimated_usage.logs.drop_count` 메트릭의 영향을 받는 `service` 및 `source`를 확인하여 소스에서 문제를 해결하세요.

## JSON 로그에서 타임스탬프 키를 파싱할 수 없음

JSON 로그의 타임스탬프를 Datadog에 삽입하기 전에 [인식된 날짜 형식][4]으로 변환할 수 없는 경우 다음 단계에 따라 Datadog의 [산술 프로세서][5] 및 [로그 날짜 리매퍼][6]를 사용하여 타임스탬프를 변환하고 매핑하세요.

1. **Logs > Configuration**으로 이동합니다.

2. **Pipelines**에서 **Preprocessing for JSON logs** 위에 마우스 커서를 올린 후 연필 아이콘을 클릭합니다. 

3. 예약된 속성 매핑 목록에서 `timestamp`를 제거합니다. 전처리 중에 속성이 로그의 공식 타임스탬프로 파싱되지 않습니다.

{{< img src="logs/troubleshooting/preprocessing_json_timestamp.png" alt="기본적으로 타임스탬프를 포함하는 날짜 속성이 있는 JSON 로그 전처리 설정 박스" style="width:90%" >}}

2. 수식이 타임스탬프에 1000을 곱하여 밀리초로 변환하도록 [산술 프로세서][5]를 설정합니다. 수식의 결과가 새로운 속성이 됩니다.

3. 새 속성을 공식 타임스탬프로 사용하려면 [로그 날짜 리매퍼][6]를 설정하세요.

매핑된 타임스탬프가 포함된 새 JSON 로그를 보려면 [Logs Explorer][2]로 이동하세요.

## 잘린 로그

1MB를 초과하는 로그는 잘립니다.
`datadog.estimated_usage.logs.truncated_count` 및 `datadog.estimated_usage.logs.truncated_bytes` 메트릭의 영향을 받는 `service` 및 `source`를 확인하여 소스에서 문제를 해결하세요.

[1]: /ko/help/
[2]: https://app.datadoghq.com/logs
[3]: /ko/logs/log_configuration/indexes/#set-daily-quota
[4]: /ko/logs/log_configuration/pipelines/?tab=date#date-attribute
[5]: /ko/logs/log_configuration/processors/?tab=ui#arithmetic-processor
[6]: /ko/logs/log_configuration/processors/?tab=ui#log-date-remapper