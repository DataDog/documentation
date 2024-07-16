### Create a storage bucket

1. Navigate to [Google Cloud Storage][9091].
1. On the Buckets page, click **Create** to create a bucket for your archives..
1. Enter a name for the bucket and choose where to store your data.
1. Select **Fine-grained** in the **Choose how to control access to objects** section.
1. Do not add a retention policy because the most recent data needs to be rewritten in some rare cases (typically a timeout case).
1. Click **Create**.

### Create a service account to allow Workers to write to the bucket

1. Create a Google Cloud Storage [service account][9092].
1. Follow these [instructions][9093] to create a service account key and download the JSON service account key file. This is the credentials JSON file and must be placed under `DD_OP_DATA_DIR/config`.

**Note**: If you are installing the Worker in Kubernetes, see [Referencing files in Kubernetes][9097] for information on how to reference the credentials file.

### Connect the storage bucket to Datadog Log Archives

1. Navigate to Datadog [Log Forwarding][9094].
1. Click **New archive**.
1. Enter a descriptive archive name.
1. Add a query that filters out all logs going through log pipelines so that none of those logs go into this archive. For example, add the query `observability_pipelines_read_only_archive`, assuming no logs going through the pipeline have that tag added.
1. Select **Google Cloud Storage**.
1. Select the service account your storage bucket is in.
1. Select the project.
1. Enter the name of the storage bucket you created earlier.
1. Optionally, enter a path.
1. Optionally, set permissions, add tags, and define the maximum scan size for rehydration. See [Advanced settings][9095] for more information.
1. Click **Save**.

See the [Log Archives documentation][9096] for additional information.

[9091]: https://console.cloud.google.com/storage
[9092]: https://cloud.google.com/docs/authentication#service-accounts
[9093]: https://cloud.google.com/iam/docs/keys-create-delete#creating
[9094]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[9095]: /logs/log_configuration/archives/?tab=awss3#advanced-settings
[9096]: /logs/log_configuration/archives
[9097]: /observability_pipelines/advanced_configurations/#referencing-files-in-kubernetes