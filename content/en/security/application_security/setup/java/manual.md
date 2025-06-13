---
title: Manual Setup for Java
code_lang: java
type: multi-code-lang
code_lang_weight: 0
aliases:
  - /security_platform/application_security/getting_started/java
  - /security/application_security/getting_started/java
  - /security/application_security/threats/setup/threat_detection/java
  - /security/application_security/threats_detection/java
further_reading:
- link: "/security/application_security/add-user-info/"
  tag: "Documentation"
  text: "Adding user information to traces"
- link: 'https://github.com/DataDog/dd-trace-java'
  tag: "Source Code"
  text: 'Java Datadog library source code'
- link: "/security/default_rules/?category=cat-application-security"
  tag: "Documentation"
  text: "OOTB App and API Protection Rules"
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting App and API Protection"
---

{{< callout btn_hidden="true" header="Shortcut options before manual setup:" >}}
**Single Step APM Instrumentation**: For faster setup with automatic instrumentation, consider using [Single Step APM Instrumentation][1] which automatically installs the Datadog SDK with no additional configuration required.

Once SSI is set up, you can enable App and API Protection by going to your APM service in the Datadog app → Service Configuration section → Enable Application Security Monitoring.
{{< /callout >}}

## Overview

Datadog Application Security Management (ASM) provides App and API Protection (AAP) capabilities including:
- **Application Security Monitoring**: Real-time threat detection and protection against attacks like SQL injection, XSS, and more
- **Software Composition Analysis (SCA)**: Identification of vulnerable dependencies in your codebase
- **Interactive Application Security Testing (IAST)**: Runtime vulnerability detection during testing

ASM works by leveraging the Datadog Java tracing library to monitor HTTP requests, analyze patterns, and detect security threats in real-time. The library integrates seamlessly with your existing application without requiring code changes.

For detailed compatibility information, including supported Java versions, frameworks, and deployment environments, see [Single Step Instrumentation Compatibility][2].

## Agent setup

Before enabling AAP for your Java applications, ensure you have the Datadog Agent installed and configured. The Agent collects and forwards security telemetry from your applications to Datadog.

**[Install or update the Datadog Agent][3]** to the latest version. AAP requires Agent version 7.41.1 or higher for optimal performance and feature support.

## Library setup

To enable AAP capabilities, you need the Datadog Java tracing library (version 0.94.0 or higher) installed in your application environment.

### Download the library

Download the latest version of the Datadog Java library:

{{< tabs >}}
{{% tab "Wget" %}}
```shell
wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
```
{{% /tab %}}
{{% tab "cURL" %}}
```shell
curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
```
{{% /tab %}}
{{% tab "Dockerfile" %}}
```dockerfile
ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar
```
{{% /tab %}}
{{< /tabs >}}

### Verify compatibility

To check that your service's language and framework versions are supported for AAP capabilities, see [Single Step Instrumentation Compatibility][2].

## Service configuration

### Standalone billing alternative

If you want to use Application Security Management without APM tracing functionality, you can deploy with [Standalone App and API Protection][4]. This configuration reduces the amount of APM data sent to Datadog to the minimum required by App and API Protection products.

To enable standalone mode:
1. Set `DD_APM_TRACING_ENABLED=false` environment variable
2. Keep `DD_APPSEC_ENABLED=true` environment variable
3. This configuration will minimize APM data while maintaining full security monitoring capabilities

## Enabling AAP

### Run your application with AAP enabled

Start your Java application with the Datadog agent and AAP enabled:

**From the command line:**
```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.enabled=true -Ddd.service=<MY_SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
```

**Important considerations:**
- **File system requirements**: Read-only file systems are not currently supported. The application must have access to a writable `/tmp` directory.
- **Service identification**: Always specify `DD_SERVICE` (or `-Ddd.service`) and `DD_ENV` (or `-Ddd.env`) for proper service identification in Datadog.

### Verify AAP is working

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

If you need additional assistance, contact [Datadog support][5].

## Troubleshooting

If you encounter issues while setting up App and API Protection for your Java application, check the following common problems and solutions:

### No security signals appearing

1. **Verify Agent version**
   - Ensure you're running Datadog Agent v7.41.1 or higher
   - Check Agent status: `datadog-agent status`

2. **Check Java tracer version**
   - Confirm you're using Java tracer v0.94.0 or higher
   - Verify the tracer is loaded: `java -javaagent:/path/to/dd-java-agent.jar -version`

3. **Verify environment variables**
   - Ensure `DD_APPSEC_ENABLED=true` is set
   - Check `DD_SERVICE` and `DD_ENV` are properly configured
   - Verify `DD_APM_ENABLED=true` if using APM features

4. **Check file system permissions**
   - Ensure the application has write access to `/tmp`
   - Verify the Java agent JAR is readable

### Application fails to start

1. **Check Java agent path**
   - Verify the path to `dd-java-agent.jar` is correct
   - Ensure the JAR file exists and is readable

2. **Memory issues**
   - If you see `OutOfMemoryError`, increase the JVM heap size
   - Add `-Xmx` parameter to your Java command

3. **Class loading errors**
   - Check for conflicts with other Java agents
   - Verify Java version compatibility

### Performance impact

1. **High latency**
   - Check Agent resource usage
   - Verify network connectivity between Agent and Datadog
   - Consider adjusting sampling rates

2. **High memory usage**
   - Monitor JVM memory usage
   - Adjust Agent resource limits if needed

### Still having issues?

If you're still experiencing problems:
1. Check the [Application Security Monitoring troubleshooting guide][5]
2. Review the [Java tracer documentation][6]
3. Contact [Datadog support][7]

[5]: /security/application_security/troubleshooting
[6]: /tracing/trace_collection/compatibility_requirements/java
[7]: /help

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=
[2]: https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/?tab=java#tracer-libraries
[3]: https://app.datadoghq.com/fleet/install-agent/latest?platform=overview
[4]: /security/application_security/guide/standalone_application_security/
[5]: /help 