---
title: Android Data Collected
description: "Understand RUM Android SDK event types, attributes, and telemetry data including sessions, views, actions, resources, and errors."
aliases:
- /real_user_monitoring/android/data_collected/
- /real_user_monitoring/mobile_and_tv_monitoring/data_collected/android
- /real_user_monitoring/mobile_and_tv_monitoring/android/data_collected
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: "Source Code"
  text: Source code for dd-sdk-android
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Datadog RUM
---

## Overview

The RUM Android SDK generates events that have associated attributes. These can have quantifiable values and can be used for measurements related to the event, while others are non-quantifiable values used to slice telemetry values (group by) in analytics.

Every RUM event has all of the [default attributes](#default-attributes), for example, the device type (`device.type`) and user information such as their name (`usr.name`) and their country (`geo.country`).

There are additional [attributes that are specific to a given event type](#event-specific-attributes). For example, the `view.time_spent` attribute is associated with "view" events and the `resource.method` one is associated with "resource" events.

| Event Type     | Retention | Description     |
|----------------|-----------|-------------------|
| Session  | 30 days   | A session represents a real user journey on your mobile application. It begins when the user launches the application, and the session remains live as long as the user stays active. During the user journey, all RUM events generated as part of the session will share the same `session.id` attribute. **Note:** The session resets after 15 minutes of inactivity. If the application is killed by the OS, you can reset the session while the application is in the background. |
| View     | 30 days   | A view represents a unique screen (or screen segment) on your mobile application. A view starts and stops when the `onActivityResumed` and `onActivityPaused` callbacks are called through the `ActivityLifecycleCallbacks` interface. Each occurrence is classified as a distinct view. While a user stays on a view, RUM event attributes (Errors, Resources, and Actions) get attached to the view with a unique `view.id`.                     |
| Resource  | 15 days   | A resource represents network requests to first-party hosts, APIs, and third-party providers in your mobile application. All requests generated during a user session are attached to the view with a unique `resource.id`.                                                                                           |
| Error     | 30 days   | An error represents an exception or crash emitted by the mobile application attached to the view it is generated in.                                                                                                                                            |
| Action    | 30 days   | An action represents user activity in your mobile application (such as an application launch, tap, swipe, or back). Each action is attached with a unique `action.id` that is also attached to the view it gets generated in. When an action is being tracked, other actions within the next `100 ms` do not get sent, unless they are [custom actions][1].                                                                                                                                             |
| Long Task | 15 days | A long task event is generated for any task in the application that blocks the main thread for more than the specified duration threshold. |

The following diagram illustrates the RUM event hierarchy:

{{< img src="real_user_monitoring/data_collected/event-hierarchy.png" alt="RUM Event hierarchy" style="width:50%;" >}}

## Views instrumentation versus app lifecycle

The Android RUM SDK offers various strategies to [automatically track views][2] like Activities, Fragments, or Navigation destinations. You can also track views manually by directly calling the RUM APIs. The precise moment a view starts or stops depends on the chosen tracking strategy or manual instrumentation:

- Activities (`ActivityViewTrackingStrategy`): When you rely on this strategy, the SDK automatically starts a RUM view when the Activity enters the foreground (`onResume`) and stops it when the Activity leaves the foreground (`onPause`).
- Fragments (`FragmentViewTrackingStrategy`): Each `Fragment` in your application is tracked as a separate RUM view. The SDK starts the view in the Fragment's `onResume` lifecycle method and stops it in `onPause`.
- Mixed (`MixedViewTrackingStrategy`): Activities and Fragments each become distinct RUM views based on their respective lifecycle events (`onResume` and `onPause`).
- Navigation (`NavigationViewTrackingStrategy`): Each navigation destination is treated as a distinct RUM view, so view boundaries align with navigation events in your graph.
- Manual View Tracking: When [tracking views manually][3] using `GlobalRumMonitor` APIs, the view starts precisely when you call the `startView(...)` method and stops when you call the `stopView()` method.

When the application goes into the background (for example, the user presses the home button or switches apps), RUM automatically stops the current view. Consequently, there is no active view while the app remains in the background. Since RUM's data model requires an active view to correlate and capture events, any events generated in the background are skipped by default. To capture these events instead, refer to the [Track Background Events][4] section.

**Note**: If you're tracking views manually, you need to configure whether the view should be stopped when the app leaves the foreground.

## Default attributes

RUM collects common attributes for all events and attributes specific to each event listed below [automatically][5]. You can also choose to enrich your user session data by tracking [additional events][6] or by [adding custom attributes][7] to default events specific to your application monitoring and business analytics needs.

### Common core attributes

| Attribute name   | Type   | Description                 |
|------------------|--------|-----------------------------|
| `application.id` | string | The Datadog application ID. |
| `application.name` | string | The Datadog application name. |
| `date` | integer  | Start of the event in milliseconds from epoch. |
| `service` | string | The [unified service name][8] for this application used to correlate user sessions. |
| `type`     | string | The type of the event (for example, `view` or `resource`).             |

### Device

The following device-related attributes are attached automatically to all events collected by Datadog:

| Attribute name                           | Type   | Description                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `device.architecture` | string | The CPU architecture of the device that is reporting the error. |
| `device.brand`  | string | The device brand as reported by the device (System User-Agent).  |
| `device.model`   | string | The device model as reported by the device (System User-Agent).    |
| `device.name` | string | The device name as reported by the device (System User-Agent).  |
| `device.type`       | string | The device type as reported by the device (System User-Agent).      |

### Connectivity

The following network-related attributes are attached automatically to Resource and Error events collected by Datadog:

| Attribute name                           | Type   | Description                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `connectivity.cellular.carrier_name` | string | The name of the SIM carrier. |
| `connectivity.cellular.technology` | string | The type of a radio technology used for cellular connection. |
| `connectivity.interfaces` | string | The list of available network interfaces (for example, `bluetooth`, `cellular`, `ethernet`, or `wifi`). |
| `connectivity.status` | string | Status of device network reachability (`connected`, `not connected`, or `maybe`). |

### Operating system

The following OS-related attributes are attached automatically to all events collected by Datadog:

| Attribute name                           | Type   | Description                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `os.name`       | string | The OS name as reported by the device (System User-Agent).       |
| `os.version`  | string | The OS version as reported by the device (System User-Agent).  |
| `os.version_major`   | string | The OS version major as reported by the device (System User-Agent).   |

### Geo-location

The following attributes are related to the geo-location of IP addresses.

**Note:** If you want to stop collecting geo-location attributes, change the setting in your [application details][9].

| Attribute name                              | Type   | Description                                                                                                                          |
|:--------------------------------------------|:-------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `geo.country`         | string | Name of the country.                                                                                                                 |
| `geo.country_iso_code`     | string | ISO Code of the country (for example, `US` for the United States or `FR` for France).                                                  |
| `geo.country_subdivision`     | string | Name of the first subdivision level of the country (for example, `California` in the United States or the `Sarthe` department in France). |
| `geo.continent_code`       | string | ISO code of the continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, or `OC`).                                                                 |
| `geo.continent`       | string | Name of the continent (`Europe`, `Australia`, `North America`, `Africa`, `Antarctica`, `South America`, or `Oceania`).                    |
| `geo.city`            | string | The name of the city (for example, `San Francisco`, `Paris`, or `New York`).                                                                                   |

### Global user attributes

You can enable [tracking user info][10] globally to collect and apply user attributes to all RUM events.

| Attribute name   | Type   | Description                 |
|------------------|--------|-----------------------------|
| `usr.email` | string | Email of the user. |
| `user.id`     | string | Identifier of the user. |
| `usr.name` | string | Name of the user. |

## Event-specific attributes

Telemetry are quantifiable values that can be used for measurements related to the event. Attributes are non-quantifiable values used to slice telemetry values (group by) in analytics.

### Session attributes

| Attribute  | Type   | Description                |
|------------|--------|----------------------------|
| `session.action.count`      | number      | Count of all actions collected for this session. |
| `session.error.count`      | number      | Count of all errors collected for this session.  |
| `session.has_replay` | boolean | Indicates if the session has a captured Session Replay recording attached to visually play the user experience. |
| `session.id` | string | Unique ID of the session. |
| `session.ip` | string | IP address of the session extracted from the TCP connection of the intake. If you want to stop collecting this attribute, change the setting in your [application details][11]. |
| `session.is_active` | boolean | Indicates if the session is currently active. The session ends if a user navigates away from the application or closes the application, and expires after 4 hours of activity or 15 minutes of inactivity. |
| `session.initial_view.name` | string | Name of the initial view of the session. |
| `session.initial_view.url` | string | URL of the initial view of the session. |
| `session.last_view.url` | string | URL of the last view of the session. |
| `session.last_view.name` | string | Name of the last view of the session. |
| `session.long_task.count`      | number      | Count of all long tasks collected for this session.  |
| `session.resource.count`         | number      | Count of all resources collected for this session. |
| `session.type` | string | Type of the session (`user`). |
| `session.time_spent` | number (ns) | Time spent on a session. |
| `session.view.count`        | number      | Count of all views collected for this session. |
| `session.useragent` | string | System user agent info to interpret device info. |

### View attributes

RUM action, error, resource, and long task events contain information about the active RUM view event at the time of collection.

| Attribute                              | Type        | Description                                                                                          |
|----------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.action.count`      | number      | Count of all actions collected for this view.                                        |
| `view.error.count`            | number      | Count of all errors collected for this view.                                    |
| `view.id`                      | string | Unique ID of the initial view corresponding to the event.                                                                      |
| `view.interaction_to_next_view_time` | number (ns) | Time between the last user interaction in the previous and start of this (current) view. |
| `view.is_active`      |    boolean   | Indicates whether the view corresponding to this event is considered active.            |
| `view.loading_time` | number (ns) | Time it took for the view to load, set by the `addViewLoadingTime(override:)` call. |
| `view.long_task.count`        | number      | Count of all long tasks collected for this view.                                |
| `view.name` | string | Customizable name of the view corresponding to the event. |
| `view.network_settled_time` | number (ns) | Time it took for a view to be fully loaded with all relevant network calls initiated at the start of the view. |
| `view.resource.count`         | number      | Count of all resources collected for this view.                                 |
| `view.time_spent`                             | number (ns) | Time spent on this view.                                    |
| `view.url`                     | string | Canonical name of the class corresponding to the event.                                                           |

### Resource attributes

| Attribute                              | Type           | Description                                                                                                                               |
|----------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `resource.connect.duration`    | number (ns)    | Time spent establishing a connection to the server (connectEnd - connectStart).                                                            |
| `resource.dns.duration`        | number (ns)    | Time spent resolving the DNS name of the last request (domainLookupEnd - domainLookupStart).                                               |
| `resource.download.duration`   | number (ns)    | Time spent downloading the response (responseEnd - responseStart).                                                                         |
| `resource.duration`            | number (ns)        | Entire time spent loading the resource.                                                                                                   |
| `resource.first_byte.duration` | number (ns)    | Time spent waiting for the first byte of response to be received (responseStart - requestStart).                                           |
| `resource.id`                | string |  Unique identifier of the resource.      |
| `resource.method`                | string | The HTTP method (for example, `POST`, `GET`, `PATCH`, or `DELETE`).           |
| `resource.provider.domain`      | string | The resource provider domain.                                            |
| `resource.provider.name`      | string | The resource provider name. Default is `unknown`.                     |
| `resource.provider.type`  | string | The resource provider type (for example, `first-party`, `cdn`, `ad`, or `analytics`).              |
| `resource.redirect.duration`   | number (ns)    | Time spent on subsequent HTTP requests (redirectEnd - redirectStart).                                                                      |
| `resource.size`                | number (bytes) | Resource size.                                                                                                                            |
| `resource.ssl.duration`        | number (ns)    | Time spent for the TLS handshake. If the last request is not over HTTPS, this attribute does not appear (connectEnd - secureConnectionStart). |
| `resource.status_code`             | number | The response status code.                                                               |
| `resource.type`                | string | The type of resource being collected (for example, `xhr`, `image`, `font`, `css`, or `js`).          |
| `resource.url`              | string | The resource URL.                             |

### Error attributes

Front-end errors are collected with Real User Monitoring (RUM). The error message and stack trace are included when available.

| Attribute       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | string | Where the error originates from (for example, `webview`, `logger`, or `network`).     |
| `error.type`    | string | The error type (or error code in some cases).                   |
| `error.message` | string | A concise, human-readable one-line message explaining the event. |
| `error.stack`   | string | The stack trace or complementary information about the error.     |
| `error.issue_id`   | string | Unique identifier for the error issue.     |
| `error.category` | string | The high-level grouping for the type of error. Possible values are `ANR` or `Exception` |
| `error.file` | string | File where the error happened for the Error Tracking issue. |
| `error.is_crash` | boolean | Indicates whether the error caused the application to crash. |

### Network errors

Network errors include information about failing HTTP requests. The following facets are also collected:

| Attribute                      | Type   | Description                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `error.resource.status_code`             | number | The response status code.                                                               |
| `error.resource.method`                | string | The HTTP method (for example, `POST` or `GET`).           |
| `error.resource.url`                     | string | The resource URL.                                                                       |
| `error.resource.provider.name`      | string | The resource provider name. Default is `unknown`.                                            |
| `error.resource.provider.domain`      | string | The resource provider domain.                                            |
| `error.resource.provider.type`      | string | The resource provider type (for example, `first-party`, `cdn`, `ad`, or `analytics`).                                            |

### Action timing attributes

| Attribute    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.loading_time` | number (ns) | The loading time of the action. |
| `action.long_task.count`        | number      | Count of all long tasks collected for this action. |
| `action.resource.count`         | number      | Count of all resources collected for this action. |
| `action.error.count`      | number      | Count of all errors collected for this action. |

### Action attributes

| Attribute    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.id` | string | UUID of the user action. |
| `action.type` | string | Type of the user action (for example, `tap` or `application_start`). |
| `action.name` | string | Name of the user action. |
| `action.target.name` | string | Element that the user interacted with. Only for automatically collected actions. |

## Data storage

Before data is uploaded to Datadog, it is stored in cleartext in your application's cache directory. This cache folder is protected by [Android's Application Sandbox][12], meaning that on most devices, this data can't be read by other applications. However, if the mobile device is rooted, or someone tampers with the Linux kernel, the stored data might become readable.

## Data upload

The RUM Android SDK allows you to get the data you need to Datadog while considering user bandwidth impact. The Datadog SDK batches and uploads events as follows:

- On *event collected*, the Datadog SDK appends uncompressed events to a batch file (using a tag-length-value, or TLV encoding format)
- On *upload* (when the batch is considered "closed"), the Datadog SDK:
  - Reads the batch and extracts events
  - Drops redundant View events in RUM (no optimizations in other tracks)
  - Builds payloads specific to each track
  - Compresses the payload and sends it

## Direct Boot mode support

If your application supports [Direct Boot mode][13], note that data captured before the device is unlocked won't be captured, since the credential encrypted storage won't be available yet.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/application_monitoring/android/advanced_configuration//#custom-actions
[2]: /real_user_monitoring/application_monitoring/android/advanced_configuration/?tab=kotlin#automatically-track-views
[3]: /real_user_monitoring/application_monitoring/android/advanced_configuration/?tab=kotlin#custom-views
[4]: /real_user_monitoring/application_monitoring/android/setup?tab=rum#track-background-events
[5]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#automatically-track-views
[6]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#enrich-user-sessions
[7]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#track-custom-global-attributes
[8]: /getting_started/tagging/unified_service_tagging/
[9]: /data_security/real_user_monitoring/#geolocation
[10]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#track-user-sessions
[11]: /data_security/real_user_monitoring/#ip-address
[12]: https://source.android.com/security/app-sandbox
[13]: https://developer.android.com/training/articles/direct-boot
