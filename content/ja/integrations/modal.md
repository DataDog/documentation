---
"app_id": "modal"
"app_uuid": "faa29018-d015-4134-956e-40912d774640"
"assets":
  "dashboards":
    "Modal": assets/dashboards/modal.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": modal.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "7324533"
    "source_type_name": Modal
  "oauth": assets/oauth_clients.json
"author":
  "homepage": "https://modal.com"
  "name": Modal Labs
  "sales_email": support@modal.com
  "support_email": support@modal.com
"categories":
- cloud
- モニター
- log collection
- ai/ml
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/modal/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "modal"
"integration_id": "modal"
"integration_title": "Modal"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "modal"
"public_title": "Modal"
"short_description": "Collect logs and metrics for your Modal applications"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::Cloud"
  - "Category::Metrics"
  - "Category::Log Collection"
  - "Category::AI/ML"
  - "Submitted Data Type::Logs"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": Collect logs and metrics for your Modal applications
  "media":
  - "caption": Run your generative AI models, large-scale batch jobs, job queues, and much more through Modal.
    "image_url": images/modal-product-hero.jpg
    "media_type": image
  - "caption": See audit logs, function logs, and utilization metrics in the Modal Datadog dashboard
    "image_url": images/modal-datadog-dashboard.jpg
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Troubleshooting"
  "title": Modal
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[Modal][1] lets you run generative AI models, large-scale batch jobs, job
queues, and much more. This integration collects metrics (CPU, memory
or GPU use for example) and logs (stdout/stderr logging from your modal
applications, or audit logs for your account) that you can visualize through Datadog
dashboards and set up alerts for with Datadog monitors.

## セットアップ

### インストール

To set up the Modal integration:

1. Navigate to the [**Modal** tile][2] on the Datadog Integrations page and
   click **Install Integration**.

2. Click **Connect Accounts** to begin authorization of this integration. You
   will be redirected to log into [Modal][1], and once logged in, you'll be
   redirected to the Datadog authorization page.

3. Click the **Authorize** button to complete setup.

Logs and metrics from your Modal apps should now start appearing in Datadog.

## 収集データ

### メトリクス

Modal collects GPU, CPU, and memory utilization metrics for
applications/functions that run on Modal.

### Logs

Modal collects audit logs and all application logs (all stdout/stderr logging).

### イベント

Modal does not include any events.

## Uninstallation

Once this integration has been uninstalled, any previous authorizations are
revoked and logs/metrics stop being emitted to Datadog.

1. On the **Configure** tab in the **Modal** integration tile in Datadog, click **Uninstall Integration**.

2. Ensure that all API keys associated with this integration have been disabled
   by searching for the integration name on the [API Keys page][3].

## トラブルシューティング

Need help? Contact [Modal support][4].


[1]: https://modal.com
[2]: https://app.datadoghq.com/integrations?integrationId=modal
[3]: https://app.datadoghq.com/organization-settings/api-keys?filter=Modal
[4]: mailto:support@modal.com

