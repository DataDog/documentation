---
aliases:
- /ko/real_user_monitoring/flutter/
- /ko/real_user_monitoring/flutter/setup
code_lang: flutter
code_lang_weight: 30
description: Flutter 프로젝트에서 RUM 데이터를 수집합니다.
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/flutter
  tag: 설명서
  text: RUM Flutter 고급 설정
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: 소스 코드
  text: dd-sdk-flutter의 소스 코드
- link: real_user_monitoring/explorer/
  tag: 설명서
  text: RUM 데이터를 탐색하는 방법 알아보기
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: 블로그
  text: Datadog 모바일 RUM으로 Flutte 애플리케이션 성능 모니터링
title: RUM Flutter 모니터링 설정
type: multi-code-lang
---
## 개요

Datadog 실제 사용자 모니터링(RUM)을 사용하면 애플리케이션 개별 사용자의 실시간 성능 및 사용자 여정을 시각화하고 분석할 수 있습니다.

## 설정

### UI에서 애플리케이션 세부 정보를 지정합니다.

1. Datadog에서 [**디지털 경험** > **애플리케이션 추가**][1]로 이동합니다.
2. `Flutter`를 애플리케이션 유형으로 선택합니다.
3. 고유한 Datadog 애플리케이션 ID 및 클라이언트 토큰을 생성하기 위한 애플리케이션 이름을 제공합니다.
4. 클라이언트 IP 또는 지리적 위치 데이터에 대한 자동 사용자 데이터 수집을 비활성화하려면 해당 설정의 확인란을 선택 취소합니다. 자세한 내용은 [RUM Flutter 데이터 수집][7]을 참조하세요.

   {{< img src="real_user_monitoring/flutter/flutter-new-application.png" alt="Datadog에서 Flutter용 RUM 애플리케이션 만들기" style="width:90%;">}}

데이터 보안을 위해 클라이언트 토큰을 사용해야 합니다. 클라이언트 토큰 설정에 대한 자세한 내용은 [클라이언트 토큰 설명서][2]를 참조하세요.

### 애플리케이션의 계측

먼저 각 플랫폼에 맞게 환경을 올바르게 설정했는지 확인합니다.

<div class="alert alert-info">
Datadog는 Flutter 3.0 이상용 iOS 및 Android용 Flutter 모니터링을 지원합니다.
</div>

Datadog는 공식적으로 Flutter Web을 지원하지 않지만, 현재 모바일 앱용 Flutter SDK를 사용하면 모니터링에서 일부 기능을 바로 사용할 수 있습니다. 다음은 알려진 제한 사항입니다.
  * Flutter에서 보고된 모든 작업에는 `custom` 유형이 레이블로 지정됩니다.
  * 장기 실행 작업(`startAction`/`stopAction`)은 지원되지 않습니다.
  * RUM 리소스 수동 보고(`startResource`/`stopResource`)는 지원되지 않습니다.
  * 이벤트 매퍼는 현재 지원되지 않습니다.
  * 태그는 현재 지원되지 않습니다.
  * `addUserExtraInfo`는 지원되지 않습니다.
  * `stopSession`는 지원되지 않습니다.

Flutter Web 지원은 계획되어 있지 않지만 Datadog의 우선 순위는 종종 사용자의 피드백에 따라 재평가됩니다. Flutter Web 앱이 있고 Datadog RUM을 사용하여 모니터링 성능을 개선하고 싶다면 고객 지원 팀에 연락하여 이 기능을 요청하세요.

#### iOS

`ios/Podfile` 에 있는 iOS 포드 파일에 `use_frameworks!` 이 참(Flutter의 기본값)으로 설정되어 있어야 하며 대상 iOS 버전을 11.0 이상으로 설정해야 합니다.

이 제약 조건은 일반적으로 Podfile의 맨 윗줄에 주석 처리되어 있으며 다음과 같이 기술됩니다.

```ruby
platform :ios, '11.0'
```

`11.0`은 지원하려는 iOS의 최소 버전이 11.0 이상이면 자유롭게 바꿀 수 있습니다.

#### Android

Android의 경우 `minSdkVersion` 버전이 21 이상이어야 하며, Kotlin을 사용하는 경우 버전이 1.8.0 이상이어야 합니다. 이러한 제약 조건은 일반적으로 `android/app/build.gradle` 파일에 보관됩니다.

### Web

