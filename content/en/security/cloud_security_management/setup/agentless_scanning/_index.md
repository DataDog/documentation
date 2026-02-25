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

<div class="alert alert-info">Agentless Scanning is available in all commercial Datadog data centers. It is not available for GovCloud and is not FIPS compliant.</div>

## How it works

Most agentless security tools copy disk snapshots out of your environment into the vendor's infrastructure for analysis. Datadog takes a different approach for the sake of data privacy: lightweight scanning infrastructure is deployed **inside your cloud account**. Scanners create snapshots of your resources and analyze them locally. Only the resulting software bill of materials (SBOM) — a list of packages and dependencies — is sent to Datadog. Your raw data, disk contents, and container images never leave your environment.

This architecture provides:
- **Data privacy**: Your disk contents, container images, and sensitive data stay within your cloud account. Only package metadata (the SBOM) is transmitted to Datadog.
- **Data residency**: No data crosses an account boundary into Datadog's infrastructure, simplifying compliance with data sovereignty requirements.
- **Compliance**: Auditors can verify that scanning data remains within your perimeter.

After [setting up Agentless Scanning][1] for your resources, Datadog schedules automated scans in 12-hour intervals through [Remote Configuration][2]. During a scan cycle, Agentless scanners create snapshots of your VM instances and gather serverless function code. The scanners analyze these locally, generate an SBOM, and transmit it to Datadog to check for vulnerabilities. Snapshots are deleted after each scan completes.

If you have [Cloud Security Evaluation Filters][15] configured, Agentless Scanning respects these filters and only scans resources that match the configured criteria.

<div class="alert alert-info">Agentless Scanning excludes resources that have the Datadog Agent installed.</div>

The following diagram illustrates how Agentless Scanning works:

{{< img src="/security/agentless_scanning/how_agentless_works.png" alt="Diagram showing how Agentless Scanning works" width="90%" >}}

1. Datadog schedules a scan and sends which resources to scan through Remote Configuration.

    **Note**: Scheduled scans ignore hosts that already have the [Datadog Agent installed with Cloud Security enabled](#agentless-scanning-with-existing-agent-installations). Datadog schedules a continuous re-scanning of resources every 12 hours to provide up-to-date insights into potential vulnerabilities and weaknesses.

2. For serverless functions (such as AWS Lambda), the scanners fetch the function's code.
3. The scanner creates snapshots of volumes used in running VM instances. Using the snapshots or the function code, the scanner generates an SBOM (a list of packages and dependencies).
4. The SBOM and host metadata are transmitted to Datadog. All other data — including snapshots, disk contents, and container images — remains in your infrastructure. Snapshots are deleted.
5. Datadog uses the SBOM to identify known vulnerabilities in your resources.

**Notes**:
- The scanner operates as a separate virtual machine within your infrastructure, ensuring minimal impact on existing systems and resources.
- For AWS, scanner instances automatically scale based on workload. When there are no resources to scan, scanners scale to zero to minimize cloud provider costs.
- The scanner securely collects a list of packages from your hosts without transmitting any confidential or private personal information outside your infrastructure.
- The scanner limits its use of the cloud provider API to prevent reaching any rate limit, and uses exponential backoff if needed.
- Scanner instances are automatically rotated every 24 hours, ensuring they run the latest images.

## What data is sent to Datadog
The Agentless scanner uses the OWASP [cycloneDX][3] format to transmit a list of packages to Datadog. No confidential or private personal information is ever transmitted outside of your infrastructure.

Datadog does **not** send:
- System and package configurations
- Encryption keys and certificates
- Logs and Audit Trails
- Sensitive business data

## Cloud service provider cost

Because Agentless Scanning runs inside your cloud account, the compute and networking costs appear on your cloud provider bill. This is the tradeoff for keeping data in your environment — unlike vendors that scan in their own infrastructure (where compute cost is bundled into the SaaS fee), you see the infrastructure cost directly.

The following table provides estimated monthly costs. Consult your cloud provider's pricing for exact amounts, which are subject to change without Datadog's involvement.

| Cost component | Estimate | Notes |
|----------------|----------|-------|
| Fixed per scanner | ~$80 USD/mo | VM instance (for example, EC2 in AWS), virtual network, and NAT gateway |
| Per scanned host | ~$0.10 USD/mo | Data transfer (egress) for transmitting package lists |
| Cross-account access (AWS IAM roles, Azure role assignments, or GCP service accounts) | $0 | Identity-based access only, no compute cost |

To reduce costs:
- Deploy a scanner in each region where you have more than 150 hosts. A regional scanner avoids cross-region data transfer, which is more cost-effective than scanning those hosts from a remote region.
- Use the [recommended configuration][13] with Terraform to deploy one scanner per region.
- For large multi-region deployments, see [Deploying Agentless Scanning][16] for guidance on choosing a deployment topology.

## Security considerations

Scanner instances require [permissions][4] to create and copy snapshots and describe volumes. Datadog advises restricting access to these instances to administrative users.

- Scanner permissions follow the principle of least privilege, limited to the minimum required for scanning.
- All data transmission between the scanner and Datadog is encrypted with HTTPS.
- Unattended security updates are enabled, and instances are automatically rotated every 24 hours.
- No inbound access to scanner instances is allowed (security group restricted).

## Cloud Storage scanning

You can enable [Sensitive Data Scanner][8] for your Agentless Scanning resources during deployment or after setup. Sensitive Data Scanner catalogs and classifies sensitive data in your cloud storage (such as Amazon S3 buckets). Data stores and their files are only read in your environment — no sensitive data is sent to Datadog.

## On-demand scanning

By default, Agentless Scanning automatically scans your resources every 12 hours. For AWS, you can also trigger an immediate scan of a specific resource (host, container, Lambda function, or S3 bucket) using the On-Demand Scanning API. For more information, see the [On-Demand Scanning API documentation][14].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/setup/agentless_scanning#setup
[2]: /remote_configuration
[3]: https://cyclonedx.org/
[4]: /security/cloud_security_management/setup/agentless_scanning/enable#prerequisites
[5]: https://app.datadoghq.com/security/csm/vm
[6]: #terraform
[7]: mailto:success@datadoghq.com
[8]: /security/sensitive_data_scanner
[9]: /security/cloud_security_management
[10]: /remote_configuration
[11]: /security/sensitive_data_scanner/scanning_rules/library_rules/
[13]: /security/cloud_security_management/setup/agentless_scanning/deployment_methods#recommended-configuration
[14]: /api/latest/agentless-scanning/#create-aws-on-demand-task
[15]: /security/cloud_security_management/guide/resource_evaluation_filters
[16]: /security/cloud_security_management/setup/agentless_scanning/deployment_methods
