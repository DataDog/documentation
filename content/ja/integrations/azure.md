---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Datadog-Microsoft Azure インテグレーション
integration_title: Microsoft Azure
kind: integration
sidebar:
  nav:
    - header: Azure integration
    - text: Configure Monitoring
      href: "#monitoring"
    - text: Deploy agents
      href: "#agents"
    - text: Troubleshooting
      href: "#troubleshooting"
    - header: Integrations
    - text: Back to Overview
      href: "/integrations/"
---


### Configure Azure Monitoring
{: #monitoring}

Microsoft Azure supports both PaaS and IaaS (VM) services. Right now Datadog monitoring is tailored for IaaS services. But it can also be installed in worker and web roles.

To setup Azure monitoring, go to [Azure integrations][1] and follow instructions on the page.

#### Enable diagnostics
To enable agent-less monitoring, you must enable diagnostics. Right now this is only support by Windows based machines. To do this, first go to [Azure preview portal][2] then follow the instructions below.
![](/static/images/azure_diag_manual.png)

After locating your VM:
1. Click on the CPU percentage today panel to show metrics panel
2. Click on Diagnostics
3. Shift the switch to open
4. Click OK to save your changes

Datadog only requires Basic metrics, network and web metrics as well as .Net metrics to function correctly. Un-check logs collection could save you some storage space.

### Deploy agents
{: #agents}
You can either deploy agents manually by following the instructions <a href="/guides/azure/">here</a>.

### Troubleshooting
{: #troubleshooting}
Here are some common issues you might be seeing.

#### I don't know my tenent name
To locate your tenent name first log into the current [Azure portal][4].
After logging in, locate the settings page on the left side of the screen.
![](/static/images/azure_tenent.png)

The text in the red box shown in sceenshot above is your tenent name. Please only include text between parentheses.

#### Unable to login
If you have experienced error logging in while trying to install the integration, please reach out to [support@datadoghq.com][3]. When possible, please attache screen shot.

#### No metrics are showing up
Please make sure you have enabled diagnostics on your VMs. Diagnostics allows VMs to collect logging information which includes metrics for CPU, Network etc.





   [1]: https://app.datadoghq.com/account/settings#integrations/azure
   [2]: https://portal.azure.com
   [3]: mailto:support@datadoghq.com
   [4]: https://management.azure.com
