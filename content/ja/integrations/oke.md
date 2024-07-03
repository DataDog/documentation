---
app_id: oke
app_uuid: c3361861-32be-4ed4-a138-d68b85b8d88b
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10255
    source_type_name: Oracle Container Engine for Kubernetes - OKE
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- containers
- kubernetes
- oracle
- orchestration
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/oke/README.md
display_on_public_website: true
draft: false
git_integration_title: oke
integration_id: oke
integration_title: Oracle Container Engine for Kubernetes
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oke
public_title: Oracle Container Engine for Kubernetes
short_description: OKE is an Oracle-managed container orchestration service.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Oracle
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: OKE is an Oracle-managed container orchestration service.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Oracle Container Engine for Kubernetes
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Oracle Cloud Infrastructure Container Engine for Kubernetes (OKE) is a fully-managed Kubernetes service for deploying and running your containerized applications on Oracle Cloud. Datadog provides you with comprehensive visibility to your Kubernetes clusters managed by OKE. Once you have enabled your Datadog integration, you can view your Kubernetes infrastructure, monitor live processes, and track key metrics from all of your pods and containers in one place.

## セットアップ

Because Datadog already integrates with Kubernetes, it is ready-made to monitor OKE. If you're running the Agent in a Kubernetes cluster and plan to migrate to OKE, you can continue monitoring your cluster with Datadog.

Additionally, OKE node pools are supported.


## トラブルシューティング

Need help? Contact [Datadog support][1].

## Further Reading

- [How to monitor OKE with Datadog][2]

[1]: https://docs.datadoghq.com/ja/help/
[2]: https://www.datadoghq.com/blog/monitor-oracle-kubernetes-engine/