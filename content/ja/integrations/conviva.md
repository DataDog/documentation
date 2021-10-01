---
categories:
  - モニタリング
ddtype: crawler
dependencies: []
description: 動画配信プラットフォームの Conviva Quality Insights メトリクスを監視します。
doc_link: https://docs.datadoghq.com/integrations/conviva/
draft: false
git_integration_title: conviva
has_logo: true
integration_id: ''
integration_title: Conviva
is_public: true
kind: integration
manifest_version: '1.0'
name: conviva
public_title: Datadog-Conviva インテグレーション
short_description: Conviva Quality Metriclens メトリクスを収集。
version: '1.0'
---
## 概要

Datadog と Conviva アカウントを接続して、エクスペリエンスの品質 (QoE) MetricLens メトリクスを確認します。

## セットアップ

### インストール

Datadog の [Conviva インテグレーションタイル][1]を使用して、インテグレーションをインストールします。

### コンフィギュレーション
1. Datadog [Conviva インテグレーションタイル][1]内のコンフィギュレーションタブに移動します。
2. **Add New Credentials** をクリックして、Conviva API キーと API シークレットを入力します。Datadog で、この認証情報に紐づけされたアカウントが検索されます。
3. 認証情報に関連付けられたアカウントが Datadog に見つかったら、_MetricLens_ を追加して Datadog に取り込むメトリクスを決定します。MetricLens の名前と、_フィルター_および_ディメンション_を指定します。名前は、その指定した MetricLens に自動的にタグ付けされます。
4. オプションで、特定の MetricLens またはアカウントにタグを追加します、タグをアカウントに追加する場合、タグはそのアカウントに紐づけられたすべての MetricLens に適用されます。
5. **Add New** をクリックしてその後の手順に従い、さらに _MetricLens_ を追加します。
6. **Add New Credentials** ボタンを使用して、追加の Conviva 認証方法でこのステップを繰り返します。

### ダッシュボード  
インテグレーションの構成後、すぐに使える Conviva ダッシュボードを使用して MetricLens メトリクスの概要を取得します。

デフォルトでは、すべての MetricLens で収集されたすべてのメトリクスが表示されます。
`metriclens` のフィルターを使用すると、それぞれのタイルに構成された対応 MetricLens 別に、メトリクスの詳細を確認できます。さらに、`dimension` のフィルターで絞り込むと、単一のディメンションエンティティ別にメトリクスを確認できます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "conviva" >}}


### イベント

Conviva インテグレーションには、イベントは含まれません。

### サービスのチェック

Conviva インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#integrations/conviva
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/conviva/conviva_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/