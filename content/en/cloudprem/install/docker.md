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

This document walks you through the process of installing CloudPrem on your local machine for testing purposes. CloudPrem can be deployed using either standalone Docker container, you can also use Docker Compose for a single command line CloudPrem + Datadog agent setup.

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

### Step 1: Create configuration files

First, create the necessary configuration files in your working directory.

1. **Create the CloudPrem configuration file** (`config.yaml`):

   ```yaml
   version: 0.8
   listen_address: 0.0.0.0
   gossip_listen_port: 7282
   cloudprem_listen_port: 7283
   data_dir: /quickwit/qwdata
   grpc:
     keep_alive:
       interval: 30s
       timeout: 10s
   cloudprem:
     site: ${DD_SITE}
     dd_api_key: ${DD_API_KEY}
     dd_application_key: ${DD_APP_KEY}
   ```

2. **Download the Datadog index configuration**:

   ```bash
   curl -o datadog-index.yaml https://raw.githubusercontent.com/DataDog/helm-charts/refs/heads/main/charts/cloudprem/datadog.yaml
   ```

### Step 2: Set environment variables

Export your Datadog credentials as environment variables:

```bash
export DD_API_KEY="your_datadog_api_key"
export DD_APP_KEY="your_datadog_application_key"
export DD_SITE="datadoghq.com"  # or your specific Datadog site
```

### Step 3: Start CloudPrem

Create the data directory and start the CloudPrem container:

```bash
# Start CloudPrem
docker run -d \
  --name cloudprem \
  -v $(pwd)/qwdata:/quickwit/qwdata \
  -v $(pwd)/config.yaml:/quickwit/config/quickwit.yaml:ro \
  -e DD_API_KEY=${DD_API_KEY} \
  -e DD_APP_KEY=${DD_APP_KEY} \
  -p 127.0.0.1:7280:7280 \
  datadog/cloudprem run
```

### Step 4: Create the Datadog index

Wait for CloudPrem to start, then create the Datadog index:

```bash
docker run --rm \
  -v $(pwd)/datadog-index.yaml:/quickwit/datadog.yaml:ro \
  --network host \
  datadog/cloudprem index create \
  --index-config /quickwit/datadog.yaml \
  --yes \
  --endpoint http://localhost:7280
```

### Step 5: Start the Datadog Agent

To collect logs from your local containers, start the Datadog Agent:

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

You can

## Docker Compose setup

This method provides a complete CloudPrem setup with automatic index creation and Datadog Agent integration.


### Step 1: Download the Datadog index file

```bash
curl -o datadog-index.yaml https://raw.githubusercontent.com/DataDog/helm-charts/refs/heads/main/charts/cloudprem/datadog.yaml
```

### Step 2: Create the Docker Compose file

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
      - DD_API_KEY=${DD_API_KEY}
      - DD_APP_KEY=${DD_APP_KEY}
      - DD_SITE=${DD_SITE:-datadoghq.com}
    volumes:
      - ./qwdata:/quickwit/qwdata
      - ./config.yaml:/quickwit/config/quickwit.yaml:ro
    restart: unless-stopped

  datadog-index-creator:
    image: datadog/cloudprem:latest
    depends_on:
      cloudprem:
        condition: service_healthy
    volumes:
      - ./datadog-index.yaml:/quickwit/datadog.yaml:ro
    entrypoint: []
    command:
      - /bin/sh
      - -c
      - |
        echo 'Starting datadog-index-creator...'
        echo 'Waiting for CloudPrem to be ready...'
        sleep 5
        echo 'Testing connection to CloudPrem...'
        curl -f http://cloudprem:7280/api/v1/version || echo 'Connection failed'
        echo 'Creating Datadog index...'
        quickwit index create --index-config /quickwit/datadog.yaml --yes --retries 10 --endpoint http://cloudprem:7280
        echo 'Datadog index created successfully!'
    restart: "no"

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
2. Automatically create the Datadog index
3. Start the Datadog Agent to collect container logs

### Step 3: Set environment variables

Create a `.env` file in the same directory:

```bash
DD_API_KEY=your_datadog_api_key
DD_APP_KEY=your_datadog_application_key
DD_SITE=datadoghq.com
```

### Step 4: Start docker compose

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


