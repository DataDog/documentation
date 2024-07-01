---
"app_id": "php-apcu"
"app_uuid": "ec09379e-851f-4ecc-be78-de5297087994"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": php_apcu.cache.mem_size
      "metadata_path": metadata.csv
      "prefix": php_apcu.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10139"
    "source_type_name": PHP APCu
  "monitors":
    "[php_apcu] Cache Full has been detected": assets/monitors/php-apcu_expunges.json
    "[php_apcu] Detected High Cache Usage": assets/monitors/php-apcu_high_usage.json
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Community
  "sales_email": noname@withgod.jp
  "support_email": noname@withgod.jp
"categories":
- caching
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/php_apcu/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "php_apcu"
"integration_id": "php-apcu"
"integration_title": "PHP APCu"
"integration_version": "0.0.2"
"is_public": true
"manifest_version": "2.0.0"
"name": "php_apcu"
"public_title": "PHP APCu"
"short_description": "Monitor PHP APCu in-memory data caching."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Caching"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitor PHP APCu in-memory data caching.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": PHP APCu
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check monitors [PHP APCu][1] through the Datadog Agent.

## Setup

The PHP APCu check is not included in the [Datadog Agent][2] package, so you need to install it.

### Installation

For Agent v7.21+ / v6.21+, follow the instructions below to install the PHP APCu check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-php_apcu==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][4].

#### APCu

APCu does not expose metrics by default so this integration includes a metric exporter, located here:

```
/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_apcu/assets/exporter/apcu-dd-handler.php
```

When you [configure](#configuration) your Agent, refer to the exporter directly by this file name, or configure an alias for it on your web server. For example, if you're using Apache, the alias in the web server configuration file would look like this:

```
Alias /apcu-status /opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_apcu/assets/exporter/apcu-dd-handler.php
<Location /apcu-status>
    Require all denied
    Require local
</Location>
```

### Configuration

1. Edit the `php_apcu.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your `php_apcu` performance data. See the [sample `php_apcu.d/conf.yaml` file][5] for all available configuration options.
    ```
    instances
      - url: http://localhost/apcu-status
    ```

2. [Restart the Agent][6].

### Validation

Run the [Agent's status subcommand][7] and look for `php_apcu` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "php_apcu" >}}


### Events

The PHP APCu integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "php_apcu" >}}


## Troubleshooting

Need help? Contact [Datadog support][10].


[1]: https://www.php.net/manual/en/book.apcu.php
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/php_apcu/datadog_checks/php_apcu/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/php_apcu/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/php_apcu/assets/service_checks.json
[10]: https://docs.datadoghq.com/help/

