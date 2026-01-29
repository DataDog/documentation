---
title: Android Advanced Configuration
description: "Configure advanced Android RUM SDK settings to enrich user sessions, track custom events, and control data collection."
aliases:
    - /real_user_monitoring/android/advanced_configuration/
    - /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android
    - /real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: "Source Code"
  text: Source code for dd-sdk-android
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Datadog RUM
- link: https://github.com/DataDog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-apollo
  tag: "Source Code"
  text: Source code for dd-sdk-android-apollo
---
## Overview

If you have not set up the SDK yet, follow the [in-app setup instructions][1] or refer to the [Android RUM setup documentation][2]. 

## Enrich user sessions

Android RUM automatically tracks attributes such as user activity, screens, errors, and network requests. See the [RUM Data Collection documentation][3] to learn about the RUM events and default attributes. You can further enrich user session information and gain finer control over the attributes collected by tracking custom events.

### Custom views

In addition to [tracking views automatically][4], you can also track specific distinct views (such as activities and fragments) when they become visible and interactive in the `onResume()` lifecycle. Stop tracking when the view is no longer visible. Most often, this method should be called in the frontmost `Activity` or `Fragment`:


{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
   fun onResume() {
       GlobalRumMonitor.get().startView(viewKey, viewName, viewAttributes)
   }

   fun onPause() {
       GlobalRumMonitor.get().stopView(viewKey, viewAttributes)
   }
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
   public void onResume() {
       GlobalRumMonitor.get().startView(viewKey, viewName, viewAttributes);
   }
    
   public void onPause() {
       GlobalRumMonitor.get().stopView(viewKey, viewAttributes);
   }
   ```
{{% /tab %}}
{{< /tabs >}}

### Custom actions

In addition to [tracking actions automatically][5], you can also track specific custom user actions (such as taps, clicks, and scrolls) with `RumMonitor#addAction`. For continuous action tracking (for example, tracking a user scrolling a list), use `RumMonitor#startAction` and `RumMonitor#stopAction`.

Note the action type should be one of the following: "custom", "click", "tap", "scroll", "swipe", "back".

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
   fun onUserInteraction() { 
       GlobalRumMonitor.get().addAction(actionType, name, actionAttributes)
   }
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
   public void onUserInteraction() {
       GlobalRumMonitor.get().addAction(actionType, name, actionAttributes);
   }
   ```
{{% /tab %}}
{{< /tabs >}}

### Enrich resources

When [tracking resources automatically][6], provide a custom `RumResourceAttributesProvider` instance to add custom attributes to each tracked network request. For example, if you want to track a network request's headers, create an implementation as follows, and pass it in the builder of the `DatadogInterceptor`.

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
class CustomRumResourceAttributesProvider : RumResourceAttributesProvider {
    override fun onProvideAttributes(
        request: Request,
        response: Response?,
        throwable: Throwable?
    ): Map<String, Any?> {
        val headers = request.headers
        return headers.names().associate {
            "headers.${it.lowercase(Locale.US)}" to headers.values(it).first()
        }
    }
}
```
{{% /tab %}}
{{% tab "Java" %}}
```java
public class CustomRumResourceAttributesProvider implements RumResourceAttributesProvider {
    @NonNull
    @Override
    public Map<String, Object> onProvideAttributes(
            @NonNull Request request,
            @Nullable Response response,
            @Nullable Throwable throwable
    ) {
        Map<String, Object> result = new HashMap<>();
        Headers headers = request.headers();

        for (String key : headers.names()) {
            String attrName = "headers." + key.toLowerCase(Locale.US);
            result.put(attrName, headers.values(key).get(0));
        }
        
        return result;
    }
}
```
{{% /tab %}}
{{< /tabs >}}

### Custom resources

In addition to [tracking resources automatically][6], you can also track specific custom resources (such as network requests and third-party provider APIs) with methods (such as `GET` and `POST`) while loading the resource with `RumMonitor#startResource`. Stop tracking with `RumMonitor#stopResource` when it is fully loaded, or `RumMonitor#stopResourceWithError` if an error occurs while loading the resource.

{{< tabs >}} 
{{% tab "Kotlin" %}}
   ```kotlin
   fun loadResource() {
       GlobalRumMonitor.get().startResource(resourceKey, method, url, resourceAttributes)
       try {
           // do load the resource
           GlobalRumMonitor.get().stopResource(resourceKey, resourceKind, additionalAttributes)
       } catch (e: Exception) {
           GlobalRumMonitor.get().stopResourceWithError(resourceKey, message, origin, e)
       } 
   }
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
   public void loadResource() {
       GlobalRumMonitor.get().startResource(resourceKey, method, url, resourceAttributes);
       try {
           // do load the resource
           GlobalRumMonitor.get().stopResource(resourceKey, resourceKind, additionalAttributes);
       } catch (Exception e) {
           GlobalRumMonitor.get().stopResourceWithError(resourceKey, message, origin, e);
       }
   }
   ```
{{% /tab %}}
{{< /tabs >}}

### Custom errors

To track specific errors, notify the monitor when an error occurs with the message, source, exception, and additional attributes. Refer to the [Error Attributes documentation][7].

```kotlin
GlobalRumMonitor.get().addError(message, source, throwable, attributes)
```

### Add user properties

You can use the `addUserProperties` API to append extra user properties to previously set properties.

```kotlin
fun addUserProperties(extraInfo: Map<String, Any?>, sdkCore: SdkCore = getInstance()) {
    sdkCore.addUserProperties(extraInfo)
}
```

## Event and data management

The Android SDK first stores events and only uploads events when the [intake specifications][8] conditions are met.

### Clear all data

You have the option of deleting all unsent data stored by the SDK with the `clearAllData` API.

```kotlin
fun clearAllData(sdkCore: SdkCore = getInstance()) {
    sdkCore.clearAllData()
}
```

### Stop data collection

You can use the `StopInstance` API to stop the SDK instance assigned to the given name (or the default instance if the name is null) from collecting and uploading data further.

```kotlin
fun stopInstance(instanceName: String? = null) {
    synchronized(registry) {
        val instance = registry.unregister(instanceName)
        (instance as? DatadogCore)?.stop()
    }
}
```

### Control event buildup

Many operations, such as data processing and event input/output, are queued in background threads to handle edge cases where the queue has grown so much that there could be delayed processing, high memory usage, or Application Not Responding (ANR) errors.

You can control the buildup of events on the SDK with the `setBackpressureStrategy` API. This API ignores new tasks if a queue reaches 1024 items.

```kotlin
fun setBackpressureStrategy(backpressureStrategy: BackPressureStrategy): Builder {
    coreConfig = coreConfig.copy(backpressureStrategy = backpressureStrategy)
    return this
}
```

See an [example of this API][9] being used.

### Set remote log threshold

You can define the minimum log level (priority) to send events to Datadog in a logger instance. If the log priority is below the one you set at this threshold, it does not get sent. The default value is -1 (allow all).

```kotlin
fun setRemoteLogThreshold(minLogThreshold: Int): Builder {
    minDatadogLogsPriority = minLogThreshold
    return this
}
```

## Track custom global attributes

In addition to the [default RUM attributes][3] captured by the RUM Android SDK automatically, you can choose to add additional contextual information, such as custom attributes, to your RUM events to enrich your observability within Datadog. Custom attributes allow you to filter and group information about observed user behavior (such as cart value, merchant tier, or ad campaign) with code-level information (such as backend services, session timeline, error logs, and network health).

### Track user sessions

Adding user information to your RUM sessions makes it possible to:
* Follow the journey of a given user
* Know which users are the most impacted by errors
* Monitor performance for your most important users

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api-1.png" alt="User attributes of a session in the RUM UI" >}}

| Attribute   | Type   | Description                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | String | (Required) Unique user identifier.                                              |
| `usr.name`  | String | (Optional) User friendly name, displayed by default in the RUM UI.              |
| `usr.email` | String | (Optional) User email, displayed in the RUM UI if the user name is not present. |

To identify user sessions, use the `setUserInfo` API, for example:

```kotlin
Datadog.setUserInfo('1234', 'John Doe', 'john@doe.com')
```

### Track attributes

```kotlin
// Adds an attribute to all future RUM events
GlobalRumMonitor.get().addAttribute(key, value)

// Removes an attribute to all future RUM events
GlobalRumMonitor.get().removeAttribute(key)
```

## Track widgets
 
Widgets are not automatically tracked with the SDK. To send UI interactions from your widgets manually, call the Datadog API. [See example][10].

## Initialization parameters

You can use the following methods in `Configuration.Builder` when creating the Datadog configuration to initialize the library:

`setFirstPartyHosts()` 
: Defines hosts that have tracing enabled and have RUM resources categorized as `first-party`. **Note**: If you define custom tracing header types in the Datadog configuration and are using a tracer registered with `GlobalTracer`, make sure the same tracing header types are set for the tracer in use.

`useSite(DatadogSite)` 
: Switches target data to EU1, US1, US3, US5, US1_FED, AP1 and AP2 sites.

`setFirstPartyHostsWithHeaderType`
: Sets the list of first party hosts and specifies the type of HTTP headers used for distributed tracing.

`setBatchSize([SMALL|MEDIUM|LARGE])` 
: Defines the individual batch size for requests sent to Datadog.

`setUploadFrequency([FREQUENT|AVERAGE|RARE])` 
: Defines the frequency for requests made to Datadog endpoints (if requests are available).

`setBatchProcessingLevel(LOW|MEDIUM|HIGH)` 
: Defines the number of batches sent in each upload cycle.

`setAdditionalConfiguration`
: Allows you to provide additional configuration values that can be used by the SDK.

`setProxy`
: Enables a custom proxy for uploading tracked data to Datadog's intake.

`setEncryption(Encryption)` 
: Set an encryption function applied to data stored locally on the device.

`setPersistenceStrategyFactory`
: Allows you to use a custom persistence strategy.

`setCrashReportsEnabled(Boolean)`
: Allows you to control whether JVM crashes are tracked or not. The default value is `true`.

`setBackpressureStrategy(BackPressureStrategy)` 
: Define the strategy the SDK uses when handling large volumes of data and internal queues are full.
 
You can use the following methods in `RumConfiguration.Builder` when creating the RUM configuration to enable RUM features:

`trackUserInteractions(Array<ViewAttributesProvider>)` 
: Enables tracking user interactions (such as tap, scroll, or swipe). The parameter also allows you to add custom attributes to the RUM Action events based on the widget with which the user interacted.

`disableUserInteractionTracking`
: Disables the user interaction automatic tracker.

`useViewTrackingStrategy(strategy)` 
: Defines the strategy used to track views. See [Automatically track views](#automatically-track-views) for more information.

`trackLongTasks(durationThreshold)` 
: Enables tracking tasks taking longer than `durationThreshold` on the main thread as long tasks in Datadog. See [Automatically track long tasks](#automatically-track-long-tasks) for more information.

`trackNonFatalAnrs(Boolean)` 
: Enables tracking non-fatal ANRs. This is enabled by default on Android API 29 and below, and disabled by default on Android API 30 and above.

`setVitalsUpdateFrequency([FREQUENT|AVERAGE|RARE|NEVER])` 
: Sets the preferred frequency for collecting mobile vitals.

`setSessionSampleRate(<sampleRate>)` 
: Sets the RUM sessions sample rate. (A value of 0 means no RUM events are sent. A value of 100 means all sessions are kept.)

`setSessionListener(RumSessionListener)` 
: Sets a listener to be notified on when a new RUM Session starts.

`setTelemetrySampleRate`
: The sampling rate for the SDK internal telemetry utilized by Datadog. This must be a value between `0` and `100`. By default, this is set to `20`.

`setViewEventMapper`
: Sets the ViewEventMapper for the RUM ViewEvent. You can use this interface implementation to modify the ViewEvent attributes before serialization.

`setResourceEventMapper`
: Sets the EventMapper for the RUM ResourceEvent. You can use this interface implementation to modify the ResourceEvent attributes before serialization.

`setActionEventMapper`
: Sets the EventMapper for the RUM ActionEvent. You can use this interface implementation to modify the ActionEvent attributes before serialization.

`setErrorEventMapper`
: Sets the EventMapper for the RUM ErrorEvent. you can use this interface implementation to modify the ErrorEvent attributes before serialization.

`setInitialResourceIdentifier`
: Sets a custom identifier for initial network resources used for [Time-to-Network-Settled][11] (TNS) view timing calculation.

`setLastInteractionIdentifier`
: Sets a custom identifier for the last interaction in the previous view used for [Interaction-to-Next-View][13] (INV) timing calculation.

`setLongTaskEventMapper`
: Sets the EventMapper for the RUM LongTaskEvent. You can use this interface implementation to modify the LongTaskEvent attributes before serialization.

`trackBackgroundEvents`
: Enable/disable tracking RUM events when no activity is happening in the foreground. By default, background events are not tracked. Enabling this feature might increase the number of sessions tracked, and therefore your billing.

`trackFrustrations`
: Enable/disable tracking of frustration signals.

`useCustomEndpoint`
: Use RUM to target a custom server.

`trackAnonymousUser`
: When enabled, the SDK generates a unique, non-personal anonymous user ID that is persisted across app launches. This ID will be attached to each RUM Session, allowing you to link sessions originating from the same user/device without collecting personal data. By default, this is set to `true`.
 
### Automatically track views

To automatically track your views (such as activities and fragments), provide a tracking strategy at initialization. Depending on your application's architecture, you can choose one of the following strategies:

`ActivityViewTrackingStrategy`
: Every activity in your application is considered a distinct view.

`FragmentViewTrackingStrategy`
: Every fragment in your application is considered a distinct view.

`MixedViewTrackingStrategy` 
: Every activity or fragment in your application is considered a distinct view.

`NavigationViewTrackingStrategy`
: Recommended for Android Jetpack Navigation library users. Each Navigation destination is considered a distinct view.

For instance, to set each fragment as a distinct view, use the following configuration in your [setup][1]:

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
   val rumConfig = RumConfiguration.Builder(applicationId)
     .useViewTrackingStrategy(FragmentViewTrackingStrategy(...))
     .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
   RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
    .useViewTrackingStrategy(new FragmentViewTrackingStrategy(...))
    .build();
   ```
{{% /tab %}}
{{< /tabs >}}

   
For `ActivityViewTrackingStrategy`, `FragmentViewTrackingStrategy`, or `MixedViewTrackingStrategy`, you can filter which `Fragment` or `Activity` is tracked as a RUM View by providing a `ComponentPredicate` implementation in the constructor:

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
   val rumConfig = RumConfiguration.Builder(applicationId)
     .useViewTrackingStrategy(
       ActivityViewTrackingStrategy(
         trackExtras = true,
         componentPredicate = object : ComponentPredicate<Activity> {
           override fun accept(component: Activity): Boolean {
               return true
           }

           override fun getViewName(component: Activity): String? = null
         })
       )
     .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
   RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
       .useViewTrackingStrategy(new ActivityViewTrackingStrategy(
           true,
           new ComponentPredicate<Activity>() {
               @Override
               public boolean accept(Activity component) {
                   return true;
               }

               @Override
               public String getViewName(Activity component) {
                   return null;
               }
           }
       ))
       .build();
   ```
{{% /tab %}}
{{< /tabs >}}

   
**Note**: By default, the library is using `ActivityViewTrackingStrategy`. If you decide not to provide a view tracking strategy, you must manually send the views by calling the `startView` and `stopView` methods yourself.


### Automatically track network requests

#### Basic network instrumentation

To get timing information in resources (such as third-party providers, network requests) such as time to first byte or DNS resolution, customize the `OkHttpClient` to add the [EventListener][12] factory:

1. Add the Gradle dependency to the `dd-sdk-android-okhttp` library in the module-level `build.gradle` file:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

2. Add the [EventListener][12] factory:
    {{< tabs >}}
    {{% tab "Kotlin" %}}

```kotlin
val tracedHosts = listOf("example.com")
val okHttpClient = OkHttpClient.Builder()
    .addInterceptor(DatadogInterceptor.Builder(tracedHosts).build())
    .eventListenerFactory(DatadogEventListener.Factory())
    .build()
```

    {{% /tab %}}
    {{% tab "Java" %}}

```java
List<String> tracedHosts = Arrays.asList("example.com");
OkHttpClient okHttpClient = new OkHttpClient.Builder()
    .addInterceptor(new DatadogInterceptor.Builder(tracedHosts).build())
    .eventListenerFactory(new DatadogEventListener.Factory())
    .build();
```

    {{% /tab %}}
    {{< /tabs >}}

#### Apollo instrumentation

1. [Set up][14] RUM monitoring with Datadog Android RUM.

2. [Set up](#basic-network-instrumentation) OkHttp instrumentation with the Datadog RUM SDK.

3. Add the following to your application's build.gradle file.
```groovy
dependencies {
    implementation "com.datadoghq:dd-sdk-android-apollo:x.x.x"
}
```

4. Add the Datadog interceptor to your Apollo Client setup:
 
```kotlin
import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.network.okHttpClient
import com.datadog.android.apollo.DatadogApolloInterceptor

val apolloClient = ApolloClient.Builder()
    .serverUrl("GraphQL endpoint")
    .addInterceptor(DatadogApolloInterceptor())
    .okHttpClient(okHttpClient)
    .build()
```

This automatically adds Datadog headers to your GraphQL requests, allowing them to be tracked
by Datadog.

<div class="alert alert-danger">
  <ul>
    <li>The integration only supports Apollo version <code>4</code>.</li>
    <li>The <code>query</code> and <code>mutation</code> type operations are tracked, <code>subscription</code> operations are not.</li>
    <li>GraphQL payload sending is disabled by default. To enable it, set the <code>sendGraphQLPayloads</code> flag in the <code>DatadogApolloInterceptor</code> constructor as follows:</li>
  </ul>

  <pre><code class="language-kotlin">
DatadogApolloInterceptor(sendGraphQLPayloads = true)
  </code></pre>
</div>





### Automatically track long tasks

Long running operations performed on the main thread can impact the visual performance and reactivity of your application. To track these operations, define the duration threshold above which a task is considered too long.

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
   val rumConfig = RumConfiguration.Builder(applicationId)
     // …
     .trackLongTasks(durationThreshold)
     .build()
   ```

For example, to replace the default `100 ms` duration, set a custom threshold in your configuration.

   ```kotlin
   val rumConfig = RumConfiguration.Builder(applicationId)
     // …
     .trackLongTasks(250L) // track tasks longer than 250ms as long tasks
     .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
  ```java
  RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
    // …
    .trackLongTasks(durationThreshold)
    .build();
  ```

For example, to replace the default `100 ms` duration, set a custom threshold in your configuration.

   ```java
   RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
     // …
     .trackLongTasks(250L) // track tasks longer than 250ms as long tasks
     .build();
   ```
{{% /tab %}}
{{< /tabs >}}

## Modify or drop RUM events

To modify some attributes in your RUM events, or to drop some of the events entirely before batching, provide an implementation of `EventMapper<T>` when initializing the RUM Android SDK:

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
   val rumConfig = RumConfiguration.Builder(applicationId)
     // ...
     .setErrorEventMapper(rumErrorEventMapper)
     .setActionEventMapper(rumActionEventMapper)
     .setResourceEventMapper(rumResourceEventMapper)
     .setViewEventMapper(rumViewEventMapper)
     .setLongTaskEventMapper(rumLongTaskEventMapper)
     .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
  ```java
  RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
    // ...
    .setErrorEventMapper(rumErrorEventMapper)
    .setActionEventMapper(rumActionEventMapper)
    .setResourceEventMapper(rumResourceEventMapper)
    .setViewEventMapper(rumViewEventMapper)
    .setLongTaskEventMapper(rumLongTaskEventMapper)
    .build();
  ```
{{% /tab %}}
{{< /tabs >}}

   When implementing the `EventMapper<T>` interface, only some attributes are modifiable for each event type:
     
   | Event type    | Attribute key        | Description                                      |
   | ------------- | -------------------- | ------------------------------------------------ |
   | ViewEvent     | `view.referrer`      | URL that linked to the initial view of the page. |
   |               | `view.url`           | URL of the view.                                 |
   |               | `view.name`          | Name of the view.                                |
   | ActionEvent   |                      |                                                  |
   |               | `action.target.name` | Target name.                                     |
   |               | `view.referrer`      | URL that linked to the initial view of the page. |
   |               | `view.url`           | URL of the view.                                 |
   |               | `view.name`          | Name of the view.                                |
   | ErrorEvent    |                      |                                                  |
   |               | `error.message`      | Error message.                                   |
   |               | `error.stack`        | Stacktrace of the error.                         |
   |               | `error.resource.url` | URL of the resource.                             |
   |               | `view.referrer`      | URL that linked to the initial view of the page. |
   |               | `view.url`           | URL of the view.                                 |
   |               | `view.name`          | Name of the view.                                |
   | ResourceEvent |                      |                                                  |
   |               | `resource.url`       | URL of the resource.                             |
   |               | `view.referrer`      | URL that linked to the initial view of the page. |
   |               | `view.url`           | URL of the view.                                 |
   |               | `view.name`          | Name of the view.                                |
   | LongTaskEvent |                      |                                                  |
   |               | `view.referrer`      | URL that linked to the initial view of the page. |
   |               | `view.url`           | URL of the view.                                 |
   |               | `view.name`          | Name of the view.                                |
   
   **Note**: If you return null from the `EventMapper<T>` implementation, the event is kept and sent as-is.

## Retrieve the RUM session ID

Retrieving the RUM session ID can be helpful for troubleshooting. For example, you can attach the session ID to support requests, emails, or bug reports so that your support team can later find the user session in Datadog.

You can access the RUM session ID at runtime without waiting for the `sessionStarted` event:

```kotlin
GlobalRumMonitor.get().getCurrentSessionId { sessionId ->
  currentSessionId = sessionId
}
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/android
[3]: /real_user_monitoring/android/data_collected
[4]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#automatically-track-views
[5]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#initialization-parameters
[6]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#automatically-track-network-requests
[7]: /real_user_monitoring/android/data_collected/#event-specific-attributes
[8]: /real_user_monitoring/application_monitoring/android/setup/#sending-data-when-device-is-offline
[9]: https://github.com/DataDog/dd-sdk-android/blob/eaa15cd344d1723fafaf179fcebf800d6030c6bb/sample/kotlin/src/main/kotlin/com/datadog/android/sample/SampleApplication.kt#L279
[10]: https://github.com/DataDog/dd-sdk-android/tree/master/sample/kotlin/src/main/kotlin/com/datadog/android/sample/widget
[11]: /real_user_monitoring/application_monitoring/android/monitoring_app_performance/#time-to-network-settled
[12]: https://square.github.io/okhttp/features/events/
[13]: /real_user_monitoring/application_monitoring/android/monitoring_app_performance/#interaction-to-next-view
[14]: /real_user_monitoring/application_monitoring/android/setup?tab=kotlin#setup