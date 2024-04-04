Enter your `Splunk HEC token` and the`Base URL of the Splunk instance` as described in the [prerequisites](#prerequisites). **Note**: Depending on the encoding selected, either `/services/collector/event` or `/services/collector/raw`)  is automatically appended to your endpoint.

The Worker passes the HEC token along to the Splunk collection endpoint. After the Observability Pipelines Worker processes the logs, it sends the logs to the Splunk instance URL specified.
