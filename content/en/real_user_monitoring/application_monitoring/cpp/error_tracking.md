---
title: C / C++ Crash Reporting and Error Tracking
description: Set up Error Tracking for your C and C++ applications.
further_reading:
- link: '/real_user_monitoring/error_tracking/'
  tag: 'Documentation'
  text: 'Get started with Error Tracking'
- link: '/real_user_monitoring/error_tracking/explorer'
  tag: 'Documentation'
  text: 'Visualize Error Tracking data in the Explorer'
site_support_id: rum_cpp
---

## Overview

Enable crash reporting for your C and C++ applications to surface, triage, and debug crashes in [Error Tracking][1]. The C++ SDK captures unhandled signals (such as `SIGSEGV` and `SIGABRT`) at crash time and uploads a crash report with the crashing thread's stack trace on the next application launch.

Crash reports appear in [Error Tracking][1] and are deduplicated and grouped into issues to help you prioritize and resolve the most impactful crashes.

## Setup

If you have not set up the RUM C++ SDK yet, follow the [in-app setup instructions][2] or see the [RUM C++ setup documentation][3].

To enable crash reporting, register the `CrashReporting` feature after creating your SDK core and before calling `Start()`. Registering crash reporting after `Start()` is not supported.

{{< tabs >}}
{{% tab "Cpp" %}}

```cpp
#include "datadog.hpp"

datadog::CoreConfig config("<client_token>", "<service_name>", "<environment>");
auto core = datadog::Core::Create(config, datadog::TrackingConsent::Granted);

// Register RUM
datadog::RumConfig rum_config("<rum_application_id>");
auto rum = datadog::Rum::Register(core, rum_config);

// Register crash reporting — must be called before core->Start()
datadog::CrashReportingConfig crash_config;
auto crash_reporting = datadog::CrashReporting::Register(core, crash_config);

// Start the core
core->Start();
```

{{% /tab %}}
{{% tab "C" %}}

```c
#include "datadog.h"

dd_core_config_t config;
dd_core_config_init(&config, "<client_token>", "<service_name>", "<environment>");
dd_core_t* core = dd_core_create(&config, DD_TRACKING_CONSENT_GRANTED);

/* Register RUM */
dd_rum_config_t rum_config;
dd_rum_config_init(&rum_config, "<rum_application_id>");
dd_rum_t* rum = dd_rum_init(core, &rum_config);

/* Register crash reporting — must be called before dd_core_start() */
dd_crash_reporting_config_t crash_config;
dd_crash_reporting_config_init(&crash_config);
dd_crash_reporting_t* crash_reporting = dd_crash_reporting_init(core, &crash_config);

dd_core_start(core);
```

{{% /tab %}}
{{< /tabs >}}

The SDK captures crashes automatically once registered. No additional signal handler configuration is required.

### Crash reporting modes

The crash reporting mode is set at build time using the `DD_CRASH_MODE` CMake variable. The default mode is `inprocess`, which captures the stack trace of the crashing thread and stores it locally for upload on the next launch.

```cmake
# Use the default inprocess mode (captures crashing thread stack trace)
set(DD_CRASH_MODE "inprocess" CACHE STRING "")
```

To disable crash reporting entirely without removing the API calls from your code, set `DD_CRASH_MODE` to `noop`:

```cmake
set(DD_CRASH_MODE "noop" CACHE STRING "")
```

### Symbolication

To get human-readable function names and line numbers in your crash reports, upload your application's debug symbols to Datadog. See [RUM Debug Symbols][4] for setup instructions.

## Test your implementation

To verify that crash reporting is working:

1. Run your application with crash reporting enabled.
2. Trigger a crash. The simplest way is to dereference a null pointer:

   ```cpp
   // Trigger a test crash — do not use in production
   int* p = nullptr;
   *p = 0;
   ```

3. Relaunch the application. The crash report is uploaded during the next launch.
4. After a few seconds, navigate to [Error Tracking][1] in Datadog to confirm the crash report appears.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/error_tracking/
[2]: https://app.datadoghq.com/rum/application/create
[3]: /real_user_monitoring/application_monitoring/cpp/setup
[4]: https://app.datadoghq.com/source-code/setup/rum
