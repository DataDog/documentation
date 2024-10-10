### Slow Operations

Database Monitoring for MongoDB captures slow operations from either MongoDB slow query logs or the `system.profile` collection. Slow operations are defined as those taking longer than the `slowms` threshold set in your MongoDB configuration.

- With Database Profiling Enabled: When profiling is enabled at levels 1 or 2, Database Monitoring collects slow operations from the `system.profile` collection.
- With Database Profiling Disabled: If profiling is disabled, Database Monitoring relies on MongoDB slow query logs to gather slow operations.

### Operation Samples and Explain Plans

Database Monitoring for MongoDB gathers operation samples using the `currentOp` command. This command provides information about currently executing operations in the MongoDB instance. Additionally, Database Monitoring collects explain plans for the read operation samples using the `explain` command, offering detailed insights into the query execution plans.

### Replication State Changes

Database Monitoring for MongoDB generates an event each time there is a change in the replication state within the MongoDB instance. This ensures that any changes in replication are promptly detected and reported.

### Collection of Schemas and Indexes

Database Monitoring for MongoDB collects inferred schemas and indexes of MongoDB collections. This information is used to provide insights into the structure and organization of your collections.
When analyzing MongoDB collections, Datadog collects inferred schema information by sampling documents using the `$sample` aggregation stage. From this analysis, only metadata about the schema is gathered and sent to Datadog, including field names, field prevalence (how often each field appears), and their respective data types. Datadog does not collect or transmit the actual content of documents or any customer business data. This ensures that sensitive data remains protected while still providing valuable insights into the structure and organization of your collections.
