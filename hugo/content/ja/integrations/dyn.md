---
app_id: dyn
app_uuid: a5eea87b-1ed7-4ac2-b2ef-ffa2e7dc0a7f
assets:
  dashboards:
    dyn_screen: assets/dashboards/dyn_screen.json
  integration:
    auto_install: false
    events:
      creates_events: true
    metrics:
      check: dyn.qps
      metadata_path: metadata.csv
      prefix: dyn.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 79
    source_type_name: Dyn
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- network
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: dyn
integration_id: dyn
integration_title: Dyn
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: dyn
public_title: Dyn
short_description: 'ゾーンを監視: QPS と更新。'
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::ネットワーク
  - Offering::Integration
  configuration: README.md#Setup
  description: 'ゾーンを監視: QPS と更新。'
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Dyn
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
{{< img src="integrations/dyn/dyn_overview.png" alt="Dyn 概要" popup="true">}}

## 概要

<div class="alert alert-danger">
Oracle Cloud Infrastructure は 2016 年に Dyn を買収し、Dyn の製品とサービスを Oracle Cloud Infrastructure プラットフォームにインテグレーションしました。サービスの移行については、<a href="https://www.oracle.com/corporate/acquisitions/dyn/technologies/migrate-your-services/" target="_blank">Dyn サービスの Oracle Cloud Infrastructure への移行</a>を参照してください。
</div>


最先端のグラフやイベントを使用してゾーンを監視します。

- ゾーンが更新されたときに行われる変更を追跡します。
- 最先端のグラフ作成ツールを利用してゾーンまたはレコードタイプ別の QPS を分析します。

## セットアップ

### 構成

Dyn で `datadog` 読み取り専用ユーザーをまだ作成していない場合は、[Dyn にログイン][1]し、以下の手順を実行します。

1. ユーザー名とパスワードを選択します。 
   {{< img src="integrations/dyn/create_dyn_user.png" alt="dyn ユーザーを作成" style="width:75%;" popup="true">}}

2. **READONLY** ユーザーグループを選択します。
   {{< img src="integrations/dyn/choose_dyn_group.png" alt="dyn グループを選択" style="width:75%;" popup="true">}}

3. **Add New User** をクリックします。

Datadog 読み取り専用ユーザーを作成し、次の手順を行います。

1. インテグレーションタイルを使用して Datadog [Dyn インテグレーション][2]を構成:
   {{< img src="integrations/dyn/dyn_integration.png" alt="Dyn インテグレーション" style="width:75%;" popup="true">}}

2. イベントと `dyn.changes` メトリクスを収集するゾーン (_Zone notes_) を選択します。<br>

{{< img src="integrations/dyn/dyn_zone.png" alt="Dyn ゾーン" style="width:75%;" popup="true">}}

デフォルトでは、すべてのゾーンの Dyn `QPS` メトリクスが収集されます。

<div class="alert alert-info">
Dyn インテグレーションでは、IP ACL を無効にする必要があります。
</div>

## 収集データ

### メトリクス
{{< get-metrics-from-git "dyn" >}}


**注**: `dyn.qps` メトリクスは、現在の時刻から約 90 分後に Datadog で使用できるようになります。

### イベント

Dyn インテグレーションには、イベントは含まれません。

### サービスチェック

Dyn インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://manage.dynect.net/login
[2]: https://app.datadoghq.com/integrations/dyn
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/dyn/dyn_metadata.csv
[4]: https://docs.datadoghq.com/ja/help/