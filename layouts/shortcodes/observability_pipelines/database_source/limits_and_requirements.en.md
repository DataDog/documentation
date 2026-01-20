### Worker and pipelines

#### One database per pipeline

- You can only have one Database source per pipeline.
- Multiple instances of the same database type requires separate pipelines.
- One pipeline can run only one SQL query.

#### Single-node execution requirements

- Observability Pipelines Workers are deployed in a share-nothing architecture.
- Datadog recommends deploying database pipelines using the Database source on one Worker node only. Otherwise, you run the risk of pulling duplicate data across multiple workers.

### Queries

#### Only read-only queries are executed

- Only `SELECT` and `SELECT DISTINCT` statements are supported.
- Queries that modify data (`INSERT`, `UPDATE`, `DELETE`, `DDL`) are all rejected.

#### Validate and storing queries

- SQL queries must be tested and validated outside of Observability Pipelines' UI. Datadog recommends using a third-party tool, such as DBeaver, or native SQL manager, such as MySQL Workbench, for testing.
- To execute a specific SQL query with Observability Pipelines, you must store the query in a local file for the Worker to read.

#### SQL file requirements

- The local file that contains the query for the Worker to run can only have one query.
- Parameterized queries are supported for incremental execution.

### Manage credentials and IAM externally

- Database users, roles, and permission must be created and managed outside of Datadog.
- Connection strings should reference environment variables for secrets.