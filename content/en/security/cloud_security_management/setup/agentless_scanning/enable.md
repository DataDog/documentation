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
    text: "Setting up Cloud Security"
  - link: "/security/cloud_security_management/agentless_scanning"
    tag: "Documentation"
    text: "Cloud Security Agentless Scanning"
---

Agentless Scanning provides visibility into vulnerabilities that exist within your cloud infrastructure, without requiring you to install the Datadog Agent. To learn more about Agentless Scanning's capabilities and how it works, see the [Agentless Scanning][12] docs.

## Prerequisites

Before setting up Agentless Scanning, ensure the following prerequisites are met:

- **Remote Configuration**: [Remote Configuration][3] is required to enable Datadog to send information to Agentless scanners, such as which cloud resources to scan.
- **API and Application Keys**:
  - An API key with Remote Configuration enabled is required for scanners to report scan results to Datadog.
  - An Application key with either **Integrations Manage** or **Org Management** permissions is required to enable scanning features through the Datadog API.
- **Cloud permissions**: The Agentless Scanning instance requires specific permissions to scan hosts, host images, container registries, and functions. These permissions are automatically applied as part of the installation process and are strictly limited to the minimum permissions required to perform the necessary scans, following the principle of least privilege.<br><br>
  {{< collapse-content title="AWS scanning permissions" level="h5" >}}
  <p>Scanning permissions:</p>
  <ul>
    <li><code>ebs:GetSnapshotBlock</code></li>
    <li><code>ebs:ListChangedBlocks</code></li>
    <li><code>ebs:ListSnapshotBlocks</code></li>
    <li><code>ec2:CopySnapshot</code></li>
    <li><code>ec2:CreateSnapshot</code></li>
    <li><code>ec2:CreateTags</code></li>
    <li><code>ec2:DeleteSnapshot</code></li>
    <li><code>ec2:DeregisterImage</code></li>
    <li><code>ec2:DescribeSnapshotAttribute</code></li>
    <li><code>ec2:DescribeSnapshots</code></li>
    <li><code>ec2:DescribeVolumes</code></li>
    <li><code>ecr:BatchGetImage</code></li>
    <li><code>ecr:GetAuthorizationToken</code></li>
    <li><code>ecr:GetDownloadUrlForLayer</code></li>
    <li><code>kms:CreateGrant</code></li>
    <li><code>kms:Decrypt</code></li>
    <li><code>kms:DescribeKey</code></li>
    <li><code>lambda:GetFunction</code></li>
    <li><code>lambda:GetLayerVersion</code></li>
  </ul>
  <p>Only when Sensitive Data Scanning (DSPM) is enabled:</p>
  <ul>
    <li><code>kms:GenerateDataKey</code></li>
    <li><code>s3:GetObject</code></li>
    <li><code>s3:ListBucket</code></li>
  </ul>
  {{< /collapse-content >}}

  {{< collapse-content title="Azure scanning permissions" level="h5" >}}
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

  {{< collapse-content title="GCP scanning permissions" level="h5" >}}
  <ul>
    <li><code>compute.disks.create</code></li>
    <li><code>compute.disks.createSnapshot</code></li>
    <li><code>compute.disks.delete</code></li>
    <li><code>compute.disks.get</code></li>
    <li><code>compute.disks.setLabels</code></li>
    <li><code>compute.disks.use</code></li>
    <li><code>compute.globalOperations.get</code></li>
    <li><code>compute.images.get</code></li>
    <li><code>compute.instances.attachDisk</code></li>
    <li><code>compute.instances.detachDisk</code></li>
    <li><code>compute.snapshots.create</code></li>
    <li><code>compute.snapshots.get</code></li>
    <li><code>compute.snapshots.list</code></li>
    <li><code>compute.snapshots.delete</code></li>
    <li><code>compute.snapshots.setLabels</code></li>
  </ul>
  {{< /collapse-content >}}

## Setup

<div class="alert alert-danger">Running Agentless scanners incurs additional costs. To optimize these costs while still ensuring reliable 12-hour scans, Datadog recommends setting up <a href="#terraform-setup">Agentless Scanning with Terraform</a> as the default template.</div>

To enable Agentless Scanning, use one of the following workflows:

### Quick start

Designed for new users, the quick start workflow offers an efficient setup process for Cloud Security, enabling immediate monitoring of AWS resources. It uses AWS CloudFormation to automate the configuration.

