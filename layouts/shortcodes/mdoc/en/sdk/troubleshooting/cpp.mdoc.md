<!--
This partial contains troubleshooting content for the C++ SDK.
It can be included in the C++ SDK troubleshooting page or in the unified client_sdks view.
-->

## Overview

If you experience unexpected behavior with the Datadog C++ SDK, use this guide to resolve issues. If you continue to have trouble, contact [Datadog Support][1] for further assistance.

## Enable diagnostic logging

The SDK outputs `Warning` and `Error` messages to stderr by default. To see more verbose output during development, lower the diagnostic threshold on your `CoreConfig` before creating the core:

```cpp
datadog::CoreConfig config("<client_token>", "<service_name>", "<environment>");
config.SetDiagnosticThreshold(datadog::DiagnosticLevel::Debug);

auto core = datadog::Core::Create(config, datadog::TrackingConsent::Granted);
```

You should see output similar to the following when data is successfully uploaded:

```
[DATADOG STATUS] Upload cycle finished with all uploads successful
```

**Recommendation:** Remove the `SetDiagnosticThreshold` call in production builds to revert to the default (`Warning`) and avoid unnecessary log volume.

To route diagnostic output somewhere other than stderr, supply a custom handler. The `msg.text` pointer is only valid for the duration of the call, so copy the string if you need to store it:

```cpp
config.SetDiagnosticHandler([](const datadog::DiagnosticMessage& msg) {
    my_logger.write(msg.text);
});
```

Pass `nullptr` to `SetDiagnosticHandler` to suppress all diagnostic output entirely.

## Runtime Issues

**No data appears in Datadog**

If your application runs but data does not appear in the Datadog UI, check the following:

1. **Tracking consent**: Confirm that tracking consent is set to `Granted`. If the core was initialized with `Pending` or `NotGranted`, no data is uploaded.
2. **`Start()` was called**: The SDK does not collect or upload data until `core->Start()` is called after all features are registered.
3. **Active view**: RUM errors, resources, and actions are attached to the active view. If no view has been started with `StartView()`, those events may be dropped. Start a view before recording other events.
4. **Network connectivity**: The SDK requires outbound HTTPS access to Datadog intake endpoints on port 443. Verify that your network allows these connections.
5. **Diagnostic output**: Lower the diagnostic threshold (see above) and look for messages indicating upload failures or configuration errors.

**Storage directory is not writable**

If diagnostic output shows storage errors, verify that the storage directory exists and is writable by the application process. The SDK uses the directory set with `SetApplicationStoragePath()`, or the system temporary directory by default.

**Crash reports are not appearing after a crash**

Crash reports are uploaded on the **next application launch** after the crash, not immediately (since the process is terminated at crash time). After triggering a test crash, relaunch the application and wait for the upload to complete.

If reports still do not appear:
- Confirm that `CrashReporting::Register()` is called after creating the core but before `core->Start()`.
- Verify that the application has write access to its storage directory.
- Check that the `crashpad_handler` executable is present in the same directory as your application binary (if using Crashpad mode). Use `datadog_enable(your_target)` in CMake to copy it automatically.

[1]: /help
