---
title: Integrated Libraries
kind: documentation
aliases:
- /real_user_monitoring/android/integrated_libraries/
- /real_user_monitoring/reactnative/integrated_libraries/
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: GitHub
  text: Source code for dd-sdk-android
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Datadog RUM
---

## Overview

This page lists integrated libraries you can use for the following applications:

- Android & Android TV Monitoring
- React Native
- Flutter

## Android & Android TV Monitoring

### Coil

If you use Coil to load images in your application, see Datadog's [dedicated Coil library][1].

### Fresco

If you use Fresco to load images in your application, see Datadog's [dedicated Fresco library][2].

### Glide

If you use Glide to load images in your application, see Datadog's [dedicated Glide library][3].

### Jetpack Compose

If you use Jetpack Compose in your application, see Datadog's [dedicated Jetpack Compose library][7].

### RxJava

If you use RxJava in your application, see Datadog's [dedicated RxJava library][8].

### Picasso

If you use Picasso, use it with the `OkHttpClient` that's been instrumented with the Datadog SDK for RUM and APM information about network requests made by Picasso.

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val picasso = Picasso.Builder(context)
            .downloader(OkHttp3Downloader(okHttpClient))
            // …
            .build()
       Picasso.setSingletonInstance(picasso)
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
        final Picasso picasso = new Picasso.Builder(context)
            .downloader(new OkHttp3Downloader(okHttpClient))
            // …
            .build();
        Picasso.setSingletonInstance(picasso);
   ```
{{% /tab %}}
{{< /tabs >}}

### Retrofit

If you use Retrofit, use it with the `OkHttpClient` that's been instrumented with the Datadog SDK for RUM and APM information about network requests made with Retrofit.

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
        val retrofitClient = Retrofit.Builder()
            .client(okHttpClient)
            // …
            .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
        final Retrofit retrofitClient = new Retrofit.Builder()
            .client(okHttpClient)
            // …
            .build();
   ```
{{% /tab %}}
{{< /tabs >}}

### SQLDelight

If you use SQLDelight in your application, see Datadog's [dedicated SQLDelight library][4].

### SQLite

Following SQLiteOpenHelper's [generated API documentation][5], you only have to provide the implementation of the
`DatabaseErrorHandler` -> `DatadogDatabaseErrorHandler` in the constructor.

Doing this detects whenever a database is corrupted and sends a relevant
RUM error event for it.

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
        class <YourOwnSqliteOpenHelper>: SqliteOpenHelper(
                                        <Context>,
                                        <DATABASE_NAME>,
                                        <CursorFactory>,
                                        <DATABASE_VERSION>,
                                        DatadogDatabaseErrorHandler()) {
            // …

        }
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       public class <YourOwnSqliteOpenHelper> extends SqliteOpenHelper {
            public <YourOwnSqliteOpenHelper>(){
                super(<Context>,
                      <DATABASE_NAME>,
                      <CursorFactory>,
                      <DATABASE_VERSION>,
                      new DatadogDatabaseErrorHandler());
            }
       }
   ```
{{% /tab %}}
{{< /tabs >}}

### Apollo (GraphQL)

If you use Apollo, use it with the `OkHttpClient` that's been instrumented with the Datadog SDK for RUM and APM information about all the queries performed through Apollo client.

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
        val apolloClient = ApolloClient.builder()
            .okHttpClient(okHttpClient)
            .serverUrl(<APOLLO_SERVER_URL>)
            .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
        ApolloClient apolloClient = new ApolloClient.builder()
            .okHttpClient(okHttpClient)
            .serverUrl(<APOLLO_SERVER_URL>)
            .build();
   ```
{{% /tab %}}
{{< /tabs >}}

### Android TV (Leanback)

If you use the Leanback API to add actions into your Android TV application, see Datadog's [dedicated Android TV library][6].

### Kotlin Coroutines

If you use Kotlin Coroutines, see Datadog's [dedicated library with extensions for RUM][9] and with [extensions for Trace][10].

## React Native

### React Navigation

#### Setup

**Note**: This package is an integration for `react-navigation` library, please make sure you first install and setup the core `mobile-react-native` SDK.

To install with NPM, run:

```sh
npm install @datadog/mobile-react-navigation
```

To install with Yarn, run:

