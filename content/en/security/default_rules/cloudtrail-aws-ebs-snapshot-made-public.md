---
aliases:
- f7b-f88-363
- /security_monitoring/default_rules/f7b-f88-363
- /security_monitoring/default_rules/cloudtrail-aws-ebs-snapshot-made-public
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
technique: T1537-transfer-data-to-cloud-account
title: AWS EBS Snapshot Made Public
type: security_rules
---

## Goal
Detect when an EBS snapshot is made public.

## Strategy
This rule lets you monitor these CloudTrail API calls to detect when an EBS snapshot is made public:

* [ModifySnapshotAttribute][1]

This rule inspects the `@requestParameters.createVolumePermission.add.items.group` array to determine if the string `all` is contained. This is the indicator which means the EBS snapshot is made public.

## Triage and response
1. Determine if the EBS snapshot should be made public.
2. Determine which user, `{{@@userIdentity.arn}}`,  in your organization made the EBS snapshot public.
3. Contact the user to see if they intended to make the EBS snapshot public.
4. If the user did not make the API call:
 * Rotate the credentials.
 * Investigate if the same credentials made other unauthorized API calls.

[1]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/modify-snapshot-attribute.html#examples
