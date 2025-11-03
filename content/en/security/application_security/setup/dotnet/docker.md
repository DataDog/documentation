---
title: Set up App and API Protection for .NET in Docker
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
{{% aap/aap_and_api_protection_dotnet_setup_options platform="docker" %}}
{{% aap/aap_and_api_protection_dotnet_overview %}}

## Prerequisites

- Docker installed on your host
- .NET application containerized with Docker
- Your Datadog API key
- Datadog .NET tracing library (see version requirements [here][1])

## 1. Installing the Datadog Agent

Install the Datadog Agent by following the [Agent setup instructions for Docker][3].

## 2. Enabling App and API Protection monitoring

{{% aap/aap_and_api_protection_dotnet_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Manually enabling App and API Protection monitoring

Add the following lines to download and enable the DataDog tracer to your docker file:

```dockerfile
# Download and install Datadog .NET Tracer
ENV DD_TRACE_VERSION=3.20.0
RUN curl -sSL https://github.com/DataDog/dd-trace-dotnet/releases/download/v${DD_TRACE_VERSION}/datadog-dotnet-apm-${DD_TRACE_VERSION}.linux-x64.tar.gz \
    | tar -xz -C /opt/datadog

# Set environment variables for Datadog automatic instrumentation
ENV CORECLR_ENABLE_PROFILING=1 \
    CORECLR_PROFILER="{846F5F1C-F9AE-4B07-969E-05C26BC060D8}" \
    CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so \
    DD_DOTNET_TRACER_HOME=/opt/datadog \
```

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}

Add the following environment variables to your Dockerfile:

```dockerfile
# Set environment variables
ENV DD_APPSEC_ENABLED=true
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>
```

{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h4" %}}

To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing variable to false.

```dockerfile
# Set environment variables
ENV DD_APPSEC_ENABLED=true
ENV DD_APM_TRACING_ENABLED=false
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>
```
{{% /collapse-content %}}

## 3. Run your application
Build your image and then run your container.

When running your container, ensure you do the following:
1. Connect the container to the same Docker network as the Datadog Agent.
2. Set the required environment variables.

```bash
docker run -d \
  --name your-dotnet-app \
  your-dotnet-app-image
```

{{% aap/aap_and_api_protection_verify_setup %}}

## Troubleshooting

If you encounter issues while setting up App and API Protection for your .NET application, see the [.NET App and API Protection troubleshooting guide][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/dotnet/compatibility
[2]: /security/application_security/setup/dotnet/troubleshooting
[3]: /agent/?tab=cloud_and_container

