---
title: Troubleshooting Agentless Scanning
further_reading:
- link: "/security/cloud_security_management/setup/agentless_scanning"
  tag: "Documentation"
  text: "Setting up Agentless Scanning"
- link: "/security/cloud_security_management/setup/agentless_scanning/deployment_methods"
  tag: "Documentation"
  text: "Deploying Agentless Scanning"
---

## Overview

If you experience issues with Agentless Scanning, use the following troubleshooting guidelines. If you need further assistance, contact [Datadog Support][1].

## No results after deployment

After deploying Agentless Scanning, results do not appear immediately. First results typically appear within 30 minutes of deployment. In rare cases, such as IAM configuration issues, it can take up to two hours.

If no results appear after two hours:

- Verify that the scanner infrastructure was deployed. In your cloud provider console, check that scanner instances are running.
- Confirm that [Remote Configuration][3] is enabled on the API key you used to set up Agentless Scanning. Scanners receive their scan instructions through Remote Configuration.
- Check that the cloud integration is properly configured. On the [Cloud Security Setup][4] page, verify that your cloud account appears with Agentless Scanning enabled.

## Deployment fails due to VPC creation restrictions

If your organization is using Terraform and uses Service Control Policies (SCPs) that restrict Virtual Private Cloud (VPC) creation, scanner deployment fails because the scanner creates a new VPC by default.

To fix this, use the [**custom VPC**][8] option during setup to deploy the scanner into an existing VPC instead of creating a new one.

## Scanner instances appear as vulnerable hosts

Agentless scanner instances are ephemeral EC2 instances (or equivalent) deployed within your cloud account to perform scans. Because they run a standard operating system image (for example, the latest Ubuntu LTS), they may appear in vulnerability findings related to OS packages.

These findings reflect vulnerabilities identified in the underlying OS image and do not indicate a misconfiguration of your environment.

If desired, you can use tag-based filtering in the [Cloud Security Vulnerabilities Explorer][2] to exclude Datadog-managed scanner instances from your vulnerability views.

## Hosts with the Datadog Agent are not scanned

This is expected behavior. Agentless Scanning excludes hosts that have the Datadog Agent installed with [Cloud Security Vulnerabilities][6] enabled. This prevents duplicate scanning.

Hosts that have the Datadog Agent installed **without** Vulnerabilities features enabled are still scanned by Agentless Scanning.

## Unexpected cross-region scanning costs

In some deployments, cross-region data transfer may contribute to cloud provider network costs, depending on how scanners and resources are distributed across regions.

To optimize traffic locality, consider deploying scanners in regions that contain a significant number of hosts. As a general guideline, Datadog recommends deploying a scanner in each region that contains more than 150 hosts.

See [Deploying Agentless Scanning][7] for detailed guidance on recommended deployment topologies.

## Unavailable for GovCloud and FIPS

Agentless Scanning is not available in GovCloud because it requires [Remote Configuration][3], which is not available in GovCloud environments. Agentless Scanning is not FIPS compliant.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: https://app.datadoghq.com/security/csm/vm
[3]: /remote_configuration
[4]: https://app.datadoghq.com/security/configuration/csm/setup
[5]: /security/cloud_security_management/setup/agentless_scanning/deployment_methods#enterprise-networking-considerations
[6]: /security/cloud_security_management/vulnerabilities
[7]: /security/cloud_security_management/setup/agentless_scanning/deployment_methods
[8]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples/custom_vpc