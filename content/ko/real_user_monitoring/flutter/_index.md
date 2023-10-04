---
description: Flutter 프로젝트에서 RUM 데이터를 수집합니다.
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
title: Flutter Monitoring
---
## 개요

Datadog 실제 사용자 모니터링(RUM)을 사용하면 애플리케이션 개별 사용자의 실시간 성능 및 사용자의 활동을 시각화하고 분석할 수 있습니다.

## 설정

### UI에서 애플리케이션 세부 정보 지정

1.  [Datadog 앱][1]에서 **UX Monitoring** > **RUM Applications** > **New Application**으로 이동합니다.
2. `Flutter`를 애플리케이션 유형으로 선택합니다.
3. 고유한 Datadog 애플리케이션 ID 및 클라이언트 토큰을 생성하기 위한 애플리케이션 이름을 제공합니다.
4. 클라이언트 IP 또는 지리적 위치 데이터에 대한 자동 사용자 데이터 수집을 비활성화하려면 해당 설정의 확인란을 선택 취소합니다. 자세한 내용은 [RUM Flutter 데이터 수집][7]을 참조하세요.

   {{< img src="real_user_monitoring/flutter/flutter-new-application.png" alt="Datadog에서 Flutter용 RUM 애플리케이션 만들기" style="width:90%;">}}

데이터 보안을 위해 클라이언트 토큰을 사용해야 합니다. 클라이언트 토큰 설정에 대한 자세한 내용은 [클라이언트 토큰 설명서][2]를 참조하세요.

### 애플리케이션의 계측

 Datadog Flutter SDK for RUM을 초기화하려면 [설정][3]을 참조하세요.

## 보기 자동 추적

### Flutter Navigator v1

[Datadog Flutter Plugin][4]은 MaterialApp에서 `DatadogNavigationObserver`를 사용하여 지정된 경로를 자동으로 추적할 수 있습니다:

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

`MaterialApp.router`라는 이름의 컨스트럭터를 사용하는 Flutter Navigator v2.0을 사용하는 경우 사용 중인 라우팅 미들웨어에 따라 설정이 달라집니다. [go_router][11]는 Flutter Navigator v1과 동일한 옵저버 인터페이스를 사용하므로 `DatadogNavigationObserver`를 `GoRouter`에 대한 파라미터로 다른 옵저버에 추가할 수 있습니다.

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
final configuration = DdSdkConfiguration(
  // configuration
  firstPartyHosts: ['example.com'],
)..enableHttpTracking()
```

**참고**: Datadog HTTP 클라이언트 추적은 [`HttpOverrides.global`][9]를 수정합니다. 자체 커스텀 `HttpOverrides`를 사용하는 경우 [`DatadogHttpOverrides`][10]에서 상속해야 할 수도 있습니다. 이 경우에는 `enableHttpTracking`를 호출할 필요가 없습니다. `datadog_tracking_http_client` >= 1.3 버전에서는 `HttpOverrides.current`의 값을 확인하고 클라이언트 생성에 사용하므로 Datadog을 초기화하기 전에 `HttpOverrides.global`만 초기화하면 됩니다.

Datadog [Distributed Tracing][6]을 활성화하려면 설정 개체에서 `DdSdkConfiguration.firstPartyHosts` 속성을 분산 추적을 지원하는 도메인으로 설정해야 합니다. 분산 추적의 샘플링 속도를 수정하려면 `RumConfiguration`에서 `tracingSamplingRate`를 설정하세요.

- `firstPartyHosts`는 와일드카드를 허용하지 않지만 지정된 도메인에 대해 모든 하위 도메인과 일치합니다. 예를 들어, `api.example.com`는 `news.example.com`가 아닌 `staging.api.example.com` 및 `prod.api.example.com`와 일치합니다.

- `RumConfiguration.tracingSamplingRate`는 기본 샘플링 속도를 20%로 설정합니다. 모든 리소스 요청이 전체 분산 추적을 생성하도록 하려면 이 값을 `100.0`으로 설정합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ko/account_management/api-app-keys/#client-tokens
[3]: /ko/real_user_monitoring/flutter/#setup
[4]: https://pub.dev/packages/datadog_flutter_plugin
[5]: https://pub.dev/packages/datadog_tracking_http_client
[6]: /ko/serverless/distributed_tracing
[7]: /ko/real_user_monitoring/flutter/data_collected/
[8]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html
[9]: https://api.flutter.dev/flutter/dart-io/HttpOverrides/current.html
[10]: https://pub.dev/documentation/datadog_tracking_http_client/latest/datadog_tracking_http_client/DatadogTrackingHttpOverrides-class.html
[11]: https://pub.dev/packages/go_router
[12]: /ko/real_user_monitoring/flutter/advanced_configuration/#automatic-view-tracking