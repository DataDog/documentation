---
app_id: postman
app_uuid: 9ba70e31-8e84-4d6b-84a1-95d6ba713df9
assets:
  dashboards:
    Postman API Dashboard: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: postman.monitor.run.total_latency
      metadata_path: metadata.csv
      prefix: postman
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10162
    source_type_name: Postman
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Postman
  sales_email: integrations-partnerships@postman.com
  support_email: integrations-partnerships@postman.com
categories: []
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/postman/README.md
display_on_public_website: true
draft: false
git_integration_title: postman
integration_id: postman
integration_title: Postman
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: postman
public_title: Postman
short_description: Postman Monitoring を実行し、Datadog でメトリクスを分析しイベントを生成します。　
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  configuration: README.md#Setup
  description: Postman Monitoring を実行し、Datadog でメトリクスを分析しイベントを生成します。　
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Postman
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Postman][1] は、API の構築手順を簡素化しコラボレーションを合理化することで、より優れた API を短期間で作成するための API プラットフォームです。

このインテグレーションにより、以下が可能になり、モニタリングの健全性を常に把握できます。

- Datadog で実行された Postman Monitoring のメトリクスを分析

- 成功および失敗した Monitoring のイベントを生成

## 計画と使用

詳細な手順は [Postman のドキュメント][2]を参照してください。Postman インテグレーションを利用するには、Postman の [Team, Business, Enterprise プラン][3]のご契約が必要です。

### ブラウザトラブルシューティング

1. Datadog [API キー][4]を生成します。
2. Postman アカウントにサインインし、[Datadog インテグレーション][5]へ移動します。
3. "Add Integration" を選択します。
4. Datadog へ Monitor メトリクスやイベントを送信するには
   - 新しいインテグレーションに名前を付けます。
   - データを Datadog に送信するモニターを選択します。
   - Datadog API キーを入力します。
   - 使用する Datadog のリージョンを選択します。
   - オプションとして、実行ごとに、イベント、メトリクス、またその両方を送信するかを選択できます。
5. 最後に、"Add Integration" を選択し、インテグレーションの設定を完了します。

![インテグレーションを構成][6]

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "postman" >}}


### ヘルプ

Postman には、サービスのチェック機能は含まれません。

### ヘルプ

Postman で監視が実行されるたびにイベントが生成されます。イベントの重大度は、Postman モニターのテストに基づきます。

| 重大度 | 説明                                                           |
|----------|-----------------------------------------------------------------------|
| `Low`    | すべてのテストが合格の場合                                                 |
| `Normal` | 一部のテストが合格しなかった、またはイベントの実行でエラーが発生した場合 |

## ヘルプ

ご不明な点は、[Postman サポート][8]までお問い合わせください。

[1]: https://www.postman.com/
[2]: https://learning.postman.com/docs/integrations/available-integrations/datadog/
[3]: https://www.postman.com/pricing/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://go.postman.co/integrations/service/datadog
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/postman/images/add-integration-datadog.jpeg
[7]: https://github.com/DataDog/integrations-extras/blob/master/postman/metadata.csv
[8]: https://www.postman.com/support/