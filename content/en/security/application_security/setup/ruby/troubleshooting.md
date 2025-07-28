---
title: Troubleshooting Ruby App and API Protection
---

## Common Issues

### No security signals appearing

1. Verify Agent version:
   - Ensure you're running Datadog Agent v7.41.1 or higher.
   - Check Agent status: `datadog-agent status`.
2. Check Ruby tracer version:
   - Confirm you're using Ruby tracer v1.9.0 or higher.
3. Verify configuration or environment variables.

#### When using auto-instrumentation

- Ensure that `DD_APPSEC_ENABLED` is set to `true`
- Set `DD_AGENT_HOST` and `DD_AGENT_PORT` if agent is running on a different host or port
- Check that `DD_SERVICE` and `DD_ENV` are properly configured
- Verify `DD_APM_TRACING_ENABLED=true` if using APM features

#### When using configuration file

- Ensure that `c.appsec.enabled` is set to `true` in your configuration
- Ensure that `c.tracing.instrument :rails` and `c.appsec.instrument :rails` is added to your configuration
- Check that `c.service` is set
- Verify that `c.tracing.enabled` is set to `true` if using APM features

### Performance impact

1. High latency:
   - Check Agent resource usage.
   - Verify network connectivity between Agent and Datadog.
   - Consider adjusting sampling rates.

2. High memory usage:
   - Adjust Agent resource limits if needed.

If you suspect performance issues with the Ruby tracer, please create an issue in the [Datadog Ruby tracer GitHub repository][4] with details about your environment and the issue you're facing.

### Still having issues?

If you're still experiencing problems:

1. Check the [Application Security Monitoring troubleshooting guide][1].
2. Review the [Ruby tracer documentation][2].
3. Contact [Datadog support][3].

[1]: /security/application_security/troubleshooting
[2]: /tracing/trace_collection/compatibility/ruby
[3]: /help
[4]: https://github.com/DataDog/dd-trace-rb
