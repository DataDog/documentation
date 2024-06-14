---
app_id: pingdom-v3
app_uuid: d7f6a5a2-9614-45f1-9022-2ca1eba7bd5c
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: pingdom.response_time
      metadata_path: metadata.csv
      prefix: pingdom.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 615
    source_type_name: Pingdom
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- メトリクス
- notifications
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: pingdom_v3
integration_id: pingdom-v3
integration_title: Pingdom
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: pingdom_v3
public_title: Pingdom
short_description: Pingdom が収集したアップタイム、応答時間、アラートを Datadog で参照
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Metrics
  - Category::Notifications
  configuration: README.md#Setup
  description: Pingdom が収集したアップタイム、応答時間、アラートを Datadog で参照
  media: []
  overview: README.md#Overview
  support: README.md#Troubleshooting
  title: Pingdom
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

他のイベントやメトリクスに関連付けて、ユーザー中心の Pingdom パフォーマンスメトリクスを Datadog で追跡します。

Pingdom V3 インテグレーションは [Datadog Pingdom インテグレーション (非推奨)][1] と同様の動作をしますが、[Pingdom API][2] のバージョン 3.1 を使用します。

{{< img src="integrations/pingdom/pingdom_dashboard.png" alt="Datadog ダッシュボード上の Pingdom グラフ" popup="true">}}

## セットアップ

### API トークンの生成

1. [Pingdom アカウント][3]にログインします。
2. _Settings_ > _Pingdom API_ に移動します。
3. _Add API token_ をクリックします。トークンに名前を付け、_Read-Write_ 権限を与えます。トークンは二度とアクセスできないので、どこかに保存してください。

### インストールと構成

1. [Pingdom V3 インテグレーションタイル][4]を開きます。
2. 名前と API トークンを対応するフィールドに入力します。Pingdom で構成したメトリクスやチェックは、Datadog に収集されます。
3. Pingdom のチェックのタグを管理します。Pingdom のチェックに追加されたタグは、Datadog のチェックにも自動的に追加されます。`datadog-exclude` タグを追加して、チェックを除外します。

## データ収集

### メトリクス
{{< get-metrics-from-git "pingdom_v3" >}}


### イベント

Pingdom インテグレーションには、イベントは含まれません。

### サービスチェック

Pingdom インテグレーションは、トランザクションチェックを取得し、それをサービスチェックとしてレポートします。

`pingdom.status` のチェックでは、Pingdom のトランザクションチェックの結果と Datadog のサービスチェックの結果は以下のように相関しています。

| Datadog ステータス | Pingdom ステータス      |
| -------------- | ------------------- |
| `OK`           | `up`                |
| `CRITICAL`     | `down`              |
| `WARNING`      | `unconfirmed_down`  |
| `UNKNOWN`      | `unknown`、`paused` |

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/pingdom/
[2]: https://docs.pingdom.com/api/
[3]: https://my.pingdom.com/
[4]: https://app.datadoghq.com/account/settings#integrations/pingdom-v3
[5]: https://github.com/DataDog/integrations-internal-core/blob/main/pingdom/metadata.csv
[6]: https://docs.datadoghq.com/ja/help