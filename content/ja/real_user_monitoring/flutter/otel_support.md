---
dependencies:
- https://github.com/DataDog/dd-sdk-flutter/blob/main/packages/datadog_flutter_plugin/doc/rum/otel_support.md
description: OpenTelemetry を RUM Flutter で使用する方法について説明します。
further_reading:
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: ブログ
  text: Datadog Mobile RUM による Flutter アプリケーションのパフォーマンス監視
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: dd-sdk-flutter ソースコード
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: RUM データの調査方法
kind: documentation
title: OpenTelemetry のサポート
---
[Datadog Tracking HTTP Client][1] パッケージと [gRPC Interceptor][2] パッケージは、いずれも自動ヘッダー生成とヘッダー取り込みの両方により分散型トレーシングをサポートします。

## Datadog のヘッダー生成

追跡クライアントや gRPC インターセプターを構成する際に、Datadog に生成させたい追跡ヘッダーの種類を指定することができます。例えば、`example.com` には `b3` ヘッダーを、`myapi.names` には `tracecontext` ヘッダーを送信したい場合、以下のコードで実現できます。

```dart
final hostHeaders = {
    'example.com': { TracingHeaderType.b3 },
    'myapi.names': { TracingHeaderType.tracecontext}
};
```

このオブジェクトは、初期構成時に使用することができます。

```dart
// デフォルトの Datadog HTTP トレース用:
final configuration = DdSdkConfiguration(
    // 構成
    firstPartyHostsWithTracingHeaders: hostHeaders,
);
```

その後、通常通りトレースを有効にすることができます。

この情報は、`DdSdkConfiguration.firstPartyHosts` で設定されたホストとマージされます。`firstPartyHosts` で指定されたホストは、デフォルトで Datadog Tracing Headers を生成します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://pub.dev/packages/datadog_tracking_http_client
[2]: https://pub.dev/packages/datadog_grpc_interceptor
[3]: https://github.com/openzipkin/b3-propagation#single-headers
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: https://www.w3.org/TR/trace-context/#tracestate-header