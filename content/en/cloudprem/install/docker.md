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

## Overview

{{< callout btn_hidden="true" >}}
  Datadog CloudPrem is in Preview.
{{< /callout >}}

This guide walks you through setting up CloudPrem on your local machine for testing. YOu can use either standalone Docker containers or Docker Compose for a single-command setup.

## Prerequisites

Before getting started with CloudPrem, ensure you have:

- A **[Datadog account](https://www.datadoghq.com/)** with CloudPrem feature active.
- **API credentials**: Have your [Datadog API key](https://app.datadoghq.com/organization-settings/api-keys) and [application key](https://app.datadoghq.com/organization-settings/application-keys) ready.
- **Docker**: [Docker](https://docs.docker.com/get-docker/) installed and running on your machine.
- **Docker Compose** (optional): [Docker Compose](https://docs.docker.com/compose/install/) for a single command line setup.

## Installation steps

Choose one of the following installation methods:

1. [Standalone Docker containers](#standalone-docker-setup) - Minimal setup for testing
2. [Docker Compose](#docker-compose-setup) - Single command line to run CloudPrem and Datadog agent

## Standalone Docker setup

This method uses individual Docker containers for a minimal CloudPrem setup.


Export your Datadog credentials as environment variables:

```bash
export DD_SITE="datadoghq.com"  # or your specific Datadog site
export DD_API_KEY="your_datadog_api_key"
export DD_APP_KEY="your_datadog_application_key"
```

### Step 1: Start CloudPrem

Create the data directory and start the CloudPrem container:

```bash
# Start CloudPrem
docker run -d \
  --name cloudprem \
  -v $(pwd)/qwdata:/quickwit/qwdata \
  -e QW_CLUSTER_ID=local-cloudprem \
  -e QW_ENABLE_REVERSE_CONNECTION=true \
  -e DD_SITE=${DD_SITE} \
  -e DD_API_KEY=${DD_API_KEY} \
  -e DD_APP_KEY=${DD_APP_KEY} \
  -p 127.0.0.1:7280:7280 \
  datadog/cloudprem run
```

### Step 2: Start the Datadog Agent

To collect logs from your local containers and send them to CloudPrem, start the Datadog Agent:

```bash
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

## Docker Compose setup

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
      - QW_CLUSTER_ID=cloudprem-local
      - QW_ENABLE_REVERSE_CONNECTION
      - DD_SITE=${DD_SITE:-datadoghq.com}
      - DD_API_KEY=${DD_API_KEY}
      - DD_APP_KEY=${DD_APP_KEY}
    volumes:
      - ./qwdata:/quickwit/qwdata
      - ./config.yaml:/quickwit/config/quickwit.yaml:ro
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

The Docker Compose setup will:
1. Start CloudPrem and wait for it to be healthy
2. Start the Datadog Agent to collect container logs

### Step 2: Set environment variables

Create a `.env` file in the same directory:

```bash
DD_SITE=datadoghq.com
DD_API_KEY=your_datadog_api_key
DD_APP_KEY=your_datadog_application_key
```

### Step 3: Start docker compose

```bash
docker compose up -d
```

## Next steps

After starting CloudPrem with either method, verify that the installation is working correctly:

### Check CloudPrem status

**Verify CloudPrem is running**:

```bash
curl http://localhost:7280/api/v1/version
```

You should see a response with version information.

### Search your local logs from the Log Explorer

Now that CloudPrem is running, you can search and analyze your logs in the Logs Explorer by searching into the `cloudprem` index!


