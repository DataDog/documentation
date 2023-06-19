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
The features described on this page are in private beta.
</div>

## Supported Oracle versions, features, and architectures

- **Versions**: 19c and 21c
- **Deployment configurations**: self-managed, RDS, RAC, Exadata
- **Architecture**: multi-tenant

The following deployment configurations, components, and features are not supported: Oracle Autonomous Database, ASM, and Data Guard.

The Oracle versions below 19c are not supported.

## Supported Agent versions

The following custom build is supported: `7.44.1~dbm~oracle~beta~0.28`

# Prerequisites

1. **Install the Oracle integration.** Install the Oracle integration in your organization by opening the [Oracle integration](https://app.datadoghq.com/integrations/oracle) in the Datadog App and clicking "Install." This will install an Oracle dashboard in your account which can be used to monitor the performance of your Oracle databases.
2. **Upgrade the Oracle integration in your Agent.** You may skip this step if this is your first time installing the Oracle integration. Migrate the Oracle configuration from the the legacy `conf.d/oracle.d/` directory to the new integration path located in the `conf.d/oracle-dbm.d/` directory.

Use the following command to migrate the Oracle integration from the legacy integration to the new one:

```bash
mv /etc/datadog-agent/conf.d/oracle.d/conf.yaml /etc/datadog-agent/conf.d/oracle-dbm.d/conf.yaml
```

## Setup

For setup instructions, select your hosting type:

{{< partial name="dbm/dbm-setup-oracle" >}}
