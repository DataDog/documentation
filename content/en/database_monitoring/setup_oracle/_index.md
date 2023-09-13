---
title: Setting up Oracle
kind: documentation
description: Setting up Database Monitoring on an Oracle database
disable_sidebar: true
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

<div class="alert alert-info">
The features described on this page are in beta. Contact your Customer Success Manager to provide feedback or ask for help.
</div>

## Supported Oracle versions, features, and architectures

- **Versions**: 19c and 21c
- **Deployment configurations**: Self-managed, RDS, RAC, Exadata, Autonomous Database
- **Architecture**: Multi-tenant

## Overview

### Prerequisites

To configure Database Monitoring for Oracle, the following prerequisites must be met:

1. An [Agent version](#recommended-agent-version) that supports Oracle monitoring features must be installed.
    - [Install the Agent](#install-the-agent)
    - [Upgrade an existing Agent installation](#upgrade-from-a-previous-agent-release)
2. The Oracle integration must be installed.
    - [Install the Oracle integration](#install-the-oracle-integration)
    - [Verify an existing Oracle integration installation](#verify-your-existing-oracle-integration)

### Setup
If the above prerequisites are met, follow the setup instructions for your hosting type:
{{< partial name="dbm/dbm-setup-oracle" >}}

## Prerequisite details

### Install the Agent

#### Host requirements

The Agent does not need to run on the same server nor the same platform as the monitored databases, and can be installed remotely using one of the suggested [setup architectures][10].

#### Recommended Agent version

The following Oracle DBM builds are recommended, as they contain all the implemented Oracle monitoring features and bug fixes. The basis of an Oracle DBM build is always a stable Agent release.

- Linux: `7.46.0~dbm~oracle~0.34-1`
- Windows: `7.46.0-dbm-oracle-0.34-1`
- Docker: `7.46.0-dbm-oracle-0.34`

If you prefer an official Datadog Agent release, a minimum version of `7.46.0` is recommended.

- To install an Oracle build, see [Oracle DBM build installation](#oracle-dbm-build-installation).
- To install the latest official release, follow the [instructions for your platform][3]. 

#### Oracle client

The Agent doesn't require any external Oracle clients.

#### Oracle DBM build installation

{{< tabs >}}
{{% tab "Linux" %}}

The repository with Oracle DBM builds for RHEL and Ubuntu are [here][6] and [here][7], respectively.

Set `DD_API_KEY` and run the following commands to install the Oracle DBM release, for example:

```shell
export DD_AGENT_DIST_CHANNEL=beta
export DD_AGENT_MINOR_VERSION="46.0~dbm~oracle~0.34-1"

DD_API_KEY= DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
```

[6]: https://yum.datadoghq.com/beta/7/x86_64/
[7]: https://apt.datadoghq.com/dists/beta/7/
{{% /tab %}}
{{% tab "Windows" %}}

The repository with Windows builds is [here][8].

Download the MSI file for the [Oracle DBM build][4].

Set `APIKEY` and run the following command in the command prompt inside the directory where you downloaded the installer, for example:

```shell
start /wait msiexec /qn /i datadog-agent-7.46.0-dbm-oracle-0.34-1.x86_64.msi APIKEY="" SITE="datadoghq.com"
```
[4]: https://s3.amazonaws.com/ddagent-windows-stable/beta/datadog-agent-7.46.0-dbm-oracle-0.34-1.x86_64.msi
[8]: https://ddagent-windows-stable.s3.amazonaws.com/

{{% /tab %}}
{{% tab "Docker" %}}
The Oracle DBM images for Docker can be found [here][9].

Set `DD_API_KEY` and run the following command to install the Oracle DBM release, for example:

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY="" -e DD_SITE="datadoghq.com" gcr.io/datadoghq/agent:7.46.0-dbm-oracle-0.34
```

[9]: https://hub.docker.com/r/datadog/agent/tags?page=1&name=oracle
{{% /tab %}}
{{< /tabs >}}

### Upgrade an existing Agent installation

<div class="alert alert-info">For the latest Oracle monitoring features and bug fixes, <a href="/database_monitoring/setup_oracle/?tab=linux#recommended-agent-version">install the recommended Oracle DBM version</a> instead of upgrading your existing Agent below.</div>

If you have an existing Agent installation:

1. Verify that your Agent version meets the recommended minimum of `7.46.0`, upgrading to a newer version if necessary.
    - To upgrade from `>7.0.0`, see [Upgrade Between Minor Versions][15].
    - To upgrade from v5 or v6, see [Upgrade to Datadog Agent v7][20].
2. Execute all `grant` permission commands according to the documentation for your hosting type. New features need access to system views that were not previously granted to the Datadog database user account.

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

[1]: https://app.datadoghq.com/integrations
[2]: https://app.datadoghq.com/integrations/oracle
[3]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[10]: /database_monitoring/architecture/
[15]: /agent/versions/upgrade_between_agent_minor_versions/?tab=linux
[20]: /agent/versions/upgrade_to_agent_v7/?tab=linux