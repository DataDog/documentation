---
title: Datadog Agent v6 Changes
kind: faq
---

## Overview

Datadog Agent v6 contains many changes compared to previous Agent versions. The changes and deprecations are listed in the sections below.

## Features

The following Agent v5 features are **not available** in Agent v6:

* [Using the Agent as a Proxy][1]
* [Custom emitters][2]
* [Dogstream][3]
* [go-metro][4]
* Graphite support

## Configuration

Prior versions of the Datadog Agent stored configuration files in `/etc/dd-agent`. For Agent v6.0+, configuration files are stored in `/etc/datadog-agent`.

{{< tabs >}}
{{% tab "Agent" %}}

The [Agent's main configuration file][1] has transitioned from **INI** to **YAML** format to support complex configurations and provide a consistent experience across the Agent and checks.

Agent v5 `datadog.conf` --> Agent v6 `datadog.yaml`

To transition between Agent configuration paths and formats, use the Agent command:
```bash
sudo -u dd-agent -- datadog-agent import
```

This command parses an existing `datadog.conf` and converts supported parameters to the new format in `datadog.yaml`. The command also copies configuration files for checks that are currently enabled.

### Configuration options

The following Agent configuration options were changed or removed in Agent v6. Configuration options removed were either superseded by other options, or related to features that work differently from previous versions.

#### Changed

| Previous Name               | Updated Name                 | Notes                                                                                             |
|-----------------------------|------------------------------|---------------------------------------------------------------------------------------------------|
| `proxy_host`                | `proxy`                      | Proxy settings are now expressed as a list of URIs. See the [proxy][2] documentation for details. |
| `collect_instance_metadata` | `enable_metadata_collection` | Enables metadata collection                                                                       |
| `collector_log_file`        | `log_file`                   |                                                                                                   |
| `syslog_host`               | `syslog_uri`                 | The Syslog configuration is now expressed as a URI.                                               |
|                             | `syslog_pem`                 | Syslog configuration client certificate for TLS client validation.                                |
|                             | `syslog_key`                 | Syslog configuration client private key for TLS client validation.                                |

#### Removed

| Name                         | Notes                                                                                                                 |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `proxy_port`                 | Superseded by `proxy`, see the [proxy][2] documentation for details.                                                  |
| `proxy_user`                 | Superseded by `proxy`, see the [proxy][2] documentation for details.                                                  |
| `proxy_password`             | Superseded by `proxy`, see the [proxy][2] documentation for details.                                                  |
| `proxy_forbid_method_switch` | Obsolete                                                                                                              |
| `use_mount`                  | Deprecated at the Agent-level and moved to the [Disk check][3].                                                       |
| `device_blacklist_re`        | Deprecated at the Agent-level and moved to the [Disk check][3] as `device_blacklist`.                                 |
| `use_curl_http_client`       | Obsolete                                                                                                              |
| `exclude_process_args`       | Deprecated feature                                                                                                    |
| `check_timings`              | Superseded by internal stats                                                                                          |
| `non_local_traffic`          | Superseded by `dogstatsd_non_local_traffic` for Dogstatsd and `apm_config.apm_non_local_traffic` for the Trace Agent. |
| `dogstatsd_target`           |                                                                                                                       |
| `dogstreams`                 | Deprecated feature, use the [Logs Agent][4] instead.                                                                  |
| `custom_emitters`            |                                                                                                                       |
| `forwarder_log_file`         | Superseded by `log_file`                                                                                              |
| `dogstatsd_log_file`         | Superseded by `log_file`                                                                                              |
| `jmxfetch_log_file`          | Superseded by `log_file`                                                                                              |
| `syslog_port`                | Superseded by `syslog_uri`                                                                                            |
| `check_freq`                 |                                                                                                                       |
| `collect_orchestrator_tags`  | Implemented in metadata collectors                                                                                    |
| `utf8_decoding`              |                                                                                                                       |
| `developer_mode`             |                                                                                                                       |
| `use_forwarder`              |                                                                                                                       |
| `autorestart`                |                                                                                                                       |
| `dogstream_log`              |                                                                                                                       |
| `use_curl_http_client`       |                                                                                                                       |
| `collect_security_groups`    | Obsolete, feature is available with the [AWS integration][5].                                                         |

[1]: /agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
[2]: /agent/proxy/?tab=agentv6
[3]: /integrations/disk
[4]: /logs
[5]: /integrations/amazon_web_services
{{% /tab %}}
{{% tab "Checks" %}}

Starting with v6, the Agent loads any valid YAML file in: `<AGENT_DIRECTORY>/conf.d/<CHECK_NAME>.d/`. This enables complex configurations to be broken down into multiple files.

For example, configuration files for the `http_check` could be:
```text
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

The Agent won't load configuration files from any sub-directories within a `<CHECK_NAME>.d` folder. This means this configuration is **NOT** loaded:
```text
/etc/datadog-agent/conf.d/http_check.d/prod.d/
├── backend.yaml
```

Autodiscovery template files are stored in the configuration folder as well. This is an example of the `redisdb` check configuration folder:
```text
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

The YAML files within a `<CHECK_NAME>.d` folder can have any name, as long as they have a `.yaml` or `.yml` extension. The standard name is `conf.yaml`.

To keep backwards compatibility, the Agent still picks up configuration files in the form: `<AGENT_DIRECTORY>/conf.d/<CHECK_NAME>.yaml` but migrating to the updated layout is strongly recommended.

### Configuration options

Agent v6 supports the following advanced options in a check's `instance` section:

| Option                    | Description                                                                                                              |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------|
| `min_collection_interval` | Set a different run interval in seconds, for checks that should run less frequently than the default 15 seconds interval |
| `empty_default_hostname`  | Submit metrics, events, and service checks with no hostname when set to `true`                                           |
| `tags`                    | Send custom tags in addition to the tags sent by the check.                                                              |

{{% /tab %}}
{{% tab "Environment variables" %}}

Most of the environment variables used in Agent v6 are **different** from previous versions. See the list of [environment variables for Agent v6][1].

**Note**: `DD_TAGS` is the same tag but in Agent v6, the format is space-separated. Previous versions were comma-separated, example for v6: `DD_TAGS="simple-tag-0 tag-key-1:tag-value-1"`

#### Proxies

For v6.4.0+, the Agent proxy settings can be overridden with the following environment variables:

| Env variable        | Description                                                       |
|---------------------|-------------------------------------------------------------------|
| `DD_PROXY_HTTP`     | The URL to use as a proxy for `http` requests.                    |
| `DD_PROXY_HTTPS`    | The URL to use as a proxy for `https` requests.                   |
| `DD_PROXY_NO_PROXY` | A space-separated list of URLs for which no proxy should be used. |

The standard environment variables (`HTTP_PROXY`, `HTTPS_PROXY`, and `NO_PROXY`) are supported in Agent v6. However, using the `DD_PROXY_*` variables is recommended. `DD_PROXY_*` variables have precedence over the other proxy variables.

The precedence order of Agent v6 proxy options is different from previous versions:

* Agent v6 uses the environment variables first and then the configuration file.
* Agent v6 overrides the values from the configuration file with the ones in the environment. This means that if both `proxy.http` and `proxy.https` are set in the configuration file but only `DD_PROXY_HTTPS` is set in the environment, the Agent uses the `https` value from the environment and the `http` value from the configuration file.

[1]: /agent/docker/#environment-variables
{{% /tab %}}
{{< /tabs >}}

## Logs

The Agent logs are still located in `/var/log/datadog/` (Linux) and `C:\ProgramData\Datadog\logs` (Windows).

Previous versions logged to multiple files (`collector.log`, `forwarder.log`, `dogstatsd.log`, etc). Starting with v6.0, the Agent logs to a single log file: `agent.log`.

## Interface

The Agent v6 command line interface is sub-command based. To see the list of available sub-commands, run:
```shell
<agent_binary> --help
```

To run a sub-command, the Agent binary must be invoked:
```shell
<agent_binary> <sub_command> <options>
```

Some options have their own set of flags and options detailed in a help message. For help with the `check` sub-command, run:
```shell
<agent_binary> check --help
```

Available sub-commands:

| Command         | Notes                                                                      |
|-----------------|----------------------------------------------------------------------------|
| check           | Run the specified check                                                    |
| configcheck     | Print all configurations loaded & resolved of a running agent              |
| diagnose        | Execute some connectivity diagnosis on your system                         |
| flare           | Collect a flare and send it to Datadog                                     |
| health          | Print the current agent health                                             |
| help            | Help about any command                                                     |
| hostname        | Print the hostname used by the Agent                                       |
| import          | Import and convert configuration files from previous versions of the Agent |
| installservice  | Installs the agent within the service control manager                      |
| launch-gui      | starts the Datadog Agent GUI                                               |
| regimport       | Import the registry settings into datadog.yaml                             |
| remove-service  | Removes the agent from the service control manager                         |
| restart-service | restarts the agent within the service control manager                      |
| start           | Start the Agent                                                            |
| start-service   | starts the agent within the service control manager                        |
| status          | Print the current status                                                   |
| stopservice     | stops the agent within the service control manager                         |
| jmx             | JMX troubleshooting                                                        |
| version         | Print the version info                                                     |

### Operating system changes

{{< tabs >}}
{{% tab "Linux" %}}

The major changes for Agent v6 on Linux are:

* Only the Agent's _lifecycle commands_ (`start`/`stop`/`restart`/`status`) should be run with `sudo service`/`sudo initctl`/`sudo systemctl`.
* All other commands must be invoked on the Agent binary, located in the `PATH` (`/usr/bin`) as `datadog-agent` by default. The `dd-agent` command is no longer available.
* The `info` sub-command has been renamed to `status`.
* Agent v6 does not ship a SysV-init script (previously located at `/etc/init.d/datadog-agent`).

#### Service lifecycle commands

The lifecycle commands didn't change if the `service` wrapper command is available on your system.
For example, on Ubuntu, the _lifecycle commands_ are:

| Command                              | Description                           |
|--------------------------------------|---------------------------------------|
| `sudo service datadog-agent start`   | Start the Agent as a service          |
| `sudo service datadog-agent stop`    | Stop the Agent service                |
| `sudo service datadog-agent restart` | Restart the Agent service             |
| `sudo service datadog-agent status`  | Print the status of the Agent service |

If the `service` wrapper command is not available on your system, use:

* On `upstart`-based systems: `sudo start/stop/restart/status datadog-agent`
* On `systemd`-based systems: `sudo systemctl start/stop/restart/status datadog-agent`

If you're unsure which init system your distribution uses by default, refer to the table below:

| distribution \ init system      | upstart                   | systemd                   | sysvinit                                  | Notes                         |
|---------------------------------|---------------------------|---------------------------|-------------------------------------------|-------------------------------|
| Amazon Linux (<= 2017.09)       | <i class="icon-tick"></i> |                           |                                           |                               |
| Amazon Linux 2 (>= 2017.12)     |                           | <i class="icon-tick"></i> |                                           |                               |
| CentOS/RHEL 6                   | <i class="icon-tick"></i> |                           |                                           |                               |
| CentOS/RHEL 7                   |                           | <i class="icon-tick"></i> |                                           |                               |
| Debian 7 (wheezy)               |                           |                           | <i class="icon-tick"></i> (Agent v6.6.0+) |                               |
| Debian 8 (jessie) & 9 (stretch) |                           | <i class="icon-tick"></i> |                                           |                               |
| SUSE 11                         |                           |                           |                                           | Unsupported without `systemd` |
| SUSE 12                         |                           | <i class="icon-tick"></i> |                                           |                               |
| Ubuntu < 15.04                  | <i class="icon-tick"></i> |                           |                                           |                               |
| Ubuntu >= 15.04                 |                           | <i class="icon-tick"></i> |                                           |                               |

#### Agent commands

Other functionalities are now provided by the Agent binary itself as sub-commands and shouldn't be invoked with `service`/`systemctl`/`initctl`. Here are a few examples:

| Agent5 Command                                    | Agent6 Command                                         | Notes                          |
|---------------------------------------------------|--------------------------------------------------------|--------------------------------|
| `sudo service datadog-agent info`                 | `sudo datadog-agent status`                            | Status page of a running Agent |
| `sudo service datadog-agent flare`                | `sudo datadog-agent flare`                             | Send flare                     |
| `sudo service datadog-agent`                      | `sudo datadog-agent --help`                            | Display Agent usage            |
| `sudo -u dd-agent -- dd-agent check <check_name>` | `sudo -u dd-agent -- datadog-agent check <check_name>` | Run a check                    |

{{% /tab %}}
{{% tab "Windows" %}}

Agent v6 deprecated the Agent v5 Windows Agent Manager GUI, replacing it with a browser-based, cross-platform manager. For details, see the [Datadog Agent Manager for Windows][1].

There are a few major changes
* the main executable name is now `agent.exe` (it was `ddagent.exe` previously)
* Commands should be run with the command line `"c:\program files\datadog\datadog agent\embedded\agent.exe" <command>` from an "As Administrator" command prompt.
* The configuration GUI is now a web-based configuration application, it can be easily accessed by running
  the command `"c:\program files\datadog\datadog agent\embedded\agent.exe" launch-gui` or using the systray app.
* The Windows service is now started "Automatic-Delayed"; it is started automatically on boot, but after
  all other services.  This will result in a small delay in reporting of metrics after a reboot of a
  Windows device.
* The Windows GUI and Windows system tray icon are now implemented separately.  See the [specific docs][1] for more details.

[1]: /agent/guide/datadog-agent-manager-windows
{{% /tab %}}
{{% tab "MacOS" %}}

* the _lifecycle commands_ (former `datadog-agent start`/`stop`/`restart`/`status` on the Agent 5) are replaced by `launchctl` commands on the `com.datadoghq.agent` service, and should be run under the logged-in user. For these commands, you can also use the Datadog Agent systray app
* all the other commands can still be run with the `datadog-agent` command (located in the `PATH` (`/usr/local/bin/`) by default)
* the `info` command has been renamed `status`
* The configuration GUI is now a web-based configuration application, it can be easily accessed by running
  the command `datadog-agent launch-gui` or using the systray app.

A few examples:

| Agent5 Command                     | Agent6 Command                                       | Description                    |
|------------------------------------|------------------------------------------------------|--------------------------------|
| `datadog-agent start`              | `launchctl start com.datadoghq.agent` or systray app | Start the Agent as a service   |
| `datadog-agent stop`               | `launchctl stop com.datadoghq.agent` or systray app  | Stop the Agent service         |
| `datadog-agent restart`            | _run `stop` then `start`_ or systray app             | Restart the Agent service      |
| `datadog-agent status`             | `launchctl list com.datadoghq.agent` or systray app  | Print the Agent service status |
| `datadog-agent info`               | `datadog-agent status` or web GUI                    | Status page of a running Agent |
| `datadog-agent flare`              | `datadog-agent flare` or web GUI                     | Send flare                     |
| _not implemented_                  | `datadog-agent --help`                               | Display command usage          |
| `datadog-agent check <check_name>` | `datadog-agent check <check_name>`                   | Run a check (unchanged)        |

{{% /tab %}}
{{< /tabs >}}

## APM agent

The APM agent (also known as _trace agent_) is shipped by default with the
Agent 6 in the Linux, MacOS and Windows packages.

The APM agent is enabled by default on linux.
To enable the check on other platforms or disable it on linux,
you can update the `apm_config` key in your `datadog.yaml`:

```
apm_config:
  enabled: true
```

For the Docker image, the APM agent is disabled by default. You can enable it by setting
the `DD_APM_ENABLED` envvar to `true`. It will listen to all interfaces by default.

If you want to listen to non-local traffic on any other platform, you can set
`apm_config.apm_non_local_traffic = true` in your `datadog.yaml`.

## Process agent

The process agent is shipped by default with the Agent 6 in the Linux packages only.

The process agent is not enabled by default. To enable the check you can update your `datadog.yaml` file to add the following:

```
process_config:
  enabled: "true"
```

The `enabled` value is a string with the following options:

* `"true"`: Enable the process-agent to collect processes and containers.
* `"false"`: Only collect containers if available (the default)
* `"disabled"`: Don't run the process-agent at all.

## Docker check

Docker versions 1.12.1 and up are supported.

The Docker check has been rewritten in Go to take advantage of the new
internal architecture of the Agent, mainly bringing a consistent behaviour
across every container related component. Therefore the Python version will
never work within Agent 6.

* The new check is named `docker` and no longer `docker_daemon`. All features
are ported, excepted the following deprecations:

  * the `url`, `api_version` and `tags*` options are deprecated, direct use of the
    [standard docker environment variables][5] is encouraged
  * the `ecs_tags`, `performance_tags` and `container_tags` options are deprecated. Every
    relevant tag is now collected by default
  * the `collect_container_count` option to enable the `docker.container.count` metric
    is not supported. `docker.containers.running` and `.stopped` are to be used

* Some options have moved from `docker_daemon.yaml` to the main `datadog.yaml`:
  * `collect_labels_as_tags` has been renamed `docker_labels_as_tags` and now
    supports high cardinality tags, see the details in `datadog.yaml.example`
  * `exclude` and `include` lists have been renamed `ac_include` and
    `ac_exclude`. In order to make filtering consistent across all components of
    the agent, we had to drop filtering on arbitrary tags. The only supported
    filtering tags are `image` (image name) and `name` (container name).
    Regexp filtering is still available, see `datadog.yaml.example` for examples
  * `docker_root` option has been split in two options `container_cgroup_root`
    and `container_proc_root`
  * `exclude_pause_container` has been added to exclude pause containers on
    Kubernetes and Openshift (default to true). This will avoid removing
    them from the exclude list by error

The [`import`](#configuration-files) will help you converting the old
`docker_daemon.yaml` to the new `docker.yaml`. The command will also move
needed settings from `docker_daemon.yaml` to `datadog.yaml`.

## Kubernetes support

### Kubernetes versions

Agent 6 currently supports Kubernetes versions 1.3 and above.

### Kubernetes metrics and events

The `kubernetes` integration insights are provided combining:
  * The [`kubelet`][6] check
  retrieving metrics from the kubelet
  * The [`kubernetes_apiserver`][7] check retrieving events and service checks from the apiserver

The `agent import` command (in versions 6.2 and higher) will import settings from the legacy `kubernetes.yaml` configuration, if found. The following  options are deprecated:

  - API Server credentials (`api_server_url`, `apiserver_client_crt`, `apiserver_client_key`, `apiserver_ca_cert`) please provide a a kubeconfig file to the agent via the `kubernetes_kubeconfig_path` option
  - `use_histogram`: please contact support to determine the best alternative for you
  - `namespaces`, `namespace_name_regexp`: Agent6 now collects metrics from all available namespaces

The upgrade logic enables the new prometheus metric collection, that is compatible with Kubernetes versions 1.7.6 and up. If you run an older version or want to revert to the cadvisor collection logic, you can set the `cadvisor_port` option back to `4194` (or the port your kubelet exposes cadvisor at).

The [`kubernetes_state` integration][8] works on both versions of the agent.

### Tagging

While Agent5 automatically collected every pod label as tags, Agent6 needs you to whilelist
labels that are relevant to you. This is done with the `kubernetes_pod_labels_as_tags` option
in `datadog.yaml`.

The following options and tags are deprecated:

     - `label_to_tag_prefix` option is superseeded by kubernetes_pod_labels_as_tags
     - `container_alias` tags are not collected anymore
     - `kube_replicate_controller` is only added if the pod is created by a replication controller,
     not systematically. Use the relevant creator tag (`kube_deployment` / `kube_daemon_set`...)

## Autodiscovery

We reworked the [Autodiscovery][9] system from the ground up to be faster and more reliable.
We also worked on decoupling container runtimes and orchestrators, to be more flexible in the future. This includes the move from `docker_images` to `ad_identifiers` in templates.

All documented use cases are supported, please contact our support team if you run into issues.

### Kubernetes

When using Kubernetes, the Autodiscovery system now sources information from the kubelet, instead of the Docker daemon. This will allow AD to work without access to the Docker socket, and enable a more consistent experience across all parts of the agent. Also, the default behaviour is to source AD templates from pod annotations. You can enable the `docker` config-provider to use container labels, and replace the `kubelet` listener by the `kubelet` one if you need AD on containers running out of pods.

When specifying AD templates in pod annotations, the new annotation name prefix is `ad.datadoghq.com/`. the previous annotation prefix
`service-discovery.datadoghq.com/` is still supported for Agent6 but support will be removed in Agent7.

### Other orchestrators

Autodiscovery templates in Docker labels still work, with the same `com.datadoghq.ad.` name prefix.

The identifier override label has been renamed from `com.datadoghq.sd.check.id` to `com.datadoghq.ad.check.id` for consistency. The previous
name is still supported for Agent6 but support will be removed in Agent7.

## Python Modules

All check-related Python code should now be imported from the `datadog_checks`
[namespace][10].

While we are continuing to ship the python libraries that ship with Agent 5,
some of the embedded libraries have been removed. `util.py` and its associated
functions have been removed from the agent. `util.headers(...)` is still included
in the agent, but implemented in C and Go and passed through to the check.

**Note:** all the official integrations have had these obsolete modules removed
from them, so these changes will only affect custom checks.

Much of the `utils` directory has been removed from the agent as well. However,
most of what was removed was not diretly related to checks and wouldn't be imported
in almost anyone's checks. The flare module, for example, was removed and
reimplemented in Go, but is unlikely to have been used by anyone in a custom check.
To learn more, you can read about the details in the [development documentation][11].

### Agent Integrations

Even if the new Agent fully supports Python checks, a few of those provided
by [integrations-core][12] are expected to fail if run within the
Agent as they are not currently implemented:

* agent_metrics
* docker_daemon [replaced by a new `docker` check](#docker-check)
* kubernetes [replaced by new checks](#kubernetes-support)

### Check API

The base class for python checks remains `AgentCheck`, though now you will import it from
`datadog_checks.checks`. However, there are a number of things that have been removed or
changed in the class API. In addition, each check instance is now its own instance
of the class. So you cannot share state between them.

Some methods in the `AgentCheck` class are not currently implemented. These include:

* `service_metadata`
* `get_service_metadata`
* `generate_historate_func`
* `generate_histogram_func`
* `stop`

The function signature of the metric senders changed from:

```python
gauge(self, metric, value, tags=None, hostname=None, device_name=None, timestamp=None)
```

to:

```python
gauge(self, name, value, tags=None, hostname=None, device_name=None)
```

The following methods have been permanently removed from `AgentCheck`:

* `_roll_up_instance_metadata`
* `instance_count`
* `is_check_enabled`
* `read_config`
* `set_check_version`
* `set_manifest_path`
* `_get_statistic_name_from_method`
* `_collect_internal_stats`
* `_get_internal_profiling_stats`
* `_set_internal_profiling_stats`
* `get_library_versions`
* `get_library_info`
* `from_yaml`
* `get_service_checks`
* `has_warnings`
* `get_metrics`
* `has_events`
* `get_events`

All the official integrations have had these methods removed from them, so these
will only affect custom checks.

### Custom Checks

#### Precedence

With Agent 6, the order of precedence between custom
checks (i.e. checks in the `/etc/datadog-agent/checks.d/` folder by default on Linux) and the checks shipped
with the Agent by default (i.e. checks from [`integrations-core`][13]) has changed: the
`integrations-core` checks now have precedence over custom checks.

This affects your setup if you have custom checks that have the same name as existing `integrations-core`
checks: these custom checks will now be ignored, and the `integrations-core` checks loaded instead.

To fix your custom check setup with Agent 6, rename your affected custom checks to a new and unused name,
and rename the related `.yaml` configuration files accordingly.

#### Dependencies

If you happen to use custom checks, there's a chance your code depends on py code
that was bundled with agent5 that may not longer be available in the with the new
Agent 6 package. This is a list of packages no longer bundled with the Agent:

- backports.ssl-match-hostname
- datadog
- decorator
- future
- futures
- google-apputils
- pycurl
- pyOpenSSL
- python-consul
- python-dateutil
- python-etcd
- python-gflags
- pytz
- PyYAML
- rancher-metadata
- tornado
- uptime
- websocket-client

If your code depends on any of those packages, it'll break. You can fix that
by running the following:

```bash
sudo -u dd-agent -- /opt/datadog-agent/embedded/bin/pip install <dependency>
```

Similarly, you may have added a pip package to meet a requirement for a custom
check while on Agent 5. If the added pip package had inner dependencies with
packages already bundled with Agent 5 (see list above), those dependencies will
be missing after the upgrade to Agent 6 and your custom checks will break.
You will have to install the missing dependencies manually as described above.

## JMX

The Agent 6 ships JMXFetch, with the following changes:

### JMXTerm JAR

The Agent 6 does not ship the `jmxterm` JAR. If you wish to download and use `jmxterm`, please refer to the [upstream project][14].

### Troubleshooting commands

Troubleshooting commands syntax have changed. These commands are available since v6.2.0, for earlier v6 versions please refer to [the earlier docs][15]:

* `sudo -u dd-agent datadog-agent jmx list matching`: List attributes that match at least one of your instances configuration.

* `sudo -u dd-agent datadog-agent jmx list limited`: List attributes that do match one of your instances configuration but that are not being collected because it would exceed the number of metrics that can be collected.

* `sudo -u dd-agent datadog-agent jmx list collected`: List attributes that will actually be collected by your current instances configuration.

* `sudo -u dd-agent datadog-agent jmx list not-matching`: List attributes that don’t match any of your instances configuration.

* `sudo -u dd-agent datadog-agent jmx list everything`: List every attributes available that has a type supported by JMXFetch.

* `sudo -u dd-agent datadog-agent jmx collect`: Start the collection of metrics based on your current configuration and display them in the console.

By default theses command will run on all the configured jmx checks. If you want to
use them for specific checks, you can specify them using the `--checks` flag :
`sudo datadog-agent jmx list collected --checks tomcat`

## GCE hostname

_Only affects Agents running on GCE_

When running on GCE, by default, Agent 6 uses the instance's hostname provided by GCE as its hostname.
This matches the behavior of Agent 5 (since v5.5.1) if `gce_updated_hostname` is set to true in `datadog.conf`,
which is recommended.

If you're upgrading from an Agent 5 with `gce_updated_hostname` unset or set to false, and the hostname
of the Agent is not hardcoded in `datadog.conf`/`datadog.yaml`, the reported hostname on Datadog
will change from the GCE instance _name_ to the full GCE instance _hostname_ (which includes the GCE project id).

## System Metrics

_Only affects Windows Agents_

When running the Windows Agent 5, the metrics _system.mem.pagefile.*_ display inconsistent units (they're off by 10^6).
This problem has been fixed on Windows Agent6; however, the Agent 5 discrepancy remains for backwards compatibility.  Therefore,
reported values (and associated monitors) will be different upon upgrade from Agent v5 to Agent v6.



[1]: /agent/proxy/#using-the-agent-as-a-proxy
[2]: https://github.com/DataDog/dd-agent/wiki/Using-custom-emitters
[3]: /agent/guide/dogstream
[4]: /integrations/go-metro
[5]: https://docs.docker.com/engine/reference/commandline/cli/#environment-variables
[6]: https://github.com/DataDog/integrations-core/tree/master/kubelet
[7]: https://github.com/DataDog/datadog-agent/tree/master/cmd/agent/dist/conf.d/kubernetes_apiserver.d
[8]: https://github.com/DataDog/integrations-core/tree/master/kubernetes_state
[9]: https://docs.datadoghq.com/agent/autodiscovery
[10]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_base
[11]: https://github.com/DataDog/datadog-agent/tree/master/docs/dev/checks#python-checks
[12]: https://github.com/DataDog/integrations-core
[13]: https://github.com/DataDog/integrations-core
[14]: https://github.com/jiaqi/jmxterm
[15]: https://github.com/DataDog/datadog-agent/blob/6.1.4/docs/agent/changes.md#jmx
