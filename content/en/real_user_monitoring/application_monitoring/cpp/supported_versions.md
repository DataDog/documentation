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

The Datadog C++ SDK supports native C and C++ applications on Linux, macOS, and Windows, and is tested in 64-bit builds across a range of compiler toolchains. Integrating the SDK requires CMake 3.21 or later.

## Supported platforms

| Platform | Tested OS | Architecture | Compiler toolchains |
|----------|-----------|--------------|---------------------|
| Linux | Ubuntu 22.04 | x86_64 | GCC 11, GCC 13, Clang 15, Clang 20 |
| macOS | macOS 14 (Sonoma) | x86_64, arm64 | AppleClang 15 (Xcode 15.3) |
| Windows | Windows Server 2022 | x86_64 | MSVC 2022 (v17.14, toolset v143) |

Other OS versions and compilers with C++17 support may work but are not validated in CI.

## Supported compiler toolchains

| Toolchain | Tested versions | Platform |
|-----------|-----------------|----------|
| GCC | 11, 13 | Linux |
| Clang / LLVM | 15, 20 | Linux |
| AppleClang | 15 (Xcode 15.3) | macOS |
| MSVC | 2022 (v17.14, toolset v143) | Windows |

The SDK is written in C++17. The C API (`datadog.h`) is compatible with C99, so C++ language support in the application is not required to use the C API.

## Dependencies

For a full list of third-party components, see [`LICENSE-3rdparty.csv`][2] in the SDK repository.

### libcurl

The SDK uses libcurl for HTTP transport. On Linux and macOS, the SDK links against the system-provided libcurl by default; you can override this to bundle a static libcurl build by setting the CMake option `DD_HTTP_USE_SYSTEM_LIBCURL=OFF`. On Windows, libcurl is always built from source as part of the SDK build.

<!--
### Crashpad

Crashpad is an optional crash reporting backend. When building with Crashpad (`DD_CRASH_MODE=crashpad`), you must deploy the `crashpad_handler` executable alongside your application.

**Note:** Crashpad support is not officially available.
-->

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/application_monitoring/cpp/setup
[2]: https://github.com/DataDog/dd-sdk-cpp/blob/main/LICENSE-3rdparty.csv
