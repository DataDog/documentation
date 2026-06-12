<!--
This partial contains data collected information for the C++ SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

## Overview

The RUM C++ SDK generates events that have associated attributes. Quantifiable attributes can be used for measurements related to the event, while non-quantifiable attributes can be used to slice telemetry in analytics (group by).

Every RUM event includes all [default attributes](#default-attributes) — for example, the platform (`os.type`) and service name (`service`) — as well as [event-specific attributes](#event-specific-attributes). You can further enrich your session data by [adding custom attributes][1].

## Events

| Event type | Retention | Description |
|------------|-----------|-------------|
| Session    | 30 days   | A session represents a continuous usage period in your application. It begins when `Core::Start()` is called and remains active while the application is running. All RUM events generated during the session share the same `session.id`. |
| View       | 30 days   | A view corresponds to a logical screen or scene, tracked manually using `StartView()` and `StopView()`. All events (errors, resources, and actions) generated while a view is active are attached to it with a unique `view.id`. |
| Resource   | 15 days   | A resource represents a network request, tracked manually using `StartResource()` and `StopResource()`. Resources are associated with the active view. |
| Error      | 30 days   | An error represents an exception or problem in the application, reported via `AddError()` or automatically captured as a crash. Errors are attached to the active view. |
| Action     | 30 days   | An action represents a significant application or user event, tracked via `AddAction()` for instantaneous events or `StartAction()` and `StopAction()` for continuous ones. Actions are attached to the active view. |

The following diagram illustrates the RUM event hierarchy:

{% img src="real_user_monitoring/data_collected/event-hierarchy.png" alt="RUM Event hierarchy" style="width:50%;" /%}

## Default Attributes

RUM collects common attributes for all events automatically. You can further enrich your session data by tracking [custom attributes][1].

### Common core attributes

| Attribute name     | Type    | Description |
|--------------------|---------|-------------|
| `application.id`   | string  | The Datadog application ID. |
| `application.name` | string  | The Datadog application name. |
| `date`             | integer | Start of the event in milliseconds from epoch. |
| `service`          | string  | The [unified service name][2] for this application. |
| `env`              | string  | The environment tag (for example, `production` or `staging`). |
| `version`          | string  | The application version set via `SetApplicationVersion()`. |
| `type`             | string  | The type of the event (for example, `view` or `error`). |
| `session.id`       | string  | A unique identifier for the current session. |

### Operating system

| Attribute name  | Type   | Description |
|-----------------|--------|-------------|
| `os.type`       | string | The operating system family (for example, `linux`, `windows`, or `darwin`). |
| `os.version`    | string | The operating system version string. |

## Event-Specific Attributes

### View

| Attribute name          | Type    | Description |
|-------------------------|---------|-------------|
| `view.id`               | string  | A unique identifier for the view. |
| `view.name`             | string  | The name provided to `StartView()`. |
| `view.url`              | string  | Same as `view.name` for native applications. |
| `view.time_spent`       | integer | Time spent on the view in nanoseconds. |
| `view.error.count`      | integer | Count of errors generated during this view. |
| `view.action.count`     | integer | Count of actions generated during this view. |
| `view.resource.count`   | integer | Count of resources tracked during this view. |

### Resource

| Attribute name           | Type    | Description |
|--------------------------|---------|-------------|
| `resource.id`            | string  | A unique identifier for the resource. |
| `resource.type`          | string  | The type of resource (for example, `native`, `image`, `fetch`). |
| `resource.method`        | string  | The HTTP method (for example, `GET`, `POST`). |
| `resource.url`           | string  | The resource URL. |
| `resource.status_code`   | integer | The HTTP response status code. |
| `resource.duration`      | integer | Duration of the request in nanoseconds. |
| `resource.size`          | integer | Response body size in bytes. |

### Error

| Attribute name   | Type    | Description |
|------------------|---------|-------------|
| `error.id`       | string  | A unique identifier for the error. |
| `error.source`   | string  | Where the error originated (for example, `source`, `network`, `custom`). |
| `error.type`     | string  | The error type or kind string provided to `AddError()`. |
| `error.message`  | string  | The error message. |
| `error.stack`    | string  | The stack trace string, if provided. |
| `error.is_crash` | boolean | `true` if the error caused the application to crash. |

### Action

| Attribute name    | Type    | Description |
|-------------------|---------|-------------|
| `action.id`       | string  | A unique identifier for the action. |
| `action.type`     | string  | The type of action (for example, `tap`, `click`, `custom`). |
| `action.name`     | string  | The name provided to `AddAction()` or `StartAction()`. |
| `action.duration` | integer | Duration of the action in nanoseconds (continuous actions only). |

## Data Storage

The SDK stores events on disk before uploading them to Datadog. Events are preserved across application restarts, so data collected before an unexpected shutdown is sent on the next launch. The SDK manages disk usage automatically, pruning the oldest events when limits are reached. You can configure the storage location using `SetApplicationStoragePath()` in `CoreConfig`. See [Event Storage Location][3] for details.

[1]: /real_user_monitoring/application_monitoring/cpp/advanced_configuration/#custom-attributes
[2]: /getting_started/tagging/unified_service_tagging/
[3]: /real_user_monitoring/application_monitoring/cpp/advanced_configuration/#event-storage-location
