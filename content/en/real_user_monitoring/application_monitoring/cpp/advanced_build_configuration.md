---
title: C / C++ Advanced Build Configuration
description: >-
  Configure the Datadog C++ SDK build for non-CMake projects, customize CMake
  options, and understand platform-specific linker requirements.
further_reading:
- link: /real_user_monitoring/application_monitoring/cpp/setup
  tag: Documentation
  text: C / C++ Monitoring Setup
- link: "https://github.com/DataDog/dd-sdk-cpp"
  tag: "Source Code"
  text: "Source code for dd-sdk-cpp"
- link: "/real_user_monitoring"
  tag: "Documentation"
  text: "Explore Datadog RUM"
---

## Overview

This page covers build configuration topics beyond the standard CMake setup described in [C / C++ Monitoring Setup][1]:

- How the `datadog_enable()` and `datadog_install()` CMake convenience functions work, and how to link against `Datadog::sdk` directly if you need finer control.
- How to use `datadog_install()` with your application's CMake install targets.
- How to build the SDK from source to produce artifacts for use in non-CMake builds.
- Available CMake configuration options and how to set them.
- Platform-specific linker dependencies required when integrating without CMake.

## CMake convenience functions

The SDK provides two convenience functions, `datadog_enable()` and `datadog_install()`, defined in [`DatadogConvenience.cmake`][2]. They are automatically available after calling `FetchContent_MakeAvailable(Datadog)` or `find_package(Datadog)`.

### `datadog_enable(target)`

`datadog_enable(target)` performs two tasks:

1. **Links `Datadog::sdk`**: Adds the SDK as a private linker dependency for `target`, so its sources can include SDK headers and call SDK functions.
2. **Copies `crashpad_handler`** (Crashpad mode only): Adds a post-build step to copy the `crashpad_handler` executable alongside the `target` binary. This is required for crash reporting to work without explicitly configuring a handler path.

```cmake
datadog_enable(my-app)
```

### `datadog_install(destination)`

`datadog_install(destination)` complements `datadog_enable()` for applications that use CMake's install system. It ensures that `crashpad_handler` is installed alongside your application binary when you run `cmake --install`.

```cmake
install(TARGETS my-app RUNTIME DESTINATION bin)
datadog_install(bin)
```

This function has no effect when the SDK is built without Crashpad support (`DD_CRASH_MODE` is `noop` or `inprocess`). You can omit the call if your project does not use CMake install rules, does not require Crashpad, or copies `crashpad_handler` through other means.

### Using `Datadog::sdk` directly

Both functions are wrappers around `Datadog::sdk`, the primary CMake import target. If you need finer-grained control — for example, to use the SDK as a public dependency rather than a private one — link against it directly:

```cmake
target_link_libraries(my-app PRIVATE Datadog::sdk)
```

When linking directly, you are responsible for ensuring `crashpad_handler` is distributed alongside your application binary (if using Crashpad mode).

## Building from source for non-CMake builds

If you are not using CMake to build your application, you must first build the SDK with CMake to produce artifacts (headers and libraries), then configure your build to reference those artifacts.

1. Clone the repository into its own directory:

   ```shell
   git clone https://github.com/DataDog/dd-sdk-cpp.git
   cd dd-sdk-cpp
   ```

2. Configure the build, passing any desired [CMake options](#cmake-options):

   ```shell
   cmake -S . -B build
   ```

3. Build the SDK:

   ```shell
   cmake --build build
   ```

4. Copy the SDK headers into your project. Use `include-cpp/` for the C++ API or `include-c/` for the C API:

   ```shell
   cp -r include-cpp/ external/datadog-sdk/include/
   ```

5. Copy the compiled library from `build/src/` into your project. The filename varies by platform and build type: `libddsdkcpp.a` on Linux and macOS (static), `libddsdkcpp.so` or `libddsdkcpp.dylib` (shared), or `ddsdkcpp.lib` on Windows.

   ```shell
   cp build/src/libddsdkcpp.a external/datadog-sdk/lib/
   ```

6. If using Crashpad mode, also copy the `crashpad_handler` executable to the same directory as your application binary.

After populating `external/datadog-sdk/`, configure your build to add the SDK headers to your include path and link against the SDK library. See [Linker dependencies](#linker-dependencies) for the full list of required libraries per platform.

For a complete example, see [`myapp-make`][3] in the `dd-sdk-cpp-examples` repository.

## CMake options

Pass options to the CMake configure step with the `-D` flag:

```shell
cmake -S . -B build -DDD_CRASH_MODE=crashpad -DDD_HTTP_USE_SYSTEM_LIBCURL=OFF
```

The following options are most relevant when building for integration into an existing project:

| Option | Default | Description |
|--------|---------|-------------|
| `DD_CRASH_MODE` | `inprocess` | Crash handler mode. `noop` disables crash reporting entirely; `inprocess` uses a signal/exception handler in the application process; `crashpad` uses an external `crashpad_handler` process. |
| `DD_BUILD_SHARED` | `${BUILD_SHARED_LIBS}` (default: `OFF`) | Build the SDK as a shared library instead of a static library. |
| `DD_HTTP_USE_SYSTEM_LIBCURL` | `ON` (Linux/macOS), `OFF` (Windows) | Link against the system-installed `libcurl`. Disable to have the SDK build and bundle `libcurl` from source. Windows defaults to `OFF` because `libcurl` does not ship with Windows. |

## Linker dependencies

When integrating the SDK without CMake, link against the following libraries in addition to `libddsdkcpp`:

| Platform | Additional libraries |
|----------|---------------------|
| Linux | `-luuid` (for UUID generation), `-lcurl` (default HTTP client) |
| macOS | `-framework CoreFoundation`, `-lcurl` (default HTTP client) |
| Windows | `ole32.lib` (for UUID generation via `CoCreateGuid`), `wbemuuid.lib` (for WMI device info) |

`-lcurl` is required on Linux and macOS when the SDK was built with `DD_HTTP_USE_SYSTEM_LIBCURL=ON` (the POSIX default). If you built the SDK with `DD_HTTP_USE_SYSTEM_LIBCURL=OFF`, `libcurl` is compiled into the SDK and does not need to be linked separately.

On Windows, `ole32.lib` and `wbemuuid.lib` are linked automatically when building with MSVC (via `#pragma comment(lib, ...)`). If you are using a different toolchain such as MinGW, add them explicitly. If the SDK was built with `DD_HTTP_USE_SYSTEM_LIBCURL=ON` (non-default on Windows), also link `-lcurl`.

A complete `Makefile` linker configuration for Linux looks like:

```makefile
INCLUDES = -Iexternal/datadog-sdk/include
LDFLAGS  = -Lexternal/datadog-sdk/lib
LDLIBS   = -lddsdkcpp -lcurl -luuid
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/application_monitoring/cpp/setup
[2]: https://github.com/DataDog/dd-sdk-cpp/blob/main/cmake/DatadogConvenience.cmake
[3]: https://github.com/DataDog/dd-sdk-cpp-examples/tree/main/myapp-make
