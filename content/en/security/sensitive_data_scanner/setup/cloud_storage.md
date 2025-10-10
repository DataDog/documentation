---
title: Cloud Storage
disable_toc: false
aliases:
  - /sensitive_data_scanner/setup/cloud_storage
further_reading:
  - link: "/security/sensitive_data_scanner/scanning_rules/library_rules"
    tag: "Documentation"
    text: "Learn more about out-of-the-box library rules"
  - link: "/security/sensitive_data_scanner/scanning_rules/custom_rules"
    tag: "Documentation"
    text: "Learn more about creating custom rules"
---

## Overview

{{< callout url="https://www.datadoghq.com/product-preview/data-security/" header="Join the Limited Availability!"  >}}
Scanning support for Amazon S3 buckets and RDS instances is in Limited Availability. To enroll, click Request Access.
{{< /callout >}}

Deploy Datadog Agentless scanners in your environment to scan for sensitive information in your cloud storage resources. Agentless scanners are EC2 instances that you control and run within your environment. The scanners use [Remote Configuration][1] to retrieve a list of S3 buckets and RDS instances, as well as their dependencies. They scan many types of text files, such as CSVs and JSONs in your S3 buckets and tables in your RDS instances.

When an Agentless scanner finds a match with any of the [SDS library rules][2], the scanning instance sends the rule type and location of the match to Datadog. **Note**: Cloud storage resources and their files are only read in your environment - no sensitive data that was scanned is sent back to Datadog.

In the Sensitive Data Scanner [Findings page][3], you can see what cloud storage resources have been scanned and any matches found, including the rules that matched them.

