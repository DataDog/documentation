---
title: MongoDB Configurations
description: Configure MongoDB instance scoping for Database Monitoring across replica sets, standalone, and sharded cluster topologies.
further_reading:
- link: "/database_monitoring/architecture/"
  tag: "Documentation"
  text: "DBM Setup Architectures"
- link: "/database_monitoring/setup_mongodb/"
  tag: "Documentation"
  text: "Setting up MongoDB"
---

## Overview

Each check instance in the Datadog Agent configuration creates one Database Monitoring (DBM) instance. MongoDB's monitoring topology uses multiple check instances sharing a `cluster_name`, rather than a single entry with scope flags. MongoDB has no [database_identifier](/database_monitoring/guide/database_identifier/) template. Identity is driven by `cluster_name` combined with the hostname auto-detected from `serverStatus`.

**Scenario**: Three deployment types:

| Topology | Nodes |
|---|---|
| Standalone | `mongo-standalone.example.com:27017` |
| Replica set | Primary: `mongo-rs1.example.com:27017`; Secondaries: `mongo-rs2.example.com:27017`, `mongo-rs3.example.com:27017` |
| Sharded cluster | mongos: `mongos.example.com:27017`; Shard primary: `mongo-rs1.example.com:27017`; Config server: `configsvr.example.com:27017` |

## Replica set

<div class="alert alert-info">For replica sets, use one entry per replica member. This is the only way to get replication lag and per-node metrics. Do not use <code>replicaSet</code> in options. The Agent expects to always connect to the same host.</div>

One check instance per replica set member. All members share the same `cluster_name` so the Agent builds a topology view.

In this topology, this counts as three DBM instances.

```yaml
instances:
  # Primary
  - hosts:
      - mongo-rs1.example.com:27017
    username: datadog
    password: "<PASSWORD>"
    database: admin
    dbm: true
    cluster_name: my-replica-set
    database_autodiscovery:
      enabled: true

  # Secondary 1
  - hosts:
      - mongo-rs2.example.com:27017
    username: datadog
    password: "<PASSWORD>"
    database: admin
    dbm: true
    cluster_name: my-replica-set
    database_autodiscovery:
      enabled: true

  # Secondary 2
  - hosts:
      - mongo-rs3.example.com:27017
    username: datadog
    password: "<PASSWORD>"
    database: admin
    dbm: true
    cluster_name: my-replica-set
    database_autodiscovery:
      enabled: true
```

## Standalone

<div class="alert alert-info">For standalone deployments, one entry per host is sufficient. All databases are auto-discovered.</div>

In this topology, this counts as one DBM instance.

```yaml
instances:
  - hosts:
      - mongo-standalone.example.com:27017
    username: datadog
    password: "<PASSWORD>"
    database: admin
    dbm: true
    cluster_name: my-standalone-cluster
    database_autodiscovery:
      enabled: true
```

## Sharded cluster

<div class="alert alert-info">For sharded clusters, configure one entry per mongos router, one per shard member, and one per config server, all sharing the same <code>cluster_name</code>.</div>

In this topology, this counts as three DBM instances.

```yaml
instances:
  # mongos router
  - hosts:
      - mongos.example.com:27017
    username: datadog
    password: "<PASSWORD>"
    database: admin
    dbm: true
    cluster_name: my-sharded-cluster
    options:
      directConnection: "false"      # required when listing multiple mongos hosts
    additional_metrics:
      - jumbo_chunks
      - sharded_data_distribution

  # Shard primary
  - hosts:
      - mongo-rs1.example.com:27017
    username: datadog
    password: "<PASSWORD>"
    database: admin
    dbm: true
    cluster_name: my-sharded-cluster

  # Config server replica set member
  - hosts:
      - configsvr.example.com:27017
    username: datadog
    password: "<PASSWORD>"
    database: admin
    dbm: true
    cluster_name: my-sharded-cluster
```

## Multiple mongod processes

<div class="alert alert-info">Use <code>reported_database_hostname</code> to disambiguate multiple mongod processes running on the same host on different ports.</div>

In this topology, this counts as two DBM instances.

```yaml
instances:
  - hosts:
      - mongo-standalone.example.com:27017
    username: datadog
    password: "<PASSWORD>"
    database: admin
    dbm: true
    cluster_name: my-standalone-cluster
    reported_database_hostname: mongo-standalone.example.com:27017

  - hosts:
      - mongo-standalone.example.com:27018
    username: datadog
    password: "<PASSWORD>"
    database: admin
    dbm: true
    cluster_name: my-standalone-cluster
    reported_database_hostname: mongo-standalone.example.com:27018
```

## Recommendation

MongoDB scoping is determined by deployment topology, not configuration preference:

| Topology | Configuration |
|---|---|
| Standalone | One entry per host |
| Replica set | One entry per replica member |
| Sharded cluster | One entry per mongos + one per shard member + one per config server, all sharing `cluster_name` |

The most important configuration decision is `cluster_name`. It must be unique per cluster and identical across all members of the same cluster.

## Managed services

### Amazon DocumentDB

```yaml
instances:
  - hosts:
      - mydocdb.cluster-cfxgae8cilcf.us-east-1.docdb.amazonaws.com:27017
    username: datadog
    password: "<PASSWORD>"
    database: admin
    tls: true
    tls_ca_file: /path/to/rds-combined-ca-bundle.pem
    dbm: true
    cluster_name: my-docdb-cluster
    aws:
      instance_endpoint: mydocdb.cfxgae8cilcf.us-east-1.docdb.amazonaws.com
      cluster_identifier: mydocdb
```

**Note**: DocumentDB has MongoDB wire-protocol compatibility limitations. Operation samples (`$currentOp`) and query metrics (`$queryStats`) are not supported. Expect most DBM features to be non-functional or degraded.

### MongoDB Atlas

For dedicated tiers (M10+), use per-node connection strings:

```yaml
instances:
  - hosts:
      - atlas-shard-00-00.xxxxx.mongodb.net:27017
    username: datadog
    password: "<PASSWORD>"
    database: admin
    tls: true
    dbm: true
    cluster_name: my-atlas-cluster

  - hosts:
      - atlas-shard-00-01.xxxxx.mongodb.net:27017
    username: datadog
    password: "<PASSWORD>"
    database: admin
    tls: true
    dbm: true
    cluster_name: my-atlas-cluster

  - hosts:
      - atlas-shard-00-02.xxxxx.mongodb.net:27017
    username: datadog
    password: "<PASSWORD>"
    database: admin
    tls: true
    dbm: true
    cluster_name: my-atlas-cluster
```

For free/shared tiers (M0, M2, M5), use the SRV cluster hostname. Per-node replication metrics are not available at these tiers.

```yaml
instances:
  - hosts:
      - cluster0.xxxxx.mongodb.net
    connection_scheme: mongodb+srv
    username: datadog
    password: "<PASSWORD>"
    database: admin
    tls: true
    dbm: true
    cluster_name: my-atlas-cluster
```

{{< partial name="whats-next/whats-next.html" >}}
