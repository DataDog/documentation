---
title: Cloud Security Agentless Scanning
aliases:
  - /security/agentless_scanning
  - /security/cloud_security_management/agentless_scanning
further_reading:
  - link: "/security/vulnerabilities"
    tag: "Documentation"
    text: "Read more about Cloud Security Vulnerabilities"
---

## Overview

Agentless Scanning provides visibility into vulnerabilities that exist within your cloud infrastructure, without requiring you to install the Datadog Agent. Datadog recommends enabling Agentless Scanning as a first step to gain complete visibility into your cloud resources, and then installing the Datadog Agent on your core assets over time for deeper security and observability context.

## How it works

After [setting up Agentless scanning][1] for your resources, Datadog schedules automated scans in 12-hour intervals through [Remote Configuration][2]. During a scan cycle, Agentless scanners gather Lambda code dependencies and create snapshots of your VM instances. With these snapshots, the Agentless scanners scan, generate, and transmit a list of packages to Datadog to check for vulnerabilities, along with Lambda code dependencies. When scans of a snapshot are completed, the snapshot is deleted. No confidential or private personal information is ever transmitted outside of your infrastructure.

If you have [Cloud Security Evaluation Filters][15] configured, Agentless Scanning respects these filters and only scans resources that match the configured criteria.

The following diagram illustrates how Agentless Scanning works:

{{< img src="/security/agentless_scanning/how_agentless_works.png" alt="Diagram showing how Agentless scanning works" width="90%" >}}

1. Datadog schedules a scan and sends which resources to scan through Remote Configuration.

    **Note**: Scheduled scans ignore hosts that already have the [Datadog Agent installed with Cloud Security enabled](#agentless-scanning-with-existing-agent-installations). Datadog schedules a continuous re-scanning of resources every 12 hours to provide up-to-date insights into potential vulnerabilities and weaknesses.

2. For Lambda functions, the scanners fetch the function's code.
3. The scanner creates snapshots of volumes used in running VM instances. These snapshots serve as the basis for conducting scans. Using the snapshots, or the code, the scanner generates a list of packages.
4. After the scan is complete, the list of packages and information related to collected hosts are transmitted to Datadog, with all other data remaining within your infrastructure. Snapshots created during the scan cycle are deleted.
5. Leveraging the collected package list along with Datadog's access to the Trivy vulnerabilities database, Datadog finds matching affected vulnerabilities in your resources and code.

**Notes**:
- The scanner operates as a separate VM instance within your infrastructure, ensuring minimal impact on existing systems and resources.
- For AWS, scanner instances automatically scale based on workload. When there are no resources to scan, scanners scale to zero to minimize cloud provider costs.
- The scanner securely collects a list of packages from your hosts without transmitting any confidential or private personal information outside your infrastructure.
- The scanner limits its use of the cloud provider API to prevent reaching any rate limit, and uses exponential backoff if needed.

## On-demand scanning

By default, Agentless Scanning automatically scans your resources every 12 hours. You can also trigger an immediate scan of a specific resource (host, container, Lambda function, or S3 bucket) using the On-Demand Scanning API.

This is useful when you need to:
- Verify a vulnerability has been patched
- Get immediate results for newly deployed resources
- Validate security posture before production deployment

For more information, see the [On-Demand Scanning API documentation][14].

## What data is sent to Datadog
The Agentless scanner uses the OWASP [cycloneDX][3] format to transmit a list of packages to Datadog. No confidential or private personal information is ever transmitted outside of your infrastructure.

Datadog does **not** send:
- System and package configurations
- Encryption keys and certificates
- Logs and Audit Trails
- Sensitive business data

## Security considerations

Because the scanner instances grant [permissions][4] to create and copy snapshots, and describe volumes, Datadog advises restricting access to these instances solely to administrative users.

To further mitigate this risk, Datadog implements the following security measures:

- The Datadog scanner operates _within_ your infrastructure, ensuring that all data, including snapshots and list of packages, remain isolated and secure.
- All data transmission between the scanner and Datadog is encrypted using industry standard protocols (such as HTTPS) to ensure data confidentiality and integrity.
- The Datadog scanner operates under the principle of least privilege. This means that it is granted only the minimum permissions necessary to perform its intended functions effectively.
- Datadog carefully reviews and limits the permissions granted to the scanner to ensure that it can conduct scans without unnecessary access to sensitive data or resources.
- Unattended security updates are enabled on Datadog's scanner instances. This feature automates the process of installing critical security patches and updates without requiring manual intervention.
- The Datadog scanner instances are automatically rotated every 24 hours. This rotation ensures that the scanner instances are continually updated with the latest Ubuntu images.
- Access to the scanner instances is tightly controlled through the use of security groups. No inbound access to the scanner is allowed, restricting possibility to compromise the instance.
- No confidential or private personal information is ever transmitted outside of your infrastructure.

## Agentless Scanning with existing Agent installations

When installed, the Datadog Agent offers real-time, deep visibility into risks and vulnerabilities that exist in your cloud workloads. It is recommended to fully install the Datadog Agent.

As a result, Agentless Scanning excludes resources from its scans that have the Datadog Agent installed and configured for [Vulnerability Management][5]. In this way, Cloud Security offers complete visibility of your risk landscape without overriding the benefits received from installing the Datadog Agent with Vulnerability Management.

The following diagram illustrates how Agentless scanning works with existing Agent installations:

{{< img src="/security/agentless_scanning/agentless_existing.png" alt="Diagram showing how Agentless scanning works when the Agent is already installed with Cloud Security vulnerability management" width="90%" >}}

## Cloud Storage scanning

{{< callout url="https://www.datadoghq.com/product-preview/data-security" >}}
  Scanning support for Amazon S3 buckets and RDS instances in Preview. To enroll, click <strong>Request Access</strong>.
{{< /callout >}}

If you have [Sensitive Data Scanner][8] enabled, you can catalog and classify sensitive data in your Amazon S3 buckets.

Sensitive Data Scanner scans for sensitive data by deploying [Agentless scanners][1] in your cloud environments. These scanning instances retrieve a list of all S3 buckets through [Remote Configuration][10], and have set instructions to scan text files—such as CSVs and JSONs over time. Sensitive Data Scanner leverages its [entire rules library][11] to find matches. When a match is found, the location of the match is sent to Datadog by the scanning instance. Data stores and their files are only read in your environment—no sensitive data is sent back to Datadog.

Along with displaying sensitive data matches, Sensitive Data Scanner surfaces any security issues detected by [Cloud Security][9] affecting the sensitive datastores. You can click any issue to continue triage and remediation within Cloud Security.

## Cloud service provider cost

When using Agentless Scanning, there are additional cloud provider costs for running scanners and analyzing your cloud environments.

Your cloud configuration affects your cloud provider costs. Typically, using the [recommended configuration][13], these are in the range of $1 USD per scanned host per year. You should consult your cloud provider's information for exact amounts, which are subject to change without Datadog's involvement.

For large cloud workloads distributed across multiple regions, Datadog recommends setting up [Agentless Scanning with Terraform][6] to avoid cross-region networking.


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
