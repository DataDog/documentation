---
title: C / C++ Log Collection
description: Collect logs from your C and C++ applications using the Datadog C++ SDK.
further_reading:
- link: https://github.com/DataDog/dd-sdk-cpp
  tag: "Source Code"
  text: Source code for dd-sdk-cpp
- link: logs/explorer
  tag: Documentation
  text: Learn how to explore your logs
site_support_id: cpp_log_collection
---

## Overview

Send logs to Datadog from your C and C++ applications with [Datadog's `dd-sdk-cpp` library][1] and use the following features:

* Log to Datadog in JSON format natively.
* Add custom attributes to each log sent.
* Record real client IP addresses.
* Optimized network usage with automatic bulk posts.

## Setup

1. Add the C++ SDK as a dependency by declaring it as a dependency in your build system.

{{< tabs >}}
{{% tab "CMake (FetchContent)" %}}

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

Replace `<version>` with a release tag from the SDK's [GitHub Releases][4] (for example, `0.3.0`), or use the full commit SHA for your chosen release.

To add the SDK as a dependency for your application, pass its CMake target to `datadog_enable()`:

```cmake
datadog_enable(my-app)
```

For more detailed information on CMake setup, see [Advanced Build Configuration][5].

[4]: https://github.com/DataDog/dd-sdk-cpp/releases
[5]: /real_user_monitoring/application_monitoring/cpp/advanced_build_configuration

{{% /tab %}}
{{% tab "CMake (find_package)" %}}

If you use CMake but prefer precompiled SDK binaries, use CMake's `find_package()` command.

- Download the release archive for your platform from the SDK's [GitHub Releases][4], then extract it to a directory in your project (for example, `external/datadog-sdk/`).
- In your `CMakeLists.txt`, add that directory to `CMAKE_PREFIX_PATH` and call `find_package`:

```cmake
list(APPEND CMAKE_PREFIX_PATH external/datadog-sdk)
find_package(Datadog REQUIRED)
```

To add the SDK as a dependency for your application, pass its CMake target to `datadog_enable()`:

```cmake
datadog_enable(my-app)
```

For more detailed information on CMake setup, see [Advanced Build Configuration][5].

[4]: https://github.com/DataDog/dd-sdk-cpp/releases
[5]: /real_user_monitoring/application_monitoring/cpp/advanced_build_configuration

{{% /tab %}}
{{% tab "Other build systems" %}}

If you're not using CMake, download precompiled binaries or build the SDK from source. Then point your compiler and linker to the appropriate headers and libraries. For example, in a `Makefile`:

```makefile
INCLUDES = -Iexternal/datadog-sdk/include
LDFLAGS  = -Lexternal/datadog-sdk/lib
LDLIBS   = -lddsdkcpp -lcurl -luuid
```

For more detailed information on build configuration, see [Advanced Build Configuration][5].

[5]: /real_user_monitoring/application_monitoring/cpp/advanced_build_configuration

{{% /tab %}}
{{< /tabs >}}

2. Initialize the Datadog SDK with your application context and your [Datadog client token][2]. For security reasons, you must use a client token: you cannot use [Datadog API keys][3] to configure the `dd-sdk-cpp` library, as they would be exposed client-side in your application binary.

For more information about setting up a client token, see the [client token documentation][2].

In your application code, include the appropriate SDK headers:

{{< tabs >}}
{{% tab "C++" %}}
```cpp
#include "datadog.hpp"
```
{{% /tab %}}
{{% tab "C (FFI)" %}}
```c
#include "datadog.h"
```
{{% /tab %}}
{{< /tabs >}}

Create a `Core` as early as possible in your application's startup sequence:

{{< tabs >}}
{{% tab "C++" %}}
```cpp
datadog::CoreConfig config("<client_token>", "<service>", "<env>");
config.SetApplicationStoragePath("<app-storage-dir>");
auto core = datadog::Core::Create(config, datadog::TrackingConsent::Granted);
```
{{% /tab %}}
{{% tab "C (FFI)" %}}
```c
dd_core_config_t config;
dd_core_config_init(&config, "<client_token>", "<service>", "<env>");
dd_core_config_set_application_storage_path(&config, "<app-storage-dir>");
dd_core_t* core = dd_core_create(&config, DD_TRACKING_CONSENT_GRANTED);
```

The C API requires explicit cleanup:

```c
/* Free all resources held by the core when finished */
dd_core_destroy(core);
```
{{% /tab %}}
{{< /tabs >}}

{{< site-region region="us3" >}}
#### Configure Datadog site

Use `SetSite` to configure the SDK with your Datadog site.

{{< tabs >}}
{{% tab "C++" %}}
```cpp
config.SetSite(datadog::Site::us3);
```
{{% /tab %}}
{{% tab "C (FFI)" %}}
```c
dd_core_config_set_site(&config, DD_SITE_US3);
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us5" >}}
#### Configure Datadog site

Use `SetSite` to configure the SDK with your Datadog site.

{{< tabs >}}
{{% tab "C++" %}}
```cpp
config.SetSite(datadog::Site::us5);
```
{{% /tab %}}
{{% tab "C (FFI)" %}}
```c
dd_core_config_set_site(&config, DD_SITE_US5);
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="eu" >}}
#### Configure Datadog site

