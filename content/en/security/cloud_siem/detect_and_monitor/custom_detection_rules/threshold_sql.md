---
title: Threshold (SQL query)
disable_toc: false
---

## Overview

The threshold detection method supports a SQL-based detection framework that lets you define detection rules using SQL. See DDSQL Reference to see the available syntax. You can create a SQL detection rule using:

- [Datasets](#datasets)
- [Table functions](#table-functions)

## Datasets

A dataset is a table representation of raw data, such as logs, events, Audit Trail events, and events from Events Management. When you define a dataset, you set which columns and fields are available for SQL querying and aggregation. SQL detection rules reference these datasets to execute the queries. You can use more than one dataset in a single query.

## Table functions

Table columns can be renamed using the field `alias` and can have the following types:

- `int64`
- `float64`
- `timestamp`
- `array<string>`
- `array<int64>`
- `array<float64>`

### Supported data sources

Table functions support the following data sources:
- Audit Trail events
- Events from Event Management
- Logs
- Reference Tables
- Security signals

### Required fields

When creating an SQL-based rule, these are the required fields for:
- All data sources, except Reference tables:
    - `search`
    - `columns`
- Reference Tables:
    - table name

### Additional fields

Additional fields you can configure:
- `queryLanguage`: Must be set to `sql`.
- `datasetIds`: List of dataset IDs referenced in the query. This is optional because they are not needed if table functions are used.
``schedulingOptions`: Scheduling definition for periodic evaluation (already introduced for scheduled rules).

## Limitations

- Rules execute queries on a schedule. Large result sets are limited. Filtering and aggregation should occur mainly inside the SQL query.
- Only threshold aggregations over result rows are supported today.
- Datasets cannot be removed through the UI.
