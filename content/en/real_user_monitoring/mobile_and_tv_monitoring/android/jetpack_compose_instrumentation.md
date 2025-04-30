---
title: Jetpack Compose Instrumentation
description: Instrument Jetpack Compose manually or automatically using the Datadog Gradle Plugin.
---
## Overview
If your application uses Jetpack Compose, you can instrument it manually or automatically with the Datadog Gradle Plugin. This enables Real User Monitoring (RUM) similar to what is available for Android views.

Note: The minimum supported Kotlin version is 1.9.23.

## Setup
### Step 1 - Declare "dd-sdk-android-compose" as a dependency
To track Jetpack Compose views with RUM, add `dd-sdk-android-compose` dependency to each module you want to instrument. This includes the application module, any Jetpack Compose UI modules, or feature modules using Jetpack Compose.
{{< tabs >}}
{{% tab "Groovy" %}}
```groovy
dependencies {
    implementation "com.datadoghq:dd-sdk-android-compose:2.21.0+"
    //(...)
}
```
{{% /tab %}}
{{% tab "Kotlin" %}}
```kotlin
dependencies {
    implementation("com.datadoghq:dd-sdk-android-compose:2.21.0+")
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
As described in the [Setup section][2], declare the [Datadog Gradle Plugin][3] in your build script and apply it to each module you want to instrument.

###  What Datadog Gradle Plugin does for Jetpack Compose
The [Datadog Gradle Plugin][3] scans `@Composable` functions and adds [Semantics][4] tags to their modifiers. These tags allow Datadog RUM to track user interactions on Compose components with the correct target information. The plugin also detects `NavHost` usage and listens to Jetpack Compose navigation events.

###  Step 1 - Declare Datadog Gradle Plugin in your buildscript
{{< tabs >}}
{{% tab "Groovy" %}}
```groovy
buildscript {
    dependencies {
        classpath "com.datadoghq:dd-sdk-android-gradle-plugin:1.17.0+"
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
        classpath("com.datadoghq:dd-sdk-android-gradle-plugin:1.17.0+")
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
In your modules,
{{< tabs >}}
{{% tab "Groovy" %}}
```groovy
datadog{
	// Other configurations that you may set before.
	//(...)

	// Jetpack Compose instrumentation mode option.
	composeInstrumentation = InstrumentationMode.AUTO
}
```
{{% /tab %}}
{{% tab "Kotlin" %}}
```kotlin
datadog{
	// Other configurations that you may set before.
	//(...)

	// Jetpack Compose instrumentation mode option.
	composeInstrumentation = InstrumentationMode.AUTO
}
```
{{% /tab %}}
{{< /tabs >}}

Available instrumentation modes:
-   `InstrumentationMode.AUTO`: Instruments all `@Composable` functions.
-   `InstrumentationMode.ANNOTATION`: Only instruments `@Composable` functions annotated with `@ComposeInstrumentation`.
-   `InstrumentationMode.DISABLE`: Disables instrumentation completely.

Note: if you don't declare `composeInstrumentation` in `datadog` block, the auto-instrumentation is disabled by default.

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
-   `Home Screen` is used as the **view name** when `HomeScreen()` is loaded.
-   `CustomButton` is used as the **action target** when the button is clicked.

{{< img src="real_user_monitoring/android/android-auto-instrumentation-naming.png" alt="Default naming of auto-instrumentation" style="width:90%;">}}


## Manual Instrumentation

### Actions tracking
To track user interactions with specific Jetpack Compose components, apply the `datadog` modifier. The `name` argument defines the view name displayed in the RUM event list.
```kotlin
@Composable
fun HomeScreen(){
	Column{
		Image(modifier = Modifier.datadog(name = "Welcome Image").clickable{
            //Action can be tracked if this image is clickable
        },
			// other arguments
		)

		Text(modifier = Modifier.datadog(name = "Welcome Text").clickable{
            //Action can be tracked if this text is clickable
        },
			// other arguments
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
[2]: https://docs.datadoghq.com/real_user_monitoring/mobile_and_tv_monitoring/android/setup?tab=rum#step-1---declare-the-android-sdk-as-a-dependency
[3]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[4]: https://developer.android.com/develop/ui/compose/accessibility/semantics
