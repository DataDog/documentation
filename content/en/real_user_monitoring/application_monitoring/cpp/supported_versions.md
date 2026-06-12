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

The Datadog C++ SDK supports native C and C++ applications running on Linux, macOS, and Windows. Use this page to confirm supported compilers, operating systems, architectures, and build system requirements before integrating the SDK.

## Supported compilers

The SDK is written in C++17 and requires a compiler with full C++17 support. The following compilers are tested and supported:

| Compiler | Minimum version | Notes |
|----------|-----------------|-------|
| GCC | 8 | |
| Clang / LLVM | 7 | |
| MSVC | 2019 (16.11) | Requires `/std:c++17` or `/std:c++20` |

The C API (`datadog.h`) is compatible with C99 and later. C++ language support in the application is not required to use the C API.

### Build system

| Tool | Minimum version |
|------|-----------------|
| CMake | 3.21 |

The SDK is distributed as a CMake project and integrates via `FetchContent` or `add_subdirectory`. See the [Setup documentation][1] for integration instructions.

## Supported operating systems and architectures

| Operating system | Architecture | Notes |
|-----------------|--------------|-------|
| Linux | x86_64 (amd64) | Tested on Ubuntu 20.04+, Debian 10+, and RHEL 8+ |
| macOS | x86_64, arm64 (Apple Silicon) | macOS 11 (Big Sur) or later |
| Windows | x86_64 | Windows 10 / Windows Server 2019 or later |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/application_monitoring/cpp/setup
