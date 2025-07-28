- Splunk HEC token:
    - The Splunk HEC token for the Splunk indexer. **Note**: Depending on your shell and environment, you may want to to ensure the environment variable value is not wrapped in quotes.
    - Stored in the environment variable `DD_OP_DESTINATION_SPLUNK_HEC_TOKEN`.
- Base URL of the Splunk instance:
    - The Splunk HTTP Event Collector endpoint your Observability Pipelines Worker sends processed logs to. For example, `https://hec.splunkcloud.com:8088`.  
    **Note**: `/services/collector/event` path is automatically appended to the endpoint.
    - Stored in the environment variable `DD_OP_DESTINATION_SPLUNK_HEC_ENDPOINT_URL`.