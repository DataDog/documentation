---
title: Setting Up Database Monitoring for Supabase Cloud
description: Install and configure Database Monitoring for Supabase with the Supabase Cloud integration.
further_reading:
    - link: '/integrations/supabase-cloud/'
      tag: 'Documentation'
      text: 'Supabase Cloud Integration'
    - link: '/integrations/postgres/'
      tag: 'Documentation'
      text: 'Basic Postgres Integration'
    - link: '/database_monitoring/setup_postgres/supabase/agent'
      tag: 'Documentation'
      text: 'Supabase Self-Hosted Setup (Agent Installation)'
---

Database Monitoring for Supabase Cloud provides visibility into your Supabase databases by exposing query performance metrics and query samples — without requiring a self-hosted Datadog Agent.

<div class="alert alert-info">For self-hosted Supabase deployments that require a Datadog Agent, see <a href="/database_monitoring/setup_postgres/supabase/agent">Supabase Self-Hosted Setup</a>.</div>

## Prerequisites

- A Supabase project with a Postgres database.
- Your Supabase **Project ID** (found in your Supabase project settings).
- Your Supabase **API key** (found in your Supabase project settings under **API**).
- A Supabase **Personal Access Token** with access to the Management API.

## Setup

{{< img src="database_monitoring/supabase_cloud_integration_tile.png" alt="Supabase Cloud integration tile configuration" style="width:80%;" >}}

1. Navigate to the [Supabase integration tile][1] in Datadog.
1. Click **Add Account**.
1. Enter your Supabase **Project ID** and **API Key**.
1. Select **Enable Database Monitoring for query performance optimizations**.
1. Enter your **Personal Access Token**.
1. Click **Save**.

Datadog connects to your Supabase project and begins collecting Database Monitoring telemetry. No Agent installation is required.

<div class="alert alert-info">Each Supabase project must be configured separately. Adding new projects to a connected Supabase account does not automatically enable Database Monitoring.</div>

## Data collected

After you enable Database Monitoring, Datadog collects the following telemetry from your Supabase Cloud database:

### Query performance metrics
Sourced from `pg_stat_statements`, collected every 5 seconds:
- Call count and rows processed
- Total and average execution time
- Shared and local buffer hit/read/dirty/write statistics
- Block I/O read and write time
- Temporary buffer read and write counts

### Query samples
Sourced from `pg_stat_activity`, collected every 5 seconds:
- Active and idle query snapshots
- Obfuscated query text and query signatures
- Wait event types and event names
- Session state and backend type
- Blocking PIDs
- Connection aggregates grouped by application, state, user, and database

### Database instance metadata
Collected every 5 minutes:
- PostgreSQL version
- Instance identifier and hostname
- Connection mode (direct or pooler)

## Validate

After setup, navigate to the [Database Monitoring][2] page in Datadog to see your Supabase database queries and performance metrics.

{{< img src="database_monitoring/supabase_cloud_product.png" alt="Database Monitoring overview for a Supabase Cloud instance" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/supabase-cloud
[2]: https://app.datadoghq.com/databases
