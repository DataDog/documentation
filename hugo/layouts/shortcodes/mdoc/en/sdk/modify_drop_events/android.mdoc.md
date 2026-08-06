## Modify or drop RUM events

To modify some attributes in your RUM events, or to drop some of the events entirely before batching, provide an implementation of `EventMapper<T>` when initializing the RUM Android SDK:

{% tabs %}
{% tab label="Kotlin" %}

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

{% /tab %}
{% tab label="Java" %}

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

{% /tab %}
{% /tabs %}

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

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/android