Use `SetSite` to configure the SDK with your Datadog site.

{{< tabs >}}
{{% tab "C++" %}}
```cpp
config.SetSite(datadog::Site::eu1);
```
{{% /tab %}}
{{% tab "C (FFI)" %}}
```c
dd_core_config_set_site(&config, DD_SITE_EU1);
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="ap1" >}}
#### Configure Datadog site

Use `SetSite` to configure the SDK with your Datadog site.

{{< tabs >}}
{{% tab "C++" %}}
```cpp
config.SetSite(datadog::Site::ap1);
```
{{% /tab %}}
{{% tab "C (FFI)" %}}
```c
dd_core_config_set_site(&config, DD_SITE_AP1);
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="ap2" >}}
#### Configure Datadog site

Use `SetSite` to configure the SDK with your Datadog site.

{{< tabs >}}
{{% tab "C++" %}}
```cpp
config.SetSite(datadog::Site::ap2);
```
{{% /tab %}}
{{% tab "C (FFI)" %}}
```c
dd_core_config_set_site(&config, DD_SITE_AP2);
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="gov" >}}
#### Configure Datadog site

Use `SetSite` to configure the SDK with your Datadog site.

{{< tabs >}}
{{% tab "C++" %}}
```cpp
config.SetSite(datadog::Site::us1_fed);
```
{{% /tab %}}
{{% tab "C (FFI)" %}}
```c
dd_core_config_set_site(&config, DD_SITE_US1_FED);
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="gov2" >}}
#### Configure Datadog site

Use `SetSite` to configure the SDK with your Datadog site.

