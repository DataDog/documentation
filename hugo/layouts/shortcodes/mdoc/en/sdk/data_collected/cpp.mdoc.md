<!--
This partial contains data collected information for the C++ SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

## Overview

The RUM C++ SDK generates events that have associated attributes. Quantifiable attributes can be used for measurements related to the event, while non-quantifiable attributes can be used to slice telemetry in analytics (group by).

Every RUM event has all of the [default attributes](#default-attributes), for example, the device type (`device.type`) and user information such as their name (`usr.name`) and their country (`geo.country`). There are also [event-specific attributes](#event-specific-attributes). You can further enrich your session data by [adding custom attributes][1].

## Events

| Event type | Retention | Description |
|------------|-----------|-------------|
| Session    | 30 days   | A session represents a continuous usage period in your application. It begins with the first call to `StartView()` and remains active as long as the application is in use. All RUM events generated during the session share the same `session.id`. **Note:** The session resets after 15 minutes of inactivity and expires after 4 hours of continuous activity. |
| View       | 30 days   | A view corresponds to a logical screen or scene, tracked manually using `StartView()` and `StopView()`. All events (errors, resources, and actions) generated while a view is active are attached to it with a unique `view.id`. |
| Resource   | 15 days   | A resource represents a network request, tracked manually using `StartResource()` and `StopResource()`. Resources are associated with the active view. |
| Error      | 30 days   | An error represents an exception or problem in the application, reported with `AddError()` or automatically captured as a crash. Errors are attached to the active view. |
| Action     | 30 days   | An action represents a significant application or user event, tracked with `AddAction()` for instantaneous events or `StartAction()` and `StopAction()` for continuous ones. Actions are attached to the active view. |

The following diagram illustrates the RUM event hierarchy:

{% img src="real_user_monitoring/data_collected/event-hierarchy.png" alt="RUM Event hierarchy" style="width:50%;" /%}

## Default attributes

By default, RUM collects common attributes for all events and the event-specific attributes listed below. You can further enrich your session data by [adding custom attributes][1].

### Common core attributes

| Attribute name     | Type    | Description |
|--------------------|---------|-------------|
| `application.id`   | string  | The RUM application ID. |
| `application.name` | string  | The RUM application name. |
| `date`             | integer | Start of the event in milliseconds from epoch. |
| `service`          | string  | The [unified service name][2] for this application. |
| `env`              | string  | The environment tag (for example, `production` or `staging`). |
| `version`          | string  | The application version set with `SetVersion()`. |
| `type`             | string  | The type of the event (for example, `view` or `error`). |

### Operating system

The following OS-related attributes are attached automatically to all events collected by Datadog:

| Attribute name      | Type   | Description |
|---------------------|--------|-------------|
| `os.name`           | string | The OS name as reported by the system (for example, `Windows`, `macOS`, or `Linux`). |
| `os.version`        | string | The OS version string (for example, `10.0.22631`, `14.2.1`). |
| `os.version_major`  | string | The major version component (for example, `10`, `14`, `22`). |
| `os.build`          | string | The OS build identifier (for example, `22631.6491`, `23C71`). Omitted if unavailable. |

### Device

The following device-related attributes are attached automatically to all events collected by Datadog:

| Attribute name        | Type   | Description |
|-----------------------|--------|-------------|
| `device.type`         | string | The device type (for example, `desktop`). |
| `device.name`         | string | The device name (for example, `MacBookPro`, `Latitude 7420`). |
| `device.model`        | string | The device model identifier (for example, `MacBookPro16,1`). |
| `device.brand`        | string | The device brand or manufacturer (for example, `Apple`, `Dell Inc.`). |
| `device.architecture` | string | The CPU architecture (for example, `x86_64`, `arm64`). |
| `device.locale`       | string | The system locale as a language tag (for example, `en-US`, `fr-FR`). |
| `device.time_zone`    | string | The IANA time zone identifier (for example, `America/New_York`, `Europe/Berlin`). |

### Geolocation

The following attributes are related to the geolocation of IP addresses. Datadog resolves these attributes server-side from the client IP address on the intake connection. The SDK does not access the device's GPS or OS location.

**Note:** If you want to stop collecting geolocation attributes, change the setting in your [application details][4].

| Attribute name             | Type   | Description |
|----------------------------|--------|-------------|
| `geo.country`              | string | Name of the country. |
| `geo.country_iso_code`     | string | ISO code of the country (for example, `US` for the United States or `FR` for France). |
| `geo.country_subdivision`  | string | Name of the first subdivision level of the country (for example, `California` in the United States). |
| `geo.continent_code`       | string | ISO code of the continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`). |
| `geo.continent`            | string | Name of the continent (`Europe`, `Australia`, `North America`, `Africa`, `Antarctica`, `South America`, `Oceania`). |
| `geo.city`                 | string | The name of the city (for example, `San Francisco`, `Paris`, or `New York`). |

### Global user attributes

You can enable [tracking user info][5] globally to collect and apply user attributes to all RUM events.

| Attribute name | Type   | Description |
|----------------|--------|-------------|
| `usr.id`       | string | Identifier of the user. |
| `usr.name`     | string | Name of the user. |
| `usr.email`    | string | Email of the user. |

### Account attributes

You can enable [tracking account info][5] globally to associate an account (such as an organization, workspace, or tenant) with the current session.

| Attribute name | Type   | Description |
|----------------|--------|-------------|
| `acc.id`       | string | Identifier of the account. |
| `acc.name`     | string | Name of the account. |

## Event-specific attributes

### Session

| Attribute              | Type        | Description |
|------------------------|-------------|-------------|
| `session.id`           | string      | Unique ID of the session. |
| `session.type`         | string      | Type of the session (`user`). |
| `session.is_active`    | Boolean     | Indicates if the session is active. The session ends after 15 minutes of inactivity or 4 hours of continuous activity. |
| `session.ip`           | string      | IP address of the session extracted from the TCP connection of the intake. If you want to stop collecting this attribute, change the setting in your [application details][6]. |
| `session.time_spent`   | number (ns) | Time spent on the session. |
| `session.view.count`   | number      | Count of all views collected for this session. |
| `session.action.count` | number      | Count of all actions collected for this session. |
| `session.error.count`  | number      | Count of all errors collected for this session. |
| `session.resource.count` | number    | Count of all resources collected for this session. |
| `session.initial_view.name` | string | Name of the initial view of the session. |
| `session.initial_view.url`  | string | URL of the initial view of the session. |
| `session.last_view.name`    | string | Name of the last view of the session. |
| `session.last_view.url`     | string | URL of the last view of the session. |

### View

| Attribute name          | Type        | Description |
|-------------------------|-------------|-------------|
| `view.id`               | string      | A unique identifier for the view. |
| `view.name`             | string      | The name provided to `StartView()`. |
| `view.url`              | string      | Same as `view.name` for native applications. |
| `view.time_spent`       | number (ns) | Time spent on the view. |
| `view.is_active`        | Boolean     | Indicates whether the view is active. |
| `view.error.count`      | number      | Count of errors generated during this view. |
| `view.action.count`     | number      | Count of actions generated during this view. |
| `view.resource.count`   | number      | Count of resources tracked during this view. |

### Resource

| Attribute name           | Type        | Description |
|--------------------------|-------------|-------------|
| `resource.id`            | string      | A unique identifier for the resource. |
| `resource.type`          | string      | The type of resource being collected (for example, `native`, `image`, `fetch`, `xhr`, `css`, or `js`). |
| `resource.method`        | string      | The HTTP method (for example, `GET`, `POST`, `PUT`, or `DELETE`). |
| `resource.url`           | string      | The resource URL. |
| `resource.status_code`   | number      | The HTTP response status code. |
| `resource.duration`      | number (ns) | Time spent loading the resource. |
| `resource.size`          | number (bytes) | Response body size in bytes. |

### Error

Frontend errors are collected with Real User Monitoring (RUM). The error message and stack trace are included when available.

| Attribute name   | Type    | Description |
|------------------|---------|-------------|
| `error.source`   | string  | Where the error originated (for example, `source`, `network`, or `custom`). |
| `error.type`     | string  | The error type or kind string provided to `AddError()`. |
| `error.message`  | string  | A concise, human-readable, one-line message explaining the event. |
| `error.stack`    | string  | The stack trace or complementary information about the error. |
| `error.category` | string  | High-level grouping for the type of error. Possible values: `Exception`, `Network`. |
| `error.is_crash` | Boolean | `true` if the error caused the application to crash. |

#### Network errors

Network errors include information about failing HTTP requests. The following facets are also collected:

| Attribute                       | Type   | Description |
|---------------------------------|--------|-------------|
| `error.resource.status_code`    | number | The response status code. |
| `error.resource.method`         | string | The HTTP method (for example, `POST` or `GET`). |
| `error.resource.url`            | string | The resource URL. |

### Action

| Attribute name          | Type        | Description |
|-------------------------|-------------|-------------|
| `action.id`             | string      | A unique identifier for the action. |
| `action.type`           | string      | The type of action (for example, `tap`, `click`, `scroll`, `swipe`, or `custom`). |
| `action.target.name`    | string      | The name provided to `AddAction()` or `StartAction()`. |
| `action.loading_time`   | number (ns) | Duration of the action. |
| `action.error.count`    | number      | Count of errors that occurred while this action was active. |
| `action.resource.count` | number      | Count of resources tracked while this action was active. |

## Data storage

The SDK stores events on disk before uploading them to Datadog. Events are preserved across application restarts, so data collected before an unexpected shutdown is sent on the next launch. The SDK manages disk usage automatically, pruning the oldest events when limits are reached. You can configure the storage location using `SetApplicationStoragePath()` in `CoreConfig`. See [Event Storage Location][3] for details.

[1]: /real_user_monitoring/application_monitoring/cpp/advanced_configuration/#custom-attributes
[2]: /getting_started/tagging/unified_service_tagging/
[3]: /real_user_monitoring/application_monitoring/cpp/advanced_configuration/#application-storage-path
[4]: /data_security/real_user_monitoring/#geolocation
[5]: /real_user_monitoring/application_monitoring/cpp/advanced_configuration/#track-user-and-account-information
[6]: /data_security/real_user_monitoring/#ip-address
