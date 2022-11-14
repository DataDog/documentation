---
aliases:
- hkp-p6b-f7w
- /security_monitoring/default_rules/hkp-p6b-f7w
- /security_monitoring/default_rules/cis-aws-1.3.0-1.20
disable_edit: true
integration_id: s3
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: s3
title: S3 bucket is configured with 'Block public access'
type: security_rules
---

## Description

Amazon S3 provides `Block public access (bucket settings)` and `Block public access (account settings)` to help you restrict unintended public access to Amazon S3 resources. By default, S3 buckets and objects are created without public access. However, someone with sufficient permissions can enable public access at the bucket or object level, often unexpectedly. While enabled, `Block public access (bucket settings)` prevents an individual bucket, and its contained objects, from becoming publicly accessible. Similarly, `Block public access (account settings)` prevents all buckets in the account, and contained objects, from becoming publicly accessible.

## Rationale

Amazon S3 `Block public access (bucket settings)` prevents the accidental or malicious public exposure of data contained within the respective buckets. Amazon S3 `Block public access (account settings)` prevents the accidental or malicious public exposure of data contained within all buckets of the respective AWS account. Blocking public access to all or some buckets is an organizational decision that should be based on data sensitivity, least privilege, and use case.

### Impact

When you apply `Block Public Access` settings to an account, the settings apply to all AWS Regions globally. The settings might not take effect in all Regions immediately or simultaneously, but they eventually propagate to all Regions.


## Remediation

### From the console

If utilizing Block Public Access (account settings):

1. Login to AWS Management Console and open the Amazon S3 console page by visiting: [https://console.aws.amazon.com/s3/][1].
2. Choose **Block public access (account settings)**.
3. Choose **Edit** to change the block public access settings for all the buckets in your AWS account.
4. Click on **Block all public access**.
5. When you're asked for confirmation, enter `confirm`. Then click Confirm to save your changes.

If utilizing Block public access (bucket settings):

1. Login to AWS Management Console and open the Amazon S3 console page by visiting: [https://console.aws.amazon.com/s3/][1].
2. Select the check box next to the bucket.
3. Click on **Edit public access settings**.
4. Click **Block all public access**.
5. Repeat for all the buckets in your AWS account that contain sensitive data.


### From the command line

If utilizing Block Public Access (bucket settings):

1. List all of the S3 buckets: `aws s3 ls`
2. To set the public access to true on a bucket, run: `aws s3api put-public-access-block --bucket <name-of-bucket> --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"`

If utilizing Block Public Access (account settings):

To set Public access settings for this account, run the following command: `aws s3control put-public-access-block --public-access-block-configuration BlockPublicAcls=true, IgnorePublicAcls=true, BlockPublicPolicy=true, RestrictPublicBuckets=true --account-id <value>'`

## References

1. [https://docs.aws.amazon.com/AmazonS3/latest/user-guide/block-public-access-account.html][2]

[1]: https://console.aws.amazon.com/s3/
[2]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/block-public-access-account.html
