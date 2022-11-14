---
aliases:
- tcg-c9p-gh4
- /security_monitoring/default_rules/tcg-c9p-gh4
- /security_monitoring/default_rules/cis-aws-1.3.0-2.1.1
disable_edit: true
integration_id: s3
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: s3
title: S3 bucket employs default encryption at-rest
type: security_rules
---

## Description

Amazon S3 provides a variety of no-cost or low-cost encryption options to protect data at rest.

## Rationale

Encrypting data at rest reduces the likelihood that it is unintentionally exposed and can nullify the impact of disclosure if the encryption remains unbroken.

## Remediation

### From the console

1. Login to AWS Management Console and open the Amazon S3 console using https://console.aws.amazon.com/s3/
2. Select the Check box next to the Bucket.
3. Click on Properties.
4. Click on Default Encryption.
5. Select either AES-256 or AWS-KMS.
6. Click Save.
7. Repeat for all the buckets in your AWS account lacking encryption.

### From the command line

Run one of the following commands: 

`aws s3api put-bucket-encryption --bucket <bucket name> --server-side-encryption-configuration ''{"Rules": [{"ApplyServerSideEncryptionByDefault": {"SSEAlgorithm": "AES256"}}]}''`

or:

`aws s3api put-bucket-encryption --bucket <bucket name> --server-side-encryption-configuration ''{"Rules": [{"ApplyServerSideEncryptionByDefault": {"SSEAlgorithm": "aws:kms","KMSMasterKeyID": "aws/s3"}}]}''`

**Note**: The `KMSMasterKeyID` can be set to the master key of your choosing; `aws/s3` is an AWS preconfigured default.

## References

1. [https://docs.aws.amazon.com/AmazonS3/latest/user-guide/default-bucket-encryption.html][1]
2. [https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-encryption.html#bucket-encryption-related-resources][2]

**Additional Information**: S3 bucket encryption only applies to objects as they are placed in the bucket. Enabling S3 bucket encryption does not encrypt objects previously stored within the bucket.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/default-bucket-encryption.html
[2]: https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-encryption.html#bucket-encryption-related-resources
