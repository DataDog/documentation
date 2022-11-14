---
aliases:
- 8b7-d38-74d
- /security_monitoring/default_rules/8b7-d38-74d
- /security_monitoring/default_rules/aws-s3-buckets-enumerated
disable_edit: true
iaas: aws
integration_id: s3
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: s3
security: attack
source: cloudtrail
tactic: TA0007-discovery
technique: T1083-file-and-directory-discovery
title: An EC2 instance attempted to enumerate S3 bucket
type: security_rules
---

## Goal
Detect when an EC2 instance makes an API call to AWS to list all of the S3 Buckets.

## Strategy
This rule lets you monitor CloudTrail to detect a [ListBuckets][1] API call with the session name prefixed with `i-`. A session name prefixed with `i-` typically indicates that it is an EC2 instance using an [Instance Profile][2] to communicate with other AWS services, which is a common attacker technique to see the full list of S3 buckets in your AWS account.

## Triage and response
1. Determine if the EC2 instance should be making this API call.
* If **not a legitimate** user/application, rotate the credentials, verify what else may have been accessed and open an investigation into how this instance was compromised.
* If a **legitimate** user/application on the EC2 instance is making the `ListBuckets` API call, consider whether this API call is really needed.  

[1]: https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBuckets.html
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#ec2-instance-profile

## Changelog
18 March 2022 - Updated rule severity and rule name.
