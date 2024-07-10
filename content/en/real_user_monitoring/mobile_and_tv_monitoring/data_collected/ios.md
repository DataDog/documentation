---
title: RUM iOS Data Collected
code_lang: ios
type: multi-code-lang
code_lang_weight: 20
aliases:
- /real_user_monitoring/ios/data_collected/
further_reading:
  - link: "https://github.com/DataDog/dd-sdk-ios"
    tag: "Source Code"
    text: "Source code for dd-sdk-ios"
  - link: "/real_user_monitoring/"
    tag: "Documentation"
    text: "Datadog Real User Monitoring"
---

## Overview

The RUM iOS SDK generates events that have associated metrics and attributes. Metrics are quantifiable values that can be used for measurements related to the event. Attributes are non-quantifiable values used to slice metrics data (group by) in analytics. 

Every RUM event has all of the [default attributes](#default-attributes), for example, the device type (`device.type`) and user information such as their name (`usr.name`) and their country (`geo.country`).

There are additional [metrics and attributes that are specific to a given event type](#event-specific-metrics-and-attributes). For example, the metric `view.time_spent` is associated with "view" events and the attribute `resource.method` is associated with "resource" events.

| Event Type | Retention | Description                         |
|------------|-----------|-------------------------------------|
| Session    | 30 days   | A session represents a real user journey on your mobile application. It begins when the user launches the application, and the session remains live as long as the user stays active. During the user journey, all RUM events generated as part of the session share the same `session.id` attribute. **Note:** The session resets after 15 minutes of inactivity. If the application is killed by the OS, you can reset the session while the application is in the background.|
| View       | 30 days   | A view represents a unique screen (or screen segment) on your mobile application. A view starts and stops when the `viewDidAppear(animated:)` and `viewDidDisappear(animated:)` callbacks on the `UIViewController` class are notified. Individual `UIViewControllers` are classified as distinct views. While a user stays on a view, RUM event attributes (Errors, Resources, Actions) get attached to the view with a unique `view.id`.                           |
| Resource   | 15 days   | A resource represents network requests to first-party hosts, APIs, and third-party providers in your mobile application. All requests generated during a user session are attached to the view with a unique `resource.id`.                                                                       |
| Error      | 30 days   | An error represents an exception or crash emitted by the mobile application attached to the view it is generated in.                                                                                                                                                                                        |
| Action     | 30 days   | An action represents user activity in your mobile application (for example, application launch, tap, swipe, or back). Each action is attached with a unique `action.id` attached to the view it gets generated in.                                                                                                                                              |
| Long Task | 15 days | A long task event is generated for any task in the application that blocks the main thread for more than the specified duration threshold. |


The following diagram illustrates the RUM event hierarchy:

{{< img src="real_user_monitoring/data_collected/event-hierarchy.png" alt="RUM Event hierarchy" style="width:50%;border:none" >}}

## Application launch

During initialization, the RUM iOS SDK creates a view called "ApplicationLaunch". This view's start time matches the start of the iOS process, and can be used to track your application launch time.

The ApplicationLaunch view includes any logs, actions, and resources created before your first call to `startView`. Use the duration of this view to determine time to first view. This view has an action, `application_start`, with a duration equal to the amount of time from process start until the call to `applicationDidBecomeActive`.

In cases where iOS decides to [prewarm your application][4], the ApplicationLaunch view instead starts when the RUM iOS SDK is initialized, and the `application_start` event does not have a duration.

## Default attributes

RUM collects common attributes for all events and attributes specific to each event by default listed below. You can also choose to enrich your user session data with [additional events][1] to default events specific to your application monitoring and business analytics needs.


### Common core attributes

| Attribute name   | Type    | Description                                                                        |
|------------------|---------|------------------------------------------------------------------------------------|
| `date`           | integer | Start of the event in milliseconds from epoch.                                               |
| `type`           | string  | The type of the event (for example, `view` or `resource`).                         |
| `service`        | string  | The [unified service name][2] for this application used to corelate user sessions. |
| `application.id` | string  | The Datadog application ID.                                                        |
| `application.name` | string  | The Datadog application name.                                                        |

### Device

The following device-related attributes are attached automatically to all events collected by Datadog:

| Attribute name                       | Type   | Description                                                                                              |
|--------------------------------------|--------|----------------------------------------------------------------------------------------------------------|
| `device.type`                        | string | The device type as reported by the device (System User-Agent).                                            |
| `device.brand`                       | string | The device brand as reported by the device (System User-Agent).                                           |
| `device.model`                       | string | The device model as reported by the device (System User-Agent).                                           |
| `device.name`                        | string | The device name as reported by the device (System User-Agent).                                            |

### Connectivity

The following network-related attributes are attached automatically to Resource and Error events collected by Datadog:

| Attribute name                           | Type   | Description                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `connectivity.status`                | string | Status of device network reachability (`connected`, `not connected`, `maybe`).                           |
| `connectivity.interfaces`            | string | The list of available network interfaces (for example, `bluetooth`, `cellular`, `ethernet`, or `wifi`). |
| `connectivity.cellular.technology`   | string | The type of a radio technology used for cellular connection.                                              |
| `connectivity.cellular.carrier_name` | string | The name of the SIM carrier.                                                                              |


### Operating system

The following OS-related attributes are attached automatically to all events collected by Datadog:

| Attribute name     | Type   | Description                                                               |
|--------------------|--------|---------------------------------------------------------------------------|
| `os.name`          | string | The OS name as reported by the device (System User-Agent).          |
| `os.version`       | string | The OS version as reported by the device (System User-Agent).       |
| `os.version_major` | string | The OS version major as reported by the device (System User-Agent). |


### Geo-location

The below attributes are related to the geo-location of IP addresses.

**Note:** If you want to stop collecting geo-location attributes, change the setting in your [application details][6].

| Fullname                           | Type   | Description                                                                                                                               |
|------------------------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `geo.country`                      | string | Name of the country                                                                                                                       |
| `geo.country_iso_code`             | string | ISO Code of the country (for example, `US` for the United States or `FR` for France).                                                  |
| `geo.country_subdivision`          | string | Name of the first subdivision level of the country (for example, `California` in the United States or the `Sarthe` department in France). |
| `geo.continent_code`               | string | ISO code of the continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`).                                                                     |
| `geo.continent`                    | string | Name of the continent (`Europe`, `Australia`, `North America`, `Africa`, `Antarctica`, `South America`, `Oceania`).                        |
| `geo.city`                         | string | The name of the city (for example, `San Francisco`, `Paris`, or `New York`).                                                                                       |


### Global user attributes

You can enable [tracking user info][2] globally to collect and apply user attributes to all RUM events.

| Attribute name | Type   | Description             |
|----------------|--------|-------------------------|
| `usr.id`      | string | Identifier of the user. |
| `usr.name`     | string | Name of the user.       |
| `usr.email`    | string | Email of the user.      |


## Event-specific metrics and attributes

### Session metrics

| Metric                    | Type        | Description                                         |
|---------------------------|-------------|-----------------------------------------------------|
| `session.time_spent`      | number (ns) | Time spent on a session.                            |
| `session.view.count`      | number      | Count of all views collected for this session.      |
| `session.error.count`     | number      | Count of all errors collected for this session.     |
| `session.resource.count`  | number      | Count of all resources collected for this session.  |
| `session.action.count`    | number      | Count of all actions collected for this session.    |
| `session.long_task.count` | number      | Count of all long tasks collected for this session. |


### Session attributes

| Attribute name               | Type   | Description                                                                |
|------------------------------|--------|----------------------------------------------------------------------------|
| `session.id`                 | string | Unique ID of the session.                                                  |
| `session.type`               | string | Type of the session (`user`).                                              |
| `session.is_active`          | boolean | Indicates if the session is currently active. The session ends if a user navigates away from the application or closes the browser window, and expires after 4 hours of activity or 15 minutes of inactivity.                               |
| `session.initial_view.url`   | string | URL of the initial view of the session.                                     |
| `session.initial_view.name` | string | Name of the initial view of the session.                                    |
| `session.last_view.url`      | string | URL of the last view of the session.                                        |
| `session.last_view.name`     | string | Name of the last view of the session.                                       |
| `session.ip`                 | string | IP address of the session extracted from the TCP connection of the intake. If you want to stop collecting this attribute, change the setting in your [application details][5]. |
| `session.useragent`          | string | System user agent info to interpret device info.                            |


### View metrics

RUM action, error, resource, and long task events contain information about the active RUM view event at the time of collection.

| Metric                | Type        | Description                                                                  |
|-----------------------|-------------|------------------------------------------------------------------------------|
| `view.time_spent`     | number (ns) | Time spent on this view.                                                     |
| `view.long_task.count`        | number      | Count of all long tasks collected for this view.                     |
| `view.error.count`    | number      | Count of all errors collected for this view.                                 |
| `view.resource.count` | number      | Count of all resources collected for this view.                              |
| `view.action.count`   | number      | Count of all actions collected for this view.                                |
| `view.is_active`      | boolean     | Indicates whether the view corresponding to this event is considered active. |

### View attributes

| Attribute name | Type   | Description                                                     |
|----------------|--------|-----------------------------------------------------------------|
| `view.id`      | string | Unique ID of the initial view corresponding to the event.  |
| `view.url`     | string | URL of the `UIViewController` class corresponding to the event. |
| `view.name`    | string | Customizable name of the view corresponding to the event.       |


### Resource metrics

| Metric                         | Type           | Description                                                                                     |
|--------------------------------|----------------|-------------------------------------------------------------------------------------------------|
| `resource.duration`            | number         | Entire time spent loading the resource.                                                         |
| `resource.size`                | number (bytes) | Resource size.                                                                                  |
| `resource.connect.duration`    | number (ns)    | Time spent establishing a connection to the server (connectEnd - connectStart).                  |
| `resource.ssl.duration`        | number (ns)    | Time spent for the TLS handshake.                                                               |
| `resource.dns.duration`        | number (ns)    | Time spent resolving the DNS name of the last request (domainLookupEnd - domainLookupStart).     |
| `resource.redirect.duration`   | number (ns)    | Time spent on subsequent HTTP requests (redirectEnd - redirectStart).                            |
| `resource.first_byte.duration` | number (ns)    | Time spent waiting for the first byte of response to be received (responseStart - requestStart). |
| `resource.download.duration`   | number (ns)    | Time spent downloading the response (responseEnd - responseStart).                               |

### Resource attributes

| Attribute                  | Type   | Description                                                                              |
|----------------------------|--------|------------------------------------------------------------------------------------------|
| `resource.id`              | string | Unique identifier of the resource.                                                       |
| `resource.type`            | string | The type of resource being collected (for example, `xhr`, `image`, `font`, `css`, or `js`). |
| `resource.method`          | string | The HTTP method (for example, `POST`, `GET`, `PATCH`, or `DELETE`).                       |
| `resource.status_code`     | number | The response status code.                                                                |
| `resource.url`             | string | The resource URL.                                                                        |
| `resource.provider.name`   | string | The resource provider name. Default is `unknown`.                                        |
| `resource.provider.domain` | string | The resource provider domain.                                                            |
| `resource.provider.type`   | string | The resource provider type (for example, `first-party`, `cdn`, `ad`, or `analytics`).        |


### Error attributes

Front-end errors are collected with Real User Monitoring (RUM). The error message and stack trace are included when available.

| Attribute        | Type   | Description                                                                      |
|------------------|--------|----------------------------------------------------------------------------------|
| `error.source`   | string | Where the error originates from (for example, `webview`, `logger`, or `network`). |
| `error.type`     | string | The error type (or error code in some cases).                                    |
| `error.message`  | string | A concise, human-readable, one-line message explaining the event.                |
| `error.stack`    | string | The stack trace or complementary information about the error.                    |
| `error.issue_id` | string | The stack trace or complementary information about the error.                    |

### Network errors 

Network errors include information about failing HTTP requests. The following facets are also collected:

| Attribute                        | Type   | Description                                                                       |
|----------------------------------|--------|-----------------------------------------------------------------------------------|
| `error.resource.status_code`     | number | The response status code.                                                         |
| `error.resource.method`          | string | The HTTP method (for example, `POST` or `GET`).                                      |
| `error.resource.url`             | string | The resource URL.                                                                 |
| `error.resource.provider.name`   | string | The resource provider name. Default is `unknown`.                                 |
| `error.resource.provider.domain` | string | The resource provider domain.                                                     |
| `error.resource.provider.type`   | string | The resource provider type (for example, `first-party`, `cdn`, `ad`, or `analytics`). |


### Action metrics

| Metric                  | Type        | Description                                   |
|-------------------------|-------------|-----------------------------------------------|
| `action.loading_time`   | number (ns) | The loading time of the action.               |
| `action.long_task.count`        | number      | Count of all long tasks collected for this action. |
| `action.resource.count` | number      | Count of all resources issued by this action. |
| `action.error.count`    | number      | Count of all errors issued by this action.    |

### Action attributes

| Attribute            | Type   | Description                                                                     |
|----------------------|--------|---------------------------------------------------------------------------------|
| `action.id`          | string | UUID of the user action.                                                        |
| `action.type`        | string | Type of the user action (for example, `tap` or `application_start`).                           |
| `action.name`        | string | Name of the user action.                                                        |
| `action.target.name` | string | Element that the user interacted with. Only for automatically collected actions. |

## Data Storage

Before data is uploaded to Datadog, it is stored in cleartext in the cache directory (`Library/Caches`) of your [application sandbox][3], which can't be read by any other app installed on the device.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/ios/advanced_configuration/#enrich-user-sessions
[2]: /real_user_monitoring/ios/advanced_configuration/#track-user-sessions
[3]: https://support.apple.com/guide/security/security-of-runtime-process-sec15bfe098e/web
[4]: https://developer.apple.com/documentation/uikit/app_and_environment/responding_to_the_launch_of_your_app/about_the_app_launch_sequence
[5]: /data_security/real_user_monitoring/#ip-address
[6]: /data_security/real_user_monitoring/#geolocation
