---
title: AWS S3 Bucket Policy Modified
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_cloudtrail/
src_img: /images/integrations_logos/amazon_cloudtrail.png
security: compliance
framework: cis
control: cis-3.8
source: cloudtrail
scope: s3
meta_image: /images/integrations_logos/amazon_s3.png
aliases:
- c70-8d3-554
---

## Overview

### Goal
Detect when a S3 Bucket policy is modified.

### Strategy
Monitor CloudTrail and detect when S3 policies are being modified via one of the following API calls:
* [PutBucketAcl][1]
* [PutBucketPolicy][2]
* [PutBucketCors][3]
* [PutBucketLifecycle][4]
* [PutBucketReplication][5]
* [DeleteBucketPolicy][6]
* [DeleteBucketCors][7]
* [DeleteBucketLifecycle][8]
* [DeleteBucketReplication][9]

### Triage & Response
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
[7]: 
[8]: https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketLifecycle.html
[9]: https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucketReplication.html
