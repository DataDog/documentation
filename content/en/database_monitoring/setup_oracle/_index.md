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

## Prerequisites

### Install the Oracle integration

On the [Integrations][1] page in Datadog, install the [Oracle integration][2] for your organization. This will install an [Oracle dashboard][5] in your account which can be used to monitor the performance of your Oracle databases.

### Upgrade the Oracle integration in your Agent

You can skip this step if this is your first time installing the Oracle integration. If you already installed the Oracle integration, migrate the legacy configuration from the `conf.d/oracle.d/` directory to the new integration path located in the `conf.d/oracle-dbm.d/` directory.

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

### Install the Agent

To start collecting Oracle telemetry, first install the Datadog Agent.

The Agent does not need to run on the same server nor the same platform as the monitored databases, and can be installed remotely using one of the suggested [setup architectures][10].

Datadog recommends you install the version listed in the [Latest Agent version](#latest-agent-version). It contains all the implemented Oracle monitoring features and bug fixes.

If the latest Agent version is an official Datadog Agent release, like `7.46.0`, follow the instructions in [Official release](#official-release). If the latest Agent version is a beta build, such as `7.46.0~dbm~oracle~beta~0.33`, follow the instructions in [Beta build](#beta-build).

#### Official release

Follow the [instructions for your platform][3].

#### Beta build

##### Linux

The repository with RHEL and Ubuntu beta builds are [here][6] and [here][7], respectively.

Set `DD_API_KEY` and run the following commands to install the beta release, for example:

```shell
export DD_AGENT_DIST_CHANNEL=beta
export DD_AGENT_MINOR_VERSION="46.0~dbm~oracle~beta~0.33-1"

DD_API_KEY= DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
```

##### Windows

The repository with Windows builds is [here][8].

Download the MSI file for the [beta build][4].

Set `APIKEY` and run the following command in the command prompt inside the directory where you downloaded the installer, for example:

```shell
start /wait msiexec /qn /i datadog-agent-7.46.0-dbm-oracle-beta-0.33-1.x86_64.msi APIKEY="" SITE="datadoghq.com"
```

##### Docker

The docker beta images can be found [here][9].

Set `DD_API_KEY` and run the following command to install the beta release, for example:

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY="" -e DD_SITE="datadoghq.com" gcr.io/datadoghq/agent:7.46.0-dbm-oracle-beta-0.33
```

##### Latest Agent version

The following beta builds contain implemented Oracle DBM features:
- Linux: `7.46.0~dbm~oracle~beta~0.33-1`
- Windows: `7.46.0-dbm-oracle-beta-0.33-1`
- Docker: `7.46.0-dbm-oracle-beta-0.33`

### Oracle client

The Agent doesn't require any external Oracle clients.

### Upgrading from a previous Agent release

Execute all `grant` permission commands according to the documentation for your hosting type. New features need access to system views that were not previously granted to the Datadog database user account.

## Custom queries

Database Monitoring supports custom queries for Oracle databases. To learn more about the configuration options available, see the [conf.yaml.example][11].

<div class="alert alert-warning">Running custom queries may result in additional costs or fees assessed by Oracle.</div>

## Setup

For setup instructions, select your hosting type:

{{< partial name="dbm/dbm-setup-oracle" >}}

[1]: https://app.datadoghq.com/integrations
[2]: https://app.datadoghq.com/integrations/oracle
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://s3.amazonaws.com/ddagent-windows-stable/beta/datadog-agent-7.46.0-dbm-oracle-beta-0.33-1.x86_64.msi
[5]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[6]: https://yum.datadoghq.com/beta/7/x86_64/
[7]: https://apt.datadoghq.com/dists/beta/7/
[8]: https://ddagent-windows-stable.s3.amazonaws.com/
[9]: https://hub.docker.com/r/datadog/agent/tags?page=1&name=oracle
[10]: /database_monitoring/architecture/
[11]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle-dbm.d/conf.yaml.example