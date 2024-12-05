---
description: 로그로 브라우저 및 모바일 오류를 추적하는 방법을 알아봅니다.
further_reading:
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: 블로그
  text: Datadog 오류 추적을 통해 애플리케이션 문제 파악
- link: /logs/error_tracking/explorer/
  tag: 설명서
  text: 오류 추적 탐색기에 대해 알아보기
is_beta: true
title: 브라우저 및 모바일 오류 추적
---

## 개요

오류 추적 기능은 브라우저와 모바일 Datadog SDK에서 수집한 오류를 처리합니다. 스택 트레이스(stack trace)가 포함된 오류를 수집할 때마다 오류 추적 기능으로 처리하여 문제(_issue_) 또는 유사한 오류 그룹으로 그룹화합니다.

로그 오류의 필수 속성은 로그 `error.stack`의 스택 트레이스(stack trace)입니다. Datadog으로 스택 트레이스(stack trace)를 전송했으나 `error.stack`에 없는 경우, [일반 로그 리매퍼(remapper)][6]를 설정하여 스택 트레이스(stack trace)를 Datadog의 정확한 속성으로 리매핑할 수 있습니다.

[**오류 추적**][2]에 충돌 보고서가 표시됩니다.

## 설정

{{< tabs >}}
{{% tab "Browser" %}}

Datadog Browser SDK를 아직 설정하지 않은 경우 [인앱 설정 지침][1]을 따르거나 [브라우저 로그 설정 문서][2]를 참조하세요.

1. 최신 버전의 로그 브라우저 SDK을 다운로드하세요. 오류 추적을 사용하려면 `v4.36.0` 이상이 필요합니다.
2. [SDK 초기화][3] 시 애플리케이션의 `version`, `env`, `service`를 설정합니다. 예를 들어 NPM의 경우는 다음과 같습니다.

   ```javascript
   import { datadogLogs } from '@datadog/browser-logs'

   datadogLogs.init({
     clientToken: '<DATADOG_CLIENT_TOKEN>',
     site: '<DATADOG_SITE>',
     service: '<MY_SERVICE>',
     env: '<MY_ENV>',
     forwardErrorsToLogs: true,
     sessionSampleRate: 100,
   })
   ```

3. 탐지된 예외를 직접 로깅하려면 [옵션 오류 파라미터][4]를 사용할 수 있습니다.

   ```javascript
   try {
     throw new Error('wrong behavior');
   } catch(err) {
     datadogLogs.logger.error("an error occurred", {usr: {id: 123}}, err);
   }
   ```

**참고**: 오류 추적은 `Error`의 인스턴스인 오류만 고려합니다.

[1]: https://app.datadoghq.com/logs/onboarding/client
[2]: /ko/logs/log_collection/javascript/#setup
[3]: /ko/logs/log_collection/javascript/#choose-the-right-installation-method
[4]: /ko/logs/log_collection/javascript/#error-tracking

{{% /tab %}}
{{% tab "Android" %}}

Datadog Android SDK를 아직 설정하지 않은 경우 [인앱 설정 지침][1]을 따르거나 [Android 로그 설정 문서][2]를 참조하세요.

1. [로그용 Datadog Android SDK][3] 최신 버전을 다운로드합니다.
2. [SDK 초기화][4] 시 애플리케이션의 `version`, `env`, `service`을 설정합니다.
3. 탐지된 예외를 직접 로깅하려면 옵션으로 다음을 사용할 수도 있습니다.

   ```java
   try {
     doSomething();
   } catch (IOException e) {
     logger.e("an exception occurred", e);
   }
   ```

[1]: https://app.datadoghq.com/logs/onboarding/client
[2]: /ko/logs/log_collection/android/#setup
[3]: https://github.com/Datadog/dd-sdk-android
[4]: /ko/logs/log_collection/android/?tab=kotlin#setup

{{% /tab %}}
{{% tab "iOS" %}}

Datadog iOS SDK를 아직 설정하지 않은 경우 [인앱 설정 지침][1]을 따르거나 [iOS 로그 설정 설명서][2]를 참조하세요.

1. [로그용 Datadog iOS SDK][3] 최신 버전을 다운로드합니다.
2. [SDK 초기화][4] 시 애플리케이션의 `version`, `env`및 `service`을 설정합니다.
3. 탐지된 예외를 직접 로깅하려면 옵션으로 다음을 사용할 수도 있습니다.

   ```java
   do {
     // ...
   } catch {
     logger.error("an exception occurred", error)
   }
   ```

[1]: https://app.datadoghq.com/logs/onboarding/client
[2]: /ko/logs/log_collection/ios/#setup
[3]: https://github.com/Datadog/dd-sdk-ios
[4]: /ko/logs/log_collection/ios/?tab=cocoapods#setup

{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/logs/error-tracking
[3]: https://app.datadoghq.com/logs/onboarding/client
[4]: /ko/logs/log_collection/javascript/#setup
[5]: /ko/logs/log_collection/javascript/#choose-the-right-installation-method
[6]: /ko/logs/log_configuration/processors/?tab=ui#remapper