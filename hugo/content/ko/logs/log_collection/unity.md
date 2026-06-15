---
description: Unity 프로젝트에서 로그 데이터를 수집하세요.
further_reading:
- link: https://github.com/DataDog/dd-sdk-unity
  tag: 소스 코드
  text: dd-sdk-unity 소스 코드
- link: real_user_monitoring/reactnative/
  tag: 설명서
  text: 로그 탐색 방법 알아보기
title: Unity 로그 수집
---
[Datadog의 Unity 패키지][1]를 사용하여 Unity 애플리케이션에서 Datadog으로 로그를 보내고 다음 기능을 활용하세요.

* JSON 네이티브 형식으로 Datadog에 로깅합니다.
* 기본 설정으로 전송한 각 로그에 커스텀 속성을 추가합니다.
* 실제 클라이언트 IP 주소와 User-Agents를 기록합니다.
* 자동 대량 포스트로 네트워크 사용량을 최적화합니다.

## 설정

로그용 Datadog Unity SDK를 초기화하려면 [설정][2]을 참고하세요.

Datadog Unity SDK를 설정하면 SDK의 `DefaultLogger`를 사용하여 Datadog에 로그를 보낼 수 있습니다.

```cs
var logger = DatadogSdk.Instance.DefaultLogger;

logger.Debug("A debug message.");
logger.Info("Some relevant information?");
logger.Warn("An important warning...");
logger.Error("An error was met!");
```

"Forward Unity Logs" 옵션을 설정하면 Unity의 `Debug.Log*` 메서드를 사용하여 Unity로 전송된 로그가 자동으로 `DatadogSdk.Instance.DefaultLogger`로 전송됩니다.

`CreateLogger` 메서드를 사용하여 다양한 서비스와 이름으로 추가 로거를 만들 수도 있습니다.

```dart
var loggingOptions = new DatadogLoggingOptions()
{
    Service = "com.example.custom_service",
    Name = "Additional logger",
};
var logger = DatadogSdk.Instance.CreateLogger(loggingOptions);

logger.Info('Info from my additional logger.');
```

## 태그 관리

로거에 설정된 태그는 각 로거에 로컬 적용됩니다.

### 태그 추가

`DdLogger.AddTag` 메서드를 사용하면 특정 로거에서 보낸 모든 로그에 태그를 추가할 수 있습니다.

```cs
// 이렇게 하면 "build_configuration:debug" 태그가 추가됩니다.
logger.AddTag("build_configuration", "debug")
```

### 태그 제거

`DdLogger.RemoveTag` 메서드를 사용하면 특정 로거에서 보낸 모든 로그에서 태그를 제거할 수 있습니다.

```cs
// 이렇게 하면 "build_configuration"으로 시작하는 모든 태그가 제거됩니다.
logger.RemoveTag("build_configuration")
```

자세한 내용은 [태그 시작하기][3]를 참고하세요.

## 속성 관리

로거에 설정된 속성은 각 로거에 로컬 적용됩니다.

### 기본 속성

기본적으로 로거에서 보낸 로그 전체에 다음 속성이 추가됩니다.

* `http.useragent` 및 추출 `device`와 `OS` 속성
* `network.client.ip`와 추출된 지역 속성(`country`, `city`)
* `logger.version`, Datadog SDK 버전
* `logger.thread_name`, (`main`, `background`)
* `version`, `Info.plist` 또는 `application.manifest`에서 추출한 클라이언트 앱 버전
* `environment`, SDK 초기화에 사용되는 환경 이름

### 속성 추가

`DatadogLogger.AddAttribute` 메서드를 사용하면 특정 로거에서 보낸 모든 로그에 사용자 정의 속성을 추가할 수 있습니다.

```cs
logger.AddAttribute("user-status", "unregistered")
```

`value`는 [`JsonCovert.SerializeObject`][4]를 사용하여 직렬화 가능한 대부분의 유형이 될 수 있습니다.

### 속성 삭제

`DdLogger.RemoveAttribute` 메서드를 사용하면 특정 로거에서 보낸 모든 로그에서 사용자 정의 속성을 제거할 수 있습니다.

```cs
// 이렇게 하면 앞으로 전송되는 모든 로그에서 "user-status" 속성이 제거됩니다.
logger.RemoveAttribute("user-status")
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/DataDog/unity-package
[2]: /ko/real_user_monitoring/application_monitoring/unity/setup
[3]: /ko/getting_started/tagging/
[4]: https://www.newtonsoft.com/json/help/html/m_newtonsoft_json_jsonconvert_serializeobject.htm
[5]: https://api.flutter.dev/flutter/services/StandardMessageCodec-class.html
[6]: https://pub.dev/packages/logger