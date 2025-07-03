---
title: Python App and API Protection Troubleshooting
further_reading:
  - link: "/security/application_security/how-it-works/"
    tag: "Documentation"
    text: "How App and API Protection Works"
  - link: "/security/default_rules/?category=cat-application-security"
    tag: "Documentation"
    text: "OOTB App and API Protection Rules"
  - link: "/security/application_security/troubleshooting"
    tag: "Documentation"
    text: "Troubleshooting App and API Protection"
---

{{< partial name="app_and_api_protection/callout.html" >}}

{{< partial name="app_and_api_protection/python/overview.html" >}}

This guide helps you troubleshoot common issues with Python App and API Protection (AAP).

## Common Issues

### AAP not enabled

**Symptoms:** No security signals appearing in Datadog

**Solution:** Ensure the `DD_APPSEC_ENABLED=true` environment variable is set:

```bash
export DD_APPSEC_ENABLED=true
ddtrace-run python app.py
```

### ddtrace version too old

**Symptoms:** AAP features not working

**Solution:** Update to ddtrace version 1.2.2 or higher:

```bash
pip install --upgrade ddtrace
```

### Service not identified

**Symptoms:** Service appears as "unnamed-service" in Datadog

**Solution:** Set the `DD_SERVICE` environment variable:

```bash
export DD_SERVICE=your-service-name
export DD_ENV=your-environment
ddtrace-run python app.py
```

### Permission issues

**Symptoms:** Application fails to start or AAP doesn't work

**Solution:** Ensure proper file permissions and that the application can write to `/tmp`:

```bash
chmod 755 /path/to/your/app
```

### Framework not supported

**Symptoms:** AAP works but some features are missing

**Solution:** Check the [compatibility guide][1] for supported frameworks and versions.

## Debug Mode

Enable debug logging to get more information:

```bash
export DD_TRACE_DEBUG=true
export DD_APPSEC_ENABLED=true
ddtrace-run python app.py
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /security/application_security/setup/compatibility/python/
