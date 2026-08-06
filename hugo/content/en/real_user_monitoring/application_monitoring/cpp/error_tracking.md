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
---

## Overview

Enable crash reporting for your C and C++ applications to surface, triage, and debug crashes in [Error Tracking][1]. On Linux and macOS, the C++ SDK captures unhandled signals (such as `SIGSEGV` and `SIGABRT`). On Windows, it captures unhandled structured exceptions. In both cases, the SDK stores a crash report with the crashing thread's stack trace locally for upload on the next application launch.

Crash reports appear in [Error Tracking][1] and are deduplicated and grouped into issues to help you prioritize and resolve the most impactful crashes.

## Setup

If you have not set up the RUM C++ SDK yet, follow the [in-app setup instructions][2] or see the [RUM C++ setup documentation][3].

To enable crash reporting, register the `CrashReporting` feature as early as possible after creating your SDK core, before calling `Start()`.

{{< tabs >}}
{{% tab "C++" %}}

```cpp
#include "datadog.hpp"

datadog::CoreConfig config("<client_token>", "<service_name>", "<environment>");
auto core = datadog::Core::Create(config, datadog::TrackingConsent::Granted);

// Register crash reporting
auto crash_reporting = datadog::CrashReporting::Register(core);

// Register RUM
datadog::RumConfig rum_config("<rum_application_id>");
auto rum = datadog::Rum::Register(core, rum_config);

// Start the core
core->Start();
```

{{% /tab %}}
{{% tab "C (FFI)" %}}

```c
#include "datadog.h"

dd_core_config_t config;
dd_core_config_init(&config, "<client_token>", "<service_name>", "<environment>");
dd_core_t* core = dd_core_create(&config, DD_TRACKING_CONSENT_GRANTED);

/* Register crash reporting */
dd_crash_reporting_t* crash_reporting = dd_crash_reporting_init(core, NULL);

/* Register RUM */
dd_rum_config_t rum_config;
dd_rum_config_init(&rum_config, "<rum_application_id>");
dd_rum_t* rum = dd_rum_init(core, &rum_config);

dd_core_start(core);
```

{{% /tab %}}
{{< /tabs >}}

The SDK captures crashes automatically once registered.

### Crash reporting modes

The crash reporting mode is set at build time using the `DD_CRASH_MODE` CMake variable.

#### In-process (default)

The default mode, `inprocess`, captures the stack trace of the crashing thread and stores it locally for upload on the next launch:

```cmake
set(DD_CRASH_MODE "inprocess" CACHE STRING "")
```

For accurate stack traces on Linux and macOS, compile your application with `-fno-omit-frame-pointer`. The in-process handler walks the call stack using frame pointers, and without this flag, stack traces may be incomplete or inaccurate.

<!--CRASHPAD--
#### Crashpad

Crashpad is an out-of-process crash handler that provides more robust crash capture than the in-process handler. Because it runs as a separate executable, it can report crashes that the in-process handler cannot, such as crashes caused by stack overflow or heap corruption.

Crashpad requires C++20 (the default `inprocess` mode requires only C++17), and the `crashpad_handler` executable must be deployed alongside your application. See [Advanced Build Configuration][5] for deployment instructions.

To enable Crashpad, set `DD_CRASH_MODE=crashpad` and configure your project to use C++20:

```cmake
set(DD_CRASH_MODE "crashpad" CACHE STRING "")
set(CMAKE_CXX_STANDARD 20)
```

By default, the SDK looks for `crashpad_handler` in the same directory as your application binary. To specify a different location, use `SetHandlerExePath()` (C++) or `dd_crash_reporting_config_set_handler_exe_path()` (C):

{{< tabs >}}
{{% tab "C++" %}}

```cpp
datadog::CrashReportingConfig crash_config;
crash_config.SetHandlerExePath("/path/to/crashpad_handler");
auto crash_reporting = datadog::CrashReporting::Register(core, crash_config);
```

{{% /tab %}}
{{% tab "C (FFI)" %}}

```c
dd_crash_reporting_config_t crash_config;
dd_crash_reporting_config_init(&crash_config);
dd_crash_reporting_config_set_handler_exe_path(&crash_config, "/path/to/crashpad_handler");
dd_crash_reporting_t* crash_reporting = dd_crash_reporting_init(core, &crash_config);
```

{{% /tab %}}
{{< /tabs >}}
--CRASHPAD-->

#### Disabled (noop)

To disable crash reporting entirely without removing the API calls from your code, set `DD_CRASH_MODE` to `noop`:

```cmake
set(DD_CRASH_MODE "noop" CACHE STRING "")
```

### Symbolication

To get human-readable function names and line numbers in your crash reports, upload your application's debug symbols to Datadog. See [RUM Debug Symbols][4] for setup instructions.

## Test your implementation

To verify that crash reporting is working:

1. Run your application with crash reporting enabled.
2. Trigger a crash. The simplest way is to use a direct system call:

{{< tabs >}}
{{% tab "POSIX" %}}
```cpp
#include <signal.h>
raise(SIGSEGV);
```
{{% /tab %}}
{{% tab "Windows" %}}
```c
#include <windows.h>
RaiseException(EXCEPTION_ACCESS_VIOLATION, 0, 0, NULL);
```
{{% /tab %}}
{{< /tabs >}}

3. Relaunch the application. The crash report is uploaded during the next launch.
4. After a few seconds, navigate to [Error Tracking][1] in Datadog to confirm the crash report appears.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/error_tracking/
[2]: https://app.datadoghq.com/rum/application/create
[3]: /real_user_monitoring/application_monitoring/cpp/setup
[4]: https://app.datadoghq.com/source-code/setup/rum
[5]: /real_user_monitoring/application_monitoring/cpp/advanced_build_configuration
