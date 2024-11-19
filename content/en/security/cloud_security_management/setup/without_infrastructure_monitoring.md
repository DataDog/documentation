---
title: Setting Up CSM without Infrastructure Monitoring
---

You can set up CSM without infrastructure monitoring, so you can save on costs.

**Tip**: In your CSM settings, set up [resource evaluation filters][1] to limit the number of hosts you need security on.

## Set up CSM on your AWS account

1. Go to the [AWS Integration configuration page][2] in Datadog.
1. On the **Configuration** tab, select the account you want to enable CSM on.
1. To turn off infrastructure monitoring, under the selected account number, on the **Metric Collection** tab, click the **disable metric collection** link. Then, click **Disable Metric Collection** to confirm.
1. To turn on CSM, on the **Resource Collection** tab, turn on the **Enable Resource Collection** toggle, and select the **Enable Cloud Security Management** check box.
1. Click **Save**.

## Set up CSM on your Azure subscription

1. Go to the [Azure Integration configuration page][3] in Datadog.
1. Select the client ID you want to enable CSM on.
1. To turn off infrastructure monitoring, under the selected client ID, on the **Metric Collection** tab, turn off the **Enable Metric Collection** toggle. 
1. To turn on CSM, on the **Resource Collection** tab, turn on the **Enable Resource Collection** toggle, and select the **Enable Cloud Security Management** check box.
1. Click **Save**.

[1]: /security/cloud_security_management/guide/resource_evaluation_filters/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/azure