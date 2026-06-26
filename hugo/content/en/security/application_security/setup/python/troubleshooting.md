---
title: Troubleshooting Python App and API Protection
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

## Common Issues

### No security signals appearing

1. **Verify Agent version**
   - Ensure you're running Datadog Agent v7.41.1 or higher
   - Check Agent status: `datadog-agent status`

2. **Check Python tracer version**
   - Confirm you're using Python tracer v2.21 or a recent version on v3.0.0
   - Check version: `python -c "import ddtrace; print(ddtrace.__version__)"`

3. **Verify environment variables**
   - Ensure `DD_APPSEC_ENABLED=true` is set
   - Check `DD_SERVICE` and `DD_ENV` are properly configured
   - Verify `DD_APM_ENABLED=true` if using APM features

### Application fails to start

1. **Check ddtrace installation**
   - Verify ddtrace is installed: `pip show ddtrace`
   - Install with security extras: `pip install ddtrace`

2. **Import errors**
   - Ensure all required dependencies are installed
   - Check for conflicting packages

3. **Environment variable issues**
   - Verify environment variables are set correctly
   - Check for typos in variable names

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

### Still having issues?

If you're still experiencing problems:
1. Check the [Application Security Monitoring troubleshooting guide][2]
2. Review the [Python tracer documentation][3]
3. Contact [Datadog support][4]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/python/compatibility
[2]: /security/application_security/troubleshooting
[3]: /tracing/trace_collection/compatibility/python
[4]: /help
