<!--
This partial contains setup instructions for the C++ SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

## Overview

This page describes how to instrument your applications for [Real User Monitoring (RUM)][1] with the C++ SDK.

## Prerequisites

Before you begin, you need:
- CMake 3.21 or later
- A C++17-compatible compiler (GCC 8+, Clang 7+, or MSVC 2019 16.11+)
- A Datadog account with RUM or Error Tracking enabled

## Setup

{% stepper level="h3" %}

{% step title="Add the C++ SDK as a dependency" %}

Add the SDK's public headers to your project's include paths, and add the SDK as a linker dependency.

{% tabs %}
{% tab label="CMake (FetchContent)" %}

Using CMake's `FetchContent` module will allow you to download and build the SDK from source, guaranteeing binary compatibility and giving you full control over build configuration.

In your project's `CMakeLists.txt`, use CMake's `FetchContent` module to download and build the SDK as part of your project:

```cmake
include(FetchContent)
FetchContent_Declare(
    Datadog
    GIT_REPOSITORY https://github.com/DataDog/dd-sdk-cpp.git
    GIT_TAG        <version>
)
FetchContent_MakeAvailable(Datadog)
```

Replace `<version>` with a release tag from the SDK's [GitHub Releases][4] (for example, `0.3.0`), or use the full commit SHA for your chosen release.

To add the SDK as a dependency for your application, pass its CMake target to `datadog_enable()`:

```cmake
datadog_enable(my-app)
```

For more detailed information on CMake setup, see [Advanced Build Configuration][5].

{% /tab %}
{% tab label="CMake (find_package)" %}

If you use CMake to build your application, but you want to use precompiled SDK binaries, use CMake's `find_package()` command.

1. Download the release archive for your platform from the SDK's [GitHub Releases][4], then extract it to a directory in your project (for example, `external/datadog-sdk/`).

2. In your `CMakeLists.txt`, add that directory to `CMAKE_PREFIX_PATH` and call `find_package`:

```cmake
list(APPEND CMAKE_PREFIX_PATH external/datadog-sdk)
find_package(Datadog REQUIRED)
```

To add the SDK as a dependency for your application, pass its CMake target to `datadog_enable()`:

```cmake
datadog_enable(my-app)
```

For more detailed information on CMake setup, see [Advanced Build Configuration][5].

{% /tab %}
{% tab label="Other build systems" %}

If you're not using CMake, you'll need to either download precompiled binaries or build the SDK from source with CMake, then point your compiler and linker to the appropriate headers and libraries. For example, in a `Makefile`:

```makefile
INCLUDES = -Iexternal/datadog-sdk/include
LDFLAGS  = -Lexternal/datadog-sdk/lib
LDLIBS   = -lddsdkcpp -lcurl -luuid
```

<!--CRASHPAD--
If your SDK build uses Crashpad, you'll also need to ensure that the `crashpad_handler` executable is deployed alongside your application.
--CRASHPAD-->

For more detailed information on build configuration, see [Advanced Build Configuration][5].

{% /tab %}
{% /tabs %}

{% /step %}

{% step title="Create a RUM Application in the Datadog UI" %}

1. Navigate to [**Digital Experience** > **Add an Application**][2].
2. Select `C++` as the application type and enter an application name to generate a unique Datadog application ID and client token.
3. Copy the application ID and client token — you need them to initialize the SDK.

{% /step %}

{% step title="Initialize the SDK" %}

In your application code, include the appropriate SDK headers:

{% tabs %}
{% tab label="Cpp" %}
```cpp
#include "datadog.hpp"
```
{% /tab %}
{% tab label="C" %}
```c
#include "datadog.h"
```
{% /tab %}
{% /tabs %}

Next, as early as possible in your application's startup sequence, initialize a `Core` using the configuration details that identify your RUM Application:

