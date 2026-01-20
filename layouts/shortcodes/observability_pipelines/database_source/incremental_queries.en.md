### Incremental query syntax

For incremental querying, SQL queries must have the following to help ensure consistent results.

- A `WHERE <incremental_column> <operation> <placeholder>` clause so that the source on each scheduled run can replace `placeholder` with the checkpoint value, and retrieve the latest results.
  - `incremental_column`: A column with incremental values. This value must be the same as the column value set in the Database source configuration.
  - `operation`: Input `>` , `<`, `>=`, or `<=`.
  - `placeholder`: Input `?` for MySQL and `$1` for Postgres.
- An `ORDER BY <incremental_column>` clause so that the database returns the rows in a predictable order for the source to retrieve the latest values.
- An example that uses all the options: `SELECT * FROM orders WHERE order_id > ? ORDER BY order_id LIMIT 500;`
  - If the last checkpoint value is `7`. This query retrieves all rows where the `order_id` column's value is greater than `7`.

### Incremental columns

Incremental columns are used to track the progress of each new query. The following column types for incremental querying are supported:

- `Varchar`
- `Int`, `float`, `real`, `bigint`, `number`
- `Timestamp`
- `Datetime`

Datadog recommends using an incremental ID for the incremental column . If you use an identifier that might not be unique, such as timestamps, it could result in data conflicts.

**Notes**:
- There could be data loss if you use strict operators, such as `>` or `<`, in your query.
- There could be duplicated data if you use inclusive operators, such as `>=`.

### Checkpoint values

Checkpoint values are updated every job run. To monitor the checkpoint value, there are Worker logs that contain the message `Checkpoint updated` and the latest value that was published. If a job fails or the Worker is restarted mid-job or it crashes, the checkpoint value reverts to the start value. To recover the checkpoint value:

1. Navigate to [Log Explorer][100] and search for Worker logs with the message `Checkpoint updated`.
1. Check the value found in the latest Worker log to see what the Worker tracked.
1. Check the log in the destination to which your logs were sent and determine the last value sent.
1. Manually reset the checkpoint value in the Database source in the pipelines UI.

[100]: https://app.datadoghq.com/logs