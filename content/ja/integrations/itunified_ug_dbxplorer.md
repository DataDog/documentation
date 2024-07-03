---
algolia:
  subcategory: Marketplace インテグレーション
app_id: itunified-ug-dbxplorer
app_uuid: 1349589a-6fc1-4ddd-99c7-7b23ba82903a
assets:
  dashboards:
    dbXplorer - ASH Monitor: assets/dashboards/itunified_ug_dbxplorer_ash_monitor.json
    dbXplorer - DB Performance Health: assets/dashboards/itunified_ug_dbxplorer_db_health_performance.json
    dbXplorer - Oracle LMS: assets/dashboards/itunified_ug_dbxplorer_oracle_lms.json
    dbXplorer - Space Monitoring: assets/dashboards/itunified_ug_dbxplorer_space_monitoring.json
    dbXplorer - Status Summary: assets/dashboards/itunified_ug_dbxplorer_status_summary.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: dbxplorer.oracle.database.availability.status
      metadata_path: metadata.csv
      prefix: dbxplorer.oracle
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 14507249
    source_type_name: itunified_ug_dbxplorer
  monitors:
    dbXplorer ASH Monitoring - Anomaly Detected for sql_id (1w Bounds Window): assets/monitors/dbxplorer_ash_sql_id_1w.json
    dbXplorer ASH Monitoring - Anomaly Detected for sql_id (4h Bounds Window): assets/monitors/dbxplorer_ash_sql_id_4h.json
    dbXplorer ASH Monitoring - SQL_ID Anomaly CPU TIME: assets/monitors/dbxplorer_ash_sql_id_cpu_time.json
    dbXplorer ASH Monitoring - SQL_ID Anomaly ELAPSED TIME: assets/monitors/dbxplorer_ash_sql_id_elapsed_time.json
    dbXplorer Database Health - Anomaly detection Load: assets/monitors/dbxplorer_db_health_anomaly_load.json
    dbXplorer Database Health - Anomaly detection Wait Events: assets/monitors/dbxplorer_db_health_anomaly_wait_events.json
    dbXplorer Database Health - Availability: assets/monitors/dbxplorer_db_health_availability.json
    dbXplorer Space - Predictive ASM Diskgroup Usage Alert (Free Percent): assets/monitors/dbxplorer_space_prdictive_diskgroup_usage.json
    dbXplorer Space - Predictive Recovery Area Usage Alert: assets/monitors/dbxplorer_space_predictive_recovery_area.json
    dbXplorer Space - Predictive Tablespace Usage Alert (contents:permanent): assets/monitors/dbxplorer_space_predictive_tablespace_permanent.json
    dbXplorer Space - Predictive Tablespace Usage Alert (contents:temporary): assets/monitors/dbxplorer_space_predictive_tablespace_temp.json
    dbXplorer Space - Predictive Tablespace Usage Alert (contents:undo): assets/monitors/dbxplorer_space_predictive_tablespace_undo.json
author:
  homepage: https://www.itunified.de
  name: ITUNIFIED UG
  sales_email: support.datadog@itunified.de
  support_email: support.datadog@itunified.de
  vendor_id: itunified
categories:
- marketplace
- クラウド
- oracle
- data stores
- モニター
- alerting
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: itunified_ug_dbxplorer
integration_id: itunified-ug-dbxplorer
integration_title: dbXplorer for Oracle DBMS
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: itunified_ug_dbxplorer
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.itunified_ug.itunified_ug_dbxplorer.dbxplorer.oracle.database.integration.status
  product_id: itunified-ug-dbxplorer
  short_description: Monitors your Oracle Clusters, DB's and filesystems.
  tag: db_unique_name
  unit_label: Unique DB Name
  unit_price: 50.0
public_title: dbXplorer for Oracle DBMS
short_description: Monitor and analyze Oracle database health and performance
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Offering::Integration
  - Category::Marketplace
  - Category::Cloud
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Category::Oracle
  - Category::Data Stores
  - Category::Metrics
  - Category::Alerting
  configuration: README.md#Setup
  description: Monitor and analyze Oracle database health and performance
  media:
  - caption: dbXplorer - ASH Monitoring
    image_url: images/1.png
    media_type: image
  - caption: dbXplorer - ASH Monitoring sql_id related logs view
    image_url: images/2.png
    media_type: image
  - caption: dbXplorer - DB Performance Health
    image_url: images/3.png
    media_type: image
  - caption: dbXplorer - Space Monitoring
    image_url: images/4.png
    media_type: image
  - caption: dbXplorer - Status Summary
    image_url: images/5.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: dbXplorer for Oracle DBMS
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

**dbXplorer** enables you to monitor Oracle (19c or later) databases, providing you with real-time analytics and performance metrics available in Datadog. This integration gives deep visibility into the health and performance of your Oracle database instances. 

このインテグレーションを使用すると、以下のことができます。
- Proactively Monitor: Detect potential issues early through real-time alerts on performance bottlenecks, unusual activities, or failures.
- Optimize Performance: Gather insights into database performance to help tune queries and resources, ensuring optimal utilization and response times.
- Simplified Management: Centralize monitoring of multiple Oracle databases into a single platform, streamlining the management process and reducing operational overhead.

This integration monitors the following types of data from Oracle databases:
- Performance Metrics: Includes data on query response times, memory usage (for example, PGA and SGA statistics), and resource bottlenecks. This data helps in identifying performance issues and optimizing database operations.
- Health Metrics: Tracks critical health indicators such as connection times, user sessions, and system availability, enabling timely intervention to prevent downtimes.

