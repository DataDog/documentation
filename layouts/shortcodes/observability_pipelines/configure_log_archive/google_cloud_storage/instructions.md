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

[9091]: https://console.cloud.google.com/storage