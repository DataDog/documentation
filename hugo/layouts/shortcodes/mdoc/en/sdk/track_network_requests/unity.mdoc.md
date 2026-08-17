### Automated resource collection

Use `DatadogTrackedWebRequest` as a drop-in replacement for `UnityWebRequest` to automatically track HTTP calls as resources:

```csharp
var request = DatadogTrackedWebRequest.Get("https://api.example.com/users");
yield return request.SendWebRequest();
```

### Manual resource collection

To track a custom resource such as a third-party provider API, start and stop it around the load:

```csharp
DatadogSdk.Instance.Rum.StartResource(
    "resource-key",
    RumHttpMethod.Get,
    url
);

// Later, when the response arrives
DatadogSdk.Instance.Rum.StopResource(
    "resource-key",
    200,
    RumResourceType.Image
);
```

If the request fails, use `StopResourceWithError` or `StopResourceWithErrorInfo` instead. The `resourceKey` string must be unique among concurrently active resources so the SDK can match a resource's start with its completion.
