---
aliases:
- eag-4ke-cj4
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: elb
security: compliance
source: elb
title: ELB generating access logs
type: security_rules
---

## Description

Set up logging for your AWS Elastic Load Balancers (ELBs) to identify security issues.

## Rationale

Access logs allow you to analyze each TCP and HTTP request, which are useful during security audits or troubleshooting.

## Remediation

### Console

Follow the [Enable access logs for your Classic Load Balancer][1] docs to learn how to enable logging for your ELBs.

### CLI

1. Run `create-bucket` to [create an S3 bucket][2] that stores the ELB log files.

**Note**: This bucket must be created in the same region as the ELB.

    {{< code-block lang="bash" filename="create-bucket.sh" >}}
    aws s3api create-bucket
    --region us-west-1
    --bucket your-elb-logging-bucket
    {{< /code-block >}}

2. Use the [AWS Policy Generator][3] to create a new policy.

3. Run `put-bucket-policy` to [attach the policy document][4] to the S3 bucket.

    {{< code-block lang="bash" filename="put-bucket-policy.sh" >}}
    aws s3api put-bucket-policy
        --bucket your-elb-logging-bucket
        --policy file://elb-logging-policy.json
    {{< /code-block >}}

4. Run `modify-load-balancer-attributes` to [enable logging][5] for the selected ELB.

    {{< code-block lang="bash" filename="modify-load-balancer-attributes.sh" >}}
    aws elb modify-load-balancer-attributes
        --region us-west-1
        --load-balancer-name YourLoadBalancerName
        --load-balancer-attributes
        "{\"AccessLog\":{\"Enabled\":true,\"EmitInterval\":60,\"S3BucketName\":\"your-logging-bucket\"}}"
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/enable-access-logs.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/create-bucket.html
[3]: http://awspolicygen.s3.amazonaws.com/policygen.html
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-policy.html
[5]: https://docs.aws.amazon.com/cli/latest/reference/elb/modify-load-balancer-attributes.html
