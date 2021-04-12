---
aliases:
- b4d-x7p-uxr
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: s3
security: compliance
source: s3
title: S3 bucket cannot be publicly listed
type: security_rules
---

## Description

Secure your AWS S3 bucket content as it is publicly accessible.

## Rationale

Granting `READ` access to everyone allows unauthorized users to list objects within a bucket. Malicious users can use information exploited during this process to access compromised objects, which can lead to unfettered access to your data.

## Remediation

### Console

Follow the [Blocking public access to your Amazon S3 storage][1] docs to learn how to manage access control lists for existing S3 buckets.

**Note**: By default, new buckets, access points, and objects don't allow public access.

### CLI

1. Run `put-bucket-acl` with [your S3 bucket name][2] and set the ACL of the bucket to `private`.

	{{< code-block lang="bash" filename="put-bucket-acl.sh" >}}

	aws s3api put-bucket-acl
		--bucket webapp-data-repository
		--acl private

	{{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-acl.html#synopsis
