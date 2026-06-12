<!--
This partial contains advanced configuration instructions for the C++ SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

If you have not set up the RUM C++ SDK yet, follow the [in-app setup instructions][1] or see the [RUM C++ setup documentation][2].

## Tracking Consent

To comply with data privacy regulations such as GDPR, the SDK requires a tracking consent value at initialization and supports updating it at any time during the application lifecycle.

The tracking consent enum has three states:

| State | Behavior |
|-------|----------|
| `Granted` | Data collection and upload proceed normally. |
| `NotGranted` | No data is collected or uploaded; all RUM events are discarded immediately. |
| `Pending` | Data is collected locally but not uploaded until consent is changed to `Granted`. If consent is changed to `NotGranted`, locally queued data is discarded. |

Set the initial consent value when calling `Core::Create()`, then update it at runtime after the user responds to your consent prompt:

{% tabs %}
{% tab label="Cpp" %}

```cpp
// Initialize with pending consent — data is collected locally but not uploaded
auto core = datadog::Core::Create(config, datadog::TrackingConsent::Pending);
core->Start();

// Grant consent after the user accepts your privacy notice
core->SetTrackingConsent(datadog::TrackingConsent::Granted);

// Revoke consent if the user declines
core->SetTrackingConsent(datadog::TrackingConsent::NotGranted);
```

{% /tab %}
{% tab label="C" %}

```c
/* Initialize with pending consent */
dd_core_t* core = dd_core_create(&config, DD_TRACKING_CONSENT_PENDING);
dd_core_start(core);

/* Grant consent after the user accepts your privacy notice */
dd_core_set_tracking_consent(core, DD_TRACKING_CONSENT_GRANTED);

/* Revoke consent if the user declines */
dd_core_set_tracking_consent(core, DD_TRACKING_CONSENT_NOT_GRANTED);
```

{% /tab %}
{% /tabs %}

## Custom Attributes

You can attach custom attributes to all RUM events to enrich your telemetry with application-specific context. Attributes are key-value pairs set globally on the RUM feature and included on every subsequent event.

{% tabs %}
{% tab label="Cpp" %}

```cpp
// Add custom global attributes on the RUM feature
rum->AddAttribute("account.tier", datadog::Attribute::String("premium"));
rum->AddAttribute("feature.new_ui", datadog::Attribute::Bool(true));
rum->AddAttribute("build.number", datadog::Attribute::Int(42));

// Remove an attribute
rum->RemoveAttribute("feature.new_ui");
```

{% /tab %}
{% tab label="C" %}

```c
/* Add a string attribute */
dd_attribute_t tier_attr = dd_attribute_string("premium");
dd_rum_add_attribute(rum, "account.tier", &tier_attr);
dd_attribute_free(&tier_attr);

/* Add a boolean attribute */
dd_attribute_t flag_attr = dd_attribute_bool(1);
dd_rum_add_attribute(rum, "feature.new_ui", &flag_attr);
dd_attribute_free(&flag_attr);

/* Remove an attribute */
dd_rum_remove_attribute(rum, "feature.new_ui");
```

{% /tab %}
{% /tabs %}

Supported value types include strings, booleans, integers (`int64_t`), unsigned integers (`uint64_t`), doubles, timestamps, UUIDs, arrays, and nested objects.

You can also attach attributes to the current view only, without affecting other views:

{% tabs %}
{% tab label="Cpp" %}

```cpp
rum->AddViewAttribute("scene.name", datadog::Attribute::String("main_menu"));
```

{% /tab %}
{% tab label="C" %}

```c
dd_attribute_t scene_attr = dd_attribute_string("main_menu");
dd_rum_add_view_attribute(rum, "scene.name", &scene_attr);
dd_attribute_free(&scene_attr);
```

{% /tab %}
{% /tabs %}

## Sampling

By default, the SDK tracks 100% of user sessions. To reduce data volume, configure a session sample rate when registering the RUM feature. The sample rate is applied per session — a session is either fully tracked or fully discarded. There is no partial sampling of events within a session.

{% tabs %}
{% tab label="Cpp" %}

```cpp
datadog::RumConfig rum_config("<rum_application_id>");
rum_config.SetSessionSampleRate(75.0f); // Track 75% of sessions

auto rum = datadog::Rum::Register(core, rum_config);
```

{% /tab %}
{% tab label="C" %}

```c
dd_rum_config_t rum_config;
dd_rum_config_init(&rum_config, "<rum_application_id>");
dd_rum_config_set_session_sample_rate(&rum_config, 75.0f); /* Track 75% of sessions */

dd_rum_t* rum = dd_rum_init(core, &rum_config);
```

{% /tab %}
{% /tabs %}

The sample rate accepts values from `0.0` (track no sessions) to `100.0` (track all sessions, the default).

## Event Storage Location

The SDK buffers RUM events on disk before uploading them to Datadog. By default, data is stored in a platform-appropriate temporary directory. To specify a custom storage path — for example, to use a dedicated partition or to control the location on embedded systems — set it in `CoreConfig` before creating the core:

{% tabs %}
{% tab label="Cpp" %}

```cpp
datadog::CoreConfig config("<client_token>", "<service_name>", "<environment>");
config.SetApplicationStoragePath("/var/data/myapp/datadog");

auto core = datadog::Core::Create(config, datadog::TrackingConsent::Granted);
```

{% /tab %}
{% tab label="C" %}

```c
dd_core_config_t config;
dd_core_config_init(&config, "<client_token>", "<service_name>", "<environment>");
dd_core_config_set_application_storage_path(&config, "/var/data/myapp/datadog");

dd_core_t* core = dd_core_create(&config, DD_TRACKING_CONSENT_GRANTED);
```

{% /tab %}
{% /tabs %}

The specified directory must be readable and writable by the application process. The SDK manages disk usage automatically, removing the oldest events when storage limits are reached.

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/application_monitoring/cpp/setup
