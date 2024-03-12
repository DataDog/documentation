---
title: Cloud Security Management Agentless Scanning
kind: documentation
further_reading:
- link: "/security/cloud_security_management/setup/agentless_scanning"
  tag: "Documentation"
  text: "Setting up Agentless Scanning"
- link: "/security/vulnerabilities"
  tag: "Documentation"
  text: "Read more about CSM Vulnerabilities"
---

<div class="alert alert-info">CSM Agentless Scanning is in beta.</div>

## Overview

Agentless Scanning provides visibility into risks and vulnerabilities that exist within your hosts, running containers, container images, and serverless functions, without requiring you to install the Datadog Agent. Datadog recommends enabling Agentless Scanning as a first step to gain complete visibility into your resources, and install the Datadog Agent on your components over time for deeper security and observability context.

Cloud Security Management supports Agentless Scanning for vulnerabilities on resources that exist in your AWS environments.

## Availability

The following table provides a summary of Agentless scanning technologies in relation to their corresponding components:

| Component                   | Supported technology                                        |
|-----------------------------|-------------------------------------------------------------|
| Cloud Provider              | AWS                                                         |
| Operating System            | Linux                                                       |
| Host Filesystem             | Btrfs, Ext2, Ext3, Ext4, xfs                                |
| Package Manager             | Deb (debian, ubuntu) <br> RPM (amazon-linux, fedora, redhat, centos) <br> APK (alpine) |
| Encryption                  | AWS </br> Unencrypted </br> Encrypted - Platform Managed Key (PMK) </br> Encrypted - Customer Managed Key (CMK) is **not** supported |
| Container runtime           | Docker, containerd </br> CRI-O is **not** supported                                         |
| Serverless                  | AWS, AWS Lambda                                             |
| Serverless languages        | .Net, Python, Java, Ruby, Node.js, Go                        |

## How it works

After [setting up Agentless scanning][1] for your resources, Datadog initiates scans through [Remote Configuration,][2] which produce snapshots of your EC2 instances at scheduled intervals. Using the snapshots, the scanner conducts scans to generate and transmit the [Software Bill of Materials][8] (SBOM) to Datadog.

The following diagram illustrates how Agentless Scanning works:

**Insert diagram**

0. Datadog schedules a scan and sends which resources to scan through Remote Configuration.
1. The scanner creates snapshots of your EC2 instances every 12 hours or upon request (soon). These snapshots serve as the basis for conducting scans. For lambda, the scanners download the function's code.
2. Using the snapshots, or the code, the scanner conducts scans to generate SBOMs.
3. Once the scan is complete, only the list of SBOMs is transmitted to Datadog, while all other data remains within your infrastructure.
4. Leveraging the collected SBOMs and vulnerabilities databases, Datadog finds matching affected vulnerabilities in your resources and code.

- The scanner operates as a separate EC2 instance within your infrastructure, ensuring minimal impact on existing systems and resources.
- The scanner securely collects SBOMs from your hosts without transmitting any confidential or private information outside your infrastructure.
- The scanner limits its use of the AWS API to prevent reaching the AWS rate limit, and will use exponential backoff if needed.


## What data is sent to Datadog
Our scanner is designed to only transmit the list of SBOMs to Datadog using the OSWAP [cycloneDX][5] format. No confidential or private information is ever transmitted outside of your infrastructure.

Datadog does **not** send:
- System and package configurations
- Encryption keys and certificates
- Logs and Audit Trails
- Sensitive business data


## Security considerations

As the scanner instances grant [permissions][3] to create and copy EBS snapshots, and describe volumes, Datadog advises restricting access to these instances solely to administrative users. 

To further mitigate this risk, Datadog implements the following security measures:

- The Datadog scanner operates _within_ your infrastructure, ensuring that all data, including snapshots and SBOMs, remain isolated and secure.
- All data transmission between the scanner and Datadog is encrypted using industry standard protocols to ensure data confidentiality and integrity (HTTPS).
- The Datadog scanner operates under the principle of least privilege. This means that it is granted only the minimum permissions necessary to perform its intended functions effectively. Datadog carefully reviews and limits the permissions granted to the scanner to ensure that it can conduct scans without unnecessary access to sensitive data or resources.
- Unattended security updates are enabled on Datadog's scanner instances. This feature automates the process of installing critical security patches and updates without requiring manual intervention.
- The Datadog scanner instances are automatically rotated every 24 hours. This rotation ensures that the scanner instances are continually updated with the latest Ubuntu Amazon Machine Images (AMI's).
- Access to the SBOM scanner instances is tightly controlled through the use of security groups. No inbound access to the scanner is allowed, restricting possibility to compromise the instance.
- No confidential or private information is ever transmitted outside your infrastructure.


## Agentless Scanning with existing Agent installation

When installed, the Datadog Agent offers real-time, deep visibility into risks and vulnerabilities that exist in your cloud workloads. It is recommended to fully install the Datadog Agent.

As a result, Agentless Scanning excludes resources that have the Datadog Agent installed and configured for Vulnerability Management from its scans. In this way, Cloud Security Management offers complete visibility of your risk landscape without overriding the benefits received from installing the Datadog Agent with Vulnerability Management.

**Insert Diagram**

## Cloud service provider cost

When using Agentless Scanning, there are additional costs for running scanners in your cloud environments. To optimize on costs while being able to reliably scan every 12 hours, Datadog recommends to setup [Agentless Scanning with Terraform][4] as the default template, as this also avoids cross-region networking. 

To establish estimates on scanner costs, reach out to your [Datadog Customer Success Manager.][7]


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/setup/agentless_scanning
[2]: /agent/remote_config/?tab=configurationyamlfile
[3]: /security/cloud_security_management/setup/agentless_scanning/#permissions
[4]: /security/cloud_security_management/setup/agentless_scanning#terraform
[5]: https://cyclonedx.org/
[7]: mailto:success@datadoghq.com
[8]: https://www.cisa.gov/sbom