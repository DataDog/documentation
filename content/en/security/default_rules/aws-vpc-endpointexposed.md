---
aliases:
- cut-36a-zvo
- /security_monitoring/default_rules/cut-36a-zvo
- /security_monitoring/default_rules/aws-vpc-endpointexposed
disable_edit: true
integration_id: vpc
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: vpc
title: VPC endpoint is not publicly accessible
type: security_rules
---

## Description

Secure your VPC endpoint by allowing access to only trusted AWS accounts.

## Rationale

VPC endpoints that are publicly accessible are at risk of data exposure, data loss, and unexpected AWS billing charges.

## Remediation

### From the console

Follow the [Add or remove permissions for your endpoint service][1] AWS console docs.

### From the command line

1. Edit your existing Amazon VPC endpoint access policy and replace untrusted AWS identifiers. To create a new policy document, [use the AWS policy generator][2].

  {{< code-block lang="bash" filename="vpc-access-policy.json" >}}
  {
    "Id": "VPCCrossAccountAccessPolicy",
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": "*",
        "Effect": "Allow",
        "Resource": "*",
        "Principal": {
          "AWS": [
            "arn:aws:iam::0123456789012:root"
          ]
        }
      }
    ]
  }
  {{< /code-block >}}

2. Run `modify-vpc-endpoint` with your [VPC endpoint ID and the updated or new policy document][3] to replace the existing policy.

  {{< code-block lang="bash" filename="modify-vpc-endpoint.sh" >}}
  aws ec2 modify-vpc-endpoint
      --vpc-endpoint-id vpce-0a12b345
      --policy-document file://vpc-access-policy.json
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/vpc/latest/privatelink/add-endpoint-service-permissions.html
[2]: https://awspolicygen.s3.amazonaws.com/policygen.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/modify-vpc-endpoint.html#synopsis
