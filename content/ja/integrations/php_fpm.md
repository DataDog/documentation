---
"app_id": "php-fpm"
"app_uuid": "34faabdb-8545-4a45-a8bd-be0f979e99e7"
"assets":
  "dashboards":
    "php-fpm": "assets/dashboards/php-fpm_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "php_fpm.processes.total"
      "metadata_path": "metadata.csv"
      "prefix": "php_fpm."
    "process_signatures":
    - "php-fpm"
    - "php-fpm:"
    - "php7.0-fpm"
    - "php7.0-fpm start"
    - "service php-fpm"
    - "php7.0-fpm restart"
    - "restart php-fpm"
    - "systemctl restart php-fpm.service"
    - "php7.0-fpm.service"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "117"
    "source_type_name": "PHP-FPM"
  "saved_views":
    "php-fpm_processes": "assets/saved_views/php-fpm_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "metrics"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/php_fpm/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "php_fpm"
"integration_id": "php-fpm"
"integration_title": "PHP FPM"
"integration_version": "3.3.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "php_fpm"
"public_title": "PHP FPM"
"short_description": "Monitor process states, slow requests, and accepted requests."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Category::Metrics"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Monitor process states, slow requests, and accepted requests."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "PHP FPM"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![PHP overview][1]

## Overview

The PHP-FPM check monitors the state of your FPM pool and tracks request performance.

## Setup

### Installation

The PHP-FPM check is included in the [Datadog Agent][2] package. No additional installation is needed on your server.

### Configuration

Follow the instructions below to configure this check for an Agent running on a host. For containerized environments, see the [Containerized](#containerized) section.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

1. Edit the `php_fpm.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1]. See the [sample php_fpm.d/conf.yaml][2] for all available configuration options:

   ```yaml
   init_config:

   instances:
     ## @param status_url - string - required
     ## Get metrics from your FPM pool with this URL
     ## The status URLs should follow the options from your FPM pool
     ## See http://php.net/manual/en/install.fpm.configuration.php
     ##   * pm.status_path
     ## You should configure your fastcgi passthru (nginx/apache) to catch these URLs and
     ## redirect them through the FPM pool target you want to monitor (FPM `listen`
     ## directive in the config, usually a UNIX socket or TCP socket.
     #
     - status_url: http://localhost/status

       ## @param ping_url - string - required
       ## Get a reliable service check of your FPM pool with `ping_url` parameter
       ## The ping URLs should follow the options from your FPM pool
       ## See http://php.net/manual/en/install.fpm.configuration.php
       ##   * ping.path
       ## You should configure your fastcgi passthru (nginx/apache) to
       ## catch these URLs and redirect them through the FPM pool target
       ## you want to monitor (FPM `listen` directive in the config, usually
       ## a UNIX socket or TCP socket.
       #
       ping_url: http://localhost/ping

       ## @param use_fastcgi - boolean - required - default: false
       ## Communicate directly with PHP-FPM using FastCGI
       #
       use_fastcgi: false

       ## @param ping_reply - string - required
       ## Set the expected reply to the ping.
       #
       ping_reply: pong
   ```

2. [Restart the Agent][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/php_fpm/datadog_checks/php_fpm/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

| Parameter            | Value                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `<INTEGRATION_NAME>` | `php_fpm`                                                                                                                |
| `<INIT_CONFIG>`      | blank or `{}`                                                                                                            |
| `<INSTANCE_CONFIG>`  | `{"status_url":"http://%%host%%/status", "ping_url":"http://%%host%%/ping", "use_fastcgi": false, "ping_reply": "pong"}` |

#### Extras

##### Multiple pools

It is possible to monitor multiple PHP-FPM pools using the same proxy server, a common scenario when running on Kubernetes. To do so, modify your server's routes to point to different PHP-FPM instances. Here is an example NGINX configuration:

```text
server {
    ...

    location ~ ^/(status1|ping1)$ {
        access_log off;
        fastcgi_pass instance1_ip:instance1_port;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

    location ~ ^/(status2|ping2)$ {
        access_log off;
        fastcgi_pass instance2_ip:instance2_port;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
```

If you find this approach too tedious at scale, setting `use_fastcgi` to `true` instructs the check to bypass any proxy servers and communicate directly with PHP-FPM using FastCGI. The default port is `9000` for when omitted from `status_url` or `ping_url`.

##### Unix sockets

If your PHP-FPM installation uses unix sockets, you have to use the below syntax for `status_url`, `ping_url` and enable `use_fastcgi`:

| Parameter     | Value                             |
| ------------- | --------------------------------- |
| `status_url`  | `unix:///<FILE_PATH>.sock/status` |
| `ping_url`    | `unix:///<FILE_PATH>.sock/ping`   |
| `ping_reply`  | `pong`                            |
| `use_fastcgi` | `true`                            |

**Note**: With Autodiscovery, if the Agent runs in a separate container/task/pod, it doesn't have access to the Unix sockets file of your FPM pool. It order to address this, run the Agent as a sidecar.

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's `status` subcommand][3] and look for `php_fpm` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "php_fpm" >}}


### Events

The PHP-FPM check does not include any events.

### Service Checks
{{< get-service-checks-from-git "php_fpm" >}}


## Troubleshooting

Need help? Contact [Datadog support][4].



[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/php_fpm/images/phpfpmoverview.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/help/
