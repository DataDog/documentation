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

- Check that the cloud integration is properly configured. On the [{{< ui >}}Cloud Security Setup{{< /ui >}}][4] page, verify that your cloud account appears with Agentless Scanning enabled.
- For **self-hosted scanning**, verify the following:
  - The scanner infrastructure was deployed. In your cloud provider console, check that scanner instances are running.
  - [Remote Configuration][3] is enabled on the API key you used to set up Agentless Scanning. Scanners receive their scan instructions through Remote Configuration.
- For **Datadog-hosted scanning**, verify the following:
  - The Datadog integration role is set up in your AWS account, and Datadog is collecting data from the account through the [AWS integration][13].
  - The Agentless Scanning managed IAM policy and the AWS managed `SecurityAudit` policy are attached to the Datadog integration role.
  - Scanning is enabled for the account:
    - If you set up scanning using CloudFormation, check the account's Agentless Scanning settings on the [{{< ui >}}Cloud Security Setup{{< /ui >}}][4] page, or use the [Agentless Scanning API][14].
    - If you set up scanning using Terraform, check the [`datadog_agentless_scanning_aws_scan_options`][15] resource for the account.
  - Datadog has detected any recent changes to the IAM role or policy. Detection can take some time after you make a change.

## Enable Remote Configuration on the API key

To authenticate and authorize Agentless scanners to receive scan instructions, enable Remote Configuration on the relevant API Key. Only users who have the [`api_keys_write`][9] RBAC permission can enable Remote Configuration on the API Key.

**Note:** If you have [`api_keys_write`][9] RBAC permission, but are missing Remote Configuration [Organization][10] level permissions, you cannot enable Remote Configuration on a new or an existing API Key. You only have permission to disable Remote Configuration on an existing API Key. To view and manage your organization's API Keys, see [API Keys][11] in Datadog.

## GCP: Failed to create state bucket (storage.buckets.create 403)

If the GCP Cloud Shell setup fails at **"{{< ui >}}Setting up Terraform state storage{{< /ui >}}"** with an error like:

```
Failed to create state bucket: datadog-agentless-tfstate-<project>
HTTPError 403: ... does not have storage.buckets.create access to the Google Cloud project.
```

the identity running the script does not have permission to create or manage GCS buckets in the scanner project.

**Fix (choose one):**

1. **Grant Storage permissions** on the scanner project to the user (or service account) running the script. For example, grant **Storage Admin** (`roles/storage.admin`) on that project, or a custom role that includes `storage.buckets.create`, `storage.buckets.get`, and `storage.buckets.update`.
2. **Reuse an existing bucket:** Use a bucket that already exists (create it with an identity that has Storage permissions if needed), then set `TF_STATE_BUCKET` to that bucket name when running the script. The script will use the existing bucket for Terraform state and will not try to create one.

## Deployment fails due to VPC creation restrictions

This issue applies to self-hosted scanners. If your organization is using Terraform and uses Service Control Policies (SCPs) that restrict Virtual Private Cloud (VPC) creation, scanner deployment fails because the scanner creates a new VPC by default.

To fix this, use the [**custom VPC**][8] option during setup to deploy the scanner into an existing VPC instead of creating a new one.

## Scanner instances appear as vulnerable hosts

Self-hosted Agentless scanner instances are ephemeral EC2 instances (or equivalent) deployed within your cloud account to perform scans. This issue does not apply to Datadog-hosted scanning, which runs no scanner instances in your account. Because they run a standard operating system image (for example, the latest Ubuntu LTS), they may appear in vulnerability findings related to OS packages.

These findings reflect vulnerabilities identified in the underlying OS image and do not indicate a misconfiguration of your environment.

Scanner instances are tagged `DatadogAgentlessScanner:true`. To exclude them from your vulnerability views, filter out this tag in the [{{< ui >}}Cloud Security Vulnerabilities Explorer{{< /ui >}}][2].

## Hosts with the Datadog Agent are not scanned

This is expected behavior. To prevent duplicate scanning, Agentless Scanning skips hosts where the Datadog Agent runs with both [Cloud Security Vulnerabilities][6] and Misconfigurations enabled.

If the Agent has only one of these features enabled, Agentless Scanning still scans the host for the other one.

## Unexpected cross-region scanning costs

In some self-hosted deployments, cross-region data transfer may contribute to cloud provider network costs, depending on how scanners and resources are distributed across regions.

To optimize traffic locality, consider deploying scanners in regions that contain a significant number of hosts. As a general guideline, Datadog recommends deploying a scanner in each region that contains more than 150 hosts.

See [Deploying Agentless Scanning][7] for detailed guidance on recommended deployment topologies.

## Unavailable for GovCloud and FIPS

Agentless Scanning is not available in GovCloud and is not FIPS compliant. This applies to both self-hosted and Datadog-hosted scanning.

## Scans run in a different region than your resources

With Datadog-hosted scanning, Datadog scans your resources in the region of your Datadog site, not the region where your resources are located. This is expected behavior. For details, see [Datadog-hosted data residency][12]. If your data must be processed in your own cloud account or region, use self-hosted scanning for that account.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: https://app.datadoghq.com/security/csm/vm
[3]: /remote_configuration
[4]: https://app.datadoghq.com/security/configuration/csm/setup
[5]: /security/cloud_security_management/setup/agentless_scanning/deployment_methods?agentless_scanner_hosting=self_hosted#enterprise-networking-considerations
[6]: /security/cloud_security_management/vulnerabilities
[7]: /security/cloud_security_management/setup/agentless_scanning/deployment_methods?agentless_scanner_hosting=self_hosted
[8]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples/custom_vpc
[9]: /account_management/rbac/permissions#api-and-application-keys
[10]: https://app.datadoghq.com/organization-settings/remote-config
[12]: /security/cloud_security_management/setup/agentless_scanning#datadog-hosted-data-residency
[11]: https://app.datadoghq.com/organization-settings/api-keys
[13]: /integrations/amazon_web_services/
[14]: /api/latest/agentless-scanning/#get-aws-scan-options
[15]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/agentless_scanning_aws_scan_options