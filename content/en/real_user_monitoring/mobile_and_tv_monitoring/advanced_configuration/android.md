---
title: RUM Android Advanced Configuration
code_lang: android
type: multi-code-lang
code_lang_weight: 10
aliases:
    - /real_user_monitoring/android/advanced_configuration/
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: "Source Code"
  text: Source code for dd-sdk-android
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Datadog RUM
---
## Overview

If you have not set up the SDK yet, follow the [in-app setup instructions][1] or refer to the [Android RUM setup documentation][2]. 

## Enrich user sessions

Android RUM automatically tracks attributes such as user activity, screens, errors, and network requests. See the [RUM Data Collection documentation][3] to learn about the RUM events and default attributes. You can further enrich user session information and gain finer control over the attributes collected by tracking custom events.

### Custom Views

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

### Add your own performance timing

In addition to RUM's default attributes, you can measure where your application is spending its time by using the `addTiming` API. The timing measure is relative to the start of the current RUM view. For example, you can time how long it takes for your hero image to appear:
{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
      fun onHeroImageLoaded() {
            GlobalRumMonitor.get().addTiming("hero_image")
      } 
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       public void onHeroImageLoaded() {
            GlobalRumMonitor.get().addTiming("hero_image");
       }
   ```
{{% /tab %}}
{{< /tabs >}}

Once the timing is sent, the timing is accessible as `@view.custom_timings.<timing_name>`. For example: `@view.custom_timings.hero_image`. You must [create a measure][10] before graphing it in RUM analytics or in dashboards. 

### Custom Actions

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

When [tracking resources automatically][6], provide a custom `RumResourceAttributesProvider` instance to add custom attributes to each tracked network request. For example, if you want to track a network request's headers, create an implementation as follows, and pass it in the constructor of the `DatadogInterceptor`.

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

### Custom Resources

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

### Custom Errors

To track specific errors, notify the monitor when an error occurs with the message, source, exception, and additional attributes. Refer to the [Error Attributes documentation][9].

   ```kotlin
      GlobalRumMonitor.get().addError(message, source, throwable, attributes)
   ```

## Track custom global attributes

In addition to the [default RUM attributes][3] captured by the RUM Android SDK automatically, you can choose to add additional contextual information, such as custom attributes, to your RUM events to enrich your observability within Datadog. Custom attributes allow you to slice and dice information about observed user behavior (such as cart value, merchant tier, or ad campaign) with code-level information (such as backend services, session timeline, error logs, and network health).

### Track User Sessions

Adding user information to your RUM sessions makes it easy to:
* Follow the journey of a given user
* Know which users are the most impacted by errors
* Monitor performance for your most important users

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="User API in RUM UI" >}}

The following attributes are **optional**, you should provide **at least one** of them:

| Attribute  | Type | Description                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| usr.id    | String | Unique user identifier.                                                                                  |
| usr.name  | String | User friendly name, displayed by default in the RUM UI.                                                  |
| usr.email | String | User email, displayed in the RUM UI if the user name is not present. It is also used to fetch Gravatars. |

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
 
Widgets are not automatically tracked with the SDK. To send UI interactions from your widgets manually, call the Datadog API. [See example][7].


## Initialization parameters

You can use the following methods in `Configuration.Builder` when creating the Datadog configuration to initialize the library:

`setFirstPartyHosts()` 
: Defines hosts that have tracing enabled and have RUM resources categorized as `first-party`. **Note**: If you define custom tracing header types in the Datadog configuration and are using a tracer registered with `GlobalTracer`, make sure the same tracing header types are set for the tracer in use.

`useSite(DatadogSite)` 
: Switches target data to EU1, US1, US3, US5, US1_FED and AP1 sites.
 
You can use the following methods in `RumConfiguration.Builder` when creating the RUM configuration to enable RUM feature:

`trackUserInteractions(Array<ViewAttributesProvider>)` 
: Enables tracking user interactions (such as tap, scroll, or swipe). The parameter also allows you to add custom attributes to the RUM Action events based on the widget with which the user interacted.

`useViewTrackingStrategy(strategy)` 
: Defines the strategy used to track views. Depending on your application's architecture, you can choose one of several implementations of [`ViewTrackingStrategy`][4] or implement your own.

`trackLongTasks(durationThreshold)` 
: Enables tracking tasks taking longer than `durationThreshold` on the main thread as long tasks in Datadog.

`setBatchSize([SMALL|MEDIUM|LARGE])` 
: Defines the individual batch size for requests sent to Datadog.

`setUploadFrequency([FREQUENT|AVERAGE|RARE])` 
: Defines the frequency for requests made to Datadog endpoints (if requests are available).

`setVitalsUpdateFrequency([FREQUENT|AVERAGE|RARE|NEVER])` 
: Sets the preferred frequency for collecting mobile vitals.

`setSessionSampleRate(<sampleRate>)` 
: Sets the RUM sessions sample rate. (A value of 0 means no RUM events are sent. A value of 100 means all sessions are kept.)

`setXxxEventMapper()` 
: Sets the data scrubbing callbacks for views, actions, resources, and errors.

 
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

To get timing information in resources (such as third-party providers, network requests) such as time to first byte or DNS resolution, customize the `OkHttpClient` to add the [EventListener][8] factory:

1. Add the Gradle dependency to the `dd-sdk-android-okhttp` library in the module-level `build.gradle` file:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

2. Add add the [EventListener][8] factory:

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor())
        .eventListenerFactory(DatadogEventListener.Factory())
        .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       OkHttpClient okHttpClient = new OkHttpClient.Builder()
        .addInterceptor(new DatadogInterceptor())
        .eventListenerFactory(new DatadogEventListener.Factory())
        .build();
   ```
{{% /tab %}}
{{< /tabs >}}

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
     
   | Event type    | Attribute key      | Description                                     |
   |---------------|--------------------|-------------------------------------------------|
   | ViewEvent     | `view.referrer`      | URL that linked to the initial view of the page. |
   |               | `view.url`           | URL of the view.                                 |
   |               | `view.name`           | Name of the view.                                |
   | ActionEvent   |                    |                                                 |
   |               | `action.target.name` | Target name.                                     |
   |               | `view.referrer`      | URL that linked to the initial view of the page. |
   |               | `view.url`           | URL of the view.                                 |
   |               | `view.name`           | Name of the view.                               |
   | ErrorEvent    |                      |                                                 |
   |               | `error.message`      | Error message.                                   |
   |               | `error.stack`        | Stacktrace of the error.                         |
   |               | `error.resource.url` | URL of the resource.                             |
   |               | `view.referrer`      | URL that linked to the initial view of the page. |
   |               | `view.url`           | URL of the view.                                 |
   |               | `view.name`           | Name of the view.                                |
   | ResourceEvent |                    |                                                 |
   |               | `resource.url`       | URL of the resource.                             |
   |               | `view.referrer`      | URL that linked to the initial view of the page. |
   |               | `view.url`           | URL of the view.                                 |
   |               | `view.name`           | Name of the view.                                |
   | LongTaskEvent |                    |                                                 |
   |               | `view.referrer`       | URL that linked to the initial view of the page. |
   |               | `view.url`            | URL of the view.                                 |
   |               | `view.name`           | Name of the view.                                |
   
   **Note**: If you return null from the `EventMapper<T>` implementation, the event is dropped.

## Retrieve the RUM session ID

Retrieving the RUM session ID can be helpful for troubleshooting. For example, you can attach the session ID to support requests, emails, or bug reports so that your support team can later find the user session in Datadog.

You can access the RUM session ID at runtime without waiting for the `sessionStarted` event:

```kotlin
GlobalRumMonitor.get().getCurrentSessionId { sessionId ->
  currentSessionId = sessionId
}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/android
[3]: /real_user_monitoring/android/data_collected
[4]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#automatically-track-views
[5]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#initialization-parameters
[6]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#automatically-track-network-requests
[7]: https://github.com/DataDog/dd-sdk-android/tree/master/sample/kotlin/src/main/kotlin/com/datadog/android/sample/widget
[8]: https://square.github.io/okhttp/features/events/
[9]: /real_user_monitoring/android/data_collected/#event-specific-attributes
[10]: /real_user_monitoring/explorer/search/#setup-facets-and-measures
