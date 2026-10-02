<!--
This partial contains instructions for enabling RUM with the C++ SDK.
-->

After the core is configured, register the RUM feature and call `Start()`:

{% tabs %}
{% tab label="C++" %}
```cpp
// Configure and register RUM
datadog::RumConfig rum_config("<rum_application_id>");
auto rum = datadog::Rum::Register(core, rum_config);

// Start the core to begin collecting and uploading data
core->Start();
```
{% /tab %}
{% tab label="C" %}
```c
/* Configure and register RUM */
dd_rum_config_t rum_config;
dd_rum_config_init(&rum_config, "<rum_application_id>");
dd_rum_t* rum = dd_rum_init(core, &rum_config);

/* Start the core to begin collecting and uploading data */
dd_core_start(core);
```

**Note**: The C API requires explicit cleanup:

```c
/* Free all resources when finished */
dd_rum_destroy(rum);
dd_core_destroy(core);
```
{% /tab %}
{% /tabs %}

The C++ SDK doesn't instrument your application automatically. After RUM is registered, record views, actions, resources, and errors with the RUM API. See [Track Navigation][1] to start tracking views.

### Check diagnostic output

By default, the SDK logs diagnostic warnings and errors to `stderr`. To confirm that the SDK is sending data, increase the verbosity of this output in your `CoreConfig`:

{% tabs %}
{% tab label="C++" %}
```cpp
config.SetDiagnosticThreshold(datadog::DiagnosticLevel::Debug);
```
{% /tab %}
{% tab label="C" %}
```c
dd_core_config_set_diagnostic_threshold(&config, DD_DIAGNOSTIC_LEVEL_DEBUG);
```
{% /tab %}
{% /tabs %}

After the SDK is correctly configured and tracking consent is granted, you should see periodic console output. Output like this indicates that the SDK is uploading data:

```
[DATADOG DEBUG] Initiating HTTP request
[DATADOG DEBUG] Batch upload OK; will delete and continue this upload cycle
[DATADOG STATUS] Upload cycle finished with all uploads successful
[DATADOG DEBUG] Scheduled next upload cycle for feature
```

**Note**: Revert the diagnostic threshold change before building for Release. For more information on diagnostic logging, see [Advanced Configuration][2].

[1]: /real_user_monitoring/setup/enable_rum/track_navigation/?platform=cpp
[2]: /real_user_monitoring/setup/enable_rum/advanced_configuration/?platform=cpp#diagnostic-logging
