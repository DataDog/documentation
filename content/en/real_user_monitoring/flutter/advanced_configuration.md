---
title: RUM Flutter Advanced Configuration
kind: documentation
description: Learn how to configure Flutter Monitoring.
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: dd-sdk-flutter Source code
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data

---
## Overview

If you have not set up the Datadog Flutter SDK for RUM yet, follow the [in-app setup instructions][1] or refer to the [RUM Flutter setup documentation][2].

## Enrich user sessions

Flutter RUM automatically tracks attributes such as user activity, views (using the `DatadogNavigationObserver`), errors, native crashes, and network requests (using the Datadog Tracking HTTP Client). See the [RUM Data Collection documentation][3] to learn about the RUM events and default attributes. You can further enrich user session information and gain finer control over the attributes collected by tracking custom events.

### Add your own performance timing

In addition to RUM's default attributes, you can measure where your application is spending its time by using `DdRum.addTiming`. The timing measure is relative to the start of the current RUM view.

For example, you can time how long it takes for your hero image to appear:

```dart
void _onHeroImageLoaded() {
    DatadogSdk.instance.rum?.addTiming("hero_image");
}
```

Once you set the timing, it is accessible as `@view.custom_timings.<timing_name>`. For example, `@view.custom_timings.hero_image`.

To create visualizations in your dashboards, [create a measure][4] first.

### Track user actions

You can track specific user actions such as taps, clicks, and scrolls using `DdRum.addUserAction`.

To manually register instantaneous RUM actions such as `RumUserActionType.tap`, use `DdRum.addUserAction()`. For continuous RUM actions such as `RumUserActionType.scroll`, use `DdRum.startUserAction()` or `DdRum.stopUserAction()`.

For example:

```dart
void _downloadResourceTapped(String resourceName) {
    DatadogSdk.instance.rum?.addUserAction(
        RumUserActionType.tap,
        resourceName,
    );
}
```

When using `DdRum.startUserAction` and `DdRum.stopUserAction`, the `type` action must be the same in order for the Datadog Flutter SDK to match an action's start with its completion.

### Track custom resources

In addition to tracking resources automatically using the [Datadog Tracking HTTP Client][5], you can track specific custom resources such as network requests or third-party provider APIs using the [following methods][6]:

- `DdRum.startResourceLoading`
- `DdRum.stopResourceLoading`
- `DdRum.stopResourceLoadingWithError`
- `DdRum.stopResourceLoadingWithErrorInfo`

For example:

```dart
// in your network client:

DatadogSdk.instance.rum?.startResourceLoading(
    "resource-key",
    RumHttpMethod.get,
    url,
);

// Later

DatadogSdk.instance.rum?.stopResourceLoading(
    "resource-key",
    200,
    RumResourceType.image
);
```

The `String` used for `resourceKey` in both calls must be unique for the resource you are calling in order for the Flutter Datadog SDK to match a resource's start with its completion.

### Track custom errors

To track specific errors, notify `DdRum` when an error occurs with the message, source, exception, and additional attributes.

```dart
DatadogSdk.instance.rum?.addError("This is an error message.");
```

## Track custom global attributes

In addition to the [default RUM attributes][3] captured by the Datadog Flutter SDK automatically, you can choose to add additional contextual information (such as custom attributes) to your RUM events to enrich your observability within Datadog.

Custom attributes allow you to filter and group information about observed user behavior (such as the cart value, merchant tier, or ad campaign) with code-level information (such as backend services, session timeline, error logs, and network health).

### Set a custom global attribute

To set a custom global attribute, use `DdRum.addAttribute`.

* To add or update an attribute, use `DdRum.addAttribute`.
* To remove the key, use `DdRum.removeAttribute`.

### Track user sessions

Adding user information to your RUM sessions makes it easy to:

* Follow the journey of a given user
* Know which users are the most impacted by errors
* Monitor performance for your most important users

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="User API in the RUM UI" style="width:90%" >}}

The following attributes are **optional**, provide **at least** one of them:

| Attribute | Type   | Description                                                                                              |
|-----------|--------|----------------------------------------------------------------------------------------------------------|
| `usr.id`    | String | Unique user identifier.                                                                                  |
| `usr.name`  | String | User friendly name, displayed by default in the RUM UI.                                                  |
| `usr.email` | String | User email, displayed in the RUM UI if the user name is not present. It is also used to fetch Gravatars. |

To identify user sessions, use `DdRum.setUserInfo`.

