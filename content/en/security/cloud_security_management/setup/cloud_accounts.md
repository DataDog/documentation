---
title: Setting up Cloud Security Management on Cloud Accounts
aliases:
  - /security/cloud_security_management/setup/csm_enterprise/cloud_accounts
  - /security/cloud_security_management/setup/csm_pro/cloud_accounts
---

Use the following instructions to enable Misconfigurations and Identity Risks (CIEM).

## Enable resource scanning

To enable resource scanning for your cloud accounts, you must first set up the integration and then enable CSM for each AWS account, Azure subscription, and Google Cloud project.

{{< tabs >}}
{{% tab "AWS" %}}

{{% csm-setup-aws %}}

{{% /tab %}}

{{% tab "Azure" %}}

{{% csm-setup-azure %}}

{{% /tab %}}

{{% tab "Google Cloud" %}}

{{% csm-setup-google-cloud %}}

{{% /tab %}}

{{< /tabs >}}

## Disable resource collection

### AWS

### Azure

- **Azure**: On the **Setup & Configuration** > **Cloud Providers** tab, click the **Azure** tile, and turn off the **CSPM Enabled** toggle for your Azure subscriptions.


CSM Setup page

switch off the **Resource Scanning** toggle

Integration tile

Azure integration tile
Select an App Registration
On the **Resource Collection** tab, clear the **Enable Cloud Security Management** checkbox.

### Google Cloud