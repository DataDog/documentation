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

{{< partial name="api_security/java/callout.html" >}}

{{< partial name="api_security/java/overview.html" >}}

This guide explains how to set up App and API Protection (AAP) for Java applications running in Docker containers. The setup involves:
1. Installing the Datadog Agent
2. Configuring your Java application container
3. Enabling AAP monitoring

## Prerequisites

- Docker installed on your host
- Java application containerized with Docker
- Datadog Agent installed on the host or as a container

# Setup

## 1. Install and run the Datadog Agent

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

### Library setup

To enable AAP capabilities, you need the Datadog Java tracing library (version 0.94.0 or higher) installed in your application environment. Normally, this is done with the run command above, however, if it does not, you can download the agent manually.

#### Download the library

Download the latest version of the Datadog Java library:

```dockerfile
ADD 'https://dtdg.co/latest-java-tracer' /dd-java-agent.jar
```

#### Verify compatibility

To check that your service's language and framework versions are supported for AAP capabilities, see [Single Step Instrumentation Compatibility][2].

### Service configuration

#### Standalone billing alternative

If you want to use Application Security Management without APM tracing functionality, you can deploy with [Standalone App and API Protection][4]. This configuration reduces the amount of APM data sent to Datadog to the minimum required by App and API Protection products.

To enable standalone mode:
1. Set `DD_APM_TRACING_ENABLED=false` environment variable
2. Keep `DD_APPSEC_ENABLED=true` environment variable
3. This configuration will minimize APM data while maintaining full security monitoring capabilities

#### Enabling AAP

##### Run your application with AAP enabled

Start your Java application with the Datadog agent and AAP enabled:

```dockerfile
ENTRYPOINT ["java", "-javaagent:/dd-java-agent.jar", "-Ddd.appsec.enabled=true", "-Ddd.service=<MY_SERVICE>", "-Ddd.env=<MY_ENV>", "-jar", "/app.jar"]
```

**Important considerations:**
- **File system requirements**: Read-only file systems are not currently supported. The application must have access to a writable `/tmp` directory.
- **Service identification**: Always specify `DD_SERVICE` (or `-Ddd.service`) and `DD_ENV` (or `-Ddd.env`) for proper service identification in Datadog.

## 2. Configure your Java application container

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

## 3. Run your container

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

### Verify setup

To verify that AAP is working correctly:

1. Send some traffic to your application
2. Check the [Application Signals Explorer][2] in Datadog
3. Look for security signals and vulnerabilities

## Troubleshooting

If you encounter issues while setting up App and API Protection for your Java application, see the [Java App and API Protection troubleshooting guide][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=docker
[2]: https://app.datadoghq.com/security/appsec
[3]: /security/application_security/setup/java/troubleshooting
[4]: /security/application_security/setup/java/standalone
