---
aliases:
- /ko/real_user_monitoring/error_tracking/flutter
code_lang: flutter
code_lang_weight: 40
dependencies:
- https://github.com/DataDog/dd-sdk-flutter/blob/main/packages/datadog_flutter_plugin/doc/rum/error_tracking.md
description: 오류 추적을 사용해 Flutter 오류를 추적하는 방법을 알아보세요.
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: 소스 코드
  text: dd-sdk-flutter 소스 코드
- link: real_user_monitoring/error_tracking/
  tag: 설명서
  text: 오류 추적 살펴보기
title: Flutter 충돌 보고 및 오류 추적
type: multi-code-lang
---
## 개요

Crash Reporting 및 Error Tracking을 활성화하고 Real User Monitoring으로 종합 충돌 보고서와 오류 트렌드를 확인하세요.

[**오류 추적**][1]에 충돌 보고서가 표시됩니다.

## 설정

아직 Datadog Flutter SDK를 설정하지 않은 경우 [앱 내 설정 지침][2]을 따르거나 [Flutter 설정 설명서][3]를 참조하세요.

### Dart 오류 추적 추가

`DatadogSdk.runApp`을 사용하는 경우 Datadog Flutter SDK에서 잡히지 않은 Dart 예외를 자동으로 추적하고 보고합니다.

`DatadogSdk.runApp`을 사용하지 **않는** 경우, Datadog를 초기화하기 전에 다음 코드를 사용하여 오류 추적을 수동으로 설정해야 합니다.

```dart
final originalOnError = FlutterError.onError;
FlutterError.onError = (details) {
  DatadogSdk.instance.rum?.handleFlutterError(details);
  originalOnError?.call(details);
};
final platformOriginalOnError = PlatformDispatcher.instance.onError;
PlatformDispatcher.instance.onError = (e, st) {
  DatadogSdk.instance.rum?.addErrorInfo(
    e.toString(),
    RumErrorSource.source,
    stackTrace: st,
  );
  return platformOriginalOnError?.call(e, st) ?? false;
};
```

### 네이티브 충돌 보고 추가

초기화 스니펫을 업데이트하고 `nativeCrashReportEnabled`를 `true`로 설정하여 iOS 및 Android의 네이티브 충돌 보고를 활성화하세요.

예시:

```dart
final configuration = DatadogConfiguration(
  clientToken: '<DD_CLIENT_TOKEN>'
  env: '<DD_ENV>'
  site: DatadogSite.us1,
  nativeCrashReportEnabled: true, // Set this flag
  loggingConfiguration: DatadogLoggingConfiguration(),
  rumConfiguration: DatadogRumConfiguration(
    applicationId: '<DD_APP_ID>',
  ),
);
```

애플리케이션에 치명적인 충돌이 발생한 경우, 애플리케이션이 재시작된 *이후* Datadog Flutter SDK에서 Datadog로 충돌 보고서를 업로드합니다. 치명적이지 않은 오류의 경우, Datadog Flutter SDK에서 다른 RUM 데이터와 함께 해당 오류를 업로드합니다.

## 난독화된 스택 트레이스 가져오기

매핑 파일은 스택 트레이스를 난독화 해제하는 데 사용되므로 오류를 디버깅하는 데 도움이 됩니다. Datadog는 생성된 고유 빌드 ID를 사용하여 올바른 스택 트레이스를 해당 매핑 파일과 자동으로 일치시킵니다. 따라서 Datadog에 보고된 충돌 및 오류 검토 시, 매핑 파일이 업로드된 시점(프로덕션 전 또는 프로덕션 빌드 중)에 관계없이 올바른 정보를 사용해 효과적으로 QA 프로세스를 진행할 수 있습니다.

Flutter 애플리케이션의 경우 스택 트레이스와 소스 맵의 매칭은 `service`, `version`, `variant` 및 `architecture` 필드에 의존합니다.

### Datadog에 심볼 파일 업로드

네이티브 iOS 충돌 보고가 원시 형식으로 수집되며 대부분은 메모리 주소를 포함합니다. 이들 주소를 적격 심볼 정보에 매핑하기 위해서는 .dSYM 파일을 업로드해야 합니다. 해당 파일은 애플리케이션의 빌드 프로세스에서 생성됩니다.

`--split-debug-info` 옵션 설정 및/또는 `--obfuscate` 옵션 설정으로 빌드된 Flutter iOS 및 Android 애플리케이션에서 전송되는 충돌 보고서 및 오류도 원시 또는 난독화된 형식으로 전송됩니다. 이러한 애플리케이션의 경우 Flutter 빌드 프로세스에서 생성된 Android Proguard 매핑 파일과 Dart 기호 파일을 업로드해야 합니다.

Flutter Web 애플리케이션에서 전송된 오류는 매핑되지 않은 JavaScript 파일 및 줄 번호를 전송하므로 이를 Dart 파일 및 줄 번호에 매핑해야 합니다. 이러한 애플리케이션의 경우 Flutter 빌드 프로세스에서 생성된 Flutter 생성 JavaScript 소스 맵을 업로드해야 합니다.

