The Sensitive Data Scanner processor scans logs to detect and redact or hash sensitive information such as PII, PCI, and custom sensitive data. You can add predefined scanning rules from Datadog's Scanning Rule Library or create your own rules using regex patterns.

To set up the processor:

1. Define a filter query. Only logs that match the specified filter query are scanned and processed. All logs are sent to the next step in the pipeline, regardless of whether they match the filter query.
1. Click **Add Scanning Rule**. This opens a side panel.
    - If you have not created any rules yet, select whether you want to add rules from the Rule Library or if you want to add a custom rule.
    - If you have already created rules, click on the rule row in the table to edit or delete it. Use the search bar to find a specific rule by its name, and then select the metric to edit or delete it. Click **Add Rule** to add another rule and then select whether you want to add rules from the Rule Library or if you want to add a custom rule.

