---
aliases:
- 79d-8f7-432
- /security_monitoring/default_rules/79d-8f7-432
- /security_monitoring/default_rules/aws-cloudtrail-enabled
disable_edit: true
integration_id: cloudtrail
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: cloudtrail
title: CloudTrail multi-region is enabled
type: security_rules
---

## Description

Ensure that AWS CloudTrail is enabled.

## Rationale

AWS CloudTrail enables you to configure regions from one location to maintain infrastructure security.

## Remediation

### From the console

Follow the [AWS CloudTrail tutorial][1] docs to get started with CloudTrail.

### From the command line

1. Run `aws cloudtrail describe-trails`
2. Run `update-trail` on any returned trail name above to [enable multi-region-trail][2].

    {{< code-block lang="bash" filename="update-trail.sh" >}}
    aws cloudtrail update-trail
        --name GlobalTrailName
        --is-multi-region-trail
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-tutorial.html#tutorial-step2
[2]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail-by-using-the-aws-cli-update-trail.html
