---
aliases:
- bcz-prk-dr6
- /security_monitoring/default_rules/bcz-prk-dr6
- /security_monitoring/default_rules/cis-aws-1.3.0-1.14
disable_edit: true
integration_id: iam
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: iam
title: Access keys are rotated every 90 days or less
type: security_rules
---

## Description

Access keys consist of an access key ID and secret access key, which are used to sign programmatic requests that you make to AWS. AWS users need their own access keys to make programmatic calls to AWS from the AWS Command Line Interface (AWS CLI), Tools for Windows PowerShell, the AWS SDKs, or direct HTTP calls using the APIs for individual AWS services. You should regularly rotate all access keys.

## Rationale

Rotating access keys reduces the window of opportunity for an access key that is associated with a compromised or terminated account to be used. Access keys should be rotated to ensure that data cannot be accessed with an old key that might have been lost, cracked, or stolen.

## Remediation

See the [CIS AWS Foundations Benchmark controls docs][1] for console remediation steps.

## Impact

None

## Default value

None

## References

1. CCE-78902-4
2. [https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#rotate-credentials][2]
3. [https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_finding-unused.html][3]
4. [https://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html][4]
5. [https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html][5]

## CIS controls

16 Account Monitoring and Control

[1]: https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-cis_aws_benchmark_level_1.html
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#rotate-credentials
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_finding-unused.html
[4]: https://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html
