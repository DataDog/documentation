---
title: Set up App and API Protection for .NET in Kubernetes
code_lang: kubernetes
type: multi-code-lang
code_lang_weight: 20
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
{{% aap/aap_and_api_protection_dotnet_setup_options platform="kubernetes" %}}
{{% aap/aap_and_api_protection_dotnet_overview %}}

## Prerequisites

- Kubernetes cluster
- .NET application containerized with Docker
- kubectl configured to access your cluster
- Helm (recommended for Agent installation)
- Your Datadog API key
- Datadog .NET tracing library (see [version requirements][1])

## 1. Installing the Datadog Agent

Install the Datadog Agent by following the [setup instructions for Kubernetes](/agent/?tab=cloud_and_container).

## 2. Enabling App and API Protection monitoring

{{% aap/aap_and_api_protection_dotnet_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Manually enabling App and API Protection monitoring

Ensure your Dockerfile includes the Datadog .NET library:

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

Update your Kubernetes deployment to include the required environment variables:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-dotnet-app
spec:
  template:
    spec:
      containers:
      - name: your-dotnet-app
        image: your-dotnet-app-image
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
```

{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h4" %}}
To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing variable to false.

Update your Kubernetes deployment to include the required environment variables:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-dotnet-app
spec:
  template:
    spec:
      containers:
      - name: your-dotnet-app
        image: your-dotnet-app-image
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_APM_TRACING_ENABLED
          value: "false"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
```

{{% /collapse-content %}}

## 3. Run your application

Apply your updated deployment:

```bash
kubectl apply -f your-deployment.yaml
```

{{% aap/aap_and_api_protection_verify_setup %}}

## Troubleshooting

If you encounter issues while setting up App and API Protection for your .NET application, see the [.NET App and API Protection troubleshooting guide][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/dotnet/compatibility
[2]: /security/application_security/setup/dotnet/troubleshooting
