## Modify RUM events

To modify attributes of a RUM event before it's sent to Datadog, set an event mapper on `DdRumConfiguration` when you enable RUM. The .NET MAUI SDK provides mappers for error, action, and resource events. Each mapper receives the event, and applies to both automatically and manually tracked events.

```csharp
DdRum.Enable(new DdRumConfiguration
{
    ApplicationId = "<APPLICATION_ID>",
    ErrorEventMapper = errorEvent =>
    {
        // Attach extra context to every error
        errorEvent.Context["team"] = "mobile";

        // Modify the message
        errorEvent.Message = "[MyApp] " + errorEvent.Message;

        return errorEvent;
    },
    ActionEventMapper = action => action,
    ResourceEventMapper = resource => resource,
});
```

## Drop RUM events

To drop an event entirely, return `null` from its event mapper:

```csharp
DdRum.Enable(new DdRumConfiguration
{
    ApplicationId = "<APPLICATION_ID>",
    ErrorEventMapper = errorEvent =>
        errorEvent.Message.Contains("ignore-this") ? null : errorEvent,
    ActionEventMapper = action =>
        action.Name.Contains("Debug") ? null : action,
    ResourceEventMapper = resource =>
        resource.Url.Contains("analytics") ? null : resource,
});
```

You can drop error, action, and resource events. The .NET MAUI SDK has no mapper for view events, so view events can't be modified or dropped.

## Modifiable attributes

| Event type | Mapper | Properties |
|---|---|---|
| Error | `ErrorEventMapper` | `Message`, `Source`, `Stacktrace`, `Context`, `TimestampMs` |
| Action | `ActionEventMapper` | `Name` |
| Resource | `ResourceEventMapper` | `Url` |
