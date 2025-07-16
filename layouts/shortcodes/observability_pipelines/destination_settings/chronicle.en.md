To authenticate the Observability Pipelines Worker for Google Chronicle, contact your Google Security Operations representative for a Google Developer Service Account Credential. This credential is a JSON file and must be placed under `DD_OP_DATA_DIR/config`. See [Getting API authentication credential][10001] for more information.

To set up the Worker's Google Chronicle destination:

1. Enter the customer ID for your Google Chronicle instance.
1. Optionally, enter the path to your credentials JSON file. If you configured Log Archives it's the credentials you downloaded [earlier](#create-a-service-account-to-allow-workers-to-write-to-the-bucket).
    - You can also use the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to provide the credential path. If you're using [workload identity][10004] on Google Kubernetes Engine (GKE), the `GOOGLE_APPLICATION_CREDENTIALS` is provided for you.
    - The Worker uses standard [Google authentication methods][10005].
1. Select **JSON** or **Raw** encoding in the dropdown menu.
1. Enter the log type. See [template syntax][10002] if you want to route logs to different log types based on specific fields in your logs.

**Note**: Logs sent to the Google Chronicle destination must have ingestion labels. For example, if the logs are from a A10 load balancer, it must have the ingestion label `A10_LOAD_BALANCER`. See Google Cloud's [Support log types with a default parser][10003] for a list of available log types and their respective ingestion labels.

[10001]: https://cloud.google.com/chronicle/docs/reference/ingestion-api#getting_api_authentication_credentials
[10002]: /observability_pipelines/destinations/#template-syntax
[10003]: https://cloud.google.com/chronicle/docs/ingestion/parser-list/supported-default-parsers#with-default-parser
[10004]:https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[10005]: https://cloud.google.com/docs/authentication#auth-flowchart