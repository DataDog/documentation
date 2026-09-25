<!--
This partial contains advanced configuration instructions for the C++ SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

If you haven't set up the C++ SDK yet, follow the [in-app setup instructions][1] or see the [RUM C++ setup documentation][2].

## Instrument your application

The C++ SDK is a low-level library that is not coupled to a UI framework. As such, it does not automatically instrument your application. User interactions and changes in application state must be manually recorded by calling the appropriate RUM API.

### Track views

For setup steps, see [Track Navigation](/real_user_monitoring/setup/enable_rum/track_navigation/?platform=cpp).

### Track actions

For setup steps, see [Track User Interactions](/real_user_monitoring/setup/enable_rum/track_user_interactions/?platform=cpp).

### Track resources

For setup steps, see [Track Network Requests](/real_user_monitoring/setup/enable_rum/track_network_requests/?platform=cpp).

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

Operations let you measure multi-step workflows (such as login, checkout, or file upload) that may span multiple views. The SDK emits events when an operation starts and ends; Datadog aggregates these into duration and success-rate metrics.

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

## Managing data collection

See [Manage Data Collection][8] for instructions on tracking consent.

## Custom attributes

For setup steps, see [Add Custom Context](/real_user_monitoring/enrich_rum_data/add_custom_context/?platform=cpp).

## Track user and account information

### User information

See [Track user IDs][9] for instructions on adding user information to your RUM sessions.

### Account information

A parallel API is available for associating an account (such as an organization, workspace, or tenant) with the current session.

| Attribute | Type | Description |
| --- | --- | --- |
| `account.id` | String | (Required) Unique account identifier. |
| `account.name` | String | (Optional) Account name, displayed in the Datadog UI. |

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

The **handler** controls what happens when a message is emitted. Supply a callback to route SDK messages into your own logging system. The `text` field in the message is only valid during the handler invocation - copy it if you need to store it persistently.

{% tabs %}
{% tab label="C++" %}

```cpp
config.SetDiagnosticHandler([&](const datadog::DiagnosticMessage& message) {
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

For setup steps, see [Manage Data Collection](/real_user_monitoring/setup/enable_rum/manage_data_collection/?platform=cpp).

## Stop the SDK

### C++

In C++, `Core` and `Rum` are managed as `std::shared_ptr` references. The SDK stops automatically when the last reference to the core is released, so no explicit cleanup is required in typical usage.

To stop the SDK before it goes out of scope, call `Stop()` explicitly:

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
[5]: /real_user_monitoring/setup/enable_rum/track_network_requests/?platform=cpp
[6]: /real_user_monitoring/setup/enable_rum/track_navigation/?platform=cpp
[7]: /real_user_monitoring/setup/enable_rum/track_user_interactions/?platform=cpp
[8]: /real_user_monitoring/setup/enable_rum/manage_data_collection/?platform=cpp
[9]: /real_user_monitoring/enrich_rum_data/track_user_ids/?platform=cpp
