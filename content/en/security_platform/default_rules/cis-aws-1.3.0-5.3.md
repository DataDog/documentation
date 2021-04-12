---
aliases:
- rx9-tkr-e6b
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: ec2
security: compliance
source: ec2
title: VPC default security groups restrict all traffic
type: security_rules
---

## Description

A VPC comes with a default security group whose initial settings deny all inbound traffic, allow all outbound traffic, and allow all traffic between instances assigned to the security group. If you don't specify a security group when you launch an instance, the instance is automatically assigned to this default security group. Security groups provide stateful filtering of ingress/egress network traffic to AWS resources. 

Set up your default security group to restrict all traffic. The default VPC in every region should have its default security group updated to comply. Any newly created VPCs automatically contain a default security group that needs remediation to comply with this recommendation. 

**Note**: When implementing this recommendation, VPC flow logging is invaluable in determining the least privilege port access required by systems to work properly because it can log all packet acceptances and rejections occurring under the current security groups. This dramatically reduces the primary barrier to least privilege engineering - discovering the minimum ports required by systems in the environment. Even if the VPC flow logging recommendation in this benchmark is not adopted as a permanent security measure, it should be used during any period of discovery and engineering for least privileged security groups.

## Rationale

Configuring all VPC default security groups to restrict all traffic will encourage the least privileged security group development and mindful placement of AWS resources into security groups, which will reduce the exposure of those resources.

## Remediation

See the [CIS AWS Foundations Benchmark controls docs][1] for console remediation steps.

## Impact

Implementing this recommendation in an existing VPC containing operating resources requires extremely careful migration planning as the default security groups are likely to be enabling many ports that are unknown. Enabling VPC flow logging (of accepts) in an existing environment that is known to be breach free will reveal the current pattern of ports being used for each instance to communicate successfully.

## Default Value

None

## References

1. CCE-79201-0 
2. [http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html][2]
3. CIS CSC v6.0 #9.2

## CIS Controls

14.6 Protect Information through Access Control Lists - Protect all information stored on systems with file system, network share, claims, application, or database specific access control lists. These controls will enforce the principle that only authorized individuals should have access to the information based on their need to access the information as a part of their responsibilities.                

[1]: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cis-controls.html#securityhub-cis-controls-4.3
[2]: http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html
