---
app_id: doctordroid
app_uuid: 5e75658c-065e-460f-b9f8-42bf100e361d
assets:
  dashboards:
    doctor_droid_overview: assets/dashboards/doctor_droid_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10443
    source_type_name: doctor_droid
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.drdroid.io
  name: Doctor Droid
  sales_email: sales@drdroid.io
  support_email: support@drdroid.io
categories:
- 自動化
- logs-restriction-queries-update-a-restriction-query
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/doctordroid/README.md
display_on_public_website: true
draft: false
git_integration_title: doctordroid
integration_id: doctordroid
integration_title: Doctor Droid
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: doctordroid
public_title: Doctor Droid
short_description: アラートを分析し、傾向を特定し、ノイズの改善とカバレッジの向上を図る
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
  - Category::Automation
  - Category::Incidents
  - Offering::Integration
  - Queried Data Type::Metrics
  - Queried Data Type::Logs
  - Queried Data Type::Traces
  - Queried Data Type::Events
  - Queried Data Type::Incidents
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: アラートを分析し、傾向を特定し、ノイズの改善とカバレッジの向上を図る
  media:
  - caption: Doctor Droid 概要 ダッシュボード
    image_url: images/doctor_droid_overview.png
    media_type: image
  - caption: Datadog アラート発生傾向
    image_url: images/alert_occurence_count_trends.png
    media_type: image
  - caption: 上位 5 個のアラート発生分布
    image_url: images/top_5_alerts_distribution.png
    media_type: image
  - caption: 上位 10 個の累積アラートタイプと影響を受けたサービス
    image_url: images/top_10_lifetime_alert_counts.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Doctor Droid
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要
Doctor Droid はアラートを強化し、調査を支援するツールであり、チームのデバッグおよび診断ワークフローを効率化します。
* アラートがトリガーされると、Datadog、クラウドプロバイダー、およびその他の可観測性ツールから自動的にメトリクスを取得し、_関連データをチームに提供します_。
* 調査結果は数秒以内に Datadog のダッシュボードや各モニターに公開され、既存のワークフロー内で簡単にアクセスして確認できます。
* チームの要件やアプリケーションのアーキテクチャに基づいてカスタマイズ可能です。

Datadog インテグレーションは、Datadog 内で使用している機能と必要な調査の種類に基づいて、メトリクス、トレース、イベントを取得します。

## セットアップ

### インストール
1. Datadog 内の [Doctor Droid インテグレーションタイル][1]に移動します。
1. *Configure* タブで **Connect Accounts** をクリックすると、[Doctor Droid][2] 内のインテグレーションページに移動します。
1. Doctor Droid で[インテグレーションページ][3]に移動し、Datadog インテグレーションを追加します。
1. Datadog OAuth フローの手順に従い、Doctor Droid に Datadog アカウントから APM およびインフラストラクチャーメトリクスをクエリするアクセス権を付与します。

### 構成
インテグレーションを追加した後、Doctor Droid 内のアラート履歴を調査して傾向を発見し、レポートやプレイブックを作成して生成されたアラートデータを拡張させることができます。

## アンインストール

Doctor Droid から Datadog インテグレーションを削除するには
1. [Doctor Droid インテグレーションページ][3]に移動します。
1. **Delete** をクリックします。
1. [Datadog インテグレーションページ][4]に移動し、Doctor Droid のインテグレーションタイルを見つけて選択します。
1. Doctor Droid インテグレーションタイルから、**Uninstall Integration** ボタンをクリックして Datadog からアンインストールします。

このインテグレーションをアンインストールすると、以前のすべての認可が無効になります。

さらに、このインテグレーションに関連するすべての API キーが無効になっていることを、[API キー管理ページ][5]でインテグレーション名を検索して確認してください。

## Agent

ご不明な点は、[Doctor Droid サポート][6]までお問い合わせください。

[1]: https://app.datadoghq.com/integrations?integrationId=doctordroid
[2]: https://alertops-app.drdroid.io/
[3]: https://alertops-app.drdroid.io/integrations
[4]: https://app.datadoghq.com/integrations
[5]: https://app.datadoghq.com/organization-settings/api-keys?filter=Doctor%20Droid
[6]: mailto:support@drdroid.io