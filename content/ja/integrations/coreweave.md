---
"app_id": "coreweave"
"app_uuid": "74da15c6-f6f3-4d03-b44e-9e126e5da9e7"
"assets":
  "dashboards":
    "coreweave": assets/dashboards/coreweave_dashboard.json
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "metrics":
      "check":
      - coreweave.kube_pod_status_phase
      "metadata_path": metadata.csv
      "prefix": coreweave.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10368"
    "source_type_name": coreweave
  "monitors":
    "[CoreWeave] Abnormal Billing Activity": assets/monitors/coreweave_billing.json
    "[CoreWeave] High CPU Load": assets/monitors/coreweave_high_cpu.json
    "[CoreWeave] High Memory % Usage": assets/monitors/coreweave_high_mem.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- metrics
- ai/ml
- kubernetes
- provisioning
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "coreweave"
"integration_id": "coreweave"
"integration_title": "CoreWeave"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "coreweave"
"public_title": "CoreWeave"
"short_description": "Gather prometheus metrics from Coreweave"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Metrics"
  - "Category::AI/ML"
  - "Category::Kubernetes"
  - "Category::Provisioning"
  - "Offering::Integration"
  - "Submitted Data Type::Metrics"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Gather prometheus metrics from Coreweave
  "media":
  - "caption": CoreWeave Dashboard Overview
    "image_url": images/coreweave_dashboard.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": CoreWeave
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## Overview

With the CoreWeave integration, Datadog can scrape CoreWeave's Prometheus metrics and import them with a full complement of tags, including tags provided by Prometheus (such as pod, container, and namespace).

Track usage patterns through Datadog to better understand and optimize how organizations are using the CoreWeave Cloud platform.

This integration also provides greater visibility into how organizations are billed and pinpoint where expenses come from within CoreWeave Cloud. Detect billing abnormalities and receive alerts if or when those occur, helping teams address changes quickly, and determine which pods or namespaces are the most expensive.

## セットアップ

**Step 1: Retrieve an Access Token in CoreWeave**

To get started, [retrieve your CoreWeave access token][1]. Keep in mind that only organization admins can generate, view, and delete tokens.

Follow these steps to add the integration to your CoreWeave account and create a bearer token:

1. Go to the CoreWeave's [access token][1] page and click **Create a New Token**.
2. Enter a **token name**, preferably something unique to Datadog.
3. Assign a **namespace** to your token by moving it from **Available Namespaces** to **Selected Namespaces**. Datadog recommends one access token per namespace when using the CoreWeave integration.
4. Click **Generate**.

You need this access token for Step 2.

**Step 2: Connect your CoreWeave account to Datadog**

To get started, copy the access token key from Step 1.

1. Navigate to the [CoreWeave integration tile][2].
1. Enter a **Name** for the account.
2. Paste the **access token key** from your CoreWeave account into the Access Token field.
3. Optionally, you can define **tags** for these logs. 
4. Then, click **Save**.

### Validation

1. Check for metrics with the `coreweave.` prefix. If these metrics are present, your integration is working!

## 収集データ

### メトリクス
{{< get-metrics-from-git "coreweave" >}}


### サービスチェック

coreweave does not include any service checks.

### イベント

coreweave does not include any events.

## トラブルシューティング

Need help? Contact [Datadog support][4].


[1]: https://cloud.coreweave.com/api-access
[2]: https://app.datadoghq.com/integrations/coreweave
[3]: https://github.com/DataDog/integrations-internal-core/blob/main/coreweave/metadata.csv
[4]: https://docs.datadoghq.com/help/

