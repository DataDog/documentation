---
title: Flutter Libraries for RUM
code_lang: flutter
type: multi-code-lang
code_lang_weight: 30
aliases:
- /real_user_monitoring/flutter/integrated_libraries/
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: "Source Code"
  text: Source code for dd-sdk-flutter
- link: /real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries
  tag: Documentation
  text: Integrated Libraries
---

This page lists integrated libraries you can use for Flutter applications.

## GraphQL (gql_link)

Datadog provides [`datadog_gql_link`][1] for use with most GraphQL Flutter libraries, including `graphql_flutter` and `ferry`.

### Setup

Add `datadog_gql_link` to your `pubspec.yaml` or by running `flutter pub add datadog_gql_link` from your terminal:

```yaml
dependencies:
  # Other dependencies
  datadog_gql_link: ^1.0.0
```

When creating your GraphQL link, add the `DatadogGqlLink` above your terminating link. For example:

```dart
final graphQlUrl = "https://example.com/graphql";

final link = Link.from([
  DatadogGqlLink(DatadogSdk.instance, Uri.parse(graphQlUrl)),
  HttpLink(graphQlUrl),
]);
```

If you are tracking non-GraphQL network calls with `datadog_tracking_http_client`, you need to configure the tracking plugin to ignore requests to your GraphQL endpoint. Otherwise, GraphQL resources will be reported twice, and APM traces may be broken. Ignore your GraphQL endpoint by using the `ignoreUrlPatterns` parameter added to `datadog_tracking_http_client` version 2.1.0.

```dart
final datadogConfig = DatadogConfiguration(
    // Your configuration
  )..enableHttpTracking(
      ignoreUrlPatterns: [
        RegExp('example.com/graphql'),
      ],
    );
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pub.dev/packages/datadog_gql_link