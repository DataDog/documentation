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
dd_rum_config_t rum_config;
dd_rum_config_init(&rum_config, "<rum_application_id>");
dd_rum_config_set_session_sample_rate(&rum_config, 100.0f);
```
{% /tab %}
{% /tabs %}

You can adjust the session sample rate, but Datadog recommends using [retention filters][1] to control retained volume.

[1]: /real_user_monitoring/retain_and_recover_valuable_sessions/configure_retention_filters/
