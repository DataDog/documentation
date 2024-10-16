---
title: Deploying Cloud Security Management via Cloud Integrations
aliases:
  - /security/cloud_security_management/setup/csm_enterprise/cloud_accounts
  - /security/cloud_security_management/setup/csm_pro/cloud_accounts
  - /security/cloud_security_management/setup/cloud_accounts
---

Use the following instructions to enable Misconfigurations and Identity Risks (CIEM) on AWS, Azure, and GCP.

## Enable resource scanning

To enable resource scanning for your cloud accounts, you must first set up the integration and then enable CSM for each AWS account, Azure subscription, and Google Cloud project.

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

To disable resource scanning for your cloud accounts, navigate to either the [**CSM Setup**][1] page or the cloud account integration page. Disabling resource scanning does not affect your ability to access historical findings. You can still review data from the past 15 months.

{{< tabs >}}
{{% tab "AWS" %}}

### CSM Setup page

1. On the [**Cloud Security Management Setup**][1] page, click **Cloud Integrations**.
1. Expand the **AWS** section.
1. To stop resource collection for an account, click the Edit button and switch the **Enable Resource Scanning** toggle to the off position.
1. Click **Done**.

### Amazon Web Services integration page

1. On the [**Amazon Web Services Integration**][2] page, select an AWS account.
1. On the **Resource Collection** tab, clear the **Enable Cloud Security Management** checkbox.
1. Click Save.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://app.datadoghq.com/integrations/amazon-web-services

{{% /tab %}}
{{% tab "Azure" %}}

### CSM Setup page

1. On the [**Cloud Security Management Setup**][1] page, click **Cloud Integrations**.
1. Expand the **Azure** section.
1. To stop resource collection for a subscription, switch the **Resource Scanning** toggle to the off position.
1. Click **Done**.

### Azure integration page

1. On the [**Azure Integration**][2] page, select an app registration.
1. On the **Resource Collection** tab, clear the **Enable Cloud Security Management** checkbox.
1. Click Save.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://app.datadoghq.com/integrations/azure

{{% /tab %}}
{{% tab "Google Cloud" %}}

### CSM Setup page

1. On the [**Cloud Security Management Setup**][1] page, click **Cloud Integrations**.
1. Expand the **GCP** section.
1. To stop resource collection for a project, switch the **Resource Scanning** toggle to the off position.
1. Click **Done**.

### Google Cloud Platform integration page

1. On the [**Google Cloud Platform Integration**][2] page, select a Google Cloud account.
1. On the **Resource Collection** tab, clear the **Enable Cloud Security Management** checkbox.
1. Click **Save**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://app.datadoghq.com/integrations/google-cloud-platform

{{% /tab %}}
{{< /tabs >}}

[1]: https://app.datadoghq.com/security/configuration/csm/setup