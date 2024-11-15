---
title: Setting up AWS CloudTrail Logs for Cloud Security Management
---

Set up AWS CloudTrail Logs to get the most out of [CSM Identity Risks][1]. AWS CloudTrail Logs provides additional insights into the actual usage of cloud resources, helping you identify users and roles with significant gaps between provisioned and utilized permissions.

## Set up AWS integration using CloudFormation

{{% cloud-siem-aws-setup-cloudformation %}}

## Enable AWS CloudTrail logging

{{% cloud-siem-aws-cloudtrail-enable %}}

## Send AWS CloudTrail logs to Datadog

{{% cloud-siem-aws-cloudtrail-send-logs %}}

[1]: /security/cloud_security_management/identity_risks
