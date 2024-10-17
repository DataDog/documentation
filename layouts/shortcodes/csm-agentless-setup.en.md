## Configuration

There are two ways to deploy Agentless scanners in your environment, manually using [Terraform][6], or by using the CloudFormation template with the [AWS Integration][7].

**Note**: When using Agentless Scanning, there are additional costs for running scanners in your cloud environments. To optimize on costs while being able to reliably scan every 12 hours, Datadog recommends to setup Agentless Scanning with Terraform as the default template, as this also avoids cross-region networking. 

To establish estimates on scanner costs, reach out to your [Datadog Sales][7] or [Customer Success][8] representative.

### Terraform

For larger regions with 250 or more hosts, it is recommended and more cost efficient to create a scanner per region and scan cross-account, rather than configuring one scanner per account.

**Option 1 (Recommended)**: Create an account dedicated to Agentless scanners, deploying a scanner for every region where there are scannable cloud resources. With this option, Datadog creates the central cloud account, and adds the scanning instances to this account.

The following diagram illustrates how Agentless scanning works when deployed in a central cloud account:

<img src="/images/security/agentless_scanning/agentless_vulnerability_advanced.png" alt="Diagram of Agentless Scanning showing the Agentless scanner is deployed in a central Cloud account" width="90%">

**Option 2**: Deploy a scanner for every region where there are scannable cloud resources _without_ creating an account dedicated to Agentless scanners. With this option, the central cloud account already exists in your environment and you can add scanning instances to this account.

#### Installation

See [enabling Agentless scanner with Terraform][5] for specific setup instructions. 

### AWS Integration

Within the AWS integration in Datadog, after selecting the Cloud Formation template, and enabling [Remote Configuration][4] for your organization, Datadog updates the template with the necessary IAM permissions, and deploys a single scanner per AWS account, which then scans across all of it's regions. Datadog scans the EBS volume to generate a [Software Bill of Materials (SBOM)][2], and sends the SBOM back to Datadog [Vulnerability Management][3], where you can investigate and remediate vulnerabilities. 

This method is preferred as an alternative and cost effective method over the manual setup (Terraform) option if you have less than 250 hosts per account.

The following diagram illustrates how Agentless scanning works when deployed within each Cloud account:

<img src="/images/security/agentless_scanning/agentless_vulnerability_quickstart.png" alt="Diagram of Agentless Scanning showing the Agentless scanner is deployed in each Cloud account" width="90%">

**Note**: The actual data that is scanned remains within your infrastructure, and only the findings are reported back to Datadog.

## Disabling Agentless Scanning
To disable Agentless Scanning through the cloud formation template, remove roles, or the EC2 scanner instance.

## Resource exclusion

To exclude volumes or Lambda resources in AWS, set the tag `DatadogAgentlessScanner:false`.



[1]: /security/vulnerabilities
[2]: https://www.cisa.gov/sbom
[3]: https://app.datadoghq.com/security/csm/vm
[4]: /agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[5]: https://github.com/DataDog/terraform-datadog-agentless-scanner/blob/main/README.md
[6]: /security/cloud_security_management/setup/agentless_scanning/#terraform
[7]: /security/cloud_security_management/setup/agentless_scanning/#aws-integration
[7]: mailto:sales@datadoghq.com
[8]: mailto:success@datadoghq.com