웹의 경우 `head` 태그 , **{{<region-param key="dd_site_name">}}** 사이트의 경우, `index.html`에 다음을 추가합니다.
{{< site-region region="us" >}}
```html
<script type="text/자바스크립트(Javascript)" src="https://www.datadoghq-browser-에이전트.com/us1/v5/Datadog-로그.js"></script>
<script type="text/자바스크립트(Javascript)" src="https://www.datadoghq-browser-에이전트.com/us1/v5/Datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script type="text/자바스크립트(Javascript)" src="https://www.datadoghq-browser-에이전트.com/ap1/v5/Datadog-로그.js"></script>
<script type="text/자바스크립트(Javascript)" src="https://www.datadoghq-browser-에이전트.com/ap1/v5/Datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script type="text/자바스크립트(Javascript)" src="https://www.datadoghq-browser-에이전트.com/eu1/v5/Datadog-로그.js"></script>
<script type="text/자바스크립트(Javascript)" src="https://www.datadoghq-browser-에이전트.com/eu1/v5/Datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script type="text/자바스크립트(Javascript)" src="https://www.datadoghq-browser-에이전트.com/us3/v5/Datadog-로그.js"></script>
<script type="text/자바스크립트(Javascript)" src="https://www.datadoghq-browser-에이전트.com/us3/v5/Datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script type="text/자바스크립트(Javascript)" src="https://www.datadoghq-browser-에이전트.com/us5/v5/Datadog-로그.js"></script>
<script type="text/자바스크립트(Javascript)" src="https://www.datadoghq-browser-에이전트.com/us5/v5/Datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script type="text/자바스크립트(Javascript)" src="https://www.datadoghq-browser-에이전트.com/Datadog-로그-v5.js"></script>
<script type="text/자바스크립트(Javascript)" src="https://www.datadoghq-browser-에이전트.com/Datadog-rum-slim-v5.js"></script>
```
{{</ site-region>}}

그러면 CDN으로 제공되는 Datadog Browser SDKs for Logs 및 RUM이 로드됩니다. 동기식 CDN 제공 버전의 Browser SDK는 Datadog Flutter Plugin이 지원하는 유일한 버전입니다.

#### 플러그인 추가

1. `pubspec.yaml` 파일에 다음을 추가합니다:

   ```yaml
   dependencies:
     datadog_flutter_plugin: ^2.0.0
   ```
2. 다음 스니펫을 사용하여 각 Datadog 기능(예: Logs 또는 RUM)에 대한 구성 개체를 만듭니다. 특정 기능에 대한 구성을 전달하지 않으면 해당 기능이 비활성화됩니다.

   ```dart
   // Determine the user's consent to be tracked
   final trackingConsent = ...
   final configuration = DatadogConfiguration(
     clientToken: '<CLIENT_TOKEN>',
     env: '<ENV_NAME>',
     site: DatadogSite.us1,
     nativeCrashReportEnabled: true,
     loggingConfiguration: DatadogLoggingConfiguration(),
     rumConfiguration: DatadogRumConfiguration(
       applicationId: '<RUM_APPLICATION_ID>',
     )
   );
   ```

사용 가능한 설정 옵션에 대한 자세한 내용은 [DatadogConfiguration 개체 문서][3]를 참조하세요.

데이터의 안전을 보장하려면 클라이언트 토큰을 사용해야 합니다. Datadog API 키를 사용하여 Datadog Flutter 플러그인을 설정할 수 없습니다.

- RUM을 사용하는 경우 **클라이언트 토큰**과 **애플리케이션 ID**를 설정하세요.
- 로그만 사용하는 경우 라이브러리를 클라이언트 토큰으로 초기화합니다.

## 애플리케이션 계측

### 라이브러리 초기화

`main.dart` 파일에서 두 가지 방법 중 하나를 사용하여 RUM을 초기화할 수 있습니다.

1. `DatadogSdk.runApp`을 사용하면 [오류 추적][4]이 자동으로 설정됩니다.

   ```dart
   await DatadogSdk.runApp(configuration, TrackingConsent.granted, () async {
     runApp(const MyApp());
   })
   ```

2. 또는 수동으로 [오류 추적][4] 및 리소스 추적을 설정합니다. `DatadogSdk.runApp`는`WidgetsFlutterBinding.ensureInitialized`를 호출합니다. `DatadogSdk.runApp`을 사용하지 않을 경우 `DatadogSdk.instance.initialize`를 호출하기 전에 이 방법을 호출해야 합니다. 

   ```dart
   WidgetsFlutterBinding.ensureInitialized();
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
   await DatadogSdk.instance.initialize(configuration, TrackingConsent.granted);
   runApp(const MyApp());
   ```

### RUM 세션 예시

