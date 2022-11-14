---
aliases:
- c70-8d3-554
- /security_monitoring/default_rules/c70-8d3-554
- /security_monitoring/default_rules/aws-s3-bucket-policy-modified
control: '4.8'
disable_edit: true
framework: cis-aws
iaas: aws
integration_id: s3
kind: documentation
requirement: Monitoring
rule_category:
- Cloud SIEM (Log Detection)
scope: s3
security: compliance
source: cloudtrail
title: S3 bucket policy modified
type: security_rules
---

## Goal
Detect when a S3 Bucket policy is modified.

## Strategy
Monitor CloudTrail and detect when S3 policies are being modified via one of the following API calls:
* [PutBucketAcl][1]
* [PutBucketPolicy][2]
* [PutBucketCors][3]
* [PutBucketLifecycle][4]
* [PutBucketReplication][5]
* [DeleteBucketPolicy][6]
* [DeleteBucketCors][7]
* [DeleteBucketReplication][8]

## Triage and response
1. Determine who the user was who made this API call.
2. Contact the user and see if this was an API call which was made by the user.
3. If the API call was not made by the user:
   * Rotate the user credentials and investigate what other API calls.
   * Determine what other API calls the user made which were not made by the user.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketAcl.html
 [2]: https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketPolicy.html
 [3]: https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketCors.html
 [4]: https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketLifecycle.html
 [5]: https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketReplication.html
 [6]: https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketPolicy.html
 [7]: https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketCors.html
 [8]: https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketReplication.html

## Changelog
18 March 2022 - Updated signal message, query and severity.
