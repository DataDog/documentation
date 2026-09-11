---
aliases:
- /ko/real_user_monitoring/android/integrated_libraries/
- /ko/real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries/android
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: 소스 코드
  text: dd-sdk-android를 위한 소스 코드
title: RUM용 Android 및 Android TV 라이브러리
---

이 페이지에는 Android 및 Android TV 애플리케이션에 사용할 수 있는 통합 라이브러리가 나열되어 있습니다.

## Coil

Coil을 사용하여 애플리케이션에 이미지를 로드하는 경우 Datadog의 [Coil 전용 라이브러리][1]를 참조하세요.

## Fresco

Fresco를 사용하여 애플리케이션에 이미지를 로드하는 경우 Datadog의 [Fresco 전용 라이브러리][2]를 참조하세요.

## Glide

Glide를 사용하여  애플리케이션에 이미지를 로드하는 경우 Datadog의 [Glide 전용 라이브러리][3]를 참조하세요.

## Jetpack Compose

애플리케이션에서 Jetpack Compose를 사용하는 경우 Datadog의 [Jetpack Compose 전용 라이브러리][7]를 참조하세요.

## RxJava

애플리케이션에서 RxJava를 사용하는 경우 Datadog의 [RxJava 전용 라이브러리][8]를 참조하세요.

## Picasso

Picasso를 사용하는 경우, Picasso에서 생성된 네트워크 요청에 대한 RUM 및 APM 정보에 대해 Datadog SDK로 계측된 `OkHttpClient`와 함께 사용하세요.

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

Retrofit을 사용하는 경우, Retrofit에서 생성된 네트워크 요청에 대한 RUM 및 APM 정보에 대해 Datadog SDK로 계측된 `OkHttpClient`와 함께 사용하세요.

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

애플리케이션에서 SQLDelight를 사용하는 경우 Datadog의 [SQLDelight 전용 라이브러리][4]를 참조하세요.

## SQLite

SQLiteOpenHelper의 [생성된 API 설명서][5]에 따르면, 컨스트럭터에서 `DatabaseErrorHandler` -> `DatadogDatabaseErrorHandler`의 구현만 제공하면 됩니다. 

이렇게 하면 데이터베이스가 손상될 때마다 이를 탐지하고 관련 RUM 오류 이벤트를 전송합니다.

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

Apollo을 사용하는 경우, Apollo 클라이언트를 통해 수행한 모든 쿼리에 대한 RUM 및 APM 정보에 대해 Datadog SDK로 계측된 `OkHttpClient`와 함께 사용하세요.

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

Leanback API를 사용하여 안드로이드 TV 애플리케이션에 액션을 추가하는 경우 Datadog의 [안드로이드 TV 전용 라이브러리][6]를 참조하세요.

## Kotlin Coroutines

Kotlin Coroutines를 사용하는 경우 Datadog의 [RUM용 확장이 있는 전용 라이브러리][9] 및 [트레이스용 확장][10]을 참조하세요.

## 참고 자료

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