애플리케이션이 Datadog RUM으로 전송하는 데이터를 제어하려면 Flutter RUM SDK를 초기화하는 동안 RUM 세션의 샘플링 속도를 0에서 100 사이의 백분율로 지정할 수 있습니다. 기본적으로 `sessionSamplingRate` 은 100으로 설정되어 있습니다(모든 세션 유지).

예를 들어 세션의 50%만 유지하려면 다음을 사용합니다:

```dart
final config = DatadogConfiguration(
    // 다른 설정...
    rumConfiguration: DatadogRumConfiguration(
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

SDK가 초기화된 후 추적 동의 값을 변경하려면 `DatadogSdk.setTrackingConsent` API 호출을 사용하세요.

SDK는 새 값에 따라 동작을 변경합니다. 예를 들어, 현재 추적 동의가 `TrackingConsent.pending`인 경우:

- `TrackingConsent.granted`로 변경하면 SDK는 현재 및 이후의 모든 데이터를 Datadog로 전송합니다;
- `TrackingConsent.notGranted`로 변경하면 SDK는 현재 데이터를 모두 삭제하고 이후 데이터는 수집하지 않습니다.

## 보기 자동 추적

### Flutter Navigator v1

Datadog Flutter 플러그인은 MaterialApp에서 `DatadogNavigationObserver`을 사용하여 명명된 경로를 자동으로 추적할 수 있습니다.

```dart
MaterialApp(
  home: HomeScreen(),
  navigatorObservers: [
    DatadogNavigationObserver(DatadogSdk.instance),
  ],
);
```

이는 이름이 지정된 경로를 사용하고 있거나 `PageRoute`의 `settings`파라미터에 이름을 제공한 경우에 작동합니다.

이름이 지정된 경로를 사용하지 않는 경우 `DatadogNavigationObserverProvider` 위젯과  `DatadogRouteAwareMixin`을 함께 사용하여 RUM 보기를 자동으로 시작하고 중지할 수 있습니다.`DatadogRouteAwareMixin`를 사용하여 `initState`에서 `didPush`로 로직을 이동합니다.

### Flutter Navigator v2

`MaterialApp.router`라는 생성자를 사용하는 Flutter Navigator v2.0을 사용하는 경우, 설정은 사용 중인 라우팅 미들웨어(있는 경우)에 따라 달라집니다. [`go_router`][11]는 Flutter Navigator v1과 동일한 옵저버 인터페이스를 사용하므로 `DatadogNavigationObserver`를 다른 옵저버에 파라미터를 `GoRouter`로 추가할 수 있습니다.

```dart
final _router = GoRouter(
  routes: [
    // 경로 정보는 여기에 
  ],
  observers: [
    DatadogNavigationObserver(datadogSdk: DatadogSdk.instance),
  ],
);
MaterialApp.router(
  routerConfig: _router,
  // 남은 설정 
)
```

`go_router`이외의 라우터를 사용하는 예는 [고급 설정- 자동 보기 추적][12]을 참조하세요.


### 보기 이름 변경

모든 설정에서  [`viewInfoExtractor`][8] 콜백을 제공하여 보기 이름을 바꾸거나 커스텀 경로를 제공할 수 있습니다. 이 함수는 `defaultViewInfoExtractor`를 호출하여 옵저버의 기본 동작으로 되돌릴 수 있습니다. 예:

```dart
RumViewInfo? infoExtractor(Route<dynamic> route) {
  var name = route.settings.name;
  if (name == 'my_named_route') {
    return RumViewInfo(
      name: 'MyDifferentName',
      attributes: {'extra_attribute': 'attribute_value'},
    );
  }

  return defaultViewInfoExtractor(route);
}

