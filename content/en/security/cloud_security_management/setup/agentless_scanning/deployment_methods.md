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
---

This guide helps you choose the right deployment topology for Agentless Scanning based on your cloud environment. For setup instructions, see [Enabling Agentless Scanning][3].

## Overview

Datadog recommends the following guidelines:
- Use a dedicated scanner account for multi-account environments.
- Deploy a scanner in each region that contains more than 150 hosts.
- If you use [Cloud Storage Scanning][1], deploy a scanner in each region that contains a data store (for example, S3 buckets or RDS instances).

<div class="alert alert-info">Scanners only send the collected list of packages and host metadata (hostnames, EC2/VM/Compute Engine instance identifiers) to Datadog. All scanned data remains in your infrastructure.</div>

## Cloud account and region configuration

The deployment topology you use depends on how many cloud accounts (AWS accounts, Azure subscriptions, or GCP projects) you need to scan, and which regions they cover.

- **Cloud accounts**: If you only need to scan a single account, deploy one or more scanners directly in that account. Otherwise, use a dedicated scanner account, and use delegate roles to grant it access to scan other accounts. This is called **cross-account scanning**.
- **Regions**: A single scanner can scan hosts in any region, including regions other than its own. However, cross-region scanning incurs data transfer costs. Whether you deploy additional scanners depends on how many hosts you have in each region.

These tabs contain information on how to configure your deployment topology. Select the tab that describes how many accounts you need to scan, then learn more based on how many regions you need to cover.

{{< tabs >}}
{{% tab "Single account" %}}

If you only need to scan a single account, deploy one or more scanners directly in that account.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/single-account.png" alt="Diagram of Agentless Scanning showing the Agentless scanner applied in one account that covers multiple regions" width="40%" >}}

### Decide how many scanners to deploy

A single scanner can scan hosts in any region, including regions other than its own. Cross-region scanning incurs data transfer costs, so the decision of where to deploy additional scanners depends on how many hosts you have in each region.

- **Fewer than ~150 hosts total across all regions**: A single scanner in one region is the most cost-effective setup. The cross-region data transfer costs for scanning remote hosts are lower than the fixed cost of running an additional scanner.
- **More than ~150 hosts in a specific region**: Deploy a dedicated scanner in that region. At this threshold, the egress savings from scanning locally outweigh the cost of running the scanner.
- **Multiple regions above the threshold**: Deploy a scanner in each region that exceeds ~150 hosts. Regions below the threshold can be scanned cross-region from the nearest scanner.

Datadog automatically routes scans to the appropriate regional scanner to minimize cross-region costs.

#### Scanner capacity limits

Each scanner has throughput limits governed by cloud provider API quotas:

| Limit | Value |
|-------|-------|
| Maximum scanners per account per region | 4 (hard cap; cloud providers like AWS limit concurrent snapshots to 100 per account per region) |
| Scan interval | Every 12 hours |

<div class="alert alert-danger">Do not increase the Autoscaling Group (ASG) desired count beyond four scanners per region. Additional scanners cannot create snapshots due to cloud providers' concurrent snapshot limit.</div>

{{% /tab %}}
{{% tab "Multiple accounts" %}}

### Decide which accounts to deploy scanners in

Datadog recommends using a **dedicated scanner account** to deploy scanners in, and using **cross-account delegate roles** to grant scanners access to target accounts (including the scanner account).

For AWS Organizations, use a [CloudFormation StackSet][1] to deploy a delegate role across all member accounts, automating onboarding for cross-account scanning.

The following diagram illustrates cross-account scanning from a central account (Account 4):

{{< img src="/sensitive_data_scanner/setup/cloud_storage/central-scanner.png" alt="Diagram of Agentless Scanning showing the Agentless scanner deployed in a central cloud account" width="90%" >}}

**If you do not want to grant cross-account permissions**, deploy a scanner in each account instead. This incurs higher costs because each scanner performs cross-region scans within its account.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-account.png" alt="Diagram of Agentless Scanning showing the Agentless scanner deployed in each cloud account" width="90%" >}}

### Decide how many scanners to deploy

A single scanner can scan hosts in any region, including regions other than its own. Cross-region scanning incurs data transfer costs, so the decision of where to deploy additional scanners depends on how many hosts you have in each region.

- **Fewer than ~150 hosts total across all regions**: A single scanner in one region is the most cost-effective setup. The cross-region data transfer costs for scanning remote hosts are lower than the fixed cost of running an additional scanner.
- **More than ~150 hosts in a specific region**: Deploy a dedicated scanner in that region. At this threshold, the egress savings from scanning locally outweigh the cost of running the scanner.
- **Multiple regions above the threshold**: Deploy a scanner in each region that exceeds ~150 hosts. Regions below the threshold can be scanned cross-region from the nearest scanner.

Datadog automatically routes scans to the appropriate regional scanner to minimize cross-region costs.

#### Scanner capacity limits

Each scanner has throughput limits governed by cloud provider API quotas:

| Limit | Value |
|-------|-------|
| Maximum scanners per account per region | 4 (hard cap; cloud providers like AWS limit concurrent snapshots to 100 per account per region) |
| Scan interval | Every 12 hours |

<div class="alert alert-danger">Do not increase the Autoscaling Group (ASG) desired count beyond four scanners per region. Additional scanners cannot create snapshots due to cloud providers' concurrent snapshot limit.</div>

[1]: /security/cloud_security_management/setup/agentless_scanning/enable#aws-cloudformation-stackset-setup

{{% /tab %}}
{{< /tabs >}}

## Enterprise networking considerations

By default, the scanner creates a new VPC during deployment. If your organization has Service Control Policies (SCPs) that restrict VPC creation, use the **existing VPC** option during setup.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/agentless_scanning#cloud-storage-scanning
[3]: /security/cloud_security_management/setup/agentless_scanning/enable
[4]: /security/cloud_security_management/setup/agentless_scanning/enable#setup
