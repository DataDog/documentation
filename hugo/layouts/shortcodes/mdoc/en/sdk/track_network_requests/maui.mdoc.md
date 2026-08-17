### Automated resource collection

The MAUI SDK automatically tracks network requests as resources by default, using a `DiagnosticListener`.

### Manual resource collection

To track a custom resource such as a third-party provider API, start and stop it around the load:

```csharp
DdRum.StartResource("api-call-1", RumResourceMethod.Get, "https://api.example.com/users");
// ... fetch the resource ...
DdRum.StopResource("api-call-1", 200, RumResourceKind.Xhr, 2048);
```

Provide a stable resource key, the HTTP method, and the URL when you start, and the status code, kind, and size when you stop.
