### Operation samples and explain plans

Database Monitoring for Amazon DocumentDB gathers operation samples using the `currentOp` command. This command provides information about operations that are currently being executed on the DocumentDB instance. Additionally, Database Monitoring collects explain plans for the read operation samples using the `explain` command, offering detailed insights into the query execution plans.

### Replication state changes

Database Monitoring for Amazon DocumentDB generates an event each time there is a change in the replication state within the DocumentDB instance. This ensures that any changes in replication are promptly detected and reported.

### Collection of schemas and indexes

Database Monitoring for Amazon DocumentDB collects inferred schemas and indexes of Amazon DocumentDB collections. This information is used to provide insights into the structure and organization of your collections.

When analyzing Amazon DocumentDB collections, Datadog collects inferred schema information by sampling documents using the `$sample` aggregation stage. From this analysis, only metadata about the schema is gathered and sent to Datadog, including field names, field prevalence (how often each field appears), and their respective data types. Datadog does not collect or transmit the actual content of documents or any customer business data. This ensures that sensitive data remains protected while still providing valuable insights into the structure and organization of your collections.
