- Splunk HEC token:
    - The Splunk HEC token for the Splunk indexer. **Note**: Depending on you OS and shell version, you may want to avoid adding quotes to the environment variable.
    - Stored in the environment variable `DD_OP_DESTINATION_SPLUNK_HEC_TOKEN`.
- Base URL of the Splunk instance:
    - The Splunk HTTP Event Collector endpoint your Observability Pipelines Worker sends processed logs to. For example, `https://hec.splunkcloud.com:8088`.  
    **Note**: `/services/collector/event` path is automatically appended to the endpoint.
    - Stored in the environment variable `DD_OP_DESTINATION_SPLUNK_HEC_ENDPOINT_URL`.