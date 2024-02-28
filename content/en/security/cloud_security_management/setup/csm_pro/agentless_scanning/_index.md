---
title: Enabling CSM Pro for Agentless Scanning
kind: documentation
---

<div class="alert alert-info">Agentless Scanning is in beta.</div>

To configure CSM Enterprise on your agentless scanning instances for your hosts and containers, use the following steps:

{{% csm-agentless-prereqs %}}

## Configuration

There are two ways to deploy Agentless scanners in your environment, manually using [Terraform][#terraform], or by using the CloudFormation template with the [AWS Integration][aws-integration].

Also make it clear to customers that there is additional costs on their for running scanners and processing snapshots.

### Terrafrom

For larger regions with 250 or more hosts, it is recommended and more cost efficient to create a scanner per region and scan cross-account, rather than configuring one scanner per account.

**Option 1 (Recommended)**: Create an account dedicated to Agentless scanners, deploying a scanner for every region where there are scannable cloud resources.

The following diagram illustrates how Agentless scanning works when deployed in a central cloud account:

{{<img src="security/agentless_scanning/agentless_vulnerability_advanced.png" alt="Diagram of Agentless Vulnerability Scanning showing the Agentless scanner is deployed in a central Cloud account" width="100%">}}

**Option 2**: Deploy a scanner for every region where there are scannable cloud resources without creating an account dedicated to Agentless scanners.

**Are we missing a diagram for this ?**

See [enabling Agentless scanner with Terraform][5] for specific setup instructions. 

### AWS Integration

The UI deploy will automatically create a single scanner per account, which will scan across all of its regions:
The scanner will be deployed on the region that the customer requests
The method above is also as cost-effective as the Manual Setup options as long as customers have < 250 hosts per account, which we expect as we assume smaller customers will opt for UI setup.

We will inform customers that if they have more than 250 hosts in an account, that they opt for Manual setup to reduce monthly scanning costs.

The following diagram illustrates how Agentless scanning works when deployed within each Cloud account:

{{<img src="security/agentless_scanning/agentless_vulnerability_quickstart.png" alt="Diagram of Agentless Vulnerability Scanning showing the Agentless scanner is deployed in each Cloud account" width="100%" style="center">}}

Within the AWS integration in Datadog, after selecting the Cloud Formation template, and enabling [Remote Configuration][4] for your organization, Datadog updates the template with the necessary IAM permissions, and deploys a modified, standalone version of the Datadog Agent on an EC2 instance in your AWS Cloud account. Datadog scans the EBS volume to generate a [Software Bill of Materials (SBOM)][2], and sends the SBOM back to Datadog [Vulnerability Management][3], where you can investigate and remediate vulnerabilities. 

Scans occur every 12 hours.

**Note**: The actual data that is scanned remains within your infrastructure, and only the findings are reported back to Datadog.


- Resource Exclusion
- How to stop certain resources from being scanned
- How to disable


[1]: /security/vulnerabilities
[2]: https://www.cisa.gov/sbom
[3]: https://app.datadoghq.com/security/csm/vm
[4]: /agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[5]: https://github.com/DataDog/terraform-datadog-agentless-scanner/blob/main/README.md