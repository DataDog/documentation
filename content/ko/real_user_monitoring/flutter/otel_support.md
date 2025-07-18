---
description: RUM Flutter와 함께 OpenTelemetry를 사용하는 방법에 대해 알아보세요.
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
title: OpenTelemetry 지원
---
[Datadog Tracking HTTP Client][1] 패키지와 [gRPC Interceptor][2] 패키지는 모두 헤더 자동 생성과 헤더 수집을 통한 분산 트레이스를 지원합니다.

## Datadog 헤더 생성

클라이언트 추적 또는 gRPC 인터셉터를 설정할 때 Datadog에서 생성할 추적 헤더의 유형을 지정할 수 있습니다. 예를 들어, `b3` 헤더를 `example.com`에 보내고 `tracecontext`헤더를 `myapi.names`에 보낼 경우 다음 코드를 사용할 수 있습니다:

```dart
final hostHeaders = {
    'example.com': { TracingHeaderType.b3 },
    'myapi.names': { TracingHeaderType.tracecontext}
};
```

초기 구성 중에 이 개체를 사용할 수 있습니다:

```dart
// 기본 Datadog HTTP 추적의 경우:
final configuration = DdSdkConfiguration(
    // configuration
    firstPartyHostsWithTracingHeaders: hostHeaders,
);
```

그런 다음 평소와 같이 추적을 활성화할 수 있습니다.

이 정보는 `DdSdkConfiguration.firstPartyHosts`에 설정된 모든 호스트와 병합됩니다. `firstPartyHosts`에 지정된 호스트는 기본적으로 Datadog 추적 헤더를 생성합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://pub.dev/packages/datadog_tracking_http_client
[2]: https://pub.dev/packages/datadog_grpc_interceptor
[3]: https://github.com/openzipkin/b3-propagation#single-headers
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: https://www.w3.org/TR/trace-context/#tracestate-header