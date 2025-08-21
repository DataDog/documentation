Cloud SIEM can analyze logs, Audit Trail events, and events from Event Management. To search Audit Trail or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**. Construct a search query for your logs or events using the [Log Explorer search syntax][101].

Optionally, define a unique count and signal grouping. Count the number of unique values observed for an attribute in a given time frame. The defined `group by` generates a signal for each `group by` value. Typically, the `group by` is an entity (like user, or IP). The Group By is also used to [join the queries together](#joining-queries).

You can also filter logs using values from a specific columns in a reference table. See [Filter logs based on reference tables](#filter-logs-based-on-reference-tables) for more details.

Click **Unit Test** if you want to test the selected query against a sample log. See [Unit testing](#unit-testing) for more information.

Click **Add Query** to add additional queries.

**Note**: The query applies to all ingested logs and events.

[101]: /logs/search_syntax/