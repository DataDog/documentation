Common scenarios when you might use this source:

- Periodically extract transaction or access records stored in databases for audit and compliance reporting.
- Analyze, alert, and build dashboards on event data stored in database systems. For example:
  - Application logs that are stored in databases: Many legacy, regulated, or IoT devices write records to database tables. These events often contain session activity, device information, and custom application logs. The Database source lets you extract the data you want and ingest it as logs for downstream alerting and investigation.
  - Operational events and business-critical records: Many organizations store operational events in a database as a system of record. These databases contain data like ERP, billing, order, inventory, ticketing, and fulfillment info. Teams often query tables for dashboards, scheduled alerts, and investigations
  - Edge device telemetry that gets stored in databases: Some smaller devices write events, such as diagnostics, maintenance, and errors, into SQL tables. For example, a pacemaker syncs periodically and saves the records in a database, which a DevOps team then uses in their logging tool.
- Pull user or product information stored in databases to assist in troubleshooting issues or investigating threats.
