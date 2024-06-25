---
title: Cloud Security Management Agentless Scanning
aliases:
 - /security/agentless_scanning
further_reading:
- link: "/security/cloud_security_management/setup/agentless_scanning"
  tag: "Documentation"
  text: "Setting up Agentless Scanning"
- link: "https://www.datadoghq.com/blog/agentless-scanning/"
  tag: "Blog"
  text: "Detect vulnerabilities in minutes with Agentless Scanning for Cloud Security Management"
- link: "/security/vulnerabilities"
  tag: "Documentation"
  text: "Read more about CSM Vulnerabilities"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Agentless Scanning for Cloud Security Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Agentless Scanning provides visibility into vulnerabilities that exist within your AWS hosts, running containers, Lambda functions, and Amazon Machine Images (AMIs) without requiring you to install the Datadog Agent. Datadog recommends enabling Agentless Scanning as a first step to gain complete visibility into your cloud resources, and then installing the Datadog Agent on your core assets over time for deeper security and observability context.

## Availability

The following table provides a summary of Agentless scanning technologies in relation to their corresponding components:

| Component                   | Supported technology                                        |
|-----------------------------|-------------------------------------------------------------|
| Cloud Provider              | AWS                                                         |
| Operating System            | Linux                                                       |
| Host Filesystem             | Btrfs, Ext2, Ext3, Ext4, xfs                                |
| Package Manager             | Deb (debian, ubuntu) <br> RPM (amazon-linux, fedora, redhat, centos) <br> APK (alpine) |
| Encryption                  | AWS </br> Unencrypted </br> Encrypted - Platform Managed Key (PMK) </br> **Note**: Encrypted - Customer Managed Key (CMK) is **not** supported |
| Container runtime           | Docker, containerd </br> **Note**: CRI-O is **not** supported                                         |
| Serverless                  | AWS, AWS Lambda                                             |
| Serverless languages        | .Net, Python, Java, Ruby, Node.js, Go                        |

## How it works

After [setting up Agentless scanning][1] for your resources, Datadog schedules automated scans in 12-hour intervals through [Remote Configuration][2]. During a scan cycle, Agentless scanners gather Lambda code dependencies and create snapshots of your EC2 instances. With these snapshots, the Agentless scanners scan, generate, and transmit a list of packages to Datadog to check for vulnerabilities, along with Lambda code dependencies. When scans of a snapshot are completed, the snapshot is deleted. No confidential or private personal information is ever transmitted outside of your infrastructure.

The following diagram illustrates how Agentless Scanning works:

{{< img src="/security/agentless_scanning/how_agentless_works.png" alt="Diagram showing how Agentless scanning works" width="90%" >}}

