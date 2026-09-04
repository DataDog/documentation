### Track resources

Datadog provides `DatadogTrackedWebRequest` as a drop in replacement for `UnityWebRequest` to enable tracking of resources and HTTP calls from your RUM views.

You can use it the same way as you would any other `UnityWebRequest`:

```csharp
var request = DatadogTrackedWebRequest.Get("https://httpbin.org/headers");
yield return request.SendWebRequest();

Debug.Log("Got result: " + request.downloadHandler.text);
```

### Track custom resources

In addition to tracking resources automatically using `DatadogTrackedWebRequest`, you can track specific custom resources such as network requests or third-party provider APIs using the following methods:

- `DdRum.StartResource`
- `DdRum.StopResource`
- `DdRum.StopResourceWithError`
- `DdRum.StopResourceWithErrorInfo`

For example:

```csharp
// in your network client:

DatadogSdk.Instance.Rum.StartResource(
    "resource-key",
    RumHttpMethod.Get,
    url,
);

// Later

DatadogSdk.Instance.Rum.StopResource(
    "resource-key",
    200,
    RumResourceType.Image
);
```

The `string` used for `resourceKey` in both calls must be unique for the resource you are calling in order for the Unity Datadog SDK to match a resource's start with its completion.

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/application_monitoring/unity/setup/
[3]: /real_user_monitoring/application_monitoring/unity/data_collected/
