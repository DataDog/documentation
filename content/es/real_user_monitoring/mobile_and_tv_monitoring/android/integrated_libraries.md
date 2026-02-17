---
aliases:
- /es/real_user_monitoring/android/integrated_libraries/
- /es/real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries/android
description: Integra bibliotecas populares de Android como Coil, OkHttp y Retrofit
  con RUM para monitorizar automáticamente las solicitudes de red y la carga de imágenes.
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: Código fuente
  text: Código fuente de dd-sdk-android
title: Bibliotecas de Android y Android TV para RUM
---

Esta página enumera las bibliotecas integradas que puedes utilizar para aplicaciones Android y Android TV.

## Coil (Coroutine Image Loader).

Si utilizas Coil para cargar imágenes en tu aplicación, consulta la [biblioteca dedicada de Coil][1] de Datadog.

## Fresco

Si utilizas Fresco para cargar imágenes en tu aplicación, consulta la [biblioteca dedicada de Fresco][2] de Datadog.

## Glide

Si utilizas Glide para cargar imágenes en tu aplicación, consulta la [biblioteca dedicada de Glide][3] de Datadog.

## Jetpack Compose

Si utilizas Jetpack Compose en tu aplicación, consulta la [biblioteca dedicada de Jetpack Compose][7] de Datadog.

## RxJava

Si utilizas RxJava en tu aplicación, consulta [la biblioteca dedicada de RxJava][8] de Datadog.

## Picasso

Si utilizas Picasso, utilízalo con el `OkHttpClient` que ha sido instrumentado con el SDK de Datadog para RUM e información de APM sobre solicitudes de red realizadas por Picasso.

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

Si utilizas Retrofit, utilízalo con el `OkHttpClient` que ha sido instrumentado con el SDK de Datadog para RUM e información de APM sobre solicitudes de red realizadas con Retrofit.

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

Si utilizas SQLDelight en tu aplicación, consulta [biblioteca dedicada de SQLDelight][4] de Datadog.

## SQLite

Siguiendo la [documentación de la API generada][5] de SQLiteOpenHelper, sólo tienes que proporcionar la implementación de la directiva
 `DatabaseErrorHandler` -> `DatadogDatabaseErrorHandler` en el constructor.

De este modo se detecta si una base de datos está dañada y se envía un evento de error
RUM correspondiente.

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

Si utilizas Apollo, utilízalo con `OkHttpClient` que ha sido instrumentado con el SDK de Datadog para RUM e información de APM sobre todas las consultas realizadas a través del cliente Apollo.

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

Si utilizas la API de Leanback para añadir acciones a tu aplicación Android TV, consulta [biblioteca dedicada de Android TV][6] de Datadog.

## Kotlin Coroutines

Si utilizas Kotlin Coroutines, consulta la [biblioteca dedicada con extensiones para RUM][9] y con [extensiones para traza][10].

## Referencias adicionales

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