var observer = DatadogNavigationObserver(
  datadogSdk: DatadogSdk.instance,
  viewInfoExtractor: infoExtractor,
);
```

## 리소스 자동 추적

[Datadog Tracking HTTP Client][5] 패키지를 사용하여 RUM 보기에서 자동으로 리소스 및 HTTP 호출을 추적할 수 있습니다.

패키지를 `pubspec.yaml`에 추가하고 초기화 파일에 다음을 추가합니다:

```dart
final configuration = DatadogConfiguration(
  // 설정
  firstPartyHosts: ['example.com'],
)..enableHttpTracking()
```

**참고**: Datadog HTTP 클라이언트 추적은 [`HttpOverrides.global`][9]를 수정합니다. 자체 커스텀 `HttpOverrides`를 사용하는 경우 [`DatadogHttpOverrides`][10]에서 상속해야 할 수도 있습니다. 이 경우에는 `enableHttpTracking`를 호출할 필요가 없습니다. `datadog_tracking_http_client` >= 1.3 버전에서는 `HttpOverrides.current`의 값을 확인하고 클라이언트 생성에 사용하므로 Datadog을 초기화하기 전에 `HttpOverrides.global`만 초기화하면 됩니다.

Datadog [분산 추적][6]을 사용하려면 설정 개체의 `DatadogConfiguration.firstPartyHosts` 속성을 분산 추적을 지원하는 도메인으로 설정해야 합니다. `DatadogRumConfiguration`에서 `tracingSamplingRate`을 설정하여 분산 추적의 샘플링 속도를 수정할 수도 있습니다.

- `firstPartyHosts`는 와일드카드를 허용하지 않지만 지정된 도메인에 대해 모든 하위 도메인과 일치합니다. 예를 들어, `api.example.com`는 `news.example.com`가 아닌 `staging.api.example.com` 및 `prod.api.example.com`와 일치합니다.

- `DatadogRumConfiguration.traceSampleRate`는 기본 샘플링 비율을 20%로 설정합니다. 모든 리소스 요청이 완전히 분산된 추적을 생성하도록 하려면 이 값을 `100.0`으로 설정합니다.


## 자동 작업 추적

`RumUserActionDetector`][13]을 사용하여 지정된 위젯 트리에서 발생하는 사용자 탭을 추적합니다.

```dart
RumUserActionDetector(
  rum: DatadogSdk.instance.rum,
  child: Scaffold(
    appBar: AppBar(
      title: const Text('RUM'),
    ),
    body: // 나머지 애플리케이션
  ),
);
```

`RumUserActionDetector`는 트리에서 발생하는 탭 사용자 동작을 자동으로 감지하여 RUM으로 전송합니다. 이는 여러 일반적인 Flutter 위젯과의 상호작용을 감지합니다.

대부분의 버튼 유형에서 감지기는 `Text` 위젯 하위 항목을 찾고, 이 하위 항목을 동작 설명에 사용합니다. 다른 경우에는 `Semantics` 객체 하위 항목 또는 `Icon.semanticsLabel` 속성이 설정된 `Icon`을 찾습니다.

또는 트리의 시맨틱을 변경하지 않고 하위 트리에서 감지된 사용자 작업을 보고할 때 제공된 설명을 사용하는 [`RumUserActionAnnotation`][14]로 위젯 트리를 묶을 수 있습니다.

```dart
Container(
  margin: const EdgeInsets.all(8),
  child: RumUserActionAnnotation(
    description: 'My Image Button',
    child: InkWell(
      onTap: onTap,
      child: Column(
        children: [
          FadeInImage.memoryNetwork(
            placeholder: kTransparentImage,
            image: image,
          ),
          Center(
            child: Text(
              text,
              style: theme.textTheme.headlineSmall,
            ),
          )
        ],
      ),
    ),
  ),
);
```

## 디바이스가 오프라인일 때 데이터 전송

RUM은 사용자 디바이스가 오프라인 상태일 때 데이터의 가용성을 보장합니다. 네트워크 연결이 원활하지 않은 지역이 디바이스 배터리가 너무 부족한 경우 모든 RUM 이벤트는 먼저 로컬 디바이스에 일괄적으로 저장됩니다. 네트워크를 사용할 수 있고 배터리가 충분히 충전되어 Flutter RUM SDK가 최종 사용자 경험에 영향을 미치지 않도록 보장하는 즉시 전송됩니다. 애플리케이션이 포그라운드에서 실행 중인 상태에서 네트워크를 사용할 수 없거나 데이터 업로드에 실패하면 배치가 성공적으로 전송될 때까지 보관됩니다.

즉, 사용자가 오프라인 상태에서 애플리케이션을 열어도 데이터가 손실되지 않습니다.

**참고**: 디스크의 데이터가 너무 오래되면 Flutter RUM SDK가 디스크 공간을 너무 많이 사용하지 않도록 디스크의 데이터가 자동으로 삭제됩니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ko/account_management/api-app-keys/#client-tokens
[3]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration-class.html
[4]: /ko/real_user_monitoring/error_tracking/flutter
[5]: https://pub.dev/packages/datadog_tracking_http_client
[6]: /ko/serverless/distributed_tracing
[7]: /ko/real_user_monitoring/mobile_and_tv_monitoring/data_collected/flutter
[8]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html
[9]: https://api.flutter.dev/flutter/dart-io/HttpOverrides/current.html
[10]: https://pub.dev/documentation/datadog_tracking_http_client/latest/datadog_tracking_http_client/DatadogTrackingHttpOverrides-class.html
[11]: https://pub.dev/packages/go_router
[12]: /ko/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/flutter#automatic-view-tracking
[13]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/RumUserActionDetector-class.html
[14]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/RumUserActionAnnotation-class.html