[@datadog/datadog-ci][4] 명령줄은 모든 필수 파일(dSYMs, Android Proguard 매핑 및 Dart 심볼 파일)을 하나의 명령으로 업로드할 수 있도록 해줍니다.

먼저 위 지침에서 `datadog-ci` 도구를 설치하고 프로젝트 루트에 API 키 및 Datadog 사이트(선택 사항)를 포함하는 `datadog-ci.json` 파일을 생성합니다.
```json
{
  "apiKey": "<YOUR_DATADOG_API_KEY>",
  "datadogSite": "datadoghq.eu"  // Optional if you are using datadoghq.com
}
```

이러한 파일은 API 키를 포함하므로 버전 제어에 체크인해서는 안 됩니다.

대신 `DATADOG_API_KEY` 및 `DATADOG_SITE` 환경 변수를 설정할 수 있습니다.

그러면 다음 명령을 사용해 충돌 보고서 심볼화와 난독화 해제에 필요한 모든 필수 파일을 업로드할 수 있습니다.
```sh
datadog-ci flutter-symbols upload --service-name <your_service_name> --dart-symbols-location <location_of_dart_symbols> --android-mapping --ios-dsyms
```

**참고**: 소스 맵을 다시 업로드할 때 버전이 변경되지 않으면 이전 소스 맵을 다시 쓰지 않습니다.

전체 옵션 목록은 `datadog-ci` [Flutter 기호 설명서][5]를 참조하세요.

### 업로드된 심볼 파일 목록

업로드된 모든 기호를 보려면 [RUM 디버그 기호][10] 페이지를 참조하세요.

## 한계

매핑 파일은 각각 **500MB** 크기로 제한되며, dSYM 파일은 최대 **2GB**까지 가능합니다.

## 구현 테스트

Flutter 충돌 보고 및 오류 추적 구성을 확인하려면 애플리케이션에서 오류를 발생시키고 Datadog에 오류가 표시되는지 확인합니다.

1. 시뮬레이터, 에뮬레이터 또는 실제 기기에서 애플리케이션을 실행합니다. iOS에서 실행하는 경우 디버거가 포함되지 않도록 합니다. 그렇지 않으면 Datadog SDK가 충돌을 캡처하기 전에 Xcode가 먼저 충돌을 캡처합니다.
2. 오류 또는 충돌이 포함된 코드를 실행합니다. 예시:

   ```dart
   void throwError() {
    throw Exception("My Exception")
   }
   ```

3. 충돌을 일으키지 않는 난독화된 오류 보고서의 경우 [**Error Tracking**][8]에서 기호화 및 난독화 해제를 확인할 수 있습니다.
4. 충돌이 발생하면, 애플리케이션을 다시 시작하고 Flutter SDK에서 [**Error Tracking**][8]에 충돌 보고서를 업로드할 때까지 기다리세요.

### Flavor 및 빌드 번호

Datadog는 `service-name`, `version`, `flavor`의 조합을 사용하여 난독화를 해제할 수 있는 올바른 기호를 찾습니다. 충돌 보고서에 전체 정보를 포함하려면, `datadog-ci` 명령으로 전송된 파라미터와 [Datadog 구성][6]에서 설정된 파라미터가 정확히 일치해야 합니다.

Flutter에서 앱 [Flavor][7]를 사용하는 경우, Flutter가 자동으로 Flavor를 감지할 수 없으므로 [DatadogConfiguration.flavor][8]에서 Flavor의 이름을 설정해야 합니다. 그런 다음 `datadog-ci` 명령의 `--flavor` 파라미터에 이를 전달할 수 있습니다.

```sh
datadog-ci flutter-symbols upload --service-name <your_service_name> --dart-symbols-location <location_of_dart_symbols> --android-mapping --ios-dsyms --flavor my_flavor
```

Datadog SDK는 `pubspec.yaml`에 지정된 애플리케이션의 버전 번호(빌드 번호는 포함하지 않음)를 자동으로 감지합니다. 애플리케이션에서 빌드 번호를 버전의 일부로 사용하고 있고 각 빌드에 대한 기호를 업로드해야 하는 경우 [DatadogConfiguration.version][9]에 버전을 추가해야 합니다. 그런 다음 `datadog-ci` 명령의 `--version` 파라미터에 이를 전달할 수 있습니다.

```sh
datadog-ci flutter-symbols upload --service-name <your_service_name> --dart-symbols-location <location_of_dart_symbols> --android-mapping --ios-dsyms --version 1.2.3+22
```

**참고**: Datadog는 `+`를 허용하지 않는 버전에 태그를 사용합니다. 모든 툴링은 `+`를 `-`로 자동 대체하여 Datadog에서 버전 태그를 검색할 수 있도록 합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: https://docs.datadoghq.com/ko/real_user_monitoring/application_monitoring/flutter/setup
[4]: https://www.npmjs.com/package/@datadog/datadog-ci
[5]: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/flutter-symbols
[6]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration-class.html
[7]: https://docs.flutter.dev/deployment/flavors
[8]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration/flavor.html
[9]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration/version.html
[10]: https://app.datadoghq.com/source-code/setup/rum