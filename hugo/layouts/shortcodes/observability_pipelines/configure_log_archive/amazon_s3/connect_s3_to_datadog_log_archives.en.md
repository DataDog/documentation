### Connect the S3 bucket to Datadog Log Archives

1. Navigate to Datadog [Log Forwarding][201].
1. Click **New archive**.
1. Enter a descriptive archive name.
1. Add a query that filters out all logs going through log pipelines so those logs don't go into this archive. Without this query, both the native Log Archive and the Worker write to the same bucket, resulting in duplicate archived logs.
    - For example, add the query `observability_pipelines_read_only_archive`, assuming none of the logs going through your log pipeline have that tag. This makes Log Archive read and rehydrate from this bucket only. The Worker is the only process writing to the bucket.
    - After you create the archive, enter the query `observability_pipelines_read_only_archive` in [Log Management][204]. The query should return zero results because none of your logs have that tag.
1. Select **AWS S3**.
1. Select the AWS account that your bucket is in.
1. Enter the name of the S3 bucket.
1. Optionally, enter a path.
1. Check the confirmation statement.
1. Optionally, add tags and define the maximum scan size for rehydration. See [Advanced settings][202] for more information.
1. Click **Save**.

See the [Log Archives documentation][203] for additional information.

[201]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[202]: /logs/log_configuration/archives/?tab=awss3#advanced-settings
[203]: /logs/log_configuration/archives
[204]: https://app.datadoghq.com/logs