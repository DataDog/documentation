---
aliases:
- /ko/logs/faq/why-do-my-logs-not-have-the-expected-timestamp
further_reading:
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리하는 방법 배우기
- link: /logs/log_configuration/parsing
  tag: 설명서
  text: 파싱에 대해 배우기
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: FAQ
  text: 로그 파싱 문제를 탐색하는 방법
title: 로그에 올바른 타임스탬프가 나타나지 않음
---

기본적으로 Datadog 수신 API에서 로그를 수신할 때 타임스탬프가 생성되고, 이것이 날짜 속성으로 추가됩니다. 그러나 이 기본 타임스탬프가 로그에 포함되어 있는 실제 타임스탬프를 항상 반영하는 것은 아닙니다. 이 가이드에서는 기본 타임스탬프를 실제 타임스탬프로 재정의하는 방법을 설명합니다.

{{< img src="logs/guide/log_timestamp_1.png" alt="메시지에 있는 타임스탬프와 다른 로그 타임스탬프를 보여주는 로그 패널" style="width:70%;">}}

## 표시되는 타임스탬프

로그 타임스탬프는 로그 패널 상단 섹션에 있습니다. 타임스탬프는 UTC에 저장되고 사용자의 현지 시각대로 표시됩니다. 위 스크린샷에서는 현지 프로필이 `UTC+1`로 설정되었기 때문에 로그를 수신한 시간이 `11:06:16.807 UTC`로 표시된 것을 볼 수 있습니다.

시각대가 올바르지 않게 설정된 경우 타임스탬프가 예상 값과 다르게 표시될 수 있습니다. 이를 확인하려면 [Personal Settings > Preferences][1]로 이동해 **Time zone** 섹션을 확인하세요.

시각대가 올바르게 설정되었으면, 메시지에서 타임스탬프를 추출해 표시되는 로그 타임스탬프를 재정의합니다.

## 원시 로그

