## Modify RUM events

To modify attributes in your RUM events before they are batched, provide an implementation of `EventMapper<T>` for each event type when initializing the RUM Android SDK:

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

Each mapper receives the event and returns it with your changes applied. For the attributes you can change, see [Modifiable attributes](#modifiable-attributes).

## Drop RUM events

To drop an event entirely, handle it in the matching `EventMapper<T>` implementation.

**Note**: If you return null from the `EventMapper<T>` implementation, the event is kept and sent as-is.

## Modifiable attributes

When implementing the `EventMapper<T>` interface, only the following attributes are modifiable for each event type:

| Event type    | Attribute key        | Description                                      |
| ------------- | --------------------- | ------------------------------------------------ |
| ViewEvent     | `view.referrer`      | URL that linked to the initial view of the page. |
|               | `view.url`           | URL of the view.                                 |
|               | `view.name`          | Name of the view.                                |
| ActionEvent   |                       |                                                   |
|               | `action.target.name` | Target name.                                     |
|               | `view.referrer`      | URL that linked to the initial view of the page. |
|               | `view.url`           | URL of the view.                                 |
|               | `view.name`          | Name of the view.                                |
| ErrorEvent    |                       |                                                   |
|               | `error.message`      | Error message.                                   |
|               | `error.stack`        | Stacktrace of the error.                         |
|               | `error.resource.url` | URL of the resource.                             |
|               | `view.referrer`      | URL that linked to the initial view of the page. |
|               | `view.url`           | URL of the view.                                 |
|               | `view.name`          | Name of the view.                                |
| ResourceEvent |                       |                                                   |
|               | `resource.url`       | URL of the resource.                             |
|               | `view.referrer`      | URL that linked to the initial view of the page. |
|               | `view.url`           | URL of the view.                                 |
|               | `view.name`          | Name of the view.                                |
| LongTaskEvent |                       |                                                   |
|               | `view.referrer`      | URL that linked to the initial view of the page. |
|               | `view.url`           | URL of the view.                                 |
|               | `view.name`          | Name of the view.                                |
