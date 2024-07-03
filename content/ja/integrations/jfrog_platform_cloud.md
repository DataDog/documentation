---
app_id: jfrog-platform-cloud
app_uuid: 798102cb-6c52-4a16-bc1b-48c2e6b54e71
assets:
  dashboards:
    JFrog Platform Cloud Log Analytics: assets/dashboards/jfrog_platform_cloud_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10419
    source_type_name: JFrog Platform Cloud
author:
  homepage: https://jfrog.com/
  name: JFrog
  sales_email: partners@jfrog.com
  support_email: support@jfrog.com
categories:
- log collection
- kubernetes
- containers
- security
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: jfrog_platform_cloud
integration_id: jfrog-platform-cloud
integration_title: JFrog Platform Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: jfrog_platform_cloud
public_title: JFrog Platform Cloud
short_description: View and analyze JFrog Artifactory Cloud logs
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Offering::Integration
  - Submitted Data Type::Logs
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Kubernetes
  - Category::Containers
  - Category::Security
  configuration: README.md#Setup
  description: View and analyze JFrog Artifactory Cloud logs
  media:
  - caption: JFrog Artifactory Logs dashboard - HTTP Requests
    image_url: images/jfrog_platform_cloud_logs_0.png
    media_type: image
  - caption: JFrog Artifactory Logs dashboard - Request Logs
    image_url: images/jfrog_platform_cloud_logs_1.png
    media_type: image
  - caption: JFrog Artifactory Logs dashboard - Operations
    image_url: images/jfrog_platform_cloud_logs_2.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: JFrog Platform Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[JFrog][1] is a universal hybrid, end-to-end DevOps platform. JFrog Artifactory is the single solution for housing and managing all the artifacts, binaries, packages, files, containers, and components for use throughout your software supply chain.

JFrog Artifactory serves as your central hub for DevOps, integrating with your tools and processes to improve automation, increase integrity, and incorporate best practices along the way.

JFrog's SaaS Log Streamer is a log streaming solution built by JFrog for SaaS customers. This solution will stream JFrog Artifactory logs from the customer's JFrog SaaS instance straight into their Datadog instance.

Customers who use both JFrog and Datadog will be able to visualize Artifactory logs inside pre-configured Datadog dashboards. This integration also has built-in support for Datadog log pipelines which means logs streamed from JFrog will be pre-processed and automatically converted into the Datadog log format, allowing teams to uniquely name logs per their needs, drill down into Artifactory logs through searchable facets, and monitor their JFrog SaaS instance.

This integration streams the following artifactory logs to Datadog:

- **access-audit.log**
- **artifactory-request.log**
- **artifactory-access.log**
- **access-security-audit.log**

These logs will allow customers to readily know who accessed what repositories and how often. The logs will also show what IP addresses accessed those repositories. Log types such as traffic.log, artifactory-access.log and more request logs will be added to this integration in future updates.

JFrog's SaaS Log Streaming is currently in beta. While in beta, the cloud log streaming feature will only be available inside the MyJFrog portal for select JFrog Enterprise and customers. JFrog plans to GA this feature later in Q2 2024 at which point it will be available to all JFrog Enterprise and customers.

## セットアップ

**Note:** The integration requires a JFrog Enterprise Plus subscription.

### インストール

1. [Datadog API キー][2]を作成します。
2. On the [MyJFrog Portal][3], go to Settings > JFrog Cloud Log Streaming - BETA, and enable the Log Streamer.
3. Select Datadog as the vendor. 
4. Add your Datadog API key, select the Datadog intake URL for your [Datadog site][4] from the dropdown menu, and add `ddtags` if needed. Click Save.

Your logs will start streaming into Datadog in 24 hours or less.

## サポート

Need help? Contact [JFrog Support][5]. 

[1]: https://jfrog.com/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://my.jfrog.com
[4]: https://docs.datadoghq.com/ja/getting_started/site/
[5]: https://support.jfrog.com/