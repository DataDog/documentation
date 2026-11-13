## Automated resource collection

By default, the SDK tracks HTTP requests as resources through a `DiagnosticListener`. This covers every `HttpClient` request, including those issued by third-party libraries.

To disable automatic resource tracking, or to filter or modify automatically tracked resources, configure `DdRumConfiguration`:

```csharp
DdRum.Enable(new DdRumConfiguration
{
    ApplicationId = "<APPLICATION_ID>",

    // Disable automatic resource tracking
    AutomaticResourceTracking = false,

    // Or filter or modify auto-tracked resources
    ResourceEventMapper = (resource) =>
    {
        if (resource.Url.Contains("analytics")) return null;  // drop
        return resource;
    },
});
```

## Manual resource collection

To track a custom resource such as a third-party provider API, start and stop it around the load. Provide a stable resource key, the HTTP method, and the URL when you start, and the status code, kind, and size when you stop.

```csharp
DdRum.StartResource("api-call-1", RumResourceMethod.Get, "https://api.example.com/users");
// ... fetch the resource ...
DdRum.StopResource("api-call-1", 200, RumResourceKind.Xhr, 2048);
```

For the attributes collected, see [Data Collected][1].

[1]: /real_user_monitoring/setup/data_collected/?platform=maui
