---
aliases:
- npt-kg2-pv2
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: vpc
security: compliance
source: vpc
title: VPC flow logging is enabled in all VPCs
type: security_rules
---

## Description

VPC Flow Logs is a feature that enables you to capture information about the IP traffic going to and from network interfaces in your VPC. After you've created a flow log, you can view and retrieve its data in Amazon CloudWatch Logs. Enable VPC Flow Logs for packet "Rejects" for VPCs.

## Rationale

VPC Flow Logs provide visibility into network traffic that traverses the VPC and can be used to detect unusual traffic or insight during security workflows.

## Remediation

See the [CIS AWS Foundations Benchmark controls docs][1] for console remediation steps.

## Impact

By default, CloudWatch Logs will store Logs indefinitely unless you define a specific retention period for the log group. When choosing the number of days to retain, keep in mind that, on average, it takes an organization 210 days to detect a breach. Since additional time is required to research a breach, a minimum 365-day retention policy allows time for detection and research. You may also wish to archive the logs to a cheaper storage service rather than simply deleting them. See the following AWS resource to manage CloudWatch Logs retention periods: 

1. [http://docs.aws.amazon.com/AmazonCloudWatch/latest/DeveloperGuide/SettingLogRetention.html][2]

## Default Value

None

## References

1. CCE-79202-8 
2. CIS CSC v6.0 #6.5, #12.9 
3. [http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/flow-logs.html][3] 

## CIS Controls

6.2 Activate audit logging - Enable local logging on all systems and networking devices. 

12.5 Configure Monitoring Systems to Record Network Packets - Configure monitoring systems to record network packets passing through the boundary at each of the organization's network boundaries. 

[1]: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cis-controls.html#securityhub-cis-controls-2.9
[2]: http://docs.aws.amazon.com/AmazonCloudWatch/latest/DeveloperGuide/SettingLogRetention.html
[3]: http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/flow-logs.html
