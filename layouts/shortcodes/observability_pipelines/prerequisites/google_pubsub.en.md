To use Observability Pipelines' Google Pub/Sub source, you need the following information available:

- The Google Pub/Sub source requires a Pub/Sub subscription.
- A Google Developer Service Account Credential to authenticate the Observability Pipelines Worker. Contact your Google Security Operations representative for a Google Developer Service Account Credential. This credential is a JSON file and must be placed under `DD_OP_DATA_DIR/config`. See [Getting API authentication credentials][10021] for more information.

[10021]: https://cloud.google.com/chronicle/docs/reference/ingestion-api#getting_api_authentication_credentials