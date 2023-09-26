---
description: Flutter 모니터링을 설정하는 방법에 대해 알아보세요.
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: dd-sdk-flutter의 소스 코드
- link: real_user_monitoring/explorer/
  tag: 설명서
  text: RUM 데이터를 탐색하는 방법 알아보기
kind: 설명서
title: RUM Flutter 고급 설정
---
## 개요

아직 Datadog Flutter SDK for RUM을 설정하지 않은 경우 [인앱 설정 지침][1]을 따르거나 [RUM Flutter 설정 설명서][2]를 참조하세요.

## 자동 보기 추적

Flutter Navigator v2.0을 사용하는 경우 자동 보기 추적 설정은 라우팅 미들웨어에 따라 다릅니다. 여기에서는 가장 많이 사용되는 라우팅 패키지와 통합하는 방법을 설명합니다.

### go_router

[go_router][8]는 Flutter Navigator v1과 동일한 옵저버 인터페이스를 사용하므로 `DatadogNavigationObserver`를 다른 옵저버에 `GoRouter`에 대한 파라미터로 추가할 수 있습니다.

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
  // Your remaining setup
);
```

ShellRoutes를 사용하는 경우 아래와 같이 각 `ShellRoute`에 별도의 옵저버를 제공해야 합니다. 자세한 내용은 [이 버그][11]을 참조하세요.

```dart
final _router = GoRouter(
  routes: [
    ShellRoute(build: shellBuilder),
    routes: [
      // 추가 경로
    ],
    observers: [
      DatadogNavigationObserver(datadogSdk: DatadogSdk.instance),
    ],
  ],
  observers: [
    DatadogNavigationObserver(datadogSdk: DatadogSdk.instance),
  ],
);
MaterialApp.router(
  routerConfig: _router,
  // 남은 설정
);
```

또한 `builder` 파라미터 위에 `GoRoute`의 `pageBuilder`파라미터를 사용하는 경우 `state.pageKey` 값과 `name` 값을 `MaterialPage`에 전달해야 합니다.

```dart
GoRoute(
  name: 'My Home',
  path: '/path',
  pageBuilder: (context, state) {
    return MaterialPage(
      key: state.pageKey,       // GoRouter가 Observers를 호출하는 데 필요합니다.
      name: name,               // Datadog이 올바른 경로 이름을 얻는 데 필요합니다.
      child: _buildContent(),
    );
  },
),
```

### AutoRoute

[AutoRoute][9]는 `config` 메서드의 일부로 `navigatorObservers`중의 하나로 제공되는 `DatadogNavigationObserver`를 사용할 수 있습니다.

```dart
return MaterialApp.router(
  routerConfig: _router.config(
    navigatorObservers: () => [
      DatadogNavigationObserver(
        datadogSdk: DatadogSdk.instance,
      ),
    ],
  ),
  // 남은 설정
);
```

그러나 AutoRoute의 탭 라우팅을 사용하는 경우 AutoRoute의 `AutoRouteObserver`인터페이스로 Datadog의 기본 옵저버를 확장해야 합니다.

```dart
class DatadogAutoRouteObserver extends DatadogNavigationObserver
    implements AutoRouterObserver {
  DatadogAutoRouteObserver({required super.datadogSdk});

  // 옵저버 탭 경로로만 재정의
  @override
  void didInitTabRoute(TabPageRoute route, TabPageRoute? previousRoute) {
    datadogSdk.rum?.startView(route.path, route.name);
  }

  @override
  void didChangeTabRoute(TabPageRoute route, TabPageRoute previousRoute) {
    datadogSdk.rum?.startView(route.path, route.name);
  }
}
```

이 새 개체는 AutoRoute의 설정을 생성할 때 더 단순한 `DatadogNavigationObserver`를 대체합니다.

### Beamer

[Beamer][10]는 `BeamerDelegate`에 대한 인수로 `DatadogNavigationObserver`를 사용할 수 있습니다.

```dart
final routerDelegate = BeamerDelegate(
  locationBuilder: RoutesLocationBuilder(
    routes: {
      // 경로 설정
    },
  ),
  navigatorObservers: [
    DatadogNavigationObserver(DatadogSdk.instance),
  ]
);
```

## 사용자 세션 강화

Flutter RUM은 사용자 활동, 보기(`DatadogNavigationObserver` 사용), 오류, 기본 충돌 및 네트워크 요청( Datadog Tracking HTTP Client 사용)과 같은 속성을 자동으로 추적합니다. RUM 이벤트 및 기본 속성에 대해 알아보려면 [RUM 데이터 수집 문서][3]를 참조하세요. 커스텀 이벤트를 추적하여 사용자 세션 정보를 더욱 강화하고 수집된 속성을 더욱 세밀하게 제어할 수 있습니다.

### 자체 성능 타이밍 추가

RUM의 기본 속성 외에도 `DdRum.addTiming`를 사용하여 애플리케이션이 시간을 소비하는 위치를 측정할 수 있습니다. 이 타이밍 측정값은 현재 RUM 보기의 시작을 기준으로 합니다.

예를 들어 히어로 이미지가 나타나는 데 걸리는 시간을 지정할 수 있습니다:

```dart
void _onHeroImageLoaded() {
    DatadogSdk.instance.rum?.addTiming("hero_image");
}
```

타이밍을 설정하면 `@view.custom_timings.<timing_name>`로 액세스할 수 있습니다. 예를 들어 `@view.custom_timings.hero_image`입니다.

대시보드에서 시각화를 만들려면 먼저 [측정값을 생성합니다][4].

### 사용자 액션 추적

`DdRum.addUserAction`를 사용하여 탭, 클릭 및 스크롤과 같은 특정 사용자 액션을 추적할 수 있습니다.

`RumUserActionType.tap`과 같은 즉각적인 RUM 액션을 수동으로 등록하려면 `DdRum.addUserAction()`를 사용하세요. `RumUserActionType.scroll`와 같은 연속적인 RUM 액션에 대해서는 `DdRum.startUserAction()`또는 `DdRum.stopUserAction()`를 사용하세요.

예시:

```dart
void _downloadResourceTapped(String resourceName) {
    DatadogSdk.instance.rum?.addUserAction(
        RumUserActionType.tap,
        resourceName,
    );
}
```

`DdRum.startUserAction`과 `DdRum.stopUserAction` 사용 시, Datadog Flutter SDK가 액션의 시작과 완료를 일치시키도록 하려면  `type` 액션이 동일해야 합니다.

### 커스텀 리소스 추적

[Datadog Tracking HTTP Client][5]를 사용하여 리소스를 자동으로 추적하는 것 외에도 [다음 방법][6]을 사용하여 네트워크 요청 또는 타사 공급자 API와 같은 특정 커스텀 리소스를 추적할 수 있습니다:

- `DdRum.startResourceLoading`
- `DdRum.stopResourceLoading`
- `DdRum.stopResourceLoadingWithError`
- `DdRum.stopResourceLoadingWithErrorInfo`

예시:

```dart
// 네트워크 클라이언트에서

