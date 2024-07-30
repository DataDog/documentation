---
categories:
- azure
- クラウド
- プロビジョニング
dependencies: []
description: Azure Functions のキーメトリクスを追跡。
doc_link: https://docs.datadoghq.com/integrations/azure_functions/
draft: false
git_integration_title: azure_functions
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Functions
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_functions
public_title: Datadog-Microsoft Azure Functions インテグレーション
short_description: Azure Functions のキーメトリクスを追跡。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Functions は、イベント駆動型のサーバーレスコンピューティングプラットフォームです。複雑なオーケストレーション問題も解決します。追加のセットアップなしでローカルでビルドおよびデバッグし、クラウドで大規模にデプロイおよび運用が可能なうえ、トリガーとバインドによりサービスを統合します。

Azure Functions からメトリクスを取得すると、以下のことができます。

- 関数のパフォーマンスと使用状況を視覚化。
- Azure Functions のパフォーマンスを他のアプリと関連付け。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_functions" >}}


### ヘルプ

Azure Functions インテグレーションには、イベントは含まれません。

### ヘルプ

Azure Functions インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_functions/azure_functions_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/