---
title: Update the Private Action Runner
description: Learn how to update the Private Action Runner to the latest version for both agent-based and standalone installations.
---

## Overview

This page explains how to update the private action runner (PAR). The update process depends on your installation method.

## Agent-based runner

If you installed the PAR through the Datadog Agent, updating the PAR is part of the standard Agent upgrade process.

{{< tabs >}}
{{% tab "Linux" %}}

Upgrade the Datadog Agent to the latest version. The PAR is bundled with Agent version 7.77.0 and later.

```bash
sudo apt-get update && sudo apt-get install datadog-agent
```

Or for RHEL/CentOS:

```bash
sudo yum update datadog-agent
```

Restart the Agent after the upgrade:

```bash
sudo systemctl restart datadog-agent
```

For detailed upgrade instructions, see [Upgrade to Agent v7][101].

[101]: /agent/versions/upgrade_to_agent_v7/

{{% /tab %}}

{{% tab "Windows" %}}

Download the latest Agent MSI installer from the [Datadog Agent download page][101] and run the installer.

Alternatively, use PowerShell:

```powershell
# Download the latest installer
Invoke-WebRequest -Uri "https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.msi" -OutFile ddagent-cli-latest.msi

# Run the installer
Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /i ddagent-cli-latest.msi'
```

Restart the Agent after the upgrade:

```powershell
Restart-Service -Force datadogagent
```

[101]: https://app.datadoghq.com/account/settings#agent/windows

{{% /tab %}}

{{% tab "Kubernetes (Datadog Operator)" %}}

Update the Datadog Operator and Agent image versions in your DatadogAgent manifest.

1. Update the Datadog Operator:

   ```bash
   helm repo update
   helm upgrade datadog-operator datadog/datadog-operator \
       --set image.repository=datadog/operator \
       --set image.tag=1.25.0
   ```

2. For Datadog Operator `1.25.0`, make sure your `datadog-agent.yaml` keeps the cluster-agent PAR configuration and command override:

   ```yaml
   metadata:
     annotations:
       agent.datadoghq.com/private-action-runner-enabled: "true"
       agent.datadoghq.com/private-action-runner-configdata: |
         private_action_runner:
           enabled: true
           actions_allowlist:
             - "com.datadoghq.script.runPredefinedScript"
             - "com.datadoghq.kubernetes.core.listPod"
       cluster-agent.datadoghq.com/private-action-runner-enabled: "true"
       cluster-agent.datadoghq.com/private-action-runner-configdata: |
         private_action_runner:
           enabled: true
           actions_allowlist:
             - "com.datadoghq.script.runPredefinedScript"
             - "com.datadoghq.kubernetes.core.listPod"
   spec:
     override:
       clusterAgent:
         containers:
           cluster-agent:
             command:
               - /entrypoint.sh
             args:
               - datadog-cluster-agent
               - start
               - -E=/etc/datadog-agent/privateactionrunner.yaml
   ```

3. Apply the updated manifest:

   ```bash
   kubectl apply -f datadog-agent.yaml
   ```

4. Verify the update:

   ```bash
   kubectl get pods
   kubectl logs -l app.kubernetes.io/component=cluster-agent --tail=100 | grep private
   ```

[102]: https://hub.docker.com/r/datadog/operator/tags

{{% /tab %}}

{{% tab "Kubernetes (Helm)" %}}

Updating the PAR is part of the standard Datadog Agent Helm chart upgrade process.

```bash
helm repo update
helm upgrade datadog-agent datadog/datadog -f values.yaml
```

For detailed upgrade instructions, see [Upgrading Datadog Helm][101].

[101]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#upgrading

{{% /tab %}}

{{% tab "Terraform (Datadog Operator)" %}}

Update the version variables in your Terraform configuration:

```hcl
locals {
  helm_operator_version = "<NEW_OPERATOR_VERSION>"
  agent_version         = "<NEW_AGENT_VERSION>"
  # ...
}
```

Apply the changes:

```bash
terraform plan
terraform apply -var="datadog_api_key=<YOUR_API_KEY>" -var="datadog_app_key=<YOUR_APP_KEY>"
```

{{% /tab %}}
{{< /tabs >}}

## Standalone runner

If you installed the PAR as a standalone container, use one of the following methods to update.

Currently, the PAR is on v{{< private-action-runner-version "private-action-runner" >}}.

{{< tabs >}}
{{% tab "Docker" %}}

Navigate to the directory where you started the PAR. Next, navigate to the `config` directory, then the `config.yaml` file.

Find the current ID of your container:
```bash
docker ps
```

Stop the container:
```bash
docker stop <id>
```

Start a new container with [the latest image][101]. Environment variables are not needed. Everything is configured in the `config/config.yaml` file.

Run:
```bash
docker run -d \
 --cpus="0.25" \
 --memory="1g"  \
 -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
 -v ./config:/etc/dd-action-runner/config \
 --health-cmd "curl http://localhost:9016/liveness" \
 --health-interval 10s \
 --health-timeout 10s \
 --health-retries 3 gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}
```

After confirming the new PAR version is working as expected, remove the old version:
```bash
docker rm <id>
```

To check the PAR logs:
```bash
docker logs <id-of-container>
```

[101]: https://api.datadoghq.com/api/v2/on-prem-management-service/runner/latest-image

{{% /tab %}}

{{% tab "Docker Compose" %}}

Navigate to the directory containing your `docker-compose.yaml` file and update the image version:

```yaml
services:
  private-actions-runner:
    image: gcr.io/datadoghq/private-action-runner:{{< private-action-runner-version "private-action-runner" >}}
    cpus: 0.25
    mem_limit: 1g
    deploy:
      replicas: 1
    environment:
      - DD_BASE_URL=https://app.datadoghq.com
      - DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config
      - STATSD_ENABLED=true
    volumes:
      - "./config:/etc/dd-action-runner/config"
```

Start the container again:
```bash
docker compose up -d
```

To check the logs:
```bash
docker compose logs runner
```

{{% /tab %}}

{{% tab "Helm" %}}

When using Helm, there are two options for upgrading the PAR:
1. **(Recommended)** Upgrade the chart, which uses the latest version of the PAR. There may be changes to the chart; review [the changelog][101].
1. Upgrade the runner without upgrading the chart.

**Upgrading the chart (recommended)**

Navigate to the directory containing your `values.yaml` file and run:

```bash
helm repo update
helm upgrade <RELEASE_NAME> datadog/private-action-runner -f ./values.yaml
```

**Upgrading the PAR only**

Specify the PAR version in your `values.yaml` under the `common.image.tag` key with the values found [here][102]:

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

[101]: https://github.com/DataDog/helm-charts/blob/main/charts/private-action-runner/CHANGELOG.md
[102]: https://github.com/DataDog/helm-charts/blob/main/charts/private-action-runner/values.yaml

{{% /tab %}}
{{< /tabs >}}
