---
dependencies:
- https://github.com/DataDog/dd-sdk-android/blob/master/docs/integrated_libraries_android.md
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: Github
  text: Code source dd-sdk-android
- link: /real_user_monitoring
  tag: Page d'accueil
  text: Explorer le service RUM de Datadog
kind: documentation
title: Bibliothèques Android intégrées
---
## Bibliothèques intégrées

### Coil

Si vous utilisez Coil pour charger des images dans votre application, testez la [bibliothèque Coil dédiée][1] de Datadog.

### Fresco

Si vous utilisez Fresco pour charger des images dans votre application, testez la [bibliothèque Fresco dédiée][2] de Datadog.

### Glide

Si vous utilisez Glide pour charger des images dans votre application, testez la [bibliothèque Glide dédiée][3] de Datadog.

### Picasso

Si vous utilisez la bibliothèque Picasso, laissez-la utiliser votre client `OkHttpClient` pour récupérer des informations RUM et APM sur les requêtes réseau effectuées par Picasso.

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

### Retrofit

Si vous utilisez la bibliothèque Retrofit, laissez-la utiliser votre client `OkHttpClient` pour récupérer des informations RUM et APM sur les requêtes réseau effectuées par Retrofit.

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

### SQLDelight

Si vous utilisez SQLDelight, testez la [bibliothèque SQLDelight dédiée][4] de Datadog.

### SQLite

Conformément à la [documentation générée sur l'API][5] de SQLiteOpenHelper, il vous suffit de spécifier l'implémentation de `DatabaseErrorHandler` -> `DatadogDatabaseErrorHandler` dans le constructeur.

Cette intégration permet de détecter toute corruption de base de données et d'envoyer un événement d'erreur RUM associé.

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
        class <YourOwnSqliteOpenHelper>: SqliteOpenHelper(
                                        <Context>, 
                                        <NOM_BASE_DE_DONNÉES>, 
                                        <CursorFactory>, 
                                        <VERSION_BASE_DE_DONNÉES>,
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
                      <NOM_BASE_DE_DONNÉES>,
                      <CursorFactory>,
                      <VERSION_BASE_DE_DONNÉES>,
                      new DatadogDatabaseErrorHandler());
            }
       }
   ```
{{% /tab %}}
{{< /tabs >}}

### Apollo (GraphQL)

Si vous utilisez Apollo, laissez-le utiliser votre client `OkHttpClient` pour récupérer des informations RUM et APM sur les requêtes effectuées via le client Apollo.

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
        val apolloClient =  ApolloClient.builder()
            .okHttpClient(okHttpClient)
            .serverUrl(<URL_SERVEUR_APOLLO>)
            .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
        final ApolloClient apolloClient = new ApolloClient.builder()
            .okHttpClient(okHttpClient)
            .serverUrl(<URL_SERVEUR_APOLLO>)
            .build();
   ```
{{% /tab %}}
{{< /tabs >}}

### Android TV (Leanback)

Si vous utilisez l'API Leanback pour ajouter des actions à votre application Android TV, testez la [bibliothèque Android TV dédiée][6] de Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/tree/master/dd-sdk-android-coil
[2]: https://github.com/DataDog/dd-sdk-android/tree/master/dd-sdk-android-fresco
[3]: https://github.com/DataDog/dd-sdk-android/tree/master/dd-sdk-android-glide
[4]: https://github.com/DataDog/dd-sdk-android/tree/master/dd-sdk-android-sqldelight
[5]: https://developer.android.com/reference/android/database/sqlite/SQLiteOpenHelper
[6]: https://github.com/DataDog/dd-sdk-android/tree/master/dd-sdk-android-tv