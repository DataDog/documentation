---
"app_id": "weblogic"
"app_uuid": "80a8d9e2-48dd-4242-be78-0d929ea1a492"
"assets":
  "dashboards":
    "metrics": assets/dashboards/metrics.json
    "overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": weblogic.jvm_runtime.heap_size
      "metadata_path": metadata.csv
      "prefix": weblogic.
    "process_signatures":
    - java weblogic.Server
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10245"
    "source_type_name": WebLogic
  "monitors":
    "active_threads": assets/monitors/active_threads.json
    "stuck_threads": assets/monitors/stuck_threads.json
  "saved_views":
    "weblogic_error_logs": assets/saved_views/error_logs.json
    "weblogic_overview": assets/saved_views/weblogic_overview.json
    "weblogic_patterns": assets/saved_views/weblogic_patterns.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
- oracle
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/weblogic/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "weblogic"
"integration_id": "weblogic"
"integration_title": "WebLogic"
"integration_version": "1.3.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "weblogic"
"public_title": "WebLogic"
"short_description": "Monitor the health and performance of WebLogic Servers."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Oracle"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitor the health and performance of WebLogic Servers.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": WebLogic
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Oracle WebLogic is a platform for developing, running and deploying enterprise Java applications both on-premises and in the cloud. It centralizes application services that include web server functionality, business components such as messaging, and access to backend enterprise systems such as databases. 

Oracle WebLogic monitoring with Datadog enables you to:
- Gain awareness of increasing heap size in your Java Virtual Machine (JVM)
- Track server response time
- Monitor session details of web applications
- Track thread pool and messaging services
- Track database connection pool usage

## Setup

### Installation

The WebLogic check is included in the [Datadog Agent][1] package.
No additional installation is needed on your server.

1. This check is JMX-based and collects metrics from the Platform MBean Server exported by the JVM, so your WebLogic servers must have JMX Remote Monitoring enabled. See [Remote Monitoring and Management][2] for installation instructions.

2. Set the system property `-Djavax.management.builder.initial=weblogic.management.jmx.mbeanserver.WLSMBeanServerBuilder` to enable these metrics on the Platform MBean Server. This may be enabled in either the WebLogic Server Administration Console or in the server startup scripts:


   _**Enable in the Administration Console**_

   ```
   Domain => Configuration => General => Advanced => Platform MBean Server Enabled
   ```

   _**Enable in Server Startup Scripts**_

   ```yaml
   -Djavax.management.builder.initial=weblogic.management.jmx.mbeanserver.WLSMBeanServerBuilder
   ```

   For more information, see the [WebLogic documentation][3].


3. Verify that the [`PlatformMBeanServerUsed`][4] attribute value is set to `true` in the WebLogic Server Administration Console. The default value is `true` in WebLogic Server versions 10.3.3.0 and above. This setting can be found in the WebLogic Server Administration Console or configured using the WebLogic Scripting Tool (WSLT). 

   _**Enable in the Administration Console**_

   ```
   Domain (<WEBLOGIC_SERVER>) => Configuration => General => (Advanced) => Platform MBeanServer Enabled
   ```

   _**Enable in WLST**_

   Start an edit session. Navigate to the JMX directory for the domain and use `cmo.setPlatformMBeanServerUsed(true)` to enable the attribute if it is set to `false`.

   For example:
   ```
   # > java weblogic.WLST
   (wlst) > connect('weblogic','weblogic')
   (wlst) > edit()
   (wlst) > startEdit()
   (wlst) > cd('JMX/<DOMAIN_NAME>')
   (wlst) > set('EditMBeanServerEnabled','true')
   (wlst) > activate()
   (wlst) > exit()
   ```

   Activate the changes and restart the WebLogic server.

### Configuration

1. Edit the `weblogic.d/conf.yaml` file, in the `conf.d/` folder at the root of your
   Agent's configuration directory to start collecting your WebLogic performance data.
   See the [sample weblogic.d/conf.yaml][5] for all available configuration options.

   This check has a limit of 350 metrics per instance. The number of returned metrics is indicated when running the Datadog Agent [status command][6].
   You can specify the metrics you are interested in by editing the [configuration][5].

   To learn how to customize the metrics to collect, see the [JMX Checks documentation][7] for more detailed instructions.
   If you need to monitor more metrics, contact [Datadog support][8].

2. [Restart the Agent][9]

### Validation

[Run the Agent's `status` subcommand][6] and look for `weblogic` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "weblogic" >}}


### Log collection

1. WebLogic logging services use an implementation based on the Java Logging APIs by default. Clone and edit the [integration pipeline][11] if you have a different format.

2. Collecting logs is disabled by default in the Datadog Agent. Enable it in your `datadog.yaml` file:
   ```yaml
   logs_enabled: true
   ```

3. Uncomment and edit the logs configuration block in your `weblogic.d/conf.yaml` file. Change the path and service parameter values based on your environment. See the [sample weblogic.d/conf.yaml][5] for all available configuration options.
   ```yaml
    - type: file
      path: <DOMAIN_DIR>/servers/<ADMIN_SERVER_NAME>/logs/<ADMIN_SERVER_NAME>.log
      source: weblogic
      service: admin-server
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: (\####)?<\w{3} (0?[1-9]|[12][0-9]|3[01]), \d{4}
    - type: file
      path: <DOMAIN_DIR>/servers/<ADMIN_SERVER_NAME>/logs/<DOMAIN_NAME>.log
      source: weblogic
      service: domain
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: (\####)?<\w{3} (0?[1-9]|[12][0-9]|3[01]), \d{4}
    - type: file
      path: <DOMAIN_DIR>/servers/<SERVER_NAME>/logs/<SERVER_NAME>.log
      source: weblogic
      service: managed-server
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: (\####)?<\w{3} (0?[1-9]|[12][0-9]|3[01]), \d{4}
    - type: file
      path: <DOMAIN_DIR>/servers/*/logs/access.log 
      source: weblogic
      service: http-access
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: .*\[\d{2}\/(\w{3}|\w{4})\/\d{4}:\d{2}:\d{2}:\d{2} (\+|-)\d{4}\]
   ```
4. [Restart the Agent][9]

### Containerized
For containerized environments, see the [Autodiscovery with JMX][12] guide.

### Events

The WebLogic integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "weblogic" >}}


## Troubleshooting

Need help? Contact [Datadog support][8].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.oracle.com/javase/8/docs/technotes/guides/management/agent.html#gdenl
[3]: https://support.oracle.com/cloud/faces/DocumentDisplay?_afrLoop=308314682308664&_afrWindowMode=0&id=1465052.1&_adf.ctrl-state=10ue97j4er_4
[4]: https://docs.oracle.com/en/middleware/standalone/weblogic-server/14.1.1.0/jmxcu/understandwls.html#GUID-1D2E290E-F762-44A8-99C2-EB857EB12387
[5]: https://github.com/DataDog/integrations-core/blob/master/weblogic/datadog_checks/weblogic/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/integrations/java/
[8]: https://docs.datadoghq.com/help/
[9]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://github.com/DataDog/integrations-core/blob/master/weblogic/metadata.csv
[11]: https://docs.datadoghq.com/logs/processing/#integration-pipelines
[12]: https://docs.datadoghq.com/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[13]: https://github.com/DataDog/integrations-core/blob/master/weblogic/assets/service_checks.json

