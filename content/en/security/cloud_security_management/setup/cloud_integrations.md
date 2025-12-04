---
title: Deploying Cloud Security via Cloud Integrations
aliases:
  - /security/cloud_security_management/setup/csm_enterprise/cloud_accounts
  - /security/cloud_security_management/setup/csm_pro/cloud_accounts
  - /security/cloud_security_management/setup/cloud_accounts
---

Use the following instructions to enable Misconfigurations and Identity Risks (CIEM) on AWS, Azure, and GCP.

## Enable resource scanning

To enable resource scanning for your cloud accounts, you must first set up the integration and then enable Cloud Security for each AWS account, Azure subscription, and Google Cloud project.

{{< partial name="security-platform/CSW-billing-note.html" >}}

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

## Disable resource scanning

<div class="alert alert-info">You can access historical findings from the past 15 months even if resource scanning is disabled.</div>

{{< tabs >}}
{{% tab "AWS" %}}

1. On the [**Cloud Security Setup**][1] page, click **Cloud Integrations** > **AWS**.
1. If required, use filters to find the account you want to stop resource collection for. Click the account to open the side panel that contains its settings.
1. On the **Features** tab, beside **Posture Management**, switch the **Enable** toggle to the off position.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://app.datadoghq.com/integrations/amazon-web-services

{{% /tab %}}
{{% tab "Azure" %}}

1. On the [**Cloud Security Setup**][1] page, click **Cloud Integrations** > **Azure**.
1. To stop resource collection for an account, switch the **Resource Scanning** toggle to the off position.
1. Click **Done**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://app.datadoghq.com/integrations/azure

{{% /tab %}}
{{% tab "Google Cloud" %}}

1. On the [**Cloud Security Setup**][1] page, click **Cloud Integrations** > **GCP**.
1. To stop resource collection for an account, switch the **Resource Scanning** toggle to the off position.
1. Click **Done**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://app.datadoghq.com/integrations/google-cloud-platform

{{% /tab %}}
{{< /tabs >}}

[1]: https://app.datadoghq.com/security/configuration/csm/setup