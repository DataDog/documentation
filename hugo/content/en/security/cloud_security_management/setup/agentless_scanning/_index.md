---
title: Cloud Security Agentless Scanning
aliases:
  - /security/agentless_scanning
  - /security/cloud_security_management/agentless_scanning
further_reading:
  - link: "/security/vulnerabilities"
    tag: "Documentation"
    text: "Read more about Cloud Security Vulnerabilities"
  - link: "/security/sensitive_data_scanner/setup/cloud_storage"
    tag: "Documentation"
    text: "Set up Sensitive Data Scanner for Cloud Storage"
  - link: "/security/cloud_security_management/setup/agentless_scanning/update"
    tag: "Documentation"
    text: "Updating Agentless Scanning"
  - link: "/security/cloud_security_management/troubleshooting/agentless_scanning"
    tag: "Documentation"
    text: "Troubleshooting Agentless Scanning"
---

## Overview

Agentless Scanning provides visibility into vulnerabilities that exist within your AWS, Azure, and GCP cloud infrastructure, without requiring you to install the Datadog Agent. Datadog recommends enabling Agentless Scanning as a first step to gain complete visibility into your cloud resources, and then installing the Datadog Agent on your core assets over time for deeper security and observability context.

You can run Agentless scanners in one of two ways:

- **Self-hosted**: Scanners run in your own cloud account.
- **Datadog-hosted (SaaS)**: Datadog runs the scanners, and you grant Datadog permissions to scan your account. Supports AWS only.

Both modes use the same scanning engine and produce the same findings.

<div class="alert alert-info">Agentless Scanning skips hosts where the Datadog Agent runs with both Cloud Security Vulnerabilities and Misconfigurations enabled. For other hosts with the Agent, Agentless Scanning only covers the features the Agent does not. See <a href="/security/cloud_security_management/troubleshooting/agentless_scanning#hosts-with-the-datadog-agent-are-not-scanned">Troubleshooting</a>.</div>

## Choose where scanners run

{{< callout url="https://www.datadoghq.com/product-preview/agentless-saas-mode/" header="Datadog-hosted (SaaS) Agentless Scanning is in Preview" respect-site-support="false" >}}
Datadog-hosted scanning supports AWS accounts only.
{{< /callout >}}