```sh
yarn add @datadog/mobile-react-navigation
```

#### Track view navigation
To track changes in navigation as RUM Views, set the `onready` callback of your `NavigationContainer` component as follow. You can use the optional `ViewNamePredicate` parameter to replace the automatically detected View name with something more relevant to your use case.

Returning `null` in the `ViewNamePredicate` prevents the new RUM View from being created. The previous RUM View remains active.

```js
import * as React from 'react';
import { DdRumReactNavigationTracking, ViewNamePredicate } from '@datadog/mobile-react-navigation';
import { Route } from "@react-navigation/native";

const viewNamePredicate: ViewNamePredicate = function customViewNamePredicate(route: Route<string, any | undefined>, trackedName: string) {
  return "My custom View Name"
}

function App() {
  const navigationRef = React.useRef(null);
  return (
    <View>
      <NavigationContainer ref={navigationRef} onReady={() => {
        DdRumReactNavigationTracking.startTrackingViews(navigationRef.current, viewNamePredicate)
      }}>
        // …
      </NavigationContainer>
    </View>
  );
}
```

**Note**: Only one `NavigationContainer` can be tracked at the time. If you need to track another container, stop tracking the previous one first, using `DdRumReactNavigationTracking.stopTrackingViews()`.

### React Native Navigation

**Note**: This package is an integration for `react-native-navigation` library, please make sure you first install and setup the core `mobile-react-native` SDK.

#### Setup

To install with NPM, run:

```sh
npm install @datadog/mobile-react-native-navigation
```

To install with Yarn, run:

```sh
yarn add @datadog/mobile-react-native-navigation
```

#### Track view navigation

To start tracking your navigation events, add the following lines before setting up your navigation. You can use the optional `ViewNamePredicate` callback to replace the automatically detected View name with something more relevant to your use case, based on the [`ComponentDidAppearEvent`][11].

Returning null in the `ViewNamePredicate` prevents the new RUM View from being created. The previous RUM View remains active.

```sh
import { DdRumReactNativeNavigationTracking, ViewNamePredicate }  from '@datadog/mobile-react-native-navigation';
import { ComponentDidAppearEvent } from 'react-native-navigation';

const viewNamePredicate: ViewNamePredicate = function customViewNamePredicate(event: ComponentDidAppearEvent, trackedName: string) {
  return "My custom View Name"
}

DdRumReactNativeNavigationTracking.startTracking(viewNamePredicate);
```

## Flutter

### GraphQL (gql_link)

Datadog provides [`datadog_gql_link`][14] for use with most GraphQL Flutter libraries, including `graphql_flutter` and `ferry`.

#### Setup

Add `datadog_gql_link` to your `pubspec.yaml` or by running `flutter pub add datadog_gql_link` from your terminal

```yaml
dependencies:
  # Other dependencies
  datadog_gql_link: ^1.0.0
```

When creating your GraphQL link, add the `DatadogGqlLink` above at a location above your terminating link. For example:

```dart
final graphQlUrl = "https://example.com/graphql";

final link = Link.from([
  DatadogGqlLink(DatadogSdk.instance, Uri.parse(graphQlUrl)),
  HttpLink(graphQlUrl),
]);
```


If you are tracking non-GraphQL network calls with `datadog_tracking_http_client`, you need to have the tracking plugin ignore requests to your GraphQL endpoint. Otherwise, GraphQL resources will be double reported, and APM traces may be broken. Ignore your GraphQL endpoint by using the `ignoreUrlPatterns` parameter added to `datadog_tracking_http_client` version 2.1.0.

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

[1]: https://github.com/DataDog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-coil
[2]: https://github.com/DataDog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-fresco
[3]: https://github.com/DataDog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-glide
[4]: https://github.com/DataDog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-sqldelight
[5]: https://developer.android.com/reference/android/database/sqlite/SQLiteOpenHelper
[6]: https://github.com/DataDog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-tv
[7]: https://github.com/Datadog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-compose
[8]: https://github.com/Datadog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-rx
[9]: https://github.com/Datadog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-rum-coroutines
[10]: https://github.com/Datadog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-trace-coroutines
[11]: https://wix.github.io/react-native-navigation/api/events/#componentdidappear
[12]: https://reactnavigation.org/
[14]: https://pub.dev/packages/datadog_gql_link
