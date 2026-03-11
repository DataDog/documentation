---
title: Building applications with the Database Monitoring API
further_reading:
- link: "/database_monitoring/"
  tag: "Documentation"
  text: "Database Monitoring"
- link: "/database_monitoring/query_metrics/"
  tag: "Documentation"
  text: "Exploring Query Metrics"
- link: "/database_monitoring/query_samples/"
  tag: "Documentation"
  text: "Query Samples and Explain Plans"
- link: "/api/latest/metrics/"
  tag: "Documentation"
  text: "Metrics API"
---

Database Monitoring data is accessible through the Datadog API, which lets you build custom tooling, automated analysis pipelines, and integrations with external systems. This guide explains the data entities captured by DBM, how to query each one through the API, and how to combine them to answer questions about query performance.

## Data entities

DBM captures three distinct types of data, each accessible through a different endpoint.

| Entity | Description | API |
|--------|-------------|-----|
| **Query Metrics** | Aggregated performance timeseries per normalized query, tagged by `query_signature` and `database_instance` | Metrics scalar API |
| **Query Samples** | Point-in-time snapshots of active queries captured by the Datadog Agent | DBM logs analytics endpoint |
| **Explain Plans** | Query execution plans collected continuously alongside query samples | DBM logs analytics endpoint |

Two fields act as join keys across all three entity types:

- `query_signature` — a hash of the normalized SQL text that uniquely identifies a query regardless of which host ran it
- `database_instance` — identifies the specific database instance, allowing you to correlate metrics and samples from the same host when the same query runs across multiple instances

## Before you begin

- You must have [Database Monitoring configured][2].
- You must have a **Datadog API key** and an **unscoped application key**. The DBM logs analytics endpoint requires the `built_in_features` scope, which is only available on unscoped application keys.
  - Find or create your API keys at **Organization Settings > API Keys**.
  - Find or create your application keys at **Organization Settings > Application Keys**.

Set these environment variables before running the examples below:

```shell
export DD_API_KEY="<YOUR_API_KEY>"
export DD_APP_KEY="<YOUR_APP_KEY>"    # Must be an unscoped application key for DBM endpoints
export DD_SITE="datadoghq.com"        # Replace with your Datadog site
export NOW=$(date -u +%s000)          # Current time in milliseconds
export FROM=$(( NOW - 4*3600*1000 ))  # 4 hours ago in milliseconds
```

See [Datadog sites][3] for the correct `DD_SITE` value for your organization.

## Query metrics

Query metrics are aggregated performance timeseries about normalized queries. They are available as standard Datadog metrics (for example, `postgresql.queries.time`, `postgresql.queries.count`) tagged by `query_signature`, `host`, `service`, and other infrastructure tags. Use the [scalar metrics API][1] to retrieve them.

**Endpoint:** `POST https://api.<DD_SITE>/api/v2/query/scalar`

```shell
curl -X POST "https://api.${DD_SITE}/api/v2/query/scalar" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "type": "scalar_request",
      "attributes": {
        "from": '"${FROM}"',
        "to": '"${NOW}"',
        "formulas": [
          {
            "formula": "query1",
            "limit": {
              "count": 100,
              "order": "desc"
            }
          }
        ],
        "queries": [
          {
            "name": "query1",
            "data_source": "metrics",
            "query": "sum:postgresql.queries.time{env:prod} by {query_signature,host,service}",
            "aggregator": "sum"
          }
        ]
      }
    }
  }'
```

| Field | Description |
|-------|-------------|
| `data.type` | Must be `scalar_request` |
| `data.attributes.from` / `to` | Time range as **milliseconds** since Unix epoch |
| `data.attributes.formulas[].formula` | References a named query by its `name` field |
| `data.attributes.formulas[].limit` | Ranks and limits results; `order` is `desc` or `asc` |
| `data.attributes.queries[].data_source` | Must be `metrics` |
| `data.attributes.queries[].query` | Metric query string. Scope with tags (for example, `{env:prod}`) and group with `by {tag}`. Key DBM metrics: `postgresql.queries.time`, `postgresql.queries.count`, `postgresql.queries.errors`, `postgresql.queries.rows` |
| `data.attributes.queries[].aggregator` | How to collapse the time range into a scalar: `sum`, `avg`, `max`, or `min` |

