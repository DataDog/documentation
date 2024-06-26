### Create a storage bucket

1. Navigate to [Google Cloud Storage][9091].
1. On the Buckets page, click **Create** to create a bucket for your archives..
1. Enter a name for the bucket and choose where to store your data.
1. Select **Fine-grained** in the **Choose how to control access to objects** section.
1. Do not add a retention policy because the last data needs to be rewritten in some rare cases (typically a timeout case).
1. Click **Create**.

### Create an API key

If you don't already have an API key, create one to give the Observability Pipelines Worker access to your storage bucket.

1. Navigate to Google Cloud Credentials.
1. Click **Create credentials**. This is the API key that you use when you install the Observability Pipelines Worker later.

### Connect the storage bucket to Datadog Log Archives

1. Navigate to Datadog [Log Forwarding][9092].
1. Click **New archive**.
1. Enter a descriptive archive name.
1. Add a query that filters out all logs going through log pipelines so that none of those logs go into this archive. For example, add the query `observability_pipelines_read_only_archive`, assuming no logs going through the pipeline have that tag added.
1. Select **Google Cloud Storage**.
1. Select the service account your storage bucket is in.
1. Select the project.
1. Enter the name of the storage bucket you created earlier.
1. Optionally, enter a path.
1. Optionally, set permissions, add tags, and define the maximum scan size for rehydration. See [Advanced settings][9093] for more information.
1. Click **Save**.

See the [Log Archives documentation][9094] for additional information.

[9091]: https://console.cloud.google.com/storage
[9092]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[9093]: /logs/log_configuration/archives/?tab=awss3#advanced-settings
[9094]: /logs/log_configuration/archives