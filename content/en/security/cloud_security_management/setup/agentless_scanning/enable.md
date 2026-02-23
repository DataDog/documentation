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

Agentless Scanning provides visibility into vulnerabilities that exist within your cloud infrastructure, without installing the Datadog Agent. Agentless Scanning runs entirely within your infrastructure — only the list of installed packages (SBOM) and host metadata is sent to Datadog. Your raw data, disk contents, and container images stay in your environment. Because the scanner runs in your cloud account, standard [cloud provider costs][20] apply. To learn more, see the [Agentless Scanning overview][12].

Setup takes approximately 30 minutes per cloud account:

1. Verify prerequisites below.
1. Choose your cloud provider and deployment method.
1. Launch a template in your cloud account.
1. Verify scan results in Datadog.

## Prerequisites

Before setting up Agentless Scanning, verify that the following prerequisites are met:

- **Remote Configuration**: [Remote Configuration][3] must be enabled on your Datadog organization to send scan instructions to Agentless scanners.
- **[API and Application Keys](/account_management/api-app-keys/)**:
  - An [API key](/account_management/api-app-keys/#api-keys) with Remote Configuration enabled is required for scanners to report scan results to Datadog.
  - An [Application key](/account_management/api-app-keys/#application-keys) with either **Integrations Manage** or **Org Management** permissions is required to enable scanning features through the Datadog API.
- **Cloud permissions**: The Agentless Scanning instance requires specific permissions to scan hosts, host images, container registries, and functions. These permissions are applied automatically during installation — listed below for transparency.<br><br>
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
    <li><code>Microsoft.ContainerRegistry/registries/pull/read</code></li>
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

### Step 1: Plan your deployment

- **Single account**: Deploy a scanner directly in that account.
- **Multiple accounts**: Use a dedicated scanner account and cross-account roles so one scanner can reach all target accounts.
- **Regional placement**: A single scanner can scan hosts across regions. Add a dedicated scanner in any region with more than ~150 hosts to avoid cross-region data transfer costs.
- **Cloud Storage Scanning**: If enabled, deploy a scanner in each region that contains a data store (for example, S3 buckets or RDS instances).

For a detailed walkthrough, see the [deployment topology guide](/security/cloud_security_management/setup/agentless_scanning/deployment_methods).

### Step 2: Deploy

Select your cloud provider to see the available setup methods. If you are setting up Agentless Scanning across multiple cloud providers, complete the setup for each provider independently.

{{< tabs >}}
{{% tab "AWS" %}}

### Which setup is right for you?

- **New to Datadog?** Use [Quick Start](#quick-start-setup) — guided CloudFormation setup with all Cloud Security features.
- **Already have an AWS account in Datadog?** Use [CloudFormation](#aws-cloudformation-setup) or [Terraform](#aws-terraform-setup). Terraform is recommended for multi-region deployments.
- **AWS Organization with multiple accounts?** Use [CloudFormation StackSet](#aws-cloudformation-stackset-setup) to deploy scanning capabilities across all member accounts.
- **Multiple accounts without AWS Organizations?** Repeat the [CloudFormation](#aws-cloudformation-setup) or [Terraform](#aws-terraform-setup) setup for each account individually.

<h3 id="quick-start-setup">Quick Start</h3>

[Quick Start][4] is a guided setup flow that uses AWS CloudFormation to deploy Agentless Scanning with all Cloud Security features pre-enabled. It is only available for organizations that have not yet set up Cloud Security Management. If you already have Cloud Security configured, use [CloudFormation](#aws-cloudformation-setup) or [Terraform](#aws-terraform-setup) instead.

<br />

{{% collapse-content title="CloudFormation" level="h3" id="aws-cloudformation-setup" %}}

Use CloudFormation if you already have an AWS account integrated with Datadog and want to enable Agentless Scanning, or if you want to add a new AWS account.

##### New AWS account

1. On the [Cloud Security Setup][1] page, click **Cloud Integrations** > **AWS**.
1. At the bottom of the AWS section, click **Add AWS accounts by following these steps**. The **Add New AWS Account(s)** dialog is displayed.
1. Select the AWS region where you want to create the CloudFormation stack.
1. Select an API key that has [Remote Configuration][3] enabled.
1. Choose whether to enable **Sensitive Data Scanner** for cloud storage. This automatically catalogs and classifies sensitive data in Amazon S3 resources.
1. Click **Launch CloudFormation Template**. A new window opens, displaying the AWS CloudFormation screen. Use the provided CloudFormation template to create a stack. The template includes the IAM permissions required to deploy and manage Agentless scanners.

##### Existing AWS account

1. On the [Cloud Security Setup][1] page, click **Cloud Integrations** > **AWS**.
1. Click the AWS account where you want to deploy the Agentless scanner, which opens the side panel.
1. On the **Features** tab, click **Configure Agentless Scanning** or **Manage** to open the Agentless Scanning Setup modal.
1. In the **How would you like to set up Agentless Scanning?** section, select **CloudFormation**.
1. Select an API key that has [Remote Configuration][3] enabled.
1. Toggle the features you want to enable, such as **Vulnerability Management** or **Sensitive Data Scanner**.
1. Click **Launch CloudFormation Template**. A new window opens, displaying the AWS CloudFormation screen. Use the provided CloudFormation template to create a stack.
1. Click **Done**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[3]: /remote_configuration

{{% /collapse-content %}}

<br />

{{% collapse-content title="CloudFormation StackSet (Multi-Account)" level="h3" id="aws-cloudformation-stackset-setup" %}}

For AWS Organizations with multiple accounts, use a CloudFormation StackSet to deploy the Agentless Scanning delegate role across all member accounts. This approach automates onboarding and configures new accounts added to your Organization.

This setup deploys the delegate role required for [cross-account scanning](/security/cloud_security_management/setup/agentless_scanning/deployment_methods) across your AWS Organization or specific Organizational Units (OUs). First, set up Agentless Scanning in your central scanning account using [CloudFormation](#aws-cloudformation-setup) or [Terraform](#aws-terraform-setup), then deploy the StackSet to configure the remaining accounts.

##### Prerequisites

1. Access to the AWS management account.
1. [Trusted Access with AWS Organizations](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-enable-trusted-access.html) must be enabled for CloudFormation StackSets.
1. Agentless Scanning is already configured in your central scanning account (see above).

##### Deploy the StackSet

1. Log in to your AWS management account and navigate to **CloudFormation > StackSets**.
1. Click **Create StackSet**.
1. Select **Service-managed permissions**.
1. Under **Specify template**, select **Amazon S3 URL** and enter the following URL:

{{< code-block lang="text" >}}
   https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/v4.3.1/datadog_agentless_delegate_role_stackset.yaml
{{< /code-block >}}

1. Enter a **StackSet name** (for example, `DatadogAgentlessScanningStackSet`).
1. Configure the required parameters:
   - **ScannerInstanceRoleARN**: The ARN of the IAM role attached to your Agentless scanner instances.

  <div class="alert alert-danger">The <code>ScannerInstanceRoleARN</code> must be the exact ARN of the scanner instance role (for example, <code>arn:aws:iam::123456789012:role/DatadogAgentlessScannerRole</code>). Using a root ARN such as <code>arn:aws:iam::123456789012:root</code> does not work.</div>

  The `ScannerInstanceRoleARN` establishes a trust relationship between the delegate role (created in target accounts) and your scanner instances (already running in the central account). This enables cross-account scanning where:
   1. The scanner runs in Account A.
   1. The delegate role exists in Accounts B, C, D (deployed through the StackSet).
   1. The scanner assumes the delegate roles to scan resources in those accounts.
1. Set **Deployment targets** to deploy across your Organization or specific OUs.
1. Enable **Automatic deployment** to configure new accounts added to your Organization.
1. Select a **single region** for deployment (the IAM role is global and only needs to be deployed once per account).
1. Review and submit the StackSet.

After the StackSet deploys, the member accounts are configured to allow cross-account scanning from your central scanner account.

{{% /collapse-content %}}

<br />

{{% collapse-content title="Terraform" level="h3" id="aws-terraform-setup" %}}

The [Terraform Datadog Agentless Scanner module](https://github.com/DataDog/terraform-module-datadog-agentless-scanner) provides a reusable configuration for installing the Datadog Agentless scanner. Terraform is the recommended deployment method for multi-region environments. It deploys one scanner per region, which avoids cross-region networking costs. For guidance on choosing your deployment topology, see [Deploying Agentless Scanning](/security/cloud_security_management/setup/agentless_scanning/deployment_methods). For usage examples including multi-region configurations, see the [examples directory](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) in the GitHub repository.

##### New AWS account

1. On the [Cloud Security Setup][1] page, click **Cloud Integrations** > **AWS**.
1. At the bottom of the AWS section, click **Add AWS accounts by following these steps**. The **Add New AWS Account(s)** dialog is displayed.
1. Under **Choose a method for adding your AWS account**, select **Manually**.
1. Follow the instructions for installing the [Datadog Agentless Scanner module][2].
1. Select the **I confirm that the Datadog IAM Role has been added to the AWS Account** checkbox.
1. Enter the **AWS Account ID** and **AWS Role Name**.
1. Click **Save**.

##### Existing AWS account

1. On the [Cloud Security Setup][1] page, click **Cloud Integrations** > **AWS**.
1. Click the AWS account where you want to deploy the Agentless scanner to open the side panel.
1. On the **Features** tab, click **Configure Agentless Scanning** or **Manage** to open the Agentless Scanning Setup modal.
1. In the **How would you like to set up Agentless Scanning?** section, select **Terraform**.
1. Follow the instructions for installing the [Datadog Agentless Scanner module][2].
1. Select the **I confirm the Terraform module is installed** checkbox.
1. Click **Done**.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md

{{% /collapse-content %}}

After completing any of the setup methods above, see [Verify your setup](#verify-your-setup).

[3]: /remote_configuration
[4]: https://app.datadoghq.com/security/csm/

{{% /tab %}}

{{% tab "Azure" %}}

### Which setup is right for you?

- **New Azure subscription?** Use [Azure Resource Manager](#azure-resource-manager-setup) (recommended) or [Terraform](#azure-terraform-setup).
- **Existing Azure subscription?** Use [Azure Resource Manager](#azure-resource-manager-setup) or [Terraform](#azure-terraform-setup).
- **Multiple subscriptions?** Use [Terraform](#azure-terraform-setup) for repeatable, multi-subscription deployments.

{{% collapse-content title="Azure Resource Manager" level="h3" id="azure-resource-manager-setup" %}}

Use the Azure Resource Manager template to deploy the Agentless Scanner. The template includes the role definitions required to deploy and manage Agentless scanners.

##### New Azure subscription

Set up the [Datadog Azure integration][1] first, then follow the steps below.

{{% csm-agentless-azure-resource-manager %}}

##### Existing Azure subscription

{{% csm-agentless-azure-resource-manager %}}

[1]: /integrations/guide/azure-manual-setup/?tab=azurecli

{{% /collapse-content %}}

<br />

{{% collapse-content title="Terraform" level="h3" id="azure-terraform-setup" %}}

The [Terraform Datadog Agentless Scanner module](https://github.com/DataDog/terraform-module-datadog-agentless-scanner) provides a reusable configuration for installing the Datadog Agentless scanner. For guidance on choosing your deployment topology, see [Deploying Agentless Scanning](/security/cloud_security_management/setup/agentless_scanning/deployment_methods). For usage examples, see the [examples directory](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) in the GitHub repository.

1. On the [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup) page, click **Cloud Integrations** > **Azure**.
1. Expand the Tenant containing the subscription where you want to deploy the Agentless scanner.
1. Click the **Enable** button for the Azure subscription where you want to deploy the Agentless scanner.
1. Toggle **Vulnerability Scanning** to the on position.
1. In the **How would you like to set up Agentless Scanning?** section, select **Terraform**.
1. Follow the instructions for installing the [Datadog Agentless Scanner module](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme).
1. Click **Done**.

{{% /collapse-content %}}

After completing any of the setup methods above, see [Verify your setup](#verify-your-setup).

{{% /tab %}}

{{% tab "GCP" %}}

### Which setup is right for you?

- **New GCP customer?** [Set up the GCP integration][25] first, then return here to enable Agentless Scanning.
- **Existing integrated GCP project?** Use [Cloud Shell](#gcp-cloud-shell-setup) (recommended) or [Terraform](#gcp-terraform-setup).

<div class="alert alert-info">If you haven't connected your GCP project to Datadog yet, <a href="https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=gcp">set up the GCP integration</a> first, then return here.</div>

{{% collapse-content title="Cloud Shell" level="h3" id="gcp-cloud-shell-setup" %}}

Use Google Cloud Shell to set up Agentless Scanning for your GCP projects. This method downloads a [setup script](https://github.com/DataDog/integrations-management/tree/main/gcp/agentless) that wraps the [Terraform Datadog Agentless Scanner module for GCP](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme), so you do not need to manage Terraform directly. You can review the script before running it.

1. On the [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup) page, click **Cloud Integrations** > **GCP**.
1. Expand the account containing the project where you want to deploy the Agentless scanner.
1. Click the **Enable** button for the GCP project where you want to deploy the Agentless scanner. The **Vulnerability Scanning** modal opens.
1. In the **How would you like to set up Agentless Scanning?** section, select **Cloud Shell**.
1. Select an **API key** that has [Remote Configuration](/remote_configuration) enabled.
1. Create an **Application key**.
1. Select the **GCP projects** you want to scan.
1. Configure the **Scanner project** (the project where the scanner will be deployed, which must be one of the selected projects) and **Scanner region**.
1. Click **Open Google Cloud Shell** to open [Google Cloud Shell](https://ssh.cloud.google.com/cloudshell). Review and run the displayed command. The script applies the [Terraform Datadog Agentless Scanner module for GCP](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme) to deploy and configure the scanner in your selected project and region.
1. After the command completes, return to the Datadog setup page and click **Done**.

{{% /collapse-content %}}

<br />

{{% collapse-content title="Terraform" level="h3" id="gcp-terraform-setup" %}}

The [Terraform Datadog Agentless Scanner module](https://github.com/DataDog/terraform-module-datadog-agentless-scanner) provides a reusable configuration for installing the Datadog Agentless scanner. For guidance on choosing your deployment topology, see [Deploying Agentless Scanning](/security/cloud_security_management/setup/agentless_scanning/deployment_methods). For usage examples, see the [examples directory](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) in the GitHub repository.

1. On the [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup) page, click **Cloud Integrations** > **GCP**.
1. Expand the account containing the project where you want to deploy the Agentless scanner.
1. Click the **Enable** button for the GCP project where you want to deploy the Agentless scanner.
1. Toggle **Vulnerability Scanning** to the on position.
1. Follow the instructions for installing the [Datadog Agentless Scanner module](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme).
1. Click **Done**.

{{% /collapse-content %}}

After completing any of the setup methods above, see [Verify your setup](#verify-your-setup).

[25]: https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=gcp

{{% /tab %}}
{{< /tabs >}}

## After setup

### Verify your setup

After completing the setup, Agentless Scanning takes time to produce initial results. The first scan cycle takes approximately 30 minutes to complete.

<div class="alert alert-info">If no results appear after 2 hours, see the <a href="/security/cloud_security_management/troubleshooting/agentless_scanning">Agentless Scanning troubleshooting guide</a>.</div>

View scan results in the following locations:

- **For host and container vulnerabilities**: [CSM Vulnerabilities Explorer][15]. To view only vulnerabilities detected by Agentless Scanning, use the filter `origin:"Agentless scanner"` in the search bar.
- **For Lambda vulnerabilities**: [Code Security (SCA) Explorer][16].
- **For sensitive data findings**: [Sensitive Data Scanner][17].

### Exclude resources from scans

To exclude specific hosts, containers, or functions from scans, see [Resource Evaluation Filters](/security/cloud_security_management/guide/resource_evaluation_filters).

## Disable Agentless Scanning

{{< tabs >}}
{{% tab "AWS" %}}
1. On the [Cloud Security Setup][10] page, click **Cloud Integrations** > **AWS**.
1. If required, use filters to find the account you want to stop Agentless Scanning for. Click the account to open the side panel that contains its settings.
1. On the **Features** tab, click **Configure Agentless Scanning** or **Manage** to open the Agentless Scanning Setup modal.
1. Under **How would you like to set up Agentless Scanning?**, click **Terraform**.
1. Under **Enable Features**, beside **Enable Agentless Vulnerability management**, switch the toggle to the off position.
1. Click **Done**.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "Azure" %}}
1. On the [Cloud Security Setup][10] page, click **Cloud Integrations** > **Azure**.
1. Locate your subscription's tenant, expand the list of subscriptions, and identify the subscription for which you want to disable Agentless Scanning.
1. Beside the **Enabled** label, click the **Edit** button ({{< img src="security/csm/setup/edit-button.png" alt="Edit" inline="true" style="width:24px;">}}) to open the Vulnerability Scanning modal.
1. Beside **Vulnerability Scanning**, switch the toggle to the off position.
1. Click **Done**.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "GCP" %}}
1. On the [Cloud Security Setup][10] page, click **Cloud Integrations** > **GCP**.
1. Expand the account containing the project where you want to disable Agentless Scanning.
1. Beside the **Enabled** label, click the **Edit** button ({{< img src="security/csm/setup/edit-button.png" alt="Edit" inline="true" style="width:24px;">}}) to open the Vulnerability Scanning modal.
1. Beside **Vulnerability Scanning**, switch the toggle to the off position.
1. Click **Done**.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{< /tabs >}}

## Uninstall Agentless Scanning

Select the deployment method you used to install Agentless Scanning:

{{< tabs >}}
{{% tab "Terraform" %}}
To uninstall Agentless Scanning, remove the scanner module from your Terraform code. For more information, see the [Terraform module][9] documentation.

[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall

{{% /tab %}}

{{% tab "AWS CloudFormation" %}}
To uninstall Agentless Scanning, log in to your AWS console and delete the CloudFormation stack created for Agentless Scanning (the sub-stack name follows the pattern `DatadogIntegration-DatadogAgentlessScanning-...`).
{{% /tab %}}

{{% tab "GCP Cloud Shell" %}}
To uninstall Agentless Scanning that was set up using Google Cloud Shell, run the same setup command you used during installation, replacing `deploy` with `destroy` at the end. For example:

```text
curl -sSL "<CLOUD_SHELL_SCRIPT_URL>" -o gcp_agentless_setup.pyz && \
DD_API_KEY="<DD_API_KEY>" \
DD_APP_KEY="<DD_APP_KEY>" \
DD_SITE="<DD_SITE>" \
SCANNER_PROJECT="<SCANNER_PROJECT>" \
SCANNER_REGIONS="<SCANNER_REGION>" \
PROJECTS_TO_SCAN="<PROJECTS>" \
python3 gcp_agentless_setup.pyz destroy
```

You can review the [setup script source][21] before running the command.

[21]: https://github.com/DataDog/integrations-management/tree/main/gcp/agentless
{{% /tab %}}

{{% tab "Azure Resource Manager" %}}
To uninstall Agentless Scanning, log in to your Azure subscription. If you created a dedicated resource group for the Agentless scanner, delete this resource group along with the following Azure role definitions:
  - Datadog Agentless Scanner Role
  - Datadog Agentless Scanner Delegate Role

If you did not use a dedicated resource group, you must manually delete the scanner resources, which can be identified by the tags `Datadog:true` and `DatadogAgentlessScanner:true`.
{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[3]: /remote_configuration
[12]: /security/cloud_security_management/agentless_scanning
[20]: /security/cloud_security_management/agentless_scanning#cloud-service-provider-cost
[15]: https://app.datadoghq.com/security/csm/vm
[16]: https://app.datadoghq.com/security/code-security/sca
[17]: https://app.datadoghq.com/sensitive-data-scanner/storage
