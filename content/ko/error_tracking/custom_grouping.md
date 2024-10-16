---
description: 오류 스팬(span)을 이슈로 그룹화하는 방법을 사용자 지정합니다.
title: 커스텀 그룹화
---

## 개요

오류 추적은 [기본 전략][5]을 사용해 지능적으로 유사한 오류를 이슈로 그룹화합니다. _커스텀 핑거프린팅_을 사용해 그룹화 결정을 완벽히 통제하고 오류 스팬(span)의 그룹화 작업을 사용자 지정할 수 있습니다.

오류에 `error.fingerprint`을 제공하여 그룹화를 사용자 지정할 수 있습니다. 오류의 소스에 따라 핑거프린트가 속성 또는 태그에 적용됩니다(자세한 내용은 [설정](#setup) 참조). `error.fingerprint` 값의 경우 특별한 형식이나 요구 사항은 없으나 내용은 반드시 문자열이어야 합니다.

`error.fingerprint`이 제공된 경우 그룹화 행동은 이러한 규칙을 따릅니다.

* 커스텀 그룹화는 기본 전략보다 우선됩니다.
* 커스텀 그룹화는 오류 하위 집합에만 적용할 수 있으며 기본 전략과 공동으로 존재할 수 있습니다.
* `error.fingerprint` 내용은 수정 없이 그대로 사용됩니다.
* 동일한 서비스의 오류가 동일한 `error.fingerprint` 속성을 가지고 있는 경우 동일한 이슈로 그룹화됩니다.
* 각기 다른 `service` 속성의 오류는 서로 다른 이슈로 그룹화됩니다.

## 설정

### APM
커스텀 그룹화 작업에는 오류 스팬(span) 및 `error.fingerprint` 문자열 스팬(span) 태그만 필요합니다.

Datadog으로 애플리케이션 성능 모니터링(APM) 트레이스를 수집하지 않는 경우 [애플리케이션 성능 모니터링(APM) 문서][1]를 참조하여 애플리케이션 성능 모니터링(APM)을 설정합니다.

#### 예시

이미 애플리케이션 성능 모니터링(APM) 스팬(span)을 전송한다면 오류 스팬(span)에 신규 `error.fingerprint` 태그를 추가하세요.

다음은 파이썬(Python)의 예시입니다.

```python
with tracer.trace("throws.an.error") as span:
  span.set_tag('error.fingerprint', 'my-custom-grouping-material')
  raise Exception("Something went wrong")
```

예외 정보가 캡처되며, 예외 발생 시 활성화되었다면 스팬(span)에 첨부됩니다.
이 경우 `my-custom-grouping-material`을 사용하여 해당 오류 스팬(span)을 오류 추적의 단일
이슈로 그룹화합니다.

### 로그 관리
커스텀 그룹화 작업에는 오류 로그 및 `error.fingerprint` 문자열 속성만 필요합니다.

Datadog으로 로그를 수집하지 않는 경우 [로그 관리 문서][2]를 참조하여 로그를 설정합니다.

`source` 태그(언어 지정)가 올바르게 설정되었는지 확인합니다.

#### 예시

이미 JSON 형식으로 로깅한다면 오류 로그에 신규 `error.fingerprint` 속성을 추가하세요.

다음은 JSON 형식 로거에 대한 파이썬(Python) 예시입니다.

```python
import logging
import json_log_formatter

formatter = json_log_formatter.JSONFormatter()

json_handler = logging.FileHandler(filename='/var/log/my-log.json')
json_handler.setFormatter(formatter)

logger = logging.getLogger('my_json')
logger.addHandler(json_handler)
logger.setLevel(logging.INFO)

logger.error('Error processing request', extra={'error.fingerprint': 'my-custom-grouping-material'})
```

이 경우, `my-custom-grouping-material`은 오류 추적에서  해당 오류 로그를 단일
이슈로 그룹화하는 데 사용됩니다.

#### 모바일 예시

Datadog 모바일 SDK에서는 다음과 같이 로그 요청에 사전 정의된 속성을 추가하여 에러를 로깅할 때
커스텀 오류 핑거프린트를 추가할 수 있습니다.

{{< tabs >}}
{{% tab "iOS" %}}
커스텀 그릅화를 사용하려면 Datadog iOS SDK `2.8.1` 버전 이상이 필요합니다.

```swift
let errorFingerprint = "my-custom-grouping-material"
logger.error(
  "My error message",
  error: error,
  attributes: [
    Logs.Attributes.errorFingerprint: errorFingerprint
  ]
)
```
{{% /tab %}}

{{% tab "Android" %}}
커스텀 그릅화를 사용하려면 Datadog Android SDK `2.7.0` 버전 이상이 필요합니다.

```kotlin
val errorFingerprint = "my-custom-grouping-material"
val attributes = mapOf(LogAttributes.ERROR_FINGERPRINT to errorFingerprint)
logger.e("My error message", error, attributes)
```
{{% /tab %}}

{{% tab "Flutter" %}}
커스텀 그릅화를 사용하려면 Datadog Flutter SDK `2.4.0` 버전 이상이 필요합니다.

```dart
final errorFingerprint = "my-custom-grouping-material";
logger.error(
  'My error message',
  errorStackTrace: st,
  attributes {
    DatadogAttributes.errorFingerprint: "my-custom-grouping-material",
  }
);
```
{{% /tab %}}
{{< /tabs >}}

또는 다음과 같이 로그 매퍼(mapper)에서 핑거프린트를 추가하거나 조정할 수 있습니다.

{{< tabs >}}
{{% tab "iOS" %}}
커스텀 그릅화를 사용하려면 Datadog iOS SDK `2.8.1` 버전 이상이 필요합니다.

```swift
let logsConfiguration = Logs.Configuration(
  eventMapper: { log in
      var log = log
      log.error?.fingerprint = "my-custom-grouping-material"
      return log
  }
)
Logs.enable(
  with: logsConfiguration
)
```
{{% /tab %}}

{{% tab "Android" %}}
커스텀 그릅화를 사용하려면 Datadog Android SDK `2.7.0` 버전 이상이 필요합니다.

```kotlin
val mapper = object : EventMapper<LogEvent> {
    override fun map(event: LogEvent): LogEvent {
        event.fingerprint = "my-custom-grouping-material"
        return event
    }
}
val logsConfiguration = LogsConfiguration.Builder()
    .setEventMapper(mapper)
    .build()
Logs.enable(logsConfiguration)
```
{{% /tab %}}

{{% tab "Flutter" %}}
커스텀 그릅화를 사용하려면 Datadog Flutter SDK `2.4.0` 버전 이상이 필요합니다.

```dart
LogEvent? mapLogEvent(LogEvent event) {
  event.error?.fingerprint = "my-custom-grouping-material";
  return event;
}

final loggingConfiguration = DatadogLoggingConfiguration(
  eventMapper: mapLogEvent,
);

final configuration = DatadogConfiguration(
    // ...
    loggingConfiguration: loggingConfiguration,
);
```
{{% /tab %}}
{{< /tabs >}}

### RUM

#### 예시
Datadog을 사용해 브라우저 RUM 이벤트를 수집하지 않는다면 [RUM 브라우저 모니터링 설정 설명서][3]나 [RUM 모바일 및 TV 모니터링 설정 설명서][4]를 참조하세요.

{{< tabs >}}
{{% tab "Browser" %}}
커스텀 그룹화를 사용하려면 Datadog 브라우저 SDK [v4.42.0 이상][2] 버전, [브라우저 RUM 오류][1] 및 추가 문자열 속성이 필요합니다.

이미 [브라우저 오류를 수집하고 있다면][1] 다음 중 하나를 사용해 속성을 추가할 수 있습니다.

* 오류 개체에 `dd_fingerprint` 속성 추가:

```javascript
import { datadogRum } from '@datadog/browser-rum';
// Send a custom error with context
const error = new Error('Something went wrong');
error.dd_fingerprint = 'my-custom-grouping-fingerprint'
datadogRum.addError(error);
```

* 또는 `error.fingerprint` 속성으로 `beforeSend` 콜백을 사용합니다.

```javascript
DD_RUM.init({
  ...
  beforeSend: () => {
    if (event.type === 'error') {
      event.error.fingerprint = 'my-custom-grouping-fingerprint'
    }
  },
})
```

모든 경우 `my-custom-grouping-material`은 오류 추적에서 브라우저 RUM 오류를 단일 이슈로 그룹화하는 데 사용됩니다.

[1]: /ko/real_user_monitoring/browser/collecting_browser_errors/
[2]: https://github.com/DataDog/browser-sdk/releases/tag/v4.42.0
{{% /tab %}}

{{% tab "iOS" %}}
커스텀 그릅화를 사용하려면 Datadog iOS SDK `2.8.1` 버전 이상이 필요합니다.

오류 수동 보고 시 커스텀 핑거프린트를 추가하려면, 다음과 같이 `addError`을 호출할 때 사전 정의된 속성을 추가합니다.

```swift
RUMMonitor.shared().addError(
  message: "My error message",
  source: .source,
  attributes: [
    RUM.Attributes.errorFingerprint: "my-custom-grouping-fingerprint"
  ]
)
```

또는 다음과 같이 `errorEventMapper`을 사용할 수 있습니다.

```swift
var config = RUM.Configuration(applicationID: "rum-application-id")
config.errorEventMapper = { errorEvent in
  var errorEvent = errorEvent
  errorEvent.error.fingerprint = "my-custom-grouping-fingerprint"
  return errorEvent
}
RUM.enable(with: config)
```

{{% /tab %}}

{{% tab "Android" %}}
커스텀 그릅화를 사용하려면 Datadog Android SDK `2.7.0` 버전 이상이 필요합니다.

오류 수동 보고 시 커스텀 핑거프린트를 추가하려면, 다음과 같이 `addError`을 호출할 때 사전 정의된 속성을 추가합니다.

```kotlin
GlobalRumMonitor.get().addError(
  "My error message",
  RumErrorSource.SOURCE,
  exception,
  mapOf(
    RumAttributes.ERROR_CUSTOM_FINGERPRINT to "my-custom-grouping-fingerprint"
  )
)
```

또는 다음과 같이 `errorEventMapper`을 사용할 수 있습니다.

```kotlin
val rumConfiguration = RumConfiguration.Builder("rum-application-id")
  .setErrorEventMapper(object : EventMapper<ErrorEvent> {
    override fun map(event: ErrorEvent): ErrorEvent {
        event.error.fingerprint = "my-custom-grouping-fingerprint"
        return event
    }
  }).build()
RUM.enable(rumConfiguration)
```

{{% /tab %}}

{{% tab "Flutter" %}}
커스텀 그릅화를 사용하려면 Datadog Flutter SDK `2.4.0` 버전 이상이 필요합니다.

오류 수동 보고 시 커스텀 핑거프린트를 추가하려면, 다음과 같이 `addError`을 호출할 때 사전 정의된 속성을 추가합니다.

```dart
final rum = DatadogSdk.instance.rum;
rum?.addErrorInfo("My error message",
  RumErrorSource.source,
  attributes: {
    DatadogAttributes.errorFingerprint: 'my-custom-grouping-fingerprint',
  },
);
```

또는 다음과 같이 `errorEventMapper`을 사용할 수 있습니다.

```dart
RumErrorEvent? mapRumErrorEvent(RumErrorEvent event) {
  event.error.fingerprint = "my-custom-grouping-fingerprint";
  return event;
}

final rumConfiguration = DatadogRumConfiguration(
  // ...
  errorEventMapper: mapRumErrorEvent,
);

final configuration = DatadogConfiguration(
    // ...
    rumConfiguration: rumConfiguration,
);
```
{{% /tab %}}
{{< /tabs >}}

[1]: /ko/tracing/
[2]: /ko/logs/log_collection/
[3]: /ko/real_user_monitoring/browser/
[4]: /ko/real_user_monitoring/mobile_and_tv_monitoring/setup
[5]: /ko/error_tracking/default_grouping