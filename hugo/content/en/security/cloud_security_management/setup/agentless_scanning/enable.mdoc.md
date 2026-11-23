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
  - link: "/security/cloud_security_management/setup/agentless_scanning/update"
    tag: "Documentation"
    text: "Updating Agentless Scanning"
  - link: "/security/cloud_security_management/troubleshooting/agentless_scanning"
    tag: "Documentation"
    text: "Troubleshooting Agentless Scanning"
content_filters:
  - trait_id: host
    option_group_id: agentless_cloud_provider_options
    label: "Cloud provider"
  - trait_id: agentless_scanner_hosting
    option_group_id: agentless_<HOST>_scanner_hosting_options
    label: "Scanner hosting"
---

Agentless Scanning provides visibility into vulnerabilities that exist within your cloud infrastructure, without installing the Datadog Agent. You can run Agentless Scanning in one of two modes:

- **Datadog-hosted (SaaS)**: Datadog runs the scanners in its own infrastructure. You attach scanning permissions to your existing Datadog AWS integration role, and you don't deploy any scanner infrastructure. Supports AWS only.
- **Self-hosted**: You deploy the scanners in your own cloud account, where they read your disk contents and send only scan results to Datadog. Supports AWS, Azure, and GCP.

Both modes use the same scanning engine and produce the same findings. To compare them, see [Choose where scanners run][8]. Select your cloud provider and scanner hosting mode in the filters at the top of this page to see the setup instructions. Datadog-hosted scanning is available for AWS only.

<!-- Self-hosted -->
{% if equals($agentless_scanner_hosting, "self_hosted") %}
Self-hosted scanners run entirely within your infrastructure, so sensitive data stays in your environment. Because scanning runs in your cloud account, standard [cloud provider costs][20] apply. To learn more, see the [Agentless Scanning overview][12].

Setup takes approximately 30 minutes per cloud account:

1. Verify prerequisites below.
1. Choose your cloud provider and deployment method.
1. Launch a template in your cloud account.
1. Verify scan results in Datadog.
{% /if %}
<!-- end Self-hosted -->

