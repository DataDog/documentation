### Enable Agentless Scanning for your Azure subscriptions

Complete the following steps to enable Agentless Scanning for your Azure subscriptions:

#### Cloud Security Setup page

1. On the [Cloud Security Setup][1010] page, click **Cloud Integrations** > **Azure**.
1. Locate the tenant ID of your subscription.
1. **(Optional)** To enable detection of misconfigurations, toggle **Resource Scanning** to the on position.
1. Expand the list of Azure subscriptions and locate the subscription where you want to deploy the Agentless scanner.
1. Click the **Enable** button under **Vulnerability Scanning**.
1. The **Vulnerability Scanning** dialog is displayed. Toggle **Vulnerability Scanning** to the on position.
1. Under **How would you like to set up Agentless Scanning?**, select **Azure Resource Manager**.
1. Click **Launch Azure Resource Manager** to be redirected to the Azure portal.

#### Azure portal

1. Log in to the Azure portal. The template creation form is displayed.
1. Select the subscription and the resource group in which the Agentless scanners are to be deployed. Datadog recommends that you deploy the Datadog Agentless Scanner in a dedicated resource group.
1. In **Subscriptions to scan**, select all the subscriptions you want to scan.
1. Enter your **Datadog API Key**, select your **Datadog Site**, and fill out the remainder of the form.
1. Click on **Review + create**.

[1010]: https://app.datadoghq.com/security/configuration/csm/setup