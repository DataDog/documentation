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
- **Deployment configurations**: Self-managed, RDS, RAC, Exadata
- **Architecture**: Multi-tenant

The following deployment configurations, components, and features are not supported: Oracle Autonomous Database, ASM, and Data Guard.


## Latest Agent version

The following beta build contains implemented Oracle DBM features: `7.44.1~dbm~oracle~beta~0.28`.

## Prerequisites

### Install the Oracle integration

On the [**Integrations**][1] page in Datadog, install the [Oracle integration][2] for your organization. This will install an Oracle dashboard in your account which can be used to monitor the performance of your Oracle databases.

### Upgrade the Oracle integration in your Agent

You can skip this step if this is your first time installing the Oracle integration. If you already installed the Oracle integration, migrate the legacy configuration from the `conf.d/oracle.d/` directory to the new integration path located in the `conf.d/oracle-dbm.d/` directory.

Use the following command to migrate the Oracle integration from the legacy integration to the new one:

```bash
cp /etc/datadog-agent/conf.d/oracle.d/conf.yaml /etc/datadog-agent/conf.d/oracle-dbm.d/conf.yaml
```

Deactivate the legacy integration:

```bash
mv /etc/datadog-agent/conf.d/oracle.d/conf.yaml /etc/datadog-agent/conf.d/oracle.d/conf.yaml
```

Deactivating the legacy integration prevents sending the system metrics twice.

Since the Agent doesn't require an external Oracle client, remove the `jdbc_driver_path` configuration parameter from the new parameter file `/etc/datadog-agent/conf.d/oracle-dbm.d/conf.yaml`. 

### Install Agent

To start collecting Oracle telemetry, first install the Datadog Agent [install the Datadog Agent][3]. 

The Agent does not need to run on the same server nor the same platform as the monitored databases.

Datadog recommends you install the version listed in the [Latest agent version](#latest-agent-version). It contains all the implemented Oracle monitoring features and bug fixes.

If the latest agent version is an official Datadog Agent release, like `7.46.0`, follow the instructions in [Official release](#official-release). If the latest Agent version is a beta build, such as `7.44.1~dbm~oracle~beta~0.28`, follow the instructions in [Beta build](#beta-build).

#### Official release

Follow the [instructions for your platform][3]. 

#### Beta build

##### Linux

Set `DD_API_KEY` and run the following commands to install the beta release, for example:

```bash
export DD_AGENT_DIST_CHANNEL=beta
export DD_AGENT_MINOR_VERSION="44.1~dbm~oracle~beta~0.28-1"

DD_API_KEY= DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
```

##### Windows

Download the [beta build][4].

Set `APIKEY`ß and run the following command in the command prompt inside the directory where you downloaded the installer, for example:

```shell
start /wait msiexec /qn /i datadog-agent-7.44.1-dbm-oracle-beta-0.28-1.x86_64.msi APIKEY="" SITE="datadoghq.com"```

##### Docker

Set `DD_API_KEY` and run the following command to install the beta release, for example:

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY="" -e DD_SITE="datadoghq.com" gcr.io/datadoghq/agent:7.44.1-dbm-oracle-beta-0.28```

### Oracle client

Agent doesn't require any external Oracle clients.

## Setup

For setup instructions, select your hosting type:

{{< partial name="dbm/dbm-setup-oracle" >}}

[1]: https://app.datadoghq.com/integrations
[2]: https://app.datadoghq.com/integrations/oracle
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://s3.amazonaws.com/ddagent-windows-stable/beta/datadog-agent-7.44.1-dbm-oracle-beta-0.28-1.x86_64.msi
