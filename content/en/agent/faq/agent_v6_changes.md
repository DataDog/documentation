---
title: Agent v6 Changes
kind: faq
aliases:
 - /agent/faq/agent-v6-changes
further_reading:
- link: "/agent/versions/upgrade_to_agent_v6/"
  tag: "Documentation"
  text: "Upgrade to Datadog Agent v6"
- link: "/agent/faq/how-datadog-agent-determines-the-hostname/"
  tag: "Documentation"
  text: "How does Datadog determine the Agent hostname?"
---

## Overview

Datadog Agent v6 contains many changes compared to previous Agent versions. The changes and deprecations are detailed in the sections below.

## Features

The following Agent v5 features are **not available** in Agent v6:

* [Using the Agent as a Proxy][1]
* [Custom emitters][2]
* [Dogstream][3]
* [go-metro][4]
* Graphite support

## Configuration

Prior versions of the Agent stored configuration files in `/etc/dd-agent`. For Agent v6.0+, configuration files are stored in `/etc/datadog-agent`.

{{< tabs >}}
{{% tab "Agent" %}}

The [Agent's main configuration file][1] has transitioned from **INI** to **YAML** format to support complex configurations and provide a consistent experience across the Agent and checks.

Agent v5 `datadog.conf` --> Agent v6 `datadog.yaml`

To transition between Agent configuration paths and formats, use the Agent command:
```bash
sudo -u dd-agent -- datadog-agent import
```

This command parses an existing `datadog.conf` and converts supported parameters to the new format in `datadog.yaml`. The command also copies configuration files for checks that are currently enabled. For more details, see [Upgrade to Datadog Agent v6][2].

#### Options

The following Agent configuration options were changed or removed in Agent v6. Configuration options removed were either superseded by other options, or related to features that work differently from previous versions.

##### Changed

| Previous Name               | Updated Name                 | Notes                                                                                             |
|-----------------------------|------------------------------|---------------------------------------------------------------------------------------------------|
| `proxy_host`                | `proxy`                      | Proxy settings are now expressed as a list of URIs. See the [proxy][3] documentation for details. |
| `collect_instance_metadata` | `enable_metadata_collection` | Enables metadata collection.                                                                      |
| `collector_log_file`        | `log_file`                   |                                                                                                   |
| `syslog_host`               | `syslog_uri`                 | The Syslog configuration is now expressed as a URI.                                               |
|                             | `syslog_pem`                 | Syslog configuration client certificate for TLS client validation.                                |
|                             | `syslog_key`                 | Syslog configuration client private key for TLS client validation.                                |

##### Removed

| Name                         | Notes                                                                                                                 |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `proxy_port`                 | Superseded by `proxy`, see the [proxy][3] documentation for details.                                                  |
| `proxy_user`                 | Superseded by `proxy`, see the [proxy][3] documentation for details.                                                  |
| `proxy_password`             | Superseded by `proxy`, see the [proxy][3] documentation for details.                                                  |
| `proxy_forbid_method_switch` | Obsolete                                                                                                              |
| `use_mount`                  | Deprecated at the Agent-level and moved to the [Disk check][4].                                                       |
| `device_blacklist_re`        | Deprecated at the Agent-level and moved to the [Disk check][4] as `device_blacklist`.                                 |
| `use_curl_http_client`       | Obsolete                                                                                                              |
| `exclude_process_args`       | Deprecated feature                                                                                                    |
| `check_timings`              | Superseded by internal stats                                                                                          |
| `non_local_traffic`          | Superseded by `dogstatsd_non_local_traffic` for Dogstatsd and `apm_config.apm_non_local_traffic` for the Trace Agent. |
| `dogstatsd_target`           |                                                                                                                       |
| `dogstreams`                 | Deprecated feature, use the [Logs Agent][5] instead.                                                                  |
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
| `dogstream_log`              | Deprecated feature, use the [Logs Agent][5] instead.                                                                  |
| `use_curl_http_client`       |                                                                                                                       |
| `collect_security_groups`    | Obsolete, feature is available with the [AWS integration][6].                                                         |

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /agent/guide/upgrade-to-agent-v6/
[3]: /agent/proxy/
[4]: /integrations/disk/
[5]: /logs/
[6]: /integrations/amazon_web_services/
{{% /tab %}}
{{% tab "Checks" %}}

Agent v6 loads any valid YAML file in: `<AGENT_DIRECTORY>/conf.d/<CHECK_NAME>.d/`. This enables complex configurations to be broken down into multiple files.

For example, configuration files for the `http_check` could be:
```text
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

The Agent doesn't load configuration files from any sub-directories within the `<CHECK_NAME>.d` folder. For example, this configuration is **NOT** loaded:
```text
/etc/datadog-agent/conf.d/http_check.d/prod.d/
├── backend.yaml
```

[Autodiscovery][1] template files (`auto_conf.yaml`) are stored in the configuration folder as well. This is an example of the `redisdb` check configuration folder:
```text
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

The YAML files within a `<CHECK_NAME>.d` folder can have any name, as long as they have a `.yaml` or `.yml` extension. The standard name is `conf.yaml`.

To keep backwards compatibility, the Agent picks up configuration files in the form: `<AGENT_DIRECTORY>/conf.d/<CHECK_NAME>.yaml` but migrating to the updated layout is strongly recommended.

#### Configuration options

Agent v6 supports the following options in a check's `instance` section:

| Option                    | Description                                                                                                               |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------|
| `min_collection_interval` | Set a different run interval in seconds, for checks that should run less frequently than the default, 15-second interval. |
| `empty_default_hostname`  | Submit metrics, events, and service checks with no hostname when set to `true`.                                           |
| `tags`                    | Send custom tags in addition to the tags sent by the check.                                                               |


[1]: /getting_started/agent/autodiscovery/
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

The standard environment variables (`HTTP_PROXY`, `HTTPS_PROXY`, and `NO_PROXY`) are supported in Agent v6, but using the `DD_PROXY_*` variables is recommended. `DD_PROXY_*` variables have precedence over the other proxy variables.

The precedence order of Agent v6 proxy options is different from previous versions:

* Agent v6 uses the environment variables first and then the configuration file.
* Agent v6 overrides the values from the configuration file with the ones in the environment. For example, if both `proxy.http` and `proxy.https` are set in the configuration file but only `DD_PROXY_HTTPS` is set in the environment, the Agent uses the `https` value from the environment and the `http` value from the configuration file.

[1]: /agent/docker/#environment-variables
{{% /tab %}}
{{% tab "Hostname" %}}

There are differences in hostname resolution between Agent v5 and Agent v6. For details, see the [dedicated documentation][1].

[1]: /agent/faq/how-datadog-agent-determines-the-hostname/#agent-versions
{{% /tab %}}
{{< /tabs >}}

## Logs

The [Agent log files][5] are still located in `/var/log/datadog/` (Linux) and `C:\ProgramData\Datadog\logs` (Windows).

Previous versions logged to multiple files (`collector.log`, `forwarder.log`, `dogstatsd.log`, etc). Agent v6 logs to a single log file: `agent.log`.

## Interface

The Agent v6 command line interface is sub-command based. To see the list of available sub-commands, run:
```shell
<AGENT_BINARY> --help
```

To run a sub-command, the Agent binary must be invoked:
```shell
<AGENT_BINARY> <SUB_COMMAND> <OPTIONS>
```

Some options have flags and options detailed under `--help`. For example, use help with the `check` sub-command:
```shell
<AGENT_BINARY> check --help
```

For a full list of available commands, see [Agent Commands][6].

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

| Command                              | Description                            |
|--------------------------------------|----------------------------------------|
| `sudo service datadog-agent start`   | Start the Agent as a service.          |
| `sudo service datadog-agent stop`    | Stop the Agent service.                |
| `sudo service datadog-agent restart` | Restart the Agent service.             |
| `sudo service datadog-agent status`  | Print the status of the Agent service. |

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

With Agent v6+, other functionalities are provided by the Agent binary itself as sub-commands and shouldn't be invoked with `service`/`systemctl`/`initctl`. Here are a few examples:

| Agent v5 Command                                  | Agent v6 Command                                       | Notes                          |
|---------------------------------------------------|--------------------------------------------------------|--------------------------------|
| `sudo service datadog-agent info`                 | `sudo datadog-agent status`                            | Status page of a running Agent |
| `sudo service datadog-agent flare`                | `sudo datadog-agent flare`                             | Send flare                     |
| `sudo service datadog-agent`                      | `sudo datadog-agent --help`                            | Display Agent usage            |
| `sudo -u dd-agent -- dd-agent check <CHECK_NAME>` | `sudo -u dd-agent -- datadog-agent check <CHECK_NAME>` | Run a check                    |

{{% /tab %}}
{{% tab "Windows" %}}

The major changes for Agent v6 on Windows are:

* The Agent v5 Windows Agent Manager GUI was replaced with a browser-based, cross-platform manager. For details, see the [Datadog Agent Manager for Windows][1].
* The main executable file is `agent.exe` (previously `ddagent.exe`).
* Commands should be run with the command line `"%PROGRAMFILES%\datadog\datadog agent\embedded\agent.exe" <COMMAND>` from an **Administrator** command prompt.
* The Windows service is now started as "Automatic-Delayed". It is started automatically on boot, but after all other services. This results in a small delay in reporting metrics after a reboot.
* The Windows GUI and Windows system tray icon are now implemented separately. See the [Datadog Agent Manager for Windows][1] for more details.

[1]: /agent/guide/datadog-agent-manager-windows/
{{% /tab %}}
{{% tab "MacOS" %}}

The major changes for Agent v6 on MacOS are:

* The _lifecycle commands_ (formerly `datadog-agent start`/`stop`/`restart`/`status`) are replaced by `launchctl` commands on the `com.datadoghq.agent` service, and should be run under the logged-in user. For these commands, you can also use the Datadog Agent systray app.
* All the other commands can still be run with the `datadog-agent` binary located in the `PATH` (`/usr/local/bin/`) by default.
* The `info` command has been renamed to `status`.
* The configuration GUI is now a web-based application, which can be accessed by running the command `datadog-agent launch-gui` or using the systray app.

**Example changes**:

| Agent v5 Command                   | Agent v6 Command                                     | Description                    |
|------------------------------------|------------------------------------------------------|--------------------------------|
| `datadog-agent start`              | `launchctl start com.datadoghq.agent` or systray app | Start the Agent as a service   |
| `datadog-agent stop`               | `launchctl stop com.datadoghq.agent` or systray app  | Stop the Agent service         |
| `datadog-agent restart`            | _run `stop` then `start`_ or systray app             | Restart the Agent service      |
| `datadog-agent status`             | `launchctl list com.datadoghq.agent` or systray app  | Print the Agent service status |
| `datadog-agent info`               | `datadog-agent status` or web GUI                    | Status page of a running Agent |
| `datadog-agent flare`              | `datadog-agent flare` or web GUI                     | Send flare                     |
| _not implemented_                  | `datadog-agent --help`                               | Display command usage          |
| `datadog-agent check <CHECK_NAME>` | `datadog-agent check <CHECK_NAME>`                   | Run a check (unchanged)        |

{{% /tab %}}
{{< /tabs >}}

## Collection Agents

{{< tabs >}}
{{% tab "APM Agent" %}}

The APM Agent is shipped by default with Agent v6 for Linux, MacOS, and Windows packages.

The APM Agent is enabled by default on Linux. To enable it on other platforms or disable it on Linux, update the `apm_config` key in your `datadog.yaml`:
```yaml
apm_config:
  enabled: true
```

For the Docker image, the APM Agent is disabled by default. Enable it by setting `DD_APM_ENABLED` to `true`. It listens to all interfaces by default. If you want to listen to non-local traffic on any other platform, set `DD_APM_NON_LOCAL_TRAFFIC` to `true`. For more details, see [Tracing Docker Applications][1].

[1]: /agent/docker/apm/
{{% /tab %}}
{{% tab "Process Agent" %}}

The Process Agent is shipped by default with Agent v6 for the Linux packages only.

The Process Agent is not enabled by default. To enable it, update your `datadog.yaml` file with the following:
```yaml
process_config:
  enabled: "true"
```

The `enabled` value is a string with the following options:

* `"true"`: Enable the Process Agent to collect processes and containers.
* `"false"`: Only collect containers if available (the default).
* `"disabled"`: Don't run the Process Agent.

{{% /tab %}}
{{< /tabs >}}

## Checks

{{< tabs >}}
{{% tab "Docker" %}}

For Agent v6, Docker versions 1.12.1+ are supported.

The Docker check was rewritten in Go to take advantage of the internal architecture of the Agent. Therefore, the Python version (`docker_daemon`) is deprecated.

The new check is named `docker`. The [Agent import command](?tab=agent#configuration) imports settings from the legacy `docker_daemon.yaml` configuration. All features are ported, except the following:

* `url`, `api_version`, and `tags*` are deprecated. It is recommended to use the [standard docker environment variables][1].
* `ecs_tags`, `performance_tags`, and `container_tags` are deprecated. All relevant tags are collected by default.
* Using `collect_container_count` to enable the `docker.container.count` metric is not supported. Use `docker.containers.running` and `.stopped`.

Some options have moved from `docker_daemon.yaml` to the main `datadog.yaml`:

* `collect_labels_as_tags` was renamed to `docker_labels_as_tags` and supports high cardinality tags. See [Tag Assignment and Extraction][2] for details.
* `exclude` and `include` were renamed to `ac_include` and `ac_exclude`. To make filtering consistent across all components of the Agent, there is no longer filtering on arbitrary tags. Tag filtering is only supported for `image` (image name) and `name` (container name). Regexp filtering is still available. See [Container Discovery Management][3] for details.
* The `docker_root` option has been split in two options: `container_cgroup_root` and `container_proc_root`.
* `exclude_pause_container` was added to exclude pause containers on Kubernetes and Openshift (defaults to `true`).

[1]: https://docs.docker.com/engine/reference/commandline/cli/#environment-variables
[2]: /agent/docker/tag/
[3]: /agent/guide/autodiscovery-management/
{{% /tab %}}
{{% tab "Kubernetes" %}}

For Agent v6, Kubernetes versions 1.3+ are supported.

The Kubernetes integration provides insights by combining:

* The [kubelet][1] check metrics from the kubelet.
* The [kubernetes_apiserver][2] check events and service checks from the API server.

The [Agent import command](?tab=agent#configuration) (v6.2+) imports settings from the legacy `kubernetes.yaml` configuration. The following options are deprecated:

* API Server credentials (`api_server_url`, `apiserver_client_crt`, `apiserver_client_key`, `apiserver_ca_cert`): Instead, provide a `kubeconfig` file to the Agent with `kubernetes_kubeconfig_path`.
* `use_histogram`: Contact [Datadog support][3] to determine the best alternative for you.
* `namespaces` and `namespace_name_regexp`: Agent v6 collects metrics from all available namespaces.

The upgraded logic enables Prometheus metric collection compatible with Kubernetes versions 1.7.6+. If you run an older version or want to revert to the cadvisor collection logic, set `cadvisor_port` to `4194` (the port where your kubelet exposes cadvisor).

The [kubernetes_state][4] check works with Agent v5 or Agent v6.

#### Tagging

While Agent v5 automatically collected every pod label as tags, Agent v6 needs a whitelist. This is done with the `kubernetes_pod_labels_as_tags` option in `datadog.yaml`. See [Tag Assignment and Extraction][5] for details.

The following options and tags are deprecated:

* `label_to_tag_prefix` is superseded by `kubernetes_pod_labels_as_tags`.
* `container_alias` tags are not collected.
* `kube_replicate_controller` is only added if the pod is created by a replication controller. Instead, use the relevant creator tag (`kube_deployment`, `kube_daemon_set`, etc.).

[1]: /integrations/kubelet/
[2]: /integrations/kube_apiserver_metrics/
[3]: /help/
[4]: /agent/kubernetes/
[5]: /agent/kubernetes/tag/#extract-node-labels-as-tags
{{% /tab %}}
{{% tab "JMX" %}}

Agent v6 ships JMXFetch, with the following changes:

#### Jmxterm

Agent v6 does not ship the `jmxterm` JAR. To download and use `jmxterm`, refer to the [upstream project][1].

#### Troubleshooting commands

Troubleshooting command syntax has changed. These commands are available for v6.2.0+, for earlier versions, refer to the [JMX Agent troubleshooting][2]:

| Command                                                | Description                                                                                                                                                     |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sudo -u dd-agent datadog-agent jmx list matching`     | List attributes that match at least one of your instance configurations.                                                                                        |
| `sudo -u dd-agent datadog-agent jmx list limited`      | List attributes that match one of your instance configurations but are not being collected because it would exceed the number of metrics that can be collected. |
| `sudo -u dd-agent datadog-agent jmx list collected`    | List attributes that are collected by your current instances configuration.                                                                                     |
| `sudo -u dd-agent datadog-agent jmx list not-matching` | List attributes that don’t match any of your instance configurations.                                                                                           |
| `sudo -u dd-agent datadog-agent jmx list everything`   | List every attribute available that has a type supported by JMXFetch.                                                                                           |
| `sudo -u dd-agent datadog-agent jmx collect`           | Start the collection of metrics based on your current configuration and display them in the console.                                                            |

**Note**: By default, these commands run on all the configured JMX checks. To specify a check, use the `--checks` flag, for example:
`sudo datadog-agent jmx list collected --checks tomcat`

[1]: https://github.com/jiaqi/jmxterm
[2]: /integrations/faq/troubleshooting-jmx-integrations/#agent-troubleshooting
{{% /tab %}}
{{% tab "System" %}}

_Only affects Windows Agents_

For the Windows Agent v5, `system.mem.pagefile.*` metrics display inconsistent units (off by 10^6).

This problem is fixed on the Windows Agent v6. However, the Agent v5 discrepancy remains for backwards compatibility.  Therefore, reported values (and associated monitors) are different when upgrading from Agent v5 to Agent v6.

{{% /tab %}}
{{< /tabs >}}

## Autodiscovery

The [Autodiscovery][7] system was reworked for Agent v6. Also, container runtimes and orchestrators were decoupled to be more flexible. This includes the move from `docker_images` to `ad_identifiers` in templates.

{{< tabs >}}
{{% tab "Kubernetes" %}}

When using Kubernetes, Autodiscovery sources information from the kubelet instead of Docker daemon. This allows Autodiscovery to work without access to the Docker socket. Also, the default behavior is to source Autodiscovery templates from pod annotations. You can enable the `docker` config-provider to use container labels, and replace the `kubelet` listener with the Docker one if you need Autodiscovery on containers running out of pods.

When specifying [Autodiscovery templates][1] in pod annotations, the annotation name prefix is `ad.datadoghq.com/`. The previous annotation prefix (`service-discovery.datadoghq.com/`) is still supported for Agent v6 but support will be removed in future versions.

[1]: /agent/kubernetes/integrations/
{{% /tab %}}
{{% tab "Docker" %}}

[Autodiscovery templates][1] in Docker labels work with the same name prefix `com.datadoghq.ad.*`.

The identifier override label has been renamed from `com.datadoghq.sd.check.id` to `com.datadoghq.ad.check.id` for consistency. The previous name is still supported for Agent v6 but support will be removed in future versions.

[1]: /agent/docker/integrations/
{{% /tab %}}
{{< /tabs >}}

## Python modules

For Agent v6, all check-related Python code is imported from the `datadog_checks` [namespace][8]. Most Python libraries included with Agent v5 are shipped with Agent v6. The following has changed:

* `util.py` and its associated functions were removed from the Agent v6.
* `util.headers(...)` is still included with Agent v6, but implemented in C and Go and passed through to the check.

**Note**: All official integrations were updated to remove obsolete modules, so these changes only affect custom checks.

A lot of the `utils` directory was removed from Agent v6, but most of the removed content was not directly related to checks. The flare module, for example, was removed and reimplemented in Go, but is unlikely to have been used by anyone in a custom check. For more details, see the [development documentation][9].

{{< tabs >}}
{{% tab "Integrations" %}}

Even though Agent v6 fully supports Python checks, some of the official Agent v5 integrations were removed or superseded:

* agent_metrics - removed
* docker_daemon - superseded by the [docker check](?tab=docker#checks)
* kubernetes - superseded by [kubernetes checks](?tab=kubernetes#checks)

{{% /tab %}}
{{% tab "Check API" %}}

The base class for Python checks (`AgentCheck`) is now imported from `datadog_checks.base.checks`. There are a number of things that have been removed or changed in the class API. In addition, each check instance is now its own instance of the class. So you cannot share state between them.

The following methods in the `AgentCheck` class are not implemented:

* `service_metadata`
* `get_service_metadata`
* `generate_historate_func`
* `generate_histogram_func`
* `stop`

The function signature of metric senders changed:

```python
# Previous versions
gauge(self, metric, value, tags=None, hostname=None, device_name=None, timestamp=None)

# Agent v6
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

**Note**: All official integrations were updated to remove obsolete methods, so these changes only affect custom checks.

{{% /tab %}}
{{% tab "Custom Checks" %}}

#### Precedence

For Agent v6, the [official checks][1] take precedence over custom checks (checks in `<AGENT_DIRECTORY>/checks.d`). Custom checks with the same name as official checks are ignored.

To fix your custom check setup with Agent v6, rename affected custom checks to a new, unused name, and rename the related `.yaml` configuration files accordingly.

#### Dependencies

If you use custom checks, there's a chance your code depends on Python code no longer bundled with Agent v6. These packages are no longer bundled with the Agent:

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

If your code depends on any of these packages, install missing packages by running:

```bash
sudo -u dd-agent -- /opt/datadog-agent/embedded/bin/pip install <PACKAGE_NAME>
```

Similarly, you may have added a PIP package to meet a requirement for a custom check while on Agent v5. If the added PIP package had inner dependencies with packages already bundled with Agent v5 (see list above), those dependencies are missing after upgrading to Agent v6. Install the missing dependencies as described above.

[1]: https://github.com/DataDog/integrations-core
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/proxy/#using-the-agent-as-a-proxy
[2]: https://github.com/DataDog/dd-agent/wiki/Using-custom-emitters
[3]: /agent/guide/dogstream/
[4]: /integrations/go-metro/
[5]: /agent/guide/agent-log-files/
[6]: /agent/guide/agent-commands/
[7]: /getting_started/agent/autodiscovery/
[8]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_base
[9]: https://github.com/DataDog/datadog-agent/tree/master/docs/dev/checks
