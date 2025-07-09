---
title: Set up App and API Protection for Java in Docker
code_lang: docker
type: multi-code-lang
code_lang_weight: 10
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
{{% app_and_api_protection_java_setup_options platform="docker" %}}

{{% app_and_api_protection_java_overview %}}

## Prerequisites

- Docker installed on your host
- Java application containerized with Docker
- Your Datadog API key
- Datadog Java tracing library (see version requirements [here][1])

## 1. Installing the Datadog Agent

Install the Datadog Agent by following the [setup instructions for Docker](/agent/?tab=cloud_and_container).

## 2. Enabling App and API Protection monitoring

{{% app_and_api_protection_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Manually enabling App and API Protection monitoring

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}
{{< tabs >}}
{{% tab "Using system properties" %}}

Start your Java application with the Datadog agent and App and API Protection enabled using the ENTRYPOINT instruction:

```dockerfile
# Download the Datadog Java tracer
ADD 'https://dtdg.co/latest-java-tracer' /dd-java-agent.jar
ENTRYPOINT ["java", "-javaagent:/dd-java-agent.jar", "-Ddd.appsec.enabled=true", "-Ddd.service=<MY_SERVICE>", "-Ddd.env=<MY_ENV>", "-jar", "/app.jar"]
```

{{% /tab %}}
{{% tab "Using environment variables" %}}

Add the following environment variables to your Dockerfile:

```dockerfile
# Download the Datadog Java tracer
ADD 'https://dtdg.co/latest-java-tracer' /dd-java-agent.jar

# Set environment variables
ENV DD_APPSEC_ENABLED=true
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>

# Add the Java agent to your application's startup command
ENTRYPOINT ["java", "-javaagent:/dd-java-agent.jar", "-jar", "/app.jar"]
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h4" %}}
To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing variable to false.
{{< tabs >}}
{{% tab "Using system properties" %}}

Start your Java application with the Datadog agent and App and API Protection enabled using the ENTRYPOINT instruction:

```dockerfile
# Download the Datadog Java tracer
ADD 'https://dtdg.co/latest-java-tracer' /dd-java-agent.jar
ENTRYPOINT ["java", "-javaagent:/dd-java-agent.jar", "-Ddd.appsec.enabled=true", "-Ddd.apm.tracing.enabled=false", "-Ddd.service=<MY_SERVICE>", "-Ddd.env=<MY_ENV>", "-jar", "/app.jar"]
```

{{% /tab %}}
{{% tab "Using environment variables" %}}

Add the following environment variables to your Dockerfile:

```dockerfile
# Download the Datadog Java tracer
ADD 'https://dtdg.co/latest-java-tracer' /dd-java-agent.jar

# Set environment variables
ENV DD_APPSEC_ENABLED=true
ENV DD_APM_TRACING_ENABLED=false
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>

# Add the Java agent to your application's startup command
ENTRYPOINT ["java", "-javaagent:/dd-java-agent.jar", "-jar", "/app.jar"]
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## 3. Run your application
Build your image and then run your container.

When running your container, ensure you do the following:
1. Connect the container to the same Docker network as the Datadog Agent.
2. Set the required environment variables.

```bash
docker run -d \
  --name your-java-app \
  your-java-app-image
```

{{% app_and_api_protection_verify_setup %}}

## Troubleshooting

If you encounter issues while setting up App and API Protection for your Java application, see the [Java App and API Protection troubleshooting guide][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/java/compatibility
[2]: /security/application_security/setup/java/troubleshooting

