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
    source_type_id: 10351
    source_type_name: 1password
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- イベント管理
- 問題追跡
- セキュリティ
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
public_title: 1Password
short_description: 1Password アカウントのイベントを取得します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Event Management
  - Category::Issue Tracking
  - Category::Security
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: 1Password アカウントのイベントを取得します。
  media:
  - caption: 1Password ダッシュボード概要
    image_url: images/onepassword-dashboard.png
    media_type: image
  - caption: 1Password ダッシュボードマップ
    image_url: images/onepassword-map.png
    media_type: image
  - caption: 1Password 検出ルール
    image_url: images/onepassword-detection-rules.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Troubleshooting
  title: 1Password
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

[1Password Business][1] を使用すると、1Password Events API を使用して、アカウントイベントを Datadog Cloud SIEM に送信できます。さらに、以下のことも可能です。

- 1Password のデータ保持を制御する。
- カスタムウィジェットやカスタムダッシュボードを構築する。
- 特定のアクションをトリガーする検出ルールを設定する。
- 1Password のイベントを他のサービスのデータと相互参照する。

Datadog と 1Password のインテグレーションは、[1Password Events API][2] を使用してログを収集し、以下の 3 種類のログを生成します。

- **サインイン試行**: このログには、アカウントへのサインインを試行したユーザーの名前と IP アドレス、試行がいつ行われたかが含まれ、失敗した試行については、パスワード、キー、または第 2 因子が間違っているなどの失敗の原因が含まれます。
- **アイテムの使用**: このタイプのログには、アイテム (パスワードやその他の資格情報など) がどのように使用されたかを記述するアクションが含まれます。アクションに指定できる値には、fill、enter-item-edit-mode、export、share、secure-copy、reveal、select-sso-provider、server-create、server-update、server-fetch があります。
- **監査イベント**: このログには、アカウント、Vault、グループ、ユーザーなどに加えられた変更など、1Password アカウントでチームメンバーが実行したアクションが含まれます。

1Password のログをパースした後、[すぐに使える 1Password 概要ダッシュボード][3]に、1Password の値、アイテム、ユーザーからのセキュリティ関連イベントに関する洞察が Datadog によって入力されます。ウィジェットには、最も頻繁に発生するイベントと頻繁に発生しないイベントを示すトップリストや、サインイン試行の発生国を示すジオロケーションマップが含まれます。

## セットアップ

**ステップ 1: 1Password でアクセストークンを生成する**

まずは、1Password アカウントに[サインイン][4]して、サイドバーの **Integrations** をクリックして、**Datadog** を選択します。

次に、1Password アカウントにインテグレーションを追加し、ベアラー JSON Web トークンを作成します。

1. インテグレーションの **Name** を入力し、**Add Integration** をクリックします。
2. ベアラートークンの **Name** を入力し、トークンの有効期限を選択します。
3. トークンがアクセスできるイベントタイプを選択します:
    a. サインイン試行
    b. アイテム使用イベント
    c. 監査イベント
4. **Issue Token をクリックしてアクセストークンキーを生成します。1Password ベアラートークンの発行や取り消しに関する追加情報については、[1Password のドキュメント][5]を参照してください。
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

## データ収集

### メトリクス

1Password インテグレーションには、メトリクスは含まれません。

### サービスチェック

1Password インテグレーションには、サービスチェック機能は含まれません。

### イベント

1Password インテグレーションには、イベントは含まれません。

## トラブルシューティング

Datadog からのサポートが必要な場合は、[Datadog サポート][6]にお問い合わせください。または、1Password からのサポートが必要な場合は、[1Password サポート][7]にお問い合わせください。

[1]: https://support.1password.com/explore/business/
[2]: https://developer.1password.com/docs/events-api/
[3]: http://app.datadoghq.com/dash/integration/1Password-Overview
[4]: https://start.1password.com/signin
[5]: https://support.1password.com/events-reporting/#appendix-issue-or-revoke-bearer-tokens
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://support.1password.com/contact/?o=https%3a%2f%2fsupport.1password.com%2fevents-reporting%2f