Cloud SIEM can analyze logs, Audit Trail events, and events from Event Management. To search Audit Trail events, click the down arrow next to **Logs** and select **Audit Trail**. Construct a search query for your logs or audit events using the [Log Explorer search syntax][101].

Optionally, define a unique count and signal grouping. Count the number of unique values observed for an attribute in a given time frame. The defined Group By generates a signal for each `group by` value. Typically, the `group by` is an entity (like user, or IP). The Group By is also used to [join the queries together](#joining-queries).

Click **Add Query** to add additional queries.

**Note**: The query applies to all ingested logs.

[101]: /logs/search_syntax/