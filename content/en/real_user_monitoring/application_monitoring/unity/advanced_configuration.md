---
title: Unity Advanced Configuration
description: Learn how to configure Unity Monitoring.
aliases:
    - /real_user_monitoring/unity/advanced_configuration
    - /real_user_monitoring/otel
    - /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/otel
    - /real_user_monitoring/mobile_and_tv_monitoring/setup/otel
    - /real_user_monitoring/unity/otel_support/
    - /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/unity
    - /real_user_monitoring/mobile_and_tv_monitoring/unity/advanced_configuration
further_reading:
- link: https://github.com/DataDog/dd-sdk-unity
  tag: "Source Code"
  text: Source code for dd-sdk-unity
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data

---
## Overview

If you have not set up the Datadog Unity SDK for RUM yet, follow the [in-app setup instructions][1] or refer to the [RUM Unity setup documentation][2]. Learn how to set up [OpenTelemetry with RUM Unity](#opentelemetry-setup).

### Advanced Initialization Options

`Custom Endpoint`
: Optional<br/>
**Type**: String<br/>
**Default**: `true`<br/>
Send data to a custom endpoint instead of the default Datadog endpoint. This is useful for proxying data through a custom server.

`SDK Verbosity`
: Optional<br/>
**Type**: Enum<br/>
**Default**: `Warn`<br/>
The level of debugging information the Datadog SDK should output. Higher levels will output more information. This option is helpful for getting debugging information from the SDK when something is not working as expected, or removing the SDK-related debugging entries from console logs.

`Telemetry Sample Rate`
: Optional<br/>
**Type**: Double<br/>
**Default**: `20`
The percentage rate at which Datadog sends internal telemetry data. A value of 100 means all telemetry data is sampled and sent to Datadog.

### Automatic view tracking

If you select `Enable Automatic Scene Tracking`, Datadog hooks into Unity's `SceneManager` to detect scenes loading and unloading, and start RUM Views appropriately. If you are using methods to move between scenes other than `SceneManager`, or would like to track changes in views that occur without `SceneManager`, you need to track views manually using `DdRum.StartView` and `DdRum.StopView`.

### Track user actions

You can track specific user actions such as taps, clicks, and scrolls using `DdRum.AddAction`.

To manually register instantaneous RUM actions such as `RumActionType.Tap`, use `DdRum.AddAction()`. For continuous RUM actions such as `RumActionType.Scroll`, use `DdRum.StartAction()` or `DdRum.StopAction()`.

For example:

```cs
void DownloadResourceTapped(string resourceName) {
    DatadogSdk.Instance.Rum.AddAction(
        RumActionType.Tap,
        resourceName,
    );
}
```

When using `DdRum.StartAction` and `DdRum.StopAction`, the `type` action must be the same for the Datadog Unity SDK to match an action's start with its completion.

### Track resources

Datadog provides `DatadogTrackedWebRequest` as a drop in replacement for `UnityWebRequest` to enable tracking of resources and HTTP calls from your RUM views.

You can use it the same way as you would any other `UnityWebRequest`:

```cs
var request = DatadogTrackedWebRequest.Get("https://httpbin.org/headers");
yield return request.SendWebRequest();

Debug.Log("Got result: " + request.downloadHandler.text);
```

### Track custom resources

In addition to tracking resources automatically using `DatadogTrackedWebRequest, you can track specific custom resources such as network requests or third-party provider APIs using the following methods:

- `DdRum.StartResource`
- `DdRum.StopResource`
- `DdRum.StopResourceWithError`
- `DdRum.StopResourceWithErrorInfo`

For example:

```cs
// in your network client:

DatadogSdk.Instance.Rum.startResource(
    "resource-key",
    RumHttpMethod.Get,
    url,
);

// Later

DatadogSdk.Instance.Rum.stopResource(
    "resource-key",
    200,
    RumResourceType.Image
);
```

The `string` used for `resourceKey` in both calls must be unique for the resource you are calling in order for the Unity Datadog SDK to match a resource's start with its completion.

### Track custom errors

To track specific errors, notify `DdRum` when an error occurs with the exception, the source, and any additional attributes.

```cs
try
{
  // Error prone code
}
catch(Exception e)
{
  DatadogSdk.Instance.Rum.AddError(e, RumErrorSource.Source);
}
```

## Track custom global attributes

In addition to the [default RUM attributes][3] captured by the Datadog Unity SDK automatically, you can choose to add additional contextual information (such as custom attributes) to your RUM events to enrich your observability within Datadog.

Custom attributes allow you to filter and group information about observed user behavior (such as the cart value, merchant tier, or ad campaign) with code-level information (such as backend services, session timeline, error logs, and network health).

### Set a custom global attribute

To set a custom global attribute, use `DdRum.AddAttribute`.

* To add or update an attribute, use `DdRum.AddAttribute`.
* To remove the key, use `DdRum.RemoveAttribute`.

### Track user sessions

Adding user information to your RUM sessions makes it easy to:

* Follow the journey of a given user
* Know which users are the most impacted by errors
* Monitor performance for your most important users

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="User API in the RUM UI" style="width:90%" >}}

| Attribute   | Type   | Description                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | String | (Required) Unique user identifier.                                              |
| `usr.name`  | String | (Optional) User friendly name, displayed by default in the RUM UI.              |
| `usr.email` | String | (Optional) User email, displayed in the RUM UI if the user name is not present. |

To identify user sessions, use `DatadogSdk.SetUserInfo`.

For example:

```cs
DatadogSdk.Instance.SetUserInfo("1234", "John Doe", "john@doe.com");
```

### Add custom user attributes

You can add custom attributes to your user session. This additional information is automatically applied to logs, traces, and RUM events.

To remove an existing attribute, set it to `null`.

For example:

```cs
DatadogSdk.Instance.AddUserExtraInfo(new ()
{
 { "attribute_1", "foo" },
 { "attribute_2", null },
});
```

## Clear all data

Use `ClearAllData` to clear all data that has not been sent to Datadog.

```cs
DatadogSdk.instance.ClearAllData();
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/application_monitoring/unity/setup/
[3]: /real_user_monitoring/application_monitoring/unity/data_collected/
