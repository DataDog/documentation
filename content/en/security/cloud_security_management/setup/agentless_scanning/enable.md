---
title: Enabling Agentless Scanning
aliases:
  - /security/cloud_security_management/setup/agentless_scanning/quick_start
  - /security/cloud_security_management/setup/agentless_scanning/cloudformation
  - /security/cloud_security_management/setup/agentless_scanning/terraform
  - /security/cloud_security_management/setup/agentless_scanning/azure_resource_manager
  - /security/cloud_security_management/guide/agentless_aws_integration
  - /security/cloud_security_management/guide/agentless_terraform
further_reading:
  - link: "/security/cloud_security_management/setup"
    tag: "Documentation"
    text: "Setting up Cloud Security Management"
  - link: "/security/cloud_security_management/agentless_scanning"
    tag: "Documentation"
    text: "Cloud Security Management Agentless Scanning"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Agentless Scanning for Cloud Security Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Agentless Scanning provides visibility into vulnerabilities that exist within your cloud infrastructure, without requiring you to install the Datadog Agent. To learn more about Agentless Scanning's capabilities and how it works, see the [Agentless Scanning][12] docs.

## Prerequisites

Before setting up Agentless Scanning, ensure the following prerequisites are met:

- **Remote Configuration**: [Remote Configuration][3] is required to enable Datadog to send information to Agentless scanners, such as which cloud resources to scan.
- **Cloud permissions**: The Agentless Scanning instance requires specific permissions to scan hosts, host images, container registries, and functions. These permissions are automatically applied as part of the installation process.<br><br>
  {{< collapse-content title="AWS Host and container scanning permissions" level="h5" >}}
  <ul>
    <li><code>ec2:DescribeVolumes</code></li>
    <li><code>ec2:CreateTags</code></li>
    <li><code>ec2:CreateSnapshot</code></li>
    <li><code>ec2:DeleteSnapshot</code></li>
    <li><code>ec2:DescribeSnapshots</code></li>
    <li><code>ec2:DescribeSnapshotAttribute</code></li>
    <li><code>ebs:ListSnapshotBlocks</code></li>
    <li><code>ebs:ListChangedBlocks</code></li>
    <li><code>ebs:GetSnapshotBlock</code></li>
    <li><code>ecr:GetAuthorizationToken</code></li>
    <li><code>ecr:GetDownloadUrlForLayer</code></li>
    <li><code>ecr:BatchGetImage</code></li>
  </ul>
  {{< /collapse-content >}}

  {{< collapse-content title="AWS Lambda scanning permissions" level="h5" >}}
  <ul><li><code>lambda:GetFunction</code></li></ul>
  {{< /collapse-content >}}

  {{< collapse-content title="Azure Host scanning permissions" level="h5" >}}
  <ul>
    <li><code>Microsoft.Compute/virtualMachines/read</code></li>
    <li><code>Microsoft.Compute/virtualMachines/instanceView/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/instanceView/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/virtualMachines/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/virtualMachines/instanceView/read</code></li>
    <li><code>Microsoft.Compute/disks/read</code></li>
    <li><code>Microsoft.Compute/disks/beginGetAccess/action</code></li>
    <li><code>Microsoft.Compute/disks/endGetAccess/action</code></li>
  </ul>
  {{< /collapse-content >}}

## Setup

<div class="alert alert-warning">Running Agentless scanners incurs additional costs. To optimize these costs while still ensuring reliable 12-hour scans, Datadog recommends setting up <a href="#terraform">Agentless Scanning with Terraform</a> as the default template.</div>

To enable Agentless Scanning, use one of the following workflows:

### Quick start

Designed for new users, the quick start workflow offers an efficient setup process for Cloud Security Management, enabling immediate monitoring of AWS resources. It uses AWS CloudFormation to automate the configuration.

{{% collapse-content title="Quick start setup guide" level="h4" %}}
Designed for new users, the quick start workflow offers an efficient setup process for Cloud Security Management, enabling immediate monitoring of AWS resources. It uses AWS CloudFormation to automate the configuration, and includes the Cloud Security Management features: Misconfigurations, Identity Risks (CIEM), and Vulnerability Management.

<div class="alert alert-info">This article provides instructions for the new user quick start workflow that uses AWS CloudFormation to set up Agentless Scanning.
For existing users who want to add a new AWS account or enable Agentless Scanning on an existing integrated AWS account, see the instructions for
<a href="#terraform">Terraform</a> or <a href="#aws-cloudformation">AWS CloudFormation</a>.</div>

