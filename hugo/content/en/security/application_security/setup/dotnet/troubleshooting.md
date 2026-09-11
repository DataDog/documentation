---
title: Troubleshooting .NET App and API Protection
---

{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection is in Preview on Datadog Government site US1-FED.
</div>
{{< /site-region >}}

## Common Issues

### No Security Signals appear

1. Verify Agent version:
    - Confirm you're running Datadog Agent v7.41.1 or higher.
    - Check Agent status: `datadog-agent status`.
2. Check .NET tracer version:
    - Confirm you're using .NET tracer v2.42.0 or higher.
3. Verify environment variables:
    - Confirm `DD_APPSEC_ENABLED=true` is set.
    - Check `DD_SERVICE` and `DD_ENV` are properly configured.
    - Verify `DD_APM_ENABLED=true` if using APM features.
4. Check file system permissions:
    - Verify the Datadog .NET tracer installation directory exists and that the native tracer library is readable.
    - Verify the tracer log directory is writable (`/var/log/datadog/dotnet/` on Linux or `%PROGRAMDATA%\Datadog .NET Tracer\logs\` on Windows).

### Application fails to start

1. Check logs for errors:
    - Logs are located at
        - Linux: `/var/log/datadog/dotnet/`
        - Windows: `%PROGRAMDATA%\Datadog .NET Tracer\logs\`

### Performance impact

1. High latency:
    - Check Agent resource usage.
    - Verify network connectivity between Agent and Datadog.
    - Consider adjusting sampling rates.
2. High memory usage:
    - Monitor memory usage.
    - Adjust Agent resource limits if needed

### Still having issues?

If you're still experiencing problems:

1. Check the [Application Security Monitoring troubleshooting guide][1]
2. Review the [.NET tracer documentation][2]
3. Contact [Datadog support][3]

[1]: /security/application_security/troubleshooting
[2]: /tracing/trace_collection/compatibility/dotnet-core
[3]: /help
