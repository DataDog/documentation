---
title: Troubleshooting Java App and API Protection
---

## Common Issues

### No security signals appearing

1. Verify Agent version:
   - Ensure you're running Datadog Agent v7.41.1 or higher.
   - Check Agent status: `datadog-agent status`.
2. Check Java tracer version:
   - Confirm you're using Java tracer v0.94.0 or higher.
   - Verify the tracer is loaded: `java -javaagent:/path/to/dd-java-agent.jar -version`.
3. Verify environment variables:
   - Ensure `DD_APPSEC_ENABLED=true` is set.
   - Check `DD_SERVICE` and `DD_ENV` are properly configured.
   - Verify `DD_APM_ENABLED=true` if using APM features.
4. Check file system permissions:
   - Ensure the application has write access to `/tmp`.
   - Verify the Java agent JAR is readable.

### Application fails to start

1. Check Java agent path:
   - Verify the path to `dd-java-agent.jar` is correct.
   - Ensure the JAR file exists and is readable.
2. Memory issues:
   - If you see `OutOfMemoryError`, increase the JVM heap size.
   - Add `-Xmx` parameter to your Java command.
3. Class loading errors:
   - Check for conflicts with other Java agents.
   - Verify Java version compatibility.

### Performance impact

1. High latency:
   - Check Agent resource usage.
   - Verify network connectivity between Agent and Datadog.
   - Consider adjusting sampling rates.
2. High memory usage:
   - Monitor JVM memory usage.
   - Adjust Agent resource limits if needed

### Still having issues?

If you're still experiencing problems:
1. Check the [Application Security Monitoring troubleshooting guide][1]
2. Review the [Java tracer documentation][2]
3. Contact [Datadog support][3]

[1]: /security/application_security/troubleshooting
[2]: /tracing/trace_collection/compatibility/java
[3]: /help
