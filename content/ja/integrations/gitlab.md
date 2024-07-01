---
"app_id": "gitlab"
"app_uuid": "3d165411-7734-4f72-b39a-f222add296b2"
"assets":
  "dashboards":
    "Gitlab Overview": "assets/dashboards/overview.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check":
      - "gitlab.process_max_fds"
      - "gitlab.ruby.process_start_time_seconds"
      "metadata_path": "metadata.csv"
      "prefix": "gitlab."
    "process_signatures":
    - "gitlab-kas"
    - "gitlab-workhorse"
    - "gitlab-ctl"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10026"
    "source_type_name": "Gitlab"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "collaboration"
- "developer tools"
- "issue tracking"
- "log collection"
- "source control"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/gitlab/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "gitlab"
"integration_id": "gitlab"
"integration_title": "GitLab"
"integration_version": "7.3.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "gitlab"
"public_title": "GitLab"
"short_description": "Track all your GitLab metrics with Datadog."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Collaboration"
  - "Category::Developer Tools"
  - "Category::Issue Tracking"
  - "Category::Log Collection"
  - "Category::Source Control"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": "Track all your GitLab metrics with Datadog."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "GitLab"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Integration that allows to:

- Visualize and monitor metrics collected with GitLab and Gitaly through Prometheus

See [Monitoring GitLab with Prometheus][1] for more information.

For more in-depth monitoring of your GitLab pipelines, check out [CI Pipeline Visibility][2]. CI Pipeline Visibility provides granular insights into your user workflow, lets you access detailed Git metadata, and tracks pipeline performance over time.

## Setup

This OpenMetrics-based integration has a latest mode (enabled by setting `openmetrics_endpoint` to point to the target endpoint) and a legacy mode (enabled by setting `prometheus_url` instead). To get all the most up-to-date features, Datadog recommends enabling the latest mode. For more information, see [Latest and Legacy Versioning For OpenMetrics-based Integrations][3].

Metrics marked as `[OpenMetricsV1]` or `[OpenMetricsV2]` are only available using the corresponding mode of the GitLab integration. All other metrics are collected by both modes. 

### Installation

The GitLab check is included in the [Datadog Agent][4] package, so you don't need to install anything else on your GitLab servers.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

##### Metric collection

1. Edit the `gitlab.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1], to point to the GitLab's metrics [endpoint][2].
See the [sample gitlab.d/conf.yaml][3] for all available configuration options. If you previously implemented this integration, see the [legacy example][4].

2. In the GitLab settings page, ensure that the option `Enable Prometheus Metrics` is enabled (administrator access is required). For more information on how to enable metric collection, see [GitLab Prometheus metrics][5].

3. Allow access to monitoring endpoints by updating your `/etc/gitlab/gitlab.rb` to include the following line:

    ```
    gitlab_rails['monitoring_whitelist'] = ['127.0.0.0/8', '192.168.0.1']
    ```
    **Note** Save and restart GitLab to see the changes.

4. [Restart the Agent][6].

##### Log collection

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Next, edit `gitlab.d/conf.yaml` by uncommenting the `logs` lines at the bottom. Update the logs `path` with the correct path to your GitLab log files.

   ```yaml
     logs:
       - type: file
         path: /var/log/gitlab/gitlab-rails/production_json.log
         service: '<SERVICE_NAME>'
         source: gitlab
       - type: file
         path: /var/log/gitlab/gitlab-rails/production.log
         service: '<SERVICE_NAME>'
         source: gitlab
       - type: file
         path: /var/log/gitlab/gitlab-rails/api_json.log
         service: '<SERVICE_NAME>'
         source: gitlab
   ```

3. [Restart the Agent][6].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://docs.gitlab.com/ee/administration/monitoring/prometheus/gitlab_metrics.html#collecting-the-metrics
[3]: https://github.com/DataDog/integrations-core/blob/master/gitlab/datadog_checks/gitlab/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/7.43.x/gitlab/datadog_checks/gitlab/data/conf.yaml.example
[5]: https://docs.gitlab.com/ee/administration/monitoring/prometheus/gitlab_metrics.html
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

##### Metric collection

| Parameter            | Value                                                                                         |
| -------------------- |-----------------------------------------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `gitlab`                                                                                      |
| `<INIT_CONFIG>`      | blank or `{}`                                                                                 |
| `<INSTANCE_CONFIG>`  | `{"gitlab_url":"http://%%host%%/", "openmetrics_endpoint":"http://%%host%%:10055/-/metrics"}` |

##### Log collection

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][2].

| Parameter      | Value                                       |
| -------------- | ------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "gitlab", "service": "gitlab"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][5] and look for `gitlab` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "gitlab" >}}


### Events

The GitLab check does not include any events.

### Service Checks
{{< get-service-checks-from-git "gitlab" >}}
 More information about the `gitlab.readiness.*` service checks can be found in the official [GitLab documentation][6].

## Troubleshooting

Need help? Contact [Datadog support][7].




<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## GitLab Runner Integration

## Overview

Integration that allows to:

- Visualize and monitor metrics collected with GitLab Runners through Prometheus
- Validate that the GitLab Runner can connect to GitLab

For more information about the GitLab Runner and its integration with Prometheus, see the [GitLab Runner documentation][8].

## Setup

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][9] for guidance on applying these instructions.

### Installation

The GitLab Runner check is included in the [Datadog Agent][4] package, so you don't need to install anything else on your GitLab servers.

### Configuration

Edit the `gitlab_runner.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][10], to point to the Runner's Prometheus metrics endpoint and to the GitLab master to have a service check. See the [sample gitlab_runner.d/conf.yaml][11] for all available configuration options.

The `allowed_metrics` item in the `init_config` section allows you to specify the metrics that should be extracted. Some metrics should be reported as `rate`, for example: `ci_runner_errors`.

### Validation

[Run the Agent's `status` subcommand][5] and look for `gitlab_runner` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "gitlab_runner" >}}


### Log collection


1. In your `gitlab_runner` [configuration file][12], change the log format to `json` (_Available for GitLab Runner versions >=11.4.0_ ):
   ```toml
   log_format = "json"
   ```

2. Collecting logs is disabled by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

3. Add the `dd-agent` user to the `systemd-journal` group by running:
   ```text
   usermod -a -G systemd-journal dd-agent
   ```

4. Add this configuration block to your `gitlab_runner.d/conf.yaml` file to start collecting your GitLab Runner Logs:

   ```yaml
   logs:
     - type: journald
       source: gitlab-runner
   ```

    See the [sample gitlab_runner.d/conf.yaml][11] for all available configuration options.

5. [Restart the Agent][13].

### Events

The GitLab Runner check does not include any events.

### Service Checks

The GitLab Runner check provides a service check to confirm that the Runner can talk to the GitLab master and another one to ensure that the local Prometheus endpoint is available.

## Troubleshooting

Need help? Contact [Datadog support][7].


[1]: https://docs.gitlab.com/ee/administration/monitoring/prometheus
[2]: https://app.datadoghq.com/ci/getting-started
[3]: https://docs.datadoghq.com/integrations/guide/versions-for-openmetrics-based-integrations
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.gitlab.com/ee/user/admin_area/monitoring/health_check.html#readiness
[7]: https://docs.datadoghq.com/help/
[8]: https://docs.gitlab.com/runner/monitoring/
[9]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[10]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[11]: https://github.com/DataDog/integrations-core/blob/master/gitlab_runner/datadog_checks/gitlab_runner/data/conf.yaml.example
[12]: https://docs.gitlab.com/runner/configuration/advanced-configuration.html
[13]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
