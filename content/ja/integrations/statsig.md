---
"app_id": "statsig"
"app_uuid": "57fb9235-151d-4ed9-b15e-a3e6f918dcca"
"assets":
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": statsig.log_event.count
      "metadata_path": metadata.csv
      "prefix": statsig.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10180"
    "source_type_name": Statsig
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Statsig
  "sales_email": support@statsig.com
  "support_email": support@statsig.com
"categories":
- configuration & deployment
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/statsig/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "statsig"
"integration_id": "statsig"
"integration_title": "Statsig"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "statsig"
"public_title": "Statsig"
"short_description": "Monitor Statsig changes in Datadog"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Configuration & Deployment"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitor Statsig changes in Datadog
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/feature-monitoring-statsig-datadog-marketplace/"
  "support": "README.md#Support"
  "title": Statsig
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Datadog-Statsig インテグレーションにより、Statsig でイベントおよびメトリクスを送信できるようになるため、製品やサービスを監視し、機能のロールアウトまたはコンフィギュレーションの変更がエコシステムに与える影響を可視化できます。

## セットアップ

### インストール

Statsig のインテグレーションセットアップにインストールは必要ありません。

### 構成

1. Datadog API キーをコピーします。
2. [Statsig コンソールで Integrations タブに移動します][1]。
3. Datadog カードをクリックします。
4. 上部のフィールドに API キーを貼り付け、Confirm をクリックします。

## 収集データ

Statsig インテグレーションでは、Datadog からのデータは収集されません。

### メトリクス
{{< get-metrics-from-git "statsig" >}}


### サービスチェック

Statsig インテグレーションには、サービスのチェック機能は含まれません。

### イベント

Statsig インテグレーションにより、Statsig でのコンフィギュレーション変更イベントが Datadog に送信されます（たとえば、更新された機能ゲートまたは新しいインテグレーション）。

## トラブルシューティング

ヘルプが必要ですか？[Statsig サポート][3]にお問い合わせいただくか、[Statsig ウェブサイト][4]をご覧ください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog マーケットプレイスの Statsig の提供とモニター機能のリリース][5]

[1]: https://console.statsig.com/integrations
[2]: https://github.com/DataDog/integrations-extras/blob/master/statsig/metadata.csv
[3]: mailto:support@statsig.com
[4]: https://www.statsig.com/contact
[5]: https://www.datadoghq.com/blog/feature-monitoring-statsig-datadog-marketplace/

