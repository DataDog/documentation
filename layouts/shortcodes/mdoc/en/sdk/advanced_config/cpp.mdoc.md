<!--
This partial contains advanced configuration instructions for the C++ SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

If you haven't set up the C++ SDK yet, follow the [in-app setup instructions][1] or see the [RUM C++ setup documentation][2].

## Instrument your application

The C++ SDK is a low-level library that is not coupled to a UI framework. As such, it does not automatically instrument your application: user interactions and changes in application state must be manually recorded by calling the appropriate RUM API.

### Track views

A RUM session is organized into views, each representing a distinct screen, scene, or state in your application, such as a level, menu, or settings panel. All actions, resources, and errors are associated with the current view.

Each view is identified by a `key` string that uniquely identifies it within your application. An optional `name` provides a human-readable label in the Datadog UI; if omitted, `name` defaults to the value of `key`. Only one view is active at a time: `StartView` implicitly stops the previous one.

{% tabs %}
{% tab label="C++" %}

```cpp
// Begin tracking the main menu
rum->StartView("main_menu", "Main Menu");

// Transition to a gameplay view — implicitly stops "main_menu"
rum->StartView("gameplay_level1", "Level 1");

// Explicitly stop a view
rum->StopView("gameplay_level1");
```

{% /tab %}
{% tab label="C" %}

```c
/* Begin tracking the main menu */
dd_rum_start_view(rum, "main_menu", "Main Menu", NULL);

/* Transition to a gameplay view — implicitly stops "main_menu" */
dd_rum_start_view(rum, "gameplay_level1", "Level 1", NULL);

/* Explicitly stop a view */
dd_rum_stop_view(rum, "gameplay_level1", NULL);
```

{% /tab %}
{% /tabs %}

### Track actions

Actions record user interactions in the context of the current view. The SDK supports two kinds:

- **Discrete actions** (`AddAction`): momentary events such as a button press. No explicit stop is required.
- **Continuous actions** (`StartAction` / `StopAction`): events that span a duration, such as a drag or scroll.

Available action types are `Tap`, `Click`, `Scroll`, `Swipe`, and `Custom`. Only one non-`Custom` action may be active at a time; `AddAction` with type `Custom` is always accepted regardless of other active actions.

{% tabs %}
{% tab label="C++" %}

```cpp
// Record a discrete button tap
rum->AddAction(datadog::RumActionType::Tap, "confirm_button");

// Record the start and end of a scroll
rum->StartAction(datadog::RumActionType::Scroll, "item_list");
// ... user scrolls ...
rum->StopAction(datadog::RumActionType::Scroll);
```

{% /tab %}
{% tab label="C" %}

```c
/* Record a discrete button tap */
dd_rum_add_action(rum, DD_RUM_ACTION_TYPE_TAP, "confirm_button", NULL);

/* Record the start and end of a scroll */
dd_rum_start_action(rum, DD_RUM_ACTION_TYPE_SCROLL, "item_list", NULL);
/* ... user scrolls ... */
dd_rum_stop_action(rum, DD_RUM_ACTION_TYPE_SCROLL, NULL, NULL);
```

{% /tab %}
{% /tabs %}

### Track resources

Resources track HTTP requests (or any analogous network operation) made in the context of the current view. Each resource is identified by a `key` string that must be unique among all concurrently active resources; this is how `StopResource` and `StopResourceWithError` identify which request has completed.

{% tabs %}
{% tab label="C++" %}

```cpp
// Record the start of an HTTP request
rum->StartResource("req-profile", datadog::RumResourceMethod::Get,
                   "https://api.example.com/profile");

// When the response arrives, record completion
rum->StopResource("req-profile", /*status_code=*/200, /*size=*/response_body_size,
                  datadog::RumResourceType::Native);

// If the request fails (no valid response received):
// rum->StopResourceWithError("req-profile", "Connection timeout",
//                            "NetworkError", /*stack=*/"", /*is_network=*/true);
```

{% /tab %}
{% tab label="C" %}

```c
/* Record the start of an HTTP request */
dd_rum_start_resource(rum, "req-profile", DD_RUM_RESOURCE_METHOD_GET,
                      "https://api.example.com/profile", NULL);

/* When the response arrives, record completion */
dd_rum_stop_resource(rum, "req-profile", 200, response_body_size,
                     DD_RUM_RESOURCE_TYPE_NATIVE, NULL);

/* If the request fails (no valid response received):
dd_rum_stop_resource_with_error(rum, "req-profile", "Connection timeout",
                                "NetworkError", "", true, 0, NULL); */
```

