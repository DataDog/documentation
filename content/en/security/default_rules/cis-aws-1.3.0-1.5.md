---
aliases:
- 8yh-cqk-qbn
- /security_monitoring/default_rules/8yh-cqk-qbn
- /security_monitoring/default_rules/cis-aws-1.3.0-1.5
disable_edit: true
integration_id: iam
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: iam
title: MFA is enabled for the "root" account
type: security_rules
---

## Description

The root account is the most privileged user in an AWS account. MFA (multi-factor authentication) adds an extra layer of protection on top of a user name and password. With MFA enabled, when a user signs in to an AWS website, they are prompted for their user name and password and an authentication code from their AWS MFA device.

**Note**: When virtual MFA is used for root accounts, it should not be enabled on a personal device, but rather enable a dedicated and not personally owned mobile device (tablet or phone)("non-personal virtual MFA"). This lessens the risks of losing access to the MFA due to device loss, device trade-in, or if the individual owning the device is no longer employed at the company.

## Rationale

Enabling MFA provides increased security for console access as it requires the authenticating principal to possess a device that emits a time-sensitive key and has knowledge of a credential.

## Remediation

See the [CIS AWS Foundations Benchmark controls docs][1] for console remediation steps.

## Impact

None

## Default value

None

## References

1. CCE-78911-5
2. [https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_mfa][2]
3. [https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html#enable-virt-mfa-for-root][3]

**Additional Information**: IAM User account "root" for us-gov cloud regions does not have console access. This control is not applicable for us-gov cloud regions.

## CIS controls

Version 7, 4.5 - Use Multifactor Authentication For All Administrative Access - Use multi-factor authentication and encrypted channels for all administrative account access.

[1]: https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-cis_aws_benchmark_level_1.html
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_mfa
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html#enable-virt-mfa-for-root
