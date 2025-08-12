---
aliases:
- /ko/real_user_monitoring/flutter/integrated_libraries/
- /ko/real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries/flutter
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: 소스 코드
  text: dd-sdk-flutter의 소스 코드
title: RUM용 Flutter 라이브러리
---

이 페이지에서는 Flutter 애플리케이션에 사용할 수 있는 통합 라이브러리 목록을 확인할 수 있습니다.

## 라우팅 및 자동 보기 트래킹

Flutter Navigator v2.0을 사용하는 경우 라우팅 미들웨어에 따라 자동 보기 추적 설정이 달라집니다. 이 섹션에서는 가장 많이 사용되는 라우팅 패키지를 사용해 통합하는 방법을 설명합니다.

### go_router

[go_router][2]는 Flutter Navigator v1과 동일한 옵저버 인터페이스를 사용하므로 다른 옵저버에 `DatadogNavigationObserver`를 `GoRouter`에 대한 파라미터로 추가할 수 있습니다.

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

ShellRoute를 사용하는 경우 아래와 같이 각 `ShellRoute`에 별도의 옵저버를 제공해야 합니다. 자세한 내용은 [이 버그][3]를 참조하세요.

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

[AutoRoute][4]는 `config` 메서드의 일부로 `navigatorObservers` 중 하나로 제공되는 `DatadogNavigationObserver`를 사용할 수 있습니다.

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

이 새 개체는 더 간단한 `DatadogNavigationObserver`를 대체합니다.

### Beamer

[Beamer][5]는 `BeamerDelegate`에 대한 인자로 `DatadogNavigationObserver`를 사용할 수 있습니다:

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

## 웹 보기 추적

실제 사용자 모니터링(RUM)을 통해 모니터 웹 뷰를 확인하고 하이브리드 모바일 애플리케이션의 사각지대를 제거할 수 있습니다.

Datadog Flutter SDK에는 [`webview_flutter`][8] 및 [`flutter_inappwebview`][9]와 함께 작업할 수 있는 패키지가 있습니다. 자세한 내용은 [웹 뷰 추적 설명서 페이지][10]를 참조하세요.

## gRPC

Datadog는 [grpc Flutter 패키지][7]와 함께 사용할 수 있는 [`datadog_grpc_interceptor`][6]을 제공합니다. gRPC 인터셉터는 RUM 리소스로 gRPC 요청을 자동으로 추적하고 APM을 통해 분산 추적을 지원합니다.

### 설정

`pubspec.yaml` 또는 터미널에서 `flutter pub add datadog_grpc_interceptor`를 실행하여 `datadog_grpc_interceptor`를 추가합니다.

```yaml
dependencies:
  # Other dependencies
  datadog_grpc_interceptor: ^1.1.0
```

이 플러그인을 사용하려면 `DatadogGrpcInterceptor` 인스턴스를 생성한 다음 생성된 gRPC 클라이언트에 전달합니다.

```dart
import 'package:datadog_grpc_interceptor/datadog_grpc_interceptor.dart'

// Datadog 초기화 - [DatadogConfiguration.firstPartyHosts] 구성원으로 설정
// Datadog 분산 추적 활성화
final config = DatadogConfiguration(
  // ...
  firstPartyHosts = ['localhost']
)

// gRPC 채널 생성
final channel = ClientChannel(
  'localhost',
  port: 50051,
  options: ChannelOptions(
    // ...
  ),
);

// 지원되는 채널을 사용해 gRPC 인터셉터 생성
final datadogInterceptor = DatadogGrpcInterceptor(DatadogSdk.instance, channel);

// Datadog 인터셉터를 패스하는 gRPC 생성
final stub = GreeterClient(channel, interceptors: [datadogInterceptor]);
```

## GraphQL (gql_link)

Datadog `graphql_flutter` 및 `ferry`를 포함한 대부분의 GraphQL Flutter 라이브러리에서 사용할 수 있도록 [`datadog_gql_link`][1]을 제공합니다. 이 링크는 GraphQL 요청을 RUM 리소스로서 자동으로 추적하고, 쿼리 이름, 변이 이름 및 변수를 리소스의 속성으로 추가하며, APM에서 분산 추적을 활성화합니다.

### 설정

`pubspec.yaml` 또는 터미널에서 `flutter pub add datadog_gql_link`를 실행하여 `datadog_gql_link`를 추가합니다.

```yaml
dependencies:
  # Other dependencies
  datadog_gql_link: ^1.0.0
```

GraphQL 링크를 생성할 때 종료 링크 위에 `DatadogGqlLink`를 추가합니다. 다음 에를 참고하세요.

```dart
final graphQlUrl = "https://example.com/graphql";

final link = Link.from([
  DatadogGqlLink(DatadogSdk.instance, Uri.parse(graphQlUrl)),
  HttpLink(graphQlUrl),
]);
```

`datadog_tracking_http_client`를 사용해 GraphQL 외 네트워크 호출을 추적하는 경우 GraphQL 엔드포인트에 대한 요청을 무시하도록 추적 플러그인을 구성해야 합니다. 그렇지 않으면 GraphQL 리소스가 두 번 보고되고 APM 추적이 중단될 수 있습니다. `datadog_tracking_http_client` 버전 2.1.0에 추가된 `ignoreUrlPatterns` 매개변수를 사용하여 GraphQL 엔드포인트를 무시하세요.

```dart
final datadogConfig = DatadogConfiguration(
    // 내 구성
  )..enableHttpTracking(
      ignoreUrlPatterns: [
        RegExp('example.com/graphql'),
      ],
    );
```



## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pub.dev/packages/datadog_gql_link
[2]: https://pub.dev/packages?q=go_router
[3]: https://github.com/flutter/flutter/issues/112196
[4]: https://pub.dev/packages/auto_route
[5]: https://pub.dev/packages/beamer
[6]: https://pub.dev/packages/datadog_grpc_interceptor
[7]: https://pub.dev/packages/grpc
[8]: https://pub.dev/packages/webview_flutter
[9]: https://pub.dev/packages/flutter_inappwebview
[10]: /ko/real_user_monitoring/mobile_and_tv_monitoring/web_view_tracking?tab=flutter