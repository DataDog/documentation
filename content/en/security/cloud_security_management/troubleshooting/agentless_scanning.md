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

After deploying Agentless Scanning, results do not appear immediately. The expected timeline is:

1. **0–15 minutes**: Cloud integration crawlers discover your resources.
2. **15–30 minutes**: Scanners begin creating snapshots and generating SBOMs. Each scanner processes up to 200 hosts per 15-minute cycle.
3. **30–60 minutes**: Vulnerability results begin appearing in the [CSM Vulnerabilities Explorer][2].

If no results appear after 2 hours:

- Verify that the scanner infrastructure was deployed. In your cloud provider console, check that scanner instances are running (for example, look for EC2 instances tagged with `DatadogAgentlessScanner:true` in AWS).
- Confirm that [Remote Configuration][3] is enabled on the API key used during setup. Scanners receive their scan instructions through Remote Configuration.
- Check that the cloud integration is properly configured by verifying that your cloud account appears on the [Cloud Security Setup][4] page with Agentless Scanning enabled.

## Deployment fails due to VPC creation restrictions

If your organization uses Service Control Policies (SCPs) that restrict VPC creation, scanner deployment fails because the scanner creates a new VPC by default.

**Solution**: Use the **existing VPC** option during setup to deploy the scanner into an existing VPC. See the [enterprise networking considerations][5] section of the deployment guide.

## Scanner capacity limits

If you observe that not all hosts are scanned within a 12-hour cycle:

- Each scanner processes up to 200 hosts per 15-minute cycle.
- Each region supports a maximum of 4 scanners (limited by cloud provider concurrent snapshot quotas).
- Scanner instances reboot every 24 hours for security updates. Pending scan queues reset during reboot, which may cause some hosts to be scanned in the next cycle.

If you have more than 20,000 hosts in a single region, contact [Datadog Support][1] to discuss options such as requesting a cloud provider snapshot limit increase.

<div class="alert alert-danger">Do not increase the Auto Scaling Group (ASG) desired count beyond 4 per region. Additional scanners cannot obtain snapshot capacity and automatically revert.</div>

## Scanner instances appear as vulnerable hosts

Agentless scanner instances are ephemeral EC2 instances (or equivalent) that run inside your cloud account. These instances may appear in your vulnerability findings.

To identify scanner instances in your vulnerability results:
- In the [CSM Vulnerabilities Explorer][2], filter by the tag `DatadogAgentlessScanner:true`.
- Scanner instances rotate every 24 hours and receive automatic security updates, so vulnerabilities on these instances are transient.

To exclude scanner instances from your vulnerability views, add `NOT tag:DatadogAgentlessScanner:true` to your search filter.

## Hosts with the Datadog Agent are not scanned

This is expected behavior. Agentless Scanning excludes hosts that have the Datadog Agent installed with SBOM collection enabled for [Vulnerability Management][6]. This prevents duplicate scanning.

Hosts that have the Datadog Agent installed **without** SBOM collection enabled are still scanned by Agentless Scanning.

## Cross-region scanning costs are higher than expected

If your cloud provider bill shows high cross-region data transfer costs, deploy additional scanners in regions with high host counts. Datadog recommends deploying a scanner in each region with more than 150 hosts. See [Deploying Agentless Scanning][7] for a complete deployment topology guide.

## GovCloud and FIPS

Agentless Scanning is not available in GovCloud because it requires [Remote Configuration][3], which is not available in GovCloud environments. Agentless Scanning is not FIPS compliant.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: https://app.datadoghq.com/security/csm/vm
[3]: /remote_configuration
[4]: https://app.datadoghq.com/security/configuration/csm/setup
[5]: /security/cloud_security_management/setup/agentless_scanning/deployment_methods#step-4-enterprise-networking-considerations
[6]: https://app.datadoghq.com/security/csm/vm
[7]: /security/cloud_security_management/setup/agentless_scanning/deployment_methods
