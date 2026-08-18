---
title: Set up a standalone private action runner
description: Install, connect, manage, and update a standalone private action runner that you deploy and manage yourself with Docker or Helm.
disable_toc: false
further_reading:
- link: "actions/private_actions/"
  tag: "Documentation"
  text: "Private Actions Overview"
- link: "actions/private_actions/set_up_agent_based"
  tag: "Documentation"
  text: "Set up a private action runner in the Datadog Agent"
- link: "actions/connections"
  tag: "Documentation"
  text: "Connections"
---

The standalone private action runner is a dedicated container you can install and manage independently of the Datadog Agent with Docker or Helm.
It is supported and in maintenance mode: it continues to receive security and
stability updates, and no new features are planned. For new deployments, and to use Execution
Policies, run the runner in the Datadog Agent instead. See
[Set up a private action runner in the Datadog Agent][2].

Setting up the runner takes three steps:

1. **Install** the runner with Docker, Docker Compose, or Kubernetes.
1. **Connect** the runner to Datadog with a connection.
1. **Update** the runner as new versions are released.

A standalone runner is always **owned**: creating one, through either method below, always
registers it under the creating user, authorized with [Connections][3].

## Prerequisites

- Docker, or a Kubernetes cluster.
- Network access to Datadog at `https://{{< region-param key=dd_site >}}` and
  `https://config.{{< region-param key=dd_site >}}`.

## Install the runner

1. Go to **Actions Catalog > Private Action Runners**, and click **New Private Action Runner**.
1. Enter a name for your runner and select the allowed actions.
1. Create a directory on your host where the runner can store its configuration, such as `./config`.
1. Deploy your runner by following the steps for your container platform:

{{< tabs >}}
{{% tab "Docker" %}}

1. Click **Docker**.
1. Run the provided `docker run` command on your host, replacing `./config` with the path to the
   directory you created for the runner configuration.

You can safely ignore the error `DATADOG TRACER DIAGNOSTIC - Agent Error: connect ECONNREFUSED`.

{{% /tab %}}
{{% tab "Docker Compose" %}}

1. Click **Docker Compose**.
1. Create a `docker-compose.yaml` file and add the provided YAML, or add the `runner` stanza to an
   existing Docker Compose file.
1. Replace `./config` with the path to the directory you created for the runner configuration.
1. Run `docker compose up -d`.

You can safely ignore the error `DATADOG TRACER DIAGNOSTIC - Agent Error: connect ECONNREFUSED`.

{{% /tab %}}
{{% tab "Kubernetes (Helm)" %}}

1. Click **Kubernetes**.
1. Confirm that `kubectl` and `helm` are installed, and that you have sufficient permissions to
   create Kubernetes resources in your cluster.
1. Follow the instructions provided in the app to enroll the runner, generate the config, add the
   Private Action Runner Helm repository, and install the chart.
1. Run `kubectl get pods -w` and verify the private action runner pod's status becomes **Ready**.

{{% /tab %}}
{{< /tabs >}}

## Alternative: programmatic installation

As an alternative to the UI-based setup above, you can enroll and configure a standalone runner
programmatically using your API key and application key. This approach is suited to automated
deployments, CI/CD pipelines, and infrastructure-as-code workflows. Like the UI-based setup, this
always creates an owned runner.

To set up the runner programmatically:

1. Provide your Datadog API and application keys through the `DD_API_KEY` and `DD_APP_KEY`
   environment variables.
1. Pass the `--with-api-key` flag to the runner container. Despite the flag's name, this path still
   requires an application key: the runner uses both credentials together to register itself and
   assign the application key's owner as the runner's editor.

{{< tabs >}}
{{% tab "Docker" %}}

```bash
export DD_API_KEY="<YOUR_API_KEY>"
export DD_APP_KEY="<YOUR_APP_KEY>"

docker run -d \
  -e DD_BASE_URL=https://{{< region-param key=dd_site >}} \
  -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
  -e DD_API_KEY="$DD_API_KEY" \
  -e DD_APP_KEY="$DD_APP_KEY" \
  -e RUNNER_NAME=<YOUR_RUNNER_NAME> \
  -v ./config:/etc/dd-action-runner/config \
  gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}} \
  --with-api-key
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

```yaml
services:
  private-runner:
    image: gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}
    command: ["--with-api-key"]
    environment:
      DD_API_KEY: ${DD_API_KEY}
      DD_APP_KEY: ${DD_APP_KEY}
      DD_BASE_URL: https://{{< region-param key=dd_site >}}
      DD_PRIVATE_RUNNER_CONFIG_DIR: /etc/dd-action-runner/config
      RUNNER_NAME: my-compose-runner
    volumes:
      - "./config:/etc/dd-action-runner/config"
```

Run with:

```bash
export DD_API_KEY="<YOUR_API_KEY>"
export DD_APP_KEY="<YOUR_APP_KEY>"
docker compose up -d
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Generate the runner configuration:

```bash
export DD_API_KEY="<YOUR_API_KEY>"
export DD_APP_KEY="<YOUR_APP_KEY>"

docker run \
  -e DD_BASE_URL=https://{{< region-param key=dd_site >}} \
  -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
  -e DD_API_KEY="$DD_API_KEY" \
  -e DD_APP_KEY="$DD_APP_KEY" \
  -e RUNNER_NAME="my-runner" \
  -v ./config:/etc/dd-action-runner/config \
  gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}} \
  --with-api-key --enroll -f helm-values > values.yaml
```

