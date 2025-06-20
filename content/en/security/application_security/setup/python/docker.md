---
title: Setup App and API Protection for Python on Docker
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

This guide explains how to set up App and API Protection (AAP) for Python applications running in Docker containers. The setup involves:
1. Installing the Datadog Python library
2. Configuring your Python application
3. Enabling AAP monitoring

## Prerequisites

- Docker environment
- Python application
- Datadog Agent installed

## Setup

### 1. Update your Datadog Python library package

Update your `ddtrace` package to at least version 1.2.2:

```shell
pip install --upgrade ddtrace
```

### 2. Enable AAP in your Docker container

You can enable AAP using one of the following methods:

#### Option A: Docker CLI

Add the environment variable to your `docker run` command:

```shell
docker run [...] -e DD_APPSEC_ENABLED=true [...]
```

#### Option B: Dockerfile

Add the environment variable to your Dockerfile:

```dockerfile
ENV DD_APPSEC_ENABLED=true
```

#### Option C: Docker Compose

Add the environment variable to your `docker-compose.yml`:

```yaml
version: '3'
services:
  app:
    image: your-python-app
    environment:
      - DD_APPSEC_ENABLED=true
```

### 3. Start your application with ddtrace-run

Use `ddtrace-run` to start your Python application:

```bash
ddtrace-run python app.py
```

### 4. Configure service identification

Set the following environment variables for proper service identification:

```bash
DD_SERVICE=your-service-name
DD_ENV=your-environment
```

## Verify setup

To verify that AAP is working correctly:

1. Send some traffic to your application
2. Check the [Application Signals Explorer][1] in Datadog
3. Look for security signals and vulnerabilities

## Troubleshooting

If you encounter issues while setting up App and API Protection for your Python application, see the [Python App and API Protection troubleshooting guide][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec
[2]: /security/application_security/setup/python/troubleshooting 