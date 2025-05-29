---
title: Setting Up Cloud Security without Infrastructure Monitoring
---

In addition to setting up Cloud Security with or without an Agent, you can also set it up without Infrastructure Monitoring.

## Set up Cloud Security on your AWS account

1. Navigate to the [AWS Integration configuration page][2] in Datadog.
1. On the **Configuration** tab, select the account you want to enable Cloud Security on.

   If you don't see the required account, add it by clicking **Add AWS Account(s)** and following the onscreen prompts.
1. To turn off infrastructure monitoring on the selected account, under the account number, navigate to the **Metric Collection** tab, then click the **disable metric collection** link. Then, click **Disable Metric Collection** to confirm.
1. On the **Resource Collection** tab, click **Enable** next to Cloud Security. You are redirected to the Cloud Security Setup page, and a setup dialog automatically opens for the selected account.
1. On the setup dialog, switch the **Enable Resource Scanning** toggle to the on position.
1. Click **Done** to complete the setup.

**Note**: In your Cloud Security settings, set up [resource evaluation filters][1] to limit the number of hosts you need security on.

## Set up Cloud Security on your Azure subscription

1. Navigate to the [Azure Integration configuration page][3] in Datadog.
1. Select the client ID or subscription you want to enable Cloud Security on.

   If you don't see the required client ID, add it by clicking **Add New App Registration** and following the onscreen prompts.
1. To turn off infrastructure monitoring on the selected account, under the client ID, navigate to the **Metric Collection** tab, then turn off the **Enable Metric Collection** toggle. 
1. On the **Resource Collection** tab, click **Enable** next to Cloud Security. You are redirected to the Cloud Security Setup page, which automatically scrolls to the selected Azure subscription in the Cloud Integrations section.
1. Switch the **Resource Scanning** toggle to the on position.
1. Click **Done** to complete the setup.

**Note**: In your Cloud Security settings, set up [resource evaluation filters][1] to limit the number of hosts you need security on.

## Set up Cloud Security on your Google Cloud Platform account

1. Navigate to the [Google Cloud Platform configuration page][4] in Datadog.
1. Select the service account you want to enable Cloud Security on.

   If you don't see the required account, add it by clicking **Add GCP Account** and following the onscreen prompts.
1. To turn off infrastructure monitoring on the selected account, under the account name, navigate to the **Metric Collection** tab. Then, above the Metric Collection table, click **Disable All**.
1. On the **Resource Collection** tab, click **Enable** next to Cloud Security. You are redirected to the Cloud Security Setup page, which automatically scrolls to the selected Google Cloud Platform project in the Cloud Integrations section.
1. Switch the **Resource Scanning** toggle to the on position.
1. Click **Done** to complete the setup.

**Note**: In your Cloud Security settings, set up [resource evaluation filters][1] to limit the number of hosts you need security on.

[1]: /security/cloud_security_management/guide/resource_evaluation_filters/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/azure
[4]: https://app.datadoghq.com/integrations/google-cloud-platform