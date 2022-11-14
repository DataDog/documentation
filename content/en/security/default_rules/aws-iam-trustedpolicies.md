---
aliases:
- 7hk-tff-0fv
- /security_monitoring/default_rules/7hk-tff-0fv
- /security_monitoring/default_rules/aws-iam-trustedpolicies
disable_edit: true
integration_id: iam
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: iam
title: IAM role uses trusted principals
type: security_rules
---

## Description

IAM roles must have a [trust policy][1] which defines the principals who are trusted to assume that role. It is possible to specify a [wildcard principal][2] which permits any principal (including those outside your organization) the ability to assume the role. It is strongly discouraged to use the wildcard principal in a trust policy unless there is a [Condition element][3] to restrict access.
## Rationale

A trust policy with a wildcard principal permits any AWS account the ability to assume the role, it is therefore discouraged.

## Remediation

Ensure the identified role does not have a principal value of `"AWS": "*"`. If a wildcard principal is necessary, use a Condition element to restrict access. Follow the [AWS documentation][1] to properly scope the `Principal` policy element.

### From the console

1. From the AWS Console, navigate to the IAM role you would like to change.
2. Click the `Trust relationships` tab from the role page.
3. Click the `Edit trust policy` button.
4. Make changes to the trust policy to remediate the risk.
5. Click `Update policy` to save changes.

### From the command line

1. Use the `update-assume-role-policy` action to [update the role trust policy][2] to remediate the risk. Example:

{{< code-block lang="bash" >}}
aws iam update-assume-role-policy
    --role-name Test-Role
    --policy-document file://New-Role-Policy.json
{{< /code-block >}}

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/update-assume-role-policy.html

## References

1. [https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_terms-and-concepts.html#term_trust-policy][1]
2. [https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#principal-anonymous][2]
3. [https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_condition.html][3]

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_terms-and-concepts.html#term_trust-policy
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#principal-anonymous
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_condition.html
