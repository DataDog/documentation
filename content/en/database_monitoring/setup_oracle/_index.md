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
- Versions: 19c and 21c
- Deployment configurations: self-managed, RDS, RAC, Exadata
- Architecture: multi-tenant

The following deployment configurations, components, and features are not supported: Oracle Autonomous Database, ASM, and Data Guard.

# Prerequisites

1. In Datadog, install the Oracle integration for your organization.
2. The new Oracle DBM check is configured in the configuration directory `oracle-dbm.d`. The legacy Oracle check, which is configured in the conifguration directory `oracle.d`, has to be deactivated for the databases configured in `oracle-dbm.d`.

# Setup

For setup instructions, select your hosting type:

{{< partial name="dbm/dbm-setup-oracle" >}}