{% /tab %}
{% /tabs %}

Use `StopResourceWithError` instead of `StopResource` when the request fails due to a network error or when processing the response produces an error.

### Track errors

Custom errors can be reported in the context of the current view with `AddError`. The `source` field classifies where the error originates: use `Source` for bugs in application code, `Network` for connectivity issues, and `Custom` as a general-purpose catch-all. The `type` and `stack_trace` parameters are optional.

{% tabs %}
{% tab label="C++" %}

```cpp
rum->AddError(datadog::RumErrorSource::Source,
              "Failed to deserialize save data",
              "SerializationError");
```

{% /tab %}
{% tab label="C" %}

```c
dd_rum_add_error(rum, DD_RUM_ERROR_SOURCE_SOURCE,
                 "Failed to deserialize save data",
                 "SerializationError", NULL, NULL);
```

{% /tab %}
{% /tabs %}

### Track operations

Operations let you measure multi-step workflows—such as login, checkout, or file upload—that may span multiple views. The SDK emits events when an operation starts and ends; Datadog aggregates these into duration and success-rate metrics.

{% alert level="info" %}
The operations API is in preview and may change in future releases.
{% /alert %}

{% tabs %}
{% tab label="C++" %}

```cpp
rum->StartOperation("user_login");

if (login_succeeded) {
    rum->SucceedOperation("user_login");
} else {
    rum->FailOperation("user_login", datadog::RumOperationFailureReason::Error);
}
```

{% /tab %}
{% tab label="C" %}

```c
dd_rum_start_operation(rum, "user_login", NULL, NULL);

if (login_succeeded) {
    dd_rum_succeed_operation(rum, "user_login", NULL, NULL);
} else {
    dd_rum_fail_operation(rum, "user_login", DD_RUM_FAILURE_REASON_ERROR, NULL, NULL);
}
```

{% /tab %}
{% /tabs %}

For full details, see [Operations Monitoring][3].

## Tracking consent

To update the SDK's tracking consent after initialization, call `SetTrackingConsent` on the core at any time. The SDK adjusts its behavior immediately:

- `Granted`: The SDK sends all pending and future data to Datadog.
- `Pending`: The SDK continues collecting data and storing it locally, but does not send it to Datadog.
- `NotGranted`: The SDK deletes all pending data and stops collecting new data.

{% tabs %}
{% tab label="C++" %}

```cpp
core->SetTrackingConsent(datadog::TrackingConsent::Granted);
```

{% /tab %}
{% tab label="C" %}

```c
dd_core_set_tracking_consent(core, DD_TRACKING_CONSENT_GRANTED);
```

{% /tab %}
{% /tabs %}

## Custom attributes

Custom attributes are key-value pairs that you attach to RUM events to enrich them with application-specific context. They can be scoped globally or per-view, as well as being applied to individual actions, resources, errors, or operations.

{% alert level="info" %}
Custom attributes are intended for small, targeted pieces of information such as IDs, flags, or short labels. Avoid attaching large objects such as full HTTP response payloads, which can significantly increase event size and impact performance.
{% /alert %}

For example, to apply a set of custom attributes to all RUM events sent from that point forward:

{% tabs %}
{% tab label="C++" %}
```cpp
rum->AddAttribute("account.tier", datadog::Attribute::String("premium"));
rum->AddAttribute("feature.new_ui", datadog::Attribute::Bool(true));

// Remove a global attribute
rum->RemoveAttribute("feature.new_ui");
```
{% /tab %}
{% tab label="C" %}
```c
dd_attribute_t tier_attr = dd_attribute_string("premium");
dd_rum_add_attribute(rum, "account.tier", &tier_attr);
dd_attribute_free(&tier_attr);

/* Remove a global attribute */
dd_rum_remove_attribute(rum, "feature.new_ui");
```
{% /tab %}
{% /tabs %}

**Note**: Avoid spaces or special characters in attribute key names. For example, use `"account_tier"` instead of `"Account Tier"`. Keys with spaces or special characters cannot be used as facets in the Datadog UI.

### View attributes

View attributes attach to the current view only and do not persist to subsequent views. Where a view attribute and a global attribute share the same key, the view attribute takes precedence.

{% tabs %}
{% tab label="C++" %}

```cpp
rum->AddViewAttribute("ui.variant", datadog::Attribute::String("A"));

// Remove a view attribute
rum->RemoveViewAttribute("ui.variant");
```

