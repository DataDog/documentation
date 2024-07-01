---
"app_id": "twistlock"
"app_uuid": "b10f1447-4e25-4c76-ab05-911cde5df5c6"
"assets":
  "dashboards":
    "Twistlock": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": true
    "metrics":
      "check": twistlock.images.cve.details
      "metadata_path": metadata.csv
      "prefix": twistlock.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10052"
    "source_type_name": Twistlock
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- compliance
- containers
- log collection
- network
- security
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/twistlock/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "twistlock"
"integration_id": "twistlock"
"integration_title": "Prisma Cloud Compute Edition"
"integration_version": "3.6.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "twistlock"
"public_title": "Prisma Cloud Compute Edition"
"short_description": "Twistlock is a container security scanner"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Compliance"
  - "Category::Containers"
  - "Category::Log Collection"
  - "Category::Network"
  - "Category::Security"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Twistlock is a container security scanner
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Prisma Cloud Compute Edition
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

[Prisma Cloud Compute Edition][1] is a security scanner. It scans containers, hosts, and packages to find vulnerabilities and compliance issues.

## Setup

### Installation

The Prisma Cloud Compute Edition check is included in the [Datadog Agent][2] package, so you do not need to install anything else on your server.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

##### Metric collection

1. Edit the `twistlock.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your twistlock performance data. See the [sample twistlock.d/conf.yaml][1] for all available configuration options.

2. [Restart the Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/twistlock/datadog_checks/twistlock/data/conf.yaml.example
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

##### Metric collection

| Parameter            | Value                                                                               |
| -------------------- | ----------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `twistlock`                                                                         |
| `<INIT_CONFIG>`      | blank or `{}`                                                                       |
| `<INSTANCE_CONFIG>`  | `{"url":"http://%%host%%:8083", "username":"<USERNAME>", "password": "<PASSWORD>"}` |

###### Kubernetes

If you're using Kubernetes, add the config to replication controller section of twistlock_console.yaml before deploying:

```yaml
apiVersion: v1
kind: ReplicationController
metadata:
  name: twistlock-console
  namespace: twistlock
spec:
  replicas: 1
  selector:
    name: twistlock-console
  template:
    metadata:
      annotations:
        ad.datadoghq.com/twistlock-console.check_names: '["twistlock"]'
        ad.datadoghq.com/twistlock-console.init_configs: "[{}]"
        ad.datadoghq.com/twistlock-console.instances: '[{"url":"http://%%host%%:8083", "username":"<USERNAME>", "password": "<PASSWORD>"}]'
        ad.datadoghq.com/twistlock-console.logs: '[{"source": "twistlock", "service": "twistlock"}]'
      name: twistlock-console
      namespace: twistlock
      labels:
        name: twistlock-console
```

##### Log collection


{{< site-region region="us3" >}}
**Log collection is not supported for the Datadog {{< region-param key="dd_site_name" >}} site**.
{{< /site-region >}}


_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][2].

| Parameter      | Value                                             |
| -------------- | ------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "twistlock", "service": "twistlock"}` |

###### Kubernetes

1. Collecting logs is disabled by default in the Datadog Agent. Enable it in your [DaemonSet configuration][3]:

   ```yaml
     #(...)
       env:
         #(...)
         - name: DD_LOGS_ENABLED
             value: "true"
         - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
             value: "true"
     #(...)
   ```

2. Mount the Docker socket to the Datadog Agent. See the Datadog Kubernetes [example manifests][4].

3. Make sure the log section is included in the Pod annotation for the defender, where the container name can be found just below in the pod spec:

   ```yaml
   ad.datadoghq.com/<container-name>.logs: '[{"source": "twistlock", "service": "twistlock"}]'
   ```

4. [Restart the Agent][5].

###### Docker

1. Collecting logs is disabled by default in the Datadog Agent. Enable it with the environment variable:

   ```shell
   DD_LOGS_ENABLED=true
   ```

2. Add a label on the defender container:

   ```yaml
   ad.datadoghq.com/<container-name>.logs: '[{"source": "twistlock", "service": "twistlock"}]'
   ```

3. Mount the Docker socket to the Datadog Agent. More information about the required configuration to collect logs with the Datadog Agent available in [Docker Log Collection][6].

4. [Restart the Agent][5].

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/?tab=containerinstallation#setup
[3]: https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/#log-collection
[4]: https://docs.datadoghq.com/agent/kubernetes/?tab=daemonset
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation
{{% /tab %}}
{{< /tabs >}}

### Validation

Run the [Agent's status subcommand][3] and look for `twistlock` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "twistlock" >}}


### Events

Prisma Cloud Compute Edition sends an event when a new CVE is found.

### Service Checks
{{< get-service-checks-from-git "twistlock" >}}


## Troubleshooting

Need help? Contact [Datadog support][4].



[1]: https://www.paloaltonetworks.com/prisma/cloud
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/help/
