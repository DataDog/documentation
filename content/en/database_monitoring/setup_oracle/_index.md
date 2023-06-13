---
title: Setting up Oracle
kind: documentation
description: Setting up Database Monitoring on an Oracle database
disable_sidebar: true
private: true
is_beta: true
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

<div class="alert alert-info">
The features described on this page are in private beta. Contact your Customer Success Manager for information on the required Agent build and installation instructions.
</div>

Supported:
- versions: 19c and 21c
- deployment configurations: self-managed, RDS, RAC, Exadata
- architecture: multi-tenant

Not supported deployment configurations, components and features: Oracle Autonomous Databae, ASM, Data Guard.

# Prerequisites

1. Install Oracle integration in your org in-app.
2. Disable checks in `oracle.d`.

# Setup

For setup instructions, select your hosting type:

{{< partial name="dbm/dbm-setup-oracle" >}}
