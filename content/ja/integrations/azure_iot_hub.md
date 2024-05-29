---
categories:
- azure
- cloud
- iot
- provisioning
dependencies: []
description: Azure IOT Hub のキーメトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/azure_iot_hub/
draft: false
git_integration_title: azure_iot_hub
has_logo: true
integration_id: azure-iot-hub
integration_title: Microsoft Azure IOT Hub
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_iot_hub
public_title: Datadog-Microsoft Azure IOT Hub インテグレーション
short_description: Azure IOT Hub のキーメトリクスを追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure IOT Hub は、多数の IoT デバイス間で信頼性が高くて安全な双方向通信を可能にするフルマネージド型のサービスです。

Azure IOT Hub からメトリクスを取得すると、以下のことができます。

- IOT Hub のパフォーマンスを視覚化。
- IOT Hub のパフォーマンスをアプリケーションと関連付け。

Azure Provisioning Service は、IoT Hub 向けのヘルパーサービスです。人間が介入することなく、適切な IoT ハブへのゼロタッチ、ジャストインタイムプロビジョニングを可能にします。顧客は、多数のデバイスを安全かつスケーラブルな方法でプロビジョニングできます。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_iot_hub" >}}


### ヘルプ

Azure IoT Hub インテグレーションには、イベントは含まれません。

### ヘルプ

Azure IoT Hub インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_iot_hub/azure_iot_hub_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/