{{< tabs >}}
{{% tab "C++" %}}
```cpp
config.SetSite(datadog::Site::us2_fed);
```
{{% /tab %}}
{{% tab "C (FFI)" %}}
```c
dd_core_config_set_site(&config, DD_SITE_US2_FED);
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

The `<app-storage-dir>` must be an existing directory exclusively used by your application. The SDK creates a `.datadog/` subdirectory within it to store all transient data.

For GDPR compliance, the SDK requires a tracking consent value at initialization. The tracking consent can be one of the following values:

- `Pending`: The SDK starts collecting data and storing it locally, but does not send it to Datadog. The SDK waits for the new tracking consent value to decide what to do with the stored data.
- `Granted`: The SDK sends all pending and future data to Datadog.
- `NotGranted`: The SDK deletes all pending data and does not collect any further data.

To update the tracking consent after the SDK is initialized:

{{< tabs >}}
{{% tab "C++" %}}
```cpp
core->SetTrackingConsent(datadog::TrackingConsent::Pending);
```
{{% /tab %}}
{{% tab "C (FFI)" %}}
```c
dd_core_set_tracking_consent(core, DD_TRACKING_CONSENT_PENDING);
```
{{% /tab %}}
{{< /tabs >}}

For information on other SDK configuration options, see [Advanced Configuration][6].

3. Enable the Logging feature and start the SDK:

{{< tabs >}}
{{% tab "C++" %}}
```cpp
auto logging = datadog::Logging::Register(core);
core->Start();
```
{{% /tab %}}
{{% tab "C (FFI)" %}}
```c
dd_logging_t* logging = dd_logging_init(core);
dd_core_start(core);
```

The C API requires explicit cleanup:

```c
/* Free all resources when finished */
dd_logging_destroy(logging);
dd_core_destroy(core);
```
{{% /tab %}}
{{< /tabs >}}

4. Create and configure a `Logger`:

{{< tabs >}}
{{% tab "C++" %}}
```cpp
auto logger = logging->CreateLogger(
    datadog::LoggerConfig()
        .SetName("<logger_name>")
        .SetRemoteLogThreshold(datadog::LogLevel::Info)
);
```
{{% /tab %}}
{{% tab "C (FFI)" %}}
```c
dd_logger_config_t logger_config;
dd_logger_config_init(&logger_config);
dd_logger_config_set_name(&logger_config, "<logger_name>");
dd_logger_config_set_remote_log_threshold(&logger_config, DD_LOG_LEVEL_INFO);
dd_logger_t* logger = dd_logger_create(logging, &logger_config);
```

The C API requires explicit cleanup:

```c
/* Free the logger when finished */
dd_logger_destroy(logger);
```
{{% /tab %}}
{{< /tabs >}}

5. Send a custom log entry to Datadog with one of the following methods:

{{< tabs >}}
{{% tab "C++" %}}
```cpp
logger->Debug("A debug message.");
logger->Info("Some relevant information.");
logger->Notice("Have you noticed?");
logger->Warn("An important warning.");
logger->Error("An error occurred!");
logger->Critical("Something critical happened!");
```
{{% /tab %}}
{{% tab "C (FFI)" %}}
```c
dd_logger_debug(logger, "A debug message.", NULL, NULL);
dd_logger_info(logger, "Some relevant information.", NULL, NULL);
dd_logger_notice(logger, "Have you noticed?", NULL, NULL);
dd_logger_warn(logger, "An important warning.", NULL, NULL);
dd_logger_error(logger, "An error occurred!", NULL, NULL);
dd_logger_critical(logger, "Something critical happened!", NULL, NULL);
```
{{% /tab %}}
{{< /tabs >}}

6. (Optional) Attach error context to a log entry using `LogError`. This is useful for recording a caught error or exception alongside a diagnostic message. `LogError` has three optional fields: `message`, `kind`, and `stack`.

{{< tabs >}}
{{% tab "C++" %}}
```cpp
datadog::LogError err;
err.message = "connection timed out";
err.kind    = "NetworkError";
err.stack   = "<stack trace>";
logger->Error("Failed to fetch config", err);
```
{{% /tab %}}
{{% tab "C (FFI)" %}}
```c
dd_log_error_t err = {0};
err.message = "connection timed out";
err.kind    = "NetworkError";
err.stack   = "<stack trace>";
dd_logger_error(logger, "Failed to fetch config", &err, NULL);
```

All `dd_log_error_t` fields are optional. Set unused fields to `NULL`.
{{% /tab %}}
{{< /tabs >}}

7. (Optional) Provide attributes alongside your log message to add context to the emitted log. Attributes must be passed as an object, and each named property is included in the resulting log event.

{{< tabs >}}
{{% tab "C++" %}}
```cpp
datadog::Attribute attrs = datadog::Attribute::Object(1);
attrs.SetObjectProperty("context", datadog::Attribute::String("onboarding flow"));
logger->Info("Clicked OK", {}, attrs);
```
{{% /tab %}}
{{% tab "C (FFI)" %}}
```c
dd_attribute_t attrs = dd_attribute_object(1);
dd_attribute_t context = dd_attribute_string("onboarding flow");
dd_attribute_object_property_set(&attrs, "context", &context);
dd_attribute_free(&context);

