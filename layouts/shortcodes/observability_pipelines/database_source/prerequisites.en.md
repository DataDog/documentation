Before you configure the source, complete the following prerequisites to help ensure that credentials, connectivity, and queries are validated before they are used in Observability Pipelines. These steps must be completed using [external tools](#external-tools-for-testing), such as in your database or with third-party tools.

1. Create a database role for log collection, if you don't already have one. The role must:
    - Only have read-only access, so no permissions to modify or write data.
    - Have permission to execute the target queries used for log collection.
    - Be scoped to only the databases, schemas, and tables required for your log collection
1. Validate the connection string. The connection string must:
    - Be able to authenticate using the role from the previous step.
    - Be able to successfully connect to the database from the environment in which the Observability Pipelines Worker runs.
    - Use the correct host, port, database name, and authentication mechanism.
    - Be tested prior to configuring it in Observability Pipelines, to avoid runtime failures.
1. Write, validate, and test SQL queries using either third-party or native database management tools.
    - All SQL queries must be validated and tested with an external tool prior to configuring it in Observability Pipelines.
    - Ensure that each query executes successfully using the read-only rule and returns the expected schema.