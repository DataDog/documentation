---
title: Setting Up CSM without Infrastructure Monitoring
---

In addition to setting up CSM with or without an Agent, you can also set it up without Infrastructure Monitoring.

<!-- ## Set up CSM on your AWS account -->

1. Navigate to the [AWS Integration configuration page][2] in Datadog.
1. On the **Configuration** tab, select the account you want to enable CSM on.

   If you don't see the required account, add it by clicking **Add AWS Account(s)** and following the onscreen prompts.
1. To turn off infrastructure monitoring on a given account, under the selected account number, navigate to the **Metric Collection** tab, then click the **disable metric collection** link. Then, click **Disable Metric Collection** to confirm.
1. To turn on CSM, on the **Resource Collection** tab, turn on the **Enable Resource Collection** toggle, and select the **Enable Cloud Security Management** checkbox.
1. Click **Save**.

**Note**: In your CSM settings, set up [resource evaluation filters][1] to limit the number of hosts you need security on.

<!-- ## Set up CSM on your Azure subscription

1. Navigate to the [Azure Integration configuration page][3] in Datadog.
1. Select the client ID you want to enable CSM on.

   If you don't see the required client ID, add it by clicking **Add New App Registration** and following the onscreen prompts.
1. To turn off infrastructure monitoring on a given account, under the selected client ID, navigate to the **Metric Collection** tab, then turn off the **Enable Metric Collection** toggle. 
1. To turn on CSM, on the **Resource Collection** tab, turn on the **Enable Resource Collection** toggle, and select the **Enable Cloud Security Management** checkbox.
1. Click **Save**.

**Note**: In your CSM settings, set up [resource evaluation filters][1] to limit the number of hosts you need security on. -->

[1]: /security/cloud_security_management/guide/resource_evaluation_filters/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/azure