---
title: PostgreSQL Source
description: Learn how to use the PostgreSQL source in a logs pipeline.
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Databases are often used to store many historical, audit, or operational records. For many legacy, enterprise resource planning (ERP), and IoT-based systems, these databases serve as storage layers for important information. Teams often depend on these records for monitoring, alerting, and creating dashboards in their preferred logging or security tool.

The Observability Pipelines' PostgreSQL source allows you to connect to your database so you can query and process the data in Observability Pipelines, and route your log events that are stored as database records.

**Note**: The Observability Pipelines Worker can only execute read-only SQL queries against supported databases.

### When to use this source

{{% observability_pipelines/database_source/when_to_use_this_source %}}

## Prerequisites

{{% observability_pipelines/database_source/prerequisites %}}

### External tools for testing

Datadog recommends these tools for testing:

- Third-party tools:
  - DBeaver
  - DataGrip
  - TablePlus
  - DbVisualizer
- Native Postgres tools: psql or pgAdmin

## Set up the source in the pipeline UI

TKTK

## Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/database %}}

## Incremental queries

{{% observability_pipelines/database_source/incremental_queries %}}

## Error handling

{{% observability_pipelines/database_source/error_handling %}}

## Limits and requirements

{{% observability_pipelines/database_source/limits_and_requirements %}}

## Recommended monitors

{{% observability_pipelines/database_source/recommended_monitors %}}