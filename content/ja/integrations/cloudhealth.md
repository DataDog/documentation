---
categories:
- cloud
- compliance
- cost management
- security
dependencies: []
description: CloudHealth が Datadog からインスタンスごとのメトリクスを取得できるように支援。
doc_link: https://docs.datadoghq.com/integrations/cloudhealth/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-cloudhealth-assets-datadog/
  tag: ブログ
  text: 'CloudHealth + Datadog: クラウドアセットを効果的に管理'
git_integration_title: cloudhealth
has_logo: true
integration_id: cloudhealth
integration_title: Cloudhealth
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: cloudhealth
public_title: Datadog-Cloudhealth インテグレーション
short_description: CloudHealth が Datadog からインスタンスごとのメトリクスを取得できるように支援。
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

CloudHealth と Datadog の両方を使用する場合は、Datadog からインスタンスごとのリソース使用状況メトリクスを収集するように、CloudHealth アカウントを構成できます。これで CloudHealth は、クラウドリソースの調整についての推奨事項をより正確に提供できるようになります。

このインテグレーションによって CloudHealth から Datadog にプルされるデータは**ありません**。このインテグレーションは、単に CloudHealth が Datadog アカウントをポーリングしてメトリクスを取得できるようにします。

## 計画と使用

### ブラウザトラブルシューティング

CloudHealth を使用したクラウドの最適化をまだ開始していない場合は、まず [14 日間の無料トライアル][1]にサインアップしてください。既に CloudHealth を利用している場合は、以下の簡単な 4 つの手順に従うだけで、CloudHealth の Datadog インテグレーションがセットアップされ、クラウド環境のあらゆる側面の可視化が改善されます。

1. CloudHealth Platform で、Setup -> Accounts -> Datadog に移動し、右上隅の New Account ボタンをクリックします。
   {{< img src="integrations/cloudhealth/cloudhealth_config_2.png" alt="CloudHealth コンフィグ 2" popup="true">}}

2. 統合する Datadog アカウントの情報をフォームに入力します。

    - **Name** - わかりやすい名前。いつでも変更できます。
    - **API Key** - オーガニゼーション固有の API キー。
    - **Application Key** - アプリケーションキー。オーガニゼーションの API キーと組み合わせて、Datadog の API へのアクセス権を提供します。CloudHealth は Datadog にホストとメトリクスの情報を問い合わせるだけで、Datadog に対して何も書き込みません。
    - **Import Tags** - Datadog のタグをプラットフォームにインポートできます

3. Allowed tags - "Import tags" をオンにすると、タグがアクティブに収集され、CloudHealth にインポートする特定のタグを許可する追加フィールドが提供されます。CloudHealth プラットフォームへのインポートを許可するタグを選択します。
   {{< img src="integrations/cloudhealth/cloudhealth_config_1.png" alt="CloudHealth コンフィグ 1" popup="true">}}

## リアルユーザーモニタリング

### データセキュリティ

CloudHealth インテグレーションには、メトリクスは含まれません。

### ヘルプ

CloudHealth インテグレーションは、Catchpoint イベントを Datadog のイベントストリームにプッシュします。

### ヘルプ

CloudHealth インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.cloudhealthtech.com
[2]: https://docs.datadoghq.com/ja/help/