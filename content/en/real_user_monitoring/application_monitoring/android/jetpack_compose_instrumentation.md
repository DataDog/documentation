---
title: Jetpack Compose Instrumentation
description: Instrument Jetpack Compose manually or automatically using the Datadog Gradle Plugin.
aliases:
  - /real_user_monitoring/android/jetpack_compose_instrumentation/
  - /real_user_monitoring/mobile_and_tv_monitoring/jetpack_compose_instrumentation/android
  - /real_user_monitoring/mobile_and_tv_monitoring/android/jetpack_compose_instrumentation
further_reading:
- link: https://github.com/DataDog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-compose
  tag: "Source Code"
  text: Source code for dd-sdk-android-compose
- link: https://github.com/DataDog/dd-sdk-android-gradle-plugin
  tag: "Source Code"
  text: Source code for Datadog Gradle Plugin
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Datadog RUM
---
## Overview
Jetpack Compose is a toolkit for building native UI in Android. If your application uses Jetpack Compose, you can instrument it manually or automatically with the Datadog Gradle Plugin. This enables Real User Monitoring (RUM) similar to what is available for Android classic Views.

<div class="alert alert-info"><p>The minimum supported Kotlin version is 1.9.23.</p></div>

After initial setup, you can choose between [automatic](#automatic-instrumentation) and [manual](#manual-instrumentation) instrumentation.

## Setup
### Step 1 - Declare "dd-sdk-android-compose" as a dependency
Add `dd-sdk-android-compose` as a dependency to each module you want to instrument. This includes the application module, any Jetpack Compose UI modules, or feature modules using Jetpack Compose.
The minimum version of `dd-sdk-android-compose` for Jetpack Compose instrumentation is 2.21.0.
{{< tabs >}}
{{% tab "Groovy" %}}
```groovy
dependencies {
    implementation "com.datadoghq:dd-sdk-android-compose:x.x.x"
    //(...)
}
```
{{% /tab %}}
{{% tab "Kotlin" %}}
```kotlin
dependencies {
    implementation("com.datadoghq:dd-sdk-android-compose:x.x.x")
    //(...)
}
```
{{% /tab %}}
{{< /tabs >}}

### Step 2 - Enable actions tracking option in `RumConfiguration`
After adding the dependency, enable Compose action tracking in your `RumConfiguration`. This step is required regardless of the instrumentation mode.
{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
      //other configurations that you have already set
      .enableComposeActionTracking()
      .build()
Rum.enable(rumConfig)
```
{{% /tab %}}
{{% tab "Java" %}}
```java
RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
      //other configurations that you have already set
      .enableComposeActionTracking()
      .build();
Rum.enable(rumConfig);
```
{{% /tab %}}
{{< /tabs >}}

## Automatic Instrumentation

For full RUM coverage with minimal setup, you can automatically instrument your Jetpack Compose application.

As described in Step 1 of the [Android setup section][2], declare the [Datadog Gradle Plugin][3] in your build script and apply it to each module you want to instrument.

<div class="alert alert-info"><p>
The Datadog Gradle Plugin scans <code>@Composable</code> functions and adds Semantics tags to their modifiers. These tags allow Datadog RUM to track user interactions on Compose components with the correct target information. The plugin also detects <code>NavHost</code> usage and listens to Jetpack Compose navigation events.
</p></div>

###  Step 1 - Declare Datadog Gradle Plugin in your buildscript
The minimum version of Datadog Gradle Plugin for Jetpack Compose instrumentation is 1.17.0.
{{< tabs >}}
{{% tab "Groovy" %}}
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
{{% /tab %}}
{{% tab "Kotlin" %}}
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
{{% /tab %}}
{{< /tabs >}}

### Setup 2 - Select the instrumentation mode
In your module's Gradle configuration, define the desired Compose instrumentation mode:

{{< tabs >}}
{{% tab "Groovy" %}}
```groovy
datadog {
	// Other configurations that you may set before.
	//(...)

	// Jetpack Compose instrumentation mode option.
	composeInstrumentation = "AUTO"
}
```
{{% /tab %}}
{{% tab "Kotlin" %}}
```kotlin
datadog {
  // Other configurations that you may set before.
  //(...)

  // Jetpack Compose instrumentation mode option.
  composeInstrumentation = InstrumentationMode.AUTO
}
```
{{% /tab %}}
{{< /tabs >}}

Available instrumentation modes:

{{< tabs >}}
{{% tab "Groovy" %}}
- `"AUTO"`: Instruments all `@Composable` functions.
- `"ANNOTATION"`: Only instruments `@Composable` functions annotated with `@ComposeInstrumentation`. You can define the scope of auto-instrumentation by using this annotation.
- `"DISABLE"`: Disables instrumentation completely.
{{% /tab %}}

{{% tab "Kotlin" %}}

- `InstrumentationMode.AUTO`: Instruments all `@Composable` functions.
- `InstrumentationMode.ANNOTATION`: Only instruments `@Composable` functions annotated with `@ComposeInstrumentation`. You can define the scope of auto-instrumentation by using this annotation.
- `InstrumentationMode.DISABLE`: Disables instrumentation completely.

{{% /tab %}}
{{< /tabs >}}

**Note**: If you don't declare `composeInstrumentation` in `datadog` block, the auto-instrumentation is disabled by default.

### How names are assigned with auto-instrumentation
When auto-instrumentation is enabled:
-   The **Compose navigation route** is used as the **view name**.
-   The **name of the direct composable function** that wraps an interactive element is used as the **action target**.

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
-   "Home Screen" is used as the **view name** when `HomeScreen()` is loaded.
-   "CustomButton" is used as the **action target** when the button is clicked.

{{< img src="real_user_monitoring/android/android-auto-instrumentation-naming.png" alt="Default naming of auto-instrumentation" style="width:90%;">}}


## Manual Instrumentation

If you need more customization or control over actions and views tracking, you can manually instrument your application(s).

### Actions tracking
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
In the example above, the custom names are used for the interactive elements in Rum actions tracking.

{{< img src="real_user_monitoring/android/android-actions-tracking-1.png" alt="Component name in actions tracking" style="width:90%;">}}


### Views tracking
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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-compose
[2]: https://docs.datadoghq.com/real_user_monitoring/application_monitoring/android/setup?tab=rum#step-1---declare-the-android-sdk-as-a-dependency
[3]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[4]: https://developer.android.com/develop/ui/compose/accessibility/semantics
