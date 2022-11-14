---
aliases:
- 29f-a5g-sr0
- /security_monitoring/default_rules/29f-a5g-sr0
- /security_monitoring/default_rules/cis-gcp-1.3.0-5.2
disable_edit: true
integration_id: google_storage_bucket
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_storage_bucket
title: Cloud storage buckets have uniform bucket-level access enabled
type: security_rules
---

## Description

Uniform bucket-level access is enabled on Cloud Storage buckets.

## Rationale

You should use uniform bucket-level access to unify and simplify how you grant
access to your Cloud Storage resources.
Cloud Storage offers two systems for granting users permission to access your buckets and
objects: 
- **Cloud Identity and Access Management (Cloud IAM)**: Used throughout Google Cloud, and allows you to grant a variety of permissions at the bucket and project levels. 
- **Access Control Lists(ACLs)**: Used only by Cloud Storage and has limited permission options, but allows you to grant permissions on a per-object basis.

These systems act in parallel. A user needs only one of the systems to grant them permission in order to access a Cloud Storage resource.  

To facilitate maintaining consistent permissions, Cloud Storage provides an option called Uniform bucket-
level access. Using this feature disables ACLs for all Cloud Storage resources. Access to

Cloud Storage resources then is granted exclusively through Cloud IAM. Enabling uniform
bucket-level access guarantees that if a Storage bucket is not publicly accessible, no object
in the bucket is publicly accessible either.

## Impact
If you enable uniform bucket-level access, you revoke access from users who gain their
access solely through object ACLs.
Certain Google Cloud services, such as Stackdriver, Cloud Audit Logs, and Datastore, cannot
export to Cloud Storage buckets that have uniform bucket-level access enabled.

## Remediation

## From the console
1. Open the Cloud Storage browser by visiting [https://console.cloud.google.com/storage/browser][1].
2. In the list of buckets, select the name of the desired bucket.
3. Select the Permissions tab.
4. In the text box that starts with This bucket uses fine-grained access control..., click **Edit**.
5. In the pop-up menu that appears, select Uniform.
6. Click **Save**.

## From the command line

Run the following command: 
   ```
   `gsutil uniformbucketlevelaccess set on gs://BUCKET_NAME/`
   ```


## Prevention
Set up an Organization Policy to enforce that any new bucket has uniform bucket-level access enabled. Read more about [Organization Policy constraints][2].

## Default

By default, Cloud Storage buckets do not have uniform bucket-level access enabled.


## References
1. [https://cloud.google.com/storage/docs/uniform-bucket-level-access][3]
2. [https://cloud.google.com/storage/docs/using-uniform-bucket-level-access][4]
3. [https://cloud.google.com/storage/docs/setting-org-policies#uniform-bucket][5]

## Additional Information
Uniform bucket-level access cannot be disabled if it has been active on a bucket for 90 consecutive days.

## CIS controls

Version 8, 3.3 - Configure Data Access Control Lists
- Configure data access control lists based on a user’s need to know. Apply data
access control lists, also known as access permissions, to local and remote file systems,
databases, and applications.

[1]: https://console.cloud.google.com/storage/browser
[2]: https://cloud.google.com/storage/docs/setting-org-policies#uniform-bucket
[3]: https://cloud.google.com/storage/docs/uniform-bucket-level-access
[4]: https://cloud.google.com/storage/docs/using-uniform-bucket-level-access
[5]: https://cloud.google.com/storage/docs/setting-org-policies#uniform-bucket
