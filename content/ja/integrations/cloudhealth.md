---
categories:
  - Cost Management
  - security
  - configuration & deployment
  - cloud
ddtype: crawler
dependencies: []
description: CloudHealth が Datadog からインスタンスごとのメトリクスを取得できるように支援。
doc_link: 'https://docs.datadoghq.com/integrations/cloudhealth/'
draft: false
git_integration_title: cloudhealth
has_logo: true
integration_id: cloudhealth
integration_title: Cloudhealth
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: cloudhealth
public_title: Datadog-Cloudhealth インテグレーション
short_description: CloudHealth が Datadog からインスタンスごとのメトリクスを取得できるように支援。
version: '1.0'
---
## 概要

Cloudhealth と Datadog の両方を使用する場合は、Datadog からインスタンスごとのリソース使用状況メトリクスを収集するように、Cloudhealth アカウントを構成できます。これで CloudHealth は、クラウドリソースの調整についての推奨事項をより正確に提供できるようになります。

このインテグレーションによって Cloudhealth から Datadog にプルされるデータは**ありません**。このインテグレーションは、単に Cloudhealth が Datadog アカウントをポーリングしてメトリクスを取得できるようにします。

## セットアップ

### コンフィギュレーション

CloudHealth を使用したクラウドの最適化をまだ開始していない場合は、まず [14 日間の無料トライアル][1]にサインアップしてください。既に CloudHealth を利用している場合は、以下の簡単な 4 つの手順に従うだけで、CloudHealth の Datadog インテグレーションがセットアップされ、クラウド環境のあらゆる側面の可視化が改善されます。

1. CloudHealth Platform で、Setup -> Accounts -> Datadog に移動し、右上隅の New Account ボタンをクリックします。
   {{< img src="integrations/cloudhealth/cloudhealth_config_2.png" alt="Cloudhealth Config 2" popup="true">}}

2. 統合する Datadog アカウントの情報をフォームに入力します。

    - **Name** - わかりやすい名前。いつでも変更できます。
    - **API Key** - オーガニゼーション固有の API キー。
    - **Application Key** - アプリケーションキー。オーガニゼーションの API キーと組み合わせて、Datadog の API へのアクセス権を提供します。CloudHealth は Datadog にホストとメトリクスの情報を問い合わせるだけで、Datadog に対して何も書き込みません。
    - **Import Tags** - Datadog のタグをプラットフォームにインポートできます。

3. Allowed tags - "Import tags" をオンにすると、タグがアクティブに収集され、CloudHealth にインポートするタグをホワイトリストに入れるための追加フィールドが表示されます。CloudHealth プラットフォームへのインポートを許可するタグを選択します。
   {{< img src="integrations/cloudhealth/cloudhealth_config_1.png" alt="Cloudhealth Config 1" popup="true">}}

## 収集データ

### メトリクス

Cloudhealth インテグレーションには、メトリクスは含まれません。

### イベント

Cloudhealth インテグレーションは、Catchpoint イベントを Datadog のイベントストリームにプッシュします。

### サービスのチェック

Cloudhealth インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。

[1]: https://www.cloudhealthtech.com
[2]: https://docs.datadoghq.com/ja/help/