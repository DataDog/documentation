### Custom views

In addition to [tracking views automatically][4], you can also track specific distinct views (such as activities and fragments) when they become visible and interactive in the `onResume()` lifecycle. Stop tracking when the view is no longer visible. Most often, this method should be called in the frontmost `Activity` or `Fragment`:

{% tabs %}
{% tab label="Kotlin" %}

```kotlin
fun onResume() {
    GlobalRumMonitor.get().startView(viewKey, viewName, viewAttributes)
}

fun onPause() {
    GlobalRumMonitor.get().stopView(viewKey, viewAttributes)
}
```

{% /tab %}
{% tab label="Java" %}

```java
public void onResume() {
    GlobalRumMonitor.get().startView(viewKey, viewName, viewAttributes);
}

public void onPause() {
    GlobalRumMonitor.get().stopView(viewKey, viewAttributes);
}
```

{% /tab %}
{% /tabs %}

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

{% tabs %}
{% tab label="Kotlin" %}

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
  .useViewTrackingStrategy(FragmentViewTrackingStrategy(...))
  .build()
```

{% /tab %}
{% tab label="Java" %}

```java
RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
 .useViewTrackingStrategy(new FragmentViewTrackingStrategy(...))
 .build();
```

{% /tab %}
{% /tabs %}


For `ActivityViewTrackingStrategy`, `FragmentViewTrackingStrategy`, or `MixedViewTrackingStrategy`, you can filter which `Fragment` or `Activity` is tracked as a RUM View by providing a `ComponentPredicate` implementation in the constructor:

{% tabs %}
{% tab label="Kotlin" %}

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

{% /tab %}
{% tab label="Java" %}

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

{% /tab %}
{% /tabs %}

**Note**: By default, the library is using `ActivityViewTrackingStrategy`. If you decide not to provide a view tracking strategy, you must manually send the views by calling the `startView` and `stopView` methods yourself.

[1]: https://app.datadoghq.com/rum/application/create
[4]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#automatically-track-views
