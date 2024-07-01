---
"app_id": "oom-kill"
"app_uuid": "7546b270-2efe-4a59-8f94-3447df2db801"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": oom_kill.oom_process.count
      "metadata_path": metadata.csv
      "prefix": oom_kill.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10293"
    "source_type_name": OOM Kill
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- os & system
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/oom_kill/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "oom_kill"
"integration_id": "oom-kill"
"integration_title": "OOM Kill"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "oom_kill"
"public_title": "OOM Kill"
"short_description": "Track process OOM kills by the system or cgroup."
"supported_os":
- linux
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Category::OS & System"
  "configuration": "README.md#Setup"
  "description": Track process OOM kills by the system or cgroup.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": OOM Kill
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors the kernel OOM (out of memory) kill process through the Datadog Agent and the System Probe.

## Setup

### Installation

The OOM Kill check is included in the [Datadog Agent][1] package. It relies on an eBPF program implemented in the System Probe.

The eBPF program used by the System Probe is compiled at runtime and requires you to have access to the proper kernel headers.

On Debian-like distributions, install the kernel headers like this:
```sh
apt install -y linux-headers-$(uname -r)
```

On RHEL-like distributions, install the kernel headers like this:
```sh
yum install -y kernel-headers-$(uname -r)
yum install -y kernel-devel-$(uname -r)
```

**Note**: Kernel version 4.9 or later is required for the OOM Kill check to work.
In addition, Windows and CentOS/RHEL versions earlier than 8 are not supported.

### Configuration

1. In the `system-probe.yaml` file at the root of your Agent's configuration directory, add the following configuration:

    ```yaml
    system_probe_config:
        enable_oom_kill: true
    ```

2. Ensure that the `oom_kill.d/conf.yaml` file is present in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your OOM Kill metrics. See the [example oom_kill.d/conf.yaml][2] for all available configuration options.

3. [Restart the Agent][3].

### Configuration with Docker

In addition to mounting `system-probe.yaml` and `oom_kill.d/conf.yaml` as described above, do the following configuration:

1. Mount the following volumes to the Agent container:

    ```
    -v /sys/kernel/debug:/sys/kernel/debug
    -v /lib/modules:/lib/modules
    -v /usr/src:/usr/src
    ```

2. Add the following permission to enable BPF operations:

    ```
    --privileged
    ```

    From kernel version 5.8, the `--privileged` parameter can be replaces by `--cap-add CAP_BPF`.

**Note**: `--privileged` mode is not supported in Docker swarm.


### Configuration with Helm

With the [Datadog Helm chart][4], ensure that the `datadog.systemProbe` and `datadog.systemProbe.enableOOMKill` parameters are enabled in the `values.yaml` file.

### Configuration with the Operator (v1.0.0+)

Set the `features.oomKill.enabled` parameter in the DatadogAgent manifest:
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    oomKill:
      enabled: true
```

**Note**: When using COS (Container Optimized OS), override the `src` volume in the node Agent:
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    oomKill:
      enabled: true
  override:
    nodeAgent:
      volumes:
      - emptyDir: {}
        name: src
```

### Validation

[Run the Agent's status subcommand][5] and look for `oom_kill` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "oom_kill" >}}


### Service Checks

The OOM Kill check does not include any service checks.

### Events

The OOM Kill check submits an event for each OOM Kill that includes the killed process ID and name, as well as the triggering process ID and name.

## Troubleshooting

Need help? Contact [Datadog support][7].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/oom_kill.d/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/helm-charts
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/oom_kill/metadata.csv
[7]: https://docs.datadoghq.com/help/