**About ITUnified:** with more than two decades of expertise, their Oracle-certified database Administrator (DBA) professionals are equipped with the skills required to handle intricate projects and support clients in managing and administering their databases. ITUnified specializes in tailored database support and services through a detailed needs assessment.

### メトリクス

The dbXplorer integration collects 77 metrics in 8 different categories.

11 metrics based on Oracle's internal DBA_HIST_ACTIVE_SESS_HISTORY table. It provides values for previous and repeated SQL queries. 

28 metrics based on Oracle's internal DBA_HIST_SQLSTAT table providing application, CPU, disk read and writes, I/O, concurrency wait times for SQL queries.

11 metrics based on Oracle's internal V$OSSTAT table. This table contains system utilization statistics from the operating system.

2 metrics are retrieved from the V$SESSION_EVENT table and display information on waits for an event by a session.

10 metrics are retrieved from the v$system_event table and display information on total waits for an event.

1 metric contains statistic names. The different statistic names are described [here] [2].

5 metrics related to the database recovery area. 

8 metrics related to tablespace usage.

### モニター

With 12 included monitors, get notified with:
- Anomaly detection for SQL executions based on CPU and elapsed times.
- Database health alerts for load and wait events
- General database availability
- Predictive alerts for tablespace usage of undo, temporary and permanent tablespaces
- Predictive alerts for recovery area usage
- Predictive alerts for ASM disk usage

### ダッシュボード

The dbXplorer integration contains 4 dashboards:

#### dbXplorer - ASH Monitoring
The "dbXplorer - ASH Monitoring" dashboard is designed to provide a comprehensive performance analysis of Oracle Databases, leveraging SQLSTAT and ACTIVE SESSION HISTORY (ASH) data. The dashboard combines SQL execution metrics from SQLSTAT with session-level activity insights from ASH, enabling a holistic view of database performance and opportunities for optimization. It features multiple widgets including detailed timeseries graphs and query tables that monitor and analyze various performance metrics such as elapsed time, CPU time, and I/O operations. Key features include anomaly detection for specific SQL identifiers, historical performance analysis, and trend monitoring to diagnose performance issues and optimize database operations.

#### dbXplorer - DB Performance Health
The "dbXplorer - DB Performance Health" dashboard is tailored for comprehensive monitoring of Oracle Database performance, focusing on various critical aspects such as load anomalies, session wait anomalies, CPU usage, and memory usage. It employs multiple widgets that visually display data using graphs and tables, helping database administrators quickly identify and address performance bottlenecks. Key features include detailed analysis of session wait events through the v$session_event and v$session_wait views, which offer insights into specific wait events and their impact on database sessions. Additionally, the dashboard provides tools to monitor and analyze system-wide performance metrics via the v$system_event and v$osstat views, covering system-level waits and operating system interactions that affect database operations.

#### dbXplorer - Space Monitoring
The "dbXplorer - Space Monitoring" dashboard provides detailed monitoring and forecasting for Oracle database tablespaces, recovery areas, and Automatic Storage Management (ASM) disk groups. It enables visualization of current and historical data usage, alerts for critical thresholds, and trends in space allocation over various time frames. Widgets within the dashboard include timeseries graphs, query tables, and status summaries that allow users to track metrics like total, used, and available space efficiently. Additionally, the dashboard offers dynamic filtering options through template variables, making it highly customizable for specific database instances or clusters. This tool is essential for database administrators aiming to maintain optimal performance and preempt potential space-related issues in their systems.

#### dbXplorer - Status Summary 
The "dbXplorer - Status Summary" dashboard provides a concise view of status and logs for database operations. It features "Availability Logs" that display events related to database availability, sorted by various parameters such as timestamp and instance name. Another widget, "dbXplorer Logs," organizes log data from database transactions into a summarized view, grouping by logger name and showing counts of logs by severity. The "Status Summary" widget offers an overview of statuses in a list and count format, prioritizing the data display based on the severity of issues.

#### dbXplorer - Oracle LMS
The "dbXplorer - Oracle LMS" dashboard focuses on Oracle License Management Services (LMS), and tracks and reports on the usage of database features that are relevant for licensing. It features a visualization of CPU count which helps in understanding the scale of database operations and the potential licensing needs. Additionally, the dashboard includes detailed feature usage statistics, which executes complex queries to map database features to products, classifying the usage into categories like current and past usage, and managing exceptions in feature reporting. While this dashboard is an essential tool for database administrators to ensure compliance with Oracle licensing requirements it should not be relied on exclusively for licensing purposes.


### 前提条件

- Oracle database versions from 19c EE using Oracle Grid Infrastructure are supported. Collection from earlier database versions or serverless installations are not supported.

- This integration requires an Oracle Diagnostic and Tuning Pack license. If you do not wish to use or license this pack, be sure to disable the collection of ASH and AWR metrics. An explanation of how to collect or disable these metrics can be found in the setup instructions.

## サポート
For support or feature requests, reach out to [support.datadog@itunified.de][1] 

[1]: mailto:support.datadog@itunified.de
[2]: https://docs.oracle.com/en/database/oracle/oracle-database/19/refrn/statistics-descriptions-2.html#GUID-2FBC1B7E-9123-41DD-8178-96176260A639
[3]: https://hub.docker.com/repository/docker/itunified/dbxagent/general
[4]: https://app.datadoghq.com/monitors/recommended?q=dbXplorer&only_installed=false&p=1

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/itunified-ug-dbxplorer" target="_blank">Click Here</a> to purchase this application.