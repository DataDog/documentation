### Stop the current session

Call `StopSession` to explicitly end the current RUM session. The next call to `StartView()`, `StartAction()`, or `AddAction()` automatically starts a new session. If the new session is triggered by an action, the last active view from the previous session is restarted in the new session.

{% tabs %}
{% tab label="C++" %}

```cpp
rum->StopSession();
```

{% /tab %}
{% tab label="C" %}

```c
dd_rum_stop_session(rum);
```

{% /tab %}
{% /tabs %}

### Stop the SDK

{% tabs %}
{% tab label="C++" %}

In C++, `Core` and `Rum` are managed as `std::shared_ptr` references. The SDK stops automatically when the last reference to the core is released, so no explicit cleanup is required in typical usage.

To stop the SDK before it goes out of scope, call `Stop()` explicitly:

```cpp
core->Stop();
```

{% /tab %}
{% tab label="C" %}

The C API requires explicit resource management. Call the matching destroy function for every object created through the C API. Call `dd_core_stop` to halt all background activity, then free each feature, then free the core:

```c
dd_core_stop(core);
dd_rum_destroy(rum);
dd_core_destroy(core);
```

{% /tab %}
{% /tabs %}

### Manage data collection with tracking consent

To update the SDK's tracking consent after initialization, call `SetTrackingConsent` on the core at any time. The SDK adjusts its behavior immediately:

- `Granted`: The SDK sends all pending and future data to Datadog.
- `Pending`: The SDK continues collecting data and storing it locally, but does not send it to Datadog.
- `NotGranted`: The SDK deletes all pending data and stops collecting new data.

{% tabs %}
{% tab label="C++" %}

```cpp
core->SetTrackingConsent(datadog::TrackingConsent::Granted);
```

{% /tab %}
{% tab label="C" %}

```c
dd_core_set_tracking_consent(core, DD_TRACKING_CONSENT_GRANTED);
```

{% /tab %}
{% /tabs %}
