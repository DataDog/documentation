---
aliases:
- cbw-8u3-g2h
- /security_monitoring/default_rules/cbw-8u3-g2h
- /security_monitoring/default_rules/cis-gcp-1.3.0-2.3
disable_edit: true
integration_id: google_logging_log_bucket
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_logging_log_bucket
title: Retention policies used for exporting logs are configured using the bucket
  lock on Cloud Storage buckets
type: security_rules
---

## Description
Enabling retention policies on log buckets protects logs stored in cloud storage buckets
from being overwritten or accidentally deleted. It is recommended to set up retention
policies and configure `Bucket Lock` on all storage buckets that are used as log sinks.

### Default value
By default, storage buckets used as log sinks do not have retention policies and `Bucket Lock`
configured.

## Rationale
Logs can be exported by creating one or more sinks that include a log filter and a
destination. As Cloud Logging receives new log entries, they are compared against each
sink. If a log entry matches a sink's filter, then a copy of the log entry is written to the
destination.
Sinks can be configured to export logs in storage buckets. It is recommended to configure a
data retention policy for these cloud storage buckets and to lock the data retention policy,
thus permanently preventing the policy from being reduced or removed. This way, if the
system is ever compromised by an attacker or a malicious insider who wants to cover their
tracks, the activity logs are definitely preserved for forensics and security investigations.


### Impact
Locking a bucket is an irreversible action. Once you lock a bucket, you cannot remove the
retention policy from the bucket or decrease the retention period for the policy. You
then have to wait for the retention period for all items within the bucket before you can
delete them, and then delete the bucket.

## Additional Information
- **Caution**: Locking a retention policy is an irreversible action. Once locked, you must delete
the entire bucket in order to "remove" the bucket's retention policy. However, before you
can delete the bucket, you must be able to delete all the objects in the bucket, which itself is
only possible if all the objects have reached the retention period set by the retention policy.


## Remediation

### From the console 
1. If sinks are not configured, first follow the instructions in the recommendation:
Ensure that sinks are configured for all log entries.
2. For each storage bucket configured as a sink, go to the Cloud Storage browser at
https://console.cloud.google.com/storage/browser/<BUCKET_NAME>.
3. Select the **Protection** tab near the top of the page.
4. In the **Retention policy** section, click the **Lock** button. The **Lock retention policy?** dialog box appears
5. Read the `Permanent` notice.
6. In the **Bucket name** text box, type in the name of your bucket.
7. Click **Lock policy**

### From the command line
1. To list all sinks destined to storage buckets:
   ```
   gcloud logging sinks list --folder=FOLDER_ID | --organization=ORGANIZATION_ID
   | --project=PROJECT_ID
   ```

2. For each storage bucket listed above, set a retention policy and lock it:
   ```
   gsutil retention set [TIME_DURATION] gs://[BUCKET_NAME]
   gsutil retention lock gs://[BUCKET_NAME]
   ```
For more information, visit [Set a retention policy on a bucket][1].

## References
1. [Retention policies and retention policy locks][2]
2. [Use and lock retention policies ][3]

[1]: https://cloud.google.com/storage/docs/using-bucket-lock#set-policy
[2]: https://cloud.google.com/storage/docs/bucket-lock
[3]: https://cloud.google.com/storage/docs/using-bucket-lock
