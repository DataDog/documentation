## Modify or drop RUM events

**Note**: This feature is not yet available for Flutter web applications.

To modify attributes of a RUM event before it is sent to Datadog or to drop an event entirely, use the Event Mappers API when configuring the Flutter RUM SDK:

```dart
final config = DatadogConfiguration(
    // other configuration...
    rumConfiguration: DatadogRumConfiguration(
        applicationId: '<YOUR_APPLICATION_ID>',
        rumViewEventMapper = (event) => event,
        rumActionEventMapper = (event) => event,
        rumResourceEventMapper = (event) => event,
        rumErrorEventMapper = (event) => event,
        rumLongTaskEventMapper = (event) => event,
    ),
);
```

Each mapper is a function with a signature of `(T) -> T?`, where `T` is a concrete RUM event type. This allows changing portions of the event before it is sent, or dropping the event entirely.

For example, to redact sensitive information in a RUM Resource's `url`, implement a custom `redacted` function and use it in `rumResourceEventMapper`:

```dart
    rumResourceEventMapper = (event) {
        var resourceEvent = resourceEvent
        resourceEvent.resource.url = redacted(resourceEvent.resource.url)
        return resourceEvent
    }
```

Returning `null` from the error, resource, or action mapper drops the event entirely; the event is not sent to Datadog. The value returned from the view event mapper must not be `null`.

Depending on the event's type, only some specific properties can be modified:

| Event Type       | Attribute key                     | Description                                 |
| ---------------- | --------------------------------- | ------------------------------------------- |
| RumViewEvent     | `viewEvent.view.url`              | URL of the view.                            |
|                  | `viewEvent.view.referrer`         | Referrer of the view.                       |
| RumActionEvent   | `actionEvent.action.target?.name` | Name of the action.                         |
|                  | `actionEvent.view.referrer`       | Referrer of the view linked to this action. |
|                  | `actionEvent.view.url`            | URL of the view linked to this action.      |
| RumErrorEvent    | `errorEvent.error.message`        | Error message.                              |
|                  | `errorEvent.error.stack`          | Stacktrace of the error.                    |
|                  | `errorEvent.error.resource?.url`  | URL of the resource the error refers to.    |
|                  | `errorEvent.view.referrer`        | Referrer of the view linked to this action. |
|                  | `errorEvent.view.url`             | URL of the view linked to this error.       |
| RumResourceEvent | `resourceEvent.resource.url`      | URL of the resource.                        |
|                  | `resourceEvent.view.referrer`     | Referrer of the view linked to this action. |
|                  | `resourceEvent.view.url`          | URL of the view linked to this resource.    |

[1]: https://app.datadoghq.com/rum/application/create