{{% collapse-content title="Quick start setup guide" level="h4" id="quick-start-setup" %}}
Designed for new users, the quick start workflow offers an efficient setup process for Cloud Security, enabling immediate monitoring of AWS resources. It uses AWS CloudFormation to automate the configuration, and includes the Cloud Security features: Misconfigurations, Identity Risks (CIEM), and Vulnerability Management.

<div class="alert alert-info">This article provides instructions for the new user quick start workflow that uses AWS CloudFormation to set up Agentless Scanning.
For existing users who want to add a new AWS account or enable Agentless Scanning on an existing integrated AWS account, see the instructions for
<a href="#terraform-setup">Terraform</a> or <a href="#aws-cloudformation-setup">AWS CloudFormation</a>.</div>

<div class="alert alert-danger">Running Agentless scanners incurs additional costs. To optimize these costs while still ensuring reliable 12-hour scans, Datadog recommends setting up <a href="#terraform-setup">Agentless Scanning with Terraform</a> as the default template.</div>

<div class="alert alert-danger">Sensitive Data Scanner for cloud storage is in Limited Availability. <a href="https://www.datadoghq.com/private-beta/data-security">Request Access</a> to enroll.</div>

##### Installation

1. On the [Intro to Cloud Security][4] page, click **Get Started with Cloud Security**.
1. Click **Quick Start**. The **Features** page is displayed, showing the features included with Agentless Scanning Quick Start.
1. Click **Start Using Cloud Security** to continue.
1. Select the AWS region where you want to create the CloudFormation stack.
1. Select an API key that is already configured for Remote Configuration. If the API key you select does not have Remote Configuration enabled, Remote Configuration is automatically enabled for that key upon selection.
1. Choose whether to enable **Sensitive Data Scanner** for cloud storage. This automatically catalogs and classifies sensitive data in Amazon S3 resources.
1. Click **Launch CloudFormation Template**. A new window opens, displaying the AWS CloudFormation screen. Use the provided CloudFormation template to create a stack. The template includes the IAM permissions required to deploy and manage Agentless scanners.

##### Update the CloudFormation stack

Datadog recommends updating the CloudFormation stack regularly, so you can get access to new features and bug fixes as they get released. To do so, follow these steps:
1. Log in to your AWS console and go to the CloudFormation Stacks page.
2. Select the **DatadogIntegration-DatadogAgentlessScanning-...** CloudFormation sub-stack, click **Update**, then click **Update nested stack**.
3. Click **Replace existing template**.
4. In the following S3 URL: `https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/<VERSION>/datadog_agentless_scanning.yaml`, replace `<VERSION>` with the version found in [aws_quickstart/version.txt][14]. Paste that URL into the **Amazon S3 URL** field.
5. Click **Next** to advance through the next several pages without modifying them, then submit the form.

{{% /collapse-content %}}

<br />

### Terraform

The [Terraform Datadog Agentless Scanner module][6] provides a simple and reusable configuration for installing the Datadog Agentless scanner for AWS, Azure, and GCP.

{{% collapse-content title="Terraform setup guide" level="h4" id="terraform-setup" %}}
If you've already [set up Cloud Security][10] and want to add a new cloud account or enable [Agentless Scanning][1] on an existing integrated cloud account, you can use either Terraform, [AWS CloudFormation][2], or [Azure Resource Manager][5]. This article provides detailed instructions for the Terraform approach.

<div class="alert alert-info">If you're setting up Cloud Security for the first time, you can follow the <a href="#quick-start-setup">quick start workflow</a>, which uses AWS CloudFormation to enable Agentless Scanning.</div>

{{< tabs >}}
{{% tab "New AWS account" %}}

1. On the [Cloud Security Setup][1] page, click **Cloud Integrations > AWS**.
1. At the bottom of the AWS section, click **Add AWS accounts by following these steps**. The **Add New AWS Account(s)** dialog is displayed.
1. Under **Choose a method for adding your AWS account**, select **Manually**.
1. Follow the instructions for installing the [Datadog Agentless Scanner module][2].
1. Select the **I confirm that the Datadog IAM Role has been added to the AWS Account** checkbox.
1. Enter the **AWS Account ID** and **AWS Role Name**.
1. Click **Save**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md

{{% /tab %}}

{{% tab "Existing AWS account" %}}

