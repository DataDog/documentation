The Sensitive Data Scanner processor scans logs to detect and redact or hash sensitive information such as PII, PCI, and custom sensitive data. You can pick from our library of predefined rules, or input custom Regex rules to scan for sensitive data.

To set up the sensitive data scanner processor:
1. Define a **filter query**. Only logs that match the specified [filter query](#filter-query-syntax) are scanned and processed. All logs, regardless of whether they do or do not match the filter query, are sent to the next step in the pipeline.
1. Click **Add Scanning Rule**.
1. Name your scanning rule.
1. In the **Select scanning rule type** field, select whether you want to create a rule from the library or create a custom rule.
    - If you are creating a rule from the library, select the library pattern you want to use.
    - If you are creating a custom rule, enter the regex pattern to check against the data.
1. In the **Scan entire or part of event** section, select if you want to scan the **Entire Event**, **Specific Attributes**, or **Exclude Attributes** in the dropdown menu.
    - If you selected **Specific Attributes**, click **Add Field** and enter the specific attributes you want to scan. You can add up to three fields. Use path notation (`outer_key.inner_key`) to access nested keys. For specified attributes with nested data, all nested data is scanned.
    - If you selected **Exclude Attributes**, click **Add Field** and enter the specific attributes you want to exclude from scanning. You can add up to three fields. Use path notation (`outer_key.inner_key`) to access nested keys. For specified attributes with nested data, all nested data is excluded.
1. In the **Define action on match** section, select the action you want to take for the matched information. Redaction, partial redaction, and hashing are all irreversible actions.
    - If you are redacting the information, specify the text to replace the matched data.
    - If you are partially redacting the information, specify the number of characters you want to redact and whether to apply the partial redaction to the start or the end of your matched data.
    - **Note**: If you select hashing, the UTF-8 bytes of the match are hashed with the 64-bit fingerprint of FarmHash.
1. Optionally, add tags to all events that match the regex, so that you can filter, analyze, and alert on the events.