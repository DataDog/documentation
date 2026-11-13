## Automated resource collection

Use `DatadogTrackedWebRequest` as a drop-in replacement for `UnityWebRequest` to automatically track HTTP calls as resources:

```csharp
var request = DatadogTrackedWebRequest.Get("https://api.example.com/users");
yield return request.SendWebRequest();
```

`DatadogTrackedWebRequest` also enables [Datadog distributed tracing][1]. To enable distributed tracing, set {% ui %}First Party Hosts{% /ui %} in the Datadog section of your {% ui %}Project Settings{% /ui %} to a domain that supports distributed tracing. You can also modify the sampling rate for distributed tracing with the {% ui %}Trace Sample Rate{% /ui %} setting.

{% ui %}First Party Hosts{% /ui %} doesn't allow wildcards, but matches any subdomain of a given domain. For example, `api.example.com` matches `staging.api.example.com` and `prod.api.example.com`, but not `news.example.com`.

## Manual resource collection

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

For the attributes collected, see [Data Collected][2].

[1]: /real_user_monitoring/enrich_rum_data/track_frontend_to_backend_traces/?platform=unity
[2]: /real_user_monitoring/setup/data_collected/?platform=unity
