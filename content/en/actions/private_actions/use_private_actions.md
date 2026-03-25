---
title: Use Private Actions
description: Set up and use private action runners to interact with services on your private network without exposing them to the internet.
disable_toc: false
aliases:
- service_management/workflows/private_actions/use_private_actions
- service_management/app_builder/private_actions/use_private_actions
further_reading:
- link: "service_management/app_builder/connections"
  tag: "Documentation"
  text: "App Builder Connections"
- link: "service_management/workflows/connections"
  tag: "Documentation"
  text: "Workflow Connections"
- link: "actions/private_actions/"
  tag: "Documentation"
  text: "Private Actions Overview"
- link: "actions/private_actions/private_action_credentials"
  tag: "Documentation"
  text: "Handling Private Action Credentials"
---

## Overview

Private actions allow your Datadog workflows and apps to interact with services hosted on your private network without exposing your services to the public internet. To use private actions, you must install a private action runner on a host in your network, then pair the runner with a Datadog Connection.

For more information about how private actions work, see the full [overview page][16].

## Supported private actions

{{< partial name="actions/private_actions_list" >}}

## Prerequisites

Choose your installation method based on your environment:

**Agent-based installation (recommended)**
: - Linux or Windows host with Datadog Agent version 7.77.0 or later
: - Or Kubernetes cluster with Datadog Operator version 1.24.0 or later
: - Network access to Datadog: `https://{{< region-param key=dd_site >}}`
: - An [Application key][20] with `on_prem_runner_write` scope and **Actions API Access** enabled

**Standalone installation**
: - Linux host with 2GB of RAM
: - Network access to Datadog: `https://{{< region-param key=dd_site >}}`, `https://config.{{< region-param key=dd_site >}}`
: - Docker (with Docker Compose if preferred) or Kubernetes
: - To use App Builder with private actions, you must be able to point a hostname to the private action runner's container. This hostname must be resolvable by your App users. App Builder calls the hostname using HTTPS, so you must bring your own SSL termination.

## Set up a private action runner

### Agent-based installation

The recommended way to install a private action runner is through the Datadog Agent. The runner automatically enrolls with Datadog and appears on the [Private Action Runners][6] page.

{{< tabs >}}
{{% tab "Linux" %}}

### Create an Application key

1. Go to [Application Keys][101].
1. Click **New Key** and enter a name.
1. Under **Scopes**, select **on_prem_runner_write**.
1. Enable **Actions API Access**.
1. Click **Create Key** and copy the key value.

### Install or upgrade the Datadog Agent

