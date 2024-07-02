---
"categories":
- "azure"
- "cloud"
- "iot"
- "provisioning"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Azure IOT Hub のキーメトリクスを追跡。"
"doc_link": "https://docs.datadoghq.com/integrations/azure_iot_hub/"
"draft": false
"git_integration_title": "azure_iot_hub"
"has_logo": true
"integration_id": "azure-iot-hub"
"integration_title": "Microsoft Azure IOT Hub"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_iot_hub"
"public_title": "Datadog-Microsoft Azure IOT Hub Integration"
"short_description": "Track key Azure IOT Hub metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure IOT Hub is a fully managed service that enables reliable and secure bidirectional communications between millions of IoT devices.

Get metrics from Azure IOT Hub to:

- Visualize the performance of your IOT Hubs.
- Correlate the performance of your IOT Hubs with your applications.

Azure Provisioning Service is a helper service for IoT Hub that enables zero-touch, just-in-time provisioning to the right IoT hub without requiring human intervention, allowing customers to provision millions of devices in a secure and scalable manner.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration first][1]. There are no other installation steps that need to be performed.

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_iot_hub" >}}


### イベント

The Azure IoT Hub integration does not include any events.

### サービスチェック

The Azure IoT Hub integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_iot_hub/azure_iot_hub_metadata.csv
[3]: https://docs.datadoghq.com/help/