{% tabs %}
{% tab label="Cpp" %}
```cpp
// Configure the SDK with your client token and unified service tagging values
datadog::CoreConfig config("<client_token>", "<service>", "<env>");

// Provide the SDK with the path to a storage directory owned by your application
config.SetApplicationStoragePath("<app-storage-dir>");

// Create the core with your initial tracking consent value
auto core = datadog::Core::Create(config, datadog::TrackingConsent::Granted);
```
{% /tab %}
{% tab label="C" %}
```c
/* Configure the SDK with your client token and unified service tagging values */
dd_core_config_t config;
dd_core_config_init(&config, "<client_token>", "<service>", "<env>");

/* Provide the SDK with the path to a storage directory owned by your application */
dd_core_config_set_application_storage_path(&config, "<app-storage-dir>");

/* Create the core with your initial tracking consent value */
dd_core_t* core = dd_core_create(&config, DD_TRACKING_CONSENT_GRANTED);
```

Note that the C API requires explicit cleanup:

```c
/* Free all resources held by the core when finished */
dd_core_destroy(core);
```
{% /tab %}
{% /tabs %}

<!-- Begin duplicated sections for site values -->

<!-- We can't use region-param in code snippets here because Cdocs outputs a UUID placeholder which Chroma fragments into multiple spans, preventing browser-side JS from performing string replacement. -->

<!-- us1 is the default; it doesn't need a "Configure Datadog site" section -->

{% site-region region="us3" %}
#### Configure Datadog site
Use `SetSite` to configure the SDK with your Datadog site.
{% tabs %}
{% tab label="Cpp" %}
```cpp
config.SetSite(datadog::Site::us3);
```
{% /tab %}
{% tab label="C" %}
```c
dd_core_config_set_site(&config, DD_SITE_US3);
```
{% /tab %}
{% /tabs %}
{% /site-region %}

{% site-region region="us5" %}
#### Configure Datadog site
Use `SetSite` to configure the SDK with your Datadog site.
{% tabs %}
{% tab label="Cpp" %}
```cpp
config.SetSite(datadog::Site::us5);
```
{% /tab %}
{% tab label="C" %}
```c
dd_core_config_set_site(&config, DD_SITE_US5);
```
{% /tab %}
{% /tabs %}
{% /site-region %}

{% site-region region="eu" %}
#### Configure Datadog site
Use `SetSite` to configure the SDK with your Datadog site.
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
{% /site-region %}

{% site-region region="ap1" %}
#### Configure Datadog site
Use `SetSite` to configure the SDK with your Datadog site.
{% tabs %}
{% tab label="Cpp" %}
```cpp
config.SetSite(datadog::Site::ap1);
```
{% /tab %}
{% tab label="C" %}
```c
dd_core_config_set_site(&config, DD_SITE_AP1);
```
{% /tab %}
{% /tabs %}
{% /site-region %}

{% site-region region="ap2" %}
#### Configure Datadog site
Use `SetSite` to configure the SDK with your Datadog site.
{% tabs %}
{% tab label="Cpp" %}
```cpp
config.SetSite(datadog::Site::ap2);
```
{% /tab %}
{% tab label="C" %}
```c
dd_core_config_set_site(&config, DD_SITE_AP2);
```
{% /tab %}
{% /tabs %}
{% /site-region %}

{% site-region region="gov" %}
#### Configure Datadog site
Use `SetSite` to configure the SDK with your Datadog site.
{% tabs %}
{% tab label="Cpp" %}
```cpp
config.SetSite(datadog::Site::us1_fed);
```
{% /tab %}
{% tab label="C" %}
```c
dd_core_config_set_site(&config, DD_SITE_US1_FED);
```
{% /tab %}
{% /tabs %}
{% /site-region %}

{% site-region region="gov2" %}
#### Configure Datadog site
Use `SetSite` to configure the SDK with your Datadog site.
{% tabs %}
{% tab label="Cpp" %}
```cpp
config.SetSite(datadog::Site::us2_fed);
```
{% /tab %}
{% tab label="C" %}
```c
dd_core_config_set_site(&config, DD_SITE_US2_FED);
```
{% /tab %}
{% /tabs %}
{% /site-region %}

<!-- End duplicated sections for site values -->

#### Configure an application storage path

The SDK requires an application storage path, which must be an existing directory that's exclusively used by your application. The SDK will create a `.datadog/` subdirectory within that directory and store all transient files within it.

