---
title: Cloud Security Management Agentless Scanning
kind: documentation
further_reading:
- link: "/security/cloud_security_management/setup/"
  tag: "Documentation"
  text: "Setting up Agentless Scanning"
---

<div class="alert alert-info">CSM Agentless Scanning is in beta.</div>

## Overview

Agentless Scanning provides visibility into risks and vulnerabilities that exist within your hosts, running containers, container images, and serverless functions, without requiring you to install the Datadog Agent. Datadog recommends to enable Agentless Scanning as a first step to gain complete visibility into your resources, and install the Datadog Agent on your components over time for deeper security and observability context.

Cloud Security Management supports Agentless Scanning for vulnerabilities on resources that exist in your AWS environments.

## Availability

The following table summarizes the Agentless scanning technologies that are available relative to their corresponding component:

| Component                   | Supported technology                                        |
|-----------------------------|-------------------------------------------------------------|
| Cloud Provider              | AWS                                                         |
| Operating System            | Linux                                                       |
| Host Filesystem             | Btrfs, Ext2, Ext3, Ext4, xfs                                |
| Package Manager             | Deb (debian, ubuntu) <br> RPM (amazon-linux, fedora, redhat, centos) <br> APK (alpine) |
| Encryption                  | AWS, Unencrypted, Encrypted (PMK)                           |
| Container runtime           | Docker, containerd                                           |
| Serverless                  | AWS, AWS Lambda                                             |
| Serverless languages        | .Net, Python, Java, Ruby, Node.js, Go                        |

## How it works

- After [setting up Agentless scanning][1] for your resources, Datadog initiates scans through [Remote Configuration][2]. These scans produce snapshots of your EC2 instances at scheduled intervals (every 12 hours), and serve as the basis for conducting scans. For Lambda, the scanner downloads the function's code. Using the snapshots, (or the code), the scanner conducts scans to generate and transmit the Software Bill of Materials (SBOM) to Datadog.

**Note**: The scanner transmits the list of SBOM's to Datadog, all other data remains within your infrastructure.

- The scanner operates as a separate EC2 instance within the your infrastructure, ensuring minimal impact on existing systems and resources.
- The scanner securely collects SBOMs from your hosts without transmitting any confidential or private information outside your infrastructure.


## Security considerations

As the scanner instances are granted permissions to create and copy EBS snapshots, and describe volumes, Datadog advises restricting access to these instances solely to administrative users. 

To further mitigate this risk, Datadog implements the following security measures:

- The Datadog scanner operates _within_ your infrastructure, ensuring that all data, including snapshots and SBOMs, remain isolated and secure.
- All data transmission between the scanner and Datadog is encrypted using industry standard protocols to ensure data confidentiality and integrity (HTTPS).
- The Datadog scanner operates under the principle of least privilege. This means that it is granted only the minimum permissions necessary to perform its intended functions effectively. Datadog carefully reviews and limits the permissions granted to the scanner to ensure that it can conduct scans without unnecessary access to sensitive data or resources.
- Unattended security updates are enabled on Datadog's scanner instances. This feature automates the process of installing critical security patches and updates without requiring manual intervention.
- The Datadog scanner instances are automatically rotated every 24 hours. This rotation ensures that the scanner instances are continually updated with the latest Amazon Machine Images (AMI's).
- Access to the SBOM scanner instances is tightly controlled through the use of security groups. No inbound access to the scanner is allowed, restricting possibility to compromise the instance.
- No confidential or private information is ever transmitted outside your infrastructure.

## Agentless Scanning with Existing Agent Coverage
- Explain exclusion of scans on Agent-based resources with VM enabled
The Agentless Scanner will scan all compute instances (e.g. EC2s, Lambdas, containers) that are not running the Datadog Agent AND have not been explicitly excluded from scanning by the customer.

**Diagram Coming March 1st**

## Cloud Service Provider Cost
- Make it clear that customers need to pay cloud providers to run Agentless Scanning
We plan to stay simple in our wording to avoid giving any concrete figures


## Next Steps (Links)
- Agentless Scanning Set Up
- AWS Setup
- Azure Private Beta
- Agentless Scanning Setup Reference

Give links to break down by cloud provider (AWS only at this time)
Direct customers to sign up form for Azure private beta

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/setup/agentless_scanning
[2]: /agent/remote_config/?tab=configurationyamlfile