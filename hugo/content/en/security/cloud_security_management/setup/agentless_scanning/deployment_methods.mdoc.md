---
title: Deploying Agentless Scanning
aliases:
  - /security/cloud_security_management/agentless_scanning/deployment_methods
further_reading:
  - link: "/security/cloud_security_management/agentless_scanning"
    tag: "Documentation"
    text: "Cloud Security Agentless Scanning"
  - link: "/security/cloud_security_management/setup/agentless_scanning/enable"
    tag: "Documentation"
    text: "Enabling Agentless Scanning"
  - link: "/security/cloud_security_management/setup/agentless_scanning/update"
    tag: "Documentation"
    text: "Updating Agentless Scanning"
content_filters:
  - trait_id: agentless_scanner_hosting
    option_group_id: agentless_scanner_hosting_options
    label: "Scanner hosting"
---

This guide helps you choose the right deployment topology for Agentless Scanning based on your cloud environment. For setup instructions, see [Enabling Agentless Scanning][3]. To compare self-hosted and Datadog-hosted scanning, see [Choose where scanners run][5].

## Overview

<!-- Self-hosted -->
{% if equals($agentless_scanner_hosting, "self_hosted") %}
Datadog recommends the following guidelines:
- Use a dedicated scanner account for multi-account environments.
- Deploy a scanner in each region that contains more than 150 hosts.
- If you use [Cloud Storage Scanning][1], deploy a scanner in each region that contains a data store (for example, S3 buckets).

{% alert %}
Scanners only send the collected list of packages and host metadata (hostnames, EC2/VM/Compute Engine instance identifiers) to Datadog. All scanned data remains in your infrastructure.
{% /alert %}
{% /if %}

<!-- Datadog-hosted -->
{% if equals($agentless_scanner_hosting, "datadog_hosted") %}
{% alert %}
Datadog-hosted scanning is in Preview and supports AWS accounts only. To scan Azure subscriptions or GCP projects, select **Self-hosted** in the {% ui %}Scanner hosting{% /ui %} filter at the top of this page.
{% /alert %}

Datadog runs and scales the scanners in its own infrastructure. You don't choose a scanner account, decide how many scanners to deploy, or plan which regions to deploy them in. Instead, you enable Datadog-hosted scanning in each AWS account you want to scan by attaching the Agentless Scanning IAM policy to the Datadog integration role in that account.

Datadog reads your disk contents in its scanning environment, in the region of your Datadog site, and doesn't retain them. For details, see [Datadog-hosted data residency][6].
{% /if %}

<!-- Self-hosted -->
{% if equals($agentless_scanner_hosting, "self_hosted") %}
## Cloud account and region configuration

The deployment topology you use depends on how many cloud accounts (AWS accounts, Azure subscriptions, or GCP projects) you need to scan, and which regions they cover.

- **Cloud accounts**: If you only need to scan a single account, deploy one or more scanners directly in that account. Otherwise, use a dedicated scanner account, and use delegate roles to grant it access to scan other accounts. This is called **cross-account scanning**.
- **Regions**: A single scanner can scan hosts in any region, including regions other than its own. However, cross-region scanning incurs data transfer costs. Whether you deploy additional scanners depends on how many hosts you have in each region.

These tabs contain information on how to configure your deployment topology. Select the tab that describes how many accounts you need to scan, then learn more based on how many regions you need to cover.

{% tabs %}

{% tab label="Single account" %}

If you only need to scan a single account, deploy one or more scanners directly in that account.

{% img src="/sensitive_data_scanner/setup/cloud_storage/single-account.png" alt="Diagram of Agentless Scanning showing the Agentless scanner applied in one account that covers multiple regions" style="width:40%;" /%}

### Decide how many scanners to deploy {% #decide-how-many-scanners-to-deploy-single-account %}

A single scanner can scan hosts in any region, including regions other than its own. Cross-region scanning incurs data transfer costs, so the decision of where to deploy additional scanners depends on how many hosts you have in each region.

- **Fewer than ~150 hosts total across all regions**: A single scanner in one region is the most cost-effective setup. The cross-region data transfer costs for scanning remote hosts are lower than the fixed cost of running an additional scanner.
- **More than ~150 hosts in a specific region**: Deploy a dedicated scanner in that region. At this threshold, the egress savings from scanning locally outweigh the cost of running the scanner.
- **Multiple regions above the threshold**: Deploy a scanner in each region that exceeds ~150 hosts. Regions below the threshold can be scanned cross-region from the nearest scanner.

Datadog automatically routes scans to the appropriate regional scanner to minimize cross-region costs.

#### Scanner capacity limits {% #scanner-capacity-limits-single-account %}

Each scanner has throughput limits governed by cloud provider API quotas:

| Limit | Value |
|-------|-------|
| Maximum scanners per account per region | 4 (hard cap; cloud providers like AWS limit concurrent snapshots to 100 per account per region) |
| Scan interval | Every 12 hours |

{% alert level="danger" %}
Do not increase the Autoscaling Group (ASG) desired count beyond four scanners per region. Additional scanners cannot create snapshots due to cloud providers' concurrent snapshot limit.
{% /alert %}