1. On the [Cloud Security Setup][1] page, click **Cloud Integrations > AWS**.
1. Click the **Edit scanning** button ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) for the AWS account where you want to deploy the Agentless scanner.
1. **Enable Resource Scanning** should already be toggled on. If it isn't, toggle **Enable Resource Scanning** to the on position.
1. In the **How would you like to set up Agentless Scanning?** section, select **Terraform**.
1. Follow the instructions for installing the [Datadog Agentless Scanner module][2].
1. Select the **I confirm the Terraform module is installed** check box.
1. Click **Done**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md

{{% /tab %}}

{{% tab "Existing Azure account" %}}

1. On the [Cloud Security Setup][1] page, click **Cloud Integrations > Azure**.
1. Expand the Tenant containing the subscription where you want to deploy the Agentless scanner.
1. Click the **Enable** button for the Azure account where you want to deploy the Agentless scanner.
1. Toggle **Vulnerability Scanning** to the on position.
1. In the **How would you like to set up Agentless Scanning?** section, select **Terraform**.
1. Follow the instructions for installing the [Datadog Agentless Scanner module][2].
1. Click **Done**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme

{{% /tab %}}

{{% tab "Existing GCP project" %}}

1. On the [Cloud Security Setup][1] page, click **Cloud Integrations > GCP**.
1. Expand the account containing the project where you want to deploy the Agentless scanner.
1. Click the **Enable** button for the GCP project where you want to deploy the Agentless scanner.
1. Toggle **Vulnerability Scanning** to the on position.
1. Follow the instructions for installing the [Datadog Agentless Scanner module][2].
1. Click **Done**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme

{{% /tab %}}
{{< /tabs >}}

##### Update the Terraform modules version

Update the `source` reference for the Agentless Scanner modules to the latest release. You can find the latest version on [GitHub Releases](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/releases).

For usage examples, refer to our [Github repository](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples).

[1]: /security/cloud_security_management/agentless_scanning
[2]: #aws-cloudformation-setup
[5]: #azure-resource-manager-setup

{{% /collapse-content %}}

<br />

### AWS Cloudformation

Use the AWS CloudFormation template to create a CloudFormation stack. The template includes the IAM permissions required to deploy and manage Agentless scanners.

{{% collapse-content title="AWS CloudFormation setup guide" level="h4" id="aws-cloudformation-setup" %}}
If you've already [set up Cloud Security][10] and want to add a new cloud account or enable [Agentless Scanning][1] on an existing integrated AWS account, you can use either [Terraform][7] or AWS CloudFormation. This article provides detailed instructions for the AWS CloudFormation approach.

<div class="alert alert-info">If you're setting up Cloud Security for the first time, you can follow the <a href="#quick-start-setup">quick start workflow</a>, which also uses AWS CloudFormation to enable Agentless Scanning.</div>

<div class="alert alert-danger">Running Agentless scanners incurs additional costs. To optimize these costs while still ensuring reliable 12-hour scans, Datadog recommends setting up <a href="#terraform-setup">Agentless Scanning with Terraform</a> as the default template.</div>

<div class="alert alert-danger">Sensitive Data Scanner for cloud storage is in Limited Availability. <a href="https://www.datadoghq.com/private-beta/data-security">Request Access</a> to enroll.</div>

##### Set up AWS CloudFormation

{{< tabs >}}
{{% tab "New AWS account" %}}

1. On the [Cloud Security Setup][1] page, click **Cloud Integrations** > **AWS**.
1. At the bottom of the AWS section, click **Add AWS accounts by following these steps**. The **Add New AWS Account(s)** dialog is displayed.
1. Select the AWS region where you want to create the CloudFormation stack.
1. Select an API key that is already configured for Remote Configuration. If the API key you select does not have Remote Configuration enabled, Remote Configuration is automatically enabled for that key upon selection.
1. Choose whether to enable **Sensitive Data Scanner** for cloud storage. This automatically catalogs and classifies sensitive data in Amazon S3 resources.
1. Click **Launch CloudFormation Template**. A new window opens, displaying the AWS CloudFormation screen. Use the provided CloudFormation template to create a stack. The template includes the IAM permissions required to deploy and manage Agentless scanners.

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "Existing AWS account" %}}

