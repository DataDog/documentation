This processor filters for logs that match the specified filter query and drops all non-matching logs. If a log is dropped at this processor, then none of the processors below this one receives that log. This processor can filter out unnecessary logs, such as debug or warning logs.

To set up the filter processor:
- Define a **filter query**. The [query](#filter-query-syntax) you specify filters for and passes on only logs that match it, dropping all other logs.