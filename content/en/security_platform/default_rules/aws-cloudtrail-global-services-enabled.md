---
aliases:
- 6c6-101-b03
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: cloudtrail
security: compliance
source: cloudtrail
title: CloudTrail global services are enabled
type: security_rules
---

## Description

Ensure that an AWS CloudTrail trail has global service events enabled.

## Rationale

Easily troubleshoot security issues for global services that aren't region-specific.

## Remediation

### Console

By default, trail logs created in the CloudTrail console log global service events. For more information, see the [About global service events][1] docs.

### CLI

1. Run `aws cloudtrail describe-trails`
2. Run `update-trail` on any returned trail name above to [include-global-service-events][2].

    {{< code-block lang="bash" filename="update-trail.sh" >}}
    aws cloudtrail update-trail
        --name GlobalTrailName
        --include-global-service-events
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-global-service-events
[2]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail-by-using-the-aws-cli-update-trail.html
