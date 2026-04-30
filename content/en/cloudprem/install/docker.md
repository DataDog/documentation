---
title: Install BYOC Logs locally with Docker
description: Learn how to get started with BYOC Logs locally using Docker or Docker Compose
further_reading:
- link: "/cloudprem/ingest/"
  tag: "Documentation"
  text: "Configure Log Ingestion"
- link: "/cloudprem/configure/"
  tag: "Documentation"
  text: "Configure BYOC Logs"
---


{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="BYOC Logs is in Preview" >}}
  Join the BYOC Logs Preview to access new self-hosted log management features.
{{< /callout >}}

## Overview

<div class="alert alert-warning">
<strong>This installation method is for local evaluation only.</strong> Docker is not supported for production deployments. For production workloads, deploy BYOC Logs on a <a href="/cloudprem/install/">supported Kubernetes platform</a> (EKS, GKE, AKS, or self-managed Kubernetes).
</div>

This installation guide shows you how to run Datadog BYOC Logs locally using either standalone Docker containers or Docker Compose. Follow these steps to deploy a minimal BYOC Logs environment on your machine, ideal for exploring BYOC Logs features and testing log ingestion with Datadog.

## Prerequisites

Before getting started with BYOC Logs, ensure you have:

- A **Datadog account** with the BYOC Logs feature enabled.
- **API credentials**: Have your [Datadog API key][2] ready.
- **Docker**: [Docker][4] installed and running on your machine.
- **Docker Compose** (optional): [Docker Compose][5] for a single command line setup.

## Installation steps

Choose one of the following installation methods:

1. **Standalone Docker containers**: Minimal setup for testing
2. **Docker Compose**: Single command line to run BYOC Logs and Datadog agent

{{< tabs >}}
{{% tab "Standalone Docker setup" %}}

This method uses individual Docker containers for a minimal BYOC Logs setup.

Export your Datadog credentials as environment variables:

```shell
export DD_SITE="datadoghq.com"  # or your specific Datadog site
export DD_API_KEY="your_datadog_api_key"
```

### Step 1: Start BYOC Logs

Create the data directory and start the BYOC Logs container:

```shell
# Start BYOC Logs
docker run -d \
  --name byoc-logs \
  -v $(pwd)/qwdata:/quickwit/qwdata \
  -e DD_SITE=${DD_SITE} \
  -e DD_API_KEY=${DD_API_KEY} \
  -p 127.0.0.1:7280:7280 \
  datadog/cloudprem run
```

### Step 2: Start the Datadog Agent

To collect logs from your local containers and send them to BYOC Logs, start the Datadog Agent:

```shell
docker run \
  --name dd-agent \
  -e DD_API_KEY=${DD_API_KEY} \
  -e DD_SITE=${DD_SITE} \
  -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
  -e DD_ENV=dev \
  -e DD_LOGS_ENABLED=true \
  -e DD_LOGS_CONFIG_LOGS_DD_URL=http://host.docker.internal:7280 \
  -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
  -e DD_CONTAINER_EXCLUDE="name:dd-agent" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
  registry.datadoghq.com/agent:latest
```
{{% /tab %}}

{{% tab "Docker Compose setup" %}}

This method provides a BYOC Logs setup with the Datadog Agent integration.

### Step 1: Create the Docker Compose file

Create a `docker-compose.yml` file in your working directory:

```yaml
services:
  byoc-logs:
    image: datadog/cloudprem:edge
    command: ["run"]
    ports:
      - "127.0.0.1:7280:7280"
    environment:
      - DD_SITE=${DD_SITE:-datadoghq.com}
      - DD_API_KEY=${DD_API_KEY}
    volumes:
      - ./qwdata:/quickwit/qwdata
    restart: unless-stopped

  datadog-agent:
    image: registry.datadoghq.com/agent:latest
    environment:
      - DD_API_KEY=${DD_API_KEY}
      - DD_SITE=${DD_SITE:-datadoghq.com}
      - DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true
      - DD_LOGS_ENABLED=true
      - DD_LOGS_CONFIG_LOGS_DD_URL=http://byoc-logs:7280
      - DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true
      - DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION=100000
      - DD_CONTAINER_EXCLUDE="name:datadog-agent"
      - DD_ENV=dev
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /proc/:/host/proc/:ro
      - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
    depends_on:
      byoc-logs:
        condition: service_healthy
    restart: unless-stopped
```

The Docker Compose setup:
1. Starts BYOC Logs and waits for it to be healthy.
2. Starts the Datadog Agent to collect container logs.

### Step 2: Set environment variables

Create a `.env` file in the same directory:

```shell
DD_SITE=datadoghq.com
DD_API_KEY=your_datadog_api_key
```

### Step 3: Start docker compose

```shell
docker compose up -d
```
{{% /tab %}}
{{< /tabs >}}

## Next steps

After starting BYOC Logs with either method, verify that the installation is working correctly:

### Check BYOC Logs status

**Verify BYOC Logs is running**:

```shell
curl http://localhost:7280/api/v1/version
```

You should see a response with version information.

### Send a log

In your terminal, send a "Hello World" log entry directly to your local BYOC Logs instance using the API:

```shell
curl -X POST "http://localhost:7280/api/v2/logs" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d '[
    {
      "message": "Hello world from BYOC Logs",
      "level": "info",
      "service": "demo"
    }
  ]'
```

### Search your local logs from the Log Explorer

After verifying that BYOC Logs is running, you can search and analyze your logs in the Logs Explorer by searching into the `cloudprem` index!

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.docker.com/get-docker/
[5]: https://docs.docker.com/compose/install/
