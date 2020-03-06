---
title: AWS S3 Public Access Block Removed
kind: documentation
type: security_rules
parent: cloudtrail
security: compliance
service: s3.amazonaws.com
source: cloudtrail
meta_image: /images/integrations_logos/amazon_cloudtrail.png
---
## **Goal:**
Detect when the S3 Public Access Block configuration has been removed 

## **Strategy:**
Monitor CloudTrail and detect when S3 Public Access Block configuration has been removed via the following API call:
* [DeleteAccountPublicAccessBlock][1]

## **Triage & Response:**
1. Determine who the user was who made this API call.
2. Contact the user and inform them of best practices of enabling Public Access Block on S3 buckets.
3. Re-enable Public Access Block on the S3 bucket.

More details on S3 Public Block Public Access can be found [here][1].[1]: https://docs.aws.amazon.com/cli/latest/reference/s3api/delete-public-access-block.html
[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/access-control-block-public-access.html
