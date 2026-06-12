<!--
This partial contains setup instructions for the C++ SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

This page describes how to instrument your applications for [Real User Monitoring (RUM)][1] with the C++ SDK.

## Prerequisites

Before you begin, you need:
- CMake 3.21 or later
- A C++17-compatible compiler (GCC 8+, Clang 7+, or MSVC 2019 16.11+)
- A Datadog account with RUM or Error Tracking enabled

## Setup

{% stepper level="h3" %}

{% step title="Declare the SDK as a dependency" %}

Add the Datadog C++ SDK to your project using CMake's FetchContent module. In your `CMakeLists.txt`:

```cmake
include(FetchContent)

FetchContent_Declare(
    Datadog
    GIT_REPOSITORY https://github.com/DataDog/dd-sdk-cpp.git
    GIT_TAG        v<version>
)
FetchContent_MakeAvailable(Datadog)

target_link_libraries(your_target PRIVATE Datadog::sdk)
```

Replace `<version>` with the desired release tag (for example, `v1.0.0`). After linking, the SDK headers are automatically available to your target.

To automatically copy the crash reporting handler alongside your application binary, use the provided CMake convenience function after declaring your target:

```cmake
include(DatadogConvenience)
datadog_enable(your_target)
```

{% /step %}

{% step title="Specify application details in the UI" %}

1. Navigate to [**Digital Experience** > **Add an Application**][2].
2. Select `C++` as the application type and enter an application name to generate a unique Datadog application ID and client token.
3. Copy the application ID and client token — you need them to initialize the SDK.

{% /step %}

{% step title="Initialize the SDK" %}

Initialize the Datadog SDK as early as possible in your application's startup sequence, before making any other SDK calls. Create a `CoreConfig`, register your features, then call `Start()`:

{% tabs %}
{% tab label="Cpp" %}

```cpp
#include "datadog.hpp"

// Configure the core SDK with your client token, service name, and environment
datadog::CoreConfig config("<client_token>", "<service_name>", "<environment>");
config.SetApplicationVersion("1.0.0");

// Create the SDK core with your initial tracking consent value
auto core = datadog::Core::Create(config, datadog::TrackingConsent::Granted);

// Register RUM before starting the core
datadog::RumConfig rum_config("<rum_application_id>");
auto rum = datadog::Rum::Register(core, rum_config);

// Start the core — the SDK begins collecting and uploading data
core->Start();
```

{% /tab %}
{% tab label="C" %}

```c
#include "datadog.h"

/* Configure the core SDK */
dd_core_config_t config;
dd_core_config_init(&config, "<client_token>", "<service_name>", "<environment>");
dd_core_config_set_application_version(&config, "1.0.0");

/* Create the core with your initial tracking consent value */
dd_core_t* core = dd_core_create(&config, DD_TRACKING_CONSENT_GRANTED);

/* Configure and register RUM */
dd_rum_config_t rum_config;
dd_rum_config_init(&rum_config, "<rum_application_id>");
dd_rum_t* rum = dd_rum_init(core, &rum_config);

/* Start the core */
dd_core_start(core);
```

{% /tab %}
{% /tabs %}

Replace `<client_token>`, `<service_name>`, `<environment>`, and `<rum_application_id>` with the values from your Datadog application. The `<environment>` field corresponds to the `env` tag in Datadog (for example, `"production"` or `"staging"`).

To send data to a non-US1 Datadog site, set the site on your config before creating the core:

{% tabs %}
{% tab label="Cpp" %}

```cpp
config.SetSite(datadog::Site::eu1);
```

{% /tab %}
{% tab label="C" %}

```c
dd_core_config_set_site(&config, DD_SITE_EU1);
```

{% /tab %}
{% /tabs %}

For the full list of available sites, see [Getting Started with Datadog Sites][3].

When your application shuts down, stop the core to flush any pending events and release resources:

{% tabs %}
{% tab label="Cpp" %}

```cpp
core->Stop();
```

{% /tab %}
{% tab label="C" %}

```c
dd_core_stop(core);
dd_rum_destroy(rum);
dd_core_destroy(core);
```

{% /tab %}
{% /tabs %}

{% /step %}

{% /stepper %}

[1]: /real_user_monitoring/
[2]: https://app.datadoghq.com/rum/application/create
[3]: /getting_started/site/
