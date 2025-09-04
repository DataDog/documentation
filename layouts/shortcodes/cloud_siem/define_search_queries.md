Construct a search query for your logs or events using the [Log Explorer search syntax][101].

To search Audit Trail or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.

Optionally, define a unique count and signal grouping. Count the number of unique values observed for an attribute in a given time frame. The defined `group by` generates a signal for each `group by` value. Typically, the `group by` is an entity (like user, or IP). The `group by` is also used to [join the queries together](#joining-queries).

**Note**: The query applies to all ingested logs and events.

[101]: /logs/search_syntax/