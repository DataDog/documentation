- Splunk HEC address:
    - The bind address that your Observability Pipelines Worker listens on to receive logs originally intended for the Splunk indexer. For example, `0.0.0.0:8088`   
    **Note**: `/services/collector/event` is automatically appended to the endpoint.
    - The default environment variable is `DD_OP_SOURCE_SPLUNK_HEC_ADDRESS`.
- Splunk HEC TLS passphrase (when enabled):
    - The default environment variable is `DD_OP_SOURCE_SPLUNK_HEC_KEY_PASS`.