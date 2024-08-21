---
title: Setting up AWS CloudTrail Logs for Cloud Security Management
aliases:
  - /security/cloud_security_management/setup/cloudtrail_logs
---

Set up AWS CloudTrail Logs to get the most out of [CSM Identity Risks][1]. AWS CloudTrail Logs provides additional insights into the actual usage of cloud resources, helping you identify users and roles with significant gaps between provisioned and utilized permissions.

## Prerequisites

To use AWS CloudTrail Logs with CSM Identity Risks, ensure that [Cloud SIEM][2] and the [AWS CloudTrail content pack][3] are enabled. If they are not already enabled, follow these steps:

1. Navigate to the [CSM Features][4] page.
1. Locate the AWS CloudTrail Logs card and click **Enable** to activate Cloud SIEM and the AWS CloudTrail content pack.

Complete the setup by installing the AWS integration and configuring log ingestion for AWS CloudTrail:

## Set up AWS integration using CloudFormation

{{% cloud-siem-aws-setup-cloudformation %}}

## Enable AWS CloudTrail logging

{{% cloud-siem-aws-cloudtrail-enable %}}

## Send AWS CloudTrail logs to Datadog

{{% cloud-siem-aws-cloudtrail-send-logs %}}

[1]: /security/cloud_security_management/identity_risks
[2]: /security/cloud_siem/
[3]: /security/cloud_siem/content_packs#aws-cloudtrail
[4]: https://app.datadoghq.com/security/configuration/csm/features