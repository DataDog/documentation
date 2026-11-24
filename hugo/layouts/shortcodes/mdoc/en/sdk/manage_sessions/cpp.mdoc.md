## Configure the session sample rate

The session sample rate controls the percentage of RUM sessions sent to Datadog. Set it on the `RumConfig` to a value between 0.0 and 100.0. The default is 100.0, which keeps all sessions.

{% tabs %}
{% tab label="C++" %}
```cpp
datadog::RumConfig rum_config("<rum_application_id>");
rum_config.SetSessionSampleRate(100.0f);
```
{% /tab %}
{% tab label="C" %}
```c
dd_rum_config_t* rum_config = dd_rum_config_create("<rum_application_id>");
dd_rum_config_set_session_sample_rate(rum_config, 100.0f);
```
{% /tab %}
{% /tabs %}

You can adjust the session sample rate, but Datadog recommends using [retention filters][1] to control retained volume.

## Retrieve the session ID

Retrieving the RUM session ID can be helpful for troubleshooting. For example, you can attach the session ID to support requests, emails, or bug reports so that your support team can later find the user session in Datadog.

To access the RUM session ID at runtime, register a context receiver when you configure RUM (requires C++ SDK v0.8.0 or later). The SDK calls the receiver once at startup with the current state, and again whenever the session, view, or anonymous user ID changes. The receiver runs on an SDK-internal thread, so it must be thread-safe and return promptly.

The session ID is all zeroes when there is no active session, or when the active session isn't sampled.

{% tabs %}
{% tab label="C++" %}
```cpp
rum_config.SetContextReceiver([&](const datadog::RumContextMessage& msg) {
    // The current session ID is available in msg.session_id
});
```
{% /tab %}
{% tab label="C" %}
```c
static void on_rum_context(const dd_rum_context_message_t* msg, void* userdata) {
    // The current session ID is available in msg->session_id
}

dd_rum_config_set_context_receiver(rum_config, on_rum_context);
```
{% /tab %}
{% /tabs %}

[1]: /real_user_monitoring/retain_and_recover_valuable_sessions/configure_retention_filters/