<div class="alert alert-warning">Running Agentless scanners incurs additional costs. To optimize these costs while still ensuring reliable 12-hour scans, Datadog recommends setting up <a href="#terraform">Agentless Scanning with Terraform</a> as the default template.</div>

##### Installation

1. On the [Intro to Cloud Security Management][4] page, click **Get Started with Cloud Security Management**.
1. Click **Quick Start**. The **Features** page is displayed, showing the features included with Agentless Scanning Quick Start.
1. Click **Start Using Cloud Security Management** to continue.
1. Select the AWS region where you want to create the CloudFormation stack.
1. Select an API key that is already configured for Remote Configuration. If the API key you select does not have Remote Configuration enabled, Remote Configuration is automatically enabled for that key upon selection.
1. **Send AWS Logs to Datadog** and **Detect security issues** are automatically selected by default. Leave the selections as-is.
1. The **Enable Vulnerability Management (Host, Container and Lambda)** switch is also enabled by default. Leave this selection as-is.
1. Click **Launch CloudFormation Template**. A new window opens, displaying the AWS CloudFormation screen. Use the provided CloudFormation template to create a stack. The template includes the IAM permissions required to deploy and manage Agentless scanners.

##### Exclude resources from scans

{{% csm-agentless-exclude-resources %}}

##### Update the CloudFormation stack

Datadog recommends updating the CloudFormation stack regularly, so you can get access to new features and bug fixes as they get released. To do so, follow these steps:
1. Log in to your AWS console and go to the CloudFormation Stacks page.
2. Select the **DatadogIntegration-DatadogAgentlessScanning-...** CloudFormation sub-stack, click **Update**, then click **Update nested stack**.
3. Click **Replace existing template**.
4. In the following S3 URL: `https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/<VERSION>/datadog_agentless_scanning.yaml`, replace `<VERSION>` with the version found in [aws_quickstart/version.txt][14]. Paste that URL into the **Amazon S3 URL** field.
5. Click **Next** to advance through the next several pages without modifying them, then submit the form.

##### Disable Agentless Scanning

1. On the [Cloud Security Management Setup][10] page, click **Cloud Integrations** > **AWS**.
1. To disable Agentless Scanning for an account, click the **Edit** button ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) and toggle the **Agentless Scanning** section to the off position.
1. Click **Done**.

##### Uninstall Agentless Scanning

To uninstall Agentless Scanning, log in to your AWS console and delete the CloudFormation stack created for Agentless Scanning.

{{% /collapse-content %}}

<br />

### Terraform

The [Terraform Datadog Agentless Scanner module][6] provides a simple and reusable configuration for installing the Datadog Agentless scanner.

{{% collapse-content title="Terraform setup guide" level="h4" %}}
If you've already [set up Cloud Security Management][10] and want to add a new cloud account or enable [Agentless Scanning][1] on an existing integrated cloud account, you can use either Terraform, [AWS CloudFormation][2], or [Azure Resource Manager][5]. This article provides detailed instructions for the Terraform approach.

<div class="alert alert-info">If you're setting up Cloud Security Management for the first time, you can follow the <a href="#quick-start">quick start workflow</a>, which uses AWS CloudFormation to enable Agentless Scanning.</div>

{{< tabs >}}
{{% tab "New AWS account" %}}

1. On the [Cloud Security Management Setup][1] page, click **Cloud Integrations > AWS**.
1. At the bottom of the AWS section, click **Add AWS accounts by following these steps**. The **Add New AWS Account(s)** dialog is displayed.
1. Under **Choose a method for adding your AWS account**, select **Manually**.
1. Follow the instructions for installing the [Datadog Agentless Scanner module][2].
1. Select the **I confirm that the Datadog IAM Role has been added to the AWS Account** checkbox.
1. Enter the **AWS Account ID** and **AWS Role Name**.
1. Click **Save**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-datadog-agentless-scanner/blob/main/README.md

{{% /tab %}}

{{% tab "Existing AWS account" %}}