This document walks you through:
- [Enabling Remote Configuration](#enable-remote-configuration) to use Sensitive Data Scanner for Cloud Storage
- [Security considerations](#security-considerations) to take into account when using Sensitive Data Scanner for Cloud Storage
- Deploying scanners to your environment using [CloudFormation](#automatically-deploy-scanners-using-cloudformation) or [Terraform](#manually-deploy-scanners-using-terraform)

## Enable Remote Configuration {#enable-remote-configuration}

Remote Configuration allows Datadog to send configuration data (such as which cloud storage resources to scan) to your deployed scanners. To use Sensitive Data Scanner in your AWS environments, you need to ensure that:
- Remote Configuration is enabled for your Datadog organization.
- You are using Remote-Configuration-enabled Datadog API keys for AWS accounts with scanners deployed to them.

Remote Configuration is enabled by default on most organizations. To verify this, navigate to the [Remote Configuration][4] settings page. If it is not enabled:
1. Ensure your RBAC permissions include [`org_management`][7].
1. From the Remote Configuration [setup page][5], click **Enable for your Organization** > **Next Step**.
1. Search for and select the API keys that you want to use with Remote Configuration and click **Enable Keys**. 
1. Click **Next Step** > **Done**. You do not need to configure Datadog components like the Agent or tracers.

**Notes**:
- Only AWS accounts that have scanners deployed to them need Remote-Configuration-enabled Datadog API keys.
- Only admins with `org_management` permissions can enable Remote Configuration for your organization. After Remote Configuration has been enabled, only users with `api_keys_write` permission can enable Remote Configuration for individual API keys.

## Security considerations {#security-considerations}

Because the scanner instances are potentially granted access to sensitive data, Datadog recommends restricting access to these instances solely to administrative users.

To further mitigate this risk, Datadog implements the following security measures:

- The Datadog scanner operates within your infrastructure, ensuring that all data, including sensitive data results, remain isolated and secure.
- All data transmission between the scanner and Datadog is encrypted using industry standard protocols (such as HTTPS) to ensure data confidentiality and integrity.
- Datadog carefully reviews and limits the permissions needed by the scanner to ensure that it can conduct scans without unnecessary access. This means the scanner operates under the principle of least privilege and is granted only the minimum permissions necessary to perform effectively.
- Unattended security updates are enabled on Datadog's scanner instances. This feature automates the process of installing critical security patches and updates without requiring manual intervention.
- The Datadog scanner instances are automatically rotated every 24 hours. This rotation ensures that the scanner instances are continually updated with the latest Ubuntu images.
- Access to the scanner instances is tightly controlled through the use of security groups. No inbound access to the scanner is allowed, further reducing the risk of compromising the instance.

To scan Amazon S3 buckets, these permissions are required:

- `s3:GetObject`
- `s3:ListBucket`
- `kms:Decrypt`
- `kms:GenerateDataKey`

## Deploy scanners

Agentless scanners are EC2 instances that run in your environment. They scan your S3 buckets and the tables in your RDS instances for sensitive information.

There are two methods for deploying scanners to your environment:
- [Automatically deploy using CloudFormation](#automatically-deploy-scanners-using-cloudformation)
- [Manually deploy using Terraform](#manually-deploy-scanners-using-terraform)

### Automatically deploy scanners using CloudFormation {#automatically-deploy-scanners-using-cloudformation}

When you deploy Agentless scanners using CloudFormation, a single scanner is created per account and scans across all of the account's regions. You set the region that the scanner is deployed on.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-account.png" alt="Diagram showing a scanner in each account scanning across regions within that account" style="width:100%;" >}}

You can add a scanner to a new AWS account or an existing AWS account.

{{< tabs >}}
{{% tab "New AWS account" %}}

1. Navigate to the [Sensitive Data Scanner][1] settings page.
1. On the **Storage** tab, in the **Cloud Settings** section, click **Add AWS accounts by following these steps**.
1. Leave **Automatically using CloudFormation** enabled.
1. Select the AWS region in the dropdown menu.
1. Select an API key that is already configured for Remote Configuration. If the API key you select does not have Remote Configuration enabled, Remote Configuration is automatically enabled for that key upon selection. **Note**: Only users with `api_keys_write` permissions can enable Remote Configuration for individual API keys.
1. If you want to send AWS logs to Datadog, leave **Yes** selected.
1. Select **Yes** if you want to use Datadog Cloud Security.
1. **Enable Sensitive Data Scanner** is automatically selected by default. This tells CloudFormation to add the AWS Managed SecurityAudit policy to your Datadog AWS Integration role and enable Agentless Scanning to start scanning your cloud data stores.
1. Click **Launch CloudFormation Template**.

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/data-security

{{% /tab %}}
{{% tab "Existing AWS account" %}}

1. Navigate to the [Sensitive Data Scanner][1] settings page.
1. On the **Storage** tab, in the **AWS** section:
    - If you have Agentless scanning already enabled in an account:
      1. Click the pencil icon for the account.
      1. Toggle **Enable Sensitive Data Scanning** on to add the scanner to the account.
      1. Click **Save**.
    - If you don't have Agentless scanning enabled in an account:
      1. Click on the plus icon for the account you want to enable sensitive data scanning for.
      1. Select that you want to add the scanner using CloudFormation.
      1. Select the AWS region in the dropdown menu.
      1. Select an API key that is already configured for Remote Configuration. If the API key you select does not have Remote Configuration enabled, Remote Configuration is automatically enabled for that key upon selection.
      1. Toggle **Enable Sensitive Data Scanning** on to add the scanner to the account.
      1. Click **Launch CloudFormation Template**.

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/data-security

{{% /tab %}}
{{< /tabs >}}

### Manually deploy scanners using Terraform {#manually-deploy-scanners-using-terraform}

You can deploy Agentless scanners using the [Terraform Module Datadog Agentless Scanner][7]. Datadog recommends that you choose one of these two setup options if you manually deploy scanners:

- Create an AWS account dedicated to Agentless scanners. Deploy a scanner for every region that has cloud resources you want to scan.

  {{< img src="/sensitive_data_scanner/setup/cloud_storage/central-scanner.png" alt="Diagram showing a central scanner for a region and the scanner scanning across different accounts" style="width:100%;" >}}

- Deploy a scanner for every region that has cloud resources that you want to scan.

  {{< img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-region.png" alt="Diagram showing a scanner in each region that scans accounts within that region" style="width:100%;" >}}

## Scanning groups

In the [Cloud Storage][6] settings page, the **Scanning Groups** section is read-only. All [library rules][2] are applied within the scanning group.

## Cloud service provider cost

When using Agentless Scanning, there are additional costs for running scanners in your cloud environments.

To establish estimates on scanner costs, reach out to your [Datadog Customer Success Manager][8].

## Disable Agentless scanning

1. Navigate to the [Sensitive Data Scanner][6] settings page.
1. Click the pencil icon next to the account for which you want to disable Agentless scanning.
1. Toggle **Enable Sensitive Data Scanning** to off.

## Uninstall Agentless scanning

To uninstall Agentless Scanning, log in to your AWS console and delete the CloudFormation stack created for Agentless Scanning.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /remote_configuration
[2]: /security/sensitive_data_scanner/scanning_rules/library_rules/
[3]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/data-security
[4]: https://app.datadoghq.com/organization-settings/remote-config
[5]: https://app.datadoghq.com/organization-settings/remote-config/setup
[6]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/data-security
[7]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner
[8]: mailto:success@datadoghq.com
[9]: /account_management/rbac/permissions#access-management