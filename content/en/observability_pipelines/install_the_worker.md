---
title: Install the Worker
disable_toc: false
further_reading:
- link: "observability_pipelines/set_up_pipelines#set-up-a-pipeline"
  tag: "Documentation"
  text: "Set up pipelines"
---

## Overview

The Observability Pipelines Worker is software that runs in your environment to centrally aggregate, process, and route your logs. You install and configure the Worker as part of the pipeline setup process. These are the general steps for setting up a pipeline in the UI:

1. Select a log [source][2].
1. Select [destinations][3] to which you want to send your logs.
1. Select and configure [processors][4] to transform your logs.
1. [Install the Worker](#install-the-worker).
1. Deploy the pipeline.

**Note**: If you are using a proxy, see the `proxy` option in [Bootstrap options][1].

## Install the Worker

After you set up your source, destinations, and processors on the Build page of the pipeline UI, follow the steps on the Install page.

{{< img src="observability_pipelines/install_page.png" alt="The install page in the UI with a dropdown menu to choose your installation platform and fields to enter environment variables" style="width:100%;" >}}

1. Select the platform on which you want to install the Worker.
1. Enter the environment variables for your sources and destinations, if applicable.
1. Follow the instructions on installing the Worker for your platform. The command provided in the UI to install the Worker has the relevant environment variables populated.

{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/install_worker/docker %}}

{{% /tab %}}
{{% tab "Kubernetes" %}}

{{% observability_pipelines/install_worker/kubernetes %}}

{{% /tab %}}
{{% tab "Linux" %}}

<div class="alert alert-warning">For RHEL and CentOS, the Observability Pipelines Worker supports versions 8.0 or later.</div>

Follow the steps below if you want to use the one-line installation script to install the Worker. Otherwise, see [Manually install the Worker on Linux](#manually-install-the-worker-on-linux).

1. Click **Select API key** to choose the Datadog API key you want to use.
1. Run the one-step command provided in the UI to install the Worker.

    **Note**: The environment variables used by the Worker in `/etc/default/observability-pipelines-worker` are not updated on subsequent runs of the install script. If changes are needed, update the file manually and restart the Worker.
1. Navigate back to the Observability Pipelines installation page and click **Deploy**.

See [Update Existing Pipelines][1] if you want to make changes to your pipeline's configuration.

[1]: /observability_pipelines/update_existing_pipelines

{{% /tab %}}
{{% tab "CloudFormation" %}}

{{% observability_pipelines/install_worker/cloudformation %}}

{{% /tab %}}
{{< /tabs >}}

### Manually install the Worker on Linux

If you prefer not to use the one-line installation script for Linux, follow these step-by-step instructions:

{{< tabs >}}
{{% tab "APT" %}}

1. Set up APT transport for downloading using HTTPS:
    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```
1. Run the following commands to set up the Datadog `deb` repo on your system and create a Datadog archive keyring:
    ```shell
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable observability-pipelines-worker-2' > /etc/apt/sources.list.d/datadog-observability-pipelines-worker.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
    sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```
1. Run the following commands to update your local `apt` repo and install the Worker:
    ```shell
    sudo apt-get update
    sudo apt-get install observability-pipelines-worker datadog-signing-keys
    ```
1. Add your keys, site (for example, `datadoghq.com` for US1), source, and destination environment variables to the Worker's environment file:
    ```shell
    sudo cat <<EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<DATADOG_API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<DATADOG_SITE>
    <SOURCE_ENV_VARIABLES>
    <DESTINATION_ENV_VARIABLES>
    EOF
    ```
1. Start the worker:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

**Note**: The environment variables used by the Worker in `/etc/default/observability-pipelines-worker` are not updated on subsequent runs of the install script. If changes are needed, update the file manually and restart the Worker.

See [Update Existing Pipelines][1] if you want to make changes to your pipeline's configuration.

[1]: /observability_pipelines/update_existing_pipelines

{{% /tab %}}
{{% tab "RPM" %}}

<div class="alert alert-warning">For RHEL and CentOS, the Observability Pipelines Worker supports versions 8.0 or later.</div>

1. Set up the Datadog `rpm` repo on your system with the below command.<br>**Note**: If you are running RHEL 8.1 or CentOS 8.1, use `repo_gpgcheck=0` instead of `repo_gpgcheck=1` in the configuration below.
    ```shell
    cat <<EOF > /etc/yum.repos.d/datadog-observability-pipelines-worker.repo
    [observability-pipelines-worker]
    name = Observability Pipelines Worker
    baseurl = https://yum.datadoghq.com/stable/observability-pipelines-worker-2/\$basearch/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
        https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
    EOF
    ```
1. Update your packages and install the Worker:
    ```shell
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```
1. Add your keys, site (for example, `datadoghq.com` for US1), source, and destination environment variables to the Worker's environment file:
    ```shell
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    <SOURCE_ENV_VARIABLES>
    <DESTINATION_ENV_VARIABLES>
    EOF
    ```
1. Start the worker:
    ```shell
    sudo systemctl restart observability-pipelines-worker
    ```
1. Navigate back to the Observability Pipelines installation page and click **Deploy**.

**Note**: The environment variables used by the Worker in `/etc/default/observability-pipelines-worker` are not updated on subsequent runs of the install script. If changes are needed, update the file manually and restart the Worker.

See [Update Existing Pipelines][1] if you want to make changes to your pipeline's configuration.

[1]: /observability_pipelines/update_existing_pipelines

{{% /tab %}}
{{< /tabs >}}

## Uninstall the Worker

If you want to uninstall the work, run the following commands:

{{< tabs >}}
{{% tab "APT" %}}

```
apt-get remove --purge observability-pipelines-worker
```

{{% /tab %}}
{{% tab "RPM" %}}

1.
    ```
    sudo apt purge observability-pipelines-worker
    ```
1.
    ```
    yum remove observability-pipelines-worker
    ```
1.
    ```
    rpm -q --configfiles observability-pipelines-worker
    ```

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/advanced_configurations/#bootstrap-options
[2]: /observability_pipelines/sources/
[3]: /observability_pipelines/destinations/
[4]: /observability_pipelines/processors/