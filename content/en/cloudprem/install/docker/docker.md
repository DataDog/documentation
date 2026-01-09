---
title: Install CloudPrem locally with Docker
description: Learn how to get started with CloudPrem locally using Docker or Docker Compose
further_reading:
- link: "/cloudprem/ingest_logs/"
  tag: "Documentation"
  text: "Configure Log Ingestion"
- link: "/cloudprem/configure/"
  tag: "Documentation"
  text: "Configure CloudPrem"
---


{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Overview

This installation guide shows you how to run Datadog CloudPrem locally using either standalone Docker containers or Docker Compose. Follow these steps to deploy a minimal CloudPrem environment on your machine, ideal for exploring CloudPrem features and testing log ingestion with Datadog before deploying to production.

## Prerequisites

Before getting started with CloudPrem, ensure you have:

- A **Datadog account** with the CloudPrem feature enabled.
- **API credentials**: Have your [Datadog API key][2] ready.
- **Docker**: [Docker][4] installed and running on your machine.
- **Docker Compose** (optional): [Docker Compose][5] for a single command line setup.

## Installation steps

Choose one of the following installation methods:

1. **Standalone Docker containers**: Minimal setup for testing
2. **Docker Compose**: Single command line to run CloudPrem and Datadog agent

{{< tabs >}}
{{% tab "Standalone Docker setup" %}}

This method uses individual Docker containers for a minimal CloudPrem setup.

Export your Datadog credentials as environment variables:

```shell
export DD_SITE="datadoghq.com"  # or your specific Datadog site
export DD_API_KEY="your_datadog_api_key"
```

### Step 1: Start CloudPrem

Create the data directory and start the CloudPrem container:

```shell
# Start CloudPrem
docker run -d \
  --name cloudprem \
  -v $(pwd)/qwdata:/quickwit/qwdata \
  -e DD_SITE=${DD_SITE} \
  -e DD_API_KEY=${DD_API_KEY} \
  -p 127.0.0.1:7280:7280 \
  datadog/cloudprem run
```

### Step 2: Start the Datadog Agent

To collect logs from your local containers and send them to CloudPrem, start the Datadog Agent:

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
  gcr.io/datadoghq/agent:latest
```
{{% /tab %}}

{{% tab "Docker Compose setup" %}}

This method provides a CloudPrem setup with the Datadog Agent integration.

### Step 1: Create the Docker Compose file

Create a `docker-compose.yml` file in your working directory:

```yaml
services:
  cloudprem:
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
    image: gcr.io/datadoghq/agent:latest
    environment:
      - DD_API_KEY=${DD_API_KEY}
      - DD_SITE=${DD_SITE:-datadoghq.com}
      - DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true
      - DD_LOGS_ENABLED=true
      - DD_LOGS_CONFIG_LOGS_DD_URL=http://cloudprem:7280
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
      cloudprem:
        condition: service_healthy
    restart: unless-stopped
```

The Docker Compose setup:
1. Starts CloudPrem and waits for it to be healthy.
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

After starting CloudPrem with either method, verify that the installation is working correctly:

### Check CloudPrem status

**Verify CloudPrem is running**:

```shell
curl http://localhost:7280/api/v1/version
```

You should see a response with version information.

### Send a log

In your terminal, send a "Hello World" log entry directly to your local CloudPrem instance using the API:

```shell
curl -X POST "http://localhost:7280/api/v2/logs" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d '[
    {
      "message": "Hello world from CloudPrem",
      "level": "info",
      "service": "demo"
    }
  ]'
```

### Search your local logs from the Log Explorer

After verifying that CloudPrem is running, you can search and analyze your logs in the Logs Explorer by searching into the `cloudprem` index!

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.docker.com/get-docker/
[5]: https://docs.docker.com/compose/install/
