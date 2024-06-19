---
categories:
- メトリクス
dependencies: []
description: 動画配信プラットフォームの Conviva Quality Insights メトリクスを監視します。
doc_link: https://docs.datadoghq.com/integrations/conviva/
draft: false
git_integration_title: conviva
has_logo: true
integration_id: ''
integration_title: Conviva
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: conviva
public_title: Datadog-Conviva インテグレーション
short_description: Conviva Quality Metriclens メトリクスを収集。
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Datadog と Conviva アカウントを接続して、エクスペリエンスの品質 (QoE) MetricLens メトリクスを確認します。

## 計画と使用

### インフラストラクチャーリスト

Datadog の [Conviva インテグレーションタイル][1]を使用して、インテグレーションをインストールします。

### ブラウザトラブルシューティング
1. Datadog [Conviva インテグレーションタイル][1]内のコンフィギュレーションタブに移動します。
2. **Add New Credentials** をクリックして、Conviva API キーと API シークレットを入力します。Datadog で、この認証情報に紐づけされたアカウントが検索されます。
3. 認証情報に関連付けられたアカウントが Datadog に見つかったら、_MetricLens_ を追加して Datadog に取り込むメトリクスを決定します。MetricLens の名前と、_フィルター_および_ディメンション_を指定します。名前は、その指定した MetricLens に自動的にタグ付けされます。
4. オプションで、特定の MetricLens またはアカウントにタグを追加します、タグをアカウントに追加する場合、タグはそのアカウントに紐づけられたすべての MetricLens に適用されます。
5. **Add New** をクリックしてその後の手順に従い、さらに _MetricLens_ を追加します。
6. **Add New Credentials** ボタンを使用して、追加の Conviva 認証方法でこのステップを繰り返します。

### ダッシュボード  
インテグレーションの構成後、すぐに使える Conviva ダッシュボードを使用して MetricLens メトリクスの概要を取得します。デフォルトでは、すべての MetricLens で収集されたすべてのメトリクスが表示されます。

{{< img src="integrations/conviva/conviva_dashboard.png" alt="Conviva インテグレーションのすぐに使えるダッシュボード" popup="true" style="width:100%" >}}

`metriclens` でフィルタリングすることで、各タイルに設定された MetricLens ごとにメトリクスの内訳を表示できます。さらに、`dimension` のフィルターで絞り込むと、単一のディメンションエンティティ別にメトリクスを確認できます。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "conviva" >}}


### ヘルプ

Conviva インテグレーションは [Datadog イベントストリーム][3]にアラートを送信します。

{{< img src="integrations/conviva/conviva_eventstream.png" alt="Datadog Conviva イベントストリームの監視アラート" popup="true" style="width:100%" >}}

### ヘルプ

Conviva インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog で Conviva を監視する][5]

[1]: https://app.datadoghq.com/integrations/conviva
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/conviva/conviva_metadata.csv
[3]: https://docs.datadoghq.com/ja/events/
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://www.datadoghq.com/blog/video-streaming-performance-monitoring-conviva/