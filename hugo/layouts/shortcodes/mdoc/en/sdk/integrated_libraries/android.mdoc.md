<!--
This partial contains integrated libraries content for the Android SDK.
It can be included in the Android SDK integrated libraries page or in the unified client_sdks view.
-->

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

{% tabs %}
{% tab label="Kotlin" %}
   ```kotlin
   val picasso = Picasso.Builder(context)
      .downloader(OkHttp3Downloader(okHttpClient))
      // …
      .build()
   Picasso.setSingletonInstance(picasso)
   ```
{% /tab %}
{% tab label="Java" %}
   ```java
   final Picasso picasso = new Picasso.Builder(context)
      .downloader(new OkHttp3Downloader(okHttpClient))
      // …
      .build();
   Picasso.setSingletonInstance(picasso);
   ```
{% /tab %}
{% /tabs %}

## Retrofit

If you use Retrofit, use it with the `OkHttpClient` that's been instrumented with the Datadog SDK for RUM and APM information about network requests made with Retrofit.

{% tabs %}
{% tab label="Kotlin" %}
   ```kotlin
   val retrofitClient = Retrofit.Builder()
      .client(okHttpClient)
      // …
      .build()
   ```
{% /tab %}
{% tab label="Java" %}
   ```java
   final Retrofit retrofitClient = new Retrofit.Builder()
      .client(okHttpClient)
      // …
      .build();
   ```
{% /tab %}
{% /tabs %}

## SQLDelight

If you use SQLDelight in your application, see Datadog's [dedicated SQLDelight library][4].

## SQLite

Following SQLiteOpenHelper's [generated API documentation][5], you only have to provide the implementation of the
`DatabaseErrorHandler` -> `DatadogDatabaseErrorHandler` in the constructor.

Doing this detects whenever a database is corrupted and sends a relevant
RUM error event for it.

{% tabs %}
{% tab label="Kotlin" %}
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
{% /tab %}
{% tab label="Java" %}
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
{% /tab %}
{% /tabs %}

## Apollo (GraphQL)

If you use Apollo (GraphQL) in your application, see Datadog's [dedicated library with extensions for Apollo][11] and [Android advanced network configuration][12].

## Android TV (Leanback)

If you use the Leanback API to add actions into your Android TV application, see Datadog's [dedicated Android TV library][6].

## Kotlin Coroutines

If you use Kotlin Coroutines, see Datadog's [dedicated library with extensions for RUM][9] and with [extensions for Trace][10].

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
[11]: https://github.com/DataDog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-apollo
[12]: /real_user_monitoring/application_monitoring/android/advanced_configuration?tab=kotlin#apollo-instrumentation