1. Datadog schedules a scan and sends which resources to scan through Remote Configuration.

    **Note**: Scheduled scans ignore hosts that already have the [Datadog Agent installed with Cloud Security Management enabled](#agentless-scanning-with-existing-agent-installations). Datadog schedules a continuous re-scanning of resources every 12 hours to provide up-to-date insights into potential vulnerabilities and weaknesses.

2. For Lambda functions, the scanners fetch the function's code.
3. The scanner creates snapshots of EBS volumes used by EC2 instances. These snapshots serve as the basis for conducting scans. Using the snapshots, or the code, the scanner generates a list of packages.
4. After the scan is complete, the list of packages and information related to collected hosts (hostnames/EC2 instances) are transmitted to Datadog, with all other data remaining within your infrastructure. Snapshots created during the scan cycle are deleted.
5. Leveraging the collected package list along with Datadog's access to the Trivy vulnerabilities database, Datadog finds matching affected vulnerabilities in your resources and code.

**Notes**:
- The scanner operates as a separate EC2 instance within your infrastructure, ensuring minimal impact on existing systems and resources.
- The scanner securely collects a list of packages from your hosts without transmitting any confidential or private personal information outside your infrastructure.
- The scanner limits its use of the AWS API to prevent reaching the AWS rate limit, and uses exponential backoff if needed.

## What data is sent to Datadog
The Agentless scanner uses the OWASP [cycloneDX][3] format to transmit a list of packages to Datadog. No confidential or private personal information is ever transmitted outside of your infrastructure.

Datadog does **not** send:
- System and package configurations
- Encryption keys and certificates
- Logs and Audit Trails
- Sensitive business data

## Security considerations

Because the scanner instances grant [permissions][4] to create and copy EBS snapshots, and describe volumes, Datadog advises restricting access to these instances solely to administrative users. 

To further mitigate this risk, Datadog implements the following security measures:

- The Datadog scanner operates _within_ your infrastructure, ensuring that all data, including snapshots and list of packages, remain isolated and secure.
- All data transmission between the scanner and Datadog is encrypted using industry standard protocols (such as HTTPS) to ensure data confidentiality and integrity.
- The Datadog scanner operates under the principle of least privilege. This means that it is granted only the minimum permissions necessary to perform its intended functions effectively.
- Datadog carefully reviews and limits the permissions granted to the scanner to ensure that it can conduct scans without unnecessary access to sensitive data or resources.
- Unattended security updates are enabled on Datadog's scanner instances. This feature automates the process of installing critical security patches and updates without requiring manual intervention.
- The Datadog scanner instances are automatically rotated every 24 hours. This rotation ensures that the scanner instances are continually updated with the latest Ubuntu Amazon Machine Images (AMIs).
- Access to the scanner instances is tightly controlled through the use of security groups. No inbound access to the scanner is allowed, restricting possibility to compromise the instance.
- No confidential or private personal information is ever transmitted outside of your infrastructure.

## Agentless Scanning with existing Agent installations

When installed, the Datadog Agent offers real-time, deep visibility into risks and vulnerabilities that exist in your cloud workloads. It is recommended to fully install the Datadog Agent.

As a result, Agentless Scanning excludes resources from its scans that have the Datadog Agent installed and configured for [Vulnerability Management][5]. In this way, Cloud Security Management offers complete visibility of your risk landscape without overriding the benefits received from installing the Datadog Agent with Vulnerability Management.

The following diagram illustrates how Agentless scanning works with existing Agent installations:

{{< img src="/security/agentless_scanning/agentless_existing.png" alt="Diagram showing how Agentless scanning works when the Agent is already installed with CSM vulnerability management" width="90%" >}}

## Data Security

<div class="alert alert-warning">Data Security is in private beta. To enroll in the private beta, <a href="https://www.datadoghq.com/private-beta/data-security">sign up here</a>.</div>

If you have [Sensitive Data Scanner][8] and [Cloud Security Management][9] enabled, you can use Data Security to locate sensitive data and fix security issues impacting AWS S3 buckets and RDS instances.

Data Security scans for sensitive data by deploying [Agentless scanners][1] in your cloud environments. These scanning instances retrieve a list of all S3 buckets and RDS instances through [Remote Configuration][10], and have set instructions to scan text files—such as CSVs and JSONs—and tables in every datastore over time. Data Security leverages rules provided by Sensitive Data Scanner to find matches. When a match is found, the location of the match is sent to Datadog by the scanning instance. Datastores and their files are only read in your environment—no sensitive data is sent back to Datadog.

Along with displaying sensitive data matches, Data Security surfaces any security issues detected by Cloud Security Management affecting the sensitive datastores. You can click any issue to continue triage and remediation within Cloud Security Management.

## Cloud service provider cost

When using Agentless Scanning, there are additional costs for running scanners in your cloud environments. To optimize on costs while being able to reliably scan every 12 hours, Datadog recommends setting up [Agentless Scanning with Terraform][6] as the default template, as this also avoids cross-region networking. 

To establish estimates on scanner costs, reach out to your [Datadog Customer Success Manager.][7]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/setup/agentless_scanning
[2]: /agent/remote_config/?tab=configurationyamlfile
[3]: https://cyclonedx.org/
[4]: /security/cloud_security_management/setup/agentless_scanning/#permissions
[5]: https://app.datadoghq.com/security/csm/vm
[6]: /security/cloud_security_management/setup/agentless_scanning#terraform
[7]: mailto:success@datadoghq.com
[8]: /sensitive_data_scanner
[9]: /security/cloud_security_management
[10]: /agent/remote_config