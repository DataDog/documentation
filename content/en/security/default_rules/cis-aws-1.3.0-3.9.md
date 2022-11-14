---
aliases:
- npt-kg2-pv2
- /security_monitoring/default_rules/npt-kg2-pv2
- /security_monitoring/default_rules/cis-aws-1.3.0-3.9
disable_edit: true
integration_id: vpc
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
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

## Default value

None

## References

1. CCE-79202-8 
2. [http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/flow-logs.html][2]

## CIS controls

Version 7:

6.2 - Activate audit logging - Enable local logging on all systems and networking devices.

12.5 - Configure Monitoring Systems to Record Network Packets - Configure monitoring systems to record network packets passing through the boundary at each of the organization's network boundaries.

[1]: https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-cis_aws_benchmark_level_1.html
[2]: http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/flow-logs.html
