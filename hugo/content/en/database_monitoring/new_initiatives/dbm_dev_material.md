---
title: DBD
private: true
disable_toc: false
---

## Overview

DBD (Database Development) gives developers production database context at the moment they need it most. By surfacing real telemetry directly in the development workflow, Database Lab's helps engineers understand the downstream impact of their changes without requiring deep database expertise or manual investigation.

PR Comments is the first milestone of Database Lab. It is a GitHub plugin that surfaces insights from Database Monitoring in relevant pull requests. When a PR adds or modifies a query or migration, the bot posts a comment with risk assessments, production impact, and optimization suggestions to be proactive before production regresses. For existing queries, it correlates changes against live DBM telemetry, surfacing execution volume, average execution time, share of total database workload, and links to DBM query signatures. At this time, net new queries with no historical data in DBM are unsupported by the existing assessments. In the future, our workbench milestone will address this limitation.

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

## Supported technologies

- Go
- Java
- YAML

## Supported databases

- PostgreSQL
- MySQL
- Microsoft SQL Server
- Oracle
- ClickHouse
- MongoDB
- Supabase