DatadogSdk.instance.rum?.startResourceLoading(
    "resource-key",
    RumHttpMethod.get,
    url,
);

// 이후에

DatadogSdk.instance.rum?.stopResourceLoading(
    "resource-key",
    200,
    RumResourceType.image
);
```

Flutter Datadog SDK가 리소스의 시작과 완료를 일치시키려면 호출하는 리소스에 대해 두 호출에서`resourceKey`로 사용되는 `String`이 고유해야 합니다.

### 커스텀 오류 추적

특정 오류를 추적하려면 메시지, 소스, 예외 및 추가 속성에 오류가 발생할 때 `DdRum`을 알립니다.

```dart
DatadogSdk.instance.rum?.addError("This is an error message.");
```

## 커스텀 글로벌 속성 추적

Datadog Flutter SDK에서 자동으로 캡처하는 [기본 RUM 속성][3] 외에도 추가 컨텍스트 정보(커스텀 속성 등)를 RUM 이벤트에 추가하여 Datadog 내에서의 가시성을 강화할 수 있습니다.

커스텀 속성을 사용하면 관찰된 사용자 행동에 대한 정보(예: 카트 값, 판매자 계층 또는 광고 캠페인)를 코드 수준 정보(예: 백엔드 서비스, 세션 타임라인, 오류 로그 및 네트워크 상태)로 필터링하고 그룹화할 수 있습니다.

### 커스텀 글로벌 속성 설정

커스텀 글로벌 속성을 설정하려면 `DdRum.addAttribute`를 사용합니다.

* 속성을 추가하거나 업데이트하려면 `DdRum.addAttribute`를 사용합니다.
* 키를 제거하려면 `DdRum.removeAttribute`를 사용합니다.

### 사용자 세션 추적

RUM 세션에 사용자 정보를 추가하면 다음 작업을 쉽게 수행할 수 있습니다:

* 지정된 사용자의 이동 경로를 따릅니다
* 오류의 영향을 가장 많이 받는 사용자를 파악합니다.
* 가장 중요한 사용자를 위해 성능을 모니터링합니다.

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="RUM UI의 사용자 API" style="width:90%" >}}

다음 속성은 **선택 사항**이며, 이 중 **최소한** 하나를 제공해야 합니다:

| 속성 | 유형   | 설명                                                                                              |
|-----------|--------|----------------------------------------------------------------------------------------------------------|
| `usr.id`    | 문자열 | 고유한 사용자 식별자.                                                                                  |
| `usr.name`  | 문자열 | RUM UI에 기본적으로 표시되는 사용자 친화적인 이름.                                                  |
| `usr.email` | 문자열 | 사용자 이메일. 사용자 이름이 없는 경우 RUM UI에 표시됨. Gravatars를 가져오는 데 사용되기도 함.  |

사용자 세션을 식별하려면 `DdRum.setUserInfo`를 사용합니다.

예시:

```dart
DatadogSdk.instance.setUserInfo("1234", "John Doe", "john@doe.com");
```

## RUM 이벤트 수정 또는 삭제

**참고**: 이 기능은 아직 Flutter 웹 애플리케이션에서 사용할 수 없습니다.

RUM 이벤트가 Datadog으로 전송되기 전에 해당 속성을 수정하거나 이벤트를 완전히 삭제하려면 Flutter RUM SDK를 설정할 때 Event Mappers API를 사용하세요.

```dart
final config = DdSdkConfiguration(
    // other configuration...
    rumConfiguration: RumConfiguration(
        applicationId: '<YOUR_APPLICATION_ID>',
        rumViewEventMapper = (event) => event,
        rumActionEventMapper = (event) => event,
        rumResourceEventMapper = (event) => event,
        rumErrorEventMapper = (event) => event,
        rumLongTaskEventMapper = (event) => event,
    ),
);
```

각 맵퍼는 시그니처가 `(T) -> T?`인 함수이며, 여기서 `T`는 구체적인 RUM 이벤트 유형입니다. 이렇게 하면 이벤트가 전송되기 전에 이벤트의 일부를 변경하거나 이벤트를 완전히 삭제할 수 있습니다.

예를 들어, RUM 리소스의 `url`에서 민감한 정보를 삭제하려면 커스텀 `redacted` 함수을 구현하고 `rumResourceEventMapper`에서 사용합니다:

```dart
    rumResourceEventMapper = (event) {
        var resourceEvent = resourceEvent
        resourceEvent.resource.url = redacted(resourceEvent.resource.url)
        return resourceEvent
    }
}
```

오류, 리소스 또는 작업 매퍼에서 `null`이 반환되면 이벤트가 완전히 삭제되고 이벤트는 Datadog으로 전송되지 않습니다. 보기 이벤트 매퍼에서 반환되는 값은 `null`이 아니어야 합니다.

이벤트 유형에 따라 일부 특정 속성만 수정할 수 있습니다:

| 이벤트 유형       | 속성 키                     | 설명                                   |
|------------------|-----------------------------------|-----------------------------------------------|
| RumViewEvent     | `viewEvent.view.name`             | 보기 이름.                            |
|                  | `viewEvent.view.url`              | 보기 URL.                              |
|                  | `viewEvent.view.referrer`         | 보기의 참조 출처.                         |
| RumActionEvent   | `actionEvent.action.target?.name` | 액션의 이름.                           |
|                  | `actionEvent.view.name`           | 이 액션에 연결된 보기의 이름을 지정합니다.         |
|                  | `actionEvent.view.referrer`       | 이 액션에 연결된 보기의 참조 출처.   |
|                  | `actionEvent.view.url`            | 이 작업에 연결된 보기의 URL.        |
| RumErrorEvent    | `errorEvent.error.message`        | 오류 메시지.                                |
|                  | `errorEvent.error.stack`          | 오류의 스택 트레이스.                      |
|                  | `errorEvent.error.resource?.url`  | 오류가 참조하는 리소스의 URL.      |
|                  | `errorEvent.view.name`            | 이 액션에 연결된 보기 이름을 지정합니다.         |
|                  | `errorEvent.view.referrer`        | 이 액션에 연결된 보기의 참조 출처.   |
|                  | `errorEvent.view.url`             | 이 오류에 연결된 보기의 URL.         |
| RumResourceEvent | `resourceEvent.resource.url`      | 리소스의 URL.                          |
|                  | `resourceEvent.view.name`         | 이 액션에 연결된 보기 이름을 지정합니다.         |
|                  | `resourceEvent.view.referrer`     | 이 액션에 연결된 보기의 참조 출처.   |
|                  | `resourceEvent.view.url`          | 이 리소스에 연결된 보기의 URL.      |

이벤트 매퍼를 사용하면 보기 이름을 수정할 수 있지만 보기 이름을 변경하는 데 권장되는 방법은 아닙니다. 대신 [`DatadogNavigationObserver`][7]에서 `viewInfoExtractor` 파라미터를 사용하세요

## 추적 동의 설정(GDPR 및 CCPA 준수)

데이터 보호 및 개인정보 보호정책을 준수하기 위해 Flutter RUM SDK는 초기화 시 추적 동의 값을 입력해야 합니다.

`trackingConsent` 설정은 다음 값 중 하나가 될 수 있습니다:

1. `TrackingConsent.pending`: Flutter RUM SDK는 데이터 수집 및 일괄 처리를 시작하지만 데이터를 Datadog으로 전송하지는 않습니다. Flutter RUM SDK는 새로운 추적 동의 값을 기다렸다가 일괄 처리된 데이터로 수행할 작업을 결정합니다.
2. `TrackingConsent.granted`: 플러터 RUM SDK가 데이터 수집을 시작하여 Datadog으로 전송합니다.
3. `TrackingConsent.notGranted`: Flutter RUM SDK는 어떠한 데이터도 수집하지 않습니다. 로그, 추적 또는 RUM 이벤트가 Datadog으로 전송되지 않습니다.

 Flutter RUM SDK 초기화 후 추적 동의 값을 변경하려면 `DatadogSdk.setTrackingConsent` API 호출을 사용합니다. Flutter RUM SDK는 새로운 값에 따라 동작을 변경합니다.

예를 들어, 현재 추적 동의가 `TrackingConsent.pending`인 경우 값을 `TrackingConsent.granted`로 변경하면 Flutter RUM SDK는 이전에 기록된 모든 데이터와 이후의 데이터를 Datadog으로 전송합니다.

마찬가지로 `TrackingConsent.pending`에서 `TrackingConsent.notGranted`로 값을 변경하면 Flutter RUM SDK가 모든 데이터를 삭제하고 이후 데이터를 수집하지 않습니다.

## 디바이스가 오프라인일 때 데이터 전송

RUM은 사용자 디바이스가 오프라인 상태일 때 데이터의 가용성을 보장합니다. 네트워크 연결이 원활하지 않은 지역이 디바이스 배터리가 너무 부족한 경우 모든 RUM 이벤트는 먼저 로컬 디바이스에 일괄적으로 저장됩니다. 네트워크를 사용할 수 있고 배터리가 충분히 충전되어 Flutter RUM SDK가 최종 사용자 경험에 영향을 미치지 않도록 보장하는 즉시 전송됩니다. 애플리케이션이 포그라운드에서 실행 중인 상태에서 네트워크를 사용할 수 없거나 데이터 업로드에 실패하면 배치가 성공적으로 전송될 때까지 보관됩니다.

즉, 사용자가 오프라인 상태에서 애플리케이션을 열어도 데이터가 손실되지 않습니다.

**참고**: 디스크의 데이터가 너무 오래되면 Flutter RUM SDK가 디스크 공간을 너무 많이 사용하지 않도록 디스크의 데이터가 자동으로 삭제됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ko/real_user_monitoring/flutter/#setup
[3]: /ko/real_user_monitoring/flutter/data_collected
[4]: /ko/real_user_monitoring/explorer/?tab=measures#setup-facets-and-measures
[5]: https://github.com/DataDog/dd-sdk-flutter/tree/main/packages/datadog_tracking_http_client
[6]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/
[7]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogNavigationObserver-class.html
[8]: https://pub.dev/packages?q=go_router
[9]: https://pub.dev/packages/auto_route
[10]: https://pub.dev/packages/beamer
[11]: https://github.com/flutter/flutter/issues/112196