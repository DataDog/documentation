---
title: Update the Private Action Runner
disable_toc: false
---

## Overview

This page explains how to update the private action runner (PAR). 

To view the latest version of the PAR, check [this URL][1].

## Docker mode
Navigate to the directory where you started the PAR. Next, navigate to the `config` directory, then the `config.yaml` file. 


Find the current ID of your container:
```bash
docker ps
```

Stop the container:
```bash
docker stop <id>
```

Start a new container with [the latest image][6]. Environment variables are no longer needed. Everything is configured in the `config/config.yaml` file.

Run:
```bash
docker run -d  -u 0 --platform=linux/x86_64  -p 9016:9016  -v ./config:/etc/dd-action-runner  --health-cmd "curl http://localhost:9016/liveness"  --health-interval 10s  --health-timeout 10s  --health-retries 3 gcr.io/datadoghq/private-action-runner:v1.0.0
```

After confirming the new PAR version is working as expected, remove the old version:
```bash
docker rm <id>
```

To check the PAR logs: 
```bash
docker logs <id-of-container>
```

## Docker compose mode
Navigate to the directory containing your `docker-compose.yaml` file. Next, navigate to the `config` directory, then the `config.yaml` file. Update the `image` property of the PAR and point to the latest version:

```yaml
services:
  private-actions-runner:
    image: gcr.io/datadoghq/private-action-runner:<latest_version>
    cpus: 25
    mem_limit: 1g
    deploy:
      replicas: 1
    environment:
      - DD_BASE_URL=https://app.datadoghq.com
      - DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config 
      - RUNNER_ENROLLMENT_TOKEN=<the_token>
      - STATSD_ENABLED=true
    volumes:
      - "./config:/etc/dd-action-runner/config"

Start the container again:
```bash
docker compose up -d
```

To check the logs:
```bash
docker compose logs runner
```

## Helm mode
When using Helm, there are two options for upgrading the PAR: 
1. **(Recommended)** Upgrade the chart, which will use the latest version of the PAR. There may be changes to the chart; please review [our changelog][8].
1. Upgrade the runner without upgrading the chart.

#### Upgrading the chart (recommended)

Navigate to the directory containing your `values.yaml` file and run:

```bash
helm repo update
helm upgrade <RELEASE_NAME> datadog/private-action-runner -f ./values.yaml
```

### Upgrading the PAR only

Specify the PAR version in your `values.yaml` under the `common.image.tag` key with the values found [here][9]:

```yaml
common:
  image:
    repository: gcr.io/datadoghq/private-action-runner # optional
    # latest image https://api.datadoghq.com/api/v2/on-prem-management-service/runner/latest-image
    tag: v1.0.0
```

Then run: 
```bash
helm upgrade <RELEASE_NAME> datadog/private-action-runner -f ./values.yaml
```

To check the logs: 
```bash
kubectl get pods
kubectl logs <name-of-the-pod>
```
[1]: https://api.datadoghq.com/api/v2/on-prem-management-service/runner/latest-image