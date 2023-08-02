---
dependencies: []
disable_edit: true
---
# aws_s3_account_public_access_block

## `account_id`
**Type**: `STRING`<br>
## `block_public_acls`
**Type**: `BOOLEAN`<br>
**Provider name**: `BlockPublicAcls`<br>
**Description**: Specifies whether Amazon S3 should block public access control lists (ACLs) for buckets in this account. Setting this element to <code>TRUE</code> causes the following behavior: <ul> <li> PUT Bucket acl and PUT Object acl calls fail if the specified ACL is public. </li> <li> PUT Object calls fail if the request includes a public ACL. </li> <li> PUT Bucket calls fail if the request includes a public ACL. </li> </ul> <p>Enabling this setting doesn't affect existing policies or ACLs. This is not supported for Amazon S3 on Outposts.</p>
## `block_public_policy`
**Type**: `BOOLEAN`<br>
**Provider name**: `BlockPublicPolicy`<br>
**Description**: Specifies whether Amazon S3 should block public bucket policies for buckets in this account. Setting this element to <code>TRUE</code> causes Amazon S3 to reject calls to PUT Bucket policy if the specified bucket policy allows public access.  Enabling this setting doesn't affect existing bucket policies. This is not supported for Amazon S3 on Outposts.<br>
## `ignore_public_acls`
**Type**: `BOOLEAN`<br>
**Provider name**: `IgnorePublicAcls`<br>
**Description**: Specifies whether Amazon S3 should ignore public ACLs for buckets in this account. Setting this element to <code>TRUE</code> causes Amazon S3 to ignore all public ACLs on buckets in this account and any objects that they contain.  Enabling this setting doesn't affect the persistence of any existing ACLs and doesn't prevent new public ACLs from being set. This is not supported for Amazon S3 on Outposts.<br>
## `restrict_public_buckets`
**Type**: `BOOLEAN`<br>
**Provider name**: `RestrictPublicBuckets`<br>
**Description**: Specifies whether Amazon S3 should restrict public bucket policies for buckets in this account. Setting this element to <code>TRUE</code> restricts access to buckets with public policies to only Amazon Web Service principals and authorized users within this account. Enabling this setting doesn't affect previously stored bucket policies, except that public and cross-account access within any public bucket policy, including non-public delegation to specific accounts, is blocked. This is not supported for Amazon S3 on Outposts.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
