---
"app_id": "podman"
"app_uuid": "ecc06845-18ac-448e-b352-1bbf31fdfcc3"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10267"
    "source_type_name": Podman
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- containers
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/podman/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "podman"
"integration_id": "podman"
"integration_title": "Podman"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "podman"
"public_title": "Podman"
"short_description": "Track all your Podman containers metrics with Datadog"
"supported_os":
- linux
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Category::Containers"
  "configuration": "README.md#Setup"
  "description": Track all your Podman containers metrics with Datadog
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Podman
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


[Podman][1] is a daemonless container engine for developing, managing, and running OCI Containers on your Linux System. Containers can either be run as root or in rootless mode.

## Overview

Podman container runtime is supported by the [container Agent check][2].
This check reports a set of metrics on any running containers, regardless of the runtime used to start them.

**NOTE**: The `container` check report standardizes metrics for all containers found on the system, regardless of the container runtime.

## セットアップ

### インストール

To monitor containers managed by [Podman][1], see the [installation instructions][3] for the [container Agent check][2].

## 収集データ

### メトリクス

See [metadata.csv][4] for a list of metrics provided by this integration.

## トラブルシューティング

Need help? Contact [Datadog support][1].

[1]: https://podman.io/
[2]: https://docs.datadoghq.com/integrations/container/
[3]: https://docs.datadoghq.com/integrations/container/#setup
[4]: https://github.com/DataDog/integrations-core/blob/master/container/metadata.csv

