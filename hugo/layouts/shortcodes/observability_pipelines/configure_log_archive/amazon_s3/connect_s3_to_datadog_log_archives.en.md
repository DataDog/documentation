### Connect the S3 bucket to Datadog Log Archives

1. Navigate to Datadog [Log Forwarding][201].
1. Click **New archive**.
1. Enter a descriptive archive name.
1. In the **Define Which Data To Forward** section, add a query that filters out all logs going through log pipelines so that only the Worker sends logs to this bucket. Otherwise, both Log Archive and the Worker send logs to this bucket, resulting in duplicate archived logs.
    - For example, if you add the query `observability_pipelines_read_only_archive` and no logs going through your log pipelines have that tag, this ensures that only the Worker sends logs to the bucket and Log Archive only reads and rehydrates from the bucket.
    - After you enter the query, such as `observability_pipelines_read_only_archive`, the preview at the top of the page should show no matching results.
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
