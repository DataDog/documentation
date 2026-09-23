---
title: Agentless Setup
aliases:
  - /security/cloud_security_management/setup/agentless_scanning/quick_start
  - /security/cloud_security_management/setup/agentless_scanning/cloudformation
  - /security/cloud_security_management/setup/agentless_scanning/terraform
  - /security/cloud_security_management/setup/agentless_scanning/azure_resource_manager
  - /security/cloud_security_management/guide/agentless_aws_integration
  - /security/cloud_security_management/guide/agentless_terraform
  - /security/cloud_security_management/setup/agentless_scanning/enable
  - /security/cloud_security_management/setup/agentless_scanning/compatibility
  - /security/cloud_security_management/setup/agentless_scanning/deployment_methods
  - /security/cloud_security_management/setup/agentless_scanning/update
  - /security/cloud_security_management/agentless_scanning/compatibility
  - /security/cloud_security_management/agentless_scanning/deployment_methods
further_reading:
  - link: "/security/cloud_security_management/setup"
    tag: "Documentation"
    text: "Setting up Cloud Security"
  - link: "/security/cloud_security_management/setup/agentless/vulnerabilities"
    tag: "Documentation"
    text: "Cloud Security Agentless Scanning"
  - link: "/security/cloud_security_management/troubleshooting/agentless_scanning"
    tag: "Documentation"
    text: "Troubleshooting Agentless Scanning"
---
Agentless Scanning provides visibility into vulnerabilities that exist within your cloud infrastructure, without installing the Datadog Agent. Agentless Scanning runs entirely within your infrastructure, sending minimal data to Datadog, and leaving your sensitive data in your environment. Because the scanner runs in your cloud account, standard [cloud provider costs][20] apply. To learn more, see the [Agentless Scanning overview][12].

Setup takes approximately 30 minutes per cloud account:

1. Verify prerequisites below.
1. Choose your cloud provider and deployment method.
1. Launch a template in your cloud account.
1. Verify scan results in Datadog.

## Compatibility

### Availability

Agentless Scanning is supported on AWS, Azure, and GCP.

The following table provides a summary of Agentless Scanning technologies in relation to their corresponding components for each supported cloud provider:

| Component                                       | AWS                                                                                                                           | Azure                                                                                                                                                                             | GCP                                                                                                                                                                                                                       |
|-------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Operating System                                | Linux; Windows Server 2016 or later; Windows 10 or later                                                                      | Linux; Windows Server 2016 or later; Windows 10 or later                                                                                                                          | Linux; Windows Server 2016 or later; Windows 10 or later                                                                                                                                                                  |
| Host File System                                | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                                            | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                                                                                                | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                                                                                                                                        |
| Package Manager                                 | Deb (debian, ubuntu) <br> RPM (amazon-linux, fedora, redhat, centos) <br> APK (alpine)                                        | Deb (debian, ubuntu) <br> RPM (fedora, redhat, centos) <br> APK (alpine)                                                                                                          | Deb (debian, ubuntu) <br> RPM (fedora, redhat, centos) <br> APK (alpine)                                                                                                                                                  |
| Encryption                                      | AWS </br> Unencrypted </br> Encrypted - Platform Managed Key (PMK) and Customer Managed Key (CMK)                             | Encrypted - Platform Managed Key (PMK): Azure Disk Storage Server-Side Encryption, Encryption at host </br> **Note**: Encrypted - Customer Managed Key (CMK) is **not** supported | Encrypted - Platform Managed Key (PMK): Persistent Disk Encryption, Confidential VM </br> **Note**: Encrypted - Customer Managed Encryption Key (CMEK) and Customer-Supplied Encryption Keys (CSEK) are **not** supported |
| Container runtime                               | Docker, containerd </br> **Note**: CRI-O is **not** supported                                                                 | Docker, containerd </br> **Note**: CRI-O is **not** supported                                                                                                                     | Docker, containerd </br> **Note**: CRI-O is **not** supported                                                                                                                                                             |
| Serverless                                      | AWS Lambda <br> AWS Fargate for ECS                                                                                           | Azure Functions, Azure Container Apps, Azure Container Instances<br />**Note**: Requires the latest agentless scanner. See [Update Agentless Scanning][47].                                     | Cloud Run                                                                                                                                           |
| Kubernetes                                      | EKS on EC2 nodes </br> EKS on Fargate </br> **Note**: EKS on Fargate requires the [Datadog Cluster Agent][48] to be installed | AKS on VMs, Virtual Machine Scale Sets (VMSS), and Azure Container Instances (ACI) </br> **Note**: AKS on ACI requires the [Datadog Cluster Agent][48] to be installed | GKE Standard and GKE Autopilot </br> **Note**: GKE Autopilot requires the [Datadog Cluster Agent][48] to be installed                                                              |
| Application languages (in hosts and containers) | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                           | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                                                               | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                                                                                                       |
| Container Registries                            | Amazon ECR (public and private): Scans running container images and the last 1,000 pushed images at rest                      | ACR: Scans running container images only<br />**Note:** At-rest registry scanning is not supported. To request it, contact [Datadog Support][46]   | Google Artifact Registry: Scans images from running workloads and images at rest<br />See the [Container image registries](#container-image-registries) section for the full list of supported registries                                                                                                                                        |
| Host Images                                     | AMI                                                                                                                           | Not supported                                                                                                                                                                     | Not supported                                                                                                                                                                                                             |
| Sensitive Data (SDS)                            | S3                                                                                                                            | Not supported                                                                                                                                                                     | Not supported                                                                                                                                                                                                             |

**Note**: AMIs must be stored in an account that uses Datadog's AWS integration. Otherwise, Datadog can't read the AMI's underlying Amazon Elastic Block Store (EBS) snapshot, so it can't scan or report on the AMI.

### Linux distributions

The following Linux distributions are supported for hosts and containers scans:

| Operating System         | Supported Versions                                  | Package Managers | Security Advisories                                                                                       |
|--------------------------|-----------------------------------------------------|------------------|-----------------------------------------------------------------------------------------------------------|
| Alpine Linux             | 2.2-2.7, 3.0-3.19 (edge is not supported)           | apk              | [https://secdb.alpinelinux.org/][31]                                                                       |
| Wolfi Linux              | N/A                                                 | apk              | [https://packages.wolfi.dev/os/security.json][32]                                                          |
| Chainguard               | N/A                                                 | apk              | [https://packages.cgr.dev/chainguard/security.json][33]                                                    |
| Red Hat Enterprise Linux | 6, 7, 8                                             | dnf/yum/rpm      | [https://www.redhat.com/security/data/metrics/][34] and [https://www.redhat.com/security/data/oval/v2/][35] |
| CentOS                   | 6, 7, 8                                             | dnf/yum/rpm      | [https://www.redhat.com/security/data/metrics/][34] and [https://www.redhat.com/security/data/oval/v2/][35] |
| AlmaLinux                | 8, 9                                                | dnf/yum/rpm      | [https://errata.almalinux.org/][36]                                                                        |
| Rocky Linux              | 8, 9                                                | dnf/yum/rpm      | [https://download.rockylinux.org/pub/rocky/][37]                                                           |
| Oracle Linux             | 5, 6, 7, 8                                          | dnf/yum/rpm      | [https://linux.oracle.com/security/oval/][38]                                                              |
| CBL-Mariner              | 1.0, 2.0                                            | dnf/yum/rpm      | [https://github.com/microsoft/CBL-MarinerVulnerabilityData/][39]                                           |
| Amazon Linux             | 1, 2, 2023                                          | dnf/yum/rpm      | [https://alas.aws.amazon.com/][40]                                                                        |
| openSUSE Leap            | 42, 15                                              | zypper/rpm       | [http://ftp.suse.com/pub/projects/security/cvrf/][41]                                                     |
| SUSE Linux Enterprise    | 11, 12, 15                                          | zypper/rpm       | [http://ftp.suse.com/pub/projects/security/cvrf/][41]                                                     |
| Photon OS                | 1.0, 2.0, 3.0, 4.0                                  | tdnf/yum/rpm     | [https://packages.vmware.com/photon/photon_cve_metadata/][42]                                             |
| Debian GNU/Linux         | 7, 8, 9, 10, 11, 12 (unstable/sid is not supported) | apt/dpkg         | [https://security-tracker.debian.org/tracker/][43] and [https://www.debian.org/security/oval/][44]        |
| Ubuntu                   | All versions supported by Canonical                 | apt/dpkg         | [https://ubuntu.com/security/cve][45]                                                                     |

### Application libraries

The following application languages and libraries are supported for vulnerability scans on container images, Lambda functions, and containers running in hosts:

| Language | Supported Package Manager | Supported Files                                                      |
|----------|---------------------------|----------------------------------------------------------------------|
| Ruby     | bundler                   | Gemfile.lock, gemspec                                                |
| .NET     | nuget                     | packages.lock.json, packages.config, .deps.json, *packages.props     |
| Go       | mod                       | Binaries built by Go, go.mod                                         |
| Java     | Gradle, Maven             | pom.xml, *gradle.lockfile, JAR/WAR/PAR/EAR (with pom.properties)     |
| Node.js  | npm, pnpm, yarn           | package-lock.json, yarn.lock, pnpm-lock.yaml, package.json           |
| PHP      | composer                  | composer.lock                                                        |
| Python   | pip, poetry               | pipfile.lock, poetry.lock, egg package, wheel package, conda package |

### Container image registries

Registry scanning support depends on how Datadog accesses the registry. Some registries let Datadog enumerate and scan images directly at rest. Others require an authenticated pull to scan an image already running in a workload or cached on a scanned node.

| Registry                                                                        | Scan type            | Notes                                                                                                                                                    |
|----------------------------------------------------------------------------------|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| Amazon ECR (public and private)                                                   | At rest and running  | Scans running container images **and** the last 1,000 pushed images at rest (by date)<br />**Note**: To increase the number of at-rest images scanned, contact [Datadog Support][46] |
| Google Artifact Registry (GAR), including images pushed to legacy Google Container Registry (`gcr.io`) hostnames | At rest and running  | Scans images tied to running workloads (Cloud Run, GKE) and images at rest                                                                               |
| Azure Container Registry (ACR)                                                    | Authenticated pull   | Images are scanned when running in a workload or cached on a scanned node<br />**Note**: At-rest registry scanning is not supported. To request it, contact [Datadog Support][46] |
| Docker Hub                                                                        | Authenticated pull   | Images are scanned when running in a workload or cached on a scanned node                                                                                 |
| GitHub Container Registry (GHCR)                                                  | Authenticated pull   | Images are scanned when running in a workload or cached on a scanned node                                                                                 |
| Microsoft Container Registry (MCR)                                                | Authenticated pull   | Images are scanned when running in a workload or cached on a scanned node                                                                                 |
| Kubernetes registry (`registry.k8s.io`)                                           | Authenticated pull   | Images are scanned when running in a workload or cached on a scanned node                                                                                 |

**Note**: Self-hosted registries are not supported.

Container image scanning from registry is only supported if you have installed Agentless with:
  - CloudFormation Integrations >= v2.0.8
  - Terraform Agentless Module >= v0.11.7

### Container runtimes

The following container runtimes are supported:

- containerd: v1.5.6 or later
- Docker

**Note for container observations**: Agentless Scanning requires uncompressed container image layers. As a workaround, you can set the configuration option `discard_unpacked_layers=false` in the containerd configuration file.

## Prerequisites

Before setting up Agentless Scanning, verify that the following prerequisites are met:

- **Remote Configuration**: [Remote Configuration][3] must be enabled on your Datadog organization to send scan instructions to Agentless scanners.
- **[API and Application Keys][1]**:
  - An {{< ui >}}API key{{< /ui >}} with Remote Configuration enabled is required for scanners to report scan results to Datadog.
  - An {{< ui >}}Application key{{< /ui >}} with either `Integrations Manage` or `Org Management` permissions is required for you to enable scanning features through the Datadog API.
- **Cloud permissions**: The Agentless Scanning instance requires specific permissions to scan hosts, host images, container registries, and functions. Datadog automatically applies these permissions, listed below for transparency, during installation.<br><br>
  {{< collapse-content title="AWS scanning permissions" level="h3" >}}
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

  {{< collapse-content title="Azure scanning permissions" level="h3" >}}
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

  {{< collapse-content title="GCP scanning permissions" level="h3" >}}
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

## Deployment methods

This guide helps you choose the right deployment topology for Agentless Scanning based on your cloud environment. For setup instructions, see [Enabling Agentless Scanning][63].

### Overview

Datadog recommends the following guidelines:
- Use a dedicated scanner account for multi-account environments.
- Deploy a scanner in each region that contains more than 150 hosts.
- If you use [Cloud Storage Scanning][61], deploy a scanner in each region that contains a data store (for example, S3 buckets).

<div class="alert alert-info">Scanners only send the collected list of packages and host metadata (hostnames, EC2/VM/Compute Engine instance identifiers) to Datadog. All scanned data remains in your infrastructure.</div>

### Cloud account and region configuration

The deployment topology you use depends on how many cloud accounts (AWS accounts, Azure subscriptions, or GCP projects) you need to scan, and which regions they cover.

- **Cloud accounts**: If you only need to scan a single account, deploy one or more scanners directly in that account. Otherwise, use a dedicated scanner account, and use delegate roles to grant it access to scan other accounts. This is called **cross-account scanning**.
- **Regions**: A single scanner can scan hosts in any region, including regions other than its own. However, cross-region scanning incurs data transfer costs. Whether you deploy additional scanners depends on how many hosts you have in each region.

These tabs contain information on how to configure your deployment topology. Select the tab that describes how many accounts you need to scan, then learn more based on how many regions you need to cover.

{{< tabs >}}
{{% tab "Single account" %}}

If you only need to scan a single account, deploy one or more scanners directly in that account.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/single-account.png" alt="Diagram of Agentless Scanning showing the Agentless scanner applied in one account that covers multiple regions" width="40%" >}}

#### Decide how many scanners to deploy

A single scanner can scan hosts in any region, including regions other than its own. Cross-region scanning incurs data transfer costs, so the decision of where to deploy additional scanners depends on how many hosts you have in each region.

- **Fewer than ~150 hosts total across all regions**: A single scanner in one region is the most cost-effective setup. The cross-region data transfer costs for scanning remote hosts are lower than the fixed cost of running an additional scanner.
- **More than ~150 hosts in a specific region**: Deploy a dedicated scanner in that region. At this threshold, the egress savings from scanning locally outweigh the cost of running the scanner.
- **Multiple regions above the threshold**: Deploy a scanner in each region that exceeds ~150 hosts. Regions below the threshold can be scanned cross-region from the nearest scanner.

Datadog automatically routes scans to the appropriate regional scanner to minimize cross-region costs.

##### Scanner capacity limits

Each scanner has throughput limits governed by cloud provider API quotas:

| Limit | Value |
|-------|-------|
| Maximum scanners per account per region | 4 (hard cap; cloud providers like AWS limit concurrent snapshots to 100 per account per region) |
| Scan interval | Every 12 hours |

<div class="alert alert-danger">Do not increase the Autoscaling Group (ASG) desired count beyond four scanners per region. Additional scanners cannot create snapshots due to cloud providers' concurrent snapshot limit.</div>

{{% /tab %}}
{{% tab "Multiple accounts" %}}

#### Decide which accounts to deploy scanners in

Datadog recommends using a **dedicated scanner account** to deploy scanners in, and using **cross-account delegate roles** to grant scanners access to target accounts (including the scanner account).

For AWS Organizations, use a [CloudFormation StackSet][61] to deploy a delegate role across all member accounts, automating onboarding for cross-account scanning.

The following diagram illustrates cross-account scanning from a central account (Account 4):

{{< img src="/sensitive_data_scanner/setup/cloud_storage/central-scanner.png" alt="Diagram of Agentless Scanning showing the Agentless scanner deployed in a central cloud account" width="90%" >}}

**If you do not want to grant cross-account permissions**, deploy a scanner in each account instead. This incurs higher costs because each scanner performs cross-region scans within its account.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-account.png" alt="Diagram of Agentless Scanning showing the Agentless scanner deployed in each cloud account" width="90%" >}}

#### Decide how many scanners to deploy

A single scanner can scan hosts in any region, including regions other than its own. Cross-region scanning incurs data transfer costs, so the decision of where to deploy additional scanners depends on how many hosts you have in each region.

- **Fewer than ~150 hosts total across all regions**: A single scanner in one region is the most cost-effective setup. The cross-region data transfer costs for scanning remote hosts are lower than the fixed cost of running an additional scanner.
- **More than ~150 hosts in a specific region**: Deploy a dedicated scanner in that region. At this threshold, the egress savings from scanning locally outweigh the cost of running the scanner.
- **Multiple regions above the threshold**: Deploy a scanner in each region that exceeds ~150 hosts. Regions below the threshold can be scanned cross-region from the nearest scanner.

Datadog automatically routes scans to the appropriate regional scanner to minimize cross-region costs.

##### Scanner capacity limits

Each scanner has throughput limits governed by cloud provider API quotas:

| Limit | Value |
|-------|-------|
| Maximum scanners per account per region | 4 (hard cap; cloud providers like AWS limit concurrent snapshots to 100 per account per region) |
| Scan interval | Every 12 hours |

<div class="alert alert-danger">Do not increase the Autoscaling Group (ASG) desired count beyond four scanners per region. Additional scanners cannot create snapshots due to cloud providers' concurrent snapshot limit.</div>

[61]: /security/cloud_security_management/setup/agentless#aws-cloudformation-stackset-setup

{{% /tab %}}
{{< /tabs >}}

### Enterprise networking considerations

By default, the scanner creates a new VPC during deployment. If your organization is using Terraform and has Service Control Policies (SCPs) that restrict VPC creation, use the [{{< ui >}}custom VPC{{< /ui >}}][62] option during setup to use an existing VPC instead of creating a new one.

## Setup

See [Deploying Agentless Scanning][2] for information on how to structure your deployment, including how many accounts and how many regions you deploy scanners across.

Select your cloud provider to see the available setup methods. If you are setting up Agentless Scanning across multiple cloud providers, complete the setup for each provider independently.

{{< tabs >}}
{{% tab "AWS" %}}

### Choose your setup

- **New to Datadog**: On the [Intro to Cloud Security][2] page, click {{< ui >}}Get Started with Cloud Security{{< /ui >}}, then click {{< ui >}}Quick Start{{< /ui >}}. Quick Start is a guided setup flow that uses AWS CloudFormation to deploy Agentless Scanning with all Cloud Security features pre-enabled. It is only available for organizations that have not yet set up Cloud Security Management.
- **Single AWS account in Datadog**: Use [CloudFormation](#aws-cloudformation-setup) or [Terraform](#aws-terraform-setup). Terraform is recommended for multi-region deployments.
- **AWS organization with multiple accounts**: Use [CloudFormation StackSet](#aws-cloudformation-stackset-setup) to deploy scanning capabilities across all member accounts.
- **Multiple accounts without AWS Organizations**: Repeat the [CloudFormation](#aws-cloudformation-setup) or [Terraform](#aws-terraform-setup) setup for each account individually.

{{% collapse-content title="CloudFormation" level="h4" id="aws-cloudformation-setup" %}}
Use CloudFormation if you already have an AWS account integrated with Datadog and want to enable Agentless Scanning, or if you want to add a new AWS account.

#### New AWS account

1. On the [Cloud Security Setup][1] page, click {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}}.
1. At the bottom of the AWS section, click {{< ui >}}Add AWS accounts by following these steps{{< /ui >}}. The {{< ui >}}Add New AWS Account(s){{< /ui >}} dialog is displayed.
1. Select the {{< ui >}}Add a Single AWS Account{{< /ui >}} and {{< ui >}}CloudFormation{{< /ui >}} options.
1. Select the AWS region where you want to create the CloudFormation stack.
1. Select an API key that has [Remote Configuration][3] enabled.
1. Choose whether to enable {{< ui >}}Sensitive Data Scanner{{< /ui >}} for cloud storage. This automatically catalogs and classifies sensitive data in Amazon S3 resources.
1. Click {{< ui >}}Launch CloudFormation Template{{< /ui >}}. A new window opens, displaying the AWS CloudFormation screen. Use the provided CloudFormation template to create a stack. The template includes the IAM permissions required to deploy and manage Agentless scanners.

#### Existing AWS account

1. On the [Cloud Security Setup][1] page, click {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}}.
1. Click the AWS account where you want to deploy the Agentless scanner, which opens the side panel.
1. On the {{< ui >}}Features{{< /ui >}} tab, click {{< ui >}}Configure Agentless Scanning{{< /ui >}} or {{< ui >}}Manage{{< /ui >}} to open the Agentless Scanning Setup modal.
1. In the {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}} section, select {{< ui >}}CloudFormation{{< /ui >}}.
1. Select the AWS region that corresponds to the CloudFormation stack.
1. Select an API key that has [Remote Configuration][3] enabled.
1. Copy the new application key Datadog generates.
1. Choose to either:
   - Use an existing scanner, then select the scanner you want to use.
   - Deploy a nwe scanner.
1. Toggle the features you want to enable, such as {{< ui >}}Agentless Vulnerability Management{{< /ui >}} or {{< ui >}}Sensitive Data Scanning for Cloud Storage{{< /ui >}}.
1. Click {{< ui >}}Launch CloudFormation Template{{< /ui >}}. A new window opens, displaying the AWS CloudFormation screen. Use the provided CloudFormation template to create a stack.
1. Click {{< ui >}}Done{{< /ui >}}.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[3]: /remote_configuration

{{% /collapse-content %}}
{{% collapse-content title="CloudFormation StackSet (Multi-Account)" level="h4" id="aws-cloudformation-stackset-setup" %}}

For AWS Organizations with multiple accounts, use a CloudFormation StackSet to deploy the Agentless Scanning delegate role across all member accounts. This approach automates onboarding and configures new accounts added to your AWS Organization.

This setup deploys the delegate role required for [cross-account scanning](/security/cloud_security_management/setup/agentless#deployment-methods) across your AWS Organization or specific Organizational Units (OUs). First, set up Agentless Scanning in your central scanning account using [CloudFormation](#aws-cloudformation-setup) or [Terraform](#aws-terraform-setup), then deploy the StackSet to configure the remaining accounts.

#### Prerequisites

- Access to the AWS management account
- [Trusted Access with AWS Organizations](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-enable-trusted-access.html) must be enabled for CloudFormation StackSets
- Agentless Scanning already configured in your central scanning account ([see above](#aws-cloudformation-setup))

#### Deploy the StackSet

1. Log in to your AWS management account and navigate to {{< ui >}}CloudFormation{{< /ui >}} > {{< ui >}}StackSets{{< /ui >}}.
1. Click {{< ui >}}Create StackSet{{< /ui >}}.
1. Select {{< ui >}}Service-managed permissions{{< /ui >}}.
1. Under {{< ui >}}Specify template{{< /ui >}}, select {{< ui >}}Amazon S3 URL{{< /ui >}} and enter the following URL:
   ```
   https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/v4.9.1/datadog_agentless_delegate_role_stackset.yaml
   ```
1. Enter a {{< ui >}}StackSet name{{< /ui >}} (for example, `DatadogAgentlessScanningStackSet`).
1. Configure the {{< ui >}}ScannerInstanceRoleARN{{< /ui >}} parameter, which is the ARN of the IAM role attached to your Agentless scanner instances.
      <div class="alert alert-danger">The <code>ScannerInstanceRoleARN</code> must be the exact ARN of the scanner instance role (for example, <code>arn:aws:iam::123456789012:role/DatadogAgentlessScannerRole</code>). Using a root ARN such as <code>arn:aws:iam::123456789012:root</code> does not work.</div>
      <p>The <code>ScannerInstanceRoleARN</code> establishes a trust relationship between the delegate role (created in target accounts) and your scanner instances (already running in the central account). This enables cross-account scanning where:</p>
      <ul>
        <li>The scanner runs in Account 4.</li>
        <li>The delegate role exists in Accounts 1, 2, 3 (deployed through the StackSet).</li>
        <li>The scanner assumes the delegate roles to scan resources in those accounts.</li>
      </ul>
1. Set {{< ui >}}Deployment targets{{< /ui >}} to deploy across your AWS Organization or specific OUs.
1. Enable {{< ui >}}Automatic deployment{{< /ui >}} to configure new accounts added to your AWS Organization.
1. Select a single region for deployment (the IAM role is global and only needs to be deployed once per account).
1. Review and submit the StackSet.

After the StackSet deploys, the member accounts are configured to allow cross-account scanning from your central scanner account.
{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h4" id="aws-terraform-setup" %}}

The [Terraform Datadog Agentless Scanner module](https://github.com/DataDog/terraform-module-datadog-agentless-scanner) provides a reusable configuration for installing the Datadog Agentless scanner. Terraform is the recommended deployment method for multi-region environments. It deploys one scanner per region, which avoids cross-region networking costs. For guidance on choosing your deployment topology, see [Deploying Agentless Scanning](/security/cloud_security_management/setup/agentless#deployment-methods). For usage examples including multi-region configurations, see the [examples directory](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) in the GitHub repository.

#### New AWS account

1. On the [Cloud Security Setup][1] page, click {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}}.
1. At the bottom of the AWS section, click {{< ui >}}Add AWS accounts by following these steps{{< /ui >}}. The {{< ui >}}Add New AWS Account(s){{< /ui >}} dialog is displayed.
1. Select the {{< ui >}}Add a Single AWS Account{{< /ui >}} and {{< ui >}}Manually{{< /ui >}} options.
1. Follow the instructions for installing the [Datadog Agentless Scanner module][2].
1. Select the {{< ui >}}I confirm that the Datadog IAM Role has been added to the AWS Account{{< /ui >}} checkbox.
1. Enter the {{< ui >}}AWS Account ID{{< /ui >}} and {{< ui >}}AWS Role Name{{< /ui >}}.
1. Click {{< ui >}}Save{{< /ui >}}.

#### Existing AWS account

1. On the [Cloud Security Setup][1] page, click {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}}.
1. Click the AWS account where you want to deploy the Agentless scanner to open the side panel.
1. On the {{< ui >}}Features{{< /ui >}} tab, click {{< ui >}}Configure Agentless Scanning{{< /ui >}} or {{< ui >}}Manage{{< /ui >}} to open the Agentless Scanning Setup modal.
1. In the {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}} section, select {{< ui >}}Terraform{{< /ui >}}.
1. Follow the instructions for installing the [Datadog Agentless Scanner module][2].
1. Select the {{< ui >}}I confirm the Datadog Agentless Scanner was installed using Terraform{{< /ui >}} checkbox.
1. Click {{< ui >}}Done{{< /ui >}}.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md

{{% /collapse-content %}}

After completing any of the setup methods above, [verify your setup](#verify-your-setup).

[2]: https://app.datadoghq.com/security/csm/
[3]: /remote_configuration

{{% /tab %}}

{{% tab "Azure" %}}

### Choose your setup

- **New Azure customer**: Set up the [Datadog Azure integration](https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=azure) first, then enable Agentless Scanning.
- **Existing integrated Azure subscription**: Use [Cloud Shell](#azure-cloud-shell-setup) (recommended), [Azure Resource Manager](#azure-resource-manager-setup), or [Terraform](#azure-terraform-setup).
- **Multiple subscriptions**: Use [Cloud Shell](#azure-cloud-shell-setup) for repeatable, multi-subscription deployments. [Terraform](#azure-terraform-setup) is also available if you prefer to manage your own infrastructure-as-code.

<div class="alert alert-info">If you haven't connected your Azure subscription to Datadog yet, <a href="https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=azure">set up the Azure integration</a> first.</div>

{{% collapse-content title="Cloud Shell" level="h4" id="azure-cloud-shell-setup" %}}
Use Azure Cloud Shell to set up Agentless Scanning for your Azure subscriptions. This method downloads a [setup script](https://github.com/DataDog/integrations-management/tree/main/azure/agentless) that wraps the [Terraform Datadog Agentless Scanner module for Azure](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme), so you do not need to manage Terraform directly. You can review the script before running it.

1. Ensure the identity you use in Cloud Shell has the required Azure permissions:

   - On the **scanner subscription**, the identity must have a role that grants role-assignment write and resource creation, such as **Owner**.
   - On **each scanned subscription**, the identity must have a role that grants the `Microsoft.Authorization/roleAssignments/write` permission, so the scanner's managed identity can be granted the permissions it needs to snapshot and read disks, such as **User Access Administrator** or **Owner**.

   Before you run the generated command, note what the setup script does in Azure:

   - **Terraform state**: By default, it creates an Azure Storage Account in the **scanner** subscription. To reuse an existing storage account in the scanner resource group instead, set `TF_STATE_STORAGE_ACCOUNT` before you run the command; the script does not create a new account when that variable is set.
   - **Resource providers**: When possible, it registers these resource providers in the scanner subscription: `Microsoft.Compute`, `Microsoft.Network`, `Microsoft.ManagedIdentity`, `Microsoft.Storage`, `Microsoft.KeyVault`, `Microsoft.Authorization`.
1. On the [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup) page, click {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}Azure{{< /ui >}}.
1. Click the Azure subscription where you want to deploy the Agentless scanner, which opens the side panel.
1. On the {{< ui >}}Features{{< /ui >}} tab, click {{< ui >}}Configure Agentless Scanning{{< /ui >}} or {{< ui >}}Manage{{< /ui >}} to open the Agentless Scanning Setup modal.
1. In the {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}} section, select {{< ui >}}Cloud Shell{{< /ui >}}.
1. Select an {{< ui >}}API key{{< /ui >}} that has [Remote Configuration](/remote_configuration) enabled. An application key is automatically generated.
1. Select the {{< ui >}}Azure subscriptions{{< /ui >}} you want to scan.
1. Configure the scanner:
   - If you already have scanners deployed, you can choose to {{< ui >}}use an existing scanner{{< /ui >}} (recommended) or {{< ui >}}deploy a new scanner{{< /ui >}}.
   - If you choose {{< ui >}}deploy a new scanner{{< /ui >}}, select the {{< ui >}}scanner subscription{{< /ui >}} (which must be one of the selected subscriptions) and the {{< ui >}}scanner locations{{< /ui >}} (Azure regions, up to four). Datadog recommends deploying scanners in every region where you have more than 150 hosts.
1. Click {{< ui >}}Copy command{{< /ui >}} to copy the generated command, and click {{< ui >}}Open Azure Cloud Shell{{< /ui >}} to open [Azure Cloud Shell](https://shell.azure.com). Review and run the command. The script applies the [Terraform Datadog Agentless Scanner module for Azure](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme) to deploy and configure the scanner in your selected subscription and location(s).
1. After the command completes, return to the Datadog setup page and click {{< ui >}}Done{{< /ui >}}.
{{% /collapse-content %}}
{{% collapse-content title="Azure Resource Manager" level="h4" id="azure-resource-manager-setup" %}}
Use the Azure Resource Manager template to deploy the Agentless Scanner. The template includes the role definitions required to deploy and manage Agentless scanners.

#### New Azure subscription

<div class="alert alert-info">Ensure you have the <a href="/integrations/guide/azure-manual-setup/?tab=azurecli">Datadog Azure integration</a> set up.</div>

{{% csm-agentless-azure-resource-manager %}}

#### Existing Azure subscription

{{% csm-agentless-azure-resource-manager %}}

{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h4" id="azure-terraform-setup" %}}

The [Terraform Datadog Agentless Scanner module](https://github.com/DataDog/terraform-module-datadog-agentless-scanner) provides a reusable configuration for installing the Datadog Agentless scanner. For guidance on choosing your deployment topology, see [Deploying Agentless Scanning](/security/cloud_security_management/setup/agentless#deployment-methods). For usage examples, see the [examples directory](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) in the GitHub repository.

1. On the [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup) page, click {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}Azure{{< /ui >}}.
1. Click the Azure subscription where you want to deploy the Agentless scanner, which opens the side panel.
1. On the {{< ui >}}Features{{< /ui >}} tab, click {{< ui >}}Configure Agentless Scanning{{< /ui >}} or {{< ui >}}Manage{{< /ui >}} to open the Agentless Scanning Setup modal.
1. In the {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}} section, select {{< ui >}}Terraform{{< /ui >}}.
1. Follow the instructions for installing the [Datadog Agentless Scanner module](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/azure#readme).
1. Click {{< ui >}}Done{{< /ui >}}.

{{% /collapse-content %}}

After completing any of the setup methods above, [verify your setup](#verify-your-setup).

{{% /tab %}}

{{% tab "GCP" %}}

### Choose your setup

- **New GCP customer**: [Set up the GCP integration][25] first, then enable Agentless Scanning.
- **Existing integrated GCP project**: Use [Cloud Shell](#gcp-cloud-shell-setup) (recommended) or [Terraform](#gcp-terraform-setup).

<div class="alert alert-info">If you haven't connected your GCP project to Datadog yet, <a href="https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=gcp">set up the GCP integration</a> first.</div>

{{% collapse-content title="Cloud Shell" level="h4" id="gcp-cloud-shell-setup" %}}
Use Google Cloud Shell to set up Agentless Scanning for your GCP projects. This method downloads a [setup script](https://github.com/DataDog/integrations-management/tree/main/gcp/agentless) that wraps the [Terraform Datadog Agentless Scanner module for GCP](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme), so you do not need to manage Terraform directly. You can review the script before running it.

1. Ensure you have the required GCP permissions:

   - On the **scanner project**, the identity you use in Cloud Shell must have **Owner** or equivalent.
   - **Storage**: Include permission to create Terraform state storage in the scanner project, or to use an existing bucket that you reference with `TF_STATE_BUCKET` (for example, `roles/storage.admin`, or the `storage.buckets.create`, `storage.buckets.get`, and `storage.buckets.update` permissions).

   Before you run the generated command, note what the setup script does in GCP:

   - **Terraform state**: By default, it creates a GCS bucket in the **scanner** project. To reuse an existing bucket, set `TF_STATE_BUCKET` before you run the command; the script does not create a bucket when that variable is set.
   - If you see a 403 error on {{< ui >}}Setting up Terraform state storage{{< /ui >}}, see [GCP: Failed to create state bucket][26] in the troubleshooting guide.

1. On the [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup) page, click {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}GCP{{< /ui >}}.
1. Click the GCP project where you want to deploy the Agentless scanner, which opens the side panel.
1. On the {{< ui >}}Features{{< /ui >}} tab, click {{< ui >}}Configure Agentless Scanning{{< /ui >}} or {{< ui >}}Manage{{< /ui >}} to open the Agentless Scanning Setup modal.
1. In the {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}} section, select {{< ui >}}Cloud Shell{{< /ui >}}.
1. Select an {{< ui >}}API key{{< /ui >}} that has [Remote Configuration](/remote_configuration) enabled. An application key is automatically generated.
1. Select the {{< ui >}}GCP projects{{< /ui >}} you want to scan.
1. Configure the scanner:
   - If you already have scanners deployed, you can choose to {{< ui >}}use an existing scanner{{< /ui >}} (recommended) or {{< ui >}}deploy a new scanner{{< /ui >}}.
   - If you choose {{< ui >}}deploy a new scanner{{< /ui >}}, select the {{< ui >}}scanner project{{< /ui >}} (which must be one of the selected projects) and the {{< ui >}}scanner regions{{< /ui >}}. Datadog recommends installing scanners in every region where you have more than 150 hosts.
1. Click {{< ui >}}Copy command{{< /ui >}} to copy the generated command, and click {{< ui >}}Open Google Cloud Shell{{< /ui >}} to open [Google Cloud Shell](https://ssh.cloud.google.com/cloudshell). Review and run the command. The script applies the [Terraform Datadog Agentless Scanner module for GCP](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme) to deploy and configure the scanner in your selected project and region(s).
1. After the command completes, return to the Datadog setup page and click {{< ui >}}Done{{< /ui >}}.

[26]: /security/cloud_security_management/troubleshooting/agentless_scanning#gcp-failed-to-create-state-bucket-storagebucketscreate-403
{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h4" id="gcp-terraform-setup" %}}
The [Terraform Datadog Agentless Scanner module](https://github.com/DataDog/terraform-module-datadog-agentless-scanner) provides a reusable configuration for installing the Datadog Agentless scanner. For guidance on choosing your deployment topology, see [Deploying Agentless Scanning](/security/cloud_security_management/setup/agentless#deployment-methods). For usage examples, see the [examples directory](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples) in the GitHub repository.

1. On the [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup) page, click {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}GCP{{< /ui >}}.
1. Click the GCP project where you want to deploy the Agentless scanner, which opens the side panel.
1. On the {{< ui >}}Features{{< /ui >}} tab, click {{< ui >}}Configure Agentless Scanning{{< /ui >}} or {{< ui >}}Manage{{< /ui >}} to open the Agentless Scanning Setup modal.
1. In the {{< ui >}}How would you like to set up Agentless Scanning?{{< /ui >}} section, select {{< ui >}}Terraform{{< /ui >}}.
1. Follow the instructions for installing the [Datadog Agentless Scanner module](https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/gcp#readme).
1. Click {{< ui >}}Done{{< /ui >}}.
{{% /collapse-content %}}

After completing any of the setup methods above, [verify your setup](#verify-your-setup).

[25]: https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=gcp

{{% /tab %}}
{{< /tabs >}}

## Verify your setup

After completing the setup, Agentless Scanning takes time to produce initial results. The first scan cycle takes approximately 30 minutes to complete.

<div class="alert alert-info">If no results appear after two hours, see the <a href="/security/cloud_security_management/troubleshooting/agentless_scanning">Agentless Scanning troubleshooting guide</a>.</div>

View scan results in the following locations:

- **For host and container vulnerabilities**: [Cloud Security Vulnerabilities Explorer][15]. To view only vulnerabilities detected by Agentless Scanning, use the filter `origin:"Agentless scanner"` in the search bar.
- **For Lambda vulnerabilities**: [Code Security (SCA) Explorer][16].
- **For sensitive data findings**: [Sensitive Data Scanner][17].

## Exclude resources from scans

To exclude specific hosts, containers, or functions from scans, see [Resource Evaluation Filters](/security/cloud_security_management/guide/resource_evaluation_filters).

## Update Agentless Scanning

### Update the CloudFormation stack

Datadog recommends updating the CloudFormation stack regularly so you can get access to new features and bug fixes as they are released.

1. Log in to your AWS console and go to the CloudFormation Stacks page.
1. Expand the parent {{< ui >}}DatadogIntegration{{< /ui >}} stack to reveal its nested sub-stacks. Select the {{< ui >}}DatadogIntegration-DatadogAgentlessScanning-...{{< /ui >}} sub-stack, click {{< ui >}}Update{{< /ui >}}, then click {{< ui >}}Update nested stack{{< /ui >}}.
1. Click {{< ui >}}Replace existing template{{< /ui >}}.
1. In the following S3 URL: `https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/<VERSION>/datadog_agentless_scanning.yaml`, replace `<VERSION>` with the version found in [aws_quickstart/version.txt][71]. Paste that URL into the {{< ui >}}Amazon S3 URL{{< /ui >}} field.
1. Click {{< ui >}}Next{{< /ui >}} to advance through the next several pages without modifying them, then submit the form.

### Update the Terraform module

Update the `source` reference for the Agentless Scanner modules to the latest release. You can find the latest version on [GitHub Releases][72].

For usage examples, see the [GitHub repository][73].

## Disable Agentless Scanning

{{< tabs >}}
{{% tab "AWS" %}}
1. On the [Cloud Security Setup][10] page, click {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}AWS{{< /ui >}}.
1. If required, use filters to find the account you want to stop Agentless Scanning for. Click the account to open the side panel that contains its settings.
1. On the {{< ui >}}Features{{< /ui >}} tab, under {{< ui >}}Requires setup of the Agentless Scanners:{{< /ui >}} switch the toggles to the off position.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "Azure" %}}
1. On the [Cloud Security Setup][10] page, click {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}Azure{{< /ui >}}.
1. Expand the tenant containing the subscription where you want to disable Agentless Scanning. Click the subscription to open the side panel that contains its settings.
1. On the {{< ui >}}Features{{< /ui >}} tab, under {{< ui >}}Requires setup of the Agentless Scanners:{{< /ui >}} switch the toggles to the off position.

[10]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}

{{% tab "GCP" %}}
1. On the [Cloud Security Setup][10] page, click {{< ui >}}Cloud Integrations{{< /ui >}} > {{< ui >}}GCP{{< /ui >}}.
1. Expand the account containing the project where you want to disable Agentless Scanning. Click the project to open the side panel that contains its settings.
1. On the {{< ui >}}Features{{< /ui >}} tab, under {{< ui >}}Requires setup of the Agentless Scanners:{{< /ui >}} switch the toggles to the off position.

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
SCANNER_REGIONS="<SCANNER_REGIONS>" \
PROJECTS_TO_SCAN="<PROJECTS>" \
python3 gcp_agentless_setup.pyz destroy
```

You can review the [setup script source][21] before running the command.

[21]: https://github.com/DataDog/integrations-management/tree/main/gcp/agentless
{{% /tab %}}

{{% tab "Azure Cloud Shell" %}}
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

[22]: https://github.com/DataDog/integrations-management/tree/main/azure/agentless
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

[1]: /account_management/api-app-keys/
[2]: /security/cloud_security_management/setup/agentless#deployment-methods
[3]: /remote_configuration
[12]: /security/cloud_security_management/setup/agentless/vulnerabilities
[20]: /security/cloud_security_management/setup/agentless/vulnerabilities#cloud-service-provider-cost
[15]: https://app.datadoghq.com/security/csm/vm
[16]: https://app.datadoghq.com/security/code-security/sca
[17]: https://app.datadoghq.com/sensitive-data-scanner/storage
[31]: https://secdb.alpinelinux.org/
[32]: https://packages.wolfi.dev/os/security.json
[33]: https://packages.cgr.dev/chainguard/security.json
[34]: https://www.redhat.com/security/data/metrics/
[35]: https://www.redhat.com/security/data/oval/v2/
[36]: https://errata.almalinux.org/
[37]: https://download.rockylinux.org/pub/rocky/
[38]: https://linux.oracle.com/security/oval/
[39]: https://github.com/microsoft/CBL-MarinerVulnerabilityData/
[40]: https://alas.aws.amazon.com/
[41]: http://ftp.suse.com/pub/projects/security/cvrf/
[42]: https://packages.vmware.com/photon/photon_cve_metadata/
[43]: https://security-tracker.debian.org/tracker/
[44]: https://www.debian.org/security/oval/
[45]: https://ubuntu.com/security/cve
[46]: /help
[47]: /security/cloud_security_management/setup/agentless#update-agentless-scanning
[48]: /containers/cluster_agent/setup/
[61]: /security/cloud_security_management/setup/agentless/vulnerabilities#cloud-storage-scanning
[62]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples/custom_vpc
[63]: /security/cloud_security_management/setup/agentless
[64]: /security/cloud_security_management/setup/agentless#setup
[71]: https://github.com/DataDog/cloudformation-template/blob/master/aws_quickstart/version.txt
[72]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/releases
[73]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples
