## Modify or drop RUM events

To modify some attributes in your RUM events, or to drop some of the events entirely before batching, provide an implementation of `EventMapper<T>` when initializing the RUM Kotlin Multiplatform SDK:

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

When implementing the `EventMapper<T>` interface, only some attributes are modifiable for each event type:

| Event type    | Attribute key        | Description                                      |
| ------------- | -------------------- | ------------------------------------------------ |
| ViewEvent     | `view.referrer`      | URL that linked to the initial view of the page. |
|               | `view.url`           | URL of the view.                                 |
|               | `view.name`          | Name of the view.                                |
| ActionEvent   | `action.target.name` | Target name.                                     |
|               | `view.referrer`      | URL that linked to the initial view of the page. |
|               | `view.url`           | URL of the view.                                 |
|               | `view.name`          | Name of the view.                                |
| ErrorEvent    | `error.message`      | Error message.                                   |
|               | `error.stack`        | Stacktrace of the error.                         |
|               | `error.resource.url` | URL of the resource.                             |
|               | `view.referrer`      | URL that linked to the initial view of the page. |
|               | `view.url`           | URL of the view.                                 |
|               | `view.name`          | Name of the view.                                |
| ResourceEvent | `resource.url`       | URL of the resource.                             |
|               | `view.referrer`      | URL that linked to the initial view of the page. |
|               | `view.url`           | URL of the view.                                 |
|               | `view.name`          | Name of the view.                                |
| LongTaskEvent | `view.referrer`      | URL that linked to the initial view of the page. |
|               | `view.url`           | URL of the view.                                 |
|               | `view.name`          | Name of the view.                                |

**Note**: If you return null from the `EventMapper<T>` implementation, the event is dropped.

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/application_monitoring/kotlin_multiplatform
