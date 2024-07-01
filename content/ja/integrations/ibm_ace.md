---
"app_id": "ibm-ace"
"app_uuid": "81e0df5f-8778-4558-88c3-884dcab5ce89"
"assets":
  "dashboards":
    "IBM ACE Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": ibm_ace.messages.current
      "metadata_path": metadata.csv
      "prefix": ibm_ace.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10262"
    "source_type_name": IBM ACE
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/ibm_ace/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "ibm_ace"
"integration_id": "ibm-ace"
"integration_title": "IBM ACE"
"integration_version": "2.2.2"
"is_public": true
"manifest_version": "2.0.0"
"name": "ibm_ace"
"public_title": "IBM ACE"
"short_description": "Monitor IBM ACE resource statistics and message flows."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitor IBM ACE resource statistics and message flows.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": IBM ACE
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [IBM ACE][1] through the Datadog Agent.

## Setup

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### IBM MQ

An [IBM MQ][3] server is required for consuming metric messages from IBM ACE.

<div class="alert alert-warning">
For Linux, make sure to set the LD_LIBRARY_PATH environment variable as described in the <a href="https://docs.datadoghq.com/integrations/ibm_mq/">IBM MQ setup</a> before continuing.
</div>

### IBM ACE

1. Ensure at least version 12.0.2.0 is installed.
2. Apply an [MQEndpoint policy][4] file named in the form `<MQ_POLICY_NAME>.policyxml` that would look like this:
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <policies>
        <policy policyType="MQEndpoint" policyName="<MQ_POLICY_NAME>" policyTemplate="MQEndpoint">
            <connection>CLIENT</connection>
            <destinationQueueManagerName>...</destinationQueueManagerName>
            <queueManagerHostname>...</queueManagerHostname>
            <listenerPortNumber>1414</listenerPortNumber>
            <channelName>...</channelName>
            <securityIdentity><MQ_SECURITY_IDENTITY></securityIdentity>
        </policy>
    </policies>
    ```
3. [Set][5] the credentials by running: `mqsisetdbparms -n mq::<MQ_SECURITY_IDENTITY> -u <user> -p <password>`
4. Update your `server.conf.yaml` file with the following config:
    ```yaml
    remoteDefaultQueueManager: '{DefaultPolicies}:<MQ_POLICY_NAME>'
    Events:
      OperationalEvents:
        MQ:
          enabled: true
      BusinessEvents:
        MQ:
          enabled: true
          outputFormat: json
    Statistics:
      Resource:
        reportingOn: true
      Snapshot:
        publicationOn: active
        outputFormat: json
        accountingOrigin: basic
        nodeDataLevel: advanced
        threadDataLevel: basic
    Monitoring:
      MessageFlow:
        publicationOn: active
        eventFormat: MonitoringEventV2
    AdminLog:
      enabled: true
      fileLog: true
      consoleLog: true
      consoleLogFormat: ibmjson
    ```
5. Restart IBM ACE.

### Installation

The IBM ACE check is included in the [Datadog Agent][6] package.
No additional installation is needed on your server.

### Configuration

1. Edit the `ibm_ace.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your ibm_ace performance data. See the [sample ibm_ace.d/conf.yaml][7] for all available configuration options.

2. [Restart the Agent][8].

### Validation

[Run the Agent's status subcommand][9] and look for `ibm_ace` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "ibm_ace" >}}


### Events

The IBM ACE integration does not include any events.

### Service Checks
{{< get-service-checks-from-git "ibm_ace" >}}


### Log collection

1. Collecting logs is disabled by default in the Datadog Agent. Enable it in your `datadog.yaml` file:

    ```yaml
    logs_enabled: true
    ```

2. To start collecting your IBM ACE logs, add this configuration block to your `ibm_ace.d/conf.yaml` file:

    ```yaml
    logs:
      - type: file
        path: /home/aceuser/ace-server/log/integration_server.txt
        source: ibm_ace
    ```

    Change the `path` parameter value based on your environment. See the [sample `ibm_ace.d/conf.yaml` file][7] for all available configuration options.

## Troubleshooting

Need help? Contact [Datadog support][12].


[1]: https://www.ibm.com/docs/en/app-connect/12.0?topic=overview-app-connect-enterprise-introduction
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://www.ibm.com/products/mq
[4]: https://www.ibm.com/docs/en/app-connect/12.0?topic=properties-mqendpoint-policy
[5]: https://www.ibm.com/docs/en/app-connect/12.0?topic=mq-connecting-secured-queue-manager
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://github.com/DataDog/integrations-core/blob/master/ibm_ace/datadog_checks/ibm_ace/data/conf.yaml.example
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/ibm_ace/metadata.csv
[11]: https://github.com/DataDog/integrations-core/blob/master/ibm_ace/assets/service_checks.json
[12]: https://docs.datadoghq.com/help/