Deploy the Helm chart:

```bash
helm upgrade --install datadog-par datadog/private-action-runner -f values.yaml
```

{{% /tab %}}
{{< /tabs >}}

When the runner shows **Ready to use**, create a connection for it, or view it on the **Private
Action Runners** page.

## Custom CA certificates

If your organization uses a custom certificate authority (CA) to issue certificates for internal services, such as HTTP endpoints or Jenkins, you can configure a standalone private action runner to trust that CA.

{{< tabs >}}
{{% tab "Docker" %}}

Add the `SSL_CERT_DIR` environment variable and mount your certificate to the `docker run` command, replacing `<PATH_TO_YOUR_CA_CERTIFICATE>` with the path to your CA certificate file:

{{< highlight bash "hl_lines=7 9" >}}
docker run -d \
  -e DD_BASE_URL=https://{{< region-param key=dd_site >}} \
  -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
  -e DD_API_KEY="$DD_API_KEY" \
  -e DD_APP_KEY="$DD_APP_KEY" \
  -e RUNNER_NAME=<YOUR_RUNNER_NAME> \
  -e SSL_CERT_DIR=/etc/dd-action-runner/config/ca-certificates \
  -v ./config:/etc/dd-action-runner/config \
  -v <PATH_TO_YOUR_CA_CERTIFICATE>:/etc/dd-action-runner/config/ca-certificates/ca.crt \
  gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}} \
  --with-api-key
{{< /highlight >}}

{{% /tab %}}
{{% tab "Docker Compose" %}}

Add the `SSL_CERT_DIR` environment variable and mount your certificate in your `docker-compose.yaml` file, replacing `<PATH_TO_YOUR_CA_CERTIFICATE>` with the path to your CA certificate file:

```yaml
services:
  private-runner:
    environment:
      SSL_CERT_DIR: /etc/dd-action-runner/config/ca-certificates
    volumes:
      - "<PATH_TO_YOUR_CA_CERTIFICATE>:/etc/dd-action-runner/config/ca-certificates/ca.crt"
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

1. Create a ConfigMap containing your CA certificate:

   ```bash
   kubectl create configmap my-ca-cert --from-file=ca.crt=./my-custom-ca.pem
   ```

1. In your Helm `values.yaml` file, reference the ConfigMap:

   ```yaml
   runner:
     customCaCert:
       configMapName: my-ca-cert
   ```

1. Apply the updated values:

   ```bash
   helm upgrade --install datadog-par datadog/private-action-runner -f values.yaml
   ```

{{% /tab %}}
{{< /tabs >}}

## Connect the runner

A standalone runner is always owned and uses the Connections authorization model. A connection
stores the credentials for a service and pairs them with the runner. To create a connection and
pair it with your runner, see [Connections][3]. For how permissions on the runner itself work, see
[Manage access to owned runners][5].

## Manage the runner

### Edit connections or delete a runner

From the **Private Action Runner** page in Actions Catalog, you can view all your private runners
together with the workflows or apps that use each one. To edit the connections for a runner, click
**View Details**. Click the trash can icon to delete a runner.

### Change the allowlist

To edit the allowlist for a standalone runner, edit the `actionsAllowlist` section of the
`config.yaml` file in your runner's environment, then restart the runner by restarting your
container or deployment.

## Update the runner

Choose the tab that matches how you installed the runner. Use the current
`v{{< private-action-runner-version "private-action-runner" >}}` version rather than a hardcoded
tag.

{{< tabs >}}
{{% tab "Docker" %}}

Find the current ID of your container:

```bash
docker ps
```

Stop the container:

```bash
docker stop <id>
```

Start a new container with [the latest image][101]. Environment variables are not needed:
everything is configured in the `config/config.yaml` file.

```bash
docker run -d \
  -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
  -v ./config:/etc/dd-action-runner/config \
  gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}
```

After confirming the new version is working, remove the old container:

```bash
docker rm <id>
```

[101]: https://api.datadoghq.com/api/v2/on-prem-management-service/runner/latest-image

{{% /tab %}}
{{% tab "Docker Compose" %}}

Navigate to the directory containing your `docker-compose.yaml` file and update the image version:

```yaml
services:
  private-actions-runner:
    image: gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}
```

Start the container again:

```bash
docker compose up -d
```

{{% /tab %}}
{{% tab "Helm" %}}

There are two options for upgrading with Helm:

1. **(Recommended)** Upgrade the chart, which uses the latest version of the runner. There may be
   changes to the chart; review [the changelog][101].
1. Upgrade the runner only, without upgrading the chart.

**Upgrading the chart (recommended):**

```bash
helm repo update
helm upgrade <RELEASE_NAME> datadog/private-action-runner -f ./values.yaml
```

**Upgrading the runner only:** specify the runner version in `values.yaml` under the
`common.image.tag` key with a value from [the chart's values file][102]:

```yaml
common:
  image:
    tag: v{{< private-action-runner-version "private-action-runner" >}}
```

Then run:

```bash
helm upgrade <RELEASE_NAME> datadog/private-action-runner -f ./values.yaml
```

[101]: https://github.com/DataDog/helm-charts/blob/main/charts/private-action-runner/CHANGELOG.md
[102]: https://github.com/DataDog/helm-charts/blob/main/charts/private-action-runner/values.yaml

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /actions/private_actions/set_up_agent_based/
[3]: /actions/connections/
[5]: /actions/private_actions/enroll_runner/#manage-access-to-owned-runners
