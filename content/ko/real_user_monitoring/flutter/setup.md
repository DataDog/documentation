---
description: Flutter Monitoring for RUM 설정 & 세션 재생 또는 로그 관리
further_reading:
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: 블로그
  text: Datadog Mobile RUM으로 Flutter 애플리케이션 성능 모니터링
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: dd-sdk-flutter의 소스 코드
- link: real_user_monitoring/explorer/
  tag: 설명서
  text: RUM 데이터를 탐색하는 방법 알아보기
kind: 설명서
title: 설정
---
## 개요

[Datadog Flutter Plugin][1]을 사용하여 로그 관리 또는 실제 사용자 모니터링(RUM)을 설정합니다. 설정 지침은 Logs, RUM 또는 둘 다 사용 여부에 따라 달라질 수 있지만 대부분의 설정 단계는 일관적입니다.

## 전제 조건

먼저 각 플랫폼에 맞게 환경을 적절하게 설정해야 합니다.

<div class="alert alert-info">
Datadog은 Flutter 2.8 이상에 대해 iOS 및 Android용 Flutter 모니터링을 지원합니다. Flutter Web에 대한 지원은 알파 버전입니다.
</div>

### iOS

`ios/Podfile`에 위치한 iOS Podfile에 true(Flutter의 기본값)로 설정된 `use_frameworks!`가 있어야 하며 대상 iOS 버전을 >= 11.0으로 설정해야 합니다.

이 제약 조건은 일반적으로 Podfile의 맨 윗줄에 주석 처리되어 있으며 다음과 같이 기술됩니다.

```ruby
platform :ios, '11.0'
```

`11.0`은 지원하려는 iOS의 최소 버전이 11.0 이상이면 자유롭게 바꿀 수 있습니다.

### Android

 Android의 경우 `minSdkVersion`버전은 >= 19이어야 하며, Kotlin을 사용하는 경우 버전 >= 1.6.21이어야 합니다. 이러한 제약 조건은 일반적으로 `android/app/build.gradle` 파일에 저장됩니다.

### Web

Web의 경우 `head` 태그의 `index.html`에 다음을 추가합니다:

```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-v4.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-rum-slim-v4.js"></script>
```

그러면 CDN으로 제공되는 Datadog Browser SDKs for Logs 및 RUM이 로드됩니다. 동기식 CDN 제공 버전의 Browser SDK는 Datadog Flutter Plugin이 지원하는 유일한 버전입니다.

## 설정

1. `pubspec.yaml` 파일에 다음을 추가합니다:

   ```yaml
   dependencies:
     datadog_flutter_plugin: ^1.3.0
   ```
2. 다음 스니펫을 사용하여 각 Datadog 기능(예: Logs 또는 RUM)에 대한 구성 개체를 만듭니다. 특정 기능에 대한 구성을 전달하지 않으면 해당 기능이 비활성화됩니다.

   ```dart
   // Determine the user's consent to be tracked
   final trackingConsent = ...
   final configuration = DdSdkConfiguration(
     clientToken: '<CLIENT_TOKEN>',
     env: '<ENV_NAME>',
     site: DatadogSite.us1,
     trackingConsent: trackingConsent,
     nativeCrashReportEnabled: true,
     loggingConfiguration: LoggingConfiguration(
       sendNetworkInfo: true,
       printLogsToConsole: true,
     ),
     rumConfiguration: RumConfiguration(
       applicationId: '<RUM_APPLICATION_ID>',
     )
   );
   ```

사용 가능한 구성 옵션에 대한 자세한 내용은 [DdSdkConfiguration 개체 설명서][5]를 참조하세요.

데이터의 안전성을 위해 클라이언트 토큰을 사용해야 합니다. Datadog API 키를 사용하여 Datadog Flutter Plugin을 설정할 수 없습니다.

- RUM을 사용하는 경우 **Client Token** 및 **Application ID**를 설정합니다.
- Logs만 사용하는 경우 클라이언트 토큰으로 라이브러리를 초기화합니다.

