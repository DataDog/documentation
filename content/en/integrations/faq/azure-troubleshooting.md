---
title: Azure Troubleshooting
kind: faq
disable_toc: true
further_reading:
- link: "/integrations/azure/"
  tag: "Documentation"
  text: "Azure integration"
---

### Find your tenant name

1. Navigate to [portal.azure.com][1].
2. In the left sidebar, select **Azure Active Directory**.
3. Under **Properties**, your tenant name is the **Directory ID** value.

Your tenant name is also available from the URL when using the [classic portal][2]. It is the text in between (**not including**) the `@` and `#` symbol:

{{< img src="integrations/faq/azure_tenant_url.png" alt="azure tenant url" responsive="true" popup="true" style="width:70%">}}

### Unable to login
If you experience an error logging in while trying to install the Azure integration, contact [Datadog support][3]. When possible, attach a screenshot.

### Missing metrics
Ensure you completed the installation process, which includes giving read permissions to the Azure application for the subscriptions you want to monitor.

For ARM deployed virtual machines, you must also turn on Diagnostics and select the VM metrics you would like to collect. See **Enable Diagnostics** below for instructions.

For other missing metrics, contact [Datadog support][3].

#### Enable diagnostics

Turning on Diagnostics allows ARM deployed VMs to collect logging information which includes metrics for CPU, Network, etc. Follow these instructions:

1. Navigate to the [Azure portal][1] and locate your VM.
2. Click on **Diagnostics settings** under the **Monitoring** section.
3. Pick a storage account and click **Enable guest-level monitoring**.
4. By default, basic metrics and logs are enabled. Adjust based on your preferences.
5. Click **Save** to save any changes.

    {{< img src="integrations/faq/azure_enable_diagnostics.png" alt="azure enable diagnostics" responsive="true" popup="true" style="width:70%">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://portal.azure.com
[2]: https://manage.windowsazure.com
[3]: /help
