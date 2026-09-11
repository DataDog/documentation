---
title: Database Lab - PR Comments
private: true
disable_toc: false
---

## Overview

Database Lab gives developers production database context at the moment they need it most. By surfacing real telemetry directly in the development workflow, Database Lab's helps engineers understand the downstream impact of their changes without requiring deep database expertise or manual investigation.

PR Comments is the first milestone of Database Lab. It is a GitHub plugin that surfaces insights from Database Monitoring in relevant pull requests. When a PR adds or modifies a query or migration, the bot posts a comment with risk assessments, production impact, and optimization suggestions before issues reach production. For existing queries, it correlates changes against live DBM telemetry, surfacing execution volume, average execution time, share of total database workload, and links to DBM query signatures. Net new queries are a concept that will be supported soon as Database Lab's expands the capabilities of ephemeral databases. Comments are informational and never block merges.

## What is required

To enable PR Comments, the following must be in place:

1. **Active Database Monitoring** — the bot relies on DBM telemetry. Customers without DBM cannot receive signals.
2. **Datadog GitHub App installed** — the GitHub integration must be installed and connected to the relevant repositories. Request access to all repositories; negotiate for as many as possible if full access is not granted.
3. **Feature flag enabled** — contact the DBM team to have the feature flag applied to the customer account.
## What's next

| Milestone | Description |
| --- | --- |
| **Rules and Customizations** | Customers can upload their own logic for the PR bot to apply to relevant PRs. Experience similar to SKILLs for frontier models, helps with enforcing team-specific best practices and guardrails automatically at review time. |
| **Workbench** | Access an ephemeral database to test changes, versions, migrations, and new queries before opening a PR, against databases that mirror production. |

## Supported databases

- PostgreSQL
- MySQL
- Microsoft SQL Server
- Oracle
- ClickHouse
- MongoDB
- Supabase
