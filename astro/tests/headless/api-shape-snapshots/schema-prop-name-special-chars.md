<!-- schema-prop-name-special-chars: /api/latest/rendering-shapes/list-jira-issue-templates/ -->

| Parent field  | Field                     | Type      | Description                                                                     |
| ------------- | ------------------------- | --------- | ------------------------------------------------------------------------------- |
| relationships | jira-account [*required*] | object    | Relationship to a Jira account                                                  |
| jira-account  | data [*required*]         | object    | Data object for a Jira account                                                  |
| data          | attributes [*required*]   | object    | Attributes of a Jira account                                                    |
| attributes    | consumer_key [*required*] | string    | The consumer key for the Jira account                                           |
| attributes    | instance_url [*required*] | string    | The URL of the Jira instance                                                    |
| attributes    | last_webhook_timestamp    | date-time | Timestamp of the last webhook received                                          |
| data          | id [*required*]           | string    | Unique identifier for the Jira account                                          |
| data          | type [*required*]         | enum      | Type identifier for Jira account resources Allowed enum values: `jira-account`. |
