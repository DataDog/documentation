---
app_id: onepassword
app_uuid: ccfcdbb7-f4b2-43b4-a176-a1f0d7b08bba
assets:
  dashboards:
    1Password-Overview: assets/dashboards/1password_overview.json
  integration:
    auto_install: false
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: 1password
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: 1password
integration_id: onepassword
integration_title: 1Password
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: 1password
oauth: {}
public_title: 1Password
short_description: 1Password アカウントのイベントを取得します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  configuration: README.md#Setup
  description: 1Password アカウントのイベントを取得します。
  media: []
  overview: README.md#Overview
  support: README.md#Troubleshooting
  title: 1Password
---

## 概要

[1Password Business][1] を使用すると、1Password Events API を使用して、アカウントイベントを Datadog Cloud SIEM に送信できます。

## セットアップ

**ステップ 1: 1Password でアクセストークンを生成する**

まずは、1Password アカウントに[サインイン][2]して、サイドバーの **Integrations** をクリックして、**Datadog** を選択します。

次に、1Password アカウントにインテグレーションを追加し、ベアラー JSON Web トークンを作成します。

1. インテグレーションの **Name** を入力し、**Add Integration** をクリックします。
2. ベアラートークンの **Name** を入力し、トークンの有効期限を選択します。
3. トークンがアクセスできるイベントタイプを選択します:
    a. サインイン試行
    b. アイテム使用イベント
    c. 監査イベント
4. **Issue Token をクリックしてアクセストークンキーを生成します。1Password ベアラートークンの発行や取り消しに関する追加情報については、[1Password のドキュメント][3]を参照してください。
5. **Save in 1Password** をクリックし、トークンを保存する保管庫を選択します。
6. **View Integration Details** をクリックすると、トークンが表示されます。

このトークンは次のステップで必要になります。

**ステップ2: 1Password アカウントを Datadog に接続する**

最初に、前のステップで生成したアクセストークンキーをコピーします。

1. アカウントの **Name** を入力します。
2. 1Password アカウントの**アクセストークンキー**を **Access Token** フィールドに貼り付けます。
3. ホストタイプで、**1Password アカウントのリージョンとプラン**を選択します。
4. オプションで、これらのログに**タグ**を定義することができます。
5. **Save** をクリックします。

### 検証

Datadog のログを `source:1password` で検索します。インテグレーションが正しくインストールされていれば、1Password のイベントを見ることができるはずです。

## 収集データ

### メトリクス

1Password インテグレーションには、メトリクスは含まれません。

### サービスのチェック

1Password インテグレーションには、サービスチェック機能は含まれません。

### イベント

1Password インテグレーションには、イベントは含まれません。

## トラブルシューティング

Datadog からのサポートが必要な場合は、[Datadog サポート][4]にお問い合わせください。または、1Password からのサポートが必要な場合は、[1Password サポート][5]にお問い合わせください。

[1]: https://support.1password.com/explore/business/
[2]: https://start.1password.com/signin
[3]: https://support.1password.com/events-reporting/#appendix-issue-or-revoke-bearer-tokens
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://support.1password.com/contact/?o=https%3a%2f%2fsupport.1password.com%2fevents-reporting%2f