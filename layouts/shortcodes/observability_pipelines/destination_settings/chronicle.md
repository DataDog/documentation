To authenticate the Worker for Google Chronicle:

1. Create a Google Cloud Storage [service account][10001].
1. Follow these [instructions][10002] to create a service account key and download the JSON service account key file. This is the credentials JSON file and must be placed under `DD_OP_DATA_DIR/config`.

To set up the Worker's Google Chronicle destination:

1. Enter the customer ID for your Google Chronicle instance.
1. Enter the path to the credentials JSON file you downloaded earlier.
1. Select **JSON** or **Raw** encoding in the dropdown menu.
1. Select the appropriate **Log Type** in the dropdown menu.

**Note**: Logs sent to the Google Chronicle destination must have ingestion labels. For example, if the logs are from a A10 load balancer, it must have the ingestion label `A10_LOAD_BALANCER`. See Google Cloud's [Support log types with a default parser][10003] for a list of available log types and their respective ingestion labels.

[10001]: https://cloud.google.com/docs/authentication#service-accounts
[10002]: https://cloud.google.com/iam/docs/keys-create-delete#creating
[10003]: https://cloud.google.com/chronicle/docs/ingestion/parser-list/supported-default-parsers#with-default-parser
