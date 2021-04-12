---
aliases:
- 79d-8f7-432
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: cloudtrail
security: compliance
source: cloudtrail
title: CloudTrail multi-region is enabled
type: security_rules
---

## Description

Ensure that AWS CloudTrail is enabled.

## Rationale

AWS CloudTrail enables you to configure regions from one location to maintain infrastructure security.

## Remediation

### Console

Follow the [AWS CloudTrail tutorial][3] docs to get started with CloudTrail.

### CLI

1. Run `aws cloudtrail describe-trails`
2. Run `update-trail` on any returned trail name above to [enable multi-region-trail][1].

    {{< code-block lang="bash" filename="update-trail.sh" >}}
    aws cloudtrail update-trail
        --name GlobalTrailName
        --is-multi-region-trail
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail-by-using-the-aws-cli-update-trail.html
