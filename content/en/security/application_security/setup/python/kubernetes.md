---
title: Setup App and API Protection for Python on Kubernetes
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

{{< partial name="api_security/callout.html" >}}

{{< partial name="api_security/python/overview.html" >}}

This guide explains how to set up App and API Protection (AAP) for Python applications running on Kubernetes. The setup involves:
1. Installing the Datadog Python library
2. Configuring your Python application
3. Enabling AAP monitoring

## Prerequisites

- Kubernetes cluster
- Python application
- Datadog Agent installed
- kubectl configured

## Setup

### 1. Update your Datadog Python library package

Update your `ddtrace` package to at least version 1.2.2:

```shell
pip install --upgrade ddtrace
```

### 2. Enable AAP in your Kubernetes deployment

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

### 3. Start your application with ddtrace-run

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

### 4. Alternative: Using init containers

You can also use an init container to install the ddtrace package:

```yaml
initContainers:
  - name: install-ddtrace
    image: python:3.9
    command: ["pip", "install", "--upgrade", "ddtrace"]
    volumeMounts:
      - name: app-volume
        mountPath: /app
```

## Verify setup

To verify that AAP is working correctly:

1. Deploy your application to Kubernetes
2. Send some traffic to your application
3. Check the [Application Signals Explorer][1] in Datadog
4. Look for security signals and vulnerabilities

## Troubleshooting

If you encounter issues while setting up App and API Protection for your Python application, see the [Python App and API Protection troubleshooting guide][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec
[2]: /security/application_security/setup/python/troubleshooting 