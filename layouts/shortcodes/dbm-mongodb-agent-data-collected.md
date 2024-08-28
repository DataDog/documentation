### Metrics

Refer to the [MongoDB integration documentation][2] for a comprehensive list of metrics collected by the MongoDB integration.

### Slow Operations

Database Monitoring for MongoDB captures slow operations from either MongoDB slow query logs or the `system.profile` collection. Slow operations are defined as those taking longer than the `slowms` threshold set in your MongoDB configuration.

- With Database Profiling Enabled: When profiling is enabled at levels 1 or 2, Database Monitoring collects slow operations from the `system.profile` collection.
- With Database Profiling Disabled: If profiling is disabled, Database Monitoring relies on MongoDB slow query logs to gather slow operations.

### Operation Samples and Explain Plans

Database Monitoring for MongoDB gathers operation samples using the `currentOp` command. This command provides information about currently executing operations in the MongoDB instance. Additionally, Database Monitoring collects explain plans for the read operation samples using the `explain` command, offering detailed insights into the query execution plans.

### Replication State Changes

Database Monitoring for MongoDB generates an event each time there is a change in the replication state within the MongoDB instance. This ensures that any changes in replication are promptly detected and reported.
