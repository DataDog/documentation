---
aliases:
- /ja/real_user_monitoring/android/integrated_libraries/
code_lang: android
code_lang_weight: 10
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: ソースコード
  text: Source code for dd-sdk-android
- link: /real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries
  tag: Documentation
  text: Integrated Libraries
kind: documentation
title: Android and Android TV Libraries for RUM
type: multi-code-lang
---

This page lists integrated libraries you can use for Android and Android TV applications.

## Coil

If you use Coil to load images in your application, see Datadog's [dedicated Coil library][1].

## Fresco

If you use Fresco to load images in your application, see Datadog's [dedicated Fresco library][2].

## Glide

If you use Glide to load images in your application, see Datadog's [dedicated Glide library][3].

## Jetpack Compose

If you use Jetpack Compose in your application, see Datadog's [dedicated Jetpack Compose library][7].

## RxJava

If you use RxJava in your application, see Datadog's [dedicated RxJava library][8].

## Picasso

If you use Picasso, use it with the `OkHttpClient` that's been instrumented with the Datadog SDK for RUM and APM information about network requests made by Picasso.

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val picasso = Picasso.Builder(context)
            .downloader(OkHttp3Downloader(okHttpClient))
            // ...
            .build()
       Picasso.setSingletonInstance(picasso)
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
        final Picasso picasso = new Picasso.Builder(context)
            .downloader(new OkHttp3Downloader(okHttpClient))
            // ...
            .build();
        Picasso.setSingletonInstance(picasso);
   ```
{{% /tab %}}
{{< /tabs >}}

## Retrofit

If you use Retrofit, use it with the `OkHttpClient` that's been instrumented with the Datadog SDK for RUM and APM information about network requests made with Retrofit.

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
        val retrofitClient = Retrofit.Builder()
            .client(okHttpClient)
            // ...
            .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
        final Retrofit retrofitClient = new Retrofit.Builder()
            .client(okHttpClient)
            // ...
            .build();
   ```
{{% /tab %}}
{{< /tabs >}}

## SQLDelight

If you use SQLDelight in your application, see Datadog's [dedicated SQLDelight library][4].

## SQLite

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
            // ...

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

## Apollo (GraphQL)

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

## Android TV (Leanback)

If you use the Leanback API to add actions into your Android TV application, see Datadog's [dedicated Android TV library][6].

## Kotlin Coroutines

If you use Kotlin Coroutines, see Datadog's [dedicated library with extensions for RUM][9] and with [extensions for Trace][10].

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