For example:

```dart
DatadogSdk.instance.setUserInfo("1234", "John Doe", "john@doe.com");
```

## Modify or drop RUM events

**Note**: This feature is not yet available for Flutter web applications.

To modify attributes of a RUM event before it is sent to Datadog or to drop an event entirely, use the Event Mappers API when configuring the Flutter RUM SDK:

```dart
final config = DdSdkConfiguration(
    // other configuration...
    rumConfiguration: RumConfiguration(
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
}
```

Returning `null` from the error, resource, or action mapper drops the event entirely; the event is not sent to Datadog. The value returned from the view event mapper must not be `null`.

Depending on the event's type, only some specific properties can be modified:

| Event Type       | Attribute key                     | Description                                   |
|------------------|-----------------------------------|-----------------------------------------------|
| RumViewEvent     | `viewEvent.view.name`             | Name of the view.¹                            |
|                  | `viewEvent.view.url`              | URL of the view.                              |
|                  | `viewEvent.view.referrer`         | Referrer of the view.                         |
| RumActionEvent   | `actionEvent.action.target?.name` | Name of the action.                           |
|                  | `actionEvent.view.name`           | Name the view linked to this action.¹         |
|                  | `actionEvent.view.referrer`       | Referrer of the view linked to this action.   |
|                  | `actionEvent.view.url`            | URL of the view linked to this action.        |
| RumErrorEvent    | `errorEvent.error.message`        | Error message.                                |
|                  | `errorEvent.error.stack`          | Stacktrace of the error.                      |
|                  | `errorEvent.error.resource?.url`  | URL of the resource the error refers to.      |
|                  | `errorEvent.view.name`            | Name the view linked to this action.¹         |
|                  | `errorEvent.view.referrer`        | Referrer of the view linked to this action.   |
|                  | `errorEvent.view.url`             | URL of the view linked to this error.         |
| RumResourceEvent | `resourceEvent.resource.url`      | URL of the resource.                          |
|                  | `resourceEvent.view.name`         | Name the view linked to this action.¹         |
|                  | `resourceEvent.view.referrer`     | Referrer of the view linked to this action.   |
|                  | `resourceEvent.view.url`          | URL of the view linked to this resource.      |

¹ While event mappers allow you to modify the names of views, they are not the recommended way to rename a view. Use the `viewInfoExtractor` parameter on [`DatadogNavigationObserver`][7] instead

## Set tracking consent (GDPR & CCPA compliance)

In order to be compliant with data protection and privacy policies, the Flutter RUM SDK requires the tracking consent value at initialization.

The `trackingConsent` setting can be one of the following values:

1. `TrackingConsent.pending`: The Flutter RUM SDK starts collecting and batching the data but does not send it to Datadog. The Flutter RUM SDK waits for the new tracking consent value to decide what to do with the batched data.
2. `TrackingConsent.granted`: The Flutter RUM SDK starts collecting the data and sends it to Datadog.
3. `TrackingConsent.notGranted`: The Flutter RUM SDK does not collect any data. No logs, traces, or RUM events are sent to Datadog.

To change the tracking consent value after the Flutter RUM SDK is initialized, use the `DatadogSdk.setTrackingConsent` API call. The Flutter RUM SDK changes its behavior according to the new value.

For example, if the current tracking consent is `TrackingConsent.pending` and you change the value to `TrackingConsent.granted`, the Flutter RUM SDK sends all previously recorded and future data to Datadog.

Likewise, if you change the value from `TrackingConsent.pending` to `TrackingConsent.notGranted`, the Flutter RUM SDK wipes all data and does not collect any future data.

## Sending data when device is offline

RUM ensures availability of data when your user device is offline. In cases of low-network areas, or when the device battery is too low, all RUM events are first stored on the local device in batches. They are sent as soon as the network is available, and the battery is high enough to ensure the Flutter RUM SDK does not impact the end user's experience. If the network is not available with your application running in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while offline, no data is lost.

**Note**: The data on the disk is automatically deleted if it gets too old to ensure the Flutter RUM SDK does not use too much disk space.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/flutter/#setup
[3]: /real_user_monitoring/flutter/data_collected
[4]: /real_user_monitoring/explorer/?tab=measures#setup-facets-and-measures
[5]: https://github.com/DataDog/dd-sdk-flutter/tree/main/packages/datadog_tracking_http_client
[6]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/
[7]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogNavigationObserver-class.html
