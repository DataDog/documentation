---
app_id: wiz
app_uuid: 9c1be915-7583-4294-8c3b-a49d2d32e05b
assets:
  dashboards:
    Wiz-Overview: assets/dashboards/Wiz-Overview_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10440
    source_type_name: Wiz
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- security
- ログの収集
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: wiz
integration_id: wiz
integration_title: Wiz
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: wiz
public_title: Wiz
short_description: Wiz の監査ログと課題 (有害な組み合わせや脅威を含む)。
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
  - Category::Security
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: Wiz の監査ログと課題 (有害な組み合わせや脅威を含む)。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Wiz
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Datadog の Wiz との統合により、Wiz API を使用して監査ログと課題 (脅威や有害な組み合わせを含む) を Datadog [Cloud SIEM][1] に取り込めます。

## 収集されるログ タイプ

### 監査ログ

チーム メンバーによる操作、レポート アクティビティ、課題の更新。異常なアクティビティの検知や調査の支援に役立ちます。

### 問題

クラウド インフラストラクチャにおける有害な組み合わせや誤構成のログ。

## セットアップ

## 設定

### 監査ログ (Wiz API によるプル型)

#### 前提条件

- サービス アカウントを作成できる権限を持つ Wiz テナントへのアクセス。

#### ステップ 1: Datadog で新しいアカウントを追加

1. 下の表で **Add New** をクリックします。
2. 一意の **Datadog Account Name** を入力します。
3. Wiz トークン URL を貼り付けます:
   ```
   https://auth.app.wiz.io/oauth/token
   ```

#### ステップ 2: クエリ URL を入力

Wiz は統一された GraphQL エンドポイントを使用します:

```
https://api.<TENANT_REGION>.app.wiz.io/graphql
```

`<TENANT_REGION>` を実際のリージョンに置き換えます (例: us1、eu1 など)。

エンドポイントの確認方法:

1. Wiz に [ログイン][2] します。
2. **User Settings** に移動します。
3. 左側のメニューで **Tenant** をクリックします。
4. API エンドポイントをコピーします。

#### ステップ 3: Wiz でサービス アカウントを作成

1. **Settings** > **Access Management** > **Service Accounts** に移動します。
2. **Add Service Account** をクリックします。
3. 次を入力します:
   - **Name**: 例: `Datadog Integration`
   - **Type**: Custom Integration (GraphQL API)
   - **API Scopes**: `admin:audit`, `read:issues`
4. アカウントを保存し、下の表に **Client ID** と **Client Secret** をコピーします。

> **注**: Wiz API の要件に従い、監査ログは 12 時間ごとに取得されます。

### 課題 (ウェブフックを使用するプッシュ型)

Wiz はプッシュ型のウェブフックを使用して、課題データを Datadog に送信します。

#### ステップ 1: Intake URL を生成

1. Datadog で、既存または新規の API キーを使用して Intake URL を生成します。
2. **Copy Intake URL** をクリックします。

#### ステップ 2: Wiz でウェブフックを構成

1. Wiz の **Settings** > **Integrations** > **Webhooks** に移動します。
2. Datadog 用の新しいウェブフックを作成します。
3. Datadog の Intake URL をウェブフックの設定に貼り付けます。

Wiz のウェブフック形式の詳細は次を参照してください:

- [Wiz Issues Webhook ドキュメント][3]
- [Wiz Issues の概要][4]

## 検証

セットアップ後:

1. Datadog の **Logs Explorer** に移動します。
2. `source:wiz` で検索します。
3. 成功すると、Wiz のログが表示されます。
4. 表示されない場合は、**Logs** > **Indexes** に移動し、`source:wiz*` 用のログ インデックスが設定されていることを確認します。

### 収集データ

### メトリクス

Wiz インテグレーションにはメトリクスは含まれません。

### サービスチェック

Wiz インテグレーションにはサービス チェックは含まれません。

### イベント

Wiz インテグレーションにはイベントは含まれません。

### ログ

Wiz インテグレーションは監査ログと課題を収集します。

## トラブルシューティング

お困りの際は、[Datadog サポート][5] または [Wiz サポート][6] までご連絡ください。

[1]: https://app.datadoghq.com/security/home
[2]: https://app.wiz.io/login
[3]: https://docs.wiz.io/wiz-docs/docs/webhook-format
[4]: https://docs.wiz.io/wiz-docs/docs/issues-overview
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://www.wiz.io/