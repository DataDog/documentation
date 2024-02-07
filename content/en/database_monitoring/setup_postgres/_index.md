---
title: Setting up Postgres
kind: documentation
description: Setting up Database Monitoring on a Postgres database
disable_sidebar: true
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

### Postgres versions supported

|  | Self-hosted | Amazon RDS | Amazon Aurora | Google Cloud SQL | Azure |
|--|------------|---------|------------|------------------|---------|
| Postgres 9.6 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 10 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 11 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 12 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 13 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 14 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 15 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |
| Postgres 16 | {{< X >}} | {{< X >}} | {{< X >}} |  |  |

For setup instructions, select your hosting type:

{{< partial name="dbm/dbm-setup-postgres" >}}

### Agent integration overhead

Agent integration overhead tests were made on an Amazon EC2 machine `c5.xlarge` instance (4 VCPU/ 8GB RAM). The database used for the tests was a PostgreSQL 14.10 instance running on an Amazon RDS `db.m5.large` instance (2 VCPU/ 8GB RAM). The database was running a TPC-C workload with 20 warehouses.

| Setting                           | Collection Interval |
| --------------------------------- | ------------------- |
| Check Min Collection Interval     | 15s                 |
| Query Metrics Collection Interval | 10s                 |
| Query Samples Collection Interval | 10s                 |
| Settings Collection Interval      | 600s                |
| Schema Collection Interval        | 600s                |

Agent Test version: `7.50.2`
CPU: `~ 0.98%` of the CPU used on average
Memory: `~ 290 MiB` of RAM used (RSS memory)
Network bandwidth: `~ 28 KiB/s` ▼ | `23 KiB/s` ▲
Agent query overhead on database: `~ 1%` CPU Time
