To use Observability Pipelines' Google Pub/Sub source, you need the following information available:

- The Google Pub/Sub source requires a Pub/Sub subscription.
- The Worker uses standard Google authentication methods. See [Authentication methods at Google][10022] for more information about choosing the authentication method for your use case.
- Use `roles/pubsub.subscriber` for the Pub/Sub IAM role. See [Available Pub/Sub roles][10023] for more information.

[10022]: https://cloud.google.com/docs/authentication#auth-flowchart
<!-- 10022 link is also used in layouts/shortcodes/observability_pipelines/source_settings/google_pubsub.en.md -->
[10023]: https://cloud.google.com/pubsub/docs/access-control#roles