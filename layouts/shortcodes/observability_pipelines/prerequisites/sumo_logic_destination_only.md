To use Observability Pipelines's Sumo Logic destination, you have a Hosted Sumo Logic Collector with a HTTP Logs source, and the following information available:
- The bind address that your Observability Pipelines Worker will listen on to receive logs. For example, `0.0.0.0:80`.
- The URL of the Sumo Logic HTTP Logs Source that the Worker will send processed logs to. This URL is provided by Sumo Logic once you configure your hosted collector and set up an HTTP Logs and Metrics source.

See [Configure HTTP Logs Source on Sumo Logic][101] for more information.

[101]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/