Run the following command to install or upgrade the Agent and enable the private action runner. Replace the placeholder values:
- `<API_KEY>`: Your [Datadog API key][102]
- `<APP_KEY>`: The Application key you created
- `DD_SITE`: Your [Datadog site][103] (for example, `datadoghq.com`)
- `DD_PRIVATE_ACTION_RUNNER_ACTIONS_ALLOWLIST`: Comma-separated list of actions to allow. See [Available actions](#available-actions) for the full list.

```bash
DD_API_KEY=<API_KEY> \
DD_APP_KEY=<APP_KEY> \
DD_SITE="datadoghq.com" \
DD_PRIVATE_ACTION_RUNNER_ENABLED=true \
DD_PRIVATE_ACTION_RUNNER_ACTIONS_ALLOWLIST=com.datadoghq.script.runPredefinedScript,com.datadoghq.kubernetes.core.listPod \
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

### Verify the installation

Go to the [Private Action Runners][104] page. You should see a new runner on the list. You can create new connections or start using existing ones.

[101]: https://app.datadoghq.com/organization-settings/application-keys
[102]: https://app.datadoghq.com/organization-settings/api-keys
[103]: /getting_started/site/
[104]: https://app.datadoghq.com/actions/action-catalog

{{% /tab %}}

{{% tab "Windows" %}}

### Install or upgrade the Datadog Agent

If you already have the Datadog Agent installed, upgrade to version 7.77.0 or later. See [Upgrade to Agent v7][101] for instructions.

For new installations, download and run the MSI installer. Replace `<API_KEY>` with your [Datadog API key][102] and update `DD_SITE` if you're not using the "datadoghq.com".

```powershell
# Download the installer
Invoke-WebRequest -Uri "https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-7.77.0.msi" -OutFile ddagent-cli-7.77.0.msi

# Install the Agent
Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /l*v install.log /i ddagent-cli-7.77.0.msi APIKEY="<API_KEY>" DD_SITE="datadoghq.com"'
```

### Create an Application key

1. Go to [Application Keys][103].
1. Click **New Key** and enter a name.
1. Under **Scopes**, select **on_prem_runner_write**.
1. Enable **Actions API Access**.
1. Click **Create Key** and copy the key value.

### Configure the Agent

Edit the `C:\ProgramData\Datadog\datadog.yaml` file and add the following configuration:

```yaml
app_key: <YOUR_APP_KEY>

private_action_runner:
  enabled: true
  actions_allowlist:
    - "com.datadoghq.script.runPredefinedPowershellScript"
    - "com.datadoghq.http.request"
```

See [Available actions](#available-actions) for the full list of actions you can add to the allowlist. Not all actions are supported on Windows yet. Safe choices for Windows include HTTP and `runPredefinedPowershellScript`.

### Restart the Agent

Restart the Agent to apply the configuration and enroll the runner:

```powershell
Restart-Service -Force datadogagent
```

### Verify the installation

Go to the [Private Action Runners][104] page. You should see a new runner on the list. You can create new connections or start using existing ones.

[101]: /agent/versions/upgrade_to_agent_v7/
[102]: https://app.datadoghq.com/organization-settings/api-keys
[103]: https://app.datadoghq.com/organization-settings/application-keys
[104]: https://app.datadoghq.com/actions/action-catalog

{{% /tab %}}

{{% tab "Kubernetes (Datadog Operator)" %}}

Follow these steps to install the Private Action Runner on your [Datadog Node Agents][100] and [Datadog Cluster Agent][101].

### Install the Datadog Operator

Install the Datadog Operator version 1.24.0 or later:

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm install datadog-operator datadog/datadog-operator \
    --set image.repository=datadog/operator \
    --set image.tag=1.24.0
```

### Create an API key and Application key

1. Create or choose an [API key][102].
1. Go to [Application Keys][103] and create a new key:
   - Under **Scopes**, select **on_prem_runner_write**.
   - Enable **Actions API Access**.

### Create Kubernetes secrets

```bash
kubectl create secret generic datadog-secret \
    --from-literal api-key=<YOUR_API_KEY> \
    --from-literal app-key=<YOUR_APP_KEY>
```

### Configure and deploy the Datadog Agent

Create a `datadog-agent.yaml` file with the following content:

- Set `clusterName` to a meaningful name for your cluster.
- Update `site` to your [Datadog site][105] if you're not using `datadoghq.com`.
- The `app-key` in the secret is required for the Private Action Runner.
- Adjust `actions_allowlist` and `DD_PRIVATE_ACTION_RUNNER_ACTIONS_ALLOWLIST` based on your needs. See [Available actions](#available-actions) for the full list.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/private-action-runner-enabled: "true"
    agent.datadoghq.com/private-action-runner-configdata: |
      private_action_runner:
        enabled: true
        actions_allowlist:
          - "com.datadoghq.script.runPredefinedScript"
          - "com.datadoghq.kubernetes.core.listPod"
spec:
  global:
    clusterName: <YOUR_CLUSTER_NAME>
    site: datadoghq.com
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
      appSecret:
        secretName: datadog-secret
        keyName: app-key
    kubelet:
      tlsVerify: false
  override:
    nodeAgent:
      image:
        name: datadog/agent:7.77.0
        pullPolicy: IfNotPresent
    clusterAgent:
      replicas: 2
      image:
        name: datadog/cluster-agent:7.77.0
        pullPolicy: IfNotPresent
      env:
        - name: DD_PRIVATE_ACTION_RUNNER_ENABLED
          value: "true"
        - name: DD_PRIVATE_ACTION_RUNNER_ACTIONS_ALLOWLIST
          value: "com.datadoghq.script.runPredefinedScript,com.datadoghq.kubernetes.core.listPod"
  features:
    logCollection:
      enabled: true
      containerCollectAll: true
    liveContainerCollection:
      enabled: true
```

Deploy the Agent:

```bash
kubectl apply -f datadog-agent.yaml
```

### Verify the deployment

Check that the cluster agent pods are running:

```bash
kubectl get pods
```

Check the Private Action Runner logs:

```bash
kubectl logs -l app.kubernetes.io/component=cluster-agent --tail=1000 | grep private
```

You should see logs indicating PAR identity secret creation, self-enrollment success, and the runner starting with its URN.

Go to the [Private Action Runners][104] page. You should see a new runner on the list.

[100]: /containers/kubernetes/
[101]: /containers/cluster_agent/
[102]: https://app.datadoghq.com/organization-settings/api-keys
[103]: https://app.datadoghq.com/organization-settings/application-keys
[104]: https://app.datadoghq.com/actions/action-catalog
[105]: /getting_started/site/

{{% /tab %}}

{{% tab "Terraform (Datadog Operator)" %}}

Follow these steps to install the Private Action Runner on your [Datadog Node Agents][100] and [Datadog Cluster Agent][101] using Terraform.

### Create an API key and Application key

1. Create or choose an [API key][102].
1. Go to [Application Keys][103] and create a new key:
   - Under **Scopes**, select **on_prem_runner_write**.
   - Enable **Actions API Access**.

### Create the Terraform configuration

**Note:** You must first deploy without the `kubernetes_manifest.datadog_agent` resource for the CRDs to be created, then add it back.

Create a Terraform file with the following content. Update `eks_cluster` and other values as needed:

```hcl
locals {
  helm_operator_version = "2.19.0"
  agent_version         = "7.77.0"
  eks_cluster           = "<YOUR_CLUSTER_NAME>"
}

variable "datadog_api_key" {
  type = string
}

variable "datadog_app_key" {
  type = string
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.56.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 3.0.1"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 3.1.1"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.target.endpoint
  token                  = data.aws_eks_cluster_auth.target.token
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.target.certificate_authority[0].data)
}

provider "helm" {
  helm_driver = "configmap"
  kubernetes = {
    host                   = data.aws_eks_cluster.target.endpoint
    token                  = data.aws_eks_cluster_auth.target.token
    cluster_ca_certificate = base64decode(data.aws_eks_cluster.target.certificate_authority[0].data)
  }
}

data "aws_eks_cluster" "target" {
  name = local.eks_cluster
}

data "aws_eks_cluster_auth" "target" {
  name = local.eks_cluster
}

resource "kubernetes_namespace_v1" "namespace" {
  metadata {
    name = "datadog"
  }
}

resource "kubernetes_secret_v1" "datadog" {
  metadata {
    name      = "datadog-secret"
    namespace = "datadog"
  }

  data = {
    "api-key" = var.datadog_api_key
    "app-key" = var.datadog_app_key
  }

  depends_on = [kubernetes_namespace_v1.namespace]
}

resource "helm_release" "datadog_operator" {
  name             = "datadog-operator"
  repository       = "https://helm.datadoghq.com"
  chart            = "datadog-operator"
  version          = local.helm_operator_version
  namespace        = "datadog"
  create_namespace = false

  depends_on = [kubernetes_namespace_v1.namespace]
}

resource "kubernetes_manifest" "datadog_agent" {
  manifest = {
    apiVersion = "datadoghq.com/v2alpha1"
    kind       = "DatadogAgent"
    metadata = {
      name      = "datadog"
      namespace = "datadog"
      annotations = {
        "agent.datadoghq.com/private-action-runner-enabled"    = true
        "agent.datadoghq.com/private-action-runner-configdata" = <<EOF
private_action_runner:
  enabled: true
  actions_allowlist:
    - com.datadoghq.script.runPredefinedScript
    - com.datadoghq.kubernetes.core.listPod
EOF
      }
    }
    spec = {
      global = {
        clusterName = local.eks_cluster
        site        = "datadoghq.com"
        credentials = {
          apiSecret = {
            secretName = "datadog-secret"
            keyName    = "api-key"
          }
          appSecret = {
            secretName = "datadog-secret"
            keyName    = "app-key"
          }
        }
      }
      features = {
        apm = {
          enabled = true
        }
        liveProcessCollection = {
          enabled = true
        }
        logCollection = {
          enabled             = true
          containerCollectAll = true
        }
        processDiscovery = {
          enabled = true
        }
      }
      override = {
        clusterAgent = {
          image = {
            tag = local.agent_version
          }
          env = [
            {
              name  = "DD_PRIVATE_ACTION_RUNNER_ENABLED"
              value = "true"
            },
            {
              name  = "DD_PRIVATE_ACTION_RUNNER_ACTIONS_ALLOWLIST"
              value = join(",", [
                "com.datadoghq.script.runPredefinedScript",
                "com.datadoghq.kubernetes.core.listPod",
              ])
            },
          ]
        }
        nodeAgent = {
          image = {
            tag = local.agent_version
          }
        }
      }
    }
  }

  depends_on = [helm_release.datadog_operator]
}
```

### Deploy

```bash
terraform init
terraform apply -var="datadog_api_key=<YOUR_API_KEY>" -var="datadog_app_key=<YOUR_APP_KEY>"
```

### Verify the deployment

Check that the cluster agent pods are running:

```bash
kubectl get pods -n datadog
```

Check the Private Action Runner logs:

```bash
kubectl logs -l app.kubernetes.io/component=cluster-agent -n datadog --tail=1000 | grep private
```

Go to the [Private Action Runners][104] page. You should see a new runner on the list.

[100]: /containers/kubernetes/
[101]: /containers/cluster_agent/
[102]: https://app.datadoghq.com/organization-settings/api-keys
[103]: https://app.datadoghq.com/organization-settings/application-keys
[104]: https://app.datadoghq.com/actions/action-catalog

{{% /tab %}}

{{% tab "Helm" %}}

To install the Private Action Runner using the Datadog Helm chart:

1. Go to the [Fleet Automation install page][100].
1. In **Select Agent install method**, choose **Helm Chart**.
1. In **Select your Kubernetes distribution**, choose the distribution that matches your environment.
1. In **Customize your Agent coverage**, go to the **Optimization & Remediation** section and enable the toggle **Enable Agent to take action**. This creates an Application key with the correct scope for you.
1. In **Add the Datadog Helm repository**, add an API key.
1. Follow the remaining Fleet instructions to complete the installation.

[100]: https://app.datadoghq.com/fleet/install-agent/latest?platform=kubernetes

{{% /tab %}}
{{< /tabs >}}

### Standalone installation

As an alternative to the agent-based installation, you can run the private action runner as a standalone Docker container or Kubernetes deployment.

1. Go to [**Actions Catalog**][6] > **Private Action Runners**, and click **New Private Action Runner**.
1. Enter a name for your runner and select the allowed actions.
1. Create a directory on your host where the runner can store its configuration, such as `./config`.
1. Deploy your runner by following the steps for your container platform:

{{< tabs >}}
{{% tab "Docker" %}}
1. Click **Docker**.
1. Run the provided `docker run` command on your host, replacing `./config` with the path to the directory you created for the runner configuration.

   You can safely ignore the error `DATADOG TRACER DIAGNOSTIC - Agent Error: connect ECONNREFUSED`.
{{% /tab %}}

{{% tab "Docker Compose" %}}
1. Click **Docker Compose**.
1. Create a `docker-compose.yaml` file and add the provided YAML, or add the `runner` stanza to an existing Docker Compose file. For information on creating a Docker Compose file, see the [official Compose documentation][101].
1. Replace `./config` with the path to the directory you created for the runner configuration.
1. Run `docker compose up -d`.

   You can safely ignore the error `DATADOG TRACER DIAGNOSTIC - Agent Error: connect ECONNREFUSED`.

[101]: https://docs.docker.com/compose/compose-application-model/
{{% /tab %}}

{{% tab "Kubernetes" %}}
1. Click **Kubernetes**.
1. Confirm that you have installed `kubectl` on your machine: run `kubectl version` and verify that there is output.
1. Confirm that you have installed `helm` on your machine: run `helm version` and verify that there is output.
1. Confirm that you have sufficient permissions to create Kubernetes resources in your cluster.
1. Follow the instructions provided in the app to:
    1. Enroll the runner and generate the config.
    1. Add the **Private Action Runner** to your Helm repositories.
    1. Install the Helm chart.
1. Run `kubectl get pods -w` and verify that the status of the Private Action Runner pod becomes `Ready`.

{{% /tab %}}
{{< /tabs >}}

### Programmatic installation

As an alternative to the UI-based setup, you can enroll and configure a private action runner programmatically using your [API key][19] and [Application key][20]. This approach is ideal for automated deployments, CI/CD pipelines, and infrastructure-as-code workflows.

To set up the runner programmatically:
1. Provide your Datadog API and App keys through the `DD_API_KEY` and `DD_APP_KEY` environment variables.
2. Pass the `--with-api-key` flag to the runner container.

The runner uses these credentials to register itself with your Datadog organization and assign the App key author as the runner editor.

#### Example commands

Use the following commands to create an auto-enrollment script that can be rerun for automated deployments. After the runner enrolls successfully, it appears on the **Private Action Runners** page.

Before running the commands, update the following values:
- `RUNNER_NAME`: A unique name for your runner.
- `DD_BASE_URL`: Your Datadog site URL (for example, `https://app.datadoghq.com`).
- `./config`: The path to your runner configuration directory.
- (Optional) Image version: The container image tag to use for the runner.

{{< tabs >}}
{{% tab "Docker" %}}

```bash
export DD_API_KEY="<YOUR_API_KEY>"
export DD_APP_KEY="<YOUR_APP_KEY>"

docker run -d \
  -e DD_BASE_URL=<YOUR_DD_SITE> \
  -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
  -e DD_API_KEY="$DD_API_KEY" \
  -e DD_APP_KEY="$DD_APP_KEY" \
  -e RUNNER_NAME=<YOUR_RUNNER_NAME> \
  -e 'ACTIONS_ALLOWLIST=com.datadoghq.http.request' \
  -v ./config:/etc/dd-action-runner/config \
  gcr.io/datadoghq/private-action-runner:v1.17.1 \
  --with-api-key
```

{{% /tab %}}

{{% tab "Docker Compose" %}}

Create a `docker-compose.yaml` file with the following content. For more information, see the [official Compose documentation][101].

```yaml
# docker-compose.yaml
version: '3.8'
services:
  private-runner:
    image: gcr.io/datadoghq/private-action-runner:v1.17.1
    command: ["--with-api-key"]
    environment:
      DD_API_KEY: ${DD_API_KEY}
      DD_APP_KEY: ${DD_APP_KEY}
      DD_BASE_URL: <YOUR_DD_SITE>
      DD_PRIVATE_RUNNER_CONFIG_DIR: /etc/dd-action-runner/config
      RUNNER_NAME: my-compose-runner
      RUNNER_MODES: pull
      ACTIONS_ALLOWLIST: "com.datadoghq.http.request"
    volumes:
      - "./config:/etc/dd-action-runner/config"
```

Run with:
```bash
export DD_API_KEY="<YOUR_API_KEY>"
export DD_APP_KEY="<YOUR_APP_KEY>"

DD_API_KEY=$DD_API_KEY DD_APP_KEY=$DD_APP_KEY docker compose up -d
```

[101]: https://docs.docker.com/compose/compose-application-model/
{{% /tab %}}

{{% tab "Kubernetes" %}}

1. Generate the runner configuration:

```bash
export DD_API_KEY="<YOUR_API_KEY>"
export DD_APP_KEY="<YOUR_APP_KEY>"

docker run \
  -e DD_BASE_URL=<YOUR_DD_SITE> \
  -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
  -e DD_API_KEY="$DD_API_KEY" \
  -e DD_APP_KEY="$DD_APP_KEY" \
  -e RUNNER_NAME="my-runner" \
  -e 'ACTIONS_ALLOWLIST=com.datadoghq.http.request' \
  -v ./config:/etc/dd-action-runner/config \
  gcr.io/datadoghq/private-action-runner:v1.17.1 \
  --with-api-key --enroll -f helm-values > values.yaml
```

2. Deploy the Helm chart:

```bash
helm upgrade --install datadog-par datadog/private-action-runner -f values.yaml
```

{{% /tab %}}
{{< /tabs >}}

When you see the **Ready to use** status, you can create a new connection for the runner or see it on the **Private Action Runners** page:
- To create a new connection for the runner, click **Link Runner to New Connection** and select an integration.
- Click **View Runner** to see the runner on the **Private Action Runners** page.

See [Connect a runner](#connect-a-runner) for more information on pairing your runner with a connection.

## Manage access

Use [role-based access control (RBAC)][17] to control access to your private action runner. To see the list of permissions that apply to private action runner, see [Datadog Role Permissions][18].

You can set permissions on the runner to restrict modifications or prevent new connections from being attached. Available granular permissions include **Viewer**, **Contributor**, and **Editor**.

By default, only the runner's creator has **Editor** access. The creator can grant access to additional users, service accounts, roles, or teams.

### Permission levels

Viewer
: Can view the runner and the connections attached to it

Contributor
: Can view and contribute to the runner by attaching new connections to it

Editor
: Can view, contribute (attach new connections), and edit the runner

### Set permissions on a runner

1. Navigate to the Edit page of the runner.
2. In the **Who Has Access?** section, click **Edit access**.
3. Select a user, service account, role, or team from the dropdown menu, then click **Add**. The selected principal appears at the bottom of the dialog box.
4. Next to the principal name, select your desired permission from the dropdown menu.
5. To remove access from a principal, select **Remove access** from the permissions dropdown menu.
6. Click **Done** to finalize the permissions setup.
7. Click **Save** to apply the new permissions to the runner.

## Connect a runner

Before you can use an action runner, you must pair it with one or more connections.

To pair a runner to a connection:
1. From the [Workflow Automation][7] or [App Builder][8] Connections page, click **New Connection**.
1. Select the integration you want to connect with your private action runner. For a list of integrations that support private actions, see [Supported private actions](#supported-private-actions).
1. Add a **Connection Name** and select your runner from the **Private Action Runner** dropdown.
1. Add the paths to any required credential files. For more information on credentials, see [Handling Private Action Credentials][9].

## Use a private action

To use a private action in your [Workflow Automation][10] workflow or [App Builder][11] app:

{{% collapse-content title="Workflow Automation" level="p" %}}
1. From the [Workflow Automation][10] page, create a workflow, or open an existing workflow. For information on creating or editing a workflow, see [Build Workflows][12].
1. Click **Add Step** and search for the private action you want to add to your workflow. For a list of integrations that support private actions, see [Supported private actions](#supported-private-actions).
1. Enter a name for the step.
1. Select a **Connection** from the dropdown or click the plus (**+**) icon to add a new connection. Using a private action requires a private action runner that is paired with a connection. See [Connect a runner](#connect-a-runner) for more information.
1. Complete any required fields and click **Save** to save your workflow.
{{% /collapse-content %}}

{{% collapse-content title="App Builder" level="p" %}}
1. From the [App Builder][11] page, create an app, or open an existing app. For information on creating or editing an app, see [Build Apps][14].
1. Click **New Query** and search for the private action you want to add to your app. For a list of integrations that support private actions, see [Supported private actions](#supported-private-actions).
1. Select a **Connection** from the dropdown or click the plus (**+**) icon to add a new connection. Using a private action requires a private action runner paired with a connection. See [Connect a runner](#connect-a-runner) for more information.
1. Complete any required fields and click **Save** to save your query.
{{% /collapse-content %}}

## Edit private runners

### Edit connections or delete runners

From the **Private Action Runner** page in [Actions Catalog][6], you can view all of your private runners together with the workflows or apps that use each runner. To edit the connection for a runner, click **View Details**. Click the trash can icon to delete a runner.

### Change the allowlist of a runner

{{< tabs >}}
{{% tab "Agent-based" %}}

To edit the allowlist for an agent-based private action runner:

**Linux:**
1. Edit the `private_action_runner.actions_allowlist` section in `/etc/datadog-agent/datadog.yaml`.
1. Restart the Agent: `sudo systemctl restart datadog-agent`

**Windows:**
1. Edit the `private_action_runner.actions_allowlist` section in `C:\ProgramData\Datadog\datadog.yaml`.
1. Restart the Agent: `Restart-Service -Force datadogagent`

**Kubernetes (Operator):**
1. Update the `actions_allowlist` in the DatadogAgent manifest annotations and the `DD_PRIVATE_ACTION_RUNNER_ACTIONS_ALLOWLIST` environment variable.
1. Apply the updated manifest: `kubectl apply -f datadog-agent.yaml`

{{% /tab %}}
{{% tab "Standalone" %}}

To edit the allowlist for a standalone private action runner:

1. Edit the `actionsAllowlist` section of the `config.yaml` file in your runner's environment and add or remove the relevant actions.
1. Restart the runner by restarting your container or deployment.

{{% /tab %}}
{{< /tabs >}}

### Available actions

{{% collapse-content title="Available actions" level="p" %}}

{{< partial name="actions/private_actions_allowlist.html" >}}

{{% /collapse-content %}}

**Note:** To configure script actions (`runPredefinedScript` for Linux or `runPredefinedPowershellScript` for Windows), see [Run a Script with the Private Action Runner][21].

## Debugging

### View logs

{{< tabs >}}
{{% tab "Linux" %}}

```bash
cat /var/log/datadog/private-action-runner.log
```

{{% /tab %}}

{{% tab "Windows" %}}

```powershell
Get-Content C:\ProgramData\Datadog\logs\private-action-runner.log
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

```bash
kubectl logs -l app.kubernetes.io/component=cluster-agent --tail=1000 | grep private
```

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/workflow/action-catalog#com.datadoghq.kubernetes
[2]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.postgresql
[3]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.jenkins
[4]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.temporal
[5]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.http
[6]: https://app.datadoghq.com/actions/action-catalog
[7]: https://app.datadoghq.com/workflow/connections
[8]: https://app.datadoghq.com/app-builder/connections
[9]: /actions/private_actions/private_action_credentials
[10]: https://app.datadoghq.com/workflow/
[11]: https://app.datadoghq.com/app-builder/
[12]: /service_management/workflows/build
[13]: /service_management/app_builder/build
[14]: /service_management/workflows/build/#build-a-workflow-with-the-workflow-builder
[16]: /actions/private_actions/
[17]: /account_management/rbac/
[18]: /account_management/rbac/permissions/#app-builder--workflow-automations
[19]: /account_management/api-app-keys/#api-keys
[20]: /account_management/api-app-keys/#application-keys
[21]: /actions/private_actions/run_script
