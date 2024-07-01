---
"app_id": "zookeeper"
"app_uuid": "01aee33c-0c85-4800-ab79-c02a25da04fa"
"assets":
  "dashboards":
    "zookeeper": "assets/dashboards/zookeeper_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "zookeeper.connections"
      "metadata_path": "metadata.csv"
      "prefix": "zookeeper."
    "process_signatures":
    - "zkServer.sh start"
    - "java zoo.cfg"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "48"
    "source_type_name": "ZooKeeper"
  "saved_views":
    "zookeeper_processes": "assets/saved_views/zookeeper_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "orchestration"
- "notifications"
- "log collection"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/zk/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "zk"
"integration_id": "zookeeper"
"integration_title": "ZooKeeper"
"integration_version": "4.5.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "zk"
"public_title": "ZooKeeper"
"short_description": "Track client connections and latencies, and know when requests are backing up."
"supported_os":
- "linux"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Category::Orchestration"
  - "Category::Notifications"
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": "Track client connections and latencies, and know when requests are backing up."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "ZooKeeper"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![ZooKeeper Dashboard][1]

## Overview

The ZooKeeper check tracks client connections and latencies, monitors the number of unprocessed requests, and more.

## Setup

### Installation

The ZooKeeper check is included in the [Datadog Agent][2] package, so you don't need to install anything else on your ZooKeeper servers.

### Configuration

#### Inclusion list

As of version 3.5, ZooKeeper has a `4lw.commands.whitelist` parameter. See [ZooKeeper Cluster Options][3]) for an example that allows [four letter word commands][4]. By default, only `srvr` is whitelisted. Add `stat` and `mntr` to the whitelist, as the integration is based on these commands.

#### Enabling SSL

ZooKeeper 3.5 introduced the ability to use SSL authentication. For information about setting up SSL with ZooKeeper, see the [ZooKeeper SSL User Guide][5]. 

After you have ZooKeeper set up with SSL, you can also configure the Datadog Agent to connect to ZooKeeper using SSL. If you already have authentication set up using JKS files, follow the steps below to convert them to PEM files for TLS/SSL configuration.

The following example commands assume that your JKS `truststore` and `keystore` files are called:

- `server_truststore.jks`
- `server_keystore.jks` 
- `client_truststore.jks`
- `client_keystore.jks`

It is also assumed that both sides' `keystore` and `truststore` files have each other's certificates with aliases `server_cert` and `client_cert`, meaning that a Java ZooKeeper client can already connect to a ZooKeeper server.
If your private key has a password, make sure this password is included in the `config.yaml` file for config option `tls_private_key_password`.

To convert the JKS files to PEM files:

1. Get the `ca_cert.pem` file from `client_truststore.jks`, since the client's truststore contains the certificate of the server that is trustable:
    ```
    keytool -exportcert -file ca_cert.pem -keystore client_truststore.jks -alias server_cert -rfc
    ```

2. Get the `cert.pem` file from `client_keystore.jks`, since the client's `keystore` contains the cert of the client for alias `client_cert`:
    ```
    keytool -importkeystore -srckeystore client_keystore.jks -destkeystore cert.p12 -srcstoretype jks -deststoretype pkcs12 -srcalias client_cert
    ```   

3. Run the `openssl pkcs12` command, which exports both the client cert and the private key for the certificate. The `tls_cert` config option is able to read and parse the PEM file which contains both the cert and private key. Add `-nodes` to this command if you want to get a non-password-protected file:
   ```
   openssl pkcs12 -in cert.p12 -out cert.pem
   ``` 

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

1. Edit the `zk.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1] to start collecting your ZooKeeper [metrics](#metric-collection) and [logs](#log-collection).
   See the [sample zk.d/conf.yaml][2] for all available configuration options.

2. [Restart the Agent][3].

#### Log collection

_Available for Agent versions >6.0_

1. ZooKeeper uses the `log4j` logger per default. To activate the logging into a file and customize the format edit the `log4j.properties` file:

   ```text
     # Set root logger level to INFO and its only appender to R
     log4j.rootLogger=INFO, R
     log4j.appender.R.File=/var/log/zookeeper.log
     log4j.appender.R.layout=org.apache.log4j.PatternLayout
     log4j.appender.R.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n
   ```

2. By default, Datadog's integration pipeline supports the following conversion patterns:

   ```text
     %d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
     %d [%t] %-5p %c - %m%n
     %r [%t] %p %c %x - %m%n
   ```

    Make sure you clone and edit the integration pipeline if you have a different format.

3. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

4. Uncomment and edit this configuration block at the bottom of your `zk.d/conf.yaml`:

   ```yaml
   logs:
     - type: file
       path: /var/log/zookeeper.log
       source: zookeeper
       service: myapp
       #To handle multi line that starts with yyyy-mm-dd use the following pattern
       #log_processing_rules:
       #  - type: multi_line
       #    name: log_start_with_date
       #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   ```

    Change the `path` and `service` parameter values and configure them for your environment. See the [sample zk.d/conf.yaml][2] for all available configuration options.

5. [Restart the Agent][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/zk/datadog_checks/zk/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

##### Metric collection

| Parameter            | Value                                  |
| -------------------- | -------------------------------------- |
| `<INTEGRATION_NAME>` | `zk`                                   |
| `<INIT_CONFIG>`      | blank or `{}`                          |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%", "port": "2181"}` |

##### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][2].

| Parameter      | Value                                           |
| -------------- | ----------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "zookeeper", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][6] and look for `zk` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "zk" >}}


#### Deprecated metrics

The following metrics are still sent but will be removed eventually:

- `zookeeper.bytes_received`
- `zookeeper.bytes_sent`

### Events

The ZooKeeper check does not include any events.

### Service Checks
{{< get-service-checks-from-git "zk" >}}


## Troubleshooting

Need help? Contact [Datadog support][7].



[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/zk/images/zk_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://zookeeper.apache.org/doc/r3.5.4-beta/zookeeperAdmin.html#sc_clusterOptions
[4]: https://zookeeper.apache.org/doc/r3.5.4-beta/zookeeperAdmin.html#sc_4lw
[5]: https://cwiki.apache.org/confluence/display/ZOOKEEPER/ZooKeeper+SSL+User+Guide
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/help/
