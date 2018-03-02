---
categories:
- web
- network
doc_link: https://docs.datadoghq.com/integrations/gitlab/
git_integration_title: gitlab
guid: 1cab328c-5560-4737-ad06-92ebc54af901
has_logo: true
integration_title: Gitlab
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.0
max_agent_version: 6.0.0
min_agent_version: 5.14.0
name: gitlab
public_title: Datadog-Gitlab Integration
short_description: Track all your Gitlab metrics with Datadog
support: core
supported_os:
- linux
- mac_os
- windows
version: 1.0.0
---



## Overview

Integration that allows to:

* Visualize and monitor metrics collected via Gitlab through Prometheus

See https://docs.gitlab.com/ee/administration/monitoring/prometheus/ for
more information about Gitlab and its integration with Prometheus

## Setup
### Installation

The Gitlab check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your Gitlab servers.

If you need the newest version of the Gitlab check, install the `dd-check-gitlab` package; this package's check overrides the one packaged with the Agent. See the [integrations-core repository README.md for more details](https://github.com/DataDog/integrations-core#installing-the-integrations).

### Configuration

Edit the `gitlab.yaml` file to point to the Gitlab's Prometheus metrics endpoint.
See the [sample gitlab.yaml](https://github.com/DataDog/integrations-core/blob/master/gitlab/conf.yaml.example) for all available configuration options.

The `allowed_metrics` item in the `init_config` section allows to specify the metrics that should be extracted.

### Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `gitlab` under the Checks section:

    Checks
    ======

        gitlab
        -----------
          - instance #0 [OK]
          - Collected 8 metrics, 0 events & 3 service checks

## Compatibility

The gitlab check is compatible with all major platforms

## Data Collected
### Metrics
{{< get-metrics-from-git "gitlab" >}}


### Events
The Gitlab check does not include any event at this time.

### Service Checks
The Gitlab check includes a readiness and a liveness service check.
Moreover, it provides a service check to ensure that the local Prometheus endpoint is available.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)



## Gitlab Runner Integration

## Overview

Integration that allows to:

* Visualize and monitor metrics collected via Gitlab Runners through Prometheus
* Validate that the Gitlab Runner can connect to Gitlab

See https://docs.gitlab.com/runner/monitoring/README.html for
more information about Gitlab Runner and its integration with Prometheus

## Setup
### Installation

The Gitlab Runner check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your Gitlab servers.

If you need the newest version of the Gitlab Runner check, install the `dd-check-gitlab_runner` package; this package's check overrides the one packaged with the Agent. See the [integrations-core repository README.md for more details](https://github.com/DataDog/integrations-core#installing-the-integrations).

### Configuration

Edit the `gitlab_runner.yaml` file to point to the Runner's Prometheus metrics endpoint and to the Gitlab master to have a service check.
See the [sample gitlab_runner.yaml](https://github.com/DataDog/integrations-core/blob/master/gitlab_runner/conf.yaml.example) for all available configuration options.

The `allowed_metrics` item in the `init_config` section allows to specify the metrics that should be extracted.

**Remarks:**

 - Some metrics should be reported as `rate` (i.e., `ci_runner_errors`)


### Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `gitlab_runner` under the Checks section:

    Checks
    ======

        gitlab_runner
        -----------
          - instance #0 [OK]
          - Collected 10 metrics, 0 events & 2 service checks

## Compatibility

The gitlab_runner check is compatible with all major platforms

## Data Collected
### Metrics
{{< get-metrics-from-git "gitlab_runner" >}}


### Events
The Gitlab Runner check does not include any event at this time.

### Service Checks
The Gitlab Runner check currently provides a service check to ensure that the Runner can talk to the Gitlab master and another one to ensure that the
local Prometheus endpoint is available.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

