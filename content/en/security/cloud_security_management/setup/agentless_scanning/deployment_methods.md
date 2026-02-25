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

## Choose your deployment topology

### Step 1: How many cloud accounts are you scanning?

AWS accounts, Azure subscriptions, or GCP projects.

{{< tabs >}}
{{% tab "Single account" %}}

Deploy scanner(s) directly in that account. Proceed to [Step 2](#step-2-regional-distribution).

{{% /tab %}}
{{% tab "Multiple accounts" %}}

Use a **dedicated scanner account** (recommended). Deploy scanners in a central account and use **cross-account delegate roles** to grant the scanner access to target accounts. The scanner account can also be scanned.

For AWS Organizations, use a [CloudFormation StackSet][5] to deploy the delegate role across all member accounts, automating onboarding for cross-account scanning.

The following diagram illustrates cross-account scanning from a central account:

{{< img src="/sensitive_data_scanner/setup/cloud_storage/central-scanner.png" alt="Diagram of Agentless Scanning showing the Agentless scanner is deployed in a central cloud account" width="90%" >}}

**If you do not want to grant cross-account permissions**, deploy a scanner in each account instead. This incurs higher costs because each scanner performs cross-region scans within its account.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-account.png" alt="Diagram of Agentless Scanning showing the Agentless scanner is deployed in each cloud account" width="90%" >}}

[5]: /security/cloud_security_management/setup/agentless_scanning/enable#aws-cloudformation-stackset-setup

{{% /tab %}}
{{< /tabs >}}

### Step 2: Regional distribution

A single scanner can scan hosts in any region, including regions other than its own. Cross-region scanning incurs data transfer costs, so the decision of where to deploy additional scanners depends on how many hosts you have in each region.

- **Fewer than ~150 hosts total across all regions**: A single scanner in one region is the most cost-effective setup. The cross-region data transfer costs for scanning remote hosts are lower than the ~$80/mo fixed cost of running an additional scanner.
- **More than ~150 hosts in a specific region**: Deploy a dedicated scanner in that region. At this threshold, the egress savings from scanning locally outweigh the cost of running the scanner. See [cloud service provider cost][2] for a full breakdown.
- **Multiple regions above the threshold**: Deploy a scanner in each region that exceeds ~150 hosts. Regions below the threshold can be scanned cross-region from the nearest scanner.

Datadog automatically routes scans to the appropriate regional scanner to minimize cross-region costs.

### Step 3: Scanner capacity limits

Each scanner has throughput limits governed by cloud provider API quotas:

| Limit | Value |
|-------|-------|
| Maximum scanners per account per region | 4 (hard cap — cloud providers like AWS limit concurrent snapshots to 100 per account per region) |
| Scan interval | Every 12 hours |

<div class="alert alert-danger">Do not increase the Auto Scaling Group (ASG) desired count beyond 4 scanners per region. Additional scanners cannot create snapshots due to the cloud provider's concurrent snapshot limit and automatically revert.</div>


### Step 4: Enterprise networking considerations

By default, the scanner creates a new VPC during deployment. If your organization has **Service Control Policies (SCPs) that restrict VPC creation**, use the **existing VPC** option during setup.

<div class="alert alert-info">If your deployment fails due to SCP violations, the existing VPC option is likely the solution. See the <a href="/security/cloud_security_management/setup/agentless_scanning/enable">setup instructions</a> for your cloud provider and deployment method.</div>

## Summary

- Use a dedicated scanner account for multi-account environments
- Deploy a scanner in each region with more than 150 hosts
- If using [Cloud Storage Scanning][1], deploy a scanner in each region that contains a data store (for example, S3 buckets or RDS instances)

**Note**: Only the collected list of packages and host metadata (hostnames, EC2/VM/Compute Engine instance identifiers) are sent to Datadog. All scanned data remains in your infrastructure.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/agentless_scanning#cloud-storage-scanning
[2]: /security/cloud_security_management/agentless_scanning#cloud-service-provider-cost
[3]: /security/cloud_security_management/setup/agentless_scanning/enable
[4]: /security/cloud_security_management/setup/agentless_scanning/enable#setup