1. On the [Cloud Security Management Setup][1] page, click **Cloud Integrations > AWS**.
1. Click the **Edit scanning** button ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) for the AWS account where you want to deploy the Agentless scanner.
1. **Enable Resource Scanning** should already be toggled on. If it isn't, toggle **Enable Resource Scanning** to the on position.
1. In the **How would you like to set up Agentless Scanning?** section, select **Terraform**.
1. Follow the instructions for installing the [Datadog Agentless Scanner module][2].
1. In the **Agentless Scanning** section, toggle **Host Vulnerability Scanning**, **Container Vulnerability Scanning**, **Lambda Vulnerability Scanning**, and **Data Security Scanning** to the on position.
1. Click **Done**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-datadog-agentless-scanner/blob/main/README.md

{{% /tab %}}

{{% tab "Existing Azure subscription" %}}

1. On the [Cloud Security Management Setup][1] page, click **Cloud Integrations > Azure**.
1. Expand the Tenant containing the subscription where you want to deploy the Agentless scanner.
1. Click the **Enable** button for the Azure subscription where you want to deploy the Agentless scanner.
1. Toggle **Vulnerability Scanning** to the on position.
1. In the **How would you like to set up Agentless Scanning?** section, select **Terraform**.
1. Follow the instructions for installing the [Datadog Agentless Scanner module][2].
1. Click **Done**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme

{{% /tab %}}
{{< /tabs >}}

##### Exclude resources from scans

{{% csm-agentless-exclude-resources %}}

##### Disable Agentless Scanning

1. On the [Cloud Security Management Setup][10] page, click **Cloud Integrations**, and then expand the **AWS** or **Azure** section.
1. To disable Agentless Scanning for an account, click the **Edit** button ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) and toggle **Vulnerability Scanning** to the off position.
1. Click **Done**.

##### Uninstall with Terraform

Follow the instructions for [Terraform][9] uninstallation.

##### Update the Terraform modules version

Update the `source` reference for the Agentless Scanner modules to the latest release. You can find the latest version on [GitHub Releases](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/releases).

For usage examples, refer to our [Github repository](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples).

[1]: /security/cloud_security_management/agentless_scanning
[2]: #aws-cloudformation
[5]: #azure-resource-manager

{{% /collapse-content %}}

<br />

### AWS Cloudformation

Use the AWS CloudFormation template to create a CloudFormation stack. The template includes the IAM permissions required to deploy and manage Agentless scanners.

{{% collapse-content title="AWS CloudFormation setup guide" level="h4" %}}
If you've already [set up Cloud Security Management][10] and want to add a new cloud account or enable [Agentless Scanning][1] on an existing integrated AWS account, you can use either [Terraform][7] or AWS CloudFormation. This article provides detailed instructions for the AWS CloudFormation approach.

<div class="alert alert-info">If you're setting up Cloud Security Management for the first time, you can follow the <a href="#quick-start">quick start workflow</a>, which also uses AWS CloudFormation to enable Agentless Scanning.</div>

<div class="alert alert-warning">Running Agentless scanners incurs additional costs. To optimize these costs while still ensuring reliable 12-hour scans, Datadog recommends setting up <a href="#terraform">Agentless Scanning with Terraform</a> as the default template.</div>

##### Set up AWS CloudFormation

{{< tabs >}}
{{% tab "New AWS account" %}}

1. On the [Cloud Security Management Setup][1] page, click **Cloud Integrations** > **AWS**.
1. At the bottom of the AWS section, click **Add AWS accounts by following these steps**. The **Add New AWS Account(s)** dialog is displayed.
1. Select the AWS region where you want to create the CloudFormation stack.
1. Select an API key that is already configured for Remote Configuration. If the API key you select does not have Remote Configuration enabled, Remote Configuration is automatically enabled for that key upon selection.
1. **Send AWS Logs to Datadog** and **Detect security issues** are automatically selected by default. Leave the selections as-is.
1. The **Enable Vulnerability Management (Host, Container and Lambda)** switch is also enabled by default. Leave this selection as-is.
1. Click **Launch CloudFormation Template**. A new window opens, displaying the AWS CloudFormation screen. Use the provided CloudFormation template to create a stack. The template includes the IAM permissions required to deploy and manage Agentless scanners.

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "Existing AWS account" %}}

1. On the [Cloud Security Management Setup][1] page, click **Cloud Integrations** > **AWS**.
1. Click the **Edit** button ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) for the AWS account where you want to deploy the Agentless scanner.
1. Verify that **Enable Resource Scanning** is toggled on. If it isn't, switch the **Enable Resource Scanning** toggle to the on position and complete Steps 3-7 in [New AWS Account][2].
1. In the **Agentless Scanning** section, toggle **Host Vulnerability Scanning**, **Container Vulnerability Scanning**, **Lambda Vulnerability Scanning**, and **Data Security Scanning** to the on position.
1. Click **Done**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: /security/cloud_security_management/setup/agentless_scanning/enable?tab=newawsaccount#set-up-aws-cloudformation

