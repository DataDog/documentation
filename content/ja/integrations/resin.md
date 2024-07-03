---
app_id: resin
app_uuid: ff99886d-87b7-407a-aa90-7bea5ca27564
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: resin.thread_pool.thread_count
      metadata_path: metadata.csv
      prefix: resin.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10203
    source_type_name: Resin
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Community
  sales_email: brent@bmontague.com
  support_email: brent@bmontague.com
categories:
- log collection
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/resin/README.md
display_on_public_website: true
draft: false
git_integration_title: resin
integration_id: resin
integration_title: Resin
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: resin
public_title: Resin
short_description: Track thread pool, connection pool settings within resin
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Track thread pool, connection pool settings within resin
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Resin
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check monitors [Resin][1] through the Datadog Agent.

## セットアップ

### インストール

The Resin check is not included in the [Datadog Agent][2] package, so you need to install it.

### 構成

1. Configure the [resin default server][3] to enable JMX by adding the following JVM arguments:

```
<server-default>
  <jvm-arg>-Dcom.sun.management.jmxremote</jvm-arg>
  <jvm-arg>-Dcom.sun.management.jmxremote.port=7199</jvm-arg>
</server-default>
```

2. Edit the `resin.d/conf.yaml` file in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your resin performance data. See the [resin.d/conf.yaml example][2] for all available configuration options.

3. [Restart the Agent][4].

### Validation

[Run the Agent's status subcommand][5] and look for `resin` under the Checks section.

### Log collection

Enable logs collection for Datadog Agent in `/etc/datadog-agent/datadog.yaml` on Linux platforms. On other platforms, see the [Agent Configuration Files guide][6] for the location of your configuration file:

```yaml
logs_enabled: true
```

- Enable this configuration block to your `resin.d/conf.yaml` file to start collecting Logs:
    ```yaml
    logs:
      - type: file
        path: /var/opt/resin/log/*.log
        source: resin
    ```

## 収集データ

### メトリクス
{{< get-metrics-from-git "resin" >}}


### イベント

Resin does not include any events.

### サービスチェック
{{< get-service-checks-from-git "resin" >}}


## トラブルシューティング

Need help? Contact [Datadog support][9].


[1]: https://caucho.com/
[2]: https://github.com/DataDog/integrations-extras/blob/master/resin/datadog_checks/resin/data/conf.yaml.example
[3]: https://www.caucho.com/resin-4.0/admin/cluster-server.xtp#JVMparameters:settingtheJVMcommandline
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/
[7]: https://github.com/DataDog/integrations-extras/blob/master/resin/metadata.csv
[8]: https://github.com/DataDog/integrations-extras/blob/master/resin/assets/service_checks.json
[9]: https://docs.datadoghq.com/ja/help/