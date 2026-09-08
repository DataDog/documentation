Use `ErrorEventMapper` to modify or drop error events before they're sent to Datadog. The mapper receives a `DdRumErrorEvent` with `Message`, `Source`, `Stacktrace`, `Context`, and `TimestampMs` properties, and applies to both automatic and manual errors.

```csharp
DdRum.Enable(new DdRumConfiguration
{
    ApplicationId = "<APPLICATION_ID>",
    ErrorEventMapper = errorEvent =>
    {
        // Attach extra context to every error
        errorEvent.Context["team"] = "mobile";

        // Drop errors matching a pattern
        if (errorEvent.Message.Contains("ignore-this"))
            return null;

        // Modify the message
        errorEvent.Message = "[MyApp] " + errorEvent.Message;

        return errorEvent;
    }
});
```

Return `null` to drop the event entirely.

`ActionEventMapper` and `ResourceEventMapper` work the same way and apply to actions and resources captured by the automatic trackers.
