---
aliases:
- l3z-5m2-1qz
- /security_monitoring/default_rules/l3z-5m2-1qz
- /security_monitoring/default_rules/cis-gcp-1.3.0-5.1
disable_edit: true
integration_id: google_iam_policy
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_iam_policy
title: Cloud storage bucket is not anonymously or publicly accessible
type: security_rules
---

## Description
It is recommended that IAM policies on Cloud Storage buckets do not allow anonymous or public access.

## Rationale
With anonymous or public access, anyone has permission to access bucket content. Such access might not be desired if you are storing sensitive data, so ensure that anonymous or public access to a bucket is not allowed.

### Additional Information
To implement access restrictions on buckets, configuring Bucket IAM is preferred over configuring Bucket ACL. In the GCP console, the **Edit Permissions** button for a bucket exposes IAM configurations only. Bucket ACLs are configured to automatically implement and support user-enforced Bucket IAM policies. If an administrator changes a Bucket ACL using command-line gsutils or the API, the associated bucket IAM policy is also updated automatically.

### Impact
Storage buckets are not publicly accessible. You have to explicitly administer bucket access.

### Prevention
You can prevent Storage buckets from becoming publicly accessible by setting up the `Domain restricted sharing` organization policy at:
[https://console.cloud.google.com/iam-admin/orgpolicies/iam-allowedPolicyMemberDomains][2]

### Default value
By default, Storage buckets are not publicly accessible.

## Remediation

### From the console
1. Go to `Storage browser` at [https://console.cloud.google.com/storage/browser][1].
2. Click on the bucket name to access the `Bucket details` page.
3. Click on the `Permissions` tab.
4. Click the `Delete` button in front of `allUsers` and `allAuthenticatedUsers` to remove that particular role assignment.

### From the command line
Remove `allUsers` and `allAuthenticatedUsers` access.
``` 
gsutil iam ch -d allUsers gs://BUCKET_NAME
gsutil iam ch -d allAuthenticatedUsers gs://BUCKET_NAME
```

## References
1. [https://cloud.google.com/storage/docs/access-control/iam-reference][3]
2. [https://cloud.google.com/storage/docs/access-control/making-data-public][4]
3. [https://cloud.google.com/storage/docs/gsutil/commands/iam][5]


[1]: https://console.cloud.google.com/storage/browser
[2]: https://console.cloud.google.com/iam-admin/orgpolicies/iam-allowedPolicyMemberDomains
[3]: https://cloud.google.com/storage/docs/access-control/iam-reference
[4]: https://cloud.google.com/storage/docs/access-control/making-data-public
[5]: https://cloud.google.com/storage/docs/gsutil/commands/iam
