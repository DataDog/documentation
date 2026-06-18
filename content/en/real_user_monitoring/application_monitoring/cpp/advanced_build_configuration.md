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

This page covers build configuration topics beyond the standard CMake setup described in [C / C++ Monitoring Setup][1], including instructions for integrating the SDK into projects that don't use CMake.

## CMake targets and datadog_enable()

To add the SDK as a dependency in your CMake project, pass your executable target to `datadog_enable()`:

```cmake
add_executable(my-app main.cpp)
datadog_enable(my-app)
```

This function adds the SDK as a dependency while also configuring additional build steps as required by your build configuration<!--CRASHPAD--, such as deploying a crash handler executable when using Crashpad--CRASHPAD-->.

If you prefer to configure CMake dependencies directly, you can use the `Datadog::sdk` target:

```cmake
target_link_libraries(my-app PRIVATE Datadog::sdk)
```

See [`DatadogConvenience.cmake`][2] for a full definition of `datadog_enable()`.

## CMake installation rules and datadog_install()

Depending on build configuration, you may need to package additional files with installable builds of your application.

<!--CRASHPAD--
- If you build the SDK as a shared library, your application will need to load `.so`/`.dylib`/`.dll` files at runtime.
- When using Crashpad, an additional crash handler executable must be distributed with your application.
--CRASHPAD-->

If you're using `install()` to define installation rules for your CMake project, call `datadog_install()`:

```cmake
install(TARGETS my-app RUNTIME DESTINATION bin LIBRARY DESTINATION lib)
datadog_install(my-app
   RUNTIME_DESTINATION bin  # Optional, defaults to CMAKE_INSTALL_BINDIR if set
   LIBRARY_DESTINATION lib  # Optional, defaults to CMAKE_INSTALL_LIBDIR if set
                            # (Not used for Windows or static-library builds)
)
```

This function ensures that all required runtime artifacts are present alongside your application binary when using `cmake --install` or building generated "install" targets.

See [`DatadogConvenience.cmake`][2] for a full definition of `datadog_install()`.

## Customizing the SDK build

If you use `FetchContent` to build the SDK from source as part of your project's build, or if you build your own precompiled binaries to integrate into a non-CMake build, you can customize the build with CMake options:

- In a `CMakeList.txt` or `.cmake` file: `set(DD_CRASH_MODE inprocess)`
- When configuring the project with `cmake`: `cmake -DDD_CRASH_MODE=inprocess ...`
- In the CMake GUI

These are several important options to consider when building the SDK from source.

<table>
  <colgroup>
    <col style="width:25%">
    <col style="width:75%">
  </colgroup>
  <thead>
    <tr><th>Option</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><code>CMAKE_BUILD_TYPE</code></td>
      <td>
        This is a standard CMake option, typically <code>RelWithDebInfo</code> or <code>Release</code> for production builds. If you incorporate the SDK as a dependency with <code>FetchContent</code>, you are responsible for setting this option in your project's build.
      </td>
    </tr>
    <tr>
      <td><code>DD_BUILD_SHARED</code></td>
      <td>
        <code>OFF</code>: The SDK is built as a static library.<br>
        <code>ON</code>: The SDK is built as a shared/dynamic library.<br>
        Defaults to the value of <code>BUILD_SHARED_LIBS</code>, which is <code>OFF</code> by default.
      </td>
    </tr>
    <tr>
      <td><code>DD_CRASH_MODE</code></td>
      <td>
        <code>inprocess</code> <i>(default)</i>: The SDK uses an in-process handler to detect crashes.<br>
        <!--CRASHPAD--<code>crashpad</code>: The SDK launches a separate executable to detect crashes.<br>--CRASHPAD-->
        <code>noop</code>: The SDK does not detect crashes.</li>
      </td>
    </tr>
    <tr>
      <td><code>DD_HTTP_USE_SYSTEM_LIBCURL</code></td>
      <td>
        <code>OFF</code>: libcurl is built from source as a static library and linked into the SDK.<br>
        <code>ON</code>: The SDK uses system-installed shared libraries for libcurl.<br>
        Defaults to <code>OFF</code> for Windows builds, <code>ON</code> for Linux and macOS.
      </td>
    </tr>
  </tbody>
</table>

For a full list of configuration options, see the SDK's root [`CMakeLists.txt`][3].

## Integrating the SDK into a non-CMake build

If your application is not built with CMake, you can link against `libddsdkcpp.a` (or `ddsdkcpp.lib` on Windows) using your project's build system. You have two options for obtaining a ready-to-link build of the SDK:

1. **Use precompiled binaries:** download an officially-published Datadog release.
2. **Build from source:** clone the SDK and build it yourself.

### Using precompiled binaries

From the SDK's [GitHub Releases][4] page, find your chosen release, then download the archive for your platform. Extract its contents to a directory within your project: the example below uses `external/datadog-sdk/`. 

### Building from source

Alternatively, you can build your own SDK binaries. Clone the SDK, configure it with your desired [CMake options](#customizing-the-sdk-build), run a build, and then use `cmake --install` to deploy it to a directory within your project. For example:

{{< tabs >}}
{{% tab "POSIX" %}}
```
git clone https://github.com/DataDog/dd-sdk-cpp.git
cd dd-sdk-cpp
cmake -GNinja -DCMAKE_BUILD_TYPE=RelWithDebInfo -S . -B build
cmake --build build
cmake --install build --prefix "$YOUR_PROJECT/external/datadog-sdk/"
```
{{% /tab %}}
{{% tab "Windows" %}}
```
git clone https://github.com/DataDog/dd-sdk-cpp.git
cd dd-sdk-cpp
cmake -G"Visual Studio 17 2022" -S . -B build
cmake --build build --config RelWithDebInfo
cmake --install build --config RelWithDebInfo --prefix "%YOUR_PROJECT%\external\datadog-sdk"
```
{{% /tab %}}
{{< /tabs >}}

This populates `external/datadog-sdk/`, placing all required files in `include/`, `lib/`, etc.

### Configuring compiler and linker dependencies

After preparing a redistributable build of the SDK, make the following changes to your project's build configuration:

- **Include directories:** Add `external/datadog-sdk/include/`
- **Library directories:** Add `external/datadog-sdk/lib/`
- **Libraries to link:** Add `-lddsdkcpp` on POSIX; `ddsdkcpp.lib` on Windows

You may also need to add a few other libraries, depending on your platform:

{{< tabs >}}
{{% tab "Linux" %}}

On Linux, linking against the SDK requires:

- `-luuid`
- `-lcurl` (unless the SDK is built with `DD_HTTP_USE_SYSTEM_LIBCURL=OFF`)

{{% /tab %}}
{{% tab "macOS" %}}

On macOS, linking against the SDK requires:

- `-framework CoreFoundation`
- `-lcurl` (unless the SDK is built with `DD_HTTP_USE_SYSTEM_LIBCURL=OFF`)
{{% /tab %}}
{{% tab "Windows" %}}

On Windows, linking against the SDK requires:

- `ole32.lib`
- `wbemuuid.lib`

MSVC should include these libraries automatically thanks to `#pragma` directives.

{{% /tab %}}
{{< /tabs >}}

### Deploying additional files

If you've built the SDK as a shared library, bundle the shared library with your application:

- **Linux:** `libddsdkcpp.so`
- **macOS:** `libddsdkcpp.dylib`
- **Windows:** `ddsdkcpp.dll`

On macOS and Linux, your executable's runtime search path must also include the location of this file.

<!--CRASHPAD--
If using `DD_CRASH_MODE=crashpad`, you'll also need to copy the crashpad handler executable to the same directory as your application's executable.
--CRASHPAD-->

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/application_monitoring/cpp/setup
[2]: https://github.com/DataDog/dd-sdk-cpp/blob/main/cmake/DatadogConvenience.cmake
[3]: https://github.com/DataDog/dd-sdk-cpp/blob/main/CMakeLists.txt
[4]: https://github.com/DataDog/dd-sdk-cpp/releases