| | Self-hosted | Datadog-hosted (SaaS) |
|---|---|---|
| Where the scanner runs | In your cloud account | In Datadog's infrastructure |
| What you deploy | Scanner instances and their networking; for AWS, this includes EC2 instances in an autoscaling group, a VPC, and a NAT gateway | A managed IAM policy and the AWS managed `SecurityAudit` policy, attached to your existing Datadog integration role. The CloudFormation stack also creates a Lambda function that calls the Datadog API during stack deployment. |
| Where disk contents are read | In your cloud account | In a Datadog scanning environment, in the region of your Datadog site (see [Datadog-hosted data residency](#datadog-hosted-data-residency)) |
| Supported cloud providers | AWS, Azure, Google Cloud | AWS |
| Scanner updates | You update the scanner | Datadog updates the scanner automatically |
| Cloud provider infrastructure cost | Compute and networking costs appear on your cloud provider bill | None |
| Scanning engine and findings | Same in both modes | Same in both modes |
| Scan frequency | Every 12 hours | Every 12 hours |
| AWS resource coverage | Same in both modes | Same in both modes |
| Sensitive Data Scanner for Amazon S3 | Supported | Supported |
| On-demand scanning | Supported for AWS | Not supported |
| Datadog billing | Same in both modes | Same in both modes |

### When to use self-hosted Agentless Scanning

Use self-hosted scanning if any of the following apply:

- You need to scan Azure or Google Cloud resources.
- Your policies require that disk contents stay in your own cloud account.
- Your policies restrict which region or cloud provider can process your data. Datadog-hosted scanning processes data in the region of your Datadog site, which can differ from the region and cloud provider of your resources.
- You want direct control over scanner versions or scan scheduling.

### When to use Datadog-hosted (SaaS) Agentless Scanning

Use Datadog-hosted scanning if any of the following apply:

- You want to start scanning without deploying compute or networking resources in your account.
- You don't want to maintain, update, or monitor scanner instances.
- You want to avoid the infrastructure cost of running scanners in each region.
- You want new resource types supported automatically, without updating a scanner.

### Use both modes

You can choose a mode for each AWS account instead of one mode for your whole organization. For example, you can use Datadog-hosted scanning in most accounts and self-hosted scanners where disk contents must stay in your cloud account.

To switch an account that already uses a self-hosted scanner, see [Move an account from self-hosted to Datadog-hosted (SaaS) Agentless Scanning][17].

## Self-hosted Agentless Scanning {#self-hosted-scanning}

Scanners run in your own cloud account. For setup instructions, see [Enabling Agentless Scanning][18].

### How self-hosted scanning works {#how-it-works}

The following diagram illustrates how self-hosted Agentless Scanning works:

{{< img src="/security/agentless_scanning/how_agentless_works.png" alt="Diagram showing how self-hosted Agentless Scanning works" width="90%" >}}

<!-- TODO(DOCS-16346): Replace with side-by-side diagram of both modes when available. -->

1. Datadog schedules automated scans in 12-hour intervals and sends the resources to scan through [Remote Configuration][2].
   - If you have [Cloud Security Evaluation Filters][15] configured, Agentless Scanning respects these filters and only scans resources that match the configured criteria.
2. For serverless functions (such as AWS Lambda), the scanners fetch the function's code.
3. The scanner creates snapshots of volumes used in running VM instances. Using the snapshots or the function code, the scanner generates an SBOM (a list of packages and dependencies).
4. The SBOM and host metadata are transmitted to Datadog. All other data—including snapshots, disk contents, and container images—remains in your infrastructure. Snapshots are deleted.
5. Datadog uses the SBOM to identify known vulnerabilities in your resources.

This architecture provides:
- **Data privacy**: Your disk contents, container images, and sensitive data stay within your cloud account. Only package metadata (the SBOM) and host metadata are transmitted to Datadog.
- **Data residency**: Snapshots and disk contents never leave your cloud account, simplifying compliance with data sovereignty requirements.
- **Compliance**: Auditors can verify that scanning data remains within your perimeter.

For more information on data privacy, see [What self-hosted scanning sends to Datadog](#what-data-is-sent-to-datadog).

<div class="alert alert-info">
  <ul>
    <li>The scanner operates as a separate VM within your infrastructure, which minimizes impact on existing systems and resources.</li>
    <li>For AWS, scanner instances automatically scale based on workload. When there are no resources to scan, scanners scale to zero to minimize cloud provider costs.</li>
    <li>The scanner securely collects a list of packages from your hosts without transmitting any confidential or private personal information outside your infrastructure.</li>
    <li>The scanner limits its use of the cloud provider API to prevent reaching any rate limit, and uses exponential backoff if needed.</li>
    <li>Scanner instances are automatically rotated every 24 hours, ensuring they run the latest images.</li>
  </ul>
</div>

### What self-hosted scanning sends to Datadog {#what-data-is-sent-to-datadog}

Rather than copying disk snapshots outside of your environment for analysis, to keep your data private, Datadog deploys lightweight scanning infrastructure **inside your cloud account**. Agentless Scanning creates snapshots of your resources and analyzes them locally, deleting the snapshots after the analyses are complete. It sends to Datadog only host metadata and the resulting software bill of materials (SBOM), which lists packages and dependencies. Your raw data, disk contents, and container images never leave your environment.

The Agentless scanner uses the OWASP [cycloneDX][3] format to transmit a list of packages to Datadog. No confidential or private personal information is ever transmitted outside of your infrastructure.

The scanner does **not** send:
- System and package configurations
- Encryption keys and certificates
- Logs and Audit Trails
- Sensitive business data

### Self-hosted cloud provider cost {#cloud-service-provider-cost}

Self-hosted scanners run inside your cloud account, so the compute and networking costs appear on your cloud provider bill.

To reduce costs:
- Deploy a scanner in each region where you have more than 150 hosts. A regional scanner avoids cross-region data transfer, which is more cost-effective than scanning those hosts from a remote region.
- Use the [recommended configuration][13] with Terraform to deploy one scanner per region.
- For large multi-region deployments, see [Deploying Agentless Scanning][16] for guidance on choosing a deployment topology.

### Restrict scanner access {#restrict-scanner-access}

Scanner instances require [permissions][4] to create and copy snapshots and describe volumes. Datadog recommends following the following guidelines to keep your scanners secure:

- Restrict access to scanner instances to administrative users.
- Set scanner permissions to follow the principle of least privilege, limited to the minimum required for scanning.
- Encrypt all data transmission between the scanner and Datadog with HTTPS.
- Enable unattended security updates, and rotate instances automatically every 24 hours.
- Don't allow inbound access to scanner instances (security group restricted).

### Self-hosted Cloud Storage scanning {#cloud-storage-scanning}

You can enable [Sensitive Data Scanner][8] for your Agentless Scanning resources during deployment or after setup. Sensitive Data Scanner catalogs and classifies sensitive data in your cloud storage (such as Amazon S3 buckets). It only reads data stores and their files in your environment, without sending any sensitive data to Datadog.

### Self-hosted on-demand scanning {#on-demand-scanning}

By default, Agentless Scanning automatically scans your resources every 12 hours. For AWS, you can also trigger an immediate scan of a specific resource (host, container, Lambda function, or S3 bucket) using the On-Demand Scanning API. For more information, see the [On-Demand Scanning API][14] documentation.

## Datadog-hosted (SaaS) Agentless Scanning {#datadog-hosted-scanning}

Datadog runs the scanners in its own infrastructure. This mode is in Preview and supports AWS only. For setup instructions, see [Enabling Agentless Scanning][19].

### How Datadog-hosted scanning works {#datadog-hosted-how-it-works}

1. Datadog discovers your resources through cloud provider APIs. This step reads metadata only.
2. In your AWS account, Datadog creates a snapshot of each volume to scan. The snapshot stays in your account. Datadog never shares the snapshot with or copies it into a Datadog AWS account.
3. Datadog reads the snapshot's blocks over HTTPS using the Amazon EBS direct APIs.
4. Datadog presents the blocks to a scanning sandbox as a block device, and the sandbox mounts the partitions as read-only.
5. Scanners analyze the mounted file systems and send findings and SBOMs to Datadog.
6. Datadog deletes the snapshot and destroys the sandbox.

Each scan runs in a new hardware-isolated microVM with its own kernel, which Datadog destroys when the scan ends. Datadog never runs code on your instances.

### What Datadog-hosted scanning sends to Datadog {#datadog-hosted-what-data-is-sent-to-datadog}

Datadog reads your disk contents in its scanning environment on demand, and does **not** retain any copy of them. Only findings and SBOMs persist in Datadog.

### Datadog-hosted data residency {#datadog-hosted-data-residency}

Scans run in the region of the Datadog site that your organization uses, not in the region where your resources are located. For example, if your organization uses the EU1 site, Datadog scans your resources in the EU, regardless of which AWS region your resources are in.

If your resources are in a different region than your Datadog site, scanning can involve a cross-border data transfer. Review your privacy requirements before you enable scanning for these accounts. If your data must be processed in your own cloud account or region, use self-hosted scanning.

### Datadog-hosted cloud provider cost {#datadog-hosted-cost}

There is no scanner infrastructure cost on your cloud provider bill and no additional Datadog cost.

### Datadog-hosted Cloud Storage scanning {#datadog-hosted-cloud-storage-scanning}

You can enable [Sensitive Data Scanner][8] for Amazon S3 buckets during setup. Sensitive Data Scanner catalogs and classifies sensitive data in your cloud storage.

With Datadog-hosted scanning, Datadog reads the contents of your S3 buckets in its scanning environment, in the same way as disk contents. Datadog does **not** retain your object contents or the matched data. For each match, Datadog stores only the location: the bucket, object path, matching rule, and position in the object. Because buckets often hold more sensitive data than disks, review your data handling requirements before you enable Sensitive Data Scanner.

Sensitive Data Scanner is optional. You can turn it off and still use Datadog-hosted scanning for vulnerabilities. To turn it off after setup:

- **CloudFormation**: Turn off Sensitive Data Scanner in Datadog. For instructions, see [Set up Sensitive Data Scanner][20].
- **Terraform**: In the `datadog_agentless_scanning_aws_scan_options` resource, set `sensitive_data` to `false`, then apply the configuration.

### Datadog-hosted on-demand scanning {#datadog-hosted-on-demand-scanning}

The [On-Demand Scanning API][14] is not available for Datadog-hosted scanning. Datadog scans your resources automatically every 12 hours.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/setup/agentless_scanning#setup
[2]: /remote_configuration
[3]: https://cyclonedx.org/
[4]: /security/cloud_security_management/setup/agentless_scanning/enable?agentless_scanner_hosting=self_hosted#prerequisites
[5]: https://app.datadoghq.com/security/csm/vm
[6]: #terraform
[7]: mailto:success@datadoghq.com
[8]: /security/sensitive_data_scanner
[9]: /security/cloud_security_management
[10]: /remote_configuration
[11]: /security/sensitive_data_scanner/scanning_rules/library_rules/
[13]: /security/cloud_security_management/setup/agentless_scanning/deployment_methods?agentless_scanner_hosting=self_hosted
[14]: /api/latest/agentless-scanning/#create-aws-on-demand-task
[15]: /security/cloud_security_management/guide/resource_evaluation_filters
[16]: /security/cloud_security_management/setup/agentless_scanning/deployment_methods?agentless_scanner_hosting=self_hosted
[17]: /security/cloud_security_management/setup/agentless_scanning/deployment_methods?agentless_scanner_hosting=datadog_hosted#move-an-account-from-self-hosted-to-datadog-hosted-scanning
[18]: /security/cloud_security_management/setup/agentless_scanning/enable?agentless_scanner_hosting=self_hosted
[19]: /security/cloud_security_management/setup/agentless_scanning/enable?agentless_scanner_hosting=datadog_hosted
[20]: /security/sensitive_data_scanner/setup/
