---
aliases:
- 93d-bf1-e17
- /security_monitoring/default_rules/93d-bf1-e17
- /security_monitoring/default_rules/aws-cloudtrail-ami-made-public
disable_edit: true
iaas: aws
integration_id: ec2
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: ec2
security: attack
source: cloudtrail
tactic: TA0010-exfiltration
title: AWS AMI Made Public
type: security_rules
---

## Goal
Detect when an AMI is made public.

## Strategy
This rule lets you monitor these CloudTrail API calls to detect if an AMI is made public.

* [ModifyImageAttribute][1]

This rule inspects the `@requestParameters.launchPermission.add.items.group` array to determine if the string `all` is contained. This is the indicator which means the image is made public.

## Triage and response
1. Determine if the AMI (`@requestParameters.imageId`) should be made public using CloudTrail logs.
2. Investigate the following ARN (`{{@userIdentity.arn}}`) that made the AMI public.
3. Contact the user to see if they intended to make the image public.
4. If the user did not make the API call:
 * Rotate the credentials.
 * Investigate if the same credentials made other unauthorized API calls.

[1]: https://docs.aws.amazon.com/cli/latest/reference/ec2/modify-image-attribute.html#examples
