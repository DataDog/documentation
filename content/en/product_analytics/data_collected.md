---
title: Product Analytics Data Collected
description: Learn about the event types, measurements, and attributes that Product Analytics collects, including sessions, views, and actions.
further_reading:
- link: "/product_analytics/"
  tag: "Documentation"
  text: "Product Analytics"
- link: "/product_analytics/guide/rum_and_product_analytics/"
  tag: "Documentation"
  text: "Understanding RUM and Product Analytics"
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

- **Measurements** (also referred to as telemetry): Quantifiable values used to track and compare activity (for example, time spent on a view or number of actions in a session).
- **Attributes**: Descriptive values used to filter and break down measurements in your analysis (for example, device type or country).

Every event has all of the [default attributes](#default-attributes), for example, the device type (`device.type`) and user information such as their country (`geo.country`). To identify individual users across sessions, Product Analytics relies on the `usr.id` and `usr.email` attributes.

There are additional [measurements and attributes specific to a given event type](#event-specific-attributes). For example, `view.time_spent` is a measurement on view events, and `action.name` is an attribute on action events.

<div class="alert alert-info">Unlike RUM, Product Analytics does not collect Errors, Resources, Long Tasks, or Vitals events. For the full list of RUM event types and attributes, see the data collected pages for <a href="/real_user_monitoring/application_monitoring/browser/data_collected/">browser</a>, <a href="/real_user_monitoring/application_monitoring/ios/data_collected/">iOS</a>, and <a href="/real_user_monitoring/application_monitoring/android/data_collected/">Android</a>.</div>

| Event Type | Retention | Description |
|------------|-----------|-------------|
| Session | 15 months | A session represents a real user journey through your application. It begins when a user opens the application and remains active as long as the user stays active. All events generated during the session share the same `session.id` attribute. **Note:** The session resets after 15 minutes of inactivity. |
| View | 15 months | A view represents a unique page or screen a user visits within a session. On browser, a view is created each time a user visits a page. On mobile, a view corresponds to a screen or screen segment. All events generated while a user is on a view share the same `view.id` attribute. |
| Action | 15 months | An action represents user activity in your application, such as a click, tap, swipe, or scroll. Actions are automatically collected by the SDK. Each action is attached to the view it was generated in with a unique `action.id`. |
| Labeled Action | 15 months | A labeled action is a named label applied to an autocaptured action using [Action Management][1]. Labeled actions allow you to organize and analyze specific user interactions without writing code. |

## Default attributes

The following attributes are attached to all events by default.

### General

| Attribute name | Type | Description |
|----------------|------|-------------|
| `date` | number | Timestamp of the event. |
| `type` | text | The type of the event (for example, `view` or `action`). |
| `service` | text | The unified service name for this application used to correlate user sessions. |
| `application.id` | text | The Datadog application ID. |
| `application.name` | text | The Datadog application name. |

### Device

| Attribute name | Type | Description |
|----------------|------|-------------|
| `device.brand` | text | The device brand as reported by the device. |
| `device.model` | text | The device model as reported by the device. |
| `device.name` | text | The device name as reported by the device. |
| `device.type` | text | The device type as reported by the device (for example, `Mobile`, `Tablet`, or `Desktop`). |

### Operating system

| Attribute name | Type | Description |
|----------------|------|-------------|
| `os.name` | text | The OS name as reported by the device. |
| `os.version` | text | The OS version as reported by the device. |
| `os.version_major` | text | The major OS version as reported by the device. |

### Geo-location

The following attributes are derived from the IP address of the session.

**Note:** To stop collecting geo-location attributes, change the setting in your [application details][5].

| Attribute name | Type | Description |
|----------------|------|-------------|
| `geo.country` | text | Name of the country. |
| `geo.country_iso_code` | text | ISO code of the country (for example, `US` or `FR`). |
| `geo.country_subdivision` | text | Name of the first subdivision level of the country (for example, `California` or `Sarthe`). |
| `geo.continent_code` | text | Two-letter continent code (for example, `EU` for Europe or `NA` for North America). |
| `geo.continent` | text | Name of the continent. |
| `geo.city` | text | Name of the city (for example, `San Francisco` or `Paris`). |

### User attributes

You can enable [tracking user info][6] globally to collect and apply user attributes to all events.

| Attribute name | Type | Description |
|----------------|------|-------------|
| `usr.id` | text | Identifier of the user. |
| `usr.name` | text | Name of the user. |
| `usr.email` | text | Email of the user. |

## Event-specific attributes

### Session attributes

#### Measurements

| Attribute | Type | Description |
|-----------|------|-------------|
| `session.time_spent` | number (nanoseconds) | Time spent on the session. |
| `session.view.count` | number | Count of all views collected for this session. |
| `session.action.count` | number | Count of all actions collected for this session. |

#### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `session.id` | text | Unique ID of the session. |
| `session.type` | text | Type of the session (`user`). |
| `session.is_active` | true/false | Indicates if the session is currently active. The session ends after 4 hours of activity or 15 minutes of inactivity. |
| `session.initial_view.url` | text | URL of the initial view of the session. |
| `session.initial_view.name` | text | Name of the initial view of the session. |
| `session.last_view.url` | text | URL of the last view of the session. |
| `session.last_view.name` | text | Name of the last view of the session. |
| `session.ip` | text | IP address of the session. To stop collecting this attribute, change the setting in your [application details][5]. |
| `session.useragent` | text | Browser or device identifier used to determine device type and version. |
| `session.has_replay` | true/false | Indicates if the session has a Session Replay recording attached. |

### View attributes

#### Measurements

| Attribute | Type | Description |
|-----------|------|-------------|
| `view.time_spent` | number (nanoseconds) | Time spent on this view. |
| `view.action.count` | number | Count of all actions collected for this view. |
| `view.loading_time` | number (nanoseconds) | Time until the view is ready and no network request or DOM mutation is occurring. |
| `view.interaction_to_next_view_time` | number (nanoseconds) | Time between the last user interaction in the previous view and the start of this view. |

#### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `view.id` | text | Unique ID of the view. |
| `view.url` | text | URL of the page or canonical name of the screen corresponding to the event. |
| `view.name` | text | Customizable name of the view. |
| `view.is_active` | true/false | Indicates whether the view is currently active. |

#### UTM attributes

**Note:** UTM attributes are only available for browser applications.

| Attribute | Type | Description |
|-----------|------|-------------|
| `view.url_query.utm_source` | text | The parameter in the URL tracking the source of traffic. |
| `view.url_query.utm_medium` | text | The parameter in the URL tracking the channel where the traffic is coming from. |
| `view.url_query.utm_campaign` | text | The parameter in the URL identifying the specific marketing campaign tied to that view. |
| `view.url_query.utm_content` | text | The parameter in the URL identifying the specific element a user clicked within a marketing campaign. |
| `view.url_query.utm_term` | text | The parameter in the URL tracking the keyword a user searched to trigger a given campaign. |

### Action attributes

#### Measurements

| Attribute | Type | Description |
|-----------|------|-------------|
| `action.loading_time` | number (nanoseconds) | The loading time of the action. |

#### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `action.id` | text | Unique ID of the user action. |
| `action.type` | text | Type of the user action (for example, `click`, `tap`, or `application_start`). |
| `action.name` | text | Name of the user action (for example, `Click on #checkout`). |
| `action.target.name` | text | Element that the user interacted with. Only available for automatically collected actions. |

<!-- SME REVIEW NEEDED: The following action count attributes (error, resource, long_task) are
collected as part of the action event itself in RUM. Since Product Analytics does not collect
Error, Resource, or Long Task events separately, please confirm if these should be included.

| `action.error.count` | number | Count of all errors issued by this action. |
| `action.resource.count` | number | Count of all resources issued by this action. |
| `action.long_task.count` | number | Count of all long tasks collected for this action. |
-->

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
| `action.frustration.type:dead_click` | text | Dead clicks detected by the RUM Browser SDK. |
| `action.frustration.type:rage_click` | text | Rage clicks detected by the RUM Browser SDK. |
| `action.frustration.type:error_click` | text | Error clicks detected by the RUM Browser SDK. |

<!-- SME REVIEW NEEDED: Please confirm:
1. Should this page document these profile-level attributes, or should they remain documented
   exclusively on the profiles.md page?
2. Are there any attribute names (for example, first_seen, last_seen, last_seen_country) that
   should also be added here?

The profile attributes are:
- First Seen / Last Seen (timestamp)
- First Seen Application / Last Seen Application (string)
- First City / Last City (string)
- First Seen Country / Last Seen Country (string, stored as ISO code, displayed as name)
- First Region / Last Region (string)
- First Device Type / Last Device Type (string)
- First OS Name / Last OS Name (string)
- First OS Version / Last OS Version (string)
- First Browser Name / Last Browser Name (string)
- First Browser Version / Last Browser Version (string)
-->

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /product_analytics/guide/action_management/
[2]: /real_user_monitoring/application_monitoring/browser/data_collected/
[3]: /real_user_monitoring/application_monitoring/ios/data_collected/
[4]: /real_user_monitoring/application_monitoring/android/data_collected/
[5]: https://app.datadoghq.com/rum/list
[6]: /real_user_monitoring/application_monitoring/browser/advanced_configuration/#user-session
