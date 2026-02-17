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
---

This guide helps you choose the right deployment topology for Agentless Scanning based on your cloud environment. For setup instructions, see [Enabling Agentless Scanning][3].

## Choose your deployment topology

### Step 1: Single account or multiple accounts?

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

How you distribute scanners across regions depends on where your hosts are:

- **Single region (or one dominant region)**: Deploy a scanner in that region. If you have fewer than ~150 hosts, a single scanner handles everything.
- **Multiple regions with significant host counts**: Deploy a scanner in **each region where you have more than 150 hosts**. Each scanner scans hosts in its own region, avoiding cross-region data transfer costs.
  - **Rule of thumb**: If a region has more than 150 hosts, the egress savings from a local scanner outweigh the ~$80/mo fixed cost of running one. See [cloud service provider cost][2] for a full breakdown.
  - Regions with fewer than 150 hosts can be scanned cross-region from a nearby scanner.

Datadog automatically schedules scans to the appropriate regional scanner to minimize cross-region costs.

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

## Recommended configuration

To manage costs while ensuring reliable scans every 12 hours, Datadog recommends setting up Agentless Scanning with [Terraform][4] as the default deployment method. Terraform deploys one scanner per region, which avoids cross-region networking costs.

Summary of recommendations:

- Use a dedicated scanner account for multi-account environments
- Deploy a scanner in each region with more than 150 hosts
- If using [Cloud Storage Scanning][1], deploy a scanner in each region that contains a data store (for example, S3 buckets or RDS instances)
- Use Terraform for repeatable, multi-region deployments

**Note**: Only the collected list of packages and host metadata (hostnames, EC2/VM/Compute Engine instance identifiers) are sent to Datadog. All scanned data remains in your infrastructure.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/agentless_scanning#cloud-storage-scanning
[2]: /security/cloud_security_management/agentless_scanning#cloud-service-provider-cost
[3]: /security/cloud_security_management/setup/agentless_scanning/enable
[4]: /security/cloud_security_management/setup/agentless_scanning/enable#terraform-setup
