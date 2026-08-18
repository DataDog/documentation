### Connect the S3 bucket to Datadog Log Archives

1. Navigate to Datadog [Log Forwarding][201].
1. Click **New archive**.
1. Enter a descriptive archive name.
1. Add a query so that this Log Archive doesn't also try to archive the logs that the Observability Pipelines Worker already writes to this S3 bucket. Without this query, both the native Log Archive and the Worker write to the same bucket, resulting in duplicate archived logs.
    - For example, add the query `observability_pipelines_read_only_archive`, assuming none of the logs going through your pipeline have that tag added. This scopes the Log Archive to read and rehydrate only, and confirms that the Worker remains the only process writing to the bucket.
    - After you create the archive, verify the setup by running the query in [Log Management][204]. The query should return zero results, because none of your logs actually have the `observability_pipelines_read_only_archive` tag.
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