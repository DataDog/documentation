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

Jetpack Compose is a toolkit for building native UI in Android. If your application uses Jetpack Compose, you can instrument it manually or automatically with the Datadog Gradle Plugin using the [dedicated Jetpack Compose library][7]. This enables Real User Monitoring (RUM) similar to what is available for Android classic Views.

{% alert level="info" %}
The minimum supported Kotlin version is 1.9.23.
{% /alert %}

After initial setup, choose between automatic and manual instrumentation.

### Setup

#### Step 1 - Declare "dd-sdk-android-compose" as a dependency

Add `dd-sdk-android-compose` as a dependency to each module you want to instrument. This includes the application module, any Jetpack Compose UI modules, or feature modules using Jetpack Compose.
The minimum version of `dd-sdk-android-compose` for Jetpack Compose instrumentation is 2.21.0.

{% tabs %}
{% tab label="Groovy" %}
   ```groovy
   dependencies {
       implementation "com.datadoghq:dd-sdk-android-compose:x.x.x"
       //(...)
   }
   ```
{% /tab %}
{% tab label="Kotlin" %}
   ```kotlin
   dependencies {
       implementation("com.datadoghq:dd-sdk-android-compose:x.x.x")
       //(...)
   }
   ```
{% /tab %}
{% /tabs %}

#### Step 2 - Enable actions tracking option in `RumConfiguration`

After adding the dependency, enable Compose action tracking in your `RumConfiguration`. This step is required regardless of the instrumentation mode.

{% tabs %}
{% tab label="Kotlin" %}
   ```kotlin
   val rumConfig = RumConfiguration.Builder(applicationId)
         //other configurations that you have already set
         .enableComposeActionTracking()
         .build()
   Rum.enable(rumConfig)
   ```
{% /tab %}
{% tab label="Java" %}
   ```java
   RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
         //other configurations that you have already set
         .enableComposeActionTracking()
         .build();
   Rum.enable(rumConfig);
   ```
{% /tab %}
{% /tabs %}

### Automatic instrumentation

For full RUM coverage with minimal setup, you can automatically instrument your Jetpack Compose application.

As described in Step 1 of the [Android setup section][13], declare the [Datadog Gradle Plugin][3] in your build script and apply it to each module you want to instrument.

{% alert level="info" %}
The Datadog Gradle Plugin scans `@Composable` functions and adds Semantics tags to their modifiers. These tags allow Datadog RUM to track user interactions on Compose components with the correct target information. The plugin also detects `NavHost` usage and listens to Jetpack Compose navigation events.
{% /alert %}

#### Step 1 - Declare the Datadog Gradle Plugin in your buildscript

The minimum version of Datadog Gradle Plugin for Jetpack Compose instrumentation is 1.17.0.

{% tabs %}
{% tab label="Groovy" %}
   ```groovy
   buildscript {
       dependencies {
           classpath "com.datadoghq:dd-sdk-android-gradle-plugin:x.x.x"
       }
   }

   plugins {
       id 'com.datadoghq.dd-sdk-android-gradle-plugin'
       //(...)
   }
   ```
{% /tab %}
{% tab label="Kotlin" %}
   ```kotlin
   buildscript {
       dependencies {
           classpath("com.datadoghq:dd-sdk-android-gradle-plugin:x.x.x")
       }
   }

   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin")
       //(...)
   }
   ```
{% /tab %}
{% /tabs %}

#### Step 2 - Select the instrumentation mode

In your module's Gradle configuration, define the desired Compose instrumentation mode:

{% tabs %}
{% tab label="Groovy" %}
   ```groovy
   datadog {
   	// Other configurations that you may set before.
   	//(...)

   	// Jetpack Compose instrumentation mode option.
   	composeInstrumentation = "AUTO"
   }
   ```

   Available instrumentation modes:

   - `"AUTO"`: Instruments all `@Composable` functions.
   - `"ANNOTATION"`: Only instruments `@Composable` functions annotated with `@ComposeInstrumentation`. You can define the scope of auto-instrumentation by using this annotation.
   - `"DISABLE"`: Disables instrumentation completely.
{% /tab %}
{% tab label="Kotlin" %}
   ```kotlin
   datadog {
     // Other configurations that you may set before.
     //(...)

     // Jetpack Compose instrumentation mode option.
     composeInstrumentation = InstrumentationMode.AUTO
   }
   ```

   Available instrumentation modes:

   - `InstrumentationMode.AUTO`: Instruments all `@Composable` functions.
   - `InstrumentationMode.ANNOTATION`: Only instruments `@Composable` functions annotated with `@ComposeInstrumentation`. You can define the scope of auto-instrumentation by using this annotation.
   - `InstrumentationMode.DISABLE`: Disables instrumentation completely.
{% /tab %}
{% /tabs %}

**Note**: If you don't declare `composeInstrumentation` in the `datadog` block, auto-instrumentation is disabled by default.

#### How names are assigned with auto-instrumentation

When auto-instrumentation is enabled:

- The **Compose navigation route** is used as the **view name**.
- The **name of the direct composable function** that wraps an interactive element is used as the **action target**.

```kotlin
@Composable
fun AppScaffold(){
    NavHost(navController = rememberNavController(), startDestination = "Home Screen"){
      composable("Home Screen"){
        HomeScreen()
      }
    }
}

@Composable
fun CustomButton(onClick: () -> Unit) {
    Button(onClick = onClick){
       Text("Welcome Button")
    }
}
```

In the example above:

- "Home Screen" is used as the **view name** when `HomeScreen()` is loaded.
- "CustomButton" is used as the **action target** when the button is clicked.

{% img src="real_user_monitoring/android/android-auto-instrumentation-naming.png" alt="Default naming of auto-instrumentation" style="width:90%;" /%}

### Manual instrumentation

If you need more customization or control over actions and views tracking, you can manually instrument your application(s).

#### Actions tracking

To track user interactions with specific Jetpack Compose components, apply the `datadog` modifier. The `name` argument defines the view name displayed in the RUM event list.

```kotlin
@Composable
fun HomeScreen(){
 Column{
     Image(modifier = Modifier.datadog(name = "Welcome Image").clickable{
       // Action can be tracked if this image is clickable
     },
      // Other arguments
     )

     Text(modifier = Modifier.datadog(name = "Welcome Text").clickable{
       // Action can be tracked if this text is clickable
     },
      // Other arguments
     )
 }
}
```

In the example above, the custom names are used for the interactive elements in RUM actions tracking.

{% img src="real_user_monitoring/android/android-actions-tracking-1.png" alt="Component name in actions tracking" style="width:90%;" /%}

#### Views tracking

To enable RUM view tracking based on Jetpack Compose navigation, call the `NavigationViewTrackingEffect` API and pass your app's `NavHostController`.

```kotlin
@Composable
fun AppScaffold(){
	val navController = rememberNavController()
	NavigationViewTrackingEffect(
	    navController = navController,
	    trackArguments = true,
	    destinationPredicate = AcceptAllNavDestinations()
	)
	NavHost(navController = navController,
	    // other arguments
	) {
	   // (...)
	}
}
```

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
[13]: /real_user_monitoring/application_monitoring/android/setup?tab=rum#step-1---declare-the-android-sdk-as-a-dependency
