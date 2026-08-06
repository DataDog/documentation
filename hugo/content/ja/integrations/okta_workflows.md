---
app_id: okta-workflows
app_uuid: e5e2a25d-aa66-41bc-9996-50f635dcc7a1
assets:
  dashboards:
    Okta Workflows: assets/dashboards/okta_workflows.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 33274584
    source_type_name: Okta Workflows
  logs:
    source: okta-workflows
  monitors:
    High Number of Abandoned Outcome Events Detected: assets/monitors/high_number_of_abandoned_outcome_events_detected.json
    High Number of Denied Outcome Events Detected: assets/monitors/high_number_of_denied_outcome_events_detected.json
    High Number of Failure Outcome Events Detected: assets/monitors/high_number_of_failure_outcome_events_detected.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- automation
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/okta_workflows/README.md
display_on_public_website: true
draft: false
git_integration_title: okta_workflows
integration_id: okta-workflows
integration_title: Okta Workflows
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: okta_workflows
public_title: Okta Workflows
short_description: Okta Workflows のイベントについて、より深いインサイトを得ることができます。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Submitted Data Type::Logs
  - Offering::Integration
  - Category::Automation
  configuration: README.md#Setup
  description: Okta Workflows のイベントについて、より深いインサイトを得ることができます。
  media:
  - caption: Okta Workflows
    image_url: images/okta_workflows_1.png
    media_type: image
  - caption: Okta Workflows
    image_url: images/okta_workflows_2.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Okta Workflows
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要
[Okta Workflows][1] は Okta が提供するノーコード オートメーション プラットフォームで、アイデンティティ関連のタスクやプロセスの簡素化と自動化を目的としたサービスです。組織は Okta のアイデンティティおよびアクセス管理機能やサードパーティ アプリケーションとシームレスに連携するカスタム ワークフローを構築でき、運用効率やセキュリティ、ユーザー エクスペリエンスの向上に役立ちます。

Okta Workflows インテグレーションは Okta ワークフローのイベント ログを収集し、Datadog で包括的に分析できるよう送信します。

## セットアップ

### Okta Workflows で API 認証情報を生成する
1. [Okta Admin Console][2] に、[Read-only administrators][3] ロールを持つ **admin** としてログインします。
2. [このガイド][4] の手順に従って、API トークンを生成します。

### Okta Workflows ドメインを取得する
1. 管理者アカウントで自分の Okta 組織にサインインします。
2. Admin Console 右上のユーザー名をクリックし、表示されるドロップダウン メニューから **Domain** を確認します。Okta ドメインは次のような形式です。
     - example.oktapreview.com
     - example.okta.com
     - example.okta-emea.com

### Okta Workflows アカウントを Datadog に接続する
1. API Token と Okta Domain を入力します。

   | パラメーター           | 説明                       |
   |--------------------- |-----------------------------------|
   | API Token            | Okta Workflows の API キー    |
   | Okta Domain          | Okta Workflows のドメイン     |

2. **Save** ボタンをクリックして設定を保存します。

## 収集データ

### ログ

Okta Workflows インテグレーションは Okta ワークフローのイベント ログを収集し、Datadog に転送します。

### メトリクス

Okta Workflows インテグレーションでは、メトリクスは収集されません。

### イベント

Okta Workflows インテグレーションには、イベントは含まれません。

## サポート

追加のサポートが必要な場合は、[Datadog サポート][3]にお問い合わせください。

[1]: https://www.okta.com/products/workflows/
[2]: https://login.okta.com/
[3]: https://help.okta.com/en-us/content/topics/security/administrators-read-only-admin.htm
[4]: https://help.okta.com/en-us/content/topics/security/api.htm?cshid=ext-create-api-token#create-okta-api-token