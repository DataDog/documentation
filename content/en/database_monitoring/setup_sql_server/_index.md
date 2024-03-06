---
title: Setting up SQL Server
kind: documentation
description: Setting up Database Monitoring on a SQL Server database
disable_sidebar: true
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

### SQL Server versions supported

|                 | Self-hosted | Azure     | Amazon RDS | Google Cloud SQL |
|-----------------|-------------|-----------|------------|------------------|
| SQL Server 2012 | {{< X >}}   | {{< X >}} | {{< X >}}  |                  |
| SQL Server 2014 | {{< X >}}   | {{< X >}} | {{< X >}}  |                  |
| SQL Server 2016 | {{< X >}}   | {{< X >}} | {{< X >}}  |                  |
| SQL Server 2017 | {{< X >}}   | {{< X >}} | {{< X >}}  | {{< X >}}        |
| SQL Server 2019 | {{< X >}}   | {{< X >}} | {{< X >}}  | {{< X >}}        |
| SQL Server 2022 | {{< X >}}   | {{< X >}} | {{< X >}}  | {{< X >}}        |

For setup instructions, select your hosting type:

{{< partial name="dbm/dbm-setup-sql-server" >}}

<br>

### Agent integration overhead

Agent integration overhead tests were run on an Amazon EC2 machine `c5.xlarge` instance (4 vCPUs, 8 GB RAM). The database used for the tests was a SQL Server 2019 Standard Edition instance running on an Amazon RDS `db.m5.large` instance (2 vCPUs, 8 GB RAM). The database was running a TPC-C workload with 20 warehouses.

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
