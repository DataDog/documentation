---
title: Setup App and API Protection for Python on Kubernetes
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

{{< partial name="app_and_api_protection/callout.html" >}}

{{< partial name="app_and_api_protection/python/overview.html" >}}

This guide explains how to set up App and API Protection (AAP) for Python applications running on Kubernetes. The setup involves:
1. Installing the Datadog Agent
2. Installing the Datadog Python library
3. Configuring your Python application
4. Enabling AAP monitoring

{{% appsec-getstarted %}}

## Operating System Prerequisites

- Kubernetes cluster
- kubectl configured

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

### 2. Update your Datadog Python library package

**Update your Datadog Python library package** to at least version 1.2.2. Run the following:

```shell
pip install --upgrade ddtrace
```

To check that your service's language and framework versions are supported for AAP capabilities, see [Compatibility][1].

### 3. Enable AAP in your Kubernetes deployment

Add the `DD_APPSEC_ENABLED` environment variable to your deployment YAML:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-python-app
spec:
  template:
    spec:
      containers:
        - name: app
          image: your-python-app:latest
          env:
            - name: DD_APPSEC_ENABLED
              value: "true"
            - name: DD_SERVICE
              value: "your-service-name"
            - name: DD_ENV
              value: "your-environment"
```

### 4. Start your application with ddtrace-run

Use `ddtrace-run` to start your Python application. Update your container's command:

```yaml
containers:
  - name: app
    image: your-python-app:latest
    command: ["ddtrace-run"]
    args: ["python", "app.py"]
    env:
      - name: DD_APPSEC_ENABLED
        value: "true"
```

{{% appsec-verify-setup %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/compatibility/python/
