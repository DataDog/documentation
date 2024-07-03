---
description: SCCM (Systems Center Configuration Manager)
disable_toc: false
further_reading:
- link: /logs/
  tag: Documentation
  text: Collect your logs
- link: /infrastructure/process/
  tag: Documentation
  text: Collect your processes
- link: /tracing/
  tag: Documentation
  text: Collect your traces
- link: /agent/architecture
  tag: Documentation
  text: Find out more about the Agent's architecture
- link: /agent/configuration/network#configure-ports
  tag: Documentation
  text: Configure inbound ports
title: SCCM
---

Microsoft SCCM (Systems Center Configuration Manager) is a configuration management solution that comes packaged with Microsoft's Systems Center suite of tools. This page covers installing and configuring the Datadog Agent using SCCM.

## 前提条件

- The Agent supports SCCM version 2103 or greater.
- Before you install the Agent, make sure you've installed and configured [Distribution Points][1] in Configuration Manager.

## セットアップ

### Create a deployable Datadog Agent application

1. Download the latest Windows Datadog Agent installer file (MSI) to the SCCM server from the [Agent page][2].
1. In SCCM, create an application and use the location of the Datadog Agent MSI.
   {{< img src="/agent/basic_agent_usage/sccm/sccm-deployable-app.png" alt="Create a new application and use the Datadog Agent MSI as the target MSI." style="height:100%;" >}}
1. Click **Next** until you get to the **General Information** page.
1. Under **Installation program**, paste the following command, replacing `MY_API_KEY` with your API key:

   ```powershell
   start /wait msiexec /qn /i datadog-agent-7-latest.amd64.msi APIKEY="MY_API_KEY" SITE="datadoghq.com"
   ```

   For more installation options, see full list of [installation variables][3].

1. Ensure that **Install behavior** is set to **Install for system**.
1. Click **Next** and follow the prompts to create the application.
   {{< img src="/agent/basic_agent_usage/sccm/sccm-install-command.png" alt="Enter an installation program command and ensure that the install behavior is set to install for system." style="width:80%;" >}}
1. To verify the application has been created, look for it in **Software Library** > **Overview** > **Application Management** > **Applications**.

### Deploy the Datadog Agent application

<div class="alert alert-warning">Before deploying the Datadog Agent application, make sure you've installed and configured <a href="https://learn.microsoft.com/en-us/mem/configmgr/core/servers/deploy/configure/install-and-configure-distribution-points">Distribution Points</a> in Configuration Manager</div>

1. Go to **Software Library** > **Overview** > **Application Management** > **Applications** and select the Datadog Agent application you created earlier.
1. From the **Home** tab in the **Deployment** group, select **Deploy**.

### Agent の構成

SCCM packages allow you to deploy configuration files to your Datadog Agents, overwriting their default settings. An Agent configuration consists of a `datadog.yaml` configuration file and optional `conf.yaml` files for each integration. You must create a package for each configuration file you want to deploy.

1. Collect your `datadog.yaml` and `conf.yaml` files in a local SCCM machine folder. See the [sample `config_template.yaml` file][4] for all available configuration options.
1. Create an SCCM Package and select **Standard program**.
1. Select the location that contains the configuration file that you want to deploy to your Agents.
1. Select a [Device collection][5] to deploy the changes to.
1. Configure deployment settings to pre-install the package on the targets immediately.

{{< img src="agent/basic_agent_usage/sccm/sccm-select-program.png" alt="The program type screen. Select standard program" style="width:80%;" >}}

### Restart the Datadog Agent

Restart the Agent service to observe your configuration changes:
1. Create a PowerShell script to restart the Datadog Agent using [Agent commands][6].
1. Run the script to restart the Datadog Agent.
1. Check for new data in the Datadog UI.

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/mem/configmgr/core/servers/deploy/configure/manage-content-and-content-infrastructure
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[3]: /ja/agent/basic_agent_usage/windows/?tab=commandline#configuration
[4]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[5]: https://learn.microsoft.com/en-us/mem/configmgr/core/clients/manage/collections/create-collections#bkmk_create
[6]: /ja/agent/basic_agent_usage/windows/#agent-commands