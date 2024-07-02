---
"app_id": "php-opcache"
"app_uuid": "392e54ac-60d4-4225-ab5a-d75245e0ea06"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": php_opcache.memory_usage.used_memory
      "metadata_path": metadata.csv
      "prefix": php_opcache.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10141"
    "source_type_name": PHP OPcache
  "monitors":
    "[php_opcache] Cache Full has been detected": assets/monitors/php-opcache_expunges.json
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Community
  "sales_email": noname@withgod.jp
  "support_email": noname@withgod.jp
"categories": []
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/php_opcache/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "php_opcache"
"integration_id": "php-opcache"
"integration_title": "PHP OPcache"
"integration_version": "0.0.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "php_opcache"
"public_title": "PHP OPcache"
"short_description": "Monitor PHP OPcache bytecode cache system."
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  "configuration": "README.md#Setup"
  "description": Monitor PHP OPcache bytecode cache system.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": PHP OPcache
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check monitors [PHP OPcache][1] through the Datadog Agent.

## セットアップ

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### インストール

To install the `php_opcache` check on your host:


1. Install the [developer toolkit][3].
 on any machine.

2. Run `ddev -e release build php_opcache` to build the package.

3. [Download the Datadog Agent][4].

4. Upload the build artifact to any host with an Agent and
 run `datadog-agent integration install -w
 path/to/php_opcache/dist/<ARTIFACT_NAME>.whl`.

#### OPcache

OPcache does not expose metrics by default so this integration includes a metric exporter, located here:

```
/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_opcache/assets/exporter/opcache-dd-handler.php
```
You can download the exporter from the Datadog [integrations-extras][5] repository.

When [configuring](#configuration) your Agent, reference the exporter directly by this file name, or configure an alias for it on your web server. For example, if you're using Apache, the alias in the web server configuration file would look like this:

```
Alias /opcache-status /opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_opcache/assets/exporter/opcache-dd-handler.php
<Location /opcache-status>
    Require all denied
    Require local
</Location>
```

### 構成

1. Edit the `php_opcache.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your `php_opcache` performance data. See the [sample `php_opcache.d/conf.yaml` file][6] for all available configuration options.
    ```
    instances
      - url: http://localhost/opcache-status
    ```
2. [Restart the Agent][7].

### Validation

[Run the Agent's status subcommand][8] and look for `php_opcache` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "php_opcache" >}}


### イベント

The PHP OPcache integration does not include any events.

### サービスチェック
{{< get-service-checks-from-git "php_opcache" >}}


## トラブルシューティング

Need help? Contact [Datadog support][11].


[1]: https://www.php.net/manual/en/book.opcache.php
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/developers/integrations/python/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://github.com/DataDog/integrations-extras/blob/master/php_opcache/datadog_checks/php_opcache/assets/exporter/opcache-dd-handler.php
[6]: https://github.com/DataDog/integrations-extras/blob/master/php_opcache/datadog_checks/php_opcache/data/conf.yaml.example
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/php_opcache/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/php_opcache/assets/service_checks.json
[11]: https://docs.datadoghq.com/help/