{% /tab %}

{% tab label="Multiple accounts" %}

### Decide which accounts to deploy scanners in

Datadog recommends using a **dedicated scanner account** to deploy scanners in, and using **cross-account delegate roles** to grant scanners access to target accounts (including the scanner account).

For AWS Organizations, use a [CloudFormation StackSet][4] to deploy a delegate role across all member accounts, automating onboarding for cross-account scanning.

The following diagram illustrates cross-account scanning from a central account (Account 4):

{% img src="/sensitive_data_scanner/setup/cloud_storage/central-scanner.png" alt="Diagram of Agentless Scanning showing the Agentless scanner deployed in a central cloud account" style="width:90%;" /%}

**If you do not want to grant cross-account permissions**, deploy a scanner in each account instead. This incurs higher costs because each scanner performs cross-region scans within its account.

{% img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-account.png" alt="Diagram of Agentless Scanning showing the Agentless scanner deployed in each cloud account" style="width:90%;" /%}

### Decide how many scanners to deploy {% #decide-how-many-scanners-to-deploy-multiple-accounts %}

A single scanner can scan hosts in any region, including regions other than its own. Cross-region scanning incurs data transfer costs, so the decision of where to deploy additional scanners depends on how many hosts you have in each region.

- **Fewer than ~150 hosts total across all regions**: A single scanner in one region is the most cost-effective setup. The cross-region data transfer costs for scanning remote hosts are lower than the fixed cost of running an additional scanner.
- **More than ~150 hosts in a specific region**: Deploy a dedicated scanner in that region. At this threshold, the egress savings from scanning locally outweigh the cost of running the scanner.
- **Multiple regions above the threshold**: Deploy a scanner in each region that exceeds ~150 hosts. Regions below the threshold can be scanned cross-region from the nearest scanner.

Datadog automatically routes scans to the appropriate regional scanner to minimize cross-region costs.

#### Scanner capacity limits {% #scanner-capacity-limits-multiple-accounts %}

Each scanner has throughput limits governed by cloud provider API quotas:

| Limit | Value |
|-------|-------|
| Maximum scanners per account per region | 4 (hard cap; cloud providers like AWS limit concurrent snapshots to 100 per account per region) |
| Scan interval | Every 12 hours |

{% alert level="danger" %}
Do not increase the Autoscaling Group (ASG) desired count beyond four scanners per region. Additional scanners cannot create snapshots due to cloud providers' concurrent snapshot limit.
{% /alert %}

{% /tab %}

{% /tabs %}

## Enterprise networking considerations

By default, the scanner creates a new VPC during deployment. If your organization is using Terraform and has Service Control Policies (SCPs) that restrict VPC creation, use the [{% ui %}custom VPC{% /ui %}][2] option during setup to use an existing VPC instead of creating a new one.
{% /if %}
<!-- end Self-hosted -->

<!-- Datadog-hosted -->
{% if equals($agentless_scanner_hosting, "datadog_hosted") %}
## Choose which AWS accounts to scan

You enable Datadog-hosted scanning for each AWS account individually, not for your whole Datadog organization. You can use Datadog-hosted scanning for some AWS accounts and self-hosted scanners for others, for as long as you need.

To scan an AWS account, [enable Datadog-hosted scanning][7] in that account. Repeat the setup for each account you want to scan.

<!-- TODO(DOCS-16346): Confirm with SME whether AWS Organizations / multi-account onboarding (for example, a StackSet) is available for Datadog-hosted scanning. -->

## Move an account from self-hosted to Datadog-hosted scanning

Because you set the hosting mode for each account, you can move accounts one at a time:

1. [Enable Datadog-hosted scanning][7] in the AWS account.
1. In the [Cloud Security Vulnerabilities Explorer][8], confirm that scan results from Datadog-hosted scanning appear for the account.
1. Decommission the self-hosted scanner. For instructions, see [Uninstall Agentless Scanning][9].

<!-- TODO(DOCS-16346): Confirm with SME how to migrate accounts that a central self-hosted scanner scans through delegate roles, and whether results from both modes can overlap during migration. -->
{% /if %}
<!-- end Datadog-hosted -->

[1]: /security/cloud_security_management/agentless_scanning#cloud-storage-scanning
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples/custom_vpc
[3]: /security/cloud_security_management/setup/agentless_scanning/enable
[4]: /security/cloud_security_management/setup/agentless_scanning/enable#setup?agentless_scanner_hosting=self_hosted&host=aws
[5]: /security/cloud_security_management/setup/agentless_scanning#choose-where-scanners-run
[6]: /security/cloud_security_management/setup/agentless_scanning#datadog-hosted-data-residency
[7]: /security/cloud_security_management/setup/agentless_scanning/enable#setup?agentless_scanner_hosting=datadog_hosted
[8]: https://app.datadoghq.com/security/csm/vm
[9]: /security/cloud_security_management/setup/agentless_scanning/enable#uninstall-agentless-scanning?agentless_scanner_hosting=self_hosted
