<!--
This partial contains troubleshooting content for the C++ SDK.
It can be included in the C++ SDK troubleshooting page or in the unified client_sdks view.
-->

## Overview

If you experience unexpected behavior with the Datadog C++ SDK, use this guide to resolve issues. If you continue to have trouble, contact [Datadog Support][1] for further assistance.

## Enable Diagnostic Logging

To get detailed output from the SDK during development, register a diagnostic handler on your `CoreConfig` before creating the core. This causes the SDK to emit internal log messages at the specified severity level and above:

```cpp
datadog::CoreConfig config("<client_token>", "<service_name>", "<environment>");

config.SetDiagnosticHandler([](datadog::DiagnosticLevel level, std::string_view message) {
    std::cerr << "[Datadog SDK] " << message << "\n";
});
config.SetDiagnosticThreshold(datadog::DiagnosticLevel::Debug);

auto core = datadog::Core::Create(config, datadog::TrackingConsent::Granted);
```

You should see output similar to the following when data is successfully uploaded:

```
[Datadog SDK] Uploading batch of 3 RUM events...
[Datadog SDK] Batch accepted by intake
```

**Recommendation:** Disable the diagnostic handler or raise the threshold to `Warning` in production builds to avoid performance overhead.

## Build Issues

**CMake cannot find the Datadog package or `Datadog::sdk` target**

Verify that:
- `FetchContent_MakeAvailable(Datadog)` is called before `target_link_libraries()`.
- The `GIT_TAG` in your `FetchContent_Declare` block matches a valid release tag or commit hash in the `dd-sdk-cpp` repository.
- Your CMake version is 3.21 or later (`cmake --version`).

**Compiler errors about missing C++17 features**

The SDK requires C++17. If you see errors like `error: 'std::string_view' is not a member of 'std'`, configure your target to use C++17:

```cmake
target_compile_features(your_target PRIVATE cxx_std_17)
```

**Compiler version is too old**

The SDK requires GCC 8+, Clang 7+, or MSVC 2019 (16.11+). If your compiler is older, upgrade to a supported version. See [Supported Versions][2] for the full compatibility matrix.

## Link Issues

**Undefined reference to `datadog::` symbols**

If the linker reports undefined references to symbols in the `datadog::` namespace, confirm that:
- You are linking against the `Datadog::sdk` target (check for typos in the target name).
- `FetchContent_MakeAvailable(Datadog)` is called before any `target_link_libraries()` that reference `Datadog::sdk`.

**Duplicate symbol errors**

If your build reports duplicate symbols involving the Datadog SDK, check whether multiple targets or subdirectories are independently linking against `Datadog::sdk`. Link the SDK only once and share it through your build graph.

## Runtime Issues

**No data appears in Datadog**

If your application runs but data does not appear in the Datadog UI, check the following:

1. **Tracking consent**: Confirm that tracking consent is set to `Granted`. If the core was initialized with `Pending` or `NotGranted`, no data is uploaded.
2. **`Start()` was called**: The SDK does not collect or upload data until `core->Start()` is called after all features are registered.
3. **Active view**: RUM errors, resources, and actions are attached to the currently active view. If no view has been started with `StartView()`, those events may be dropped. Start a view before recording other events.
4. **Network connectivity**: The SDK requires outbound HTTPS access to Datadog intake endpoints on port 443. Verify that your network allows these connections.
5. **Diagnostic output**: Enable the diagnostic handler (see above) and look for messages indicating upload failures or configuration errors.

**Storage directory is not writable**

If diagnostic output shows storage errors, verify that the directory configured via `SetApplicationStoragePath()` (or the default system temporary directory) exists and is writable by the application process.

**Crash reports are not appearing after a crash**

Crash reports are uploaded on the **next application launch** after the crash, not immediately (since the process is terminated at crash time). After triggering a test crash, relaunch the application and wait for the upload to complete.

If reports still do not appear:
- Confirm that `CrashReporting::Register()` is called after creating the core but before `core->Start()`.
- Verify that the application has write access to its storage directory.
- Check that the `crashpad_handler` executable is present in the same directory as your application binary (if using Crashpad mode). Use `datadog_enable(your_target)` in CMake to copy it automatically.

[1]: /help
[2]: /real_user_monitoring/application_monitoring/cpp/supported_versions
