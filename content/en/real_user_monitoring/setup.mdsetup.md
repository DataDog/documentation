---
dependencies:
- https://github.com/DataDog/dd-sdk-android/blob/master/docs/rum_collection.md
kind: documentation
title: Getting Started with Android RUM Collection
---
<div class="alert alert-info">The Android RUM collection is in public beta, and is currently not supported by Datadog.</div>

Send [Real User Monitoring data][1] to Datadog from your Android applications with [Datadog's `dd-sdk-android` client-side RUM library][2] and leverage the following features:

* get a global idea about your app’s performance and demographics;
* understand which resources are the slowest;
* analyze errors by OS and device type.

**Note**: RUM on Android is still experimental, and will be available in the `dd-sdk-android` library version `1.5.0` or higher. The `dd-sdk-android` library supports all Android versions from API level 19 (Kit-Kat).

## Setup

1. Add the Gradle dependency by declaring the library as a dependency in your `build.gradle` file:

    ```conf
    repositories {
        maven { url "https://dl.bintray.com/datadog/datadog-maven" }
    }

    dependencies {
        implementation "com.datadoghq:dd-sdk-android:x.x.x"
    }
    ```

2. Initialize the library with your application context and your [Datadog client token][4]. For security reasons, you must use a client token: you cannot use [Datadog API keys][5] to configure the `dd-sdk-android` library as they would be exposed client-side in the Android application APK byte code. For more information about setting up a client token, see the [client token documentation][4]. You also need to provide an Application ID (see our [RUM Getting Started page][3]).

    {{< tabs >}}
    {{% tab "US" %}}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        val config = DatadogConfig.Builder("<CLIENT_TOKEN>", "<ENVIRONMENT_NAME>", "<APPLICATION_ID>")
                        .trackInteractions()
                        .useViewTrackingStrategy(strategy)
                        .build()
        Datadog.initialize(this, config)
    }
}
```

    {{% /tab %}}
    {{% tab "EU" %}}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        val config = DatadogConfig.Builder("<CLIENT_TOKEN>", "<ENVIRONMENT_NAME>", "<APPLICATION_ID>")
                        .trackInteractions()
                        .useViewTrackingStrategy(strategy)
                        .useEUEndpoints()
                        .build()
        Datadog.initialize(this, config)
    }
}
```

    {{% /tab %}}
    {{< /tabs >}}

Depending on your application's architecture, you can choose one of several implementations of `ViewTrackingStrategy`:

  - `ActivityViewTrackingStrategy`: Every activity in your application is considered a distinct view.
  - `FragmentViewTrackingStrategy`: Every fragment in your application is considered a distinct view.
  - `NavigationViewTrackingStrategy`: If you use the Android Jetpack Navigation library, this is the recommended strategy. It automatically tracks the navigation destination as a distinct view.
  - `MixedViewTrackingStrategy`: Every activity or fragment in your application is considered a distinct view. This strategy is a mix between the `ActivityViewTrackingStrategy` and `FragmentViewTrackingStrategy`.
  
  **Note**: For `ActivityViewTrackingStrategy`, `FragmentViewTrackingStrategy`, or `MixedViewTrackingStrategy` you can filter which `Fragment` or `Activity` is tracked as a RUM View by providing a `ComponentPredicate` implementation in the constructor.
  
  **Note**: By default RUM Monitor for View tracking runs in manual mode so if you decide not to provide a view tracking strategy you will have to manually send the
  views by calling the start/stop View API methods yourself.

3. Configure and register the RUM Monitor. You only need to do it once, usually in your application's `onCreate()` method:

    ```kotlin
    val monitor = RumMonitor.Builder().build()
    GlobalRum.registerIfAbsent(monitor)
    ```

4. If you want to track your OkHttp requests as resources, you can add the provided [Interceptor][6] as follows:

    ```kotlin
    val okHttpClient =  OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor())
        .build()
    ```

    This creates RUM Resource data around each request processed by the OkHttpClient, with all the relevant information automatically filled (URL, method, status code, error). Note that only network requests started when a view is active will be tracked. If you want to track requests when your application is in background, you can create a view manually as explained below.

    **Note**: If you also use multiple Interceptors, this one must be called first.

5. (Optional) If you want to get timing information in Resources (such as time to first byte, DNS resolution, etc.), you can add the provided [Event][6] listener as follows:

    ```kotlin
    val okHttpClient =  OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor())
        .eventListenerFactory(DatadogEventListener.Factory())
        .build()
    ```

6. (Optional) If you want to manually track RUM events, you can use the `GlobalRum` class.
  
  To track views, call the `RumMonitor#startView` when the view becomes visible and interactive (equivalent with the lifecycle event `onResume`) followed by `RumMonitor#stopView` when the view is no longer visible(equivalent with the lifecycle event `onPause`) as follows:

   ```kotlin
      fun onResume(){
        GlobalRum.get().startView(viewKey, viewName, viewAttributes)        
      }
      
      fun onPause(){
        GlobalRum.get().stopView(viewKey, viewAttributes)        
      }
   ```
  
  To track resources, call the `RumMonitor#startResource` when the resource starts being loaded, and `RumMonitor#stopResource` when it is fully loaded, or `RumMonitor#stopResourceWithError` if an error occurs while loading the resource, as follows:
  
   ```kotlin
      fun loadResource(){
        GlobalRum.get().startResource(resourceKey, method, url, resourceAttributes)
        try {
          // do load the resource
          GlobalRum.get().stopResource(resourceKey, resourceKind, additionalAttributes)
        } catch (e : Exception) {
          GlobalRum.get().stopResourceWithError(resourceKey, message, origin, e)
        }
      }
   ```
  
  To track user actions, call the `RumMonitor#addUserAction`, or for continuous actions, call the `RumMonitor#startUserAction` and `RumMonitor#stopUserAction`, as follows:
  
   ```kotlin
      fun onUserInteraction(){
        GlobalRum.get().addUserAction(resourceKey, method, url, resourceAttributes)
      }
   ```

## Batch collection

All the RUM events are first stored on the local device in batches. Each batch follows the intake specification. They are sent as soon as network is available, and the battery is high enough to ensure the Datadog SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while being offline, no data will be lost.

The data on disk will automatically be discarded if it gets too old to ensure the SDK doesn't use too much disk space.


## Extensions

### Glide

If your existing codebase is using Glide, you can send more information (as RUM Resources and Errors) to Datadog automatically by using the [dedicated library](glide_integration.md).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/real_user_monitoring/data_collected/
[2]: https://github.com/DataDog/dd-sdk-android
[3]: https://docs.datadoghq.com/real_user_monitoring/installation/?tab=us
[4]: https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens
[5]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[6]: https://square.github.io/okhttp/interceptors/
[7]: https://square.github.io/okhttp/events/
