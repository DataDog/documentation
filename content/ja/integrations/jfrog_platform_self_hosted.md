---
app_id: jfrog-platform
app_uuid: b2748652-b976-461c-91dd-5abd4467f361
assets:
  dashboards:
    Artifactory Metrics: assets/dashboards/jfrog_artifactory_metrics_(self-hosted).json
    Jfrog Artifactory Dashboard: assets/dashboards/jfrog_artifactory_logs_(self-hosted).json
    Xray Logs: assets/dashboards/jfrog_xray_logs_(self-hosted).json
    Xray Metrics: assets/dashboards/jfrog_xray_metrics_(self-hosted).json
    Xray Violations: assets/dashboards/jfrog_xray_violations_(self-hosted).json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: jfrog.artifactory.app_disk_free_bytes
      metadata_path: metadata.csv
      prefix: jfrog.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10121
    source_type_name: JFrog Platform
author:
  homepage: https://github.com/jfrog/log-analytics-datadog
  name: JFrog
  sales_email: partners@jfrog.com
  support_email: support@jfrog.com
categories:
- containers
- log collection
- metrics
- security
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform_self_hosted/README.md
display_on_public_website: true
draft: false
git_integration_title: jfrog_platform_self_hosted
integration_id: jfrog-platform
integration_title: JFrog Platform (Self-hosted)
integration_version: 1.3.0
is_public: true
manifest_version: 2.0.0
name: jfrog_platform_self_hosted
public_title: JFrog Platform (Self-hosted)
short_description: View and analyze JFrog Artifactory and Xray Logs, Violations and
  Metrics
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Log Collection
  - Category::Metrics
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: View and analyze JFrog Artifactory and Xray Logs, Violations and Metrics
  media:
  - caption: JFrog Artifactory Logs dashboard
    image_url: images/jfrog_artifactory_logs.png
    media_type: image
  - caption: JFrog Artifactory Metrics dashboard
    image_url: images/jfrog_artifactory_metrics.png
    media_type: image
  - caption: JFrog Xray Logs dashboard
    image_url: images/jfrog_xray_logs.png
    media_type: image
  - caption: JFrog Xray Violations dashboard
    image_url: images/jfrog_xray_violations.png
    media_type: image
  - caption: JFrog Xray Metrics dashboard
    image_url: images/jfrog_xray_metrics.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: JFrog Platform (Self-hosted)
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
<div class="alert alert-warning">The existing agent check to gather JFrog metrics has been replaced with Fluentd. The agent check is deprecated.</div>

## Overview

[JFrog][1] is a universal, hybrid, and end-to-end DevOps platform. This integration helps any JFrog self-hosted customer seamlessly stream logs, violations and metrics from JFrog Artifactory and JFrog Xray straight into Datadog. This integration comes packaged with Datadog [log pipelines][2] which enrich and index logs to make them more searchable and treatable using Datadog [facets][3].  

Let JFrog know how we can improve the integration. Feel free to visit [our GitHub][4] for more detailed documentation.

### JFrog dashboards

You can find the dashboards packaged with this integration under the Assets tab on the integration tile.

#### JFrog Artifactory dashboard
This dashboard is divided into three sections: Application, Audit and Requests.
* **Application** - This section tracks Log Volume (information about different log sources) and Artifactory Errors over time (bursts of application errors that may otherwise go undetected).
* **Audit** - This section tracks audit logs that help you determine who is accessing your Artifactory instance and from where. These can help you track potentially malicious requests or processes (such as CI jobs) using expired credentials.
* **Requests** - This section tracks HTTP response codes and the top 10 IP addresses for uploads and downloads.

#### JFrog Artifactory Metrics dashboard
This dashboard tracks Artifactory System Metrics, JVM memory, Garbage Collection, Database Connections, and HTTP Connections metrics.

#### JFrog Xray Logs dashboard
This dashboard provides a summary of access, service and traffic log volumes associated with Xray. Additionally, customers are also able to track various HTTP response codes, HTTP 500 errors, and log errors for greater operational insight.

#### JFrog Xray Violations dashboard
This dashboard provides an aggregated summary of all the license violations and security vulnerabilities found by Xray. Information is segmented by watch policies and rules. Trending information is provided on the type and severity of violations over time, as well as insights on most frequently occurring CVEs, top impacted artifacts and components.

#### JFrog Xray Metrics dashboard
This dashboard tracks System Metrics and data metrics about Scanned Artifacts and Scanned Components.

## セットアップ

### Requirements

* Your [Datadog API key][5].
* Install the JFrog Platform (Self-hosted) integration.

### Fluentd Installation
We recommend following the installation guide that matches your environment:

* [OS / Virtual Machine][6]
* [Docker][7]
* [Kubernetes Deployment with Helm][8]

## 収集データ

### メトリクス
{{< get-metrics-from-git "jfrog_platform_self_hosted" >}}


### イベント

The JFrog check does not include any events.

### サービスチェック

The JFrog check does not include any service checks.

## サポート

Need help? Contact [support@jfrog.com][10] or open a support ticket on JFrog [Customer Support Portal][11]

### トラブルシューティング

**Q : I am about to upgrade from on-prem to JFrog Cloud. Can I expect all the same logs to stream into Datadog from my SaaS instance post-migration when I install the SaaS version of the integration?**

A: At launch, the SaaS version of the integration will only stream the artifactory-request, access-audit and access-security-audit logs from your SaaS JFrog instance to Datadog.


[1]: https://jfrog.com/
[2]: https://docs.datadoghq.com/ja/logs/log_configuration/pipelines/?tab=source
[3]: https://docs.datadoghq.com/ja/logs/explorer/facets/
[4]: https://github.com/jfrog/log-analytics-datadog
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://github.com/jfrog/log-analytics-datadog#os--virtual-machine
[7]: https://github.com/jfrog/log-analytics-datadog#docker
[8]: https://github.com/jfrog/log-analytics-datadog#kubernetes-deployment-with-helm
[9]: https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform/metadata.csv
[10]: support@jfrog.com
[11]: https://support.jfrog.com/s/login/?language=en_US&ec=302&startURL=%2Fs%2F