Datadog에서 원시 로그가 예상 타임스탬프로 나타나지 않을 경우, 원시 로그에서 올바른 로그 타임스탬프를 [추출]](#extract-the-timestamp-value-with-a-parser)하고 [다시 매핑](#define-a-log-date-remapper)하세요.

#### 파서로 타임스탬프 값 추출

1. [Logs Pipelines][2]으로 이동해 로그를 처리하는 파이프라인을 클릭하세요.
2. **Add Processor**를 클릭하세요.
3. 프로세서 유형에서 **Grok Parser**를 클릭하세요.
4. [date() matcher][3]를 사용해 날짜를 추출하고 커스텀 날짜 속성으로 전달하세요. 자세한 내용은 아래 예시와 [날짜 파싱 예시][4]를 참고하세요.

다음 로그 예시를 참고하세요.

```
2017-12-13 11:01:03 EST | INFO | (tagger.go:80 in Init) | starting the tagging system
```

다음과 같은 파싱 규칙을 추가합니다.

```
MyParsingRule %{date("yyyy-MM-dd HH:mm:ss z"):date} \| %{word:severity} \| \(%{notSpace:logger.name}:%{integer:logger.line}[^)]*\) \|.*
``` 

`MyParsingRule` 추출 출력:

```
{
  "date": 1513180863000,
  "logger": {
    "line": 80,
    "name": "tagger.go"
  },
  "severity": "INFO"
}
```

`date` 속성에서 `mytimestamp` 값을 저장합니다.

#### Log Date Remapper 정의하기

현재 로그 타임스탬프가 `date` 속성 값으로 재정의되도록 [Log Date Remapper][5]를 추가합니다. 

1. [Logs Pipelines][2]으로 이동하고 로그를 처리하는 파이프라인을 클릭하세요.
2. **Add Processor**를 클릭하세요.
3. 프로세서 유형에서 **Date remapper**를 선택하세요.
4. 프로세서 이름을 입력하세요.
5. 날짜 속성 섹션에 **date**를 추가하세요.
6. **Create**를 클릭합니다.

다음 로그가 `06:01:03 EST`에 생성되었고, `11:01:03 UTC`와 같으며, 12:01:03로 올바르게 표시되는 것을 볼 수 있습니다(표시 시각대는 UTC+1임).

{{< img src="logs/guide/log_timestamp_5.png" alt="올바른 타임스탬프를 나타내는 로그 패널" style="width:70%;" >}}

**참고**: 처리 작업이 모두 수집에서 진행되기 때문에 파이프라인에서 작업한 수정 사항은 새 로그에만 적용됩니다.

## JSON 로그

JSON 로그는 Datadog에서 자동으로 파싱됩니다. 로그 `date` 속성은 [예약된 속성][6]이기 때문에 JSON 로그가 프로세싱 작업을 통과합니다.

아래 예시에서 실제 로그 타임스탬프는 `Dec 13, 2017 at 14:16:45.158`이 아니라 `mytimestamp` 속성 값입니다.

{{< img src="logs/guide/log_timestamp_6.png" alt="메시지의 mytimestamp 속성 값과 다른 로그 타임스탬프를 보여주는 로그 패널" style="width:50%;">}}

### 지원하는 날짜 형식

현재 표시되는 로그 타임스탬프 값을 `mytimestamp` 속성 값으로 재정의하려면 날짜 속성으로 추가해야 합니다.

1. [Logs Pipeline][2]으로 이동하세요.
2. Preprocessing for JSON Logs 위에 마우스 커서를 올리고 연필 아이콘을 클릭하세요.
3. 날짜 속성 목록에 `mytimestamp`를 추가합니다. 목록에 나온 순서대로 날짜 리매퍼가 각 예약된 속성을 찾습니다. 날짜가 `mytimestamp` 속성에서 표시되도록 하려면 목록 첫 번째로 위치를 이동시키세요.
4. **Save**를 클릭합니다.

리매핑을 작동하려면 특정 날짜 형식에 맞춰야 합니다. 사용할 수 있는 날짜 형식은 [ISO8601][7], [UNIX (밀리초 EPOCH 형식)][8], [RFC3164][9]입니다.

그 외 날짜 형식을 사용한다면 [커스텀 날짜 형식](#custom-date-format)을 참고하세요.

**참고**: 처리 작업이 모두 수집에서 진행되기 때문에 파이프라인에서 작업한 수정 사항은 새 로그에만 적용됩니다.

### 커스텀 날짜 형식

기본적으로 지원되는 날짜 형식이 아닌 경우, [Grok 파서[5]를 이용해 날짜를 파싱한 다음 지원되는 형식으로 변환할 수 있습니다.

1. 로그를 처리하는 [파이프라인][2]으로 이동하세요. 해당 로그의 파이프라인이 아직 구성되지 않은 경우, 새 파이프라인을 생성하세요.
2. **Add Processor**를 클릭하세요.
3. 프로세서 유형에서 **Grok Parser**를 클릭하세요.
4. 내 날짜 형식에 맞게 파싱을 정의합니다. 자세한 내용은 [날짜 파싱 예시][5]를 참고하세요.
5. Advanced Settings 섹션에서 `Extract from`에 `mytimestamp`를 추가해 해당 파서가 커스텀 `mytimestamp` 속성에만 적용되도록 합니다.
6. **생성**을 클릭합니다.
7. [Log Date Remapper][5]를 추가해 새 로그에 올바른 타임스탬프가 매핑되도록 합니다.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/preferences
[2]: https://app.datadoghq.com/logs/pipelines/
[3]: /ko/logs/log_configuration/parsing
[4]: /ko/logs/log_configuration/parsing/#parsing-dates
[5]: /ko/logs/log_configuration/processors/?tabs=ui#log-date-remapper
[6]: /ko/logs/log_configuration/pipelines/?tab=date#preprocessing
[7]: https://www.iso.org/iso-8601-date-and-time-format.html
[8]: https://en.wikipedia.org/wiki/Unix_time
[9]: https://www.ietf.org/rfc/rfc3164.txt