{% /tab %}
{% tab label="C" %}

```c
dd_attribute_t variant_attr = dd_attribute_string("A");
dd_rum_add_view_attribute(rum, "ui.variant", &variant_attr);
dd_attribute_free(&variant_attr);

/* Remove a view attribute */
dd_rum_remove_view_attribute(rum, "ui.variant");
```

{% /tab %}
{% /tabs %}

## Track user and account information

### User information

Adding user information to your RUM sessions makes it possible to:

* Follow the journey of a given user
* Know which users are most impacted by errors
* Monitor performance for your most important users

| Attribute | Type | Description |
| --- | --- | --- |
| `usr.id` | String | (Required) Unique user identifier. |
| `usr.name` | String | (Optional) User-friendly name, displayed by default in the Datadog UI. |
| `usr.email` | String | (Optional) User email, displayed in the UI when the user name is not present. |

To identify user sessions, call `SetUserInfo` on the core:

{% tabs %}
{% tab label="C++" %}

```cpp
core->SetUserInfo("1234", "John Doe", "john@doe.com");
```

{% /tab %}
{% tab label="C" %}

```c
dd_core_set_user_info(core, "1234", "John Doe", "john@doe.com", NULL);
```

{% /tab %}
{% /tabs %}

To add extra properties to the current user without replacing the existing user info, use `AddUserExtraInfo`. To remove all user information, call `ClearUserInfo`.

### Account information

A parallel API is available for associating an account—such as an organization, workspace, or tenant—with the current session.

| Attribute | Type | Description |
| --- | --- | --- |
| `acc.id` | String | (Required) Unique account identifier. |
| `acc.name` | String | (Optional) Account name, displayed in the Datadog UI. |

{% tabs %}
{% tab label="C++" %}

```cpp
core->SetAccountInfo("org-456", "Acme Corp");
```

{% /tab %}
{% tab label="C" %}

```c
dd_core_set_account_info(core, "org-456", "Acme Corp", NULL);
```

{% /tab %}
{% /tabs %}

Use `AddAccountExtraInfo` to merge additional properties, and `ClearAccountInfo` to remove all account information.

## Diagnostic logging

By default, the SDK prints warnings and errors to `stderr`. Both the threshold and the handler are configurable.

The **threshold** controls which severity levels are emitted. Levels below the threshold are silently dropped:

{% tabs %}
{% tab label="C++" %}

```cpp
// Emit all messages (debug, status, warning, error)
config.SetDiagnosticThreshold(datadog::DiagnosticLevel::Debug);

// Emit only errors
config.SetDiagnosticThreshold(datadog::DiagnosticLevel::Error);
```

{% /tab %}
{% tab label="C" %}

```c
/* Emit all messages (debug, status, warning, error) */
dd_core_config_set_diagnostic_threshold(&config, DD_DIAGNOSTIC_LEVEL_DEBUG);

/* Emit only errors */
dd_core_config_set_diagnostic_threshold(&config, DD_DIAGNOSTIC_LEVEL_ERROR);
```

{% /tab %}
{% /tabs %}

The **handler** controls what happens when a message is emitted. Supply a callback to route SDK messages into your own logging system. The `text` field in the message is only valid during the handler invocation—copy it if you need to store it persistently.

{% tabs %}
{% tab label="C++" %}

```cpp
config.SetDiagnosticHandler([](const datadog::DiagnosticMessage& message) {
    my_logger.write(message.text);
});

// Pass nullptr to suppress all diagnostic output
config.SetDiagnosticHandler(nullptr);
```

{% /tab %}
{% tab label="C" %}

```c
void my_handler(const dd_diagnostic_message_t* message, void* userdata) {
    my_logger_t* logger = (my_logger_t*)userdata;
    my_logger_write(logger, message->text);
}

/* Wire up the handler and supply a context pointer */
dd_core_config_set_diagnostic_handler(&config, my_handler);
dd_core_config_set_diagnostic_handler_userdata(&config, &my_logger);

/* Pass NULL to suppress all diagnostic output */
dd_core_config_set_diagnostic_handler(&config, NULL);
```

{% /tab %}
{% /tabs %}

## Application storage path

{% alert level="warning" %}
The storage path you configure must be a directory used exclusively by your application. The SDK assumes ownership of the `.datadog/` subdirectory it creates there, freely creating and deleting files within it during normal operation.
{% /alert %}

