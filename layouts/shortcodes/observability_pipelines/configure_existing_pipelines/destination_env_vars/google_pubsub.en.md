By default the Worker sends data to the global endpoint: `https://pubsub.googleapis.com`.

If your Pub/Sub topic is region-specific, configure the Google Pub/Sub alternative endpoint URL with the regional endpoint. See [About Pub/Sub endpoints][10240] for more information.

Stored as the environment variable: `DD_OP_DESTINATION_GCP_PUBSUB_ENDPOINT_URL`.

[10240]: https://cloud.google.com/pubsub/docs/reference/service_apis_overview#pubsub_endpoints