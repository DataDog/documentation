This processor parses the specified JSON field into objects.

To set up this processor:
1. Define a **filter query**. Only logs that match the specified [filter query](#filter-query-syntax) are processed. All logs, regardless of whether they do or do not match the filter query, are sent to the next step in the pipeline.
2. Enter the name of the field you want to parse JSON on.<br>**Note**: The parsed JSON overwrites what was originally contained in the field.