1. On the [Cloud Security Setup][1] page, click **Cloud Integrations** > **AWS**.
1. Click the **Edit** button ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) for the AWS account where you want to deploy the Agentless scanner.
1. Verify that **Enable Resource Scanning** is toggled on. If it isn't, switch the **Enable Resource Scanning** toggle to the on position and complete Steps 3-7 in [New AWS Account][2].
1. In the **Agentless Scanning** section, toggle **Enable Vulnerability Management (Host, Container and Lambda)** to the on position.
1. Choose whether to **Enable Sensitive Data Scanner for Cloud Storage**. This automatically catalogs and classifies sensitive data in Amazon S3 resources.
1. Click **Done**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: /security/cloud_security_management/setup/agentless_scanning/enable?tab=newawsaccount#set-up-aws-cloudformation

{{% /tab %}}
{{< /tabs >}}

##### Update the CloudFormation stack

Datadog recommends updating the CloudFormation stack regularly, so you can get access to new features and bug fixes as they get released. To do so, follow these steps:
1. Log in to your AWS console and go to the CloudFormation Stacks page.
2. Select the **DatadogIntegration-DatadogAgentlessScanning-...** CloudFormation sub-stack, click **Update**, then click **Update nested stack**.
3. Click **Replace existing template**.
4. In the following S3 URL: `https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/<VERSION>/datadog_agentless_scanning.yaml`, replace `<VERSION>` with the version found in [aws_quickstart/version.txt][14]. Paste that URL into the **Amazon S3 URL** field.
5. Click **Next** to advance through the next several pages without modifying them, then submit the form.
{{% /collapse-content %}}

<br />

### AWS CloudFormation StackSet (Multi-Account)

For AWS Organizations with multiple accounts, use a CloudFormation StackSet to deploy the Agentless Scanning delegate role across all member accounts. This approach automates the onboarding process and ensures new accounts added to your Organization are automatically configured.

{{% collapse-content title="AWS CloudFormation StackSet setup guide" level="h4" id="aws-cloudformation-stackset-setup" %}}

This setup deploys the delegate role required for [cross-account scanning][18] across your AWS Organization or specific Organizational Units (OUs).

##### Prerequisites

