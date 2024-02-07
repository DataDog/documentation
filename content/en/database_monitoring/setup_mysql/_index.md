---
title: Setting up MySQL
kind: documentation
description: Setting up Database Monitoring on a MySQL database
disable_sidebar: true
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

### MySQL versions supported

|  | Self-hosted | Amazon RDS | Amazon Aurora | Google Cloud SQL with >26GB RAM | Azure |
|--|------------|---------|------------|------------------|---------|
| MySQL 5.6 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |
| MySQL 5.7 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| MySQL 8.0 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |

For setup instructions, select your hosting type:

{{< partial name="dbm/dbm-setup-mysql" >}}

<br>

### Agent integration overhead

Agent integration overhead tests were made on an Amazon EC2 machine `c5.xlarge` instance (4 VCPU/ 8GB RAM). The database used for the tests was a MySQL 8.0 instance running on an Amazon RDS `db.m5.large` instance (2 VCPU/ 8GB RAM). The database was running a TPC-C workload with 20 warehouses.

| Setting                              | Collection Interval |
| ------------------------------------ | ------------------- |
| Check Min Collection Interval        | 15s                 |
| Query Metrics Collection Interval    | 10s                 |
| Query Activities Collection Interval | 10s                 |
| Query Samples Collection Interval    | 1s                  |
| Settings Collection Interval         | 600s                |

* Agent Test version: `7.50.2`
* CPU: `~ 1.48%` of the CPU used on average
* Memory: `~ 273 MiB` of RAM used (RSS memory)
* Network bandwidth: `~ 35.2 KiB/s` ▼ | `22.2 KiB/s` ▲
* Agent query overhead on database: `~ 1%` CPU Time
