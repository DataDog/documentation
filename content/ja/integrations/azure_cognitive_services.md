---
aliases:
- /ja/integrations/azure_cognitiveservices
categories:
- cloud
- azure
dependencies: []
description: Azure Cognitive Services のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/azure_cognitive_services/
draft: false
git_integration_title: azure_cognitive_services
has_logo: true
integration_id: azure-cognitiveservices
integration_title: Microsoft Azure Cognitive Services
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: azure_cognitive_services
public_title: Datadog-Microsoft Azure Cognitive Services インテグレーション
short_description: Azure Cognitive Services のキーメトリクスを追跡
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Cognitive Services は、開発者に AI やデータサイエンスに関する直接的なスキルや知識がなくても、インテリジェントなアプリケーションを構築するために使用できる API、SDK、およびサービスです。

Datadog Azure インテグレーションを使用して、Azure Cognitive Services からメトリクスを収集できます。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_cognitive_services" >}}


### ヘルプ

Azure Cognitive Services インテグレーションには、イベントは含まれません。

### ヘルプ

Azure Cognitive Services インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_cognitive_services/azure_cognitive_services_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/