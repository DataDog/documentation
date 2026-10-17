---
title: Oracle Configurations
description: Configure Oracle instance scoping for Database Monitoring using PDB-level, CDB listener, and CDB$ROOT approaches.
further_reading:
- link: "/database_monitoring/architecture/"
  tag: "Documentation"
  text: "DBM Setup Architectures"
- link: "/database_monitoring/setup_oracle/"
  tag: "Documentation"
  text: "Setting up Oracle"
---

## Overview

Each check instance in the Datadog Agent configuration creates one Database Monitoring (DBM) instance. The [database_identifier](/database_monitoring/guide/database_identifier/) template determines what the Agent considers a distinct DBM instance.

The key configuration lever is `service_name`, which determines whether you connect to `CDB$ROOT` or a specific PDB.

Available template variables: `$resolved_hostname`, `$server`, `$port`, `$service_name`, `$cdb_name` (from `v$database`), plus any key from tags.

Common users (C## prefix, created with `CONTAINER=ALL`) are required for multitenant monitoring.

For non-multitenant Oracle (pre-12c or non-CDB), use host-level scoping with `$resolved_hostname`.

**Scenario**: `oracle-prod.example.com` with two Oracle CDBs:

| CDB | Port | PDBs |
|---|---|---|
| ORCL | 1521 | CRMDB, ERPDB |
| FINDB | 1522 | ACCOUNTS |

## Option 1: PDB level (recommended)

<div class="alert alert-info">Use PDB-level scoping (<code>$cdb_name-$service_name</code>). Connecting through each PDB's service name gives isolated DBM data scoped to that PDB's session activity. Add a <code>CDB$ROOT</code> entry alongside PDB entries if you also need server-level Oracle metrics visible only from <code>CDB$ROOT</code>.</div>

One entry per PDB using the PDB-specific service name. Each connection scopes directly into that PDB. Metrics, query samples, and explain plans reflect only that PDB's activity.

Based on the example scenario above, this counts as three DBM instances.

```yaml
instances:
  - server: oracle-prod.example.com:1521
    service_name: CRMDB
    username: c##datadog
    password: "<PASSWORD>"
    dbm: true
    database_identifier:
      template: "$cdb_name-$service_name"  # → "orcl-CRMDB"

  - server: oracle-prod.example.com:1521
    service_name: ERPDB
    username: c##datadog
    password: "<PASSWORD>"
    dbm: true
    database_identifier:
      template: "$cdb_name-$service_name"  # → "orcl-ERPDB"

  - server: oracle-prod.example.com:1522
    service_name: ACCOUNTS
    username: c##datadog
    password: "<PASSWORD>"
    dbm: true
    database_identifier:
      template: "$cdb_name-$service_name"  # → "findb-ACCOUNTS"
```

The Agent automatically adds a `pdb:<name>` tag when it detects a PDB connection.

## Option 2: CDB listener level

<div class="alert alert-info">Use CDB listener level when you need to monitor all PDBs through a single connection per CDB. All PDBs are visible through <code>CDB_*</code> views from <code>CDB$ROOT</code>.</div>

One entry per CDB listener (port). Both CDBs are covered with distinct identifiers.

Based on the example scenario above, this counts as two DBM instances.

```yaml
instances:
  - server: oracle-prod.example.com:1521
    service_name: ORCL
    username: c##datadog
    password: "<PASSWORD>"
    dbm: true
    database_identifier:
      template: "$resolved_hostname:$port"  # → "oracle-prod.example.com:1521"

  - server: oracle-prod.example.com:1522
    service_name: FINDB
    username: c##datadog
    password: "<PASSWORD>"
    dbm: true
    database_identifier:
      template: "$resolved_hostname:$port"  # → "oracle-prod.example.com:1522"
```

## Option 3: CDB$ROOT level

<div class="alert alert-info">Use CDB$ROOT level when logical container names are preferred over network addresses in identifiers. Coverage is the same as Option 2.</div>

Same connections as Option 2, but the identifier uses `$cdb_name` to reflect the logical container name rather than the network address.

Based on the example scenario above, this counts as two DBM instances.

```yaml
instances:
  - server: oracle-prod.example.com:1521
    service_name: ORCL
    username: c##datadog
    password: "<PASSWORD>"
    dbm: true
    database_identifier:
      template: "$cdb_name"     # → "orcl"

  - server: oracle-prod.example.com:1522
    service_name: FINDB
    username: c##datadog
    password: "<PASSWORD>"
    dbm: true
    database_identifier:
      template: "$cdb_name"     # → "findb"
```

`service_name` is the scope selector: CDB service name connects to `CDB$ROOT`, PDB service name connects to that PDB. `$cdb_name` is resolved live from `v$database.NAME`.

## Managed services

### Oracle Autonomous Database

Oracle Autonomous Database (ADB) requires mutual TLS (mTLS) through an Oracle Wallet. Use predefined service names representing workload profiles (`_high`, `_medium`, `_low`, `_tp`, `_tpurgent`).

```yaml
instances:
  - server: adb.example.oraclecloud.com:1522
    service_name: mydb_high
    username: ADMIN
    password: "<PASSWORD>"
    protocol: TCPS
    wallet: /path/to/wallet_mydb
    dbm: true
    database_identifier:
      template: "$resolved_hostname:$port"
```

### Oracle Exadata

Exadata is a hardware platform. Apply the scoping approach based on the Oracle architecture deployed on it: CDB/PDB → PDB level; RAC → one entry per node; standalone → host level.

### Oracle RAC (Real Application Clusters)

Connect to each RAC node individually through its local listener. Never use the SCAN address. It may route to a different node between check cycles.

```yaml
instances:
  # RAC Node 1
  - server: rac-node1.example.com:1521
    service_name: ORCL
    username: c##datadog
    password: "<PASSWORD>"
    dbm: true
    reported_hostname: rac-node1
    database_identifier:
      template: "$cdb_name-node1"

  # RAC Node 2
  - server: rac-node2.example.com:1521
    service_name: ORCL
    username: c##datadog
    password: "<PASSWORD>"
    dbm: true
    reported_hostname: rac-node2
    database_identifier:
      template: "$cdb_name-node2"
```

{{< partial name="whats-next/whats-next.html" >}}
