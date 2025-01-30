Enter your Splunk HEC token and the base URL of the Splunk instance. See [prerequisites](#prerequisites) for more information.

The Worker passes the HEC token to the Splunk collection endpoint. After the Observability Pipelines Worker processes the logs, it sends the logs to the specified Splunk instance URL.

**Note**: The Splunk HEC destination forwards all logs to the `/services/collector/event` endpoint regardless of whether you configure your Splunk HEC destination to encode your output in `JSON` or `raw`.