<!--
This partial contains setup instructions for the C++ SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

This page describes how to instrument your C++ applications with the Datadog C++ SDK.

The C++ SDK supports [Real User Monitoring (RUM)][1], [Error Tracking][6], and [Product Analytics][7].

## Prerequisites

Before you begin, you need:

- A Datadog account with RUM or Error Tracking enabled
- A C++17-compatible compiler
- If using CMake: a project defined using CMake 3.21 or later

## Setup

{% stepper level="h3" %}

{% step title="Add the dependencies" %}

Add the SDK's public headers to your project's include paths, and add the SDK as a linker dependency.

{% tabs %}
{% tab label="CMake (FetchContent)" %}

Using CMake's `FetchContent` module downloads and builds the SDK from source, guaranteeing binary compatibility and giving you full control over build configuration.

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

Replace `<version>` with a release tag from the SDK's [GitHub Releases][2] (for example, `0.3.0`), or use the full commit SHA for your chosen release.

To add the SDK as a dependency for your application, pass its CMake target to `datadog_enable()`:

```cmake
datadog_enable(my-app)
```

For more detailed information on CMake setup, see [Advanced Build Configuration][3].

{% /tab %}
{% tab label="CMake (find_package)" %}

If you use CMake to build your application, but you want to use precompiled SDK binaries, use CMake's `find_package()` command.

1. Download the release archive for your platform from the SDK's [GitHub Releases][2], then extract it to a directory in your project (for example, `external/datadog-sdk/`).

2. In your `CMakeLists.txt`, add that directory to `CMAKE_PREFIX_PATH` and call `find_package`:

```cmake
list(APPEND CMAKE_PREFIX_PATH external/datadog-sdk)
find_package(Datadog REQUIRED)
```

To add the SDK as a dependency for your application, pass its CMake target to `datadog_enable()`:

```cmake
datadog_enable(my-app)
```

For more detailed information on CMake setup, see [Advanced Build Configuration][3].

{% /tab %}
{% tab label="Other build systems" %}

If you're not using CMake, download precompiled binaries or build the SDK from source with CMake. Then point your compiler and linker to the appropriate headers and libraries. For example, in a `Makefile`:

```makefile
INCLUDES = -Iexternal/datadog-sdk/include
LDFLAGS  = -Lexternal/datadog-sdk/lib
LDLIBS   = -lddsdkcpp -lcurl -luuid
```

<!--CRASHPAD--
If your SDK build uses Crashpad, you'll also need to ensure that the `crashpad_handler` executable is deployed alongside your application.
--CRASHPAD-->

For more detailed information on build configuration, see [Advanced Build Configuration][3].

{% /tab %}
{% /tabs %}

{% /step %}

{% step title="Initialize the SDK" %}

In your application code, include the appropriate SDK headers:

{% tabs %}
{% tab label="C++" %}
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
{% tab label="C++" %}
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

**Note**: The C API requires explicit cleanup:

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
{% tab label="C++" %}
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
{% tab label="C++" %}
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
{% tab label="C++" %}
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
{% tab label="C++" %}
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
{% tab label="C++" %}
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
{% tab label="C++" %}
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
{% tab label="C++" %}
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

The SDK requires an application storage path, which must be an existing directory that's exclusively used by your application. The SDK creates a `.datadog/` subdirectory within that directory and stores all transient files within it.

#### Other options

For information on other SDK configuration options, see [Advanced Configuration][5].

{% /step %}

{% step title="Configure tracking consent (GDPR compliance)" %}

For GDPR compliance, the SDK requires a tracking consent value at initialization. Your application can set this value to any of:

1. `Pending`: The SDK starts collecting data and storing it locally, but does not send it to Datadog.
2. `Granted`: The SDK sends all pending and future data to Datadog.
3. `NotGranted`: The SDK deletes all pending data and does not collect any further data.

The tracking consent value may be updated at any time, as long as the Core still exists:

{% tabs %}
{% tab label="C++" %}
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

{% /step %}

{% step title="Enable RUM to start sending data" %}

After the core is configured, register the RUM feature and start the core. See [Enable the Datadog RUM Module][4] for instructions.

{% /step %}

{% /stepper %}

[1]: /real_user_monitoring/
[2]: https://github.com/DataDog/dd-sdk-cpp/releases
[3]: /real_user_monitoring/application_monitoring/cpp/advanced_build_configuration
[4]: /real_user_monitoring/setup/enable_rum/?platform=cpp
[5]: /real_user_monitoring/setup/enable_rum/advanced_configuration/?platform=cpp
[6]: /error_tracking/
[7]: /product_analytics/
