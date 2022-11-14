---
aliases:
- 9e7-876-0ec
- /security_monitoring/default_rules/9e7-876-0ec
- /security_monitoring/default_rules/aws-bucket-acl-made-public
disable_edit: true
iaas: aws
integration_id: ec2
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: ec2
security: attack
source: cloudtrail
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: AWS S3 Bucket ACL Made Public
type: security_rules
---

## Goal
Detect when an S3 bucket policy is made public.

## Strategy
This rule lets you monitor these CloudTrail API calls to detect when an AWS bucket is made public:

* [PutBucketAcl][1]

This rule inspects the `@requestParameters.AccessControlPolicy.AccessControlList.Grant.Grantee.URI` array to determine if either of the strings are contained:
* `http://acs.amazonaws.com/groups/global/AuthenticatedUsers`
* `http://acs.amazonaws.com/groups/global/AllUsers`

A match of either of these string indicates the S3 bucket policy is made public.

## Triage and response
1. Determine if {{@userIdentity.arn}} is expected to perform the {{@evt.name}} API call.
2. Contact the principal owner and see if this was an API call that was made by the user.
3. If the API call was not made by the user, rotate the user credentials and investigate what other APIs were successfully accessed.
   * Rotate the credentials.
   * Investigate if the same credentials made other unauthorized API calls.

## Changelog
7 April 2022 - Update rule and signal message.

[1]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-acl.html