If `SetApplicationStoragePath` is not called, the SDK defaults to the current working directory. This is not recommended; the SDK emits a diagnostic warning at startup if no path is explicitly configured.

To accept the current working directory and suppress the warning, pass `"."` explicitly:

{% tabs %}
{% tab label="C++" %}

```cpp
// Recommended: use a dedicated directory owned by your application
config.SetApplicationStoragePath("/var/data/myapp");

// Accepted: explicitly use the current working directory
config.SetApplicationStoragePath(".");
```

{% /tab %}
{% tab label="C" %}

```c
/* Recommended: use a dedicated directory owned by your application */
dd_core_config_set_application_storage_path(&config, "/var/data/myapp");

/* Accepted: explicitly use the current working directory */
dd_core_config_set_application_storage_path(&config, ".");
```

{% /tab %}
{% /tabs %}

## SDK configuration reference

### Required parameters

The following parameters are required to initialize the SDK. The first three are passed to `CoreConfig`; `application_id` is passed to `RumConfig`.

| Parameter | Description |
| --- | --- |
| `client_token` | The client token associated with your RUM Application. |
| `service` | Application or service name, used for unified service tagging. |
| `env` | Deployment environment, such as `prod` or `staging`. |
| `application_id` | The ID of your RUM Application. |

### Additional parameters

`CoreConfig` accepts these optional parameters:

| Parameter | Description |
| --- | --- |
| `version` | Application version string, used to filter sessions by release and track error rates across versions. Set with `SetVersion()`. |
| `variant` | Build flavor or configuration, such as `free` or `pro`. Attached to all events as metadata. |
| `site` | Datadog data center for your organization. Defaults to `us1`. See [Getting Started with Datadog Sites][4] for available values. |

### Upload tuning

These parameters control how the SDK batches and uploads event data. The defaults work well for most applications; adjust them for resource-constrained environments or to tune upload latency.

| Parameter | Options | Default | Description |
| --- | --- | --- | --- |
| `batch_size` | `Small`, `Medium`, `Large` | `Medium` | Controls how soon a batch of events is considered ready for upload. Smaller batches produce more frequent, smaller HTTP requests; larger batches produce fewer, larger requests. |
| `upload_frequency` | `Frequent`, `Average`, `Rare` | `Average` | Controls how often upload cycles are initiated. More frequent cycling reduces the time between when an event is recorded and when it is sent to Datadog. |
| `batch_processing_level` | `Low`, `Medium`, `High` | `Medium` | Maximum number of batches processed in a single upload cycle. Higher values increase throughput but may produce bursts of HTTP requests. |

{% tabs %}
{% tab label="C++" %}

```cpp
config.SetBatchSize(datadog::BatchSize::Small);
config.SetUploadFrequency(datadog::UploadFrequency::Frequent);
config.SetBatchProcessingLevel(datadog::BatchProcessingLevel::High);
```

{% /tab %}
{% tab label="C" %}

```c
dd_core_config_set_batch_size(&config, DD_BATCH_SIZE_SMALL);
dd_core_config_set_upload_frequency(&config, DD_UPLOAD_FREQUENCY_FREQUENT);
dd_core_config_set_batch_processing_level(&config, DD_BATCH_PROCESSING_LEVEL_HIGH);
```

{% /tab %}
{% /tabs %}

## Stop the current session

Call `StopSession` to explicitly end the current RUM session. The next call to `StartView()`, `StartAction()`, or `AddAction()` automatically starts a new session. If the new session is triggered by an action, the last active view from the previous session is restarted in the new session.

{% tabs %}
{% tab label="C++" %}

```cpp
rum->StopSession();
```

{% /tab %}
{% tab label="C" %}

```c
dd_rum_stop_session(rum);
```

{% /tab %}
{% /tabs %}

## Stop the SDK

### C++

In C++, `Core` and `Rum` are managed as `std::shared_ptr` references. The SDK stops automatically when the last reference to the core is released, so no explicit cleanup is required in typical usage.

To stop the SDK before it goes out of scope—for example, to reinitialize with different configuration—call `Stop()` explicitly:

```cpp
core->Stop();
```

### C

The C API requires explicit resource management. Call the matching destroy function for every object created through the C API. Call `dd_core_stop` to halt all background activity, then free each feature, then free the core:

```c
dd_core_stop(core);
dd_rum_destroy(rum);
dd_core_destroy(core);
```

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/application_monitoring/cpp/setup
[3]: /real_user_monitoring/operations_monitoring/
[4]: /getting_started/site/
