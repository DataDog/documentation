---
"app_id": "nvml"
"app_uuid": "2c7a8b1e-9343-4b4a-bada-5091e37c4806"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": nvml.device_count
      "metadata_path": metadata.csv
      "prefix": nvml.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10177"
    "source_type_name": nvml
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Community
  "sales_email": help@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- ai/ml
- kubernetes
- os & system
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/nvml/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "nvml"
"integration_id": "nvml"
"integration_title": "Nvidia NVML"
"integration_version": "1.0.9"
"is_public": true
"manifest_version": "2.0.0"
"name": "nvml"
"public_title": "Nvidia NVML"
"short_description": "Support Nvidia GPU metrics in k8s"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::AI/ML"
  - "Category::Kubernetes"
  - "Category::OS & System"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Support Nvidia GPU metrics in k8s
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Nvidia NVML
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check monitors [NVIDIA Management Library (NVML)][1] exposed metrics through the Datadog Agent and can correlate them with the [exposed Kubernetes devices][2].

## Setup

The NVML check is not included in the [Datadog Agent][3] package, so you need to install it.

### Installation

For Agent v7.21+ / v6.21+, follow the instructions below to install the NVML check on your host. See [Use Community Integrations][4] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   For Linux:
   ```shell
   datadog-agent integration install -t datadog-nvml==<INTEGRATION_VERSION>
   # You may also need to install dependencies since those aren't packaged into the wheel
   sudo -u dd-agent -H /opt/datadog-agent/embedded/bin/pip3 install grpcio pynvml
   ```
   For Windows (Using Powershell run as admin):
   ```shell
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" integration install -t datadog-nvml==<INTEGRATION_VERSION>
   # You may also need to install dependencies since those aren't packaged into the wheel
   & "$env:ProgramFiles\Datadog\Datadog Agent\embedded3\python" -m pip install grpcio pynvml
   ```

2. Configure your integration similar to core [integrations][5].

If you are using Docker, there is an [example Dockerfile][6] in the NVML repository.

   ```shell
   docker build -t dd-agent-nvml .
   ```

If you're using Docker and Kubernetes, you need to expose the environment variables `NVIDIA_VISIBLE_DEVICES` and `NVIDIA_DRIVER_CAPABILITIES`. See the included Dockerfile for an example.

To correlate reserved Kubernetes NVIDIA devices with the Kubernetes pod using the device, mount the Unix domain socket `/var/lib/kubelet/pod-resources/kubelet.sock` into your Agent's configuration. More information about this socket is on the [Kubernetes website][2]. **Note**: This device is in beta support for version 1.15.

### Configuration

1. Edit the `nvml.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your NVML performance data. See the [sample nvml.d/conf.yaml][7] for all available configuration options.

2. [Restart the Agent][8].

### Validation

[Run the Agent's status subcommand][9] and look for `nvml` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "nvml" >}}
 The authoritative metric documentation is on the [NVIDIA website][11].

There is an attempt to, when possible, match metric names with NVIDIA's [Data Center GPU Manager (DCGM) exporter][12].

### Events

NVML does not include any events.

### Service Checks
{{< get-service-checks-from-git "nvml" >}}


## Troubleshooting

Need help? Contact [Datadog support][14].


[1]: https://pypi.org/project/pynvml/
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/device-plugins/#monitoring-device-plugin-resources
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[5]: https://docs.datadoghq.com/getting_started/integrations/
[6]: https://github.com/DataDog/integrations-extras/blob/master/nvml/tests/Dockerfile
[7]: https://github.com/DataDog/integrations-extras/blob/master/nvml/datadog_checks/nvml/data/conf.yaml.example
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-extras/blob/master/nvml/metadata.csv
[11]: https://docs.nvidia.com/deploy/nvml-api/group__nvmlDeviceQueries.html
[12]: https://github.com/NVIDIA/dcgm-exporter
[13]: https://github.com/DataDog/integrations-extras/blob/master/nvml/assets/service_checks.json
[14]: https://docs.datadoghq.com/help

