---
title: Product Analytics Data Collected
description: Learn about the event types, measurements, and attributes that Product Analytics collects, including sessions, views, and actions.
further_reading:
- link: "/real_user_monitoring/application_monitoring/browser/data_collected/"
  tag: "Documentation"
  text: "RUM Browser Data Collected"
- link: "/real_user_monitoring/application_monitoring/ios/data_collected/"
  tag: "Documentation"
  text: "RUM iOS Data Collected"
- link: "/real_user_monitoring/application_monitoring/android/data_collected/"
  tag: "Documentation"
  text: "RUM Android Data Collected"
---

## Overview

Product Analytics collects user activity data as events. Each event has two types of data:

- **Telemetry**: Quantifiable values used to track and compare activity (for example, `view.time_spent`).
- **Attributes**: Descriptive values used to filter and break down measurements in your analysis (for example, `device.type` or `geo.country`).

Every event has all of the [default attributes](#default-attributes). To identify individual users across sessions, Product Analytics relies on the `usr.id` and `usr.email` attributes.

There are additional [telemetry and attributes specific to a given event type](#event-specific-attributes). For example, `action.name` is an attribute on action events.

<div class="alert alert-info">Product Analytics uses the same SDKs and configuration as Real User Monitoring (RUM) to collect data. Unlike RUM, Product Analytics does not collect Errors, Resources, Long Tasks, or Vitals events. For the full list of RUM event types and attributes, see the data collected pages for <a href="/real_user_monitoring/application_monitoring/browser/data_collected/">browser</a>, <a href="/real_user_monitoring/application_monitoring/ios/data_collected/">iOS</a>, and <a href="/real_user_monitoring/application_monitoring/android/data_collected/">Android</a>.</div>

| Event Type | Retention | Description |
|------------|-----------|-------------|
| Session | 15 months | A session represents a real user journey through your application. It begins when a user opens the application and remains open as long as the user is active. All events generated during the session share the same `session.id` attribute. **Note:** The session resets after 15 minutes of inactivity. |
| View | 15 months | A view represents a unique page or screen a user visits within a session. In a browser, a view is created each time a user visits a page. On mobile, a view corresponds to a screen or screen segment. All events generated while a user is on a view share the same `view.id` attribute. |
| Action | 15 months | An action represents user activity in your application, such as a click, tap, swipe, or scroll. Actions are automatically collected by the SDK. Each action is attached to the view it was generated in with a unique `action.id`. |
| Labeled Action | 15 months | A labeled action is a custom name applied to an autocaptured action using [Action Management][1]. Labeled actions allow you to organize and analyze specific user interactions without writing code. |

## Default attributes

The following attributes are attached to all events by default.

### General

| Attribute | Type | Description |
|-----------|------|-------------|
| `date` | number | Timestamp of the event. |
| `type` | string | The type of the event (for example, `view` or `action`). |
| `service` | string | The unified service name for this application used to correlate user sessions. |
| `application.id` | string | The Datadog application ID. |
| `application.name` | string | The Datadog application name. |

### Device

| Attribute | Type | Description |
|-----------|------|-------------|
| `device.brand` | string | The device brand as reported by the device. |
| `device.model` | string | The device model as reported by the device. |
| `device.name` | string | The device name as reported by the device. |
| `device.type` | string | The device type as reported by the device (for example, `Mobile`, `Tablet`, or `Desktop`). |

### Operating system

| Attribute | Type | Description |
|-----------|------|-------------|
| `os.name` | string | The OS name as reported by the device. |
| `os.version` | string | The OS version as reported by the device. |
| `os.version_major` | string | The major OS version as reported by the device. |

### Geo-location

The following attributes are derived from the IP address of the session.

**Note:** To stop collecting geo-location attributes, change the setting in your [application details][5].

| Attribute | Type | Description |
|-----------|------|-------------|
| `geo.country` | string | Name of the country. |
| `geo.country_iso_code` | string | ISO code of the country (for example, `US` or `FR`). |
| `geo.country_subdivision` | string | Name of the first subdivision level of the country (for example, `California` or `Sarthe`). |
| `geo.continent_code` | string | Two-letter continent code (for example, `EU` for Europe or `NA` for North America). |
| `geo.continent` | string | Name of the continent. |
| `geo.city` | string | Name of the city (for example, `San Francisco` or `Paris`). |

### User attributes

You can enable [tracking user info][6] globally to collect and apply user attributes to all events.

| Attribute | Type | Description |
|-----------|------|-------------|
| `usr.id` | string | Identifier of the user. |
| `usr.name` | string | Name of the user. |
| `usr.email` | string | Email of the user. |

## Event-specific attributes

The following attributes are specific to each event type.

### Session attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `session.id` | string | Unique ID of the session. |
| `session.type` | string | Type of the session (`user`). |
| `session.is_active` | boolean | Indicates if the session is active. The session ends after 4 hours of activity or 15 minutes of inactivity. |
| `session.time_spent` | number (nanoseconds) | Time spent on the session. |
| `session.view.count` | number | Count of all views collected for this session. |
| `session.action.count` | number | Count of all actions collected for this session. |
| `session.initial_view.url` | string | URL of the initial view of the session. |
| `session.initial_view.name` | string | Name of the initial view of the session. |
| `session.last_view.url` | string | URL of the last view of the session. |
| `session.last_view.name` | string | Name of the last view of the session. |
| `session.ip` | string | IP address of the session. To stop collecting this attribute, change the setting in your [application details][5]. |
| `session.useragent` | string | Browser or device identifier used to determine device type and version. |
| `session.has_replay` | boolean | Indicates if the session has a Session Replay recording attached. |

### View attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `view.id` | string | Unique ID of the view. |
| `view.url` | string | URL of the page or canonical name of the screen corresponding to the event. |
| `view.name` | string | Customizable name of the view. |
| `view.is_active` | boolean | Indicates whether the view is active. |
| `view.time_spent` | number (nanoseconds) | Time spent on this view. |
| `view.action.count` | number | Count of all actions collected for this view. |
| `view.loading_time` | number (nanoseconds) | Time until the view is ready and no network request or DOM mutation is occurring. |
| `view.interaction_to_next_view_time` | number (nanoseconds) | Time between the last user interaction in the previous view and the start of this view. |

#### UTM attributes

**Note:** UTM attributes are only available for browser applications.

| Attribute | Type | Description |
|-----------|------|-------------|
| `view.url_query.utm_source` | string | The parameter in the URL tracking the source of traffic. |
| `view.url_query.utm_medium` | string | The parameter in the URL tracking the channel where the traffic is coming from. |
| `view.url_query.utm_campaign` | string | The parameter in the URL identifying the specific marketing campaign tied to that view. |
| `view.url_query.utm_content` | string | The parameter in the URL identifying the specific element a user clicked within a marketing campaign. |
| `view.url_query.utm_term` | string | The parameter in the URL tracking the keyword a user searched to trigger a given campaign. |

### Action attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `action.id` | string | Unique ID of the user action. |
| `action.type` | string | Type of the user action (for example, `click`, `tap`, or `application_start`). |
| `action.name` | string | Name of the user action (for example, `Click on #checkout`). |
| `action.target.name` | string | Element that the user interacted with. Only available for automatically collected actions. |
| `action.loading_time` | number (nanoseconds) | The loading time of the action. |

### Frustration signals

**Note:** Frustration signals are only available for browser applications.

#### Measurements

| Attribute | Type | Description |
|-----------|------|-------------|
| `session.frustration.count` | number | Count of all frustration signals associated with one session. |
| `view.frustration.count` | number | Count of all frustration signals associated with one view. |

#### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `action.frustration.type:dead_click` | string | Dead clicks detected by the RUM Browser SDK. |
| `action.frustration.type:rage_click` | string | Rage clicks detected by the RUM Browser SDK. |
| `action.frustration.type:error_click` | string | Error clicks detected by the RUM Browser SDK. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /product_analytics/guide/action_management/
[5]: https://app.datadoghq.com/rum/list
[6]: /real_user_monitoring/application_monitoring/browser/advanced_configuration/#user-session
