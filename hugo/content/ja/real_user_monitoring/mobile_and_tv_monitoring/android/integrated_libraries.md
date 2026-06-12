---
aliases:
- /ja/real_user_monitoring/android/integrated_libraries/
- /ja/real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries/android
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: ソースコード
  text: dd-sdk-android のソースコード
title: RUM 用 Android および Android TV ライブラリ
---

このページでは、Android および Android TV のアプリケーションに使用できるインテグレーションライブラリの一覧を示します。

## Coil

Coil を使用してアプリケーションに画像を読み込む場合は、Datadog の [Coil ライブラリ][1]をご覧ください。

## Fresco

Fresco を使用してアプリケーションに画像を読み込む場合は、Datadog の [Fresco ライブラリ][2]をご覧ください。

## Glide

Glide を使用してアプリケーションに画像を読み込む場合は、Datadog の [Glide ライブラリ][3]をご覧ください。

## Jetpack Compose

アプリケーションで Jetpack Compose を使用する場合は、Datadog の [Jetpack Compose 専用ライブラリ][7]をご覧ください。

## RxJava

アプリケーションで RxJava を使用する場合は、Datadog の [RxJava 専用ライブラリ][8]をご覧ください。

## Picasso

Picasso を使用する場合は、Datadog SDK でインスツルメンテーションされた `OkHttpClient` を使用して、Picasso によるネットワークリクエストに関する RUM および APM 情報を取得します。

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

Retrofit を使用する場合は、Datadog SDK でインスツルメンテーションされた `OkHttpClient` を使用して、Retrofit で行われたネットワークリクエストに関する RUM および APM 情報を取得します。

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

アプリケーションで SQLDelight を使用する場合は、Datadog の [SQLDelight 専用ライブラリ][4]をご覧ください。

## SQLite

SQLiteOpenHelper の[生成された API ドキュメント][5]に従って、コンストラクターで 
`DatabaseErrorHandler` -> `DatadogDatabaseErrorHandler` の実装を指定するだけで済みます。

これを行うと、データベースが破損している場合は常に検出され、関連する RUM エラーイベントが送信されます。

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

Apollo を使用する場合は、Datadog SDK でインスツルメンテーションされた `OkHttpClient` を使用して、Apollo クライアント経由で実行されたすべてのクエリに関する RUM および APM 情報を取得します。

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

Leanback API を使用して Android TV アプリケーションにアクションを追加する場合は、Datadog の [Android TV 専用ライブラリ][6]をご覧ください。

## Kotlin Coroutines

Kotlin Coroutines を使用する場合は、Datadog の [RUM 用拡張機能付き専用ライブラリ][9]と[トレーシング用拡張機能][10]をご覧ください。

## その他の参考資料

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