The response `columns` array contains one `group` column (with `query_signature` values) and one `number` column (with the aggregated metric values), aligned by index.

## Query samples

Query samples are point-in-time snapshots of active queries captured by the Datadog Agent. They are stored as `dbm_type:activity` records in the `databasequery` index and are accessible through the logs analytics list endpoint.

Before writing a query programmatically, you can prototype and validate search syntax interactively on the [Query Samples page][4].

**Endpoint:** `POST https://app.<DD_SITE>/api/v1/logs-analytics/list?type=databasequery`

```shell
curl -X POST "https://app.${DD_SITE}/api/v1/logs-analytics/list?type=databasequery" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "list": {
      "indexes": ["databasequery"],
      "limit": 25,
      "search": {
        "query": "dbm_type:activity @db.query_signature:44c22fe3377aff9b @service:my-service @env:prod"
      },
      "sorts": [
        {"time": {"order": "desc"}}
      ],
      "time": {
        "from": '"${FROM}"',
        "to": '"${NOW}"'
      }
    }
  }'
```

| Field | Description |
|-------|-------------|
| `list.indexes` | Must be `["databasequery"]` |
| `list.limit` | Number of events to return (max 1000) |
| `list.search.query` | Datadog search syntax. `dbm_type:activity` filters to query samples. Narrow results with `@db.query_signature:<sig>`, `@service:<name>`, `@env:<env>`, `@host:<host>`, or `@db.instance:<instance>` |
| `list.sorts` | Sort order; `time.order` is `desc` or `asc` |
| `list.time.from` / `to` | Time range as **milliseconds** since Unix epoch |

Each record in `result.events` contains query details at `event.custom.db`, including:

| Attribute | Description |
|-----------|-------------|
| `event.custom.db.statement` | Normalized SQL text |
| `event.custom.db.query_signature` | Query signature hash |
| `event.custom.db.wait_event` | Active wait event name, if any |
| `event.custom.db.wait_event_type` | Wait event category (for example, `Lock`, `IPC`) |
| `event.custom.db.rows` | Number of rows returned or affected |

## Explain plans

Explain plans are query execution plans captured continuously by the Datadog Agent alongside query samples. They are stored as `dbm_type:plan` records in the same index. Use `@db.query_signature` to retrieve plans for a specific query. Multiple plans may exist for the same query if the planner chose different strategies over time.

**Endpoint:** `POST https://app.<DD_SITE>/api/v1/logs-analytics/list?type=databasequery`

```shell
curl -X POST "https://app.${DD_SITE}/api/v1/logs-analytics/list?type=databasequery" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "list": {
      "indexes": ["databasequery"],
      "limit": 10,
      "search": {
        "query": "dbm_type:plan @db.query_signature:44c22fe3377aff9b"
      },
      "sorts": [
        {"time": {"order": "desc"}}
      ],
      "time": {
        "from": '"${FROM}"',
        "to": '"${NOW}"'
      }
    }
  }'
```

| Field | Description |
|-------|-------------|
| `list.search.query` | `dbm_type:plan` filters to explain plans. Add `@db.query_signature:<sig>` to retrieve plans for a specific query |

Each record in `result.events` contains plan details at `event.custom.db`, including:

| Attribute | Description |
|-----------|-------------|
| `event.custom.db.statement` | Normalized SQL text for the query |
| `event.custom.db.query_signature` | Query signature hash |
| `event.custom.db.plan.definition` | PostgreSQL JSON explain plan (string-encoded) |
| `event.custom.db.plan.cost` | Estimated total cost from the planner |
| `event.custom.db.plan.signature` | Hash of the plan structure, used to identify distinct plans for the same query |

## Example: identify top queries with sequential scans

The following example combines all three entity types to produce a report of your highest-impact queries that contain sequential scans in their explain plans. Sequential scans (full table scans) read every row in a table and can degrade performance significantly as table size grows.

The approach:
1. Query `postgresql.queries.time` metrics to find the top 100 queries by total execution time
2. For each `query_signature`, fetch the most recent explain plan from DBM
3. Parse the plan JSON for `Seq Scan` nodes and report the table and estimated cost

### Prerequisites

Python 3.8 or later with the `requests` library:

```shell
pip install requests
```

### Code