<!-- Datadog-hosted -->
{% if equals($agentless_scanner_hosting, "datadog_hosted") %}
{% alert %}
Datadog-hosted scanning is in Preview and supports AWS accounts only. To request access, [join the Preview](https://www.datadoghq.com/product-preview/agentless-saas-mode/). To scan Azure subscriptions or Google Cloud projects, select {% ui %}Azure{% /ui %} or {% ui %}Google Cloud{% /ui %} in the {% ui %}Cloud provider{% /ui %} filter at the top of this page.
{% /alert %}

Attach the Agentless Scanning permissions to the Datadog integration role in each AWS account you want to scan. Datadog runs the scans, and you don't deploy, update, or pay for any scanner infrastructure in your account.

Datadog reads your disk contents in its scanning environment, in the region of your Datadog site, and doesn't retain them. If you enable Sensitive Data Scanner, Datadog also reads the contents of your Amazon S3 buckets in its scanning environment. Before you begin, review [Datadog-hosted data residency][27].
{% /if %}
<!-- end Datadog-hosted -->

## Prerequisites

<!-- Self-hosted -->
{% if equals($agentless_scanner_hosting, "self_hosted") %}
Before setting up Agentless Scanning, verify that the following prerequisites are met:

- **Remote Configuration**: [Remote Configuration][3] must be enabled on your Datadog organization to send scan instructions to Agentless scanners.
- **[API and Application Keys][1]**:
  - An {% ui %}API key{% /ui %} with Remote Configuration enabled is required for scanners to report scan results to Datadog.
  - An {% ui %}Application key{% /ui %} with either `Integrations Manage` or `Org Management` permissions is required for you to enable scanning features through the Datadog API.
- **Cloud permissions**: The Agentless Scanning instance requires specific permissions to scan hosts, host images, container registries, and functions. Datadog automatically applies these permissions, listed below for transparency, during installation.

<!-- Self-hosted > AWS -->
{% if equals($host, "aws") %}
{% collapse-content title="AWS scanning permissions" level="h3" %}
Scanning permissions:

- `ebs:GetSnapshotBlock`
- `ebs:ListChangedBlocks`
- `ebs:ListSnapshotBlocks`
- `ec2:CopySnapshot`
- `ec2:CreateSnapshot`
- `ec2:CreateTags`
- `ec2:DeleteSnapshot`
- `ec2:DeregisterImage`
- `ec2:DescribeImages`
- `ec2:DescribeSnapshots`
- `ec2:DescribeVolumes`
- `ecr:BatchGetImage`
- `ecr:GetAuthorizationToken`
- `ecr:GetDownloadUrlForLayer`
- `kms:CreateGrant`
- `kms:Decrypt`
- `kms:DescribeKey`
- `lambda:GetFunction`
- `lambda:GetLayerVersion`

Only when Sensitive Data Scanning (DSPM) is enabled:

- `kms:GenerateDataKey`
- `s3:GetObject`
- `s3:ListBucket`
{% /collapse-content %}
{% /if %}
<!-- end Self-hosted > AWS -->

<!-- Self-hosted > Azure -->
{% if equals($host, "azure") %}
{% collapse-content title="Azure scanning permissions" level="h3" %}
- `Microsoft.Compute/virtualMachines/read`
- `Microsoft.Compute/virtualMachines/instanceView/read`
- `Microsoft.Compute/virtualMachineScaleSets/read`
- `Microsoft.Compute/virtualMachineScaleSets/instanceView/read`
- `Microsoft.Compute/virtualMachineScaleSets/virtualMachines/read`
- `Microsoft.Compute/virtualMachineScaleSets/virtualMachines/instanceView/read`
- `Microsoft.Compute/disks/read`
- `Microsoft.Compute/disks/beginGetAccess/action`
- `Microsoft.Compute/disks/endGetAccess/action`
- `Microsoft.Compute/galleries/images/versions/read`
- `Microsoft.ContainerRegistry/registries/pull/read`
- `Microsoft.ContainerRegistry/registries/repositories/content/read` (data action)
- `Microsoft.Web/sites/read`
- `Microsoft.Web/sites/publish/Action`
{% /collapse-content %}
{% /if %}
<!-- end Self-hosted > Azure -->

<!-- Self-hosted > Google Cloud -->
{% if equals($host, "google_cloud") %}
{% collapse-content title="GCP scanning permissions" level="h3" %}
- `compute.disks.create`
- `compute.disks.createSnapshot`
- `compute.disks.delete`
- `compute.disks.get`
- `compute.disks.setLabels`
- `compute.disks.use`
- `compute.globalOperations.get`
- `compute.images.get`
- `compute.instances.attachDisk`
- `compute.instances.detachDisk`
- `compute.snapshots.create`
- `compute.snapshots.get`
- `compute.snapshots.list`
- `compute.snapshots.delete`
- `compute.snapshots.setLabels`
{% /collapse-content %}
{% /if %}
<!-- end Self-hosted > Google Cloud -->
{% /if %}
<!-- end Self-hosted -->

<!-- Datadog-hosted -->
{% if equals($agentless_scanner_hosting, "datadog_hosted") %}
Before setting up Agentless Scanning, verify that the following prerequisites are met:

- **AWS integration**: The AWS account you want to scan is integrated with Datadog through the [Datadog AWS integration][11]. Datadog uses the integration's IAM role to scan your account.
- **[API and Application Keys][1]**: An {% ui %}API key{% /ui %} and an {% ui %}Application key{% /ui %} for your Datadog organization.
- **Cloud permissions**: Setup attaches a managed IAM policy with the following permissions, and the AWS managed `SecurityAudit` policy, to the Datadog integration role. The CloudFormation stack also creates a Lambda function and its IAM execution role, which the stack uses to call the Datadog API during deployment. Setup doesn't create any scanner compute or networking resources in your account.

<!-- TODO(DOCS-16346): Confirm with SME whether Remote Configuration or an RC-enabled API key is required for Datadog-hosted scanning, and which application key permissions are required. -->

{% collapse-content title="Datadog-hosted (SaaS) Agentless Scanning permissions" level="h3" %}
- `ebs:GetSnapshotBlock`
- `ebs:ListChangedBlocks`
- `ebs:ListSnapshotBlocks`
- `ec2:CopySnapshot`
- `ec2:CreateSnapshot`
- `ec2:CreateTags`
- `ec2:DeleteSnapshot`
- `ec2:DeregisterImage`
- `ec2:DescribeSnapshots`
- `ec2:DescribeVolumes`
- `ecr:BatchGetImage`
- `ecr:GetAuthorizationToken`
- `ecr:GetDownloadUrlForLayer`
- `kms:CreateGrant`
- `kms:Decrypt`
- `kms:DescribeKey`
- `kms:GenerateDataKey`
- `lambda:GetFunction`
- `lambda:GetLayerVersion`
- `s3:GetObject`
- `s3:ListBucket`

For the full policy, including resource and condition scoping, see the [Datadog-hosted IAM policy][28].
{% /collapse-content %}
{% /if %}
<!-- end Datadog-hosted -->

## Setup

<!-- Self-hosted -->
{% if equals($agentless_scanner_hosting, "self_hosted") %}
See [Deploying Agentless Scanning][2] for information on how to structure your deployment, including how many accounts and how many regions you deploy scanners across.

Select your cloud provider in the {% ui %}Cloud provider{% /ui %} filter at the top of this page to see the available setup methods. If you are setting up Agentless Scanning across multiple cloud providers, complete the setup for each provider independently.

### Choose your setup

<!-- Self-hosted > AWS -->
{% if equals($host, "aws") %}


- **New to Datadog**: On the [Intro to Cloud Security][5] page, click {% ui %}Get Started with Cloud Security{% /ui %}, then click {% ui %}Quick Start{% /ui %}. Quick Start is a guided setup flow that uses AWS CloudFormation to deploy Agentless Scanning with all Cloud Security features pre-enabled. It is only available for organizations that have not yet set up Cloud Security Management.
- **Single AWS account in Datadog**: Use the [**CloudFormation**](?tab=cloudformation#choose-your-setup) or [**Terraform**](?tab=terraform#choose-your-setup) tab. Terraform is recommended for multi-region deployments.
- **AWS organization with multiple accounts**: Use the [**CloudFormation StackSet**](?tab=cloudformation-stackset--multi-account#choose-your-setup) tab to deploy scanning capabilities across all member accounts.
- **Multiple accounts without AWS Organizations**: Repeat the [**CloudFormation**](?tab=cloudformation#choose-your-setup) or [**Terraform**](?tab=terraform#choose-your-setup) setup for each account individually.

{% tabs %}

{% tab label="CloudFormation" %}
Use CloudFormation if you already have an AWS account integrated with Datadog and want to enable Agentless Scanning, or if you want to add a new AWS account.

#### New AWS account {% #cloudformation-new-aws-account %}

1. On the [Cloud Security Setup][4] page, click {% ui %}Cloud Integrations{% /ui %} > {% ui %}AWS{% /ui %}.
1. At the bottom of the AWS section, click {% ui %}Add AWS accounts by following these steps{% /ui %}. The {% ui %}Add New AWS Account(s){% /ui %} dialog is displayed.
1. Select the {% ui %}Add a Single AWS Account{% /ui %} and {% ui %}CloudFormation{% /ui %} options.
1. Select the AWS region where you want to create the CloudFormation stack.
1. Select an API key that has [Remote Configuration][3] enabled.
1. Choose whether to enable {% ui %}Sensitive Data Scanner{% /ui %} for cloud storage. This automatically catalogs and classifies sensitive data in Amazon S3 resources.
1. Click {% ui %}Launch CloudFormation Template{% /ui %}. A new window opens, displaying the AWS CloudFormation screen. Use the provided CloudFormation template to create a stack. The template includes the IAM permissions required to deploy and manage Agentless scanners.

#### Existing AWS account {% #cloudformation-existing-aws-account %}

1. On the [Cloud Security Setup][4] page, click {% ui %}Cloud Integrations{% /ui %} > {% ui %}AWS{% /ui %}.
1. Click the AWS account where you want to deploy the Agentless scanner, which opens the side panel.
1. On the {% ui %}Features{% /ui %} tab, click {% ui %}Configure Agentless Scanning{% /ui %} or {% ui %}Manage{% /ui %} to open the Agentless Scanning Setup modal.
1. In the {% ui %}How would you like to set up Agentless Scanning?{% /ui %} section, select {% ui %}CloudFormation{% /ui %}.
1. Select the AWS region that corresponds to the CloudFormation stack.
1. Select an API key that has [Remote Configuration][3] enabled.
1. Copy the new application key Datadog generates.
1. Choose to either:
   - Use an existing scanner, then select the scanner you want to use.
   - Deploy a new scanner.
1. Toggle the features you want to enable, such as {% ui %}Agentless Vulnerability Management{% /ui %} or {% ui %}Sensitive Data Scanning for Cloud Storage{% /ui %}.
1. Click {% ui %}Launch CloudFormation Template{% /ui %}. A new window opens, displaying the AWS CloudFormation screen. Use the provided CloudFormation template to create a stack.
1. Click {% ui %}Done{% /ui %}.

{% /tab %}

{% tab label="CloudFormation StackSet (multi-account)" %}

For AWS Organizations with multiple accounts, use a CloudFormation StackSet to deploy the Agentless Scanning delegate role across all member accounts. This approach automates onboarding and configures new accounts added to your AWS Organization.

This setup deploys the delegate role required for [cross-account scanning][2] across your AWS Organization or specific Organizational Units (OUs). First, set up Agentless Scanning in your central scanning account using the **CloudFormation** or **Terraform** tab, then deploy the StackSet to configure the remaining accounts.

#### Prerequisites {% #stackset-prerequisites %}

- Access to the AWS management account
- [Trusted Access with AWS Organizations](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-enable-trusted-access.html) must be enabled for CloudFormation StackSets
- Agentless Scanning already configured in your central scanning account (see the **CloudFormation** tab)

#### Deploy the StackSet

1. Log in to your AWS management account and navigate to {% ui %}CloudFormation{% /ui %} > {% ui %}StackSets{% /ui %}.
1. Click {% ui %}Create StackSet{% /ui %}.
1. Select {% ui %}Service-managed permissions{% /ui %}.
1. Under {% ui %}Specify template{% /ui %}, select {% ui %}Amazon S3 URL{% /ui %} and enter the following URL:
   ```
   https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/v4.22.1/datadog_agentless_delegate_role_stackset.yaml
   ```
1. Enter a {% ui %}StackSet name{% /ui %} (for example, `DatadogAgentlessScanningStackSet`).
1. Configure the {% ui %}ScannerInstanceRoleARN{% /ui %} parameter, which is the ARN of the IAM role attached to your Agentless scanner instances.

   {% alert level="danger" %}
   The `ScannerInstanceRoleARN` must be the exact ARN of the scanner instance role (for example, `arn:aws:iam::123456789012:role/DatadogAgentlessScannerRole`). Using a root ARN such as `arn:aws:iam::123456789012:root` does not work.
   {% /alert %}

   The `ScannerInstanceRoleARN` establishes a trust relationship between the delegate role (created in target accounts) and your scanner instances (already running in the central account). This enables cross-account scanning where:

   - The scanner runs in Account 4.
   - The delegate role exists in Accounts 1, 2, 3 (deployed through the StackSet).
   - The scanner assumes the delegate roles to scan resources in those accounts.
1. Set {% ui %}Deployment targets{% /ui %} to deploy across your AWS Organization or specific OUs.
1. Enable {% ui %}Automatic deployment{% /ui %} to configure new accounts added to your AWS Organization.
1. Select a single region for deployment (the IAM role is global and only needs to be deployed once per account).
1. Review and submit the StackSet.

After the StackSet deploys, the member accounts are configured to allow cross-account scanning from your central scanner account.
{% /tab %}

{% tab label="Terraform" %}

The [Terraform Datadog Agentless Scanner module](https://github.com/DataDog/terraform-module-datadog-agentless-scanner) provides a reusable configuration for installing the Datadog Agentless scanner. Terraform is the recommended deployment method for multi-region environments. It deploys one scanner per region, which avoids cross-region networking costs. For guidance on choosing your deployment topology, see [Deploying Agentless Scanning][2]. For usage examples including multi-region configurations, see the [examples directory](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) in the GitHub repository.

#### New AWS account {% #terraform-new-aws-account %}

1. On the [Cloud Security Setup][4] page, click {% ui %}Cloud Integrations{% /ui %} > {% ui %}AWS{% /ui %}.
1. At the bottom of the AWS section, click {% ui %}Add AWS accounts by following these steps{% /ui %}. The {% ui %}Add New AWS Account(s){% /ui %} dialog is displayed.
1. Select the {% ui %}Add a Single AWS Account{% /ui %} and {% ui %}Manually{% /ui %} options.
1. Follow the instructions for installing the [Datadog Agentless Scanner module][6].
1. Select the {% ui %}I confirm that the Datadog IAM Role has been added to the AWS Account{% /ui %} checkbox.
1. Enter the {% ui %}AWS Account ID{% /ui %} and {% ui %}AWS Role Name{% /ui %}.
1. Click {% ui %}Save{% /ui %}.

#### Existing AWS account {% #terraform-existing-aws-account %}

1. On the [Cloud Security Setup][4] page, click {% ui %}Cloud Integrations{% /ui %} > {% ui %}AWS{% /ui %}.
1. Click the AWS account where you want to deploy the Agentless scanner to open the side panel.
1. On the {% ui %}Features{% /ui %} tab, click {% ui %}Configure Agentless Scanning{% /ui %} or {% ui %}Manage{% /ui %} to open the Agentless Scanning Setup modal.
1. In the {% ui %}How would you like to set up Agentless Scanning?{% /ui %} section, select {% ui %}Terraform{% /ui %}.
1. Follow the instructions for installing the [Datadog Agentless Scanner module][6].
1. Select the {% ui %}I confirm the Datadog Agentless Scanner was installed using Terraform{% /ui %} checkbox.
1. Click {% ui %}Done{% /ui %}.

{% /tab %}

{% /tabs %}

After completing any of the setup methods above, [verify your setup](#verify-your-setup).

{% /if %}
<!-- end Self-hosted > AWS -->

<!-- Self-hosted > Azure -->
{% if equals($host, "azure") %}


- **New Azure customer**: Set up the [Datadog Azure integration][13] first, then enable Agentless Scanning.
- **Existing integrated Azure subscription**: Use the [**Cloud Shell**](?tab=cloud-shell#choose-your-setup) (recommended), [**Azure Resource Manager**](?tab=azure-resource-manager#choose-your-setup), or [**Terraform**](?tab=terraform#choose-your-setup) tab.
- **Multiple subscriptions**: Use [**Cloud Shell**](?tab=cloud-shell#choose-your-setup) for repeatable, multi-subscription deployments. [**Terraform**](?tab=terraform#choose-your-setup) is also available if you prefer to manage your own infrastructure-as-code.

{% alert %}
If you haven't connected your Azure subscription to Datadog yet, [set up the Azure integration][13] first.
{% /alert %}

{% tabs %}

{% tab label="Cloud Shell" %}
Use Azure Cloud Shell to set up Agentless Scanning for your Azure subscriptions. This method downloads a [setup script](https://github.com/DataDog/integrations-management/tree/main/azure/agentless) that wraps the [Terraform Datadog Agentless Scanner module for Azure](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme), so you do not need to manage Terraform directly. You can review the script before running it.

1. Ensure the identity you use in Cloud Shell has the required Azure permissions:

   - On the **scanner subscription**, the identity must have a role that grants role-assignment write and resource creation, such as **Owner**.
   - On **each scanned subscription**, the identity must have a role that grants the `Microsoft.Authorization/roleAssignments/write` permission, so the scanner's managed identity can be granted the permissions it needs to snapshot and read disks, such as **User Access Administrator** or **Owner**.

   Before you run the generated command, note what the setup script does in Azure:

   - **Terraform state**: By default, it creates an Azure Storage Account in the **scanner** subscription. To reuse an existing storage account in the scanner resource group instead, set `TF_STATE_STORAGE_ACCOUNT` before you run the command; the script does not create a new account when that variable is set.
   - **Resource providers**: When possible, it registers these resource providers in the scanner subscription: `Microsoft.Compute`, `Microsoft.Network`, `Microsoft.ManagedIdentity`, `Microsoft.Storage`, `Microsoft.KeyVault`, `Microsoft.Authorization`.
1. On the [Cloud Security Setup][4] page, click {% ui %}Cloud Integrations{% /ui %} > {% ui %}Azure{% /ui %}.
1. Click the Azure subscription where you want to deploy the Agentless scanner, which opens the side panel.
1. On the {% ui %}Features{% /ui %} tab, click {% ui %}Configure Agentless Scanning{% /ui %} or {% ui %}Manage{% /ui %} to open the Agentless Scanning Setup modal.
1. In the {% ui %}How would you like to set up Agentless Scanning?{% /ui %} section, select {% ui %}Cloud Shell{% /ui %}.
1. Select an {% ui %}API key{% /ui %} that has [Remote Configuration][3] enabled. An application key is automatically generated.
1. Select the {% ui %}Azure subscriptions{% /ui %} you want to scan.
1. Configure the scanner:
   - If you already have scanners deployed, you can choose to {% ui %}use an existing scanner{% /ui %} (recommended) or {% ui %}deploy a new scanner{% /ui %}.
   - If you choose {% ui %}deploy a new scanner{% /ui %}, select the {% ui %}scanner subscription{% /ui %} (which must be one of the selected subscriptions) and the {% ui %}scanner locations{% /ui %} (Azure regions, up to four). Datadog recommends deploying scanners in every region where you have more than 150 hosts.
1. Click {% ui %}Copy command{% /ui %} to copy the generated command, and click {% ui %}Open Azure Cloud Shell{% /ui %} to open [Azure Cloud Shell](https://shell.azure.com). Review and run the command. The script applies the [Terraform Datadog Agentless Scanner module for Azure](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme) to deploy and configure the scanner in your selected subscription and location(s).
1. After the command completes, return to the Datadog setup page and click {% ui %}Done{% /ui %}.
{% /tab %}

{% tab label="Azure Resource Manager" %}
Use the Azure Resource Manager template to deploy the Agentless Scanner. The template includes the role definitions required to deploy and manage Agentless scanners.

#### New Azure subscription

{% alert %}
Ensure you have the [Datadog Azure integration](/integrations/guide/azure-manual-setup/?tab=azurecli) set up.
{% /alert %}

{% partial file="security/cloud_security_management/agentless_azure_resource_manager.mdoc.md" /%}

#### Existing Azure subscription

{% partial file="security/cloud_security_management/agentless_azure_resource_manager.mdoc.md" /%}

{% /tab %}

{% tab label="Terraform" %}

The [Terraform Datadog Agentless Scanner module](https://github.com/DataDog/terraform-module-datadog-agentless-scanner) provides a reusable configuration for installing the Datadog Agentless scanner. For guidance on choosing your deployment topology, see [Deploying Agentless Scanning][2]. For usage examples, see the [examples directory](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) in the GitHub repository.

1. On the [Cloud Security Setup][4] page, click {% ui %}Cloud Integrations{% /ui %} > {% ui %}Azure{% /ui %}.
1. Click the Azure subscription where you want to deploy the Agentless scanner, which opens the side panel.
1. On the {% ui %}Features{% /ui %} tab, click {% ui %}Configure Agentless Scanning{% /ui %} or {% ui %}Manage{% /ui %} to open the Agentless Scanning Setup modal.
1. In the {% ui %}How would you like to set up Agentless Scanning?{% /ui %} section, select {% ui %}Terraform{% /ui %}.
1. Follow the instructions for installing the [Datadog Agentless Scanner module](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme).
1. Click {% ui %}Done{% /ui %}.

{% /tab %}

{% /tabs %}

After completing any of the setup methods above, [verify your setup](#verify-your-setup).

{% /if %}
<!-- end Self-hosted > Azure -->

<!-- Self-hosted > Google Cloud -->
{% if equals($host, "google_cloud") %}


- **New GCP customer**: [Set up the GCP integration][25] first, then enable Agentless Scanning.
- **Existing integrated GCP project**: Use the [**Cloud Shell**](?tab=cloud-shell#choose-your-setup) (recommended) or [**Terraform**](?tab=terraform#choose-your-setup) tab.

{% alert %}
If you haven't connected your GCP project to Datadog yet, [set up the GCP integration][25] first.
{% /alert %}

{% tabs %}

{% tab label="Cloud Shell" %}
Use Google Cloud Shell to set up Agentless Scanning for your GCP projects. This method downloads a [setup script](https://github.com/DataDog/integrations-management/tree/main/gcp/agentless) that wraps the [Terraform Datadog Agentless Scanner module for GCP](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme), so you do not need to manage Terraform directly. You can review the script before running it.

1. Ensure you have the required GCP permissions:

   - On the **scanner project**, the identity you use in Cloud Shell must have **Owner** or equivalent.
   - **Storage**: Include permission to create Terraform state storage in the scanner project, or to use an existing bucket that you reference with `TF_STATE_BUCKET` (for example, `roles/storage.admin`, or the `storage.buckets.create`, `storage.buckets.get`, and `storage.buckets.update` permissions).

   Before you run the generated command, note what the setup script does in GCP:

   - **Terraform state**: By default, it creates a GCS bucket in the **scanner** project. To reuse an existing bucket, set `TF_STATE_BUCKET` before you run the command; the script does not create a bucket when that variable is set.
   - If you see a 403 error on {% ui %}Setting up Terraform state storage{% /ui %}, see [GCP: Failed to create state bucket][26] in the troubleshooting guide.

1. On the [Cloud Security Setup][4] page, click {% ui %}Cloud Integrations{% /ui %} > {% ui %}GCP{% /ui %}.
1. Click the GCP project where you want to deploy the Agentless scanner, which opens the side panel.
1. On the {% ui %}Features{% /ui %} tab, click {% ui %}Configure Agentless Scanning{% /ui %} or {% ui %}Manage{% /ui %} to open the Agentless Scanning Setup modal.
1. In the {% ui %}How would you like to set up Agentless Scanning?{% /ui %} section, select {% ui %}Cloud Shell{% /ui %}.
1. Select an {% ui %}API key{% /ui %} that has [Remote Configuration][3] enabled. An application key is automatically generated.
1. Select the {% ui %}GCP projects{% /ui %} you want to scan.
1. Configure the scanner:
   - If you already have scanners deployed, you can choose to {% ui %}use an existing scanner{% /ui %} (recommended) or {% ui %}deploy a new scanner{% /ui %}.
   - If you choose {% ui %}deploy a new scanner{% /ui %}, select the {% ui %}scanner project{% /ui %} (which must be one of the selected projects) and the {% ui %}scanner regions{% /ui %}. Datadog recommends installing scanners in every region where you have more than 150 hosts.
1. Click {% ui %}Copy command{% /ui %} to copy the generated command, and click {% ui %}Open Google Cloud Shell{% /ui %} to open [Google Cloud Shell](https://ssh.cloud.google.com/cloudshell). Review and run the command. The script applies the [Terraform Datadog Agentless Scanner module for GCP](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme) to deploy and configure the scanner in your selected project and region(s).
1. After the command completes, return to the Datadog setup page and click {% ui %}Done{% /ui %}.

{% /tab %}

{% tab label="Terraform" %}
The [Terraform Datadog Agentless Scanner module](https://github.com/DataDog/terraform-module-datadog-agentless-scanner) provides a reusable configuration for installing the Datadog Agentless scanner. For guidance on choosing your deployment topology, see [Deploying Agentless Scanning][2]. For usage examples, see the [examples directory](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) in the GitHub repository.

1. On the [Cloud Security Setup][4] page, click {% ui %}Cloud Integrations{% /ui %} > {% ui %}GCP{% /ui %}.
1. Click the GCP project where you want to deploy the Agentless scanner, which opens the side panel.
1. On the {% ui %}Features{% /ui %} tab, click {% ui %}Configure Agentless Scanning{% /ui %} or {% ui %}Manage{% /ui %} to open the Agentless Scanning Setup modal.
1. In the {% ui %}How would you like to set up Agentless Scanning?{% /ui %} section, select {% ui %}Terraform{% /ui %}.
1. Follow the instructions for installing the [Datadog Agentless Scanner module](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme).
1. Click {% ui %}Done{% /ui %}.
{% /tab %}

{% /tabs %}

After completing any of the setup methods above, [verify your setup](#verify-your-setup).

{% /if %}
<!-- end Self-hosted > Google Cloud -->

{% /if %}
<!-- end Self-hosted -->

<!-- Datadog-hosted -->
{% if equals($agentless_scanner_hosting, "datadog_hosted") %}
To enable scanning for an AWS account, attach the Agentless Scanning permissions to the Datadog integration role in that account. You can attach the permissions with a CloudFormation stack, a CloudFormation StackSet, or Terraform.

### Choose your setup {% #datadog-hosted-choose-your-setup %}

- **Single AWS account in Datadog**: Use the [**CloudFormation**](?tab=cloudformation#datadog-hosted-choose-your-setup) or [**Terraform**](?tab=terraform#datadog-hosted-choose-your-setup) tab.
- **AWS organization with multiple accounts**: Use the [**CloudFormation StackSet**](?tab=cloudformation-stackset--multi-account#datadog-hosted-choose-your-setup) tab to attach the scanning permissions across all member accounts.
- **Multiple accounts without AWS Organizations**: Repeat the [**CloudFormation**](?tab=cloudformation#datadog-hosted-choose-your-setup) or [**Terraform**](?tab=terraform#datadog-hosted-choose-your-setup) setup for each account individually.

{% tabs %}

{% tab label="CloudFormation" %}
The [Datadog-hosted CloudFormation template][10] attaches a managed IAM policy with the scanning permissions, and the AWS managed `SecurityAudit` policy, to your Datadog integration role. The stack also creates a Lambda function and its IAM execution role, which call the Datadog API during deployment.

1. On the [Cloud Security Setup][4] page, click {% ui %}Cloud Integrations{% /ui %} > {% ui %}AWS{% /ui %}.
1. Open the AWS account you want to scan:
   - **Account already integrated with Datadog**: Click the account's row to open the side panel. Clicking the account ID opens the AWS integration page in a new tab instead.
   - **New AWS account**: At the bottom of the AWS section, click {% ui %}Add AWS accounts by following these steps{% /ui %} and complete the [AWS integration][11] setup. Then, click the new account's row to open the side panel.
1. On the {% ui %}Features{% /ui %} tab, click {% ui %}Configure Agentless Scanning{% /ui %} or {% ui %}Manage{% /ui %} to open the Agentless Scanning Setup modal.
1. In the {% ui %}How would you like to set up Agentless scanning?{% /ui %} section, select {% ui %}CloudFormation{% /ui %}.
1. Select the AWS region where you want to create the CloudFormation stack.
1. Under {% ui %}Add Datadog API Key{% /ui %}, click {% ui %}Select API Key{% /ui %} and select a key.
1. Under {% ui %}Create Application Key{% /ui %}, click {% ui %}Create{% /ui %}.
1. Under {% ui %}Choose Scanning Method{% /ui %}, select {% ui %}Datadog-hosted (SaaS){% /ui %}.
1. Under {% ui %}Enable Features{% /ui %}, toggle the features you want to enable. {% ui %}Enable Agentless Vulnerability management{% /ui %} is always on. Optionally, turn on {% ui %}Enable Code Locations and DSPM (Sensitive Data Scanning){% /ui %} or {% ui %}Enable CIS Host (Linux) Benchmarks{% /ui %}.
1. Click {% ui %}Launch CloudFormation Template{% /ui %}. A new window opens, displaying the AWS CloudFormation screen. Use the provided CloudFormation template to create a stack.
1. Click {% ui %}Done{% /ui %}.

<!-- TODO(DOCS-16346): Confirm with SME the final button labels (Launch CloudFormation Template, Done) in the Datadog-hosted flow, and whether the template parameters below are prefilled. -->

The CloudFormation stack uses the following parameters:

- `DatadogAPIKey` and `DatadogAPPKey`: Your Datadog API key and application key.
- `DatadogSite`: Your Datadog site ({% region-param key="dd_site" code=true /%}).
- `DatadogIntegrationRoleName`: The name of the IAM role that the Datadog AWS integration uses in this account.
- `AgentlessVulnerabilityScanning`: Set to `true` to scan hosts, containers, and Lambda functions for vulnerabilities.
- `AgentlessSensitiveDataScanning`: Set to `true` to scan Amazon S3 buckets with [Sensitive Data Scanner][14].
- `AgentlessComplianceHostScanning`: Set to `true` to scan hosts for compliance.
{% /tab %}

{% tab label="CloudFormation StackSet (multi-account)" %}
For AWS Organizations with multiple accounts, use a CloudFormation StackSet to attach the Agentless Scanning permissions to the Datadog integration role in all member accounts. This approach automates onboarding and configures new accounts added to your AWS Organization.

#### Additional prerequisites for StackSet {% #datadog-hosted-stackset-prerequisites %}

- Access to the AWS management account
- [Trusted Access with AWS Organizations](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-enable-trusted-access.html) must be enabled for CloudFormation StackSets
- Every member account is integrated with Datadog through the [Datadog AWS integration][11]

#### Deploy the StackSet {% #datadog-hosted-deploy-the-stackset %}

<!-- TODO(DOCS-16346): Get the Datadog-hosted StackSet template URL and its parameters from SME, and confirm the steps below. -->

1. Log in to your AWS management account and navigate to {% ui %}CloudFormation{% /ui %} > {% ui %}StackSets{% /ui %}.
1. Click {% ui %}Create StackSet{% /ui %}.
1. Select {% ui %}Service-managed permissions{% /ui %}.
1. Under {% ui %}Specify template{% /ui %}, select {% ui %}Amazon S3 URL{% /ui %} and enter the Datadog-hosted StackSet template URL.
1. Enter a {% ui %}StackSet name{% /ui %} (for example, `DatadogAgentlessScanningStackSet`).
1. Set {% ui %}Deployment targets{% /ui %} to deploy across your AWS Organization or specific OUs.
1. Enable {% ui %}Automatic deployment{% /ui %} to configure new accounts added to your AWS Organization.
1. Select a single region for deployment (IAM is global, so the permissions only need to be deployed once per account).
1. Review and submit the StackSet.
{% /tab %}

{% tab label="Terraform" %}
The [Datadog-hosted (SaaS) Terraform example][29] in the [Terraform Datadog Agentless Scanner module][6] creates a managed IAM policy with the scanning permissions and attaches it to your Datadog integration role. It also enables scanning for the account with the [`datadog_agentless_scanning_aws_scan_options`][30] resource. The setup doesn't deploy any scanner infrastructure in your account.

1. On the [Cloud Security Setup][4] page, click {% ui %}Cloud Integrations{% /ui %} > {% ui %}AWS{% /ui %}.
1. Open the AWS account you want to scan:
   - **Account already integrated with Datadog**: Click the account's row to open the side panel. Clicking the account ID opens the AWS integration page in a new tab instead.
   - **New AWS account**: At the bottom of the AWS section, click {% ui %}Add AWS accounts by following these steps{% /ui %} and complete the [AWS integration][11] setup. Then, click the new account's row to open the side panel.
1. On the {% ui %}Features{% /ui %} tab, click {% ui %}Configure Agentless Scanning{% /ui %} or {% ui %}Manage{% /ui %} to open the Agentless Scanning Setup modal.
1. In the {% ui %}How would you like to set up Agentless scanning?{% /ui %} section, select {% ui %}Terraform{% /ui %}, then select {% ui %}Datadog-hosted (SaaS){% /ui %}.
1. Under {% ui %}Apply the Terraform configuration{% /ui %}, follow the instructions to apply the configuration. Provide the following variables:
   - `datadog_api_key` and `datadog_app_key`: Your Datadog API key and application key.
   - `datadog_site`: Your Datadog site ({% region-param key="dd_site" code=true /%}).
   - `datadog_integration_role`: The name of the IAM role that the Datadog AWS integration uses in this account.
1. Click {% ui %}Done{% /ui %}.

To choose which features to enable, set the arguments of the `datadog_agentless_scanning_aws_scan_options` resource. For example, set `sensitive_data` to `false` to turn off Sensitive Data Scanner for Amazon S3 buckets.
{% /tab %}

{% /tabs %}

After you attach the permissions, Datadog detects them automatically and begins scanning the account on the next scan cycle. Next, see the [Verify your setup](#verify-your-setup) section.
{% /if %}
<!-- end Datadog-hosted -->

## Verify your setup

After completing the setup, Agentless Scanning takes time to produce initial results. The first scan cycle takes approximately 30 minutes to complete.

{% alert %}
If no results appear after two hours, see the [Agentless Scanning troubleshooting guide][7].
{% /alert %}

View scan results in the following locations:

- **For host, container, and serverless vulnerabilities**: [Cloud Security Vulnerabilities Explorer][15]. To view only vulnerabilities detected by Agentless Scanning, use the filter `origin:"Agentless scanner"` in the search bar.
- **For sensitive data findings**: [Sensitive Data Scanner][17].

## Exclude resources from scans

To exclude specific hosts, containers, or functions from scans, see [Resource Evaluation Filters](/security/cloud_security_management/guide/resource_evaluation_filters).

## Disable Agentless Scanning

<!-- Self-hosted -->
{% if equals($agentless_scanner_hosting, "self_hosted") %}

<!-- Self-hosted > AWS -->
{% if equals($host, "aws") %}
1. On the [Cloud Security Setup][4] page, click {% ui %}Cloud Integrations{% /ui %} > {% ui %}AWS{% /ui %}.
1. If required, use filters to find the account you want to stop Agentless Scanning for. Click the account to open the side panel that contains its settings.
1. On the {% ui %}Features{% /ui %} tab, under {% ui %}Requires setup of the Agentless Scanners:{% /ui %} switch the toggles to the off position.
{% /if %}
<!-- end Self-hosted > AWS -->

<!-- Self-hosted > Azure -->
{% if equals($host, "azure") %}
1. On the [Cloud Security Setup][4] page, click {% ui %}Cloud Integrations{% /ui %} > {% ui %}Azure{% /ui %}.
1. Expand the tenant containing the subscription where you want to disable Agentless Scanning. Click the subscription to open the side panel that contains its settings.
1. On the {% ui %}Features{% /ui %} tab, under {% ui %}Requires setup of the Agentless Scanners:{% /ui %} switch the toggles to the off position.
{% /if %}
<!-- end Self-hosted > Azure -->

<!-- Self-hosted > Google Cloud -->
{% if equals($host, "google_cloud") %}
1. On the [Cloud Security Setup][4] page, click {% ui %}Cloud Integrations{% /ui %} > {% ui %}GCP{% /ui %}.
1. Expand the account containing the project where you want to disable Agentless Scanning. Click the project to open the side panel that contains its settings.
1. On the {% ui %}Features{% /ui %} tab, under {% ui %}Requires setup of the Agentless Scanners:{% /ui %} switch the toggles to the off position.
{% /if %}
<!-- end Self-hosted > Google Cloud -->

{% /if %}
<!-- end Self-hosted -->

<!-- Datadog-hosted -->
{% if equals($agentless_scanner_hosting, "datadog_hosted") %}
To stop scanning an AWS account, delete the CloudFormation stack that attached the Agentless Scanning permissions, or remove the permissions from your Terraform configuration.

<!-- TODO(DOCS-16346): Confirm with SME the disable steps for Datadog-hosted scanning (in-app toggles, stack deletion, and whether deleting the stack also detaches the SecurityAudit policy). -->
{% /if %}
<!-- end Datadog-hosted -->

<!-- Self-hosted -->
{% if equals($agentless_scanner_hosting, "self_hosted") %}
## Uninstall Agentless Scanning

Select the deployment method you used to install Agentless Scanning:

<!-- Self-hosted > AWS -->
{% if equals($host, "aws") %}
{% tabs %}

{% tab label="AWS CloudFormation" %}
To uninstall Agentless Scanning, log in to your AWS console and delete the CloudFormation stack created for Agentless Scanning (the sub-stack name follows the pattern `DatadogIntegration-DatadogAgentlessScanning-...`).
{% /tab %}

{% tab label="Terraform" %}
To uninstall Agentless Scanning, remove the scanner module from your Terraform code. For more information, see the [Terraform module][9] documentation.
{% /tab %}

{% /tabs %}
{% /if %}
<!-- end Self-hosted > AWS -->

<!-- Self-hosted > Azure -->
{% if equals($host, "azure") %}
{% tabs %}

{% tab label="Azure Cloud Shell" %}
To uninstall Agentless Scanning that was set up using Azure Cloud Shell, run the same setup command you used during installation, replacing `deploy` with `destroy` at the end. For example:

```text
curl -sSL "<CLOUD_SHELL_SCRIPT_URL>" -o azure_agentless_setup.pyz && \
DD_API_KEY="<DD_API_KEY>" \
DD_APP_KEY="<DD_APP_KEY>" \
DD_SITE="<DD_SITE>" \
SCANNER_SUBSCRIPTION="<SCANNER_SUBSCRIPTION>" \
python3 azure_agentless_setup.pyz destroy
```

The destroy command runs `terraform destroy`, deactivates Agentless scan options in Datadog for each previously configured subscription, and prompts before deleting the Key Vault that holds the API key. The resource group and Terraform state storage account are kept by default; the script prints manual deletion instructions for them.

You can review the [setup script source][22] before running the command.
{% /tab %}

{% tab label="Azure Resource Manager" %}
To uninstall Agentless Scanning, log in to your Azure subscription. If you created a dedicated resource group for the Agentless scanner, delete this resource group along with the following Azure role definitions:
  - Datadog Agentless Scanner Role
  - Datadog Agentless Scanner Delegate Role

If you did not use a dedicated resource group, you must manually delete the scanner resources, which can be identified by the tags `Datadog:true` and `DatadogAgentlessScanner:true`.
{% /tab %}

{% tab label="Terraform" %}
To uninstall Agentless Scanning, remove the scanner module from your Terraform code. For more information, see the [Terraform module][9] documentation.
{% /tab %}

{% /tabs %}
{% /if %}
<!-- end Self-hosted > Azure -->

<!-- Self-hosted > Google Cloud -->
{% if equals($host, "google_cloud") %}
{% tabs %}

{% tab label="GCP Cloud Shell" %}
To uninstall Agentless Scanning that was set up using Google Cloud Shell, run the same setup command you used during installation, replacing `deploy` with `destroy` at the end. For example:

```text
curl -sSL "<CLOUD_SHELL_SCRIPT_URL>" -o gcp_agentless_setup.pyz && \
DD_API_KEY="<DD_API_KEY>" \
DD_APP_KEY="<DD_APP_KEY>" \
DD_SITE="<DD_SITE>" \
SCANNER_PROJECT="<SCANNER_PROJECT>" \
SCANNER_REGIONS="<SCANNER_REGIONS>" \
PROJECTS_TO_SCAN="<PROJECTS>" \
python3 gcp_agentless_setup.pyz destroy
```

You can review the [setup script source][21] before running the command.
{% /tab %}

{% tab label="Terraform" %}
To uninstall Agentless Scanning, remove the scanner module from your Terraform code. For more information, see the [Terraform module][9] documentation.
{% /tab %}

{% /tabs %}
{% /if %}
<!-- end Self-hosted > Google Cloud -->
{% /if %}
<!-- end Self-hosted -->

[1]: /account_management/api-app-keys/
[2]: /security/cloud_security_management/setup/agentless_scanning/deployment_methods?agentless_scanner_hosting=self_hosted
[3]: /remote_configuration
[4]: https://app.datadoghq.com/security/configuration/csm/setup
[5]: https://app.datadoghq.com/security/csm/
[6]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md
[7]: /security/cloud_security_management/troubleshooting/agentless_scanning
[8]: /security/cloud_security_management/setup/agentless_scanning#choose-where-scanners-run
[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall
[10]: https://github.com/DataDog/cloudformation-template/blob/master/aws_quickstart/datadog_agentless_saas.yaml
[11]: /integrations/amazon_web_services/
[12]: /security/cloud_security_management/agentless_scanning
[13]: https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=azure
[14]: /security/sensitive_data_scanner/setup/cloud_storage
[15]: https://app.datadoghq.com/security/csm/vm
[17]: https://app.datadoghq.com/sensitive-data-scanner/storage
[20]: /security/cloud_security_management/setup/agentless_scanning#cloud-service-provider-cost
[21]: https://github.com/DataDog/integrations-management/tree/main/gcp/agentless
[22]: https://github.com/DataDog/integrations-management/tree/main/azure/agentless
[25]: https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=gcp
[26]: /security/cloud_security_management/troubleshooting/agentless_scanning#gcp-failed-to-create-state-bucket-storagebucketscreate-403
[27]: /security/cloud_security_management/setup/agentless_scanning#datadog-hosted-data-residency
[28]: https://github.com/DataDog/cloudformation-template/blob/master/aws_quickstart/datadog_agentless_saas_policy.json
[29]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples/saas
[30]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/agentless_scanning_aws_scan_options
