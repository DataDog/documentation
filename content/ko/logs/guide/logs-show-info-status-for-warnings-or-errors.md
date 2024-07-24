---
aliases:
- /ko/logs/faq/why-do-my-logs-show-up-with-an-info-status-even-for-warnings-or-errors
further_reading:
- link: /logs/guide/remap-custom-severity-to-official-log-status/
  tag: 설명서
  text: 공식 로그 상태에 커스텀 심각도 값을 리매핑하는 방법 알아보기
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리하는 방법 배우기
- link: /logs/log_configuration/parsing
  tag: 설명서
  text: 파싱에 대해 알아보기
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: 설명서
  text: 로그 파싱 문제를 탐색하는 방법 알아보기
title: 로그가 경고 또는 오류 정보 상태를 나타냄
---

## 개요

기본적으로 Datadog의 수신 API에서 로그를 수신할 때 `INFO` 상태가 생성되고, 이것이 `status` 속성으로 추가됩니다.

{{< img src="logs/guide/original_log.png" alt="로그 패널에 정보 상태가 표시되어 있으나 경고 메시지를 나타내는 로그가 있음" style="width:50%;">}}

기본 `status`에서 로그에 포함된 실제 상태를 항상 표시하지는 않습니다. 이 가이드에서는 기본 값을 실제 상태로 재정의하는 방법을 설명합니다.

## 원시 로그

Datadog에서 원시 로그가 올바른 상태를 나타나지 않을 경우, 원시 로그에서 올바른 로그 상태를 [추출](#extract-the-status-value-with-a-parser)하고 [다시 매핑](#define-a-log-status-remapper)하세요.

### 파서로 상태 값 추출

Grok 파서를 사용해 [`word()`][1]로 규칙을 정의하고 실제 로그 상태를 추출합니다.

1. [Logs Pipline][2]으로 이동하고 로그를 처리하는 파이프라인을 클릭하세요.
2. **Add Processor**를 클릭하세요.
3. 프로세서 유형에서 **Grok Parser**를 클릭하세요.
4. [`word()` matcher][1]를 사용해 상태를 추출한 후 커스텀 `log_status` 속성으로 전달합니다.

다음 로그 예시를 참고하세요.

```
WARNING: John disconnected on 09/26/2017
```

다음과 같은 규칙을 추가합니다.

```
MyParsingRule %{word:log_status}: %{word:user.name} %{word:action}.*
```

`MyParsingRule` 추출 출력:

```
{
  "action": "disconnected",
  "log_status": "WARNING",
  "user": {
    "name": "John"
  }
}
```

### 로그 상태 리매퍼 정의하기

`log_status` 속성에는 올바른 상태가 포함되어 있습니다. [Log Status remapper][3]를 추가해 기본 로그 상태가 항상 `log_status` 속성으로 재정의되도록 하세요.

1. [Logs Pipline][2]으로 이동하고 로그를 처리하는 파이프라인을 클릭하세요.
2. **Add Processor**를 클릭하세요.
3. 프로세서 유형에서 Status remapper를 선택하세요.
4. 프로세서 이름을 입력하세요.
5. 상태 속성 설정 섹션에 **log_status**를 추가하세요.
6. **생성**을 클릭합니다.

{{< img src="logs/guide/log_post_processing.png" alt="경고 심각도 속성 값과 일치하는 경고 상태 로그를 보여주는 로그 패널" style="width:50%;">}}

모든 처리 작업이 수신 처리 중에 완료되기 때문에 파이프라인 수정 사항은 새 로그에만 적용됩니다.

## JSON 로그

JSON 로그는 Datadog에서 자동으로 파싱됩니다. 로그 `status` 속성은 [예약된 속성][4]이기 때문에 JSON 로그가 사전 처리 작업을 통과합니다.

예를 들어, 실제 로그 상태는 기본 `INFO` 로그 상태가 아니라 `logger_severity` 속성 값입니다.

{{< img src="logs/guide/new_log.png" alt="정보 상태가 표시되어 있으나 logger_severity 속성 값이 오류인 로그를 보여주는 로그 패널" style="width:50%;">}}

기본 로그 상태를 `logger_severity` 속성 값으로 재정의하려면 `logger_severity`를 상태 속성에 추가하세요.

1. [Logs Pipline][2]으로 이동하고 로그를 처리하는 파이프라인을 클릭하세요.
2. Preprocessing for JSON Logs 위에 마우스 커서를 올리고 연필 아이콘을 클릭하세요.
3. 상태 속성 목록에 `logger_severity`를 추가합니다. 목록에 나온 순서대로 상태 리매퍼가 예약된 속성을 모두 찾습니다. 상태가 `logger_severity` 속성에서 표시되도록 하려면 목록 첫 번째로 위치를 이동시키세요.
4. **Save**를 클릭합니다.

{{< img src="logs/guide/new_log_remapped.png" alt="오류 logger_severity 속성 값과 일치하는 오류 상태 로그를 보여주는 로그 패널" style="width:50%;">}}

처리 작업이 수집 단계에서 모두 완료되기 때문에 수정 사항은 새 로그에만 적용됩니다. 새 로그는 `logger_severity` 속성 값에 따라 올바르게 구성됩니다.

리매핑을 올바르게 작동하려면 [프로세서 설명서][3]에 안내된 상태 형식에 따라야 합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_configuration/parsing
[2]: https://app.datadoghq.com/logs/pipelines/
[3]: /ko/logs/log_configuration/processors/#log-status-remapper
[4]: /ko/logs/log_configuration/attributes_naming_convention/#reserved-attributes