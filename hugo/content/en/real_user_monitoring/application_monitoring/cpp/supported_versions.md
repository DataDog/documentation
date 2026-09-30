---
title: C / C++ Monitoring Supported Versions
description: Supported compilers, operating systems, and architectures for the Datadog C++ SDK.
further_reading:
- link: /real_user_monitoring/application_monitoring/cpp/advanced_configuration/
  tag: Documentation
  text: RUM C / C++ Advanced Configuration
- link: "https://github.com/DataDog/dd-sdk-cpp"
  tag: "Source Code"
  text: "Source code for dd-sdk-cpp"
- link: "/real_user_monitoring"
  tag: "Documentation"
  text: "Learn how to explore your RUM data"
---

## Overview

The Datadog C++ SDK supports native C and C++ applications on Linux, macOS, and Windows. SDK builds are tested on a range of compiler toolchains and 64-bit CPU architectures.

The SDK is built with CMake and officially integrates with CMake 3.21 or later. Applications using other build systems can link against precompiled SDK binaries directly.

## Compiler support

Builds of the C++ SDK are officially tested on these operating systems, compilers, and architectures:

| Platform | Compiler toolchain                 | Built on                                |
|----------|------------------------------------|-----------------------------------------|
| Linux    | GCC 11, GCC 13, Clang 15, Clang 20 | Ubuntu 22.04 (x86_64)                   |
| macOS    | AppleClang 15 (Xcode 15.3)         | macOS 14 Sonoma (arm64)                 |
| Windows  | MSVC 2022 (v17.14, toolset v143)   | Windows Server 2022 (x86_64) |

Other compilers with C++17 support are expected to work but are not officially validated in CI.

The C API is compatible with C99 and can be used by applications without C++ language support.

## Dependencies

For a full list of third-party components, see [`LICENSE-3rdparty.csv`][2] in the SDK repository.

### libcurl

The SDK uses libcurl for HTTP transport. On Linux and macOS, the SDK links against the system-provided libcurl by default. You can override this to bundle a static libcurl build by setting the CMake option `DD_HTTP_USE_SYSTEM_LIBCURL=OFF`. On Windows, libcurl is always built from source as part of the SDK build.

<!--CRASHPAD--
### Crashpad

When built with `DD_CRASH_MODE=crashpad`, the SDK's Crash Reporting functionality uses Crashpad, and a crashpad handler executable must be included with your application. See [Crash Reporting][3] for more details.
--CRASHPAD-->

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/application_monitoring/cpp/setup
[2]: https://github.com/DataDog/dd-sdk-cpp/blob/main/LICENSE-3rdparty.csv
[3]: /real_user_monitoring/application_monitoring/cpp/error_tracking
