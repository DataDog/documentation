The Sensitive Data Scanner processor scans logs to detect and redact or hash sensitive information such as PII, PCI, and custom sensitive data. You can pick from Datadog's library of predefined rules, or input custom Regex rules to scan for sensitive data.

To set up the processor:

1. Define a filter query. Only logs that match the specified filter query are scanned and processed. All logs are sent to the next step in the pipeline, regardless of whether they match the filter query.
1. Click **Add Scanning Rule**.
1. Select one of the following: