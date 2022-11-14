---
aliases:
- 748-vvi-4ye
- /security_monitoring/default_rules/748-vvi-4ye
- /security_monitoring/default_rules/cis-aws-1.3.0-3.3
disable_edit: true
integration_id: cloudtrail
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: cloudtrail
title: S3 bucket access logging is enabled on the CloudTrail S3 bucket
type: security_rules
---

## Description

S3 Bucket Access Logging generates a log that contains access records for each request made to your S3 bucket. An access log record contains details about the request, such as the request type, the resources specified in the request worked, and the time and date the request was processed. It is recommended that bucket access logging be enabled on the CloudTrail S3 bucket.

## Rationale

By enabling S3 bucket logging on target S3 buckets, it is possible to capture all events which may affect objects within any target buckets. Configuring logs to be placed in a separate bucket allows access to log information which can be useful in security and incident response workflows.

## Remediation

### From the console

1. Sign in to the AWS Management Console and open the S3 console at https://console.aws.amazon.com/s3.
2. Under All Buckets click on the target S3 bucket
3. Click on Properties in the top right of the console
4. Under Bucket: <s3_bucket_for_cloudtrail> click on Logging
5. Configure bucket logging and click on the Enabled checkbox
6. Select Target Bucket from list and enter a Target Prefix
7. Click Save

## Default value

Logging is disabled.

## References

1. CCE-78918-0
2. https://docs.aws.amazon.com/AmazonS3/latest/dev/ServerLogs.html

## CIS controls

Version 7

6.2 - Activate audit logging: Ensure that local logging has been enabled on all systems and networking devices.

14.9 Enforce Detail Logging for Access or Changes to Sensitive Data: Enforce detailed audit logging for access to sensitive data or changes to sensitive data (utilizing tools such as File Integrity Monitoring or Security Information and Event Monitoring).