클라이언트 토큰 설정에 대한 자세한 내용은 [클라이언트 토큰 설명서][3]을 참조하세요.

### 라이브러리 초기화

`main.dart` 파일에서 두 가지 방법 중 하나를 사용하여 RUM을 초기화할 수 있습니다.

1. [오류 추적][4]을 자동으로 설정하는 `DatadogSdk.runApp`을 사용합니다.

   ```dart
   await DatadogSdk.runApp(configuration, () async {
     runApp(const MyApp());
   })
   ```

2. 또는 수동으로 [오류 추적][4] 및 리소스 추적을 설정합니다. `DatadogSdk.runApp`는`WidgetsFlutterBinding.ensureInitialized`를 호출합니다. `DatadogSdk.runApp`을 사용하지 않을 경우 `DatadogSdk.instance.initialize`를 호출하기 전에 이 방법을 호출해야 합니다. 

   ```dart
   runZonedGuarded(() async {
     WidgetsFlutterBinding.ensureInitialized();
     final originalOnError = FlutterError.onError;
     FlutterError.onError = (details) {
       FlutterError.presentError(details);
       DatadogSdk.instance.rum?.handleFlutterError(details);
       originalOnError?.call(details);
     };

     await DatadogSdk.instance.initialize(configuration);

     runApp(const MyApp());
   }, (e, s) {
     DatadogSdk.instance.rum?.addErrorInfo(
       e.toString(),
       RumErrorSource.source,
       stackTrace: s,
     );
   });
   ```

### RUM 세션 예시

애플리케이션이 Datadog RUM으로 전송하는 데이터를 제어하려면 [Flutter RUM SDK 초기화][2] 중에 RUM 세션에 대한 샘플링 속도를 0에서 100 사이의 백분율로 지정할 수 있습니다. 기본적으로 `sessionSamplingRate`는 100으로 설정되어 있습니다(모든 세션 유지).

예를 들어 세션의 50%만 유지하려면 다음을 사용합니다:

```dart
final config = DdSdkConfiguration(
    // other configuration...
    rumConfiguration: RumConfiguration(
        applicationId: '<YOUR_APPLICATION_ID>',
        sessionSamplingRate: 50.0,
    ),
);
```

### 추적 동의 설정

GDPR 규정을 준수하려면 Datadog Flutter SDK는 초기화 시 `trackingConsent` 값을 요구합니다.

다음 값 중 하나에 `trackingConsent`을 설정합니다:

- `TrackingConsent.pending`: Datadog Flutter SDK는 데이터 수집 및 일괄 처리를 시작하지만 데이터를 Datadog으로 전송하지는 않습니다. 새로운 추적 동의 값이 일괄 처리된 데이터로 수행할 작업을 결정할 때까지 기다립니다.
- `TrackingConsent.granted`: Datadog Flutter SDK가 데이터 수집을 시작하여 Datadog로 전송합니다.
- `TrackingConsent.notGranted`:  Datadog Flutter SDK는 데이터를 수집하지 않으므로 로그, 트레이스 또는 RUM 이벤트가 Datadog로 전송되지 않습니다.

SDK 초기화 후 추적 동의 값을 변경하려면 `DatadogSdk.setTrackingConsent` API 호출을 사용합니다.

SDK는 새 값에 따라 동작을 변경합니다. 예를 들어, 현재 추적 동의가 `TrackingConsent.pending`인 경우:

- `TrackingConsent.granted`로 변경하면 SDK는 현재 및 이후의 모든 데이터를 Datadog로 전송합니다;
- `TrackingConsent.notGranted`로 변경하면 SDK는 현재 데이터를 모두 삭제하고 이후 데이터는 수집하지 않습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pub.dev/packages/datadog_flutter_plugin
[2]: https://app.datadoghq.com/rum/application/create
[3]: /ko/account_management/api-app-keys/#client-tokens
[4]: /ko/real_user_monitoring/error_tracking/flutter
[5]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DdSdkConfiguration-class.html