---
app_id: kernelcare
app_uuid: 7bfd2b8a-d461-4890-aeba-f1e9eab617c7
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kernelcare.uptodate
      metadata_path: metadata.csv
      prefix: kernelcare.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10109
    source_type_name: Kernelcare
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: CloudLinux
  sales_email: schvaliuk@cloudlinux.com
  support_email: schvaliuk@cloudlinux.com
categories:
- os & system
- security
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/kernelcare/README.md
display_on_public_website: true
draft: false
git_integration_title: kernelcare
integration_id: kernelcare
integration_title: Kernelcare
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: kernelcare
public_title: Kernelcare
short_description: Monitor kernelcare server activity and status metrics.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::OS & System
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Monitor kernelcare server activity and status metrics.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Kernelcare
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[KernelCare][1] is a live patching system that automatically applies security patches to Linux kernel vulnerabilities, with no reboots. It's used on over 500,000 servers, and has been used to patch servers running for 6+ years for Dell, Zoom, and other enterprise companies. It works with all major Linux distributions, such as RHEL, CentOS, Amazon Linux, and Ubuntu, and interoperates with common vulnerability scanners, cloud monitoring tools, and patch management solutions.

This integration allows you to forward the Kernelcare metrics through the Datadog Agent.

## セットアップ

The Kernelcare check is not included in the [Datadog Agent][2] package, so you need to install it.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the Kernelcare check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-kernelcare==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][4].

### 構成

1. Edit the `kernelcare.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your kernelcare performance data. See the [sample kernelcare.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6].

### Validation

Run the [Agent's status subcommand][7] and look for `kernelcare` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "kernelcare" >}}


### イベント

The Kernelcare integration does not include any events.

### サービスチェック
{{< get-service-checks-from-git "kernelcare" >}}


## トラブルシューティング

Need help? Contact [Datadog support][10].


[1]: https://www.kernelcare.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/kernelcare/datadog_checks/kernelcare/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/kernelcare/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/kernelcare/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/