---
title: Set Up Data Security for Amazon S3
description: Scan Amazon S3 buckets for sensitive data with Data Security, using Agentless scanners deployed in your AWS account.
disable_toc: false
further_reading:
  - link: "/security/cloud_security_management/setup/agentless_scanning/enable/"
    tag: "Documentation"
    text: "Enable Agentless Scanning"
  - link: "/remote_configuration/"
    tag: "Documentation"
    text: "Remote Configuration"
  - link: "/security/data_security/findings/"
    tag: "Documentation"
    text: "Investigate Data Security findings"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Data Security is not available for the US1-FED Datadog site.</div>
{{< /site-region >}}

{{< callout url="https://www.datadoghq.com/product-preview/dspm/" btn_hidden="false" header="Join the Preview!">}}
Data Security is in Preview. To request access, fill out the form.
{{< /callout >}}

## Overview

Data Security scans Amazon S3 buckets with Agentless scanners. The scanners read up to 1,000 files per bucket and send only the match metadata to Datadog. Data Security scans each bucket at most once every 7 days.

Choose where the scanners run:

| | Scanners in your AWS account | Datadog-hosted scanners |
|---|---|---|
| **What runs where** | EC2 instances that you deploy in your AWS account | A disposable sandbox in Datadog's infrastructure. Nothing to deploy in your account. |
| **Does scanned data leave your AWS account?** | No | Yes. The scanner reads the files from Datadog's infrastructure. It holds the rows in memory only during the scan and stores only the match metadata. |
| **Cloud provider cost** | Compute and networking costs appear on your AWS bill. | No scanner instances run in your account. |

Data Security scans CSV, JSON, Parquet, plain text, and ZIP files. It skips images, binary files, and other formats.

## Prerequisites

- Your Datadog role has the Data Scanner Write permission.
- The scanners have the following permissions on the buckets to scan: `s3:GetObject`, `s3:ListBucket`, `kms:Decrypt`, and `kms:GenerateDataKey`. The CloudFormation templates and the Terraform module that Datadog provides include them.
- For scanners in your AWS account, [Remote Configuration][1] is enabled for your organization, and the API key used by the scanners has Remote Configuration enabled.
- For Datadog-hosted scanners, the [Datadog AWS integration][6] is set up for the account. Datadog-hosted scanners use the IAM role of the integration.

## Add an AWS account

### With scanners in your AWS account

1. Go to the [Data Security configuration page][2] and click the {{< ui >}}AWS{{< /ui >}} tab.
1. Add an AWS account. Choose one of the following methods:
   - **CloudFormation**, for a single account.
   - **Manual setup**, with the [Terraform module for Agentless scanners][3].
   - **Multiple accounts**, with a CloudFormation StackSet.
1. Follow the steps in the modal. For details on each method, see [Enable Agentless Scanning][4].

### With Datadog-hosted scanners

Datadog provides a CloudFormation template that attaches the Datadog Agentless Scanning policy for SaaS mode to the IAM role of your Datadog AWS integration. The policy includes the S3 and KMS permissions listed in the [prerequisites](#prerequisites). After the policy is attached, Datadog scans the account with Datadog-hosted scanners, and no scanner runs in the account.

### If the account already runs Agentless Scanning

If the AWS account already runs Agentless Scanning for Cloud Security, edit the account. Under {{< ui >}}Enable Sensitive Data Scanner{{< /ui >}}, turn on the {{< ui >}}Enabled{{< /ui >}} toggle.

## Choose the buckets to scan

On the {{< ui >}}AWS{{< /ui >}} tab, scanning groups define which buckets Data Security scans. In a scanning group, use the {{< ui >}}Define resources to scan{{< /ui >}} filters, including AWS tags, to select buckets. The preview lists the buckets that match the filters.

## Cloud provider cost

With scanners in your AWS account, standard AWS costs apply. To estimate them, contact your [Datadog Customer Success Manager][5].

## Disable scanning

1. Go to the [Data Security configuration page][2] and click the {{< ui >}}AWS{{< /ui >}} tab.
1. Edit the AWS account. Under {{< ui >}}Enable Sensitive Data Scanner{{< /ui >}}, turn off the {{< ui >}}Enabled{{< /ui >}} toggle.

To remove scanners that run in your AWS account, delete the CloudFormation stack, or the Terraform resources, that created them.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /remote_configuration/
[2]: https://app.datadoghq.com/sensitive-data-scanner/configuration/data-security/aws
[3]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner
[4]: /security/cloud_security_management/setup/agentless_scanning/enable/
[5]: mailto:success@datadoghq.com
[6]: /integrations/amazon_web_services/