1. Access to the AWS management account.
2. [Trusted Access with AWS Organizations][19] must be enabled for CloudFormation StackSets.
3. Agentless Scanning must already be configured in your central scanning account. See [AWS CloudFormation](#aws-cloudformation-setup) or [Terraform](#terraform-setup) setup.

##### Deploy the StackSet

1. Log in to your AWS management account and navigate to **CloudFormation > StackSets**.
2. Click **Create StackSet**.
3. Select **Service-managed permissions**.
4. Under **Specify template**, select **Amazon S3 URL** and enter the following URL:
{{< code-block lang="text" >}}
   https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/v4.3.1/datadog_agentless_delegate_role_stackset.yaml
{{< /code-block >}}
5. Enter a **StackSet name** (for example, `DatadogAgentlessScanningStackSet`).
6. Configure the required parameters:
   - **ScannerInstanceRoleARN**: The ARN of the IAM role attached to your Agentless scanner instances.

   The `ScannerInstanceRoleARN` establishes a trust relationship between the delegate role (created in target accounts) and your scanner instances (already running in the central account). This enables cross-account scanning where:
   1. The scanner runs in Account A.
   2. The delegate role exists in Accounts B, C, D (deployed through the StackSet).
   3. The scanner assumes the delegate roles to scan resources in those accounts.
7. Set **Deployment targets** to deploy across your Organization or specific OUs.
8. Enable **Automatic deployment** to automatically configure new accounts added to your Organization.
9. Select a **single region** for deployment (the IAM role is global and only needs to be deployed once per account).
10. Review and submit the StackSet.

After the StackSet deploys successfully, the member accounts are configured to allow cross-account scanning from your central scanner account.

[18]: /security/cloud_security_management/setup/agentless_scanning/deployment_methods
[19]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-enable-trusted-access.html

{{% /collapse-content %}}

<br />

### Azure Resource Manager

Use the Azure Resource Manager template to deploy the Agentless Scanner. The template includes the role definitions required to deploy and manage Agentless scanners.

{{% collapse-content title="Azure Resource Manager setup guide" level="h4" id="azure-resource-manager-setup" %}}
If you've already [set up Cloud Security][10] and want to add a new Azure account or enable [Agentless Scanning][1] on an existing integrated Azure account, you can use either [Terraform][7] or Azure Resource Manager. This article provides detailed instructions for the Azure Resource Manager approach.

<div class="alert alert-danger">Running Agentless scanners incurs additional costs. To optimize these costs while still ensuring reliable 12-hour scans, Datadog recommends setting up <a href="#terraform-setup">Agentless Scanning with Terraform</a> as the default template.</div>

{{< tabs >}}
{{% tab "New Azure account" %}}

###### Set up the Datadog Azure integration

Follow the instructions for setting up the [Datadog Azure integration][1].

{{% csm-agentless-azure-resource-manager %}}

[1]: /integrations/guide/azure-manual-setup/?tab=azurecli
{{% /tab %}}

{{% tab "Existing Azure account" %}}

{{% csm-agentless-azure-resource-manager %}}

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

## Configuration

### Verify your setup

After completing the setup, you can verify that Agentless Scanning is working correctly by checking for scan results in Datadog. Results typically appear after the first scan cycle completes.

View scan results in the following locations:

- **For host and container vulnerabilities**: [CSM Vulnerabilities Explorer][15]. To view only vulnerabilities detected by Agentless Scanning, use the filter `origin:"Agentless scanner"` in the search bar.
- **For Lambda vulnerabilities**: [Code Security (SCA) Explorer][16]
- **For sensitive data findings**: [Sensitive Data Scanner][17]

### Exclude resources from scans

{{% csm-agentless-exclude-resources %}}

## Disable Agentless scanning

{{< tabs >}}
{{% tab "AWS" %}}
1. On the [Cloud Security Setup][10] page, click **Cloud Integrations** > **AWS**.
1. If required, use filters to find the account you want to stop agentless scanning for. Click the account to open the side panel that contains its settings.
1. On the **Features** tab, click **Configure Agentless Scanning** or **Manage** to open the Agentless Scanning Setup modal.
1. Under **How would you like to set up Agentless scanning?**, click **Terraform**.
1. Under **Enable Features**, beside **Enable Agentless Vulnerability management**, switch the toggle to the off position.
1. Click **Done**.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "Azure" %}}
1. On the [Cloud Security Setup][10] page, click **Cloud Integrations** > **Azure**.
1. Locate your subscription's tenant, expand the list of subscriptions, and identify the subscription for which you want to disable Agentless Scanning.
1. Beside the **Enabled** label, click the **Edit** button ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) to open the Vulnerability Scanning modal.
1. Beside **Vulnerability Scanning**, switch the toggle to the off position.
1. Click **Done**.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "GCP" %}}
1. On the [Cloud Security Setup][10] page, click **Cloud Integrations** > **GCP**.
1. Expand the account containing the project where you want to disable Agentless scanning.
1. Beside the **Enabled** label, click the **Edit** button ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) to open the Vulnerability Scanning modal.
1. Beside **Vulnerability Scanning**, switch the toggle to the off position.
1. Click **Done**.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{< /tabs >}}

## Uninstall Agentless scanning

{{< tabs >}}
{{% tab "Terraform" %}}
To uninstall Agentless Scanning, remove the scanner module from your Terraform code. For more information, see the [Terraform module][9] documentation.

[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall

{{% /tab %}}

{{% tab "AWS CloudFormation" %}}
To uninstall Agentless Scanning, log in to your AWS console and delete the CloudFormation stack created for Agentless Scanning.
{{% /tab %}}

{{% tab "Azure Resource Manager" %}}
To uninstall Agentless Scanning, log in to your Azure account. If you created a dedicated resource group for the Agentless scanner, delete this resource group along with the following Azure role definitions:
  - Datadog Agentless Scanner Role
  - Datadog Agentless Scanner Delegate Role

If you did not use a dedicated resource group, you must manually delete the scanner resources, which can be identified by the tags `Datadog:true` and `DatadogAgentlessScanner:true`.
{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/agentless_scanning
[2]: /integrations/amazon_web_services/
[3]: /remote_configuration
[4]: https://app.datadoghq.com/security/csm/
[6]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner
[7]: #terraform-setup
[8]: mailto:success@datadoghq.com
[10]: https://app.datadoghq.com/security/configuration/csm/setup
[11]: #aws-cloudformation-setup
[12]: /security/cloud_security_management/agentless_scanning
[13]: #azure-resource-manager-setup
[14]: https://github.com/DataDog/cloudformation-template/blob/master/aws_quickstart/version.txt
[15]: https://app.datadoghq.com/security/csm/vm
[16]: https://app.datadoghq.com/security/code-security/sca
[17]: https://app.datadoghq.com/sensitive-data-scanner/storage