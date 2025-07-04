---
title: Troubleshooting Ruby App and API Protection
---

## Common Issues

### No security signals appearing

1. **Verify Agent version**
   - Ensure you're running Datadog Agent v7.41.1 or higher
   - Check Agent status: `datadog-agent status`

2. **Check Ruby tracer version**
   - Confirm you're using Ruby tracer v1.9.0 or higher

3. **Verify environment variables**
   - Ensure `DD_APPSEC_ENABLED=true` is set
   - Check `DD_SERVICE` and `DD_ENV` are properly configured
   - Verify `DD_APM_ENABLED=true` if using APM features

### Performance impact

1. **High latency**
   - Check Agent resource usage
   - Verify network connectivity between Agent and Datadog
   - Consider adjusting sampling rates

2. **High memory usage**
   - Adjust Agent resource limits if needed

### Still having issues?

If you're still experiencing problems:

1. Check the [Application Security Monitoring troubleshooting guide][1]
2. Review the [Ruby tracer documentation][2]
3. Contact [Datadog support][3]

[1]: /security/application_security/troubleshooting
[2]: /tracing/trace_collection/compatibility/ruby
[3]: /help
