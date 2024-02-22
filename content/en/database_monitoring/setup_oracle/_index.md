---
title: Setting up Oracle
kind: documentation
description: Setting up Database Monitoring on an Oracle database
disable_sidebar: false
further_reading:
- link: "https://www.datadoghq.com/blog/oracle-database-performance-monitoring-datadog/"
  tag: "blog"
  text: "Monitor Oracle managed databases with Datadog DBM"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

## Supported Oracle versions, features, and architectures

- **Versions**: 11.2, 12c, 18c, 19c, and 21c
- **Deployment configurations**: Self-managed, RDS, RAC, Exadata, Autonomous Database
- **Architecture**: Multi-tenant, non-CDB, RDS single-tenant

## Overview

### Prerequisites

To configure Database Monitoring for Oracle, the following prerequisites must be met:

1. An Agent version that supports Oracle monitoring features must be installed (`7.50.1` or greater).
    - [Install the Agent](#install-the-agent)
    - [Upgrade an existing Agent installation](#upgrade-an-existing-agent-installation)
2. The Oracle integration must be installed.
    - [Install the Oracle integration](#install-the-oracle-integration)
    - [Verify an existing Oracle integration installation](#verify-your-existing-oracle-integration)

### Setup
If the above prerequisites are met, follow the setup instructions for your hosting type:
{{< partial name="dbm/dbm-setup-oracle" >}}

## Prerequisite details

### Install the Agent

See the [DBM Setup Architecture][10] documentation to determine where to install the Agent. The Agent doesn't require any external Oracle clients.

To install the Agent, follow the [instructions for your platform][3].

### Upgrade an existing Agent installation

Execute all `grant` permission commands according to the documentation for your hosting type. New features need access to system views that you did not previously grant to the Datadog database user account.

### Install the Oracle integration

On the Integrations page in Datadog, install the [Oracle integration][2] for your organization. This installs an [Oracle dashboard][5] in your account that can be used to monitor the performance of your Oracle databases.

### Verify your existing Oracle integration

You can skip this step if this is your first time installing the Oracle integration. 

For an existing installation, verify that your configuration is located in the `conf.d/oracle-dbm.d/` directory. You may need to migrate the legacy configuration from the `conf.d/oracle.d/` directory.

Use the following command to migrate the Oracle integration from the legacy integration to the new one:

```shell
cp /etc/datadog-agent/conf.d/oracle.d/conf.yaml /etc/datadog-agent/conf.d/oracle-dbm.d/conf.yaml
```

Deactivate the legacy integration:

```shell
mv /etc/datadog-agent/conf.d/oracle.d/conf.yaml /etc/datadog-agent/conf.d/oracle.d/conf.yaml.bak
```

Deactivating the legacy integration prevents sending the system metrics twice.

Since the Agent doesn't require an external Oracle client, remove the `jdbc_driver_path` configuration parameter from the new parameter file `/etc/datadog-agent/conf.d/oracle-dbm.d/conf.yaml`.

If the above prerequisites are met, follow the [setup instructions](#setup) for your hosting type.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations
[2]: https://app.datadoghq.com/integrations/oracle
[3]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[10]: /database_monitoring/architecture/
[15]: /agent/versions/upgrade_between_agent_minor_versions/?tab=linux
[20]: /agent/versions/upgrade_to_agent_v7/?tab=linux