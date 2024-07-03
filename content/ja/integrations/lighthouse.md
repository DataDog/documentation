---
app_id: lighthouse
app_uuid: e61bdb03-995f-4f46-8b14-afd59e35453b
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: lighthouse.performance
      metadata_path: metadata.csv
      prefix: lighthouse.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10199
    source_type_name: Lighthouse
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Community
  sales_email: mustin.eric@gmail.com
  support_email: mustin.eric@gmail.com
categories:
- developer tools
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/lighthouse/README.md
display_on_public_website: true
draft: false
git_integration_title: lighthouse
integration_id: lighthouse
integration_title: Lighthouse
integration_version: 2.2.0
is_public: true
manifest_version: 2.0.0
name: lighthouse
public_title: Lighthouse
short_description: Google Lighthouse Audit Stats
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Google Lighthouse Audit Stats
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Lighthouse
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Get metrics from [Google Chrome Lighthouse][1] in real time to:

- Visualize and monitor Lighthouse stats.
- Track and audit scores for your websites accessibility, best practices, performance, PWA, and SEO audit scores.

## セットアップ

The Lighthouse check is not included in the [Datadog Agent][2] package, so you need to install it.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the Lighthouse check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-lighthouse==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][4].

### 構成

1. Edit the `lighthouse.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][5] to start collecting your Lighthouse [metrics](#metrics).
   See the [sample lighthouse.d/conf.yaml][6] for all available configuration options.

2. [Restart the Agent][7]

### Requirements

1. Node.js LTS (8.9+). 
   - Check if Node.js and npm installed:

   ```shell
   node -v
   npm -v
   ```

   - If not, [install Node.js and npm][8].

2. [Lighthouse][9]:
   - Check if installed.

   ```shell
   # example
   root@hostname:~# npm list -g --depth=0 | grep 'lighthouse'
   |_ lighthouse@5.6.0
   ```

   - Install if not (no output from above command):
   ```shell
   npm install -g lighthouse
   ```


3. Either Google Chrome/Chromium or Puppeteer.

   - [Chromium][10]
      + Debian/Ubuntu

      ```shell
      sudo apt-get update
      sudo apt-get install -y chromium-browser
      ```

      + RHEL/CentOS

      ```shell
      sudo yum install -y epel-release
      sudo yum install -y chromium
      ```

      **Note**: This integration runs Chrome/Chromium in headless mode. Chrome/Chromium may require kernel 4.4+ on RHEL/CentOS for the headless mode to work properly.

   - [Puppeteer][11]
      + Check if installed.

      ```shell
      # example
      root@hostname:~# npm list -g --depth=0 | grep 'puppeteer'
      |_ puppeteer@1.12.2
      ```

      + Install if not (no output from above command):

      ```shell
      npm install -g puppeteer --unsafe-perm=true
      ```

4. Verify if `dd-agent` user is able to run the lighthouse cli.

   ```shell
   sudo -u dd-agent lighthouse <WEB_URL> --output json --quiet --chrome-flags='--headless'
   ```

### Validation

[Run the Agent's status subcommand][12] and look for `lighthouse` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "lighthouse" >}}


### イベント

The Lighthouse integration does not include any events.

### サービスチェック

The Lighthouse integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][14].

[1]: https://developers.google.com/web/tools/lighthouse
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/lighthouse/datadog_checks/lighthouse/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://nodejs.org/en/download
[9]: https://github.com/GoogleChrome/lighthouse
[10]: https://www.chromium.org/
[11]: https://github.com/GoogleChrome/puppeteer
[12]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[13]: https://github.com/DataDog/integrations-extras/blob/master/lighthouse/datadog_checks/lighthouse/metadata.csv
[14]: https://docs.datadoghq.com/ja/help/