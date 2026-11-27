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

{{< callout url="https://www.datadoghq.com/product-preview/dspm/" btn_hidden="false" header="Join the Preview!">}}
Data Security is in Preview. To request access, fill out the form.
{{< /callout >}}

## Overview

Data Security scans Amazon S3 buckets with Agentless scanners, EC2 instances that you deploy in your AWS account. The scanners read up to 1,000 files per bucket and send only the match metadata to Datadog. The scanned data doesn't leave your AWS account. Data Security scans each bucket at most once every 7 days.

Data Security scans CSV, JSON, Parquet, plain text, Microsoft Office (such as DOCX, XLSX, and PPTX), OpenDocument (such as ODT), and ZIP files. It skips images, binary files, and other formats.

## Prerequisites

- Your Datadog role has the Data Scanner Write permission.
- The scanners have the following permissions on the buckets to scan: `s3:GetObject`, `s3:ListBucket`, `kms:Decrypt`, and `kms:GenerateDataKey`. The CloudFormation templates and the Terraform module that Datadog provides include them.
- [Remote Configuration][1] is enabled for your organization, and the API key used by the scanners has Remote Configuration enabled.

## Costs

The scanners run in your AWS account, so their compute and networking costs appear on your AWS bill. To estimate them, contact your [Datadog Customer Success Manager][5].

## Add an AWS account

If the AWS account already runs Agentless Scanning for Cloud Security, you don't need to add it. On the {{< ui >}}AWS{{< /ui >}} tab of the [Data Security configuration page][2], edit the account. Under {{< ui >}}Enable Sensitive Data Scanner{{< /ui >}}, turn on the {{< ui >}}Enabled{{< /ui >}} toggle.

To add an AWS account:

1. Go to the [Data Security configuration page][2] and click the {{< ui >}}AWS{{< /ui >}} tab.
1. Add an AWS account. Choose one of the following methods:
   - {{< ui >}}CloudFormation{{< /ui >}}, for a single account.
   - {{< ui >}}Manual setup{{< /ui >}}, with the [Terraform module for Agentless scanners][3].
   - {{< ui >}}Multiple accounts{{< /ui >}}, with a CloudFormation StackSet.
1. Follow the steps in the dialog. For details on each method, see [Enable Agentless Scanning][4].

## Choose the buckets to scan

On the {{< ui >}}AWS{{< /ui >}} tab, scanning groups define which buckets Data Security scans. In a scanning group, use the {{< ui >}}Define resources to scan{{< /ui >}} filters, including AWS tags, to select buckets. The preview lists the buckets that match the filters.

## Disable scanning

1. Go to the [Data Security configuration page][2] and click the {{< ui >}}AWS{{< /ui >}} tab.
1. Edit the AWS account. Under {{< ui >}}Enable Sensitive Data Scanner{{< /ui >}}, turn off the {{< ui >}}Enabled{{< /ui >}} toggle.

To remove the scanners from your AWS account, delete the CloudFormation stack or Terraform resources that created them.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /remote_configuration/
[2]: https://app.datadoghq.com/sensitive-data-scanner/configuration/data-security/aws
[3]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner
[4]: /security/cloud_security_management/setup/agentless_scanning/enable/
[5]: mailto:success@datadoghq.com
