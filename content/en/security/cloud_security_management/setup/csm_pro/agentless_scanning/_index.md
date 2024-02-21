---
title: Enabling CSM Pro for Agentless Scanning
kind: documentation
---

<div class="alert alert-info">Agentless Scanning is in beta.</div>

Containers only

- Prerequisites
- Enable AWS Integration + CSM
- Enable Remote Configuration
- Use Remote Configuration-enabled Datadog API keys
- Specific permissions on accounts that need to be scanned
- Deployment Models
  - Cross-account scans (create new account or choose existing one)
  - Cross-region scans (one scanner per account)
- Resource Exclusion
- How to stop certain resources from being scanned
- Terraform Setup
- CloudFormation Setup
- UI Setup
- How to disable

### AWS Integration

Within the AWS integration in Datadog, after selecting the Cloud Formation template, and enabling [Remote Configuration][4] for your organization, Datadog updates the template with the necessary IAM permissions, and deploys a modified, standalone version of the Datadog Agent on an EC2 instance in your AWS Cloud account. Datadog scans the EBS volume to generate a [Software Bill of Materials (SBOM)][2], and sends the SBOM back to Datadog [Vulnerability Management][3], where you can investigate and remediate vulnerabilities. 

Scans occur every 12 hours.


The following diagram illustrates how Agentless Vulnerability scanning works when deployed within each Cloud account:

{{< img src="security/agentless_scanning/agentless_vulnerability_quickstart.png" alt="Diagram of Agentless Vulnerability Scanning showing the Agentless scanner is deployed in each Cloud account" width="100%">}}

### Advanced deployment

Agentless Vulnerability scanning can also be deployed in a central cloud account, and utilities the manual Terraform installation. 

The following diagram illustrates how Agentless Vulnerability scanning works when deployed in a central cloud account:

{{< img src="security/agentless_scanning/agentless_vulnerability_advanced.png" alt="Diagram of Agentless Vulnerability Scanning showing the Agentless scanner is deployed in a central Cloud account" width="100%">}}

[1]: /security/vulnerabilities
[2]: https://www.cisa.gov/sbom
[3]: https://app.datadoghq.com/security/csm/vm
[4]: /agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration