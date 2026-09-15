### Setup

**Note**: Configuring RUM and Traces makes use of APM paid data in RUM, which may impact your APM billing.

1. Set up [RUM Unity Monitoring][1].

2. Use `DatadogTrackedWebRequest`, a `UnityWebRequest` wrapper intended to be a drop-in replacement for `UnityWebRequest`, to make your network requests. `DatadogTrackedWebRequest` enables Datadog distributed tracing.

3. In your {% ui %}Project Settings{% /ui %}, set {% ui %}First Party Hosts{% /ui %} to the domains that support distributed tracing.

    {% ui %}First Party Hosts{% /ui %} does not allow wildcards, but matches any subdomains for a given domain. For example, `api.example.com` matches `staging.api.example.com` and `prod.api.example.com`, but not `news.example.com`.

4. _(Optional)_ Set {% ui %}Tracing Sampling Rate{% /ui %} in your {% ui %}Project Settings{% /ui %} to keep a defined percentage of the backend traces. This corresponds to the {% ui %}Trace Sample Rate{% /ui %} project setting, a percentage between 0 and 100.

5. _(Optional)_ Set {% ui %}Trace Context Injection{% /ui %} in your {% ui %}Project Settings{% /ui %} to {% ui %}All{% /ui %} or {% ui %}Only Sampled{% /ui %} to control whether trace context is injected into every resource request or only into sampled ones.

[1]: /real_user_monitoring/application_monitoring/unity/setup/