```python
#!/usr/bin/env python3
"""
Identify top PostgreSQL queries that contain sequential scans.

Uses the Datadog Metrics API to find the top 100 queries by total execution
time, then fetches their explain plans from Database Monitoring and reports
any that contain Seq Scan nodes.
"""

import json
import os
import sys
import time
from dataclasses import dataclass, field

import requests

# --- Configuration -----------------------------------------------------------

DD_SITE = os.environ.get("DD_SITE", "app.datadoghq.com")
DD_API_KEY = os.environ.get("DD_API_KEY", "")
DD_APP_KEY = os.environ.get("DD_APP_KEY", "")

if not DD_API_KEY or not DD_APP_KEY:
    sys.exit("Error: DD_API_KEY and DD_APP_KEY environment variables must be set.")

_bare_site = DD_SITE.removeprefix("app.").removeprefix("api.")
API_BASE_URL = f"https://api.{_bare_site}"
APP_BASE_URL = f"https://app.{_bare_site}"

HEADERS = {
    "DD-API-KEY": DD_API_KEY,
    "DD-APPLICATION-KEY": DD_APP_KEY,
    "Content-Type": "application/json",
}

# How far back to look when fetching metrics and explain plans (in hours).
LOOKBACK_HOURS = 4

# Number of top queries to analyze.
TOP_QUERY_LIMIT = 100


# --- Data classes ------------------------------------------------------------

@dataclass
class SeqScan:
    """A sequential scan node found in an explain plan."""
    table: str
    cost: float


@dataclass
class QueryReport:
    """A query that contains one or more sequential scan nodes."""
    query_signature: str
    sql: str
    seq_scans: list = field(default_factory=list)  # list[SeqScan]


# --- API helpers -------------------------------------------------------------

def get_top_queries(limit: int, lookback_hours: int) -> list:
    """
    Return the top N PostgreSQL queries by total execution time.

    Uses the scalar metrics API to query `postgresql.queries.time` grouped by
    `query_signature`, sorted in descending order.
    """
    # The scalar API expects milliseconds since epoch for from/to.
    now_ms = int(time.time() * 1000)
    start_ms = now_ms - (lookback_hours * 3600 * 1000)

    payload = {
        "data": {
            "type": "scalar_request",
            "attributes": {
                "formulas": [
                    {
                        "formula": "query1",
                        "limit": {"count": limit, "order": "desc"},
                    }
                ],
                "queries": [
                    {
                        "name": "query1",
                        "data_source": "metrics",
                        "query": "sum:postgresql.queries.time{*} by {query_signature}",
                        "aggregator": "sum",
                    }
                ],
                "from": start_ms,
                "to": now_ms,
            },
        }
    }

    resp = requests.post(
        f"{API_BASE_URL}/api/v2/query/scalar",
        headers=HEADERS,
        json=payload,
        timeout=30,
    )
    resp.raise_for_status()

    columns = resp.json()["data"]["attributes"]["columns"]
    group_col = next(c for c in columns if c["type"] == "group")
    value_col = next(c for c in columns if c["type"] == "number")

    results = []
    for group_values, total_time in zip(group_col["values"], value_col["values"]):
        # group_values is a list with one element per group-by tag
        query_signature = group_values[0] if isinstance(group_values, list) else group_values
        if query_signature:
            results.append({"query_signature": query_signature, "total_time": total_time})

    return results


def get_explain_plans(query_signature: str, lookback_hours: int) -> list:
    """
    Return the most recent explain plans for a given query signature.

    Queries the Database Monitoring endpoint for records of type `dbm_type:plan`
    matching the given `query_signature`.

    Note: This endpoint requires an unscoped application key.
    """
    now_ms = int(time.time() * 1000)
    start_ms = now_ms - (lookback_hours * 3600 * 1000)

    payload = {
        "list": {
            "indexes": ["databasequery"],
            "limit": 5,
            "search": {
                "query": f"dbm_type:plan @db.query_signature:{query_signature}",
            },
            "sorts": [{"time": {"order": "desc"}}],
            "time": {"from": start_ms, "to": now_ms},
        }
    }

    resp = requests.post(
        f"{APP_BASE_URL}/api/v1/logs-analytics/list?type=databasequery",
        headers=HEADERS,
        json=payload,
        timeout=30,
    )
    resp.raise_for_status()
    # Response uses result.events (v1 logs-analytics format)
    return resp.json().get("result", {}).get("events", [])


# --- Explain plan analysis ---------------------------------------------------

def find_seq_scans(plan_node: dict) -> list:
    """
    Recursively find all Seq Scan nodes in a PostgreSQL explain plan tree.

    Returns a list of SeqScan objects, each with the table name and total cost.
    """
    seq_scans = []

    if plan_node.get("Node Type") == "Seq Scan":
        seq_scans.append(
            SeqScan(
                table=plan_node.get("Relation Name", "unknown"),
                cost=float(plan_node.get("Total Cost", 0.0)),
            )
        )

    for child in plan_node.get("Plans", []):
        seq_scans.extend(find_seq_scans(child))

    return seq_scans


def extract_seq_scans_from_record(record: dict) -> tuple:
    """
    Extract the SQL text and sequential scan nodes from a DBM plan record.

    Returns (sql_text, list_of_SeqScan). Returns (None, []) if the record
    cannot be parsed.
    """
    # DBM v1 response: event data is under record["event"]["custom"]["db"]
    db = record.get("event", {}).get("custom", {}).get("db", {})

    sql = db.get("statement", "")
    plan_definition = db.get("plan", {}).get("definition", "")

    if not plan_definition:
        return sql, []

    try:
        plan_json = (
            json.loads(plan_definition)
            if isinstance(plan_definition, str)
            else plan_definition
        )
    except (json.JSONDecodeError, TypeError):
        return sql, []

    # PostgreSQL EXPLAIN JSON output can be a list with one element
    if isinstance(plan_json, list):
        plan_json = plan_json[0]

    root_node = plan_json.get("Plan", plan_json)
    return sql, find_seq_scans(root_node)


# --- Main --------------------------------------------------------------------

def analyze(limit: int = TOP_QUERY_LIMIT, lookback_hours: int = LOOKBACK_HOURS) -> list:
    """
    Fetch the top queries and return those that contain sequential scans.
    """
    print(f"Fetching top {limit} queries by total execution time (last {lookback_hours}h)...")
    top_queries = get_top_queries(limit=limit, lookback_hours=lookback_hours)

    if not top_queries:
        print("No query metrics found for the selected time window.")
        return []

    print(f"Found {len(top_queries)} queries. Checking explain plans...\n")

    reports = []
    for i, q in enumerate(top_queries, 1):
        sig = q["query_signature"]
        print(f"[{i:3d}/{len(top_queries)}] {sig[:24]}...", end="\r")

        plans = get_explain_plans(sig, lookback_hours=lookback_hours)
        if not plans:
            continue

        # Use the most recent plan record
        sql, seq_scans = extract_seq_scans_from_record(plans[0])

        if seq_scans:
            reports.append(QueryReport(query_signature=sig, sql=sql, seq_scans=seq_scans))

    print()  # clear the progress line
    return reports


def print_report(reports: list) -> None:
    """Print a formatted report of queries with sequential scans."""
    if not reports:
        print("No sequential scans found in the top queries for this time window.")
        return

    print(f"\n{'=' * 80}")
    print(f"  {len(reports)} top quer{'y' if len(reports) == 1 else 'ies'} with sequential scans")
    print(f"{'=' * 80}\n")

    for report in reports:
        sql_preview = report.sql[:200] + ("..." if len(report.sql) > 200 else "")
        print(f"Query signature : {report.query_signature}")
        print(f"SQL             : {sql_preview}")
        print(f"Sequential scans:")
        for scan in report.seq_scans:
            print(f"  Table: {scan.table:<30s}  Estimated cost: {scan.cost:.2f}")
        print()


if __name__ == "__main__":
    reports = analyze()
    print_report(reports)
```

### Run the script

```shell
export DD_SITE="datadoghq.com"       # Replace with your Datadog site
export DD_API_KEY="<YOUR_API_KEY>"
export DD_APP_KEY="<YOUR_APP_KEY>"   # Must be an unscoped application key

python identify_sequential_scans.py
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/metrics/#query-scalar-data-across-multiple-products
[2]: /database_monitoring/setup_postgres/
[3]: /getting_started/site/
[4]: https://app.datadoghq.com/databases/samples
