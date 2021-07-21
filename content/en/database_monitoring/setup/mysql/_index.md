---
title: Setting up MySQL
kind: documentation
description: Setting up Database Monitoring on a MySQL database
---

{{< site-region region="us3,gov" >}} 
<div class="alert alert-warning">Database Monitoring is not supported in this region.</div>
{{< /site-region >}}

### MySQL versions supported

|  | Self-hosted | AWS RDS | AWS Aurora | Google Cloud SQL |
|--|------------|---------|------------|------------------|
| MySQL 5.6 | Yes | Yes | Yes | Yes (see Note) |
| MySQL 5.7 | Yes | Yes | Yes | Yes (see Note) |
| MySQL 5.8 | Yes | Yes | Yes | Yes (see Note) |

**Note**: Due to limitations with Google Cloud SQL, Datadog Database Monitoring is [not supported on instances with less than 26GB of RAM][1] because [`performance_schema`][2] cannot be enabled.

For setup instructions, select your database type:

partial

<br>


