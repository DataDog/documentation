---
"app_id": "emnify"
"app_uuid": "000307b4-8304-424a-8378-daf9a41b4d93"
"assets":
  "dashboards":
    "EMnify Dashboard": assets/dashboards/emnify_dashboard.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": emnify.endpoint.volume
      "metadata_path": metadata.csv
      "prefix": emnify.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10304"
    "source_type_name": EMnify
  "monitors":
    "Daily Traffic Forecast": assets/monitors/emnify_data_usage_forecast.json
    "High Incoming Traffic": assets/monitors/emnify_data_usage_high_rx.json
    "High Outgoing Traffic": assets/monitors/emnify_data_usage_high_tx.json
    "Traffic Transmition Stopped": assets/monitors/emnify_data_usage_host_stopped.json
"author":
  "homepage": "https://emnify.com"
  "name": EMnify
  "sales_email": sales@emnify.com
  "support_email": mail@emnify.com
"categories":
- iot
- metrics
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/emnify/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "emnify"
"integration_id": "emnify"
"integration_title": "EMnify"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "emnify"
"public_title": "EMnify"
"short_description": "Monitors and dashboard for EMnify data usage metrics"
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::IoT"
  - "Category::Metrics"
  "configuration": "README.md#Setup"
  "description": Monitors and dashboard for EMnify data usage metrics
  "media":
  - "caption": All-in-one dashboard enables you to observe organization consumption and analyze usage patterns of your devices inventory.
    "image_url": images/data_usage_dashboard.png
    "media_type": image
  - "caption": Monitor when data exchange has stopped unexpectedly for a device.
    "image_url": images/datastop_monitor.png
    "media_type": image
  - "caption": Forecast and notify when data consumption would have gone above expected.
    "image_url": images/above_forecast_monitor.png
    "media_type": image
  - "caption": Be notified when data receiving for a device is higher than usual.
    "image_url": images/high_data_monitor.png
    "media_type": image
  - "caption": Be notified when a device has data transmission higher than usual.
    "image_url": images/high_transmission_monitor.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": EMnify
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## Overview
[EMnify][1] is a cellular IoT connectivity platform that keeps devices
connected and secure.

Use the Datadog-EMnify integration to collect metrics and data usage from IoT EMnify devices.

## セットアップ
Follow the [EMnify integration guide][2] to configure streaming of usage data, using the **Integration steps** and **Verifying the integration** sections.

### モニター

Everybody has different usage patterns, so in order for monitors to reflect your specific case you must
define workload-based boundaries and sensitivity.
For more information read the [Forecast monitor][3] and [Anomaly monitor][4] documentation.

### Dashboard

Choose a time frame in the [dashboard][5] to filter the data displayed.

## Support

Need help? Contact [EMnify support][6].

[1]: https://www.emnify.com/
[2]: https://www.emnify.com/integration-guides/emnify-datastreamer-integration-for-datadog
[3]: https://docs.datadoghq.com/monitors/create/types/forecasts/?tab=linear
[4]: https://docs.datadoghq.com/monitors/create/types/anomaly/
[5]: https://app.datadoghq.com/dashboard/lists?q=emnify
[6]: https://support.emnify.com/hc/en-us

