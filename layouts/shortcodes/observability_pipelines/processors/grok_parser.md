This processor parses logs using the grok parsing rules that are available for a set of sources. The rules are automatically applied to logs based on the source of the logs. Therefore, logs must have a `source` field with the source name. If this field is not added when the log is sent to the Observability Pipelines Worker, you can use the **Add field** processor to add it.

If the `source` field of a log matches one of the grok parsing rule sets, the log's message field is checked against those rules. If a rule matches, the resulting parsed data is added in the message field as a JSON object.

If there isn't a `source` field on the log, or no rule matches the log message, then no changes are made to the log and it is sent to the next step in the pipeline.

To set up the grok parser:
1. Define a **filter query**. Only logs that match the specified [filter query](#filter-query-syntax) are processed. All logs, regardless of whether they do or do not match the filter query, are sent to the next step in the pipeline.
2. Click the **Preview Rules** button. 
3. Search or select a source in the dropdown menu to see the grok parsing rules for that source. 
