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
- **Datadog-hosted** (Preview, AWS only): Datadog runs the scanners, and you grant Datadog permissions to scan your account.

Both modes use the same scanning engine and produce the same findings. The difference is where the scanner runs. Self-hosted scanning remains fully supported. To compare the two, see [Choose where scanners run](#choose-where-scanners-run).

<div class="alert alert-info">Agentless Scanning excludes resources that have the Datadog Agent installed.</div>

## Choose where scanners run

{{< callout url="" btn_hidden="true" header="Datadog-hosted scanning is in Preview" respect-site-support="false" >}}
Datadog-hosted Agentless Scanning is in Preview and supports AWS accounts only.
{{< /callout >}}

<!-- TODO(DOCS-16346): Confirm how customers request preview access and update the callout (url, btn_hidden). -->

| | Self-hosted | Datadog-hosted (Preview) |
|---|---|---|
| Where the scanner runs | In your cloud account | In Datadog's infrastructure |
| What you deploy | Scanner instances and their networking; for AWS, this includes EC2 instances in an autoscaling group, a VPC, and a NAT gateway | An IAM policy attached to your existing Datadog integration role |
| Where disk contents are read | In your cloud account | In a Datadog scanning environment, in the region of your Datadog site (see [Datadog-hosted data residency](#datadog-hosted-data-residency)) |
| Supported cloud providers | AWS, Azure, GCP | AWS |
| Scanner updates | You update the scanner | Datadog updates the scanner automatically |
| Cloud provider infrastructure cost | Compute and networking costs appear on your cloud provider bill | None |
| Scanning engine and findings | Same in both modes | Same in both modes |
| Datadog billing | Same in both modes | Same in both modes |

<!-- TODO(DOCS-16346): Confirm with SME whether scan frequency (12 hours), resource coverage, and Sensitive Data Scanner support are identical for Datadog-hosted; if so, add rows. -->

### When to use self-hosted scanning

- You need to scan Azure or GCP resources.
- Your policies require that disk contents are only read inside your own cloud account.
- Your policies restrict which region or cloud provider can process your data. Datadog-hosted scanning processes data in the region of your Datadog site, which can differ from the region and cloud provider of your resources.
- You want direct control over scanner versions or scan scheduling.

### When to use Datadog-hosted scanning

- You want to start scanning without deploying compute or networking resources in your account.
- You don't want to maintain, update, or monitor scanner instances.
- You want to avoid the infrastructure cost of running scanners in each region.
- You want new resource types supported automatically, without updating a scanner.

### Use both modes

You don't have to choose one mode for your whole organization. Instead, you can choose a mode for each AWS account. For example, you can use Datadog-hosted scanning in most accounts and self-hosted scanners where disk contents must stay in your cloud account.

To switch an account that already uses a self-hosted scanner, see [Move an account from self-hosted to Datadog-hosted scanning][17].

## Self-hosted scanning

Scanners run in your own cloud account. For setup instructions, see [Enabling Agentless Scanning][18].

### How it works {#how-it-works}

The following diagram illustrates how Agentless Scanning works:

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
- **Data residency**: No data crosses an account boundary into Datadog's infrastructure, simplifying compliance with data sovereignty requirements.
- **Compliance**: Auditors can verify that scanning data remains within your perimeter.

For more information on data privacy, see [What data is sent to Datadog](#what-data-is-sent-to-datadog).

<div class="alert alert-info">
  <ul>
    <li>The scanner operates as a separate VM within your infrastructure, ensuring minimal impact on existing systems and resources.</li>
    <li>For AWS, scanner instances automatically scale based on workload. When there are no resources to scan, scanners scale to zero to minimize cloud provider costs.</li>
    <li>The scanner securely collects a list of packages from your hosts without transmitting any confidential or private personal information outside your infrastructure.</li>
    <li>The scanner limits its use of the cloud provider API to prevent reaching any rate limit, and uses exponential backoff if needed.</li>
    <li>Scanner instances are automatically rotated every 24 hours, ensuring they run the latest images.</li>
  </ul>
</div>

### What data is sent to Datadog {#what-data-is-sent-to-datadog}

Rather than copying disk snapshots outside of your environment for analysis, to keep your data private, Datadog deploys lightweight scanning infrastructure **inside your cloud account**. Agentless Scanning creates snapshots of your resources and analyzes them locally, deleting the snapshots after the analyses are complete. It only sends to Datadog the resulting software bill of materials (SBOM), which contains a list of packages and dependencies, and host metadata. Your raw data, disk contents, and container images never leave your environment.

The Agentless scanner uses the OWASP [cycloneDX][3] format to transmit a list of packages to Datadog. No confidential or private personal information is ever transmitted outside of your infrastructure.

The scanner does **not** send:
- System and package configurations
- Encryption keys and certificates
- Logs and Audit Trails
- Sensitive business data

### Cloud service provider cost {#cloud-service-provider-cost}

Agentless Scanning runs inside your cloud account, so the compute and networking costs appear on your cloud provider bill. While vendors that scan in their own infrastructure bundle compute costs into their SaaS fees, keeping data in your environment means that you see the infrastructure cost directly.

<!-- TODO(DOCS-16346): Confirm with PM whether to publish the self-hosted cost estimate from the brief (~$60/month per region plus ~$0.10 per host per month in data transfer). -->

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

### Cloud Storage scanning {#cloud-storage-scanning}

You can enable [Sensitive Data Scanner][8] for your Agentless Scanning resources during deployment or after setup. Sensitive Data Scanner catalogs and classifies sensitive data in your cloud storage (such as Amazon S3 buckets). It only reads data stores and their files in your environment, without sending any sensitive data to Datadog.

### On-demand scanning {#on-demand-scanning}

By default, Agentless Scanning automatically scans your resources every 12 hours. For AWS, you can also trigger an immediate scan of a specific resource (host, container, Lambda function, or S3 bucket) using the On-Demand Scanning API. For more information, see the [On-Demand Scanning API][14] documentation.

## Datadog-hosted scanning

Datadog runs the scanners in its own infrastructure. This mode is in Preview and supports AWS only. For setup instructions, see [Enabling Agentless Scanning][19].

### How it works {#datadog-hosted-how-it-works}

1. Datadog discovers your resources through cloud provider APIs. This step reads metadata only.
2. Datadog creates a snapshot of each volume to scan in your AWS account. The snapshot stays in your account. Datadog never shares the snapshot with or copies it into a Datadog AWS account.
3. Datadog reads the snapshot's blocks over HTTPS using the Amazon EBS direct APIs.
4. Datadog presents the blocks to a scanning sandbox as a block device, and the sandbox mounts the partitions as read-only.
5. Scanners analyze the mounted file systems and send findings and SBOMs to Datadog.
6. Datadog deletes the snapshot and destroys the sandbox.

Each scan runs in a new hardware-isolated microVM with its own kernel, which Datadog destroys when the scan ends. Datadog never runs code on your instances.

### What data is sent to Datadog {#datadog-hosted-what-data-is-sent-to-datadog}

Datadog reads your disk contents in its scanning environment to analyze them. Datadog reads the blocks on demand and does **not** retain any copy of your disk contents. When the scan ends, Datadog destroys the sandbox. Like with self-hosted scanning, the only data that persists in Datadog is the findings and SBOMs.

### Data residency {#datadog-hosted-data-residency}

Scans run in the region of the Datadog site that your organization uses, not in the region where your resources are located.

| Datadog site | Scanning region |
|---|---|
| US1 | AWS `us-east-1` |
| US3 | Azure `westus2` |
| US5 | Google Cloud `us-central1` |
| EU1 | Google Cloud `europe-west3` (Frankfurt) |
| AP1 | AWS `ap-northeast-1` |
| AP2 | AWS `ap-southeast-2` |
| UK1 | AWS `eu-west-2` |

For example:

- If your organization uses the EU1 site, Datadog processes your data in Frankfurt, inside the EU, regardless of which AWS region your resources are in.
- If your organization uses the US1 site and your resources are in an EU region, Datadog reads those blocks in `us-east-1`. This is a cross-border data transfer. Review your privacy requirements before you enable scanning for these accounts.

The cloud provider that processes your data can differ from the cloud provider that hosts your resources. For example, if your organization uses the EU1 site, Datadog reads the disk contents of your AWS resources on Google Cloud infrastructure in Frankfurt. If your policies restrict processing to a specific cloud provider, use self-hosted scanning.

### Cost {#datadog-hosted-cost}

There is no scanner infrastructure cost on your cloud provider bill and no additional Datadog cost.

### Cloud Storage scanning {#datadog-hosted-cloud-storage-scanning}

You can enable [Sensitive Data Scanner][8] for Amazon S3 buckets during setup. Sensitive Data Scanner catalogs and classifies sensitive data in your cloud storage.

<!-- TODO(DOCS-16346): Confirm with SME how Datadog-hosted scanning handles S3 object contents (where they are read, and that nothing is retained). -->

<!-- TODO(DOCS-16346): Confirm with SME whether the On-Demand Scanning API works with Datadog-hosted scanning; if so, add an on-demand scanning section here. -->

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/setup/agentless_scanning#setup
[2]: /remote_configuration
[3]: https://cyclonedx.org/
[4]: /security/cloud_security_management/setup/agentless_scanning/enable#prerequisites?agentless_scanner_hosting=self_hosted
[5]: https://app.datadoghq.com/security/csm/vm
[6]: #terraform
[7]: mailto:success@datadoghq.com
[8]: /security/sensitive_data_scanner
[9]: /security/cloud_security_management
[10]: /remote_configuration
[11]: /security/sensitive_data_scanner/scanning_rules/library_rules/
[13]: /security/cloud_security_management/setup/agentless_scanning/deployment_methods
[14]: /api/latest/agentless-scanning/#create-aws-on-demand-task
[15]: /security/cloud_security_management/guide/resource_evaluation_filters
[16]: /security/cloud_security_management/setup/agentless_scanning/deployment_methods
[17]: /security/cloud_security_management/setup/agentless_scanning/deployment_methods#move-an-account-from-self-hosted-to-datadog-hosted-scanning?agentless_scanner_hosting=datadog_hosted
[18]: /security/cloud_security_management/setup/agentless_scanning/enable?agentless_scanner_hosting=self_hosted
[19]: /security/cloud_security_management/setup/agentless_scanning/enable?agentless_scanner_hosting=datadog_hosted
