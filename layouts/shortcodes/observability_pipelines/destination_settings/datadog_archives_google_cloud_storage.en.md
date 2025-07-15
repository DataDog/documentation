<div class="alert alert-warning">The Google Cloud Storage destination only supports <a href = "https://cloud.google.com/storage/docs/access-control/lists">Access Control Lists</a>.</div>

1. Enter the name of your Google Cloud storage bucket. If you configured Log Archives, it's the bucket you created earlier.
1. Optionally, enter the path to your credentials JSON file. If you configured Log Archives it's the credentials you downloaded [earlier](#create-a-service-account-to-allow-workers-to-write-to-the-bucket).
    - You can also use the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to provide the credential path. If you are using Google Kubernetes Engine (GKE), the `GOOGLE_APPLICATION_CREDENTIALS` is automatically set for you. The Worker uses standard Google authentication methods. See [Authentication methods at Google][10052] for more information.
1. Select the storage class for the created objects.
1. Select the access level of the created objects.
1. Optionally, enter in the prefix.
    - Prefixes are useful for partitioning objects. For example, you can use a prefix as an object key to store objects under a particular directory. If using a prefix for this purpose, it must end in `/` to act as a directory path; a trailing `/` is not automatically added.
    - See [template syntax][10051] if you want to route logs to different object keys based on specific fields in your logs.
1. Optionally, click **Add Header** to add metadata.

[10051]: /observability_pipelines/destinations/#template-syntax
[10052]: https://cloud.google.com/docs/authentication#auth-flowchart