#### Set tracking consent (GDPR compliance)

For GDPR compliance, the SDK requires a tracking consent value at initialization. Your application can set this value to any of:

1. `Pending`: The SDK starts collecting data and storing it locally, but does not send it to Datadog.
2. `Granted`: The SDK sends all pending and future data to Datadog.
3. `NotGranted`: The SDK deletes all pending data and does not collect any further data.

The tracking consent value may be updated at any time, as long as the Core still exists:

{% tabs %}
{% tab label="Cpp" %}
```cpp
core->SetTrackingConsent(datadog::TrackingConsent::Pending);
```
{% /tab %}
{% tab label="C" %}
```c
dd_core_set_tracking_consent(core, DD_TRACKING_CONSENT_PENDING);
```
{% /tab %}
{% /tabs %}

#### Other options

For information on other SDK configuration options, see [Advanced Configuration][6].

{% /step %}

{% step title="Register RUM and start the SDK" %}

Once the Core is configured, register the RUM feature and call `Start()`.

{% tabs %}
{% tab label="Cpp" %}
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

Note that the C API requires explicit cleanup:

```c
/* Free all resources when finished */
dd_rum_destroy(rum);
dd_core_destroy(core);
```
{% /tab %}
{% /tabs %}

#### Configure RUM Session Sample Rate

To control the percentage of RUM sessions sent to Datadog, you can set a session sample rate between 0.0 and 100.0. The default is 100.0, which keeps all sessions.

{% tabs %}
{% tab label="Cpp" %}
```cpp
// In this example, only 75% of sessions will be sent to Datadog
rum_config.SetSessionSampleRate(75.0f);
```
{% /tab %}
{% tab label="C" %}
```c
/** In this example, only 75% of sessions will be sent to Datadog */
dd_rum_config_set_session_sample_rate(&rum_config, 75.0f);
```
{% /tab %}
{% /tabs %}

Datadog recommends setting the sample rate to 100%, ensuring that all RUM sessions are ingested for full visibility and accurate metrics. To control which sessions are indexed and retained, configure retention filters. For more information, see [RUM Without Limits][3].

{% /step %}

{% step title="Instrument view transitions" %}

{% tabs %}
{% tab label="Cpp" %}
```cpp
// Record that the user is now on the startup screen
rum->StartView("startup_screen", "Startup Screen");
```
{% /tab %}
{% tab label="C" %}
```c
/* Record that the user is now on the startup screen */
dd_rum_start_view(rum, "startup_screen", "Startup Screen", NULL);
```
{% /tab %}
{% /tabs %}

## Verify your setup

After instrumenting your application, verify that the SDK is correctly sending data to Datadog.

### Check diagnostic output

By default, the SDK will log diagnostic warnings and errors to `stderr`. You can increase the verbosity of this output in your `CoreConfig`:

{% tabs %}
{% tab label="Cpp" %}
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

Once the SDK is correctly configured, tracking consent is granted, and your calls to RUM API functions like `StartView()` are being executed, you should see periodic console output indicating that the SDK is uploading data:

```
[DATADOG DEBUG] Initiating HTTP request
[DATADOG DEBUG] Batch upload OK; will delete and continue this upload cycle
[DATADOG STATUS] Upload cycle finished with all uploads successful
[DATADOG DEBUG] Scheduled next upload cycle for feature
```

**Note:** Revert the diagnostic threshold change before building for Release. For more information on diagnostic logging, see [Advanced Configuration][6].

### View your data in Datadog

After running your app, navigate to the [RUM Explorer][7] to see sessions from your application. You should see session data within a few minutes.

{% /step %}

{% /stepper %}

[1]: /real_user_monitoring/
[2]: https://app.datadoghq.com/rum/application/create
[3]: /real_user_monitoring/rum_without_limits/
[4]: https://github.com/DataDog/dd-sdk-cpp/releases
[5]: /real_user_monitoring/application_monitoring/cpp/advanced_build_configuration
[6]: /real_user_monitoring/application_monitoring/cpp/advanced_configuration
[7]: /real_user_monitoring/explorer/