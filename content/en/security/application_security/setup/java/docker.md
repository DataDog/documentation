---
title: Setup App and API Protection for Java in Docker
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

{{< callout btn_hidden="true" header="Shortcut options before manual setup:" >}}
**Single Step APM Instrumentation**: For faster setup with automatic instrumentation, consider using [Single Step APM Instrumentation][1] which automatically installs the Datadog SDK with no additional configuration required.

Once SSI is set up, you can enable App and API Protection by going to your APM service in the Datadog app → Service Configuration section → Enable Application Security Monitoring.
{{< /callout >}}

## Overview

Datadog Application Security Management (ASM) provides App and API Protection (AAP) capabilities including:
- **Application Security Monitoring**: Real-time threat detection and protection against attacks like SQL injection, XSS, and more
- **Software Composition Analysis (SCA)**: Identification of vulnerable dependencies in your codebase
- **Interactive Application Security Testing (IAST)**: Runtime vulnerability detection during testing

ASM works by leveraging the Datadog Java tracing library to monitor HTTP requests, analyze patterns, and detect security threats in real-time. The library integrates seamlessly with your existing containerized application without requiring code changes.

For detailed compatibility information, including supported Java versions, frameworks, and deployment environments, see [Single Step Instrumentation Compatibility][2].

This guide explains how to set up App and API Protection (AAP) for Java applications running in Docker containers. The setup involves:
1. Installing the Datadog Agent
2. Configuring your Java application container
3. Enabling AAP monitoring

## Prerequisites

- Docker installed on your host
- Java application containerized with Docker
- Datadog Agent installed on the host or as a container

## Setup

### 1. Install the Datadog Agent

If you haven't already, install the Datadog Agent on your host or as a container. For containerized installation:

```bash
docker run -d --name datadog-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -e DD_API_KEY=<YOUR_API_KEY> \
  -e DD_APM_ENABLED=true \
  -e DD_APM_NON_LOCAL_TRAFFIC=true \
  datadog/agent:latest
```

## Library setup

To enable AAP capabilities, you need the Datadog Java tracing library (version 0.94.0 or higher) installed in your application environment.

### Download the library

Download the latest version of the Datadog Java library:

```dockerfile
ADD 'https://dtdg.co/latest-java-tracer' /dd-java-agent.jar
```

### Verify compatibility

To check that your service's language and framework versions are supported for AAP capabilities, see [Single Step Instrumentation Compatibility][2].

## Service configuration

### Standalone billing alternative

If you want to use Application Security Management without APM tracing functionality, you can deploy with [Standalone App and API Protection][4]. This configuration reduces the amount of APM data sent to Datadog to the minimum required by App and API Protection products.

To enable standalone mode:
1. Set `DD_APM_TRACING_ENABLED=false` environment variable
2. Keep `DD_APPSEC_ENABLED=true` environment variable
3. This configuration will minimize APM data while maintaining full security monitoring capabilities

### Enabling AAP

#### Run your application with AAP enabled

Start your Java application with the Datadog agent and AAP enabled:

```dockerfile
ENTRYPOINT ["java", "-javaagent:/dd-java-agent.jar", "-Ddd.appsec.enabled=true", "-Ddd.service=<MY_SERVICE>", "-Ddd.env=<MY_ENV>", "-jar", "/app.jar"]
```

**Important considerations:**
- **File system requirements**: Read-only file systems are not currently supported. The application must have access to a writable `/tmp` directory.
- **Service identification**: Always specify `DD_SERVICE` (or `-Ddd.service`) and `DD_ENV` (or `-Ddd.env`) for proper service identification in Datadog.

### 2. Configure your Java application container

Add the following to your Dockerfile:

```dockerfile
# Download the Datadog Java agent
ADD 'https://dtdg.co/latest-java-tracer' /dd-java-agent.jar

# Set environment variables
ENV DD_APPSEC_ENABLED=true
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>

# Add the Java agent to your application's startup command
ENTRYPOINT ["java", "-javaagent:/dd-java-agent.jar", "-jar", "/app.jar"]
```

### 3. Run your container

When running your container, make sure to:
1. Connect it to the same Docker network as the Datadog Agent
2. Set the required environment variables

```bash
docker run -d \
  --name your-java-app \
  --network datadog-network \
  -e DD_APPSEC_ENABLED=true \
  -e DD_SERVICE=<YOUR_SERVICE_NAME> \
  -e DD_ENV=<YOUR_ENVIRONMENT> \
  your-java-app-image
```

## Verify setup

To verify that AAP is working correctly:

1. Send some traffic to your application
2. Check the [Application Signals Explorer][2] in Datadog
3. Look for security signals and vulnerabilities

## Troubleshooting

If you don't see data in Datadog:
1. Verify the Datadog Agent is running:
   ```bash
   docker ps | grep datadog-agent
   ```
2. Check container logs:
   ```bash
   docker logs datadog-agent
   docker logs your-java-app
   ```
3. Ensure environment variables are set correctly
4. Verify network connectivity between containers

Common issues:
- **Agent not running**: Check container status
- **Network issues**: Verify Docker network configuration
- **Volume mounts**: Check volume permissions
- **Memory limits**: Monitor container resource usage
- **Java agent path**: Verify the agent JAR is accessible

For more detailed troubleshooting, see the [Troubleshooting guide][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=
[2]: https://app.datadoghq.com/security/appsec
[3]: /security/application_security/troubleshooting
[4]: /security/application_security/setup/java/standalone 