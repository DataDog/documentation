---
aliases:
- 5p8-ior-12f
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: IAM
security: compliance
source: IAM
title: IAM role policy adheres to least privilege principle
type: security_rules
---

## Description

Update your IAM role to the principle of least privilege.

## Rationale

Using least privilege options for IAM roles reduces the risk of unauthorized access to your AWS resources and services.

## Remediation

### Console

Follow the [Creating IAM policies (console)][1] docs to learn how to access your IAM JSON policy in the AWS console. With each of these methods you can [grant least privilege][2] or grant only the permissions required for a user to perform a task by setting Actions. See the [IAM JSON policy elements: Action][3] docs for more information.

### CLI

1. If you have an existing policy, update your existing policy document with with an `Action` block that contains only the service actions you want to permit. If you do not have a policy, use the [AWS Policy Generator][4] or create your own IAM policy. Save it as a JSON file.

  {{< code-block lang="json" filename="your-iam-policy.json" >}}
  {
    ...
    "Statement": [
      {
        "Action": [
          "sqs:ReceiveMessage"
        ],
        "Effect": "Allow",
        "Resource": "*"
      }
    ]
  }
  {{< /code-block >}}

2. Run `create-policy-version` with the [policy ARN, policy JSON file, and set it as the `default` policy][5].

  {{< code-block lang="bash" filename="create-policy-version.sh" >}}
  aws iam create-policy-version
      --policy-arn arn:aws:iam::012345678901:policy/sqs-policy
      --policy-document file://your-iam-policy.json
      --set-as-default
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html#access_policies_create-start
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-validation.html
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_action.html
[4]: https://awspolicygen.s3.amazonaws.com/policygen.html
[5]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/create-policy-version.html#synopsis
