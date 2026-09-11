## Modify or drop RUM events

To modify attributes of a RUM event before it is sent to Datadog or to drop an event entirely, use the Event Mappers API when configuring the RUM iOS SDK:

{% tabs %}
{% tab label="Swift" %}

```swift
let configuration = RUM.Configuration(
    applicationID: "<rum application id>",
    viewEventMapper: { RUMViewEvent in
        return RUMViewEvent
    }
    resourceEventMapper: { RUMResourceEvent in
        return RUMResourceEvent
    }
    actionEventMapper: { RUMActionEvent in
        return RUMActionEvent
    }
    errorEventMapper: { RUMErrorEvent in
        return RUMErrorEvent
    }
    longTaskEventMapper: { RUMLongTaskEvent in
        return RUMLongTaskEvent
    }
)
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];

[configuration setViewEventMapper:^DDRUMViewEvent * _Nonnull(DDRUMViewEvent * _Nonnull RUMViewEvent) {
    return RUMViewEvent;
}];

[configuration setErrorEventMapper:^DDRUMErrorEvent * _Nullable(DDRUMErrorEvent * _Nonnull RUMErrorEvent) {
    return RUMErrorEvent;
}];

[configuration setResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull RUMResourceEvent) {
    return RUMResourceEvent;
}];

[configuration setActionEventMapper:^DDRUMActionEvent * _Nullable(DDRUMActionEvent * _Nonnull RUMActionEvent) {
    return RUMActionEvent;
}];

[configuration setLongTaskEventMapper:^DDRUMLongTaskEvent * _Nullable(DDRUMLongTaskEvent * _Nonnull RUMLongTaskEvent) {
    return RUMLongTaskEvent;
}];
```

{% /tab %}
{% /tabs %}

Each mapper is a Swift closure with a signature of `(T) -> T?`, where `T` is a concrete RUM event type. This allows changing portions of the event before it is sent.

For example, to redact sensitive information in a RUM Resource's `url`, implement a custom `redacted(_:) -> String` function and use it in `resourceEventMapper`:

{% tabs %}
{% tab label="Swift" %}

```swift
let configuration = RUM.Configuration(
    applicationID: "<rum application id>",
    resourceEventMapper: { RUMResourceEvent in
        var RUMResourceEvent = RUMResourceEvent
        RUMResourceEvent.resource.url = redacted(RUMResourceEvent.resource.url)
        return RUMResourceEvent
    }
)
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];

[configuration setResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull RUMResourceEvent) {
    return RUMResourceEvent;
}];
```

{% /tab %}
{% /tabs %}

Returning `nil` from the error, resource, or action mapper drops the event entirely; the event is not sent to Datadog. The value returned from the view event mapper must not be `nil` (to drop views, customize your implementation of `UIKitRUMViewsPredicate`; read more in [tracking views automatically](#automatically-track-views)).

Depending on the event's type, only some specific properties can be modified:

| Event Type       | Attribute key                        | Description                                      |
| ---------------- | ------------------------------------ | ------------------------------------------------ |
| RUMActionEvent   | `RUMActionEvent.action.target?.name` | Name of the action.                              |
|                  | `RUMActionEvent.view.url`            | URL of the view linked to this action.           |
| RUMErrorEvent    | `RUMErrorEvent.error.message`        | Error message.                                   |
|                  | `RUMErrorEvent.error.stack`          | Stacktrace of the error.                         |
|                  | `RUMErrorEvent.error.resource?.url`  | URL of the resource the error refers to.         |
|                  | `RUMErrorEvent.view.url`             | URL of the view linked to this error.            |
| RUMResourceEvent | `RUMResourceEvent.resource.url`      | URL of the resource.                             |
|                  | `RUMResourceEvent.view.url`          | URL of the view linked to this resource.         |
| RUMViewEvent     | `RUMViewEvent.view.name`             | Name of the view.                                |
|                  | `RUMViewEvent.view.url`              | URL of the view.                                 |
|                  | `RUMViewEvent.view.referrer`         | URL that linked to the initial view of the page. |

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/application_monitoring/ios
