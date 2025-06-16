---
title: Setup App and API Protection for Java in Kubernetes
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

This guide explains how to set up App and API Protection (AAP) for Java applications running in Kubernetes. The setup involves:
1. Installing the Datadog Agent
2. Configuring your Java application deployment
3. Enabling AAP monitoring

## Prerequisites

- Kubernetes cluster
- Java application containerized with Docker
- kubectl configured to access your cluster
- Helm (recommended for Agent installation)

## Setup

### 1. Install the Datadog Agent

Install the Datadog Agent using Helm:

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm install datadog -f values.yaml datadog/datadog
```

Create a `values.yaml` file with the following configuration:

```yaml
datadog:
  apiKey: <YOUR_API_KEY>
  appKey: <YOUR_APP_KEY>
  site: <YOUR_DD_SITE>
  apm:
    portEnabled: true
  logs:
    enabled: true
    containerCollectAll: true
  processAgent:
    enabled: true
  securityAgent:
    compliance:
      enabled: true
    runtime:
      enabled: true
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

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-java-app
spec:
  template:
    spec:
      containers:
      - name: your-java-app
        image: your-java-app-image
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
        command: ["java"]
        args: ["-javaagent:/dd-java-agent.jar", "-jar", "/app.jar"]
```

**Important considerations:**
- **File system requirements**: Read-only file systems are not currently supported. The application must have access to a writable `/tmp` directory.
- **Service identification**: Always specify `DD_SERVICE` (or `-Ddd.service`) and `DD_ENV` (or `-Ddd.env`) for proper service identification in Datadog.

### 2. Configure your Java application

#### Add the Java agent to your container

Add the following to your Dockerfile:

```dockerfile
# Download the Datadog Java agent
ADD 'https://dtdg.co/latest-java-tracer' /dd-java-agent.jar

# Set environment variables
ENV DD_APPSEC_ENABLED=true
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>
```

#### Update your Kubernetes deployment

Modify your deployment YAML to include the Java agent:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-java-app
spec:
  template:
    spec:
      containers:
      - name: your-java-app
        image: your-java-app-image
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_SERVICE
          value: "<YOUR_SERVICE_NAME>"
        - name: DD_ENV
          value: "<YOUR_ENVIRONMENT>"
        command: ["java"]
        args: ["-javaagent:/dd-java-agent.jar", "-jar", "/app.jar"]
```

### 3. Deploy your application

Apply your updated deployment:

```bash
kubectl apply -f your-deployment.yaml
```

## Verify setup

To verify that AAP is working correctly:

1. Send some traffic to your application
2. Check the [Application Signals Explorer][2] in Datadog
3. Look for security signals and vulnerabilities

## Troubleshooting

If you encounter issues while setting up App and API Protection for your Java application, see the [Java App and API Protection troubleshooting guide][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=kubernetes
[2]: https://app.datadoghq.com/security/appsec
[3]: /security/application_security/setup/java/troubleshooting
[4]: https://docs.datadoghq.com/security/application_security/standalone/
