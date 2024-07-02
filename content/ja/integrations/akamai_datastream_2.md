---
"app_id": "akamai-datastream-2"
"app_uuid": "9a772881-d31a-4ffb-92bb-7beef1088a55"
"assets":
  "dashboards":
    "Akamai DataStream 2": assets/dashboards/akamai_datastream_2_overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": []
      "metadata_path": metadata.csv
      "prefix": akamai_datastream.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10273"
    "source_type_name": Akamai DataStream 2
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Datadog
  "sales_email": help@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- caching
- log collection
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/akamai_datastream_2/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "akamai_datastream_2"
"integration_id": "akamai-datastream-2"
"integration_title": "Akamai DataStream 2"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "akamai_datastream_2"
"public_title": "Akamai DataStream 2"
"short_description": "Send your Akamai DataStream logs to Datadog"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Caching"
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Send your Akamai DataStream logs to Datadog
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/monitor-akamai-datastream2/"
  "support": "README.md#Support"
  "title": Akamai DataStream 2
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Akamai DataStream 2 は、Akamai Intelligent Edge Platform のプロパティのパフォーマンス、セキュリティ、および CDN の健全性に関するログをキャプチャします。このインテグレーションは、データを Datadog にほぼリアルタイムでストリーミングします。

Akamai DataStream 2 ログを使用することで、長期的なトレンドの把握、パフォーマンスやセキュリティに関する問題の解決、高スループットのデータ配信ストリームの監視が可能です。詳細および使用例については、[DataStream 2 のドキュメント][1]を参照してください。

## セットアップ

### インストール

Akamai DataStream 2 のログとメトリクスを表示するためのプリセットダッシュボードを有効にするには、**Install Integration** をクリックします。

### 構成

Akamai DataStream 2 が Datadog にログを送信するよう構成するには、[Akamai techdocs サイト上の以下の説明](https://techdocs.akamai.com/datastream2/docs/stream-datadog)に従って、ログソースを `akamai.datastream` に、ログフォーマットを `JSON` に設定することを確認します。

ページの右側にある Datadog サイトセレクタが自分の [Datadog サイト][2]に設定されていることを確認し、以下のログエンドポイント URL をコピーしてください。

`https://{{< region-param key="http_endpoint" code="true" >}}/v1/input`

### 検証

このインテグレーションが正しく構成されていることを確認するには、[ソースが `akamai.datastream` のログを検索][3]します。Akamai でデータストリームを構成した後、Datadog でログが表示されるまで数分待つ必要があるかもしれません。

## 収集データ

### メトリクス

Akamai DataStream 2 には、メトリクスは含まれません。

### サービスチェック

Akamai DataStream 2 には、サービスのチェック機能は含まれません。

### イベント

Akamai DataStream 2 には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog で Akamai Datastream 2 を監視する][2]

[1]: https://techdocs.akamai.com/datastream2/docs
[2]: https://www.datadoghq.com/blog/monitor-akamai-datastream2/
[3]: https://app.datadoghq.com/logs?query=source%3Aakamai.datastream
[4]: https://docs.datadoghq.com/help/

