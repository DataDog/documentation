Enter your Splunk HEC token and theBase URL of the Splunk instance. See [prerequisites](#prerequisites) for more information.

The Worker passes the HEC token along to the Splunk collection endpoint. After the Observability Pipelines Worker processes the logs, it sends the logs to the Splunk instance URL specified.

**Note**: All logs are sent to the `/services/collector/event` endpoint regardless of whether you configure your Splunk HEC destination to encode your output in `JSON` or `raw`.