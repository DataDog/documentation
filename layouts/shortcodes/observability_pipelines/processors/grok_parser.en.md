This processor parses logs using the grok parsing rules that are available for a set of sources. The rules are automatically applied to logs based on the log source. Therefore, logs must have a `source` field with the source name. If this field is not added when the log is sent to the Observability Pipelines Worker, you can use the **Add field** processor to add it.

If the `source` field of a log matches one of the grok parsing rule sets, the log's `message` field is checked against those rules. If a rule matches, the resulting parsed data is added in the `message` field as a JSON object, overwriting the original `message`.

If there isn't a `source` field on the log, or no rule matches the log `message`, then no changes are made to the log and it is sent to the next step in the pipeline.

Datadog's Grok patterns differ from the standard Grok pattern, where Datadog's Grok implementation provides:
- Matchers that include options for how you define parsing rules
- Filters for post-processing of extracted data
- A set of built-in patterns tailored to common log formats

See [Parsing][10031] for more information on Datadog's Grok patterns.

To set up the grok parser, define a **filter query**. Only logs that match the specified [filter query](#filter-query-syntax) are processed. All logs, regardless of whether they match the filter query, are sent to the next step in the pipeline.

To test log samples for out-of-the-box rules:
1. Click the **Preview Library Rules** button.
1. Search or select a source in the dropdown menu.
1. Enter a log sample to test the parsing rules for that source.

To add a custom parsing rule:

1. Click **Add Custom Rule**.
1. If you want to clone a library rule, select **Clone library rule** and then the library source from the dropdown menu.
1. If you want to create a custom rule, select **Custom** and then enter the `source`. The parsing rules are applied to logs with that `source`.
1. Enter log samples to test the parsing rules.
1. Enter the rules for parsing the logs. See [Parsing][10031] for more information on writing parsing rules with Datadog Grok patterns.<br>**Note**: The `url`, `useragent`, and `csv` filters are not available.
1. Click **Advanced Settings** if you want to add helper rules. See [Using helper rules to factorize multiple parsing rules][10032] for more information.
1. Click **Add Rule**.

[10031]: /logs/log_configuration/parsing/
[10032]: /logs/log_configuration/parsing/?tab=matchers#using-helper-rules-to-factorize-multiple-parsing-rules