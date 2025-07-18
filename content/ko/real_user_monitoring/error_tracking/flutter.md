---
dependencies:
- https://github.com/DataDog/dd-sdk-flutter/blob/main/packages/datadog_flutter_plugin/doc/rum/error_tracking.md
description: 오류 추적을 사용해 Flutter 오류를 추적하는 방법을 알아보세요.
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: dd-sdk-flutter 소스 코드
- link: real_user_monitoring/error_tracking/
  tag: 설명서
  text: 오류 추적 살펴보기
kind: 설명서
title: Flutter 충돌 보고 및 오류 추적
---
## 개요

충돌 보고와 오류 추적을 활성화하고 실제 사용자 모니터링(RUM)을 사용하여 종합적인 충돌 보고서와 오류 트렌드를 확인하세요.

[**오류 추적**][1]에 충돌 보고서가 표시됩니다.

## 설정

RUM용 Datadog Flutter SDK를 설정하지 않은 경우 [인앱 설정 지침][2]을 따르거나 [Flutter 설정 설명서][3]를 따르세요.

### 네이티브 충돌 보고 추가

초기화 스니펫을 업데이트하고 `nativeCrashReportEnabled`를 `true`로 설정하여 iOS 및 Android의 네이티브 충돌 보고를 활성화하세요.

예를 들면 다음과 같습니다.

```dart
final configuration = DdSdkConfiguration(
  clientToken: 'DD_CLIENT_TOKEN'
  env: 'DD_ENV'
  site: DatadogSite.us1,
  trackingConsent: TrackingConsent.granted,
  nativeCrashReportEnabled: true, // Set this flag
  loggingConfiguration: LoggingConfiguration(),
  rumConfiguration: 'DD_APP_ID',
);
DatadogSdk.instance.initialize(configuration);
```

애플리케이션에 치명적인 충돌이 발생한 경우, 애플리케이션을 다시 시작하면 Datadog Flutter SDK가 Datadog에 충돌 보고를 업로드합니다. 치명적이지 않은 오류의 경우 Datadog Flutter SDK가 다른 RUM 데이터와 함께 이러한 오류를 업로드합니다.


## Datadog에 심볼 파일 업로드

네이티브 iOS 충돌 보고가 원시 형식으로 수집되며 대부분은 메모리 주소를 포함합니다. 이들 주소를 적격 심볼 정보에 매핑하기 위해서는 .dSYM 파일을 업로드해야 합니다. 해당 파일은 애플리케이션의 빌드 프로세스에서 생성됩니다.

 `--split-debug-info` option set and/or with the `-obfuscate`  옵션 세트를 사용해 빌드된 모든 충돌 보고서의 경우, Flutter 빌드 프로세스에서 생성된 Android Proguard 매핑 파일과 Dart 심볼 파일을 업로드해야 합니다.


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

옵션 전체 목록의 경우 `datadog-ci` [Flutter 심볼 설명서][6]를 참조하세요.

## 고급 설정 - 작업 및 빌드 번호

Datadog는 `service-name`, `version`, `flavor` 조합을 사용해 난독화 해제를 위한 올바른 심볼을 찾습니다. 그러므로 파라미터는 `datadog-ci` 명령과 [DdSdkConfiguration][7]에서 설정된 파라미터에 전송됩니다.

Flutter에서 앱 [작업][8]을 사용하는 경우 작업을 자동으로 감지할 수 없으므로 [DdSdkConfiguration.flavor][9]에서 작업 이름을 설정해야 합니다. 그런 다음 `--flavor` parameter of the `datadog-ci` 명령에 전달할 수 있습니다.

```sh
datadog-ci flutter-symbols upload --service-name <your_service_name> --dart-symbols-location <location_of_dart_symbols> --android-mapping --ios-dsyms --flavor my_flavor
```

Datadog SDK는 자동으로 `pubspec.yaml`에서 지정한 애플리케이션 버전 번호(빌드 번호는 포함 안 함)를 감지합니다. 애플리케이션 버전의 일부로 빌드 번호를 사용하고 각 빌드에 심볼을 업로드해야 하는 경우, 버전을 [DdSdkConfiguration.version][10]에 추가해야 합니다. 그런 다음 이를 `--version` parameter of the `datadog-ci` 명령에 전달할 수 있습니다.

```sh
datadog-ci flutter-symbols upload --service-name <your_service_name> --dart-symbols-location <location_of_dart_symbols> --android-mapping --ios-dsyms --version 1.2.3+22
```

Datadog는 버전에 대한 태그를 사용하며 해당 태그는 `+`를 허용하지 않으니 참고하세요. 모든 툴링은 자동으로 `+`을 `-` 로 대체하여 버전 태그가 Datadog에서 검색되도록 합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: https://docs.datadoghq.com/ko/real_user_monitoring/flutter/#setup
[4]: https://www.npmjs.com/package/@datadog/datadog-ci
[6]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/flutter-symbols
[7]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DdSdkConfiguration-class.html
[8]: https://docs.flutter.dev/deployment/flavors
[9]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DdSdkConfiguration/flavor.html
[10]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DdSdkConfiguration/version.html