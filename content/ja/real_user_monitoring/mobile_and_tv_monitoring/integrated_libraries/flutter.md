---
title: Flutter Libraries for RUM
code_lang: flutter
type: multi-code-lang
code_lang_weight: 30
aliases:
- /real_user_monitoring/flutter/integrated_libraries/
further_reading:
- link: "https://github.com/DataDog/dd-sdk-flutter"
  tag: ソースコード
  text: Source code for dd-sdk-flutter
- link: /real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries
  tag: Documentation
  text: Integrated Libraries
---

This page lists integrated libraries you can use for Flutter applications.

## GraphQL (gql_link)

Datadog provides [`datadog_gql_link`][1] for use with most GraphQL Flutter libraries, including `graphql_flutter` and `ferry`.

### セットアップ

`pubspec.yaml` に `datadog_gql_link` を追加するか、ターミナルから `flutter pub add datadog_gql_link` を実行します。

```yaml
dependencies:
  # 他の依存関係
  datadog_gql_link: ^1.0.0
```

GraphQL リンクを作成するときは、終端リンクの上に `DatadogGqlLink` を追加します。例:

```dart
final graphQlUrl = "https://example.com/graphql";

final link = Link.from([
  DatadogGqlLink(DatadogSdk.instance, Uri.parse(graphQlUrl)),
  HttpLink(graphQlUrl),
]);
```

`datadog_tracking_http_client` を使って非 GraphQL ネットワークコールを追跡している場合は、GraphQL エンドポイントへのリクエストを無視するように追跡プラグインを構成する必要があります。そうしないと、GraphQL リソースが 2 回レポートされ、APM トレースが壊れる可能性があります。`datadog_tracking_http_client` バージョン 2.1.0 に追加された `ignoreUrlPatterns` パラメーターを使用して、GraphQL エンドポイントを無視します。

```dart
final datadogConfig = DatadogConfiguration(
    // あなたの構成
  )..enableHttpTracking(
      ignoreUrlPatterns: [
        RegExp('example.com/graphql'),
      ],
    );
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pub.dev/packages/datadog_gql_link