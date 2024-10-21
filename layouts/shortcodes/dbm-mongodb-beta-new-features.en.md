## Beta features in version 7.58.0-dbm-mongo-1.6

<div class="alert alert-info">The Database Monitoring feature for MongoDB is available in the beta version of the Datadog Agent. If you are not on version 7.58.0-dbm-mongo-1.6, upgrade to access the new features.</div>

### Slow operations

Database Monitoring for MongoDB captures slow operations from either MongoDB slow query logs or the `system.profile` collection. Slow operations are defined as those taking longer than the `slowms` threshold set in your MongoDB configuration. Monitoring slow operations is critical to identify and troubleshoot performance issues.

### Explain plans

Database Monitoring for MongoDB collects explain plans for current running read operations and slow operations. Explain plans provide detailed insights into the query execution plans, helping you optimize query performance.

### MongoDB Collection Schema and Index Analysis

Database Monitoring for MongoDB now offers schema and index analysis for your MongoDB collections. This feature provides insights into the structure and organization of your data by collecting inferred schema details and index information.
Using a document sampling approach with the `$sample` aggregation stage, Datadog analyzes your collection to identify common fields, their data types, and how often each field appears across the sampled documents (field prevalence). In addition to schema details, Database Monitoring for MongoDB also gathers information on the indexes present, giving you a comprehensive view of how data is structured and optimized for querying.