dd_logger_info(logger, "Clicked OK", NULL, &attrs);
dd_attribute_free(&attrs);
```
{{% /tab %}}
{{< /tabs >}}

## Advanced logging

### Logger initialization

The following methods on `LoggerConfig` can be used when creating a logger:

| Method | Description |
|--------|-------------|
| `SetName()` | Value for the `logger.name` attribute attached to all logs from this logger. |
| `SetService()` | Override the `service` [standard attribute][7] for this logger. Defaults to the service set at SDK initialization. |
| `SetRemoteLogThreshold()` | Minimum log level sent to Datadog. Logs below this level are dropped. |
| `SetRemoteSampleRate()` | Percentage of log events to upload (0.0-100.0; default: 100.0). |
| `SetEnrichWithRumContext()` | Attach the active RUM view and session context to each log event (default: `true`). |

### Global configuration

Use the following methods to add or remove tags and attributes that are attached to all logs sent by a given logger.

#### Global tags

##### Add tags

Use `AddTag` to add a tag to all logs sent by a specific logger:

{{< tabs >}}
{{% tab "C++" %}}
```cpp
// This adds a tag "build_type:release"
logger->AddTag("build_type", "release");
```
{{% /tab %}}
{{% tab "C (FFI)" %}}
```c
dd_logger_add_tag_kv(logger, "build_type", "release");
```
{{% /tab %}}
{{< /tabs >}}

The `<TAG_VALUE>` must be a `String`. For more information, see [Getting Started with Tags][8].

##### Remove tags

Use `RemoveTagsWithKey` to remove all tags with a given key from logs sent by a specific logger:

{{< tabs >}}
{{% tab "C++" %}}
```cpp
// This removes all tags with key "build_type"
logger->RemoveTagsWithKey("build_type");
```
{{% /tab %}}
{{% tab "C (FFI)" %}}
```c
dd_logger_remove_tags_with_key(logger, "build_type");
```
{{% /tab %}}
{{< /tabs >}}

#### Global attributes

##### Add attributes

Use `AddAttribute` to add a persistent attribute to all logs sent by a specific logger:

{{< tabs >}}
{{% tab "C++" %}}
```cpp
// This adds an attribute "version_code" with an integer value for this logger instance.
logger->AddAttribute("version_code", datadog::Attribute::Int(42));
```
{{% /tab %}}
{{% tab "C (FFI)" %}}
```c
dd_attribute_t ver = dd_attribute_int(42);
dd_logger_add_attribute(logger, "version_code", &ver);
dd_attribute_free(&ver);
```
{{% /tab %}}
{{< /tabs >}}

Attributes can also be added globally across all logger instances by calling `AddAttribute` on the `Logging` feature object:

{{< tabs >}}
{{% tab "C++" %}}
```cpp
// This adds an attribute "version_name" with a string value in all logger instances.
logging->AddAttribute("version_name", datadog::Attribute::String("1.2.3"));
```
{{% /tab %}}
{{% tab "C (FFI)" %}}
```c
dd_attribute_t ver = dd_attribute_string("1.2.3");
dd_logging_add_attribute(logging, "version_name", &ver);
dd_attribute_free(&ver);
```
{{% /tab %}}
{{< /tabs >}}

The `<ATTRIBUTE_VALUE>` can be any `Attribute` type: string, integer, double, Boolean, or a nested object or array.

##### Remove attributes

Use `RemoveAttribute` to stop attaching an attribute to future logs from a specific logger:

{{< tabs >}}
{{% tab "C++" %}}
```cpp
// This removes the attribute "version_code" from all further logs sent from this logger instance.
logger->RemoveAttribute("version_code");
```
{{% /tab %}}
{{% tab "C (FFI)" %}}
```c
dd_logger_remove_attribute(logger, "version_code");
```
{{% /tab %}}
{{< /tabs >}}

To remove a global attribute from all logger instances:

{{< tabs >}}
{{% tab "C++" %}}
```cpp
// This removes the attribute "version_name" from all further logs sent from all logger instances.
logging->RemoveAttribute("version_name");
```
{{% /tab %}}
{{% tab "C (FFI)" %}}
```c
dd_logging_remove_attribute(logging, "version_name");
```
{{% /tab %}}
{{< /tabs >}}

## Batch collection

All logs are stored on the local device in batches, and the SDK makes periodic attempts to upload batches of data over HTTP. If the network is not available or if an upload fails, batches are kept until they can be sent successfully.

The data on disk is automatically discarded if it gets too old, to keep the SDK's disk usage bounded.

Before data is uploaded to Datadog, it is stored in cleartext in the application storage directory you configured.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-cpp
[2]: /account_management/api-app-keys/#client-tokens
[3]: /account_management/api-app-keys/#api-keys
[4]: https://github.com/DataDog/dd-sdk-cpp/releases
[5]: /real_user_monitoring/application_monitoring/cpp/advanced_build_configuration
[6]: /real_user_monitoring/application_monitoring/cpp/advanced_configuration
[7]: /logs/processing/attributes_naming_convention/
[8]: /getting_started/tagging/
