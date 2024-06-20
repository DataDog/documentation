---
aliases: []
categories:
- クラウド
- azure
dependencies: []
description: 主要な Azure Arc メトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/azure_arc/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/azure-arc-integration/
  tag: ブログ
  text: Datadog で Azure Arc ハイブリッドインフラストラクチャーを監視する
git_integration_title: azure_arc
has_logo: true
integration_id: azure-arc
integration_title: Microsoft Azure Arc
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_arc
public_title: Datadog-Microsoft Azure Arc インテグレーション
short_description: 主要な Azure Arc メトリクスを追跡します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Arc は、Azure プラットフォームを拡張するブリッジであり、データセンター間、エッジ、マルチクラウド環境で実行できる柔軟性を備えたアプリケーションやサービスの構築を支援します。

Azure Arc インテグレーションを使用すると、以下のことが可能になります。

- Azure Arc Servers と Kubernetes Clusters の接続ステータス、タグ、その他の詳細を収集する
- Datadog Agent でも監視している Arc 管理サーバーの場合、Azure Arc タグを Datadog のホストとその関連メトリクスとログに伝播させる
- AWS または GCP インテグレーションでも監視している Arc 管理サーバーの場合、Azure Arc タグを Datadog のホストとその関連クラウドメトリクスとログに伝播させる
- Azure Arc のすぐに使えるダッシュボードで、上記のデータのインサイトとサマリーをすぐに得る

また、Datadog 拡張機能を使用して、Datadog Agent を Arc サーバーに構成およびデプロイすることができます。このオプションの詳細については、[Datadog VM 拡張機能][1]ページをお読みください。

## 計画と使用

### インフラストラクチャーリスト

[Microsoft Azure インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_arc" >}}


### ヘルプ

Azure Arc インテグレーションには、イベントは含まれません。

### ヘルプ

Azure Arc インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/guide/powershell-command-to-install-azure-datadog-extension/#install-on-azure-arc
[2]: https://docs.datadoghq.com/ja/integrations/azure/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_arc/azure_arc_metadata.csv
[4]: https://docs.datadoghq.com/ja/help/