{{% /tab %}}
{{< /tabs >}}

##### Exclude resources from scans

{{% csm-agentless-exclude-resources %}}

##### Update the CloudFormation stack

Datadog recommends updating the CloudFormation stack regularly, so you can get access to new features and bug fixes as they get released. To do so, follow these steps:
1. Log in to your AWS console and go to the CloudFormation Stacks page.
2. Select the **DatadogIntegration-DatadogAgentlessScanning-...** CloudFormation sub-stack, click **Update**, then click **Update nested stack**.
3. Click **Replace existing template**.
4. In the following S3 URL: `https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/<VERSION>/datadog_agentless_scanning.yaml`, replace `<VERSION>` with the version found in [aws_quickstart/version.txt][14]. Paste that URL into the **Amazon S3 URL** field.
5. Click **Next** to advance through the next several pages without modifying them, then submit the form.

##### Disable Agentless Scanning

1. On the [Cloud Security Management Setup][10] page, click **Cloud Integrations** > **AWS**.
1. To disable Agentless Scanning for an account, click the **Edit** button ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) and toggle the **Agentless Scanning** section to the off position.
1. Click **Done**.

##### Uninstall with CloudFormation

To uninstall Agentless Scanning, log in to your AWS console and delete the CloudFormation stack created for Agentless Scanning.
{{% /collapse-content %}}

<br />

### Azure Resource Manager

Use the Azure Resource Manager template to deploy the Agentless Scanner. The template includes the role definitions required to deploy and manage Agentless scanners.

{{% collapse-content title="Azure Resource Manager setup guide" level="h4" %}}
If you've already [set up Cloud Security Management][10] and want to add a new Azure subscription or enable [Agentless Scanning][1] on an existing integrated Azure subscription, you can use either [Terraform][7] or Azure Resource Manager. This article provides detailed instructions for the Azure Resource Manager approach.

<div class="alert alert-warning">Running Agentless scanners incurs additional costs. To optimize these costs while still ensuring reliable 12-hour scans, Datadog recommends setting up <a href="#terraform">Agentless Scanning with Terraform</a> as the default template.</div>

{{< tabs >}}
{{% tab "New Azure subscription" %}}

###### Set up the Datadog Azure integration

Follow the instructions for setting up the [Datadog Azure integration][1].

{{% csm-agentless-azure-resource-manager %}}

[1]: /integrations/guide/azure-manual-setup/?tab=azurecli
{{% /tab %}}

{{% tab "Existing Azure subscription" %}}

{{% csm-agentless-azure-resource-manager %}}

{{% /tab %}}
{{< /tabs >}}

##### Exclude resources from scans

{{% csm-agentless-exclude-resources %}}

##### Disable Agentless Scanning

1. On the [Cloud Security Management Setup][10] page, click **Cloud Integrations** > **Azure**.
1. Locate your subscription's tenant, expand the list of subscriptions, and identify the subscription for which you want to disable Agentless Scanning.
1. Click the **Edit** button ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) and toggle **Vulnerability Scanning** to the off position.
1. Click **Done**.

##### Uninstall with Azure Resource Manager

To uninstall Agentless Scanning, log in to your Azure subscription. If you created a dedicated resource group for the Agentless scanner, delete this resource group along with the following Azure role definitions:
  - Datadog Agentless Scanner Role
  - Datadog Agentless Scanner Delegate Role

If you did not use a dedicated resource group, you must manually delete the scanner resources, which can be identified by the tags `Datadog:true` and `DatadogAgentlessScanner:true`.
{{% /collapse-content %}}

<br />

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/agentless_scanning
[2]: /integrations/amazon_web_services/
[3]: /agent/remote_config/?tab=configurationyamlfile#setup
[4]: https://app.datadoghq.com/security/csm/
[6]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner
[7]: #terraform
[8]: mailto:success@datadoghq.com
[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall
[10]: https://app.datadoghq.com/security/configuration/csm/setup
[11]: #aws-cloudformation
[12]: /security/cloud_security_management/agentless_scanning
[13]: #azure-resource-manager
[14]: https://github.com/DataDog/cloudformation-template/blob/master/aws_quickstart/version.txt