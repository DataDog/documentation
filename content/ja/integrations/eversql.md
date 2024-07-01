---
"app_id": "eversql"
"app_uuid": "bc900600-d0cf-4ddf-83b7-cdaba44d1525"
"assets": {}
"author":
  "homepage": "https://eversql.com"
  "name": EverSQL
  "sales_email": sales@eversql.com
  "support_email": support@eversql.com
"categories":
- automation
- data stores
- developer tools
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/eversql/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "eversql"
"integration_id": "eversql"
"integration_title": "EverSQL: Database Tuning"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "eversql"
"public_title": "EverSQL: Database Tuning"
"short_description": "Automatic SQL and Database Tuning for MySQL, PostgreSQL, Aurora"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Automation"
  - "Category::Data Stores"
  - "Category::Developer Tools"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Automatic SQL and Database Tuning for MySQL, PostgreSQL, Aurora
  "media":
  - "caption": EverSQL SQL optimization
    "image_url": images/1.png
    "media_type": image
  - "caption": EverSQL query diff
    "image_url": images/2.png
    "media_type": image
  - "caption": EverSQL supported databases
    "image_url": images/3.png
    "media_type": image
  - "caption": EverSQL supported OS
    "image_url": images/4.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "EverSQL: Database Tuning"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[EverSQL][1] is a way to speed up your database and optimize SQL queries, providing automatic SQL tuning and indexing for developers, DBAs, and DevOps engineers.

EverSQL is non-intrusive, and doesn't access any of your databases' sensitive data.

### Usage

Slow SQL queries found in the Datadog Database Monitoring dashboard can be optimized using EverSQL. Copy the slow SQL query from Datadog and paste it directly into EverSQL's [SQL Optimization][2] process. Learn more about troubleshooting a slow query in the [Getting Started with Database Monitoring][3] guide.

### Supported Databases: 
MySQL, PostgreSQL, AWS Aurora, Google Cloud SQL, Azure DB, Percona, MariaDB.

## Setup

### Configuration
To speed up slow SQL queries identified by Datadog:
1. Navigate to the [Datadog Database Monitoring][4] dashboard and locate the slow SQL queries table.
2. Add a filter for the relevant database, and sort by a relevant performance metric, such as Average Latency.
3. Once you identify the SQL query you'd like to speed up, copy it from Datadog.
4. Navigate to [EverSQL][2] and paste the SQL query as part of the query optimization process.
5. From the optimization report, copy and create the optimal indexes in your database.
6. Copy the rewritten optimized query to your application code.

## Data Collected

### Metrics

EverSQL does not include any metrics.

### Service Checks

EverSQL does not include any service checks.

### Events

EverSQL does not include any events.

## Support

Need help? Contact [EverSQL support][5].

[1]: https://www.eversql.com/
[2]: https://www.eversql.com/sql-query-optimizer/
[3]: https://docs.datadoghq.com/getting_started/database_monitoring/#troubleshoot-a-slow-query
[4]: https://app.datadoghq.com/databases/
[5]: https://eversql.freshdesk.com/support/tickets/new

