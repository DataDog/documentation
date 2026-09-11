---
title: DBM Dev - PR Comments
private: true
disable_toc: false
---

## Overview

DBM Dev: PR Comments is a GitHub bot that surfaces Database Monitoring production insights directly inside pull requests. When a PR introduces or modifies a query or database migration, the bot automatically posts a comment with risk assessments, production impact data, and optimization suggestions — before issues reach production. For existing queries, the bot correlates changes against live DBM telemetry and surfaces execution volume, average execution time, share of total database workload, and links back to DBM query signatures. For new queries, the bot assesses for anti-patterns and includes optimization suggestions regardless of production history. Comments are informational and do not block merges.

## What is required

To enable PR Comments, the following must be in place:

1. **Active Database Monitoring** — the bot relies on DBM telemetry. Customers without DBM cannot receive signals.
2. **Datadog GitHub App installed** — the GitHub integration must be installed and connected to the relevant repositories. Request access to all repositories; negotiate for as many as possible if full access is not granted.
3. **Feature flag enabled** — contact the DBM team to have the feature flag applied to the customer account.

Once the above are in place, the bot enters a shadow mode for 24–48 hours to validate signal quality before comments go live. No additional engineering setup is required after the integration is active.

## Supported databases

- PostgreSQL
- MySQL
- Microsoft SQL Server
- Oracle
- ClickHouse
- MongoDB
- Supabase
