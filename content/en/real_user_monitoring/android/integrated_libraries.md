---
title: Android Integrated Libraries
kind: documentation
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: GitHub
  text: dd-sdk-android Source code
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Datadog RUM
---

## Overview

This page lists integrated libraries you can use for Android and Android TV Monitoring.
 
### Coil
 
If you use Coil to load images in your application, take a look at Datadog's [dedicated Coil library][1].
 
### Fresco
 
If you use Fresco to load images in your application, take a look at Datadog's [dedicated Fresco library][2].
 
### Glide
 
If you use Glide to load images in your application, take a look at Datadog's [dedicated Glide library][3].

### Jetpack Compose

If you use Jetpack Compose in your application, take a look at Datadog's [dedicated Jetpack Compose library][7].

### Picasso
 
If you use Picasso, let it use your `OkHttpClient` for RUM and APM information about network requests made by Picasso.

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
 
If you use Retrofit, let it use your `OkHttpClient` for RUM and APM information about network requests made with Retrofit.

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
 
If you use SQLDelight, take a look at Datadog's [dedicated SQLDelight library][4].
 
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
 
If you use Apollo, let it use your `OkHttpClient` for RUM and APM information about all the queries performed through Apollo client.

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
        val apolloClient =  ApolloClient.builder()
            .okHttpClient(okHttpClient)
            .serverUrl(<APOLLO_SERVER_URL>)
            .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
        final ApolloClient apolloClient = new ApolloClient.builder()
            .okHttpClient(okHttpClient)
            .serverUrl(<APOLLO_SERVER_URL>)
            .build();
   ```
{{% /tab %}}
{{< /tabs >}}

### Android TV (Leanback)

If you use the Leanback API to add actions into your Android TV application, take a look at Datadog's [dedicated Android TV library][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/tree/master/dd-sdk-android-coil
[2]: https://github.com/DataDog/dd-sdk-android/tree/master/dd-sdk-android-fresco
[3]: https://github.com/DataDog/dd-sdk-android/tree/master/dd-sdk-android-glide
[4]: https://github.com/DataDog/dd-sdk-android/tree/master/dd-sdk-android-sqldelight
[5]: https://developer.android.com/reference/android/database/sqlite/SQLiteOpenHelper
[6]: https://github.com/DataDog/dd-sdk-android/tree/master/dd-sdk-android-tv
[7]: https://github.com/Datadog/dd-sdk-android/tree/master/dd-sdk-android-compose
