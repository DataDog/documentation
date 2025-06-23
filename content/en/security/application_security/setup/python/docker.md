---
title: Setup App and API Protection for Python on Docker
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

{{< partial name="app_and_api_protection/callout.html" >}}

{{< partial name="app_and_api_protection/python/overview.html" >}}

This guide explains how to set up **App and API Protection (AAP)** for **Python** applications running in **Docker containers**. The setup involves:
1. Installing the Datadog Agent
2. Installing the Datadog Python library
3. Configuring your Python application
4. Enabling AAP monitoring

{{% appsec-getstarted %}}

## Setup

### 1. Install and run the Datadog Agent

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

### 2. Update your Datadog Python library package

**Update your Datadog Python library package** to at least version 1.2.2. Run the following:

```shell
pip install --upgrade ddtrace
```

To check that your service's language and framework versions are supported for AAP capabilities, see [Compatibility][1].

### 3. Enable AAP in your Docker container

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

### 4. Start your application with ddtrace-run

Use `ddtrace-run` to start your Python application:

```bash
ddtrace-run python app.py
```

{{% appsec-verify-setup %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/compatibility/python/
