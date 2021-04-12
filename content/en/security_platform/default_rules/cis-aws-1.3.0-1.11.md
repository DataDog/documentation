---
aliases:
- 5nr-ef7-a72
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: iam
security: compliance
source: iam
title: Access keys are not created for IAM user during initial set up
type: security_rules
---

## Description

AWS console defaults to no check boxes selected when creating a new IAM user. When creating the IAM user credentials, you have to determine what type of access they require.

**Programmatic access**: The IAM user might need to make API calls, use the AWS CLI, or use the Tools for Windows PowerShell. In that case, create an access key (access key ID and a secret access key) for that user.

**AWS Management Console access**: If the user needs to access the AWS Management Console, create a password for the user.

## Rationale

Requiring the additional steps be taken by the user for programmatic access after their profile has been created will give a stronger indication of intent that access keys are necessary for their work and once the access key is established on an account that the keys may be in use somewhere in the organization.

**Note**: Even if it is known the user will need access keys, require them to create the keys themselves or put in a support ticket to have them created as a separate step from user creation.

## Remediation

See the [CIS AWS Foundations Benchmark controls docs][1] for console remediation steps.

## Impact

None

## Default Value

None

## References

1. [https://docs.aws.amazon.com/cli/latest/reference/iam/delete-access-key.html][2]
2. [https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html][3]

**Additional Information**: Credential report does not appear to contain "Key Creation Date"

## CIS Controls

Version 7, 16 - Account Monitoring and Control

[1]: https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-cis_aws_benchmark_level_1.html
[2]: https://docs.aws.amazon.com/cli/latest/reference/iam/delete-access-key.html
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html
>>>>>>> 5084a78f22ec1dd30217cf6705e6243d95ca6a29
