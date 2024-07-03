---
app_id: ibm-i
app_uuid: 30045928-4be2-4efd-9a08-160e904494a1
assets:
  dashboards:
    IBM i Overview: assets/dashboards/ibm_i_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ibm_i.system.cpu_usage
      metadata_path: metadata.csv
      prefix: ibm_i.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10219
    source_type_name: IBM i
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ibm_i/README.md
display_on_public_website: true
draft: false
git_integration_title: ibm_i
integration_id: ibm-i
integration_title: IBM i
integration_version: 2.2.0
is_public: true
manifest_version: 2.0.0
name: ibm_i
public_title: IBM i
short_description: Remotely monitor IBM i systems including jobs, job queues, ASPs,
  and more.
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::OS & System
  configuration: README.md#Setup
  description: Remotely monitor IBM i systems including jobs, job queues, ASPs, and
    more.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: IBM i
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [IBM i][1] remotely through the Datadog Agent.

## セットアップ

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

**Note**: This check is not available on Windows as it uses the `fcntl()` system call, which is specific to Unix-like operating systems.

### インストール

The IBM i check is included in the [Datadog Agent][3] package.
No additional installation is needed on your server.

#### ODBC driver

The IBM i check uses the IBM i ODBC driver to connect remotely to the IBM i host. 

Download the driver from the [IBM i Access - Client Solutions][4] page. Click on `Downloads for IBM i Access Client Solutions` and login to gain access to the downloads page.

Choose the `ACS App Pkg` package for your platform, such as `ACS Linux App Pkg` for Linux hosts. Download the package and follow the installation instructions to install the driver.

### 構成

The IBM i check queries an IBM i system remotely from a host running the Datadog Agent. To communicate with the IBM i system, you need to set up the IBM i ODBC driver on the host running the Datadog Agent.

#### ODBC driver

Once the ODBC driver is installed, find the ODBC configuration files: `odbc.ini` and `odbcinst.ini`. The location may vary depending on your system. On Linux they may be located in the `/etc` directory or in the `/etc/unixODBC` directory.

Copy these configuration files to the embedded Agent environment, such as `/opt/datadog-agent/embedded/etc/` on Linux hosts.

The `odbcinst.ini` file defines the available ODBC drivers for the Agent. Each section defines one driver. For instance, the following section defines a driver named `IBM i Access ODBC Driver 64-bit`:
```
[IBM i Access ODBC Driver 64-bit]
Description=IBM i Access for Linux 64-bit ODBC Driver
Driver=/opt/ibm/iaccess/lib64/libcwbodbc.so
Setup=/opt/ibm/iaccess/lib64/libcwbodbcs.so
Threading=0
DontDLClose=1
UsageCount=1
```

The name of the IBM i ODBC driver is needed to configure the IBM i check.

#### IBM i check

1. Edit the `ibm_i.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your IBM i performance data. See the [sample ibm_i.d/conf.yaml][5] for all available configuration options.
   Use the driver name from the `obdcinst.ini` file.

2. [Restart the Agent][6].

### Validation

[Run the Agent's status subcommand][7] and look for `ibm_i` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "ibm_i" >}}


### イベント

The IBM i check does not include any events.

## トラブルシューティング

Need help? Contact [Datadog support][10].

[1]: https://www.ibm.com/it-infrastructure/power/os/ibm-i
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://www.ibm.com/support/pages/ibm-i-access-client-solutions
[5]: https://github.com/DataDog/integrations-core/blob/master/ibm_i/datadog_checks/ibm_i/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/ibm_i/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/ibm_i/datadog_checks/ibm_i/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/