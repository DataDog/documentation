---
aliases:
- hsh-y5w-hxe
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: iam
security: compliance
source: iam
title: Multi-factor authentication is enabled for all IAM users with a console password
type: security_rules
---

## Description

Multi-Factor Authentication (MFA) adds an extra layer of protection on top of a user name and password. With MFA enabled, when a user signs in to an AWS website, they will be prompted for their user name and password, and for an authentication code from their AWS MFA device. It is recommended that MFA be enabled for all accounts that have a console password.

## Rationale

Enabling MFA provides increased security for console access as it requires the authenticating principal to possess a device that emits a time-sensitive key and have knowledge of the credential.

## Remediation

See the [CIS AWS Foundations Benchmark controls docs][1] for console remediation steps.

## Impact

None

## Default Value

None

## References

1. [http://tools.ietf.org/html/rfc6238][2]
2. [http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html][3]
3. CCE-78901-6 4. CIS CSC v6.0 #5.6, #11.4, #12.6, #16.11

## CIS Controls

4.5 Use Multifactor Authentication For All Administrative Access - Use multi-factor authentication and encrypted channels for all administrative account access.

[1]: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cis-controls.html#securityhub-cis-controls-1.2
[2]: http://tools.ietf.org/html/rfc6238
[3]: http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html
