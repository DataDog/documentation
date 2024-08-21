---
aliases:
- /es/real_user_monitoring/flutter/integrated_libraries/
code_lang: flutter
code_lang_weight: 30
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: Código fuente
  text: Código fuente de dd-sdk-flutter
- link: /real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries
  tag: Documentación
  text: Bibliotecas integradas
title: Bibliotecas de Flutter para RUM
type: multi-code-lang
---

Esta página enumera las bibliotecas integradas que puedes utilizar para las aplicaciones Flutter.

## GraphQL (gql_link)

Datadog proporciona [`datadog_gql_link`][1] para su uso con la mayoría de bibliotecas de GraphQL, incluidas `graphql_flutter` y `ferry`.

### Configuración

Añade `datadog_gql_link` a tu `pubspec.yaml` o ejecuta `flutter pub add datadog_gql_link` desde tu terminal:

```yaml
dependencies:
  # Otras dependencias
  datadog_gql_link: ^1.0.0
```

Cuando creas tu enlace GraphQL, añade el `DatadogGqlLink` encima de tu enlace de terminación. Por ejemplo:

```dart
final graphQlUrl = "https://example.com/graphql";

final link = Link.from([
  DatadogGqlLink(DatadogSdk.instance, Uri.parse(graphQlUrl)),
  HttpLink(graphQlUrl),
]);
```

Si estás rastreando llamadas de red que no sean de GraphQL con `datadog_tracking_http_client`, debes configurar el complemento de rastreo para ignorar las solicitudes a tu endpoint de GraphQL. De lo contrario, los recursos de GraphQL serán informados dos veces, y las trazas de APM pueden romperse. Ignora tu endpoint de GraphQL con el parámetro `ignoreUrlPatterns` añadido a `datadog_tracking_http_client` versión 2.1.0.

```dart
final datadogConfig = DatadogConfiguration(
    // Tu configuración
  )..enableHttpTracking(
      ignoreUrlPatterns: [
        RegExp('example.com/graphql'),
      ],
    );
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pub.dev/packages/datadog_gql_link