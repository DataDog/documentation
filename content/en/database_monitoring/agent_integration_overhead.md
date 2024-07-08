---
title: DBM Agent Integration Overhead
description: Learn about the overhead of integrating the Datadog Agent with your database

---

## Overview

Database Monitoring runs on top of the base Datadog Agent. By default, it’s configured with optimal performance settings to minimize impact on your system. However, you have the flexibility to adjust parameters like data collection frequency and query sampling to better suit your workloads.

This page contains the results of integration overhead tests conducted against databases with Datadog Database Monitoring enabled.

## Overhead testing results

{{< tabs >}}
{{% tab "Postgres" %}}
Postgres integration overhead tests were run on an Amazon EC2 machine `c5.xlarge` instance (4 vCPUs, 8 GB RAM). The database used for the tests was a PostgreSQL 14.10 instance running on an Amazon RDS `db.m5.large` instance (2 vCPUs, 8 GB RAM). The database was running a TPC-C workload with 20 warehouses.

| Setting                           | Collection Interval |
| --------------------------------- | ------------------- |
| Check Min Collection Interval     | 15s                 |
| Query Metrics Collection Interval | 10s                 |
| Query Samples Collection Interval | 10s                 |
| Settings Collection Interval      | 600s                |
| Schema Collection Interval        | 600s                |

* Agent Test version: `7.50.2`
* CPU: ~1% of the CPU used on average
* Memory: ~300 MiB of RAM used (RSS memory)
* Network bandwidth: ~30 KB/s ▼ | 30 KB/s ▲
* Agent query overhead on database: ~1% CPU Time

**Note**: The network bandwidth is the sum of the incoming and outgoing traffic from the Agent to the monitored database and the Datadog backend.
{{% /tab %}}

{{% tab "MySQL" %}}
MySQL integration overhead tests were run on an Amazon EC2 machine `c5.xlarge` instance (4 vCPUs, 8 GB RAM). The database used for the tests was a MySQL 8.0 instance running on an Amazon RDS `db.m5.large` instance (2 vCPUs, 8 GB RAM). The database was running a TPC-C workload with 20 warehouses.

| Setting                              | Collection Interval |
| ------------------------------------ | ------------------- |
| Check Min Collection Interval        | 15s                 |
| Query Metrics Collection Interval    | 10s                 |
| Query Activities Collection Interval | 10s                 |
| Query Samples Collection Interval    | 1s                  |
| Settings Collection Interval         | 600s                |

* Agent Test version: `7.50.2`
* CPU: ~2% of the CPU used on average
* Memory: ~300 MiB of RAM used (RSS memory)
* Network bandwidth: ~40 KB/s ▼ | 30 KB/s ▲
* Agent query overhead on database: ~1% CPU Time

**Note**: The network bandwidth is the sum of the incoming and outgoing traffic from the Agent to the monitored database and the Datadog backend.
{{% /tab %}}

{{% tab "SQL Server" %}}
SQL Server integration overhead tests were run on an Amazon EC2 machine `c5.xlarge` instance (4 vCPUs, 8 GB RAM). The database used for the tests was a SQL Server 2019 Standard Edition instance running on an Amazon RDS `db.m5.large` instance (2 vCPUs, 8 GB RAM). The database was running a TPC-C workload with 20 warehouses.

| Setting                              | Collection Interval |
| ------------------------------------ | ------------------- |
| Check Min Collection Interval        | 15s                 |
| Query Metrics Collection Interval    | 60s                 |
| Query Activities Collection Interval | 10s                 |
| Settings Collection Interval         | 600s                |

* Agent Test version: `7.50.2`
* CPU: ~1% of the CPU used on average
* Memory: ~300 MiB of RAM used (RSS memory)
* Network bandwidth: ~40 KB/s ▼ | 30 KB/s ▲
* Agent query overhead on database: ~1% CPU Time

**Note**: The network bandwidth is the sum of the incoming and outgoing traffic from the Agent to the monitored database and the Datadog backend.
{{% /tab %}}

{{% tab "Oracle" %}}
Oracle integration overhead tests were run on an Amazon EC2 machine `c5.xlarge` instance (4 vCPUs, 8 GB RAM). The database used for the tests was a Oracle 19c instance running on an Amazon RDS `db.m5.large` instance (2 vCPUs, 8 GB RAM). The database was running a TPC-C workload with 20 warehouses.

| Setting                              | Collection Interval |
| ------------------------------------ | ------------------- |
| Check Min Collection Interval        | 10s                 |
| Query Metrics Collection Interval    | 60s                 |
| Query Activities Collection Interval | 10s                 |

* Agent Test version: `7.53.0`
* CPU: ~0.2% of the CPU used on average
* Memory: ~270 MiB of RAM used (RSS memory)
* Network bandwidth: ~6 KB/s ▼ | 4 KB/s ▲
* Agent query overhead on database: ~0.2% CPU Time

**Note**: The network bandwidth is the sum of the incoming and outgoing traffic from the Agent to the monitored database and the Datadog backend.
{{% /tab %}}
{{< /tabs >}}
